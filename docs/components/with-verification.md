# with-verification Component

## Purpose
The `with-verification` component provides email verification functionality with two main exports: a `Verification` component that displays the verification UI and a `WithVerification` higher-order component that conditionally renders children based on user verification status. This component acts as a gate for protecting routes and content that require verified users.

## Component Type
**Client Component** - Uses the `'use client'` directive because it relies on:
- Interactive elements (button clicks)
- React hooks for state management (`useAccessToken`, `useResendEmailVerification`)
- Conditional rendering based on authentication state

## Props Interface

### Verification Component
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | Additional CSS classes for styling customization |
| `...other` | `HTMLAttributes<HTMLDivElement>` | No | Standard HTML div attributes passed through to the Block component |

### WithVerification Component
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `ReactNode` | Yes | Content to render when user is authorized and verified |

## Usage Example

```tsx
// As a route guard wrapper
import { WithVerification } from '@/components/authentication/with-verification';

export default function ProtectedPage() {
  return (
    <WithVerification>
      <div className="dashboard">
        <h1>Protected Dashboard Content</h1>
        <p>This content only shows for verified users</p>
      </div>
    </WithVerification>
  );
}

// Using the Verification component directly
import { Verification } from '@/components/authentication/with-verification';

export default function CustomVerificationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Verification className="border rounded-lg p-8" />
    </div>
  );
}
```

## Functionality

### Verification Component
- **Email Verification UI**: Displays a centered block with verification instructions
- **Resend Functionality**: Provides a button to resend verification emails
- **Success State**: Shows confirmation message after successful email resend
- **Loading State**: Disables button during email sending process

### WithVerification Component
- **Route Protection**: Acts as a guard for verified users only
- **Conditional Rendering**: Shows children for verified users, verification UI for unverified users
- **Loading Handling**: Renders empty state during authentication checks

## State Management

### TanStack Query Integration
- **`useResendEmailVerification`**: Manages email resend mutation with loading and success states
- **Server State**: Handles API communication for verification email requests

### Context Integration  
- **`useAccessToken`**: Accesses global authentication state for verification status
- **Authentication State**: Provides `isLoading`, `isAuthorizedAndVerified` flags

## Side Effects

### API Interactions
- **Email Resend**: Triggers verification email resend via mutation
- **Authentication Check**: Continuously monitors user verification status

### UI State Changes
- **Button State**: Automatically disables during pending email requests
- **Content Toggle**: Switches between verification prompt and success message
- **Route Access**: Controls access to protected content

## Dependencies

### Internal Components
- `Block`: Layout wrapper component
- `Button`: Interactive button component  
- `ContentDivider`: Visual separator component
- `Typography`: Text rendering component

### Hooks & Contexts
- `useAccessToken`: Authentication context hook
- `useResendEmailVerification`: TanStack Query mutation hook

### Utilities
- `cn`: Utility for conditional className concatenation

## Integration

### Authentication Flow
```
User Access → WithVerification → Check Auth Status → Render Decision
                                      ↓
                              [Verified] → Show Children
                                      ↓  
                              [Unverified] → Show Verification UI
                                      ↓
                              [Loading] → Show Empty State
```

### Application Architecture
- **Route Guards**: Protects sensitive pages and features
- **Authentication Layer**: Integrates with broader auth system
- **User Experience**: Provides clear verification workflow

## Best Practices

### Architecture Adherence
✅ **Client Component Usage**: Appropriately uses client-side rendering for interactive features  
✅ **Component Decomposition**: Exports two focused components with single responsibilities  
✅ **State Management**: Leverages TanStack Query for server state, context for global auth state  
✅ **Reusability**: UI components from /ui/ directory, authentication logic properly abstracted

### Implementation Patterns
- **Conditional Rendering**: Clean ternary operators for different states
- **Props Forwarding**: Properly spreads HTML attributes to underlying components
- **Error Handling**: Graceful handling of loading and success states
- **Accessibility**: Semantic HTML structure with proper heading hierarchy

### Usage Guidelines
- Wrap protected routes with `WithVerification` for automatic verification checks
- Use `Verification` component directly when building custom verification flows
- Ensure proper loading states are handled in parent components
- Consider implementing error boundaries for failed verification attempts