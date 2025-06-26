# useLocationsAllResultsTable Hook

## Purpose

The `useLocationsAllResultsTable` hook provides table configuration and functionality for displaying location-based search results in an all-results view. It creates table columns with location data, country information, article counts, and filter actions (include/exclude). The hook integrates with PlaceKit for location search and provides components for displaying location entities with filtering capabilities.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive table state and row selection
- Handles user interactions (checkboxes, buttons)
- Uses React hooks for state management and callbacks
- Integrates with client-side stores (Zustand)

## Props Interface

### useLocationsAllResultsTable

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onRowSelectionChange` | `ResultsTableProps<EntityCount>['onRowSelectionChange']` | ✅ | Callback function to handle row selection changes in the table |
| `sourcesStats` | `EntityCount[]` | ❌ | Optional array of entity counts for displaying article statistics |

### CountryEIEntity (Internal Component)

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | ✅ | Location name to search and display |
| `onExclude` | `(location: LocationsFilter) => void` | ✅ | Callback when user excludes the location |
| `onInclude` | `(location: LocationsFilter) => void` | ✅ | Callback when user includes the location |

### CountryEntity (Internal Component)

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | ✅ | Location name to resolve and display country information |

## Usage Example

```tsx
import { useLocationsAllResultsTable } from '@/components/search/all-results/hooks/use-locations-all-results-table';
import { ResultsTable } from '@/components/ui/results-table';

function LocationsAllResultsTable() {
  const [rowSelection, setRowSelection] = useState({});
  const { data: sourcesStats } = useSourcesStats();
  
  const { columns } = useLocationsAllResultsTable(
    setRowSelection,
    sourcesStats
  );

  return (
    <ResultsTable
      columns={columns}
      data={locationData}
      rowSelection={rowSelection}
      onRowSelectionChange={setRowSelection}
    />
  );
}
```

## Functionality

### Core Features
- **Table Column Configuration**: Provides column definitions for location results table
- **Location Search Integration**: Uses PlaceKit API to resolve location names to structured data
- **Filter Management**: Handles include/exclude operations for location filters
- **Progress Visualization**: Shows article counts with progress bars relative to maximum values
- **Country Resolution**: Displays country information for location entities

### Column Structure
1. **Name Column**: Checkbox selection + avatar + location name
2. **Country Column**: Resolved country name with loading states
3. **Articles Column**: Progress bar and formatted count display
4. **Actions Column**: Include/exclude filter controls

## State Management

### Zustand Store Integration
- **useFiltersDrawerStore**: Manages filter state and application logic
  - Reads current filters for comparison operations
  - Updates filters when including/excluding locations

### TanStack Query
- **usePlacekitSearch**: Fetches location data from PlaceKit API
  - Transforms PlaceKit results to application-specific location filters
  - Provides loading states and error handling

### Local State
- **Row Selection**: Managed through props passed from parent component
- **Memoized Columns**: Uses `useMemo` for performance optimization

## Side Effects

### API Interactions
- **PlaceKit Search**: Makes API calls to resolve location names
- **Filter Updates**: Triggers filter state changes that may affect other components
- **Row Selection Reset**: Clears table selections when filters are applied

### Search Configuration
```tsx
export const PLACEKIT_OPTIONS: PKOptions = {
  types: ['city'],
  maxResults: 1,
};
```

## Dependencies

### UI Components
- `Avatar`, `Checkbox`, `ExcludeInclude`, `Progress`, `Skeleton`, `Typography`
- `ResultsTable` (for integration)

### Hooks & Services
- `usePlacekitSearch` - Location search functionality
- `useFiltersDrawerStore` - Filter state management

### Utilities
- `placekitResultToLocationsFilter` - Data transformation
- `nFormatter` - Number formatting
- `lodash.isequal` - Deep equality comparison

### External Libraries
- `@placekit/client-js/lite` - Location search API
- `@tanstack/react-table` - Table functionality

## Integration

### Search Results Architecture
The hook integrates with the broader search results system:
- **All Results View**: Part of the comprehensive search results display
- **Filter System**: Connects to global filter state management
- **Location Services**: Leverages PlaceKit for location resolution

### Data Flow
1. Location names from search results
2. PlaceKit API resolution to structured location data
3. Filter state updates through Zustand store
4. Table re-rendering with updated selection state

## Best Practices

### Architecture Adherence
- ✅ **Component Decomposition**: Separates concerns with focused sub-components
- ✅ **State Management**: Uses TanStack Query for server state, Zustand for client state
- ✅ **Reusability**: Leverages UI components from `/ui/` directory
- ✅ **Performance**: Implements memoization for expensive operations

### Location Data Handling
- Uses consistent data transformation patterns
- Implements proper loading states for async operations
- Handles edge cases (missing data, API failures)

### Filter Integration
- Maintains filter state consistency
- Prevents duplicate filter entries
- Provides immediate UI feedback for filter changes

The hook exemplifies proper separation of concerns by encapsulating table logic while maintaining clean integration with the application's filter and search systems.