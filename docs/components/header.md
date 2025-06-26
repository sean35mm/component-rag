# Header Component Documentation

## Purpose

The `Header` component serves as the top section of the saved filter drawer in the search customization interface. It displays the current filter name and provides access to filter management options through an integrated options menu. This component acts as the primary navigation and identification element within the saved filter drawer workflow.

## Component Type

**Client Component** - Uses the `'use client'` directive because it consumes Zustand store state (`useSavedFiltersStore`) which requires client-side reactivity to respond to state changes in real-time.

## Props Interface

| Prop Name | Type | Required | Description |
|-----------|------|----------|-------------|
| N/A | N/A | N/A | This component accepts no props |

## Usage Example

```tsx
import { Header } from '@/components/settings/search-customization/saved-filter-drawer/header';

// Used within the saved filter drawer
function SavedFilterDrawer() {
  return (
    <div className="drawer">
      <Header />
      {/* Other drawer content */}
    </div>
  );
}

// The header automatically displays the current filter name from the store
// and provides options menu functionality
```

## Functionality

- **Dynamic Title Display**: Shows the current filter name from the Zustand store, defaulting to "New Filter" when no name is set
- **Visual Hierarchy**: Provides clear visual separation with border and background styling
- **Options Access**: Integrates an options menu for filter management actions
- **Responsive Layout**: Uses flexbox for proper alignment and spacing across different screen sizes

## State Management

**Zustand Store Integration**:
- Consumes `useSavedFiltersStore` to access the current `filterName` state
- Reactively updates the displayed title when the filter name changes
- No local state management - relies entirely on the global store for data

```tsx
const filterName = useSavedFiltersStore((state) => state.filterName);
```

## Side Effects

- **None** - This component is purely reactive to store state changes and doesn't trigger any side effects, API calls, or external interactions

## Dependencies

### Internal Dependencies
- `@/components/ui/typography` - For consistent text styling and typography hierarchy
- `@/lib/contexts` - Provides access to the `useSavedFiltersStore` Zustand store
- `./options-menu` - Child component for filter management options

### External Dependencies
- `react` - Core React functionality for component creation

## Integration

The Header component integrates into the larger application architecture as follows:

- **Parent Context**: Rendered within the saved filter drawer as the top-level header section
- **Store Integration**: Connects to the global saved filters state management system
- **UI Consistency**: Uses the design system's Typography component for consistent styling
- **Feature Boundary**: Part of the search customization domain, specifically the saved filter management workflow

## Best Practices

✅ **Architectural Compliance**:
- **Appropriate Client Component**: Correctly uses client-side rendering for reactive store consumption
- **Flat Component Structure**: Simple, single-purpose component without unnecessary nesting
- **Zustand for Client State**: Properly leverages Zustand for client-side filter state management
- **Domain Organization**: Located within the appropriate feature domain (`settings/search-customization`)

✅ **Implementation Patterns**:
- **Single Responsibility**: Focused solely on header display and options access
- **Declarative Rendering**: Uses conditional rendering with fallback values
- **Design System Usage**: Leverages shared Typography component for consistency
- **Clean Dependencies**: Minimal, focused imports with clear separation of concerns

✅ **State Management**:
- **Store Selector Optimization**: Uses specific state selector to minimize re-renders
- **No Prop Drilling**: Avoids unnecessary prop passing by connecting directly to the store
- **Predictable Updates**: Reactive to store changes without manual state synchronization