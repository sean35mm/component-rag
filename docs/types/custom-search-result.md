# CustomSearchResult<T> Type Documentation

## Purpose

The `CustomSearchResult<T>` interface defines a standardized contract for paginated search response data throughout the application. It provides a consistent structure for API responses that contain a collection of items along with metadata about the total count, enabling proper pagination and result display in search components.

This generic interface serves as a foundational response type that can wrap any domain object while maintaining consistent search result formatting across different data types.

## Type Definition

```typescript
export interface CustomSearchResult<T> {
  total: number;
  data: T[];
}
```

### Generic Parameters

- `T` - The type of individual items contained in the search results. This allows the interface to be reused across different domain objects while maintaining strict typing.

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `total` | `number` | ✅ | The total number of items available across all pages of results. Used for pagination calculations and result count display. |
| `data` | `T[]` | ✅ | Array containing the actual search result items for the current page/query. Each item conforms to the generic type `T`. |

## Usage Examples

### Basic Usage with Domain Objects

```typescript
import { CustomSearchResult } from '@/lib/types/custom-search-result';

// Domain object
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// Using CustomSearchResult with User domain object
type UserSearchResult = CustomSearchResult<User>;

// Example API response handler
async function searchUsers(query: string): Promise<UserSearchResult> {
  const response = await fetch(`/api/users/search?q=${query}`);
  const result: UserSearchResult = await response.json();
  
  return result;
}
```

### Component Integration

```tsx
import { useState, useEffect } from 'react';
import { CustomSearchResult } from '@/lib/types/custom-search-result';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface SearchComponentProps {
  searchQuery: string;
}

export function ProductSearchResults({ searchQuery }: SearchComponentProps) {
  const [results, setResults] = useState<CustomSearchResult<Product> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const searchResults: CustomSearchResult<Product> = await searchProducts(searchQuery);
        setResults(searchResults);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchResults();
    }
  }, [searchQuery]);

  if (loading) return <div>Searching...</div>;
  if (!results) return <div>No results</div>;

  return (
    <div>
      <h2>Found {results.total} products</h2>
      <div className="grid gap-4">
        {results.data.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <span className="text-sm text-gray-500">{product.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Advanced Usage with Utility Types

```typescript
// Creating partial search results for loading states
type PartialSearchResult<T> = Partial<CustomSearchResult<T>>;

// Picking only the data for components that don't need total count
type SearchData<T> = Pick<CustomSearchResult<T>, 'data'>;

// Extending for paginated results
interface PaginatedSearchResult<T> extends CustomSearchResult<T> {
  page: number;
  pageSize: number;
  hasNextPage: boolean;
}
```

## Type Architecture Pattern

Following our architectural pattern of domain objects → response types → request types:

```typescript
// 1. Domain Object (foundational)
interface Article {
  id: string;
  title: string;
  content: string;
  authorId: string;
  publishedAt: Date;
}

// 2. Response Type (using CustomSearchResult)
type ArticleSearchResponse = CustomSearchResult<Article>;

// 3. Request Type (for search parameters)
interface ArticleSearchRequest {
  query: string;
  authorId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  page?: number;
  limit?: number;
}

// Service layer implementation
class ArticleService {
  async searchArticles(params: ArticleSearchRequest): Promise<ArticleSearchResponse> {
    // Implementation details...
  }
}
```

## Related Types

### Composing Types

```typescript
// Search result with metadata
interface EnhancedSearchResult<T> extends CustomSearchResult<T> {
  searchQuery: string;
  executionTime: number;
  facets?: Record<string, number>;
}

// Union type for different result states
type SearchResultState<T> = 
  | { status: 'loading' }
  | { status: 'success'; result: CustomSearchResult<T> }
  | { status: 'error'; error: string };
```

### Generic Constraints

```typescript
// Constraining the generic type
interface Searchable {
  id: string;
  searchText: string;
}

