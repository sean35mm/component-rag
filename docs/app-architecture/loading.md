# Next.js 15+ App Router Architecture: Loading Component Pattern

## Overview

This document outlines the loading component architecture pattern used in our Next.js 15+ App Router application, specifically for the signals feature within a dashboard context. This pattern demonstrates sophisticated authorization-aware loading states with proper fallback handling.

## Route Structure

```
src/app/(dashboard)/(features)/(non-shareable-features)/signals/
├── loading.tsx          # Loading UI component (this file)
├── page.tsx            # Main signals page
├── error.tsx           # Error boundary
└── not-found.tsx       # 404 fallback
```

### Route Pattern Analysis

- **Base Route**: `/signals`
- **Nested Route Groups**: Three levels of logical organization
- **File Convention**: `loading.tsx` follows Next.js App Router special file conventions
- **Kebab-case Naming**: Consistent with our architectural guidelines

## Purpose

This loading component serves multiple critical functions:

1. **Authorization-Aware Loading**: Provides different loading experiences based on user authorization status
2. **Conditional UI Rendering**: Shows appropriate content for public vs. authenticated users
3. **Graceful Degradation**: Handles unauthorized access with meaningful fallbacks
4. **Performance Optimization**: Prevents flash of incorrect content during auth checks

## Route Groups

### Route Group Hierarchy

```
(dashboard)/                    # Dashboard layout context
└── (features)/                # Feature-specific organization
    └── (non-shareable-features)/  # Private/authenticated features
        └── signals/           # Signals feature route
```

### Route Group Purposes

| Route Group | Purpose | URL Impact |
|-------------|---------|------------|
| `(dashboard)` | Applies dashboard layout and authentication | None |
| `(features)` | Groups all feature routes together | None |
| `(non-shareable-features)` | Isolates private features requiring auth | None |

## Layout Hierarchy

The loading component inherits from multiple layout levels:

```
app/layout.tsx                  # Root layout (global providers)
└── (dashboard)/layout.tsx      # Dashboard shell, navigation
    └── (features)/layout.tsx   # Feature-specific layouts (if exists)
        └── loading.tsx         # This loading component
```

## Data Flow

### Authorization Context Flow

```mermaid
graph TD
    A[useAccessToken Hook] --> B{isAuthorizationLoading?}
    B -->|true| C[Show SignalPageSkeleton]
    B -->|false| D{isPublic || !isAuthorized?}
    D -->|true| E[Show DashboardEmptyState]
    D -->|false| F[Show SignalPageSkeleton]
```

### State Dependencies

- **isAuthorized**: Boolean indicating user authorization status
- **isPublic**: Boolean for public access mode
- **isAuthorizationLoading**: Loading state for auth check

## Server vs Client Components

### Why Client Component?

```tsx
'use client';
```

This component uses the `'use client'` directive because:

1. **Context Consumption**: Uses `useAccessToken()` hook for authorization state
2. **Dynamic Rendering**: Requires client-side authorization checks
3. **Interactive State**: Needs to respond to auth state changes

### Server Component Alternative

For server-rendered loading states, consider:

```tsx
// Alternative server component approach
export default function Loading() {
  return <SignalPageSkeleton />;
}
```

## Loading States

### Loading State Patterns

| Condition | Component | Purpose |
|-----------|-----------|---------|
| Public access or unauthorized | `DashboardEmptyState` | Graceful degradation |
| Authorized or auth loading | `SignalPageSkeleton` | Content placeholder |

### Loading Component Features

- **Conditional Rendering**: Different UIs based on authorization
- **Skeleton Patterns**: Maintains layout stability during loading
- **Empty States**: Meaningful fallbacks for unauthorized access

## Error Handling

### Error Boundary Integration

