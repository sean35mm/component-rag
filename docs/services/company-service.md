# Company Service

## Purpose

The Company Service provides access to company data and search functionality through both private and public API endpoints. This service manages company-related operations including searching, filtering, and retrieving company information with support for various query parameters such as company symbols, domains, employee counts, and IPO dates.

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getList` | `params: GetCompaniesListParams`, `signal?: AbortSignal` | `Promise<StandardSearchResult<Company>>` | Retrieves a paginated list of companies based on search and filter criteria |

## Authentication

### Private Service
- **CompanyService**: Requires authentication credentials
- Uses `PrivateApiServiceWrapper` for credential management
- Automatically handles authentication headers and token refresh

### Public Service
- **PublicCompanyServiceBuilder**: No authentication required
- Uses `PublicPlatformApiServiceWrapper` for public API access
- Provides limited access to company data

## Error Handling

Following our service architecture patterns, this service does not handle errors internally. All error handling is delegated to the query layer:

- **HTTP Exceptions**: Non-2xx responses throw `HttpException`
- **Network Errors**: Propagated to query hooks for handling
- **Validation Errors**: Passed through to the calling layer
- **AbortController**: Supports request cancellation via `AbortSignal`

## Usage Examples

### Basic Company Search

```typescript
import { CompanyService } from '@/lib/services/company-service';

// Search companies by query
const searchResults = await CompanyService.getList({
  q: 'technology',
  size: 20
});

// Filter by specific criteria
const filteredCompanies = await CompanyService.getList({
  country: ['US', 'CA'],
  numEmployeesFrom: 1000,
  numEmployeesTo: 10000,
  sector: 'Technology'
});
```

### Public API Usage

```typescript
import { PublicCompanyServiceBuilder } from '@/lib/services/company-service';

// Build public service instance
const publicCompanyService = PublicCompanyServiceBuilder();

// Search public company data
const publicResults = await publicCompanyService.getList({
  symbol: ['AAPL', 'GOOGL'],
  size: 10
});
```

### With Abort Signal

```typescript
// Request cancellation support
const controller = new AbortController();

const companies = await CompanyService.getList({
  industry: 'Software',
  size: 50
}, controller.signal);

// Cancel request if needed
controller.abort();
```

### Advanced Filtering

```typescript
// Multiple filter criteria
const results = await CompanyService.getList({
  id: ['company1', 'company2'],
  exchange: ['NYSE', 'NASDAQ'],
  ipoFrom: '2020-01-01',
  ipoTo: '2023-12-31',
  domain: 'tech.com',
  prefixQ: 'tech'
});
```

## Related Types

### GetCompaniesListParams

```typescript
interface GetCompaniesListParams {
  id?: string | string[];              // Company ID(s)
  symbol?: string | string[];          // Stock symbol(s)
  domain?: string | string[];          // Company domain(s)
  country?: string | string[];         // Country code(s)
  exchange?: string | string[];        // Stock exchange(s)
  numEmployeesFrom?: number;           // Minimum employee count
  numEmployeesTo?: number;             // Maximum employee count
  ipoFrom?: string;                    // IPO date range start
  ipoTo?: string;                      // IPO date range end
  q?: string;                          // General search query
  name?: string;                       // Company name
  industry?: string;                   // Industry filter
  sector?: string;                     // Sector filter
  size?: number;                       // Results page size
  prefixQ?: string;                    // Prefix-based search
}
```

### StandardSearchResult<Company>

```typescript
interface StandardSearchResult<T> {
  data: T[];                          // Array of company results
  total: number;                      // Total count of matches
  page?: number;                      // Current page number
  size?: number;                      // Page size
  hasMore?: boolean;                  // More results available
}
```

### Company

```typescript
interface Company {
  id: string;
  name: string;
  symbol?: string;
  domain?: string;
  country?: string;
  exchange?: string;
  numEmployees?: number;
  ipoDate?: string;
  industry?: string;
  sector?: string;
  // Additional company fields...
}
```

## Dependencies

### Service Wrappers
- **PrivateApiServiceWrapper**: Handles authenticated requests with credential management
- **PublicPlatformApiServiceWrapper**: Manages public API access without authentication

### Utilities
- **Fetch**: HTTP client utility for API requests
- **AbortSignal**: Request cancellation support

### Types
- **Company**: Core company data interface
- **StandardSearchResult**: Paginated response wrapper

## Integration

### TanStack Query Integration

```typescript
// Query hook usage
import { useQuery } from '@tanstack/react-query';
import { CompanyService } from '@/lib/services/company-service';

function useCompanies(params: GetCompaniesListParams) {
  return useQuery({
    queryKey: ['companies', params],
    queryFn: ({ signal }) => CompanyService.getList(params, signal),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Mutation for search
import { useMutation } from '@tanstack/react-query';

function useCompanySearch() {
  return useMutation({
    mutationFn: (params: GetCompaniesListParams) => 
      CompanyService.getList(params),
  });
}
```

### Query Key Patterns

```typescript
// Recommended query key structure
const companyKeys = {
  all: ['companies'] as const,
  lists: () => [...companyKeys.all, 'list'] as const,
  list: (params: GetCompaniesListParams) => 
    [...companyKeys.lists(), params] as const,
};
```

## Best Practices

### Service Architecture Adherence

✅ **Simple, focused methods**: Single `getList` method with comprehensive parameters  
✅ **No error handling**: Errors propagated to query layer  
✅ **No data transformation**: Returns raw API responses  
✅ **Proper credential management**: Uses appropriate service wrappers  
✅ **HTTP Exception pattern**: Non-2xx responses throw HttpException  

### Usage Guidelines

1. **Use appropriate service variant**:
   - `CompanyService` for authenticated requests
   - `PublicCompanyServiceBuilder()` for public access

2. **Leverage query parameters effectively**:
   - Combine multiple filters for precise results
   - Use array parameters for multiple values
   - Implement pagination with `size` parameter

3. **Request cancellation**:
   - Always pass `AbortSignal` from query hooks
   - Support user-initiated cancellation

4. **Type safety**:
   - Use `GetCompaniesListParams` interface
   - Leverage TypeScript for parameter validation

5. **Performance optimization**:
   - Cache results using TanStack Query
   - Implement appropriate stale times
   - Use query key factories for consistent caching