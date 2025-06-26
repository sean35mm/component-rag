# User Query Hooks

## Purpose

The user query hooks provide comprehensive TanStack Query integration for managing user-related data and operations. These hooks handle user profile management, authentication state, password updates, and email verification processes with proper caching, optimistic updates, and error handling.

## Hooks Overview

| Hook | Type | Purpose |
|------|------|---------|
| `useUserDetails` | Query | Fetches current user profile details |
| `useUpdateUserDetails` | Mutation | Updates user profile information |
| `useUpdateUserPassword` | Mutation | Changes user password |
| `useResendEmailVerification` | Mutation | Resends email verification |

## Query Hooks

### useUserDetails

Fetches the current authenticated user's profile details with automatic authorization checking.

**Signature:**
```tsx
function useUserDetails<T = User>(
  options?: UseQueryOptions<User, T>
): UseQueryResult<T, Error>
```

**Features:**
- **Authorization-dependent**: Only executes when user is authorized
- **Token-based caching**: Query key includes access token for proper cache isolation
- **Selector support**: Transform data with custom selector functions
- **Automatic enabling**: Conditionally enabled based on authorization state

**Basic Usage:**
```tsx
function UserProfile() {
  const { data: user, isLoading, error } = useUserDetails();

  if (isLoading) return <div>Loading profile...</div>;
  if (error) return <div>Error loading profile</div>;

  return (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
}
```

## Mutation Hooks

### useUpdateUserDetails

Updates user profile information with optimistic cache updates.

**Signature:**
```tsx
function useUpdateUserDetails(
  options?: UseMutationOptions<User, UpdateUserDetailsDto>
): UseMutationResult<User, Error, UpdateUserDetailsDto>
```

**Features:**
- **Optimistic updates**: Immediately updates cache with new user data
- **Cache synchronization**: Updates query cache with fresh token-based key
- **Type-safe payload**: Uses `UpdateUserDetailsDto` for request validation

**Usage:**
```tsx
function EditProfile() {
  const updateUser = useUpdateUserDetails({
    onSuccess: (user) => {
      console.log('Profile updated:', user.name);
    }
  });

  const handleSubmit = (formData: UpdateUserDetailsDto) => {
    updateUser.mutate({
      name: formData.name,
      email: formData.email
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button 
        type="submit" 
        disabled={updateUser.isPending}
      >
        {updateUser.isPending ? 'Updating...' : 'Update Profile'}
      </button>
    </form>
  );
}
```

### useUpdateUserPassword

Handles secure password updates with proper validation.

**Signature:**
```tsx
function useUpdateUserPassword(
  options?: UseMutationOptions<void, UpdateUserPasswordDto>
): UseMutationResult<void, Error, UpdateUserPasswordDto>
```

**Features:**
- **Security-focused**: No return data to prevent password exposure
- **Validation support**: Uses `UpdateUserPasswordDto` for input validation
- **Custom error handling**: Supports custom error handling strategies

**Usage:**
```tsx
function ChangePassword() {
  const changePassword = useUpdateUserPassword({
    onSuccess: () => {
      toast({ title: 'Password updated successfully!' });
    },
    onError: (error) => {
      toast({ 
        title: 'Password update failed', 
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  const handlePasswordChange = (data: UpdateUserPasswordDto) => {
    changePassword.mutate({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword
    });
  };

  return (
    <form onSubmit={handlePasswordChange}>
      <input type="password" name="currentPassword" required />
      <input type="password" name="newPassword" required />
      <input type="password" name="confirmPassword" required />
      <button type="submit" disabled={changePassword.isPending}>
        Change Password
      </button>
    </form>
  );
}
```

### useResendEmailVerification

Resends email verification with built-in toast notifications.

**Signature:**
```tsx
function useResendEmailVerification(
  options?: UseMutationOptions<void, ResendEmailVerificationDto>
): UseMutationResult<void, Error, ResendEmailVerificationDto>
```

**Features:**
- **Built-in notifications**: Automatic success toast messages
- **Error handling**: Integrated error toast notifications
- **User feedback**: Clear success/error states for UI updates

**Usage:**
```tsx
function EmailVerificationBanner() {
  const resendVerification = useResendEmailVerification();

  const handleResend = () => {
    resendVerification.mutate({
      email: user.email
    });
  };

  return (
    <div className="verification-banner">
      <p>Please verify your email address</p>
      <button 
        onClick={handleResend}
        disabled={resendVerification.isPending}
      >
        {resendVerification.isPending ? 'Sending...' : 'Resend Verification'}
      </button>
    </div>
  );
}
```

## Query Keys

Query keys are managed using `@lukemorales/query-key-factory` for consistency and type safety:

