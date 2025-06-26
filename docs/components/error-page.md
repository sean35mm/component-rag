# ErrorPage Component

## Purpose

The `ErrorPage` component serves as a centralized error boundary page that handles unexpected application errors. It automatically captures errors for monitoring purposes using Sentry and provides users with a standardized error interface with recovery options.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Requires the `useEffect` hook for side effects (Sentry error reporting)
- Handles client-side error state and user interactions
- Manages error recovery through the `reset` function

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `error` | `Error` | ✅ | The error object containing error details and digest |
| `reset` | `() => void` | ✅ | Function to reset the error state and retry the operation |

*Props are defined by the `ErrorPageProps` interface from `@/lib/types`*

## Usage Example

```tsx
// In a Next.js error.tsx file
'use client';

import { ErrorPage } from '@/components/error/error-page';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorPage error={error} reset={reset} />;
}
```

```tsx
// In a React Error Boundary
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorPage } from '@/components/error/error-page';

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={({ error, resetErrorBoundary }) => (
        <ErrorPage error={error} reset={resetErrorBoundary} />
      )}
    >
      <YourAppContent />
    </ErrorBoundary>
  );
}
```

## Functionality

- **Error Display**: Renders a user-friendly error screen with error code
- **Error Recovery**: Provides users with a refresh/retry mechanism
- **Error Tracking**: Automatically reports errors to monitoring systems
- **Consistent UX**: Maintains application design patterns during error states

## State Management

**No explicit state management** - This component is stateless and relies on:
- Props passed from error boundaries or Next.js error handling
- Side effects for error reporting only
- Delegates user interaction handling to the child `ErrorScreen` component

## Side Effects

- **Error Reporting**: Uses `useEffect` to capture and send error details to Sentry when the component mounts or when the error changes
- **Monitoring Integration**: Automatically categorizes errors with `SentryScope.ERROR_PAGE` for proper error tracking and analysis

## Dependencies

### Components
- `ErrorScreen` - Child component that renders the actual error UI

### Utils & Services
- `captureException` - Sentry utility for error reporting
- `SentryScope` - Error categorization constants
- `ErrorPageProps` - TypeScript interface from `@/lib/types`

### External Libraries
- React (`useEffect`, `FC`)
- Sentry (via utility wrapper)

## Integration

### Application Architecture Role
- **Error Boundary Layer**: Acts as the primary error fallback component in the application's error handling strategy
- **Monitoring Integration**: Bridges application errors with external monitoring services
- **User Experience**: Maintains consistent error handling across different parts of the application

### Usage Patterns
- Next.js `error.tsx` files for route-level error handling
- React Error Boundary fallback components
- Custom error handling scenarios requiring standardized error display

## Best Practices

✅ **Follows Architecture Guidelines**:
- **Client Component**: Appropriately uses `'use client'` only when necessary for side effects
- **Component Decomposition**: Delegates UI rendering to `ErrorScreen`, maintaining separation of concerns
- **Flat Structure**: Simple, focused component that doesn't create unnecessary nesting
- **Domain Organization**: Located in `/error/` domain folder with related error components

✅ **Error Handling Patterns**:
- Automatic error reporting without user intervention
- Graceful error recovery through the reset mechanism
- Consistent error categorization for monitoring
- User-friendly error presentation

✅ **Performance Considerations**:
- Minimal re-renders (only when error changes)
- Lightweight side effect with proper dependency array
- Efficient error capture without blocking UI