# RenameDialog Component

## Purpose

The `RenameDialog` component provides a reusable modal interface for renaming source groups within the search customization settings. It presents users with a form-based dialog that validates input and handles the rename operation through a callback pattern.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages form state with React Hook Form
- Handles user interactions (form submission, dialog controls)
- Uses browser-specific features like auto-focus
- Requires event handlers and form validation feedback

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | Yes | The dialog title displayed in the header |
| `isOpen` | `boolean` | Yes | Controls whether the dialog is visible |
| `onOpenChange` | `(isOpen: boolean) => void` | Yes | Callback fired when dialog open state changes |
| `onSubmit` | `(data: RenameDialogFormData) => Promise<void>` | Yes | Async callback fired when form is submitted with valid data |
| `saveButtonText` | `string` | Yes | Text displayed on the save/submit button |
| `defaultValue` | `string` | No | Initial value for the name input field |

## Usage Example

```tsx
import { useState } from 'react';
import { RenameDialog, type RenameDialogFormData } from '@/components/settings/search-customization/source-group-drawer/rename-dialog';

function SourceGroupManager() {
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(null);

  const handleRename = async (data: RenameDialogFormData) => {
    try {
      await renameSourceGroup(currentGroup.id, data.name);
      setIsRenameOpen(false);
      // Refresh data or update local state
    } catch (error) {
      console.error('Failed to rename source group:', error);
    }
  };

  return (
    <>
      <Button onClick={() => setIsRenameOpen(true)}>
        Rename Group
      </Button>
      
      <RenameDialog
        title="Rename Source Group"
        isOpen={isRenameOpen}
        onOpenChange={setIsRenameOpen}
        onSubmit={handleRename}
        saveButtonText="Save Changes"
        defaultValue={currentGroup?.name}
      />
    </>
  );
}
```

## Functionality

### Core Features
- **Form Validation**: Validates source group names with 2-50 character requirement
- **Auto-focus**: Automatically focuses the input field when dialog opens
- **Loading States**: Disables form controls during submission
- **Error Display**: Shows validation errors inline with form field
- **Form Reset**: Clears form state when dialog closes

### User Interactions
- **Cancel**: Closes dialog without saving changes
- **Submit**: Validates input and calls onSubmit callback
- **Outside Click**: Can close dialog via onOpenChange prop
- **Escape Key**: Standard dialog escape behavior

## State Management

### Local State (React Hook Form)
- **Form Data**: Manages the `name` field with validation
- **Form State**: Tracks `isSubmitting`, `errors`, and `isDirty` states
- **Reset Logic**: Automatically resets form when dialog closes

### External State
- Dialog visibility controlled by parent component through `isOpen` prop
- Actual rename operation handled by parent through `onSubmit` callback

## Side Effects

### Form Management
- **Auto-reset**: Form resets when `isOpen` becomes false
- **Validation**: Real-time validation with Zod schema
- **Focus Management**: Auto-focuses input field on mount

### Parent Communication
- **Submit Handler**: Calls parent's `onSubmit` with validated form data
- **State Updates**: Notifies parent of dialog state changes via `onOpenChange`

## Dependencies

### UI Components
- `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`
- `Button`, `TextInput`, `Typography`
- `PiGlobalFill` icon component

### Form Libraries
- `react-hook-form` for form state management
- `@hookform/resolvers/zod` for validation integration
- `zod` for schema validation

### External Dependencies
- React hooks (`useCallback`, `useEffect`)

## Integration

### Application Architecture
- **Settings Flow**: Part of search customization settings workflow
- **Source Group Management**: Specifically handles renaming operations within source group drawer
- **Modal Pattern**: Follows application's dialog/modal patterns for user interactions

### Parent Component Integration
- Designed to be controlled by parent components
- Delegates actual business logic (API calls) to parent
- Maintains separation of concerns between UI and data operations

## Best Practices

### Architecture Adherence
- ✅ **Proper Client Component Usage**: Uses client directive only when needed for interactivity
- ✅ **Component Decomposition**: Flat structure, reuses UI components from `/ui/` directory
- ✅ **Form Management**: Implements React Hook Form with Zod validation pattern
- ✅ **Reusability**: Generic enough to be reused for different rename operations

### Implementation Patterns
- ✅ **Controlled Component**: Fully controlled by parent props
- ✅ **TypeScript Integration**: Exports schema and inferred types for type safety
- ✅ **Error Handling**: Graceful error display and loading state management
- ✅ **Accessibility**: Proper dialog semantics and keyboard navigation

### State Management
- ✅ **Local State Only**: Uses React Hook Form for form-specific state
- ✅ **Parent Delegation**: Delegates business logic to parent components
- ✅ **Clean Separation**: UI state separate from application/server state