# WithProtection Component

## Purpose

The `WithProtection` component is a higher-order component (HOC) that provides authentication-based route protection. It wraps child components and automatically redirects unauthenticated users to a designated route, ensuring that protected content is only accessible to authorized users.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Utilizes Next.js router for client-side navigation
- Accesses authentication context that requires browser-side state
- Performs conditional rendering based on real-time authentication status

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `ReactNode` | Yes | The protected content to render when user is authenticated |

## Usage Example

```tsx
import { WithProtection } from '@/components/authentication/with-protection';
import { UserDashboard } from '@/components/dashboard/user-dashboard';

// Protecting a single component
export default function DashboardPage() {
  return (
    <WithProtection>
      <UserDashboard />
    </WithProtection>
  );
}

// Protecting multiple components
export default function ProfilePage() {
  return (
    <WithProtection>
      <div>
        <ProfileHeader />
        <ProfileContent />
        <ProfileSettings />
      </div>
    </WithProtection>
  );
}

// Using the redirect route constant
import { REDIRECT_ROUTE } from '@/components/authentication/with-protection';

console.log('Users will be redirected to:', REDIRECT_ROUTE); // '/'
```

## Functionality

### Core Features

- **Authentication Guard**: Prevents unauthorized access to protected content
- **Automatic Redirection**: Redirects unauthenticated users to the home route
- **Loading State Handling**: Waits for authentication status to be determined before making decisions
- **Transparent Wrapper**: Renders children without additional markup when authenticated

### Behavior Flow

1. **Initial Load**: Component checks authentication status from context
2. **Loading State**: While authentication is being determined, no action is taken
3. **Unauthenticated**: Redirects user to `REDIRECT_ROUTE` and renders `null`
4. **Authenticated**: Renders the protected children components

## State Management

- **External State**: Consumes authentication state via `useAccessToken` context hook
- **No Local State**: Component is stateless and relies entirely on context-provided authentication data
- **Reactive**: Automatically responds to authentication state changes

## Side Effects

### Navigation Side Effects
- **Router Push**: Triggers client-side navigation when unauthorized access is detected
- **Conditional Rendering**: Returns `null` after redirect to prevent flash of unauthorized content

### Performance Considerations
- **Minimal Re-renders**: Only re-renders when authentication status changes
- **Early Return**: Efficiently handles unauthorized states with early null return

## Dependencies

### Internal Dependencies
- `useAccessToken` - Custom hook providing authentication state
- `useRouter` - Next.js navigation hook for client-side routing

### External Dependencies
- `next/navigation` - Next.js App Router navigation utilities
- `react` - Core React types and functionality

## Integration

### Application Architecture Role

```tsx
// Layout integration
export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <WithProtection>
      <ProtectedHeader />
      {children}
      <ProtectedFooter />
    </WithProtection>
  );
}

// Page-level protection
export default function AdminPage() {
  return (
    <WithProtection>
      <AdminDashboard />
    </WithProtection>
  );
}
```

### Authentication Flow Integration

- **Context Provider**: Integrates with authentication context system
- **Route Guard**: Works as middleware layer for route protection
- **User Experience**: Provides seamless redirect experience for unauthorized users

## Best Practices

### Architecture Alignment

✅ **Follows Guidelines**:
- **Client Component Justification**: Appropriately uses client-side rendering for router and context access
- **Single Responsibility**: Focused solely on authentication protection logic
- **Reusable Pattern**: Can be applied to any component requiring protection
- **Flat Component Structure**: Simple wrapper without complex nesting

### Implementation Recommendations

```tsx
// ✅ Good: Wrap at appropriate levels
function ProtectedFeature() {
  return (
    <WithProtection>
      <FeatureContent />
    </WithProtection>
  );
}

// ✅ Good: Use exported constant for consistency
import { REDIRECT_ROUTE } from '@/components/authentication/with-protection';

// ✅ Good: Combine with other guards if needed
function AdminProtection({ children }: { children: ReactNode }) {
  return (
    <WithProtection>
      <RoleGuard requiredRole="admin">
        {children}
      </RoleGuard>
    </WithProtection>
  );
}
```

### Usage Patterns

- **Page Level**: Protect entire pages by wrapping page components
- **Layout Level**: Protect sections by wrapping layout components
- **Feature Level**: Protect specific features or components
- **Composition**: Combine with other protection components for multi-layered security