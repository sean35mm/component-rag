# User Type Documentation

## Purpose

The `User` type represents the core user entity in the application, encompassing all user-related data including authentication, profile information, verification status, and onboarding progress. This type serves as the foundation for user management, authentication flows, and personalization features throughout the application.

## Type Definition

### IntendedUseType Enum

```typescript
export enum IntendedUseType {
  BUSINESS = 'Business or Commercial',
  PERSONAL = 'Personal Project',
  ACADEMIC = 'Academic',
  JOURNALISM = 'Journalism',
}
```

### User Interface

```typescript
export interface User {
  // Core identifiers
  id: number;
  createdAt: string | null;
  updatedAt: string | null;
  
  // Authentication & Contact
  email: string;
  emailValidationResult: string | null;
  verifiedAt: string | null;
  verified: boolean;
  
  // Profile Information
  firstName: string;
  lastName: string | null;
  imageUrl?: string;
  
  // Business Information
  businessName: string | null;
  homeCountry: string | null;
  usage: IntendedUseType | null;
  
  // Onboarding & Progress
  isQuestionnaireFilled: boolean;
  isHelloWorldFinished: boolean;
  hearAboutUs: string | null;
  
  // Permissions
  isAdmin: boolean;
}
```

## Properties

### Core Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `number` | ✅ | Unique user identifier |
| `createdAt` | `string \| null` | ✅ | ISO timestamp of user creation |
| `updatedAt` | `string \| null` | ✅ | ISO timestamp of last update |

### Authentication Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `email` | `string` | ✅ | User's email address |
| `emailValidationResult` | `string \| null` | ✅ | Email validation status/result |
| `verifiedAt` | `string \| null` | ✅ | ISO timestamp of email verification |
| `verified` | `boolean` | ✅ | Email verification status |

### Profile Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `firstName` | `string` | ✅ | User's first name |
| `lastName` | `string \| null` | ✅ | User's last name (optional) |
| `imageUrl` | `string` | ❌ | Profile image URL (optional) |

### Business Information

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `businessName` | `string \| null` | ✅ | Company/organization name |
| `homeCountry` | `string \| null` | ✅ | User's country of residence |
| `usage` | `IntendedUseType \| null` | ✅ | Intended use case for the platform |

### Onboarding Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `isQuestionnaireFilled` | `boolean` | ✅ | Onboarding questionnaire completion status |
| `isHelloWorldFinished` | `boolean` | ✅ | Tutorial completion status |
| `hearAboutUs` | `string \| null` | ✅ | How user discovered the platform |

### Permission Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `isAdmin` | `boolean` | ✅ | Administrative privileges flag |

## Usage Examples

### Basic User Display Component

```typescript
import { User, IntendedUseType } from '@/lib/types/user';

interface UserProfileProps {
  user: User;
}

export function UserProfile({ user }: UserProfileProps) {
  const displayName = user.lastName 
    ? `${user.firstName} ${user.lastName}`
    : user.firstName;

  return (
    <div className="user-profile">
      <div className="user-avatar">
        {user.imageUrl ? (
          <img src={user.imageUrl} alt={`${displayName} avatar`} />
        ) : (
          <div className="avatar-placeholder">
            {user.firstName[0]}{user.lastName?.[0] ?? ''}
          </div>
        )}
      </div>
      
      <div className="user-info">
        <h2>{displayName}</h2>
        <p>{user.email}</p>
        
        {user.businessName && (
          <p className="business-name">{user.businessName}</p>
        )}
        
        {user.usage && (
          <span className="usage-badge">{user.usage}</span>
        )}
        
        <div className="user-status">
          {user.verified ? '✅ Verified' : '⏳ Pending Verification'}
          {user.isAdmin && ' • Admin'}
        </div>
      </div>
    </div>
  );
}
```

### User Service Functions

```typescript
import { User, IntendedUseType } from '@/lib/types/user';

// Check if user has completed onboarding
export function isOnboardingComplete(user: User): boolean {
  return user.isQuestionnaireFilled && 
         user.isHelloWorldFinished && 
         user.verified;
}

// Get user's business context
export function getUserBusinessContext(user: User): {
  isBusiness: boolean;
  businessInfo: string | null;
} {
  const isBusiness = user.usage === IntendedUseType.BUSINESS;
  return {
    isBusiness,
    businessInfo: isBusiness ? user.businessName : null,
  };
}

// Filter users by intended use
export function filterUsersByUsage(
  users: User[], 
  usage: IntendedUseType
): User[] {
  return users.filter(user => user.usage === usage);
}
```

### Authentication Hook

```typescript
import { User } from '@/lib/types/user';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export function useAuth(): AuthState & {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
} {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = user !== null && user.verified;

  // Implementation details...
  
  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
}
```

## Type Architecture Pattern

### Domain Object (Current)
```typescript
// Core domain representation
export interface User {
  // Complete user entity with all properties
}
```

### Response Types
```typescript
// API response shapes
export interface UserResponse {
  user: User;
  message?: string;
}

export interface UsersListResponse {
  users: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

// Public user profile (subset of User)
export interface PublicUserProfile extends Pick<User, 
  'id' | 'firstName' | 'lastName' | 'imageUrl' | 'businessName'
> {}
```

