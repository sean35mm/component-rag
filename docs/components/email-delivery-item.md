# EmailDeliveryItem Component

## Purpose
The `EmailDeliveryItem` component renders individual email contact points within a signal's delivery configuration. It displays the email address, verification status, and provides actions for managing unverified emails (resend verification) or verified emails (remove contact point). The component adapts its layout for mobile and desktop viewports.

## Component Type
**Client Component** - Uses the `'use client'` directive implicitly through the `useBreakpoint` hook, which requires client-side media query detection for responsive behavior.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `signal` | `Signal` | Yes | The signal object containing the contact point configuration |
| `contactPoint` | `Signal['contactPoints'][0]` | Yes | The specific email contact point to render |
| `onCooldown` | `boolean` | Yes | Whether the resend verification action is on cooldown |
| `resendVerification` | `(contactPointId?: number) => void` | Yes | Callback function to resend verification email |

## Usage Example

```tsx
import { EmailDeliveryItem } from '@/components/signals/details/email/email-delivery-item';

function SignalEmailDelivery({ signal }: { signal: Signal }) {
  const [resendCooldown, setResendCooldown] = useState(false);

  const handleResendVerification = async (contactPointId?: number) => {
    if (!contactPointId) return;
    
    setResendCooldown(true);
    try {
      await resendEmailVerification(contactPointId);
      // Show success notification
    } catch (error) {
      // Handle error
    } finally {
      setTimeout(() => setResendCooldown(false), 30000); // 30s cooldown
    }
  };

  return (
    <div className="space-y-2">
      {signal.contactPoints
        .filter(cp => cp.type === 'email')
        .map(contactPoint => (
          <EmailDeliveryItem
            key={contactPoint.id}
            signal={signal}
            contactPoint={contactPoint}
            onCooldown={resendCooldown}
            resendVerification={handleResendVerification}
          />
        ))}
    </div>
  );
}
```

## Functionality

### Core Features
- **Email Display**: Shows the email address with visual distinction between verified/unverified states
- **Verification Status**: Displays badge indicating verification status with appropriate colors
- **Responsive Layout**: Adapts layout between mobile (stacked) and desktop (grid) viewports
- **Action Management**: Provides contextual actions based on verification status:
  - Verified emails: Show remove option
  - Unverified emails: Show resend verification option
- **Cooldown Handling**: Disables resend action and shows feedback during cooldown periods

### Visual States
- **Verified**: Gray badge, normal text color, remove action available
- **Unverified**: Red badge, muted text color, resend action available
- **Cooldown**: Disabled resend link with "Email Resent" text

## State Management
**Local State**: No internal state management - relies entirely on props passed from parent components. State management for cooldowns and verification status is handled by parent components, following the pattern of keeping this component stateless and focused on presentation.

## Side Effects
- **Verification Resend**: Triggers parent callback to initiate email verification resend
- **Contact Point Removal**: Delegates to `RemoveContactPoint` component for removal actions
- **No Direct API Calls**: All server interactions are handled by parent components

## Dependencies

### UI Components
- `Badge` - Status indicator for verification state
- `Typography` - Text rendering with consistent styling
- `RemoveContactPoint` - Handles contact point removal for verified emails

### Hooks
- `useBreakpoint` - Responsive design detection for layout adaptation

### Utilities
- `cn` - Conditional className utility for dynamic styling

### Types
- `Signal` - Type definition for signal objects and contact points

## Integration
This component integrates into the signals delivery management system as a presentation layer component:

- **Parent Context**: Used within email delivery configuration sections
- **Signal Management**: Part of the broader signal configuration workflow
- **Contact Point Lifecycle**: Handles display and basic actions for email contact points
- **Responsive Design**: Contributes to mobile-first signal management interface

## Best Practices

### Architecture Adherence
✅ **Component Decomposition**: Flat structure with single responsibility for email contact point display  
✅ **State Management**: Stateless presentation component, delegates state to parents  
✅ **Reusability**: Domain-specific component in appropriate feature directory  
✅ **Client Component Usage**: Justified client-side rendering for responsive behavior  

### Implementation Patterns
- **Props Interface**: Well-defined TypeScript interface with appropriate constraints
- **Conditional Rendering**: Clean separation of mobile/desktop layouts and verification states
- **Event Handling**: Proper delegation of actions to parent components
- **Accessibility**: Uses semantic typography and interactive elements
- **Performance**: Minimal re-renders through stable prop interfaces

### Integration Patterns
- **Parent-Child Communication**: Clear callback pattern for actions
- **Responsive Design**: Consistent breakpoint usage across the application
- **Error Boundaries**: Relies on parent error handling for resilient UX
- **Loading States**: Cooldown state provides immediate user feedback