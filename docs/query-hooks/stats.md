# Stats Query Hooks

## Purpose

The stats query hooks manage statistical data retrieval for the application, providing real-time insights into article counts, entity statistics, and overall system metrics. These hooks support both authenticated and public access patterns with proper authorization handling.

## Hooks Overview

| Hook | Type | Purpose |
|------|------|---------|
| `useIntervalArticleCounts` | Query | Fetch article counts over specified time intervals |
| `useTotalCounts` | Query | Retrieve total counts across all entities |
| `useTopEntitiesCounts` | Query | Get statistics for top-performing entities |

## Service Builder

### StatsServiceBuilder

A service builder that provides access to both public and authenticated stats services.

```tsx
const StatsServiceBuilder = ServiceBuilder(
  PublicStatsServiceBuilder,
  StatsService
);
```

The builder automatically selects the appropriate service based on user authentication status and permissions.

## Query Hooks

### useIntervalArticleCounts

Fetches article counts over specified time intervals with customizable parameters.

**Signature:**
```tsx
function useIntervalArticleCounts<T = StatResult<IntervalArticleCounts>>(
  params: GetIntervalArticleCountsParams,
  options?: UseQueryOptions<StatResult<IntervalArticleCounts>, T>
): UseQueryResult<T>
```

**Parameters:**
- `params`: Configuration for interval and filtering
- `options`: TanStack Query options with selector support

**Features:**
- Automatic authorization handling
- Configurable time intervals
- Support for data transformation via selectors

### useTotalCounts

Retrieves comprehensive total counts across all system entities.

**Signature:**
```tsx
function useTotalCounts<T = TotalCounts>(
  options?: UseQueryOptions<TotalCounts, T>
): UseQueryResult<T>
```

**Parameters:**
- `options`: TanStack Query options with selector support

**Features:**
- Simple API with no required parameters
- Cached results for performance
- Real-time updates when data changes

### useTopEntitiesCounts

Fetches statistics for top-performing entities based on specified criteria.

**Signature:**
```tsx
function useTopEntitiesCounts<T = TopEntitiesCounts>(
  params: GetTopEntitiesParams,
  options?: UseQueryOptions<TopEntitiesCounts, T>
): UseQueryResult<T>
```

**Parameters:**
- `params`: Criteria for determining top entities
- `options`: TanStack Query options with selector support

**Features:**
- Flexible ranking parameters
- Customizable result limits
- Support for different entity types

## Query Keys

Query keys are structured using `@lukemorales/query-key-factory` for consistency:

```tsx
// Generated query keys structure
queryKeys.stats.getIntervalArticleCounts(token, params)
queryKeys.stats.getTotalCounts(token)
queryKeys.stats.getTopEntitiesCounts(token, params)
```

**Key Structure:**
- Base: `['stats']`
- Token-based scoping for security
- Parameter-specific keys for precise cache management

## Usage Examples

### Basic Statistics Dashboard

```tsx
function StatsDashboard() {
  // Get total counts
  const { data: totalCounts, isLoading: totalLoading } = useTotalCounts();
  
  // Get article counts for last 30 days
  const { data: intervalCounts } = useIntervalArticleCounts({
    interval: 'day',
    startDate: '2024-01-01',
    endDate: '2024-01-31'
  });
  
  // Get top 10 entities
  const { data: topEntities } = useTopEntitiesCounts({
    limit: 10,
    metric: 'article_count'
  });

  if (totalLoading) return <LoadingSpinner />;

  return (
    <div className="stats-dashboard">
      <TotalCountsCard data={totalCounts} />
      <IntervalChart data={intervalCounts} />
      <TopEntitiesList data={topEntities} />
    </div>
  );
}
```

### Real-time Statistics with Auto-refresh

```tsx
function LiveStatsPanel() {
  const { data: totalCounts } = useTotalCounts({
    refetchInterval: 30000, // Refresh every 30 seconds
    refetchIntervalInBackground: true
  });

  const { data: recentActivity } = useIntervalArticleCounts(
    {
      interval: 'hour',
      startDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date().toISOString()
    },
    {
      refetchInterval: 60000, // Refresh every minute
      staleTime: 30000
    }
  );

  return (
    <div className="live-stats">
      <h2>Live Statistics</h2>
      <div>Total Articles: {totalCounts?.articles}</div>
      <div>Recent Activity: {recentActivity?.data?.length} updates</div>
    </div>
  );
}
```

### Error Handling and Loading States

```tsx
function StatsWithErrorHandling() {
  const {
    data: totalCounts,
    isLoading,
    error,
    refetch
  } = useTotalCounts({
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
  });

  if (isLoading) return <StatsLoadingSkeleton />;
  
  if (error) {
    return (
      <ErrorCard
        title="Failed to load statistics"
        message={error.message}
        onRetry={refetch}
      />
    );
  }

  return <StatsDisplay data={totalCounts} />;
}
```

## Selector Support

All hooks support selector functions for data transformation:

### Custom Data Selection

```tsx
// Select only specific counts
const articleCount = useTotalCounts({
  select: (data) => data.articles
});

// Transform interval data for charting
const chartData = useIntervalArticleCounts(
  { interval: 'day', startDate: '2024-01-01', endDate: '2024-01-31' },
  {
    select: (data) => data.data.map(item => ({
      date: item.date,
      count: item.count,
      label: new Date(item.date).toLocaleDateString()
    }))
  }
);

// Extract top entity names only
const topEntityNames = useTopEntitiesCounts(
  { limit: 5, metric: 'popularity' },
  {
    select: (data) => data.entities.map(entity => entity.name)
  }
);
```

