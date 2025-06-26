# AccessMode Type Documentation

## Purpose

The `AccessMode` enum defines the visibility and access control levels for resources within the application. It provides a type-safe way to represent whether content, features, or data should be publicly accessible or restricted to authorized users only. This enum serves as a foundational type for implementing access control patterns across the application.

## Type Definition

```typescript
export const enum AccessMode {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
```

### Enum Structure

- **Type**: `const enum` (compile-time constant for performance optimization)
- **Values**: String literals for runtime compatibility and debugging clarity
- **Immutable**: Compile-time constants that cannot be modified

## Properties

| Property | Value | Description | Use Case |
|----------|-------|-------------|----------|
| `PUBLIC` | `'PUBLIC'` | Indicates unrestricted access - visible to all users | Public content, open resources, guest-accessible features |
| `PRIVATE` | `'PRIVATE'` | Indicates restricted access - requires authentication/authorization | User-specific data, protected content, authenticated features |

## Usage Examples

### Basic Usage in Components

```typescript
import { AccessMode } from '@/lib/types/access-mode';

interface ContentProps {
  accessMode: AccessMode;
  content: string;
}

const ContentDisplay: React.FC<ContentProps> = ({ accessMode, content }) => {
  const isPublic = accessMode === AccessMode.PUBLIC;
  
  return (
    <div className={`content ${isPublic ? 'public' : 'private'}`}>
      {isPublic && <PublicIcon />}
      {accessMode === AccessMode.PRIVATE && <LockIcon />}
      <p>{content}</p>
    </div>
  );
};
```

### Function Type Guards

```typescript
const isPublicAccess = (mode: AccessMode): boolean => {
  return mode === AccessMode.PUBLIC;
};

const isPrivateAccess = (mode: AccessMode): boolean => {
  return mode === AccessMode.PRIVATE;
};

// Usage in conditional logic
const handleResourceAccess = (resource: Resource, userToken?: string) => {
  if (isPublicAccess(resource.accessMode)) {
    return fetchPublicResource(resource.id);
  }
  
  if (isPrivateAccess(resource.accessMode) && userToken) {
    return fetchPrivateResource(resource.id, userToken);
  }
  
  throw new Error('Insufficient permissions');
};
```

### Switch Statement Patterns

```typescript
const getAccessConfig = (mode: AccessMode) => {
  switch (mode) {
    case AccessMode.PUBLIC:
      return {
        requiresAuth: false,
        cacheHeaders: 'public, max-age=3600',
        visibility: 'visible'
      };
    case AccessMode.PRIVATE:
      return {
        requiresAuth: true,
        cacheHeaders: 'private, no-cache',
        visibility: 'hidden'
      };
    default:
      // TypeScript ensures exhaustive checking
      const _exhaustive: never = mode;
      throw new Error(`Unhandled access mode: ${mode}`);
  }
};
```

## Type Architecture Pattern

### Domain Objects (Foundation Layer)

```typescript
// Core domain entities using AccessMode
interface Resource {
  id: string;
  accessMode: AccessMode;
  createdAt: Date;
  updatedAt: Date;
}

interface Document extends Resource {
  title: string;
  content: string;
  author: string;
}

interface Project extends Resource {
  name: string;
  description: string;
  members: string[];
}
```

### Response Types (API Layer)

```typescript
// API response shapes incorporating AccessMode
interface ResourceResponse {
  id: string;
  accessMode: AccessMode;
  metadata: {
    createdAt: string;
    updatedAt: string;
  };
}

interface DocumentListResponse {
  documents: Array<{
    id: string;
    title: string;
    accessMode: AccessMode;
    preview?: string; // Only included for PUBLIC documents
  }>;
  pagination: PaginationMeta;
}

// Conditional response types based on access mode
type DocumentDetailResponse<T extends AccessMode> = T extends AccessMode.PUBLIC
  ? PublicDocumentResponse
  : PrivateDocumentResponse;

interface PublicDocumentResponse {
  id: string;
  title: string;
  content: string;
  accessMode: AccessMode.PUBLIC;
}

interface PrivateDocumentResponse {
  id: string;
  title: string;
  content: string;
  accessMode: AccessMode.PRIVATE;
  owner: string;
  permissions: string[];
}
```

