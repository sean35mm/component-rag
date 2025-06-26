# VerifyEmailDialog Component

## Purpose

The `VerifyEmailDialog` component provides email verification functionality within the authentication flow. It displays a verification message, automatically checks for email verification status, and allows users to resend verification emails with a countdown timer to prevent spam.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages local state with hooks like `useCountdown` and `useRef`
- Handles side effects with `useEffect` for polling verification status
- Provides interactive functionality (button clicks, automatic verification checking)
- Integrates with client-side authentication context and routing

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onSignup` | `() => void` | Optional | Callback function triggered when user wants to sign up with a different email. When provided, renders a button instead of a link |
| `redirectTo` | `string` | Optional | URL to redirect to after successful email verification |

## Usage Example

```tsx
import { VerifyEmailDialog } from '@/components/authentication/auth-dialog/verify-email';

// Basic usage within auth dialog
function AuthDialog() {
  return (
    <Dialog>
      <DialogContent>
        <VerifyEmailDialog redirectTo="/dashboard" />
      </DialogContent>
    </Dialog>
  );
}

// Usage with signup callback (e.g., in a multi-step form)
function SignupFlow() {
  const handleReturnToSignup = () => {
    // Navigate back to signup step
    setCurrentStep('signup');
  };

  return (
    <VerifyEmailDialog 
      onSignup={handleReturnToSignup}
      redirectTo="/onboarding"
    />
  );
}
```

## Functionality

- **Email Verification Display**: Shows the user's email address and verification instructions
- **Automatic Verification Polling**: Checks verification status every 2 seconds
- **Auto-close on Verification**: Automatically closes the dialog when email is verified
- **Resend Email with Countdown**: Allows resending verification emails with a 15-second cooldown
- **Alternative Email Option**: Provides option to sign up with a different email address
- **Conditional Rendering**: Renders different UI elements based on context (button vs link)

## State Management

- **TanStack Query**: 
  - `useUserDetails()` - Fetches current user information
  - `useResendEmailVerification()` - Handles email resend mutation
- **Custom Hooks**:
  - `useCountdown()` - Manages resend button countdown timer
  - `useAccessToken()` - Manages authentication state and verification status
  - `useAuthDialog()` - Controls dialog visibility
- **Local State**: 
  - `useRef` for timeout management
  - Component-level state through custom hooks

## Side Effects

- **Verification Polling**: Sets up a 2-second interval to check email verification status
- **Automatic Cleanup**: Clears timeouts and resets countdown on component unmount
- **Token Refresh**: Calls `onReset()` to refresh access token during verification checks
- **Dialog Management**: Automatically closes dialog when verification is detected

## Dependencies

### Components
- `Button` - UI button component
- `DialogTitlePrimitive` - Dialog title primitive
- `Typography` - Text styling component
- `AuthFormTitle` - Authentication form title component

### Hooks
- `useUserDetails` - User data fetching
- `useResendEmailVerification` - Email resend functionality
- `useAccessToken` - Authentication state management
- `useAuthDialog` - Dialog state management
- `useCountdown` - Timer functionality

### External Libraries
- `NextLink` - Next.js navigation
- `usehooks-ts` - Utility hooks

## Integration

The component integrates into the authentication flow as part of the auth dialog system:

1. **Authentication Context**: Connects to global auth state for user verification status
2. **Dialog System**: Designed to work within the application's dialog infrastructure
3. **Query Layer**: Leverages the application's TanStack Query setup for data fetching
4. **Navigation**: Integrates with Next.js routing for email signup alternatives

## Best Practices

✅ **Follows Architecture Guidelines**:
- Uses client component appropriately for interactive functionality
- Leverages TanStack Query for server state management
- Implements proper cleanup in useEffect
- Uses custom hooks for reusable logic
- Separates UI components from business logic

✅ **Performance Optimizations**:
- Uses `useCallback` for event handlers
- Implements proper dependency arrays in useEffect
- Manages cleanup to prevent memory leaks

✅ **User Experience**:
- Provides clear feedback with countdown timer
- Automatic verification detection for seamless flow
- Prevents spam with cooldown mechanism
- Offers alternative paths for different scenarios

✅ **Error Handling**:
- Graceful handling of verification polling
- Proper timeout management
- Loading states for async operations