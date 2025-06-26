# Source Service Documentation

## Purpose

The Source Service manages news sources and media outlets through our platform API. It provides access to source metadata, search capabilities, and detailed source information including geographic location, content categories, traffic metrics, and publishing statistics. This service handles both authenticated private API access and public API endpoints for source discovery and retrieval.

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getById` | `id: string`, `signal?: AbortSignal` | `Promise<Source>` | Retrieves a single source by its unique identifier |
| `getList` | `params: GetSourcesListParams`, `signal?: AbortSignal` | `Promise<StandardSearchResult<Source>>` | Searches and retrieves a paginated list of sources with filtering options |

## Authentication

### Private Service (`SourceService`)
- **Endpoint**: `/platform-api/sources/*`
- **Authentication**: Required - uses `PrivateApiServiceWrapper`
- **Credentials**: Automatically managed through the wrapper service
- **Access**: Full access to all source data and metadata

### Public Service (`PublicSourceServiceBuilder`)
- **Endpoint**: `/platform-api/public/sources/*`
- **Authentication**: Not required - uses `PublicPlatformApiServiceWrapper`
- **Access**: Limited to publicly available source information

## Error Handling

The service follows our standard HTTP Exception pattern:
- **No internal error handling** - Raw API responses are returned
- **HTTP errors** are thrown as `HttpException` instances for non-2xx responses
- **Error handling** is delegated to TanStack Query hooks in the query layer
- **AbortSignal** support for request cancellation

## Usage Examples

### Private API Usage

```typescript
import { SourceService } from '@/lib/services/source-service';

// Get a specific source by ID
const source = await SourceService.getById('source-123');

// Search sources with filters
const results = await SourceService.getList({
  country: ['US', 'CA'],
  category: ['news', 'politics'],
  minMonthlyVisits: 100000,
  sortBy: 'monthlyVisits',
  size: 20,
  page: 1
});
```

### Public API Usage

```typescript
import { PublicSourceServiceBuilder } from '@/lib/services/source-service';

// Build public service instance
const PublicSourceService = PublicSourceServiceBuilder();

// Get public source information
const source = await PublicSourceService.getById('source-123');

// Search public sources
const results = await PublicSourceService.getList({
  domain: 'example.com',
  sourceCountry: 'US',
  showNumResults: true
});
```

### With Request Cancellation

```typescript
const controller = new AbortController();

try {
  const sources = await SourceService.getList(
    { category: 'technology' },
    controller.signal
  );
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Request cancelled');
  }
}

// Cancel the request
controller.abort();
```

## Related Types

### GetSourcesListParams
```typescript
interface GetSourcesListParams {
  // Source identification
  id?: string | string[];
  domain?: string | string[];
  name?: string;
  sourceGroup?: string;
  
  // Content metrics
  minMonthlyPosts?: number;
  maxMonthlyPosts?: number;
  paywall?: boolean;
  
  // Geographic filters
  sourceCountry?: string | string[];
  sourceState?: string | string[];
  sourceCounty?: string | string[];
  sourceCity?: string | string[];
  sourceLat?: number;
  sourceLon?: number;
  sourceMaxDistance?: number;
  
  // Content classification
  category?: string | string[];
  topic?: string | string[];
  country?: string | string[];
  label?: string | string[];
  
  // Traffic metrics
  minMonthlyVisits?: number;
  maxMonthlyVisits?: number;
  
  // Response options
  showNumResults?: boolean;
  showSubdomains?: boolean;
  
  // Sorting and pagination
  sortBy?: 'globalRank' | 'relevance' | 'monthlyVisits' | 'avgMonthlyPosts';
  size?: number;
  page?: number;
  prefixQ?: string;
}
```

### Source
```typescript
// Imported from @/lib/types
interface Source {
  // Source metadata including domain, name, categories, 
  // geographic information, traffic metrics, etc.
}
```

### StandardSearchResult
```typescript
// Imported from @/lib/types
interface StandardSearchResult<T> {
  // Paginated response wrapper with results array,
  // total count, and pagination metadata
}
```

## Dependencies

- **`PrivateApiServiceWrapper`**: Handles authenticated API requests to private endpoints
- **`PublicPlatformApiServiceWrapper`**: Manages public API access without authentication
- **`Fetch`**: HTTP client utility for making API requests
- **`@/lib/types`**: Type definitions for `Source` and `StandardSearchResult`

## Integration

### TanStack Query Integration

The service integrates seamlessly with TanStack Query hooks:

```typescript
// Query hook usage
const { data: source, error, isLoading } = useQuery({
  queryKey: ['source', sourceId],
  queryFn: ({ signal }) => SourceService.getById(sourceId, signal),
});

// Search query with parameters
const { data: sources } = useQuery({
  queryKey: ['sources', 'list', searchParams],
  queryFn: ({ signal }) => SourceService.getList(searchParams, signal),
});
```

### Service Builder Pattern

The public service uses our builder pattern:

```typescript
// Service is built at runtime
const publicService = PublicSourceServiceBuilder();

// Can be used in query hooks
const { data } = useQuery({
  queryKey: ['public-sources'],
  queryFn: ({ signal }) => publicService.getList(params, signal),
});
```

## Best Practices

### Service Architecture Compliance
- ✅ **Simple, focused methods** - Only `getById` and `getList` operations
- ✅ **No error handling** - Delegates to query layer
- ✅ **No data transformation** - Returns raw API responses
- ✅ **Proper credential management** - Uses appropriate service wrappers
- ✅ **HTTP Exception pattern** - Errors thrown by underlying fetch utility

### Usage Guidelines
- **Use private service** for authenticated source management
- **Use public service** for guest access or public-facing features
- **Leverage AbortSignal** for request cancellation in components
- **Implement proper query keys** for effective caching
- **Handle loading and error states** in the query layer, not the service
- **Use TypeScript interfaces** for type safety with parameters and responses

### Performance Considerations
- **Pagination support** through `size` and `page` parameters
- **Efficient filtering** with multiple parameter options
- **Request cancellation** support for better UX
- **Caching optimization** through consistent query key patterns