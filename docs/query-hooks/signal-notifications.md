# Signal Notifications Query Hooks

## Purpose

The signal notifications query hooks provide a centralized interface for managing signal notifications data using TanStack Query. These hooks handle fetching signal notifications with both standard pagination and infinite scrolling patterns, while maintaining proper caching, error handling, and authentication integration.

## Hooks Overview

| Hook | Type | Purpose |
|------|------|---------|
| `useSignalsNotifications` | Query | Fetches paginated signal notifications list |
| `useSignalsNotificationsInfinite` | Infinite Query | Fetches signal notifications with infinite scrolling |

## Query Hooks

### useSignalsNotifications

Fetches a paginated list of signal notifications with full search and filtering capabilities.

**Signature:**
```tsx
function useSignalsNotifications<T = CustomSearchResult<SignalNotification>>(
  params: GetSignalsNotificationsListParams,
  options?: UseQueryOptions<CustomSearchResult<SignalNotification>, T>
)
```

**Parameters:**
- `params` - Query parameters for filtering and pagination
- `options` - TanStack Query options with selector support

**Features:**
- Automatic authentication integration
- Request cancellation support via AbortSignal
- Conditional execution based on auth status
- Full TypeScript support with generic return types

### useSignalsNotificationsInfinite

Provides infinite scrolling functionality for signal notifications with automatic pagination management.

**Signature:**
```tsx
function useSignalsNotificationsInfinite<T = CustomSearchResult<SignalNotification>>(
  params: Omit<GetSignalsNotificationsListParams, 'page' | 'size'>,
  options: UseInfiniteQueryOptions<CustomSearchResult<SignalNotification>, T> = { size: 25 }
)
```

**Parameters:**
- `params` - Query parameters excluding pagination (handled internally)
- `options` - Infinite query options with default page size of 25

**Features:**
- Automatic page parameter management
- Smart next page detection based on total count
- Configurable page size
- Zero-based page indexing

## Query Keys

Query keys are managed using `@lukemorales/query-key-factory` for consistency and type safety:

```tsx
// Standard list query
queryKeys.signalsNotifications.getList(token, params)

// Infinite list query  
queryKeys.signalsNotifications.getListInfinite(token, paramsWithSize)
```

**Key Structure:**
- Includes authentication token for proper cache isolation
- Incorporates all query parameters for granular caching
- Separates standard and infinite query patterns

## Usage Examples

### Basic Signal Notifications List

```tsx
import { useSignalsNotifications } from '@/lib/query-hooks/signal-notifications';

function SignalNotificationsList() {
  const { data, isLoading, error } = useSignalsNotifications({
    page: 0,
    size: 20,
    search: 'important',
    status: 'unread'
  });

  if (isLoading) return <div>Loading notifications...</div>;
  if (error) return <div>Error loading notifications</div>;

  return (
    <div>
      <h2>Signal Notifications ({data?.total})</h2>
      {data?.items.map(notification => (
        <div key={notification.id}>
          <h3>{notification.title}</h3>
          <p>{notification.message}</p>
          <span>Status: {notification.status}</span>
        </div>
      ))}
    </div>
  );
}
```

### Infinite Scrolling Notifications

```tsx
import { useSignalsNotificationsInfinite } from '@/lib/query-hooks/signal-notifications';
import { Fragment } from 'react';

function InfiniteNotificationsList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useSignalsNotificationsInfinite(
    { 
      search: 'alerts',
      priority: 'high' 
    },
    { size: 30 }
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.items.map(notification => (
            <div key={notification.id}>
              <h3>{notification.title}</h3>
              <p>{notification.message}</p>
            </div>
          ))}
        </Fragment>
      ))}
      
      {hasNextPage && (
        <button 
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </button>
      )}
    </div>
  );
}
```

### Custom Query Options

```tsx
function NotificationsWithRefetch() {
  const { data, refetch } = useSignalsNotifications(
    { page: 0, size: 10 },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchInterval: 30 * 1000, // 30 seconds
      refetchOnWindowFocus: true
    }
  );

  return (
    <div>
      <button onClick={() => refetch()}>
        Refresh Notifications
      </button>
      {/* Render notifications */}
    </div>
  );
}
```

## Selector Support

Transform query results using selector functions:

### Extract Specific Data

