# WithoutNullish Type Definition

## Purpose

The `WithoutNullish<T>` utility type recursively transforms types by replacing `null` values with `undefined` while preserving the structure of arrays and objects. This type is essential for maintaining consistent nullish value handling across the application, particularly when interfacing with APIs that return `null` values but we prefer to work with `undefined` internally.

## Type Definition

```typescript
export type WithoutNullish<T> = T extends null
  ? undefined
  : T extends Array<infer U>
    ? Array<WithoutNullish<U>>
    : T extends object
      ? { [K in keyof T]: WithoutNullish<T[K]> }
      : T;
```

### Conditional Logic Breakdown

| Condition | Result | Description |
|-----------|--------|-------------|
| `T extends null` | `undefined` | Replaces `null` with `undefined` |
| `T extends Array<infer U>` | `Array<WithoutNullish<U>>` | Recursively processes array elements |
| `T extends object` | `{ [K in keyof T]: WithoutNullish<T[K]> }` | Recursively processes object properties |
| Default | `T` | Returns the original type unchanged |

## Properties

This is a utility type that doesn't define properties directly but transforms existing type properties:

| Transformation | Input Type | Output Type | Description |
|----------------|------------|-------------|-------------|
| Null Replacement | `null` | `undefined` | Direct null-to-undefined conversion |
| Array Processing | `Array<T \| null>` | `Array<WithoutNullish<T>>` | Processes array element types recursively |
| Object Processing | `{ key: T \| null }` | `{ key: WithoutNullish<T> }` | Processes all object property types recursively |
| Primitive Passthrough | `string \| number \| boolean` | `string \| number \| boolean` | Leaves non-null primitives unchanged |

## Usage Examples

### Basic Null Replacement

```typescript
// Basic null to undefined transformation
type BasicExample = WithoutNullish<string | null>;
// Result: string | undefined

type NumberExample = WithoutNullish<number | null>;
// Result: number | undefined
```

### Array Transformations

```typescript
// Array with nullable elements
type NullableStringArray = WithoutNullish<Array<string | null>>;
// Result: Array<string | undefined>

// Nested array structures
type NestedArray = WithoutNullish<Array<Array<number | null>>>;
// Result: Array<Array<number | undefined>>
```

### Object Transformations

```typescript
// Domain object with nullable properties
interface UserProfile {
  id: string;
  name: string | null;
  email: string | null;
  avatar: string | null;
  preferences: {
    theme: string | null;
    notifications: boolean | null;
  };
}

type SafeUserProfile = WithoutNullish<UserProfile>;
// Result: {
//   id: string;
//   name: string | undefined;
//   email: string | undefined;
//   avatar: string | undefined;
//   preferences: {
//     theme: string | undefined;
//     notifications: boolean | undefined;
//   };
// }
```

### Real-world Component Usage

```typescript
import { WithoutNullish } from '@/lib/types/without-nullish';

// API response type (typically contains nulls)
interface ApiUserResponse {
  id: string;
  name: string | null;
  email: string | null;
  settings: {
    theme: string | null;
    language: string | null;
  } | null;
}

// Internal application type (prefers undefined)
type InternalUser = WithoutNullish<ApiUserResponse>;

// Data transformation function
function transformApiUser(apiUser: ApiUserResponse): InternalUser {
  const transform = <T>(value: T): WithoutNullish<T> => {
    if (value === null) return undefined as WithoutNullish<T>;
    if (Array.isArray(value)) {
      return value.map(transform) as WithoutNullish<T>;
    }
    if (typeof value === 'object' && value !== null) {
      const result = {} as any;
      for (const [key, val] of Object.entries(value)) {
        result[key] = transform(val);
      }
      return result as WithoutNullish<T>;
    }
    return value as WithoutNullish<T>;
  };

  return transform(apiUser);
}

// Component usage
interface UserCardProps {
  user: InternalUser;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div>
      <h2>{user.name ?? 'Anonymous User'}</h2>
      <p>{user.email ?? 'No email provided'}</p>
      <p>Theme: {user.settings?.theme ?? 'default'}</p>
    </div>
  );
};
```

## Type Architecture Pattern

### Domain Objects → Response Types → Request Types Flow

```typescript
// 1. Domain Object (internal representation)
interface User {
  id: string;
  name: string | undefined;
  email: string | undefined;
  createdAt: Date;
}

// 2. API Response Type (external representation)
interface ApiUserResponse {
  id: string;
  name: string | null;
  email: string | null;
  created_at: string | null;
}

// 3. Transformation Layer
type TransformedApiUser = WithoutNullish<ApiUserResponse>;

// 4. Request Type (for API calls)
interface CreateUserRequest {
  name: string;
  email: string;
}

// 5. Integration function
async function fetchUser(id: string): Promise<User> {
  const response = await api.get<ApiUserResponse>(`/users/${id}`);
  const transformed = transformApiUser(response.data);
  
  return {
    id: transformed.id,
    name: transformed.name,
    email: transformed.email,
    createdAt: new Date(transformed.created_at ?? Date.now()),
  };
}
```

## Related Types

### Complementary Utility Types

