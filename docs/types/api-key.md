# API Key Types

## Purpose

The API Key types define the structure for API key entities within the application, representing authentication tokens that allow external access to the system. These types handle both the basic API key metadata (without sensitive token data) and the extended version that includes the actual token value, typically used during creation or regeneration operations.

## Type Definition

```typescript
export interface ApiKey {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string | null;
  enabled: boolean;
  organizationId: number;
  preview: string;
  lastUsedAt: string | null;
}

export interface ApiKeyWithToken extends ApiKey {
  token: string;
}
```

## Properties

### ApiKey Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `number` | ✅ | Unique identifier for the API key |
| `createdAt` | `string` | ✅ | ISO 8601 timestamp of when the API key was created |
| `updatedAt` | `string` | ✅ | ISO 8601 timestamp of when the API key was last modified |
| `name` | `string \| null` | ✅ | User-defined name for the API key (nullable for unnamed keys) |
| `enabled` | `boolean` | ✅ | Whether the API key is currently active and can be used |
| `organizationId` | `number` | ✅ | ID of the organization this API key belongs to |
| `preview` | `string` | ✅ | Truncated/masked version of the token for display purposes |
| `lastUsedAt` | `string \| null` | ✅ | ISO 8601 timestamp of last usage (null if never used) |

### ApiKeyWithToken Interface

Extends `ApiKey` with:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `token` | `string` | ✅ | The full API key token value (only exposed during creation/regeneration) |

## Usage Examples

### Basic API Key Display

```typescript
interface ApiKeyListProps {
  apiKeys: ApiKey[];
  onToggleEnabled: (id: number, enabled: boolean) => void;
  onDelete: (id: number) => void;
}

const ApiKeyList: React.FC<ApiKeyListProps> = ({ 
  apiKeys, 
  onToggleEnabled, 
  onDelete 
}) => {
  return (
    <div className="space-y-4">
      {apiKeys.map((apiKey) => (
        <div key={apiKey.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">
                {apiKey.name || `API Key ${apiKey.id}`}
              </h3>
              <p className="text-sm text-gray-500">
                {apiKey.preview}
              </p>
              <p className="text-xs text-gray-400">
                {apiKey.lastUsedAt 
                  ? `Last used: ${new Date(apiKey.lastUsedAt).toLocaleDateString()}`
                  : 'Never used'
                }
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={apiKey.enabled}
                onCheckedChange={(enabled) => onToggleEnabled(apiKey.id, enabled)}
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(apiKey.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
```

### API Key Creation with Token Display

```typescript
interface CreateApiKeyResponse {
  apiKey: ApiKeyWithToken;
  message: string;
}

const CreateApiKeyDialog: React.FC = () => {
  const [newApiKey, setNewApiKey] = useState<ApiKeyWithToken | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateApiKey = async (name: string) => {
    setIsCreating(true);
    try {
      const response = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      
      const data: CreateApiKeyResponse = await response.json();
      setNewApiKey(data.apiKey);
    } catch (error) {
      console.error('Failed to create API key:', error);
    } finally {
      setIsCreating(false);
    }
  };

  if (newApiKey) {
    return (
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">API Key Created</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-yellow-800 mb-2">
            Save this token now - you won't be able to see it again!
          </p>
          <code className="block bg-gray-100 p-2 rounded text-sm font-mono">
            {newApiKey.token}
          </code>
        </div>
        <div className="text-sm text-gray-600">
          <p>Name: {newApiKey.name || 'Unnamed'}</p>
          <p>Created: {new Date(newApiKey.createdAt).toLocaleString()}</p>
          <p>Organization: {newApiKey.organizationId}</p>
        </div>
      </div>
    );
  }

  return (
    <CreateForm onSubmit={handleCreateApiKey} isLoading={isCreating} />
  );
};
```

### Service Layer Usage

```typescript
class ApiKeyService {
  async getApiKeys(organizationId: number): Promise<ApiKey[]> {
    const response = await fetch(`/api/organizations/${organizationId}/keys`);
    return response.json();
  }

  async createApiKey(
    organizationId: number, 
    name: string | null
  ): Promise<ApiKeyWithToken> {
    const response = await fetch(`/api/organizations/${organizationId}/keys`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    return response.json();
  }

  async updateApiKey(
    id: number, 
    updates: Partial<Pick<ApiKey, 'name' | 'enabled'>>
  ): Promise<ApiKey> {
    const response = await fetch(`/api/keys/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    return response.json();
  }

  async deleteApiKey(id: number): Promise<void> {
    await fetch(`/api/keys/${id}`, { method: 'DELETE' });
  }
}
```

## Type Architecture Pattern

Following our domain-first architecture:

### 1. Domain Objects (Current)
```typescript
// Core domain entity
interface ApiKey { /* ... */ }

// Domain entity with sensitive data
interface ApiKeyWithToken extends ApiKey { /* ... */ }
```

### 2. Response Types
```typescript
interface ApiKeyListResponse {
  apiKeys: ApiKey[];
  total: number;
  page: number;
}

interface ApiKeyCreateResponse {
  apiKey: ApiKeyWithToken;
  message: string;
}

interface ApiKeyUpdateResponse {
  apiKey: ApiKey;
  message: string;
}
```

### 3. Request Types
```typescript
interface CreateApiKeyRequest {
  name: string | null;
  organizationId: number;
}

