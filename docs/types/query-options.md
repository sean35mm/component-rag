# Query Options Type Definitions

## Purpose

This module defines a comprehensive set of TypeScript interfaces for configuring React Query hooks in a type-safe manner. It provides standardized options interfaces for queries, infinite queries, and mutations, with both standard and suspense variants. These types serve as the foundation for our data fetching layer, ensuring consistent API contracts across all query operations while maintaining strict typing for input/output transformations.

## Type Definition

### Core Query Options

```typescript
interface UseQueryOptions<TInput, TOutput> {
  select?: (it: TInput) => TOutput;
  initialData?: TInput | (() => TInput);
  placeholderData?: TInput | ((it?: TInput) => TInput | undefined);
  enabled?: boolean;
  refetchInterval?: number | false;
  refetchIntervalInBackground?: boolean;
}
```

### Suspense Query Options

```typescript
type UseSuspenseQueryOptions<TInput, TOutput> = Omit<
  UseQueryOptions<TInput, TOutput>,
  'placeholderData' | 'enabled'
>;
```

### Infinite Query Options

```typescript
interface UseInfiniteQueryOptions<TInput, TOutput, TPageParam = number> {
  size: number;
  select?: (data: InfiniteData<TInput, TPageParam>) => TOutput;
  initialData?: InfiniteData<TInput, TPageParam> | InitialDataFunction<InfiniteData<TInput, TPageParam>>;
  placeholderData?: InfiniteData<TInput, TPageParam> | ((it?: InfiniteData<TInput, TPageParam>) => InfiniteData<TInput, TPageParam> | undefined);
  enabled?: boolean;
}
```

### Mutation Options

```typescript
interface UseMutationOptions<TData, TVariables, TContext = unknown> {
  throwOnError?: boolean | ((error: Error) => boolean);
  onMutate?: (variables: TVariables) => Promise<TContext | undefined> | TContext | undefined;
  onSuccess?: (data: TData) => Promise<void> | void;
  onError?: (error: Error, variables: TVariables, context: TContext | undefined) => Promise<void> | void;
  onSettled?: (data: TData | undefined, error: Error | null, variables: TVariables, context: TContext | undefined) => Promise<void> | void;
}
```

## Properties

### UseQueryOptions<TInput, TOutput>

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `select` | `(it: TInput) => TOutput` | No | Transform function to convert raw query data to desired output format |
| `initialData` | `TInput \| (() => TInput)` | No | Initial data to populate cache before first fetch |
| `placeholderData` | `TInput \| ((it?: TInput) => TInput \| undefined)` | No | Placeholder data shown while query is loading |
| `enabled` | `boolean` | No | Whether the query should execute automatically |
| `refetchInterval` | `number \| false` | No | Interval in milliseconds for automatic refetching |
| `refetchIntervalInBackground` | `boolean` | No | Whether to refetch when window is not focused |

### UseInfiniteQueryOptions<TInput, TOutput, TPageParam>

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `size` | `number` | Yes | Number of items per page for pagination |
| `select` | `(data: InfiniteData<TInput, TPageParam>) => TOutput` | No | Transform function for infinite query data |
| `initialData` | `InfiniteData<TInput, TPageParam> \| InitialDataFunction<...>` | No | Initial infinite data structure |
| `placeholderData` | `InfiniteData<TInput, TPageParam> \| Function` | No | Placeholder for infinite query loading state |
| `enabled` | `boolean` | No | Whether the infinite query should execute |

### UseMutationOptions<TData, TVariables, TContext>

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `throwOnError` | `boolean \| ((error: Error) => boolean)` | No | Whether to throw errors or handle them silently |
| `onMutate` | `(variables: TVariables) => Promise<TContext \| undefined> \| TContext \| undefined` | No | Optimistic update function called before mutation |
| `onSuccess` | `(data: TData) => Promise<void> \| void` | No | Success callback with mutation result |
| `onError` | `(error: Error, variables: TVariables, context: TContext \| undefined) => Promise<void> \| void` | No | Error callback with full context |
| `onSettled` | `(data: TData \| undefined, error: Error \| null, variables: TVariables, context: TContext \| undefined) => Promise<void> \| void` | No | Callback fired regardless of mutation outcome |

## Usage Examples

### Basic Query Configuration

