# Articles Query Hooks

## Purpose

The articles query hooks provide a comprehensive interface for fetching and managing article data using TanStack Query. These hooks handle both authenticated and public access patterns, support pagination, infinite scrolling, and individual article retrieval with proper caching and error handling.

## Hooks Overview

| Hook | Type | Purpose |
|------|------|---------|
| `useArticles` | Query | Fetch paginated list of articles |
| `useArticlesSuspense` | Suspense Query | Fetch articles with Suspense support |
| `useArticlesInfinite` | Infinite Query | Fetch articles with infinite scrolling |
| `useArticleById` | Query | Fetch single article by ID |
| `useArticleByIdSuspense` | Suspense Query | Fetch single article with Suspense support |

## Query Hooks

### useArticles

Fetches a paginated list of articles with flexible filtering and search parameters.

```tsx
function useArticles<T = ArticlesSearchResult<Article>>(
  params?: AllEndpointParams,
  options?: UseQueryOptions<ArticlesSearchResult<Article>, T>
): UseQueryResult<T, Error>
```

**Parameters:**
- `params` - Search and filter parameters (optional)
- `options` - TanStack Query options with selector support

**Features:**
- Automatic authentication detection
- Public/private access handling
- Flexible parameter filtering
- Built-in enabled state management

### useArticlesSuspense

Suspense-enabled version of useArticles for server-side rendering and concurrent features.

```tsx
function useArticlesSuspense<T = ArticlesSearchResult<Article>>(
  params: AllEndpointParams,
  isAuthorizedAndVerified: boolean,
  isPublic: boolean,
  token?: AccessToken,
  options?: UseSuspenseQueryOptions<ArticlesSearchResult<Article>, T>
): UseSuspenseQueryResult<T, Error>
```

**Parameters:**
- `params` - Search and filter parameters
- `isAuthorizedAndVerified` - Authentication status
- `isPublic` - Public access flag
- `token` - Access token for authentication
- `options` - Suspense query options

### useArticlesInfinite

Enables infinite scrolling for article lists with automatic pagination handling.

```tsx
function useArticlesInfinite<T = ArticlesSearchResult<Article>>(
  params?: Omit<AllEndpointParams, 'page' | 'size'>,
  options?: UseInfiniteQueryOptions<ArticlesSearchResult<Article>, T> & { size?: number }
): UseInfiniteQueryResult<T, Error>
```

**Parameters:**
- `params` - Search parameters (excludes pagination)
- `options` - Infinite query options with custom size parameter

**Features:**
- Automatic next page calculation
- Configurable page size (default: 25)
- Built-in pagination logic
- End-of-results detection

### useArticleById

Fetches a single article by its unique identifier.

```tsx
function useArticleById<T = Article | null>(
  articleId: string,
  options?: UseQueryOptions<Article | null, T>
): UseQueryResult<T, Error>
```

**Parameters:**
- `articleId` - Unique article identifier
- `options` - Query options with selector support

**Features:**
- Returns null when article not found
- Automatic authentication handling
- Efficient single-item retrieval

### useArticleByIdSuspense

Suspense-enabled version of useArticleById.

```tsx
function useArticleByIdSuspense<T = Article | null>(
  articleId: string,
  isAuthorizedAndVerified: boolean,
  isPublic: boolean,
  token?: AccessToken,
  options?: UseSuspenseQueryOptions<Article | null, T>
): UseSuspenseQueryResult<T, Error>
```

## Query Keys

Query keys are managed using `@lukemorales/query-key-factory` through the `queryKeys.articles` factory:

```tsx
// List queries
queryKeys.articles.getList(token, params)

// Infinite queries  
queryKeys.articles.getListInfinite(token, params)

// Individual article queries
queryKeys.articles.getById(token, articleId)
```

**Key Structure:**
- Token-based cache separation
- Parameter-based cache differentiation
- Hierarchical invalidation support

## Usage Examples

### Basic Article List

```tsx
function ArticleList() {
  const { data, isLoading, error } = useArticles({
    category: 'technology',
    limit: 10
  });

  if (isLoading) return <div>Loading articles...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.articles.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
```

### Infinite Scrolling Articles

```tsx
function InfiniteArticleList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useArticlesInfinite(
    { category: 'news' },
    { size: 20 }
  );

  return (
    <div>
      {data?.pages.map(page => 
        page.articles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))
      )}
      
      {hasNextPage && (
        <button 
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
}
```

### Single Article with Error Handling

```tsx
function ArticleDetail({ articleId }: { articleId: string }) {
  const { data: article, isLoading, error } = useArticleById(articleId);

  if (isLoading) return <ArticleSkeleton />;
  if (error) return <ErrorMessage error={error} />;
  if (!article) return <div>Article not found</div>;

  return <ArticleContent article={article} />;
}
```

### Suspense-Enabled Component

```tsx
function SuspenseArticleList() {
  const { token, isAuthorizedAndVerified, isPublic } = useAccessToken();
  
  const { data } = useArticlesSuspense(
    { featured: true },
    isAuthorizedAndVerified,
    isPublic,
    token
  );

  return (
    <div>
      {data.articles.map(article => (
        <FeaturedArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}

// Wrap with Suspense boundary
function App() {
  return (
    <Suspense fallback={<ArticleListSkeleton />}>
      <SuspenseArticleList />
    </Suspense>
  );
}
```

## Selector Support

All hooks support selector functions for data transformation and performance optimization:

