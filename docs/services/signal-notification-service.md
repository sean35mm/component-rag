# Signal Notification Service

## Purpose

The `SignalNotificationService` manages signal notification data operations, providing access to paginated lists of signal notifications with comprehensive filtering capabilities. This service handles retrieval of signal notifications with support for filtering by signal ID, type, date ranges, and status values.

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getList` | `params: GetSignalsNotificationsListParams`, `signal?: AbortSignal` | `Promise<CustomSearchResult<SignalNotification>>` | Retrieves paginated list of signal notifications with filtering and sorting |

## Authentication

This service uses the `PrivateApiServiceWrapper` which automatically handles:
- **Authentication Required**: Yes - requires valid user credentials
- **Credential Management**: Automatic injection of authentication headers
- **Session Handling**: Automatic session validation and refresh

## Error Handling

Follows the standard HTTP Exception pattern:
- **Non-2xx responses**: Automatically throws `HttpException`
- **Network errors**: Propagated as-is to the query layer
- **Abort signals**: Supports request cancellation via `AbortSignal`

Error handling is intentionally minimal at the service layer and delegated to TanStack Query hooks.

## Usage Examples

### Basic List Retrieval
```typescript
import { SignalNotificationService } from '@/lib/services/signal-notification-service';

// Get all signal notifications with default pagination
const notifications = await SignalNotificationService.getList({
  page: 1,
  size: 20
});
```

### Filtered List Retrieval
```typescript
// Get notifications for specific signal with status filter
const filteredNotifications = await SignalNotificationService.getList({
  page: 1,
  size: 10,
  signalId: 123,
  signalType: SignalTypeEnum.ALERT,
  status: SignalStatusEnum.ACTIVE,
  issuedAtFrom: '2024-01-01T00:00:00Z',
  issuedAtTo: '2024-12-31T23:59:59Z',
  sortBy: 'issuedAt',
  sortDirection: 'desc'
});
```

### With Request Cancellation
```typescript
const abortController = new AbortController();

try {
  const notifications = await SignalNotificationService.getList(
    {
      page: 1,
      size: 50,
      signalType: SignalTypeEnum.WARNING
    },
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

### GetSignalsNotificationsListParams
```typescript
interface GetSignalsNotificationsListParams extends PaginationSort<SignalNotification> {
  signalId?: number;           // Filter by specific signal ID
  signalType?: SignalTypeEnum; // Filter by signal type
  issuedAtFrom?: string;       // Filter by issued date range start (ISO string)
  issuedAtTo?: string;         // Filter by issued date range end (ISO string)
  status?: SignalStatusEnum;   // Filter by notification status
  signalStatus?: SignalStatusEnum; // Filter by associated signal status
}
```

### Core Types
- **`SignalNotification`**: Core notification entity
- **`CustomSearchResult<T>`**: Paginated response wrapper
- **`PaginationSort<T>`**: Base pagination and sorting parameters
- **`SignalStatusEnum`**: Enumeration of signal status values
- **`SignalTypeEnum`**: Enumeration of signal type values

## Dependencies

- **`PrivateApiServiceWrapper`**: Provides authenticated API client with automatic credential management
- **Core Types**: Imports shared type definitions for consistent data structures

## Integration

### TanStack Query Integration
```typescript
// In query hooks
import { useQuery } from '@tanstack/react-query';
import { SignalNotificationService } from '@/lib/services/signal-notification-service';

export const useSignalNotificationsList = (params: GetSignalsNotificationsListParams) => {
  return useQuery({
    queryKey: ['signal-notifications', 'list', params],
    queryFn: ({ signal }) => SignalNotificationService.getList(params, signal),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

### Query Key Patterns
```typescript
// Recommended query key structure
const queryKeys = {
  all: ['signal-notifications'] as const,
  lists: () => [...queryKeys.all, 'list'] as const,
  list: (params: GetSignalsNotificationsListParams) => 
    [...queryKeys.lists(), params] as const,
};
```

## Best Practices

### Service Architecture Compliance ✅
- **Focused responsibility**: Single concern for signal notification data operations
- **No error handling**: Errors propagated to query layer
- **No data transformation**: Returns raw API responses
- **Proper authentication**: Uses `PrivateApiServiceWrapper`
- **AbortSignal support**: Enables request cancellation

### Usage Guidelines
- **Parameter validation**: Rely on TypeScript types for compile-time validation
- **Date formatting**: Use ISO string format for date range filters
- **Pagination**: Always specify reasonable page sizes to avoid performance issues
- **Sorting**: Leverage built-in sorting capabilities for better UX
- **Caching**: Combine with TanStack Query for automatic caching and background updates

### Performance Considerations
- **Request cancellation**: Always pass AbortSignal in query hooks
- **Pagination**: Use appropriate page sizes based on UI requirements
- **Filtering**: Apply filters at API level rather than client-side filtering
- **Query invalidation**: Invalidate related queries when signal notifications change