# SignUpForm Component

## Purpose
The `SignUpForm` component provides a comprehensive user registration interface with multiple authentication methods. It supports both Google OAuth and email-based sign-up flows, featuring a progressive disclosure pattern that starts with OAuth options and transitions to a detailed form when users choose email registration. The component handles form validation, error states, and success callbacks while maintaining a cohesive user experience across different authentication pathways.

## Component Type
**Client Component** - Uses the `'use client'` directive because it requires browser-only features including:
- Interactive form state management with React Hook Form
- Animation effects with Framer Motion
- Event handlers for user interactions
- Local state management for UI transitions
- Real-time form validation feedback

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | Additional CSS classes for styling customization |
| `asTitle` | `ElementType` | No | Custom HTML element type for the title component |
| `isSignUpError` | `boolean` | Yes | Flag indicating if there was a sign-up error to display error states |
| `noLogo` | `boolean` | No | Hides the logo from the form header when true |
| `noRedirectAfterEmailSignUp` | `boolean` | No | Prevents automatic redirect after successful email sign-up |
| `noTerms` | `boolean` | No | Hides the terms and conditions section when true |
| `oauthError` | `string` | No | Error message from OAuth authentication failures |
| `oauthErrorRedirect` | `string` | Yes | URL to redirect to when OAuth errors occur |
| `onlyLogo` | `boolean` | No | Shows only the logo without additional header content |
| `redirect` | `string` | Yes | Success redirect URL after completed registration |
| `referrer` | `string` | No | Referrer information for tracking sign-up sources |
| `title` | `string` | No | Custom title text (defaults to contextual titles) |
| `onSignInSelect` | `() => void` | Yes | Callback function when user chooses to switch to sign-in |
| `onSignUp` | `() => void` | No | Success callback executed after successful registration |

## Usage Example

```tsx
import { SignUpForm } from '@/components/authentication/sign-up-form';

function RegistrationPage() {
  const [authError, setAuthError] = useState(false);
  
  const handleSignInRedirect = () => {
    router.push('/auth/sign-in');
  };
  
  const handleSignUpSuccess = () => {
    // Track successful registration
    analytics.track('user_registered');
    // Additional success handling
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignUpForm
        className="w-full max-w-md"
        isSignUpError={authError}
        redirect="/dashboard"
        oauthErrorRedirect="/auth/error"
        referrer="homepage"
        title="Join Our Platform"
        onSignInSelect={handleSignInRedirect}
        onSignUp={handleSignUpSuccess}
        noTerms={false}
      />
    </div>
  );
}

// Minimal configuration example
function SimpleSignUp() {
  return (
    <SignUpForm
      isSignUpError={false}
      redirect="/welcome"
      oauthErrorRedirect="/error"
      onSignInSelect={() => router.push('/sign-in')}
    />
  );
}

// Advanced customization example
function CustomSignUp() {
  return (
    <SignUpForm
      className="custom-form-styles"
      asTitle="h1"
      isSignUpError={false}
      noLogo={true}
      noRedirectAfterEmailSignUp={true}
      redirect="/onboarding"
      oauthErrorRedirect="/auth/error"
      title="Create Your Account"
      onSignInSelect={handleSignInSwitch}
      onSignUp={() => {
        // Custom post-registration logic
        updateUserPreferences();
        sendWelcomeEmail();
      }}
    />
  );
}
```

## Functionality

### Core Features
- **Progressive Authentication Flow**: Starts with OAuth options, transitions to email form
- **Multi-Provider Support**: Google OAuth integration with fallback to email registration
- **Real-time Validation**: Zod schema validation with immediate error feedback
- **Responsive Design**: Adaptive layout for mobile and desktop experiences
- **Animated Transitions**: Smooth UI transitions using Framer Motion
- **Error Handling**: Comprehensive error states for both OAuth and form errors

### Form Validation
- **First Name**: Required, minimum 1 character after trimming
- **Last Name**: Required, minimum 1 character after trimming  
- **Email**: Uses shared `emailSchema` for consistent validation
- **Password**: Uses shared `passwordSchema` with security requirements

