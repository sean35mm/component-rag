# API Keys Query Hooks

## Purpose

The API Keys query hooks provide TanStack Query integration for managing organization API keys. These hooks handle fetching, creating, updating, and deleting API keys with proper caching, invalidation, and error handling.

## Hooks Overview

| Hook | Type | Purpose |
|------|------|---------|
| `useOrganizationApiKeys` | Query | Fetch organization API keys list |
| `usePaginatedOrganizationApiKeys` | Query | Fetch paginated organization API keys |
| `useCreateApiKey` | Mutation | Create new API key |
| `useUpdateApiKey` | Mutation | Update existing API key |
| `useDeleteApiKey` | Mutation | Delete API key |

## Query Hooks

### useOrganizationApiKeys

Fetches a list of organization API keys with optional filtering parameters.

```tsx
export function useOrganizationApiKeys<T = ApiKey[]>(
  params: GetApiKeysListParams = {},
  options?: UseQueryOptions<ApiKey[], T>
)
```

**Features:**
- Authorization-aware (requires verified access token)
- Supports custom selectors via generic type `T`
- Integrates with query key factory for consistent caching
- Automatic query disabling when unauthorized

**Parameters:**
- `params` - Filtering and search parameters for API keys
- `options` - Standard TanStack Query options with selector support

### usePaginatedOrganizationApiKeys

Fetches paginated organization API keys with sorting capabilities.

```tsx
export function usePaginatedOrganizationApiKeys<T = CustomSearchResult<ApiKey>>(
  params: GetApiKeysListParams & PaginationSort<ApiKey>,
  options?: UseQueryOptions<CustomSearchResult<ApiKey>, T>
)
```

**Features:**
- Pagination and sorting support
- Returns `CustomSearchResult` with metadata
- Authorization-aware execution
- Selector function support

**Parameters:**
- `params` - Combined filtering, pagination, and sorting parameters
- `options` - Standard query options with selector support

## Mutation Hooks

### useCreateApiKey

Creates a new API key for the organization.

```tsx
export function useCreateApiKey(
  options: UseMutationOptions<ApiKeyWithToken, CreateApiKeyDto> = {}
)
```

**Features:**
- Returns `ApiKeyWithToken` including the secret token (only available on creation)
- Automatic cache invalidation for both list and paginated queries
- Chainable success callbacks

**Cache Invalidation:**
- `queryKeys.apiKeys.getPaginatedList._def`
- `queryKeys.apiKeys.getList._def`

### useUpdateApiKey

Updates an existing API key.

```tsx
export function useUpdateApiKey(
  options: UseMutationOptions<ApiKey, UpdateApiKey> = {}
)

export interface UpdateApiKey {
  id: number;
  dto: UpdateApiKeyDto;
}
```

**Features:**
- Structured parameter interface for ID and update data
- Comprehensive cache invalidation
- Promise-based success handling

**Parameters:**
- `id` - API key identifier
- `dto` - Update data transfer object

### useDeleteApiKey

Deletes an API key by ID.

```tsx
export function useDeleteApiKey(
  options: UseMutationOptions<ApiKey, ApiKey['id']> = {}
)
```

**Features:**
- Simple ID-based deletion
- Returns deleted API key data
- Automatic cache cleanup

**Parameters:**
- `id` - API key identifier (`ApiKey['id']`)

## Query Keys

The hooks use `@lukemorales/query-key-factory` for consistent query key management:

```tsx
// List queries
queryKeys.apiKeys.getList(token, params)
queryKeys.apiKeys.getPaginatedList(token, params)

// Mutation keys
[...queryKeys.apiKeys._def, 'create']
[...queryKeys.apiKeys._def, 'update']
[...queryKeys.apiKeys._def, 'delete']
```

**Key Structure:**
- Token-scoped for multi-tenant security
- Parameter-based differentiation for precise cache management
- Hierarchical invalidation using `_def` base keys

## Usage Examples

### Basic API Keys List

```tsx
function ApiKeysList() {
  const { data: apiKeys, isLoading, error } = useOrganizationApiKeys();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      {apiKeys?.map(key => (
        <ApiKeyItem key={key.id} apiKey={key} />
      ))}
    </div>
  );
}
```

### Paginated API Keys with Search

```tsx
function PaginatedApiKeys() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = usePaginatedOrganizationApiKeys({
    search: searchTerm,
    page,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  return (
    <div>
      <SearchInput 
        value={searchTerm} 
        onChange={setSearchTerm} 
      />
      
      {data?.results.map(key => (
        <ApiKeyItem key={key.id} apiKey={key} />
      ))}
      
      <Pagination 
        current={page}
        total={data?.total || 0}
        pageSize={10}
        onChange={setPage}
      />
    </div>
  );
}
```

### Creating API Keys

```tsx
function CreateApiKeyForm() {
  const [newToken, setNewToken] = useState<string | null>(null);
  
  const createApiKey = useCreateApiKey({
    onSuccess: (data) => {
      setNewToken(data.token); // Store token for display
      toast.success('API key created successfully');
    },
    onError: (error) => {
      toast.error(`Failed to create API key: ${error.message}`);
    }
  });

  const handleSubmit = (formData: CreateApiKeyDto) => {
    createApiKey.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      
      {newToken && (
        <TokenDisplay 
          token={newToken} 
          warning="Save this token - it won't be shown again!"
        />
      )}
      
      <button 
        type="submit" 
        disabled={createApiKey.isPending}
      >
        {createApiKey.isPending ? 'Creating...' : 'Create API Key'}
      </button>
    </form>
  );
}
```

