# Contact Point Notification Service

## Purpose

The Contact Point Notification Service manages contact point notification data through a private API. This service provides methods to retrieve notification records, including list operations with advanced filtering and individual record retrieval. It handles notifications related to signals and contact points within the system.

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getList` | `params: GetContactPointNotificationListParams`, `signal?: AbortSignal` | `Promise<CustomSearchResult<ContactPointNotification>>` | Retrieves a paginated list of contact point notifications with filtering options |
| `getById` | `id: string`, `signal: AbortSignal` | `Promise<ContactPointNotification>` | Retrieves a specific contact point notification by ID |

## Authentication

This service uses `PrivateApiServiceWrapper` for authentication and credential management:

- **Authentication Type**: Private API with credential management
- **Credential Handling**: Automatically managed by the service wrapper
- **Access Control**: Requires valid authentication credentials for all operations

## Error Handling

Following our service architecture patterns:

- **No Internal Error Handling**: Services don't handle errors internally
- **HttpException Pattern**: Non-2xx HTTP responses throw HttpException automatically
- **Query Layer Responsibility**: Error handling is managed by TanStack Query hooks
- **AbortSignal Support**: All methods support request cancellation through AbortSignal

## Usage Examples

### Basic List Retrieval
```typescript
import { ContactPointNotificationService } from '@/lib/services/contact-point-notification-service';

// Get all notifications with pagination
const notifications = await ContactPointNotificationService.getList({
  page: 1,
  limit: 20,
  sortBy: 'sentAt',
  sortOrder: 'desc'
});
```

### Filtered List Retrieval
```typescript
// Get notifications for a specific signal
const signalNotifications = await ContactPointNotificationService.getList({
  signalId: 'signal-uuid-123',
  signalType: SignalTypeEnum.ALERT,
  page: 1,
  limit: 10
});

// Get notifications within a date range
const dateRangeNotifications = await ContactPointNotificationService.getList({
  sentAtFrom: '2023-01-01T00:00:00Z',
  sentAtTo: '2023-12-31T23:59:59Z',
  sortBy: 'sentAt',
  sortOrder: 'asc'
});
```

### Individual Record Retrieval
```typescript
// Get specific notification by ID
const notification = await ContactPointNotificationService.getById(
  'notification-123',
  abortController.signal
);
```

### With Request Cancellation
```typescript
const abortController = new AbortController();

try {
  const notifications = await ContactPointNotificationService.getList(
    { page: 1, limit: 50 },
    abortController.signal
  );
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Request was cancelled');
  }
}

// Cancel the request
abortController.abort();
```

## Related Types

### Request Types
```typescript
interface GetContactPointNotificationListParams extends PaginationSort<ContactPointNotification> {
  signalId?: Signal['uuid'];           // Filter by signal UUID
  signalType?: SignalTypeEnum;         // Filter by signal type
  signalNotificationId?: number;       // Filter by signal notification ID
  sentAtFrom?: string;                 // Filter by sent date (from)
  sentAtTo?: string;                   // Filter by sent date (to)
}
```

### Response Types
```typescript
// List response
CustomSearchResult<ContactPointNotification>

// Individual record response
ContactPointNotification
```

### Core Types
- `ContactPointNotification` - Main entity representing a contact point notification
- `Signal` - Related signal entity with UUID reference
- `SignalTypeEnum` - Enumeration of available signal types
- `PaginationSort<T>` - Generic pagination and sorting interface
- `CustomSearchResult<T>` - Generic paginated response wrapper

## Dependencies

### Service Wrappers
- `PrivateApiServiceWrapper` - Provides authentication and credential management for private API access

### External Dependencies
- `@/lib/types` - Type definitions for entities and API responses
- Standard AbortSignal for request cancellation

## Integration

### TanStack Query Integration
This service integrates seamlessly with TanStack Query hooks:

```typescript
// Query hook for list data
const useContactPointNotifications = (params: GetContactPointNotificationListParams) => {
  return useQuery({
    queryKey: ['contactPointNotifications', params],
    queryFn: ({ signal }) => ContactPointNotificationService.getList(params, signal),
  });
};

// Query hook for individual records
const useContactPointNotification = (id: string) => {
  return useQuery({
    queryKey: ['contactPointNotification', id],
    queryFn: ({ signal }) => ContactPointNotificationService.getById(id, signal),
    enabled: !!id,
  });
};
```

### Query Key Patterns
- List queries: `['contactPointNotifications', params]`
- Individual queries: `['contactPointNotification', id]`
- Filtered queries: Include filter parameters in query key for proper caching

## Best Practices

### Service Architecture Compliance
- ✅ **Simple, focused methods**: Each method has a single responsibility
- ✅ **No error handling**: Errors are handled by the query layer
- ✅ **No data transformation**: Returns raw API responses
- ✅ **Proper credential management**: Uses PrivateApiServiceWrapper
- ✅ **HTTP Exception pattern**: Automatic exception throwing for non-2xx responses

### Usage Guidelines
1. **Always use with query hooks** - Don't call service methods directly in components
2. **Leverage AbortSignal** - Use for request cancellation in query hooks
3. **Proper query key structure** - Include all relevant parameters for caching
4. **Filter parameters** - Use available filter options for efficient data retrieval
5. **Pagination** - Always implement pagination for list operations

### Performance Considerations
- Use specific filters to reduce payload size
- Implement proper pagination limits
- Leverage query caching through consistent query keys
- Use AbortSignal for cleanup in useEffect hooks