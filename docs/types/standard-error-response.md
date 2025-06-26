# StandardErrorResponse

## Purpose

The `StandardErrorResponse` interface defines a consistent error response structure used throughout the application for handling API errors and standardizing error communication between services, components, and external APIs. This interface ensures all error responses follow the same format, enabling predictable error handling and improved debugging capabilities.

## Type Definition

```typescript
export interface StandardErrorResponse {
  status: number;
  message: string;
  timestamp: number;
}
```

This interface represents a standardized error response object that provides essential error information in a consistent format across all application layers.

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `status` | `number` | Yes | HTTP status code indicating the type of error (e.g., 400, 404, 500) |
| `message` | `string` | Yes | Human-readable error message describing what went wrong |
| `timestamp` | `number` | Yes | Unix timestamp (milliseconds) when the error occurred |

## Usage Examples

### Basic Error Response Creation

```typescript
import { StandardErrorResponse } from '@/lib/types/standard-error-response';

// Creating a standard error response
const notFoundError: StandardErrorResponse = {
  status: 404,
  message: 'User not found',
  timestamp: Date.now()
};

// Validation error example
const validationError: StandardErrorResponse = {
  status: 400,
  message: 'Invalid email format provided',
  timestamp: Date.now()
};
```

### API Service Integration

```typescript
import { StandardErrorResponse } from '@/lib/types/standard-error-response';

class ApiService {
  async fetchUser(id: string): Promise<User | StandardErrorResponse> {
    try {
      const response = await fetch(`/api/users/${id}`);
      
      if (!response.ok) {
        return {
          status: response.status,
          message: await response.text() || 'Failed to fetch user',
          timestamp: Date.now()
        };
      }
      
      return await response.json() as User;
    } catch (error) {
      return {
        status: 500,
        message: 'Network error occurred',
        timestamp: Date.now()
      };
    }
  }
}
```

### Error Handling in Components

```typescript
import { useState, useEffect } from 'react';
import { StandardErrorResponse } from '@/lib/types/standard-error-response';

interface UserProfileProps {
  userId: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<StandardErrorResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const result = await apiService.fetchUser(userId);
      
      if ('status' in result) {
        // It's an error response
        setError(result);
        setUser(null);
      } else {
        // It's a successful user response
        setUser(result);
        setError(null);
      }
      
      setLoading(false);
    };

    loadUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <ErrorMessage error={error} />;
  if (!user) return <div>No user data</div>;

  return <div>{/* User profile content */}</div>;
};
```

### Error Response Utility Functions

```typescript
import { StandardErrorResponse } from '@/lib/types/standard-error-response';

// Type guard to check if response is an error
export const isErrorResponse = (
  response: unknown
): response is StandardErrorResponse => {
  return (
    typeof response === 'object' &&
    response !== null &&
    'status' in response &&
    'message' in response &&
    'timestamp' in response &&
    typeof response.status === 'number' &&
    typeof response.message === 'string' &&
    typeof response.timestamp === 'number'
  );
};

// Error response factory
export const createErrorResponse = (
  status: number,
  message: string
): StandardErrorResponse => ({
  status,
  message,
  timestamp: Date.now()
});

// Common error responses
export const ErrorResponses = {
  notFound: (resource: string): StandardErrorResponse =>
    createErrorResponse(404, `${resource} not found`),
  
  unauthorized: (): StandardErrorResponse =>
    createErrorResponse(401, 'Unauthorized access'),
  
  badRequest: (message: string): StandardErrorResponse =>
    createErrorResponse(400, message),
  
  serverError: (): StandardErrorResponse =>
    createErrorResponse(500, 'Internal server error')
} as const;
```

## Type Architecture Pattern

Following our type architecture pattern, `StandardErrorResponse` serves as a foundational response type:

```typescript
// Domain objects (base entities)
interface User {
  id: string;
  email: string;
  name: string;
}

// Response shapes (extend domain objects or provide structure)
interface UserResponse {
  data: User;
  metadata: ResponseMetadata;
}

// Error responses (alternative to success responses)
interface StandardErrorResponse {
  status: number;
  message: string;
  timestamp: number;
}

// Union types for complete API responses
type ApiResponse<T> = T | StandardErrorResponse;

// Request types (input structures)
interface CreateUserRequest {
  email: string;
  name: string;
}
```

## Related Types

### Extended Error Response Types

