# SourceGroup Type Documentation

## Purpose

The `SourceGroup` type defines a domain object representing a collection of data sources grouped together within an organization. It serves as a core business entity for managing and organizing various data sources (identified by domains) that belong to a specific organization. The `SourceGroupsResponse` type provides a standardized API response wrapper for collections of source groups.

## Type Definition

```typescript
export interface SourceGroup {
  id: string;
  name: string;
  description: string;
  domains: string[];
  createdAt: string;
  updatedAt: string;
  organizationId: string;
  displayName: string | null;
}

export type SourceGroupsResponse = CustomSearchResult<SourceGroup>;
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | ✅ | Unique identifier for the source group |
| `name` | `string` | ✅ | Internal name of the source group |
| `description` | `string` | ✅ | Detailed description of the source group's purpose |
| `domains` | `string[]` | ✅ | Array of domain names associated with this source group |
| `createdAt` | `string` | ✅ | ISO 8601 timestamp of creation |
| `updatedAt` | `string` | ✅ | ISO 8601 timestamp of last modification |
| `organizationId` | `string` | ✅ | ID of the organization that owns this source group |
| `displayName` | `string \| null` | ❌ | User-friendly display name, falls back to `name` if null |

## Usage Examples

### Basic Component Usage

```typescript
import { SourceGroup, SourceGroupsResponse } from '@/lib/types/source-group';

interface SourceGroupCardProps {
  sourceGroup: SourceGroup;
  onEdit: (id: string) => void;
}

const SourceGroupCard: React.FC<SourceGroupCardProps> = ({ sourceGroup, onEdit }) => {
  const displayName = sourceGroup.displayName || sourceGroup.name;
  
  return (
    <div className="source-group-card">
      <h3>{displayName}</h3>
      <p>{sourceGroup.description}</p>
      <div className="domains">
        {sourceGroup.domains.map(domain => (
          <span key={domain} className="domain-tag">{domain}</span>
        ))}
      </div>
      <button onClick={() => onEdit(sourceGroup.id)}>
        Edit Source Group
      </button>
    </div>
  );
};
```

### Service Layer Integration

```typescript
import { SourceGroup, SourceGroupsResponse } from '@/lib/types/source-group';

class SourceGroupService {
  async getSourceGroups(organizationId: string): Promise<SourceGroupsResponse> {
    const response = await fetch(`/api/organizations/${organizationId}/source-groups`);
    return response.json() as Promise<SourceGroupsResponse>;
  }

  async createSourceGroup(data: CreateSourceGroupRequest): Promise<SourceGroup> {
    const response = await fetch('/api/source-groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json() as Promise<SourceGroup>;
  }

  async updateSourceGroup(
    id: string, 
    updates: Partial<Pick<SourceGroup, 'name' | 'description' | 'domains' | 'displayName'>>
  ): Promise<SourceGroup> {
    const response = await fetch(`/api/source-groups/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    return response.json() as Promise<SourceGroup>;
  }
}
```

### Hook Implementation

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SourceGroup, SourceGroupsResponse } from '@/lib/types/source-group';

export const useSourceGroups = (organizationId: string) => {
  return useQuery<SourceGroupsResponse>({
    queryKey: ['source-groups', organizationId],
    queryFn: () => sourceGroupService.getSourceGroups(organizationId)
  });
};

export const useCreateSourceGroup = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateSourceGroupRequest) => 
      sourceGroupService.createSourceGroup(data),
    onSuccess: (newSourceGroup: SourceGroup) => {
      queryClient.invalidateQueries({ 
        queryKey: ['source-groups', newSourceGroup.organizationId] 
      });
    }
  });
};
```

## Type Architecture Pattern

This type follows our established architecture pattern:

```
Domain Object (SourceGroup) → Response Types (SourceGroupsResponse) → Request Types
```

### 1. Domain Object
- `SourceGroup` - Core business entity with all properties

### 2. Response Types
- `SourceGroupsResponse` - Wraps collections in `CustomSearchResult` for pagination/filtering

### 3. Request Types (Derived)
```typescript
// Create request - omit server-generated fields
export type CreateSourceGroupRequest = Omit<SourceGroup, 'id' | 'createdAt' | 'updatedAt'>;

// Update request - partial with selective fields
export type UpdateSourceGroupRequest = Partial<
  Pick<SourceGroup, 'name' | 'description' | 'domains' | 'displayName'>
>;

// Query parameters
export interface SourceGroupFilters {
  organizationId: string;
  domains?: string[];
  search?: string;
}
```

## Related Types

### Dependencies
- `CustomSearchResult<T>` - Generic wrapper for paginated/searchable collections

### Extending Types
```typescript
// Enhanced view with computed properties
export interface SourceGroupWithStats extends SourceGroup {
  domainCount: number;
  lastActivityAt: string | null;
  isActive: boolean;
}

// Minimal representation for dropdowns
export type SourceGroupOption = Pick<SourceGroup, 'id' | 'name' | 'displayName'>;
```

## Integration Points

### API Endpoints
- `GET /api/organizations/:id/source-groups` → `SourceGroupsResponse`
- `POST /api/source-groups` → `SourceGroup`
- `GET /api/source-groups/:id` → `SourceGroup`
- `PATCH /api/source-groups/:id` → `SourceGroup`
- `DELETE /api/source-groups/:id`

### Components
- `SourceGroupList` - Displays paginated source groups
- `SourceGroupForm` - Create/edit source group forms
- `SourceGroupSelector` - Dropdown for selecting source groups
- `DomainManager` - Manages domains within a source group

### Services
- `SourceGroupService` - CRUD operations
- `SearchService` - Search across source groups
- `OrganizationService` - Organization-scoped source group operations

## Validation

### Zod Schema Example
```typescript
import { z } from 'zod';

export const SourceGroupSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  domains: z.array(z.string().url()).min(1),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  organizationId: z.string().uuid(),
  displayName: z.string().max(100).nullable()
});

export const CreateSourceGroupSchema = SourceGroupSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
```

## Best Practices

### ✅ Adherence to Guidelines

1. **Strict Typing**: All properties have explicit types, avoiding `any`
2. **Interface Usage**: Uses `interface` for the domain object shape
3. **Utility Types**: Leverages `Pick`, `Omit`, `Partial` for derived types
4. **Type Architecture**: Follows domain-first approach with clear response patterns

### ✅ Recommended Patterns

```typescript
// Good: Use utility types for variations
type EditableSourceGroup = Pick<SourceGroup, 'name' | 'description' | 'domains' | 'displayName'>;

// Good: Type-safe domain filtering
const filterByDomains = (sourceGroups: SourceGroup[], domains: string[]): SourceGroup[] => {
  return sourceGroups.filter(sg => 
    sg.domains.some(domain => domains.includes(domain))
  );
};

// Good: Null-safe display name handling
const getDisplayName = (sourceGroup: SourceGroup): string => 
  sourceGroup.displayName ?? sourceGroup.name;
```

### ❌ Anti-patterns to Avoid

```typescript
// Bad: Using any
const processSourceGroup = (data: any) => { /* ... */ };

// Bad: Not handling nullable displayName
const title = sourceGroup.displayName.toUpperCase(); // Runtime error if null

// Bad: Mutating the original object
const updateDomains = (sourceGroup: SourceGroup, newDomains: string[]) => {
  sourceGroup.domains = newDomains; // Mutates original
  return sourceGroup;
};
```

This type definition provides a solid foundation for managing source groups across the application while maintaining type safety and following established architectural patterns.