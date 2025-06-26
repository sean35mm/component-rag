# Stories Query Hooks

## Purpose

The Stories query hooks provide a comprehensive interface for fetching and managing story-related data, including story lists, story velocity metrics, story history, and individual story details. These hooks integrate with the Story Service to handle authentication, caching, and data transformation for story operations.

## Hooks Overview

| Hook | Type | Purpose |
|------|------|---------|
| `useStoriesListWithPageInfo` | Query | Fetch paginated list of stories with page information |
| `useStoriesWithPageInfoAndSelectedArticles` | Query | Fetch stories with page info and selected articles |
| `useStoryHistorySuspenseInfinite` | Suspense Infinite Query | Infinite scroll for story history records |
| `useStoryVelocity` | Query | Fetch story velocity metrics with configurable time buckets |
| `useStoryVelocitySuspense` | Suspense Query | Suspense version of story velocity fetching |
| `useStoryById` | Query | Fetch individual story by cluster ID |
| `useStoryByIdSuspense` | Suspense Query | Suspense version of story by ID fetching |

## Query Hooks

### useStoriesListWithPageInfo

Fetches a paginated list of stories with page information.

```tsx
export function useStoriesListWithPageInfo<
  T = StandardSearchResult<StoryWithPageInfo>,
>(
  params: GetStoriesListParams = {},
  options?: UseQueryOptions<StandardSearchResult<StoryWithPageInfo>, T>
)
```

**Parameters:**
- `params` - Query parameters for filtering and pagination
- `options` - TanStack Query options with selector support

**Features:**
- Automatic authentication handling
- Pagination support
- Configurable filtering and sorting

### useStoriesWithPageInfoAndSelectedArticles

Fetches stories with additional selected articles data.

```tsx
export function useStoriesWithPageInfoAndSelectedArticles<
  T = StandardSearchResult<StoryWithPageInfoAndSelectedArticles>,
>(
  params: GetStoriesListParams = {},
  options?: UseQueryOptions<
    StandardSearchResult<StoryWithPageInfoAndSelectedArticles>,
    T
  >
)
```

**Features:**
- Enhanced story data with selected articles
- Same filtering capabilities as basic story list
- Optimized for detailed story views

### useStoryHistorySuspenseInfinite

Provides infinite scrolling for story history records using Suspense.

```tsx
export function useStoryHistorySuspenseInfinite<
  T = StandardSearchResult<StoryHistoryRecord>,
>(
  params: Omit<GetStoriesHistoryParams, 'page' | 'size'> = {},
  isAuthorizedAndVerified: boolean,
  isPublic: boolean,
  token?: AccessToken,
  options: UseSuspenseInfiniteQueryOptions<
    StandardSearchResult<StoryHistoryRecord>,
    T
  > = { size: 100 }
)
```

**Features:**
- Infinite scrolling with automatic page management
- Suspense integration for loading states
- Configurable page size (default: 100)
- Manual authentication parameters for advanced use cases

### useStoryVelocity

Fetches story velocity metrics with configurable time buckets.

```tsx
export function useStoryVelocity<T = StatResult<StoryVelocity>>(
  params: Required<Pick<GetStoryVelocityParams, 'clusterId'>> &
    Partial<GetStoryVelocityParams>,
  options?: UseQueryOptions<StatResult<StoryVelocity>, T>
)
```

**Default Parameters:**
```tsx
const INITIAL_VELOCITY_PARAMS = {
  bucketSize: 4,
  bucketTimeUnit: 'hour',
};
```

**Features:**
- Configurable time bucket analysis
- Default 4-hour bucket size
- Statistical result format

### useStoryVelocitySuspense

Suspense version of story velocity fetching with manual authentication.

```tsx
export function useStoryVelocitySuspense<T = StatResult<StoryVelocity>>(
  params: Required<Pick<GetStoryVelocityParams, 'clusterId'>> &
    Partial<GetStoryVelocityParams>,
  isAuthorizedAndVerified: boolean,
  isPublic: boolean,
  token?: AccessToken,
  options?: UseSuspenseQueryOptions<StatResult<StoryVelocity>, T>
)
```

