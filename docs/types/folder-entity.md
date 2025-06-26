# Folder Entity Type Definition

## Purpose

The `FolderEntity` type system defines the core data structure for folder-like entities within the application's tab management system. These types serve as domain objects representing navigable items that can be organized, displayed, and interacted with in a folder-based interface. The types follow a hierarchical structure where `FolderEntityBase` provides the fundamental properties and `FolderEntity` extends it with unique identification capabilities.

## Type Definition

```typescript
import { TabEntityType } from './tabs';

export interface FolderEntityBase {
  type: TabEntityType;
  href: string;
  name: string;
  createdAt: string;
}

export interface FolderEntity extends FolderEntityBase {
  entityId: string;
}
```

## Properties

### FolderEntityBase

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `TabEntityType` | ✅ | Identifies the category/type of the folder entity (imported from tabs module) |
| `href` | `string` | ✅ | Navigation URL or path for the folder entity |
| `name` | `string` | ✅ | Display name for the folder entity |
| `createdAt` | `string` | ✅ | ISO timestamp string indicating when the entity was created |

### FolderEntity

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `entityId` | `string` | ✅ | Unique identifier for the folder entity |
| ...FolderEntityBase | - | ✅ | Inherits all properties from FolderEntityBase |

## Usage Examples

### Basic Usage in Components

```typescript
import { FolderEntity, FolderEntityBase } from '@/lib/types/folder-entity';
import { TabEntityType } from '@/lib/types/tabs';

// Creating a new folder entity
const createFolderEntity = (base: FolderEntityBase): FolderEntity => {
  return {
    ...base,
    entityId: crypto.randomUUID()
  };
};

// Usage in a React component
interface FolderListProps {
  folders: FolderEntity[];
  onFolderSelect: (folder: FolderEntity) => void;
}

const FolderList: React.FC<FolderListProps> = ({ folders, onFolderSelect }) => {
  return (
    <div className="folder-list">
      {folders.map((folder) => (
        <div 
          key={folder.entityId}
          onClick={() => onFolderSelect(folder)}
          className="folder-item"
        >
          <h3>{folder.name}</h3>
          <span>{folder.type}</span>
          <time>{new Date(folder.createdAt).toLocaleDateString()}</time>
        </div>
      ))}
    </div>
  );
};
```

### Service Layer Integration

```typescript
// API service using the folder entity types
class FolderService {
  async getFolders(): Promise<FolderEntity[]> {
    const response = await fetch('/api/folders');
    const data = await response.json();
    return data.folders;
  }

  async createFolder(folderData: Omit<FolderEntityBase, 'createdAt'>): Promise<FolderEntity> {
    const baseFolder: FolderEntityBase = {
      ...folderData,
      createdAt: new Date().toISOString()
    };

    const response = await fetch('/api/folders', {
      method: 'POST',
      body: JSON.stringify(baseFolder)
    });

    return response.json();
  }

  async updateFolder(
    entityId: string, 
    updates: Partial<Pick<FolderEntity, 'name' | 'href'>>
  ): Promise<FolderEntity> {
    const response = await fetch(`/api/folders/${entityId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    });

    return response.json();
  }
}
```

### Type Guards and Utilities

```typescript
// Type guard for runtime validation
const isFolderEntity = (obj: unknown): obj is FolderEntity => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'entityId' in obj &&
    'type' in obj &&
    'href' in obj &&
    'name' in obj &&
    'createdAt' in obj &&
    typeof (obj as FolderEntity).entityId === 'string' &&
    typeof (obj as FolderEntity).name === 'string' &&
    typeof (obj as FolderEntity).href === 'string' &&
    typeof (obj as FolderEntity).createdAt === 'string'
  );
};

// Utility types for common operations
type FolderEntityUpdate = Partial<Pick<FolderEntity, 'name' | 'href'>>;
type FolderEntityCreate = Omit<FolderEntityBase, 'createdAt'>;
type FolderEntityResponse = FolderEntity[];
```

## Type Architecture Pattern

This type definition follows our established pattern:

```
Domain Objects (Core) → Response Types → Request Types
      ↓
FolderEntityBase ← Base domain properties
      ↓
FolderEntity ← Extended domain object with ID
      ↓
API Response/Request Types ← Service layer integration
```

### Architecture Flow

1. **Domain Objects**: `FolderEntityBase` and `FolderEntity` represent the core business entities
2. **Response Types**: API responses use `FolderEntity[]` or individual `FolderEntity`
3. **Request Types**: API requests use utility types like `Omit<FolderEntityBase, 'createdAt'>` for creation

## Related Types

### Direct Dependencies
- `TabEntityType` from `./tabs` - Defines the entity type classification

### Potential Extension Types
```typescript
// Extended folder entity with additional metadata
interface ExtendedFolderEntity extends FolderEntity {
  description?: string;
  tags: string[];
  parentFolderId?: string;
  isPublic: boolean;
}

// Folder entity with computed properties
interface FolderEntityWithMeta extends FolderEntity {
  itemCount: number;
  lastModified: string;
  isRecent: boolean;
}
```

## Integration Points

### Components
- **FolderList**: Displays collections of folder entities
- **FolderCard**: Individual folder entity presentation
- **FolderForm**: Create/edit folder entities
- **FolderNavigation**: Breadcrumb and navigation components

### Services
- **FolderService**: CRUD operations for folder entities
- **TabService**: Integration with tab management system
- **SearchService**: Folder entity filtering and search

### State Management
```typescript
// Redux/Zustand store integration
interface FolderState {
  folders: FolderEntity[];
  selectedFolder: FolderEntity | null;
  isLoading: boolean;
  error: string | null;
}
```

## Validation

### Zod Schema Example

```typescript
import { z } from 'zod';

// Assuming TabEntityType is a union type or enum
export const FolderEntityBaseSchema = z.object({
  type: z.string(), // Should match TabEntityType validation
  href: z.string().url('Invalid URL format'),
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  createdAt: z.string().datetime('Invalid ISO date format')
});

export const FolderEntitySchema = FolderEntityBaseSchema.extend({
  entityId: z.string().uuid('Invalid entity ID format')
});

// Validation functions
export const validateFolderEntity = (data: unknown): FolderEntity => {
  return FolderEntitySchema.parse(data);
};

export const validateFolderEntityArray = (data: unknown): FolderEntity[] => {
  return z.array(FolderEntitySchema).parse(data);
};
```

## Best Practices

### ✅ Adherence to Guidelines

1. **Strict Typing**: All properties have explicit types, no `any` usage
2. **Interfaces over Types**: Both definitions use `interface` for object shapes
3. **Utility Types**: Examples demonstrate `Omit`, `Pick`, and `Partial` usage
4. **Type Architecture**: Clear domain → response → request type flow

### ✅ Recommended Patterns

```typescript
// Good: Use utility types for API operations
type CreateFolderRequest = Omit<FolderEntityBase, 'createdAt'>;
type UpdateFolderRequest = Partial<Pick<FolderEntity, 'name' | 'href'>>;

// Good: Extend base types for specific use cases
interface FolderEntityWithChildren extends FolderEntity {
  children: FolderEntity[];
}

// Good: Use type guards for runtime safety
const processFolders = (data: unknown[]): FolderEntity[] => {
  return data.filter(isFolderEntity);
};
```

### ⚠️ Considerations

- Consider if `createdAt` should be `Date` instead of `string` for stronger typing
- The dependency on `TabEntityType` creates coupling with the tabs module
- Future enhancement might benefit from generic typing for different entity categories