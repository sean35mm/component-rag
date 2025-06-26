# TabsService API Documentation

## Purpose

The `TabsService` provides a complete set of operations for managing browser tabs through the private API. This service handles standard CRUD operations (create, read, update) as well as specialized tab management operations like closing individual tabs or batch closing multiple tabs. It serves as the data access layer for all tab-related functionality in the application.

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getById` | `id: number`, `signal?: AbortSignal` | `Promise<Tab>` | Retrieves a single tab by its ID |
| `getList` | `params: GetTabsListParams`, `signal?: AbortSignal` | `Promise<TabList>` | Retrieves a paginated and sortable list of tabs |
| `create` | `dto: CreateTabDto`, `signal?: AbortSignal` | `Promise<Tab>` | Creates a new tab |
| `update` | `data: { id: number; dto: UpdateTabDto }`, `signal?: AbortSignal` | `Promise<Tab>` | Updates an existing tab |
| `close` | `id: number`, `signal?: AbortSignal` | `Promise<Tab>` | Closes a single tab |
| `closeBatch` | `ids: number[]`, `signal?: AbortSignal` | `Promise<Tab[]>` | Closes multiple tabs in a single operation |

## Authentication

This service uses the `PrivateApiServiceWrapper`, which handles:

- **Automatic credential management**: Tokens/session cookies are automatically included
- **Private API access**: Authenticated requests to protected endpoints
- **Credential refresh**: Automatic handling of token renewal when needed

All methods require valid authentication credentials to access the private tab management API.

## Error Handling

The service follows the **HttpException pattern** for error handling:

- **No internal error handling**: Methods do not catch or transform errors
- **HTTP exceptions**: Non-2xx responses automatically throw `HttpException`
- **Query layer responsibility**: Error handling is delegated to TanStack Query hooks
- **Abort signal support**: All methods support request cancellation via `AbortSignal`

## Usage Examples

### Basic Tab Operations

```tsx
// Get a single tab
const tab = await TabsService.getById(123);

// Get paginated tab list with sorting
const tabList = await TabsService.getList({
  page: 1,
  pageSize: 20,
  sortBy: 'title',
  sortOrder: 'asc'
});

// Create a new tab
const newTab = await TabsService.create({
  url: 'https://example.com',
  title: 'Example Site'
});
```

### Tab Management Operations

```tsx
// Update tab properties
const updatedTab = await TabsService.update({
  id: 123,
  dto: {
    title: 'Updated Title',
    pinned: true
  }
});

// Close a single tab
const closedTab = await TabsService.close(123);

// Close multiple tabs at once
const closedTabs = await TabsService.closeBatch([123, 456, 789]);
```

### With Abort Signal

```tsx
// Create abort controller for request cancellation
const controller = new AbortController();

try {
  const tabs = await TabsService.getList(
    { page: 1, pageSize: 10 },
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

### Core Types
```tsx
// Main entity type
interface Tab {
  id: number;
  url: string;
  title: string;
  pinned: boolean;
  active: boolean;
  // ... other tab properties
}

// Paginated response type
interface TabList {
  data: Tab[];
  total: number;
  page: number;
  pageSize: number;
}
```

### Request Types
```tsx
// List parameters with pagination and sorting
type GetTabsListParams = PaginationSort<Tab>;

// Data Transfer Objects
interface CreateTabDto {
  url: string;
  title: string;
  pinned?: boolean;
}

interface UpdateTabDto {
  title?: string;
  url?: string;
  pinned?: boolean;
  // ... other updatable fields
}
```

### Utility Types
```tsx
// Pagination and sorting support
interface PaginationSort<T> {
  page?: number;
  pageSize?: number;
  sortBy?: keyof T;
  sortOrder?: 'asc' | 'desc';
}
```

## Dependencies

- **`PrivateApiServiceWrapper`**: Provides authenticated API client with credential management
- **`@/lib/dto`**: Data Transfer Objects for request/response validation
- **`@/lib/types`**: Core TypeScript type definitions

## Integration

### TanStack Query Integration

The service integrates seamlessly with TanStack Query hooks:

```tsx
// Query hooks use the service methods
const useTab = (id: number) => {
  return useQuery({
    queryKey: ['tab', id],
    queryFn: ({ signal }) => TabsService.getById(id, signal)
  });
};

const useTabsList = (params: GetTabsListParams) => {
  return useQuery({
    queryKey: ['tabs', 'list', params],
    queryFn: ({ signal }) => TabsService.getList(params, signal)
  });
};

// Mutation hooks for data modifications
const useCreateTab = () => {
  return useMutation({
    mutationFn: TabsService.create
  });
};

const useCloseTabsBatch = () => {
  return useMutation({
    mutationFn: TabsService.closeBatch
  });
};
```

### Query Key Patterns
```tsx
// Recommended query key structure
['tabs', 'list', params] // For tab lists
['tab', id] // For individual tabs
['tabs', 'batch'] // For batch operations
```

## Best Practices

### Service Architecture Adherence

✅ **Simple, focused methods**: Each method handles a single responsibility  
✅ **No error handling**: Errors bubble up to query hooks  
✅ **No data transformation**: Returns raw API responses  
✅ **Proper credentials**: Uses `PrivateApiServiceWrapper` for authentication  
✅ **HTTP Exception pattern**: Automatic exception throwing for failed requests  

### Usage Guidelines

- **Use with query hooks**: Always wrap service calls in TanStack Query hooks
- **Leverage abort signals**: Pass abort signals for request cancellation
- **Batch operations**: Use `closeBatch` for multiple tab closures instead of individual calls
- **Type safety**: Utilize provided TypeScript types for compile-time validation
- **Pagination**: Use `GetTabsListParams` for consistent list querying patterns

### Performance Considerations

- **Batch operations**: Prefer `closeBatch` over multiple `close` calls
- **Pagination**: Use appropriate page sizes to balance performance and UX
- **Request cancellation**: Implement abort signals for long-running requests
- **Query invalidation**: Invalidate related queries after mutations