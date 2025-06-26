# SignUpPage Component

## Purpose

The `SignUpPage` component serves as a page-level wrapper for the sign-up functionality, handling URL parameters and navigation logic while delegating the actual form rendering to the `SignUpForm` component. It manages error states from both direct sign-up attempts and OAuth authentication flows, and provides seamless navigation between sign-up and sign-in pages while preserving redirect and referrer parameters.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires client-side functionality including:
- Next.js router navigation with `useRouter`
- Interactive callbacks for navigation handling
- Client-side parameter processing and URL manipulation

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isSignUpError` | `boolean` | Yes | Indicates if there was an error during the sign-up process |
| `oauthError` | `string` | No | Specific error message from OAuth authentication failures |
| `redirect` | `string` | Yes | URL path to redirect to after successful authentication |
| `referrer` | `string` | No | Original page that referred the user to sign-up, used for analytics and UX |

## Usage Example

```tsx
// In a Next.js page component (app/sign-up/page.tsx)
import { SignUpPage } from '@/components/authentication/sign-up-page';

export default function Page({ searchParams }: { searchParams: Record<string, string> }) {
  return (
    <SignUpPage
      isSignUpError={searchParams.error === 'true'}
      oauthError={searchParams.oauth_error}
      redirect={searchParams.redirect_to || '/dashboard'}
      referrer={searchParams.referrer}
    />
  );
}

// Usage with error handling
<SignUpPage
  isSignUpError={false}
  oauthError="oauth_access_denied"
  redirect="/dashboard"
  referrer="/pricing"
/>
```

## Functionality

### Core Features
- **Parameter Management**: Serializes redirect and referrer parameters for consistent URL handling
- **Navigation Control**: Provides seamless transition to sign-in page while preserving context
- **Error State Handling**: Manages both general sign-up errors and specific OAuth errors
- **URL Preservation**: Maintains redirect and referrer information across page transitions

### Key Behaviors
- Automatically constructs query parameters for navigation
- Preserves user context when switching between authentication pages
- Handles OAuth error redirects back to the same page with preserved parameters
- Optimizes parameter serialization with memoization

## State Management

**No Direct State Management** - This component acts as a stateless wrapper that:
- Receives state through props (typically from URL search parameters)
- Uses memoized computations for parameter serialization
- Delegates state management to the child `SignUpForm` component
- Relies on URL state for persistence across navigation

## Side Effects

### Navigation Effects
- **Router Navigation**: Uses Next.js router to programmatically navigate to sign-in page
- **URL Parameter Preservation**: Maintains query parameters across page transitions

### Performance Optimizations
- **Memoized Parameters**: Prevents unnecessary re-serialization of URL parameters
- **Callback Optimization**: Uses `useCallback` to prevent unnecessary re-renders of child components

## Dependencies

### Internal Dependencies
```tsx
// Components
import { SignUpForm } from './sign-up-form';

// Constants & Utilities
import { REDIRECT_TO_PARAM, REFERRER_PARAM } from '@/lib/constants';
import { defaultParamsSerializer } from '@/lib/utils/fetch';
```

### External Dependencies
- **Next.js**: `useRouter` for client-side navigation
- **React**: Hooks for optimization (`useCallback`, `useMemo`)

### Child Components
- `SignUpForm`: Handles the actual form rendering and submission logic

## Integration

### Application Architecture Role
```
Page Level (app/sign-up/page.tsx)
    ↓
SignUpPage (Parameter & Navigation Logic)
    ↓
SignUpForm (Form Logic & UI)
    ↓
UI Components (Form fields, buttons, etc.)
```

### URL Parameter Flow
1. **Page receives** search parameters from URL
2. **SignUpPage processes** parameters and error states
3. **Parameters preserved** during navigation between auth pages
4. **Redirect handled** after successful authentication

### Error Handling Integration
- Receives error states from parent page component
- Passes OAuth errors to child form for appropriate display
- Provides error recovery through navigation options

## Best Practices

### ✅ Architectural Compliance
- **Proper Component Layering**: Acts as a focused page wrapper, delegating UI concerns to child components
- **Separation of Concerns**: Handles navigation and parameter logic separately from form logic
- **Client Component Usage**: Appropriately uses client component only when needed for navigation
- **Performance Optimization**: Implements proper memoization for expensive operations

### ✅ URL State Management
- **Parameter Consistency**: Uses centralized constants for parameter names
- **State Preservation**: Maintains user context across navigation
- **Error Recovery**: Provides clear paths for error handling and recovery

### ✅ Navigation Patterns
- **Programmatic Navigation**: Uses Next.js router appropriately for SPA-like experience
- **Context Preservation**: Maintains redirect and referrer information for better UX
- **Parameter Serialization**: Uses consistent utility functions for URL handling

### Integration Considerations
- Component expects to be used at the page level with URL search parameters
- Requires proper error handling at the parent level
- Should be paired with corresponding sign-in page for complete auth flow
- Depends on consistent parameter naming across the authentication system