# Public Answers Threads Query Hooks

## Purpose

The public answers threads query hooks provide state management for anonymous/public access to the answers system. These hooks handle thread listing, individual thread retrieval with messages, next-step recommendation generation, and thread creation for public users without authentication requirements.

## Hooks Overview

| Hook | Type | Purpose |
|------|------|---------|
| `usePublicAnswersThreads` | Query | Fetch list of public answer threads |
| `usePublicAnswersThreadById` | Query | Fetch specific thread with messages by ID |
| `usePublicCreateNextStepRecommendations` | Mutation | Generate AI-powered next step suggestions |
| `usePublicCreateChatThread` | Mutation | Create new public answer thread |

## Query Hooks

### usePublicAnswersThreads

Fetches a list of public answer threads available to anonymous users.

```tsx
function usePublicAnswersThreads<T = AnswersThread[]>(
  options?: UseQueryOptions<AnswersThread[], T>
): UseQueryResult<T>
```

**Features:**
- Automatically enabled only when user has public access token
- Returns array of `AnswersThread` objects
- Supports custom selector functions for data transformation
- Proper query key management for cache consistency

**Query Key Structure:**
```tsx
queryKeys.publicAnswersThreads.getList(token)
```

### usePublicAnswersThreadById

Fetches a specific answer thread with its complete message history.

```tsx
function usePublicAnswersThreadById<T = AnswersThreadWithMessages>(
  id: string,
  options?: UseQueryOptions<AnswersThreadWithMessages, T>
): UseQueryResult<T>
```

**Features:**
- Requires thread ID parameter
- Returns thread with full message conversation
- Automatically disabled if no public access token
- Supports data transformation through selector functions

**Query Key Structure:**
```tsx
queryKeys.publicAnswersThreads.getById(token, id)
```

## Mutation Hooks

### usePublicCreateNextStepRecommendations

Generates AI-powered next step recommendations for a specific message in a thread.

```tsx
function usePublicCreateNextStepRecommendations(): UseMutationResult<
  Suggestions,
  Error,
  { messageId: string; token: string }
>
```

**Features:**
- Integrates with `useAnswersThreadChatStore` for real-time UI updates
- Optimistic updates with loading states
- Automatic cache invalidation on success
- Proper error handling with state cleanup

**State Management Integration:**
- Sets pending state during mutation
- Updates answer suggestions on success
- Clears pending state on completion/error

### usePublicCreateChatThread

Creates a new public answer thread with initial message.

```tsx
function usePublicCreateChatThread(
  options?: UseMutationOptions<
    AnswersThreadWithMessages,
    CreateThreadDto & { token: string }
  >
): UseMutationResult<AnswersThreadWithMessages, Error, CreateThreadDto & { token: string }>
```

**Features:**
- Accepts `CreateThreadDto` with token
- Returns complete thread with messages
- Invalidates both list and individual thread caches
- Supports custom mutation options

## Query Keys

Query keys are managed using `@lukemorales/query-key-factory` for consistency:

```tsx
// Base structure
queryKeys.publicAnswersThreads._def

// Thread list
queryKeys.publicAnswersThreads.getList(token)

// Individual thread
queryKeys.publicAnswersThreads.getById(token, id)

// Mutation keys
[...queryKeys.publicAnswersThreads._def, 'createSuggestion']
[...queryKeys.publicAnswersThreads._def, 'create']
```

## Usage Examples

### Basic Thread Listing

```tsx
function PublicThreadsList() {
  const { data: threads, isLoading, error } = usePublicAnswersThreads();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      {threads?.map(thread => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}
    </div>
  );
}
```

### Thread Detail with Messages

```tsx
function PublicThreadDetail({ threadId }: { threadId: string }) {
  const { 
    data: thread, 
    isLoading, 
    error 
  } = usePublicAnswersThreadById(threadId, {
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) return <ThreadSkeleton />;
  if (error) return <ErrorBoundary error={error} />;

  return (
    <div>
      <ThreadHeader thread={thread} />
      <MessagesList messages={thread.messages} />
    </div>
  );
}
```

### Creating New Thread

```tsx
function CreateThreadForm() {
  const createThread = usePublicCreateChatThread({
    onSuccess: (thread) => {
      toast.success('Thread created successfully');
      navigate(`/threads/${thread.id}`);
    },
    onError: (error) => {
      toast.error('Failed to create thread');
    },
  });

  const handleSubmit = (data: CreateThreadDto) => {
    const { token } = useAccessToken();
    createThread.mutate({
      ...data,
      token: token?.token || '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button 
        type="submit" 
        disabled={createThread.isPending}
      >
        {createThread.isPending ? 'Creating...' : 'Create Thread'}
      </button>
    </form>
  );
}
```

### Next Step Recommendations

