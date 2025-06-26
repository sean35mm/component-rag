# ForgotPasswordForm Component

## Purpose

The `ForgotPasswordForm` component provides a comprehensive password reset flow for user authentication. It handles email submission for password reset requests, manages the post-submission state with email confirmation messaging, and includes resend functionality with cooldown protection. The component offers a complete user experience from initial password reset request through email verification confirmation.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Form state management with React Hook Form
- Local state for email counter and timer functionality
- Event handlers for form submission and user interactions
- useEffect for timer countdown management
- Animation with Framer Motion

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `asTitle` | `ElementType` | Optional | HTML element type for the form title (e.g., 'h1', 'h2') |
| `onlyLogo` | `boolean` | Optional | Whether to display only the logo in the header |
| `onSignUpSelect` | `() => void` | Required | Callback function triggered when user clicks "Sign up" link |

## Usage Example

```tsx
import { ForgotPasswordForm } from '@/components/authentication/forgot-password-form';

// Basic usage in authentication flow
function AuthPage() {
  const handleSignUpNavigation = () => {
    router.push('/auth/signup');
  };

  return (
    <div className="auth-container">
      <ForgotPasswordForm 
        onSignUpSelect={handleSignUpNavigation}
      />
    </div>
  );
}

// With custom title element and logo-only mode
function CompactForgotPassword() {
  return (
    <ForgotPasswordForm
      asTitle="h2"
      onlyLogo={true}
      onSignUpSelect={() => setAuthMode('signup')}
    />
  );
}

// In modal or embedded context
function AuthModal() {
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot'>('login');

  return (
    <Modal>
      {authMode === 'forgot' && (
        <ForgotPasswordForm
          onSignUpSelect={() => setAuthMode('signup')}
        />
      )}
    </Modal>
  );
}
```

## Functionality

### Core Features
- **Email Validation**: Uses Zod schema validation for email format verification
- **Form Submission**: Handles password reset email requests with loading states
- **State Transitions**: Dynamically switches between initial form and email confirmation views
- **Resend Protection**: Implements 30-second cooldown timer between resend attempts
- **Resend Limits**: Prevents excessive resend attempts (max 2 attempts)
- **Navigation Links**: Provides pathway to sign-up flow
- **Responsive Design**: Adapts layout for different screen sizes
- **Animated Terms**: Includes animated terms section for mobile views

### User Experience Flow
1. User enters email address in validated input field
2. Form submits and triggers password reset email
3. UI transitions to email confirmation state
4. User can resend email after cooldown period expires
5. Navigation options available throughout the process

## State Management

### Local State
- **`sentEmailCounter`**: Tracks number of password reset emails sent (0-2 limit)
- **`counter`**: Manages 30-second countdown timer for resend functionality
- **`disabled`**: Controls resend button availability during cooldown

### Form State (React Hook Form)
- **Email validation**: Real-time validation using Zod resolver
- **Submission state**: Tracks form submission and validation status
- **Error handling**: Manages field-level validation errors

### Server State (TanStack Query)
- **`useForgotPassword`** mutation for API communication
- Handles success/error states with toast notifications
- Manages loading states during API requests

## Side Effects

### Timer Management
```tsx
useEffect(() => {
  if (counter > 0) {
    const timer = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  } else {
    setDisabled(false);
  }
}, [counter]);
```

### API Interactions
- **Password Reset Request**: Sends email to backend service
- **Error Handling**: Displays toast notifications for API errors
- **Success Handling**: Updates UI state and increments email counter

## Dependencies

### Internal Components
- `AuthFormTitle` - Authentication form header component
- `Terms` - Legal terms and conditions component
- `Button`, `TextInput`, `Typography` - UI component library
- `ContentDivider`, `HintText` - Layout and feedback components

### Hooks and Utilities
- `useHandleToastError` - Centralized error handling
- `useForgotPassword` - TanStack Query mutation hook
- `emailSchema` - Shared email validation schema
- `UserForgotPasswordDto` - Type definition for API payload

### External Libraries
- React Hook Form with Zod resolver for form management
- Framer Motion for animations
- Phosphor Icons for UI elements

## Integration

### Authentication Flow Integration
```tsx
// Typical integration in auth routing
const AuthenticationFlow = () => {
  const [currentView, setCurrentView] = useState<'login' | 'signup' | 'forgot'>('login');
  
  const authComponents = {
    login: <LoginForm onForgotPassword={() => setCurrentView('forgot')} />,
    signup: <SignUpForm onSignIn={() => setCurrentView('login')} />,
    forgot: <ForgotPasswordForm onSignUpSelect={() => setCurrentView('signup')} />
  };
  
  return authComponents[currentView];
};
```

### Layout Integration
- Designed for full-height authentication layouts
- Responsive behavior with mobile-specific animations
- Consistent spacing and typography with other auth components

## Best Practices

### Architecture Adherence
- ✅ **Proper Client Component Usage**: Correctly uses 'use client' for interactive features
- ✅ **Component Decomposition**: Leverages smaller UI components (Button, TextInput, etc.)
- ✅ **Form Management**: Implements React Hook Form with Zod validation pattern
- ✅ **State Management**: Uses TanStack Query for server state, local state for UI logic
- ✅ **Type Safety**: Full TypeScript integration with proper prop and state typing

### Implementation Patterns
- **Controlled Components**: Uses React Hook Form Controller for form inputs
- **Error Boundaries**: Implements comprehensive error handling with toast notifications
- **Performance**: Efficient timer management with proper cleanup
- **Accessibility**: Semantic HTML structure with proper form labels and ARIA attributes
- **User Experience**: Clear state transitions and helpful feedback messaging

### Security Considerations
- **Rate Limiting**: Client-side resend limitations (backend should also implement rate limiting)
- **Input Validation**: Comprehensive email validation before submission
- **Error Messages**: Generic error handling to prevent information disclosure