### Updating API Keys

```tsx
function UpdateApiKeyForm({ apiKey }: { apiKey: ApiKey }) {
  const updateApiKey = useUpdateApiKey({
    onSuccess: () => {
      toast.success('API key updated successfully');
    }
  });

  const handleUpdate = (dto: UpdateApiKeyDto) => {
    updateApiKey.mutate({
      id: apiKey.id,
      dto
    });
  };

  return (
    <form onSubmit={handleUpdate}>
      {/* Update form fields */}
      <button 
        type="submit" 
        disabled={updateApiKey.isPending}
      >
        Update API Key
      </button>
    </form>
  );
}
```

### Deleting API Keys

```tsx
function DeleteApiKeyButton({ apiKeyId }: { apiKeyId: number }) {
  const deleteApiKey = useDeleteApiKey({
    onSuccess: () => {
      toast.success('API key deleted successfully');
    }
  });

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this API key?')) {
      deleteApiKey.mutate(apiKeyId);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={deleteApiKey.isPending}
      className="btn-danger"
    >
      {deleteApiKey.isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
}
```

## Selector Support

### Custom Data Transformation

```tsx
// Extract only active API keys
const { data: activeKeys } = useOrganizationApiKeys(
  {},
  {
    select: (apiKeys) => apiKeys.filter(key => key.isActive)
  }
);

// Transform to key-value pairs
const { data: keyMap } = useOrganizationApiKeys(
  {},
  {
    select: (apiKeys) => new Map(
      apiKeys.map(key => [key.id, key])
    )
  }
);
```

### Paginated Data Selectors

```tsx
// Extract only the results array
const { data: apiKeys } = usePaginatedOrganizationApiKeys(
  { page: 1, limit: 10 },
  {
    select: (result) => result.results
  }
);

// Transform pagination metadata
const { data: metadata } = usePaginatedOrganizationApiKeys(
  { page: 1, limit: 10 },
  {
    select: (result) => ({
      total: result.total,
      hasMore: result.page * result.limit < result.total
    })
  }
);
```

## Caching Strategy

### Query Caching

- **List Queries**: Cached by token and parameters
- **Paginated Queries**: Separate cache entries per page/sort combination
- **Automatic Invalidation**: All mutations invalidate both list types

### Cache Key Hierarchy

```
apiKeys
├── getList(token, {})           # Base list
├── getList(token, {search})     # Filtered list
├── getPaginatedList(token, {page: 1})  # Page 1
└── getPaginatedList(token, {page: 2})  # Page 2
```

### Invalidation Strategy

```tsx
// All mutations invalidate both query types
queryClient.invalidateQueries({
  queryKey: queryKeys.apiKeys.getList._def,
});
queryClient.invalidateQueries({
  queryKey: queryKeys.apiKeys.getPaginatedList._def,
});
```

## Error Handling

### Service Error Propagation

```tsx
// Services throw HttpException, TanStack Query catches and exposes
const { error } = useOrganizationApiKeys();

if (error) {
  console.log(error.status);    // HTTP status code
  console.log(error.message);   // Error message
  console.log(error.details);   // Additional error details
}
```

### Mutation Error Handling

```tsx
const createApiKey = useCreateApiKey({
  onError: (error: HttpException) => {
    if (error.status === 409) {
      toast.error('API key name already exists');
    } else if (error.status === 403) {
      toast.error('Insufficient permissions');
    } else {
      toast.error('Failed to create API key');
    }
  }
});
```

### Global Error Handling

```tsx
// Query errors are handled by global error boundary
function ApiKeysPage() {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <ApiKeysList />
    </ErrorBoundary>
  );
}
```

## Related Services

### ApiKeysService Integration

```tsx
// Service methods called by hooks
ApiKeysService.getList(params, signal)           // useOrganizationApiKeys
ApiKeysService.getListPaginated(params, signal)  // usePaginatedOrganizationApiKeys
ApiKeysService.createKey(dto)                    // useCreateApiKey
ApiKeysService.update({ id, dto })               // useUpdateApiKey
ApiKeysService.delete(id)                        // useDeleteApiKey
```

### Access Token Context

```tsx
// Authorization integration
const { token, isAuthorizedAndVerified } = useAccessToken();

// Queries automatically disabled when unauthorized
enabled: isAuthorizedAndVerified && options?.enabled
```

## Best Practices

### Authorization Patterns

```tsx
// ✅ Hooks handle authorization automatically
const { data } = useOrganizationApiKeys();

// ❌ Don't manually check authorization
const { token } = useAccessToken();
const { data } = useOrganizationApiKeys({}, {
  enabled: !!token // Not needed
});
```

### Cache Management

```tsx
// ✅ Let mutations handle invalidation
const createApiKey = useCreateApiKey(); // Auto-invalidates

// ❌ Don't manually invalidate in components
const queryClient = useQueryClient();
const createApiKey = useCreateApiKey({
  onSuccess: () => {
    queryClient.invalidateQueries(...); // Already handled
  }
});
```

### Error Boundaries

```tsx
// ✅ Use error boundaries for query errors
<ErrorBoundary>
  <ApiKeysList />
</ErrorBoundary>

// ✅ Handle mutation errors in callbacks
const createApiKey = useCreateApiKey({
  onError: (error) => toast.error(error.message)
});
```

### Selector Performance

```tsx
// ✅ Memoize complex selectors
const selectActiveKeys = useMemo(
  () => (keys: ApiKey[]) => keys.filter(k => k.isActive),
  []
);

const { data } = useOrganizationApiKeys({}, {
  select: selectActiveKeys
});
```