# AccessToken Type Documentation

## Purpose

The `AccessToken` type system defines authentication states and token structures for user authorization across the application. This core domain type establishes the foundation for role-based access control, enabling differentiated functionality based on user verification status and authentication level.

## Type Definition

```typescript
export enum AccessType {
  AUTHORIZED_VERIFIED = 'AUTHORIZED_VERIFIED',
  AUTHORIZED_NOT_VERIFIED = 'AUTHORIZED_NOT_VERIFIED',
  PUBLIC = 'PUBLIC',
}

export interface AccessToken {
  type: AccessType;
  token: string;
}
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `AccessType` | ✅ | Authentication level determining user permissions and access scope |
| `token` | `string` | ✅ | JWT or session token string for API authentication |

### AccessType Enum Values

| Value | Description | Use Case |
|-------|-------------|----------|
| `AUTHORIZED_VERIFIED` | Fully authenticated and email-verified user | Full application access, sensitive operations |
| `AUTHORIZED_NOT_VERIFIED` | Authenticated but unverified user | Limited access, pending email verification |
| `PUBLIC` | Unauthenticated or public access | Read-only, public content access |

## Usage Examples

### Basic Token Creation

```typescript
import { AccessToken, AccessType } from '@/lib/types/access-token';

// Verified user token
const verifiedUserToken: AccessToken = {
  type: AccessType.AUTHORIZED_VERIFIED,
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
};

// Unverified user token
const unverifiedUserToken: AccessToken = {
  type: AccessType.AUTHORIZED_NOT_VERIFIED,
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
};

// Public access (no authentication required)
const publicToken: AccessToken = {
  type: AccessType.PUBLIC,
  token: ''
};
```

### Authentication Service Integration

```typescript
import { AccessToken, AccessType } from '@/lib/types/access-token';

class AuthService {
  async login(credentials: LoginCredentials): Promise<AccessToken> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    
    const data = await response.json();
    
    return {
      type: data.isVerified 
        ? AccessType.AUTHORIZED_VERIFIED 
        : AccessType.AUTHORIZED_NOT_VERIFIED,
      token: data.token
    };
  }
  
  getPublicToken(): AccessToken {
    return {
      type: AccessType.PUBLIC,
      token: ''
    };
  }
}
```

### Component Access Control

```typescript
import { AccessToken, AccessType } from '@/lib/types/access-token';

interface ProtectedComponentProps {
  accessToken: AccessToken;
  children: React.ReactNode;
}

const ProtectedComponent: React.FC<ProtectedComponentProps> = ({ 
  accessToken, 
  children 
}) => {
  const canAccess = accessToken.type === AccessType.AUTHORIZED_VERIFIED;
  
  if (!canAccess) {
    return <div>Access denied. Please verify your email.</div>;
  }
  
  return <>{children}</>;
};
```

### API Request Headers

```typescript
import { AccessToken, AccessType } from '@/lib/types/access-token';

function createAuthHeaders(accessToken: AccessToken): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };
  
  if (accessToken.type !== AccessType.PUBLIC && accessToken.token) {
    headers.Authorization = `Bearer ${accessToken.token}`;
  }
  
  return headers;
}

// Usage in API calls
async function fetchUserData(accessToken: AccessToken) {
  const response = await fetch('/api/user/profile', {
    headers: createAuthHeaders(accessToken)
  });
  
  return response.json();
}
```

## Type Architecture Pattern

This type follows our **Domain → Response → Request** pattern:

### 1. Domain Object (Current)
```typescript
// Core domain representation
interface AccessToken {
  type: AccessType;
  token: string;
}
```

### 2. Response Types
```typescript
// API response shapes
interface LoginResponse {
  accessToken: AccessToken;
  user: User;
  expiresAt: string;
}

interface TokenRefreshResponse {
  accessToken: AccessToken;
  refreshToken: string;
}
```

### 3. Request Types
```typescript
// API request shapes
interface LoginRequest {
  email: string;
  password: string;
}

interface TokenRefreshRequest {
  refreshToken: string;
  currentToken: Pick<AccessToken, 'token'>;
}
```

## Related Types

### Extended Authorization Types

```typescript
// User context with access token
interface AuthenticatedUser {
  accessToken: AccessToken;
  user: User;
  permissions: Permission[];
}

