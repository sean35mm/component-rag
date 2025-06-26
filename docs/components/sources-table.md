# SourcesTable Component

## Purpose
The `SourcesTable` component provides a comprehensive table interface for managing sources within source groups. It displays source information including domain, monthly visits, and average posts, while offering batch selection, filtering, and individual source management capabilities. This component serves as the primary interface for source management within the source group drawer.

## Component Type
**Client Component** - Uses the `'use client'` directive because it requires:
- Interactive table functionality with selection states
- Client-side filtering and pagination
- Event handlers for row selection and actions
- Zustand store subscriptions for state management

## Props Interface
This component accepts no props - all data and configuration comes from the Zustand store.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | Component uses Zustand store for all data and state |

## Usage Example

```tsx
import { SourcesTable } from '@/components/settings/search-customization/source-group-drawer/sources-table';

function SourceGroupDrawer() {
  return (
    <div className="drawer-content">
      <h2>Manage Sources</h2>
      <SourcesTable />
    </div>
  );
}

// The component automatically connects to the Zustand store
// No props needed - all state managed through useSourceGroupsDrawerStore
```

## Functionality

### Core Features
- **Tabular Data Display**: Shows source information in organized columns (Domain, Monthly Visits, Avg. Posts)
- **Batch Selection**: Header and row checkboxes for selecting multiple sources
- **Global Search**: Real-time filtering across domain and name fields
- **Pagination**: Configurable page size and navigation
- **Row Actions**: Individual source removal capabilities
- **Preview Mode**: Special handling for preview/add source functionality

### Column Configuration
- **Domain Column**: Shows source citation with favicon, handles unmatched sources with warning icons
- **Monthly Visits**: Formatted display using number formatter
- **Avg. Posts**: Localized number formatting
- **Actions Column**: Remove source functionality

### Interactive Elements
- Row selection with checkbox controls
- Global filter integration
- Pagination controls
- Action buttons for source management

## State Management
**Zustand Store Integration** - Uses `useSourceGroupsDrawerStore` for:

```tsx
// State subscriptions
const createSourceGroupData = useSourceGroupsDrawerStore(state => state.createSourceGroupData);
const rowSelectionState = useSourceGroupsDrawerStore(state => state.rowSelectionState);
const globalFilter = useSourceGroupsDrawerStore(state => state.globalFilter);
const isEditMode = useSourceGroupsDrawerStore(state => state.isEditMode);

// State setters
const setRowSelectionState = useSourceGroupsDrawerStore(state => state.setRowSelectionState);
const setSourcesPageIndex = useSourceGroupsDrawerStore(state => state.setSourcesPageIndex);
```

All component state is externalized to the Zustand store, enabling state persistence across component unmounts and coordination with other drawer components.

## Side Effects
- **Pagination State Updates**: Updates page index in store when user navigates
- **Selection State Changes**: Synchronizes row selection with global store state
- **Filter Applications**: Real-time filtering updates based on store filter value

No direct API calls - data fetching and mutations handled by parent components or other store actions.

## Dependencies

### Internal Components
- `SourceCitationItem` - Displays source favicon and domain
- `TableView` - Core table functionality from UI library
- `Typography` - Consistent text styling
- `HeaderCheckbox`, `RowCheckbox` - Selection controls
- `RemoveSourceButton`, `SearchAndAddSource` - Action components

### External Libraries
- `@tanstack/react-table` - Table functionality and types
- `@/lib/contexts` - Zustand store access
- `@/lib/utils/text` - Number formatting utilities

### Types
- `SourcePreview` - Source data structure
- `ColumnDef`, `FilterFnOption` - TanStack Table types

## Integration

### Application Architecture
```
SourceGroupDrawer
├── SourceGroupForm
├── SourcesTable (this component)
│   ├── HeaderCheckbox
│   ├── RowCheckbox
│   ├── RemoveSourceButton
│   └── SearchAndAddSource
└── ActionButtons
```

### Store Integration
The component serves as a view layer for the `useSourceGroupsDrawerStore`, displaying and manipulating source data within the broader source group management workflow.

### Data Flow
1. Store provides source data and UI state
2. Component renders table with interactive elements
3. User interactions update store state
4. Store changes trigger re-renders
5. Other components react to shared store state

## Best Practices

### Architecture Adherence
- ✅ **State Management**: Properly uses Zustand for complex client state
- ✅ **Component Decomposition**: Delegates specialized functionality to focused sub-components
- ✅ **Client Component Usage**: Justified use of client-side rendering for interactivity
- ✅ **Separation of Concerns**: Pure view component with externalized state

### Performance Optimizations
- Uses `useCallback` for filter function to prevent unnecessary re-renders
- `useMemo` for pagination configuration
- Efficient row selection with TanStack Table's built-in optimization

### Reusability
- Exports `standardColumns` for potential reuse in other table contexts
- Component-specific logic isolated while using shared UI components
- Type-safe integration with established table patterns

### Code Quality
- Comprehensive TypeScript typing
- Consistent styling patterns
- Clear component boundaries
- Proper error handling for unmatched sources