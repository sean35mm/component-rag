# SourceLocationFilter Component

## Purpose

The `SourceLocationFilter` component provides an interactive location-based filtering interface for content based on source headquarters. It features real-time search with external geocoding API integration, predefined location suggestions, and intelligent display formatting for different location types (US cities, states, countries, etc.).

## Component Type

**Client Component** - Uses the `'use client'` directive (implied by hooks usage) because it requires:
- Interactive state management with `useState`
- Real-time search debouncing with `useDebounceValue`
- User input handling and form interactions
- Dynamic API calls based on user input

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `active` | `SourceLocationsFilter[]` | Yes | Array of currently selected location filters |
| `onActiveChange` | `(items: SourceLocationsFilter[]) => void` | Yes | Callback function called when the selection changes |

## Usage Example

```tsx
import { useState } from 'react';
import { SourceLocationFilter, DEFAULT_LOCATIONS } from '@/components/filters/filters-drawer/source-location-filter';
import { SourceLocationsFilter } from '@/lib/types';

function ContentFilters() {
  const [selectedLocations, setSelectedLocations] = useState<SourceLocationsFilter[]>([
    DEFAULT_LOCATIONS[0] // Pre-select Austin
  ]);

  const handleLocationChange = (locations: SourceLocationsFilter[]) => {
    setSelectedLocations(locations);
    // Apply filters to content query
    applyContentFilters({ sourceLocations: locations });
  };

  return (
    <div className="filters-panel">
      <SourceLocationFilter
        active={selectedLocations}
        onActiveChange={handleLocationChange}
      />
    </div>
  );
}

// Using the default locations constant
import { DEFAULT_LOCATIONS } from '@/components/filters/filters-drawer/source-location-filter';

function getPopularLocations() {
  return DEFAULT_LOCATIONS; // Austin, Denver, Australia, Florida, Tokyo
}
```

## Functionality

### Core Features

- **Real-time Search**: Debounced search input with 500ms delay for location lookup
- **Default Suggestions**: Predefined list of popular locations when no search is active
- **Smart Display Formatting**: Contextual location titles (e.g., "Austin, TX, United States")
- **Selection Management**: Add/remove locations with visual selection state
- **External Integration**: PlaceKit API integration for comprehensive location data
- **Deduplication**: Prevents duplicate selections using deep equality comparison

### Location Type Handling

The component intelligently formats location displays based on type:
- **US Cities/Counties**: Include state code/name (e.g., "Austin, TX")
- **Countries**: Display country name only
- **International Cities**: Include country name (e.g., "Tokyo, Japan")
- **US Locations**: Shortened "United States" instead of "United States of America"

## State Management

### Local State
- `search`: Current search input value
- `debouncedSearch`: Debounced search value for API calls

### External State
- **TanStack Query**: Manages PlaceKit API calls with caching and error handling
- **Parent State**: Location selections managed by parent component through props

### Query Configuration
```tsx
const { data: locations } = usePlacekitSearch(
  debouncedSearch,
  PLACEKIT_OPTIONS,
  {
    select: (res) => res.results.map(placekitResultToLocationsFilter),
    placeholderData: (it) => (debouncedSearch.length > 0 ? it : undefined),
    enabled: debouncedSearch.length > 0,
  }
);
```

## Side Effects

### API Interactions
- **PlaceKit Geocoding API**: Real-time location search and suggestions
- **Debounced Requests**: Reduces API calls during rapid typing
- **Conditional Fetching**: Only queries when search term exists

### Performance Optimizations
- **Memoized Computations**: Location list and display formatting via `useMemo`
- **Callback Optimization**: Stable event handlers using `useCallback`
- **Query Caching**: TanStack Query automatic caching and background updates

## Dependencies

### External Libraries
- `lodash.isequal`: Deep equality comparison for location objects
- `usehooks-ts`: Debounced value hook for search optimization

### Internal Dependencies
- `@/components/icons/PiBuildingLine`: Building icon for visual identification
- `@/components/ui/filters-drawer/FiltersDrawerAccordionList`: Base accordion UI component
- `@/lib/query-hooks/usePlacekitSearch`: PlaceKit API integration hook
- `@/lib/types`: Location filter type definitions
- `@/lib/utils/placekit-result-to-location`: Data transformation utilities

## Integration

### Application Architecture
```
FiltersDrawer
├── SourceLocationFilter (this component)
├── Other filter components
└── Filter state management

Content Query System
├── Applied filters including locations
├── TanStack Query for content fetching
└── Results display with location-based filtering
```

### Data Flow
1. User types in search → debounced API call → location suggestions
2. User selects location → parent state update → content filters applied
3. Selected locations → query parameters → filtered content results

## Best Practices

### Architecture Adherence
- ✅ **Proper Component Type**: Client component for interactive features
- ✅ **Flat Structure**: Single-purpose component without deep nesting
- ✅ **TanStack Query**: Server state management for API calls
- ✅ **Performance**: Memoization and debouncing for optimal UX

### Code Quality
- ✅ **TypeScript**: Full type safety with proper interfaces
- ✅ **Separation of Concerns**: UI logic separate from data transformation
- ✅ **Reusability**: Generic location filter usable across different contexts
- ✅ **Error Handling**: Graceful fallbacks and null checks

### Integration Patterns
- ✅ **Controlled Component**: State managed by parent for flexibility
- ✅ **Default Exports**: Both component and constants for easy consumption
- ✅ **Consistent API**: Follows established filter component patterns