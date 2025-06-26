# PreviewSignupCard Component

## Purpose

The `PreviewSignupCard` component provides a specialized signup interface specifically designed for signal preview pages. It allows users to create an account to access signal alerts while maintaining context about the specific signal they were previewing. The component handles responsive design, authentication flows, and error states while providing a seamless onboarding experience.

## Component Type

**Client Component** - Uses `'use client'` directive because it:
- Utilizes Next.js router for navigation (`useRouter`)
- Manages interactive form submission and navigation callbacks
- Implements responsive behavior with breakpoint detection
- Handles client-side URL parameter construction and routing

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `contactPointId` | `string` | Optional | ID of the contact point associated with the signal preview |
| `isSignUpError` | `boolean` | Required | Flag indicating if there was an error during signup process |
| `oauthError` | `string` | Optional | OAuth-specific error message to display |
| `redirectTo` | `string` | Required | URL to redirect to after successful authentication |
| `signalPreviewUrl` | `string` | Required | Base URL of the signal preview page for error redirects |
| `onSignupSuccess` | `() => void` | Optional | Callback function executed when signup is successful |

## Usage Example

```tsx
import { PreviewSignupCard } from '@/components/signals/preview/preview-signup-card';

function SignalPreviewPage() {
  const handleSignupSuccess = () => {
    // Handle successful signup
    console.log('User signed up successfully');
  };

  return (
    <div className="min-h-screen">
      <PreviewSignupCard
        contactPointId="contact-123"
        isSignUpError={false}
        redirectTo="/dashboard/signals"
        signalPreviewUrl="/signals/preview"
        onSignupSuccess={handleSignupSuccess}
      />
    </div>
  );
}

// With error handling
function SignalPreviewWithError() {
  return (
    <PreviewSignupCard
      contactPointId="contact-456"
      isSignUpError={true}
      oauthError="OAuth authentication failed"
      redirectTo="/dashboard/signals"
      signalPreviewUrl="/signals/preview"
    />
  );
}
```

## Functionality

- **Responsive Layout**: Adapts UI elements based on screen size (mobile vs desktop)
- **Marketing Content**: Displays compelling copy on desktop to encourage signup
- **Authentication Integration**: Embeds the main `SignUpForm` component with preview-specific configuration
- **Navigation Handling**: Provides seamless transitions between signup and signin flows
- **Error State Management**: Handles and displays OAuth and general signup errors
- **Context Preservation**: Maintains signal preview context through URL parameters during auth flows

## State Management

- **Local State**: Uses React hooks (`useMemo`, `useCallback`) for derived values and memoized functions
- **No External State**: Does not directly interact with TanStack Query or Zustand
- **State Delegation**: Delegates form state management to the embedded `SignUpForm` component

## Side Effects

- **Navigation**: Triggers router navigation to signin page when user selects signin option
- **URL Construction**: Builds parameterized URLs for OAuth error redirects and signin flows
- **Callback Execution**: Executes optional success callback after signup completion

## Dependencies

### Components
- `SignUpForm` - Core authentication form component
- `Typography` - UI typography component for text display

### Hooks
- `useBreakpoint` - Custom hook for responsive breakpoint detection
- `useRouter` - Next.js navigation hook

### Utilities
- `defaultParamsSerializer` - URL parameter serialization utility
- Constants for URL parameter names (`REDIRECT_TO_PARAM`, `REFERRER_PARAM`, etc.)

## Integration

The `PreviewSignupCard` integrates into the larger application architecture by:

- **Authentication Flow**: Connects to the main authentication system through `SignUpForm`
- **Signal System**: Maintains context about specific signals through contact point IDs
- **Routing System**: Integrates with Next.js App Router for navigation
- **Design System**: Uses consistent UI components and styling patterns
- **Error Handling**: Participates in application-wide error handling patterns

## Best Practices

✅ **Follows Architecture Guidelines**:
- Client component only where necessary for interactivity
- Delegates complex logic to specialized components (`SignUpForm`)
- Uses custom hooks for responsive behavior
- Maintains flat component structure

✅ **Performance Optimizations**:
- Memoizes expensive URL construction with `useMemo`
- Memoizes callback functions with `useCallback`
- Conditional rendering based on breakpoints

✅ **Error Handling**:
- Gracefully handles multiple error states
- Provides appropriate fallback behaviors
- Maintains user context during error recovery

✅ **Responsive Design**:
- Adapts content and layout for different screen sizes
- Provides optimal UX across devices
- Uses design system breakpoints consistently

✅ **Integration Patterns**:
- Uses referrer tracking for analytics
- Maintains URL parameter consistency
- Follows application routing conventions