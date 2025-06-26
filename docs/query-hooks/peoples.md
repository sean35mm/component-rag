# Peoples Query Hooks

## Purpose

The `peoples` query hooks manage fetching and querying person data from the Person Service API. These hooks provide access to person records with support for both public and authenticated access, handling Wikidata ID-based lookups and general person listing functionality.

## Hooks Overview

| Hook | Type | Purpose |
|------|------|---------|
| `usePeoples` | Query | Fetches paginated list of people with filtering support |
| `usePeopleByWikidataIdSuspense` | Suspense Query | Fetches a single person by Wikidata ID with suspense boundaries |

## Query Hooks

### `usePeoples`

Fetches a paginated list of people with optional filtering parameters.

```tsx
function usePeoples<T = StandardSearchResult<Person>>(
  params?: GetPeopleListParams,
  options?: UseQueryOptions<StandardSearchResult<Person>, T>
): UseQueryResult<T>
```

**Parameters:**
- `params` - Optional filtering and pagination parameters
- `options` - TanStack Query options with selector support

**Features:**
- Automatic authentication handling via `useAccessToken`
- Conditional enabling based on authentication state
- Service builder pattern for public/private API selection
- Full selector support for data transformation

### `usePeopleByWikidataIdSuspense`

Fetches a single person by their Wikidata ID using suspense patterns.

```tsx
function usePeopleByWikidataIdSuspense<T = Person | null>(
  wikidataId: string,
  isAuthorizedAndVerified: boolean,
  isPublic: boolean,
  token?: AccessToken,
  options?: UseSuspenseQueryOptions<Person | null, T>
): UseSuspenseQueryResult<T>
```

**Parameters:**
- `wikidataId` - The Wikidata identifier for the person
- `isAuthorizedAndVerified` - Authentication verification status
- `isPublic` - Whether to use public API access
- `token` - Optional access token for authenticated requests
- `options` - TanStack Query suspense options with selector support

**Features:**
- Suspense-based data fetching with loading boundaries
- Memoized query function for performance optimization
- Returns `null` when person is not found
- Manual authentication parameter passing for flexibility

## Query Keys

Query keys are structured using `@lukemorales/query-key-factory` through the `queryKeys.peoples` factory:

```tsx
// List queries with parameters and token-based cache separation
queryKeys.peoples.getList(token?.token || '', params)

// Individual person queries by Wikidata ID
queryKeys.peoples.getByWikidataId(token?.token || '', wikidataId)
```

**Key Structure:**
- Token-based cache separation for public/authenticated data isolation
- Parameter-based cache keys for efficient query caching
- Hierarchical structure supporting targeted invalidation

## Usage Examples

### Basic People List

```tsx
import { usePeoples } from '@/lib/query-hooks/peoples';

function PeopleList() {
  const { data, isLoading, error } = usePeoples();

  if (isLoading) return <div>Loading people...</div>;
  if (error) return <div>Error loading people</div>;

  return (
    <div>
      {data?.results.map(person => (
        <div key={person.wikidataId}>
          {person.name}
        </div>
      ))}
    </div>
  );
}
```

### Filtered People Query

```tsx
import { usePeoples } from '@/lib/query-hooks/peoples';

function FilteredPeopleList() {
  const { data } = usePeoples({
    search: 'scientist',
    size: 20,
    page: 1
  });

  return (
    <div>
      <h2>Scientists ({data?.total || 0})</h2>
      {data?.results.map(person => (
        <PersonCard key={person.wikidataId} person={person} />
      ))}
    </div>
  );
}
```

### Person by Wikidata ID with Suspense

