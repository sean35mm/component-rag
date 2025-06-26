# StandardSearchResult<T>

## Purpose

The `StandardSearchResult<T>` interface defines a standardized response shape for search operations across the application. It provides a consistent structure for returning search results with metadata including status information and result counts, while maintaining type safety for the actual search results through generic typing.

## Type Definition

```typescript
export interface StandardSearchResult<T> {
  status: number;
  numResults: number;
  results: T[];
}
```

### Generic Parameters

- `T` - The type of individual search result items contained in the `results` array

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `status` | `number` | ✅ | HTTP status code or operation status indicator |
| `numResults` | `number` | ✅ | Total number of results returned in the search |
| `results` | `T[]` | ✅ | Array of search result items of generic type T |

## Usage Examples

### Basic Search Result Implementation

```typescript
import { StandardSearchResult } from '@/lib/types/standard-search-result';

// Domain object
interface User {
  id: string;
  name: string;
  email: string;
}

// Using with specific domain type
type UserSearchResult = StandardSearchResult<User>;

// Example response
const userSearchResponse: UserSearchResult = {
  status: 200,
  numResults: 3,
  results: [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com' }
  ]
};
```

### Service Implementation

```typescript
import { StandardSearchResult } from '@/lib/types/standard-search-result';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

class ProductService {
  async searchProducts(query: string): Promise<StandardSearchResult<Product>> {
    try {
      const response = await fetch(`/api/products/search?q=${query}`);
      const data = await response.json();
      
      return {
        status: response.status,
        numResults: data.results.length,
        results: data.results
      };
    } catch (error) {
      return {
        status: 500,
        numResults: 0,
        results: []
      };
    }
  }
}
```

### React Component Usage

```typescript
import React, { useState, useEffect } from 'react';
import { StandardSearchResult } from '@/lib/types/standard-search-result';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
}

interface SearchComponentProps {
  searchTerm: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ searchTerm }) => {
  const [searchResult, setSearchResult] = useState<StandardSearchResult<Article> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const performSearch = async (): Promise<void> => {
      setLoading(true);
      try {
        const response = await fetch(`/api/articles/search?q=${searchTerm}`);
        const result: StandardSearchResult<Article> = await response.json();
        setSearchResult(result);
      } catch (error) {
        setSearchResult({
          status: 500,
          numResults: 0,
          results: []
        });
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm) {
      performSearch();
    }
  }, [searchTerm]);

  if (loading) return <div>Searching...</div>;
  if (!searchResult) return <div>No search performed</div>;

  return (
    <div>
      <h2>Search Results ({searchResult.numResults} found)</h2>
      {searchResult.status === 200 ? (
        <ul>
          {searchResult.results.map((article) => (
            <li key={article.id}>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div>Search failed with status: {searchResult.status}</div>
      )}
    </div>
  );
};
```

## Type Architecture Pattern

This type follows our **domain objects → response types → request types** pattern:

```typescript
// 1. Domain Objects (First)
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

// 2. Response Types (Built from domain objects)
type UserSearchResponse = StandardSearchResult<User>;
type ProductSearchResponse = StandardSearchResult<Product>;

// 3. Request Types (Last)
interface SearchRequest {
  query: string;
  limit?: number;
  offset?: number;
  filters?: Record<string, unknown>;
}
```

## Related Types

### Extended Search Result Types

```typescript
// Paginated search results
interface PaginatedSearchResult<T> extends StandardSearchResult<T> {
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Faceted search results
interface FacetedSearchResult<T> extends StandardSearchResult<T> {
  facets: Record<string, Array<{ value: string; count: number }>>;
}

// Aggregated search results
interface AggregatedSearchResult<T> extends StandardSearchResult<T> {
  aggregations: Record<string, number>;
}
```

### Utility Types

```typescript
// Extract result type from StandardSearchResult
type ExtractResultType<T> = T extends StandardSearchResult<infer U> ? U : never;

// Create partial search result for loading states
type PartialSearchResult<T> = Partial<StandardSearchResult<T>>;

// Pick only results from search response
type SearchResultsOnly<T> = Pick<StandardSearchResult<T>, 'results'>;
```

