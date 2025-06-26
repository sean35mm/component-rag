# Shared Member Threads Query Hooks

## Purpose

These hooks manage shared member thread data for both authenticated and public access scenarios. They provide consistent interfaces for fetching thread details with associated messages, supporting both member-specific and public viewing contexts.

## Hooks Overview

| Hook | Type | Purpose |
|------|------|---------|
| `useSharedMemberThreadById` | Query | Fetches a shared member thread by ID for authenticated members |
| `usePublicSharedMemberThreadById` | Query | Fetches a shared member thread by ID for public access |

## Query Hooks

### useSharedMemberThreadById

Fetches a shared member thread with messages for authenticated and verified members.

**Parameters:**
- `threadId: string` - The unique identifier of the thread
- `options?: UseQueryOptions<AnswersThreadWithMessages, T>` - Optional TanStack Query configuration

**Returns:** `UseQueryResult<T, Error>` where T defaults to `AnswersThreadWithMessages`

**Features:**
- Requires authenticated and verified access
- Automatically disabled when user is not authorized
- Supports custom selectors and transformations
- Uses member-specific service endpoints

### usePublicSharedMemberThreadById

Fetches a shared member thread with messages for public access scenarios.

**Parameters:**
- `threadId: string` - The unique identifier of the thread
- `options?: UseQueryOptions<AnswersThreadWithMessages, T>` - Optional TanStack Query configuration

**Returns:** `UseQueryResult<T, Error>` where T defaults to `AnswersThreadWithMessages`

**Features:**
- Requires public access context
- Uses public service builder with token support
- Automatically disabled when not in public context
- Supports custom selectors and transformations

## Query Keys

The hooks use structured query keys from the query-key-factory pattern:

```typescript
// Member-specific thread query key
queryKeys.sharedMemberThreads.getById(token, threadId)

// Public thread query key  
queryKeys.publicSharedMemberThreads.getById(token, threadId)
```

**Key Structure:**
- Includes access token for cache isolation
- Scoped by thread ID for granular invalidation
- Separate namespaces for member vs public access

## Usage Examples

### Basic Thread Fetching

```typescript
// Authenticated member access
function MemberThreadView({ threadId }: { threadId: string }) {
  const { data: thread, isLoading, error } = useSharedMemberThreadById(threadId);

  if (isLoading) return <div>Loading thread...</div>;
  if (error) return <div>Failed to load thread</div>;

  return (
    <div>
      <h2>{thread.title}</h2>
      <div>Messages: {thread.messages.length}</div>
    </div>
  );
}

// Public access
function PublicThreadView({ threadId }: { threadId: string }) {
  const { data: thread, isLoading } = usePublicSharedMemberThreadById(threadId);

  if (isLoading) return <div>Loading public thread...</div>;

  return (
    <div>
      <h2>{thread?.title}</h2>
      <p>Public view of shared thread</p>
    </div>
  );
}
```

### Conditional Fetching

```typescript
function ConditionalThreadLoader({ threadId, shouldLoad }: { 
  threadId: string; 
  shouldLoad: boolean; 
}) {
  const { data: thread } = useSharedMemberThreadById(threadId, {
    enabled: shouldLoad, // Additional condition beyond auth check
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  return thread ? <ThreadDisplay thread={thread} /> : null;
}
```

### Background Refetching

```typescript
function ThreadWithRefresh({ threadId }: { threadId: string }) {
  const { 
    data: thread, 
    refetch, 
    isRefetching 
  } = useSharedMemberThreadById(threadId, {
    refetchInterval: 30000, // Refetch every 30 seconds
    refetchIntervalInBackground: true,
  });

  return (
    <div>
      <button onClick={() => refetch()} disabled={isRefetching}>
        {isRefetching ? 'Refreshing...' : 'Refresh Thread'}
      </button>
      {thread && <ThreadContent thread={thread} />}
    </div>
  );
}
```

## Selector Support

Transform and select specific data from the thread response:

```typescript
// Extract only message count
function useThreadMessageCount(threadId: string) {
  return useSharedMemberThreadById(threadId, {
    select: (thread) => thread.messages.length,
  });
}

// Get latest message
function useLatestThreadMessage(threadId: string) {
  return useSharedMemberThreadById(threadId, {
    select: (thread) => thread.messages[thread.messages.length - 1],
  });
}

// Transform thread data
interface ThreadSummary {
  id: string;
  title: string;
  messageCount: number;
  lastActivity: string;
}

function useThreadSummary(threadId: string) {
  return useSharedMemberThreadById(threadId, {
    select: (thread): ThreadSummary => ({
      id: thread.id,
      title: thread.title,
      messageCount: thread.messages.length,
      lastActivity: thread.messages[thread.messages.length - 1]?.createdAt || thread.createdAt,
    }),
  });
}
```

## Caching Strategy

### Cache Scoping
- **Token-based isolation**: Each access token gets separate cache entries
- **Thread-specific keys**: Individual threads cached independently
- **Context separation**: Member and public queries use different cache spaces

