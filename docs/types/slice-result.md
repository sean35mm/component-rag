# SliceResult<T> Type Documentation

## Purpose

The `SliceResult<T>` interface represents a paginated data structure that encapsulates a subset (slice) of a larger dataset along with navigation metadata. This type is fundamental to implementing cursor-based or offset-based pagination patterns throughout the application, providing a consistent interface for handling paginated responses from APIs or data services.

## Type Definition

```typescript
export interface SliceResult<T> {
  hasNext: boolean;
  hasPrev: boolean;
  data: T[];
}
```

### Generic Type Parameter
- `T` - The type of items contained in the data array, providing type safety for the paginated content

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `hasNext` | `boolean` | ✅ | Indicates whether there are more items available after the current slice |
| `hasPrev` | `boolean` | ✅ | Indicates whether there are items available before the current slice |
| `data` | `T[]` | ✅ | Array containing the actual items in the current slice/page |

## Usage Examples

### Basic API Response Handling

```typescript
import { SliceResult } from '@/lib/types/slice-result';

// Domain object
interface User {
  id: string;
  name: string;
  email: string;
}

// API service function
async function fetchUsers(page: number, limit: number): Promise<SliceResult<User>> {
  const response = await fetch(`/api/users?page=${page}&limit=${limit}`);
  return response.json();
}

// Component usage
function UserList() {
  const [users, setUsers] = useState<SliceResult<User> | null>(null);
  
  useEffect(() => {
    fetchUsers(1, 10).then(setUsers);
  }, []);

  if (!users) return <div>Loading...</div>;

  return (
    <div>
      <ul>
        {users.data.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      
      <div className="pagination">
        <button disabled={!users.hasPrev}>Previous</button>
        <button disabled={!users.hasNext}>Next</button>
      </div>
    </div>
  );
}
```

### Generic Hook Implementation

```typescript
interface UsePaginationOptions {
  initialPage?: number;
  pageSize?: number;
}

function usePagination<T>(
  fetchFn: (page: number, size: number) => Promise<SliceResult<T>>,
  options: UsePaginationOptions = {}
) {
  const [currentPage, setCurrentPage] = useState(options.initialPage ?? 1);
  const [result, setResult] = useState<SliceResult<T> | null>(null);
  const [loading, setLoading] = useState(false);
  
  const pageSize = options.pageSize ?? 20;

  const loadPage = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const data = await fetchFn(page, pageSize);
      setResult(data);
      setCurrentPage(page);
    } finally {
      setLoading(false);
    }
  }, [fetchFn, pageSize]);

  const nextPage = useCallback(() => {
    if (result?.hasNext) {
      loadPage(currentPage + 1);
    }
  }, [result?.hasNext, loadPage, currentPage]);

  const prevPage = useCallback(() => {
    if (result?.hasPrev) {
      loadPage(currentPage - 1);
    }
  }, [result?.hasPrev, loadPage, currentPage]);

  return {
    result,
    loading,
    currentPage,
    nextPage,
    prevPage,
    canGoNext: result?.hasNext ?? false,
    canGoPrev: result?.hasPrev ?? false,
    reload: () => loadPage(currentPage)
  };
}
```

### Search Results Implementation

```typescript
interface SearchFilters {
  query: string;
  category?: string;
  sortBy?: 'relevance' | 'date' | 'title';
}

interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  relevanceScore: number;
}

async function searchContent(
  filters: SearchFilters,
  page: number = 1
): Promise<SliceResult<SearchResult>> {
  const params = new URLSearchParams({
    q: filters.query,
    page: page.toString(),
    ...(filters.category && { category: filters.category }),
    ...(filters.sortBy && { sort: filters.sortBy })
  });

  const response = await fetch(`/api/search?${params}`);
  return response.json();
}

function SearchResults({ filters }: { filters: SearchFilters }) {
  const pagination = usePagination(
    (page) => searchContent(filters, page),
    { pageSize: 15 }
  );

  return (
    <div>
      {pagination.result && (
        <>
          <div className="results">
            {pagination.result.data.map(item => (
              <SearchResultItem key={item.id} result={item} />
            ))}
          </div>
          
          <PaginationControls
            onNext={pagination.nextPage}
            onPrev={pagination.prevPage}
            canGoNext={pagination.canGoNext}
            canGoPrev={pagination.canGoPrev}
            loading={pagination.loading}
          />
        </>
      )}
    </div>
  );
}
```

## Type Architecture Pattern

Following our type architecture guidelines, `SliceResult<T>` serves as a **response type** that wraps domain objects:

