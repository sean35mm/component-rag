# CreateFolderWidget Component Documentation

## Purpose

The `CreateFolderWidget` component provides a dialog-based interface for creating new folders in the file system. It encapsulates the complete folder creation workflow, including form validation, user feedback, and error handling. The component is designed to be used within the file display panel of the main layout, enabling users to organize their files into folders.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages local state for dialog visibility and form submission
- Handles form interactions and user input
- Requires access to browser APIs for form handling
- Uses React hooks extensively (useState, useEffect, useForm)

## Props Interface

### CreateFolderWidget

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `ReactNode` | Yes | The trigger element that opens the folder creation dialog |

### CreateFolderWidgetWithTrigger

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | Additional CSS classes for styling the trigger button |
| `disabled` | `boolean` | No | Whether the trigger button is disabled |
| `...other` | `ButtonHTMLAttributes<HTMLButtonElement>` | No | Standard HTML button attributes |

## Usage Example

```tsx
import { CreateFolderWidget, CreateFolderWidgetWithTrigger } from '@/components/main-layout/file-display-panel/create-folder-widget';
import { Button } from '@/components/ui/button';

// Using CreateFolderWidget with custom trigger
function FilePanel() {
  return (
    <div className="file-panel">
      <CreateFolderWidget>
        <Button variant="primaryFilled">
          Create New Folder
        </Button>
      </CreateFolderWidget>
    </div>
  );
}

// Using the pre-built trigger component
function FileToolbar() {
  return (
    <div className="toolbar">
      <CreateFolderWidgetWithTrigger 
        className="custom-create-button"
        title="Create new folder"
      />
    </div>
  );
}
```

## Functionality

### Core Features
- **Dialog-based Interface**: Modal dialog for folder creation with proper focus management
- **Form Validation**: Real-time validation using Zod schema with meaningful error messages
- **User Feedback**: Toast notifications for success and error states
- **Loading States**: Visual feedback during folder creation process
- **Auto-focus**: Automatically focuses the name input when dialog opens
- **Form Reset**: Clears form data when dialog opens or after successful creation

### Validation Rules
- **Minimum Length**: Folder name must be at least 2 characters
- **Maximum Length**: Folder name cannot exceed 50 characters
- **Required Field**: Folder name is mandatory

### User Experience
- **Responsive Design**: Adapts to different screen sizes (lg: breakpoints)
- **Accessibility**: Proper ARIA labels, keyboard navigation, and focus management
- **Visual Icons**: Contextual icons for better user understanding

## State Management

### Local State (useState)
- `isOpen`: Controls dialog visibility
- `isLocalPending`: Tracks local submission state for UI feedback

### Form State (React Hook Form)
- Form validation and submission handling
- Field registration and error management
- Form reset functionality

### Server State (TanStack Query)
- `useCreateFolder`: Mutation hook for folder creation API calls
- Automatic cache invalidation and optimistic updates
- Built-in loading and error states

## Side Effects

### API Interactions
- **Folder Creation**: Calls the create folder mutation with form data
- **Error Handling**: Catches and displays API errors to users

### User Interface Effects
- **Toast Notifications**: Shows success/error messages
- **Dialog Management**: Opens/closes dialog based on user actions
- **Form Reset**: Clears form when dialog state changes

### Focus Management
- **Auto-focus**: Input field receives focus when dialog opens
- **Focus Prevention**: Prevents auto-focus on close to maintain UX flow

## Dependencies

### UI Components
- `Dialog` family: DialogContent, DialogHeader, DialogTitle, etc.
- `Button`: For action buttons
- `TextInput`: For folder name input
- `Typography`: For consistent text styling

### Icons
- `IconLibraryAddFolder`: Folder creation icon
- `PiFolderLine`: Folder input icon

### Hooks & Utilities
- `useForm`: Form state management
- `useToast`: User feedback system
- `useAccessToken`: Authentication state
- `useCreateFolder`: Folder creation mutation
- `cn`: Utility for className merging

### Validation
- `zod`: Schema validation
- `@hookform/resolvers/zod`: Form validation integration

## Integration

### File Display Panel Integration
The component is specifically designed for the file display panel within the main layout:

```
main-layout/
├── file-display-panel/
│   ├── create-folder-widget.tsx  ← This component
│   ├── file-list.tsx
│   └── toolbar.tsx
```

### Authentication Integration
- `CreateFolderWidgetWithTrigger` automatically handles authentication checks
- Only renders for authorized and verified users
- Integrates with the application's access control system

### Query Integration
- Works with the application's TanStack Query setup
- Automatically updates the file list cache after folder creation
- Handles loading states and error boundaries

## Best Practices

### Architecture Adherence
✅ **Client Component Usage**: Appropriately uses client component for interactive functionality  
✅ **Component Decomposition**: Provides both base widget and trigger variants for flexibility  
✅ **Form Handling**: Uses React Hook Form with Zod validation per guidelines  
✅ **State Management**: Leverages TanStack Query for server state, local state for UI concerns  

### Code Quality
✅ **TypeScript**: Fully typed with proper interfaces and type inference  
✅ **Error Handling**: Comprehensive error catching and user feedback  
✅ **Accessibility**: Proper focus management and ARIA attributes  
✅ **Reusability**: Accepts children prop for custom trigger elements  

### Performance
✅ **Lazy Loading**: Dialog content only renders when needed  
✅ **Form Optimization**: Efficient form reset and validation  
✅ **Mutation Caching**: Leverages TanStack Query's caching mechanisms  

### User Experience
✅ **Loading States**: Clear visual feedback during operations  
✅ **Error Messages**: Descriptive error messages for users  
✅ **Responsive Design**: Works across different screen sizes  
✅ **Keyboard Navigation**: Full keyboard accessibility support