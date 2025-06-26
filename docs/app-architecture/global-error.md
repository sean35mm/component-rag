# Global Error Component Architecture

## Route Structure

```
src/app/
├── global-error.tsx     # Root-level error boundary
├── error.tsx           # Route-level error boundary
├── not-found.tsx       # 404 handler
├── layout.tsx          # Root layout
└── globals.css         # Global styles
```

The `global-error.tsx` file represents Next.js 15's **root error boundary** that catches unhandled errors at the application level, including errors from the root layout component.

## Purpose

This architectural pattern serves as the **ultimate error fallback** for the entire Next.js application:

- **Root-Level Error Handling**: Catches errors that bubble up from anywhere in the app, including the root layout
- **Complete HTML Structure**: Provides a full HTML document since it replaces the entire page when errors occur
- **Graceful Degradation**: Ensures users never see a blank page or browser error, maintaining brand consistency
- **Theme Preservation**: Maintains theming and styling even in error states
- **Client-Side Recovery**: Enables error recovery mechanisms without full page reloads

## Route Groups

Global error handling operates **outside** of route groups since it handles application-wide failures:

```
src/app/
├── (dashboard)/         # Route group - has own error.tsx
├── (auth)/             # Route group - has own error.tsx  
├── (marketing)/        # Route group - has own error.tsx
└── global-error.tsx    # Catches errors from ALL route groups
```

The global error boundary acts as a safety net when route-specific error boundaries fail or when errors occur in shared layouts.

## Layout Hierarchy

The global error component **replaces the entire layout hierarchy** when activated:

```tsx
// Normal hierarchy:
<RootLayout>
  <RouteLayout>
    <Page />
  </RouteLayout>
</RootLayout>

// When global error triggers:
<GlobalError>
  <ThemeProvider>
    <ErrorPage />
  </ThemeProvider>
</GlobalError>
```

Key considerations:
- Must include complete HTML structure (`<html>`, `<body>`)
- Recreates essential providers (ThemeProvider)
- Bypasses all layout components to prevent error loops

## Data Flow

Global error components receive specific error-related props:

```tsx
interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}
```

**Data Flow Pattern**:
1. **Error Capture**: Catches unhandled errors from anywhere in the app
2. **Error Metadata**: Receives error object with stack trace and digest
3. **Recovery Function**: Gets reset function to attempt error recovery
4. **Context Preservation**: Maintains theme and essential app state

## Server vs Client Components

```tsx
'use client'; // Required for error boundaries
```

**Why Client Component**:
- **Error Boundaries**: React error boundaries only work in client components
- **Interactive Recovery**: Needs to handle user interactions (retry buttons)
- **State Management**: Manages error state and recovery attempts
- **Event Handling**: Handles click events for error reporting/recovery

**Server Component Integration**:
```tsx
// ErrorPage can contain server components for static content
<ErrorPage>
  <ServerRenderedErrorDetails />
  <ClientInteractiveRecovery />
</ErrorPage>
```

## Loading States

Global errors don't have traditional loading states, but handle **error state transitions**:

```tsx
// Error recovery loading pattern
const [isRecovering, setIsRecovering] = useState(false);

const handleReset = async () => {
  setIsRecovering(true);
  try {
    await reset();
  } finally {
    setIsRecovering(false);
  }
};
```

**Loading Considerations**:
- Show loading state during error recovery
- Prevent multiple recovery attempts
- Provide clear feedback during reset operations

## Error Handling

**Error Hierarchy** in Next.js 15:
1. **Component Error Boundaries** - Catch component-specific errors
2. **Route Error Boundaries** (`error.tsx`) - Catch route-level errors
3. **Global Error Boundary** (`global-error.tsx`) - Ultimate fallback

```tsx
// Error handling strategy
export default function GlobalError({ error, reset }: ErrorPageProps) {
  // Log critical errors
  useEffect(() => {
    console.error('Global error caught:', error);
    // Send to error reporting service
    reportError(error);
  }, [error]);

  return (
    <html {...DEFAULT_THEME_HTML_ATTRIBUTES}>
      <body>
        <ThemeProvider>
          <ErrorPage 
            error={error} 
            reset={reset}
            severity="critical"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## Metadata

Global errors **cannot use Next.js metadata API** since they replace the entire document:

```tsx
// ❌ Cannot use - component replaces <head>
export const metadata = { title: 'Error' };

// ✅ Must include metadata manually
<html>
  <head>
    <title>Application Error</title>
    <meta name="robots" content="noindex" />
  </head>
  <body>...</body>
</html>
```

**SEO Considerations**:
- Include `noindex` meta tag for error pages
- Provide meaningful error page titles
- Consider structured data for error reporting

## Security

**Security Patterns**:

```tsx
// Sanitize error messages in production
const sanitizedError = process.env.NODE_ENV === 'production' 
  ? { message: 'Something went wrong' }
  : error;

// Prevent sensitive information leakage
const errorReport = {
  message: error.message,
  digest: error.digest,
  timestamp: new Date().toISOString(),
  // Don't include stack trace in client-side reports
};
```

**Authentication Context**:
- Global errors lose authentication context
- May need to redirect to login after recovery
- Consider auth state restoration after error recovery

## Performance

**Optimization Strategies**:

```tsx
// Lazy load error reporting
const reportError = lazy(() => import('@/lib/error-reporting'));

// Minimize bundle size for error boundary
const GlobalError = dynamic(() => import('./global-error'), {
  ssr: false, // Error boundaries are client-only anyway
});

// Critical CSS inlining for error pages
import './critical-error-styles.css';
```

**Performance Considerations**:
- Keep global error component lightweight
- Inline critical styles to avoid FOUC
- Lazy load non-essential error handling features
- Consider service worker for offline error handling

## Environment Variables

```tsx
// src/env.ts
export const env = {
  NEXT_PUBLIC_ERROR_REPORTING_KEY: process.env.NEXT_PUBLIC_ERROR_REPORTING_KEY!,
  ERROR_REPORTING_ENDPOINT: process.env.ERROR_REPORTING_ENDPOINT!,
  NODE_ENV: process.env.NODE_ENV!,
} as const;

// Usage in global-error.tsx
import { env } from '@/env';

const reportError = async (error: Error) => {
  if (env.NODE_ENV === 'production' && env.ERROR_REPORTING_ENDPOINT) {
    await fetch(env.ERROR_REPORTING_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        message: error.message,
        digest: error.digest,
        url: window.location.href,
        userAgent: navigator.userAgent,
      }),
    });
  }
};
```

**Environment-Specific Behavior**:
- **Development**: Show detailed error information
- **Production**: Show generic error messages, detailed logging
- **Staging**: Balanced approach for testing error scenarios

## Best Practices

1. **Keep It Simple**: Global error components should be minimal and reliable
2. **Avoid Dependencies**: Minimize external dependencies that could also fail
3. **Inline Critical Resources**: Include essential styles and scripts inline
4. **Test Error Scenarios**: Regularly test different error conditions
5. **Monitor Error Rates**: Track global error frequency and patterns
6. **Graceful Recovery**: Provide clear paths for users to recover or continue

This architecture ensures robust error handling while maintaining a good user experience even when critical failures occur.