# SourceGroupsList Component

## Purpose

The `SourceGroupsList` component provides a comprehensive data table interface for managing source groups in the search customization settings. It displays source groups with full CRUD operations including viewing, creating, editing, duplicating, and deleting source groups. The component adapts responsively between desktop table view and mobile card view.

## Component Type

**Client Component** - Uses `'use client'` directive because it requires:
- Interactive table operations (sorting, pagination)
- State management for drawer/dialog controls
- Event handlers for user interactions
- Responsive breakpoint detection

## Props Interface

### SourceGroupsList
```typescript
// No props - self-contained component
```

### ActionButtons
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `row` | `Row<SourceGroup>` | Yes | TanStack Table row object containing source group data |

### Exported Utilities
| Export | Type | Description |
|--------|------|-------------|
| `getName` | `(row: SourceGroup) => string` | Utility function to extract display name |
| `columns` | `ColumnDef<SourceGroup>[]` | Table column definitions |
| `ActionButtons` | `React.Component` | Row action buttons component |

## Usage Example

```tsx
import { SourceGroupsList } from '@/components/settings/search-customization/source-groups-list';

// Basic usage in settings page
export function SearchCustomizationPage() {
  return (
    <div className="space-y-6">
      <SourceGroupsList />
    </div>
  );
}

// Using individual exports for custom implementations
import { getName, columns, ActionButtons } from './source-groups-list';

const customColumns = [
  ...columns.slice(0, 3), // Use first 3 columns
  {
    id: 'customActions',
    cell: ({ row }) => <ActionButtons row={row} />
  }
];
```

## Functionality

### Core Features
- **Data Display**: Renders source groups in sortable table with columns for name, description, source count, creation date, and ID
- **CRUD Operations**: 
  - Create new source groups via drawer
  - Edit existing organization-owned groups
  - Delete organization-owned groups with confirmation
  - Duplicate any source group
- **Responsive Design**: Desktop table view switches to mobile card layout
- **Conditional Actions**: Different permissions for organization vs. system source groups
- **Visual Indicators**: Icons and tooltips for better UX

### Column Definitions
- **Name**: Display name with icon, custom sorting
- **Description**: Truncated description text
- **Sources**: Count of domains in the group
- **Created On**: Formatted date with relative display
- **ID**: Source group identifier
- **Actions**: Edit/Delete/Duplicate buttons with tooltips

## State Management

### Zustand Store (`useSourceGroupsDrawerStore`)
```typescript
// Drawer/Dialog state management
- onIsOpenChange: Controls drawer visibility
- setIsEditMode: Toggles edit vs create mode
- setIsDeleteDialogOpen: Controls delete confirmation dialog
- setSourceGroupIdToDelete: Sets target for deletion
- setSourceGroupName: Sets name for operations
- setSourceGroupToEdit: Sets data for editing
```

### TanStack Query
```typescript
// Server state management
const { data, isLoading, isError } = useSourceGroups({
  sortBy: 'createdAt',
  sortOrder: 'desc',
  size: 100
});

const { mutate: createSourceGroup, isPending } = useCreateSourceGroup();
```

## Side Effects

1. **Data Fetching**: Automatically loads source groups on mount with sorting
2. **Mutations**: Creates duplicate source groups via API
3. **Navigation**: Opens edit drawer and delete dialogs
4. **State Updates**: Updates global store state for drawer/dialog management

## Dependencies

### UI Components
- `CrudTable`: Main table component with responsive features
- `Button`, `CompactButton`: Action triggers
- `Tooltip`: Action button hints
- `Typography`: Text rendering
- `KeyIcon`: Visual indicators

### Hooks & Services
- `useSourceGroups`: Data fetching hook
- `useCreateSourceGroup`: Mutation hook for duplication
- `useSourceGroupsDrawerStore`: Global state management
- `useBreakpoint`: Responsive design detection

### Child Components
- `DeleteSourceGroupDialog`: Confirmation dialog
- `SourceGroupsCardList`: Mobile view renderer

## Integration

### Application Flow
```
Settings Page → Search Customization → SourceGroupsList
                                           ↓
                                    SourceGroupsDrawer (create/edit)
                                           ↓
                                    DeleteSourceGroupDialog
```

### Store Integration
- Coordinates with drawer store for seamless create/edit flows
- Manages temporary state during CRUD operations
- Provides consistent state across related components

### Permission System
- Respects organization ownership for edit/delete permissions
- System source groups are read-only with duplicate-only actions
- Visual feedback for disabled actions

## Best Practices

### ✅ Follows Architecture Guidelines
- **Proper Client Component Usage**: Uses client directive only for interactive features
- **Flat Component Structure**: ActionButtons extracted as separate component
- **TanStack Query Integration**: Proper server state management with React Query
- **Zustand for UI State**: Global store for drawer/dialog coordination

### ✅ Design Patterns
- **Responsive Design**: Automatic desktop/mobile layout switching
- **Conditional Rendering**: Permission-based action visibility
- **Error Boundaries**: Proper loading and error state handling
- **Accessibility**: Tooltips and semantic markup

### ✅ Performance Optimizations
- **useCallback Hooks**: Memoized event handlers prevent unnecessary re-renders
- **Conditional Queries**: Efficient data fetching with proper dependencies
- **Component Splitting**: Separate ActionButtons component for better modularity

### ✅ Code Organization
- **Clear Exports**: Multiple utility exports for reusability
- **Type Safety**: Full TypeScript integration with proper interfaces
- **Separation of Concerns**: Data logic, UI logic, and state management clearly separated