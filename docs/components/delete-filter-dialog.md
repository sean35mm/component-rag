# DeleteSavedFilterDialog Component

## Purpose

The `DeleteSavedFilterDialog` component provides a confirmation dialog for deleting saved search filters. It presents users with a warning about the irreversible nature of the action and handles the deletion process with appropriate loading states and success callbacks.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive dialog state
- Handles user events (onClick, onOpenChange)
- Uses client-side state management (Zustand stores)
- Requires real-time UI updates during deletion process

## Props Interface

This component does not accept any props. It manages its state entirely through Zustand stores and internal logic.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | This component is self-contained and uses global state |

## Usage Example

```tsx
import { DeleteSavedFilterDialog } from '@/components/settings/search-customization/saved-filters-list/delete-filter-dialog';

// The dialog is controlled by global state, so it can be placed anywhere in the component tree
function SavedFiltersPage() {
  return (
    <div>
      {/* Other saved filters UI components */}
      <SavedFiltersList />
      
      {/* Dialog renders when isDeleteDialogOpen is true */}
      <DeleteSavedFilterDialog />
    </div>
  );
}

// Trigger deletion from another component
function FilterListItem({ filter }) {
  const { setIsDeleteDialogOpen, setSavedFilterIdToDelete } = useSavedFiltersStore();
  
  const handleDeleteClick = () => {
    setSavedFilterIdToDelete(filter.id);
    setIsDeleteDialogOpen(true);
  };
  
  return (
    <div>
      <span>{filter.name}</span>
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
}
```

## Functionality

### Core Features
- **Confirmation Dialog**: Displays a modal dialog with delete confirmation
- **Warning Message**: Shows clear warning about irreversible action
- **Loading States**: Provides visual feedback during deletion process
- **Error Prevention**: Prevents multiple deletion attempts during processing
- **Auto-close**: Automatically closes dialog on successful deletion

### User Interactions
- **Cancel**: Closes dialog without performing deletion
- **Delete**: Confirms and executes the deletion
- **Outside Click**: Can close dialog via Dialog component's built-in behavior

### Visual Elements
- Filter icon in dialog title for context
- Error-themed warning text
- Consistent button styling with loading states
- Proper spacing and layout using DialogFooter

## State Management

### Zustand Stores
- **`useSavedFiltersStore`**: 
  - `isDeleteDialogOpen`: Controls dialog visibility
  - `savedFilterIdToDelete`: Stores ID of filter to be deleted
  - `setIsDeleteDialogOpen`: Function to toggle dialog state

- **`useFiltersDrawerStore`**:
  - `reset`: Resets filter drawer state after successful deletion

### Local State
- Uses `useCallback` hooks for memoized event handlers
- No local useState required - all state managed globally

## Side Effects

### API Interactions
- **Delete Operation**: Uses `useDeleteSavedFilter` mutation hook
- **Success Callback**: Closes dialog and resets filter drawer state
- **Error Handling**: Inherits error handling from the mutation hook

### State Updates
- Closes dialog on successful deletion
- Resets filters drawer to clear any applied filters from deleted saved filter
- Maintains loading state during deletion process

## Dependencies

### UI Components
- `Dialog`, `DialogContent`, `DialogDescription`, `DialogFooter`, `DialogHeader`, `DialogTitle` from `/ui/dialog`
- `Button` from `/ui/button` 
- `Typography` from `/ui/typography`
- `PiFilter2Line` icon from `/icons`

### Hooks & Context
- `useSavedFiltersStore` - Global state for saved filters management
- `useFiltersDrawerStore` - Global state for filters drawer
- `useDeleteSavedFilter` - TanStack Query mutation hook for API calls

### React Features
- `useCallback` for memoized handlers
- Client-side rendering for interactivity

## Integration

### Application Architecture
- **Settings Flow**: Part of search customization settings interface
- **Global State**: Integrates with application-wide filter management
- **Modal System**: Uses consistent dialog patterns across the application

### Data Flow
1. User triggers delete from saved filters list
2. Global state stores filter ID and opens dialog
3. User confirms deletion in dialog
4. API mutation executes deletion
5. Success callback closes dialog and resets related state
6. UI updates reflect the deleted filter

## Best Practices

### Architectural Adherence
✅ **Client Component Usage**: Appropriately uses client component for interactive features  
✅ **State Management**: Follows TanStack Query for server state, Zustand for client state  
✅ **Component Decomposition**: Single responsibility focused on deletion confirmation  
✅ **Reusable UI**: Leverages shared UI components from `/ui/` directory  

### Implementation Patterns
✅ **Memoization**: Uses `useCallback` for stable function references  
✅ **Error Prevention**: Disables actions during loading states  
✅ **User Experience**: Provides clear warnings and loading feedback  
✅ **Global State**: Properly integrates with application state management  

### Security & UX
✅ **Confirmation Pattern**: Implements proper deletion confirmation flow  
✅ **Loading States**: Prevents double-submission and shows progress  
✅ **Clear Messaging**: Uses error-themed styling for destructive action warning  
✅ **Accessibility**: Leverages Dialog component's built-in accessibility features