# DeleteSourceGroupDialog

## Purpose
The `DeleteSourceGroupDialog` component provides a confirmation dialog for deleting source groups in the search customization settings. It displays a warning message with the source group name and requires user confirmation before proceeding with the deletion operation.

## Component Type
**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive dialog state and user interactions
- Uses event handlers for button clicks and dialog state changes
- Integrates with Zustand store for client-side state management
- Handles asynchronous operations with user feedback

## Props Interface
This component does not accept any props. All data and state are managed through the Zustand store.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | Component uses global state from Zustand store |

## Usage Example
```tsx
import { DeleteSourceGroupDialog } from '@/components/settings/search-customization/source-groups-list/delete-source-group-dialog';

function SourceGroupsManager() {
  // The dialog is controlled by the Zustand store state
  // Trigger deletion dialog by setting store state:
  // setSourceGroupIdToDelete(groupId)
  // setIsDeleteDialogOpen(true)
  
  return (
    <div>
      {/* Other source group components */}
      <DeleteSourceGroupDialog />
    </div>
  );
}
```

## Functionality
- **Confirmation Dialog**: Displays a modal dialog asking for user confirmation before deletion
- **Source Group Display**: Shows the name of the source group being deleted
- **Loading States**: Provides visual feedback during the deletion process
- **Error Prevention**: Warns users that the action cannot be undone
- **Auto-close**: Automatically closes dialog and resets state upon successful deletion
- **Cancel Option**: Allows users to cancel the deletion operation

## State Management
The component uses **Zustand** for client-side state management through `useSourceGroupsDrawerStore`:

- `isDeleteDialogOpen` - Controls dialog visibility
- `sourceGroupName` - Name of the source group to display in confirmation
- `sourceGroupIdToDelete` - ID of the source group to be deleted
- `setIsDeleteDialogOpen()` - Function to control dialog state
- `setSourceGroupIdToDelete()` - Function to set the target source group
- `reset()` - Function to reset the drawer state after deletion

## Side Effects
- **API Mutation**: Calls delete source group API endpoint via `useDeleteSourceGroup` hook
- **State Reset**: Resets Zustand store state after successful deletion
- **Dialog Management**: Handles opening/closing of the modal dialog
- **Success Callback**: Executes cleanup operations after successful deletion

## Dependencies

### UI Components
- `Dialog`, `DialogContent`, `DialogDescription`, `DialogFooter`, `DialogHeader`, `DialogTitle` - Dialog structure
- `Button` - Action buttons (Cancel/Delete)
- `Typography` - Text styling and hierarchy
- `PiGlobalFill` - Icon component for visual context

### Hooks & Utilities
- `useSourceGroupsDrawerStore` - Zustand store for dialog state management
- `useDeleteSourceGroup` - TanStack Query mutation hook for API operations
- `useCallback` - Performance optimization for event handlers

## Integration
This component integrates into the search customization settings flow:

1. **Parent Components**: Used within source groups list management interface
2. **Store Integration**: Shares state with other source group components via Zustand
3. **Query Integration**: Leverages TanStack Query for server state synchronization
4. **UI System**: Built using the application's design system components

## Best Practices
✅ **Follows Architecture Guidelines**:
- Uses client component appropriately for interactive functionality
- Implements proper state management with Zustand for UI state
- Uses TanStack Query for server state mutations
- Leverages design system components for consistency

✅ **Performance Optimizations**:
- Uses `useCallback` to prevent unnecessary re-renders
- Minimizes state subscriptions by selecting specific store properties

✅ **User Experience**:
- Provides clear confirmation messaging with source group name
- Shows loading states during async operations
- Offers cancel option for user control
- Warns about irreversible action

✅ **Error Handling**:
- Validates source group ID before deletion
- Handles loading states gracefully
- Resets state properly on success or cancellation