# RenameFilterDialog Component

## Purpose

The `RenameFilterDialog` is a reusable modal dialog component specifically designed for renaming filters within the application. It provides a form-based interface with validation for collecting a new filter name, featuring a clean UI with proper error handling and form state management.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Interactive form handling with React Hook Form
- Real-time form validation and error states
- Event handlers for user interactions (submit, cancel, dialog state changes)
- Browser-side form submission and validation logic

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | ✅ | The title displayed in the dialog header |
| `isOpen` | `boolean` | ✅ | Controls the dialog's open/closed state |
| `onOpenChange` | `(isOpen: boolean) => void` | ✅ | Callback fired when dialog open state changes |
| `onSubmit` | `(data: RenameDialogFormData) => Promise<void> \| void` | ✅ | Handler for form submission with validated data |
| `saveButtonText` | `string` | ✅ | Text displayed on the save/submit button |

## Usage Example

```tsx
import { useState } from 'react';
import { RenameFilterDialog } from '@/components/filters/rename-filter-dialog';

function FilterManagement() {
  const [isRenameOpen, setIsRenameOpen] = useState(false);

  const handleRenameFilter = async (data: { name: string }) => {
    try {
      await updateFilter(currentFilterId, { name: data.name });
      setIsRenameOpen(false);
      // Show success notification
    } catch (error) {
      // Handle error
      console.error('Failed to rename filter:', error);
    }
  };

  return (
    <>
      <Button onClick={() => setIsRenameOpen(true)}>
        Rename Filter
      </Button>
      
      <RenameFilterDialog
        title="Rename Filter"
        isOpen={isRenameOpen}
        onOpenChange={setIsRenameOpen}
        onSubmit={handleRenameFilter}
        saveButtonText="Save Changes"
      />
    </>
  );
}
```

## Functionality

### Core Features
- **Form Validation**: Implements Zod schema validation with 2-50 character length requirements
- **Error Display**: Shows validation errors with contextual messaging
- **Loading States**: Disables form controls during submission to prevent double-submission
- **Auto-reset**: Automatically clears form data when dialog closes
- **Accessibility**: Proper ARIA attributes and semantic HTML structure

### Form Behavior
- Real-time validation with error display only after user interaction (`isDirty` check)
- Prevents submission with invalid data
- Handles both synchronous and asynchronous submission callbacks
- Maintains form state throughout dialog lifecycle

## State Management

**Local State Only** - Uses React Hook Form for internal form state management:
- Form data, validation errors, and submission states managed by `useForm`
- Dialog open/close state controlled by parent component
- No external state management needed (TanStack Query or Zustand)
- Form resets automatically when dialog closes via `useEffect`

## Side Effects

### Form Management
- **Form Reset**: Automatically resets form when dialog closes
- **Validation**: Real-time form validation on user input
- **Submission Handling**: Manages async submission states and loading indicators

### Event Handling
- Dialog state changes propagated to parent via `onOpenChange`
- Form submission with validated data passed to parent via `onSubmit`

## Dependencies

### UI Components
- `Dialog`, `DialogContent`, `DialogFooter`, `DialogHeader`, `DialogTitle` - Modal structure
- `Button` - Action buttons (Cancel/Save)
- `TextInput` - Name input field
- `Typography` - Text styling and error messages

### Form & Validation
- `react-hook-form` - Form state management
- `zod` - Schema validation
- `@hookform/resolvers/zod` - Integration between RHF and Zod

### Icons
- `PiFilter2Line` - Filter icon for dialog header

## Integration

### Application Architecture
- **Domain Component**: Lives in `/components/filters/` following domain-based organization
- **Reusable Pattern**: Can be used across different filter management contexts
- **Parent Control**: Dialog state and submission handling controlled by parent components
- **Form Integration**: Follows standard React Hook Form + Zod validation pattern

### Usage Contexts
- Filter creation workflows
- Filter editing interfaces
- Any scenario requiring name input with validation

## Best Practices

### Architecture Adherence
✅ **Client Component Usage**: Appropriately uses client component for interactive form functionality  
✅ **Component Decomposition**: Single responsibility focused on rename dialog functionality  
✅ **Form Validation**: Implements React Hook Form with Zod following established patterns  
✅ **Reusability**: Generic props interface allows use across different rename scenarios  

### Implementation Patterns
✅ **Controlled Component**: Dialog state managed by parent component  
✅ **Error Handling**: Proper validation error display with user-friendly messages  
✅ **Accessibility**: Semantic HTML structure with proper ARIA attributes  
✅ **TypeScript**: Full type safety with exported schema and form data types  

### State Management
✅ **Appropriate Scope**: Uses local form state without unnecessary external state management  
✅ **Clean Lifecycle**: Automatic form reset on dialog close prevents stale state  
✅ **Async Handling**: Supports both sync and async submission patterns