# Monitors Query Hooks

## Purpose

The monitors query hooks manage uptime monitoring data, providing standardized access to monitor configurations and status information. These hooks integrate with the UptimeService to fetch and manage monitor-related data with proper caching, error handling, and type safety.

## Hooks Overview

| Hook | Type | Purpose | Returns |
|------|------|---------|---------|
| `useMonitors` | Query | Fetch list of all monitors | `UseQueryResult<Monitors>` |

## Query Hooks

### useMonitors

Fetches the complete list of monitors with their configurations and current status.

```typescript
function useMonitors<T = Monitors>(
  options?: UseQueryOptions<Monitors, T>
): UseQueryResult<T, HttpException>
```

**Parameters:**
- `options?` - Optional query configuration and selector function

**Features:**
- Automatic background refetching
- Selector support for data transformation
- Proper error handling with HttpException
- Signal-based request cancellation

## Query Keys

Query keys are managed using `@lukemorales/query-key-factory` for consistency and type safety:

```typescript
// Generated from queryKeys.monitors.getList
{
  queryKey: ['monitors', 'list'],
  // Additional query key metadata available
}
```

**Key Structure:**
- `['monitors', 'list']` - All monitors list query

## Usage Examples

### Basic Monitor List Fetching

```typescript
import { useMonitors } from '@/lib/query-hooks/monitors';

function MonitorDashboard() {
  const { 
    data: monitors, 
    isLoading, 
    error,
    refetch 
  } = useMonitors();

  if (isLoading) return <div>Loading monitors...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Monitors ({monitors?.length || 0})</h2>
      {monitors?.map(monitor => (
        <div key={monitor.id}>
          <h3>{monitor.name}</h3>
          <p>Status: {monitor.status}</p>
          <p>URL: {monitor.url}</p>
        </div>
      ))}
      <button onClick={() => refetch()}>
        Refresh Monitors
      </button>
    </div>
  );
}
```

### With Loading States and Error Handling

```typescript
import { useMonitors } from '@/lib/query-hooks/monitors';

function MonitorsList() {
  const { 
    data: monitors,
    isLoading,
    isFetching,
    error,
    isError 
  } = useMonitors();

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2>System Monitors</h2>
        {isFetching && <div className="spinner">Updating...</div>}
      </div>

      {isLoading ? (
        <div>Loading monitors...</div>
      ) : isError ? (
        <div className="error">
          Failed to load monitors: {error.message}
        </div>
      ) : (
        <div className="monitors-grid">
          {monitors?.map(monitor => (
            <MonitorCard key={monitor.id} monitor={monitor} />
          ))}
        </div>
      )}
    </div>
  );
}
```

### Background Refetching Configuration

```typescript
import { useMonitors } from '@/lib/query-hooks/monitors';

function MonitorStatus() {
  const { data: monitors } = useMonitors({
    refetchInterval: 30000, // Refetch every 30 seconds
    refetchIntervalInBackground: true,
    staleTime: 10000, // Consider data stale after 10 seconds
    cacheTime: 300000, // Cache for 5 minutes
  });

  const activeMonitors = monitors?.filter(m => m.enabled);

  return (
    <div>
      <h3>Active Monitors: {activeMonitors?.length || 0}</h3>
      {/* Real-time monitor status display */}
    </div>
  );
}
```

## Selector Support

Transform monitor data using selector functions for optimized re-renders:

### Count Active Monitors

```typescript
import { useMonitors } from '@/lib/query-hooks/monitors';

function MonitorStats() {
  const activeCount = useMonitors({
    select: (monitors) => monitors?.filter(m => m.enabled).length || 0
  });

  const downCount = useMonitors({
    select: (monitors) => 
      monitors?.filter(m => m.status === 'down').length || 0
  });

  return (
    <div className="monitor-stats">
      <div>Active: {activeCount.data}</div>
      <div>Down: {downCount.data}</div>
    </div>
  );
}
```

### Transform to Options List

```typescript
import { useMonitors } from '@/lib/query-hooks/monitors';

function MonitorSelector() {
  const { data: monitorOptions } = useMonitors({
    select: (monitors) => 
      monitors?.map(monitor => ({
        value: monitor.id,
        label: `${monitor.name} (${monitor.status})`,
        disabled: !monitor.enabled
      })) || []
  });

  return (
    <select>
      {monitorOptions?.map(option => (
        <option 
          key={option.value} 
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}
```

### Group by Status

```typescript
import { useMonitors } from '@/lib/query-hooks/monitors';

function GroupedMonitors() {
  const { data: groupedMonitors } = useMonitors({
    select: (monitors) => 
      monitors?.reduce((groups, monitor) => {
        const status = monitor.status;
        if (!groups[status]) groups[status] = [];
        groups[status].push(monitor);
        return groups;
      }, {} as Record<string, typeof monitors>)
  });

  return (
    <div>
      {Object.entries(groupedMonitors || {}).map(([status, monitors]) => (
        <div key={status}>
          <h3>{status.toUpperCase()} ({monitors.length})</h3>
          {monitors.map(monitor => (
            <div key={monitor.id}>{monitor.name}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
```

## Caching Strategy

### Cache Configuration

```typescript
// Default caching behavior
const monitors = useMonitors({
  staleTime: 60000,        // Data fresh for 1 minute
  cacheTime: 300000,       // Cache for 5 minutes
  refetchOnWindowFocus: true,  // Refetch when window gains focus
  refetchOnMount: true,    // Refetch on component mount
});
```