```tsx
function MessageWithSuggestions({ messageId }: { messageId: string }) {
  const generateSuggestions = usePublicCreateNextStepRecommendations();
  const { token } = useAccessToken();

  const handleGenerateSuggestions = () => {
    generateSuggestions.mutate({
      messageId,
      token: token?.token || '',
    });
  };

  return (
    <div>
      <MessageContent messageId={messageId} />
      <button 
        onClick={handleGenerateSuggestions}
        disabled={generateSuggestions.isPending}
      >
        {generateSuggestions.isPending ? 'Generating...' : 'Get Suggestions'}
      </button>
    </div>
  );
}
```

## Selector Support

### Transforming Thread Data

```tsx
// Extract only essential thread information
const { data: threadSummaries } = usePublicAnswersThreads({
  select: (threads) => threads.map(thread => ({
    id: thread.id,
    title: thread.title,
    createdAt: thread.createdAt,
    messageCount: thread.messageCount,
  })),
});

// Filter threads by criteria
const { data: recentThreads } = usePublicAnswersThreads({
  select: (threads) => threads.filter(
    thread => new Date(thread.createdAt) > subDays(new Date(), 7)
  ),
});
```

### Processing Thread Messages

```tsx
// Extract conversation flow
const { data: conversationFlow } = usePublicAnswersThreadById(threadId, {
  select: (thread) => ({
    title: thread.title,
    messages: thread.messages.map(msg => ({
      role: msg.role,
      content: msg.content,
      timestamp: msg.createdAt,
    })),
  }),
});

// Get latest message
const { data: latestMessage } = usePublicAnswersThreadById(threadId, {
  select: (thread) => thread.messages[thread.messages.length - 1],
});
```

## Caching Strategy

### Cache Invalidation

```tsx
// Thread creation invalidates:
// 1. Thread list cache
queryKeys.publicAnswersThreads.getList._def

// 2. Specific thread cache
[...queryKeys.publicAnswersThreads.getById._def, thread.id]

// Suggestion generation invalidates:
queryKeys.publicAnswersThreads.getById._def
```

### Optimistic Updates

```tsx
// Next step recommendations use optimistic UI updates:
// 1. onMutate: Set loading state immediately
// 2. onSuccess: Update suggestions and clear loading
// 3. onError: Clear loading state without updating data
```

### Stale Time Configuration

```tsx
const { data } = usePublicAnswersThreads({
  staleTime: 10 * 60 * 1000, // 10 minutes for thread list
});

const { data } = usePublicAnswersThreadById(id, {
  staleTime: 5 * 60 * 1000, // 5 minutes for thread details
});
```

## Error Handling

### Service Integration

All hooks rely on `PublicAnswersServiceBuilder` which throws `HttpException` instances that TanStack Query handles automatically:

```tsx
// Service errors are automatically caught and exposed through:
const { error, isError } = usePublicAnswersThreads();

// Error boundaries can catch unhandled errors
<ErrorBoundary>
  <PublicThreadsComponent />
</ErrorBoundary>
```

### Mutation Error Recovery

```tsx
const createThread = usePublicCreateChatThread({
  onError: (error, variables, context) => {
    // Log error for monitoring
    console.error('Thread creation failed:', error);
    
    // Show user-friendly message
    toast.error('Unable to create thread. Please try again.');
    
    // Optionally retry logic could be implemented here
  },
  retry: (failureCount, error) => {
    // Retry network errors up to 2 times
    return failureCount < 2 && error.message.includes('network');
  },
});
```

## Related Services

### PublicAnswersServiceBuilder

Primary service integration providing:
- `getList(signal)` - Fetch public threads
- `getById(id, signal)` - Fetch thread with messages  
- `createSuggestion(dto)` - Generate next step recommendations
- `create(dto)` - Create new thread

### Context Integration

**useAccessToken:**
- Provides public access token
- Determines if user has public access
- Enables/disables queries based on token availability

**useAnswersThreadChatStore:**
- Manages real-time chat state
- Updates suggestion loading states
- Handles optimistic UI updates

## Best Practices

### Token Management

```tsx
// Always check token availability before mutations
const { token, isPublic } = useAccessToken();

if (!isPublic || !token) {
  // Handle unauthenticated state
  return <AuthenticationRequired />;
}
```

### Query Enabling

```tsx
// Queries automatically disabled without public access
const { data } = usePublicAnswersThreads({
  enabled: customCondition && isPublic, // Chain additional conditions
});
```

### State Management Integration

```tsx
// Leverage store integration for real-time updates
const createSuggestions = usePublicCreateNextStepRecommendations();
const isPending = useAnswersThreadChatStore(
  state => state.getAnswerPending(messageId)
);
```

### Cache Optimization

```tsx
// Prefetch related data
const queryClient = useQueryClient();

const prefetchThread = (threadId: string) => {
  queryClient.prefetchQuery({
    ...queryKeys.publicAnswersThreads.getById(token, threadId),
    queryFn: ({ signal }) => 
      PublicAnswersServiceBuilder(token).getById(threadId, signal),
  });
};
```