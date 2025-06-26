# Summarize Query Hooks

## Purpose

The summarize query hooks manage article summarization functionality, providing access to AI-powered article summaries through the summarize service. These hooks handle both authenticated and public access patterns, enabling content summarization with proper authorization management.

## Hooks Overview

| Hook | Type | Purpose |
|------|------|---------|
| `useSummarize` | Query | Fetches article summaries based on search parameters |

## Query Hooks

### useSummarize

Fetches article summaries using the summarize service with support for both authenticated and public access.

**Signature:**
```typescript
function useSummarize<T = SummarizeSearchResult<Article>>(
  params: AllEndpointParams,
  options?: UseQueryOptions<SummarizeSearchResult<Article>, T>
): UseQueryResult<T, Error>
```

**Parameters:**
- `params: AllEndpointParams` - Search and filtering parameters for summarization
- `options?: UseQueryOptions<SummarizeSearchResult<Article>, T>` - Standard TanStack Query options with selector support

**Returns:**
- `UseQueryResult<T, Error>` - Query result with summary data or transformed data via selector

## Query Keys

Query keys are managed using `@lukemorales/query-key-factory` for consistency:

```typescript
// Generated query key structure
queryKeys.summarize.getSummarize(token, params)
```

The query keys include:
- **Service identifier**: `summarize`
- **Operation**: `getSummarize`
- **Authentication token**: For cache segmentation
- **Parameters**: Search and filter parameters

## Usage Examples

### Basic Summary Fetching

```typescript
import { useSummarize } from '@/lib/query-hooks/summarize';

function ArticleSummaryList() {
  const { data, isLoading, error } = useSummarize({
    query: 'climate change',
    limit: 10,
    offset: 0
  });

  if (isLoading) return <div>Loading summaries...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.results.map(article => (
        <div key={article.id}>
          <h3>{article.title}</h3>
          <p>{article.summary}</p>
        </div>
      ))}
    </div>
  );
}
```

### Advanced Filtering

```typescript
function FilteredSummaries() {
  const [filters, setFilters] = useState({
    query: 'technology',
    dateFrom: '2024-01-01',
    dateTo: '2024-12-31',
    category: 'tech',
    limit: 20
  });

  const { data, isLoading } = useSummarize(filters, {
    enabled: Boolean(filters.query),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false
  });

  return (
    <div>
      <SearchFilters onFiltersChange={setFilters} />
      <SummaryResults data={data} loading={isLoading} />
    </div>
  );
}
```

### Pagination Support

```typescript
function PaginatedSummaries() {
  const [page, setPage] = useState(0);
  const limit = 10;

  const { data, isLoading, isFetching } = useSummarize({
    query: 'artificial intelligence',
    limit,
    offset: page * limit
  });

  return (
    <div>
      <SummaryList 
        data={data?.results} 
        loading={isLoading}
        fetching={isFetching}
      />
      <Pagination
        currentPage={page}
        totalItems={data?.total || 0}
        itemsPerPage={limit}
        onPageChange={setPage}
      />
    </div>
  );
}
```

## Selector Support

Transform summary data using selector functions:

### Extract Specific Fields

```typescript
// Get only article titles and summaries
const summaryPreviews = useSummarize(
  { query: 'healthcare' },
  {
    select: (data) => data.results.map(article => ({
      id: article.id,
      title: article.title,
      summary: article.summary,
      publishedAt: article.publishedAt
    }))
  }
);
```

### Compute Derived Data

```typescript
// Group summaries by category
const categorizedSummaries = useSummarize(
  { query: 'science' },
  {
    select: (data) => {
      const grouped = data.results.reduce((acc, article) => {
        const category = article.category || 'uncategorized';
        if (!acc[category]) acc[category] = [];
        acc[category].push(article);
        return acc;
      }, {} as Record<string, Article[]>);
      
      return {
        categories: grouped,
        totalCount: data.total,
        categoryCounts: Object.entries(grouped).map(([name, articles]) => ({
          name,
          count: articles.length
        }))
      };
    }
  }
);
```

### Filter Client-Side

```typescript
// Filter summaries by minimum word count
const longFormSummaries = useSummarize(
  { query: 'research' },
  {
    select: (data) => ({
      ...data,
      results: data.results.filter(article => 
        article.summary && article.summary.split(' ').length >= 50
      )
    })
  }
);
```

## Caching Strategy

### Cache Configuration

- **Stale Time**: 5 minutes (summaries are relatively stable)
- **Cache Time**: 30 minutes (keep in memory for navigation)
- **Background Refetch**: Enabled for fresh content

### Cache Keys

