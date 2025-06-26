# Journalists Query Hooks

## Purpose

The journalists query hooks provide a complete interface for fetching journalist data through TanStack Query. These hooks manage the data fetching and caching for individual journalists and journalist collections, supporting both authenticated and public access patterns with automatic service builder selection.

## Hooks Overview

| Hook | Type | Purpose |
|------|------|---------|
| `useJournalistById` | Query | Fetch a single journalist by ID |
| `useJournalistByIdSuspense` | Suspense Query | Fetch a single journalist by ID with Suspense support |
| `useJournalistByName` | Query | Fetch a journalist by name (returns first match or null) |
| `useJournalistByNameSuspense` | Suspense Query | Fetch a journalist by name with Suspense support |
| `useJournalists` | Query | Fetch a paginated list of journalists with search/filter parameters |

## Service Builder

### JournalistServiceBuilder

```typescript
const JournalistServiceBuilder = ServiceBuilder(
  PublicJournalistServiceBuilder,
  JournalistService
);
```

The service builder automatically selects between public and authenticated journalist services based on user access level and context.

## Query Hooks

### useJournalistById

Fetches a single journalist by their unique identifier.

```typescript
function useJournalistById<T = Journalist>(
  journalistId: string,
  options?: UseQueryOptions<Journalist, T>
): UseQueryResult<T, Error>
```

**Parameters:**
- `journalistId` - The unique identifier for the journalist
- `options` - TanStack Query options including selector support

**Features:**
- Automatic service selection based on user authentication
- Built-in enabled condition checking access permissions
- Support for custom selectors and transformations

### useJournalistByIdSuspense

Suspense-enabled version for fetching a journalist by ID.

```typescript
function useJournalistByIdSuspense<T = Journalist>(
  journalistId: string,
  isAuthorizedAndVerified: boolean,
  isPublic: boolean,
  token?: AccessToken,
  options?: UseSuspenseQueryOptions<Journalist, T>
): UseSuspenseQueryResult<T, Error>
```

**Parameters:**
- `journalistId` - The unique identifier for the journalist
- `isAuthorizedAndVerified` - User authorization status
- `isPublic` - Public access availability
- `token` - Access token for authenticated requests
- `options` - Suspense query options

**Features:**
- Suspense boundary integration
- Memoized query function for performance
- Manual access control parameters

### useJournalistByName

Fetches a journalist by their name, returning the first match or null.

```typescript
function useJournalistByName<T = Journalist | null>(
  name: string,
  options?: UseQueryOptions<Journalist | null, T>
): UseQueryResult<T, Error>
```

**Parameters:**
- `name` - The journalist's name to search for
- `options` - Query options with selector support

**Features:**
- Searches using the list endpoint with size=1
- Returns null if no journalist found
- Automatic access permission checking

### useJournalistByNameSuspense

Suspense-enabled version for fetching a journalist by name.

```typescript
function useJournalistByNameSuspense<T = Journalist | null>(
  name: string,
  isAuthorizedAndVerified: boolean,
  isPublic: boolean,
  token?: AccessToken,
  options?: UseSuspenseQueryOptions<Journalist | null, T>
): UseSuspenseQueryResult<T, Error>
```

**Parameters:**
- `name` - The journalist's name to search for
- `isAuthorizedAndVerified` - User authorization status
- `isPublic` - Public access availability
- `token` - Access token for authenticated requests
- `options` - Suspense query options

### useJournalists

Fetches a paginated list of journalists with optional search and filter parameters.

```typescript
function useJournalists<T = StandardSearchResult<Journalist>>(
  params: GetJournalistsListParams = {},
  options?: UseQueryOptions<StandardSearchResult<Journalist>, T>
): UseQueryResult<T, Error>
```

**Parameters:**
- `params` - Search and pagination parameters
- `options` - Query options with selector support

**Features:**
- Pagination support
- Search and filtering capabilities
- Returns standardized search results

## Query Keys

