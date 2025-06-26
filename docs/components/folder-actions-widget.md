# FolderActionsWidget Component Documentation

## Purpose

The `FolderActionsWidget` is a bottom sheet modal component that provides contextual actions for folder management within the file display panel. It allows users to rename and delete folders through an intuitive mobile-friendly interface that slides up from the bottom of the screen.

## Component Type

**Client Component** - This component uses the `'use client'` directive (implicitly through state management hooks) because it:
- Manages interactive UI state through Zustand store
- Handles user interactions (clicks, modal open/close)
- Renders conditionally based on client-side state
- Provides real-time feedback for user actions

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onRenameFolder` | `(folder: FdpFolder) => void` | Optional | Callback function triggered when user selects rename action |
| `onDeleteFolder` | `(folder: FdpFolder) => void` | Optional | Callback function triggered when user selects delete action |
| `disableRemove` | `boolean` | Optional | When true, hides the delete action option (useful for protected folders) |

## Usage Example

```tsx
import { FolderActionsWidget } from '@/components/main-layout/file-display-panel/folder-actions-widget';
import { FdpFolder } from '@/lib/stores';

function FileManager() {
  const handleRenameFolder = (folder: FdpFolder) => {
    // Open rename modal or inline editing
    console.log('Renaming folder:', folder.name);
  };

  const handleDeleteFolder = (folder: FdpFolder) => {
    // Show confirmation dialog and delete
    if (confirm(`Delete folder "${folder.name}"?`)) {
      // Perform deletion logic
    }
  };

  return (
    <div>
      {/* Other file manager UI */}
      
      <FolderActionsWidget
        onRenameFolder={handleRenameFolder}
        onDeleteFolder={handleDeleteFolder}
        disableRemove={false}
      />
    </div>
  );
}

// For protected system folders
<FolderActionsWidget
  onRenameFolder={handleRenameFolder}
  disableRemove={true} // Hide delete option
/>
```

## Functionality

### Core Features
- **Bottom Sheet Modal**: Slides up from bottom with smooth animations
- **Folder Context Display**: Shows selected folder name with folder icon
- **Rename Action**: Provides rename functionality with edit icon
- **Conditional Delete**: Shows delete action unless disabled via props
- **Cancel Action**: Allows users to dismiss the modal without taking action

### User Interactions
- Modal opens/closes based on file display panel state
- Click actions trigger parent component callbacks
- Visual feedback with appropriate icons and styling
- Error state styling for destructive delete action

## State Management

**Zustand Store Integration** - Uses `useFileDisplayPanel` store for:
- `isActiveFolderActions`: Controls modal open/close state
- `setIsActiveFolderActions`: Function to toggle modal visibility
- `selectedFolder`: Current folder context for actions

```tsx
// State accessed from file display panel store
const isActiveFolderActions = useFileDisplayPanel(state => state.isActiveFolderActions);
const selectedFolder = useFileDisplayPanel(state => state.selectedFolder);
```

## Side Effects

- **Modal State Changes**: Updates global file display panel state when opening/closing
- **Parent Callbacks**: Triggers parent component functions for rename/delete operations
- **UI State Synchronization**: Automatically syncs with selected folder changes

## Dependencies

### UI Components
- `Sheet`, `SheetContent`, `SheetTitle` - Modal/drawer functionality
- `Button` - Cancel action button
- `Typography` - Text styling and semantic markup

### Icons
- `PiFolder5Fill` - Folder representation in header
- `PiEditLine` - Rename action indicator
- `PiDeleteBinLine` - Delete action indicator

### Context & State
- `useFileDisplayPanel` - File management state context
- `FdpFolder` - Folder data type from store

### Styling
- Tailwind CSS classes for responsive design
- Custom design system colors (pgText, pgIcon, pgStateError)

## Integration

### File Display Panel Architecture
```
FileDisplayPanel
├── FolderList
├── FileList
└── FolderActionsWidget  ← This component
```

### State Flow
1. User selects folder in file list/folder list
2. `selectedFolder` updates in Zustand store
3. User triggers folder actions (long press, context menu)
4. `isActiveFolderActions` set to true
5. Modal opens with current folder context
6. User selects action, parent callbacks handle business logic

## Best Practices

### ✅ Architectural Adherence
- **Separation of Concerns**: UI logic separated from business logic via callbacks
- **State Management**: Proper use of Zustand for global UI state
- **Component Decomposition**: Flat structure using Sheet, Button, Typography building blocks
- **Conditional Rendering**: Smart handling of optional features (disableRemove)

### ✅ UX Patterns
- **Mobile-First Design**: Bottom sheet pattern for touch interfaces
- **Visual Hierarchy**: Clear action differentiation with colors and icons
- **Accessibility**: Proper semantic markup with SheetTitle and Typography
- **Error Prevention**: Conditional rendering prevents invalid actions

### ✅ Code Organization
- **Type Safety**: Proper TypeScript interfaces and type imports
- **Reusable Components**: Built from composable UI primitives
- **Consistent Styling**: Design system color usage throughout
- **Clean Dependencies**: Clear separation between UI, state, and business logic