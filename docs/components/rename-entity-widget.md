# RenameEntityWidget Component

## Purpose

The `RenameEntityWidget` is a modal dialog component that allows users to rename various types of entities (signals, answers, searches, stories, and shared member threads) within the file display panel. It provides a unified interface for editing entity names with form validation and real-time updates across the application.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages form state with React Hook Form
- Handles user interactions and form submissions
- Uses hooks for state management and API calls
- Requires browser APIs for form validation and toast notifications

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | `boolean` | Yes | Controls the visibility state of the rename dialog |
| `onOpenChange` | `(open: boolean) => void` | Yes | Callback function triggered when dialog open state changes |
| `entity` | `FolderEntity` | Yes | The entity object containing type, entityId, and current name to be renamed |

## Usage Example

```tsx
import { RenameEntityWidget } from '@/components/main-layout/file-display-panel/rename-entity-widget';
import { useState } from 'react';

function FileDisplayPanel() {
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);

  const handleRename = (entity) => {
    setSelectedEntity(entity);
    setIsRenameOpen(true);
  };

  return (
    <div>
      {/* Entity list with rename buttons */}
      <button onClick={() => handleRename(entity)}>
        Rename Entity
      </button>

      <RenameEntityWidget
        isOpen={isRenameOpen}
        onOpenChange={setIsRenameOpen}
        entity={selectedEntity}
      />
    </div>
  );
}
```

## Functionality

- **Entity Type Support**: Handles renaming for 5 different entity types (SIGNAL, ANSWER, SEARCH, STORY, SHARED_MEMBER_THREAD)
- **Form Validation**: Validates entity names with 2-50 character requirements using Zod schema
- **Visual Feedback**: Displays appropriate icons for each entity type
- **Auto-focus**: Automatically focuses the input field when dialog opens
- **Loading States**: Shows loading indicator during rename operations
- **Error Handling**: Displays success/error toast notifications
- **Tab Synchronization**: Updates corresponding tab names when entities are renamed

## State Management

### TanStack Query
- **Multiple Update Mutations**: Uses specific update hooks for each entity type:
  - `useUpdateAnswersThread`
  - `useUpdateSavedDeepSearch` 
  - `useUpdateSavedSharedMemberThread`
  - `useUpdateSavedStory`
  - `useUpdateSignal`
  - `useUpdateTab`

### Zustand
- **Tabs Store**: Accesses `useTabsStore` to find and update corresponding tabs
- **File Display Panel**: Uses `useFileDisplayPanel` to manage entity actions state

### Local State
- **React Hook Form**: Manages form state, validation, and submission
- **Form Reset**: Resets form when dialog opens/closes

## Side Effects

- **API Calls**: Makes HTTP requests to update entity names across different services
- **Toast Notifications**: Displays success/error messages to users
- **State Updates**: Updates global state for tabs and file display panel
- **Form Reset**: Clears form data after successful submission
- **Dialog Management**: Closes dialog and resets entity actions state

## Dependencies

### UI Components
- `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogFooter`, `DialogClose`
- `Button`, `TextInput`, `Typography`
- `useToast` hook

### Icons
- `IconAnswers`, `IconDeepSearch`, `IconSignalsFDP`, `IconStoriesFDP`, `PiEditLine`

### Form Management
- `react-hook-form` for form handling
- `@hookform/resolvers/zod` for validation
- `zod` for schema definition

### Custom Hooks
- Multiple entity-specific update hooks
- Context hooks for tabs and file display panel state

## Integration

The component integrates into the file display panel architecture as a modal overlay:

1. **File Display Panel** → Triggers rename action for selected entities
2. **Tab System** → Synchronizes tab names with renamed entities  
3. **Entity Management** → Updates entities across different services (signals, stories, etc.)
4. **Notification System** → Provides user feedback through toast notifications

## Best Practices

✅ **Follows Architecture Guidelines**:
- Uses TanStack Query for server state mutations
- Leverages Zustand for global client state
- Implements React Hook Form with Zod validation
- Proper error handling and loading states

✅ **Component Design**:
- Single responsibility: focused on entity renaming
- Reusable across different entity types
- Proper TypeScript interfaces and type safety
- Forward ref support for dialog management

✅ **User Experience**:
- Auto-focus on input field
- Loading states during operations
- Clear success/error feedback
- Consistent validation rules

✅ **State Management**:
- Separates server state (entities) from client state (UI)
- Proper cleanup and reset behavior
- Optimistic updates with error handling