Query keys are structured using `@lukemorales/query-key-factory`:

```typescript
// Individual journalist by ID
queryKeys.journalists.getById(token?.token || '', journalistId)

// Journalist by name
queryKeys.journalists.getByName(token?.token || '', name)

// Journalists list with parameters
queryKeys.journalists.getList(token?.token || '', params)
```

The query keys include:
- **Token-based scoping** - Different cache entries for different access levels
- **Parameter-based keys** - Unique keys for different search parameters
- **Hierarchical structure** - Organized under the journalists namespace

## Usage Examples

### Basic Journalist Fetching

```typescript
import { useJournalistById, useJournalists } from '@/lib/query-hooks/journalists';

function JournalistProfile({ journalistId }: { journalistId: string }) {
  const { data: journalist, isLoading, error } = useJournalistById(journalistId);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!journalist) return <NotFound />;

  return (
    <div>
      <h1>{journalist.name}</h1>
      <p>{journalist.bio}</p>
    </div>
  );
}
```

### Journalist Search with Parameters

```typescript
function JournalistDirectory() {
  const [searchParams, setSearchParams] = useState<GetJournalistsListParams>({
    page: 1,
    size: 20,
    name: '',
  });

  const { 
    data: results, 
    isLoading, 
    error 
  } = useJournalists(searchParams);

  return (
    <div>
      <SearchInput 
        value={searchParams.name}
        onChange={(name) => setSearchParams(prev => ({ ...prev, name, page: 1 }))}
      />
      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage error={error} />}
      {results && (
        <JournalistList 
          journalists={results.results}
          pagination={results.pagination}
          onPageChange={(page) => setSearchParams(prev => ({ ...prev, page }))}
        />
      )}
    </div>
  );
}
```

### Finding Journalist by Name

```typescript
function JournalistLookup({ name }: { name: string }) {
  const { data: journalist, isLoading } = useJournalistByName(name);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      {journalist ? (
        <JournalistCard journalist={journalist} />
      ) : (
        <p>No journalist found with name "{name}"</p>
      )}
    </div>
  );
}
```

### Suspense Integration

```typescript
import { useJournalistByIdSuspense } from '@/lib/query-hooks/journalists';
import { useAccessToken } from '@/lib/contexts';

function SuspenseJournalistProfile({ journalistId }: { journalistId: string }) {
  const { isAuthorizedAndVerified, isPublic, token } = useAccessToken();
  
  const { data: journalist } = useJournalistByIdSuspense(
    journalistId,
    isAuthorizedAndVerified,
    isPublic,
    token
  );

  return (
    <div>
      <h1>{journalist.name}</h1>
      <p>{journalist.bio}</p>
    </div>
  );
}

// Usage with Suspense boundary
function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SuspenseJournalistProfile journalistId="123" />
    </Suspense>
  );
}
```

## Selector Support

### Data Transformation

```typescript
// Extract only journalist name and bio
const { data: basicInfo } = useJournalistById(
  journalistId,
  {
    select: (journalist) => ({
      name: journalist.name,
      bio: journalist.bio,
    })
  }
);

// Transform journalist list to ID array
const { data: journalistIds } = useJournalists(
  { featured: true },
  {
    select: (results) => results.results.map(j => j.id)
  }
);
```

### Computed Values

```typescript
// Check if journalist has recent articles
const { data: hasRecentWork } = useJournalistById(
  journalistId,
  {
    select: (journalist) => {
      const lastArticleDate = new Date(journalist.lastArticleDate);
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      return lastArticleDate > thirtyDaysAgo;
    }
  }
);
```

## Caching Strategy

### Cache Keys Structure

```typescript
// Cache is organized by access level and parameters
[
  'journalists',
  'getById',
  { token: 'user-token-hash', journalistId: '123' }
]

[
  'journalists',
  'getList',
  { token: 'user-token-hash', params: { name: 'John', page: 1 } }
]
```

### Access-Level Separation

