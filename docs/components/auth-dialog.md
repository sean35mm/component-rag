# AuthDialog Component

## Purpose

The `AuthDialog` component is a centralized authentication dialog that handles different authentication flows including password reset and email verification. It serves as a modal container that conditionally renders different authentication steps based on the current state managed by the authentication context.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive dialog state and user interactions
- Utilizes context hooks (`useAuthDialog`) that require client-side reactivity
- Handles dynamic content rendering based on authentication steps
- Controls modal open/close behavior with event handlers

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onSignup` | `() => void` | Optional | Callback function executed after successful signup completion |
| `redirectTo` | `string` | Optional | URL path to redirect users after successful authentication |

## Usage Example

```tsx
import { AuthDialog } from '@/components/authentication/auth-dialog/auth-dialog';

// Basic usage
function App() {
  return (
    <div>
      <AuthDialog />
    </div>
  );
}

// With signup callback and redirect
function Dashboard() {
  const handleSignupComplete = () => {
    console.log('User signed up successfully');
    // Additional post-signup logic
  };

  return (
    <div>
      <AuthDialog 
        onSignup={handleSignupComplete}
        redirectTo="/dashboard"
      />
    </div>
  );
}

// Trigger dialog from another component
function LoginButton() {
  const { setAuthDialogStep } = useAuthDialog();

  const handleResetPassword = () => {
    setAuthDialogStep(AuthDialogStep.RESET_PASSWORD);
  };

  return (
    <button onClick={handleResetPassword}>
      Reset Password
    </button>
  );
}
```

## Functionality

### Core Features
- **Conditional Rendering**: Displays different authentication flows based on the current step
- **Modal Management**: Controls dialog visibility and closability behavior
- **Responsive Design**: Adapts layout for mobile (full-screen) and desktop (modal) experiences
- **Step-based Navigation**: Supports multiple authentication workflows within a single dialog
- **Accessibility**: Includes proper dialog titles and ARIA attributes

### Authentication Steps
- **Reset Password**: Renders password reset form and workflow
- **Email Verification**: Handles email verification process with optional callbacks

### UI Behavior
- Full-screen on mobile devices (`h-full max-w-full rounded-none`)
- Modal overlay on desktop (`lg:h-auto lg:max-w-[600px] lg:rounded-[1.25rem]`)
- Conditional close button based on `isAuthDialogClosable` state
- Scrollable content area for longer forms

## State Management

### Context Integration
- **Primary State**: Managed through `useAuthDialog` context hook
  - `isAuthDialogOpen`: Controls dialog visibility
  - `isAuthDialogClosable`: Determines if users can dismiss the dialog
  - `step`: Current authentication step being displayed
  - `_setIsAuthDialogOpen`: Internal method to control dialog state

### State Flow
```tsx
// Context provides centralized authentication dialog state
const {
  isAuthDialogOpen,      // boolean - dialog visibility
  isAuthDialogClosable,  // boolean - can user close dialog
  step,                  // AuthDialogStep | null - current step
  _setIsAuthDialogOpen   // function - toggle dialog
} = useAuthDialog();
```

## Side Effects

### Dialog Management
- **Conditional Closing**: Only allows dialog dismissal when `isAuthDialogClosable` is true
- **Step-based Rendering**: Re-renders content based on authentication step changes
- **Callback Execution**: Triggers optional `onSignup` callback upon successful verification

### No Direct API Calls
- Component itself doesn't make API calls
- Child components (`ResetPassword`, `VerifyEmailDialog`) handle their own API interactions

## Dependencies

### UI Components
- `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle` from `@/components/ui/dialog`

### Authentication Components
- `ResetPassword` from `./reset-password`
- `VerifyEmailDialog` from `./verify-email`

### Context & Hooks
- `useAuthDialog` from `@/lib/contexts`
- `AuthDialogStep` enum from `@/lib/contexts`

### External Dependencies
- React for component lifecycle and rendering

## Integration

### Application Architecture Role
- **Authentication Layer**: Central point for all authentication modal interactions
- **Context Consumer**: Integrates with application-wide authentication state management
- **Route Integration**: Supports redirect functionality for post-authentication navigation
- **Component Orchestration**: Coordinates between different authentication sub-components

### Usage Patterns
```tsx
// Typical integration in layout or app root
function RootLayout({ children }) {
  return (
    <AuthProvider>
      <div>
        {children}
        <AuthDialog />
      </div>
    </AuthProvider>
  );
}
```

## Best Practices

### Architecture Adherence
✅ **Client Component Usage**: Properly uses `'use client'` for interactive modal behavior  
✅ **Component Decomposition**: Delegates specific authentication flows to specialized child components  
✅ **Context Integration**: Leverages centralized state management through authentication context  
✅ **Responsive Design**: Implements mobile-first responsive patterns  

### Implementation Patterns
✅ **Conditional Rendering**: Uses step-based rendering instead of complex nested routing  
✅ **Prop Drilling Avoidance**: Passes necessary props only to relevant child components  
✅ **Accessibility**: Includes proper dialog semantics and hidden titles for screen readers  
✅ **Separation of Concerns**: Dialog management separate from authentication logic  

### Recommended Usage
- Place once in application root or layout component
- Control visibility through authentication context, not direct prop manipulation
- Use optional callbacks for post-authentication workflows
- Leverage `redirectTo` prop for seamless user experience after authentication