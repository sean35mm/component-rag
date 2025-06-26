# SavedFiltersService

## Purpose

The `SavedFiltersService` provides CRUD operations for managing saved filter configurations. This service handles the creation, retrieval, updating, and deletion of user-defined filter presets, allowing users to save and reuse complex filter combinations across different sessions.

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getList` | `signal?: AbortSignal` | `Promise<SavedFiltersResponse>` | Retrieves all saved filters for the authenticated user |
| `create` | `dto: CreateSavedFilterDto, signal?: AbortSignal` | `Promise<SavedFilter>` | Creates a new saved filter configuration |
| `delete` | `id: string, signal?: AbortSignal` | `Promise<SavedFilter>` | Deletes a saved filter by ID |
| `update` | `dto: UpdateSavedFilterDto, signal?: AbortSignal` | `Promise<SavedFilter>` | Updates an existing saved filter configuration |

## Authentication

This service uses the `PrivateApiServiceWrapper`, which handles:
- **Automatic credential management**: Attaches authentication tokens to all requests
- **Session validation**: Ensures valid user session before making API calls
- **Token refresh**: Automatically refreshes expired tokens when needed

All endpoints require user authentication and operate on user-specific saved filters.

## Error Handling

Following our service architecture patterns, this service does not handle errors internally. All HTTP errors are thrown as `HttpException` instances and should be handled by:
- **Query hooks**: Primary error handling location
- **Component error boundaries**: UI-level error display
- **Global error handlers**: Application-wide error logging

Non-2xx HTTP responses will automatically throw `HttpException` with appropriate error details.

## Usage Examples

### Basic CRUD Operations

```typescript
// Get all saved filters
const filters = await SavedFiltersService.getList();

// Create a new saved filter
const newFilter = await SavedFiltersService.create({
  name: 'My Custom Filter',
  description: 'Filters for active projects',
  filters: {
    status: 'active',
    category: 'project'
  }
});

// Update an existing filter
const updatedFilter = await SavedFiltersService.update({
  id: 'filter-123',
  name: 'Updated Filter Name',
  filters: {
    status: 'completed',
    priority: 'high'
  }
});

// Delete a saved filter
const deletedFilter = await SavedFiltersService.delete('filter-123');
```

### With AbortSignal for Cancellation

```typescript
const controller = new AbortController();

// Cancel request if component unmounts
const filters = await SavedFiltersService.getList(controller.signal);

// Cleanup
controller.abort();
```

## Related Types

### Core Types

```typescript
interface SavedFilter {
  id: string;
  name: string;
  description?: string;
  filters: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

interface SavedFiltersResponse {
  data: SavedFilter[];
  total: number;
  page?: number;
  limit?: number;
}
```

### DTO Types

```typescript
interface CreateSavedFilterDto {
  name: string;
  description?: string;
  filters: Record<string, any>;
}

interface UpdateSavedFilterDto {
  id: string;
  name?: string;
  description?: string;
  filters?: Record<string, any>;
}
```

## Dependencies

- **`PrivateApiServiceWrapper`**: Provides authenticated API client with credential management
- **`CreateSavedFilterDto`**: Input validation for filter creation
- **`UpdateSavedFilterDto`**: Input validation for filter updates
- **`SavedFilter`**: Core entity type definition
- **`SavedFiltersResponse`**: List response type definition

## Integration

### TanStack Query Hooks

This service integrates seamlessly with TanStack Query hooks for optimal data management:

```typescript
// Query hook for fetching saved filters
export const useSavedFilters = () => {
  return useQuery({
    queryKey: ['savedFilters'],
    queryFn: ({ signal }) => SavedFiltersService.getList(signal),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Mutation hook for creating saved filters
export const useCreateSavedFilter = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (dto: CreateSavedFilterDto) => 
      SavedFiltersService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedFilters'] });
    },
  });
};

// Mutation hook for updating saved filters
export const useUpdateSavedFilter = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (dto: UpdateSavedFilterDto) => 
      SavedFiltersService.update(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedFilters'] });
    },
  });
};

// Mutation hook for deleting saved filters
export const useDeleteSavedFilter = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => SavedFiltersService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedFilters'] });
    },
  });
};
```

## Best Practices

### Service Architecture Adherence

✅ **Simple, focused methods**: Each method handles a single CRUD operation
✅ **No error handling**: Delegates error handling to query hooks
✅ **No data transformation**: Returns raw API responses
✅ **Proper credential management**: Uses `PrivateApiServiceWrapper`
✅ **HTTP Exception pattern**: Automatic exception throwing for non-2xx responses

### Usage Recommendations

1. **Always use with query hooks**: Don't call service methods directly in components
2. **Implement proper loading states**: Handle loading/error states in UI components
3. **Cache invalidation**: Invalidate relevant queries after mutations
4. **AbortSignal support**: Leverage cancellation for better UX
5. **Type safety**: Use provided DTOs for request validation

### Performance Considerations

- **Stale-while-revalidate**: Configure appropriate `staleTime` for saved filters
- **Optimistic updates**: Consider optimistic updates for better UX
- **Request deduplication**: TanStack Query automatically deduplicates identical requests
- **Background refetching**: Enable background updates for fresh data