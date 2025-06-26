# Companies Query Hooks

## Purpose

The Companies query hooks provide a comprehensive data management layer for company-related operations using TanStack Query. These hooks integrate with both public and authenticated company services, offering standardized data fetching patterns with proper caching, error handling, and access control.

## Hooks Overview

| Hook Name | Type | Purpose | Key Features |
|-----------|------|---------|--------------|
| `useCompanies` | Query | Fetch paginated company lists with filtering | Search parameters, selector support, access control |
| `useCompanyByIdSuspense` | Suspense Query | Fetch single company by ID with suspense | Blocking data fetching, memoized query function |

## Exported Utilities

| Export | Type | Purpose |
|--------|------|---------|
| `CompanyServiceBuilder` | Service Builder | Creates appropriate service instance based on auth state |
| `getByIdQueryFn` | Query Function | Reusable query function for fetching company by ID |

## Query Hooks

### `useCompanies`

Fetches a paginated list of companies with support for filtering and search parameters.

```typescript
function useCompanies<T = StandardSearchResult<Company>>(
  params?: GetCompaniesListParams,
  options?: UseQueryOptions<StandardSearchResult<Company>, T>
): UseQueryResult<T, Error>
```

**Features:**
- Automatic authentication handling
- Configurable search and filter parameters
- Selector function support for data transformation
- Conditional enabling based on auth state

**Parameters:**
- `params` - Optional search and filter parameters
- `options` - TanStack Query options with selector support

### `useCompanyByIdSuspense`

Fetches a single company by ID using Suspense patterns for blocking data loading.

```typescript
function useCompanyByIdSuspense<T = Company | null>(
  id: string,
  isAuthorizedAndVerified: boolean,
  isPublic: boolean,
  token?: AccessToken,
  options?: UseSuspenseQueryOptions<Company | null, T>
): UseSuspenseQueryResult<T, Error>
```

**Features:**
- Suspense-based data fetching
- Memoized query function for performance
- Returns `null` if company not found
- Manual auth state management

## Query Keys

Query keys are managed using `@lukemorales/query-key-factory` through the centralized `queryKeys.companies` factory:

```typescript
// Company list queries
queryKeys.companies.getList(token, params)

// Company by ID queries  
queryKeys.companies.getById(token, id)
```

**Key Structure:**
- Includes authentication token for cache isolation
- Parameters are included for granular caching
- Consistent naming convention across all company queries

## Usage Examples

### Basic Company List Fetching

```typescript
import { useCompanies } from '@/lib/query-hooks/companies';

function CompanyList() {
  const { 
    data: companies, 
    isLoading, 
    error 
  } = useCompanies();

  if (isLoading) return <div>Loading companies...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {companies?.results.map(company => (
        <div key={company.id}>{company.name}</div>
      ))}
    </div>
  );
}
```

### Filtered Company Search

```typescript
import { useCompanies } from '@/lib/query-hooks/companies';

function CompanySearch() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: companies } = useCompanies({
    search: searchTerm,
    size: 20,
    sort: 'name'
  }, {
    enabled: searchTerm.length > 2 // Only search with 3+ characters
  });

  return (
    <div>
      <input 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search companies..."
      />
      {/* Render results */}
    </div>
  );
}
```

### Suspense Company Details

```typescript
import { useCompanyByIdSuspense } from '@/lib/query-hooks/companies';
import { useAccessToken } from '@/lib/contexts';

function CompanyDetails({ companyId }: { companyId: string }) {
  const { isAuthorizedAndVerified, isPublic, token } = useAccessToken();
  
  const company = useCompanyByIdSuspense(
    companyId,
    isAuthorizedAndVerified,
    isPublic,
    token
  );

  if (!company) {
    return <div>Company not found</div>;
  }

  return (
    <div>
      <h1>{company.name}</h1>
      <p>{company.description}</p>
    </div>
  );
}

// Usage with Suspense boundary
function App() {
  return (
    <Suspense fallback={<div>Loading company...</div>}>
      <CompanyDetails companyId="123" />
    </Suspense>
  );
}
```

## Selector Support

Both hooks support selector functions for data transformation and performance optimization:

### Transform Company Data

