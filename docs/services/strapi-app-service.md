# StrapiAppService

## Overview

The `StrapiAppService` provides a focused interface for interacting with Strapi CMS endpoints. This service manages content-related operations, specifically changelog retrieval, following our service architecture patterns of simple CRUD operations without error handling or data transformation.

## Purpose

- **Primary Function**: Interface with Strapi CMS API endpoints
- **Scope**: Content management operations (changelogs, etc.)
- **Architecture Role**: Data access layer that returns raw API responses
- **Integration**: Designed for use with TanStack Query hooks for state management

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getChangelogs` | `params: GetChangelogsParams`, `signal?: AbortSignal` | `Promise<Changelog[]>` | Retrieves changelog entries with optional filtering and sorting |

### Method Details

#### `getChangelogs(params, signal?)`

Fetches changelog entries from the Strapi CMS with support for pagination and sorting.

**Parameters:**
- `params: GetChangelogsParams` - Query parameters for filtering and sorting
- `signal?: AbortSignal` - Optional abort signal for request cancellation

**Returns:** `Promise<Changelog[]>` - Array of changelog entries

## Authentication

- **Wrapper**: Uses `StrapiAppApiServiceWrapper` for API configuration
- **Credentials**: Automatically handled by the service wrapper
- **Headers**: Authentication headers managed at the wrapper level
- **Scope**: Inherits authentication requirements from the wrapped API instance

## Error Handling

Following our service architecture patterns:

- **No Internal Error Handling**: Service methods do not catch or transform errors
- **HttpException Pattern**: Non-2xx HTTP responses throw `HttpException` via the service wrapper
- **Query Layer Responsibility**: Error handling delegated to TanStack Query hooks
- **AbortSignal Support**: Proper request cancellation through AbortSignal

## Usage Examples

### Basic Changelog Retrieval

```typescript
import { StrapiAppService } from '@/lib/services/strapi-app-service';

// Get all changelogs
const changelogs = await StrapiAppService.getChangelogs({});

// Get limited changelogs
const recentChangelogs = await StrapiAppService.getChangelogs({
  limit: 10
});
```

### Sorting and Filtering

```typescript
// Sort by single field (ascending)
const sortedChangelogs = await StrapiAppService.getChangelogs({
  sort: 'createdAt'
});

// Sort by single field (descending)
const latestChangelogs = await StrapiAppService.getChangelogs({
  sort: 'createdAt:DESC'
});

// Multiple sort criteria
const complexSort = await StrapiAppService.getChangelogs({
  sort: ['priority:DESC', 'createdAt:ASC'],
  limit: 20
});
```

### With AbortSignal

```typescript
const controller = new AbortController();

try {
  const changelogs = await StrapiAppService.getChangelogs(
    { limit: 5 },
    controller.signal
  );
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Request was cancelled');
  }
}

// Cancel the request
controller.abort();
```

### Integration with TanStack Query

```typescript
import { useQuery } from '@tanstack/react-query';

function useChangelogs(params: GetChangelogsParams) {
  return useQuery({
    queryKey: ['changelogs', params],
    queryFn: ({ signal }) => StrapiAppService.getChangelogs(params, signal),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Usage in component
function ChangelogList() {
  const { data: changelogs, isLoading, error } = useChangelogs({
    limit: 10,
    sort: 'createdAt:DESC'
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {changelogs?.map(changelog => (
        <li key={changelog.id}>{changelog.title}</li>
      ))}
    </ul>
  );
}
```

## Related Types

### Core Interfaces

```typescript
// Service-specific parameter types
interface GetChangelogsParams {
  limit?: number;
  sort?: StrapiSortParam<Changelog>;
}

// Strapi sorting utilities
type StrapiSortParamValues<T> = 
  | keyof T
  | `${string & keyof T}:${'ASC' | 'DESC'}`;

type StrapiSortParam<T> = 
  | StrapiSortParamValues<T> 
  | StrapiSortParamValues<T>[];
```

### External Types

```typescript
// From @/lib/types
interface Changelog {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  // Additional Strapi CMS fields
}
```

## Dependencies

### Service Wrappers

- **`StrapiAppApiServiceWrapper`**: Provides API instance configuration, authentication, and error handling
- **Location**: `@/lib/service-wrappers`
- **Purpose**: Manages HTTP client setup and credential handling

### Type Dependencies

- **`Changelog`**: Core changelog entity type from `@/lib/types`
- **Built-in Types**: `AbortSignal`, `Promise`

## Integration

### TanStack Query Integration

```typescript
// Query key patterns
const queryKeys = {
  changelogs: ['changelogs'] as const,
  changelogsList: (params: GetChangelogsParams) => 
    ['changelogs', params] as const,
};

// Query hook example
function useChangelogsQuery(params: GetChangelogsParams) {
  return useQuery({
    queryKey: queryKeys.changelogsList(params),
    queryFn: ({ signal }) => StrapiAppService.getChangelogs(params, signal),
    // Query configuration
  });
}
```

### Mutation Integration

```typescript
// For future CRUD operations
function useCreateChangelog() {
  return useMutation({
    mutationFn: (data: CreateChangelogData) => 
      StrapiAppService.createChangelog(data),
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['changelogs'] });
    },
  });
}
```

## Best Practices

### Service Architecture Adherence

✅ **Simple, focused methods**: Each method performs a single API operation
✅ **No error handling**: Errors bubble up to query hooks
✅ **No data transformation**: Returns raw API responses
✅ **Proper credential management**: Uses service wrapper for authentication
✅ **HTTP Exception pattern**: Leverages wrapper for error throwing

### Usage Patterns

```typescript
// ✅ Good: Simple service usage with query hooks
const { data } = useQuery({
  queryKey: ['changelogs'],
  queryFn: () => StrapiAppService.getChangelogs({})
});

// ❌ Avoid: Direct service usage in components without query hooks
// This bypasses caching and error handling
const [changelogs, setChangelogs] = useState([]);
useEffect(() => {
  StrapiAppService.getChangelogs({}).then(setChangelogs);
}, []);
```

### Type Safety

```typescript
// ✅ Good: Properly typed parameters
const params: GetChangelogsParams = {
  limit: 10,
  sort: 'createdAt:DESC'
};

// ✅ Good: Type-safe sorting
const sortedParams: GetChangelogsParams = {
  sort: ['priority:DESC', 'createdAt:ASC'] // Array of sort criteria
};
```

### Request Cancellation

```typescript
// ✅ Good: Proper AbortSignal usage
const { data } = useQuery({
  queryKey: ['changelogs'],
  queryFn: ({ signal }) => StrapiAppService.getChangelogs({}, signal)
});
```