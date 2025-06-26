# Source Groups Query Hooks

## Purpose

The Source Groups query hooks provide a standardized interface for fetching and managing source group data in the application. These hooks handle paginated and infinite scroll patterns for source group lists, with built-in authentication, caching, and error handling.

## Hooks Overview

| Hook | Type | Purpose |
|------|------|---------|
| `useSourceGroups` | Query | Fetch paginated source groups list with sorting and filtering |
| `useSourceGroupsInfinite` | Infinite Query | Fetch source groups with infinite scroll pagination |

## Query Hooks

### useSourceGroups

Fetches a paginated list of source groups with configurable sorting and filtering options.

**Signature:**
```tsx
function useSourceGroups<T = SourceGroupsResponse>(
  params?: GetSourceGroupsListParams,
  options?: UseQueryOptions<SourceGroupsResponse, T>
): UseQueryResult<T, Error>
```

**Parameters:**
- `params` - Query parameters for filtering and sorting (optional)
  - Default: `{ sortBy: 'createdAt', sortOrder: 'desc' }`
- `options` - TanStack Query options with selector support

**Features:**
- ✅ Authentication-aware (auto-disabled when not authenticated)
- ✅ Selector function support for data transformation
- ✅ Configurable sorting and filtering
- ✅ Automatic query key generation
- ✅ Request cancellation support

### useSourceGroupsInfinite

Provides infinite scroll functionality for source groups with automatic pagination management.

**Signature:**
```tsx
function useSourceGroupsInfinite<T = SourceGroupsResponse>(
  params?: Omit<GetSourceGroupsListParams, 'page' | 'size'>,
  options?: UseInfiniteQueryOptions<SourceGroupsResponse, T>
): UseInfiniteQueryResult<T, Error>
```

**Parameters:**
- `params` - Query parameters excluding pagination (optional)
  - Default: `{ sortBy: 'createdAt', sortOrder: 'desc' }`
- `options` - Infinite query options with default page size of 25

**Features:**
- ✅ Automatic pagination management
- ✅ Configurable page size (default: 25)
- ✅ Smart next page detection
- ✅ Authentication-aware
- ✅ Selector support for data transformation

## Query Keys

Query keys are generated using `@lukemorales/query-key-factory` for consistency and type safety:

```tsx
// Standard list query
queryKeys.sourceGroups.getList(token, params)

// Infinite query
queryKeys.sourceGroups.getListInfinite(token, params)
```

**Key Structure:**
- Includes authentication token for user-specific caching
- Incorporates all query parameters for precise cache invalidation
- Separates standard and infinite query patterns

## Usage Examples

### Basic Source Groups List

```tsx
import { useSourceGroups } from '@/lib/query-hooks/source-groups/use-query';

function SourceGroupsList() {
  const { data, isLoading, error } = useSourceGroups();

  if (isLoading) return <div>Loading source groups...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.items.map(group => (
        <div key={group.id}>{group.name}</div>
      ))}
    </div>
  );
}
```

### Filtered and Sorted Query

```tsx
function FilteredSourceGroups() {
  const { data } = useSourceGroups({
    sortBy: 'name',
    sortOrder: 'asc',
    search: 'active',
    status: 'enabled'
  });

  return (
    <div>
      <h2>Active Source Groups ({data?.total || 0})</h2>
      {data?.items.map(group => (
        <div key={group.id}>{group.name}</div>
      ))}
    </div>
  );
}
```

### Infinite Scroll Implementation

```tsx
import { useSourceGroupsInfinite } from '@/lib/query-hooks/source-groups/use-query';

function InfiniteSourceGroupsList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useSourceGroupsInfinite(
    { sortBy: 'name', sortOrder: 'asc' },
    { size: 20 }
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {data?.pages.map((page, i) => (
        <div key={i}>
          {page.items.map(group => (
            <div key={group.id}>{group.name}</div>
          ))}
        </div>
      ))}
      
      {hasNextPage && (
        <button 
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </button>
      )}
    </div>
  );
}
```

### With React Intersection Observer

```tsx
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

function AutoLoadingSourceGroups() {
  const { ref, inView } = useInView();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useSourceGroupsInfinite();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div>
      {data?.pages.map((page, i) => (
        <div key={i}>
          {page.items.map(group => (
            <div key={group.id}>{group.name}</div>
          ))}
        </div>
      ))}
      
      {hasNextPage && <div ref={ref}>Loading more...</div>}
    </div>
  );
}
```

## Selector Support

Both hooks support selector functions for data transformation and performance optimization:

### Transform Response Data

```tsx
// Extract only names from source groups
const sourceGroupNames = useSourceGroups(
  { sortBy: 'name' },
  {
    select: (data) => data.items.map(group => group.name)
  }
);
```

