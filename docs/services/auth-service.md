# AuthService Documentation

## Purpose

The `AuthService` manages user authentication operations including user registration, login, password management, email verification, and logout functionality. This service handles all authentication-related API communication and credential management for the application.

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `signup` | `dto: UserSignUpDto`, `signal?: AbortSignal` | `Promise<User>` | Creates a new user account |
| `login` | `dto: UserLoginDto`, `signal?: AbortSignal` | `Promise<User>` | Authenticates user and returns user data |
| `forgotPassword` | `dto: UserForgotPasswordDto`, `signal?: AbortSignal` | `Promise<void>` | Initiates password reset process |
| `resetPassword` | `dto: UserResetPasswordDto`, `signal?: AbortSignal` | `Promise<void>` | Completes password reset with token |
| `logout` | `signal?: AbortSignal` | `Promise<void>` | Terminates user session |
| `verifyEmail` | `token: string`, `signal?: AbortSignal` | `Promise<void>` | Verifies user email with token |

## Authentication

The service uses `PrivateApiServiceWrapper` primarily for the logout functionality which requires authenticated requests. Other methods (signup, login, forgotPassword, resetPassword, verifyEmail) are typically public endpoints that don't require prior authentication.

### Credential Handling
- **Authenticated endpoints**: `logout` - requires valid session/token
- **Public endpoints**: All other methods - no authentication required
- **Session management**: Login method establishes session, logout terminates it

## Error Handling

Following our service architecture, this service does not handle errors internally. All HTTP errors are thrown as `HttpException` instances for non-2xx responses and are handled by the query layer (TanStack Query hooks).

```typescript
// Errors are automatically thrown by the service wrapper
// No try/catch needed in service methods
```

## Usage Examples

### Basic Authentication Flow

```typescript
import { AuthService } from '@/lib/services/auth-service';

// User signup
const newUser = await AuthService.signup({
  email: 'user@example.com',
  password: 'securePassword123',
  firstName: 'John',
  lastName: 'Doe'
});

// User login
const authenticatedUser = await AuthService.login({
  email: 'user@example.com',
  password: 'securePassword123'
});

// User logout
await AuthService.logout();
```

### Password Management

```typescript
// Initiate password reset
await AuthService.forgotPassword({
  email: 'user@example.com'
});

// Complete password reset
await AuthService.resetPassword({
  token: 'reset-token-from-email',
  newPassword: 'newSecurePassword123'
});
```

### Email Verification

```typescript
// Verify email with token
await AuthService.verifyEmail('verification-token-from-email');
```

### With AbortSignal

```typescript
const controller = new AbortController();

// Cancel request if needed
setTimeout(() => controller.abort(), 5000);

const user = await AuthService.login(
  { email: 'user@example.com', password: 'password' },
  controller.signal
);
```

## Related Types

### Request DTOs
```typescript
interface UserSignUpDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface UserLoginDto {
  email: string;
  password: string;
}

interface UserForgotPasswordDto {
  email: string;
}

interface UserResetPasswordDto {
  token: string;
  newPassword: string;
}
```

### Response Types
```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}
```

## Dependencies

- **`PrivateApiServiceWrapper`**: Provides authenticated API client with credential management
- **DTOs**: Type-safe request/response data transfer objects
- **Types**: Core application types (User interface)

## Integration

### TanStack Query Integration

This service integrates seamlessly with TanStack Query hooks for proper state management and error handling:

```typescript
// Query hooks example usage
const useSignup = () => {
  return useMutation({
    mutationFn: (dto: UserSignUpDto) => AuthService.signup(dto),
    onSuccess: (user) => {
      // Handle successful signup
      queryClient.setQueryData(['user'], user);
    }
  });
};

const useLogin = () => {
  return useMutation({
    mutationFn: (dto: UserLoginDto) => AuthService.login(dto),
    onSuccess: (user) => {
      // Handle successful login
      queryClient.setQueryData(['user'], user);
    }
  });
};

const useLogout = () => {
  return useMutation({
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      // Clear user data and redirect
      queryClient.clear();
    }
  });
};
```

## Best Practices

### Service Architecture Compliance
✅ **Simple, focused methods**: Each method handles a single authentication operation  
✅ **No error handling**: Errors thrown as HttpException, handled by query hooks  
✅ **No data transformation**: Returns raw API responses  
✅ **Proper credential management**: Uses PrivateApiServiceWrapper for authenticated requests  
✅ **HTTP Exception pattern**: Non-2xx responses automatically throw HttpException  

### Implementation Guidelines
- Always pass `AbortSignal` for request cancellation support
- Use appropriate DTOs for type safety
- Handle authentication state changes in query hooks, not service methods
- Leverage service wrapper for consistent credential management
- Follow the single responsibility principle - one operation per method

### Security Considerations
- Sensitive operations (logout) properly use authenticated wrapper
- Password reset uses secure token-based flow
- Email verification requires token validation
- No credential storage or management within service methods