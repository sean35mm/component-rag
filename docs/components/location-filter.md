# LocationFilter Component

## Purpose

The `LocationFilter` component provides an interactive accordion-style filter for selecting geographic locations. It combines predefined default locations with real-time search functionality using PlaceKit API, allowing users to filter content by specific cities, counties, or countries. The component displays location selections with proper formatting (City, State, Country) and maintains active filter state.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Interactive state management (search input, selected locations)
- Event handlers for user interactions
- Real-time search with debouncing
- Dynamic UI updates based on user input

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `active` | `LocationsFilter[]` | Yes | Array of currently selected location filters |
| `onActiveChange` | `(items: LocationsFilter[]) => void` | Yes | Callback function called when the selection changes, receives updated array of selected locations |

## Usage Example

```tsx
import { LocationFilter } from '@/components/filters/filters-drawer/location-filter';
import { LocationsFilter } from '@/lib/types';

function FiltersPanel() {
  const [selectedLocations, setSelectedLocations] = useState<LocationsFilter[]>([]);

  return (
    <div className="filters-panel">
      <LocationFilter
        active={selectedLocations}
        onActiveChange={setSelectedLocations}
      />
      
      {/* Other filters */}
    </div>
  );
}

// Example with pre-selected locations
function PrefilledLocationFilter() {
  const [locations, setLocations] = useState<LocationsFilter[]>([
    {
      type: LocationsFilterType.US_CITY,
      name: 'Austin',
      state: { name: 'Texas', code: 'TX' },
      country: { name: 'United States of America', code: 'us' },
    }
  ]);

  return (
    <LocationFilter
      active={locations}
      onActiveChange={setLocations}
    />
  );
}
```

## Functionality

### Core Features
- **Default Locations**: Provides 6 predefined popular locations (Austin, Denver, Melbourne, Miami, Chicago, Tokyo)
- **Real-time Search**: Debounced search input (500ms) for finding locations via PlaceKit API
- **Smart Location Display**: Formats location names with appropriate state/country information
- **Duplicate Prevention**: Prevents duplicate selections using deep equality comparison
- **Dynamic Item Management**: Shows search results when available, otherwise displays active + default locations
- **Selection Counter**: Displays count of active selections in the accordion header

### Location Formatting Logic
- **US Cities/Counties**: Shows "City, STATE_CODE, United States" format
- **International Cities**: Shows "City, Country Name" format  
- **State Handling**: Uses state code when available, falls back to full state name
- **Country Handling**: Special case for US locations, shows "United States" instead of full official name

## State Management

### Local State
- **Search State**: `useState` for immediate search input value
- **Debounced Search**: `useDebounceValue` hook for API call optimization
- **External State**: Receives active selections via props, delegates state management to parent

### TanStack Query Integration
- **PlaceKit Search**: Uses `usePlacekitSearch` hook for location search API calls
- **Data Transformation**: Converts PlaceKit results to internal `LocationsFilter` format
- **Conditional Fetching**: Only queries API when search term exists
- **Placeholder Data**: Maintains previous results during new searches

## Side Effects

### API Interactions
- **Location Search**: Real-time search against PlaceKit API service
- **Debounced Requests**: Prevents excessive API calls during typing
- **Result Transformation**: Converts external API format to internal types

### User Interactions
- **Selection Changes**: Triggers `onActiveChange` callback with updated selections
- **Search Input**: Updates both immediate and debounced search values
- **Checkbox Interactions**: Adds/removes locations from active selection

## Dependencies

### UI Components
- `FiltersDrawerAccordionList`: Main accordion container component
- `PiMapPin2Line`: Map pin icon from icons library

### Hooks & Utilities
- `usePlacekitSearch`: Custom hook for PlaceKit API integration
- `useDebounceValue`: Debouncing hook from usehooks-ts
- `placekitResultToLocationsFilter`: Utility for data transformation
- `isEqual`: Lodash utility for deep equality comparison

### Types & Constants
- `LocationsFilter`, `LocationsFilterType`: Type definitions
- `PLACEKIT_OPTIONS`: Configuration for PlaceKit API calls
- `DEFAULT_LOCATIONS`: Predefined location options

## Integration

### Filter System Architecture
- **Parent-Controlled State**: Integrates with larger filter management system
- **Drawer Component**: Part of filters drawer UI pattern
- **Search Integration**: Connects to external location search service
- **Type Safety**: Uses shared type definitions across filter system

### Data Flow
1. Parent component manages overall filter state
2. LocationFilter receives current selections via props
3. User interactions update local search state
4. API calls fetch location data based on search
5. Selection changes bubble up to parent via callback
6. Parent updates global filter state

## Best Practices

### Architecture Adherence
- ✅ **Controlled Component**: Follows controlled component pattern with external state management
- ✅ **Single Responsibility**: Focuses solely on location filtering functionality
- ✅ **Composition**: Uses UI components as building blocks rather than deep nesting
- ✅ **Type Safety**: Comprehensive TypeScript integration with proper interfaces

### Performance Optimizations
- ✅ **Debounced Search**: Prevents excessive API calls during user input
- ✅ **Memoized Computations**: Uses `useMemo` for expensive item list transformations
- ✅ **Callback Optimization**: Uses `useCallback` to prevent unnecessary re-renders
- ✅ **Conditional API Calls**: Only fetches data when search term exists

### Code Organization
- ✅ **Exported Constants**: Makes `DEFAULT_LOCATIONS` available for reuse
- ✅ **Clear Separation**: Separates data transformation, UI logic, and state management
- ✅ **Consistent Naming**: Follows established naming conventions for props and handlers