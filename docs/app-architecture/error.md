# Next.js App Router Error Boundary Pattern

## Route Structure

```
src/app/
├── error.tsx         # Global error boundary for entire app
├── layout.tsx        # Root layout
├── page.tsx          # Homepage
└── [other-routes]/
    ├── error.tsx     # Route-specific error boundaries
    └── page.tsx
```

This pattern implements the **Global Error Boundary** for the Next.js 15+ App Router, providing application-wide error handling and recovery mechanisms.

## Purpose

The global error boundary pattern serves several critical purposes:

- **Centralized Error Handling**: Catches unhandled errors throughout the entire application
- **User Experience**: Provides graceful error recovery instead of white screens
- **Error Reporting**: Central point for error logging and monitoring integration
- **Fallback UI**: Displays user-friendly error messages with recovery options
- **Development Support**: Enhanced error information during development

## Route Groups

While this specific error boundary is global, the pattern supports route-group-specific error handling:

```
src/app/
├── error.tsx                    # Global fallback
├── (auth)/
│   ├── error.tsx               # Auth-specific errors
│   └── login/page.tsx
├── (dashboard)/
│   ├── error.tsx               # Dashboard-specific errors
│   └── overview/page.tsx
└── (marketing)/
    ├── error.tsx               # Marketing-specific errors
    └── about/page.tsx
```

## Layout Hierarchy

Error boundaries cascade through the layout hierarchy:

```
Root Layout (layout.tsx)
├── Global Error Boundary (error.tsx) ← This component
├── Route Group Layouts
│   ├── Route-Specific Error Boundaries
│   └── Page Components
└── Nested Layouts
    ├── Nested Error Boundaries
    └── Nested Pages
```

**Error Boundary Precedence:**
1. Nearest error boundary catches the error first
2. Falls back to parent error boundaries if nested boundary fails
3. Global error boundary as final fallback

## Data Flow

```typescript
interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}
```

**Error Information Flow:**
- `error`: Contains error details and optional digest for server errors
- `reset`: Function to attempt recovery by re-rendering the error boundary
- **Server Errors**: Include digest for secure error identification
- **Client Errors**: Full error details available in development

## Server vs Client Components

```tsx
'use client'; // ← Required for error boundaries

import { ErrorPage } from '@/components/error/error-page';

export default ErrorPage;
```

**Why Client Component:**
- Error boundaries require React lifecycle methods (`componentDidCatch`)
- Need access to browser APIs for error reporting
- Interactive recovery mechanisms (retry buttons, navigation)
- State management for error recovery attempts

**Server Component Alternative:**
```tsx
// For static error pages without interactivity
export default function StaticError() {
  return <div>Something went wrong</div>;
}
```

## Loading States

Error boundaries don't directly handle loading states, but work with loading patterns:

```tsx
// ErrorPage component structure
export function ErrorPage({ error, reset }: ErrorBoundaryProps) {
  const [isRetrying, setIsRetrying] = useState(false);
  
  const handleRetry = async () => {
    setIsRetrying(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    reset();
    setIsRetrying(false);
  };

  return (
    <div>
      <h1>Something went wrong</h1>
      <button onClick={handleRetry} disabled={isRetrying}>
        {isRetrying ? 'Retrying...' : 'Try again'}
      </button>
    </div>
  );
}
```

## Error Handling

### Error Boundary Hierarchy

```tsx
// Different error types and their boundaries
export default function ErrorPage({ error, reset }: ErrorBoundaryProps) {
  // Network errors
  if (error.message.includes('fetch')) {
    return <NetworkErrorUI onRetry={reset} />;
  }
  
  // Authentication errors
  if (error.message.includes('Unauthorized')) {
    return <AuthErrorUI />;
  }
  
  // Generic errors
  return <GenericErrorUI error={error} onRetry={reset} />;
}
```

### Error Reporting Integration

