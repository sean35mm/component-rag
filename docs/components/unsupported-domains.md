# UnsupportedDomains Component

## Purpose

The `UnsupportedDomains` component displays a notification bar for domains that are not supported in the source group creation process. It provides visual feedback to users about unsupported domains and offers a "Select all" action to easily select all unsupported domains for potential removal or handling.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive state through Zustand store
- Handles user interactions (button clicks)
- Uses React hooks (`useCallback`, `useMemo`) for state-dependent logic
- Requires client-side event handling for the selection functionality

## Props Interface

This component accepts no props - it's a self-contained component that manages its own state through the Zustand store.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | This component accepts no props |

## Usage Example

```tsx
import { UnsupportedDomains } from '@/components/settings/search-customization/source-group-drawer/unsupported-domains';

// Used within a source group drawer/modal
function SourceGroupDrawer() {
  return (
    <div className="drawer-content">
      {/* Other drawer content */}
      
      {/* Conditionally renders only when unsupported domains exist */}
      <UnsupportedDomains />
      
      {/* Domain selection table */}
      <DomainSelectionTable />
    </div>
  );
}
```

## Functionality

### Core Features

1. **Conditional Rendering**: Only displays when unsupported domains exist
2. **Domain Count Display**: Shows the count of unsupported domains with proper pluralization
3. **Visual Warning**: Uses warning icon and styling to indicate issues
4. **Batch Selection**: Provides "Select all" functionality for unsupported domains
5. **Dynamic Text**: Adjusts text based on singular/plural domain count

### Key Behaviors

- Automatically filters unsupported domains from the source group data
- Updates selection state when "Select all" is clicked
- Maintains existing selections while adding new ones
- Provides clear visual indication of the issue state

## State Management

**Zustand Store Integration** - Uses `useSourceGroupsDrawerStore` for:

```tsx
// Store selectors used
const createSourceGroupData = useSourceGroupsDrawerStore(
  (state) => state.createSourceGroupData  // Source domain data
);
const setRowSelectionState = useSourceGroupsDrawerStore(
  (state) => state.setRowSelectionState   // Selection state updater
);
const rowSelectionState = useSourceGroupsDrawerStore(
  (state) => state.rowSelectionState      // Current selection state
);
```

**Local State Optimization**:
- `useMemo` for filtering unsupported domains
- `useCallback` for optimized selection handler

## Side Effects

### State Updates
- **Selection State Modification**: Updates the global row selection state when "Select all" is clicked
- **Store Mutations**: Merges new selections with existing ones without overriding

### No External API Calls
- Operates purely on existing store data
- No network requests or external service interactions

## Dependencies

### Internal Components
- `PiErrorWarningLine` - Warning icon from icon library
- `Button` - UI button component
- `Typography` - Text display component

### Store Dependencies
- `useSourceGroupsDrawerStore` - Zustand store for drawer state management

### React Dependencies
- `useCallback` - Optimized event handlers
- `useMemo` - Computed values optimization

## Integration

### Application Architecture Role

```
Settings Page
└── Search Customization
    └── Source Group Drawer
        ├── UnsupportedDomains ← This Component
        ├── DomainSelectionTable
        └── DrawerActions
```

### Data Flow Integration

1. **Input**: Receives domain data from `createSourceGroupData` store state
2. **Processing**: Filters for domains marked as `isUnmatched`
3. **Output**: Updates `rowSelectionState` for unsupported domain selection
4. **UI Feedback**: Provides visual warning and interaction capabilities

## Best Practices

### Architectural Adherence

✅ **Proper Client Component Usage**: Uses `'use client'` only when necessary for interactivity

✅ **State Management Pattern**: Correctly uses Zustand for global state management

✅ **Component Decomposition**: Single responsibility - handles only unsupported domain display and selection

✅ **Performance Optimization**: Uses `useMemo` and `useCallback` to prevent unnecessary re-renders

✅ **Conditional Rendering**: Returns `null` when no unsupported domains exist, following React best practices

### Implementation Patterns

✅ **Flat Component Structure**: Doesn't create unnecessary nesting

✅ **Accessible UI**: Uses semantic elements and proper button interactions

✅ **Consistent Styling**: Follows established design system patterns with Tailwind classes

✅ **Type Safety**: Properly typed store selectors and state management

### Integration Best Practices

✅ **Store Coupling**: Appropriately coupled to domain-specific store without creating tight dependencies

✅ **Reusable Logic**: Selection logic is encapsulated and reusable

✅ **User Experience**: Provides clear feedback and intuitive interactions for error states