### Cache Behavior
```typescript
// Default caching behavior
const thread = useSharedMemberThreadById(threadId, {
  staleTime: 5 * 60 * 1000,    // 5 minutes fresh
  gcTime: 10 * 60 * 1000,      // 10 minutes in cache
  refetchOnMount: 'stale',      // Refetch if stale
  refetchOnWindowFocus: true,   // Refetch on focus
});
```

### Manual Cache Operations
```typescript
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';

function ThreadManager({ threadId }: { threadId: string }) {
  const queryClient = useQueryClient();
  const { token } = useAccessToken();

  const invalidateThread = () => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.sharedMemberThreads.getById(token?.token || '', threadId).queryKey,
    });
  };

  const prefetchThread = () => {
    queryClient.prefetchQuery({
      ...queryKeys.sharedMemberThreads.getById(token?.token || '', threadId),
      queryFn: ({ signal }) => MemberSharedMemberThreadService.getById(threadId, signal),
    });
  };

  return (
    <div>
      <button onClick={invalidateThread}>Invalidate Cache</button>
      <button onClick={prefetchThread}>Prefetch Thread</button>
    </div>
  );
}
```

## Error Handling

### Automatic Error Management
```typescript
function ThreadWithErrorHandling({ threadId }: { threadId: string }) {
  const { 
    data: thread, 
    error, 
    isError,
    isLoading,
    refetch 
  } = useSharedMemberThreadById(threadId);

  if (isLoading) return <LoadingSpinner />;
  
  if (isError) {
    return (
      <ErrorBoundary 
        error={error} 
        retry={refetch}
        fallback="Failed to load thread"
      />
    );
  }

  return <ThreadDisplay thread={thread} />;
}
```

### Custom Error Handling
```typescript
function ThreadWithCustomErrors({ threadId }: { threadId: string }) {
  const { data: thread, error } = useSharedMemberThreadById(threadId, {
    retry: (failureCount, error) => {
      // Don't retry on auth errors
      if (error.status === 401 || error.status === 403) return false;
      return failureCount < 3;
    },
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Handle specific error types
  if (error?.status === 404) {
    return <ThreadNotFound threadId={threadId} />;
  }

  if (error?.status === 403) {
    return <ThreadAccessDenied />;
  }

  return thread ? <ThreadDisplay thread={thread} /> : <LoadingSpinner />;
}
```

## Related Services

### Service Integration
```typescript
// Member service
import { MemberSharedMemberThreadService } from '@/lib/services/shared-member-thread-service';

// Public service builder
import { PublicSharedMemberThreadServiceBuilder } from '@/lib/services/shared-member-thread-service';
```

### Service Methods Used
- `MemberSharedMemberThreadService.getById(threadId, signal)` - Fetch thread for authenticated members
- `PublicSharedMemberThreadServiceBuilder(token).getById(threadId, signal)` - Fetch thread for public access

## Best Practices

### 1. Access Context Awareness
```typescript
// ✅ Good: Use appropriate hook for context
function ThreadViewer({ threadId, isPublicView }: { threadId: string; isPublicView: boolean }) {
  const memberQuery = useSharedMemberThreadById(threadId, { enabled: !isPublicView });
  const publicQuery = usePublicSharedMemberThreadById(threadId, { enabled: isPublicView });
  
  const thread = isPublicView ? publicQuery.data : memberQuery.data;
  const isLoading = isPublicView ? publicQuery.isLoading : memberQuery.isLoading;
  
  return isLoading ? <Loading /> : <ThreadDisplay thread={thread} />;
}

// ❌ Avoid: Using wrong hook for context
function BadThreadViewer({ threadId }: { threadId: string }) {
  // Don't use member hook in public context
  const { data } = useSharedMemberThreadById(threadId);
  return <ThreadDisplay thread={data} />;
}
```

### 2. Selective Data Usage
```typescript
// ✅ Good: Use selectors for specific data
function ThreadMessageList({ threadId }: { threadId: string }) {
  const { data: messages } = useSharedMemberThreadById(threadId, {
    select: thread => thread.messages,
  });
  
  return <MessageList messages={messages} />;
}
```

### 3. Loading State Management
```typescript
// ✅ Good: Handle all loading states
function ThreadLoader({ threadId }: { threadId: string }) {
  const { data: thread, isLoading, isFetching, error } = useSharedMemberThreadById(threadId);
  
  if (isLoading) return <InitialLoading />;
  if (error) return <ErrorDisplay error={error} />;
  
  return (
    <div>
      {isFetching && <RefreshIndicator />}
      <ThreadDisplay thread={thread} />
    </div>
  );
}
```

### 4. Conditional Enabling
```typescript
// ✅ Good: Combine enabled conditions properly
function ConditionalThread({ threadId, userCanView }: { threadId: string; userCanView: boolean }) {
  const { data: thread } = useSharedMemberThreadById(threadId, {
    enabled: userCanView, // Combines with internal auth check
  });
  
  return thread ? <ThreadDisplay thread={thread} /> : <AccessDenied />;
}
```