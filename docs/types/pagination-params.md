# PaginationParams Type Documentation

## Purpose

The `PaginationParams` interface defines the standard structure for pagination query parameters across the application. It provides a consistent contract for handling page-based data retrieval, ensuring uniform pagination behavior in API requests, data fetching utilities, and UI components.

This type serves as a foundational building block for pagination-aware services and components, promoting consistency in how paginated data is requested and managed throughout the application.

## Type Definition

```typescript
export interface PaginationParams {
  page?: number;
  size?: number;
}
```

### Architecture Classification
- **Category**: Request Parameter Type
- **Pattern**: Domain Parameter Interface
- **Usage**: API requests, data fetching, pagination controls

## Properties

| Property | Type | Required | Description | Default Behavior |
|----------|------|----------|-------------|------------------|
| `page` | `number` | Optional | The page number to retrieve (typically 1-based) | Usually defaults to 1 in implementation |
| `size` | `number` | Optional | The number of items per page | Usually defaults to 10-25 in implementation |

## Usage Examples

### Basic API Request
```typescript
import { PaginationParams } from '@/lib/types/pagination-params';

// Simple pagination request
const fetchUsers = async (params: PaginationParams = {}) => {
  const { page = 1, size = 20 } = params;
  
  const response = await fetch(`/api/users?page=${page}&size=${size}`);
  return response.json();
};

// Usage
const users = await fetchUsers({ page: 2, size: 50 });
```

### React Hook Implementation
```typescript
import { useState, useEffect } from 'react';
import { PaginationParams } from '@/lib/types/pagination-params';

interface UsePaginationResult<T> {
  data: T[];
  loading: boolean;
  pagination: Required<PaginationParams>;
  updatePagination: (params: Partial<PaginationParams>) => void;
}

function usePagination<T>(
  fetchFn: (params: PaginationParams) => Promise<T[]>,
  initialParams: PaginationParams = {}
): UsePaginationResult<T> {
  const [pagination, setPagination] = useState<Required<PaginationParams>>({
    page: 1,
    size: 20,
    ...initialParams
  });
  
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  const updatePagination = (params: Partial<PaginationParams>) => {
    setPagination(prev => ({ ...prev, ...params }));
  };

  useEffect(() => {
    setLoading(true);
    fetchFn(pagination)
      .then(setData)
      .finally(() => setLoading(false));
  }, [pagination, fetchFn]);

  return { data, loading, pagination, updatePagination };
}
```

### Service Layer Integration
```typescript
import { PaginationParams } from '@/lib/types/pagination-params';

class DataService {
  async getPaginatedResults<T>(
    endpoint: string,
    params: PaginationParams = {}
  ): Promise<PaginatedResponse<T>> {
    const searchParams = new URLSearchParams();
    
    if (params.page !== undefined) {
      searchParams.set('page', params.page.toString());
    }
    if (params.size !== undefined) {
      searchParams.set('size', params.size.toString());
    }

    const response = await fetch(`${endpoint}?${searchParams}`);
    return response.json();
  }
}
```

## Type Architecture Pattern

### Domain Parameter → Request Types → Response Types

```typescript
// 1. Domain Parameter (this type)
interface PaginationParams {
  page?: number;
  size?: number;
}

// 2. Extended Request Types
interface SearchParams extends PaginationParams {
  query?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface FilteredPaginationParams extends PaginationParams {
  filters?: Record<string, unknown>;
}

// 3. Response Types
interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    size: number;
    total: number;
    totalPages: number;
  };
}

interface PaginationMeta {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
```

## Related Types

### Extended Parameter Types
```typescript
// Search with pagination
interface SearchPaginationParams extends PaginationParams {
  query: string;
  filters?: string[];
}

// Cursor-based pagination (alternative approach)
interface CursorPaginationParams {
  cursor?: string;
  limit?: number;
}

// Complete pagination state
interface PaginationState extends Required<PaginationParams> {
  total: number;
  totalPages: number;
}
```

### Utility Type Compositions
```typescript
// Required pagination for internal use
type RequiredPaginationParams = Required<PaginationParams>;

// Pick specific pagination fields
type PageOnly = Pick<PaginationParams, 'page'>;
type SizeOnly = Pick<PaginationParams, 'size'>;

// Merge with other parameter types
type ApiRequestParams = PaginationParams & {
  include?: string[];
  fields?: string[];
};
```

## Integration Points

### API Services
- **REST API clients**: Query parameter construction
- **GraphQL resolvers**: Variable mapping for paginated queries
- **Data fetching hooks**: Parameter management

### UI Components
- **Pagination controls**: Page navigation, size selection
- **Data tables**: Integration with sorting and filtering
- **Infinite scroll**: Incremental page loading

### State Management
- **URL synchronization**: Router query parameter binding
- **Cache keys**: Pagination-aware cache invalidation
- **Form state**: Search and filter form integration

## Validation

### Zod Schema
```typescript
import { z } from 'zod';

export const PaginationParamsSchema = z.object({
  page: z.number().int().positive().optional(),
  size: z.number().int().positive().max(100).optional()
}).strict();

// Usage with validation
const validatePaginationParams = (params: unknown): PaginationParams => {
  return PaginationParamsSchema.parse(params);
};

// Type-safe validation result
type ValidatedPaginationParams = z.infer<typeof PaginationParamsSchema>;
```

### Runtime Validation Example
```typescript
const sanitizePaginationParams = (params: PaginationParams): Required<PaginationParams> => {
  const page = Math.max(1, Math.floor(params.page || 1));
  const size = Math.min(100, Math.max(1, Math.floor(params.size || 20)));
  
  return { page, size };
};
```

## Best Practices

### ✅ Adherence to Guidelines

1. **Strict Typing**: Uses specific `number` types instead of `any`
2. **Interface Usage**: Properly uses `interface` for object shape definition
3. **Optional Properties**: Correctly marks properties as optional with `?`
4. **Utility Type Friendly**: Easily composable with `Required`, `Partial`, etc.

### 🔧 Implementation Guidelines

```typescript
// ✅ Good: Default values at usage site
const fetchData = (params: PaginationParams = {}) => {
  const { page = 1, size = 20 } = params;
  // Implementation
};

// ❌ Avoid: Default values in type definition
interface PaginationParams {
  page: number; // This forces the property to be required
  size: number;
}

// ✅ Good: Extending for specific use cases
interface ProductSearchParams extends PaginationParams {
  category?: string;
  priceRange?: [number, number];
}

// ✅ Good: Type composition
type PaginatedApiRequest<T = Record<string, unknown>> = PaginationParams & T;
```

### 🎯 Performance Considerations

- Keep pagination parameters in URL for bookmarkability
- Implement reasonable maximum page size limits
- Consider cursor-based pagination for large datasets
- Use memoization for expensive pagination calculations

This type serves as a cornerstone for pagination functionality across the application, ensuring consistent behavior and type safety in all pagination-related operations.