# CancelSubscriptionFlow Component

## Purpose

The `CancelSubscriptionFlow` component provides a confirmation dialog interface for users to cancel their subscription plan. It displays a warning message about refund policies and handles the subscription cancellation process with appropriate feedback through toasts. This component is part of the billing settings flow and ensures users understand the consequences of canceling their subscription before proceeding.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive state through Zustand store
- Handles user interactions (button clicks, form submissions)
- Integrates with client-side hooks for toast notifications and mutations
- Requires browser APIs for dialog interactions

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `meta` | `SubscribeDialogCancelFlow['meta']` | Yes | Metadata for the cancel subscription flow, though currently unused in implementation |

## Usage Example

```tsx
import { CancelSubscriptionFlow } from '@/components/settings/billing/subscribe-dialog/cancel-subscription-flow';
import { SubscribeDialogCancelFlow } from '@/lib/stores';

// Within a dialog or modal context
function SubscriptionDialog() {
  const cancelFlowMeta: SubscribeDialogCancelFlow['meta'] = {
    subscriptionId: 'sub_123',
    planName: 'Pro Plan'
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <CancelSubscriptionFlow meta={cancelFlowMeta} />
      </DialogContent>
    </Dialog>
  );
}
```

## Functionality

### Core Features
- **Confirmation Dialog**: Displays a clear warning with error icon to emphasize the action's importance
- **Refund Policy Notice**: Informs users about refund eligibility and continued access terms
- **Dual Action Interface**: Provides both cancel and confirm options for user choice
- **Loading States**: Disables buttons during the cancellation process to prevent duplicate submissions
- **Success Feedback**: Shows success toast notification upon successful cancellation

### User Interaction Flow
1. User sees warning dialog with refund policy information
2. User can either dismiss with "Nevermind!" or proceed with "Cancel plan"
3. During processing, buttons are disabled to show loading state
4. On success, dialog closes and success toast appears
5. On error, error toast is displayed while keeping dialog open

## State Management

### Zustand Store Integration
- **`useSubscribeDialogStore`**: Manages dialog flow state
  - `onFlowChange(null)`: Closes the dialog flow on successful cancellation

### TanStack Query Integration
- **`useDeleteSubscription`**: Handles the subscription deletion mutation
  - Configured with success and error callbacks
  - Provides `isPending` state for loading indicators

## Side Effects

### API Interactions
- **Subscription Deletion**: Calls subscription deletion endpoint with reason and comments
- **Toast Notifications**: Displays success or error messages based on operation outcome

### State Updates
- **Dialog Flow Reset**: Clears the current dialog flow on successful cancellation
- **Loading State Management**: Updates UI during async operations

## Dependencies

### UI Components
- `Button` - Action buttons for cancel/confirm
- `Dialog` components (`DialogClose`, `DialogFooter`, `DialogHeader`, `DialogTitle`) - Dialog structure
- `Typography` - Styled text for warnings and descriptions

### Icons
- `PiErrorWarningLine` - Warning icon for visual emphasis

### Hooks
- `useHandleToastError` - Standardized error handling
- `useToast` - Toast notification system
- `useDeleteSubscription` - Subscription deletion mutation

### Store Integration
- `useSubscribeDialogStore` - Dialog state management

## Integration

### Application Architecture
- **Settings Flow**: Integrates into the billing settings section
- **Dialog System**: Works within the application's modal/dialog framework
- **Subscription Management**: Part of the broader subscription lifecycle management

### Data Flow
1. Component receives metadata about the subscription to cancel
2. User interaction triggers subscription deletion mutation
3. Success/error states update the UI and provide user feedback
4. Dialog state is managed through centralized Zustand store

## Best Practices

### Architecture Adherence
- ✅ **Client Component Usage**: Appropriately uses client component for interactive functionality
- ✅ **State Management**: Properly separates server state (TanStack Query) from client state (Zustand)
- ✅ **Component Decomposition**: Single responsibility focused on cancellation flow
- ✅ **Error Handling**: Consistent error handling through standardized hooks

### Implementation Patterns
- ✅ **Accessibility**: Proper dialog structure with appropriate ARIA attributes
- ✅ **Loading States**: Prevents duplicate submissions during processing
- ✅ **User Experience**: Clear warning messaging and confirmation flow
- ✅ **Feedback Systems**: Immediate feedback through toast notifications

### Reusability Considerations
- Component is domain-specific to subscription cancellation
- UI patterns (confirmation dialog, loading states) follow application standards
- Error handling and toast integration are consistent with application patterns