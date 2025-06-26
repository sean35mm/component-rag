# SavedFilter Type Definition

## Purpose

The `saved-filter` type definitions provide a comprehensive type system for managing saved search filters in the application. These types enable users to create, store, and retrieve complex query configurations with support for nested logical operations (AND, OR, NOT) and various filter criteria including sources, locations, companies, and people.

## Type Definition

```typescript
export interface SavedFilterQuery {
  // Search query and basic filters
  q?: string;
  source?: string | string[];
  excludeSource?: string | string[];
  sourceGroup?: string | string[];
  
  // Language and content filters
  language?: string | string[];
  excludeLanguage?: string | string[];
  label?: string | string[];
  excludeLabel?: string | string[];
  taxonomy?: string | string[];
  category?: string | string[];
  topic?: string | string[];
  excludeTopic?: string | string[];
  medium?: string | string[];
  
  // Geographic filters
  country?: string | string[];
  excludeCountry?: string | string[];
  locationsCountry?: string | string[];
  excludeLocationsCountry?: string | string[];
  state?: string | string[];
  excludeState?: string | string[];
  county?: string | string[];
  excludeCounty?: string | string[];
  city?: string | string[];
  excludeCity?: string | string[];
  
  // Source location filters
  sourceCountry?: string | string[];
  sourceState?: string | string[];
  sourceCounty?: string | string[];
  sourceCity?: string | string[];
  
  // Company filters
  companyId?: string | string[];
  excludeCompanyId?: string | string[];
  companyDomain?: string | string[];
  excludeCompanyDomain?: string | string[];
  companySymbol?: string | string[];
  excludeCompanySymbol?: string | string[];
  
  // Person filters
  personWikidataId?: string | string[];
  excludePersonWikidataId?: string | string[];
  personName?: string | string[];
  excludePersonName?: string | string[];
  
  // Author filters
  authorId?: string | string[];
  authorName?: string | string[];
  authorByline?: string;
  
  // Logical operators for complex queries
  AND?: SavedFilterQuery[];
  OR?: SavedFilterQuery[];
  NOT?: SavedFilterQuery | SavedFilterQuery[];
}

export interface SavedFilterQueryData {
  query?: SavedFilterQuery;
  showReprints: boolean;
}

export interface SavedFilter {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  data: SavedFilterQueryData;
}

export type SavedFiltersResponse = { data: SavedFilter[] };
```

## Properties

### SavedFilterQuery

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `q` | `string` | No | Free-text search query |
| `source` | `string \| string[]` | No | Include specific sources |
| `excludeSource` | `string \| string[]` | No | Exclude specific sources |
| `sourceGroup` | `string \| string[]` | No | Filter by source group |
| `language` | `string \| string[]` | No | Content language filter |
| `excludeLanguage` | `string \| string[]` | No | Exclude content languages |
| `label` | `string \| string[]` | No | Content label filter |
| `excludeLabel` | `string \| string[]` | No | Exclude content labels |
| `taxonomy` | `string \| string[]` | No | Taxonomy classification |
| `category` | `string \| string[]` | No | Content category |
| `topic` | `string \| string[]` | No | Content topic |
| `excludeTopic` | `string \| string[]` | No | Exclude topics |
| `medium` | `string \| string[]` | No | Media type filter |
| `country` | `string \| string[]` | No | Content location country |
| `excludeCountry` | `string \| string[]` | No | Exclude countries |
| `locationsCountry` | `string \| string[]` | No | Specific location countries |
| `excludeLocationsCountry` | `string \| string[]` | No | Exclude location countries |
| `state` | `string \| string[]` | No | State/province filter |
| `excludeState` | `string \| string[]` | No | Exclude states |
| `county` | `string \| string[]` | No | County filter |
| `excludeCounty` | `string \| string[]` | No | Exclude counties |
| `city` | `string \| string[]` | No | City filter |
| `excludeCity` | `string \| string[]` | No | Exclude cities |
| `sourceCountry` | `string \| string[]` | No | Source location country |
| `sourceState` | `string \| string[]` | No | Source location state |
| `sourceCounty` | `string \| string[]` | No | Source location county |
| `sourceCity` | `string \| string[]` | No | Source location city |
| `companyId` | `string \| string[]` | No | Company identifier |
| `excludeCompanyId` | `string \| string[]` | No | Exclude company IDs |
| `companyDomain` | `string \| string[]` | No | Company domain |
| `excludeCompanyDomain` | `string \| string[]` | No | Exclude company domains |
| `companySymbol` | `string \| string[]` | No | Stock symbol |
| `excludeCompanySymbol` | `string \| string[]` | No | Exclude stock symbols |
| `personWikidataId` | `string \| string[]` | No | Person Wikidata ID |
| `excludePersonWikidataId` | `string \| string[]` | No | Exclude person Wikidata IDs |
| `personName` | `string \| string[]` | No | Person name |
| `excludePersonName` | `string \| string[]` | No | Exclude person names |
| `authorId` | `string \| string[]` | No | Author identifier |
| `authorName` | `string \| string[]` | No | Author name |
| `authorByline` | `string` | No | Author byline text |
| `AND` | `SavedFilterQuery[]` | No | Logical AND operation |
| `OR` | `SavedFilterQuery[]` | No | Logical OR operation |
| `NOT` | `SavedFilterQuery \| SavedFilterQuery[]` | No | Logical NOT operation |

