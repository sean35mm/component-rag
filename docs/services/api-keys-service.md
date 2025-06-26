# API Keys Service

## Purpose

The `ApiKeysService` manages API key operations including creation, retrieval, updating, and deletion. This service provides a complete CRUD interface for API key management with both standard and paginated listing capabilities. It handles API key generation with secure token creation and supports conditional key creation to prevent duplicates.

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getList` | `params: GetApiKeysListParams`, `signal?: AbortSignal` | `Promise<ApiKey[]>` | Retrieves all API keys with optional filtering |
| `getListPaginated` | `params?: GetApiKeysListParams & PaginationSort<ApiKey>`, `signal?: AbortSignal` | `Promise<CustomSearchResult<ApiKey>>` | Retrieves paginated API keys with sorting |
| `create` | `data: { params: { ifNotExists: boolean }, dto: CreateApiKeyDto }`, `signal?: AbortSignal` | `Promise<ApiKey>` | Creates API key with conditional logic |
| `createKey` | `dto: CreateApiKeyDto`, `signal?: AbortSignal` | `Promise<ApiKeyWithToken>` | Creates API key and returns with token |
| `update` | `data: UpdateApiKey`, `signal?: AbortSignal` | `Promise<ApiKey>` | Updates existing API key |
| `delete` | `id: ApiKey['id']`, `signal?: AbortSignal` | `Promise<ApiKey>` | Deletes API key by ID |

## Authentication

This service uses the `PrivateApiServiceWrapper` which automatically handles:
- **Private API Authentication**: Requires valid user authentication credentials
- **Automatic Credential Management**: Credentials are injected automatically by the wrapper
- **Session Validation**: Ensures valid session before making requests

```typescript
// Authentication is handled automatically by PrivateApiServiceWrapper
const apiKeys = await ApiKeysService.getList({ enabled: true });
```

## Error Handling

Following our service architecture patterns:
- **No Service-Level Error Handling**: Raw HTTP responses are returned
- **HttpException Pattern**: Non-2xx responses throw `HttpException`
- **Query Hook Integration**: Error handling is delegated to TanStack Query hooks
- **AbortSignal Support**: All methods support request cancellation

```typescript
// Errors are thrown as HttpException and handled by query hooks
try {
  const apiKey = await ApiKeysService.create({ 
    params: { ifNotExists: true },
    dto: { name: 'My API Key', permissions: ['read'] }
  });
} catch (error) {
  // HttpException thrown for non-2xx responses
  // Handled by query hooks in practice
}
```

## Usage Examples

### Basic API Key Operations

```typescript
import { ApiKeysService } from '@/lib/services/api-keys-service';

// Get all API keys
const apiKeys = await ApiKeysService.getList();

// Get enabled API keys only
const enabledKeys = await ApiKeysService.getList({ enabled: true });

// Get paginated results with sorting
const paginatedKeys = await ApiKeysService.getListPaginated({
  enabled: true,
  page: 1,
  limit: 10,
  sortBy: 'createdAt',
  sortOrder: 'desc'
});
```

### API Key Creation

```typescript
// Create API key with conditional logic
const apiKey = await ApiKeysService.create({
  params: { ifNotExists: true },
  dto: {
    name: 'Production API Key',
    permissions: ['read', 'write'],
    expiresAt: '2024-12-31T23:59:59Z'
  }
});

// Create API key and get token
const apiKeyWithToken = await ApiKeysService.createKey({
  name: 'Integration Key',
  permissions: ['read']
});
console.log(apiKeyWithToken.token); // Only available on creation
```

### API Key Management

```typescript
// Update API key
const updatedKey = await ApiKeysService.update({
  id: 'key-123',
  dto: {
    name: 'Updated Key Name',
    enabled: false
  }
});

// Delete API key
const deletedKey = await ApiKeysService.delete('key-123');
```

### With AbortSignal

```typescript
const controller = new AbortController();