interface TypedSearchResult<T extends Searchable> extends CustomSearchResult<T> {
  highlightedFields: Array<keyof T>;
}
```

## Integration Points

### API Layer
```typescript
// API route handler
export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  
  const results: CustomSearchResult<Product> = await productService.search(query);
  
  return Response.json(results);
}
```

### State Management
```typescript
// Redux slice or Zustand store
interface SearchState {
  userResults: CustomSearchResult<User> | null;
  productResults: CustomSearchResult<Product> | null;
  loading: boolean;
  error: string | null;
}
```

### Hook Integration
```typescript
function useSearch<T>(searchFn: (query: string) => Promise<CustomSearchResult<T>>) {
  const [results, setResults] = useState<CustomSearchResult<T> | null>(null);
  const [loading, setLoading] = useState(false);
  
  const search = useCallback(async (query: string) => {
    setLoading(true);
    try {
      const searchResults = await searchFn(query);
      setResults(searchResults);
    } finally {
      setLoading(false);
    }
  }, [searchFn]);
  
  return { results, loading, search };
}
```

## Validation

### Zod Schema Definition

```typescript
import { z } from 'zod';

// Generic schema factory
function createSearchResultSchema<T>(itemSchema: z.ZodSchema<T>) {
  return z.object({
    total: z.number().int().min(0),
    data: z.array(itemSchema),
  });
}

// Usage with specific domain objects
const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.date(),
});

const userSearchResultSchema = createSearchResultSchema(userSchema);

// Validation in API handlers
export async function validateSearchResult<T>(
  data: unknown,
  itemSchema: z.ZodSchema<T>
): Promise<CustomSearchResult<T>> {
  const schema = createSearchResultSchema(itemSchema);
  return schema.parse(data);
}
```

### Runtime Validation Example

```typescript
async function fetchSearchResults<T>(
  url: string,
  itemSchema: z.ZodSchema<T>
): Promise<CustomSearchResult<T>> {
  const response = await fetch(url);
  const rawData = await response.json();
  
  // Validate the response structure
  return validateSearchResult(rawData, itemSchema);
}
```

## Best Practices

### 1. Strict Typing Adherence
```typescript
// ✅ Good: Explicit generic typing
const results: CustomSearchResult<User> = await searchUsers(query);

// ❌ Avoid: Using any
const results: any = await searchUsers(query);
```

### 2. Interface Consistency
```typescript
// ✅ Good: Extending the interface for additional properties
interface ExtendedSearchResult<T> extends CustomSearchResult<T> {
  searchTime: number;
}

// ❌ Avoid: Creating separate type aliases that duplicate structure
type SearchResponse<T> = {
  total: number;
  data: T[];
  searchTime: number;
};
```

### 3. Generic Type Constraints
```typescript
// ✅ Good: Using constraints when needed
interface SearchableItem {
  id: string;
}

function processSearchResults<T extends SearchableItem>(
  results: CustomSearchResult<T>
): string[] {
  return results.data.map(item => item.id);
}
```

### 4. Utility Type Integration
```typescript
// ✅ Good: Leveraging utility types
type SearchResultKeys = keyof CustomSearchResult<unknown>; // 'total' | 'data'
type OptionalSearchResult<T> = Partial<CustomSearchResult<T>>;
type SearchDataOnly<T> = Pick<CustomSearchResult<T>, 'data'>;
```

### 5. Error Handling with Types
```typescript
// ✅ Good: Type-safe error handling
type SearchResponse<T> = 
  | { success: true; result: CustomSearchResult<T> }
  | { success: false; error: string };

async function safeSearch<T>(query: string): Promise<SearchResponse<T>> {
  try {
    const result = await performSearch<T>(query);
    return { success: true, result };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
```

This type definition exemplifies our commitment to strict typing and reusable interface design, providing a solid foundation for search functionality across the application while maintaining type safety and consistency.