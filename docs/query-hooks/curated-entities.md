# Curated Entities Query Hooks

## Purpose

These hooks manage curated entities data - specialized content that has been curated and filtered for display. The hooks handle fetching curated entity lists with proper authentication, data transformation from backend format to frontend format, and comprehensive caching strategies.

## Hooks Overview

| Hook | Type | Purpose |
|------|------|---------|
| `useCuratedEntities` | Query | Fetch and manage list of curated entities with authentication |

## Utilities Overview

| Export | Type | Purpose |
|--------|------|---------|
| `CuratedEntitiesServiceBuilder` | Service Builder | Creates appropriate service instance based on authentication state |
| `mapBackendEntityToFrontend` | Mapper Function | Transforms backend entity format to frontend format |

## Query Hooks

### `useCuratedEntities`

Fetches a list of curated entities with automatic authentication handling and data transformation.

**Signature:**
```tsx
function useCuratedEntities<T = CustomSearchResult<CuratedEntity>>(
  options?: UseQueryOptions<CustomSearchResult<CuratedEntity>, T>
): UseQueryResult<T, Error>
```

**Features:**
- Authentication-aware service selection
- Automatic backend-to-frontend data mapping
- Conditional enabling based on auth state
- Full selector support for data transformation

## Query Keys

Query keys are managed using `@lukemorales/query-key-factory` pattern:

```tsx
// Structure: queryKeys.curatedEntities.getList(tokenType, token)
const queryKey = queryKeys.curatedEntities.getList(token?.type, token?.token);
```

**Key Components:**
- `tokenType`: Type of authentication token (affects caching)
- `token`: Authentication token value (ensures user-specific caching)

## Usage Examples

### Basic List Fetching

```tsx
import { useCuratedEntities } from '@/lib/query-hooks/curated-entities';

function CuratedEntitiesList() {
  const { data, isLoading, error } = useCuratedEntities();

  if (isLoading) return <div>Loading curated entities...</div>;
  if (error) return <div>Error loading entities</div>;

  return (
    <div>
      <h2>Found {data.total} curated entities</h2>
      {data.data.map(entity => (
        <div key={entity.id}>
          <h3>{entity.title}</h3>
          <p>{entity.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### With Custom Options

```tsx
function CuratedEntitiesWithOptions() {
  const { data, isLoading } = useCuratedEntities({
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 3
  });

  return (
    <div>
      {data?.data.map(entity => (
        <EntityCard key={entity.id} entity={entity} />
      ))}
    </div>
  );
}
```

## Selector Support

Use selectors to transform query data:

### Extract Specific Data

```tsx
// Get only entity titles
const { data: titles } = useCuratedEntities({
  select: (result) => result.data.map(entity => entity.title)
});

// Get filtered entities
const { data: publishedEntities } = useCuratedEntities({
  select: (result) => ({
    ...result,
    data: result.data.filter(entity => entity.status === 'published')
  })
});
```

### Transform Data Structure

```tsx
// Create entity lookup map
const { data: entityMap } = useCuratedEntities({
  select: (result) => result.data.reduce((acc, entity) => {
    acc[entity.id] = entity;
    return acc;
  }, {} as Record<string, CuratedEntity>)
});

// Get statistics
const { data: stats } = useCuratedEntities({
  select: (result) => ({
    total: result.total,
    loaded: result.data.length,
    categories: [...new Set(result.data.map(e => e.category))]
  })
});
```

### Conditional Data Processing

```tsx
// Transform only when data is complete
const { data: processedEntities } = useCuratedEntities({
  select: (result) => {
    if (result.data.length < result.total) {
      return result; // Return raw data if incomplete
    }
    
    return {
      ...result,
      data: result.data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 10) // Top 10 newest
    };
  }
});
```

## Caching Strategy

### Cache Invalidation

```tsx
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';

