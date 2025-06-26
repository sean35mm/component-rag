# Article Service API Documentation

## Purpose

The `article-service` provides a comprehensive API interface for managing article-related operations across different execution contexts. It abstracts article data retrieval with support for clustering, complex filtering, and multiple authentication contexts (SSR, private authenticated, and public access).

The service manages article listing operations with configurable cluster expansion and supports both simple parameter-based and complex body-based filtering approaches.

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getArticlesList` | `params: AllEndpointParams`, `signal?: AbortSignal` | `Promise<ArticlesSearchResult<Article>>` | Retrieves articles list with basic parameters |
| `getArticlesWithClustersList` | `params: AllEndpointParams`, `signal?: AbortSignal` | `Promise<ArticlesSearchResult<ArticleWithCluster>>` | Retrieves articles with cluster data expanded |
| `getArticlesListWithComplexAllEndpointBody` | `dto: Omit<ComplexAllEndpointBody, 'expandCluster'>`, `signal?: AbortSignal` | `Promise<ArticlesSearchResult<Article>>` | Retrieves articles using complex request body |
| `getArticlesWithClustersListWithComplexAllEndpointBody` | `dto: Omit<ComplexAllEndpointBody, 'expandCluster'>`, `signal?: AbortSignal` | `Promise<ArticlesSearchResult<ArticleWithCluster>>` | Retrieves articles with clusters using complex request body |

### Helper Functions

| Function | Purpose |
|----------|---------|
| `getArticlesListHelper<T>` | Generic helper for creating GET-based article list methods |
| `getArticlesListWithComplexAllEndpointBodyHelper<T>` | Generic helper for creating POST-based article list methods with complex filtering |

## Authentication

### Service Variants

- **`SsrArticleService`**: Server-side rendering context, no authentication required
- **`ArticleService`**: Private API access requiring user authentication via `PrivateApiServiceWrapper`
- **`PublicArticleServiceBuilder`**: Public platform API access for unauthenticated requests

### Credential Management

```tsx
// Private authenticated requests
const articleService = ArticleService(userCredentials);

// Public requests (no credentials required)
const publicService = PublicArticleServiceBuilder();

// SSR context (server-side)
const ssrService = SsrArticleService(serverFetch);
```

## Error Handling

Follows the **HttpException pattern** - services throw `HttpException` for non-2xx HTTP responses. Error handling is delegated to the query layer (TanStack Query hooks).

```tsx
// Service throws HttpException for failed requests
// Error handling occurs in query hooks, not in service methods
const articles = await ArticleService.getArticlesList(params);
// Throws HttpException if response status >= 400
```

## Usage Examples

### Basic Article Retrieval

```tsx
import { ArticleService } from '@/lib/services/article-service';

// Get articles with basic parameters
const searchParams = {
  page: 1,
  limit: 20,
  query: 'technology'
};

const articlesResult = await ArticleService.getArticlesList(searchParams);
```

### Articles with Cluster Data

```tsx
// Get articles with cluster information expanded
const articlesWithClusters = await ArticleService.getArticlesWithClustersList({
  page: 1,
  limit: 10,
  category: 'tech'
});
```

### Complex Filtering

```tsx
// Using complex request body for advanced filtering
const complexFilter = {
  filters: {
    dateRange: {
      start: '2024-01-01',
      end: '2024-12-31'
    },
    sources: ['source1', 'source2'],
    tags: ['ai', 'machine-learning']
  },
  sorting: {
    field: 'publishedAt',
    direction: 'desc'
  }
};

const filteredArticles = await ArticleService
  .getArticlesListWithComplexAllEndpointBody(complexFilter);
```

### Public API Usage

```tsx
// Public access without authentication
const publicService = PublicArticleServiceBuilder();
const publicArticles = await publicService.getArticlesList({
  page: 1,
  limit: 10
});
```

### SSR Context

```tsx
// Server-side rendering
import { SsrArticleService } from '@/lib/services/article-service';

const ssrArticles = await SsrArticleService.getArticlesList({
  page: 1,
  limit: 5
});
```

## Related Types

### Core Types

```tsx
interface AllEndpointParams {
  page?: number;
  limit?: number;
  query?: string;
  // Additional search parameters
}

interface ComplexAllEndpointBody {
  expandCluster?: boolean;
  filters?: {
    dateRange?: DateRange;
    sources?: string[];
    tags?: string[];
  };
  sorting?: SortConfig;
  // Additional complex filtering options
}

interface ArticlesSearchResult<T> {
  articles: T[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
}

interface Article {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  // Core article properties
}

interface ArticleWithCluster extends Article {
  cluster: {
    id: string;
    relatedArticles: Article[];
    // Cluster-specific data
  };
}
```

## Dependencies

### Service Wrappers

- **`SsrApiServiceWrapper`**: Wraps actions for server-side rendering context
- **`PrivateApiServiceWrapper`**: Adds authentication for private API endpoints
- **`PublicPlatformApiServiceWrapper`**: Configures public API access

### Utilities

- **`Fetch`**: HTTP client utility for making API requests
- **Service wrapper utilities**: Handle authentication, base URLs, and request configuration

## Integration

### TanStack Query Integration

```tsx
// Query hook implementation
function useArticlesList(params: AllEndpointParams) {
  return useQuery({
    queryKey: ['articles', 'list', params],
    queryFn: ({ signal }) => ArticleService.getArticlesList(params, signal),
    // Error handling occurs here, not in service
  });
}

// Mutation hook for complex filtering
function useArticlesWithComplexFilter() {
  return useMutation({
    mutationFn: (dto: ComplexAllEndpointBody) => 
      ArticleService.getArticlesListWithComplexAllEndpointBody(dto),
  });
}
```

### Query Key Patterns

```tsx
// Recommended query key structure
const queryKeys = {
  articles: ['articles'] as const,
  list: (params: AllEndpointParams) => ['articles', 'list', params] as const,
  clustered: (params: AllEndpointParams) => ['articles', 'clustered', params] as const,
  complex: (dto: ComplexAllEndpointBody) => ['articles', 'complex', dto] as const,
};
```

## Best Practices

### Service Architecture Adherence

✅ **Simple, focused methods**: Each method handles a single article operation type  
✅ **No error handling**: Services throw HttpException, letting query hooks handle errors  
✅ **No data transformation**: Returns raw API responses without modification  
✅ **Proper credential management**: Uses appropriate service wrappers for different contexts  
✅ **HTTP Exception pattern**: Consistent error throwing for failed requests  

### Implementation Guidelines

```tsx
// ✅ Correct usage - simple method calls
const articles = await ArticleService.getArticlesList(params);

// ❌ Avoid - error handling in service layer
// Services should not catch/transform errors

// ✅ Correct - use appropriate service variant
const privateArticles = ArticleService.getArticlesList(params);
const publicArticles = PublicArticleServiceBuilder().getArticlesList(params);

// ✅ Correct - abort signal support
const { data } = useQuery({
  queryKey: ['articles'],
  queryFn: ({ signal }) => ArticleService.getArticlesList(params, signal)
});
```

### Performance Considerations

- Use `expandCluster: false` when cluster data is not needed
- Implement proper query key strategies for cache management
- Leverage abort signals for request cancellation
- Choose appropriate service variant based on authentication requirements