```typescript
// Cache is segmented by:
// - Authentication token (user-specific access)
// - Search parameters (query, filters, pagination)
queryKeys.summarize.getSummarize(token, {
  query: 'climate',
  limit: 10,
  offset: 0
})
```

### Manual Cache Management

```typescript
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';

function SummaryManager() {
  const queryClient = useQueryClient();
  const { token } = useAccessToken();

  const refreshSummaries = (params: AllEndpointParams) => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.summarize.getSummarize(token?.token || '', params).queryKey
    });
  };

  const prefetchSummaries = async (params: AllEndpointParams) => {
    await queryClient.prefetchQuery({
      ...queryKeys.summarize.getSummarize(token?.token || '', params),
      queryFn: ({ signal }) =>
        SummarizeServiceBuilder(true, false, token).getSummarize(params, signal)
    });
  };

  return (
    <div>
      <button onClick={() => refreshSummaries({ query: 'latest' })}>
        Refresh Latest
      </button>
    </div>
  );
}
```

## Error Handling

### Service-Level Errors

The summarize service throws `HttpException` for various scenarios:

```typescript
function SummaryHandler() {
  const { data, error, isError } = useSummarize({
    query: 'technology'
  });

  if (isError) {
    // Handle different error scenarios
    if (error.message.includes('unauthorized')) {
      return <div>Please log in to access summaries</div>;
    }
    
    if (error.message.includes('rate limit')) {
      return <div>Too many requests. Please try again later.</div>;
    }
    
    if (error.message.includes('invalid query')) {
      return <div>Please provide a valid search query</div>;
    }
    
    return <div>Failed to load summaries: {error.message}</div>;
  }

  return <SummaryDisplay data={data} />;
}
```

### Retry Configuration

```typescript
const summaryQuery = useSummarize(
  { query: 'science' },
  {
    retry: (failureCount, error) => {
      // Don't retry client errors (4xx)
      if (error.message.includes('400') || error.message.includes('401')) {
        return false;
      }
      // Retry server errors up to 3 times
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
  }
);
```

## Related Services

### SummarizeService Integration

```typescript
// Service builder pattern with authentication
const SummarizeServiceBuilder = ServiceBuilder(
  PublicSummarizeServiceBuilder,  // Public access
  SummarizeService               // Authenticated access
);

// Usage in hook
SummarizeServiceBuilder(
  isAuthorizedAndVerified,  // Auth status
  isPublic,                // Public mode
  token                    // Access token
).getSummarize(params, signal);
```

### Authentication Context

```typescript
// Integrates with access token context
const { isAuthorizedAndVerified, isPublic, token } = useAccessToken();

// Query is enabled based on authentication state
enabled: (isAuthorizedAndVerified || isPublic) && options?.enabled
```

## Best Practices

### 1. Conditional Querying

```typescript
function ConditionalSummaries({ searchQuery }: { searchQuery?: string }) {
  const { data } = useSummarize(
    { query: searchQuery || '' },
    {
      enabled: Boolean(searchQuery && searchQuery.length >= 3)
    }
  );

  return searchQuery ? <Results data={data} /> : <SearchPrompt />;
}
```

### 2. Background Updates

```typescript
function LiveSummaries() {
  const { data } = useSummarize(
    { query: 'breaking news' },
    {
      refetchInterval: 5 * 60 * 1000, // 5 minutes
      refetchIntervalInBackground: true
    }
  );

  return <NewsFeed data={data} />;
}
```

### 3. Optimistic UI

```typescript
function SummaryBookmark({ articleId }: { articleId: string }) {
  const queryClient = useQueryClient();
  
  const handleBookmark = () => {
    // Optimistically update the summary data
    queryClient.setQueryData(
      queryKeys.summarize.getSummarize(token, params).queryKey,
      (old: SummarizeSearchResult<Article> | undefined) => {
        if (!old) return old;
        
        return {
          ...old,
          results: old.results.map(article =>
            article.id === articleId
              ? { ...article, bookmarked: true }
              : article
          )
        };
      }
    );
  };

  return <BookmarkButton onClick={handleBookmark} />;
}
```

### 4. Memory Management

```typescript
function EfficientSummaryList() {
  const [activeQuery, setActiveQuery] = useState('');

  const { data, isLoading } = useSummarize(
    { query: activeQuery },
    {
      enabled: Boolean(activeQuery),
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000, // Garbage collect after 10 minutes
      select: useCallback(
        (data: SummarizeSearchResult<Article>) => ({
          results: data.results.slice(0, 50), // Limit memory usage
          total: data.total
        }),
        []
      )
    }
  );

  return <SummaryInterface onSearch={setActiveQuery} data={data} />;
}
```