```tsx
// Get only unread notification count
const unreadCount = useSignalsNotifications(
  { status: 'unread', page: 0, size: 1 },
  {
    select: (data) => data.total,
    enabled: true
  }
);

// Transform notification items
const transformedNotifications = useSignalsNotifications(
  { page: 0, size: 20 },
  {
    select: (data) => ({
      ...data,
      items: data.items.map(notification => ({
        ...notification,
        displayTitle: `[${notification.priority}] ${notification.title}`,
        isUrgent: notification.priority === 'high'
      }))
    })
  }
);
```

### Filter Results Client-Side

```tsx
// Get only high priority notifications
const highPriorityNotifications = useSignalsNotifications(
  { page: 0, size: 100 },
  {
    select: (data) => ({
      ...data,
      items: data.items.filter(n => n.priority === 'high'),
      total: data.items.filter(n => n.priority === 'high').length
    })
  }
);
```

## Caching Strategy

### Cache Keys
- **Isolation**: Each authenticated user has separate cache entries
- **Granularity**: Different parameter combinations create distinct cache entries
- **Consistency**: Standardized key structure across all signal notification queries

### Cache Behavior
```tsx
// These create separate cache entries
useSignalsNotifications({ page: 0, size: 20, status: 'unread' });
useSignalsNotifications({ page: 0, size: 20, status: 'read' });
useSignalsNotifications({ page: 1, size: 20, status: 'unread' });
```

### Infinite Query Caching
- Pages are cached individually and accumulated
- Cache persists across component unmounts
- Efficient memory usage with automatic page management

## Error Handling

Errors are handled through TanStack Query's built-in error management:

```tsx
function NotificationsWithErrorHandling() {
  const { data, error, isError, refetch } = useSignalsNotifications({
    page: 0,
    size: 20
  });

  if (isError) {
    return (
      <div className="error-container">
        <p>Failed to load notifications: {error?.message}</p>
        <button onClick={() => refetch()}>Try Again</button>
      </div>
    );
  }

  // Render success state
}
```

### Error Types
- **Authentication Errors**: Automatically handled by auth integration
- **Network Errors**: Standard HTTP errors from the service layer
- **Validation Errors**: Parameter validation failures

## Related Services

### SignalNotificationService
- **Location**: `@/lib/services/signal-notification-service`
- **Methods**: `getList(params, signal)`
- **Integration**: Direct service calls in queryFn
- **Error Handling**: Throws HttpException for proper TanStack Query error handling

### Dependencies
```tsx
import { SignalNotificationService } from '@/lib/services/signal-notification-service';
import { useAccessToken } from '@/lib/contexts';
import { queryKeys } from '@/lib/query-keys';
```

## Best Practices

### Authentication Integration
```tsx
// ✅ Correct - Authentication handled automatically
const { data } = useSignalsNotifications({ page: 0, size: 20 });

// ❌ Incorrect - Don't manually check auth in components
const { token } = useAccessToken();
if (!token) return null;
```

### Conditional Enabling
```tsx
// ✅ Correct - Use enabled option for conditional queries
const { data } = useSignalsNotifications(
  { page: 0, size: 20 },
  { enabled: shouldFetchNotifications }
);

// ❌ Incorrect - Don't conditionally call hooks
if (shouldFetchNotifications) {
  const { data } = useSignalsNotifications({ page: 0, size: 20 });
}
```

### Infinite Query Best Practices
```tsx
// ✅ Correct - Let the hook manage pagination
const { data, fetchNextPage } = useSignalsNotificationsInfinite({
  search: 'term'
});

// ❌ Incorrect - Don't manually manage pages
const [page, setPage] = useState(0);
const { data } = useSignalsNotifications({ page, size: 20 });
```

### Error Boundaries
```tsx
// ✅ Recommended - Wrap in error boundary for uncaught errors
<ErrorBoundary fallback={<ErrorFallback />}>
  <SignalNotificationsList />
</ErrorBoundary>
```

### Performance Optimization
```tsx
// ✅ Use appropriate stale times
const { data } = useSignalsNotifications(
  { page: 0, size: 20 },
  { 
    staleTime: 5 * 60 * 1000, // 5 minutes for relatively static data
    gcTime: 10 * 60 * 1000,   // 10 minutes garbage collection
  }
);
```