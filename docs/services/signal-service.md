# SignalService Documentation

## Purpose

The `SignalService` manages all signal-related API operations including CRUD operations, query suggestions, and suggestion templates. This service provides a clean interface for managing signals, their lifecycle, and associated metadata through our standardized service architecture.

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getList` | `params: GetSignalsListParams`, `signal?: AbortSignal` | `Promise<CustomSearchResult<Signal>>` | Retrieves paginated list of signals with filtering options |
| `getById` | `uuid: string`, `signal?: AbortSignal` | `Promise<Signal>` | Fetches a single signal by UUID |
| `create` | `dto: CreateSignalDto`, `signal?: AbortSignal` | `Promise<Signal>` | Creates a new signal |
| `update` | `data: { uuid: string; dto: UpdateSignalDto }`, `signal?: AbortSignal` | `Promise<Signal>` | Updates an existing signal |
| `generateQuerySuggestions` | `query: string`, `signal?: AbortSignal` | `Promise<string[]>` | Generates query suggestions based on input |
| `getSuggestionTemplates` | `params: GetSuggestionTemplatesParams`, `signal?: AbortSignal` | `Promise<SignalSuggestionTemplate[]>` | Retrieves signal suggestion templates |

## Authentication

This service uses `PrivateApiServiceWrapper`, which automatically handles:
- **Credential Management**: Automatically attaches authentication credentials to all requests
- **Token Refresh**: Handles token refresh logic transparently
- **Private API Access**: Ensures all requests are authenticated for private endpoints

No manual authentication handling is required when using this service.

## Error Handling

Following our service architecture patterns:
- **No Internal Error Handling**: Service methods do not catch or transform errors
- **HttpException Pattern**: Non-2xx HTTP responses are automatically converted to `HttpException` instances by the service wrapper
- **Query Layer Responsibility**: Error handling is delegated to TanStack Query hooks and higher-level components
- **AbortSignal Support**: All methods support request cancellation through `AbortSignal`

## Usage Examples

### Basic CRUD Operations

```typescript
import { SignalService } from '@/lib/services/signal-service';

// Get paginated signals list
const signals = await SignalService.getList({
  page: 1,
  limit: 20,
  status: [SignalStatusEnum.ACTIVE],
  folderIsNull: true,
  sortBy: 'createdAt',
  sortOrder: 'desc'
});

// Get single signal
const signal = await SignalService.getById('signal-uuid-123');

// Create new signal
const newSignal = await SignalService.create({
  name: 'Market Alert',
  query: 'price > 100',
  description: 'Alert when price exceeds threshold'
});

// Update existing signal
const updatedSignal = await SignalService.update({
  uuid: 'signal-uuid-123',
  dto: {
    name: 'Updated Market Alert',
    status: SignalStatusEnum.ACTIVE
  }
});
```

### Query Suggestions and Templates

```typescript
// Generate query suggestions
const suggestions = await SignalService.generateQuerySuggestions(
  'market trend'
);

// Get suggestion templates
const templates = await SignalService.getSuggestionTemplates({
  page: 1,
  limit: 10,
  sortBy: 'name'
});
```

### With Request Cancellation

```typescript
const controller = new AbortController();

try {
  const signals = await SignalService.getList(
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

### Request Types

```typescript
interface GetSignalsListParams extends PaginationSort<Signal> {
  folderIsNull?: boolean;
  status?: SignalStatusEnum[];
}

interface GetSuggestionTemplatesParams extends PaginationSort<Signal> {}
```

### Response Types

```typescript
// Core signal entity
interface Signal {
  uuid: string;
  name: string;
  query: string;
  status: SignalStatusEnum;
  // ... other signal properties
}

// Paginated response wrapper
interface CustomSearchResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// Suggestion template
interface SignalSuggestionTemplate {
  id: string;
  name: string;
  template: string;
  // ... other template properties
}
```

### DTO Types

```typescript
interface CreateSignalDto {
  name: string;
  query: string;
  description?: string;
  // ... other creation fields
}

interface UpdateSignalDto {
  name?: string;
  query?: string;
  status?: SignalStatusEnum;
  // ... other updatable fields
}
```

## Dependencies

- **PrivateApiServiceWrapper**: Provides authenticated API client with credential management
- **DTOs**: `CreateSignalDto`, `UpdateSignalDto` for request validation
- **Types**: Core domain types for signals, pagination, and search results

## Integration

### TanStack Query Integration

This service integrates seamlessly with TanStack Query hooks:

```typescript
// Query hooks example
const useSignalsList = (params: GetSignalsListParams) => {
  return useQuery({
    queryKey: ['signals', 'list', params],
    queryFn: ({ signal }) => SignalService.getList(params, signal),
  });
};

const useSignal = (uuid: string) => {
  return useQuery({
    queryKey: ['signals', uuid],
    queryFn: ({ signal }) => SignalService.getById(uuid, signal),
    enabled: !!uuid,
  });
};

// Mutation hooks example
const useCreateSignal = () => {
  return useMutation({
    mutationFn: SignalService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['signals'] });
    },
  });
};
```

### Service Layer Integration

```typescript
// Higher-level service composition
class SignalManager {
  async createSignalWithValidation(dto: CreateSignalDto) {
    // Business logic layer
    const validatedDto = await this.validateSignalDto(dto);
    
    // Delegate to service layer
    return SignalService.create(validatedDto);
  }
}
```

## Best Practices

### ✅ Adherence to Service Architecture Patterns

1. **Simple, Focused Methods**: Each method has a single responsibility (CRUD or specific operation)
2. **No Error Handling**: Errors bubble up to query hooks for consistent handling
3. **No Data Transformation**: Returns raw API responses without modification
4. **Proper Credential Management**: Uses `PrivateApiServiceWrapper` for automatic authentication
5. **HttpException Pattern**: Leverages wrapper's automatic error conversion

### ✅ Implementation Patterns

```typescript
// ✅ Good: Simple, focused service usage
const signal = await SignalService.getById(uuid);

// ✅ Good: Let query hooks handle errors
const { data, error } = useQuery({
  queryKey: ['signals', uuid],
  queryFn: () => SignalService.getById(uuid),
});

// ❌ Avoid: Error handling in service layer
// Service should not include try/catch blocks

// ❌ Avoid: Data transformation in service
// Return raw API responses, transform in presentation layer
```

### ✅ Query Key Consistency

```typescript
// Consistent query key patterns
const SIGNAL_KEYS = {
  all: ['signals'] as const,
  lists: () => [...SIGNAL_KEYS.all, 'list'] as const,
  list: (params: GetSignalsListParams) => [...SIGNAL_KEYS.lists(), params] as const,
  details: () => [...SIGNAL_KEYS.all, 'detail'] as const,
  detail: (uuid: string) => [...SIGNAL_KEYS.details(), uuid] as const,
};
```