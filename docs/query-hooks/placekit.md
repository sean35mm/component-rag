# PlaceKit Query Hooks

## Purpose

The PlaceKit query hooks provide integration with the PlaceKit geocoding and place search API. These hooks manage location search functionality, enabling autocomplete and place lookup features throughout the application with proper caching and error handling via TanStack Query.

## Hooks Overview

| Hook | Type | Purpose |
|------|------|---------|
| `usePlacekitSearch` | Query | Search for places using PlaceKit API with configurable options |

## Exports

### Constants

- **`pk`** - Configured PlaceKit client instance
- **`PLACEKIT_OPTIONS`** - Default search options (types, maxResults)
- **`PREDEFINED_PARAMS`** - Predefined parameters (countries, language)

### Hooks

- **`usePlacekitSearch`** - Hook for searching places with PlaceKit

## Query Hooks

### usePlacekitSearch

Searches for places using the PlaceKit API with configurable search options and selector support.

```tsx
function usePlacekitSearch<T = PKSearchResponsePatched>(
  query: string,
  options?: Omit<PKOptions, keyof typeof PREDEFINED_PARAMS>,
  useQueryOptions?: UseQueryOptions<PKSearchResponsePatched, T>
): UseQueryResult<T, Error>
```

**Parameters:**
- `query` - Search query string
- `options` - PlaceKit search options (excluding predefined params)
- `useQueryOptions` - TanStack Query options with selector support

**Returns:** TanStack Query result with place search data

## Configuration

### Default Options

```tsx
export const PLACEKIT_OPTIONS: PKOptions = {
  types: ['city', 'county', 'administrative', 'country'],
  maxResults: 10,
};
```

### Predefined Parameters

```tsx
export const PREDEFINED_PARAMS: Pick<PKOptions, 'countries' | 'language'> = {
  countries: ['ad', 'ae', 'af', /* ... extensive country list ... */],
  language: 'en',
};
```

## Query Keys

Query keys are structured using the query-key-factory pattern:

```tsx
// From queryKeys.placekit
queryKeys.placekit.search(query, options)
```

The query keys include:
- Search query string
- Combined search options (custom + predefined)

## Usage Examples

### Basic Place Search

```tsx
import { usePlacekitSearch } from '@/lib/query-hooks/placekit';

function LocationSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: places, isLoading, error } = usePlacekitSearch(searchQuery, {
    maxResults: 5,
    types: ['city']
  });

  return (
    <div>
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for a location..."
      />
      
      {isLoading && <div>Searching...</div>}
      
      {places?.results.map((place) => (
        <div key={place.id}>
          {place.name}, {place.country}
        </div>
      ))}
    </div>
  );
}
```

### Custom Search Options

```tsx
function RestaurantLocationSearch() {
  const [query, setQuery] = useState('');
  
  const { data: locations } = usePlacekitSearch(query, {
    types: ['address', 'street'],
    maxResults: 15,
    // countries and language are predefined
  });

  return (
    <LocationPicker
      query={query}
      onQueryChange={setQuery}
      locations={locations?.results}
    />
  );
}
```

### Debounced Search with Loading States

```tsx
import { useDebouncedValue } from '@/hooks/use-debounced-value';

function DebouncedLocationSearch() {
  const [input, setInput] = useState('');
  const debouncedQuery = useDebouncedValue(input, 300);
  
  const {
    data: places,
    isLoading,
    isFetching,
    error
  } = usePlacekitSearch(debouncedQuery, {
    types: ['city', 'administrative']
  }, {
    enabled: debouncedQuery.length > 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type to search locations..."
      />
      
      {isFetching && <LoadingSpinner />}
      
      {error && (
        <div className="text-red-500">
          Search failed: {error.message}
        </div>
      )}
      
      <LocationResults places={places?.results} />
    </div>
  );
}
```

## Selector Support

Transform search results using selector functions:

### Extract Specific Data

```tsx
// Get only place names
const { data: placeNames } = usePlacekitSearch(query, {}, {
  select: (data) => data.results.map(place => place.name)
});

// Get formatted locations
const { data: formattedPlaces } = usePlacekitSearch(query, {}, {
  select: (data) => data.results.map(place => ({
    id: place.id,
    label: `${place.name}, ${place.administrative?.[0] || place.country}`,
    coordinates: place.coordinates,
    type: place.type
  }))
});
```

### Filter Results

```tsx
// Filter for specific place types
const { data: cities } = usePlacekitSearch(query, {}, {
  select: (data) => data.results.filter(place => place.type === 'city')
});

// Filter by country
const { data: usPlaces } = usePlacekitSearch(query, {}, {
  select: (data) => data.results.filter(place => place.countryCode === 'us')
});
```

