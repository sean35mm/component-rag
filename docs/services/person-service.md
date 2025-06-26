# Person Service API Documentation

## Purpose

The Person Service manages person-related API operations within our platform. It provides methods to search and retrieve person data including biographical information, occupations, and Wikidata integration. The service follows our architecture pattern of simple, focused CRUD operations that integrate seamlessly with TanStack Query hooks.

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getPeopleList` | `params: GetPeopleListParams`, `signal?: AbortSignal` | `Promise<StandardSearchResult<Person>>` | Retrieves a paginated list of people with optional filtering |

## Authentication

- **Private Service**: Uses `PrivateApiServiceWrapper` requiring authenticated API access
- **Public Service**: Available via `PublicPersonServiceBuilder` for unauthenticated access
- **Credential Management**: Automatically handled by service wrappers
- **Authorization**: Private endpoints require valid user credentials

## Error Handling

Following our **HttpException pattern**:

- **No service-level error handling**: All error handling delegated to query hooks
- **HTTP exceptions**: Non-2xx responses automatically throw `HttpException`
- **Network errors**: Handled by underlying fetch implementation
- **Validation errors**: Passed through from API responses

## Usage Examples

### Private Service Usage

```tsx
import { PersonService } from '@/lib/services/person-service';

// Basic people search
const searchResults = await PersonService.getPeopleList({
  name: 'Einstein',
  size: 10
});

// Filter by occupation
const scientists = await PersonService.getPeopleList({
  occupationLabel: 'scientist',
  size: 20
});

// Multiple Wikidata IDs
const specificPeople = await PersonService.getPeopleList({
  wikidataId: ['Q937', 'Q1035'],
});

// With abort signal for request cancellation
const controller = new AbortController();
const results = await PersonService.getPeopleList(
  { name: 'Newton' },
  controller.signal
);
```

### Public Service Usage

```tsx
import { PublicPersonServiceBuilder } from '@/lib/services/person-service';

// Build public service instance
const publicPersonService = PublicPersonServiceBuilder();

// Use same methods without authentication
const publicResults = await publicPersonService.getPeopleList({
  name: 'Darwin',
  size: 5
});
```

### Integration with TanStack Query

```tsx
import { useQuery } from '@tanstack/react-query';
import { PersonService } from '@/lib/services/person-service';

function usePeopleSearch(params: GetPeopleListParams) {
  return useQuery({
    queryKey: ['people', 'list', params],
    queryFn: ({ signal }) => PersonService.getPeopleList(params, signal),
    enabled: !!params.name || !!params.wikidataId,
  });
}

// Component usage
function PeopleSearchComponent() {
  const { data, isLoading, error } = usePeopleSearch({
    name: 'Tesla',
    occupationLabel: 'inventor'
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {data?.results.map(person => (
        <div key={person.id}>{person.name}</div>
      ))}
    </div>
  );
}
```

## Related Types

### GetPeopleListParams

```tsx
interface GetPeopleListParams {
  wikidataId?: string | string[];     // Filter by Wikidata identifier(s)
  name?: string;                      // Search by person name
  occupationId?: string | string[];   // Filter by occupation ID(s)
  occupationLabel?: string;           // Filter by occupation label
  size?: number;                      // Number of results to return
  prefixQ?: string;                   // Wikidata Q-prefix filter
}
```

### StandardSearchResult<Person>

```tsx
interface StandardSearchResult<T> {
  results: T[];
  total: number;
  page?: number;
  size?: number;
  hasMore?: boolean;
}

interface Person {
  id: string;
  name: string;
  wikidataId?: string;
  occupation?: string[];
  birthDate?: string;
  deathDate?: string;
  description?: string;
  // Additional person properties...
}
```

## Dependencies

- **PrivateApiServiceWrapper**: Handles authenticated API requests
- **PublicPlatformApiServiceWrapper**: Manages public API access
- **Fetch utility**: Underlying HTTP client with standardized error handling
- **Service architecture**: Follows our wrapper-based service pattern

## Integration

### Query Layer Integration

```tsx
// Query hook implementation
export function usePeopleListQuery(params: GetPeopleListParams) {
  return useQuery({
    queryKey: ['people', 'list', params],
    queryFn: ({ signal }) => PersonService.getPeopleList(params, signal),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Infinite query for pagination
export function useInfinitePeopleQuery(baseParams: GetPeopleListParams) {
  return useInfiniteQuery({
    queryKey: ['people', 'infinite', baseParams],
    queryFn: ({ pageParam = 0, signal }) =>
      PersonService.getPeopleList(
        { ...baseParams, page: pageParam },
        signal
      ),
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length : undefined,
  });
}
```

### Mutation Integration

```tsx
// Invalidation after person updates
const queryClient = useQueryClient();

const updatePersonMutation = useMutation({
  mutationFn: updatePerson,
  onSuccess: () => {
    // Invalidate person list queries
    queryClient.invalidateQueries({ queryKey: ['people'] });
  },
});
```

## Best Practices

### Architecture Adherence

✅ **Simple, focused methods**: Single responsibility per method  
✅ **No error handling**: Delegates to query hooks  
✅ **No data transformation**: Returns raw API responses  
✅ **Proper credential management**: Uses appropriate service wrappers  
✅ **HTTP Exception pattern**: Automatic exception throwing  

### Usage Guidelines

- **Always use abort signals** for cancellable requests
- **Leverage query keys** for efficient caching and invalidation
- **Use public service** for unauthenticated access only
- **Implement proper loading states** in components
- **Handle errors at the query hook level**, not in services

### Performance Considerations

- **Enable query caching** with appropriate stale times
- **Use infinite queries** for large datasets
- **Implement request debouncing** for search operations
- **Consider query prefetching** for predictable navigation patterns