```tsx
// Companion error.tsx file
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="error-container">
      <h2>Something went wrong with signals!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

### Authorization Error Handling

- **Unauthorized Access**: Shows `DashboardEmptyState` instead of error
- **Loading Failures**: Gracefully degrades to skeleton state
- **Context Errors**: Handled by error boundaries at higher levels

## Metadata

### Loading State Metadata

Loading components don't generate metadata directly, but the parent page handles SEO:

```tsx
// page.tsx metadata
export const metadata: Metadata = {
  title: 'Signals | Dashboard',
  description: 'Real-time signals and analytics',
  robots: { index: false }, // Private feature
};
```

## Security

### Authorization Patterns

```tsx
const {
  isAuthorized,
  isPublic,
  isLoading: isAuthorizationLoading,
} = useAccessToken();
```

### Security Considerations

1. **Client-Side Auth Checks**: First line of defense only
2. **Server-Side Validation**: API routes must validate tokens
3. **Progressive Enhancement**: Works without JavaScript for basic cases
4. **Information Disclosure**: Empty state prevents feature enumeration

### Security Best Practices

- **Token Validation**: Server-side validation for actual data access
- **Route Protection**: Multiple layers of authorization checks
- **Graceful Degradation**: No error messages that reveal system internals

## Performance

### Optimization Strategies

1. **Concurrent Rendering**: Loading UI shows immediately while auth resolves
2. **Skeleton Loading**: Maintains visual stability
3. **Conditional Rendering**: Avoids unnecessary component mounting
4. **Context Optimization**: Efficient auth state management

### Performance Benefits

- **Immediate Feedback**: Users see loading state instantly
- **Layout Stability**: Skeleton prevents content jumping
- **Efficient Renders**: Conditional logic prevents unnecessary updates

### Streaming Integration

```tsx
// How this works with React 18 Suspense
<Suspense fallback={<Loading />}>
  <SignalsPage />
</Suspense>
```

## Environment Variables

### Related Environment Variables

```typescript
// src/env.ts
export const env = createEnv({
  client: {
    NEXT_PUBLIC_API_URL: z.string().url(),
    NEXT_PUBLIC_AUTH_DOMAIN: z.string(),
  },
  server: {
    AUTH_SECRET: z.string(),
    DATABASE_URL: z.string().url(),
  },
});
```

### Environment Usage in Auth Context

The `useAccessToken` hook likely consumes:

- **NEXT_PUBLIC_API_URL**: For auth validation endpoints
- **NEXT_PUBLIC_AUTH_DOMAIN**: For token validation
- **AUTH_SECRET**: Server-side token verification (indirect)

## Implementation Examples

### Complete Loading Component Pattern

```tsx
'use client';

import { DashboardEmptyState } from '@/components/signals/dashboard-empty-state';
import { SignalPageSkeleton } from '@/components/ui/skeletons/signal-page-skeleton';
import { useAccessToken } from '@/lib/contexts';

export default function Loading() {
  const {
    isAuthorized,
    isPublic,
    isLoading: isAuthorizationLoading,
  } = useAccessToken();

  // Show empty state for unauthorized users
  if (isPublic || (!isAuthorizationLoading && !isAuthorized)) {
    return <DashboardEmptyState />;
  }

  // Show skeleton for authorized users
  return <SignalPageSkeleton />;
}
```

### Companion Components

```tsx
// SignalPageSkeleton component
export function SignalPageSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-1/4"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  );
}
```

## Best Practices

1. **Authorization-First**: Always check auth state before rendering content
2. **Graceful Degradation**: Provide meaningful fallbacks for all states
3. **Performance Conscious**: Use efficient loading patterns
4. **User Experience**: Maintain layout stability with skeletons
5. **Security Minded**: Don't reveal system internals through loading states

## Migration Considerations

When upgrading to this pattern:

1. **Context Migration**: Ensure auth context is available at loading level
2. **Component Updates**: Update skeleton components for consistency
3. **Testing**: Test all authorization state combinations
4. **Performance**: Monitor loading state performance impact