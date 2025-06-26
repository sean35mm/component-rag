# ContactPointVerifyDialog Component

## Purpose

The `ContactPointVerifyDialog` component provides a modal interface for handling email verification status in the contact point verification flow. It displays different UI states based on verification progress (verifying, success, or error) and provides appropriate actions for both authenticated and unauthenticated users to proceed with signal management or account creation.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive dialog state with user event handlers
- Requires client-side interactivity for modal open/close behavior
- Handles click events and conditional rendering based on user interactions

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | `boolean` | Yes | Controls the visibility state of the dialog |
| `isVerifying` | `boolean` | Yes | Indicates if email verification is currently in progress |
| `error` | `string \| null` | Yes | Error message to display if verification fails, null if no error |
| `onOpenChange` | `(isOpen: boolean) => void` | Optional | Callback function triggered when dialog open state changes |

## Usage Example

```tsx
import { ContactPointVerifyDialog } from '@/components/signals/verification/cp-verify-dialog';

function SignalSetupPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [verificationState, setVerificationState] = useState({
    isVerifying: false,
    error: null
  });

  const handleVerifyEmail = async () => {
    setIsDialogOpen(true);
    setVerificationState({ isVerifying: true, error: null });
    
    try {
      await verifyContactPointEmail();
      setVerificationState({ isVerifying: false, error: null });
    } catch (error) {
      setVerificationState({ 
        isVerifying: false, 
        error: 'Failed to verify email. Please try again.' 
      });
    }
  };

  return (
    <div>
      <Button onClick={handleVerifyEmail}>
        Verify Email
      </Button>
      
      <ContactPointVerifyDialog
        isOpen={isDialogOpen}
        isVerifying={verificationState.isVerifying}
        error={verificationState.error}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
}
```

## Functionality

- **Multi-State Display**: Renders different content based on verification status (loading, success, error)
- **User Context Awareness**: Provides different action flows for authenticated vs. unauthenticated users
- **Modal Management**: Handles dialog open/close state with proper accessibility
- **Visual Feedback**: Displays appropriate imagery and messaging for each verification state
- **Action Routing**: Guides users to either view signals (authenticated) or create account (unauthenticated)

## State Management

- **Local Props**: Receives verification state from parent component
- **TanStack Query**: Uses `useUserDetails()` hook to fetch current user authentication status
- **Parent-Controlled**: Dialog open/close state managed by parent component through `onOpenChange` callback

## Side Effects

- **Dialog State Changes**: Triggers `onOpenChange` callback when user interacts with dialog
- **Navigation**: Redirects unauthenticated users to sign-in page for account creation
- **User Data Fetching**: Queries user details to determine authentication status

## Dependencies

### UI Components
- `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle` from `@/components/ui/dialog`
- `Button` from `@/components/ui/button`
- `Separator` from `@/components/ui/separator`
- `Typography` from `@/components/ui/typography`

### External Libraries
- `NextImage` for optimized image display
- `NextLink` for client-side navigation

### Hooks & Services
- `useUserDetails` from `@/lib/query-hooks` for user authentication state

### Assets
- `/placeholders/cp-verification.png` - Verification illustration image

## Integration

This component integrates into the signals verification workflow:

1. **Signal Setup Flow**: Part of the contact point verification process in signal creation
2. **User Onboarding**: Bridges the gap between email verification and account creation for anonymous users
3. **Authentication System**: Works with the user authentication system to provide contextual actions
4. **Navigation Flow**: Connects to sign-in pages and signal management interfaces

## Best Practices

✅ **Follows Architecture Guidelines**:
- Uses client component appropriately for interactive modal behavior
- Implements proper component decomposition with UI components
- Leverages TanStack Query for server state (user details)
- Maintains flat component structure without unnecessary nesting

✅ **State Management Patterns**:
- Parent-controlled component pattern for dialog state
- Clear separation between verification state and UI state
- Proper error handling and loading states

✅ **User Experience**:
- Provides clear visual feedback for all verification states
- Offers appropriate next actions based on user authentication status
- Implements proper modal accessibility with hidden dialog title

✅ **Code Organization**:
- Clear prop interface with comprehensive TypeScript types
- Logical conditional rendering based on state
- Consistent styling and component composition patterns