```typescript
// Enhanced error response with additional context
interface DetailedErrorResponse extends StandardErrorResponse {
  code: string;
  details?: Record<string, unknown>;
  stack?: string;
}

// Validation-specific error response
interface ValidationErrorResponse extends StandardErrorResponse {
  status: 400;
  errors: Array<{
    field: string;
    message: string;
  }>;
}

// API response union types
type UserApiResponse = User | StandardErrorResponse;
type UsersListResponse = User[] | StandardErrorResponse;
```

### Generic Response Wrapper

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: StandardErrorResponse;
}

// Usage with generic response wrapper
const response: ApiResponse<User> = {
  success: false,
  error: {
    status: 404,
    message: 'User not found',
    timestamp: Date.now()
  }
};
```

## Integration Points

### API Routes (Next.js)

```typescript
import { NextResponse } from 'next/server';
import { StandardErrorResponse } from '@/lib/types/standard-error-response';

export async function GET(request: Request) {
  try {
    // API logic here
    const user = await getUser(id);
    return NextResponse.json(user);
  } catch (error) {
    const errorResponse: StandardErrorResponse = {
      status: 500,
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: Date.now()
    };
    
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
```

### Error Boundary Integration

```typescript
interface ErrorBoundaryState {
  error: StandardErrorResponse | null;
}

class ApiErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      error: {
        status: 500,
        message: error.message,
        timestamp: Date.now()
      }
    };
  }

  render() {
    if (this.state.error) {
      return <ErrorDisplay error={this.state.error} />;
    }

    return this.props.children;
  }
}
```

## Validation

### Zod Schema

```typescript
import { z } from 'zod';

export const standardErrorResponseSchema = z.object({
  status: z.number().int().min(100).max(599),
  message: z.string().min(1).max(1000),
  timestamp: z.number().int().positive()
});

// Type inference from schema
export type StandardErrorResponseZod = z.infer<typeof standardErrorResponseSchema>;

// Validation function
export const validateErrorResponse = (
  data: unknown
): StandardErrorResponse => {
  return standardErrorResponseSchema.parse(data);
};
```

### Runtime Validation

```typescript
import { standardErrorResponseSchema } from './validation';

export const parseApiError = (response: unknown): StandardErrorResponse => {
  try {
    return standardErrorResponseSchema.parse(response);
  } catch (error) {
    // Fallback error response if validation fails
    return {
      status: 500,
      message: 'Invalid error response format',
      timestamp: Date.now()
    };
  }
};
```

## Best Practices

### 1. Strict Typing Adherence

```typescript
// ✅ Good: Strict typing with explicit interface
const handleError = (error: StandardErrorResponse): void => {
  console.error(`Error ${error.status}: ${error.message}`);
};

// ❌ Avoid: Using any type
const handleError = (error: any): void => {
  console.error(error);
};
```

### 2. Interface Consistency

```typescript
// ✅ Good: Using interface for object shape
export interface StandardErrorResponse {
  status: number;
  message: string;
  timestamp: number;
}

// ❌ Avoid: Using type alias for simple object shapes
export type StandardErrorResponse = {
  status: number;
  message: string;
  timestamp: number;
};
```

### 3. Error Response Factory Pattern

```typescript
// ✅ Good: Centralized error creation
export const createStandardError = (
  status: number,
  message: string
): StandardErrorResponse => ({
  status,
  message,
  timestamp: Date.now()
});

// ✅ Good: Predefined common errors
export const CommonErrors = {
  UNAUTHORIZED: createStandardError(401, 'Unauthorized'),
  NOT_FOUND: createStandardError(404, 'Resource not found'),
  SERVER_ERROR: createStandardError(500, 'Internal server error')
} as const;
```

### 4. Type Guards for Runtime Safety

```typescript
// ✅ Good: Type guard for runtime type checking
export const isStandardErrorResponse = (
  value: unknown
): value is StandardErrorResponse => {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as StandardErrorResponse).status === 'number' &&
    typeof (value as StandardErrorResponse).message === 'string' &&
    typeof (value as StandardErrorResponse).timestamp === 'number'
  );
};
```

### 5. Utility Type Integration

```typescript
// ✅ Good: Using utility types for variations
type PartialErrorResponse = Partial<StandardErrorResponse>;
type ErrorWithoutTimestamp = Omit<StandardErrorResponse, 'timestamp'>;
type ErrorStatusOnly = Pick<StandardErrorResponse, 'status'>;

// Factory for building complete error from partial
export const buildErrorResponse = (
  partial: ErrorWithoutTimestamp
): StandardErrorResponse => ({
  ...partial,
  timestamp: Date.now()
});
```

This type serves as a cornerstone for consistent error handling across the application, ensuring predictable error structures and enabling robust error management patterns throughout the codebase.