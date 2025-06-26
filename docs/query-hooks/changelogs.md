# Changelogs Query Hooks

## Purpose

The changelogs query hooks manage changelog data from the Strapi CMS, providing a React Query interface for fetching application changelog entries. These hooks integrate with the StrapiAppService to retrieve changelog information with proper caching, error handling, and state management.

> **⚠️ Important Note**: This hook is currently non-functional until the Strapi instance is migrated to the new perigon.io domain.

## Hooks Overview

| Hook | Type | Purpose |
|------|------|---------|
| `useChangelogs` | Query | Fetches a list of changelog entries with optional filtering |

## Query Hooks

### useChangelogs

Fetches changelog entries from the Strapi CMS with support for filtering, pagination, and custom selectors.

**Signature:**
```tsx
function useChangelogs<T = Changelog[]>(
  params?: GetChangelogsParams,
  options?: UseQueryOptions<Changelog[], T>
): UseQueryResult<T, Error>
```

**Parameters:**
- `params` - Optional filtering and pagination parameters
- `options` - TanStack Query options with selector support

**Returns:** Standard TanStack Query result object with changelog data

## Query Keys

Query keys are managed using `@lukemorales/query-key-factory` for consistent caching and invalidation:

```tsx
// Generated query key structure
queryKeys.changelogs.getList(params)
// Example: ['changelogs', 'list', { page: 1, limit: 10 }]
```

The query keys automatically include the provided parameters to ensure proper cache segmentation based on different filter criteria.

## Usage Examples

### Basic Changelog Fetching

```tsx
import { useChangelogs } from '@/lib/query-hooks/changelogs';

function ChangelogList() {
  const { data: changelogs, isLoading, error } = useChangelogs();

  if (isLoading) return <div>Loading changelogs...</div>;
  if (error) return <div>Error loading changelogs</div>;

  return (
    <div>
      {changelogs?.map((changelog) => (
        <div key={changelog.id}>
          <h3>{changelog.version}</h3>
          <p>{changelog.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### Paginated Changelog Fetching

```tsx
import { useState } from 'react';
import { useChangelogs } from '@/lib/query-hooks/changelogs';

function PaginatedChangelogs() {
  const [page, setPage] = useState(1);
  
  const { 
    data: changelogs, 
    isLoading, 
    isFetching 
  } = useChangelogs({
    page,
    limit: 10,
    sort: 'createdAt:desc'
  });

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isFetching && !isLoading && <div>Updating...</div>}
      
      <div className="changelogs">
        {changelogs?.map((changelog) => (
          <ChangelogCard key={changelog.id} changelog={changelog} />
        ))}
      </div>
      
      <Pagination 
        currentPage={page}
        onPageChange={setPage}
        hasNextPage={changelogs?.length === 10}
      />
    </div>
  );
}
```

### Filtered Changelog Search

```tsx
import { useChangelogs } from '@/lib/query-hooks/changelogs';

function ChangelogSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: changelogs } = useChangelogs({
    filters: {
      $or: [
        { version: { $containsi: searchTerm } },
        { description: { $containsi: searchTerm } }
      ]
    }
  }, {
    enabled: searchTerm.length > 0,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search changelogs..."
      />
      
      {changelogs?.map((changelog) => (
        <ChangelogItem key={changelog.id} changelog={changelog} />
      ))}
    </div>
  );
}
```

## Selector Support

The hooks support TanStack Query's selector functionality for data transformation:

### Extract Specific Fields

```tsx
function useChangelogVersions() {
  return useChangelogs({}, {
    select: (changelogs) => changelogs.map(changelog => ({
      id: changelog.id,
      version: changelog.version,
      releaseDate: changelog.releaseDate
    }))
  });
}
```

### Filter and Transform Data

```tsx
function useRecentChangelogs() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  return useChangelogs({}, {
    select: (changelogs) => 
      changelogs
        .filter(changelog => new Date(changelog.releaseDate) > thirtyDaysAgo)
        .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
  });
}
```

### Aggregate Data

```tsx
function useChangelogStats() {
  return useChangelogs({}, {
    select: (changelogs) => ({
      totalChangelogs: changelogs.length,
      latestVersion: changelogs[0]?.version,
      releaseFrequency: calculateReleaseFrequency(changelogs)
    })
  });
}
```

## Caching Strategy

### Cache Configuration

```tsx
// Default caching behavior
const { data } = useChangelogs(params, {
  staleTime: 5 * 60 * 1000,    // 5 minutes
  cacheTime: 10 * 60 * 1000,   // 10 minutes
  refetchOnWindowFocus: false,
  refetchOnMount: true
});
```

### Manual Cache Management

```tsx
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';

