# ExcludedLocationItem Component

## Purpose
The `ExcludedLocationItem` component renders a specific location filter item within the excluded filters list. It displays location information (name, country code) with an avatar icon and handles the removal of excluded location filters from the active filter set. This component is specialized for location-type filters and conditionally renders based on the location filter type.

## Component Type
**Client Component** - This component uses event handlers (`onClick`) for user interactions and is part of an interactive filter management system that requires client-side state updates.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value` | `LocationsFilter` | Yes | The location filter object containing location data (name, country, type) |
| `onClick` | `() => void` | Yes | Callback function executed when the user clicks to remove this location filter |

## Usage Example

```tsx
import { ExcludedLocationItem } from '@/components/filters/filters-drawer/excluded-location-item';
import { LocationsFilter, LocationsFilterType } from '@/lib/types';

// Within a filters drawer or excluded filters list
const ExcludedFiltersList = () => {
  const [excludedFilters, setExcludedFilters] = useState<LocationsFilter[]>([
    {
      id: 'loc_1',
      name: 'New York',
      type: LocationsFilterType.CITY,
      country: { code: 'US', name: 'United States' }
    }
  ]);

  const handleRemoveLocation = (locationId: string) => {
    setExcludedFilters(prev => 
      prev.filter(filter => filter.id !== locationId)
    );
  };

  return (
    <div className="excluded-filters-list">
      {excludedFilters.map((locationFilter) => (
        <ExcludedLocationItem
          key={locationFilter.id}
          value={locationFilter}
          onClick={() => handleRemoveLocation(locationFilter.id)}
        />
      ))}
    </div>
  );
};
```

## Functionality
- **Conditional Rendering**: Only renders if the location filter type is not `COUNTRY`
- **Avatar Display**: Shows a generated avatar based on the location name
- **Location Information**: Displays location name as title and country code as subtitle
- **Click Handling**: Executes the provided onClick callback for filter removal
- **Fallback Content**: Returns empty fragment when conditions aren't met

## State Management
- **No Internal State**: This is a pure presentation component that receives all data via props
- **Parent State**: Relies on parent components to manage the excluded filters state
- **Event Delegation**: Uses callback props to communicate state changes upward

## Side Effects
- **No Direct Side Effects**: The component itself doesn't perform API calls or external operations
- **Indirect Effects**: The `onClick` callback may trigger state updates in parent components that could result in API calls or filter re-application

## Dependencies

### Internal Dependencies
- `@/components/ui/avatar` - Avatar component for displaying location icons
- `@/lib/types` - Type definitions for `LocationsFilter` and `LocationsFilterType`
- `./excluded-filter-item-base` - Base component that provides the consistent layout and styling

### External Dependencies
- `react` - Core React library for component functionality

## Integration

### Parent Components
- **FiltersDrawer**: Main container for all filter management interfaces
- **ExcludedFiltersList**: Collection component that manages multiple excluded filter items

### Data Flow
```
FiltersDrawer (filter state management)
    ↓ excludedLocationFilters, removeLocationFilter
ExcludedFiltersList (filter iteration)
    ↓ locationFilter, onRemove
ExcludedLocationItem (display & interaction)
    ↓ avatar, title, subtitle, onClick
ExcludedFilterListItemBase (base layout)
```

### Filter System Integration
- Part of the broader filter management system
- Specifically handles location-type filters (cities, regions, etc.)
- Excludes country-level filters (handled by different components)
- Integrates with search/filtering APIs through parent state management

## Best Practices

### Architecture Adherence
- ✅ **Flat Component Structure**: Uses composition with `ExcludedFilterListItemBase` rather than deep nesting
- ✅ **Single Responsibility**: Focused solely on location filter item presentation
- ✅ **Prop Interface**: Clean, minimal props interface with clear types
- ✅ **Conditional Rendering**: Handles edge cases gracefully with conditional rendering

### Performance Considerations
- **Pure Component**: Can be optimized with `React.memo` if needed due to pure prop dependencies
- **Minimal Re-renders**: Only re-renders when `value` or `onClick` props change

### Reusability Patterns
- **Domain-Specific**: Specialized for location filters but follows consistent patterns
- **Composition**: Leverages base component for consistent styling and behavior
- **Type Safety**: Strongly typed props prevent runtime errors

### Error Handling
- **Graceful Degradation**: Handles missing or invalid location data with fallback empty strings
- **Type Guards**: Conditional rendering prevents errors when location type doesn't match expectations