**Features:**
- Suspense integration
- Manual authentication control
- Same velocity analysis as regular hook

### useStoryById

Fetches individual story details by cluster ID.

```tsx
export function useStoryById<T = StoryWithPageInfo | null>(
  clusterId: string,
  options?: UseQueryOptions<StoryWithPageInfo | null, T>
)
```

**Implementation Details:**
- Uses `getStoriesListWithPageInfo` with `clusterId` filter
- Returns first result or `null`
- Includes duplicates and limits to 1 result

### useStoryByIdSuspense

Suspense version of individual story fetching.

```tsx
export function useStoryByIdSuspense<T = StoryWithPageInfo | null>(
  clusterId: string,
  isAuthorizedAndVerified: boolean,
  isPublic: boolean,
  token?: AccessToken,
  options?: UseSuspenseQueryOptions<StoryWithPageInfo | null, T>
)
```

**Features:**
- Suspense integration
- Memoized query configuration
- Manual authentication parameters

## Query Keys

Query keys are managed through the `queryKeys.stories` factory:

```tsx
// Story list with page info
queryKeys.stories.getStoriesListWithPageInfo(token, params)

// Stories with selected articles
queryKeys.stories.getStoriesListWithPageInfoAndSelectedArticles(token, params)

// Story history infinite
queryKeys.stories.getStoryHistoryInfinite(token, params)

// Story velocity
queryKeys.stories.getStoryVelocity(token, params)
```

**Key Structure:**
- Includes authentication token for user-specific caching
- Parameters are part of the key for granular cache management
- Separate keys for different data shapes (pageInfo vs selectedArticles)

## Usage Examples

### Basic Story List

```tsx
function StoriesPage() {
  const {
    data: stories,
    isLoading,
    error
  } = useStoriesListWithPageInfo({
    size: 20,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  if (isLoading) return <div>Loading stories...</div>;
  if (error) return <div>Error loading stories</div>;

  return (
    <div>
      {stories?.results.map(story => (
        <StoryCard key={story.clusterId} story={story} />
      ))}
    </div>
  );
}
```

### Story Velocity Dashboard

```tsx
function StoryVelocityChart({ clusterId }: { clusterId: string }) {
  const { data: velocity } = useStoryVelocity(
    {
      clusterId,
      bucketSize: 6,
      bucketTimeUnit: 'hour'
    },
    {
      refetchInterval: 5 * 60 * 1000, // Refresh every 5 minutes
      staleTime: 2 * 60 * 1000 // Consider stale after 2 minutes
    }
  );

  return (
    <VelocityChart
      data={velocity?.results}
      bucketSize={6}
      timeUnit="hour"
    />
  );
}
```

### Infinite Story History

```tsx
function StoryHistoryInfinite() {
  const { isAuthorizedAndVerified, isPublic, token } = useAccessToken();
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useStoryHistorySuspenseInfinite(
    { clusterId: 'story-123' },
    isAuthorizedAndVerified,
    isPublic,
    token,
    { size: 50 }
  );

  return (
    <div>
      {data.pages.map((page, i) => (
        <div key={i}>
          {page.results.map(record => (
            <HistoryRecord key={record.id} record={record} />
          ))}
        </div>
      ))}
      
      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
}
```

### Individual Story with Suspense

```tsx
function StoryDetailsSuspense({ clusterId }: { clusterId: string }) {
  const { isAuthorizedAndVerified, isPublic, token } = useAccessToken();
  
  const story = useStoryByIdSuspense(
    clusterId,
    isAuthorizedAndVerified,
    isPublic,
    token
  );

  if (!story) {
    return <div>Story not found</div>;
  }

  return <StoryDetails story={story} />;
}

function StoryPage({ clusterId }: { clusterId: string }) {
  return (
    <Suspense fallback={<StoryDetailsSkeleton />}>
      <StoryDetailsSuspense clusterId={clusterId} />
    </Suspense>
  );
}
```

## Selector Support

All hooks support selector functions for data transformation:

