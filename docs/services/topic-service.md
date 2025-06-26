# Topic Service

## Purpose

The Topic Service manages topic-related API operations, providing both private and public access to topic data. It handles topic listing and search functionality with support for filtering by name, category, and subcategory. The service follows our architecture pattern by exposing simple, focused methods that return raw API responses without transformation or error handling.

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getTopicsList` | `params: GetTopicListParams`, `signal?: AbortSignal` | `Promise<CustomSearchResult<Topic>>` | Retrieves a paginated list of topics with optional filtering |

### GetTopicListParams Interface

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `string` | No | Filter topics by name |
| `category` | `string` | No | Filter topics by category |
| `subcategory` | `string` | No | Filter topics by subcategory |
| `size` | `number` | No | Number of items per page |
| `page` | `number` | No | Page number for pagination |

## Authentication

- **TopicService**: Uses `PrivateApiServiceWrapper` - requires authentication credentials for private API access
- **PublicTopicServiceBuilder**: Uses `PublicPlatformApiServiceWrapper` - provides public access without authentication requirements

The service automatically handles credential management through the wrapper pattern, ensuring proper authentication headers are included for private API calls.

## Error Handling

Following our service architecture patterns, this service does **not** handle errors internally. All error handling is delegated to the query layer:

- **Non-2xx HTTP responses**: Automatically throw `HttpException` via the Fetch utility
- **Network errors**: Propagated to calling code (query hooks)
- **Validation errors**: Handled by TypeScript type checking at compile time

## Usage Examples

### Private Topic Service Usage

```tsx
import { TopicService } from '@/lib/services/topic-service';

// Basic topic listing
const topics = await TopicService.getTopicsList({
  size: 20,
  page: 1
});

// Filtered topic search
const filteredTopics = await TopicService.getTopicsList({
  name: 'javascript',
  category: 'programming',
  size: 10
});

// With abort signal for cancellation
const controller = new AbortController();
const topics = await TopicService.getTopicsList(
  { category: 'design' },
  controller.signal
);
```

### Public Topic Service Usage

```tsx
import { PublicTopicServiceBuilder } from '@/lib/services/topic-service';

// Build public service instance
const PublicTopicService = PublicTopicServiceBuilder();

// Use public service for unauthenticated requests
const publicTopics = await PublicTopicService.getTopicsList({
  category: 'general',
  size: 15
});
```

### Integration with TanStack Query

```tsx
import { useQuery } from '@tanstack/react-query';
import { TopicService } from '@/lib/services/topic-service';

// Query hook usage
const useTopicsList = (params: GetTopicListParams) => {
  return useQuery({
    queryKey: ['topics', 'list', params],
    queryFn: ({ signal }) => TopicService.getTopicsList(params, signal),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Component usage
const TopicsListComponent = () => {
  const { data, error, isLoading } = useTopicsList({
    category: 'technology',
    size: 20
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {data?.results.map(topic => (
        <div key={topic.id}>{topic.name}</div>
      ))}
    </div>
  );
};
```

## Related Types

### Core Types

```tsx
// Topic entity type
interface Topic {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  description?: string;
  // Additional topic properties...
}

// Search result wrapper
interface CustomSearchResult<T> {
  results: T[];
  total: number;
  page: number;
  size: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Request parameters
interface GetTopicListParams {
  name?: string;
  category?: string;
  subcategory?: string;
  size?: number;
  page?: number;
}
```

## Dependencies

### Service Wrappers

- **`PrivateApiServiceWrapper`**: Wraps actions with authentication for private API access
- **`PublicPlatformApiServiceWrapper`**: Provides public API access without authentication

### Utilities

- **`Fetch`**: HTTP client utility that handles request/response cycle and throws `HttpException` for non-2xx responses

### Type Imports

- **`CustomSearchResult<T>`**: Generic search result interface from `@/lib/types`
- **`Topic`**: Topic entity type from `@/lib/types`

## Integration

### Query Layer Integration

The service integrates seamlessly with TanStack Query hooks:

```tsx
// Query keys follow consistent pattern
const queryKeys = {
  topics: ['topics'] as const,
  topicsList: (params: GetTopicListParams) => [...queryKeys.topics, 'list', params] as const,
};

// Query hook with proper error handling
const useTopicsListQuery = (params: GetTopicListParams) => {
  return useQuery({
    queryKey: queryKeys.topicsList(params),
    queryFn: ({ signal }) => TopicService.getTopicsList(params, signal),
    retry: (failureCount, error) => {
      // Custom retry logic based on error type
      return failureCount < 3 && error.status !== 404;
    },
  });
};
```

### Mutation Support

```tsx
// Although not in current implementation, mutation patterns would follow:
const useTopicMutation = () => {
  return useMutation({
    mutationFn: (data: CreateTopicRequest) => TopicService.createTopic(data),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.topics });
    },
  });
};
```

## Best Practices

### Service Architecture Adherence

✅ **Simple, focused methods**: Single responsibility per method
✅ **No error handling**: Errors propagated to query layer
✅ **No data transformation**: Raw API responses returned
✅ **Proper credential management**: Uses appropriate service wrappers
✅ **HTTP Exception pattern**: Automatic via Fetch utility

### Usage Recommendations

1. **Always use AbortSignal**: Pass query abort signals for proper cancellation
2. **Consistent query keys**: Use structured query key patterns for cache management
3. **Type safety**: Leverage TypeScript interfaces for compile-time validation
4. **Public vs Private**: Choose appropriate service variant based on authentication needs

### Anti-patterns to Avoid

❌ **Don't transform data in service**: Handle transformations in components or hooks
❌ **Don't catch errors in service**: Let query hooks handle error states
❌ **Don't mix authentication types**: Use consistent service wrapper for related operations
❌ **Don't ignore AbortSignal**: Always support request cancellation