- **Public cache** - Accessible without authentication
- **Authenticated cache** - Token-scoped data with additional permissions
- **Automatic selection** - Service builder handles appropriate cache usage

### Cache Invalidation

```typescript
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';

function useInvalidateJournalists() {
  const queryClient = useQueryClient();
  const { token } = useAccessToken();

  return {
    // Invalidate all journalist queries
    invalidateAll: () => 
      queryClient.invalidateQueries({
        queryKey: queryKeys.journalists._def
      }),

    // Invalidate specific journalist
    invalidateById: (journalistId: string) =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.journalists.getById(token?.token || '', journalistId)
      }),

    // Invalidate journalist lists
    invalidateLists: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.journalists.getList._def
      })
  };
}
```

## Error Handling

### Service Error Integration

```typescript
// Services throw HttpException, handled by TanStack Query
const { data, error, isError } = useJournalistById(journalistId);

if (isError) {
  // error is HttpException with status codes and messages
  if (error.status === 404) {
    return <NotFoundMessage>Journalist not found</NotFoundMessage>;
  }
  if (error.status === 403) {
    return <AccessDeniedMessage />;
  }
  return <GenericErrorMessage error={error} />;
}
```

### Error Boundaries

```typescript
import { ErrorBoundary } from 'react-error-boundary';

function JournalistErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <h2>Something went wrong loading journalist data:</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={JournalistErrorFallback}>
      <JournalistProfile journalistId="123" />
    </ErrorBoundary>
  );
}
```

## Related Services

### Core Services
- **`JournalistService`** - Authenticated journalist operations
- **`PublicJournalistServiceBuilder`** - Public journalist access
- **`ServiceBuilder`** - Automatic service selection utility

### Service Integration
```typescript
// The hooks automatically integrate with:
import { 
  JournalistService,
  PublicJournalistServiceBuilder,
  GetJournalistsListParams 
} from '@/lib/services/journalist-service';

// And use access control from:
import { useAccessToken } from '@/lib/contexts';
```

### Type Definitions
```typescript
import {
  Journalist,
  StandardSearchResult,
  AccessToken,
  UseQueryOptions,
  UseSuspenseQueryOptions
} from '@/lib/types';
```

## Best Practices

### 1. Access Token Usage
```typescript
// ✅ Let hooks handle access tokens automatically
const { data } = useJournalistById(journalistId);

// ❌ Don't manually manage tokens in components
const { token } = useAccessToken();
const { data } = useJournalistById(journalistId, token);
```

### 2. Enabled Conditions
```typescript
// ✅ Use enabled option for conditional fetching
const { data } = useJournalistById(
  journalistId,
  { enabled: !!journalistId && shouldFetch }
);

// ❌ Don't conditionally call hooks
if (journalistId && shouldFetch) {
  const { data } = useJournalistById(journalistId);
}
```

### 3. Suspense vs Regular Hooks
```typescript
// ✅ Use suspense hooks within Suspense boundaries
function SuspenseComponent() {
  const { data } = useJournalistByIdSuspense(/* ... */);
  return <JournalistView journalist={data} />;
}

// ✅ Use regular hooks for loading states
function LoadingComponent() {
  const { data, isLoading } = useJournalistById(journalistId);
  if (isLoading) return <Spinner />;
  return <JournalistView journalist={data} />;
}
```

### 4. Parameter Optimization
```typescript
// ✅ Memoize complex parameters
const searchParams = useMemo(() => ({
  name: searchTerm,
  page: currentPage,
  size: pageSize,
}), [searchTerm, currentPage, pageSize]);

const { data } = useJournalists(searchParams);
```

### 5. Error Handling
```typescript
// ✅ Handle specific error cases
const { data, error, isError } = useJournalistById(journalistId);

if (isError) {
  switch (error.status) {
    case 404:
      return <NotFound />;
    case 403:
      return <AccessDenied />;
    default:
      return <ErrorFallback error={error} />;
  }
}
```