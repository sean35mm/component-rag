# Search Parameters Utility Pattern

## Pattern Overview

The **Search Parameters Utility Pattern** provides a standardized approach for extracting and normalizing URL search parameter values that may exist in multiple formats. This pattern is essential when working with URL query parameters that can be either single values or arrays, ensuring consistent data access regardless of the parameter's multiplicity.

### When to Use
- Processing URL search parameters in web applications
- Handling form submissions with query parameters
- Working with APIs that accept parameters in multiple formats
- Normalizing data from `URLSearchParams` or similar web APIs
- Building search and filtering functionality

## Architecture

```
Search Parameters Flow:
┌─────────────────┐    ┌──────────────────────┐    ┌─────────────────┐
│ URL Parameters  │───▶│ Utility Function     │───▶│ Normalized      │
│ (various types) │    │ getSearchParams...   │    │ String Output   │
└─────────────────┘    └──────────────────────┘    └─────────────────┘

Input Types:
├── string              → Direct value
├── string[]            → Array of values  
└── undefined           → No value provided
```

### Core Responsibilities
1. **Type Normalization**: Converts different input types to a consistent output
2. **Array Handling**: Extracts the first element from arrays automatically  
3. **Null Safety**: Provides safe fallback for undefined inputs
4. **Single Source of Truth**: Centralizes parameter extraction logic

## Implementation Details

### Core Function Structure

```typescript
export const getSearchParamsValueOrFirstElement = (
  param: string | string[] | undefined
): string | null => (Array.isArray(param) ? param : [param]).at(0) ?? null;
```

### Key Implementation Techniques

1. **Ternary Operator Pattern**: Uses conditional logic for type checking
2. **Array Normalization**: Wraps non-array values in arrays for uniform processing
3. **Safe Array Access**: Uses `.at(0)` method for safe first element extraction
4. **Nullish Coalescing**: Employs `??` operator for robust null/undefined handling

### Algorithm Breakdown

```typescript
// Step-by-step breakdown:
(param: string | string[] | undefined) => {
  // 1. Check if input is array
  const normalized = Array.isArray(param) ? param : [param];
  
  // 2. Get first element safely
  const firstElement = normalized.at(0);
  
  // 3. Handle undefined with nullish coalescing
  return firstElement ?? null;
}
```

## Usage Examples

### Basic URL Parameter Extraction

```typescript
import { getSearchParamsValueOrFirstElement } from '@/lib/utils/search-params';

// Example with Next.js searchParams
function SearchPage({ searchParams }: { searchParams: Record<string, string | string[]> }) {
  const query = getSearchParamsValueOrFirstElement(searchParams.q);
  const category = getSearchParamsValueOrFirstElement(searchParams.category);
  
  return (
    <div>
      <h1>Search Results for: {query || 'All Items'}</h1>
      <p>Category: {category || 'All Categories'}</p>
    </div>
  );
}
```

### API Route Parameter Processing

```typescript
// api/search/route.ts
import { NextRequest } from 'next/server';
import { getSearchParamsValueOrFirstElement } from '@/lib/utils/search-params';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  // Handle various parameter formats
  const query = getSearchParamsValueOrFirstElement(searchParams.get('q'));
  const limit = getSearchParamsValueOrFirstElement(searchParams.get('limit'));
  const sort = getSearchParamsValueOrFirstElement(searchParams.get('sort'));
  
  const results = await searchDatabase({
    query: query || '',
    limit: parseInt(limit || '10'),
    sort: sort || 'relevance'
  });
  
  return Response.json(results);
}
```

### Form Handling with Multiple Values

```typescript
// Handling form data that might have multiple values
function processFormData(formData: FormData) {
  const categories = formData.getAll('category'); // string[]
  const title = formData.get('title'); // string | null
  
  return {
    primaryCategory: getSearchParamsValueOrFirstElement(categories),
    title: getSearchParamsValueOrFirstElement(title),
  };
}
```

### Advanced Usage with Custom Hooks

```typescript
// Custom hook for search parameters
function useSearchParam(key: string): string | null {
  const searchParams = useSearchParams();
  const value = searchParams.get(key);
  
  return getSearchParamsValueOrFirstElement(value);
}

// Usage in component
function FilterComponent() {
  const category = useSearchParam('category');
  const priceRange = useSearchParam('price');
  
  return (
    <div>
      {category && <span>Category: {category}</span>}
      {priceRange && <span>Price: {priceRange}</span>}
    </div>
  );
}
```

