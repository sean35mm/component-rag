# FolderEntityItemActions Component

## Purpose

The `FolderEntityItemActions` component provides a dropdown menu with contextual actions for folder and file entities in the file display panel. It renders a "more actions" trigger button that opens a dropdown containing actions like move, rename, and delete. This component serves as a reusable action menu for file system entities within the main layout's file browser interface.

## Component Type

**Client Component** - This component uses interactive UI elements (dropdown menu with click handlers) that require client-side JavaScript execution. The dropdown state management and event handling necessitate client-side rendering.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | Additional CSS classes to apply to the dropdown trigger |
| `isOpen` | `boolean` | No | Controls the open/closed state of the dropdown menu |
| `onDelete` | `() => void` | No | Callback function triggered when the delete action is selected |
| `onIsOpenChange` | `(isOpen: boolean) => void` | No | Callback function triggered when the dropdown open state changes |
| `onMoveTo` | `() => void` | No | Callback function triggered when the "Move to..." action is selected |
| `onRename` | `() => void` | No | Callback function triggered when the rename action is selected |

## Usage Example

```tsx
import { FolderEntityItemActions } from '@/components/main-layout/file-display-panel/folder-entity-item-actions';

function FileListItem({ file }: { file: FileEntity }) {
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  
  const handleDelete = () => {
    // Delete file logic
    deleteFile(file.id);
  };
  
  const handleRename = () => {
    // Open rename dialog
    setRenameDialogOpen(true);
  };
  
  const handleMoveTo = () => {
    // Open move dialog
    setMoveDialogOpen(true);
  };

  return (
    <div className="flex items-center justify-between p-2">
      <span>{file.name}</span>
      <FolderEntityItemActions
        isOpen={isActionsOpen}
        onIsOpenChange={setIsActionsOpen}
        onDelete={handleDelete}
        onRename={handleRename}
        onMoveTo={handleMoveTo}
        className="ml-2"
      />
    </div>
  );
}
```

## Functionality

- **Dropdown Menu**: Renders a dropdown menu triggered by a "more actions" icon button
- **Conditional Actions**: Only displays action items when their corresponding callback props are provided
- **Visual Hierarchy**: Uses different styling for destructive actions (delete) vs. normal actions
- **Controlled State**: Supports external control of the dropdown's open/closed state
- **Icon Integration**: Each action includes an appropriate icon for visual clarity
- **Responsive Design**: Fixed width dropdown with proper alignment and spacing

## State Management

**Local State**: The component relies on external state management for the dropdown's open/closed state through the `isOpen` and `onIsOpenChange` props. This follows a controlled component pattern where the parent manages the state.

**No Global State**: This component doesn't directly interact with TanStack Query or Zustand stores, as it serves as a pure UI component that delegates business logic to its parent through callback props.

## Side Effects

**No Direct Side Effects**: The component itself doesn't perform API calls or side effects. All actions are delegated to parent components through callback props, maintaining separation of concerns and reusability.

## Dependencies

- **UI Components**: `DropdownMenu`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuTrigger` from the design system
- **Icons**: `PiDeleteBinLine`, `PiEditLine`, `PiFolderTransferLine`, `PiMoreFill` from the icon library
- **Utilities**: `cn` utility for conditional class name handling

## Integration

This component integrates into the file display panel architecture as a reusable action menu for file system entities:

- **Parent Context**: Used within file/folder list items in the file browser
- **Action Delegation**: Parent components handle the actual business logic for move, rename, and delete operations
- **State Coordination**: Works with parent components that manage dialog states and file operations
- **Design System**: Follows the application's dropdown menu patterns and icon usage conventions

## Best Practices

✅ **Follows Architecture Guidelines**:
- **Component Decomposition**: Flat, focused component that handles only UI concerns
- **Reusability**: Generic props interface allows use with different entity types
- **Separation of Concerns**: UI rendering separated from business logic
- **Controlled Components**: Externally controlled state for better integration

✅ **Design Patterns**:
- **Conditional Rendering**: Only shows actions when callbacks are provided
- **Consistent Styling**: Uses design system tokens and established patterns
- **Accessibility**: Proper dropdown menu structure with keyboard navigation
- **Visual Feedback**: Clear icons and styling hierarchy for different action types

✅ **Performance Considerations**:
- **Minimal Re-renders**: Controlled state pattern prevents unnecessary updates
- **Lightweight**: No heavy dependencies or complex state management
- **Event Delegation**: Efficient click handling through callback props