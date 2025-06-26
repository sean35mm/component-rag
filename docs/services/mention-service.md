# MentionService

## Purpose

The `MentionService` provides API integration for retrieving entity mention explanations within story contexts. This service manages requests to fetch detailed explanations about why specific entities (persons or companies) are mentioned in story clusters, supporting content understanding and context analysis features.

The service handles entity mention queries by person ID, company ID, or entity name within specific story clusters.

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getEntityMentionExplanation` | `params: GetEntityMentionExplanationParams`, `signal?: AbortSignal` | `Promise<string>` | Retrieves explanation text for why an entity is mentioned in a story cluster |

## Authentication

⚠️ **Authentication Status**: Currently uses `DefaultApiServiceWrapper` - authentication is pending backend implementation.

```typescript
// TODO: add auth on the backend
export const MentionService = DefaultApiServiceWrapper((api) => ({
  // methods...
}));
```

**Future Authentication**: Once backend authentication is implemented, this service should migrate to `ApiWithCredentialsServiceWrapper` for proper credential management.

## Error Handling

Following our service architecture patterns, this service does not handle errors internally. All error handling is delegated to the query layer:

- **HTTP Exceptions**: Non-2xx responses are automatically converted to `HttpException` instances by the service wrapper
- **Network Errors**: Connection failures and timeouts are propagated as-is
- **Abort Signals**: Request cancellation is handled through the `AbortSignal` parameter

## Usage Examples

### Basic Entity Mention Explanation

```typescript
import { MentionService } from '@/lib/services/mention-service';

// Get explanation by person ID
const explanation = await MentionService.getEntityMentionExplanation({
  personId: "person-123",
  name: "John Doe",
  clusterId: "cluster-456"
});

// Get explanation by company ID
const companyExplanation = await MentionService.getEntityMentionExplanation({
  companyId: "company-789",
  name: "Tech Corp",
  clusterId: "cluster-456"
});
```

### With Request Cancellation

```typescript
const controller = new AbortController();

try {
  const explanation = await MentionService.getEntityMentionExplanation({
    personId: "person-123",
    name: "John Doe",
    clusterId: "cluster-456"
  }, controller.signal);
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Request was cancelled');
  }
}

// Cancel the request
controller.abort();
```

## Related Types

### GetEntityMentionExplanationParams

```typescript
interface GetEntityMentionExplanationParams {
  personId?: string;      // Optional person identifier
  companyId?: string;     // Optional company identifier  
  name: string;          // Required entity name
  clusterId: string;     // Required story cluster identifier
}
```

**Parameter Rules**:
- Either `personId` OR `companyId` should be provided (not both)
- `name` is always required for display/context purposes
- `clusterId` identifies the specific story cluster context

## Dependencies

```typescript
import { DefaultApiServiceWrapper } from '@/lib/service-wrappers';
```

- **DefaultApiServiceWrapper**: Provides basic API functionality without authentication
- **Future Dependency**: Will require `ApiWithCredentialsServiceWrapper` once authentication is implemented

## Integration

### TanStack Query Integration

```typescript
// In your query hooks file
import { useQuery } from '@tanstack/react-query';
import { MentionService } from '@/lib/services/mention-service';

export const useEntityMentionExplanation = (
  params: GetEntityMentionExplanationParams,
  options?: UseQueryOptions<string>
) => {
  return useQuery({
    queryKey: ['entityMentionExplanation', params],
    queryFn: ({ signal }) => 
      MentionService.getEntityMentionExplanation(params, signal),
    ...options,
  });
};
```

### React Component Usage

```typescript
import { useEntityMentionExplanation } from '@/hooks/queries';

function EntityMentionCard({ personId, name, clusterId }: Props) {
  const { data: explanation, isLoading, error } = useEntityMentionExplanation({
    personId,
    name,
    clusterId
  });

  if (isLoading) return <Skeleton />;
  if (error) return <ErrorMessage error={error} />;
  
  return <div>{explanation}</div>;
}
```

## Best Practices

### ✅ Architecture Compliance

- **Simple, focused methods**: Single method with clear responsibility
- **No error handling**: Errors propagated to query layer
- **No data transformation**: Returns raw API response data
- **Proper parameters**: Uses AbortSignal for cancellation
- **TypeScript interfaces**: Well-defined parameter types

### ⚠️ Areas for Improvement

- **Authentication**: Needs migration to `ApiWithCredentialsServiceWrapper`
- **Service wrapper**: Currently using default wrapper instead of authenticated wrapper

### 🔄 Future Enhancements

```typescript
// After backend authentication implementation
export const MentionService = ApiWithCredentialsServiceWrapper((api) => ({
  async getEntityMentionExplanation(
    params: GetEntityMentionExplanationParams,
    signal?: AbortSignal
  ): Promise<string> {
    const response = await api.get('/ui/story/entityMentions', {
      params,
      signal,
    });
    const { data } = await response.json();
    return data;
  },
}));
```

### Query Key Patterns

```typescript
// Recommended query key structure
const queryKeys = {
  entityMentions: ['entityMentions'] as const,
  entityMention: (params: GetEntityMentionExplanationParams) => 
    [...queryKeys.entityMentions, params] as const,
};
```