## Integration Points

### API Layer
```typescript
// API response handlers
export const handleSearchResponse = <T>(
  response: Response,
  data: T[]
): StandardSearchResult<T> => ({
  status: response.status,
  numResults: data.length,
  results: data
});
```

### State Management
```typescript
interface SearchState<T> {
  currentSearch: StandardSearchResult<T> | null;
  previousSearches: StandardSearchResult<T>[];
  loading: boolean;
  error: string | null;
}
```

### React Hooks
```typescript
const useSearch = <T>(searchFn: (query: string) => Promise<StandardSearchResult<T>>) => {
  const [result, setResult] = useState<StandardSearchResult<T> | null>(null);
  const [loading, setLoading] = useState(false);
  
  const search = async (query: string): Promise<void> => {
    setLoading(true);
    try {
      const searchResult = await searchFn(query);
      setResult(searchResult);
    } finally {
      setLoading(false);
    }
  };
  
  return { result, loading, search };
};
```

## Validation

### Zod Schema

```typescript
import { z } from 'zod';

const createStandardSearchResultSchema = <T extends z.ZodType>(itemSchema: T) =>
  z.object({
    status: z.number().int().min(100).max(599),
    numResults: z.number().int().min(0),
    results: z.array(itemSchema)
  });

// Usage example
const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email()
});

const userSearchResultSchema = createStandardSearchResultSchema(userSchema);

// Validation in API handler
export const validateSearchResponse = <T>(
  data: unknown,
  schema: z.ZodSchema<StandardSearchResult<T>>
): StandardSearchResult<T> => {
  return schema.parse(data);
};
```

### Runtime Validation

```typescript
const isValidSearchResult = <T>(
  value: unknown,
  validator: (item: unknown) => item is T
): value is StandardSearchResult<T> => {
  if (!value || typeof value !== 'object') return false;
  
  const candidate = value as Record<string, unknown>;
  
  return (
    typeof candidate.status === 'number' &&
    typeof candidate.numResults === 'number' &&
    Array.isArray(candidate.results) &&
    candidate.results.every(validator)
  );
};
```

## Best Practices

### 1. Strict Typing Compliance
```typescript
// ✅ Good: Specific generic types
const searchUsers = (): Promise<StandardSearchResult<User>> => {
  // Implementation
};

// ❌ Avoid: Using any
const searchGeneric = (): Promise<StandardSearchResult<any>> => {
  // Implementation
};
```

### 2. Interface Usage
```typescript
// ✅ Good: Using interface as designed
interface StandardSearchResult<T> {
  status: number;
  numResults: number;
  results: T[];
}

// ❌ Avoid: Converting to type alias unnecessarily
type StandardSearchResult<T> = {
  status: number;
  numResults: number;
  results: T[];
};
```

### 3. Utility Type Leverage
```typescript
// ✅ Good: Using utility types for variations
type OptionalSearchResult<T> = Partial<StandardSearchResult<T>>;
type SearchResultsOnly<T> = Pick<StandardSearchResult<T>, 'results'>;
type SearchMetadata<T> = Omit<StandardSearchResult<T>, 'results'>;
```

### 4. Consistent Error Handling
```typescript
// ✅ Good: Consistent error response structure
const handleSearchError = <T>(): StandardSearchResult<T> => ({
  status: 500,
  numResults: 0,
  results: []
});

// ✅ Good: Status code consistency
const createEmptyResult = <T>(status: number): StandardSearchResult<T> => ({
  status,
  numResults: 0,
  results: []
});
```

### 5. Type Safety in Collections
```typescript
// ✅ Good: Type-safe result processing
const processSearchResults = <T, U>(
  searchResult: StandardSearchResult<T>,
  transformer: (item: T) => U
): StandardSearchResult<U> => ({
  status: searchResult.status,
  numResults: searchResult.numResults,
  results: searchResult.results.map(transformer)
});
```

This `StandardSearchResult<T>` interface serves as a foundational response type that ensures consistency across all search operations while maintaining strict type safety through generic constraints.