function useChangelogCache() {
  const queryClient = useQueryClient();
  
  const invalidateChangelogs = () => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.changelogs._def
    });
  };
  
  const prefetchChangelogs = (params: GetChangelogsParams) => {
    queryClient.prefetchQuery({
      ...queryKeys.changelogs.getList(params),
      queryFn: ({ signal }) => StrapiAppService.getChangelogs(params, signal)
    });
  };
  
  return { invalidateChangelogs, prefetchChangelogs };
}
```

## Error Handling

### Basic Error Handling

```tsx
function ChangelogListWithErrorHandling() {
  const { data, error, isError, refetch } = useChangelogs();
  
  if (isError) {
    return (
      <div className="error-state">
        <h3>Failed to load changelogs</h3>
        <p>{error.message}</p>
        <button onClick={() => refetch()}>
          Try Again
        </button>
      </div>
    );
  }
  
  return <ChangelogList changelogs={data} />;
}
```

### Error Boundary Integration

```tsx
import { ErrorBoundary } from 'react-error-boundary';

function ChangelogSection() {
  return (
    <ErrorBoundary
      fallback={<div>Something went wrong loading changelogs</div>}
      onError={(error) => console.error('Changelog error:', error)}
    >
      <ChangelogList />
    </ErrorBoundary>
  );
}
```

### Retry Configuration

```tsx
function useChangelogsWithRetry() {
  return useChangelogs({}, {
    retry: (failureCount, error) => {
      // Don't retry on 404 or 403 errors
      if (error.status === 404 || error.status === 403) {
        return false;
      }
      // Retry up to 3 times for other errors
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
  });
}
```

## Related Services

### StrapiAppService Integration

The hooks integrate with `StrapiAppService.getChangelogs()`:

```tsx
// Service call signature
StrapiAppService.getChangelogs(
  params: GetChangelogsParams,
  signal?: AbortSignal
): Promise<Changelog[]>
```

### Service Parameters

```tsx
interface GetChangelogsParams {
  page?: number;
  limit?: number;
  sort?: string;
  filters?: StrapiFilters;
  populate?: string[];
}
```

## Best Practices

### 1. Parameter Memoization

```tsx
function ChangelogList({ filters }) {
  const params = useMemo(() => ({
    ...filters,
    sort: 'releaseDate:desc'
  }), [filters]);
  
  const { data } = useChangelogs(params);
  
  return <div>{/* render changelogs */}</div>;
}
```

### 2. Conditional Fetching

```tsx
function ConditionalChangelogs({ shouldFetch }) {
  const { data } = useChangelogs({}, {
    enabled: shouldFetch && someCondition
  });
  
  return data ? <ChangelogList changelogs={data} /> : null;
}
```

### 3. Background Updates

```tsx
function useBackgroundChangelogUpdates() {
  return useChangelogs({}, {
    refetchInterval: 5 * 60 * 1000, // 5 minutes
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true
  });
}
```

### 4. Optimistic UI Patterns

```tsx
function useOptimisticChangelogs() {
  const queryClient = useQueryClient();
  
  const updateChangelogOptimistically = (changelog: Changelog) => {
    queryClient.setQueryData(
      queryKeys.changelogs.getList({})._def,
      (old: Changelog[] = []) => [changelog, ...old]
    );
  };
  
  return { updateChangelogOptimistically };
}
```

### 5. Migration Preparation

Since this hook is currently non-functional, prepare for migration:

```tsx
// Prepare fallback or mock data during migration
function useChangelogsWithFallback() {
  const query = useChangelogs();
  
  // Return mock data or empty array during migration
  return {
    ...query,
    data: query.data || [],
    isLoading: false, // Override loading state if needed
    error: null // Clear errors during migration
  };
}
```