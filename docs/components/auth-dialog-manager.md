# AuthDialogManager Component Documentation

## Purpose

The `AuthDialogManager` is a lightweight manager component that automatically opens authentication dialogs based on user state and URL parameters. It monitors authentication status and URL search parameters to trigger appropriate authentication flows, such as email verification prompts for unverified users or password reset dialogs when reset tokens are present in the URL.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Accesses browser APIs through `useSearchParams` hook
- Manages side effects with `useEffect`
- Interacts with client-side state management (authentication context)
- Responds to URL parameter changes that occur on the client

## Props Interface

### AuthDialogManager
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| None | - | - | This component accepts no props |

### AuthDialogManagerInner
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| None | - | - | This component accepts no props |

## Usage Example

```tsx
import { AuthDialogManager } from '@/components/authentication/auth-dialog-manager';

// App-level integration
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AuthDialogProvider>
            {children}
            {/* Place at app level to monitor authentication state globally */}
            <AuthDialogManager />
            <AuthDialog />
          </AuthDialogProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

// Alternative: Feature-specific placement
export function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="authenticated-layout">
      <Header />
      <main>{children}</main>
      <AuthDialogManager />
    </div>
  );
}
```

## Functionality

### Core Features

1. **Automatic Email Verification Prompt**
   - Detects users who are authenticated but not email-verified
   - Opens verification dialog automatically without dismissibility

2. **Password Reset Flow Initiation**
   - Monitors URL for reset password tokens
   - Triggers password reset dialog when token is detected

3. **State-Driven Dialog Management**
   - Reacts to authentication state changes
   - Prevents premature dialog triggers during loading states

### Behavior Patterns

- **Non-Rendering**: Returns empty fragment, purely for side effects
- **Conditional Activation**: Only triggers dialogs after loading completes
- **URL Parameter Monitoring**: Continuously watches for authentication-related URL changes

## State Management

### Context Dependencies
- **`useAccessToken`**: Consumes authentication state from Zustand store
  - `isLoading`: Prevents premature dialog triggers
  - `isAuthorizedNotVerified`: Identifies users needing email verification
  - `isPublic`: Provides context for authentication requirements

- **`useAuthDialog`**: Manages dialog state and actions
  - `onAuthDialogOpen`: Triggers dialog with specific step and dismissibility

### State Flow
```
URL/Auth State Change → useEffect → Condition Check → Dialog Trigger
```

## Side Effects

### Primary Side Effect
- **Dialog State Mutation**: Calls `onAuthDialogOpen` to modify global dialog state

### Effect Dependencies
- Responds to changes in authentication status
- Reacts to URL parameter modifications
- Triggers on component mount and relevant state updates

### Effect Timing
- Waits for `!isLoading` to ensure authentication state is stable
- Executes immediately when conditions are met

## Dependencies

### Hooks
- `useSearchParams` - Next.js navigation hook for URL parameter access
- `useAccessToken` - Custom authentication context hook
- `useAuthDialog` - Custom dialog management context hook

### Constants
- `RESET_PASSWORD_TOKEN_PARAM` - URL parameter name for reset tokens
- `AuthDialogStep` - Enum defining dialog flow steps

### Context Requirements
- Must be wrapped in authentication provider
- Requires dialog state provider in component tree

## Integration

### Application Architecture Role

```
App Layout
├── Authentication Provider
├── Dialog Provider
├── Main Content
└── AuthDialogManager ← Monitors and triggers
```

### Integration Points

1. **Authentication System**: Integrates with broader auth context
2. **Routing**: Responds to Next.js router parameter changes
3. **Dialog System**: Coordinates with centralized dialog management
4. **User Experience**: Provides seamless authentication flow transitions

## Best Practices

### Architecture Adherence

✅ **Proper Client Component Usage**: Uses `'use client'` only when necessary for browser APIs

✅ **Component Decomposition**: Separates Suspense wrapper from core logic for better error boundaries

✅ **State Management Pattern**: Leverages Zustand through context for authentication state

✅ **Flat Architecture**: Simple, focused component without deep nesting

### Implementation Patterns

✅ **Effect Dependencies**: Properly declares all dependencies in useEffect array

✅ **Loading State Handling**: Prevents side effects during loading states

✅ **Separation of Concerns**: Focuses solely on dialog triggering logic

✅ **Suspense Integration**: Properly wraps async components with Suspense boundary

### Usage Recommendations

- Place at application root level for global authentication monitoring
- Ensure authentication and dialog providers are available in component tree
- Consider placement after main content to avoid blocking rendering
- Use in conjunction with actual dialog components for complete flow