# Source Query Hooks

## Purpose

The Source Query Hooks provide TanStack Query-powered data fetching and state management for source-related data in the application. These hooks handle fetching sources (publications, websites, etc.) with proper authentication, caching, and error handling. They support both public and authenticated access patterns, with infinite scrolling capabilities and domain-based filtering.

## Hooks Overview

| Hook | Type | Purpose |
|------|------|---------|
| `useSources` | Query | Fetches paginated list of sources with filtering |
| `useSourceById` | Query | Fetches a single source by ID |
| `useSourcesByNameOrDomain` | Query | Searches sources by name or domain with combined results |
| `useSourcesInfinite` | Infinite Query | Fetches sources with infinite scrolling pagination |
| `useSourceByDomain` | Query | Fetches a single source by exact domain match |
| `useSourceByDomainSuspense` | Suspense Query | Fetches source by domain with React Suspense |
| `useSourcesByDomain` | Queries | Fetches multiple sources by domain arrays in parallel |

## Query Hooks

### `useSources`

Fetches a paginated list of sources with optional filtering parameters.

```tsx
function useSources<T = StandardSearchResult<Source>>(
  params: GetSourcesListParams = {},
  options?: UseQueryOptions<StandardSearchResult<Source>, T>
)
```

**Parameters:**
- `params` - Filtering and pagination parameters
- `options` - TanStack Query options with selector support

**Returns:** Query result with `StandardSearchResult<Source>` containing sources array and metadata

### `useSourceById`

Fetches a single source by its unique identifier.

```tsx
function useSourceById<T = Source>(
  id: string,
  options?: UseQueryOptions<Source, T>
)
```

**Parameters:**
- `id` - Unique source identifier
- `options` - TanStack Query options with selector support

**Returns:** Query result with `Source` object or undefined

### `useSourcesByNameOrDomain`

Searches sources by name or domain with intelligent result combination.

```tsx
function useSourcesByNameOrDomain<T = Source[]>(
  params: { search?: string; size?: number } = {},
  options?: UseQueryOptions<Source[], T>
)
```

**Parameters:**
- `params.search` - Search term for name or domain
- `params.size` - Maximum number of results (default: 10)
- `options` - TanStack Query options with selector support

**Returns:** Query result with combined `Source[]` array

### `useSourcesInfinite`

Provides infinite scrolling pagination for sources list.

```tsx
function useSourcesInfinite<T = StandardSearchResult<Source>>(
  params: Omit<GetSourcesListParams, 'page' | 'size'> = {},
  options: UseInfiniteQueryOptions<StandardSearchResult<Source>, T> = { size: 25 }
)
```

**Parameters:**
- `params` - Filtering parameters (excluding pagination)
- `options.size` - Page size (default: 25)
- `options` - TanStack Query infinite options

**Returns:** Infinite query result with pages of source data

### `useSourceByDomain`

Fetches a single source by exact domain match.

```tsx
function useSourceByDomain<T = Source | null>(
  domain: string,
  options?: UseQueryOptions<Source | null, T>
)
```

**Parameters:**
- `domain` - Exact domain to match
- `options` - TanStack Query options with selector support

**Returns:** Query result with `Source` or `null` if not found

### `useSourceByDomainSuspense`

Suspense-enabled version of domain-based source fetching.

```tsx
function useSourceByDomainSuspense<T = Source | null>(
  domain: string,
  isAuthorizedAndVerified: boolean,
  isPublic: boolean,
  token?: AccessToken,
  options?: UseSuspenseQueryOptions<Source | null, T>
)
```

**Parameters:**
- `domain` - Exact domain to match
- `isAuthorizedAndVerified` - Authentication status
- `isPublic` - Public access flag
- `token` - Access token
- `options` - TanStack Query suspense options

**Returns:** Suspense query result with `Source` or `null`

### `useSourcesByDomain`

Fetches multiple sources by domain arrays in parallel using `useQueries`.

