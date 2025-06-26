# ErrorPageProps Type Definition

## Purpose

The `ErrorPageProps` interface defines the props structure for error boundary and error page components in the application. This type ensures consistent error handling across the application by standardizing how error information and recovery functions are passed to error display components.

## Type Definition

```typescript
export interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}
```

### Breakdown

- **Interface Pattern**: Follows our guidelines by using `interface` over `type` for object shapes
- **Strict Typing**: All properties are explicitly typed with no `any` usage
- **Error Enhancement**: Extends the native `Error` type with an optional `digest` property for enhanced error tracking

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `error` | `Error & { digest?: string }` | ✅ | The error object with optional digest for error tracking and debugging |
| `reset` | `() => void` | ✅ | Function to reset the error boundary and attempt recovery |

### Property Details

#### `error`
- **Base Type**: Native JavaScript `Error` object
- **Enhancement**: Intersection with `{ digest?: string }` for error identification
- **Purpose**: Provides error details including message, stack trace, and optional digest for logging

#### `reset`
- **Type**: Function returning `void`
- **Purpose**: Callback to clear the error state and retry the failed operation
- **Usage**: Typically triggers component re-render or navigation reset

## Usage Examples

### Basic Error Page Component

```typescript
import { ErrorPageProps } from '@/lib/types/error-page-props';

export function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="error-container">
      <h1>Something went wrong!</h1>
      <p>{error.message}</p>
      {error.digest && (
        <p className="error-digest">Error ID: {error.digest}</p>
      )}
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

### Error Boundary Implementation

```typescript
'use client';

import { Component, ReactNode } from 'react';
import { ErrorPageProps } from '@/lib/types/error-page-props';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error & { digest?: string };
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: (props: ErrorPageProps) => ReactNode;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: undefined });
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      return this.props.fallback({
        error: this.state.error,
        reset: this.handleReset,
      });
    }

    return this.props.children;
  }
}
```

### Next.js Error Page

```typescript
// app/error.tsx
'use client';

import { ErrorPageProps } from '@/lib/types/error-page-props';

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Application error:', {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
    });
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          Oops! Something went wrong
        </h2>
        <p className="text-gray-600 mb-6">{error.message}</p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
```

## Type Architecture Pattern

```typescript
// Domain Layer: Core error handling types
interface ApplicationError extends Error {
  code?: string;
  digest?: string;
  context?: Record<string, unknown>;
}

// Component Layer: UI-specific error props
interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// Service Layer: Error response types
interface ErrorResponse {
  error: ApplicationError;
  timestamp: string;
  requestId: string;
}
```

This type fits into our architecture as a **component interface type**, bridging domain error objects with UI component requirements.

## Related Types

### Potential Extensions

```typescript
// Enhanced error page props with additional metadata
interface ExtendedErrorPageProps extends ErrorPageProps {
  errorBoundary?: string;
  timestamp?: Date;
  userId?: string;
}

// Error logging props
interface ErrorLogProps {
  error: ErrorPageProps['error'];
  context: {
    component: string;
    route: string;
    userAgent: string;
  };
}

// Error recovery options
interface ErrorRecoveryProps extends ErrorPageProps {
  recoveryOptions?: {
    label: string;
    action: () => void;
  }[];
}
```

### Utility Types

```typescript
// Extract just the error type
type ErrorType = ErrorPageProps['error'];

// Create optional version for default props
type PartialErrorPageProps = Partial<ErrorPageProps>;

// Pick specific properties
type ErrorHandler = Pick<ErrorPageProps, 'reset'>;
```

## Integration Points

### Components
- **Error Pages**: Global and route-specific error displays
- **Error Boundaries**: React error boundary implementations
- **Fallback Components**: Loading and error state components

### Frameworks
- **Next.js**: `error.tsx` and `global-error.tsx` files
- **React**: Error boundary `componentDidCatch` handlers
- **Testing**: Error simulation and recovery testing

### Services
- **Error Logging**: Structured error reporting
- **Monitoring**: Error tracking and alerting
- **Analytics**: Error pattern analysis

## Validation

### Zod Schema

```typescript
import { z } from 'zod';

const ErrorPagePropsSchema = z.object({
  error: z.object({
    name: z.string(),
    message: z.string(),
    stack: z.string().optional(),
    digest: z.string().optional(),
  }),
  reset: z.function().returns(z.void()),
});

type ValidatedErrorPageProps = z.infer<typeof ErrorPagePropsSchema>;

// Runtime validation helper
export function validateErrorPageProps(props: unknown): ErrorPageProps {
  return ErrorPagePropsSchema.parse(props);
}
```

### Type Guards

```typescript
export function isErrorPageProps(value: unknown): value is ErrorPageProps {
  return (
    typeof value === 'object' &&
    value !== null &&
    'error' in value &&
    'reset' in value &&
    typeof (value as ErrorPageProps).reset === 'function'
  );
}

export function hasErrorDigest(
  error: ErrorPageProps['error']
): error is Error & { digest: string } {
  return 'digest' in error && typeof error.digest === 'string';
}
```

## Best Practices

### ✅ Recommended Patterns

```typescript
// 1. Destructure props for clarity
function ErrorPage({ error, reset }: ErrorPageProps) {
  // Implementation
}

// 2. Use type guards for optional properties
function handleError({ error, reset }: ErrorPageProps) {
  if (hasErrorDigest(error)) {
    console.log('Error digest:', error.digest);
  }
}

// 3. Compose with other interfaces when extending
interface EnhancedErrorPageProps extends ErrorPageProps {
  theme?: 'light' | 'dark';
}
```

### ❌ Anti-patterns

```typescript
// Don't use any
interface BadErrorProps {
  error: any; // Avoid this
  reset: any; // Avoid this
}

// Don't use type for object shapes
type ErrorPageProps = { // Use interface instead
  error: Error;
  reset: () => void;
};

// Don't mutate error objects
function modifyError({ error }: ErrorPageProps) {
  error.message = 'Modified'; // Don't do this
}
```

### Guidelines Adherence

- ✅ **Strict Typing**: No `any` types used
- ✅ **Interface over Type**: Uses `interface` for object shape
- ✅ **Error Enhancement**: Properly extends native `Error` type
- ✅ **Function Typing**: Explicit function signature for `reset`
- ✅ **Optional Properties**: Proper use of optional `digest` property

This type definition provides a solid foundation for consistent error handling across the application while maintaining type safety and following established architectural patterns.