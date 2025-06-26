# GoogleAuthButton Component

## Purpose

The `GoogleAuthButton` component provides a standardized OAuth2 authentication button for Google sign-in/sign-up flows. It handles URL construction for OAuth2 endpoints, manages redirect flows, and provides a consistent UI for Google authentication across login and signup scenarios.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Utilizes browser APIs through `useRouter` for navigation
- Handles click events and user interactions
- Manages client-side routing and URL construction

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `prefix` | `'login' \| 'signup'` | ✅ | Determines the OAuth2 endpoint and error parameter mapping |
| `redirect` | `string` | ✅ | Success redirect URL after successful authentication |
| `errorRedirect` | `string` | ✅ | Error redirect URL when authentication fails |
| `referrer` | `string` | ❌ | Optional referrer parameter for tracking authentication source |
| `className` | `string` | ❌ | Additional CSS classes for styling customization |
| `...rest` | `HTMLAttributes<HTMLButtonElement>` | ❌ | Standard HTML button attributes |

## Usage Example

```tsx
import { GoogleAuthButton } from '@/components/authentication/google-auth-button';

// Login scenario
<GoogleAuthButton
  prefix="login"
  redirect="/dashboard"
  errorRedirect="/login"
  referrer="homepage"
  className="mb-4"
/>

// Signup scenario
<GoogleAuthButton
  prefix="signup"
  redirect="/onboarding"
  errorRedirect="/signup"
  referrer="landing-page"
/>

// With custom styling
<GoogleAuthButton
  prefix="login"
  redirect="/app"
  errorRedirect="/auth/error"
  className="my-custom-button-class"
  disabled={isLoading}
/>
```

## Functionality

### Core Features
- **OAuth2 URL Construction**: Dynamically builds Google OAuth2 endpoints with proper parameters
- **Redirect Management**: Handles both success and error redirect flows with appropriate error parameters
- **Dual Mode Support**: Supports both login and signup authentication flows
- **Referrer Tracking**: Optional referrer parameter for analytics and user journey tracking
- **Consistent UI**: Provides standardized Google branding with logo and styling

### URL Construction Logic
- Constructs OAuth2 endpoint: `/v1/auth/oauth2/{prefix}/google`
- Adds success redirect URL as `redirectUrl` parameter
- Adds error redirect URL with appropriate error parameter as `errorRedirectUrl`
- Optionally includes referrer for tracking purposes

## State Management

**Local State Only** - This component uses:
- `useMemo` for OAuth2 URL construction and memoization
- `useCallback` for click handler optimization
- No external state management (TanStack Query/Zustand) required
- Relies on Next.js router for navigation state

## Side Effects

### Navigation Effects
- **Router Push**: Navigates to constructed OAuth2 URL on button click
- **External Redirect**: Triggers OAuth2 flow that redirects to Google's authentication servers
- **Return Handling**: OAuth2 service handles return redirects to specified success/error URLs

### URL Construction
- Dynamically constructs URLs based on environment configuration
- Sets appropriate error parameters based on authentication context

## Dependencies

### Internal Dependencies
- `@/components/ui/button` - Base button component for consistent styling
- `@/env` - Environment configuration for API base URL
- `@/lib/constants` - OAuth error parameter constants
- `@/lib/utils/cn` - Class name utility for styling
- `@/lib/utils/redirect-to` - URL construction utility

### External Dependencies
- `next/image` - Optimized image component for Google logo
- `next/navigation` - Next.js 13+ navigation hooks
- `react` - Core React hooks and types

### Constants
```tsx
export const PREFIX_TO_ERROR_PARAM: Record<GoogleAuthProps['prefix'], string> = {
  login: OAUTH_SIGN_IN_ERROR_PARAM,
  signup: OAUTH_SIGN_UP_ERROR_PARAM,
};
```

## Integration

### Authentication Flow
1. **Component Render**: Button renders with Google branding
2. **User Click**: Triggers OAuth2 URL navigation
3. **External OAuth**: Google handles authentication
4. **Return Redirect**: OAuth2 service redirects back to application
5. **Error Handling**: Failed authentication redirects to error page with appropriate parameters

### Application Architecture
- **Authentication Layer**: Core component in authentication domain
- **Reusable Across Features**: Used in login, signup, and registration flows
- **Consistent Branding**: Maintains Google OAuth standards
- **Error Integration**: Works with application error handling system

## Best Practices

### Architecture Adherence
✅ **Client Component Usage**: Appropriately uses client component for user interactions  
✅ **Props Interface**: Clear, typed interface with required/optional distinction  
✅ **Component Decomposition**: Single responsibility for Google OAuth initiation  
✅ **Reusability**: Generic enough for multiple authentication scenarios  

### Performance Optimizations
- **Memoized URL Construction**: Prevents unnecessary recalculations
- **Callback Optimization**: Prevents unnecessary re-renders
- **Image Optimization**: Uses Next.js optimized image component

### Security Considerations
- **Environment Configuration**: Uses secure environment variables for API URLs
- **URL Validation**: Leverages `getRedirectUrl` utility for safe URL construction
- **Error Parameter Isolation**: Separate error parameters for different authentication contexts

### Usage Guidelines
- Always provide both success and error redirect URLs
- Use appropriate prefix ('login' vs 'signup') for the authentication context
- Include referrer parameter for analytics and user journey tracking
- Leverage className prop for context-specific styling while maintaining base design