### Computed Statistics

```tsx
function useStatsAnalytics() {
  const totalCounts = useTotalCounts();
  
  const weeklyTrend = useIntervalArticleCounts(
    {
      interval: 'day',
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date().toISOString()
    },
    {
      select: (data) => {
        const counts = data.data.map(d => d.count);
        return {
          total: counts.reduce((sum, count) => sum + count, 0),
          average: counts.reduce((sum, count) => sum + count, 0) / counts.length,
          trend: counts[counts.length - 1] - counts[0]
        };
      }
    }
  );

  return {
    totalCounts: totalCounts.data,
    weeklyAnalytics: weeklyTrend.data,
    isLoading: totalCounts.isLoading || weeklyTrend.isLoading
  };
}
```

## Caching Strategy

### Cache Keys and Invalidation

```tsx
// Invalidate all stats when data changes
queryClient.invalidateQueries({ queryKey: queryKeys.stats._def });

// Invalidate specific stats
queryClient.invalidateQueries({ 
  queryKey: queryKeys.stats.getTotalCounts._def 
});

// Invalidate interval data for specific parameters
queryClient.invalidateQueries({ 
  queryKey: queryKeys.stats.getIntervalArticleCounts(token, params)._def 
});
```

### Stale Time Configuration

```tsx
// Different stale times based on data volatility
const { data: totalCounts } = useTotalCounts({
  staleTime: 5 * 60 * 1000, // 5 minutes - changes frequently
});

const { data: topEntities } = useTopEntitiesCounts(params, {
  staleTime: 30 * 60 * 1000, // 30 minutes - changes less frequently
});
```

## Error Handling

### Service Integration

The hooks integrate with services that throw `HttpException` for consistent error handling:

```tsx
function StatsErrorBoundary({ children }: { children: React.ReactNode }) {
  const { data, error } = useTotalCounts();

  // HttpException errors are automatically handled by TanStack Query
  if (error instanceof HttpException) {
    switch (error.status) {
      case 401:
        return <AuthenticationRequired />;
      case 403:
        return <InsufficientPermissions />;
      case 429:
        return <RateLimitExceeded />;
      default:
        return <GenericError error={error} />;
    }
  }

  return <>{children}</>;
}
```

### Retry Strategies

```tsx
// Custom retry logic for different error types
const { data } = useIntervalArticleCounts(params, {
  retry: (failureCount, error) => {
    if (error instanceof HttpException) {
      // Don't retry client errors
      if (error.status >= 400 && error.status < 500) {
        return false;
      }
    }
    return failureCount < 3;
  },
  retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
});
```

## Related Services

### Service Dependencies

```tsx
// Core service files
import { StatsService } from '@/lib/services/stats-service';
import { PublicStatsServiceBuilder } from '@/lib/services/stats-service';

// Type definitions
import {
  GetIntervalArticleCountsParams,
  GetTopEntitiesParams,
  IntervalArticleCounts,
  TopEntitiesCounts,
  TotalCounts
} from '@/lib/types';
```

### Authentication Integration

```tsx
// Automatic service selection based on auth state
const { isAuthorizedAndVerified, isPublic, token } = useAccessToken();

// Service builder handles the complexity
const service = StatsServiceBuilder(isAuthorizedAndVerified, isPublic, token);
```

## Best Practices

### 1. Query Key Consistency

```tsx
// ✅ Good: Use provided query keys
const queryResult = useQuery({
  ...queryKeys.stats.getTotalCounts(token?.token || ''),
  queryFn: () => service.getTotalCounts()
});

// ❌ Bad: Manual query keys
const queryResult = useQuery({
  queryKey: ['stats', 'total'],
  queryFn: () => service.getTotalCounts()
});
```

### 2. Authorization Handling

```tsx
// ✅ Good: Let hooks handle authorization
const { data } = useTotalCounts();

// ❌ Bad: Manual authorization checks
const { isAuthorizedAndVerified } = useAccessToken();
const { data } = useQuery({
  queryKey: ['stats'],
  queryFn: () => {
    if (!isAuthorizedAndVerified) throw new Error('Not authorized');
    return statsService.getTotalCounts();
  }
});
```

### 3. Parameter Validation

```tsx
// ✅ Good: Validate parameters before querying
function useValidatedIntervalCounts(params: GetIntervalArticleCountsParams) {
  const isValidDateRange = params.startDate && params.endDate && 
    new Date(params.startDate) < new Date(params.endDate);

  return useIntervalArticleCounts(params, {
    enabled: isValidDateRange
  });
}
```

### 4. Loading State Management

```tsx
// ✅ Good: Coordinate multiple loading states
function useStatsOverview() {
  const totalQuery = useTotalCounts();
  const topEntitiesQuery = useTopEntitiesCounts({ limit: 10 });

  return {
    data: {
      total: totalQuery.data,
      topEntities: topEntitiesQuery.data
    },
    isLoading: totalQuery.isLoading || topEntitiesQuery.isLoading,
    error: totalQuery.error || topEntitiesQuery.error
  };
}
```

### 5. Selective Data Updates

```tsx
// ✅ Good: Use selectors to prevent unnecessary re-renders
const articleCount = useTotalCounts({
  select: useCallback((data) => data.articles, [])
});

// Component only re-renders when article count changes
```