// Token with expiration metadata
interface AccessTokenWithMeta extends AccessToken {
  expiresAt: Date;
  refreshToken?: string;
}

// Permission-based access control
interface PermissionCheck {
  accessToken: AccessToken;
  requiredPermission: Permission;
  resource?: string;
}
```

### Utility Types

```typescript
// Extract just the token string
type TokenString = AccessToken['token'];

// Create partial for token updates
type TokenUpdate = Partial<Pick<AccessToken, 'token'>>;

// Token without sensitive data for logging
type SafeAccessToken = Omit<AccessToken, 'token'> & {
  tokenPresent: boolean;
};
```

## Integration Points

### 1. Authentication Context
```typescript
// React context for app-wide auth state
const AuthContext = createContext<{
  accessToken: AccessToken | null;
  updateToken: (token: AccessToken) => void;
}>({
  accessToken: null,
  updateToken: () => {}
});
```

### 2. API Client Configuration
```typescript
// Axios interceptor setup
axios.interceptors.request.use((config) => {
  const token = getStoredAccessToken();
  if (token && token.type !== AccessType.PUBLIC) {
    config.headers.Authorization = `Bearer ${token.token}`;
  }
  return config;
});
```

### 3. Route Protection
```typescript
// Next.js middleware
export function middleware(request: NextRequest) {
  const token = getTokenFromRequest(request);
  
  if (isProtectedRoute(request.nextUrl.pathname)) {
    if (!token || token.type === AccessType.PUBLIC) {
      return NextResponse.redirect('/login');
    }
  }
}
```

## Validation

### Zod Schema

```typescript
import { z } from 'zod';

const AccessTypeSchema = z.enum([
  'AUTHORIZED_VERIFIED',
  'AUTHORIZED_NOT_VERIFIED', 
  'PUBLIC'
]);

const AccessTokenSchema = z.object({
  type: AccessTypeSchema,
  token: z.string().min(1, 'Token cannot be empty')
});

// Runtime validation
function validateAccessToken(data: unknown): AccessToken {
  return AccessTokenSchema.parse(data);
}

// Type guard
function isValidAccessToken(data: unknown): data is AccessToken {
  return AccessTokenSchema.safeParse(data).success;
}
```

### JWT Token Validation

```typescript
import jwt from 'jsonwebtoken';

function validateTokenString(accessToken: AccessToken): boolean {
  if (accessToken.type === AccessType.PUBLIC) {
    return true; // Public tokens don't require JWT validation
  }
  
  try {
    jwt.verify(accessToken.token, process.env.JWT_SECRET!);
    return true;
  } catch {
    return false;
  }
}
```

## Best Practices

### ✅ Recommended Patterns

```typescript
// Use enum values, not string literals
const token: AccessToken = {
  type: AccessType.AUTHORIZED_VERIFIED, // ✅ Good
  token: 'jwt-token'
};

// Type-safe access level checks
function requiresVerification(accessType: AccessType): boolean {
  return accessType === AccessType.AUTHORIZED_VERIFIED;
}

// Explicit token handling for public access
function createPublicToken(): AccessToken {
  return {
    type: AccessType.PUBLIC,
    token: '' // Explicitly empty for public access
  };
}
```

### ❌ Anti-Patterns

```typescript
// Don't use string literals
const badToken = {
  type: 'VERIFIED', // ❌ Not type-safe
  token: 'jwt-token'
};

// Don't use any for token validation
function badValidation(token: any): boolean { // ❌ Avoid any
  return token.type === 'something';
}

// Don't mix authentication states
const mixedToken: AccessToken = {
  type: AccessType.PUBLIC,
  token: 'some-jwt-token' // ❌ Inconsistent state
};
```

### Type Safety Guidelines

1. **Strict Enum Usage**: Always use `AccessType` enum values, never string literals
2. **Interface Consistency**: Maintain the interface contract across all implementations
3. **Null Safety**: Handle cases where tokens might be null or undefined
4. **Token Validation**: Always validate token format matches the access type
5. **Immutable Updates**: Use spread operators or utility functions for token updates

This type system provides a robust foundation for authentication state management while maintaining type safety and clear access control boundaries throughout the application.