### SavedFilterQueryData

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `query` | `SavedFilterQuery` | No | The filter query configuration |
| `showReprints` | `boolean` | Yes | Whether to include reprinted content |

### SavedFilter

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | Yes | Unique filter identifier |
| `name` | `string` | Yes | Human-readable filter name |
| `description` | `string` | Yes | Filter description |
| `createdAt` | `string` | Yes | ISO timestamp of creation |
| `updatedAt` | `string` | Yes | ISO timestamp of last update |
| `data` | `SavedFilterQueryData` | Yes | Filter configuration data |

## Usage Examples

### Creating a Basic Filter

```typescript
const basicFilter: SavedFilter = {
  id: 'filter-001',
  name: 'Tech News',
  description: 'Technology-related news articles',
  createdAt: '2024-01-15T10:30:00Z',
  updatedAt: '2024-01-15T10:30:00Z',
  data: {
    query: {
      q: 'artificial intelligence',
      category: ['technology', 'science'],
      language: 'en'
    },
    showReprints: false
  }
};
```

### Complex Query with Logical Operators

```typescript
const complexFilter: SavedFilterQuery = {
  OR: [
    {
      AND: [
        { topic: 'machine learning' },
        { companySymbol: ['GOOGL', 'MSFT', 'AAPL'] }
      ]
    },
    {
      AND: [
        { personName: 'Elon Musk' },
        { excludeTopic: 'cryptocurrency' }
      ]
    }
  ],
  excludeCountry: ['CN', 'RU'],
  language: 'en'
};
```

### Geographic and Company Filtering

```typescript
const geoCompanyFilter: SavedFilterQuery = {
  country: ['US', 'CA'],
  state: ['California', 'New York'],
  companyDomain: ['tesla.com', 'spacex.com'],
  excludeCompanyId: ['blocked-company-123'],
  sourceCountry: 'US'
};
```

### Service Integration Example

```typescript
// Service method using SavedFilter types
class SavedFilterService {
  async createFilter(
    name: string, 
    description: string, 
    query: SavedFilterQuery
  ): Promise<SavedFilter> {
    const filterData: Omit<SavedFilter, 'id'> = {
      name,
      description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      data: {
        query,
        showReprints: false
      }
    };
    
    return await this.apiClient.post<SavedFilter>('/filters', filterData);
  }
  
  async getFilters(): Promise<SavedFiltersResponse> {
    return await this.apiClient.get<SavedFiltersResponse>('/filters');
  }
  
  async updateFilter(
    id: string, 
    updates: Partial<Pick<SavedFilter, 'name' | 'description' | 'data'>>
  ): Promise<SavedFilter> {
    const updateData = {
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    return await this.apiClient.patch<SavedFilter>(`/filters/${id}`, updateData);
  }
}
```

### React Component Usage

