# EntityActionsWidget Component

## Purpose

The EntityActionsWidget is a bottom sheet modal component that provides contextual actions for selected entities in the file display panel. It presents users with quick actions like move, rename, and delete for various entity types (signals, answers, searches, stories, etc.) in a mobile-friendly bottom sheet interface.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive state through Zustand store
- Handles user interactions and click events
- Requires real-time state synchronization with the file display panel context

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onMoveTo` | `(entity: FolderEntity) => void` | Optional | Callback function triggered when user selects "Move to..." action |
| `onRename` | `(entity: FolderEntity) => void` | Optional | Callback function triggered when user selects "Rename" action |
| `onDelete` | `(entity: FolderEntity) => void` | Optional | Callback function triggered when user selects "Delete" action |

## Usage Example

```tsx
import { EntityActionsWidget } from '@/components/main-layout/file-display-panel/entity-actions-widget';
import { FolderEntity } from '@/lib/types';

function FileDisplayPanel() {
  const handleMoveTo = (entity: FolderEntity) => {
    // Open move dialog or navigate to folder selection
    console.log('Moving entity:', entity.name);
  };

  const handleRename = (entity: FolderEntity) => {
    // Open rename dialog with current entity name
    console.log('Renaming entity:', entity.name);
  };

  const handleDelete = (entity: FolderEntity) => {
    // Show confirmation dialog and delete entity
    console.log('Deleting entity:', entity.name);
  };

  return (
    <div>
      {/* Other file display components */}
      <EntityActionsWidget
        onMoveTo={handleMoveTo}
        onRename={handleRename}
        onDelete={handleDelete}
      />
    </div>
  );
}
```

## Functionality

### Core Features
- **Contextual Actions**: Displays appropriate actions for the currently selected entity
- **Entity Type Icons**: Shows type-specific icons for different entity types (signals, answers, searches, stories)
- **Bottom Sheet Interface**: Mobile-optimized slide-up modal for action selection
- **Action Categories**: Organizes actions into move, rename, and delete operations
- **Visual Feedback**: Uses distinct styling for destructive actions (delete in red)

### Action Types
- **Move To**: Allows relocating entities to different folders
- **Rename**: Enables editing entity names
- **Delete**: Provides entity removal with visual warning (red styling)
- **Cancel**: Closes the action sheet without performing any action

## State Management

**Zustand Store Integration**:
- `isActiveEntityActions`: Controls the visibility of the actions sheet
- `setIsActiveEntityActions`: Toggles the sheet open/closed state  
- `selectedEntity`: Current entity for which actions are being displayed

The component relies entirely on the `useFileDisplayPanel` Zustand store for state management, ensuring consistent state across the file display panel ecosystem.

## Side Effects

- **Sheet Visibility**: Automatically shows/hides based on `isActiveActions` state
- **Action Callbacks**: Triggers parent-provided callback functions when actions are selected
- **State Updates**: Closes the sheet when Cancel button is clicked

## Dependencies

### Internal Dependencies
- **Contexts**: `useFileDisplayPanel` hook for accessing file panel state
- **UI Components**: `Sheet`, `SheetContent`, `SheetTitle`, `Button`, `Typography`
- **Icons**: Various entity type icons and action icons
- **Types**: `FolderEntity`, `TabEntityTypeMapper` from type definitions

### External Dependencies
- **React**: Core component functionality
- **Zustand**: State management through custom hook

## Integration

### File Display Panel Architecture
The EntityActionsWidget integrates as a overlay component within the file display panel:

```
FileDisplayPanel
├── EntityList
├── EntitySelectionHandler
└── EntityActionsWidget (overlay)
```

### State Flow
1. User selects an entity in the file display panel
2. `selectedEntity` state is updated in Zustand store
3. `isActiveEntityActions` is set to true
4. EntityActionsWidget renders with current entity context
5. User actions trigger callbacks to parent components

## Best Practices

### Architectural Adherence
- ✅ **Component Decomposition**: Flat structure with clear separation of concerns
- ✅ **State Management**: Proper use of Zustand for client-side state
- ✅ **Reusability**: Generic props interface allows flexible callback handling
- ✅ **UI Consistency**: Uses design system components (`Sheet`, `Button`, `Typography`)

### Implementation Patterns
- **Conditional Rendering**: Only renders content when `selectedEntity` exists
- **Type Safety**: Full TypeScript integration with proper type mapping
- **Accessibility**: Uses semantic HTML structure with proper sheet components
- **Error Prevention**: Optional callbacks prevent crashes when handlers aren't provided

### Performance Considerations
- **Minimal Re-renders**: State selectors are optimized for specific state slices
- **Lazy Loading**: Content only renders when sheet is active
- **Event Handling**: Efficient callback pattern prevents unnecessary re-renders