```typescript
// 1. Domain Objects (Core entities)
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface Order {
  id: string;
  userId: string;
  products: Product[];
  total: number;
  createdAt: Date;
}

// 2. Response Types (API responses using SliceResult)
type ProductsResponse = SliceResult<Product>;
type OrdersResponse = SliceResult<Order>;

// 3. Request Types (API parameters)
interface ProductListRequest {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  page: number;
  limit: number;
}

interface OrderListRequest {
  userId?: string;
  status?: OrderStatus;
  dateFrom?: Date;
  dateTo?: Date;
  page: number;
  limit: number;
}
```

## Related Types

### Pagination Utilities

```typescript
// Cursor-based pagination variant
interface CursorSliceResult<T> extends Omit<SliceResult<T>, 'data'> {
  data: T[];
  nextCursor?: string;
  prevCursor?: string;
}

// Extended result with metadata
interface ExtendedSliceResult<T> extends SliceResult<T> {
  totalCount?: number;
  pageSize: number;
  currentPage: number;
}

// Infinite scroll result
interface InfiniteSliceResult<T> {
  items: T[];
  hasMore: boolean;
  nextCursor?: string;
}
```

### Utility Types

```typescript
// Extract the item type from a SliceResult
type SliceItemType<T> = T extends SliceResult<infer U> ? U : never;

// Create a SliceResult from any array type
type ToSliceResult<T extends readonly unknown[]> = SliceResult<T[number]>;

// Partial slice for loading states
type PartialSliceResult<T> = Partial<SliceResult<T>>;
```

## Integration Points

### API Layer
- REST endpoint responses for paginated data
- GraphQL query results with pagination
- Database query result wrapping

### State Management
- Redux slices for paginated data
- React Query/SWR cache structures
- Zustand store pagination state

### Components
- Data tables with pagination
- Infinite scroll lists
- Search result displays
- Admin dashboards

### Services
- Data access layer abstractions
- Cache management systems
- Background data synchronization

## Validation

### Zod Schema

```typescript
import { z } from 'zod';

const SliceResultSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
    data: z.array(itemSchema)
  });

// Usage examples
const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email()
});

const UserSliceResultSchema = SliceResultSchema(UserSchema);

// Runtime validation
function validateUserSliceResult(data: unknown): SliceResult<User> {
  return UserSliceResultSchema.parse(data);
}
```

### Type Guards

```typescript
function isSliceResult<T>(value: unknown): value is SliceResult<T> {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as any).hasNext === 'boolean' &&
    typeof (value as any).hasPrev === 'boolean' &&
    Array.isArray((value as any).data)
  );
}

function isEmptySlice<T>(slice: SliceResult<T>): boolean {
  return slice.data.length === 0;
}

function hasOnlyOnePage<T>(slice: SliceResult<T>): boolean {
  return !slice.hasNext && !slice.hasPrev;
}
```

## Best Practices

### 1. **Strict Typing Adherence**
```typescript
// ✅ Good: Strict typing with proper generics
function processSlice<T extends { id: string }>(slice: SliceResult<T>): void {
  slice.data.forEach(item => console.log(item.id));
}

// ❌ Avoid: Using any
function processSlice(slice: SliceResult<any>): void {
  // Type safety lost
}
```

### 2. **Interface Consistency**
```typescript
// ✅ Good: Consistent interface usage
interface ApiResponse<T> {
  success: boolean;
  result: SliceResult<T>;
  error?: string;
}

// ✅ Good: Extending for specific use cases
interface SearchSliceResult<T> extends SliceResult<T> {
  totalMatches: number;
  searchTime: number;
}
```

### 3. **Utility Type Leverage**
```typescript
// ✅ Good: Using utility types for variations
type OptionalSliceResult<T> = Partial<SliceResult<T>>;
type SliceDataOnly<T> = Pick<SliceResult<T>, 'data'>;
type SliceNavigation<T> = Omit<SliceResult<T>, 'data'>;
```

### 4. **Error Handling**
```typescript
// ✅ Good: Proper error handling with type safety
async function safeSliceFetch<T>(
  fetcher: () => Promise<SliceResult<T>>
): Promise<SliceResult<T> | null> {
  try {
    const result = await fetcher();
    if (!isSliceResult<T>(result)) {
      throw new Error('Invalid slice result format');
    }
    return result;
  } catch (error) {
    console.error('Failed to fetch slice:', error);
    return null;
  }
}
```

### 5. **Performance Considerations**
```typescript
// ✅ Good: Memoized slice processing
const processedSlice = useMemo(() => {
  if (!slice) return null;
  
  return {
    ...slice,
    data: slice.data.map(item => enhanceItem(item))
  };
}, [slice]);
```