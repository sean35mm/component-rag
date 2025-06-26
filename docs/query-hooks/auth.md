# Authentication Query Hooks

## Purpose

The authentication query hooks provide comprehensive state management for user authentication flows including sign-in, sign-up, logout, email verification, and password reset. These hooks integrate with TanStack Query to manage authentication state, handle cross-tab communication, and coordinate with various application contexts and services.

## Hooks Overview

| Hook | Type | Purpose |
|------|------|---------|
| `useClearPublicMetadata` | Utility | Clears all public page metadata across contexts |
| `useOnAuth` | Utility | Internal hook for handling post-authentication logic |
| `useSignIn` | Mutation | Handles user sign-in with error tracking |
| `useSignUp` | Mutation | Handles user registration |
| `useLogout` | Mutation | Handles user logout and cleanup |
| `useVerifyEmail` | Mutation | Handles email verification |
| `useForgotPassword` | Mutation | Initiates password reset flow |
| `useResetPassword` | Mutation | Completes password reset with new password |

## Utility Hooks

### useClearPublicMetadata

A utility hook that clears all public page metadata across different contexts.

```tsx
export const useClearPublicMetadata = () => {
  const { setPublicDeepSearchMetadata } = usePublicExplorePage();
  const { setPublicSharedThreadMetadata } = usePublicSharedThreadPage();
  const { setPublicStoryMetadata } = usePublicStoryPage();
  const { setPublicThreadMetadata } = usePublicThreadPage();
  
  return useCallback(() => {
    setPublicDeepSearchMetadata(null);
    setPublicSharedThreadMetadata(null);
    setPublicStoryMetadata(null);
    setPublicThreadMetadata(null);
  }, [
    setPublicDeepSearchMetadata,
    setPublicSharedThreadMetadata,
    setPublicStoryMetadata,
    setPublicThreadMetadata,
  ]);
};
```

**Usage:**
```tsx
const clearMetadata = useClearPublicMetadata();

// Clear all public metadata
clearMetadata();
```

### useOnAuth (Internal)

Internal utility hook that handles post-authentication logic including metadata cleanup, token refresh, and navigation.

```tsx
const useOnAuth = (
  redirect?: string,
  onSuccess?: (user: User) => Promise<void> | void
) => {
  // Handles authentication success workflow
};
```

## Mutation Hooks

### useSignIn

Handles user sign-in with unsuccessful attempt tracking and comprehensive error handling.

**Parameters:**
- `redirect: string` - URL to redirect to after successful sign-in
- `options: Omit<UseMutationOptions<User, UserLoginDto>, 'throwOnError'>` - TanStack Query mutation options

**Returns:**
- Standard TanStack Query mutation result
- `unsuccessfulAttempts: number` - Count of failed attempts
- `setUnsuccessfulAttempts: (count: number) => void` - Reset attempt counter

**Usage:**
```tsx
const LoginForm = () => {
  const { 
    mutate: signIn, 
    isPending, 
    unsuccessfulAttempts,
    setUnsuccessfulAttempts 
  } = useSignIn('/dashboard', {
    onSuccess: (user) => {
      console.log('User signed in:', user.email);
    }
  });

  const handleSubmit = (credentials: UserLoginDto) => {
    signIn(credentials);
  };

  return (
    <form onSubmit={handleSubmit}>
      {unsuccessfulAttempts > 3 && (
        <div>Too many failed attempts</div>
      )}
      {/* Form fields */}
      <button disabled={isPending}>
        {isPending ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
};
```

### useSignUp

Handles user registration with automatic authentication on success.

**Parameters:**
- `redirect?: string` - Optional URL to redirect to after successful sign-up
- `options: Omit<UseMutationOptions<User, UserSignUpDto>, 'throwOnError'>` - TanStack Query mutation options

**Usage:**
```tsx
const SignUpForm = () => {
  const { mutate: signUp, isPending, error } = useSignUp('/onboarding', {
    onSuccess: (user) => {
      console.log('User registered:', user.email);
    }
  });

  const handleSubmit = (userData: UserSignUpDto) => {
    signUp(userData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={isPending}>
        {isPending ? 'Creating Account...' : 'Sign Up'}
      </button>
    </form>
  );
};
```

### useLogout

Handles user logout with comprehensive cleanup including metadata, tabs, analytics, and cross-tab communication.

**Parameters:**
- `options: UseMutationOptions<void, void>` - TanStack Query mutation options

**Usage:**
```tsx
const LogoutButton = () => {
  const { mutate: logout, isPending } = useLogout({
    onSuccess: () => {
      console.log('User logged out successfully');
    }
  });

  return (
    <button onClick={() => logout()} disabled={isPending}>
      {isPending ? 'Logging out...' : 'Logout'}
    </button>
  );
};
```

### useVerifyEmail

Handles email verification with automatic token refresh.

**Parameters:**
- `options: UseMutationOptions<void, string>` - TanStack Query mutation options

**Usage:**
```tsx
const EmailVerification = ({ token }: { token: string }) => {
  const { mutate: verifyEmail, isPending, isSuccess } = useVerifyEmail({
    onSuccess: () => {
      console.log('Email verified successfully');
    }
  });

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token, verifyEmail]);

  if (isPending) return <div>Verifying email...</div>;
  if (isSuccess) return <div>Email verified!</div>;
  
  return <div>Verification failed</div>;
};
```

### useForgotPassword

Initiates the password reset flow by sending a reset email.

**Parameters:**
- `options?: UseMutationOptions<void, UserForgotPasswordDto>` - TanStack Query mutation options

