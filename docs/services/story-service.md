# Story Service Documentation

## Purpose

The Story Service manages story-related API operations including story retrieval, filtering, pagination, history tracking, and velocity analytics. It provides access to story data with various expansion options for articles and page information, supporting both public and private API endpoints with proper authentication handling.

## Service Variants

| Service | Wrapper | Authentication | Use Case |
|---------|---------|----------------|----------|
| `SsrStoryService` | `SsrApiServiceWrapper` | Server-side cookies | Server-side rendering |
| `StoryService` | `PrivateApiServiceWrapper` | Private API credentials | Authenticated client operations |
| `PublicStoryServiceBuilder` | `PublicPlatformApiServiceWrapper` | Public API credentials | Public client operations |

## Methods

### Story Retrieval Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getStoriesList` | `GetStoriesListParams`, `AbortSignal?` | `Promise<StandardSearchResult<Story>>` | Retrieve stories list without expanded data |
| `getStoriesListWithPageInfo` | `GetStoriesListParams`, `AbortSignal?` | `Promise<StandardSearchResult<StoryWithPageInfo>>` | Retrieve stories list with page information |
| `getStoriesListWithSelectedArticles` | `GetStoriesListParams`, `AbortSignal?` | `Promise<StandardSearchResult<StoryWithSelectedArticles>>` | Retrieve stories list with expanded articles |
| `getStoriesListWithPageInfoAndSelectedArticles` | `GetStoriesListParams`, `AbortSignal?` | `Promise<StandardSearchResult<StoryWithPageInfoAndSelectedArticles>>` | Retrieve stories list with both page info and expanded articles |

### Analytics Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getStoriesHistory` | `GetStoriesHistoryParams`, `AbortSignal?` | `Promise<StandardSearchResult<StoryHistoryRecord>>` | Retrieve historical story data |
| `getStoryVelocity` | `GetStoryVelocityParams`, `AbortSignal?` | `Promise<StatResult<StoryVelocity>>` | Retrieve story velocity statistics |

## Authentication

### Private API Authentication
```typescript
// Requires private API credentials via PrivateApiServiceWrapper
const stories = await StoryService.getStoriesList({ topic: 'technology' });
```

### Public API Authentication
```typescript
// Requires public API key via PublicPlatformApiServiceWrapper
const publicService = PublicStoryServiceBuilder('your-api-key');
const stories = await publicService.getStoriesList({ category: 'news' });
```

### SSR Authentication
```typescript
// Uses server-side cookies via SsrApiServiceWrapper
const stories = await SsrStoryService.getStoriesList({ size: 10 });
```

## Error Handling

The service follows the **HttpException pattern** where non-2xx HTTP responses are thrown as exceptions. Error handling is managed by query hooks, not the service layer:

```typescript
// Service throws HttpException for failed requests
// Error handling occurs in query hooks
const { data, error } = useQuery({
  queryKey: ['stories', params],
  queryFn: () => StoryService.getStoriesList(params),
});
```

## Usage Examples

### Basic Story Retrieval
```typescript
import { StoryService } from '@/lib/services/story-service';

// Get stories with basic filtering
const stories = await StoryService.getStoriesList({
  topic: ['technology', 'business'],
  from: '2024-01-01',
  to: '2024-01-31',
  size: 20,
  page: 1
});
```

### Advanced Filtering
```typescript
// Complex story search with multiple filters
const complexSearch = await StoryService.getStoriesListWithSelectedArticles({
  q: 'artificial intelligence',
  country: ['US', 'GB'],
  minClusterSize: 5,
  sortBy: 'relevance',
  positiveSentimentFrom: 0.7,
  maxArticlesPerStory: 10
});
```

### Story Analytics
```typescript
// Get story history
const history = await StoryService.getStoriesHistory({
  clusterId: 'cluster-123',
  from: '2024-01-01',
  sortBy: 'triggeredAt',
  size: 50
});

// Get story velocity metrics
const velocity = await StoryService.getStoryVelocity({
  clusterId: ['cluster-123', 'cluster-456'],
  bucketTimeUnit: 'hour',
  bucketSize: 24,
  from: '2024-01-01T00:00:00Z'
});
```

