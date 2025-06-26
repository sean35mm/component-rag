# UserService API Documentation

## Overview

**Component**: `user-service`  
**File Path**: `src/lib/services/user-service.ts`  
**Export**: `UserService`

The `UserService` manages all user-related API operations including profile management, email verification, and password updates. This service provides a clean interface for user account operations and integrates seamlessly with our TanStack Query hooks for state management.

## Purpose

This service handles user account management operations:
- Retrieving current user profile details
- Updating user profile information
- Managing email verification workflows
- Handling password change operations

All operations require authentication and operate on the currently authenticated user's account.

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getUserDetails` | `signal?: AbortSignal` | `Promise<User>` | Retrieves the current user's profile information |
| `updateUserDetails` | `dto: UpdateUserDetailsDto, signal?: AbortSignal` | `Promise<User>` | Updates user profile details and returns updated user |
| `resendEmailVerification` | `dto: ResendEmailVerificationDto, signal?: AbortSignal` | `Promise<void>` | Triggers email verification resend |
| `updateUserPassword` | `dto: UpdateUserPasswordDto, signal?: AbortSignal` | `Promise<void>` | Updates the user's account password |

## Authentication

- **Authentication Required**: Yes - all methods require authenticated requests
- **Service Wrapper**: `PrivateApiServiceWrapper` - automatically handles authentication credentials
- **Credential Management**: Authentication tokens are managed automatically by the wrapper
- **Scope**: Operations are scoped to the currently authenticated user

## Error Handling

Following our service architecture patterns:

- **No Direct Error Handling**: Service methods do not catch or handle errors
- **HttpException Pattern**: Non-2xx HTTP responses are automatically converted to `HttpException` by the service wrapper
- **Error Delegation**: All error handling is delegated to TanStack Query hooks
- **AbortController Support**: All methods support request cancellation via `AbortSignal`

## Usage Examples

### Basic User Operations

```typescript
import { UserService } from '@/lib/services/user-service';

// Get current user details
const user = await UserService.getUserDetails();

// Update user profile
const updatedUser = await UserService.updateUserDetails({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com'
});

// Resend email verification
await UserService.resendEmailVerification({
  email: 'john.doe@example.com'
});

// Update password
await UserService.updateUserPassword({
  currentPassword: 'oldPassword123',
  newPassword: 'newPassword456'
});
```

### With AbortController

```typescript
const controller = new AbortController();

try {
  const user = await UserService.getUserDetails(controller.signal);
  console.log('User details:', user);
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Request was cancelled');
  }
}

// Cancel the request
controller.abort();
```

### Integration with TanStack Query

```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import { UserService } from '@/lib/services/user-service';

// Query for user details
const useUserDetails = () => {
  return useQuery({
    queryKey: ['user', 'details'],
    queryFn: ({ signal }) => UserService.getUserDetails(signal),
  });
};

// Mutation for updating user details
const useUpdateUserDetails = () => {
  return useMutation({
    mutationFn: (dto: UpdateUserDetailsDto) => 
      UserService.updateUserDetails(dto),
    onSuccess: () => {
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
```

## Related Types

### Core Types

```typescript
// User entity
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

### DTO Types

```typescript
// Update user profile details
interface UpdateUserDetailsDto {
  firstName?: string;
  lastName?: string;
  email?: string;
}

// Resend email verification
interface ResendEmailVerificationDto {
  email: string;
}

// Update user password
interface UpdateUserPasswordDto {
  currentPassword: string;
  newPassword: string;
}
```

## Dependencies

### Service Wrappers
- **`PrivateApiServiceWrapper`**: Provides authenticated API client with automatic credential management

### External Dependencies
- **DTO Types**: `@/lib/dto` - Request/response data transfer objects
- **Core Types**: `@/lib/types` - User entity and related types

## Integration

### TanStack Query Integration

```typescript
// Query Keys Convention
const userKeys = {
  all: ['user'] as const,
  details: () => [...userKeys.all, 'details'] as const,
  profile: (id: string) => [...userKeys.all, 'profile', id] as const,
};

// Example Hook Implementation
export const useUserProfile = () => {
  return useQuery({
    queryKey: userKeys.details(),
    queryFn: ({ signal }) => UserService.getUserDetails(signal),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

### State Management Patterns

```typescript
// Optimistic Updates
const useUpdateUserDetailsMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: UserService.updateUserDetails,
    onMutate: async (newUserData) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: userKeys.details() });
      
      // Snapshot previous value
      const previousUser = queryClient.getQueryData(userKeys.details());
      
      // Optimistically update
      queryClient.setQueryData(userKeys.details(), (old: User) => ({
        ...old,
        ...newUserData,
      }));
      
      return { previousUser };
    },
    onError: (err, newUserData, context) => {
      // Rollback on error
      queryClient.setQueryData(userKeys.details(), context?.previousUser);
    },
    onSettled: () => {
      // Refetch after error or success
      queryClient.invalidateQueries({ queryKey: userKeys.details() });
    },
  });
};
```

## Best Practices

### Service Architecture Adherence

✅ **Simple, Focused Methods**: Each method handles a single user operation  
✅ **No Error Handling**: Errors are delegated to query hooks  
✅ **No Data Transformation**: Returns raw API responses  
✅ **Proper Authentication**: Uses `PrivateApiServiceWrapper` for credential management  
✅ **AbortController Support**: All methods support request cancellation  

### Implementation Guidelines

```typescript
// ✅ DO: Use with TanStack Query hooks
const { data: user } = useQuery({
  queryKey: ['user', 'details'],
  queryFn: ({ signal }) => UserService.getUserDetails(signal),
});

// ✅ DO: Handle errors in query hooks
const { error } = useQuery({
  queryKey: ['user', 'details'],
  queryFn: UserService.getUserDetails,
  onError: (error) => {
    console.error('Failed to fetch user:', error);
  },
});

// ❌ DON'T: Handle errors in service calls
try {
  const user = await UserService.getUserDetails();
} catch (error) {
  // This should be handled by query hooks instead
}

// ✅ DO: Use AbortSignal for cancellation
const controller = new AbortController();
UserService.getUserDetails(controller.signal);
```

### Security Considerations

- All operations are automatically authenticated via `PrivateApiServiceWrapper`
- Password updates require current password verification
- Email verification follows secure token-based workflow
- User data is scoped to the authenticated user only