# Contact Point Notifications Query Hooks

## Purpose

The contact point notifications query hooks manage data fetching for contact point notifications, which are alerts or messages sent to specific contact endpoints. These hooks provide a standardized interface for retrieving notification lists and individual notification details through TanStack Query integration.

## Hooks Overview

| Hook | Type | Purpose |
|------|------|---------|
| `useContactPointNotifications` | Query | Fetches a paginated list of contact point notifications with filtering |
| `useContactPointNotificationsById` | Query | Fetches a single contact point notification by ID |

## Query Hooks

### useContactPointNotifications

Fetches a list of contact point notifications with search and filtering capabilities.

```tsx
function useContactPointNotifications<T = CustomSearchResult<ContactPointNotification>>(
  params: GetContactPointNotificationListParams,
  options?: UseQueryOptions<CustomSearchResult<ContactPointNotification>, T>
)
```

**Parameters:**
- `params`: Query parameters for filtering and pagination
- `options`: TanStack Query options with selector support

**Returns:** Query result containing paginated notification data

### useContactPointNotificationsById

Fetches a single contact point notification by its unique identifier.

```tsx
function useContactPointNotificationsById<T = ContactPointNotification>(
  id: string,
  options?: UseQueryOptions<ContactPointNotification, T>
)
```

**Parameters:**
- `id`: Unique identifier of the contact point notification
- `options`: TanStack Query options with selector support

**Returns:** Query result containing the notification details

## Query Keys

Query keys are managed using `@lukemorales/query-key-factory` for consistency:

```tsx
// List query key structure
queryKeys.contactPointsNotifications.getList(token, params)

// By ID query key structure  
queryKeys.contactPointsNotifications.getById(token, id)
```

The keys include authentication tokens and parameters for proper cache isolation.

## Usage Examples

### Basic Notification List

```tsx
import { useContactPointNotifications } from '@/lib/query-hooks/contact-point-notifications';

function NotificationsList() {
  const { data, isLoading, error } = useContactPointNotifications({
    page: 1,
    limit: 10
  });

  if (isLoading) return <div>Loading notifications...</div>;
  if (error) return <div>Error loading notifications</div>;

  return (
    <div>
      {data?.items.map(notification => (
        <div key={notification.id}>
          <h3>{notification.title}</h3>
          <p>{notification.message}</p>
        </div>
      ))}
    </div>
  );
}
```

### Filtered Notifications

```tsx
function FilteredNotifications() {
  const [status, setStatus] = useState('pending');
  
  const { data, isLoading } = useContactPointNotifications({
    page: 1,
    limit: 20,
    status,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  return (
    <div>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="pending">Pending</option>
        <option value="sent">Sent</option>
        <option value="failed">Failed</option>
      </select>
      
      {/* Render notifications */}
    </div>
  );
}
```

### Single Notification Details

```tsx
import { useContactPointNotificationsById } from '@/lib/query-hooks/contact-point-notifications';

function NotificationDetails({ notificationId }: { notificationId: string }) {
  const { data: notification, isLoading } = useContactPointNotificationsById(
    notificationId
  );

  if (isLoading) return <div>Loading notification...</div>;

  return (
    <div>
      <h2>{notification?.title}</h2>
      <p>{notification?.message}</p>
      <span>Status: {notification?.status}</span>
      <span>Sent: {notification?.sentAt}</span>
    </div>
  );
}
```

### Conditional Fetching

```tsx
function ConditionalNotification({ shouldFetch, id }: { 
  shouldFetch: boolean; 
  id: string; 
}) {
  const { data } = useContactPointNotificationsById(id, {
    enabled: shouldFetch
  });

  return <div>{data?.title || 'No notification loaded'}</div>;
}
```

## Selector Support

Both hooks support selector functions for data transformation:

### Transform List Data

```tsx
// Extract only notification titles
const { data: titles } = useContactPointNotifications(
  { page: 1, limit: 10 },
  {
    select: (data) => data.items.map(notification => notification.title)
  }
);
```