function useInvalidateCuratedEntities() {
  const queryClient = useQueryClient();
  const { token } = useAccessToken();

  return () => {
    // Invalidate current user's curated entities
    queryClient.invalidateQueries({
      queryKey: queryKeys.curatedEntities.getList(token?.type, token?.token).queryKey
    });
    
    // Invalidate all curated entities queries
    queryClient.invalidateQueries({
      queryKey: queryKeys.curatedEntities._def
    });
  };
}
```

### Cache Updates

```tsx
function useCacheUpdates() {
  const queryClient = useQueryClient();
  const { token } = useAccessToken();

  const updateEntityInCache = (updatedEntity: CuratedEntity) => {
    const queryKey = queryKeys.curatedEntities.getList(token?.type, token?.token).queryKey;
    
    queryClient.setQueryData(queryKey, (old: CustomSearchResult<CuratedEntity>) => {
      if (!old) return old;
      
      return {
        ...old,
        data: old.data.map(entity => 
          entity.id === updatedEntity.id ? updatedEntity : entity
        )
      };
    });
  };

  return { updateEntityInCache };
}
```

### Prefetching

```tsx
function usePrefetchCuratedEntities() {
  const queryClient = useQueryClient();
  const { isAuthorizedAndVerified, isPublic, token } = useAccessToken();

  return () => {
    if (isPublic || isAuthorizedAndVerified) {
      queryClient.prefetchQuery({
        ...queryKeys.curatedEntities.getList(token?.type, token?.token),
        queryFn: async ({ signal }) => {
          const data = await CuratedEntitiesServiceBuilder(
            isAuthorizedAndVerified,
            isPublic,
            token
          ).getList(signal);
          return mapBackendEntityToFrontend(data);
        }
      });
    }
  };
}
```

## Error Handling

Errors are handled by TanStack Query's built-in error management:

```tsx
function CuratedEntitiesWithErrorHandling() {
  const { data, isLoading, error, isError } = useCuratedEntities({
    retry: (failureCount, error) => {
      // Don't retry on 401/403 errors
      if (error.status === 401 || error.status === 403) {
        return false;
      }
      return failureCount < 3;
    },
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
  });

  if (isError) {
    return <ErrorComponent error={error} />;
  }

  return <div>{/* Component content */}</div>;
}
```

## Data Transformation

### Backend to Frontend Mapping

The `mapBackendEntityToFrontend` function:

```tsx
function mapBackendEntityToFrontend(
  res: CustomSearchResult<BackendCuratedEntity>
): CustomSearchResult<CuratedEntity> {
  return { 
    ...res, 
    data: res.data.map(curatedEntityMapper).filter((f) => !!f) 
  };
}
```

**Transformation Process:**
1. Maps each backend entity using `curatedEntityMapper`
2. Filters out any null/undefined results
3. Preserves pagination metadata (`total`, `offset`, etc.)

## Related Services

### Service Integration

```tsx
// Public service for unauthenticated requests
PublicCuratedEntitiesServiceBuilder

// Private service for authenticated requests  
PrivateCuratedEntitiesService

// Dynamic service builder
CuratedEntitiesServiceBuilder(isAuthorizedAndVerified, isPublic, token)
```

### Authentication Flow

```tsx
// Service selection logic
const service = CuratedEntitiesServiceBuilder(
  isAuthorizedAndVerified, // Has valid token and verified
  isPublic,               // Public access allowed
  token                   // Current auth token
);

// Query enabling logic
const isEnabled = (isPublic || isAuthorizedAndVerified) && options?.enabled;
```

## Best Practices

### 1. Authentication Handling

```tsx
// ✅ Correct: Let the hook handle authentication
function MyComponent() {
  const { data } = useCuratedEntities();
  // Hook automatically handles auth state
}

// ❌ Incorrect: Manual auth checking
function MyComponent() {
  const { isAuthenticated } = useAuth();
  const { data } = useCuratedEntities({
    enabled: isAuthenticated // Hook already handles this
  });
}
```

### 2. Selector Usage

```tsx
// ✅ Correct: Use selectors for data transformation
const { data: entityTitles } = useCuratedEntities({
  select: (result) => result.data.map(e => e.title)
});

// ❌ Incorrect: Transform in component
const { data } = useCuratedEntities();
const entityTitles = data?.data.map(e => e.title); // Runs on every render
```

### 3. Error Boundaries

```tsx
// ✅ Correct: Let TanStack Query handle errors
function CuratedEntitiesView() {
  const { data, error } = useCuratedEntities();
  
  if (error) {
    throw error; // Let error boundary handle it
  }
  
  return <div>{/* content */}</div>;
}
```

### 4. Conditional Enabling

```tsx
// ✅ Correct: Additional conditions with existing logic
const { data } = useCuratedEntities({
  enabled: shouldFetch // Combines with built-in auth logic
});

// ❌ Incorrect: Overriding auth logic completely
const { data } = useCuratedEntities({
  enabled: customCondition && isAuthenticated // Duplicates internal logic
});
```