```tsx
function useSourcesByDomain<T = StandardSearchResult<Source>>(
  domains: string[][],
  options?: UseQueryOptions<StandardSearchResult<Source>, T>
)
```

**Parameters:**
- `domains` - Array of domain arrays for parallel fetching
- `options` - TanStack Query options applied to all queries

**Returns:** Array of query results for each domain group

## Mutation Hooks

This module contains only query hooks for data fetching. Source mutations would be handled in separate hook modules.

## Query Keys

Query keys are managed using `@lukemorales/query-key-factory` through the `queryKeys.sources` factory:

```tsx
// Key structure examples
queryKeys.sources.getList(token, params)          // List with filtering
queryKeys.sources.getById(token, id)              // Single source by ID
queryKeys.sources.getListByNameOrDomain(token, params) // Name/domain search
queryKeys.sources.getListInfinite(token, params)  // Infinite pagination
queryKeys.sources.getByDomain(token, domain)      // Domain-specific lookup
```

## Usage Examples

### Basic Source List

```tsx
function SourcesList() {
  const { data, isLoading, error } = useSources({
    size: 20,
    showSubdomains: true
  });

  if (isLoading) return <div>Loading sources...</div>;
  if (error) return <div>Error loading sources</div>;

  return (
    <div>
      <h2>Sources ({data?.numResults})</h2>
      {data?.results.map(source => (
        <div key={source.id}>
          <h3>{source.name}</h3>
          <p>{source.domain}</p>
        </div>
      ))}
    </div>
  );
}
```

### Source by ID with Error Handling

```tsx
function SourceDetail({ sourceId }: { sourceId: string }) {
  const { 
    data: source, 
    isLoading, 
    error 
  } = useSourceById(sourceId, {
    retry: 3,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });

  if (isLoading) return <SourceSkeleton />;
  if (error) return <ErrorDisplay error={error} />;
  if (!source) return <div>Source not found</div>;

  return (
    <div>
      <h1>{source.name}</h1>
      <p>Domain: {source.domain}</p>
      <p>Type: {source.type}</p>
    </div>
  );
}
```

### Infinite Scrolling Sources

