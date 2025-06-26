# DeleteApiKeyDialog Component

## Purpose

The `DeleteApiKeyDialog` component provides a confirmation dialog for deleting API keys in the developer dashboard. It handles the soft deletion of API keys by disabling them rather than permanently removing them from the system, ensuring data integrity while preventing further usage.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive dialog state and user interactions
- Handles form submissions and async operations
- Uses client-side hooks for state management and API calls
- Requires event handlers for user actions (cancel, delete)

## Props Interface

This component accepts no props. All state and configuration is managed through the Zustand store.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| None | - | - | Component is fully controlled by `useApiKeysStore` |

## Usage Example

```tsx
import { DeleteApiKeyDialog } from '@/components/developers/api-keys/delete-api-key-dialog';

// The dialog is controlled by the API keys store
// Open the dialog by setting store state
function ApiKeyManagement() {
  const setIsDeleteDialogOpen = useApiKeysStore(
    (state) => state.setIsDeleteDialogOpen
  );
  const setApiKeyIdToDelete = useApiKeysStore(
    (state) => state.setApiKeyIdToDelete
  );

  const handleDeleteClick = (apiKeyId: string, apiKeyName: string) => {
    setApiKeyIdToDelete(apiKeyId);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div>
      {/* Your API keys list */}
      <button onClick={() => handleDeleteClick('key-123', 'Production Key')}>
        Delete API Key
      </button>
      
      {/* Dialog renders based on store state */}
      <DeleteApiKeyDialog />
    </div>
  );
}
```

## Functionality

### Core Features
- **Confirmation Dialog**: Presents a modal dialog requiring explicit user confirmation
- **Soft Delete**: Disables API keys rather than permanently deleting them
- **Loading States**: Shows loading indicators during the deletion process
- **Success Feedback**: Displays toast notifications confirming successful deletion
- **Error Prevention**: Disables actions during pending operations
- **Responsive Design**: Adapts to different screen sizes with appropriate sizing

### User Interaction Flow
1. Dialog opens when `isDeleteDialogOpen` state is true
2. Displays API key name for confirmation
3. User can cancel (closes dialog) or confirm deletion
4. On confirmation, API key is disabled via API call
5. Success toast is shown and dialog closes
6. Store state is reset for next operation

## State Management

### Zustand Store Integration
Uses `useApiKeysStore` for all state management:

```tsx
// Dialog visibility
const isDeleteDialogOpen = useApiKeysStore((state) => state.isDeleteDialogOpen);
const setIsDeleteDialogOpen = useApiKeysStore((state) => state.setIsDeleteDialogOpen);

// API key identification
const apiKeyName = useApiKeysStore((state) => state.apiKeyName);
const apiKeyIdToDelete = useApiKeysStore((state) => state.apiKeyIdToDelete);
const setApiKeyIdToDelete = useApiKeysStore((state) => state.setApiKeyIdToDelete);

// State cleanup
const reset = useApiKeysStore((state) => state.reset);
```

### TanStack Query Integration
- Uses `useUpdateApiKey` mutation for API operations
- Handles loading states with `isPending`
- Implements success callbacks for cleanup operations

## Side Effects

### API Operations
- **Update API Key**: Calls update endpoint to set `enabled: false`
- **Optimistic Updates**: May trigger cache invalidation for API keys list
- **Error Handling**: Inherits error handling from the `useUpdateApiKey` hook

### User Feedback
- **Toast Notifications**: Shows success message with API key name
- **Loading States**: Updates button text and disables interactions

### State Management
- **Dialog State**: Opens/closes dialog based on store state
- **Cleanup Operations**: Resets store state after successful operations

## Dependencies

### UI Components
- `Dialog`, `DialogContent`, `DialogFooter`, `DialogHeader`, `DialogTitle` - Modal dialog structure
- `Button` - Action buttons (Cancel, Delete)
- `Typography` - Text styling and hierarchy

### Hooks and Services
- `useApiKeysStore` - Zustand store for API keys management
- `useUpdateApiKey` - TanStack Query hook for API operations
- `useToast` - Toast notification system

### External Dependencies
- React hooks (`useCallback`) for performance optimization

## Integration

### Application Architecture
- **Feature Domain**: Part of the developers/api-keys feature domain
- **Store Integration**: Tightly coupled with `useApiKeysStore` for state management
- **Query Integration**: Uses centralized API hooks for server state management

### Parent Components
- Typically used alongside API key listing components
- Controlled by parent components that manage the API keys table/grid
- Part of the larger developer dashboard ecosystem

### Data Flow
```
Parent Component → Store State → Dialog → API Call → Store Reset → UI Update
```

## Best Practices

### Architecture Adherence
- ✅ **Client Component**: Correctly uses `'use client'` for interactive functionality
- ✅ **State Management**: Proper separation of server state (TanStack Query) and client state (Zustand)
- ✅ **Component Decomposition**: Single responsibility focused on deletion confirmation
- ✅ **Reusability**: Uses UI components from `/ui/` directory

### Performance Optimization
- Uses `useCallback` for event handlers to prevent unnecessary re-renders
- Minimizes state selections from Zustand store
- Proper dependency arrays in hooks

### User Experience
- Clear confirmation messaging with API key name
- Loading states prevent double-submissions
- Responsive design for mobile and desktop
- Accessible dialog implementation

### Error Handling
- Relies on centralized error handling in query hooks
- Graceful handling of loading states
- User feedback through toast notifications