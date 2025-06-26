# SavedDeepSearchService

## Purpose

The `SavedDeepSearchService` provides CRUD operations for managing saved deep search entities. This service handles all server-side interactions for creating, retrieving, updating, and deleting saved deep searches, including support for folder organization and pagination.

The service manages saved search configurations that users can store and reuse for deep search operations, with optional folder organization capabilities.

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getList` | `params: GetSavedDeepSearchListParams`, `signal: AbortSignal` | `Promise<CustomSearchResult<SavedDeepSearch>>` | Retrieves paginated list of saved deep searches with optional filtering |
| `getById` | `uuid: string`, `signal: AbortSignal` | `Promise<SavedDeepSearch>` | Fetches a single saved deep search by UUID |
| `create` | `dto: CreateSavedDeepSearchDto`, `signal?: AbortSignal` | `Promise<SavedDeepSearch>` | Creates a new saved deep search |
| `update` | `data: { uuid: string; dto: UpdateSavedDeepSearchDto }`, `signal?: AbortSignal` | `Promise<SavedDeepSearch>` | Updates an existing saved deep search |
| `delete` | `uuid: string`, `signal?: AbortSignal` | `Promise<SavedDeepSearch>` | Deletes a saved deep search by UUID |

## Authentication

This service uses the `PrivateApiServiceWrapper`, which automatically handles:
- **Authentication Required**: All endpoints require valid user authentication
- **Credential Management**: Automatically attaches authentication headers to requests
- **Session Handling**: Manages authentication state and token refresh

## Error Handling

Following our service architecture patterns:
- **No Internal Error Handling**: Service methods throw errors directly without catching
- **HttpException Pattern**: Non-2xx HTTP responses are thrown as HttpExceptions by the wrapper
- **Query Layer Responsibility**: Error handling is managed by TanStack Query hooks
- **AbortSignal Support**: All methods support request cancellation via AbortSignal

## Usage Examples

### Basic CRUD Operations

```typescript
import { SavedDeepSearchService } from '@/lib/services/saved-deep-search-service';

// Get paginated list with filtering
const searchResults = await SavedDeepSearchService.getList(
  {
    page: 1,
    limit: 20,
    sortBy: 'createdAt',
    sortOrder: 'desc',
    folderIsNull: true // Filter for searches not in any folder
  },
  signal
);

// Get specific saved search
const savedSearch = await SavedDeepSearchService.getById('uuid-123', signal);

// Create new saved search
const newSearch = await SavedDeepSearchService.create({
  name: 'My Deep Search',
  searchConfig: { /* search configuration */ },
  folderId: 'folder-uuid'
}, signal);

// Update existing search
const updatedSearch = await SavedDeepSearchService.update({
  uuid: 'uuid-123',
  dto: {
    name: 'Updated Search Name',
    searchConfig: { /* updated configuration */ }
  }
}, signal);

// Delete saved search
const deletedSearch = await SavedDeepSearchService.delete('uuid-123', signal);
```

### Integration with TanStack Query

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SavedDeepSearchService } from '@/lib/services/saved-deep-search-service';

// Query for saved searches list
const useSavedDeepSearchList = (params: GetSavedDeepSearchListParams) => {
  return useQuery({
    queryKey: ['savedDeepSearches', params],
    queryFn: ({ signal }) => SavedDeepSearchService.getList(params, signal),
  });
};

// Query for single saved search
const useSavedDeepSearch = (uuid: string) => {
  return useQuery({
    queryKey: ['savedDeepSearch', uuid],
    queryFn: ({ signal }) => SavedDeepSearchService.getById(uuid, signal),
    enabled: !!uuid,
  });
};

// Mutation for creating saved search
const useCreateSavedDeepSearch = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (dto: CreateSavedDeepSearchDto) => 
      SavedDeepSearchService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedDeepSearches'] });
    },
  });
};
```

## Related Types

### Request Types

