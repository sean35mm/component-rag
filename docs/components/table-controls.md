# Table Controls Component

## Purpose

The `table-controls` module provides specialized checkbox components for data table row selection functionality. It exports `HeaderCheckbox` for bulk selection/deselection of all table rows and `RowCheckbox` for individual row selection within the search customization source group drawer interface.

## Component Type

**Client Component** - Uses the `'use client'` directive because it handles interactive click events and manages selection state through event handlers. The components require browser APIs for event handling and user interactions.

## Props Interface

### HeaderCheckbox

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isChecked` | `'indeterminate' \| boolean` | ✅ | Current selection state - `true` (all selected), `false` (none selected), or `'indeterminate'` (partial selection) |
| `getToggleAllRowsSelectedHandler` | `() => (e: React.MouseEvent<HTMLButtonElement>) => void` | ✅ | Function that returns an event handler for toggling all row selections |

### RowCheckbox

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isChecked` | `boolean` | ✅ | Whether this specific row is currently selected |
| `isDisabled` | `boolean` | ✅ | Whether the checkbox should be disabled (non-interactive) |
| `getToggleSelectedHandler` | `() => (e: React.MouseEvent<HTMLButtonElement>) => void` | ✅ | Function that returns an event handler for toggling this row's selection |

## Usage Example

```tsx
import { HeaderCheckbox, RowCheckbox } from '@/components/settings/search-customization/source-group-drawer/table-controls';

// In a data table component
function SourceGroupTable() {
  const {
    getToggleAllRowsSelectedHandler,
    getIsAllRowsSelected,
    getIsSomeRowsSelected,
  } = useTableSelection();

  const headerCheckboxState = getIsAllRowsSelected() 
    ? true 
    : getIsSomeRowsSelected() 
    ? 'indeterminate' 
    : false;

  return (
    <table>
      <thead>
        <tr>
          <th>
            <HeaderCheckbox
              isChecked={headerCheckboxState}
              getToggleAllRowsSelectedHandler={getToggleAllRowsSelectedHandler}
            />
          </th>
          <th>Source Name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            <td>
              <RowCheckbox
                isChecked={row.getIsSelected()}
                isDisabled={!row.getCanSelect()}
                getToggleSelectedHandler={row.getToggleSelectedHandler}
              />
            </td>
            <td>{row.original.name}</td>
            <td>{row.original.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

## Functionality

### Core Features
- **Bulk Selection**: HeaderCheckbox enables select-all/deselect-all functionality with indeterminate state support
- **Individual Selection**: RowCheckbox provides per-row selection control with disabled state handling
- **Event Delegation**: Both components prevent event bubbling to avoid unintended row interactions
- **Accessibility**: Leverages the base Checkbox component's accessibility features

### Key Behaviors
- Click events are stopped from propagating to prevent table row click handlers from interfering
- Handler functions are memoized using `useCallback` to prevent unnecessary re-renders
- Consistent sizing with `size-10` (40px) for header and `size-8` (32px) for rows
- Flexbox centering ensures proper visual alignment within table cells

## State Management

**External State Management** - These components are stateless and rely on external state management through:
- Handler functions passed via props that manage selection state
- Typically integrates with table libraries (like TanStack Table) or custom selection hooks
- Selection state is maintained by parent components or state management systems

## Side Effects

- **Event Handling**: Executes selection toggle handlers that modify external state
- **Event Propagation**: Actively prevents event bubbling to parent elements
- **No Direct Side Effects**: Components don't perform API calls or modify global state directly

## Dependencies

### Internal Dependencies
- `@/components/ui/checkbox` - Base checkbox component for consistent styling and behavior
- React hooks (`useCallback`) for performance optimization

### External Dependencies
- Expects integration with table selection systems that provide handler functions
- Relies on parent components to manage actual selection state

## Integration

### Application Architecture Role
- **Domain-Specific Component**: Part of the search customization feature within settings
- **Table Enhancement**: Specifically designed for the source group drawer's data table
- **UI Composition**: Builds upon the base UI checkbox component following the Lego block principle

### Usage Context
```
Settings → Search Customization → Source Group Drawer → Table Controls
```

The components integrate into data tables where users need to select multiple source groups for batch operations or configuration changes.

## Best Practices

### Architecture Adherence
- ✅ **Component Decomposition**: Two focused, single-purpose components rather than one complex component
- ✅ **Reusability**: Generic enough for any table selection scenario while remaining domain-appropriate
- ✅ **UI Foundation**: Builds upon established UI components rather than reimplementing checkbox functionality
- ✅ **Performance**: Uses `useCallback` to prevent unnecessary re-renders
- ✅ **Event Handling**: Proper event management with stopPropagation

### Implementation Guidelines
- Always provide both checked state and toggle handlers
- Use indeterminate state for header checkboxes when partial selection exists
- Implement proper disabled states for rows that cannot be selected
- Ensure handlers are memoized to prevent performance issues in large tables