### Cache Invalidation

```typescript
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';

function MonitorActions() {
  const queryClient = useQueryClient();

  const handleRefreshMonitors = () => {
    // Invalidate and refetch monitors
    queryClient.invalidateQueries(queryKeys.monitors.getList);
  };

  const handleResetMonitorCache = () => {
    // Remove from cache entirely
    queryClient.removeQueries(queryKeys.monitors.getList);
  };

  return (
    <div>
      <button onClick={handleRefreshMonitors}>
        Refresh Monitors
      </button>
      <button onClick={handleResetMonitorCache}>
        Reset Cache
      </button>
    </div>
  );
}
```

## Error Handling

### Error Boundary Integration

```typescript
import { useMonitors } from '@/lib/query-hooks/monitors';
import { ErrorBoundary } from 'react-error-boundary';

function MonitorsWithErrorBoundary() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <MonitorsList />
    </ErrorBoundary>
  );
}

function MonitorsList() {
  const { data: monitors, error, isError } = useMonitors({
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    useErrorBoundary: error => error.status >= 500,
  });

  if (isError && error.status < 500) {
    return <div>Unable to load monitors: {error.message}</div>;
  }

  return (
    <div>
      {monitors?.map(monitor => (
        <div key={monitor.id}>{monitor.name}</div>
      ))}
    </div>
  );
}
```

### Custom Error Handling

```typescript
import { useMonitors } from '@/lib/query-hooks/monitors';
import { HttpException } from '@/lib/types';

function MonitorsDashboard() {
  const { data, error, isError } = useMonitors({
    onError: (error: HttpException) => {
      if (error.status === 401) {
        // Handle authentication error
        redirectToLogin();
      } else if (error.status >= 500) {
        // Handle server errors
        showErrorNotification('Server error occurred');
      }
    },
  });

  if (isError) {
    return (
      <div className="error-state">
        <h3>Failed to load monitors</h3>
        <p>Status: {error.status}</p>
        <p>Message: {error.message}</p>
      </div>
    );
  }

  return <div>{/* Monitor list */}</div>;
}
```

## Related Services

### UptimeService Integration

```typescript
// UptimeService methods used by monitors hooks
export interface UptimeService {
  getMonitorsList(signal?: AbortSignal): Promise<Monitors>;
  // Other uptime-related methods...
}
```

### Service Builder Pattern

```typescript
import { UptimeService } from '@/lib/query-hooks/monitors';

// Service instance is created and exported
const uptimeService = UptimeService;

// Use in custom implementations
async function getMonitorsWithRetry() {
  try {
    return await uptimeService.getMonitorsList();
  } catch (error) {
    // Custom retry logic
    throw error;
  }
}
```

## Best Practices

### 1. Proper Hook Usage

```typescript
// ✅ Good - Use hooks at component level
function MonitorComponent() {
  const { data: monitors } = useMonitors();
  return <div>{monitors?.length} monitors</div>;
}

// ❌ Bad - Don't use hooks conditionally
function BadMonitorComponent({ showMonitors }: { showMonitors: boolean }) {
  if (showMonitors) {
    const { data } = useMonitors(); // Violates rules of hooks
    return <div>{data?.length}</div>;
  }
  return null;
}
```

### 2. Selector Optimization

```typescript
// ✅ Good - Stable selector functions
const selectActiveMonitors = (monitors: Monitors) => 
  monitors?.filter(m => m.enabled) || [];

function MonitorsList() {
  const { data: activeMonitors } = useMonitors({
    select: selectActiveMonitors
  });
  
  return <div>{activeMonitors.length} active</div>;
}

// ❌ Bad - Inline selectors cause unnecessary re-renders
function BadMonitorsList() {
  const { data: activeMonitors } = useMonitors({
    select: (monitors) => monitors?.filter(m => m.enabled) || []
  });
  
  return <div>{activeMonitors.length} active</div>;
}
```

### 3. Error Handling Strategy

```typescript
// ✅ Good - Comprehensive error handling
function MonitorsList() {
  const {
    data: monitors,
    error,
    isError,
    isLoading,
    refetch
  } = useMonitors({
    retry: (failureCount, error) => {
      // Don't retry on client errors
      if (error.status >= 400 && error.status < 500) {
        return false;
      }
      return failureCount < 3;
    },
  });

  if (isLoading) return <MonitorsSkeleton />;
  
  if (isError) {
    return (
      <ErrorState 
        error={error} 
        onRetry={refetch}
        title="Failed to load monitors"
      />
    );
  }

  return <MonitorsGrid monitors={monitors} />;
}
```

### 4. Performance Optimization

```typescript
// ✅ Good - Optimize with selectors and stable references
import { useMemo } from 'react';

function OptimizedMonitorStats() {
  const { data: stats } = useMonitors({
    select: useMemo(() => (monitors: Monitors) => ({
      total: monitors?.length || 0,
      active: monitors?.filter(m => m.enabled).length || 0,
      down: monitors?.filter(m => m.status === 'down').length || 0,
    }), [])
  });

  return (
    <div className="monitor-stats">
      <StatCard label="Total" value={stats?.total} />
      <StatCard label="Active" value={stats?.active} />
      <StatCard label="Down" value={stats?.down} />
    </div>
  );
}
```