## Best Practices

### 1. Consistent Parameter Handling
```typescript
// ✅ Good: Use utility for all parameter extraction
const searchTerm = getSearchParamsValueOrFirstElement(params.search);
const sortOrder = getSearchParamsValueOrFirstElement(params.sort);

// ❌ Avoid: Inconsistent handling
const searchTerm = Array.isArray(params.search) ? params.search[0] : params.search;
const sortOrder = params.sort; // Might be array or string
```

### 2. Provide Meaningful Defaults
```typescript
// ✅ Good: Clear default handling
const itemsPerPage = parseInt(
  getSearchParamsValueOrFirstElement(params.limit) || '10'
);

// ✅ Better: With validation
const getValidatedLimit = (param: string | string[] | undefined): number => {
  const value = getSearchParamsValueOrFirstElement(param);
  const parsed = parseInt(value || '10');
  return parsed > 0 && parsed <= 100 ? parsed : 10;
};
```

### 3. Create Typed Wrappers
```typescript
// ✅ Create domain-specific utilities
export const getSearchQuery = (params: Record<string, string | string[]>) =>
  getSearchParamsValueOrFirstElement(params.q)?.trim() || '';

export const getSortOrder = (params: Record<string, string | string[]>) => {
  const sort = getSearchParamsValueOrFirstElement(params.sort);
  return ['asc', 'desc'].includes(sort || '') ? sort as 'asc' | 'desc' : 'asc';
};
```

## Integration

### Next.js App Router Integration

```typescript
// app/search/page.tsx
interface SearchPageProps {
  searchParams: Record<string, string | string[]>;
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const filters = {
    query: getSearchParamsValueOrFirstElement(searchParams.q),
    category: getSearchParamsValueOrFirstElement(searchParams.category),
    minPrice: getSearchParamsValueOrFirstElement(searchParams.minPrice),
  };
  
  return <SearchResults filters={filters} />;
}
```

### React Router Integration

```typescript
// With React Router
import { useSearchParams } from 'react-router-dom';

function useTypedSearchParams() {
  const [searchParams] = useSearchParams();
  
  return {
    getParam: (key: string) => getSearchParamsValueOrFirstElement(
      searchParams.get(key)
    ),
    getAllParams: () => Object.fromEntries(
      Array.from(searchParams.entries()).map(([key, value]) => [
        key,
        getSearchParamsValueOrFirstElement(value)
      ])
    )
  };
}
```

### State Management Integration

```typescript
// Redux/Zustand integration
interface SearchState {
  query: string;
  filters: Record<string, string>;
}

const parseSearchParams = (params: Record<string, string | string[]>): SearchState => ({
  query: getSearchParamsValueOrFirstElement(params.q) || '',
  filters: Object.entries(params)
    .filter(([key]) => key !== 'q')
    .reduce((acc, [key, value]) => ({
      ...acc,
      [key]: getSearchParamsValueOrFirstElement(value) || ''
    }), {})
});
```

## Type Safety

### Enhanced Type Definitions

```typescript
// More specific typing options
type SearchParamValue = string | string[] | undefined;

export const getSearchParamsValueOrFirstElement = <T extends SearchParamValue>(
  param: T
): string | null => (Array.isArray(param) ? param : [param]).at(0) ?? null;

// Typed parameter extraction
interface TypedSearchParams {
  q?: string | string[];
  category?: string | string[];
  page?: string | string[];
}

const extractTypedParams = (params: TypedSearchParams) => ({
  query: getSearchParamsValueOrFirstElement(params.q),
  category: getSearchParamsValueOrFirstElement(params.category),
  page: getSearchParamsValueOrFirstElement(params.page),
});
```

### Generic Type Utilities

```typescript
// Generic parameter processor
type ParamProcessor<T> = {
  [K in keyof T]: string | null;
};

function processSearchParams<T extends Record<string, string | string[] | undefined>>(
  params: T
): ParamProcessor<T> {
  return Object.entries(params).reduce((acc, [key, value]) => ({
    ...acc,
    [key]: getSearchParamsValueOrFirstElement(value)
  }), {} as ParamProcessor<T>);
}
```

## Performance

### Optimization Strategies

