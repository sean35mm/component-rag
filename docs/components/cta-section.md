# CtaSection Component

## Purpose

The `CtaSection` component renders the call-to-action area in signal preview pages, dynamically displaying different content based on user authentication state. It serves as the primary conversion point, showing either a signup flow for unauthenticated users or signal copying functionality for authenticated users.

## Component Type

**Client Component** - Uses the `'use client'` directive (implicit through `framer-motion` usage) because it:
- Implements Framer Motion animations for smooth transitions
- Handles conditional rendering based on authentication state
- Manages user interaction callbacks

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | Additional CSS classes for styling customization |
| `contactPointId` | `string` | No | Identifier for contact point tracking during signup |
| `isAuthLoading` | `boolean` | Yes | Loading state for authentication verification |
| `isAuthorizedAndVerified` | `boolean` | Yes | Whether user is authenticated and verified |
| `isSignUpError` | `boolean` | Yes | Error state for signup process |
| `oauthError` | `string` | No | Specific OAuth error message if authentication fails |
| `redirectTo` | `string` | Yes | URL to redirect to after successful authentication/signup |
| `signalPreviewUrl` | `string` | Yes | URL of the current signal preview page |
| `onSignupSuccess` | `() => void` | Yes | Callback function executed after successful signup |

## Usage Example

```tsx
import { CtaSection } from '@/components/signals/preview/cta-section';

function SignalPreviewPage() {
  const { 
    isLoading: isAuthLoading, 
    isAuthorizedAndVerified 
  } = useAuth();
  
  const [isSignUpError, setIsSignUpError] = useState(false);
  const [oauthError, setOauthError] = useState<string>();

  const handleSignupSuccess = () => {
    // Handle post-signup logic
    trackConversion('signal_preview_signup');
    router.refresh();
  };

  return (
    <div className="grid lg:grid-cols-2">
      <SignalPreview />
      <CtaSection
        contactPointId="signal-preview-cta"
        isAuthLoading={isAuthLoading}
        isAuthorizedAndVerified={isAuthorizedAndVerified}
        isSignUpError={isSignUpError}
        oauthError={oauthError}
        redirectTo="/dashboard"
        signalPreviewUrl={window.location.href}
        onSignupSuccess={handleSignupSuccess}
        className="bg-gradient-to-br from-blue-50 to-indigo-50"
      />
    </div>
  );
}
```

## Functionality

### Core Features
- **Conditional Rendering**: Displays different components based on authentication state
- **Smooth Transitions**: Uses Framer Motion for animated state changes
- **Responsive Layout**: Adapts to different screen sizes with flexible styling
- **Error Handling**: Surfaces authentication and signup errors to users

### State-Based Rendering
1. **Loading State**: Shows `AccountSkeleton` during authentication verification
2. **Unauthenticated State**: Renders `PreviewSignupCard` for user conversion
3. **Authenticated State**: Displays `CopySignalToMyAccount` for signal interaction

## State Management

This component operates as a **presentation component** that:
- Receives all state through props (no internal state management)
- Delegates state management to parent components
- Passes callbacks and data to child components
- Follows the "lift state up" pattern for authentication state

## Side Effects

### Direct Side Effects
- **Animation Effects**: Framer Motion layout animations on state changes
- **Callback Execution**: Triggers `onSignupSuccess` callback after successful signup

### Indirect Side Effects (via child components)
- OAuth authentication flows through `PreviewSignupCard`
- Signal copying operations through `CopySignalToMyAccount`
- Analytics tracking for conversion events

## Dependencies

### Internal Components
- `AccountSkeleton` - Loading state placeholder
- `CopySignalToMyAccount` - Authenticated user actions
- `PreviewSignupCard` - Signup/authentication flow

### External Libraries
- `framer-motion` - Animation and layout transitions
- `@/lib/utils/cn` - Utility for conditional CSS classes

### Hooks & Services
- Relies on parent components for authentication state management
- Integrates with OAuth providers through child components

## Integration

### Application Architecture Role
```
Signal Preview Page
├── Signal Content (left pane)
└── CtaSection (right pane)
    ├── AccountSkeleton (loading)
    ├── PreviewSignupCard (unauthenticated)
    └── CopySignalToMyAccount (authenticated)
```

### Data Flow
1. Parent provides authentication state and error states
2. Component renders appropriate child based on state
3. Child components handle specific user interactions
4. Callbacks flow back up to parent for state updates

## Best Practices

### Architecture Adherence
- ✅ **Component Decomposition**: Delegates specific functionality to focused child components
- ✅ **Separation of Concerns**: Pure presentation logic, no business logic mixing
- ✅ **State Management**: Props-based state, no unnecessary local state
- ✅ **Responsive Design**: Mobile-first approach with responsive breakpoints

### Usage Recommendations
- Keep authentication state management in parent components
- Use TanStack Query for server state in parent components
- Handle error states explicitly with user-friendly messaging
- Implement proper loading states for smooth user experience

### Performance Considerations
- Conditional rendering minimizes unnecessary component mounting
- Framer Motion animations are optimized for performance
- Component re-renders only when authentication state changes