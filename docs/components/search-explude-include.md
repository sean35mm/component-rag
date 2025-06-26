# SearchExcludeInclude Component Documentation

## Purpose

The `SearchExcludeInclude` component provides filtering actions that allow users to include or exclude search entities from their active filters. It renders conditional buttons for excluding/including items based on their current filter state, with support for both generic entities and location-specific filtering through the `SearchExcludeIncludeLocations` variant.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive state through multiple Zustand stores
- Handles user click events and callbacks
- Provides real-time feedback through toast notifications
- Requires client-side state synchronization across filter and entity stores

## Props Interface

### SearchExcludeInclude

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value` | `string` | ✅ | The value to be included/excluded from filters |
| `filterKey` | `keyof FiltersState` | ❌ | The specific filter key to modify in the filters state |
| `onlyInclude` | `boolean` | ❌ | When true, only shows the include button (hides exclude) |
| `entity` | `SearchEntityItem` | ❌ | Entity object for entity-based filtering operations |
| `excludeLabel` | `string` | ❌ | Custom label for the exclude button (defaults to "Exclude") |
| `includeLabel` | `string` | ❌ | Custom label for the include button (defaults to "Add as filter") |
| `excludeType` | `ExcludedFilterItemType` | ✅ | Type classification for exclusion (Source, Company, People, etc.) |

### SearchExcludeIncludeLocations

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value` | `LocationsFilter` | ✅ | Location filter object containing name and type |
| `filterKey` | `keyof FiltersState` | ✅ | The specific filter key to modify in the filters state |
| `onlyInclude` | `boolean` | ❌ | When true, only shows the include button (hides exclude) |
| `excludeType` | `ExcludedFilterItemType.Location` | ✅ | Must be the Location type for location filtering |

## Usage Example

```tsx
import { SearchExcludeInclude, SearchExcludeIncludeLocations } from '@/components/search/search-explude-include';

// Basic entity filtering
function EntityCard({ entity }) {
  return (
    <div className="p-4 border rounded">
      <h3>{entity.name}</h3>
      <SearchExcludeInclude
        value={entity.name}
        entity={entity}
        excludeType={ExcludedFilterItemType.Company}
        excludeLabel="Remove Company"
        includeLabel="Add Company Filter"
      />
    </div>
  );
}

// Location-specific filtering
function LocationSelector({ location }) {
  return (
    <div className="flex items-center justify-between p-2">
      <span>{location.name}</span>
      <SearchExcludeIncludeLocations
        value={location}
        filterKey="locations"
        excludeType={ExcludedFilterItemType.Location}
        onlyInclude={false}
      />
    </div>
  );
}

// Filter-only mode (no exclude option)
function SearchSuggestion({ suggestion }) {
  return (
    <SearchExcludeInclude
      value={suggestion.term}
      filterKey="keywords"
      excludeType={ExcludedFilterItemType.Topic}
      onlyInclude={true}
    />
  );
}
```

## Functionality

### Core Features
- **Conditional Button Rendering**: Shows include/exclude buttons based on current filter state
- **Dual Filtering Modes**: Supports both entity-based and filter-key-based operations
- **State Synchronization**: Updates multiple stores (filters, entities, drawer state) atomically
- **Toast Feedback**: Provides user feedback with undo functionality for all filter changes
- **Location Specialization**: Dedicated component for complex location filter objects

### Button Logic
- **Exclude Button**: Hidden when item is already excluded or `onlyInclude` is true
- **Include Button**: Hidden when item is already included in active filters
- **State Detection**: Automatically detects inclusion/exclusion status from store state

## State Management

### Zustand Stores Integration
- **`useFiltersDrawerStore`**: Manages filter state and applies filter changes
- **`useExploreStore`**: Handles entity addition/removal for entity-based filtering
- **`useEntityDetailDrawerStore`**: Controls drawer visibility after filter operations

### State Flow
1. User clicks include/exclude button
2. Component updates relevant Zustand stores
3. Toast notification provides immediate feedback with undo option
4. Entity detail drawer closes automatically
5. Filter changes propagate to dependent components

## Side Effects

- **Filter Application**: Triggers filter state updates that affect search results
- **Entity Management**: Adds/removes entities from the exploration store
- **UI State Changes**: Closes entity detail drawer after operations
- **Toast Notifications**: Shows success messages with undo functionality
- **Store Synchronization**: Coordinates updates across multiple global stores

## Dependencies

### UI Components
- `Button` - Core button component with variant support
- `LinkButton` - Button variant for toast undo actions
- `useToast` - Toast notification hook

### Icons
- `PiFilterLine` - Include/filter icon
- `PiForbidLine` - Exclude/forbid icon

### Store Hooks
- `useFiltersDrawerStore` - Filter state management
- `useExploreStore` - Entity exploration state
- `useEntityDetailDrawerStore` - Drawer visibility control

### Types
- `FiltersState` - Filter configuration interface
- `SearchEntityItem` - Entity object structure
- `LocationsFilter` - Location-specific filter type
- `ExcludedFilterItemType` - Enumeration for filter types

## Integration

### Search Architecture Role
- **Filter Interface**: Primary mechanism for applying include/exclude filters from search results
- **Entity Management**: Bridges search entities with the exploration and filtering systems
- **User Experience**: Provides consistent filtering UI across different search contexts

### Store Coordination
- Synchronizes filter changes across multiple Zustand stores
- Maintains consistency between entity state and filter state
- Handles complex filter operations with proper state cleanup

### Toast Integration
- Provides immediate user feedback for all filter operations
- Includes undo functionality that restores previous filter state
- Maintains user confidence through clear action confirmation

## Best Practices

### Component Architecture Adherence
- ✅ **Client Component**: Appropriately uses client-side rendering for interactive functionality
- ✅ **Single Responsibility**: Focused on filter include/exclude operations
- ✅ **Prop Interface**: Clear, typed props with appropriate required/optional distinctions
- ✅ **State Management**: Proper use of Zustand for client state coordination

### Implementation Patterns
- **Memoized State Checks**: Uses `useMemo` for efficient state derivation
- **Callback Optimization**: Implements `useCallback` for stable event handlers
- **Type Safety**: Comprehensive TypeScript integration with proper type constraints
- **Conditional Rendering**: Logical button visibility based on current state
- **Store Coordination**: Atomic updates across multiple stores for consistency

### User Experience
- **Immediate Feedback**: Toast notifications confirm all filter changes
- **Undo Functionality**: Users can reverse filter operations
- **State Awareness**: Buttons intelligently hide when actions aren't applicable
- **Consistent Labeling**: Customizable button labels with sensible defaults