# sign-in-form

## Purpose

The `SignInForm` component provides a complete user authentication interface for signing into the application. It offers both email/password authentication and Google OAuth integration, with comprehensive form validation, error handling, and user experience features like animated transitions and rate limiting for failed attempts.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages form state and user interactions
- Handles form submissions and validation
- Uses React Hook Form for controlled inputs
- Integrates Framer Motion animations
- Requires browser APIs for authentication flow

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `asTitle` | `ElementType` | No | HTML element type for the title component (h1, h2, etc.) |
| `isSignInError` | `boolean` | Yes | Flag indicating if there was a sign-in error |
| `oauthError` | `string` | No | OAuth-specific error message to display |
| `oauthErrorRedirect` | `string` | Yes | URL to redirect to when OAuth errors occur |
| `onlyLogo` | `boolean` | No | Whether to show only the logo in the title |
| `redirect` | `string` | Yes | URL to redirect to after successful authentication |
| `onSignIn` | `() => void` | No | Callback function executed after successful sign-in |
| `onForgotPasswordSelect` | `() => void` | Yes | Callback when "Forgot password?" link is clicked |
| `onSignUpSelect` | `() => void` | Yes | Callback when "Sign up" link is clicked |

## Usage Example

```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SignInForm } from '@/components/authentication/sign-in-form';

export default function SignInPage() {
  const router = useRouter();
  const [authError, setAuthError] = useState(false);
  const [oauthError, setOauthError] = useState<string>();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignInForm
        asTitle="h1"
        isSignInError={authError}
        oauthError={oauthError}
        oauthErrorRedirect="/auth/error"
        redirect="/dashboard"
        onSignIn={() => {
          console.log('User signed in successfully');
          router.push('/dashboard');
        }}
        onForgotPasswordSelect={() => {
          router.push('/auth/forgot-password');
        }}
        onSignUpSelect={() => {
          router.push('/auth/sign-up');
        }}
      />
    </div>
  );
}
```

## Functionality

### Core Features
- **Email/Password Authentication**: Form-based login with validation
- **Google OAuth Integration**: One-click sign-in with Google
- **Form Validation**: Real-time validation using Zod schema
- **Error Handling**: Displays authentication and OAuth errors
- **Rate Limiting**: Tracks unsuccessful attempts to prevent abuse
- **Responsive Design**: Optimized for mobile and desktop
- **Animated Transitions**: Smooth UI animations using Framer Motion
- **Navigation Links**: Quick access to sign-up and password recovery

### Input Fields
- **Email**: Required field with email format validation
- **Password**: Required field with minimum length validation

### Visual Elements
- Loading states during form submission
- Error messages with informative icons
- Disabled button states based on form validity
- Content divider between OAuth and form authentication

## State Management

### React Hook Form
- **Form State**: Manages email and password input values
- **Validation**: Real-time validation with `onTouched` mode
- **Submission**: Handles form submission and loading states

### Custom Hook Integration
- **useSignIn**: TanStack Query mutation for authentication
- **Unsuccessful Attempts**: Tracks failed login attempts
- **Loading States**: Manages pending states during authentication

### Local State
- Form validation state (`isSubmitting`, `isDirty`, `isValid`)
- Input field errors and validation messages

## Side Effects

### Authentication Flow
- Submits credentials to authentication API
- Redirects to specified URL on successful login
- Executes callback functions for navigation events

### Error Handling
- Displays OAuth errors from URL parameters
- Shows form validation errors in real-time
- Resets unsuccessful attempts on form changes

### Rate Limiting
- Disables form submission after failed attempts
- Prevents brute force authentication attacks

## Dependencies

### Internal Components
- `AuthFormTitle` - Authentication page title with branding
- `GoogleAuthButton` - OAuth authentication button
- `TextOrPasswordInput` - Specialized form input component
- `Terms` - Terms of service component
- UI components: `Button`, `ContentDivider`, `HintText`, `Typography`

### External Libraries
- `react-hook-form` - Form state management
- `@hookform/resolvers/zod` - Form validation
- `framer-motion` - UI animations
- `zod` - Schema validation

### Custom Hooks
- `useSignIn` - Authentication mutation hook
- Icons from `@/components/icons`
- Schema utilities from `@/lib/utils/schema`

## Integration

### Authentication Architecture
- Integrates with application's authentication system
- Supports multiple authentication providers (email/password, Google OAuth)
- Handles authentication state and redirects

### Form Architecture
- Follows React Hook Form + Zod validation pattern
- Exports reusable `schema` and `inputs` for consistency
- Uses controlled components for form inputs

### Navigation Integration
- Provides callback-based navigation for flexible routing
- Supports both client-side and server-side redirects
- Integrates with application's routing strategy

## Best Practices

### Component Architecture Adherence
✅ **Client Component Usage**: Properly uses client directive for interactive features  
✅ **Component Decomposition**: Breaks down into smaller, reusable components  
✅ **Form Management**: Uses React Hook Form with Zod validation  
✅ **State Management**: Uses TanStack Query for server state, local state for UI  

### Code Quality
✅ **TypeScript**: Full type safety with exported types  
✅ **Error Handling**: Comprehensive error states and user feedback  
✅ **Accessibility**: Semantic HTML and proper form structure  
✅ **Performance**: Optimized re-renders and validation strategies  

### Reusability
✅ **Exported Schema**: Reusable validation schema for consistency  
✅ **Exported Inputs**: Configurable input definitions  
✅ **Flexible Props**: Customizable behavior through props  
✅ **Callback Pattern**: Flexible integration with different routing strategies