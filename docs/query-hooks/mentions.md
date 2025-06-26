# Mentions Query Hooks

## Purpose

The mentions query hooks manage entity mention explanations in the application. These hooks provide functionality to fetch detailed explanations for specific entity mentions, supporting both single and batch operations with proper caching and error handling.

## Hooks Overview

| Hook | Type | Purpose | Suspense |
|------|------|---------|----------|
| `useMention` | Query | Fetches explanation for a single entity mention | No |
| `useMentionSuspense` | Query | Fetches explanation for a single entity mention with Suspense | Yes |
| `useMentionsList` | Query | Fetches explanations for multiple entity mentions in parallel | No |

## Query Hooks

### `useMention`

Fetches explanation for a single entity mention using standard query behavior.

**Parameters:**
- `params: GetEntityMentionExplanationParams` - Parameters for the mention explanation request
- `options?: UseQueryOptions<string, T>` - Optional query configuration with selector support

**Returns:** `UseQueryResult<T, Error>` where T defaults to `string`

### `useMentionSuspense`

Fetches explanation for a single entity mention with Suspense support for better loading states.

**Parameters:**
- `params: GetEntityMentionExplanationParams` - Parameters for the mention explanation request
- `options?: UseSuspenseQueryOptions<string, T>` - Optional suspense query configuration

**Returns:** `UseSuspenseQueryResult<T, Error>` where T defaults to `string`

### `useMentionsList`

Fetches explanations for multiple entity mentions in parallel using `useQueries`.

**Parameters:**
- `params: GetEntityMentionExplanationParams[]` - Array of parameters for multiple mention requests
- `options?: UseSuspenseQueryOptions<string, T>` - Optional query configuration applied to all queries

**Returns:** `UseQueryResult<T, Error>[]` - Array of query results

## Query Keys

Query keys are managed using `@lukemorales/query-key-factory` through the centralized query keys system:

```typescript
// Query key structure
queryKeys.mentions.getMention(params)
// Generates consistent, hierarchical keys for mention queries
```

The query key factory ensures:
- Consistent key generation across all mention queries
- Proper cache invalidation capabilities
- Type-safe parameter handling

## Usage Examples

### Basic Mention Explanation

```typescript
import { useMention } from '@/lib/query-hooks/mentions';

function MentionExplanation({ entityId, mentionId }: { entityId: string; mentionId: string }) {
  const { data: explanation, isLoading, error } = useMention({
    entityId,
    mentionId
  });

  if (isLoading) return <div>Loading explanation...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="mention-explanation">
      <p>{explanation}</p>
    </div>
  );
}
```

### Suspense-Based Loading

```typescript
import { useMentionSuspense } from '@/lib/query-hooks/mentions';

function MentionExplanationSuspense({ entityId, mentionId }: { entityId: string; mentionId: string }) {
  // No loading state needed - handled by Suspense boundary
  const { data: explanation } = useMentionSuspense({
    entityId,
    mentionId
  });

  return (
    <div className="mention-explanation">
      <p>{explanation}</p>
    </div>
  );
}

// Usage with Suspense boundary
function MentionContainer() {
  return (
    <Suspense fallback={<div>Loading explanation...</div>}>
      <MentionExplanationSuspense entityId="123" mentionId="456" />
    </Suspense>
  );
}
```

### Batch Mention Explanations

```typescript
import { useMentionsList } from '@/lib/query-hooks/mentions';

function MentionsList({ mentions }: { mentions: Array<{ entityId: string; mentionId: string }> }) {
  const mentionQueries = useMentionsList(mentions);

  return (
    <div className="mentions-list">
      {mentionQueries.map((query, index) => (
        <div key={`${mentions[index].entityId}-${mentions[index].mentionId}`}>
          {query.isLoading ? (
            <div>Loading...</div>
          ) : query.error ? (
            <div>Error: {query.error.message}</div>
          ) : (
            <p>{query.data}</p>
          )}
        </div>
      ))}
    </div>
  );
}
```

### With Custom Options

```typescript
import { useMention } from '@/lib/query-hooks/mentions';

function MentionWithOptions({ entityId, mentionId }: { entityId: string; mentionId: string }) {
  const { data: explanation } = useMention(
    { entityId, mentionId },
    {
      enabled: !!entityId && !!mentionId,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 3,
      refetchOnWindowFocus: false
    }
  );

  return <div>{explanation}</div>;
}
```

## Selector Support

All mention hooks support selector functions for data transformation:

### Transform Explanation Data

```typescript
import { useMention } from '@/lib/query-hooks/mentions';

interface ParsedExplanation {
  summary: string;
  details: string[];
  confidence: number;
}

function MentionWithSelector({ entityId, mentionId }: { entityId: string; mentionId: string }) {
  const { data: parsedExplanation } = useMention(
    { entityId, mentionId },
    {
      select: (explanation: string): ParsedExplanation => {
        // Transform raw explanation string into structured data
        const lines = explanation.split('\n');
        return {
          summary: lines[0] || '',
          details: lines.slice(1).filter(Boolean),
          confidence: 0.95 // Example transformation
        };
      }
    }
  );

  return (
    <div>
      <h3>{parsedExplanation?.summary}</h3>
      <ul>
        {parsedExplanation?.details.map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>
      <p>Confidence: {parsedExplanation?.confidence}</p>
    </div>
  );
}
```