interface UpdateApiKeyRequest {
  name?: string | null;
  enabled?: boolean;
}

interface ApiKeyQueryParams {
  organizationId: number;
  page?: number;
  limit?: number;
  enabled?: boolean;
}
```

## Related Types

### Utility Types
```typescript
// For updates that exclude system-managed fields
type ApiKeyUpdate = Partial<Pick<ApiKey, 'name' | 'enabled'>>;

// For display-only scenarios
type ApiKeyDisplay = Omit<ApiKey, 'organizationId'>;

// For filtering/searching
type ApiKeyFilters = Partial<Pick<ApiKey, 'enabled' | 'organizationId'>>;
```

### Organization Integration
```typescript
interface Organization {
  id: number;
  name: string;
  apiKeys?: ApiKey[]; // Optional relation
}
```

## Integration Points

### Database/ORM Layer
```typescript
// Prisma model mapping
interface PrismaApiKey {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string | null;
  enabled: boolean;
  organizationId: number;
  tokenHash: string;
  preview: string;
  lastUsedAt: Date | null;
}

// Conversion utility
const fromPrismaApiKey = (prismaApiKey: PrismaApiKey): ApiKey => ({
  id: prismaApiKey.id,
  createdAt: prismaApiKey.createdAt.toISOString(),
  updatedAt: prismaApiKey.updatedAt.toISOString(),
  name: prismaApiKey.name,
  enabled: prismaApiKey.enabled,
  organizationId: prismaApiKey.organizationId,
  preview: prismaApiKey.preview,
  lastUsedAt: prismaApiKey.lastUsedAt?.toISOString() || null,
});
```

### State Management
```typescript
interface ApiKeyState {
  apiKeys: ApiKey[];
  loading: boolean;
  error: string | null;
  selectedApiKey: ApiKey | null;
}

// Zustand store
interface ApiKeyStore extends ApiKeyState {
  fetchApiKeys: (organizationId: number) => Promise<void>;
  createApiKey: (name: string, organizationId: number) => Promise<ApiKeyWithToken>;
  updateApiKey: (id: number, updates: ApiKeyUpdate) => Promise<void>;
  deleteApiKey: (id: number) => Promise<void>;
}
```

## Validation

### Zod Schemas
```typescript
import { z } from 'zod';

export const ApiKeySchema = z.object({
  id: z.number().positive(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  name: z.string().min(1).max(100).nullable(),
  enabled: z.boolean(),
  organizationId: z.number().positive(),
  preview: z.string().min(1),
  lastUsedAt: z.string().datetime().nullable(),
});

export const ApiKeyWithTokenSchema = ApiKeySchema.extend({
  token: z.string().min(32), // Assuming minimum token length
});

export const CreateApiKeyRequestSchema = z.object({
  name: z.string().min(1).max(100).nullable(),
  organizationId: z.number().positive(),
});

export const UpdateApiKeyRequestSchema = z.object({
  name: z.string().min(1).max(100).nullable().optional(),
  enabled: z.boolean().optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: "At least one field must be provided for update",
});

// Type inference from schemas
type ValidatedApiKey = z.infer<typeof ApiKeySchema>;
type ValidatedCreateRequest = z.infer<typeof CreateApiKeyRequestSchema>;
```

### Runtime Validation Example
```typescript
const validateApiKeyResponse = (data: unknown): ApiKey => {
  try {
    return ApiKeySchema.parse(data);
  } catch (error) {
    throw new Error(`Invalid API key data: ${error}`);
  }
};
```

## Best Practices

### 1. **Strict Typing Adherence**
- All properties are explicitly typed with no `any` usage
- Nullable fields are properly typed with `| null`
- Dates are consistently typed as `string` (ISO 8601) for serialization safety

### 2. **Interface Design**
- Uses `interface` over `type` for object shapes following guidelines
- Clear extension pattern with `ApiKeyWithToken extends ApiKey`
- Properties are required by default with explicit nullable types

### 3. **Security Considerations**
```typescript
// Never log or store ApiKeyWithToken in non-secure contexts
const logApiKeyActivity = (apiKey: ApiKey) => {
  // Safe - no sensitive token data
  console.log(`API key ${apiKey.preview} used at ${apiKey.lastUsedAt}`);
};

// Use Pick utility type for safe updates
type SafeApiKeyUpdate = Pick<ApiKey, 'name' | 'enabled'>;
```

### 4. **Utility Type Leverage**
```typescript
// Example of proper utility type usage
type ApiKeyCreationData = Omit<ApiKey, 'id' | 'createdAt' | 'updatedAt' | 'lastUsedAt'>;
type ApiKeyPartialUpdate = Partial<Pick<ApiKey, 'name' | 'enabled'>>;
```

### 5. **Type Safety in Components**
```typescript
// Proper prop typing
interface ApiKeyCardProps {
  apiKey: ApiKey;
  onUpdate: (id: number, updates: ApiKeyPartialUpdate) => void;
  showSensitiveData?: boolean;
}

// Type guards for runtime safety
const isApiKeyWithToken = (apiKey: ApiKey | ApiKeyWithToken): apiKey is ApiKeyWithToken => {
  return 'token' in apiKey;
};
```

This type definition follows our strict typing guidelines and provides a solid foundation for API key management throughout the application, with clear separation between secure and display contexts.