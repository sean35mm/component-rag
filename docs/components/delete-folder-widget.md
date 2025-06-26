# DeleteFolderWidget Component

## Purpose

The `DeleteFolderWidget` component provides a confirmation dialog for deleting folders in the file management system. It presents users with a clear confirmation interface, handles the deletion process with proper loading states, and provides feedback through toast notifications. The component ensures safe folder deletion by requiring explicit user confirmation before executing the destructive action.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages local state with `useState` for pending states
- Handles user interactions (form submission, dialog controls)
- Uses event handlers and callbacks for user actions
- Integrates with toast notifications and context state management

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | `boolean` | Yes | Controls the visibility state of the delete confirmation dialog |
| `onOpenChange` | `(open: boolean) => void` | Yes | Callback function to handle dialog open/close state changes |
| `folder` | `Partial<Folder>` | Yes | Folder object containing at minimum the `id` and `name` for deletion |

## Usage Example

```tsx
import { DeleteFolderWidget } from '@/components/main-layout/file-display-panel/delete-folder-widget';
import { useState } from 'react';

function FolderManagement() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const handleDeleteClick = (folder) => {
    setSelectedFolder(folder);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div>
      {/* Trigger button */}
      <button 
        onClick={() => handleDeleteClick(folder)}
        className="delete-folder-btn"
      >
        Delete Folder
      </button>

      {/* Delete confirmation dialog */}
      <DeleteFolderWidget
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        folder={selectedFolder || {}}
      />
    </div>
  );
}
```

## Functionality

### Core Features
- **Confirmation Dialog**: Displays a modal dialog with folder name and delete confirmation
- **Visual Feedback**: Shows folder name and delete icon for clear context
- **Loading States**: Handles both server-side and local pending states during deletion
- **Error Handling**: Catches and displays deletion errors through toast notifications
- **Success Feedback**: Shows confirmation toast when folder is successfully deleted
- **Context Integration**: Updates file display panel state after successful deletion

### User Interaction Flow
1. User triggers deletion action
2. Dialog opens showing folder name and confirmation buttons
3. User can cancel or confirm the deletion
4. On confirmation, delete button shows loading state
5. Success/error feedback is provided via toast notifications
6. Dialog closes and context state is updated on success

## State Management

### Local State
- **`isLocalPending`**: Boolean state to track local deletion process and provide immediate UI feedback

### External State
- **TanStack Query**: Uses `useDeleteFolder` hook for server-side folder deletion mutation
- **Zustand Context**: Integrates with `useFileDisplayPanel` context to update folder actions state
- **Toast State**: Manages toast notifications for user feedback

## Side Effects

### API Interactions
- **Folder Deletion**: Calls `deleteFolder` mutation with folder ID
- **Error Handling**: Catches and processes deletion errors

### State Updates
- **Context State**: Updates `isActiveFolderActions` in file display panel context
- **Dialog State**: Controls dialog visibility through `onOpenChange` callback
- **Toast Notifications**: Triggers success/error toasts based on deletion outcome

## Dependencies

### UI Components
- `Button` - For cancel and confirm actions
- `Dialog`, `DialogContent`, `DialogHeader`, etc. - Modal dialog structure
- `Typography` - Text styling and hierarchy

### Hooks & Context
- `useToast` - Toast notification system
- `useFileDisplayPanel` - File management context
- `useDeleteFolder` - TanStack Query mutation hook

### Icons
- `PiDeleteBinLine` - Visual indicator for delete operation

### Types
- `Folder` - TypeScript interface for folder data structure

## Integration

### File Management System
The component integrates deeply with the file management architecture:
- **Context Integration**: Updates file display panel state after successful operations
- **Query Integration**: Uses centralized query hooks for consistent server state management
- **Toast System**: Provides consistent user feedback across the application

### Dialog System
- Follows the application's dialog patterns using shadcn/ui components
- Implements proper accessibility with dialog roles and focus management
- Uses `forwardRef` for proper ref forwarding in compound component patterns

## Best Practices

### Architecture Adherence
- ✅ **Client Component Usage**: Appropriately uses client component for interactive functionality
- ✅ **State Management**: Combines TanStack Query for server state with local state for UI concerns
- ✅ **Component Composition**: Uses UI components as building blocks following the Lego block pattern
- ✅ **Error Handling**: Implements comprehensive error handling with user feedback

### Code Quality
- ✅ **TypeScript**: Fully typed with proper interfaces and generic constraints
- ✅ **Accessibility**: Uses semantic dialog components with proper ARIA attributes
- ✅ **Performance**: Uses `useCallback` for stable function references
- ✅ **User Experience**: Provides clear loading states and feedback mechanisms

### Integration Patterns
- ✅ **Context Usage**: Properly integrates with Zustand-based context for state management
- ✅ **Query Hooks**: Uses centralized query hooks following the established data fetching patterns
- ✅ **Toast Integration**: Consistent feedback mechanism across the application
- ✅ **Ref Forwarding**: Implements proper ref forwarding for component composition