### UI States
- **Initial State**: Shows Google OAuth and email continuation options
- **Email Form State**: Displays comprehensive registration form
- **Loading States**: Button and form disabled during submission
- **Error States**: Field-level and form-level error display
- **Success States**: Callback execution and optional redirect handling

## State Management

### Local State (useState)
- `isSignUpWithEmail`: Controls progressive disclosure between OAuth and email flows

### Form State (React Hook Form)
- **Validation Mode**: `onTouched` for immediate feedback after field interaction
- **Schema Resolver**: Zod integration for type-safe validation
- **Form States**: `isSubmitting`, `isDirty`, `isValid` for UI control

### Server State (TanStack Query)
- `useSignUp` hook manages registration mutation with:
  - Conditional redirect handling based on `noRedirectAfterEmailSignUp`
  - Success callback integration
  - Loading state management (`isPending`)

## Side Effects

### API Interactions
- **User Registration**: Email-based account creation via `useSignUp` mutation
- **OAuth Flow**: Google authentication handled by `GoogleAuthButton` component

### Navigation Effects
- **Success Redirects**: Automatic navigation after successful registration (configurable)
- **Error Redirects**: OAuth error handling with custom redirect URLs
- **Sign-in Transitions**: Callback-driven navigation to sign-in flow

### Analytics & Tracking
- **Referrer Tracking**: Captures and forwards referrer information
- **Registration Source**: Distinguishes between OAuth and email registrations

## Dependencies

### Internal Components
- `AuthFormTitle`: Consistent header styling and logo display
- `GoogleAuthButton`: OAuth authentication integration
- `TextOrPasswordInput`: Form field component with validation states
- `Terms`: Terms of service and privacy policy component

### UI Components
- `Button`, `ContentDivider`, `HintText`, `Typography`: Base UI building blocks

### Utilities & Hooks
- `useSignUp`: Registration mutation hook from query layer
- `emailSchema`, `passwordSchema`: Shared validation schemas
- `cn`: Utility for conditional className merging

### External Libraries
- **React Hook Form**: Form state and validation management
- **Zod**: Schema validation and type inference
- **Framer Motion**: Animation and transition effects

## Integration

### Authentication Architecture
- **Part of Authentication Module**: Located in `/components/authentication/`
- **OAuth Integration**: Seamless handoff to Google authentication flow
- **Registration Pipeline**: Integrates with backend user creation endpoints

### Form System Integration
- **Validation Standards**: Uses shared schemas for consistency across auth forms
- **Error Handling**: Follows application-wide error display patterns
- **Success Flow**: Configurable post-registration behavior

### Routing Integration
- **Flexible Redirects**: Supports custom success and error redirect URLs
- **Referrer Tracking**: Maintains navigation context for analytics
- **Cross-Authentication Flow**: Smooth transitions between sign-up and sign-in

## Best Practices

### Architecture Adherence
- ✅ **Client Component Usage**: Appropriately uses `'use client'` for interactive features
- ✅ **Component Decomposition**: Well-separated concerns with focused sub-components
- ✅ **State Management**: Proper separation of form state, server state, and UI state
- ✅ **Form Patterns**: Follows React Hook Form + Zod validation standard

### Code Quality
- ✅ **Type Safety**: Full TypeScript integration with Zod inference
- ✅ **Reusability**: Highly configurable through props interface
- ✅ **Accessibility**: Proper form labeling and error associations
- ✅ **Performance**: Optimized re-renders through proper state isolation

### Integration Patterns
- ✅ **Consistent Validation**: Uses shared schemas across authentication components
- ✅ **Error Handling**: Comprehensive error states with user-friendly messaging
- ✅ **Progressive Enhancement**: Graceful degradation of features
- ✅ **Flexible Configuration**: Supports various use cases through prop customization

### Exported Items
- `schema`: Zod validation schema for reuse in other components
- `inputs`: Input field configuration array for form generation
- `SignUpForm`: Main component for user registration interface