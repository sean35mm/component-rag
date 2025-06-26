# SavedSharedMemberThreadService

## Purpose

The `SavedSharedMemberThreadService` manages saved shared member threads through a RESTful API. This service handles CRUD operations for threads that members have saved and shared, including listing with pagination and filtering, individual thread retrieval, creation, updates, and deletion. The service integrates with the private API infrastructure and follows our service architecture patterns for seamless integration with TanStack Query hooks.

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getList` | `params: GetSavedSharedMemberThreadsListParams`, `signal?: AbortSignal` | `Promise<SliceResult<SavedSharedMemberThread>>` | Retrieves paginated list of saved shared member threads with optional filtering |
| `getById` | `threadUuid: string`, `signal?: AbortSignal` | `Promise<SavedSharedMemberThread>` | Retrieves a specific saved shared member thread by UUID |
| `create` | `dto: CreateSavedSharedMemberThreadDto`, `signal?: AbortSignal` | `Promise<SavedSharedMemberThread>` | Creates a new saved shared member thread |
| `update` | `data: { uuid: string; dto: UpdateSavedSharedMemberThreadDto }`, `signal?: AbortSignal` | `Promise<SavedSharedMemberThread>` | Updates an existing saved shared member thread |
| `delete` | `uuid: string`, `signal?: AbortSignal` | `Promise<SavedSharedMemberThread>` | Deletes a saved shared member thread |

## Authentication

This service uses the `PrivateApiServiceWrapper` which handles:
- **Automatic credential management**: Authentication tokens are automatically attached to requests
- **Private API access**: Requires valid member authentication
- **Session handling**: Manages authentication state and token refresh

No manual credential handling is required when using this service.

## Error Handling

The service follows our **HttpException pattern**:
- **No internal error handling**: Methods throw exceptions for non-2xx HTTP responses
- **HttpException throwing**: All HTTP errors are converted to `HttpException` instances by the wrapper
- **AbortSignal support**: All methods support request cancellation via `AbortSignal`
- **Error delegation**: Error handling is delegated to TanStack Query hooks and consuming components

## Usage Examples

### Basic CRUD Operations

```typescript
import { SavedSharedMemberThreadService } from '@/lib/services/saved-shared-member-thread-service';

// Get paginated list with filtering
const threads = await SavedSharedMemberThreadService.getList({
  page: 1,
  limit: 20,
  sortBy: 'createdAt',
  sortOrder: 'desc',
  folderIsNull: true
});

// Get specific thread
const thread = await SavedSharedMemberThreadService.getById('thread-uuid-123');

// Create new thread
const newThread = await SavedSharedMemberThreadService.create({
  title: 'My Shared Thread',
  content: 'Thread content...',
  isPublic: true
});

// Update existing thread
const updatedThread = await SavedSharedMemberThreadService.update({
  uuid: 'thread-uuid-123',
  dto: {
    title: 'Updated Thread Title',
    isPublic: false
  }
});

// Delete thread
const deletedThread = await SavedSharedMemberThreadService.delete('thread-uuid-123');
```

### With AbortSignal

```typescript
const controller = new AbortController();

try {
  const threads = await SavedSharedMemberThreadService.getList(
    { page: 1, limit: 10 },
    controller.signal
  );
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Request was cancelled');
  }
}

// Cancel request
controller.abort();
```

### Integration with TanStack Query

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SavedSharedMemberThreadService } from '@/lib/services/saved-shared-member-thread-service';

// Query hook for list
const useSavedSharedMemberThreads = (params: GetSavedSharedMemberThreadsListParams) => {
  return useQuery({
    queryKey: ['savedSharedMemberThreads', params],
    queryFn: ({ signal }) => SavedSharedMemberThreadService.getList(params, signal),
  });
};

// Mutation hook for creation
const useCreateSavedSharedMemberThread = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: SavedSharedMemberThreadService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedSharedMemberThreads'] });
    },
  });
};
```

## Related Types

### Core Types

```typescript
// Main entity type
interface SavedSharedMemberThread {
  uuid: string;
  title: string;
  content: string;
  isPublic: boolean;
  folderId?: string;
  createdAt: string;
  updatedAt: string;
  // ... other properties
}

// Pagination and sorting
interface SliceResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

interface PaginationSort<T> {
  page?: number;
  limit?: number;
  sortBy?: keyof T;
  sortOrder?: 'asc' | 'desc';
}
```

### Request/Response Types

```typescript
// List parameters
interface GetSavedSharedMemberThreadsListParams extends PaginationSort<SavedSharedMemberThread> {
  folderIsNull?: boolean; // Filter threads without folder assignment
}

// DTO types for mutations
interface CreateSavedSharedMemberThreadDto {
  title: string;
  content: string;
  isPublic: boolean;
  folderId?: string;
}

interface UpdateSavedSharedMemberThreadDto {
  title?: string;
  content?: string;
  isPublic?: boolean;
  folderId?: string;
}
```

## Dependencies

- **`PrivateApiServiceWrapper`**: Provides authenticated API client with credential management
- **DTOs**: `CreateSavedSharedMemberThreadDto`, `UpdateSavedSharedMemberThreadDto`
- **Types**: `PaginationSort`, `SavedSharedMemberThread`, `SliceResult`

## Integration

### TanStack Query Integration

This service is designed for seamless integration with TanStack Query:

```typescript
// Automatic request cancellation
const { data, isLoading } = useQuery({
  queryKey: ['savedSharedMemberThread', threadId],
  queryFn: ({ signal }) => SavedSharedMemberThreadService.getById(threadId, signal),
});

// Optimistic updates
const mutation = useMutation({
  mutationFn: SavedSharedMemberThreadService.update,
  onMutate: async (variables) => {
    // Optimistic update logic
  },
});
```

### Error Boundary Integration

```typescript
// Errors automatically bubble up to error boundaries
const ErrorBoundaryWrapper = () => {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <SavedSharedMemberThreadList />
    </ErrorBoundary>
  );
};
```

## Best Practices

### Service Architecture Adherence

✅ **Simple, focused methods**: Each method handles a single CRUD operation  
✅ **No error handling**: Exceptions bubble up to query hooks  
✅ **No data transformation**: Returns raw API responses  
✅ **Proper credential management**: Uses `PrivateApiServiceWrapper`  
✅ **HTTP Exception pattern**: Non-2xx responses throw `HttpException`

### Usage Guidelines

- **Always use with TanStack Query**: Don't call service methods directly in components
- **Leverage AbortSignal**: Pass through from query hooks for proper cancellation
- **Handle pagination**: Use `SliceResult` properties for pagination UI
- **Implement optimistic updates**: Use mutation hooks with cache updates
- **Error boundaries**: Implement proper error boundary patterns for HttpExceptions

### Performance Considerations

- **Request deduplication**: TanStack Query automatically deduplicates identical requests
- **Background refetching**: Configure appropriate stale times for optimal UX
- **Infinite queries**: Consider `useInfiniteQuery` for large thread lists
- **Cache invalidation**: Properly invalidate related queries on mutations