```typescript
interface GetSavedDeepSearchListParams extends PaginationSort<SavedDeepSearch> {
  folderIsNull?: boolean; // Filter for searches without folder assignment
}

interface CreateSavedDeepSearchDto {
  name: string;
  searchConfig: object;
  folderId?: string;
  // Additional creation fields
}

interface UpdateSavedDeepSearchDto {
  name?: string;
  searchConfig?: object;
  folderId?: string;
  // Additional updateable fields
}
```

### Response Types

```typescript
interface SavedDeepSearch {
  uuid: string;
  name: string;
  searchConfig: object;
  folderId?: string;
  createdAt: string;
  updatedAt: string;
  // Additional entity fields
}

interface CustomSearchResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  // Additional pagination metadata
}

interface PaginationSort<T> {
  page?: number;
  limit?: number;
  sortBy?: keyof T;
  sortOrder?: 'asc' | 'desc';
}
```

## Dependencies

- **PrivateApiServiceWrapper**: Provides authenticated API client with automatic credential management
- **DTOs**: `CreateSavedDeepSearchDto`, `UpdateSavedDeepSearchDto` for request validation
- **Types**: `SavedDeepSearch`, `CustomSearchResult`, `PaginationSort` for type safety

## Integration

### Query Layer Integration

```typescript
// Query keys for cache management
const savedDeepSearchKeys = {
  all: ['savedDeepSearches'] as const,
  lists: () => [...savedDeepSearchKeys.all, 'list'] as const,
  list: (params: GetSavedDeepSearchListParams) => 
    [...savedDeepSearchKeys.lists(), params] as const,
  details: () => [...savedDeepSearchKeys.all, 'detail'] as const,
  detail: (uuid: string) => [...savedDeepSearchKeys.details(), uuid] as const,
};

// Cache invalidation patterns
const invalidateQueries = (queryClient: QueryClient) => ({
  all: () => queryClient.invalidateQueries({ queryKey: savedDeepSearchKeys.all }),
  lists: () => queryClient.invalidateQueries({ queryKey: savedDeepSearchKeys.lists() }),
  detail: (uuid: string) => 
    queryClient.invalidateQueries({ queryKey: savedDeepSearchKeys.detail(uuid) }),
});
```

### Folder Integration

```typescript
// Get searches not in any folder
const orphanedSearches = await SavedDeepSearchService.getList({
  folderIsNull: true,
  sortBy: 'name',
  sortOrder: 'asc'
}, signal);

// Move search to folder via update
const movedSearch = await SavedDeepSearchService.update({
  uuid: searchUuid,
  dto: { folderId: targetFolderId }
}, signal);
```

## Best Practices

### Service Architecture Adherence

- ✅ **Simple Methods**: Each method handles a single API operation
- ✅ **No Error Handling**: Errors bubble up to query hooks
- ✅ **Raw Responses**: Returns unmodified API response data
- ✅ **Proper Authentication**: Uses PrivateApiServiceWrapper for credential management
- ✅ **AbortSignal Support**: All methods support request cancellation

### Usage Patterns

```typescript
// ✅ Good: Let query hooks handle errors
const { data, error, isLoading } = useSavedDeepSearchList(params);

// ✅ Good: Use AbortSignal for cancellation
const { signal } = new AbortController();
const result = await SavedDeepSearchService.getList(params, signal);

// ✅ Good: Structure update data properly
const updateData = {
  uuid: searchUuid,
  dto: { name: newName, searchConfig: newConfig }
};
await SavedDeepSearchService.update(updateData, signal);

// ❌ Avoid: Don't wrap service calls in try-catch
// Service errors should be handled by query hooks
```

### Performance Considerations

- Use `folderIsNull` parameter for efficient folder-based filtering
- Implement proper pagination with `page` and `limit` parameters
- Leverage query key patterns for efficient cache invalidation
- Use AbortSignal to cancel requests when components unmount