# Contact Points Service Documentation

## Purpose

The `ContactPointService` manages contact point operations including CRUD operations, email verification, and subscription management. This service handles various contact point types (email, SMS, webhook, etc.) used for alert notifications and communication channels.

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getList` | `params: GetContactPointsListParams`, `signal?: AbortSignal` | `Promise<CustomSearchResult<ContactPoint>>` | Retrieves paginated list of contact points with optional filtering |
| `getById` | `id: string`, `signal?: AbortSignal` | `Promise<ContactPoint>` | Fetches a specific contact point by ID |
| `create` | `dto: CreateContactPointDto`, `signal?: AbortSignal` | `Promise<ContactPoint>` | Creates a new contact point |
| `update` | `data: { id: string; dto: UpdateContactPointDto }`, `signal?: AbortSignal` | `Promise<ContactPoint>` | Updates an existing contact point |
| `verifyEmail` | `verificationToken: string`, `signal?: AbortSignal` | `Promise<void>` | Verifies email contact point using token |
| `resendVerifyEmail` | `id: number`, `signal?: AbortSignal` | `Promise<void>` | Resends email verification for contact point |
| `unsubscribeContactPoint` | `signalId: string`, `contactPointId: string`, `signal?: AbortSignal` | `Promise<void>` | Unsubscribes contact point from specific signal |

## Authentication

- **Wrapper**: Uses `PrivateApiServiceWrapper` for authenticated requests
- **Credentials**: Automatically handles authentication tokens and credentials
- **Access**: Requires valid user authentication for all operations
- **Scope**: User-scoped operations with appropriate permission validation

## Error Handling

The service follows our **HttpException pattern**:

- **No internal error handling**: All HTTP errors are thrown as `HttpException` instances
- **Status code mapping**: Non-2xx responses automatically throw exceptions
- **Error delegation**: Error handling is delegated to TanStack Query hooks
- **Signal support**: All methods support `AbortSignal` for request cancellation

## Usage Examples

### Basic CRUD Operations

```typescript
import { ContactPointService } from '@/lib/services/contact-points-service';

// Get paginated list with filtering
const contactPoints = await ContactPointService.getList({
  page: 1,
  limit: 10,
  status: ['active', 'pending'],
  sortBy: 'name',
  sortOrder: 'asc'
});

// Get specific contact point
const contactPoint = await ContactPointService.getById('cp-123');

// Create new contact point
const newContactPoint = await ContactPointService.create({
  name: 'Emergency Email',
  type: 'email',
  email: 'alerts@company.com',
  status: 'active'
});

// Update contact point
const updatedContactPoint = await ContactPointService.update({
  id: 'cp-123',
  dto: {
    name: 'Updated Email Alert',
    status: 'active'
  }
});
```

### Email Verification

```typescript
// Verify email contact point
await ContactPointService.verifyEmail('verification-token-123');

// Resend verification email
await ContactPointService.resendVerifyEmail(456);
```

### Subscription Management

```typescript
// Unsubscribe contact point from signal
await ContactPointService.unsubscribeContactPoint(
  'signal-789',
  'cp-123'
);
```

### With Abort Signal

```typescript
const controller = new AbortController();

try {
  const contactPoints = await ContactPointService.getList(
    { page: 1, limit: 10 },
    controller.signal
  );
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Request cancelled');
  }
}

// Cancel request
controller.abort();
```

## Related Types

### Core Types

```typescript
// Service-specific types
type GetContactPointsListParams = PaginationSort<ContactPoint> & {
  status?: ContactPoint['status'][];
};

// Data Transfer Objects
interface CreateContactPointDto {
  name: string;
  type: ContactPoint['type'];
  email?: string;
  phone?: string;
  webhookUrl?: string;
  status: ContactPoint['status'];
}

interface UpdateContactPointDto {
  name?: string;
  status?: ContactPoint['status'];
  // ... other optional fields
}

// Domain Models
interface ContactPoint {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'webhook' | 'slack';
  status: 'active' | 'inactive' | 'pending' | 'verified';
  email?: string;
  phone?: string;
  webhookUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// Response Types
interface CustomSearchResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
```

## Dependencies

- **`PrivateApiServiceWrapper`**: Provides authenticated API client with credential management
- **DTOs**: `CreateContactPointDto`, `UpdateContactPointDto` for request validation
- **Types**: Core domain types and pagination utilities

## Integration

### TanStack Query Integration

```typescript
// Query hooks integration
const useContactPointsQuery = (params: GetContactPointsListParams) => {
  return useQuery({
    queryKey: ['contact-points', params],
    queryFn: ({ signal }) => ContactPointService.getList(params, signal),
  });
};

const useContactPointQuery = (id: string) => {
  return useQuery({
    queryKey: ['contact-point', id],
    queryFn: ({ signal }) => ContactPointService.getById(id, signal),
    enabled: !!id,
  });
};

// Mutation hooks integration
const useCreateContactPointMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ContactPointService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-points'] });
    },
  });
};
```

### Query Key Patterns

```typescript
// Recommended query key structure
const contactPointKeys = {
  all: ['contact-points'] as const,
  lists: () => [...contactPointKeys.all, 'list'] as const,
  list: (params: GetContactPointsListParams) => 
    [...contactPointKeys.lists(), params] as const,
  details: () => [...contactPointKeys.all, 'detail'] as const,
  detail: (id: string) => [...contactPointKeys.details(), id] as const,
};
```

## Best Practices

### Service Architecture Adherence

✅ **Simple, focused methods**: Each method handles a single responsibility
✅ **No error handling**: Errors bubble up to query hooks
✅ **No data transformation**: Returns raw API responses
✅ **Proper credentials**: Uses `PrivateApiServiceWrapper`
✅ **HTTP Exception pattern**: Throws exceptions for non-2xx responses

### Implementation Guidelines

```typescript
// ✅ Good: Simple method with proper typing
async getById(id: string, signal?: AbortSignal): Promise<ContactPoint> {
  const response = await api.get(`/contactPoint/${id}`, { signal });
  const { data: contactPoint } = await response.json();
  return contactPoint;
}

// ❌ Bad: Service handling errors
async getById(id: string): Promise<ContactPoint | null> {
  try {
    const response = await api.get(`/contactPoint/${id}`);
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch contact point:', error);
    return null;
  }
}
```

### Query Integration Best Practices

- **Always use AbortSignal**: Pass through from query hooks for cancellation
- **Proper invalidation**: Invalidate related queries after mutations
- **Consistent query keys**: Use structured query key patterns
- **Error boundaries**: Handle errors at the component level, not service level