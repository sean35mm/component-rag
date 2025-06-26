# Curated Entities Service

## Purpose

The Curated Entities Service manages API operations for retrieving curated entity data, specifically carousel cards used throughout the platform. This service provides both private (authenticated) and public access to curated content lists, enabling the application to display organized, curated content collections to users.

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getList` | `signal?: AbortSignal` | `Promise<CustomSearchResult<BackendCuratedEntity>>` | Retrieves all curated entities/carousel cards |

## Authentication

### Private Service
- **Authentication Required**: Yes
- **Credentials**: Managed automatically by `PrivateApiServiceWrapper`
- **Access Level**: Authenticated users only
- **Endpoint**: `/platform-api/carouselCards/all`

### Public Service
- **Authentication Required**: No
- **Access Level**: Public access
- **Endpoint**: `/platform-api/public/carouselCards/all`

## Error Handling

This service follows our **HTTP Exception pattern**:

- **No internal error handling**: Services throw exceptions for non-2xx responses
- **HttpException throwing**: Handled automatically by service wrappers
- **Query layer responsibility**: Error handling managed by TanStack Query hooks
- **AbortController support**: Built-in request cancellation via `AbortSignal`

## Usage Examples

### Private Service Usage

```typescript
import { PrivateCuratedEntitiesService } from '@/lib/services/curated-entities-service';

// Initialize service (credentials handled automatically)
const curatedService = PrivateCuratedEntitiesService();

// Get curated entities list
const getCuratedEntities = async () => {
  try {
    const result = await curatedService.getList();
    return result; // CustomSearchResult<BackendCuratedEntity>
  } catch (error) {
    // HttpException thrown for non-2xx responses
    throw error;
  }
};

// With request cancellation
const controller = new AbortController();
const result = await curatedService.getList(controller.signal);
```

### Public Service Usage

```typescript
import { PublicCuratedEntitiesServiceBuilder } from '@/lib/services/curated-entities-service';

// Build public service instance
const publicCuratedService = PublicCuratedEntitiesServiceBuilder();

// Get public curated entities
const getPublicCuratedEntities = async () => {
  const result = await publicCuratedService.getList();
  return result; // No authentication required
};
```

### TanStack Query Integration

```typescript
import { useQuery } from '@tanstack/react-query';
import { PrivateCuratedEntitiesService } from '@/lib/services/curated-entities-service';

// Query hook usage
const useCuratedEntities = () => {
  const curatedService = PrivateCuratedEntitiesService();
  
  return useQuery({
    queryKey: ['curated-entities'],
    queryFn: ({ signal }) => curatedService.getList(signal),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Component usage
const CuratedEntitiesComponent = () => {
  const { data, error, isLoading } = useCuratedEntities();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading curated entities</div>;
  
  return (
    <div>
      {data?.results?.map(entity => (
        <div key={entity.id}>{entity.title}</div>
      ))}
    </div>
  );
};
```

## Related Types

### Core Types

```typescript
// Main entity type
interface BackendCuratedEntity {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  // Additional entity properties
}

// API response wrapper
interface CustomSearchResult<T> {
  results: T[];
  total: number;
  page?: number;
  limit?: number;
  // Additional search metadata
}

// Service return type
type CuratedEntitiesResponse = CustomSearchResult<BackendCuratedEntity>;
```

### Request Types

```typescript
// AbortSignal for request cancellation
interface AbortSignal {
  readonly aborted: boolean;
  addEventListener(type: 'abort', listener: () => void): void;
  removeEventListener(type: 'abort', listener: () => void): void;
}
```

## Dependencies

### Service Wrappers

- **`PrivateApiServiceWrapper`**: Handles authenticated API requests with automatic credential management
- **`PublicPlatformApiServiceWrapper`**: Manages public API requests without authentication

### Core Dependencies

```typescript
import {
  PrivateApiServiceWrapper,
  PublicPlatformApiServiceWrapper,
} from '@/lib/service-wrappers';
import { BackendCuratedEntity, CustomSearchResult } from '@/lib/types';
```

## Integration

### TanStack Query Layer

```typescript
// Query keys pattern
const curatedEntitiesKeys = {
  all: ['curated-entities'] as const,
  lists: () => [...curatedEntitiesKeys.all, 'list'] as const,
  public: () => [...curatedEntitiesKeys.all, 'public'] as const,
};

// Private entities query
export const useCuratedEntities = () => {
  const service = PrivateCuratedEntitiesService();
  return useQuery({
    queryKey: curatedEntitiesKeys.lists(),
    queryFn: ({ signal }) => service.getList(signal),
  });
};

// Public entities query
export const usePublicCuratedEntities = () => {
  const service = PublicCuratedEntitiesServiceBuilder();
  return useQuery({
    queryKey: curatedEntitiesKeys.public(),
    queryFn: ({ signal }) => service.getList(signal),
  });
};
```

### Mutation Integration

```typescript
// If mutations are needed, they would follow this pattern
export const useInvalidateCuratedEntities = () => {
  const queryClient = useQueryClient();
  
  return () => {
    queryClient.invalidateQueries({
      queryKey: curatedEntitiesKeys.all,
    });
  };
};
```

## Best Practices

### Architecture Compliance

✅ **Simple, focused methods**: Single `getList` method with clear purpose  
✅ **No error handling**: Delegates to query layer via service wrappers  
✅ **No data transformation**: Returns raw `CustomSearchResult<BackendCuratedEntity>`  
✅ **Proper credential management**: Uses `PrivateApiServiceWrapper` for authentication  
✅ **HTTP Exception pattern**: Service wrappers handle exception throwing  

### Service Usage Guidelines

1. **Use appropriate service variant**:
   - `PrivateCuratedEntitiesService` for authenticated requests
   - `PublicCuratedEntitiesServiceBuilder` for public access

2. **Leverage AbortSignal**: Always pass through `signal` parameter for request cancellation

3. **Query integration**: Use with TanStack Query hooks for caching and error handling

4. **Raw response handling**: Don't transform data in service layer - handle in components or custom hooks

### Performance Considerations

- **Request cancellation**: Built-in `AbortSignal` support prevents unnecessary requests
- **Query caching**: Integrates with TanStack Query for automatic response caching  
- **Stale-while-revalidate**: Configure appropriate `staleTime` for curated content
- **Public vs Private**: Use public endpoint when authentication isn't required to reduce server load