### Transform Data Structure

```tsx
// Extract only article titles
const { data: titles } = useArticles(
  { category: 'tech' },
  {
    select: (data) => data.articles.map(article => article.title)
  }
);
```

### Filter Client-Side

```tsx
// Filter published articles only
const { data: publishedArticles } = useArticles(
  {},
  {
    select: (data) => ({
      ...data,
      articles: data.articles.filter(article => article.published)
    })
  }
);
```

### Performance Optimization

```tsx
// Memoized selector for expensive computations
const expensiveSelector = useCallback((data: ArticlesSearchResult<Article>) => {
  return data.articles.map(article => ({
    ...article,
    readingTime: calculateReadingTime(article.content)
  }));
}, []);

const { data: articlesWithReadingTime } = useArticles({}, {
  select: expensiveSelector
});
```

## Caching Strategy

### Cache Key Structure

```tsx
// Different cache entries for different contexts
queryKeys.articles.getList('user-token-123', { category: 'tech' })
queryKeys.articles.getList('', { category: 'tech' }) // Public access
queryKeys.articles.getById('user-token-123', 'article-456')
```

### Cache Invalidation

```tsx
// Invalidate all article queries
queryClient.invalidateQueries({
  queryKey: queryKeys.articles._def
});

// Invalidate specific article
queryClient.invalidateQueries({
  queryKey: queryKeys.articles.getById(token, articleId)
});

// Invalidate list queries only
queryClient.invalidateQueries({
  queryKey: queryKeys.articles.getList(token)._def
});
```

### Cache Updates

```tsx
// Update single article in cache
queryClient.setQueryData(
  queryKeys.articles.getById(token, articleId).queryKey,
  updatedArticle
);

// Update article in list cache
queryClient.setQueryData(
  queryKeys.articles.getList(token, params).queryKey,
  (oldData) => ({
    ...oldData,
    articles: oldData.articles.map(article =>
      article.id === updatedArticle.id ? updatedArticle : article
    )
  })
);
```

## Error Handling

### Service-Level Errors

```tsx
// Services throw HttpException, handled by TanStack Query
const { data, error, isError } = useArticles();

if (isError) {
  // error is HttpException from service
  console.error('API Error:', error.message, error.statusCode);
}
```

### Custom Error Handling

```tsx
const { data, error } = useArticles({}, {
  retry: (failureCount, error) => {
    // Don't retry on 404 errors
    if (error instanceof HttpException && error.statusCode === 404) {
      return false;
    }
    return failureCount < 3;
  },
  onError: (error) => {
    // Custom error logging
    logger.error('Articles fetch failed', { error });
  }
});
```

### Global Error Boundaries

```tsx
// Wrap components with error boundaries for Suspense queries
function ArticleApp() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Suspense fallback={<Loading />}>
        <SuspenseArticleList />
      </Suspense>
    </ErrorBoundary>
  );
}
```

## Related Services

### ArticleServiceBuilder

```tsx
// Service builder pattern for auth-aware service creation
const ArticleServiceBuilder = ServiceBuilder(
  PublicArticleServiceBuilder,
  ArticleService
);

// Usage in hooks
const service = ArticleServiceBuilder(
  isAuthorizedAndVerified,
  isPublic,
  token
);
```

### Service Integration

```tsx
// Services used by hooks
- PublicArticleServiceBuilder: Public article access
- ArticleService: Authenticated article operations
- ServiceBuilder: Dynamic service selection utility
```

## Best Practices

### 1. Authentication Handling

```tsx
// ✅ Let hooks handle authentication automatically
const { data } = useArticles({ category: 'tech' });

// ❌ Don't manage auth state manually
const { token } = useAccessToken();
if (token) {
  const { data } = useArticles({ category: 'tech' });
}
```

### 2. Parameter Management

```tsx
// ✅ Use stable parameter objects
const params = useMemo(() => ({ 
  category: selectedCategory,
  search: searchTerm 
}), [selectedCategory, searchTerm]);

const { data } = useArticles(params);

// ❌ Inline objects cause unnecessary re-renders
const { data } = useArticles({ 
  category: selectedCategory,
  search: searchTerm 
});
```

### 3. Suspense vs Regular Hooks

```tsx
// ✅ Use Suspense hooks for SSR and concurrent features
function ServerSideArticles() {
  const { data } = useArticlesSuspense(params, isAuth, isPublic, token);
  return <ArticleList articles={data.articles} />;
}

// ✅ Use regular hooks for client-side with loading states
function ClientSideArticles() {
  const { data, isLoading } = useArticles(params);
  if (isLoading) return <Skeleton />;
  return <ArticleList articles={data?.articles} />;
}
```

### 4. Infinite Query Best Practices

```tsx
// ✅ Configure appropriate page sizes
const { data } = useArticlesInfinite(params, { size: 25 });

// ✅ Handle loading states properly
const { isFetchingNextPage, hasNextPage } = useArticlesInfinite(params);

// ✅ Implement proper scroll triggers
const { fetchNextPage } = useArticlesInfinite(params);
useInfiniteScroll(fetchNextPage, hasNextPage);
```

### 5. Error Recovery

```tsx
// ✅ Implement retry logic
const { data, refetch } = useArticles(params, {
  retry: 3,
  retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
});

// ✅ Provide user-friendly error recovery
if (error) {
  return (
    <ErrorMessage 
      error={error} 
      onRetry={refetch}
      action="loading articles"
    />
  );
}
```