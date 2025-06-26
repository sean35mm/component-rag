# Topics Query Hooks

## Purpose

The topics query hooks provide TanStack Query integration for fetching and managing topic data. These hooks handle authentication context, query key management, and provide flexible data fetching patterns for topics including individual lookups, list queries, and batch operations.

## Hooks Overview

| Hook | Type | Purpose |
|------|------|---------|
| `useTopics` | Query | Fetches a paginated list of topics with filtering |
| `useTopicByNameSuspense` | Suspense Query | Fetches a single topic by name with suspense support |
| `useTopicsByName` | Parallel Queries | Fetches multiple topics by name in parallel |

## Utilities

| Export | Type | Purpose |
|--------|------|---------|
| `TopicServiceBuilder` | Service Builder | Creates appropriate service instance based on auth state |
| `getByNameQueryFn` | Query Function | Reusable query function for fetching topics by name |

## Query Hooks

### useTopics

Fetches a paginated list of topics with optional filtering parameters.

```tsx
function useTopics<T = CustomSearchResult<Topic>>(
  params?: GetTopicListParams,
  options?: UseQueryOptions<CustomSearchResult<Topic>, T>
): UseQueryResult<T>
```

**Features:**
- Automatic authentication context handling
- Configurable filtering and pagination
- Selector support for data transformation
- Enabled state management based on auth status

### useTopicByNameSuspense

Fetches a single topic by name using suspense patterns for loading states.

```tsx
function useTopicByNameSuspense<T = Topic | null>(
  name: string,
  isAuthorizedAndVerified: boolean,
  isPublic: boolean,
  token?: AccessToken,
  options?: UseSuspenseQueryOptions<Topic | null, T>
): UseSuspenseQueryResult<T>
```

**Features:**
- Suspense-based loading states
- Memoized query function for performance
- Manual authentication state control
- Returns `null` if topic not found

### useTopicsByName

Fetches multiple topics by name in parallel using `useQueries`.

```tsx
function useTopicsByName<T = Topic | null>(
  names: string[],
  options?: UseQueryOptions<Topic | null, T>
): UseQueryResult<T>[]
```

**Features:**
- Parallel batch fetching
- Automatic authentication context handling
- Individual query results array
- Shared options across all queries

## Query Keys

Query keys are managed using `@lukemorales/query-key-factory` through the `queryKeys.topics` factory:

```tsx
// List queries
queryKeys.topics.getList(token, params)

// Individual topic queries
queryKeys.topics.getByName(token, name)
```

**Key Structure:**
- **Token-based**: All keys include authentication token for proper cache isolation
- **Parameter-based**: List queries include filtering parameters for cache granularity
- **Hierarchical**: Follows query-key-factory patterns for easy invalidation

## Usage Examples

### Basic Topic List

```tsx
function TopicsList() {
  const { data, isLoading, error } = useTopics();

  if (isLoading) return <div>Loading topics...</div>;
  if (error) return <div>Error loading topics</div>;

  return (
    <div>
      {data?.data.map(topic => (
        <div key={topic.id}>{topic.name}</div>
      ))}
    </div>
  );
}
```

### Filtered Topic Search

```tsx
function TopicSearch({ searchTerm }: { searchTerm: string }) {
  const { data, isLoading } = useTopics(
    { name: searchTerm, size: 10 },
    { enabled: searchTerm.length > 2 }
  );

  return (
    <div>
      {isLoading && <div>Searching...</div>}
      {data?.data.map(topic => (
        <TopicCard key={topic.id} topic={topic} />
      ))}
    </div>
  );
}
```

### Suspense Topic Detail

```tsx
function TopicDetail({ name }: { name: string }) {
  const { token, isAuthorizedAndVerified, isPublic } = useAccessToken();
  
  const topic = useTopicByNameSuspense(
    name,
    isAuthorizedAndVerified,
    isPublic,
    token
  );

  if (!topic) {
    return <div>Topic not found</div>;
  }

  return (
    <div>
      <h1>{topic.name}</h1>
      <p>{topic.description}</p>
    </div>
  );
}

// Usage with Suspense boundary
function TopicPage({ name }: { name: string }) {
  return (
    <Suspense fallback={<TopicDetailSkeleton />}>
      <TopicDetail name={name} />
    </Suspense>
  );
}
```

### Batch Topic Loading

