# EmailDeliveryDetails Component

## Purpose

The `EmailDeliveryDetails` component displays and manages email delivery preferences for signal notifications. It renders a list of configured email contact points, handles email verification resending with cooldown protection, and provides options to edit delivery preferences when no email contacts are configured.

## Component Type

**Client Component** - Uses the `'use client'` directive (implied) due to interactive state management including:
- Expandable email list state
- Cooldown timing for resend verification actions
- Click handlers for user interactions
- Effect hooks for cleanup operations

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `signal` | `Signal` | ✅ | Signal object containing contact points and delivery configuration |
| `onEditDeliveryPreferences` | `() => void` | ✅ | Callback function to handle editing delivery preferences |

## Usage Example

```tsx
import { EmailDeliveryDetails } from '@/components/signals/details/email/email-delivery-details';
import { Signal } from '@/lib/types';

function SignalDeliveryPanel({ signal }: { signal: Signal }) {
  const handleEditPreferences = () => {
    // Navigate to delivery preferences editing
    router.push('/settings/delivery-preferences');
  };

  return (
    <div className="delivery-panel">
      <EmailDeliveryDetails
        signal={signal}
        onEditDeliveryPreferences={handleEditPreferences}
      />
    </div>
  );
}
```

## Functionality

### Core Features
- **Email Contact Display**: Shows all email contact points associated with the signal
- **Expandable List**: Displays first 3 emails by default with option to expand for more
- **Verification Resending**: Allows users to resend verification emails for unverified contacts
- **Cooldown Protection**: Prevents spam by implementing 6-second cooldown between resend attempts
- **Empty State Handling**: Shows appropriate message and edit button when no emails are configured

### Interactive Elements
- Expand/collapse toggle for email lists longer than 3 items
- Resend verification buttons with cooldown state management
- Edit delivery preferences button for empty states

## State Management

### Local State (useState)
- `isExpandedEmails`: Controls the expanded/collapsed state of the email list
- `cooldowns`: Map tracking cooldown state for each contact point to prevent spam

### External State Integration
- **TanStack Query**: Uses `useResendVerification` hook for server state management of verification requests
- **Derived State**: Computes `emailContactPoints` and `isNoEmailContactPoints` from signal props

## Side Effects

### API Interactions
- **Email Verification**: Triggers verification email resend through `useResendVerification` mutation
- **Automatic Cleanup**: Clears timeout references on component unmount to prevent memory leaks

### Timeout Management
```tsx
// Cooldown implementation with cleanup
const timeoutId = setTimeout(() => {
  setCooldowns(prev => {
    const newCooldowns = new Map(prev);
    newCooldowns.set(contactPointId, false);
    return newCooldowns;
  });
}, COOLDOWN_TIMEOUT_DURATION);
```

## Dependencies

### Internal Components
- `EmailDeliveryItem`: Renders individual email contact point details
- `IconWrapper`: Provides consistent icon styling from parent delivery details
- `Button`, `Typography`: UI components for consistent styling

### Hooks & Services
- `useResendVerification`: Custom hook for email verification management
- `useEffect`, `useState`, `useMemo`, `useRef`: React hooks for state and lifecycle management

### External Libraries
- **Icons**: `PiArrowDownSLine`, `PiMailUnreadLine` from phosphor icons
- **Utilities**: `cn` for conditional class name handling

## Integration

### Parent Component Integration
Part of the larger signal delivery details system, working alongside other delivery method components (SMS, webhooks, etc.). Integrates with:

- **Signal Management System**: Receives signal data containing contact points
- **Delivery Preferences Flow**: Connects to preference editing workflows
- **Verification System**: Integrates with email verification infrastructure

### Data Flow
```
Signal Data → EmailDeliveryDetails → EmailDeliveryItem → Verification System
                     ↓
            Delivery Preferences Editor
```

## Best Practices

### Architecture Adherence
- ✅ **Component Decomposition**: Properly delegates item rendering to `EmailDeliveryItem`
- ✅ **State Management**: Uses appropriate local state for UI concerns, external hooks for server state
- ✅ **Reusability**: Accepts signal data as props, making it reusable across different signal contexts

### Performance Optimizations
- **Memoized Computations**: Uses `useMemo` for expensive filtering operations
- **Efficient Rendering**: Implements list slicing for large email lists
- **Memory Management**: Proper cleanup of timeouts to prevent memory leaks

### User Experience
- **Progressive Disclosure**: Shows limited items initially with expansion option
- **Feedback Systems**: Cooldown states provide clear feedback on action availability
- **Graceful Degradation**: Handles empty states with clear call-to-action

### Constants Export
```tsx
export const COOLDOWN_TIMEOUT_DURATION = 6_000; // 6 seconds
```
Exports the cooldown duration constant for potential reuse and testing.