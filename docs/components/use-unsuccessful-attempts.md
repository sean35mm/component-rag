# use-unsuccessful-attempts Hook

## Purpose

The `useUnsuccessfulAttempts` hook manages and tracks failed login attempts in authentication flows. It provides intelligent error handling for login failures, including account lockout scenarios, and displays contextual toasts with appropriate recovery actions like password reset and support contact options.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages local state with `useState`
- Uses browser-specific hooks (`useRouter`, `useToast`)
- Handles user interactions and navigation
- Requires access to client-side routing and toast notifications

## Props Interface

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `redirect` | `string` | ✓ | The redirect URL to navigate to after password reset, used to maintain user's intended destination |

## Usage Example

```tsx
'use client';

import { useState } from 'react';
import { useUnsuccessfulAttempts } from '@/components/hooks/use-unsuccessful-attempts';

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { showToast, unsuccessfulAttempts, setUnsuccessfulAttempts } = 
    useUnsuccessfulAttempts('/dashboard');

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      await loginUser(credentials);
      // Reset attempts on successful login
      setUnsuccessfulAttempts(5);
    } catch (error) {
      // Handle authentication errors with contextual messaging
      showToast(error as Error & { status?: number });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {/* Login form fields */}
      <div className="text-sm text-gray-600">
        Attempts remaining: {unsuccessfulAttempts}
      </div>
    </form>
  );
}
```

## Functionality

### Core Features

- **Attempt Tracking**: Monitors remaining login attempts (starts at 5)
- **Error Classification**: Distinguishes between credential errors and account lockouts
- **Contextual Messaging**: Provides different messages based on attempt count and error type
- **Recovery Actions**: Offers password reset and support contact options
- **Progressive Warnings**: Shows attempt countdown when attempts are low

### Toast Behavior

- **Account Locked**: Shows lock icon with security message and recovery options
- **Low Attempts (≤2)**: Displays remaining attempt count with warning
- **Normal Failures**: Standard credential error message
- **Non-Auth Errors**: Generic error handling for unexpected failures

## State Management

**Local State** - Uses React's `useState` for:
- `unsuccessfulAttempts`: Tracks remaining login attempts (number)

The hook follows our architecture by keeping authentication attempt state local to the component, as it's transient UI state that doesn't need global persistence.

## Side Effects

### Navigation
- Redirects to `/forgot-password` with redirect parameter when password reset is selected
- Maintains user's intended destination through query parameters

### Toast Notifications
- Displays contextual error messages based on failure type
- Shows interactive toast with recovery action buttons
- Uses destructive variant for error states

### External Interactions
- Integrates with backend error responses (401 status codes)
- Parses backend messages to detect account lockout scenarios

## Dependencies

### Internal Dependencies
- `@/components/icons` - PiLockLine icon for locked account states
- `@/components/ui/link-button` - Interactive buttons in toast actions
- `@/components/ui/use-toast` - Toast notification system
- `@/lib/constants` - REDIRECT_TO_PARAM for URL construction
- `@/lib/utils/get-message-from-error` - Error message extraction utility

### External Dependencies
- `next/link` - Navigation component for external links
- `next/navigation` - Client-side routing hooks
- `react` - Core React hooks (useState, useCallback)

## Integration

### Authentication Flow
```tsx
// Typical integration in login components
const loginFlow = {
  1: 'User submits credentials',
  2: 'API returns 401 with attempt info',
  3: 'Hook processes error and updates attempt count',
  4: 'Toast displays with contextual actions',
  5: 'User can reset password or contact support'
};
```

### Error Handling Chain
- Receives errors from authentication API calls
- Processes backend error messages for attempt detection
- Integrates with global toast system for user feedback
- Coordinates with navigation system for recovery flows

## Best Practices

### Architecture Adherence
✅ **Client Component Usage**: Properly uses client directive for interactive functionality  
✅ **Single Responsibility**: Focused solely on login attempt management  
✅ **State Isolation**: Keeps transient state local rather than in global stores  
✅ **Reusable Design**: Can be used across different authentication forms  

### Implementation Patterns
✅ **Error Boundary**: Gracefully handles both expected and unexpected errors  
✅ **User Experience**: Provides clear feedback and recovery options  
✅ **Security Awareness**: Implements progressive warnings for account security  
✅ **Accessibility**: Uses semantic icons and clear messaging  

### Integration Guidelines
- Use in any component handling login authentication
- Reset attempt count on successful authentication
- Ensure backend error messages include attempt information
- Coordinate with global authentication state management

## Exports

- `BACKEND_LOGIN_ATTEMPTS_MESSAGE_PART`: Constant for detecting backend lockout messages
- `useUnsuccessfulAttempts`: Main hook for login attempt management