### Extract Specific Information

```typescript
import { useMentionSuspense } from '@/lib/query-hooks/mentions';

function MentionSummary({ entityId, mentionId }: { entityId: string; mentionId: string }) {
  const { data: summary } = useMentionSuspense(
    { entityId, mentionId },
    {
      select: (explanation: string) => {
        // Extract only the first sentence as summary
        return explanation.split('.')[0] + '.';
      }
    }
  );

  return <p className="mention-summary">{summary}</p>;
}
```

## Caching Strategy

### Cache Behavior

- **Cache Key**: Based on entity ID and mention ID parameters
- **Stale Time**: Uses TanStack Query defaults (0ms)
- **Cache Time**: Uses TanStack Query defaults (5 minutes)
- **Background Refetch**: Enabled by default

### Cache Invalidation

```typescript
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';

function useMentionActions() {
  const queryClient = useQueryClient();

  const invalidateMention = (params: GetEntityMentionExplanationParams) => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.mentions.getMention(params).queryKey
    });
  };

  const invalidateAllMentions = () => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.mentions._def
    });
  };

  return { invalidateMention, invalidateAllMentions };
}
```

### Prefetching Mentions

```typescript
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { MentionService } from '@/lib/services/mention-service';

function useMentionPrefetch() {
  const queryClient = useQueryClient();

  const prefetchMention = async (params: GetEntityMentionExplanationParams) => {
    await queryClient.prefetchQuery({
      ...queryKeys.mentions.getMention(params),
      queryFn: ({ signal }) => MentionService.getEntityMentionExplanation(params, signal)
    });
  };

  return { prefetchMention };
}
```

## Error Handling

### Service Integration

The hooks integrate with `MentionService` which throws `HttpException` for proper error handling:

```typescript
// Service throws HttpException
MentionService.getEntityMentionExplanation(params, signal)
  .catch(error => {
    // HttpException with structured error information
    throw new HttpException(error.message, error.status);
  });
```

### Error Boundaries

```typescript
import { useMention } from '@/lib/query-hooks/mentions';

function MentionWithErrorHandling({ entityId, mentionId }: { entityId: string; mentionId: string }) {
  const { data, error, isError } = useMention({ entityId, mentionId });

  if (isError) {
    return (
      <div className="error-state">
        <h3>Failed to load mention explanation</h3>
        <p>{error?.message || 'Unknown error occurred'}</p>
      </div>
    );
  }

  return <div>{data}</div>;
}
```

### Retry Configuration

```typescript
import { useMention } from '@/lib/query-hooks/mentions';

function MentionWithRetry({ entityId, mentionId }: { entityId: string; mentionId: string }) {
  const { data } = useMention(
    { entityId, mentionId },
    {
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
    }
  );

  return <div>{data}</div>;
}
```

## Related Services

### MentionService

The hooks integrate with `MentionService` located at `@/lib/services/mention-service`:

```typescript
// Service interface
interface MentionService {
  getEntityMentionExplanation(
    params: GetEntityMentionExplanationParams,
    signal?: AbortSignal
  ): Promise<string>;
}
```

### Service Parameters

```typescript
interface GetEntityMentionExplanationParams {
  entityId: string;
  mentionId: string;
  // Additional parameters as defined by the service
}
```

## Best Practices

### 1. Parameter Validation

```typescript
import { useMention } from '@/lib/query-hooks/mentions';

function MentionComponent({ entityId, mentionId }: { entityId?: string; mentionId?: string }) {
  const { data } = useMention(
    { entityId: entityId!, mentionId: mentionId! },
    {
      enabled: !!entityId && !!mentionId // Prevent query when params are missing
    }
  );

  if (!entityId || !mentionId) {
    return <div>Missing required parameters</div>;
  }

  return <div>{data}</div>;
}
```

### 2. Suspense vs Standard Queries

- Use `useMentionSuspense` for components that should suspend during loading
- Use `useMention` for components that need to handle loading states manually
- Use `useMentionsList` for batch operations with individual error handling

### 3. Efficient Batch Loading

```typescript
import { useMentionsList } from '@/lib/query-hooks/mentions';

function OptimizedMentionsList({ mentions }: { mentions: Array<{ entityId: string; mentionId: string }> }) {
  // Only create queries for unique mention combinations
  const uniqueMentions = useMemo(() => {
    const seen = new Set();
    return mentions.filter(mention => {
      const key = `${mention.entityId}-${mention.mentionId}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [mentions]);

  const mentionQueries = useMentionsList(uniqueMentions);

  return (
    <div>
      {mentionQueries.map((query, index) => (
        <div key={`${uniqueMentions[index].entityId}-${uniqueMentions[index].mentionId}`}>
          {query.data}
        </div>
      ))}
    </div>
  );
}
```

### 4. Abort Signal Handling

The hooks automatically handle abort signals through TanStack Query's built-in cancellation mechanism, ensuring proper cleanup when components unmount or queries are superseded.