```typescript
import { UseQueryOptions } from '@/lib/types/query-options';

// Domain object
interface User {
  id: string;
  name: string;
  email: string;
}

// Response type
interface UserResponse {
  user: User;
  permissions: string[];
}

// Transformed output
interface UserProfile {
  displayName: string;
  canEdit: boolean;
}

// Query options with transformation
const userQueryOptions: UseQueryOptions<UserResponse, UserProfile> = {
  select: (response) => ({
    displayName: response.user.name,
    canEdit: response.permissions.includes('edit:user')
  }),
  refetchInterval: 5 * 60 * 1000, // 5 minutes
  enabled: true
};
```

### Infinite Query for Paginated Data

```typescript
import { UseInfiniteQueryOptions } from '@/lib/types/query-options';
import { InfiniteData } from '@tanstack/react-query';

interface Post {
  id: string;
  title: string;
  content: string;
}

interface PostsResponse {
  posts: Post[];
  nextCursor: string | null;
}

interface PostsList {
  items: Post[];
  totalCount: number;
}

const postsInfiniteOptions: UseInfiniteQueryOptions<PostsResponse, PostsList, string> = {
  size: 20,
  select: (data: InfiniteData<PostsResponse, string>) => ({
    items: data.pages.flatMap(page => page.posts),
    totalCount: data.pages.reduce((acc, page) => acc + page.posts.length, 0)
  }),
  enabled: true
};
```

### Mutation with Optimistic Updates

```typescript
import { UseMutationOptions } from '@/lib/types/query-options';

interface UpdateUserRequest {
  userId: string;
  name: string;
  email: string;
}

interface UpdateUserResponse {
  user: User;
  updatedAt: string;
}

interface OptimisticContext {
  previousUser: User;
}

const updateUserMutation: UseMutationOptions<
  UpdateUserResponse,
  UpdateUserRequest,
  OptimisticContext
> = {
  onMutate: async (variables) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ['user', variables.userId] });
    
    // Snapshot previous value
    const previousUser = queryClient.getQueryData<User>(['user', variables.userId]);
    
    // Optimistically update
    queryClient.setQueryData(['user', variables.userId], {
      ...previousUser,
      name: variables.name,
      email: variables.email
    });
    
    return { previousUser: previousUser! };
  },
  onError: (error, variables, context) => {
    // Rollback on error
    if (context?.previousUser) {
      queryClient.setQueryData(['user', variables.userId], context.previousUser);
    }
  },
  onSettled: (data, error, variables) => {
    // Always refetch after mutation
    queryClient.invalidateQueries({ queryKey: ['user', variables.userId] });
  },
  throwOnError: true
};
```

### Suspense Query Options

```typescript
import { UseSuspenseQueryOptions } from '@/lib/types/query-options';

// Suspense queries don't need enabled or placeholderData
const suspenseUserOptions: UseSuspenseQueryOptions<UserResponse, UserProfile> = {
  select: (response) => ({
    displayName: response.user.name,
    canEdit: response.permissions.includes('edit:user')
  }),
  refetchInterval: 5 * 60 * 1000
};

// Usage in component with Suspense boundary
function UserProfileSuspense({ userId }: { userId: string }) {
  const userProfile = useSuspenseQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    ...suspenseUserOptions
  });
  
  // No loading state needed - handled by Suspense
  return <div>{userProfile.data.displayName}</div>;
}
```

## Type Architecture Pattern

This module follows our established type architecture pattern:

```
Domain Objects (User, Post) 
    ↓
Response Types (UserResponse, PostsResponse)
    ↓  
Request Types (UpdateUserRequest, QueryOptions)
    ↓
Hook Integration (useQuery, useMutation)
```

### Pattern Implementation

1. **Domain Objects**: Core business entities (`User`, `Post`)
2. **Response Shapes**: API response wrappers (`UserResponse`, `PostsResponse`)
3. **Request Configuration**: Query/mutation options with transformations
4. **Type Safety**: End-to-end typing from API to UI

## Related Types

### Dependencies
- `InfiniteData<TData, TPageParam>` from `@tanstack/react-query`
- `InitialDataFunction<TData>` from `@tanstack/react-query`

### Extended By
```typescript
// Custom query options extending base types
interface AuthenticatedQueryOptions<TInput, TOutput> extends UseQueryOptions<TInput, TOutput> {
  requireAuth?: boolean;
  permissions?: string[];
}

// Specific domain query options
interface UserQueryOptions extends UseQueryOptions<UserResponse, User> {
  includePermissions?: boolean;
}
```