```tsx
// Generated query keys structure
queryKeys.user.getDetails(token) // ['user', 'getDetails', token]
queryKeys.user._def // ['user'] - base key for mutations
```

**Key Features:**
- **Token-based isolation**: User details cached per access token
- **Consistent structure**: Predictable key patterns across the application
- **Mutation keys**: Scoped mutation keys for proper invalidation

## Selector Support

Transform query data using selector functions:

```tsx
// Extract specific user properties
const userName = useUserDetails({
  select: (user) => user.name
});

// Transform user data structure
const userDisplayInfo = useUserDetails({
  select: (user) => ({
    displayName: `${user.firstName} ${user.lastName}`,
    initials: `${user.firstName[0]}${user.lastName[0]}`,
    isVerified: user.emailVerified
  })
});

// Computed user state
const userPermissions = useUserDetails({
  select: (user) => ({
    canEdit: user.role === 'admin' || user.role === 'editor',
    canDelete: user.role === 'admin',
    isOwner: user.role === 'owner'
  })
});
```

## Caching Strategy

### Query Caching
- **Token-based keys**: User data cached with access token to prevent cross-user data leaks
- **Authorization dependency**: Queries only run when user is authorized
- **Automatic invalidation**: Cache cleared when authorization state changes

### Mutation Updates
- **Optimistic updates**: `useUpdateUserDetails` immediately updates cache
- **Cache synchronization**: New user data updates cache with fresh token key
- **Selective invalidation**: Only relevant queries invalidated after mutations

```tsx
// Cache update strategy in useUpdateUserDetails
onSuccess: (user) => {
  // Update cache with new user data and fresh token
  queryClient.setQueryData(
    queryKeys.user.getDetails(userToAccessToken(user)).queryKey,
    user
  );
}
```

## Error Handling

### Query Errors
- **Service-level throwing**: UserService throws HttpException for errors
- **TanStack Query handling**: Let TanStack Query manage error states
- **Component-level handling**: Handle errors in components as needed

```tsx
const { data, error, isError } = useUserDetails();

if (isError) {
  // Handle specific error types
  if (error.status === 401) {
    redirectToLogin();
  } else if (error.status === 403) {
    showAccessDeniedMessage();
  }
}
```

### Mutation Errors
- **Built-in handling**: `useResendEmailVerification` includes toast error handling
- **Custom handling**: Other mutations support custom error callbacks
- **Error propagation**: Errors bubble up for component-level handling

```tsx
const updateUser = useUpdateUserDetails({
  onError: (error, variables, context) => {
    // Custom error handling
    if (error.status === 409) {
      toast({ title: 'Email already exists' });
    } else {
      toast({ title: 'Update failed', description: error.message });
    }
  }
});
```

## Related Services

### UserService Integration
These hooks integrate with `UserService` methods:

```tsx
// Service method mapping
UserService.getUserDetails()        // → useUserDetails
UserService.updateUserDetails()     // → useUpdateUserDetails  
UserService.updateUserPassword()    // → useUpdateUserPassword
UserService.resendEmailVerification() // → useResendEmailVerification
```

### Context Dependencies
- **useAccessToken**: Provides authorization state and token for queries
- **useToast**: Toast notifications for user feedback
- **useHandleToastError**: Standardized error message handling

## Best Practices

### Authorization Patterns
```tsx
// ✅ Good: Check authorization before using user data
const { data: user, isLoading } = useUserDetails();
const { isAuthorized } = useAccessToken();

if (!isAuthorized) {
  return <LoginPrompt />;
}

// ✅ Good: Handle loading states properly
if (isLoading) {
  return <UserProfileSkeleton />;
}
```

### Mutation Patterns
```tsx
// ✅ Good: Handle all mutation states
const updateUser = useUpdateUserDetails({
  onSuccess: (user) => {
    toast({ title: 'Profile updated!' });
    onClose(); // Close modal/form
  },
  onError: (error) => {
    // Handle specific error cases
    handleApiError(error);
  }
});

// ✅ Good: Show loading states
<button disabled={updateUser.isPending}>
  {updateUser.isPending ? 'Updating...' : 'Update Profile'}
</button>
```

### Selective Data Usage
```tsx
// ✅ Good: Use selectors for specific data needs
const userRole = useUserDetails({
  select: (user) => user.role,
  staleTime: 5 * 60 * 1000 // Cache role for 5 minutes
});

// ✅ Good: Minimize re-renders with focused selectors
const isAdmin = useUserDetails({
  select: (user) => user.role === 'admin'
});
```

### Error Boundaries
```tsx
// ✅ Good: Wrap user components in error boundaries
<ErrorBoundary fallback={<UserProfileError />}>
  <UserProfile />
</ErrorBoundary>
```