# TriggerButton Component

## Purpose

The `TriggerButton` component provides a button interface to open the signal filters drawer. It displays the current filter count and visual indication when filters are applied, allowing users to access and modify signal filtering options.

## Component Type

**Client Component** - Uses the `'use client'` directive (implied by hooks usage) because it:
- Manages interactive state through Zustand store
- Handles click events and user interactions
- Uses `useCallback` and `useMemo` hooks for performance optimization
- Requires client-side reactivity for filter state changes

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| None | - | - | This component accepts no props and manages its state internally |

## Usage Example

```tsx
import { TriggerButton } from '@/components/signals/details/edit-filters/trigger-button';

// Basic usage in a signal management interface
function SignalFiltersPanel() {
  return (
    <div className="flex items-center gap-4">
      <h2>Signal Management</h2>
      <TriggerButton />
    </div>
  );
}

// Usage in a toolbar or header
function SignalToolbar() {
  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex gap-2">
        <TriggerButton />
        {/* Other toolbar buttons */}
      </div>
    </div>
  );
}
```

## Functionality

### Core Features
- **Filter Drawer Trigger**: Opens the filters drawer when clicked
- **Visual Filter Indicator**: Shows a counter badge when filters are applied
- **Filter State Detection**: Determines if current filters differ from defaults
- **Accessible Interface**: Provides clear labeling and focus management

### Key Behaviors
- Displays filter count only when filters are applied and counter > 0
- Uses rounded badge styling for the filter counter
- Maintains consistent button styling with neutralStroke variant
- Provides visual feedback for active filter state

## State Management

### Zustand Store Integration
- **Store**: `useFiltersDrawerStore`
- **State Access**: 
  - `filters` - Current filter configuration
  - `onIsOpenChange` - Function to control drawer visibility
- **State Updates**: Triggers drawer opening through store action

### Computed State
- **Counter**: Memoized calculation of applied filters using `filtersToCounter`
- **Applied Status**: Memoized comparison against `DEFAULT_FILTERS` using deep equality

## Side Effects

### User Interactions
- **Click Handler**: Opens the filters drawer by setting `isOpen` to `true`
- **Drawer State**: Modifies global drawer visibility state

### Performance Optimizations
- **Memoized Callbacks**: `handleSignalFiltersClick` prevents unnecessary re-renders
- **Memoized Calculations**: Filter counter and applied status calculations are cached

## Dependencies

### Internal Dependencies
- **UI Components**: `Button` from `@/components/ui/button`
- **Icons**: `PiFilter3Line` from `@/components/icons`
- **Store**: `useFiltersDrawerStore` from `@/lib/contexts`
- **Constants**: `DEFAULT_FILTERS` from `@/lib/stores`
- **Utils**: `filtersToCounter` from `@/lib/utils/filters-to-counter`

### External Dependencies
- **lodash.isequal**: Deep equality comparison for filter objects
- **React**: Hooks for state management and performance optimization

## Integration

### Application Architecture
- **Domain**: Part of the signals management feature area
- **Location**: Nested within signal details and edit-filters components
- **Role**: UI trigger for filter management functionality

### Data Flow
1. Reads current filter state from Zustand store
2. Calculates display properties (counter, applied status)
3. Triggers drawer state changes through store actions
4. Integrates with broader signal filtering system

## Best Practices

### Architecture Adherence
- ✅ **Component Decomposition**: Single responsibility for filter drawer triggering
- ✅ **State Management**: Proper Zustand usage for client state
- ✅ **Performance**: Appropriate memoization for expensive calculations
- ✅ **Reusability**: Self-contained with no external prop dependencies

### Code Quality
- **Deep Equality**: Uses `lodash.isequal` for reliable object comparison
- **Type Safety**: Leverages TypeScript for store and utility functions
- **Accessibility**: Provides clear labeling and focus management
- **Styling**: Consistent with design system through utility classes

### Integration Patterns
- **Store Integration**: Clean separation of state access and mutations
- **Event Handling**: Memoized callbacks for performance
- **Conditional Rendering**: Clear logic for badge display
- **Utility Usage**: Delegates filter counting to dedicated utility function