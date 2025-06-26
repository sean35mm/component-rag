# RenameFolderWidget Component

## Purpose

The `RenameFolderWidget` component provides a modal dialog interface for renaming folders in the file management system. It offers a controlled form experience with validation, error handling, and real-time feedback to users when updating folder names.

## Component Type

**Client Component** - Uses `'use client'` directive because it requires:
- Browser-specific APIs for form handling and user interactions
- State management with React hooks (`useState`, `useEffect`)
- Event handlers for form submission and dialog controls
- Real-time form validation and user feedback

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | `boolean` | Yes | Controls the visibility state of the rename dialog |
| `onOpenChange` | `(open: boolean) => void` | Yes | Callback function triggered when dialog open state changes |
| `folder` | `Partial<Folder>` | Yes | Folder object containing at minimum the `id` and `name` properties |

## Usage Example

```tsx
import { RenameFolderWidget } from '@/components/main-layout/file-display-panel/rename-folder-widget';

function FolderManagement() {
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);

  const handleRenameClick = (folder: Folder) => {
    setSelectedFolder(folder);
    setIsRenameOpen(true);
  };

  return (
    <div>
      <Button onClick={() => handleRenameClick(currentFolder)}>
        Rename Folder
      </Button>
      
      {selectedFolder && (
        <RenameFolderWidget
          isOpen={isRenameOpen}
          onOpenChange={setIsRenameOpen}
          folder={selectedFolder}
        />
      )}
    </div>
  );
}
```

## Functionality

### Core Features
- **Modal Dialog Interface**: Provides a focused, overlay-based editing experience
- **Form Validation**: Real-time validation with Zod schema ensuring folder names are 2-50 characters
- **Auto-focus**: Automatically focuses the input field when the dialog opens
- **Pre-populated Values**: Shows current folder name as the default input value
- **Loading States**: Displays "Renaming..." feedback during submission
- **Error Handling**: Shows toast notifications for both success and error scenarios

### User Interactions
- **Cancel Action**: Closes dialog without saving changes
- **Save Action**: Validates input and submits rename request
- **Form Reset**: Automatically resets form state when dialog opens

## State Management

### Local State
- **`isLocalPending`**: Tracks local loading state for UI feedback
- **React Hook Form**: Manages form state, validation, and submission

### External State
- **TanStack Query**: Uses `useUpdateFolder` mutation for server state management
- **Zustand (File Display Panel)**: Updates `isActiveFolderActions` state in global context
- **Toast System**: Manages notification state for user feedback

## Side Effects

### API Interactions
- **Folder Update**: Calls `updateFolder` mutation with new folder name
- **Optimistic Updates**: Updates UI immediately while server request is pending

### Context Updates
- **File Display Panel**: Resets folder actions state after successful rename
- **Toast Notifications**: Triggers success/error messages based on operation outcome

### Form Management
- **Auto-reset**: Resets form state when dialog opens
- **Validation**: Real-time validation feedback during user input

## Dependencies

### UI Components
- `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogFooter`, `DialogClose`
- `Button`, `TextInput`, `Typography`
- `PiEditLine` icon component

### Hooks & Utilities
- `useForm`, `zodResolver` for form management
- `useToast` for user notifications
- `useFileDisplayPanel` for global state access
- `useUpdateFolder` for server mutations

### Type Definitions
- `Folder` type from application types
- `folderSchema` Zod validation schema

## Integration

### File Management System
- Integrates with the broader file display panel architecture
- Coordinates with folder listing and navigation components
- Maintains consistency with file system state management

### Context Integration
- Reads from and updates file display panel global state
- Coordinates with parent components through controlled props pattern
- Manages modal state through external control props

## Best Practices

### Architecture Adherence
- ✅ **Client Component Usage**: Appropriately uses client-side rendering for interactive features
- ✅ **Form Management**: Implements React Hook Form with Zod validation following our patterns
- ✅ **State Management**: Uses TanStack Query for server state, local state for UI concerns
- ✅ **Component Composition**: Leverages UI components from `/ui/` directory
- ✅ **Controlled Components**: Implements controlled pattern for modal visibility

### Code Quality
- ✅ **TypeScript Integration**: Full type safety with proper interface definitions
- ✅ **Error Handling**: Comprehensive error handling with user feedback
- ✅ **Accessibility**: Proper ARIA attributes and semantic HTML structure
- ✅ **Performance**: Efficient re-rendering with proper dependency arrays
- ✅ **Separation of Concerns**: Clear separation between UI logic and business logic

### Export Pattern
```tsx
// Named exports for both schema and component
export { folderSchema, RenameFolderWidget };
```

The component follows our architectural guidelines by maintaining clear separation between UI and business logic, using appropriate state management tools, and providing a reusable interface that integrates seamlessly with the larger file management system.