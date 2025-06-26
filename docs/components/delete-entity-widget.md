# DeleteEntityWidget Component

## Purpose

The `DeleteEntityWidget` is a confirmation dialog component that handles the deletion of various entity types (signals, answers, searches, stories, and shared member threads) within the file display panel. It provides a unified interface for confirming and executing entity deletions while managing related state updates like closing tabs and navigation.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive dialog state and user interactions
- Uses Next.js router hooks (`usePathname`, `useRouter`) for navigation
- Handles form submission and async operations
- Manages local component state and side effects

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | `boolean` | Yes | Controls the visibility state of the delete confirmation dialog |
| `onOpenChange` | `(open: boolean) => void` | Yes | Callback function to handle dialog open/close state changes |
| `entity` | `FolderEntity` | Yes | The entity object to be deleted, containing type, entityId, and name |

## Usage Example

```tsx
import { DeleteEntityWidget } from '@/components/main-layout/file-display-panel/delete-entity-widget';
import { FolderEntity, TabEntity } from '@/lib/types';

function FileDisplayPanel() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<FolderEntity | null>(null);

  const handleDeleteEntity = (entity: FolderEntity) => {
    setSelectedEntity(entity);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div>
      {/* Entity list with delete buttons */}
      <button onClick={() => handleDeleteEntity(someEntity)}>
        Delete Entity
      </button>

      {/* Delete confirmation dialog */}
      {selectedEntity && (
        <DeleteEntityWidget
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          entity={selectedEntity}
        />
      )}
    </div>
  );
}
```

## Functionality

### Core Features
- **Multi-entity Support**: Handles deletion of signals, answers, searches, stories, and shared member threads
- **Visual Confirmation**: Displays entity-specific icons and titles in the confirmation dialog
- **Tab Management**: Automatically closes related tabs when entities are deleted
- **Navigation Handling**: Redirects to home page if the current page corresponds to the deleted entity
- **Loading States**: Shows pending states during deletion operations
- **Error Handling**: Provides user feedback for successful deletions and errors

### Entity-Specific Behavior
- **Signals**: Archives the signal and removes from folder instead of hard deletion
- **Other Entities**: Performs actual deletion via respective API endpoints

## State Management

### Local State
- `isLocalPending`: Tracks component-level loading state during deletion process

### Zustand Stores
- **useTabsStore**: Manages tab state and provides `onTabClose` functionality
- **useFileDisplayPanel**: Controls entity actions visibility state

### TanStack Query Hooks
- `useDeleteAnswersThread`: Handles answer thread deletion
- `useDeleteSavedDeepSearch`: Manages saved search deletion
- `useDeleteSavedSharedMemberThread`: Handles shared thread deletion
- `useDeleteSavedStory`: Manages story deletion
- `useUpdateSignal`: Updates signal status (archives instead of deleting)

## Side Effects

### Navigation Effects
- Redirects to home page (`/`) if deleted entity corresponds to current route
- Closes associated tabs before deletion

### API Interactions
- Executes entity-specific deletion/archival operations
- Handles different endpoints based on entity type

### User Feedback
- Shows success toast notifications with entity name
- Displays error toast with failure details
- Updates UI states to reflect deletion

## Dependencies

### UI Components
- `Dialog`, `DialogContent`, `DialogHeader`, etc. from UI dialog system
- `Button` component for actions
- `Typography` for consistent text styling

### Hooks & Services
- Next.js navigation hooks (`usePathname`, `useRouter`)
- Toast notification system (`useToast`)
- Multiple deletion-specific query hooks
- Custom store hooks for state management

### Icons & Assets
- Entity-specific icons (signals, answers, searches, stories)
- Delete bin icon for dialog header

## Integration

### File Display Panel Architecture
- Integrates with the main file display panel as a modal overlay
- Connects to entity action systems and folder management
- Coordinates with tab management system

### Navigation System
- Integrates with Next.js routing to handle post-deletion navigation
- Manages URL state when entities are removed

### State Synchronization
- Coordinates between multiple state management systems (Zustand stores and TanStack Query)
- Ensures consistent state across tab management and entity operations

## Best Practices

### Architecture Adherence
- ✅ **Proper Client Component Usage**: Uses `'use client'` appropriately for interactive dialog functionality
- ✅ **State Management Separation**: Uses TanStack Query for server state, Zustand for client state, local state for component-specific needs
- ✅ **Component Decomposition**: Clean separation of concerns with focused responsibility
- ✅ **Error Handling**: Comprehensive error handling with user feedback

### Code Quality
- **Type Safety**: Proper TypeScript usage with generic type mappers
- **Callback Optimization**: Uses `useCallback` for performance optimization
- **Ref Forwarding**: Properly implements `forwardRef` for dialog integration
- **Loading States**: Comprehensive pending state management across multiple async operations

### User Experience
- **Confirmation Pattern**: Implements safe deletion with explicit user confirmation
- **Visual Feedback**: Entity-specific icons and clear messaging
- **Graceful Degradation**: Handles errors without breaking user flow
- **Consistent Styling**: Follows design system patterns for dialogs and buttons