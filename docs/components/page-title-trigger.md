# PageTitleTrigger Component Documentation

## Purpose

The `PageTitleTrigger` component provides an interactive page title interface that displays folder information and manages folder-related actions through a bottom sheet on mobile devices. It serves as the primary navigation element for folder pages, allowing users to view folder metadata and access contextual actions like rename, move, and delete operations.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive state through click handlers and sheet visibility
- Integrates with Zustand store (`useFileDisplayPanel`) for client-side state management
- Handles user interactions and dynamic UI updates
- Requires browser APIs for sheet animations and touch interactions

## Props Interface

### PageTitleTrigger Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `label` | `string` | Yes | The text label to display in the trigger button |
| `className` | `string` | No | Additional CSS classes for styling customization |
| `disabled` | `boolean` | No | Whether the trigger button is disabled (hides dropdown arrow) |
| `...other` | `ComponentPropsWithoutRef<'button'>` | No | All other standard button HTML attributes |

### PageTitleTriggerWithSheet Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | Additional CSS classes for styling customization |
| `folderEntity` | `FolderEntity` | Yes | The folder entity object containing folder data and metadata |
| `header` | `ReactNode` | Yes | Header content to display in the sheet above the folder information |

## Usage Example

```tsx
import { PageTitleTrigger, PageTitleTriggerWithSheet } from '@/components/main-layout/navigation/page-title/page-title-trigger';

// Basic trigger usage
function SimplePage() {
  return (
    <PageTitleTrigger
      label="My Folder"
      onClick={handleClick}
      className="custom-trigger-styles"
    />
  );
}

// Full sheet integration
function FolderPage({ folder }: { folder: FolderEntity }) {
  return (
    <div className="page-header">
      <PageTitleTriggerWithSheet
        folderEntity={folder}
        header={
          <div className="flex items-center gap-2">
            <FolderIcon />
            <Typography variant="headingMedium">
              {folder.name}
            </Typography>
          </div>
        }
        className="page-title-trigger"
      />
    </div>
  );
}
```

## Functionality

### Core Features

- **Interactive Trigger**: Displays folder name with dropdown indicator for user interaction
- **Bottom Sheet Interface**: Mobile-optimized sheet that slides up from bottom with folder actions
- **Folder Metadata Display**: Shows creation timestamp with human-readable relative formatting
- **Contextual Actions**: Provides access to signal creation, move, rename, and delete operations
- **Conditional Actions**: Hides rename option for story-type entities based on business rules

### Action Management

- **Signal Creation**: Quick access to create new signals within the folder
- **Move Operations**: Transfer folder to different locations in the hierarchy
- **Rename Functionality**: Edit folder name (disabled for story entities)
- **Delete Operations**: Remove folder with confirmation workflows
- **Cancel Action**: Close sheet without performing any operations

## State Management

### Zustand Store Integration

Uses `useFileDisplayPanel` store for managing:

```tsx
// State selectors
const isOpenPageTitleMenu = useFileDisplayPanel(state => state.isOpenPageTitleMenu);
const selectedEntity = useFileDisplayPanel(state => state.selectedEntity);

// Action dispatchers
const setIsOpenPageTitleMenu = useFileDisplayPanel(state => state.setIsOpenPageTitleMenu);
const setSelectedEntity = useFileDisplayPanel(state => state.setSelectedEntity);
```

### State Cleanup

- Implements cleanup effect to reset dialog states on component unmount
- Prevents memory leaks and stale state issues in navigation scenarios

## Side Effects

### Lifecycle Management

- **Mount Effect**: Registers cleanup function to reset modal states
- **Unmount Cleanup**: Automatically closes any open dialogs when component unmounts

### User Interactions

- **Sheet Opening**: Updates global state to show bottom sheet interface
- **Entity Selection**: Sets the current folder as selected entity for subsequent operations
- **Action Triggers**: Initiates specific workflows (rename, move, delete) through state updates

## Dependencies

### UI Components

- `Button` - For cancel action and interactive elements
- `Sheet` components - Bottom sheet implementation for mobile interface
- `DropdownMenuItemBase` - Consistent styling for action items
- `Typography` - Text rendering with design system compliance

### Feature Components

- `DeleteEntityWidget` - Handles folder deletion workflows
- `MoveToFolderWidget` - Manages folder relocation operations
- `RenameEntityWidget` - Provides folder renaming functionality
- `SignalCreateButton` - Quick signal creation interface

### External Libraries

- `date-fns/formatDistanceToNow` - Human-readable time formatting
- Various Phosphor Icons for visual action indicators

## Integration

### Navigation Architecture

Integrates with the main layout navigation system as a page-level component:

```
main-layout/
├── navigation/
│   ├── page-title/
│   │   ├── page-title-trigger.tsx  ← This component
│   │   └── signal-create-button.tsx
│   └── file-display-panel/
│       ├── delete-entity-widget.tsx
│       ├── move-to-folder-widget.tsx
│       └── rename-entity-widget.tsx
```

### State Flow

1. User clicks trigger → Opens bottom sheet
2. User selects action → Updates selectedEntity and opens specific widget
3. Widget completes operation → Returns to closed state
4. Component unmounts → Cleanup resets all states

## Best Practices

### Architecture Adherence

- **✅ Client Component Usage**: Appropriately uses client-side rendering for interactive features
- **✅ Component Decomposition**: Separates basic trigger from full sheet implementation
- **✅ State Management**: Leverages Zustand for cross-component state coordination
- **✅ Reusability**: Provides both basic and enhanced versions for different use cases

### Implementation Patterns

- **Forward Ref**: Basic trigger properly forwards refs for parent component control
- **Conditional Rendering**: Appropriately shows/hides features based on entity type
- **Memory Management**: Implements proper cleanup to prevent state leaks
- **Accessibility**: Uses semantic button elements and proper ARIA implications through Sheet component

### Integration Guidelines

- Use `PageTitleTrigger` for simple dropdown interfaces without complex actions
- Use `PageTitleTriggerWithSheet` for full folder management interfaces
- Ensure `folderEntity` contains complete metadata for proper timestamp display
- Provide meaningful header content that matches the folder context