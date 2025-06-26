# SearchSources Component

## Purpose

The `SearchSources` component provides a header interface for managing source collections within a drawer interface. It displays the source group name, selection count, search functionality, and bulk actions for removing selected sources. This component serves as the control panel for source group management in the settings customization workflow.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive search functionality with input change handlers
- Handles click events for bulk removal actions
- Uses complex state management through Zustand store
- Requires real-time UI updates based on selection state

## Props Interface

This component accepts no props - it operates entirely through Zustand store state management.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | Component uses internal state management |

## Usage Example

```tsx
import { SearchSources } from '@/components/settings/search-customization/source-group-drawer/search-sources';

function SourceGroupDrawer() {
  return (
    <div className="drawer-content">
      {/* Header with search and selection controls */}
      <SearchSources />
      
      {/* Source list content would follow */}
      <SourceTable />
    </div>
  );
}
```

## Functionality

### Core Features
- **Group Name Display**: Shows the current source group name in the header
- **Selection Counter**: Displays count of currently selected table sources
- **Search Interface**: Provides filtering capability for source names or domains
- **Bulk Actions**: Remove all selected items with visual feedback
- **Conditional Rendering**: Adapts UI based on edit mode and data availability
- **Visual States**: Dynamic button styling based on selection state

### Interactive Elements
- Search input with real-time filtering
- Remove all button with disabled/enabled states
- Options menu for additional actions (edit mode only)

## State Management

### Zustand Store Integration
Uses `useSourceGroupsDrawerStore` for comprehensive state management:

```tsx
// Selection state
const rowSelectionState = useSourceGroupsDrawerStore(state => state.rowSelectionState);

// Actions
const removeAllSelectedTableSources = useSourceGroupsDrawerStore(state => state.removeAllSelectedTableSources);
const setGlobalFilter = useSourceGroupsDrawerStore(state => state.setGlobalFilter);

// Configuration
const sourceGroupName = useSourceGroupsDrawerStore(state => state.sourceGroupName);
const isEditMode = useSourceGroupsDrawerStore(state => state.isEditMode);
```

### Computed State
- **Selection Count**: Calculated via `useMemo` from `rowSelectionState` object
- **Button Visibility**: Derived from selection count using CVA variants

## Side Effects

### Event Handlers
- **Search Input**: Updates global filter state on input change
- **Remove All**: Triggers bulk removal of selected sources
- **Selection Tracking**: Monitors row selection changes for UI updates

### Performance Optimizations
- Memoized selection count calculation to prevent unnecessary re-renders
- Conditional rendering to avoid mounting unused components

## Dependencies

### UI Components
- `Button` - Bulk action controls
- `MenuSearchInput` - Search functionality
- `Typography` - Text display with consistent styling
- `PiDeleteBinLine` - Icon for remove actions

### Styling
- `cva` (Class Variance Authority) - Dynamic button styling
- `cn` utility - Conditional class application

### Store Integration
- `useSourceGroupsDrawerStore` - Primary state management

## Integration

### Application Architecture
```
Settings Page
└── Search Customization
    └── Source Group Drawer
        ├── SearchSources (this component)
        ├── SourceTable
        └── DrawerActions
```

### Data Flow
1. Store provides source group configuration and selection state
2. Component renders appropriate UI based on edit mode and data availability
3. User interactions update global store state
4. Dependent components react to state changes

### Context Usage
Operates within the source groups drawer context, sharing state with:
- Source selection tables
- Drawer navigation controls
- Save/cancel action buttons

## Best Practices

### Architecture Adherence
- ✅ **Client Component**: Properly uses `'use client'` for interactive functionality
- ✅ **State Management**: Leverages Zustand for complex state coordination
- ✅ **Component Decomposition**: Focused single responsibility (header controls only)
- ✅ **Reusability**: Uses shared UI components from `/ui/` directory

### Code Quality
- **Performance**: Memoized calculations prevent unnecessary re-renders
- **Accessibility**: Semantic button states and proper labeling
- **Type Safety**: Comprehensive TypeScript integration
- **Maintainability**: Clear separation between UI logic and state management

### Integration Patterns
- Follows the flat component structure guidelines
- Properly scoped to feature domain (settings/search-customization)
- Clean dependency injection through store patterns
- Consistent with application's state management architecture