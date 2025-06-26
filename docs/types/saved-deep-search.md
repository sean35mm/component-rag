# SavedDeepSearch Type Documentation

## Purpose

The `SavedDeepSearch` type system represents persistent deep search queries within the application. This module defines the domain objects for storing and managing complex search configurations that users can save, activate, and reuse. It follows our type architecture pattern by establishing the core domain interfaces that can be extended for API requests and responses.

## Type Definition

### Core Interfaces

```typescript
interface DeepSearchMetadata {
  name: string;
  query: Partial<SavedDeepSearchQuery>;
  nlpQuery: string | null;
  savedFilterId?: string;
}

interface SavedDeepSearch extends DeepSearchMetadata {
  uuid: string;
  createdAt: string;
  updatedAt: string;
  lastRanAt: string | null;
  lastNSeconds: number;
  status: SavedDeepSearchStatusEnum;
}
```

### Supporting Types

```typescript
interface SavedDeepSearchQuery {
  articlesQuery: Partial<ComplexAllEndpointBody>;
  articlesVolumeQuery: null; // TODO: Implementation pending
}

enum SavedDeepSearchStatusEnum {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
}
```

## Properties

### DeepSearchMetadata Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | `string` | ✅ | Human-readable name for the saved search |
| `query` | `Partial<SavedDeepSearchQuery>` | ✅ | The search query configuration |
| `nlpQuery` | `string \| null` | ✅ | Natural language query string, if applicable |
| `savedFilterId` | `string` | ❌ | Optional reference to a saved filter |

### SavedDeepSearch Properties

Inherits all `DeepSearchMetadata` properties plus:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `uuid` | `string` | ✅ | Unique identifier for the saved search |
| `createdAt` | `string` | ✅ | ISO timestamp of creation |
| `updatedAt` | `string` | ✅ | ISO timestamp of last modification |
| `lastRanAt` | `string \| null` | ✅ | ISO timestamp of last execution, null if never run |
| `lastNSeconds` | `number` | ✅ | Duration of last execution in seconds |
| `status` | `SavedDeepSearchStatusEnum` | ✅ | Current status of the saved search |

### SavedDeepSearchQuery Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `articlesQuery` | `Partial<ComplexAllEndpointBody>` | ✅ | Article search query parameters |
| `articlesVolumeQuery` | `null` | ✅ | Volume query (implementation pending) |

## Usage Examples

### Creating a New Deep Search

```typescript
import { DeepSearchMetadata, SavedDeepSearchStatusEnum } from './saved-deep-search';

const createDeepSearchMetadata = (): DeepSearchMetadata => {
  return {
    name: "Tech Industry Analysis",
    query: {
      articlesQuery: {
        keywords: ["technology", "innovation"],
        dateRange: {
          start: "2024-01-01",
          end: "2024-12-31"
        }
      },
      articlesVolumeQuery: null
    },
    nlpQuery: "Find articles about technology and innovation",
    savedFilterId: "filter-123"
  };
};
```

### Working with Saved Deep Search

```typescript
import { SavedDeepSearch, SavedDeepSearchStatusEnum } from './saved-deep-search';

const createSavedDeepSearch = (metadata: DeepSearchMetadata): SavedDeepSearch => {
  return {
    ...metadata,
    uuid: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastRanAt: null,
    lastNSeconds: 0,
    status: SavedDeepSearchStatusEnum.DRAFT
  };
};

const activateSearch = (search: SavedDeepSearch): SavedDeepSearch => {
  return {
    ...search,
    status: SavedDeepSearchStatusEnum.ACTIVE,
    updatedAt: new Date().toISOString()
  };
};
```

### Status Management

```typescript
const updateSearchStatus = (
  search: SavedDeepSearch, 
  newStatus: SavedDeepSearchStatusEnum
): SavedDeepSearch => {
  return {
    ...search,
    status: newStatus,
    updatedAt: new Date().toISOString()
  };
};

// Usage
const draftSearch = createSavedDeepSearch(metadata);
const activeSearch = updateSearchStatus(draftSearch, SavedDeepSearchStatusEnum.ACTIVE);
const deletedSearch = updateSearchStatus(activeSearch, SavedDeepSearchStatusEnum.DELETED);
```

## Type Architecture Pattern

This type follows our **domain-first** architecture pattern:

```
Domain Objects (Core)
├── DeepSearchMetadata (base metadata)
├── SavedDeepSearch (complete domain object)
└── SavedDeepSearchQuery (query structure)
    ↓
Response Types (API Layer)
├── SavedDeepSearchResponse
├── DeepSearchListResponse
└── DeepSearchExecutionResponse
    ↓
Request Types (Client Layer)
├── CreateDeepSearchRequest
├── UpdateDeepSearchRequest
└── ExecuteDeepSearchRequest
```