**Usage:**
```tsx
const ForgotPasswordForm = () => {
  const { mutate: forgotPassword, isPending, isSuccess } = useForgotPassword({
    onSuccess: () => {
      console.log('Reset email sent');
    }
  });

  const handleSubmit = (email: string) => {
    forgotPassword({ email });
  };

  if (isSuccess) {
    return <div>Reset email sent! Check your inbox.</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Enter your email" />
      <button disabled={isPending}>
        {isPending ? 'Sending...' : 'Send Reset Email'}
      </button>
    </form>
  );
};
```

### useResetPassword

Completes the password reset process with a new password.

**Parameters:**
- `options?: UseMutationOptions<void, UserResetPasswordDto>` - TanStack Query mutation options

**Usage:**
```tsx
const ResetPasswordForm = ({ token }: { token: string }) => {
  const { mutate: resetPassword, isPending, isSuccess } = useResetPassword({
    onSuccess: () => {
      console.log('Password reset successfully');
    }
  });

  const handleSubmit = (newPassword: string) => {
    resetPassword({ token, password: newPassword });
  };

  if (isSuccess) {
    return <div>Password reset successfully! You can now sign in.</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="password" placeholder="Enter new password" />
      <button disabled={isPending}>
        {isPending ? 'Resetting...' : 'Reset Password'}
      </button>
    </form>
  );
};
```

## Query Keys

Authentication hooks use the query-key-factory pattern for consistent cache management:

```tsx
// Query keys structure
queryKeys.auth._def // Base auth key
[...queryKeys.auth._def, 'signIn'] // Sign-in mutation key
[...queryKeys.auth._def, 'signUp'] // Sign-up mutation key
[...queryKeys.auth._def, 'logout'] // Logout mutation key
[...queryKeys.auth._def, 'verifyEmail'] // Email verification key
[...queryKeys.auth._def, 'forgotPassword'] // Forgot password key
[...queryKeys.auth._def, 'resetPassword'] // Reset password key
```

## Caching Strategy

### Mutation Behavior
- **No Query Caching**: Authentication mutations don't cache response data
- **Side Effect Management**: Mutations trigger various side effects (navigation, cleanup, token refresh)
- **Cross-Tab Communication**: Login/logout events are broadcast to other browser tabs

### Cache Invalidation
- **Token Refresh**: `onReset(true)` invalidates and refetches user-related queries
- **Metadata Cleanup**: Public page metadata is cleared on authentication changes
- **Analytics Reset**: User analytics data is reset on logout

## Error Handling

### Comprehensive Error Management
```tsx
// Sign-in with error tracking
const { mutate: signIn, unsuccessfulAttempts } = useSignIn('/dashboard');

// Custom error handling
const { mutate: signUp } = useSignUp('/onboarding', {
  onError: (error, variables, context) => {
    console.error('Sign-up failed:', error);
    // Custom error handling logic
  }
});
```

### Error Features
- **Automatic Toast Notifications**: Errors are automatically displayed to users
- **Sentry Integration**: Errors are captured with context for monitoring
- **Attempt Tracking**: Failed sign-in attempts are tracked and can trigger additional security measures
- **Error Propagation**: Custom error handlers can be provided via options

## Related Services

### AuthService Integration
```tsx
// Service methods used by hooks
AuthService.login(credentials: UserLoginDto): Promise<User>
AuthService.signup(userData: UserSignUpDto): Promise<User>
AuthService.logout(): Promise<void>
AuthService.verifyEmail(token: string): Promise<void>
AuthService.forgotPassword(data: UserForgotPasswordDto): Promise<void>
AuthService.resetPassword(data: UserResetPasswordDto): Promise<void>
```

### Context Integration
- **Access Token Context**: Manages JWT tokens and user state
- **Public Page Contexts**: Handles metadata for public pages
- **Tabs Store**: Manages application tab state
- **Analytics Provider**: Handles user analytics and tracking

## Best Practices

### 1. Error Handling
```tsx
// Let hooks handle standard errors, add custom logic as needed
const { mutate: signIn } = useSignIn('/dashboard', {
  onError: (error, variables) => {
    // Custom error handling
    trackAuthenticationFailure(variables.email);
  }
});
```

### 2. Loading States
```tsx
// Always handle loading states appropriately
const { mutate: logout, isPending } = useLogout();

return (
  <button onClick={() => logout()} disabled={isPending}>
    {isPending ? 'Logging out...' : 'Logout'}
  </button>
);
```

### 3. Success Callbacks
```tsx
// Use onSuccess for additional actions after authentication
const { mutate: signUp } = useSignUp('/onboarding', {
  onSuccess: (user) => {
    // Track successful registration
    analytics.track('user_registered', { email: user.email });
  }
});
```

### 4. Redirect Handling
```tsx
// Always provide appropriate redirect URLs
const { mutate: signIn } = useSignIn('/dashboard'); // Redirect after sign-in
const { mutate: signUp } = useSignUp('/onboarding'); // Redirect after sign-up
```

### 5. Unsuccessful Attempts
```tsx
// Monitor and respond to failed authentication attempts
const { mutate: signIn, unsuccessfulAttempts, setUnsuccessfulAttempts } = useSignIn('/dashboard');

if (unsuccessfulAttempts > 5) {
  // Implement additional security measures
  showCaptcha();
}

// Reset attempts when needed
const handleResetAttempts = () => {
  setUnsuccessfulAttempts(0);
};
```

These authentication hooks provide a comprehensive solution for managing user authentication state while maintaining consistency with TanStack Query patterns and integrating seamlessly with the application's architecture.