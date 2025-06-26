# EditApiKeyDialog Component

## Purpose

The `EditApiKeyDialog` component provides a modal interface for renaming existing API keys. It allows users to update the name of an API key through a form-based dialog with validation, loading states, and success/error feedback. This component is part of the developers' API key management system.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Interactive form handling with React Hook Form
- Local state management for form values
- Event handlers for user interactions
- Real-time form validation and UI updates

## Props Interface

This component does not accept props. It relies entirely on Zustand store state for its data and configuration.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | No props - uses Zustand store state |

## Usage Example

```tsx
import { EditApiKeyDialog } from '@/components/developers/api-keys/edit-api-key-dialog';
import { useApiKeysStore } from '@/lib/contexts';

function ApiKeysManagement() {
  const setIsOpenEdit = useApiKeysStore((state) => state.setIsOpenEdit);
  const setApiKeyToEdit = useApiKeysStore((state) => state.setApiKeyToEdit);

  const handleEditApiKey = (apiKey: ApiKey) => {
    setApiKeyToEdit(apiKey);
    setIsOpenEdit(true);
  };

  return (
    <div>
      {/* API keys list with edit buttons */}
      <button onClick={() => handleEditApiKey(someApiKey)}>
        Edit API Key
      </button>
      
      {/* Dialog renders based on store state */}
      <EditApiKeyDialog />
    </div>
  );
}
```

## Functionality

### Core Features
- **API Key Renaming**: Form-based interface for updating API key names
- **Form Validation**: Zod schema validation with 50-character limit
- **Real-time Feedback**: Loading states and success/error toast notifications
- **Auto-focus**: Automatically focuses the input field when dialog opens
- **Responsive Design**: Adapts to different screen sizes with appropriate max widths

### Form Behavior
- Pre-populates input with current API key name
- Validates input length (max 50 characters)
- Falls back to `DEFAULT_API_KEY_NAME` if no name provided
- Resets form on successful submission
- Prevents form submission during updates

### Dialog Controls
- Opens/closes based on Zustand store state
- Prevents auto-focus on close to avoid UI jumps
- Disables actions during form submission
- Provides cancel and save actions

## State Management

### Zustand Store Integration
```tsx
const isOpenEdit = useApiKeysStore((state) => state.isOpenEdit);
const setIsOpenEdit = useApiKeysStore((state) => state.setIsOpenEdit);
const apiKeyToEdit = useApiKeysStore((state) => state.apiKeyToEdit);
```

### Local State
- `value`: Controlled input value for the API key name
- Form state managed by React Hook Form with Zod validation

### Server State
- Uses `useUpdateApiKey` mutation from TanStack Query for API updates
- Handles loading states and success/error scenarios

## Side Effects

### API Interactions
- **Update API Key**: Calls update mutation when form is submitted
- **Success Handling**: Closes dialog and shows success toast
- **Error Handling**: Displays error toast with failure details

### Form Effects
- Syncs local state with store state when `apiKeyToEdit` changes
- Resets form state after successful updates
- Manages loading states during API calls

## Dependencies

### UI Components
- `Dialog`, `DialogContent`, `DialogFooter`, `DialogHeader`, `DialogTitle`
- `Button`, `TextInput`, `Typography`
- `PiKey2Line` icon component

### Hooks and Utilities
- `useForm` from React Hook Form
- `zodResolver` for form validation
- `useToast` for user feedback
- `useApiKeysStore` for state management
- `useUpdateApiKey` for server mutations

### Validation
- `folderSchema`: Zod schema for form validation
- `DEFAULT_API_KEY_NAME`: Fallback constant

## Integration

### Store Dependencies
The component integrates with the API keys Zustand store:
- Reads dialog open state and target API key
- Updates dialog visibility
- Responds to external store changes

### Query Integration
Leverages TanStack Query patterns:
- Uses mutation hooks for API updates
- Implements optimistic UI updates
- Handles loading and error states consistently

### Toast System
Integrates with the application's toast notification system for user feedback on operations.

## Best Practices

### Architecture Adherence
- ✅ **Client Component**: Appropriately uses client directive for interactivity
- ✅ **State Management**: Combines Zustand for global state with React Hook Form for form state
- ✅ **Form Handling**: Uses React Hook Form with Zod validation following our patterns
- ✅ **Server State**: Leverages TanStack Query for API interactions

### Code Quality
- ✅ **Error Handling**: Comprehensive try-catch with user feedback
- ✅ **Loading States**: Proper disabled states during operations
- ✅ **Accessibility**: Auto-focus and keyboard navigation support
- ✅ **Responsive Design**: Mobile-first approach with responsive breakpoints

### Integration Patterns
- ✅ **Store Integration**: Clean separation between global and local state
- ✅ **Component Composition**: Uses established UI components consistently
- ✅ **Side Effect Management**: Proper cleanup and effect dependencies

## Exports

```tsx
export const DEFAULT_API_KEY_NAME = 'New key';
export const folderSchema = z.object({
  name: z.string().max(50, 'Api Key name is too long'),
});
export function EditApiKeyDialog() { /* ... */ }
```