```typescript
// ✅ Memoized parameter extraction
const useMemoizedSearchParams = (searchParams: Record<string, string | string[]>) => {
  return useMemo(() => ({
    query: getSearchParamsValueOrFirstElement(searchParams.q),
    category: getSearchParamsValueOrFirstElement(searchParams.category),
    sort: getSearchParamsValueOrFirstElement(searchParams.sort),
  }), [searchParams.q, searchParams.category, searchParams.sort]);
};

// ✅ Lazy parameter processing
const createParamGetter = (searchParams: Record<string, string | string[]>) => {
  const cache = new Map<string, string | null>();
  
  return (key: string): string | null => {
    if (!cache.has(key)) {
      cache.set(key, getSearchParamsValueOrFirstElement(searchParams[key]));
    }
    return cache.get(key)!;
  };
};
```

### Bundle Size Considerations

The utility is highly optimized:
- **Minimal footprint**: Single line function
- **Tree-shakeable**: Pure function with no dependencies
- **Runtime efficient**: O(1) complexity

## Testing

### Unit Tests

```typescript
// search-params.test.ts
import { getSearchParamsValueOrFirstElement } from '@/lib/utils/search-params';

describe('getSearchParamsValueOrFirstElement', () => {
  it('should return string value as-is', () => {
    expect(getSearchParamsValueOrFirstElement('test')).toBe('test');
  });

  it('should return first element of array', () => {
    expect(getSearchParamsValueOrFirstElement(['first', 'second'])).toBe('first');
  });

  it('should return null for undefined', () => {
    expect(getSearchParamsValueOrFirstElement(undefined)).toBe(null);
  });

  it('should return null for empty array', () => {
    expect(getSearchParamsValueOrFirstElement([])).toBe(null);
  });

  it('should handle array with undefined elements', () => {
    expect(getSearchParamsValueOrFirstElement([undefined as any, 'second'])).toBe(undefined);
  });
});
```

### Integration Tests

```typescript
// Integration test with Next.js
import { render, screen } from '@testing-library/react';
import SearchPage from '@/app/search/page';

describe('SearchPage Integration', () => {
  it('should handle string search params', () => {
    render(<SearchPage searchParams={{ q: 'test query' }} />);
    expect(screen.getByText(/test query/)).toBeInTheDocument();
  });

  it('should handle array search params', () => {
    render(<SearchPage searchParams={{ q: ['first', 'second'] }} />);
    expect(screen.getByText(/first/)).toBeInTheDocument();
  });

  it('should handle missing search params', () => {
    render(<SearchPage searchParams={{}} />);
    expect(screen.getByText(/All Items/)).toBeInTheDocument();
  });
});
```

## Common Pitfalls

### 1. Assuming Non-Null Returns
```typescript
// ❌ Dangerous: Assuming value exists
const query = getSearchParamsValueOrFirstElement(params.q);
const length = query.length; // Runtime error if query is null

// ✅ Safe: Always check for null
const query = getSearchParamsValueOrFirstElement(params.q);
const length = query?.length || 0;
```

### 2. Not Handling Empty Strings
```typescript
// ❌ Incomplete: Empty strings might be valid
const hasQuery = !!getSearchParamsValueOrFirstElement(params.q);

// ✅ Complete: Consider empty strings appropriately
const query = getSearchParamsValueOrFirstElement(params.q);
const hasQuery = query !== null && query.trim() !== '';
```

### 3. Ignoring Type Validation
```typescript
// ❌ Risky: No validation
const page = parseInt(getSearchParamsValueOrFirstElement(params.page) || '1');

// ✅ Safe: Validate and sanitize
const getValidatedPage = (param: string | string[] | undefined): number => {
  const value = getSearchParamsValueOrFirstElement(param);
  const parsed = parseInt(value || '1');
  return isNaN(parsed) || parsed < 1 ? 1 : parsed;
};
```

### 4. Memory Leaks in Loops
```typescript
// ❌ Inefficient: Creating functions in loops
const results = paramKeys.map(key => 
  getSearchParamsValueOrFirstElement(searchParams[key])
);

// ✅ Efficient: Process in batch
const processedParams = Object.fromEntries(
  paramKeys.map(key => [key, getSearchParamsValueOrFirstElement(searchParams[key])])
);
```

### 5. Not Considering URL Encoding
```typescript
// ❌ Incomplete: Ignoring URL encoding
const query = getSearchParamsValueOrFirstElement(params.q);

// ✅ Complete: Handle URL encoding
const query = getSearchParamsValueOrFirstElement(params.q);
const decodedQuery = query ? decodeURIComponent(query) : null;
```