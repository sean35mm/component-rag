# Shared Member Thread Service

## Purpose

The Shared Member Thread Service manages API interactions for accessing shared member threads within the platform. This service provides read-only access to thread data with associated messages, supporting both private member access and public platform integrations. It follows our lightweight service architecture by focusing solely on API communication without error handling or data transformation.

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getById` | `threadUuid: string`, `signal?: AbortSignal` | `Promise<AnswersThreadWithMessages>` | Retrieves a shared member thread by UUID with all associated messages |

## Authentication

The service provides two authentication contexts:

- **MemberSharedMemberThreadService**: Uses `PrivateApiServiceWrapper` for authenticated member access with automatic credential management
- **PublicSharedMemberThreadServiceBuilder**: Uses `PublicPlatformApiServiceWrapper` for public platform API access

Both wrappers handle authentication headers and credential management automatically according to their respective authentication schemes.

## Error Handling

Following our service architecture guidelines, this service does not implement error handling. All HTTP errors are propagated as `HttpException` instances by the underlying service wrappers and handled by:

- TanStack Query hooks in the query layer
- Global error boundaries
- Component-level error handling

Non-2xx HTTP responses are automatically converted to `HttpException` instances with appropriate error details.

## Usage Examples

### Private Member Access

```typescript
import { MemberSharedMemberThreadService } from '@/lib/services/shared-member-thread-service';

// Get thread with messages for authenticated member
const thread = await MemberSharedMemberThreadService.getById(
  'thread-uuid-123'
);

// With abort signal for request cancellation
const controller = new AbortController();
const thread = await MemberSharedMemberThreadService.getById(
  'thread-uuid-123',
  controller.signal
);
```

### Public Platform Access

```typescript
import { PublicSharedMemberThreadServiceBuilder } from '@/lib/services/shared-member-thread-service';

// Build service instance for public access
const publicService = PublicSharedMemberThreadServiceBuilder();

// Get publicly accessible shared thread
const thread = await publicService.getById('public-thread-uuid-456');
```

### Integration with TanStack Query

```typescript
import { useQuery } from '@tanstack/react-query';
import { MemberSharedMemberThreadService } from '@/lib/services/shared-member-thread-service';

function useSharedMemberThread(threadUuid: string) {
  return useQuery({
    queryKey: ['shared-member-thread', threadUuid],
    queryFn: ({ signal }) => 
      MemberSharedMemberThreadService.getById(threadUuid, signal),
    enabled: !!threadUuid,
  });
}
```

## Related Types

### AnswersThreadWithMessages

The primary response type containing thread data with associated messages:

```typescript
interface AnswersThreadWithMessages {
  // Thread metadata and content
  uuid: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  // Associated messages array
  messages: ThreadMessage[];
  // Additional thread properties
}
```

### Core Request Types

- `threadUuid: string` - Unique identifier for the shared thread
- `signal?: AbortSignal` - Optional abort signal for request cancellation

## Dependencies

### Service Wrappers

- **PrivateApiServiceWrapper**: Handles private member authentication and API routing to `/members` endpoints
- **PublicPlatformApiServiceWrapper**: Manages public platform API access with routing to `/platform-api/public` endpoints

### Utilities

- **Fetch**: Core HTTP client utility providing standardized request/response handling
- **API Response Pattern**: Expects `{ data: T }` response structure from API endpoints

## Integration

### TanStack Query Integration

This service integrates seamlessly with TanStack Query hooks:

```typescript
// Query hook implementation
const {
  data: thread,
  isLoading,
  error
} = useQuery({
  queryKey: ['shared-member-thread', threadUuid],
  queryFn: ({ signal }) => 
    MemberSharedMemberThreadService.getById(threadUuid, signal),
  staleTime: 5 * 60 * 1000, // 5 minutes
});
```

### Request Cancellation

Supports AbortSignal for proper request lifecycle management:

```typescript
const controller = new AbortController();

// Cancel request on component unmount
useEffect(() => {
  return () => controller.abort();
}, []);
```

## Best Practices

### Service Architecture Adherence

✅ **Simple, focused methods**: Single `getById` method with clear responsibility  
✅ **No error handling**: Delegates error management to query layer  
✅ **No data transformation**: Returns raw API response data  
✅ **Proper credential management**: Uses appropriate service wrappers  
✅ **HTTP Exception pattern**: Leverages wrapper exception handling  

### Usage Guidelines

1. **Use appropriate service variant**: Choose between private member and public platform access based on authentication context
2. **Implement proper query keys**: Include thread UUID in query keys for effective caching
3. **Handle loading states**: Utilize TanStack Query loading states in components
4. **Request cancellation**: Always pass abort signals from query hooks for proper cleanup
5. **Error boundaries**: Implement error boundaries to catch and handle service exceptions

### Performance Considerations

- **Caching strategy**: Thread data can be cached for extended periods due to relatively static nature
- **Request deduplication**: TanStack Query automatically deduplicates concurrent requests
- **Background refetching**: Configure appropriate stale times based on thread update frequency