### With Abort Signal
```typescript
const controller = new AbortController();

const stories = await StoryService.getStoriesList(
  { topic: 'politics' },
  controller.signal
);

// Cancel request if needed
controller.abort();
```

## Related Types

### Request Parameters

#### GetStoriesListParams
```typescript
interface GetStoriesListParams {
  // Search parameters
  name?: string;
  q?: string;
  prefixQ?: string;
  slug?: string;
  
  // Classification filters
  topic?: string | string[];
  category?: string | string[];
  taxonomy?: string | string[];
  
  // Entity filters
  clusterId?: string | string[];
  personWikidataId?: string | string[];
  companyId?: string | string[];
  
  // Geographic filters
  country?: string | string[];
  state?: string | string[];
  city?: string | string[];
  
  // Temporal filters
  from?: string;
  to?: string;
  initializedFrom?: string;
  initializedTo?: string;
  
  // Sentiment filters
  positiveSentimentFrom?: number;
  positiveSentimentTo?: number;
  
  // Pagination and sorting
  sortBy?: 'createdAt' | 'updatedAt' | 'relevance' | 'count' | 'totalCount';
  page?: number;
  size?: number;
  
  // Content filters
  minClusterSize?: number;
  maxClusterSize?: number;
  showDuplicates?: boolean;
  nameExists?: boolean;
}
```

#### GetStoryVelocityParams
```typescript
interface GetStoryVelocityParams {
  clusterId: string | string[];
  from?: string;
  to?: string;
  bucketSize?: number;
  bucketTimeUnit: 'minute' | 'hour' | 'day';
}
```

### Response Types

- `StandardSearchResult<T>`: Paginated search results with metadata
- `StatResult<StoryVelocity>`: Statistical data with velocity metrics
- `Story`: Basic story entity
- `StoryWithPageInfo`: Story with page metadata
- `StoryWithSelectedArticles`: Story with expanded article data
- `StoryHistoryRecord`: Historical story change record

## Dependencies

### Service Wrappers
- `SsrApiServiceWrapper`: Server-side rendering with cookie authentication
- `PrivateApiServiceWrapper`: Private API with credential management
- `PublicPlatformApiServiceWrapper`: Public API with key-based authentication

### Utilities
- `Fetch`: HTTP client utility for API requests
- Standard search and stat result types from `@/lib/types`

## Integration

### TanStack Query Integration
```typescript
import { useQuery } from '@tanstack/react-query';
import { StoryService } from '@/lib/services/story-service';

// Query hook usage
function useStories(params: GetStoriesListParams) {
  return useQuery({
    queryKey: ['stories', 'list', params],
    queryFn: ({ signal }) => StoryService.getStoriesList(params, signal),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Mutation for dependent queries
function useStoryVelocity(clusterId: string) {
  return useQuery({
    queryKey: ['stories', 'velocity', clusterId],
    queryFn: ({ signal }) => StoryService.getStoryVelocity({
      clusterId,
      bucketTimeUnit: 'hour'
    }, signal),
    enabled: !!clusterId,
  });
}
```

## Best Practices

### Service Architecture Compliance
- ✅ **Simple, focused methods**: Each method handles a single API endpoint
- ✅ **No error handling**: Raw API responses returned, errors thrown as HttpException
- ✅ **No data transformation**: Returns unmodified API response data
- ✅ **Proper credential management**: Uses appropriate service wrappers for authentication
- ✅ **HTTP Exception pattern**: Non-2xx responses throw HttpException

### Usage Guidelines
```typescript
// ✅ Good: Simple service call with raw response
const stories = await StoryService.getStoriesList(params);

// ✅ Good: Error handling in query hook
const { data, error } = useQuery({
  queryFn: () => StoryService.getStoriesList(params)
});

// ❌ Bad: Error handling in service (handled by wrappers)
// ❌ Bad: Data transformation in service (handle in components)
```

### Helper Function Pattern
The service uses the `getStoriesListHelper` pattern to create type-safe variants with predefined parameters, ensuring consistent API usage while maintaining type safety across different story data expansion levels.