```tsx
// src/components/error/error-page.tsx
'use client';

import { useEffect } from 'react';
import { reportError } from '@/lib/error-reporting';

export function ErrorPage({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Report to monitoring service
    reportError(error, {
      boundary: 'global',
      url: window.location.href,
      userAgent: navigator.userAgent,
    });
  }, [error]);

  return (
    // Error UI
  );
}
```

## Metadata

Error boundaries don't generate metadata directly, but can trigger metadata updates:

```tsx
// In the ErrorPage component
import { useEffect } from 'react';

export function ErrorPage({ error }: ErrorBoundaryProps) {
  useEffect(() => {
    // Update document title for error state
    document.title = 'Error - MyApp';
    
    // Add error-specific meta tags
    const metaError = document.createElement('meta');
    metaError.name = 'robots';
    metaError.content = 'noindex,nofollow';
    document.head.appendChild(metaError);
    
    return () => {
      document.head.removeChild(metaError);
    };
  }, []);
}
```

## Security

### Error Information Exposure

```tsx
// Secure error handling
export function ErrorPage({ error }: ErrorBoundaryProps) {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  return (
    <div>
      <h1>Something went wrong</h1>
      {isDevelopment && (
        <details>
          <summary>Error Details (Development Only)</summary>
          <pre>{error.stack}</pre>
        </details>
      )}
      <p>Error ID: {error.digest}</p> {/* Safe to show */}
    </div>
  );
}
```

### CSP and Error Reporting

```tsx
// Report errors while respecting CSP
const reportError = async (error: Error) => {
  try {
    await fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        digest: error.digest,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (reportingError) {
    console.error('Failed to report error:', reportingError);
  }
};
```

## Performance

### Error Boundary Optimization

```tsx
// Memoized error component
import { memo } from 'react';

export const ErrorPage = memo(function ErrorPage({ 
  error, 
  reset 
}: ErrorBoundaryProps) {
  // Component implementation
});
```

### Lazy Loading Error Components

```tsx
// Dynamic error component loading
import { lazy, Suspense } from 'react';

const DetailedErrorPage = lazy(() => 
  import('@/components/error/detailed-error-page')
);

export function ErrorPage({ error, reset }: ErrorBoundaryProps) {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <div>
      <BasicErrorUI />
      {showDetails && (
        <Suspense fallback={<div>Loading error details...</div>}>
          <DetailedErrorPage error={error} />
        </Suspense>
      )}
    </div>
  );
}
```

## Environment Variables

```tsx
// src/env.ts
export const env = {
  ERROR_REPORTING_URL: process.env.ERROR_REPORTING_URL,
  SENTRY_DSN: process.env.SENTRY_DSN,
  LOG_LEVEL: process.env.LOG_LEVEL || 'error',
} as const;

// Usage in error boundary
import { env } from '@/env';

export function ErrorPage({ error }: ErrorBoundaryProps) {
  useEffect(() => {
    if (env.ERROR_REPORTING_URL) {
      reportToService(error, env.ERROR_REPORTING_URL);
    }
    
    if (env.SENTRY_DSN) {
      Sentry.captureException(error);
    }
  }, [error]);
}
```

### Environment-Specific Error Handling

```tsx
// Different behavior per environment
const getErrorBehavior = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return {
        showStack: true,
        autoReport: false,
        showRetry: true,
      };
    case 'staging':
      return {
        showStack: false,
        autoReport: true,
        showRetry: true,
      };
    case 'production':
      return {
        showStack: false,
        autoReport: true,
        showRetry: false,
      };
    default:
      return {
        showStack: false,
        autoReport: false,
        showRetry: true,
      };
  }
};
```

## Best Practices

1. **Always use 'use client'** for error boundaries
2. **Provide meaningful error messages** without exposing sensitive information
3. **Implement retry mechanisms** for recoverable errors
4. **Report errors to monitoring services** for production debugging
5. **Use error digests** for secure error identification
6. **Cascade error boundaries** from specific to general
7. **Test error boundaries** with error simulation in development