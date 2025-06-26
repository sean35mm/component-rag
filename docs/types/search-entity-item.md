# SearchEntityItem Type Definition

## Purpose

The `SearchEntityItem` interface represents a standardized data structure for search results across the application. It provides a unified format for displaying searchable entities with consistent metadata, visual representation, and routing information. This type serves as the foundation for search functionality, autocomplete components, and entity selection interfaces.

## Type Definition

```typescript
import { ReactNode } from 'react';

export interface SearchEntityItem {
  id: string;
  originalName: string;
  name: string;
  label?: string;
  icon: ReactNode;
  type: string;
  slug?: string;
  domain?: string;
}
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | ✅ | Unique identifier for the entity, used for internal tracking and deduplication |
| `originalName` | `string` | ✅ | The unmodified, original name of the entity as stored in the data source |
| `name` | `string` | ✅ | Display name for the entity, potentially formatted or transformed for presentation |
| `label` | `string` | ❌ | Optional additional label or subtitle for enhanced context in search results |
| `icon` | `ReactNode` | ✅ | Visual representation component (icon, avatar, or image) for the entity |
| `type` | `string` | ✅ | Category or classification of the entity (e.g., "user", "project", "document") |
| `slug` | `string` | ❌ | URL-friendly identifier for routing and deep linking |
| `domain` | `string` | ❌ | Domain or namespace classification for multi-tenant or categorized systems |

## Usage Examples

### Basic Search Result Item

```typescript
import { User, FileText, Building } from 'lucide-react';

const userSearchItem: SearchEntityItem = {
  id: 'user-123',
  originalName: 'john.doe@company.com',
  name: 'John Doe',
  label: 'Senior Developer',
  icon: <User size={16} />,
  type: 'user',
  slug: 'john-doe',
  domain: 'engineering'
};

const documentSearchItem: SearchEntityItem = {
  id: 'doc-456',
  originalName: 'Q3_Financial_Report_2024.pdf',
  name: 'Q3 Financial Report 2024',
  icon: <FileText size={16} />,
  type: 'document',
  slug: 'q3-financial-report-2024'
};
```

### Search Component Implementation

```typescript
interface SearchResultsProps {
  items: SearchEntityItem[];
  onItemSelect: (item: SearchEntityItem) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ items, onItemSelect }) => {
  return (
    <div className="search-results">
      {items.map((item) => (
        <SearchResultItem
          key={item.id}
          item={item}
          onClick={() => onItemSelect(item)}
        />
      ))}
    </div>
  );
};

const SearchResultItem: React.FC<{
  item: SearchEntityItem;
  onClick: () => void;
}> = ({ item, onClick }) => (
  <button
    className="search-result-item"
    onClick={onClick}
    aria-label={`Select ${item.name}`}
  >
    <span className="icon">{item.icon}</span>
    <div className="content">
      <span className="name">{item.name}</span>
      {item.label && <span className="label">{item.label}</span>}
      <span className="type">{item.type}</span>
    </div>
  </button>
);
```

### Data Transformation

```typescript
interface UserApiResponse {
  userId: string;
  email: string;
  displayName: string;
  jobTitle?: string;
  department?: string;
}

function transformUserToSearchItem(user: UserApiResponse): SearchEntityItem {
  return {
    id: user.userId,
    originalName: user.email,
    name: user.displayName,
    label: user.jobTitle,
    icon: <User size={16} />,
    type: 'user',
    slug: user.displayName.toLowerCase().replace(/\s+/g, '-'),
    domain: user.department?.toLowerCase()
  };
}
```

## Type Architecture Pattern

Following our **domain objects → response types → request types** pattern:

### 1. Domain Object (Base)
```typescript
// This is our domain object - the SearchEntityItem interface
export interface SearchEntityItem {
  // ... as defined above
}
```

### 2. Response Types
```typescript
export interface SearchResponse {
  items: SearchEntityItem[];
  totalCount: number;
  hasMore: boolean;
  query: string;
}

export interface SearchEntityItemWithScore extends SearchEntityItem {
  relevanceScore: number;
  matchedFields: string[];
}
```

### 3. Request Types
```typescript
export interface SearchRequest {
  query: string;
  types?: string[];
  domains?: string[];
  limit?: number;
  offset?: number;
}