### Request Types (Input Layer)

```typescript
// Request types for creating/updating resources
interface CreateResourceRequest {
  accessMode: AccessMode;
  // Other resource-specific fields
}

interface UpdateAccessModeRequest {
  resourceId: string;
  accessMode: AccessMode;
}

interface ResourceFilterRequest {
  accessMode?: AccessMode;
  includePrivate?: boolean; // Only effective for authenticated users
}

// Utility types for access-based operations
type PublicResourceRequest = Omit<CreateResourceRequest, 'accessMode'> & {
  accessMode: AccessMode.PUBLIC;
};

type PrivateResourceRequest = Omit<CreateResourceRequest, 'accessMode'> & {
  accessMode: AccessMode.PRIVATE;
  permissions: string[];
};
```

## Related Types

### Access Control Extensions

```typescript
// Extended access control building on AccessMode
interface Permission {
  resourceId: string;
  accessMode: AccessMode;
  userId: string;
  role: 'owner' | 'editor' | 'viewer';
}

// Access policy combining multiple access modes
interface AccessPolicy {
  defaultMode: AccessMode;
  overrides: Record<string, AccessMode>;
  inheritanceRules: AccessInheritanceRule[];
}

// Audit logging for access mode changes
interface AccessModeAuditLog {
  resourceId: string;
  previousMode: AccessMode;
  newMode: AccessMode;
  changedBy: string;
  timestamp: Date;
  reason?: string;
}
```

### Utility Types

```typescript
// Helper types for working with AccessMode
type AccessModeValues = `${AccessMode}`;
type PublicResources<T> = T & { accessMode: AccessMode.PUBLIC };
type PrivateResources<T> = T & { accessMode: AccessMode.PRIVATE };

// Conditional types for access-based filtering
type FilterByAccessMode<T extends { accessMode: AccessMode }, M extends AccessMode> = 
  T extends { accessMode: M } ? T : never;
```

## Integration Points

### Services Layer

```typescript
// Resource service with access mode handling
class ResourceService {
  async getResource(id: string, userContext?: UserContext): Promise<Resource | null> {
    const resource = await this.repository.findById(id);
    
    if (!resource) return null;
    
    if (resource.accessMode === AccessMode.PRIVATE && !userContext?.authenticated) {
      throw new UnauthorizedError('Private resource requires authentication');
    }
    
    return resource;
  }

  async listResources(filter: ResourceFilter, userContext?: UserContext): Promise<Resource[]> {
    const baseQuery = this.repository.createQuery();
    
    if (!userContext?.authenticated) {
      // Only show public resources for unauthenticated users
      baseQuery.where('accessMode', AccessMode.PUBLIC);
    }
    
    return baseQuery.execute();
  }
}
```

### Components Integration

```typescript
// Hook for access-mode-aware data fetching
const useAccessibleResources = (accessMode?: AccessMode) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['resources', accessMode, user?.id],
    queryFn: () => resourceService.listResources({ accessMode }, user),
    enabled: accessMode !== AccessMode.PRIVATE || !!user
  });
};

// Component with access mode switching
const ResourceManager: React.FC = () => {
  const [viewMode, setViewMode] = useState<AccessMode>(AccessMode.PUBLIC);
  const { data: resources } = useAccessibleResources(viewMode);
  
  return (
    <div>
      <AccessModeToggle 
        value={viewMode} 
        onChange={setViewMode}
        options={Object.values(AccessMode)}
      />
      <ResourceList resources={resources} />
    </div>
  );
};
```

## Validation

### Zod Schema Patterns

