# MoveToFolderWidget Component

## Purpose

The `MoveToFolderWidget` is a modal dialog component that enables users to move various file entities (answers, searches, shared threads, signals, and stories) to different folders within the application. It provides a dropdown selection interface for choosing destination folders and integrates with folder creation functionality.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages local state for folder selection and dialog visibility
- Handles user interactions (form submission, folder selection)
- Uses React hooks like `useState`, `useCallback`, and `useEffect`
- Requires browser APIs for toast notifications and dialog interactions

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `entity` | `FolderEntity` | ✅ | The entity to be moved, containing type, entityId, and name information |
| `isOpen` | `boolean` | ✅ | Controls the visibility state of the dialog |
| `onOpenChange` | `(open: boolean) => void` | ✅ | Callback function to handle dialog open/close state changes |

## Usage Example

```tsx
import { MoveToFolderWidget } from '@/components/main-layout/file-display-panel/move-to-folder-widget';
import { TabEntity } from '@/lib/types';

function FileDisplayPanel() {
  const [isMoveDialogOpen, setIsMoveDialogOpen] = useState(false);
  
  const entityToMove = {
    type: TabEntity.STORY,
    entityId: 'story-uuid-123',
    name: 'My Research Story'
  };

  return (
    <div>
      <button onClick={() => setIsMoveDialogOpen(true)}>
        Move to Folder
      </button>
      
      <MoveToFolderWidget
        entity={entityToMove}
        isOpen={isMoveDialogOpen}
        onOpenChange={setIsMoveDialogOpen}
      />
    </div>
  );
}
```

## Functionality

### Core Features
- **Folder Selection**: Dropdown interface displaying available folders sorted by creation date
- **Entity Movement**: Supports moving different entity types (answers, searches, shared threads, signals, stories)
- **Folder Creation**: Integrated "New Folder" option for creating folders on-demand
- **Loading States**: Visual feedback during folder loading and move operations
- **Error Handling**: Toast notifications for success and error states
- **Form Validation**: Prevents submission without folder selection

### User Interactions
- Select destination folder from dropdown
- Create new folders inline
- Submit move operation with confirmation
- Cancel operation to close dialog

## State Management

### Local State (useState)
- `selectedFolderId`: Tracks the currently selected destination folder ID

### TanStack Query Integration
- `useFolders`: Fetches available folders with sorting and pagination
- `useUpdateAnswersThread`: Updates answer thread folder assignment
- `useUpdateSavedDeepSearch`: Updates saved search folder assignment
- `useUpdateSavedSharedMemberThread`: Updates shared thread folder assignment
- `useUpdateSavedStory`: Updates story folder assignment
- `useUpdateSignal`: Updates signal folder assignment

### Zustand Store
- `useFileDisplayPanel`: Manages entity actions visibility state

## Side Effects

### API Interactions
- Fetches folders list on component mount
- Updates entity folder assignment based on entity type
- Handles success/error responses with toast notifications

### State Updates
- Resets folder selection when dialog opens
- Updates entity actions visibility after successful move
- Closes dialog after successful operation

## Dependencies

### UI Components
- `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogFooter`, `DialogClose`
- `Select`, `SelectContent`, `SelectItem`, `SelectTrigger`, `SelectValue`
- `Button`, `Typography`

### Custom Hooks
- `useToast`: Toast notification system
- `useFileDisplayPanel`: File display panel state management
- Multiple entity update hooks for different entity types

### Child Components
- `CreateFolderWidget`: Inline folder creation functionality

### Icons
- `PiAddLine`, `PiFolderLine`, `PiFolderTransferLine`

## Integration

### File Display Panel Architecture
The component integrates into the file display panel workflow:
1. **Trigger**: Activated from file context menus or action buttons
2. **State Coordination**: Syncs with file display panel state for entity actions
3. **Entity Management**: Handles multiple entity types through unified interface
4. **Folder System**: Integrates with application's folder management system

### Data Flow
```
User Action → Dialog Open → Fetch Folders → Select Folder → Submit Move → Update Entity → Show Feedback → Close Dialog
```

## Best Practices

### Architecture Adherence
- ✅ **Component Decomposition**: Uses modular dialog structure with clear separation of concerns
- ✅ **State Management**: Proper separation of server state (TanStack Query) and local UI state
- ✅ **Reusability**: Generic entity handling supports multiple entity types
- ✅ **Error Handling**: Comprehensive error states with user feedback

### Performance Optimizations
- Uses `useCallback` for stable function references
- `useMemo` for computed folder selection
- Conditional rendering based on loading states
- Efficient folder list pagination (50 items)

### User Experience
- Clear visual hierarchy with icons and typography
- Loading states prevent user confusion
- Success/error feedback through toast notifications
- Keyboard accessibility through dialog and select components

### Code Quality
- TypeScript interfaces for type safety
- Forward ref for proper component composition
- Consistent error handling patterns
- Clean separation of update logic per entity type