```tsx
// Extract only story titles
const storyTitles = useStoriesListWithPageInfo(
  {},
  {
    select: (data) => data.results.map(story => story.title)
  }
);

// Get velocity peak values
const peakVelocity = useStoryVelocity(
  { clusterId: 'story-123' },
  {
    select: (data) => Math.max(...data.results.map(v => v.value))
  }
);

// Transform story data for display
const displayStory = useStoryById(
  clusterId,
  {
    select: (story) => story ? {
      id: story.clusterId,
      title: story.title,
      articleCount: story.numArticles,
      lastUpdated: story.updatedAt
    } : null
  }
);
```

## Caching Strategy

### Cache Keys
- **User-specific**: All keys include authentication token
- **Parameter-based**: Different parameters create separate cache entries
- **Granular**: Separate keys for different data shapes

### Cache Behavior
```tsx
// Stories list - 5 minute cache
useStoriesListWithPageInfo({}, {
  staleTime: 5 * 60 * 1000,
  cacheTime: 30 * 60 * 1000
});

// Real-time velocity - frequent updates
useStoryVelocity({ clusterId }, {
  staleTime: 1 * 60 * 1000, // 1 minute
  refetchInterval: 2 * 60 * 1000 // 2 minutes
});

// Individual story - longer cache
useStoryById(clusterId, {
  staleTime: 10 * 60 * 1000, // 10 minutes
  cacheTime: 60 * 60 * 1000 // 1 hour
});
```

### Cache Relationships
- Story lists and individual stories share related data
- Velocity queries are independent and frequently updated
- History queries use infinite cache with page-based invalidation

## Error Handling

All hooks follow the standard TanStack Query error handling pattern:

```tsx
function StoriesWithErrorHandling() {
  const {
    data: stories,
    error,
    isError,
    isLoading
  } = useStoriesListWithPageInfo();

  if (isError) {
    // Error is HttpException from service
    if (error.status === 403) {
      return <AccessDeniedMessage />;
    }
    if (error.status === 404) {
      return <NoStoriesMessage />;
    }
    return <GenericErrorMessage error={error} />;
  }

  return <StoriesList stories={stories} />;
}
```

**Error Types:**
- `HttpException` - Service-level HTTP errors
- Network errors - Connection and timeout issues
- Validation errors - Invalid parameters

## Related Services

### StoryService Integration
```tsx
// Service builder pattern
const StoryServiceBuilder = ServiceBuilder(
  PublicStoryServiceBuilder,
  StoryService
);

// Automatic service selection based on authentication
StoryServiceBuilder(isAuthorizedAndVerified, isPublic, token)
  .getStoriesListWithPageInfo(params, signal)
```

### Service Methods Used
- `getStoriesListWithPageInfo()` - Basic story listing
- `getStoriesListWithPageInfoAndSelectedArticles()` - Enhanced story data
- `getStoriesHistory()` - Historical story records
- `getStoryVelocity()` - Velocity metrics calculation

## Best Practices

### 1. Authentication Handling
```tsx
// Automatic authentication (recommended)
const stories = useStoriesListWithPageInfo(params);

// Manual authentication (for advanced cases)
const { isAuthorizedAndVerified, isPublic, token } = useAccessToken();
const stories = useStoryByIdSuspense(id, isAuthorizedAndVerified, isPublic, token);
```

### 2. Velocity Parameters
```tsx
// Use defaults for common cases
const velocity = useStoryVelocity({ clusterId });

// Customize for specific analysis
const hourlyVelocity = useStoryVelocity({
  clusterId,
  bucketSize: 1,
  bucketTimeUnit: 'hour'
});
```

### 3. Infinite Queries
```tsx
// Configure appropriate page sizes
const history = useStoryHistorySuspenseInfinite(
  params,
  isAuthorizedAndVerified,
  isPublic,
  token,
  { size: 50 } // Balance between performance and UX
);
```

### 4. Suspense Integration
```tsx
// Wrap Suspense hooks appropriately
<Suspense fallback={<LoadingSpinner />}>
  <StoryVelocityChart clusterId={clusterId} />
</Suspense>
```

### 5. Cache Optimization
```tsx
// Use appropriate stale times based on data freshness requirements
const realtimeData = useStoryVelocity(params, { staleTime: 60000 });
const staticData = useStoryById(id, { staleTime: 600000 });
```