### Request Types
```typescript
// User creation/registration
export interface CreateUserRequest extends Pick<User,
  'email' | 'firstName' | 'lastName'
> {
  password: string;
}

// Profile updates
export interface UpdateUserProfileRequest extends Partial<Pick<User,
  'firstName' | 'lastName' | 'businessName' | 'homeCountry' | 'usage' | 'imageUrl'
>> {}

// Onboarding completion
export interface CompleteOnboardingRequest extends Pick<User,
  'usage' | 'businessName' | 'homeCountry' | 'hearAboutUs'
> {}
```

## Related Types

### User Session
```typescript
export interface UserSession {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}
```

### User Preferences
```typescript
export interface UserPreferences {
  userId: User['id'];
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
  language: string;
}
```

### User Activity
```typescript
export interface UserActivity {
  userId: User['id'];
  lastLoginAt: string | null;
  loginCount: number;
  lastActiveAt: string | null;
}
```

## Integration Points

### Frontend Components
- **UserProfile**: Display user information and status
- **UserSettings**: Edit user preferences and profile
- **AdminUserTable**: Administrative user management
- **OnboardingFlow**: Guide new users through setup

### Services
- **AuthService**: Authentication and session management
- **UserService**: CRUD operations for user data
- **EmailService**: Email verification and notifications
- **OnboardingService**: Track and manage user onboarding

### State Management
- **AuthStore**: Global authentication state
- **UserStore**: User profile and preferences
- **AdminStore**: User management for administrators

## Validation

### Zod Schema
```typescript
import { z } from 'zod';
import { IntendedUseType } from './user';

export const IntendedUseTypeSchema = z.nativeEnum(IntendedUseType);

export const UserSchema = z.object({
  id: z.number().positive(),
  createdAt: z.string().datetime().nullable(),
  updatedAt: z.string().datetime().nullable(),
  email: z.string().email(),
  emailValidationResult: z.string().nullable(),
  firstName: z.string().min(1).max(50),
  lastName: z.string().max(50).nullable(),
  isAdmin: z.boolean(),
  isQuestionnaireFilled: z.boolean(),
  isHelloWorldFinished: z.boolean(),
  usage: IntendedUseTypeSchema.nullable(),
  businessName: z.string().max(100).nullable(),
  homeCountry: z.string().length(2).nullable(), // ISO country code
  hearAboutUs: z.string().max(500).nullable(),
  verifiedAt: z.string().datetime().nullable(),
  verified: z.boolean(),
  imageUrl: z.string().url().optional(),
});

// Request validation schemas
export const CreateUserRequestSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1).max(50),
  lastName: z.string().max(50).optional(),
  password: z.string().min(8).max(128),
});

export const UpdateUserProfileRequestSchema = z.object({
  firstName: z.string().min(1).max(50).optional(),
  lastName: z.string().max(50).nullable().optional(),
  businessName: z.string().max(100).nullable().optional(),
  homeCountry: z.string().length(2).nullable().optional(),
  usage: IntendedUseTypeSchema.nullable().optional(),
  imageUrl: z.string().url().optional(),
});
```

## Best Practices

### ✅ Recommended Patterns

1. **Use Utility Types for Derived Types**
   ```typescript
   // Good: Derive types from User
   type UserIdentifier = Pick<User, 'id' | 'email'>;
   type UserProfile = Omit<User, 'emailValidationResult' | 'isAdmin'>;
   ```

2. **Enum Usage for Reusable Values**
   ```typescript
   // Good: IntendedUseType is used across forms, filters, and analytics
   export enum IntendedUseType {
     BUSINESS = 'Business or Commercial',
     // ...
   }
   ```

3. **Strict Null Handling**
   ```typescript
   // Good: Explicit null handling
   function getDisplayName(user: User): string {
     return user.lastName 
       ? `${user.firstName} ${user.lastName}`
       : user.firstName;
   }
   ```

4. **Type Guards for Runtime Safety**
   ```typescript
   export function isVerifiedUser(user: User): user is User & { verified: true } {
     return user.verified && user.verifiedAt !== null;
   }
   
   export function isBusinessUser(user: User): user is User & { 
     usage: IntendedUseType.BUSINESS;
     businessName: string;
   } {
     return user.usage === IntendedUseType.BUSINESS && 
            user.businessName !== null;
   }
   ```

### ❌ Anti-Patterns to Avoid

1. **Don't Use `any` for User Data**
   ```typescript
   // Bad
   function processUser(user: any) { ... }
   
   // Good
   function processUser(user: User) { ... }
   ```

2. **Don't Ignore Null Properties**
   ```typescript
   // Bad: Assumes lastName always exists
   const fullName = `${user.firstName} ${user.lastName}`;
   
   // Good: Handle null case
   const fullName = user.lastName 
     ? `${user.firstName} ${user.lastName}`
     : user.firstName;
   ```

3. **Don't Create Redundant Interfaces**
   ```typescript
   // Bad: Duplicating User properties
   interface UserDisplay {
     id: number;
     firstName: string;
     lastName: string | null;
   }
   
   // Good: Use utility types
   type UserDisplay = Pick<User, 'id' | 'firstName' | 'lastName'>;
   ```

This type definition follows our strict typing guidelines by using interfaces for object shapes, enums for reusable values, and providing a solid foundation for building derived types using TypeScript's utility types.