```typescript
interface FilterBuilderProps {
  onSave: (filter: Omit<SavedFilter, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialQuery?: SavedFilterQuery;
}

const FilterBuilder: React.FC<FilterBuilderProps> = ({ onSave, initialQuery }) => {
  const [query, setQuery] = useState<SavedFilterQuery>(initialQuery || {});
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [showReprints, setShowReprints] = useState(false);
  
  const handleSave = () => {
    const filterData: Omit<SavedFilter, 'id' | 'createdAt' | 'updatedAt'> = {
      name,
      description,
      data: {
        query,
        showReprints
      }
    };
    
    onSave(filterData);
  };
  
  const updateQuery = (field: keyof SavedFilterQuery, value: string | string[]) => {
    setQuery(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Component JSX...
};
```

## Type Architecture Pattern

Following our architecture pattern of domain objects → response types → request types:

1. **Domain Objects**: `SavedFilter`, `SavedFilterQuery`, `SavedFilterQueryData`
2. **Response Types**: `SavedFiltersResponse`
3. **Request Types**: Built using utility types from domain objects

### Derived Request Types

```typescript
// Create filter request (excluding server-generated fields)
export type CreateSavedFilterRequest = Omit<SavedFilter, 'id' | 'createdAt' | 'updatedAt'>;

// Update filter request (partial updates allowed)
export type UpdateSavedFilterRequest = Partial<Pick<SavedFilter, 'name' | 'description' | 'data'>>;

// Query builder request (focusing on query construction)
export type FilterQueryRequest = Pick<SavedFilterQueryData, 'query' | 'showReprints'>;

// Bulk operations
export type BatchSavedFilterRequest = {
  filters: CreateSavedFilterRequest[];
};
```

## Related Types

This type system integrates with several other domain types:

- **Search Types**: Query parameters and search results
- **Source Types**: Source metadata and configuration
- **Company Types**: Company profiles and identifiers
- **Person Types**: Person entities and Wikidata integration
- **Geographic Types**: Location hierarchies and filtering
- **Content Types**: Articles, categories, and taxonomies

## Integration Points

### Services
- `SavedFilterService`: CRUD operations for saved filters
- `SearchService`: Converting filters to search queries
- `QueryBuilderService`: Interactive filter construction

### Components
- `FilterBuilder`: Interactive filter creation interface
- `FilterList`: Display and manage saved filters
- `QueryPreview`: Preview filter results
- `FilterExport`: Export/import filter configurations

### State Management
- Filter state in Redux/Zustand stores
- Query caching and optimization
- Filter sharing and collaboration

## Validation

### Zod Schema Example

```typescript
import { z } from 'zod';

const SavedFilterQuerySchema: z.ZodType<SavedFilterQuery> = z.lazy(() =>
  z.object({
    q: z.string().optional(),
    source: z.union([z.string(), z.array(z.string())]).optional(),
    excludeSource: z.union([z.string(), z.array(z.string())]).optional(),
    language: z.union([z.string(), z.array(z.string())]).optional(),
    country: z.union([z.string(), z.array(z.string())]).optional(),
    companyId: z.union([z.string(), z.array(z.string())]).optional(),
    // ... other fields
    AND: z.array(SavedFilterQuerySchema).optional(),
    OR: z.array(SavedFilterQuerySchema).optional(),
    NOT: z.union([SavedFilterQuerySchema, z.array(SavedFilterQuerySchema)]).optional(),
  })
);

const SavedFilterSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  description: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  data: z.object({
    query: SavedFilterQuerySchema.optional(),
    showReprints: z.boolean()
  })
});
```

## Best Practices

### TypeScript Guidelines Adherence

1. **Strict Typing**: All properties are explicitly typed, avoiding `any`
2. **Interface Usage**: Consistent use of `interface` for object shapes
3. **Utility Types**: Leveraging `Omit`, `Pick`, `Partial` for derived types
4. **Literal Types**: Using string literals for specific values where appropriate

### Filter Design Patterns

1. **Recursive Queries**: Support for nested logical operations
2. **Flexible Arrays**: Accept both single values and arrays for scalability
3. **Exclude Patterns**: Consistent `exclude*` fields for negative filtering
4. **Geographic Hierarchy**: Structured location filtering from country to city
5. **Entity Separation**: Distinct filters for companies, people, and sources

### Performance Considerations

1. **Optional Fields**: All filter fields are optional for incremental building
2. **Serializable Structure**: JSON-compatible for easy storage and transmission
3. **Index-Friendly**: Field structure optimized for database indexing
4. **Caching Support**: Immutable patterns support effective caching strategies