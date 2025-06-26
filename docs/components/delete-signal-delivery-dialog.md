# DeleteSignalDeliveryDialog Component

## Purpose

The `DeleteSignalDeliveryDialog` component provides a confirmation dialog for deleting (archiving) signal delivery contact points. It presents users with a destructive action warning and handles the archival process through status updates rather than actual deletion, maintaining data integrity while removing the contact point from active use.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive dialog state
- Handles user interactions (button clicks, dialog open/close)
- Uses client-side state management with Zustand
- Provides real-time feedback through toast notifications

## Props Interface

This component accepts no props and manages all state through Zustand store.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | Component is self-contained with store-managed state |

## Usage Example

```tsx
import { DeleteSignalDeliveryDialog } from '@/components/settings/signal-delivery/signal-delivery-list/delete-signal-delivery-dialog';

function SignalDeliveryManagement() {
  return (
    <div>
      {/* Other signal delivery components */}
      
      {/* Dialog is controlled by Zustand store state */}
      <DeleteSignalDeliveryDialog />
    </div>
  );
}

// Trigger dialog from another component
function SignalDeliveryItem({ contactPoint }) {
  const { setIsDeleteDialogOpen, setSignalDeliveryIdToDelete } = useSignalDeliveryStore();
  
  const handleDeleteClick = () => {
    setSignalDeliveryIdToDelete(contactPoint.id);
    setIsDeleteDialogOpen(true);
  };
  
  return (
    <div>
      <span>{contactPoint.email}</span>
      <Button onClick={handleDeleteClick} variant="errorOutlined">
        Delete
      </Button>
    </div>
  );
}
```

## Functionality

### Core Features
- **Confirmation Dialog**: Presents a modal dialog with destructive action warning
- **Soft Delete**: Archives contact points by updating status rather than hard deletion
- **Loading States**: Shows loading indicators during the deletion process
- **Error Prevention**: Confirms user intent before proceeding with deletion
- **Success Feedback**: Provides toast notification upon successful archival

### User Interactions
- **Cancel Action**: Closes dialog without making changes
- **Confirm Deletion**: Proceeds with archiving the contact point
- **Loading Feedback**: Disables actions and shows progress during API calls

### Data Flow
1. User triggers delete action from parent component
2. Store updates with contact point ID and opens dialog
3. User confirms or cancels the action
4. On confirm: API call updates contact point status to ARCHIVED
5. Success feedback and dialog closure

## State Management

### Zustand Store Integration
```tsx
// Store state accessed
const isDeleteDialogOpen = useSignalDeliveryStore(state => state.isDeleteDialogOpen);
const signalDeliveryIdToDelete = useSignalDeliveryStore(state => state.signalDeliveryIdToDelete);

// Store actions used
const setIsDeleteDialogOpen = useSignalDeliveryStore(state => state.setIsDeleteDialogOpen);
const setSignalDeliveryIdToDelete = useSignalDeliveryStore(state => state.setSignalDeliveryIdToDelete);
```

### Local State
- Dialog open/close state managed by Zustand
- Contact point ID stored in Zustand for deletion target
- No local React state required

## Side Effects

### API Interactions
- **Contact Point Update**: Uses `useUpdateContactPoint` mutation to archive contact points
- **Status Change**: Updates contact point status to `ContactPointStatusEnum.ARCHIVED`

### User Feedback
- **Toast Notifications**: Success message displayed after successful archival
- **Loading States**: Button text changes and disabling during API calls

### State Cleanup
- Resets dialog state on close
- Clears selected contact point ID
- Handles cleanup on both cancel and success scenarios

## Dependencies

### UI Components
- `Dialog`, `DialogContent`, `DialogDescription`, `DialogFooter`, `DialogHeader`, `DialogTitle` - Modal dialog structure
- `Button` - Action buttons with loading states
- `Typography` - Consistent text styling
- `PiDeleteBinLine` - Delete icon from icon library

### Hooks & Services
- `useSignalDeliveryStore` - Zustand store for state management
- `useUpdateContactPoint` - TanStack Query mutation for API calls
- `useToast` - Toast notification system

### Types & Enums
- `ContactPointStatusEnum` - Status values for contact point states

## Integration

### Application Architecture
```
Settings Page
├── Signal Delivery Management
    ├── Signal Delivery List
    │   ├── Signal Delivery Items
    │   └── DeleteSignalDeliveryDialog ← This component
    └── Add Signal Delivery Form
```

### Store Integration
- Operates within the signal delivery domain context
- Shares state with other signal delivery components
- Maintains consistent state across the feature module

### Data Flow Pattern
1. **Trigger**: Parent components set deletion target in store
2. **Confirmation**: This component handles user confirmation
3. **Action**: API mutation updates contact point status
4. **Feedback**: Success/error states communicated to user
5. **Cleanup**: Store state reset for next interaction

## Best Practices

### Architecture Adherence
- ✅ **Client Component**: Appropriately uses client-side rendering for interactivity
- ✅ **State Management**: Leverages Zustand for client state, TanStack Query for server state
- ✅ **Component Decomposition**: Self-contained dialog component with clear responsibilities
- ✅ **Reusability**: Uses shared UI components from `/ui/` directory

### Implementation Patterns
- **Soft Delete Pattern**: Archives rather than deletes for data integrity
- **Optimistic UX**: Immediate feedback with loading states
- **Error Boundaries**: Graceful handling of failed operations
- **Accessibility**: Proper dialog semantics and keyboard navigation
- **Consistent Styling**: Follows design system patterns for destructive actions

### Performance Considerations
- Minimal re-renders through targeted Zustand selectors
- Efficient API calls with TanStack Query caching
- Proper cleanup to prevent memory leaks
- Debounced user actions to prevent double-submissions