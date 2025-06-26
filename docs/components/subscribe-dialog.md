# SubscribeDialog

## Purpose

The `SubscribeDialog` component is a modal dialog that serves as a centralized hub for managing subscription-related workflows in the billing system. It dynamically renders different subscription flows based on the current state, providing a unified interface for subscription creation, editing, payment setup, payment confirmation, and cancellation operations.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive dialog state and user interactions
- Uses Zustand store for client-side state management
- Handles dynamic content rendering based on flow state
- Requires browser APIs for dialog functionality

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | This component accepts no props - all state is managed through the Zustand store |

## Usage Example

```tsx
import { SubscribeDialog } from '@/components/settings/billing/subscribe-dialog';
import { useSubscribeDialogStore } from '@/lib/contexts';
import { SubscribeDialogFlowType } from '@/lib/stores';

function BillingSettings() {
  const onFlowChange = useSubscribeDialogStore((store) => store.onFlowChange);

  const handleCreateSubscription = () => {
    onFlowChange({
      type: SubscribeDialogFlowType.CREATE_SUBSCRIPTION,
      meta: { planId: 'pro-monthly' }
    });
  };

  const handleCancelSubscription = () => {
    onFlowChange({
      type: SubscribeDialogFlowType.CANCEL,
      meta: { subscriptionId: 'sub_123' }
    });
  };

  return (
    <div>
      <button onClick={handleCreateSubscription}>
        Upgrade to Pro
      </button>
      <button onClick={handleCancelSubscription}>
        Cancel Subscription
      </button>
      
      {/* Dialog renders automatically when flow state changes */}
      <SubscribeDialog />
    </div>
  );
}
```

## Functionality

### Core Features

- **Dynamic Flow Rendering**: Conditionally renders different subscription workflows based on flow type
- **Responsive Design**: Adapts dialog size and styling based on the current flow
- **State-Driven UI**: Automatically opens/closes based on Zustand store state
- **Flow Management**: Handles flow transitions and cleanup

### Supported Flows

1. **Cancel Subscription**: Compact dialog for subscription cancellation
2. **Confirm Payment**: Payment confirmation workflow
3. **Create Subscription**: New subscription setup process
4. **Edit Subscription**: Modify existing subscription details
5. **Setup Payment Method**: Payment method configuration

### Dialog Behavior

- **Auto-open**: Opens when flow state is set to any valid flow type
- **Auto-close**: Closes and resets flow state when dismissed
- **Responsive Sizing**: Different dimensions for cancel flow vs. other flows
- **Overflow Handling**: Scrollable content for longer forms

## State Management

### Zustand Store Integration

```tsx
// Store state structure
interface SubscribeDialogStore {
  flow: SubscribeDialogFlow | null;
  onFlowChange: (flow: SubscribeDialogFlow | null) => void;
}

// Usage in component
const flow = useSubscribeDialogStore((store) => store.flow);
const onFlowChange = useSubscribeDialogStore((store) => store.onFlowChange);
```

### State Flow

1. **Initialization**: Dialog starts closed with `flow = null`
2. **Flow Activation**: External trigger sets specific flow type with metadata
3. **Dialog Opens**: Component renders appropriate flow based on type
4. **Flow Completion**: User completes action or cancels
5. **Cleanup**: Flow resets to `null`, dialog closes

## Side Effects

### Dialog Management

- **Open State**: Derived from flow state (`!!flow`)
- **Close Handler**: Resets flow to `null` when dialog is dismissed
- **Flow Cleanup**: Ensures proper state cleanup on dialog close

### No Direct API Calls

- Component itself doesn't make API calls
- Individual flow components handle their own data fetching and mutations
- Acts as a presentation layer for flow orchestration

## Dependencies

### UI Components
- `Dialog`, `DialogContent` from `@/components/ui/dialog`

### Store & Context
- `useSubscribeDialogStore` from `@/lib/contexts`
- `SubscribeDialogFlowType` from `@/lib/stores`

### Flow Components
- `CancelSubscriptionFlow`
- `ConfirmPaymentFlow`
- `CreateSubscriptionFlow`
- `EditSubscriptionFlow`
- `SetupPaymentMethodFlow`

### Utilities
- `cn` from `@/lib/utils/cn`

## Integration

### Application Architecture

```
Billing Settings Page
├── Subscription Cards
│   ├── Upgrade Buttons → Trigger CREATE_SUBSCRIPTION flow
│   └── Cancel Buttons → Trigger CANCEL flow
├── Payment Methods
│   └── Setup Buttons → Trigger SETUP_PAYMENT_METHOD flow
└── SubscribeDialog (Global)
    ├── Listens to store state
    └── Renders appropriate flow
```

### Store Integration Pattern

```tsx
// Triggering flows from anywhere in the app
const triggerSubscriptionFlow = useSubscribeDialogStore(
  (store) => store.onFlowChange
);

// Example usage in different components
triggerSubscriptionFlow({
  type: SubscribeDialogFlowType.CREATE_SUBSCRIPTION,
  meta: { planId, billingCycle }
});
```

## Best Practices

### Architecture Adherence

✅ **Client Component Usage**: Properly uses client component for interactive dialog functionality

✅ **State Management**: Follows Zustand pattern for client-side dialog state

✅ **Component Decomposition**: Delegates specific flow logic to dedicated components

✅ **Reusability**: Single dialog handles multiple subscription workflows

### Implementation Patterns

✅ **Conditional Rendering**: Clean flow-based rendering without complex nesting

✅ **Responsive Design**: Adaptive styling based on content requirements

✅ **State Cleanup**: Proper cleanup prevents memory leaks and stale state

✅ **Type Safety**: Strong typing with TypeScript for flow types and metadata

### Performance Considerations

- **Lazy Rendering**: Only renders active flow component
- **Minimal Re-renders**: Selective store subscriptions
- **Clean State Management**: Prevents memory leaks through proper cleanup

### Accessibility

- **Dialog Standards**: Uses proper dialog component with focus management
- **Keyboard Navigation**: Inherits dialog keyboard handling
- **Screen Reader Support**: Proper dialog labeling and structure