### Composed With
```typescript
// Hook return types
interface QueryResult<TData> {
  data: TData;
  isLoading: boolean;
  error: Error | null;
}

// Query configuration
interface QueryConfig<TInput, TOutput> {
  queryKey: string[];
  queryFn: () => Promise<TInput>;
  options?: UseQueryOptions<TInput, TOutput>;
}
```

## Integration Points

### Service Layer Integration
```typescript
// services/user-service.ts
export const userQueries = {
  profile: (userId: string): QueryConfig<UserResponse, UserProfile> => ({
    queryKey: ['user', 'profile', userId],
    queryFn: () => api.users.getProfile(userId),
    options: userProfileOptions
  })
};
```

### Component Integration
```typescript
// components/UserProfile.tsx
function UserProfile({ userId }: { userId: string }) {
  const { data, isLoading, error } = useQuery(userQueries.profile(userId));
  
  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return <div>{data.displayName}</div>;
}
```

### Custom Hook Integration
```typescript
// hooks/useUserProfile.ts
export function useUserProfile(
  userId: string,
  options?: Partial<UseQueryOptions<UserResponse, UserProfile>>
) {
  return useQuery({
    ...userQueries.profile(userId),
    options: { ...userProfileOptions, ...options }
  });
}
```

## Validation

### Zod Schema Integration
```typescript
import { z } from 'zod';

// Runtime validation for query options
const QueryOptionsSchema = z.object({
  enabled: z.boolean().optional(),
  refetchInterval: z.union([z.number().positive(), z.literal(false)]).optional(),
  refetchIntervalInBackground: z.boolean().optional()
});

// Validate options at runtime
function createQueryOptions<TInput, TOutput>(
  options: UseQueryOptions<TInput, TOutput>
): UseQueryOptions<TInput, TOutput> {
  const validated = QueryOptionsSchema.parse(options);
  return { ...options, ...validated };
}
```

### Type Guards
```typescript
// Type guard for mutation options
function isMutationOptions<TData, TVariables, TContext>(
  options: unknown
): options is UseMutationOptions<TData, TVariables, TContext> {
  return (
    typeof options === 'object' &&
    options !== null &&
    ('onMutate' in options || 'onSuccess' in options || 'onError' in options)
  );
}
```

## Best Practices

### 1. Strict Typing Adherence
```typescript
// ✅ Good: Explicit type parameters
const options: UseQueryOptions<ApiResponse<User>, UserViewModel> = {
  select: (response) => transformUser(response.data)
};

// ❌ Avoid: Implicit any types
const options = {
  select: (response: any) => response.data
};
```

### 2. Interface over Type Usage
```typescript
// ✅ Good: Using interface for extensibility
interface CustomQueryOptions<TInput, TOutput> extends UseQueryOptions<TInput, TOutput> {
  cacheTime?: number;
}

// ✅ Acceptable: Using type for utility combinations
type SuspenseQueryOptions<TInput, TOutput> = Omit<UseQueryOptions<TInput, TOutput>, 'enabled'>;
```

### 3. Utility Type Leverage
```typescript
// ✅ Good: Using built-in utility types
type RequiredQueryOptions<TInput, TOutput> = Required<
  Pick<UseQueryOptions<TInput, TOutput>, 'select' | 'enabled'>
> & UseQueryOptions<TInput, TOutput>;

// ✅ Good: Partial options for defaults
function withDefaults<TInput, TOutput>(
  options: Partial<UseQueryOptions<TInput, TOutput>>
): UseQueryOptions<TInput, TOutput> {
  return {
    enabled: true,
    refetchInterval: false,
    ...options
  };
}
```

### 4. Generic Constraints
```typescript
// ✅ Good: Constraining generic types
interface EntityQueryOptions<
  TEntity extends { id: string },
  TOutput
> extends UseQueryOptions<ApiResponse<TEntity>, TOutput> {
  entityId: string;
}
```

### 5. Callback Type Safety
```typescript
// ✅ Good: Proper callback typing
const mutationOptions: UseMutationOptions<User, UpdateUserRequest> = {
  onSuccess: (data: User) => {
    // data is properly typed as User
    console.log(`Updated user: ${data.name}`);
  },
  onError: (error: Error, variables: UpdateUserRequest) => {
    // All parameters properly typed
    console.error(`Failed to update user ${variables.userId}:`, error);
  }
};
```

This type system provides a robust foundation for our data fetching layer, ensuring type safety from API responses through data transformations to UI components, while maintaining flexibility for various query patterns and use cases.