// Cancel request after 5 seconds
setTimeout(() => controller.abort(), 5000);

const apiKeys = await ApiKeysService.getList(
  { enabled: true },
  controller.signal
);
```

## Related Types

### Core Types

```typescript
interface ApiKey {
  id: string;
  name: string;
  enabled: boolean;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
  lastUsed?: string;
}

interface ApiKeyWithToken extends ApiKey {
  token: string; // Only available during creation
}

interface CreateApiKeyDto {
  name: string;
  permissions: string[];
  expiresAt?: string;
  enabled?: boolean;
}
```

### Request/Response Types

```typescript
interface GetApiKeysListParams {
  enabled?: boolean;
}

interface UpdateApiKey {
  id: string;
  dto: Partial<CreateApiKeyDto>;
}

interface CustomSearchResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface PaginationSort<T> {
  page?: number;
  limit?: number;
  sortBy?: keyof T;
  sortOrder?: 'asc' | 'desc';
}
```

## Dependencies

- **PrivateApiServiceWrapper**: Provides authenticated API client with credential management
- **CreateApiKeyDto**: Data transfer object for API key creation
- **UpdateApiKey**: Type from query hooks for update operations
- **Core Types**: `ApiKey`, `ApiKeyWithToken`, `CustomSearchResult`, `PaginationSort`

## Integration

### TanStack Query Integration

```typescript
// Used with query hooks for data fetching
const { data: apiKeys, isLoading } = useQuery({
  queryKey: ['api-keys', { enabled: true }],
  queryFn: ({ signal }) => ApiKeysService.getList({ enabled: true }, signal)
});

// Used with mutation hooks for modifications
const createApiKeyMutation = useMutation({
  mutationFn: (data: { params: { ifNotExists: boolean }, dto: CreateApiKeyDto }) =>
    ApiKeysService.create(data),
  onSuccess: (newApiKey) => {
    // Handle successful creation
    queryClient.invalidateQueries({ queryKey: ['api-keys'] });
  }
});
```

### Automatic Request Cancellation

```typescript
// Query hooks automatically provide AbortSignal
const { data } = useQuery({
  queryKey: ['api-keys-paginated'],
  queryFn: ({ signal }) => ApiKeysService.getListPaginated({}, signal)
});
// Request is automatically cancelled if component unmounts
```

## Best Practices

### Service Architecture Adherence

```typescript
// ✅ Correct: Simple, focused methods
await ApiKeysService.getList({ enabled: true });

// ✅ Correct: Raw API responses without transformation
const response = await ApiKeysService.getListPaginated();
// Returns CustomSearchResult<ApiKey> as-is from API

// ✅ Correct: No service-level error handling
// Errors bubble up to query hooks for handling
```

### Proper Usage Patterns

```typescript
// ✅ Use with query hooks for data fetching
const useApiKeys = (params: GetApiKeysListParams) => {
  return useQuery({
    queryKey: ['api-keys', params],
    queryFn: ({ signal }) => ApiKeysService.getList(params, signal)
  });
};

// ✅ Use with mutation hooks for modifications
const useCreateApiKey = () => {
  return useMutation({
    mutationFn: ApiKeysService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['api-keys'] });
    }
  });
};

// ❌ Avoid: Direct service calls in components
// Should use query/mutation hooks instead
```

### Security Considerations

```typescript
// ✅ Token only available during creation
const apiKeyWithToken = await ApiKeysService.createKey(dto);
// Store token securely immediately after creation

// ✅ Use conditional creation to prevent duplicates
await ApiKeysService.create({
  params: { ifNotExists: true },
  dto: createApiKeyDto
});

// ✅ Proper permission scoping
const dto: CreateApiKeyDto = {
  name: 'Limited Access Key',
  permissions: ['read'], // Minimal required permissions
  expiresAt: '2024-12-31T23:59:59Z' // Set expiration
};
```