```typescript
// Opposite transformation (undefined to null)
export type WithNullish<T> = T extends undefined
  ? null
  : T extends Array<infer U>
    ? Array<WithNullish<U>>
    : T extends object
      ? { [K in keyof T]: WithNullish<T[K]> }
      : T;

// Remove all nullish values
export type NonNullish<T> = T extends null | undefined
  ? never
  : T extends Array<infer U>
    ? Array<NonNullish<U>>
    : T extends object
      ? { [K in keyof T]: NonNullish<T[K]> }
      : T;

// Optional properties for undefined values
export type OptionalUndefined<T> = {
  [K in keyof T as T[K] extends undefined ? K : never]?: T[K];
} & {
  [K in keyof T as T[K] extends undefined ? never : K]: T[K];
};
```

### Integration with Built-in Utility Types

```typescript
// Combining with Partial
type PartialWithoutNullish<T> = WithoutNullish<Partial<T>>;

// Combining with Pick
type PickWithoutNullish<T, K extends keyof T> = WithoutNullish<Pick<T, K>>;

// Combining with Omit
type OmitWithoutNullish<T, K extends keyof T> = WithoutNullish<Omit<T, K>>;
```

## Integration Points

### API Service Layer

```typescript
// services/api.ts
import { WithoutNullish } from '@/lib/types/without-nullish';

export class ApiService {
  async get<T>(url: string): Promise<WithoutNullish<T>> {
    const response = await fetch(url);
    const data = await response.json();
    return this.transformNullish(data);
  }

  private transformNullish<T>(data: T): WithoutNullish<T> {
    // Implementation of null to undefined transformation
    return data as WithoutNullish<T>; // Simplified for example
  }
}
```

### React Hook Integration

```typescript
// hooks/useApiData.ts
import { WithoutNullish } from '@/lib/types/without-nullish';

export function useApiData<T>(url: string) {
  const [data, setData] = useState<WithoutNullish<T> | null>(null);
  
  useEffect(() => {
    apiService.get<T>(url).then(setData);
  }, [url]);
  
  return data;
}
```

### State Management

```typescript
// store/userSlice.ts
import { WithoutNullish } from '@/lib/types/without-nullish';

interface UserState {
  currentUser: WithoutNullish<ApiUserResponse> | null;
  users: WithoutNullish<ApiUserResponse>[];
}
```

## Validation

### Zod Schema Integration

```typescript
import { z } from 'zod';

// Transform Zod schema to handle nullish values
const createWithoutNullishSchema = <T extends z.ZodTypeAny>(schema: T) => {
  return schema.transform((val) => {
    if (val === null) return undefined;
    return val;
  });
};

// Example usage
const userSchema = z.object({
  id: z.string(),
  name: createWithoutNullishSchema(z.string().nullable()),
  email: createWithoutNullishSchema(z.string().nullable()),
});

type ValidatedUser = z.infer<typeof userSchema>;
// Automatically has undefined instead of null
```

### Runtime Validation Helper

```typescript
// utils/nullish-validator.ts
export function isWithoutNullish<T>(value: T | null): value is WithoutNullish<T> {
  return value !== null;
}

export function assertWithoutNullish<T>(value: T | null): asserts value is WithoutNullish<T> {
  if (value === null) {
    throw new Error('Value cannot be null');
  }
}
```

## Best Practices

### 1. Consistent Nullish Handling

```typescript
// ✅ Good: Consistent use of undefined
interface UserPreferences {
  theme: string | undefined;
  language: string | undefined;
}

// ❌ Avoid: Mixed null and undefined
interface UserPreferences {
  theme: string | null;
  language: string | undefined;
}
```

### 2. API Boundary Transformation

```typescript
// ✅ Good: Transform at API boundary
const apiResponse = await fetch('/api/users');
const users: WithoutNullish<ApiUser[]> = transformNullish(await apiResponse.json());

// ❌ Avoid: Handling nulls throughout the application
const users = await apiResponse.json(); // Contains nulls
// Now null checks needed everywhere
```

### 3. Type Safety with Strict Typing

```typescript
// ✅ Good: Explicit transformation
function processUser(user: WithoutNullish<ApiUser>): ProcessedUser {
  return {
    displayName: user.name ?? 'Anonymous',
    contactEmail: user.email ?? 'No email',
  };
}

// ❌ Avoid: Using any to bypass type checking
function processUser(user: any): ProcessedUser {
  // Type safety lost
}
```

### 4. Composition with Other Utility Types

```typescript
// ✅ Good: Combining utility types appropriately
type SafePartialUser = WithoutNullish<Partial<ApiUser>>;

// ✅ Good: Creating domain-specific types
type RequiredUserFields = 'id' | 'email';
type SafeUserUpdate = WithoutNullish<Omit<ApiUser, RequiredUserFields>>;
```

### 5. Performance Considerations

```typescript
// ✅ Good: Type-level transformation (no runtime cost)
type SafeUser = WithoutNullish<ApiUser>;

// ✅ Good: Efficient runtime transformation
const transformOnce = (data: ApiUser): WithoutNullish<ApiUser> => {
  // Single transformation at data entry point
  return transform(data);
};

// ❌ Avoid: Repeated transformations
const inefficientTransform = (data: ApiUser) => {
  const step1 = transform(data);
  const step2 = transform(step1); // Unnecessary
  return step2;
};
```

This utility type is fundamental to maintaining type safety and consistency when dealing with external APIs that use `null` values while preferring `undefined` in our internal application logic.