```typescript
// Extract only company names
const { data: companyNames } = useCompanies({}, {
  select: (data) => data.results.map(company => company.name)
});

// Transform single company
const { data: companyInfo } = useCompanyByIdSuspense(
  id, isAuth, isPublic, token,
  {
    select: (company) => company ? {
      displayName: company.name,
      isActive: company.status === 'active'
    } : null
  }
);
```

### Performance Optimization

```typescript
// Only re-render when specific fields change
const { data: companyCount } = useCompanies({}, {
  select: useCallback((data) => data.total, [])
});
```

## Caching Strategy

### Cache Keys
- **List Queries**: Cached by authentication token and search parameters
- **Individual Companies**: Cached by token and company ID
- **Isolation**: Different cache entries for authenticated vs public access

### Cache Behavior
```typescript
// Cache TTL and background refetching
const { data } = useCompanies({}, {
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
  refetchOnWindowFocus: false
});
```

### Manual Cache Management
```typescript
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';

function useCompanyActions() {
  const queryClient = useQueryClient();
  
  const invalidateCompanies = () => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.companies._def
    });
  };
  
  return { invalidateCompanies };
}
```

## Error Handling

### Automatic Error Propagation
```typescript
function CompanyListWithErrorBoundary() {
  const { data, error, isError } = useCompanies();
  
  // Errors are automatically thrown by TanStack Query
  // and can be caught by Error Boundaries
  
  if (isError) {
    console.error('Company fetch failed:', error);
    return <ErrorMessage error={error} />;
  }
  
  return <CompanyList data={data} />;
}
```

### Custom Error Handling
```typescript
const { data } = useCompanies({}, {
  onError: (error) => {
    if (error instanceof HttpException) {
      toast.error(`Failed to load companies: ${error.message}`);
    }
  },
  retry: (failureCount, error) => {
    // Don't retry on authentication errors
    if (error instanceof HttpException && error.status === 401) {
      return false;
    }
    return failureCount < 3;
  }
});
```

## Related Services

### Service Integration
```typescript
// Services used by these hooks
import { 
  CompanyService,           // Authenticated company operations
  PublicCompanyServiceBuilder // Public company access
} from '@/lib/services/company-service';
```

### Service Builder Pattern
```typescript
// The CompanyServiceBuilder automatically selects the appropriate service
const CompanyServiceBuilder = ServiceBuilder(
  PublicCompanyServiceBuilder,  // Public access
  CompanyService               // Authenticated access
);

// Usage in query functions
const service = CompanyServiceBuilder(isAuthorizedAndVerified, isPublic, token);
const companies = await service.getList(params, signal);
```

## Best Practices

### 1. Authentication Handling
```typescript
// ✅ Good: Let useCompanies handle auth automatically
const { data } = useCompanies();

// ❌ Avoid: Manual auth checking (unless using Suspense hook)
const { isAuthorized } = useAccessToken();
const { data } = useCompanies({}, { enabled: isAuthorized });
```

### 2. Parameter Management
```typescript
// ✅ Good: Stable parameter objects
const searchParams = useMemo(() => ({
  search: debouncedSearch,
  category: selectedCategory
}), [debouncedSearch, selectedCategory]);

const { data } = useCompanies(searchParams);
```

### 3. Conditional Queries
```typescript
// ✅ Good: Use enabled option for conditional fetching
const { data } = useCompanies(
  { search: query },
  { enabled: query.length >= 3 }
);
```

### 4. Suspense vs Regular Queries
```typescript
// ✅ Use Suspense for critical blocking data
function CompanyPage() {
  return (
    <Suspense fallback={<CompanyDetailsSkeleton />}>
      <CompanyDetails />
    </Suspense>
  );
}

// ✅ Use regular queries for optional/background data
function CompanyList() {
  const { data, isLoading } = useCompanies();
  return isLoading ? <Skeleton /> : <Results data={data} />;
}
```

### 5. Error Boundaries
```typescript
// ✅ Wrap Suspense queries in Error Boundaries
function App() {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Suspense fallback={<Loading />}>
        <CompanyDetails />
      </Suspense>
    </ErrorBoundary>
  );
}
```