### Compute Derived State

```tsx
// Get count of active source groups
const activeCount = useSourceGroups(
  { status: 'active' },
  {
    select: (data) => data.items.filter(group => group.isActive).length
  }
);
```

### Transform Infinite Data

```tsx
// Flatten infinite pages into single array
const allSourceGroups = useSourceGroupsInfinite(
  {},
  {
    select: (data) => data.pages.flatMap(page => page.items)
  }
);
```

## Caching Strategy

### Cache Keys
- **Standard queries**: Include token + all parameters for precise invalidation
- **Infinite queries**: Separate key space to prevent conflicts
- **User-specific**: Token inclusion ensures user data isolation

### Cache Invalidation
```tsx
// Invalidate all source group queries
queryClient.invalidateQueries({ 
  queryKey: queryKeys.sourceGroups._def 
});

// Invalidate specific parameter combination
queryClient.invalidateQueries({ 
  queryKey: queryKeys.sourceGroups.getList(token, params) 
});
```

### Optimistic Updates
```tsx
// After creating a new source group
queryClient.setQueryData(
  queryKeys.sourceGroups.getList(token, params),
  (old) => ({
    ...old,
    items: [newGroup, ...old.items],
    total: old.total + 1
  })
);
```

## Error Handling

### Automatic Error Management
- Service throws `HttpException` for HTTP errors
- TanStack Query captures and exposes errors through `error` property
- Authentication errors automatically disable queries

### Custom Error Handling

```tsx
function SourceGroupsWithErrorHandling() {
  const { data, error, isError } = useSourceGroups();

  if (isError) {
    if (error instanceof HttpException) {
      switch (error.status) {
        case 403:
          return <div>Access denied to source groups</div>;
        case 404:
          return <div>Source groups not found</div>;
        default:
          return <div>Error loading source groups: {error.message}</div>;
      }
    }
    return <div>An unexpected error occurred</div>;
  }

  return <div>{/* Render data */}</div>;
}
```

### Retry Configuration

```tsx
const { data } = useSourceGroups(
  { sortBy: 'name' },
  {
    retry: (failureCount, error) => {
      // Don't retry on authentication errors
      if (error instanceof HttpException && error.status === 401) {
        return false;
      }
      return failureCount < 3;
    }
  }
);
```

## Related Services

### SourceGroupService Integration
```tsx
// Located at: @/lib/services/source-group-service
export class SourceGroupService {
  static async getList(
    params: GetSourceGroupsListParams,
    signal?: AbortSignal
  ): Promise<SourceGroupsResponse> {
    // Service implementation
  }
}
```

### Type Definitions
```tsx
// From @/lib/types
interface SourceGroupsResponse {
  items: SourceGroup[];
  total: number;
  page: number;
  size: number;
}

interface GetSourceGroupsListParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  status?: string;
}
```

## Best Practices

### 1. Authentication Handling
```tsx
// ✅ Good - Queries automatically disabled when not authenticated
const { data } = useSourceGroups();

// ❌ Avoid - Manual authentication checks
const { token } = useAccessToken();
const { data } = useSourceGroups({}, { 
  enabled: !!token 
});
```

### 2. Parameter Management
```tsx
// ✅ Good - Stable parameter objects
const params = useMemo(() => ({
  sortBy: 'createdAt',
  sortOrder: 'desc',
  search: searchTerm
}), [searchTerm]);

const { data } = useSourceGroups(params);

// ❌ Avoid - Inline objects cause unnecessary re-renders
const { data } = useSourceGroups({
  sortBy: 'createdAt',
  search: searchTerm
});
```

### 3. Infinite Query Sizing
```tsx
// ✅ Good - Reasonable page sizes
const { data } = useSourceGroupsInfinite({}, { size: 25 });

// ❌ Avoid - Too large page sizes
const { data } = useSourceGroupsInfinite({}, { size: 1000 });
```

### 4. Selector Optimization
```tsx
// ✅ Good - Stable selector functions
const selectNames = useCallback(
  (data: SourceGroupsResponse) => data.items.map(g => g.name),
  []
);

const names = useSourceGroups({}, { select: selectNames });

// ❌ Avoid - Inline selectors
const names = useSourceGroups({}, {
  select: (data) => data.items.map(g => g.name)
});
```

### 5. Error Boundaries
```tsx
// ✅ Good - Wrap components with error boundaries
<ErrorBoundary>
  <SourceGroupsList />
</ErrorBoundary>

// ✅ Good - Handle errors gracefully
function SourceGroupsList() {
  const { data, error } = useSourceGroups();
  
  if (error) return <ErrorMessage error={error} />;
  return <div>{/* Render data */}</div>;
}
```