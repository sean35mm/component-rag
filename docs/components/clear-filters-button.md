# ClearFiltersButton Component

## Purpose

The `ClearFiltersButton` component provides a user interface element that allows users to reset all applied filters to their default state in the signals creation flow. It conditionally renders based on whether filters have been applied and handles the complete clearing of filter state across multiple stores.

## Component Type

**Client Component** - Uses the `'use client'` directive (implicitly through hooks) because it:
- Manages interactive state with multiple Zustand stores
- Handles user click events
- Performs conditional rendering based on dynamic state
- Uses callback and memo hooks for performance optimization

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| No props | - | - | This component accepts no props and manages its own state internally |

## Usage Example

```tsx
import { ClearFiltersButton } from '@/components/signals/creation/custom-filters/clear-filters-button';

// Basic usage within a filters interface
function FiltersPanel() {
  return (
    <div className="filters-panel">
      <div className="filters-header">
        <h3>Active Filters</h3>
        <ClearFiltersButton />
      </div>
      {/* Other filter components */}
    </div>
  );
}

// Usage in a signals creation workflow
function SignalCreationForm() {
  return (
    <div className="signal-creation">
      <FiltersList />
      <div className="filter-actions">
        <SaveFiltersButton />
        <ClearFiltersButton />
      </div>
      <ApplyFiltersButton />
    </div>
  );
}
```

## Functionality

### Core Features
- **Conditional Rendering**: Only displays when filters differ from default state
- **Complete Filter Reset**: Clears all applied filters and resets to defaults
- **State Synchronization**: Updates multiple store states simultaneously
- **Performance Optimized**: Uses memoization to prevent unnecessary re-renders

### Key Behaviors
- Compares current filters with `DEFAULT_FILTERS` using deep equality
- Resets applied filter names and selected saved filter IDs
- Triggers filter application with default values
- Automatically hides when no filters are applied

## State Management

### Zustand Stores Used

**useFiltersDrawerStore**:
- `filters` - Current filter state for comparison
- `onFiltersApply()` - Function to apply new filter state
- `setSelectedSavedFilterId()` - Resets saved filter selection

**useCreateSignalStore**:
- `setAppliedFiltersName()` - Clears applied filter name

### State Flow
```
User Click → handleClearFilters() → [
  onFiltersApply(DEFAULT_FILTERS),
  setAppliedFiltersName(null),
  setSelectedSavedFilterId(undefined)
] → Component Re-renders → Hides (no filters applied)
```

## Side Effects

- **Store Updates**: Modifies state in two different Zustand stores
- **Filter Application**: Triggers filter application logic that may affect other components
- **UI State Changes**: May cause dependent components to re-render based on filter state

## Dependencies

### External Libraries
- `lodash.isequal` - Deep equality comparison for filter objects
- `react` - Core hooks (useCallback, useMemo)

### Internal Dependencies
- `@/components/ui/button` - Base button component
- `@/lib/contexts` - Zustand store hooks
- `@/lib/stores` - Default filter constants

### Store Dependencies
- Requires both `useFiltersDrawerStore` and `useCreateSignalStore` to be available in the component tree

## Integration

### Application Architecture Role
- **Signals Creation Flow**: Part of the custom filters interface in signal creation
- **Filter Management**: Coordinates with other filter-related components
- **State Coordination**: Bridges multiple store states for consistent filter management

### Related Components
- Works alongside `SaveFiltersButton`, `ApplyFiltersButton`
- Integrates with filter list and drawer components
- Affects any components that consume filter state

## Best Practices

### Architecture Adherence
✅ **Component Decomposition**: Single responsibility - only handles clearing filters  
✅ **State Management**: Properly uses Zustand for client state management  
✅ **Performance**: Implements memoization with `useMemo` and `useCallback`  
✅ **Conditional Rendering**: Returns `null` when not needed rather than hiding with CSS  

### Implementation Patterns
- **Memoized Computations**: `isFiltersApplied` prevents unnecessary re-calculations
- **Callback Optimization**: `handleClearFilters` prevents function recreation
- **Deep Equality**: Uses `lodash.isequal` for reliable filter comparison
- **Clean State Management**: Coordinates multiple store updates in a single action

### Usage Recommendations
- Place within filter management interfaces
- Combine with other filter action buttons
- Ensure required stores are available in component tree
- Consider loading states if filter operations are async