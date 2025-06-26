# Stats Service Documentation

## Purpose

The `stats-service` provides access to statistical data and analytics through platform APIs. It manages endpoints for retrieving article counts over time intervals, total platform counts, and top entities statistics. The service follows our standardized architecture patterns with separate public and private API access.

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getIntervalArticleCounts` | `GetIntervalArticleCountsParams`, `AbortSignal?` | `Promise<StatResult<IntervalArticleCounts>>` | Retrieves article counts grouped by time intervals |
| `getTotalCounts` | `AbortSignal?` | `Promise<TotalCounts>` | Fetches total counts for all platform entities |
| `getTopEntitiesCounts` | `GetTopEntitiesParams`, `AbortSignal?` | `Promise<TopEntitiesCounts>` | Gets top entities counts for specified entity types |

## Authentication

### Private API Access
- **Service**: `StatsService`
- **Wrapper**: `PrivateApiServiceWrapper`
- **Credentials**: Automatically managed by the wrapper
- **Base Path**: `/platform-api`

### Public API Access
- **Service**: `PublicStatsServiceBuilder`
- **Wrapper**: `PublicPlatformApiServiceWrapper`
- **Credentials**: None required
- **Base Path**: `/platform-api/public`

## Error Handling

The service follows our standard error handling pattern:
- **No internal error handling**: Methods throw exceptions for non-2xx responses
- **HttpException pattern**: HTTP errors are thrown as HttpException instances
- **Query layer responsibility**: Error handling is managed by TanStack Query hooks
- **AbortSignal support**: All methods support request cancellation via AbortSignal

## Usage Examples

### Private API Usage

```typescript
import { StatsService } from '@/lib/services/stats-service';

// Get interval article counts with daily splits
const intervalCounts = await StatsService.getIntervalArticleCounts({
  splitBy: 'day',
  startDate: '2024-01-01',
  endDate: '2024-01-31',
  topics: ['technology', 'finance']
});

// Get total platform counts
const totalCounts = await StatsService.getTotalCounts();

// Get top entities for multiple entity types
const topEntities = await StatsService.getTopEntitiesCounts({
  entity: ['topics', 'companies', 'sources'],
  limit: 10
});
```

### Public API Usage

```typescript
import { PublicStatsServiceBuilder } from '@/lib/services/stats-service';

// Build public service instance
const publicStatsService = PublicStatsServiceBuilder();

// Get public interval article counts
const publicIntervalCounts = await publicStatsService.getIntervalArticleCounts({
  splitBy: 'week',
  topics: ['public-topic']
});

// Get public top entities
const publicTopEntities = await publicStatsService.getTopEntitiesCounts({
  entity: 'topics'
});
```

### With AbortSignal

```typescript
const controller = new AbortController();

try {
  const counts = await StatsService.getIntervalArticleCounts(
    { splitBy: 'hour' },
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
interface GetIntervalArticleCountsParams extends AllEndpointParams {
  splitBy?: 'hour' | 'day' | 'week' | 'month' | 'none';
}

interface GetTopEntitiesParams extends AllEndpointParams {
  entity?: TopEntity | TopEntity[];
}

type TopEntity = 
  | 'topics'
  | 'people'
  | 'companies'
  | 'cities'
  | 'journalists'
  | 'journalistsById'
  | 'sources';
```

### Response Types

```typescript
// Interval article counts with statistical result wrapper
StatResult<IntervalArticleCounts>

// Total platform counts
TotalCounts

// Top entities counts
TopEntitiesCounts
```

### Base Types

- `AllEndpointParams`: Common filtering parameters (dates, topics, sources, etc.)
- `StatResult<T>`: Statistical result wrapper with metadata
- `IntervalArticleCounts`: Time-series article count data
- `TotalCounts`: Aggregate count data for all entities
- `TopEntitiesCounts`: Ranked entity counts

## Dependencies

### Service Wrappers
- `PrivateApiServiceWrapper`: Handles private API authentication and configuration
- `PublicPlatformApiServiceWrapper`: Manages public API access without authentication

### Utilities
- `Fetch`: HTTP client utility for API requests
- Type definitions from `@/lib/types`

### Core Patterns
- **Actions factory pattern**: `actions(prefix)` creates method implementations
- **Wrapper composition**: Service wrappers provide authentication and configuration
- **Prefix-based routing**: Different API endpoints via prefix configuration

## Integration

### TanStack Query Integration

```typescript
// Query hook usage
const useIntervalArticleCounts = (params: GetIntervalArticleCountsParams) => {
  return useQuery({
    queryKey: ['stats', 'intervalArticleCounts', params],
    queryFn: ({ signal }) => StatsService.getIntervalArticleCounts(params, signal),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Mutation for real-time updates
const useStatsRefresh = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => StatsService.getTotalCounts(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });
};
```

### Caching Strategy

```typescript
// Optimistic updates for stats
const prefetchTopEntities = async (entity: TopEntity[]) => {
  await queryClient.prefetchQuery({
    queryKey: ['stats', 'topEntities', { entity }],
    queryFn: () => StatsService.getTopEntitiesCounts({ entity }),
    staleTime: 10 * 60 * 1000, // 10 minutes for stats
  });
};
```

## Best Practices

### Service Architecture Adherence

✅ **Simple, focused methods**: Each method has a single responsibility
✅ **No error handling**: Errors bubble up to query hooks
✅ **No data transformation**: Returns raw API responses
✅ **Proper credential management**: Uses appropriate service wrappers
✅ **HTTP Exception pattern**: Throws HttpException for non-2xx responses

### Usage Guidelines

```typescript
// ✅ Good: Let query hooks handle errors
const { data, error, isLoading } = useQuery({
  queryKey: ['stats', 'counts'],
  queryFn: () => StatsService.getTotalCounts(),
});

// ❌ Bad: Don't handle errors in service calls
try {
  const counts = await StatsService.getTotalCounts();
} catch (error) {
  // This should be handled by query hooks
}

// ✅ Good: Use AbortSignal for cancellation
const { data } = useQuery({
  queryKey: ['stats', 'interval', params],
  queryFn: ({ signal }) => StatsService.getIntervalArticleCounts(params, signal),
});

// ✅ Good: Leverage TypeScript for type safety
const topEntitiesParams: GetTopEntitiesParams = {
  entity: ['topics', 'companies'],
  limit: 20,
  startDate: '2024-01-01'
};
```

### Performance Considerations

- **Caching**: Stats data is typically cached for 5-10 minutes
- **Pagination**: Use appropriate limits for top entities queries
- **Filtering**: Apply filters at the API level to reduce data transfer
- **Cancellation**: Always support AbortSignal for long-running requests