### Extending for API Operations

```typescript
// Response Types
interface SavedDeepSearchResponse {
  data: SavedDeepSearch;
  success: boolean;
  message?: string;
}

interface DeepSearchListResponse {
  data: SavedDeepSearch[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}

// Request Types
interface CreateDeepSearchRequest {
  metadata: DeepSearchMetadata;
}

interface UpdateDeepSearchRequest {
  uuid: string;
  updates: Partial<DeepSearchMetadata>;
}
```

## Related Types

### Direct Dependencies
- `ComplexAllEndpointBody` - Used in `SavedDeepSearchQuery.articlesQuery`

### Potential Extensions
```typescript
// Query execution results
interface DeepSearchResults {
  searchId: string;
  articles: Article[];
  executionTime: number;
  totalResults: number;
}

// Search history tracking
interface DeepSearchExecution {
  searchUuid: string;
  executedAt: string;
  duration: number;
  resultCount: number;
  success: boolean;
}
```

## Integration Points

### Services
```typescript
class DeepSearchService {
  async createSearch(metadata: DeepSearchMetadata): Promise<SavedDeepSearch> {
    // Implementation
  }
  
  async executeSearch(uuid: string): Promise<DeepSearchResults> {
    // Implementation
  }
  
  async updateStatus(
    uuid: string, 
    status: SavedDeepSearchStatusEnum
  ): Promise<SavedDeepSearch> {
    // Implementation
  }
}
```

### React Components
```typescript
interface DeepSearchCardProps {
  search: SavedDeepSearch;
  onExecute: (uuid: string) => void;
  onStatusChange: (uuid: string, status: SavedDeepSearchStatusEnum) => void;
}

const DeepSearchCard: React.FC<DeepSearchCardProps> = ({ 
  search, 
  onExecute, 
  onStatusChange 
}) => {
  const isActive = search.status === SavedDeepSearchStatusEnum.ACTIVE;
  
  return (
    <div className="search-card">
      <h3>{search.name}</h3>
      <p>Status: {search.status}</p>
      {search.lastRanAt && (
        <p>Last run: {new Date(search.lastRanAt).toLocaleString()}</p>
      )}
    </div>
  );
};
```

## Validation

### Zod Schema Example
```typescript
import { z } from 'zod';

const SavedDeepSearchStatusSchema = z.enum(['DRAFT', 'ACTIVE', 'DELETED']);

const DeepSearchMetadataSchema = z.object({
  name: z.string().min(1).max(255),
  query: z.object({
    articlesQuery: z.record(z.unknown()).partial(),
    articlesVolumeQuery: z.null()
  }).partial(),
  nlpQuery: z.string().nullable(),
  savedFilterId: z.string().optional()
});

const SavedDeepSearchSchema = DeepSearchMetadataSchema.extend({
  uuid: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  lastRanAt: z.string().datetime().nullable(),
  lastNSeconds: z.number().nonnegative(),
  status: SavedDeepSearchStatusSchema
});
```

## Best Practices

### ✅ Adherence to Guidelines

1. **Strict Typing**: All properties have explicit types, avoiding `any`
2. **Interface Usage**: Uses `interface` for object shapes consistently
3. **Enum Usage**: `SavedDeepSearchStatusEnum` is reusable across the application
4. **Utility Types**: Leverages `Partial<>` for flexible query structures
5. **Domain-First**: Establishes core domain objects before API types

### ✅ Recommended Patterns

```typescript
// Use type guards for status checking
const isActiveSearch = (search: SavedDeepSearch): boolean => {
  return search.status === SavedDeepSearchStatusEnum.ACTIVE;
};

// Use builder pattern for complex creation
class DeepSearchBuilder {
  private metadata: Partial<DeepSearchMetadata> = {};
  
  setName(name: string): this {
    this.metadata.name = name;
    return this;
  }
  
  setQuery(query: Partial<SavedDeepSearchQuery>): this {
    this.metadata.query = query;
    return this;
  }
  
  build(): DeepSearchMetadata {
    if (!this.metadata.name) {
      throw new Error('Name is required');
    }
    return this.metadata as DeepSearchMetadata;
  }
}
```

### ⚠️ Current TODOs

1. **Duplicate Query Interface**: The comment indicates `SavedDeepSearchQuery` duplicates `SignalQuery.query` - consider consolidation
2. **Articles Volume Query**: Implementation is pending for `articlesVolumeQuery`
3. **Missing ID Property**: Commented out `id: number` suggests database integration is incomplete