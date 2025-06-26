# FolderEntityItemActionsContainer

## Purpose

The `FolderEntityItemActionsContainer` is a smart container component that manages the state interactions for folder entity actions within the file display panel. It acts as a bridge between the UI presentation layer (`FolderEntityItemActions`) and the application state management, handling action triggers for rename, delete, and move operations on folder entities.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive event handlers for user actions
- Integrates with Zustand store via `useFileDisplayPanel` hook
- Requires client-side state updates for modal controls

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `folderEntity` | `FolderEntity` | Yes | The folder entity object that actions will be performed on |

## Usage Example

```tsx
import { FolderEntityItemActionsContainer } from '@/components/main-layout/file-display-panel';
import { FolderEntity } from '@/lib/types';

// Within a file list component
export const FolderList = ({ folders }: { folders: FolderEntity[] }) => {
  return (
    <div className="folder-list">
      {folders.map((folder) => (
        <div key={folder.id} className="folder-item">
          <span>{folder.name}</span>
          <FolderEntityItemActionsContainer folderEntity={folder} />
        </div>
      ))}
    </div>
  );
};

// In a folder card component
export const FolderCard = ({ folder }: { folder: FolderEntity }) => {
  return (
    <div className="folder-card">
      <div className="folder-info">
        <h3>{folder.name}</h3>
        <p>{folder.itemCount} items</p>
      </div>
      <div className="folder-actions">
        <FolderEntityItemActionsContainer folderEntity={folder} />
      </div>
    </div>
  );
};
```

## Functionality

### Core Features
- **Action State Management**: Coordinates opening of rename, delete, and move-to modals
- **Entity Selection**: Sets the current folder as the selected entity for operations
- **Event Delegation**: Provides optimized event handlers using `useCallback` for performance
- **Modal Coordination**: Manages the visibility state of action-related modal dialogs

### Action Handlers
- `handleDelete`: Prepares folder for deletion and opens delete confirmation modal
- `handleMoveTo`: Prepares folder for move operation and opens destination selector modal  
- `handleRename`: Prepares folder for renaming and opens rename input modal

## State Management

**Zustand Integration** via `useFileDisplayPanel` store:

### State Setters Used
```tsx
setIsOpenRename(boolean)   // Controls rename modal visibility
setIsOpenDelete(boolean)   // Controls delete confirmation modal
setIsOpenMoveTo(boolean)   // Controls move destination modal
setSelectedEntity(entity)  // Sets active entity for operations
```

### State Flow
1. User triggers action → Handler called
2. Selected entity updated → Folder set as target
3. Modal state updated → Relevant modal opens
4. Modal handles operation → State automatically synced

## Side Effects

### State Updates
- Updates global selected entity state when actions are triggered
- Modifies modal visibility states in the file display panel store
- No direct API calls (handled by modal components)

### Performance Optimizations
- Uses `useCallback` to memoize event handlers and prevent unnecessary re-renders
- Minimizes state selector subscriptions by extracting only needed setters

## Dependencies

### Internal Components
- `FolderEntityItemActions` - Presentational component for action UI
- `useFileDisplayPanel` - Zustand hook for file panel state management

### Type Dependencies
- `FolderEntity` - Type definition for folder objects
- `FC` - React functional component type

### Context Integration
- File Display Panel context for global file management state

## Integration

### Architecture Role
```
File Display Panel
├── Folder List/Grid
│   └── Folder Item
│       ├── Folder Info Display
│       └── FolderEntityItemActionsContainer ← This Component
│           └── FolderEntityItemActions (UI)
└── Modal Layer
    ├── Rename Modal
    ├── Delete Confirmation Modal
    └── Move To Modal
```

### Data Flow
1. **Props In**: Receives `FolderEntity` from parent list/grid component
2. **State Out**: Updates global state for modal management and entity selection
3. **Events Up**: Triggers state changes that affect modal components
4. **UI Down**: Passes handlers to presentational action component

## Best Practices

### Architecture Adherence
✅ **Container Pattern**: Separates state logic from UI presentation  
✅ **Client Component Usage**: Appropriately uses 'use client' for interactive features  
✅ **Zustand Integration**: Follows state management patterns with targeted selectors  
✅ **Component Decomposition**: Acts as focused container without UI responsibilities  

### Performance Patterns
✅ **Memoized Handlers**: Uses `useCallback` to prevent unnecessary re-renders  
✅ **Minimal State Selection**: Extracts only required state setters  
✅ **Event Delegation**: Centralizes action logic in container layer  

### Integration Patterns
✅ **Props Interface**: Clean, focused interface with required folder entity  
✅ **State Coordination**: Proper coordination between entity selection and modal states  
✅ **Separation of Concerns**: Container handles state, child handles presentation  

This component exemplifies the container/presentational pattern, providing clean separation between state management and UI rendering while maintaining optimal performance through proper memoization strategies.