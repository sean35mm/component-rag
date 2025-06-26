# FoldersService API Documentation

## Purpose

The `FoldersService` provides a clean interface for managing folder resources through CRUD operations. This service handles folder listing with search and pagination, individual folder retrieval, creation, updates, and deletion. It follows our service architecture pattern of simple, focused methods that integrate seamlessly with TanStack Query hooks.

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getList` | `params: GetFoldersListParams`, `signal?: AbortSignal` | `Promise<CustomSearchResult<Folder>>` | Retrieves paginated list of folders with optional search |
| `getById` | `id: number`, `signal?: AbortSignal` | `Promise<Folder>` | Fetches a single folder by ID |
| `create` | `dto: CreateFolderDto`, `signal?: AbortSignal` | `Promise<Folder>` | Creates a new folder |
| `update` | `data: { id: number; dto: UpdateFolderDto }`, `signal?: AbortSignal` | `Promise<Folder>` | Updates an existing folder |
| `delete` | `id: number`, `signal?: AbortSignal` | `Promise<Folder>` | Deletes a folder by ID |

## Authentication

This service uses the `PrivateApiServiceWrapper`, which automatically handles:
- **Authentication Headers**: Includes bearer tokens or session cookies
- **Credential Management**: Manages authentication state and token refresh
- **Private Route Access**: Ensures requests include proper authentication for protected endpoints

## Error Handling

Following our service architecture guidelines:
- **No Built-in Error Handling**: Methods throw raw HTTP exceptions for non-2xx responses
- **HttpException Pattern**: Errors are thrown as `HttpException` instances with status codes and messages
- **Query Layer Responsibility**: Error handling and retry logic is managed by TanStack Query hooks
- **AbortSignal Support**: All methods support request cancellation through `AbortSignal`

## Usage Examples

### Basic CRUD Operations

```typescript
import { FoldersService } from '@/lib/services/folders-service';

// Get paginated folders list
const foldersResult = await FoldersService.getList({
  page: 1,
  limit: 20,
  sortBy: 'name',
  sortOrder: 'asc'
});

// Search folders
const searchResults = await FoldersService.getList({
  q: 'project',
  page: 1,
  limit: 10
});

// Get single folder
const folder = await FoldersService.getById(123);

// Create new folder
const newFolder = await FoldersService.create({
  name: 'My New Folder',
  description: 'Project documents'
});

// Update folder
const updatedFolder = await FoldersService.update({
  id: 123,
  dto: {
    name: 'Updated Folder Name',
    description: 'Updated description'
  }
});

// Delete folder
const deletedFolder = await FoldersService.delete(123);
```

### With AbortSignal

```typescript
const controller = new AbortController();

try {
  const folders = await FoldersService.getList(
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

## Related Types

### Core Interfaces

```typescript
// Request parameters for folder listing
interface GetFoldersListParams extends PaginationSort<Folder> {
  q?: string; // Search query
}

// Base pagination and sorting interface
interface PaginationSort<T> {
  page?: number;
  limit?: number;
  sortBy?: keyof T;
  sortOrder?: 'asc' | 'desc';
}

// Search result wrapper
interface CustomSearchResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
```

### DTOs

```typescript
// Input types for folder operations
interface CreateFolderDto {
  name: string;
  description?: string;
  parentId?: number;
}

interface UpdateFolderDto {
  name?: string;
  description?: string;
  parentId?: number;
}
```

### Response Types

```typescript
// Folder entity structure
interface Folder {
  id: number;
  name: string;
  description?: string;
  parentId?: number;
  createdAt: string;
  updatedAt: string;
  // Additional folder properties...
}
```

## Dependencies

- **`PrivateApiServiceWrapper`**: Provides authenticated API client with credential management
- **`CreateFolderDto`, `UpdateFolderDto`**: Input validation and type safety for mutations
- **`CustomSearchResult`, `Folder`, `PaginationSort`**: Type definitions for requests and responses

## Integration

### TanStack Query Hooks

This service integrates with query hooks that handle caching, error handling, and state management:

```typescript
// Query hooks usage examples
const useFolders = (params: GetFoldersListParams) => {
  return useQuery({
    queryKey: ['folders', params],
    queryFn: ({ signal }) => FoldersService.getList(params, signal)
  });
};

const useFolder = (id: number) => {
  return useQuery({
    queryKey: ['folder', id],
    queryFn: ({ signal }) => FoldersService.getById(id, signal)
  });
};

const useCreateFolder = () => {
  return useMutation({
    mutationFn: FoldersService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] });
    }
  });
};
```

### State Management

- **Query Caching**: Automatic response caching with configurable invalidation
- **Optimistic Updates**: Support for optimistic UI updates during mutations
- **Background Refetching**: Automatic data synchronization with server state

## Best Practices

### Service Architecture Adherence

✅ **Simple, Focused Methods**: Each method handles a single responsibility
✅ **No Error Handling**: Raw exceptions bubble up to query layer
✅ **No Data Transformation**: Returns unmodified API responses
✅ **Proper Credentials**: Uses `PrivateApiServiceWrapper` for authentication
✅ **HttpException Pattern**: Consistent error throwing for non-2xx responses

### Usage Guidelines

- **Always use with Query Hooks**: Don't call service methods directly in components
- **Leverage AbortSignal**: Pass abort signals for request cancellation
- **Type Safety**: Utilize TypeScript interfaces for compile-time validation
- **Query Key Consistency**: Use consistent query keys for proper cache management

### Performance Considerations

- **Pagination**: Use appropriate page sizes to balance performance and UX
- **Search Debouncing**: Implement debouncing for search queries in the UI layer
- **Selective Invalidation**: Invalidate specific query keys rather than broad cache clearing