```tsx
function TopicTags({ topicNames }: { topicNames: string[] }) {
  const topicQueries = useTopicsByName(topicNames);

  return (
    <div className="topic-tags">
      {topicQueries.map((query, index) => (
        <div key={topicNames[index]} className="topic-tag">
          {query.isLoading && <span>Loading...</span>}
          {query.data && <span>{query.data.name}</span>}
          {query.error && <span>Error</span>}
        </div>
      ))}
    </div>
  );
}
```

## Selector Support

### Data Transformation

```tsx
// Extract only topic names
const topicNames = useTopics(
  {},
  {
    select: (data) => data.data.map(topic => topic.name)
  }
);

// Transform to lookup map
const topicMap = useTopics(
  {},
  {
    select: (data) => 
      data.data.reduce((acc, topic) => ({
        ...acc,
        [topic.id]: topic
      }), {} as Record<string, Topic>)
  }
);
```

### Computed Values

```tsx
// Count and categorize topics
const topicStats = useTopics(
  {},
  {
    select: (data) => ({
      total: data.total,
      categories: data.data.reduce((acc, topic) => {
        acc[topic.category] = (acc[topic.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    })
  }
);
```

## Caching Strategy

### Cache Keys
- **Isolation**: Token-based cache isolation ensures proper data separation
- **Granularity**: Parameter-based keys enable efficient partial updates
- **Hierarchy**: Structured keys support targeted invalidation

### Data Lifecycle
```tsx
// Cache populated by list query
useTopics({ name: 'react' });

// Individual queries benefit from cache
useTopicByNameSuspense('react-hooks', token, true, false);

// Batch queries leverage existing cache entries
useTopicsByName(['react', 'typescript', 'javascript']);
```

### Cache Invalidation
```tsx
// Invalidate all topic queries
queryClient.invalidateQueries(queryKeys.topics._def);

// Invalidate specific topic
queryClient.invalidateQueries(
  queryKeys.topics.getByName(token, 'react')
);

// Invalidate list queries only
queryClient.invalidateQueries({
  predicate: (query) => 
    query.queryKey[0] === 'topics' && 
    query.queryKey[1] === 'getList'
});
```

## Error Handling

### Service Integration
```tsx
// Services throw HttpException for errors
const TopicServiceBuilder = ServiceBuilder(
  PublicTopicServiceBuilder,
  TopicService
);

// TanStack Query handles error propagation
const { data, error, isError } = useTopics();

if (isError) {
  // error is HttpException from service
  console.error('Topic fetch failed:', error.message);
}
```

### Error Boundaries
```tsx
function TopicErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      fallback={<div>Something went wrong loading topics</div>}
    >
      {children}
    </ErrorBoundary>
  );
}
```

### Retry Logic
```tsx
const { data } = useTopics(
  {},
  {
    retry: (failureCount, error) => {
      // Don't retry on 404s
      if (error?.status === 404) return false;
      // Retry up to 3 times for other errors
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  }
);
```

## Related Services

### Topic Service Integration
```tsx
// Public and authenticated service builders
const topicService = TopicServiceBuilder(
  isAuthorizedAndVerified,
  isPublic,
  token
);

// Service methods used by hooks
topicService.getTopicsList(params, signal);
```

### Service Builder Pattern
```tsx
const TopicServiceBuilder = ServiceBuilder(
  PublicTopicServiceBuilder,  // Unauthenticated service
  TopicService               // Authenticated service
);
```

## Best Practices

### Authentication Context
```tsx
// ✅ Use context for automatic auth handling
function MyComponent() {
  const topics = useTopics(); // Automatically uses auth context
}

// ✅ Manual control when needed
function MyComponent() {
  const { token, isAuthorizedAndVerified, isPublic } = useAccessToken();
  const topic = useTopicByNameSuspense(
    'react',
    isAuthorizedAndVerified,
    isPublic,
    token
  );
}
```

### Query Enabling
```tsx
// ✅ Conditional queries based on auth state
const topics = useTopics(
  { name: searchTerm },
  { 
    enabled: searchTerm.length > 2 // Additional condition
    // Auth state automatically handled
  }
);
```

### Performance Optimization
```tsx
// ✅ Memoize expensive selectors
const topicSelector = useCallback(
  (data: CustomSearchResult<Topic>) => 
    data.data.filter(topic => topic.category === selectedCategory),
  [selectedCategory]
);

const filteredTopics = useTopics({}, { select: topicSelector });
```

### Suspense Integration
```tsx
// ✅ Proper suspense boundaries
function TopicApp() {
  return (
    <Suspense fallback={<TopicListSkeleton />}>
      <TopicList />
    </Suspense>
  );
}
```