```typescript
import { z } from 'zod';

// Base AccessMode schema
export const AccessModeSchema = z.nativeEnum(AccessMode);

// Resource schemas with access mode validation
export const ResourceSchema = z.object({
  id: z.string().uuid(),
  accessMode: AccessModeSchema,
  createdAt: z.date(),
  updatedAt: z.date()
});

// Request validation with access mode
export const CreateResourceRequestSchema = z.object({
  accessMode: AccessModeSchema,
  title: z.string().min(1),
  content: z.string()
}).refine(
  data => {
    // Custom validation: private resources might need additional fields
    if (data.accessMode === AccessMode.PRIVATE) {
      return data.content.length > 0; // Example business rule
    }
    return true;
  },
  {
    message: "Private resources require non-empty content",
    path: ["content"]
  }
);

// Access mode transition validation
export const AccessModeUpdateSchema = z.object({
  resourceId: z.string().uuid(),
  newAccessMode: AccessModeSchema,
  reason: z.string().optional()
}).refine(
  data => {
    // Business rule: changing to private might require justification
    if (data.newAccessMode === AccessMode.PRIVATE && !data.reason) {
      return false;
    }
    return true;
  },
  {
    message: "Reason required when changing to private access",
    path: ["reason"]
  }
);
```

### Runtime Validation

```typescript
// Type guard functions for runtime validation
export const isValidAccessMode = (value: unknown): value is AccessMode => {
  return typeof value === 'string' && Object.values(AccessMode).includes(value as AccessMode);
};

// Validation helper for API endpoints
export const validateAccessMode = (mode: unknown): AccessMode => {
  if (!isValidAccessMode(mode)) {
    throw new ValidationError(`Invalid access mode: ${mode}. Must be one of: ${Object.values(AccessMode).join(', ')}`);
  }
  return mode;
};
```

## Best Practices

### 1. **Enum Usage Alignment**
✅ **Correct**: Using `const enum` for compile-time optimization and string values for runtime debugging
```typescript
// Good: Follows our guideline of enums for reusable values
export const enum AccessMode {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
```

### 2. **Strict Typing Implementation**
✅ **Correct**: Type-safe access mode handling without `any`
```typescript
// Good: Strict typing with exhaustive checking
const handleAccessMode = (mode: AccessMode): AccessConfig => {
  switch (mode) {
    case AccessMode.PUBLIC:
      return publicConfig;
    case AccessMode.PRIVATE:
      return privateConfig;
    default:
      const _exhaustive: never = mode; // Compile-time exhaustiveness
      throw new Error(`Unhandled access mode: ${mode}`);
  }
};
```

### 3. **Interface-First Architecture**
✅ **Correct**: Building interfaces that compose with AccessMode
```typescript
// Good: Interface-based design
interface AccessControlledResource {
  id: string;
  accessMode: AccessMode;
  permissions?: Permission[];
}

interface ResourcePermission {
  resourceId: string;
  userId: string;
  accessMode: AccessMode;
}
```

### 4. **Utility Type Leveraging**
✅ **Correct**: Using TypeScript utilities with AccessMode
```typescript
// Good: Leveraging utility types
type PublicResourceUpdate = Partial<Pick<Resource, 'title' | 'content'>> & {
  accessMode: AccessMode.PUBLIC;
};

type AccessModeTransition = {
  from: AccessMode;
  to: AccessMode;
  timestamp: Date;
};
```

### 5. **Type Architecture Compliance**
✅ **Correct**: Following domain → response → request pattern
```typescript
// 1. Domain objects (foundation)
interface Document {
  id: string;
  accessMode: AccessMode;
  content: string;
}

// 2. Response shapes (API layer)
interface DocumentResponse {
  document: Document;
  userCanEdit: boolean;
}

// 3. Request types (input layer)
interface UpdateDocumentAccessRequest {
  documentId: string;
  accessMode: AccessMode;
}
```

### 6. **Security Considerations**
- Always validate access mode transitions at the service layer
- Implement audit logging for access mode changes
- Use access mode in caching strategies (public vs private cache headers)
- Consider access mode inheritance for nested resources

### 7. **Performance Optimizations**
- Leverage `const enum` for compile-time inlining
- Use access mode for query optimization (database indexes)
- Implement access-mode-based response caching
- Consider lazy loading for private resources