### Transform Single Notification

```tsx
// Extract specific fields
const { data: summary } = useContactPointNotificationsById(id, {
  select: (notification) => ({
    title: notification.title,
    status: notification.status,
    isRecent: Date.now() - new Date(notification.createdAt).getTime() < 86400000
  })
});
```

### Computed Properties

```tsx
const { data: enhancedData } = useContactPointNotifications(params, {
  select: (data) => ({
    ...data,
    items: data.items.map(notification => ({
      ...notification,
      displayStatus: notification.status.toUpperCase(),
      age: formatDistanceToNow(new Date(notification.createdAt))
    }))
  })
});
```

## Caching Strategy

### Cache Keys
- **List queries**: Cached by token + query parameters
- **Individual notifications**: Cached by token + notification ID
- **Automatic invalidation**: Occurs when authentication changes

### Cache Behavior
```tsx
// Cache is automatically managed
const query1 = useContactPointNotifications({ page: 1, status: 'sent' });
const query2 = useContactPointNotifications({ page: 1, status: 'sent' }); // Uses cache

const query3 = useContactPointNotifications({ page: 1, status: 'pending' }); // New request
```

### Manual Cache Management

```tsx
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';

function NotificationManager() {
  const queryClient = useQueryClient();
  const { token } = useAccessToken();

  const refreshNotifications = () => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.contactPointsNotifications.getList(token?.token || '', {}).queryKey
    });
  };

  return <button onClick={refreshNotifications}>Refresh</button>;
}
```

## Error Handling

Errors are handled through TanStack Query's built-in error management:

### Basic Error Handling

```tsx
function NotificationsWithErrorHandling() {
  const { data, error, isError } = useContactPointNotifications({
    page: 1,
    limit: 10
  });

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return <div>{/* Render notifications */}</div>;
}
```

### Error Boundaries

```tsx
import { ErrorBoundary } from 'react-error-boundary';

function NotificationsPage() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <NotificationsList />
    </ErrorBoundary>
  );
}
```

### Retry Logic

```tsx
const { data, refetch, isError } = useContactPointNotifications(params, {
  retry: 3,
  retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
});
```

## Related Services

### ContactPointNotificationService

The hooks integrate with the `ContactPointNotificationService`:

```tsx
// Service methods used by hooks
ContactPointNotificationService.getList(params, signal)
ContactPointNotificationService.getById(id, signal)
```

### Integration Example

```tsx
// The service handles the actual API calls
import { ContactPointNotificationService } from '@/lib/services/contact-point-notification-service';

// Hooks abstract the service complexity
const { data } = useContactPointNotifications({ page: 1, limit: 10 });
```

## Best Practices

### 1. Parameter Management
```tsx
// Good: Stable parameter objects
const params = useMemo(() => ({
  page: currentPage,
  limit: 10,
  status: selectedStatus
}), [currentPage, selectedStatus]);

const { data } = useContactPointNotifications(params);
```

### 2. Selective Rendering
```tsx
// Good: Use selectors to minimize re-renders
const { data: notificationCount } = useContactPointNotifications(params, {
  select: (data) => data.totalCount
});
```

### 3. Loading States
```tsx
// Good: Handle all loading states
const { data, isLoading, isFetching, isError } = useContactPointNotifications(params);

return (
  <div>
    {isLoading && <div>Initial load...</div>}
    {isFetching && !isLoading && <div>Updating...</div>}
    {isError && <div>Error occurred</div>}
    {data && <NotificationsList data={data} />}
  </div>
);
```

### 4. Authentication Integration
```tsx
// Good: Hooks automatically handle authentication
// No manual token management needed
const { data } = useContactPointNotifications(params);

// The hook handles isAuthorizedAndVerified automatically
```

### 5. Type Safety
```tsx
// Good: Use generic types for custom selectors
const { data } = useContactPointNotifications<string[]>(params, {
  select: (data) => data.items.map(n => n.id) // TypeScript knows this returns string[]
});
```