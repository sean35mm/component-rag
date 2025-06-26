# Source Group Service API Documentation

## Purpose

The `SourceGroupService` provides CRUD operations for managing source groups through private API endpoints. This service handles source group listing with pagination and sorting, creation, updates, and deletion. It follows our service architecture pattern of providing simple, focused methods that return raw API responses without transformation or error handling.

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getList` | `params: GetSourceGroupsListParams`, `signal?: AbortSignal` | `Promise<SourceGroupsResponse>` | Retrieves paginated list of source groups with sorting |
| `create` | `dto: CreateSourceGroupDto`, `signal?: AbortSignal` | `Promise<SourceGroup>` | Creates a new source group |
| `delete` | `id: SourceGroup['id']`, `signal?: AbortSignal` | `Promise<SourceGroup>` | Deletes a source group by ID |
| `update` | `dto: UpdateSourceGroupDto`, `signal?: AbortSignal` | `Promise<SourceGroup>` | Updates an existing source group |

## Authentication

This service uses the `PrivateApiServiceWrapper` which handles:

- **Credential Management**: Automatically includes authentication headers for private API access
- **Authorization**: Ensures requests are made with proper user credentials
- **Session Handling**: Manages authentication state and token refresh

All methods require valid authentication credentials to access the private API endpoints.

## Error Handling

Following our service architecture guidelines:

- **No Service-Level Error Handling**: Methods do not catch or transform errors
- **Raw HTTP Exceptions**: Non-2xx responses throw `HttpException` instances
- **Query Hook Integration**: Error handling is delegated to TanStack Query hooks
- **Abort Signal Support**: All methods support request cancellation via `AbortSignal`

## Usage Examples

### Basic CRUD Operations

```typescript
import { SourceGroupService } from '@/lib/services/source-group-service';

// List source groups with pagination
const sourceGroups = await SourceGroupService.getList({
  page: 1,
  limit: 10,
  sortBy: 'name',
  sortOrder: 'asc'
});

// Create a new source group
const newSourceGroup = await SourceGroupService.create({
  name: 'Marketing Sources',
  description: 'Sources for marketing campaigns'
});

// Update an existing source group
const updatedSourceGroup = await SourceGroupService.update({
  id: 'source-group-123',
  name: 'Updated Marketing Sources',
  description: 'Updated description'
});

// Delete a source group
const deletedSourceGroup = await SourceGroupService.delete('source-group-123');
```

### With Abort Signal for Request Cancellation

```typescript
const controller = new AbortController();

try {
  const sourceGroups = await SourceGroupService.getList(
    { page: 1, limit: 20 },
    controller.signal
  );
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Request was cancelled');
  }
}

// Cancel the request
controller.abort();
```

### Integration with TanStack Query

```typescript
// In a query hook
export const useSourceGroups = (params: GetSourceGroupsListParams) => {
  return useQuery({
    queryKey: ['sourceGroups', params],
    queryFn: ({ signal }) => SourceGroupService.getList(params, signal),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// In a mutation hook
export const useCreateSourceGroup = () => {
  return useMutation({
    mutationFn: (dto: CreateSourceGroupDto) => SourceGroupService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sourceGroups'] });
    },
  });
};
```

## Related Types

### Request Types

```typescript
// Pagination and sorting parameters
type GetSourceGroupsListParams = PaginationSort<
  Pick<SourceGroup, 'createdAt' | 'name'>
>;

// DTO types for mutations
interface CreateSourceGroupDto {
  name: string;
  description?: string;
}

interface UpdateSourceGroupDto {
  id: string;
  name?: string;
  description?: string;
}
```

### Response Types

```typescript
// Individual source group entity
interface SourceGroup {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

// Paginated list response
interface SourceGroupsResponse {
  data: SourceGroup[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

### Utility Types

```typescript
// Base pagination and sorting interface
interface PaginationSort<T> {
  page?: number;
  limit?: number;
  sortBy?: keyof T;
  sortOrder?: 'asc' | 'desc';
}
```

## Dependencies

- **`PrivateApiServiceWrapper`**: Provides authenticated API client with credential management
- **`@/lib/dto`**: Data Transfer Object types for request payloads
- **`@/lib/types`**: Core type definitions for entities and responses

## Integration

### TanStack Query Integration

This service is designed to integrate seamlessly with TanStack Query hooks:

```typescript
// Query integration
const { data, error, isLoading } = useQuery({
  queryKey: ['sourceGroups', params],
  queryFn: ({ signal }) => SourceGroupService.getList(params, signal),
});

// Mutation integration
const createMutation = useMutation({
  mutationFn: SourceGroupService.create,
  onSuccess: (data) => {
    // Handle successful creation
    queryClient.setQueryData(['sourceGroup', data.id], data);
  },
});
```

### Response Handling

The service handles different response structures:

- **List/Create operations**: Return data directly from response
- **Update/Delete operations**: Extract data from nested response structure (`response.data`)

## Best Practices

### Service Architecture Adherence

✅ **Simple, focused methods**: Each method handles a single CRUD operation  
✅ **No error handling**: Errors bubble up to query hooks  
✅ **No data transformation**: Returns raw API responses  
✅ **Proper credential management**: Uses `PrivateApiServiceWrapper`  
✅ **HTTP Exception pattern**: Allows natural exception flow  

### Usage Guidelines

- **Always use with TanStack Query**: Don't call service methods directly in components
- **Leverage abort signals**: Pass through abort signals for request cancellation
- **Handle errors in hooks**: Use query/mutation error handling, not service-level try/catch
- **Cache invalidation**: Invalidate relevant queries after mutations

### Performance Considerations

- **Request cancellation**: All methods support `AbortSignal` for cleanup
- **Pagination**: Use appropriate page sizes for list operations
- **Caching**: Leverage TanStack Query caching with proper cache keys