## Caching Strategy

### Cache Configuration

```tsx
// Default caching behavior
const { data } = usePlacekitSearch(query, options, {
  staleTime: 5 * 60 * 1000,     // 5 minutes
  gcTime: 10 * 60 * 1000,       // 10 minutes
  refetchOnWindowFocus: false,   // Don't refetch on focus
});
```

### Cache Keys Structure

Each search is cached based on:
- Search query string
- Combined search options (custom + predefined parameters)

```tsx
// Different cache entries
usePlacekitSearch('paris', { types: ['city'] });           // Cache key 1
usePlacekitSearch('paris', { types: ['address'] });        // Cache key 2
usePlacekitSearch('london', { types: ['city'] });          // Cache key 3
```

## Error Handling

### Query Error Handling

```tsx
function LocationSearchWithErrorHandling() {
  const { data, error, isError, refetch } = usePlacekitSearch(query);

  if (isError) {
    return (
      <div className="error-container">
        <p>Failed to search locations: {error.message}</p>
        <button onClick={() => refetch()}>
          Retry Search
        </button>
      </div>
    );
  }

  return <LocationResults places={data?.results} />;
}
```

### Network Error Recovery

```tsx
const { data, error } = usePlacekitSearch(query, {}, {
  retry: (failureCount, error) => {
    // Retry up to 2 times for network errors
    if (failureCount < 2 && error.message.includes('network')) {
      return true;
    }
    return false;
  },
  retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
});
```

## Integration Examples

### Form Integration

```tsx
import { Controller } from 'react-hook-form';

function LocationFormField({ control, name }) {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: places } = usePlacekitSearch(searchQuery);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <LocationCombobox
          value={field.value}
          onValueChange={field.onChange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          options={places?.results}
        />
      )}
    />
  );
}
```

### Map Integration

```tsx
function LocationSearchMap() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [query, setQuery] = useState('');
  
  const { data: places } = usePlacekitSearch(query, {
    types: ['address', 'poi']
  });

  return (
    <div className="flex">
      <LocationSearchPanel
        query={query}
        onQueryChange={setQuery}
        places={places?.results}
        onPlaceSelect={setSelectedPlace}
      />
      
      <Map
        center={selectedPlace?.coordinates}
        markers={places?.results.map(place => ({
          id: place.id,
          position: place.coordinates,
          title: place.name
        }))}
      />
    </div>
  );
}
```

## Best Practices

### 1. Debounce Search Input

```tsx
// ✅ Good - Debounce to avoid excessive API calls
const debouncedQuery = useDebouncedValue(inputValue, 300);
const { data } = usePlacekitSearch(debouncedQuery);

// ❌ Bad - Triggers API call on every keystroke
const { data } = usePlacekitSearch(inputValue);
```

### 2. Enable Queries Conditionally

```tsx
// ✅ Good - Only search when query is meaningful
const { data } = usePlacekitSearch(query, {}, {
  enabled: query.length >= 3
});

// ❌ Bad - Searches even for empty/short queries
const { data } = usePlacekitSearch(query);
```

### 3. Use Appropriate Cache Times

```tsx
// ✅ Good - Cache location searches for reasonable time
const { data } = usePlacekitSearch(query, {}, {
  staleTime: 5 * 60 * 1000,  // 5 minutes - locations don't change frequently
  gcTime: 10 * 60 * 1000,    // 10 minutes
});
```

### 4. Handle Loading States

```tsx
// ✅ Good - Show loading indicators
function LocationSearch() {
  const { data, isLoading, isFetching } = usePlacekitSearch(query);
  
  return (
    <div>
      <SearchInput loading={isFetching} />
      {isLoading ? <SearchSkeleton /> : <LocationResults data={data} />}
    </div>
  );
}
```

### 5. Use Selectors for Data Transformation

```tsx
// ✅ Good - Transform data with selectors
const { data: formattedPlaces } = usePlacekitSearch(query, {}, {
  select: (data) => data.results.map(formatPlaceForDisplay)
});

// ❌ Bad - Transform in component (causes unnecessary re-renders)
const { data } = usePlacekitSearch(query);
const formattedPlaces = data?.results.map(formatPlaceForDisplay);
```

## Related Services

This hook integrates with:
- **PlaceKit Client**: `@placekit/client-js/lite` for API communication
- **Environment Config**: Uses `NEXT_PUBLIC_PLACEKIT_API_KEY` from environment
- **Query Keys**: Leverages centralized query key factory for consistent caching

The hook follows our TanStack Query patterns by keeping the query function simple and letting the service handle the API communication and error management.