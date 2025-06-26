# PaginationSort Type Documentation

## Purpose

The `PaginationSort` types define a comprehensive pagination and sorting system for data tables and lists. This type system provides a standardized approach to handling paginated data with sortable columns, ensuring type safety when working with dynamic sorting keys based on the underlying data structure.

## Type Definition

```tsx
export type PaginationSortOrder = 'asc' | 'desc';

export interface PaginationSort<T> {
  page?: number;
  size?: number;
  sortBy: keyof T;
  sortOrder: PaginationSortOrder;
}
```

### Type Structure Breakdown

- **`PaginationSortOrder`**: String literal union type for sort direction
- **`PaginationSort<T>`**: Generic interface for pagination with sorting capabilities
  - Uses generic `T` to ensure `sortBy` is constrained to actual properties of the data type
  - Combines optional pagination parameters with required sorting configuration

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `page` | `number` | Optional | Current page number (0-based or 1-based depending on implementation) |
| `size` | `number` | Optional | Number of items per page |
| `sortBy` | `keyof T` | Required | Property key of type T to sort by - ensures type safety |
| `sortOrder` | `PaginationSortOrder` | Required | Sort direction: ascending or descending |

## Usage Examples

### Basic Usage with User Data

```tsx
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  isActive: boolean;
}

// Type-safe pagination sort for users
const userSort: PaginationSort<User> = {
  page: 1,
  size: 20,
  sortBy: 'name', // ✅ Type-safe - 'name' exists on User
  sortOrder: 'asc'
};

// ❌ TypeScript error - 'username' doesn't exist on User
const invalidSort: PaginationSort<User> = {
  sortBy: 'username', // Error: Argument of type '"username"' is not assignable
  sortOrder: 'desc'
};
```

### Component Integration

```tsx
interface UserTableProps {
  users: User[];
  pagination: PaginationSort<User>;
  onPaginationChange: (pagination: PaginationSort<User>) => void;
}

const UserTable: React.FC<UserTableProps> = ({ 
  users, 
  pagination, 
  onPaginationChange 
}) => {
  const handleSort = (column: keyof User) => {
    const newOrder = pagination.sortBy === column && pagination.sortOrder === 'asc' 
      ? 'desc' 
      : 'asc';
    
    onPaginationChange({
      ...pagination,
      sortBy: column,
      sortOrder: newOrder
    });
  };

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort('name')}>
            Name {pagination.sortBy === 'name' && pagination.sortOrder}
          </th>
          <th onClick={() => handleSort('email')}>
            Email {pagination.sortBy === 'email' && pagination.sortOrder}
          </th>
        </tr>
      </thead>
      {/* Table body implementation */}
    </table>
  );
};
```

### Service Layer Integration

```tsx
class UserService {
  async getUsers(pagination: PaginationSort<User>): Promise<PaginatedResponse<User>> {
    const params = new URLSearchParams({
      page: pagination.page?.toString() || '1',
      size: pagination.size?.toString() || '10',
      sortBy: pagination.sortBy.toString(),
      sortOrder: pagination.sortOrder
    });

    const response = await fetch(`/api/users?${params}`);
    return response.json();
  }
}
```

### Custom Hook Implementation

```tsx
function usePaginatedData<T>(
  fetchFn: (pagination: PaginationSort<T>) => Promise<PaginatedResponse<T>>,
  initialSort: PaginationSort<T>
) {
  const [pagination, setPagination] = useState<PaginationSort<T>>(initialSort);
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchFn(pagination);
      setData(result.data);
    } finally {
      setLoading(false);
    }
  }, [fetchFn, pagination]);

  return { data, loading, pagination, setPagination, loadData };
}
```

## Type Architecture Pattern

This type follows our architecture pattern of building from domain objects:

```tsx
// 1. Domain Object (base type)
interface User {
  id: string;
  name: string;
  email: string;
}

// 2. Response Types (server responses)
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  size: number;
}

// 3. Request Types (client requests)
interface GetUsersRequest extends PaginationSort<User> {
  filters?: Partial<User>;
}

// 4. Component Props (UI layer)
interface UserListProps {
  initialPagination?: Partial<PaginationSort<User>>;
}
```

## Related Types

### Utility Type Extensions

