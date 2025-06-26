# Journalist Service

## Purpose

The Journalist Service provides CRUD operations for managing journalist data within the platform. It handles both private and public API endpoints for retrieving journalist information, including individual journalist profiles and paginated lists with comprehensive filtering capabilities. The service is designed to work seamlessly with TanStack Query hooks for data fetching and caching.

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getJournalistById` | `id: string, signal?: AbortSignal` | `Promise<Journalist>` | Retrieves a single journalist by their unique identifier |
| `getList` | `params: GetJournalistsListParams, signal?: AbortSignal` | `Promise<StandardSearchResult<Journalist>>` | Retrieves a paginated list of journalists with optional filtering |

## Authentication

The service provides two authentication contexts:

- **Private API** (`JournalistService`): Requires authenticated credentials via `PrivateApiServiceWrapper`
- **Public API** (`PublicJournalistServiceBuilder`): Uses public platform API endpoints via `PublicPlatformApiServiceWrapper`

Credential management is handled automatically by the respective service wrappers, ensuring proper authentication headers are included in all requests.

## Error Handling

Following our service architecture patterns, this service does not implement error handling internally. All HTTP errors are handled by:

- **Service Wrappers**: Throw `HttpException` for non-2xx responses
- **Query Hooks**: Handle errors in the query layer using TanStack Query's error handling mechanisms

The service methods will throw `HttpException` instances for failed requests, which should be caught and handled by the consuming query hooks.

## Usage Examples

### Private API Usage

```typescript
import { JournalistService } from '@/lib/services/journalist-service';

// Get journalist by ID
const journalist = await JournalistService.getJournalistById('journalist-123');

// Get filtered list of journalists
const journalistList = await JournalistService.getList({
  q: 'technology',
  topic: ['AI', 'blockchain'],
  country: ['US', 'UK'],
  minMonthlyPosts: 10,
  size: 20,
  page: 1
});
```

### Public API Usage

```typescript
import { PublicJournalistServiceBuilder } from '@/lib/services/journalist-service';

// Build public service with API key
const publicService = PublicJournalistServiceBuilder('your-api-key');

// Use public endpoints
const journalist = await publicService.getJournalistById('journalist-123');
const journalistList = await publicService.getList({
  name: 'John Doe',
  source: ['TechCrunch', 'Wired'],
  showNumResults: true
});
```

### With TanStack Query

```typescript
import { useQuery } from '@tanstack/react-query';
import { JournalistService } from '@/lib/services/journalist-service';

// Query for single journalist
const useJournalist = (id: string) => {
  return useQuery({
    queryKey: ['journalist', id],
    queryFn: ({ signal }) => JournalistService.getJournalistById(id, signal),
    enabled: !!id,
  });
};

// Query for journalist list
const useJournalistList = (params: GetJournalistsListParams) => {
  return useQuery({
    queryKey: ['journalists', params],
    queryFn: ({ signal }) => JournalistService.getList(params, signal),
  });
};
```

## Related Types

### GetJournalistsListParams

```typescript
interface GetJournalistsListParams {
  id?: string[];                    // Filter by journalist IDs
  q?: string;                       // General search query
  name?: string;                    // Filter by journalist name
  twitter?: string;                 // Filter by Twitter handle
  source?: string[];               // Filter by publication sources
  topic?: string[];                // Filter by topic coverage
  category?: string[];             // Filter by content categories
  label?: string[];                // Filter by custom labels
  country?: string[];              // Filter by country
  showNumResults?: boolean;        // Include result count in response
  minMonthlyPosts?: number;        // Minimum monthly post count
  maxMonthlyPosts?: number;        // Maximum monthly post count
  updatedAtFrom?: string;          // Filter by update date range (from)
  updatedAtTo?: string;            // Filter by update date range (to)
  size?: number;                   // Page size for pagination
  page?: number;                   // Page number for pagination
}
```

### Response Types

```typescript
// Individual journalist response
type Journalist = {
  id: string;
  name: string;
  // ... other journalist properties
};

// Paginated list response
type StandardSearchResult<T> = {
  data: T[];
  pagination: {
    page: number;
    size: number;
    total: number;
  };
  // ... other metadata
};
```

## Dependencies

| Dependency | Purpose |
|------------|---------|
| `PrivateApiServiceWrapper` | Provides authenticated API access for private endpoints |
| `PublicPlatformApiServiceWrapper` | Provides public API access with API key authentication |
| `Fetch` | HTTP client utility for making API requests |

## Integration

The Journalist Service integrates with the query layer through:

### TanStack Query Hooks

- **Query Keys**: Use structured keys like `['journalist', id]` or `['journalists', params]`
- **Abort Signals**: Service methods accept `AbortSignal` for request cancellation
- **Caching**: Raw API responses are cached without transformation
- **Error Handling**: Query hooks handle `HttpException` instances thrown by service methods

### Service Wrappers

- **Private API**: Automatically handles authentication and credential management
- **Public API**: Requires API key for public endpoint access
- **URL Prefixing**: Service wrappers manage API endpoint prefixes (`/platform-api` vs `/platform-api/public`)

## Best Practices

### Architecture Adherence

✅ **Simple, focused methods**: Each method performs a single CRUD operation  
✅ **No error handling**: Errors are thrown as `HttpException` and handled by query hooks  
✅ **No data transformation**: Returns raw API responses for maximum flexibility  
✅ **Proper credential management**: Uses appropriate service wrappers for authentication  
✅ **HTTP Exception pattern**: Follows standardized error handling pattern  

### Usage Guidelines

- **Always use with query hooks**: Don't call service methods directly in components
- **Leverage abort signals**: Pass abort signals for request cancellation
- **Structure query keys**: Use consistent, hierarchical query keys for caching
- **Handle loading states**: Use query hook loading states in UI components
- **Implement error boundaries**: Handle errors at the query layer, not in services

### Performance Considerations

- **Pagination**: Use `size` and `page` parameters for large datasets
- **Filtering**: Apply server-side filters via `GetJournalistsListParams` to reduce payload size
- **Caching**: Leverage TanStack Query's caching with proper query key structure
- **Request cancellation**: Use abort signals to cancel in-flight requests when components unmount