```tsx
function InfiniteSourcesList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useSourcesInfinite(
    { type: 'news' },
    { size: 15 }
  );

  const sources = data?.pages.flatMap(page => page.results) ?? [];

  return (
    <div>
      {sources.map(source => (
        <SourceCard key={source.id} source={source} />
      ))}
      
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

### Search by Name or Domain

```tsx
function SourceSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch] = useDebounce(searchTerm, 300);

  const { data: sources, isLoading } = useSourcesByNameOrDomain(
    { search: debouncedSearch, size: 10 },
    { enabled: debouncedSearch.length >= 2 }
  );

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search sources by name or domain..."
      />
      
      {isLoading && <div>Searching...</div>}
      
      {sources?.map(source => (
        <div key={source.id}>
          <strong>{source.name}</strong> - {source.domain}
        </div>
      ))}
    </div>
  );
}
```

### Domain-based Source Lookup

```tsx
function DomainSourceCheck({ domain }: { domain: string }) {
  const { data: source } = useSourceByDomain(domain, {
    staleTime: 10 * 60 * 1000 // 10 minutes
  });

  return (
    <div>
      {source ? (
        <div>
          <span className="verified">✓</span>
          {source.name} is a verified source
        </div>
      ) : (
        <div>
          <span className="unverified">?</span>
          Domain not in our database
        </div>
      )}
    </div>
  );
}
```

### Parallel Domain Queries

```tsx
function MultiDomainCheck({ domainGroups }: { domainGroups: string[][] }) {
  const results = useSourcesByDomain(domainGroups);

  return (
    <div>
      {results.map((result, index) => (
        <div key={index}>
          <h3>Group {index + 1}</h3>
          {result.isLoading && <div>Loading...</div>}
          {result.data?.results.map(source => (
            <div key={source.id}>{source.name}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
```

## Selector Support

All hooks support selector functions for data transformation:

```tsx
// Extract only names
const { data: sourceNames } = useSources(
  { type: 'news' },
  {
    select: (data) => data.results.map(source => source.name)
  }
);

// Transform single source data
const { data: sourceInfo } = useSourceById(
  sourceId,
  {
    select: (source) => ({
      displayName: source?.name || 'Unknown',
      isVerified: source?.verified || false,
      url: `https://${source?.domain}`
    })
  }
);

// Filter and transform infinite data
const { data } = useSourcesInfinite(
  {},
  {
    select: (data) => ({
      ...data,
      pages: data.pages.map(page => ({
        ...page,
        results: page.results.filter(source => source.verified)
      }))
    })
  }
);
```

## Caching Strategy

### Cache Keys
- Sources list: Cached by token, parameters, and pagination
- Individual sources: Cached by token and source ID
- Domain lookups: Cached by token and domain
- Search results: Cached by token and search parameters

### Stale Time Recommendations
```tsx
// Static source data - cache longer
useSourceById(id, { staleTime: 10 * 60 * 1000 }); // 10 minutes

// Dynamic lists - shorter cache
useSources(params, { staleTime: 2 * 60 * 1000 }); // 2 minutes

// Search results - very short cache
useSourcesByNameOrDomain(params, { staleTime: 30 * 1000 }); // 30 seconds
```

### Cache Invalidation
Sources cache should be invalidated when:
- New sources are added to the system
- Source information is updated
- User authentication state changes

## Error Handling

All hooks follow TanStack Query error handling patterns:

```tsx
function SourcesWithErrorHandling() {
  const { data, error, isError, refetch } = useSources();

  if (isError) {
    // HttpException from service layer
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Failed to load sources';
    
    return (
      <ErrorBoundary 
        error={errorMessage}
        onRetry={() => refetch()}
      />
    );
  }

  return <SourcesList sources={data?.results} />;
}
```

### Common Error Scenarios
- **Authentication errors**: 401/403 responses
- **Network errors**: Connection timeouts, offline state
- **Rate limiting**: 429 responses
- **Not found**: 404 for specific sources
- **Server errors**: 500+ responses

## Related Services

### Source Service Integration
```tsx
// Service builder pattern
const service = SourceServiceBuilder(
  isAuthorizedAndVerified,
  isPublic,
  token
);

// Service methods used:
service.getList(params, signal)    // List sources
service.getById(id)                // Get single source
```

### Authentication Context
All hooks integrate with `useAccessToken()` for:
- Authentication state management
- Token-based API access
- Public vs authenticated endpoint routing

## Best Practices

### 1. Authentication-Aware Querying
```tsx
// Hooks automatically handle auth state
const { data } = useSources(); // Works for both public and authenticated users
```

### 2. Efficient Pagination
```tsx
// Use infinite queries for large datasets
const infiniteQuery = useSourcesInfinite({}, { size: 25 });

// Use regular pagination for smaller, bounded lists
const paginatedQuery = useSources({ page: 1, size: 10 });
```

### 3. Search Optimization
```tsx
// Debounce search inputs
const [debouncedSearch] = useDebounce(searchTerm, 300);
const { data } = useSourcesByNameOrDomain(
  { search: debouncedSearch },
  { enabled: debouncedSearch.length >= 2 }
);
```

### 4. Conditional Querying
```tsx
// Enable queries based on conditions
const { data } = useSourceById(
  sourceId,
  { enabled: !!sourceId && sourceId.length > 0 }
);
```

### 5. Error Recovery
```tsx
// Implement retry logic for transient errors
const { data } = useSources({}, {
  retry: (failureCount, error) => {
    if (error.status === 404) return false; // Don't retry not found
    return failureCount < 3; // Retry up to 3 times
  }
});
```

### 6. Performance Optimization
```tsx
// Use selectors to prevent unnecessary re-renders
const sourceNames = useSources({}, {
  select: useCallback(
    (data) => data.results.map(s => s.name),
    []
  )
});
```

These hooks provide a complete solution for source data management with proper authentication, caching, and error handling following TanStack Query best practices.