```tsx
// Optional pagination for initial states
type PartialPaginationSort<T> = Partial<Pick<PaginationSort<T>, 'page' | 'size'>> & 
  Pick<PaginationSort<T>, 'sortBy' | 'sortOrder'>;

// Pagination without sorting for simple lists
interface SimplePagination {
  page?: number;
  size?: number;
}

// Extended pagination with filtering
interface FilterablePaginationSort<T> extends PaginationSort<T> {
  filters?: Partial<T>;
  search?: string;
}
```

### Response Type Integration

```tsx
interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    size: number;
    totalPages: number;
  };
  sort: {
    sortBy: keyof T;
    sortOrder: PaginationSortOrder;
  };
}
```

## Integration Points

### Services
- **API Services**: Query parameter construction for paginated endpoints
- **Data Services**: Local data sorting and pagination logic
- **Cache Services**: Cache key generation based on pagination state

### Components
- **Data Tables**: Column sorting and page navigation
- **List Components**: Infinite scroll with sorting capabilities
- **Filter Components**: Combined filtering and sorting interfaces

### Hooks
- **`usePagination`**: State management for pagination controls
- **`useSortableData`**: Client-side sorting with pagination
- **`useInfiniteQuery`**: Integration with React Query for paginated data

## Validation

### Zod Schema Integration

```tsx
import { z } from 'zod';

const PaginationSortOrderSchema = z.enum(['asc', 'desc']);

const createPaginationSortSchema = <T extends Record<string, any>>(
  entityKeys: readonly (keyof T)[]
) => z.object({
  page: z.number().int().positive().optional(),
  size: z.number().int().positive().max(100).optional(),
  sortBy: z.enum(entityKeys as [keyof T, ...Array<keyof T>]),
  sortOrder: PaginationSortOrderSchema
});

// Usage with User type
const UserKeys = ['id', 'name', 'email', 'createdAt'] as const;
const UserPaginationSortSchema = createPaginationSortSchema<User>(UserKeys);

// Validation in API routes
function validateUserPagination(input: unknown): PaginationSort<User> {
  return UserPaginationSortSchema.parse(input);
}
```

### Runtime Validation Helper

```tsx
function isValidSortKey<T>(key: string, validKeys: (keyof T)[]): key is keyof T {
  return validKeys.includes(key as keyof T);
}

function createSafePagination<T>(
  input: Partial<PaginationSort<T>>,
  validKeys: (keyof T)[],
  defaultSort: keyof T
): PaginationSort<T> {
  return {
    page: input.page && input.page > 0 ? input.page : 1,
    size: input.size && input.size > 0 && input.size <= 100 ? input.size : 10,
    sortBy: input.sortBy && isValidSortKey(input.sortBy, validKeys) 
      ? input.sortBy 
      : defaultSort,
    sortOrder: input.sortOrder === 'desc' ? 'desc' : 'asc'
  };
}
```

## Best Practices

### 1. **Generic Constraint Usage**
```tsx
// ✅ Good: Use the generic constraint for type safety
function createPagination<T>(sortBy: keyof T): PaginationSort<T> {
  return { sortBy, sortOrder: 'asc' };
}

// ❌ Avoid: Losing type safety
function createPagination(sortBy: string): PaginationSort<any> {
  return { sortBy, sortOrder: 'asc' };
}
```

### 2. **Default Values Pattern**
```tsx
const DEFAULT_PAGINATION_SIZE = 10;
const DEFAULT_SORT_ORDER: PaginationSortOrder = 'asc';

function withDefaults<T>(
  pagination: Partial<PaginationSort<T>>,
  defaultSortBy: keyof T
): PaginationSort<T> {
  return {
    page: 1,
    size: DEFAULT_PAGINATION_SIZE,
    sortOrder: DEFAULT_SORT_ORDER,
    ...pagination,
    sortBy: pagination.sortBy ?? defaultSortBy
  };
}
```

### 3. **Immutable Updates**
```tsx
// ✅ Good: Immutable pagination updates
const updatePaginationSort = <T>(
  current: PaginationSort<T>,
  updates: Partial<PaginationSort<T>>
): PaginationSort<T> => ({
  ...current,
  ...updates
});

// Reset to first page when sorting changes
const updateSort = <T>(
  current: PaginationSort<T>,
  sortBy: keyof T,
  sortOrder: PaginationSortOrder
): PaginationSort<T> => ({
  ...current,
  page: 1, // Reset to first page
  sortBy,
  sortOrder
});
```

### 4. **Type Architecture Adherence**
- Uses `interface` for object shapes following guidelines
- Leverages string literal unions instead of enums for single-use values
- Maintains strict typing with generic constraints
- Builds composable types that extend from domain objects