```tsx
import { usePeopleByWikidataIdSuspense } from '@/lib/query-hooks/peoples';
import { useAccessToken } from '@/lib/contexts';

function PersonProfile({ wikidataId }: { wikidataId: string }) {
  const { isAuthorizedAndVerified, isPublic, token } = useAccessToken();
  
  const person = usePeopleByWikidataIdSuspense(
    wikidataId,
    isAuthorizedAndVerified,
    isPublic,
    token
  );

  if (!person) {
    return <div>Person not found</div>;
  }

  return (
    <div>
      <h1>{person.name}</h1>
      <p>Wikidata ID: {person.wikidataId}</p>
    </div>
  );
}

// Usage with Suspense boundary
function PersonPage({ wikidataId }: { wikidataId: string }) {
  return (
    <Suspense fallback={<PersonProfileSkeleton />}>
      <PersonProfile wikidataId={wikidataId} />
    </Suspense>
  );
}
```

## Selector Support

Both hooks support selector functions for data transformation:

### Transform People List Data

```tsx
// Extract only names and IDs
const { data: peopleNames } = usePeoples(
  { size: 100 },
  {
    select: (data) => data.results.map(person => ({
      id: person.wikidataId,
      name: person.name
    }))
  }
);
```

### Transform Person Data

```tsx
// Extract specific person fields
const { data: personSummary } = usePeopleByWikidataIdSuspense(
  wikidataId,
  isAuthorizedAndVerified,
  isPublic,
  token,
  {
    select: (person) => person ? {
      name: person.name,
      id: person.wikidataId,
      hasDetails: Boolean(person.description)
    } : null
  }
);
```

## Caching Strategy

### Cache Key Structure
- **Token Separation**: Different caches for public vs authenticated data
- **Parameter-Based**: Unique cache entries for different query parameters
- **Hierarchical**: Supports targeted invalidation at different levels

### Cache Invalidation Patterns
```tsx
// Invalidate all people queries
queryClient.invalidateQueries(queryKeys.peoples._def);

// Invalidate specific person
queryClient.invalidateQueries(
  queryKeys.peoples.getByWikidataId(token, wikidataId)
);

// Invalidate filtered lists
queryClient.invalidateQueries(
  queryKeys.peoples.getList(token, params)
);
```

## Error Handling

Errors are managed through TanStack Query's built-in error handling:

```tsx
function PeopleListWithErrorHandling() {
  const { data, error, isError, refetch } = usePeoples();

  if (isError) {
    return (
      <div>
        <p>Failed to load people: {error.message}</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  return <PeopleList data={data} />;
}
```

**Error Sources:**
- Network connectivity issues
- Authentication/authorization failures
- Invalid Wikidata IDs
- Service unavailability

## Utilities

### `PersonServiceBuilder`

Service builder utility that selects appropriate service implementation based on authentication state:

```tsx
const PersonServiceBuilder = ServiceBuilder(
  PublicPersonServiceBuilder,
  PersonService
);
```

### `getByIdQueryFn`

Reusable query function factory for fetching people by Wikidata ID:

```tsx
const queryFn = getByIdQueryFn(
  wikidataId,
  isAuthorizedAndVerified,
  isPublic,
  token
);
```

## Related Services

- **PersonService**: Main service for authenticated person operations
- **PublicPersonServiceBuilder**: Public API service builder
- **ServiceBuilder**: Utility for selecting service implementations

## Best Practices

### Authentication Handling
```tsx
// ✅ Let usePeoples handle authentication automatically
const { data } = usePeoples(params);

// ✅ Pass authentication explicitly for suspense queries
const person = usePeopleByWikidataIdSuspense(
  wikidataId,
  isAuthorizedAndVerified,
  isPublic,
  token
);
```

### Query Enabling
```tsx
// ✅ Conditional enabling based on required data
const { data } = usePeoples(
  { wikidataId: selectedId },
  { 
    enabled: Boolean(selectedId)
  }
);
```

### Suspense Boundaries
```tsx
// ✅ Always wrap suspense queries in Suspense components
<Suspense fallback={<Loading />}>
  <PersonProfile wikidataId={wikidataId} />
</Suspense>
```

### Error Boundaries
```tsx
// ✅ Use error boundaries with suspense queries
<ErrorBoundary fallback={<ErrorDisplay />}>
  <Suspense fallback={<Loading />}>
    <PersonProfile wikidataId={wikidataId} />
  </Suspense>
</ErrorBoundary>
```