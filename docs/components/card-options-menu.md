# CardOptionsMenu Component Documentation

## Purpose

The `CardOptionsMenu` component provides a dropdown menu interface for performing actions on signal delivery contact points. It offers options to resend verification emails and delete signal delivery configurations through an accessible dropdown menu triggered by a "more options" button.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages local state (`isOpen` for dropdown visibility)
- Handles user interactions (click events, menu selections)
- Uses callback functions for event handling
- Requires browser-side interactivity for the dropdown menu

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `signalDelivery` | `ContactPoint` | Yes | The signal delivery contact point object containing id, name, and other configuration details |

## Usage Example

```tsx
import { CardOptionsMenu } from '@/components/settings/signal-delivery/signal-delivery-list/card-options-menu';
import { ContactPoint } from '@/lib/types';

function SignalDeliveryCard({ contactPoint }: { contactPoint: ContactPoint }) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div>
        <h3>{contactPoint.name}</h3>
        <p>{contactPoint.email}</p>
      </div>
      <CardOptionsMenu signalDelivery={contactPoint} />
    </div>
  );
}

// Usage in a list
function SignalDeliveryList({ deliveries }: { deliveries: ContactPoint[] }) {
  return (
    <div className="space-y-4">
      {deliveries.map((delivery) => (
        <SignalDeliveryCard key={delivery.id} contactPoint={delivery} />
      ))}
    </div>
  );
}
```

## Functionality

### Core Features
- **Dropdown Menu Interface**: Provides a clean, accessible menu for signal delivery actions
- **Resend Verification**: Allows users to trigger verification email resending
- **Delete Action**: Enables deletion of signal delivery configurations
- **Visual Feedback**: Icon rotation on hover and menu open states
- **Accessible Design**: Proper ARIA attributes and keyboard navigation support

### Interactive Behaviors
- Three-dot menu icon rotates 90 degrees on hover and when menu is open
- Menu closes automatically after action selection
- Destructive styling for delete action to indicate potential data loss
- Prevents default event bubbling for menu interactions

## State Management

### Local State (useState)
- `isOpen`: Controls dropdown menu visibility state

### Zustand Store Integration
The component integrates with `useSignalDeliveryStore` to manage:
- `setSignalDeliveryIdToDelete`: Sets the ID for deletion confirmation
- `setIsDeleteDialogOpen`: Controls delete confirmation dialog visibility
- `setSignalDeliveryName`: Stores the name for use in confirmation dialogs
- `setSignalDeliveryIdToResend`: Sets the ID for verification resending
- `setIsResendDialogOpen`: Controls resend confirmation dialog visibility

## Side Effects

### Dialog Triggers
- **Resend Verification**: Opens resend confirmation dialog with contact point details
- **Delete Action**: Opens delete confirmation dialog with contact point details
- **State Updates**: Updates multiple store values atomically for dialog management

### No Direct API Calls
The component itself doesn't make API calls but prepares state for other components that handle the actual operations.

## Dependencies

### UI Components
- `CompactButton`: Styled button for the menu trigger
- `DropdownMenu`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuTrigger`: Menu infrastructure
- `Typography`: Consistent text styling

### Icons
- `PiMore2Fill`: Three-dot menu trigger icon
- `PiMailUnreadLine`: Resend verification icon
- `PiDeleteBinLine`: Delete action icon

### State Management
- `useSignalDeliveryStore`: Zustand store for signal delivery state management

### Types
- `ContactPoint`: TypeScript interface for signal delivery data structure

### Utilities
- `cn`: Utility function for conditional className composition

## Integration

### Application Architecture
```
Settings Page
└── Signal Delivery Settings
    └── Signal Delivery List
        └── Signal Delivery Card
            └── CardOptionsMenu ← This Component
```

### Dialog System Integration
The component works in conjunction with:
- **Delete Confirmation Dialog**: Triggered by delete action
- **Resend Verification Dialog**: Triggered by resend action
- **Toast Notifications**: For action feedback (handled by dialog components)

### Store Architecture
```
SignalDeliveryStore
├── Dialog State Management
├── Selected Item Tracking
└── Action Coordination
```

## Best Practices

### Architecture Adherence
- ✅ **Client Component Usage**: Appropriately uses client-side rendering for interactivity
- ✅ **Component Decomposition**: Single responsibility (menu interface only)
- ✅ **State Management**: Proper separation between local UI state and global application state
- ✅ **Zustand Integration**: Uses store for cross-component communication

### Code Quality
- ✅ **Callback Optimization**: Uses `useCallback` for event handlers to prevent unnecessary re-renders
- ✅ **Accessibility**: Proper dropdown menu implementation with ARIA support
- ✅ **Type Safety**: Full TypeScript integration with proper prop typing
- ✅ **Conditional Styling**: Clean className composition with `cn` utility

### UX Patterns
- ✅ **Progressive Disclosure**: Menu options revealed on demand
- ✅ **Visual Hierarchy**: Destructive actions clearly differentiated
- ✅ **Feedback Mechanisms**: Visual state changes and confirmations
- ✅ **Consistency**: Follows established UI patterns and component library usage