export interface SearchEntityItemFilter extends Partial<Pick<SearchEntityItem, 'type' | 'domain'>> {
  nameContains?: string;
  hasSlug?: boolean;
}
```

## Related Types

### Utility Types
```typescript
// For partial updates or filtering
export type SearchEntityItemUpdate = Partial<Omit<SearchEntityItem, 'id'>>;

// For search result display variants
export type SearchEntityItemDisplay = Pick<SearchEntityItem, 'name' | 'icon' | 'type' | 'label'>;

// For routing and navigation
export type SearchEntityItemRoute = Required<Pick<SearchEntityItem, 'id' | 'slug'>> & 
  Pick<SearchEntityItem, 'type' | 'domain'>;
```

### Extended Interfaces
```typescript
export interface SelectableSearchEntityItem extends SearchEntityItem {
  selected: boolean;
  disabled?: boolean;
}

export interface CategorizedSearchEntityItem extends SearchEntityItem {
  category: string;
  subcategory?: string;
}
```

## Integration Points

### Components
- **SearchBar**: Displays search results using `SearchEntityItem[]`
- **EntitySelector**: Multi-select interface for choosing entities
- **RecentItems**: Shows recently accessed entities
- **Breadcrumbs**: Uses `slug` and `name` for navigation paths

### Services
- **SearchService**: Returns `SearchResponse` containing `SearchEntityItem[]`
- **EntityService**: Transforms domain objects to `SearchEntityItem` format
- **NavigationService**: Uses `slug` and `type` for routing

### State Management
```typescript
interface SearchState {
  results: SearchEntityItem[];
  selectedItems: SearchEntityItem[];
  recentItems: SearchEntityItem[];
  loading: boolean;
}
```

## Validation

### Zod Schema
```typescript
import { z } from 'zod';

export const SearchEntityItemSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  originalName: z.string().min(1, 'Original name is required'),
  name: z.string().min(1, 'Display name is required'),
  label: z.string().optional(),
  icon: z.any(), // ReactNode validation requires custom schema
  type: z.string().min(1, 'Type is required'),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Invalid slug format').optional(),
  domain: z.string().optional()
});

export type ValidatedSearchEntityItem = z.infer<typeof SearchEntityItemSchema>;
```

### Runtime Validation
```typescript
export function validateSearchEntityItem(item: unknown): SearchEntityItem {
  return SearchEntityItemSchema.parse(item);
}

export function isValidSearchEntityItem(item: unknown): item is SearchEntityItem {
  return SearchEntityItemSchema.safeParse(item).success;
}
```

## Best Practices

### ✅ Adherence to Guidelines

1. **Strict Typing**: All properties have explicit types, no `any` usage
2. **Interface over Type**: Uses `interface` for the object shape
3. **Required vs Optional**: Clear distinction with `?` operator
4. **Utility Types**: Leverage `Pick`, `Omit`, `Partial` for variations

### ✅ Recommended Patterns

```typescript
// ✅ Good: Use utility types for variations
type SearchEntityItemKeys = keyof SearchEntityItem;
type RequiredSearchEntityItem = Required<SearchEntityItem>;

// ✅ Good: Type-safe property access
function getEntityDisplayName(item: SearchEntityItem): string {
  return item.label ? `${item.name} (${item.label})` : item.name;
}

// ✅ Good: Type guards for filtering
function hasSlug(item: SearchEntityItem): item is SearchEntityItem & { slug: string } {
  return item.slug !== undefined;
}
```

### ❌ Anti-patterns to Avoid

```typescript
// ❌ Bad: Using any for icon
interface BadSearchEntityItem {
  icon: any; // Should be ReactNode
}

// ❌ Bad: Missing required fields
const incompleteItem = {
  name: 'Test'
  // Missing id, originalName, icon, type
} as SearchEntityItem;

// ❌ Bad: Mutating the interface
function badMutation(item: SearchEntityItem) {
  (item as any).newProperty = 'value'; // Should extend interface instead
}
```

### 🎯 Performance Considerations

- Use `React.memo()` for search result items to prevent unnecessary re-renders
- Consider virtualization for large search result lists
- Implement proper `key` props using the `id` field
- Cache transformed search items to avoid repeated conversions