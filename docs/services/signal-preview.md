# Signal Preview Service

## Purpose

The Signal Preview Service manages signal preview operations for both public and authenticated contexts. It provides functionality to fetch signal previews from shared signals and copy preview signals to user accounts. This service handles both public (unauthenticated) and private (authenticated) signal preview operations through separate service builders.

## Methods

### Public Signal Preview Service

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getSignalPreview` | `uuid: string`, `signal?: AbortSignal` | `Promise<SignalPreview>` | Retrieves a public signal preview by UUID |

### Private Signal Preview Service

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getMemberSignalPreview` | `uuid: string`, `signal?: AbortSignal` | `Promise<SignalPreview>` | Retrieves a signal preview for authenticated members |
| `copyPreviewSignal` | `data: { uuid: string; dto: CopySignalPreviewDto }`, `signal?: AbortSignal` | `Promise<Signal>` | Copies a preview signal to the user's account |

## Authentication

- **Public Service**: No authentication required - uses `PublicPlatformApiServiceWrapper`
- **Private Service**: Requires authentication - uses `PrivateApiServiceWrapper` with credential management

The private service automatically handles authentication tokens and credential refresh through the wrapper.

## Error Handling

This service follows the **HttpException pattern**:
- **No internal error handling** - errors are thrown as `HttpException` for non-2xx responses
- **Query layer responsibility** - TanStack Query hooks handle error states and retries
- **Automatic error propagation** - Service wrappers convert HTTP errors to `HttpException` instances

## Usage Examples

### Public Signal Preview Access

```typescript
// Initialize public service
const publicSignalPreviewService = PublicSignalPreviewServiceBuilder();

// Get public signal preview
const preview = await publicSignalPreviewService.getSignalPreview(
  'signal-uuid-123'
);
```

### Private Signal Preview Operations

```typescript
// Initialize private service
const privateSignalPreviewService = PrivateSignalPreviewService;

// Get member signal preview
const memberPreview = await privateSignalPreviewService.getMemberSignalPreview(
  'signal-uuid-456'
);

// Copy preview signal
const copiedSignal = await privateSignalPreviewService.copyPreviewSignal({
  uuid: 'preview-uuid-789',
  dto: {
    name: 'My Copied Signal',
    description: 'Signal copied from preview'
  }
});
```

### With AbortSignal Support

```typescript
const controller = new AbortController();

try {
  const preview = await publicSignalPreviewService.getSignalPreview(
    'signal-uuid-123',
    controller.signal
  );
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Request was cancelled');
  }
}

// Cancel request
controller.abort();
```

## Related Types

### Core Types
```typescript
interface SignalPreview {
  uuid: string;
  name: string;
  description?: string;
  // Additional preview properties
}

interface Signal {
  id: string;
  uuid: string;
  name: string;
  // Full signal properties
}
```

### Request DTOs
```typescript
interface CopySignalPreviewDto {
  name: string;
  description?: string;
  // Additional copy configuration
}
```

## Dependencies

- **`PublicPlatformApiServiceWrapper`**: Handles public API requests without authentication
- **`PrivateApiServiceWrapper`**: Manages authenticated API requests with credential handling
- **`CopySignalPreviewDto`**: Type definition for signal copy operations
- **`Signal`, `SignalPreview`**: Core domain types

## Integration

### TanStack Query Integration

```typescript
// Query hooks usage
const useSignalPreview = (uuid: string) => {
  return useQuery({
    queryKey: ['signal-preview', uuid],
    queryFn: ({ signal }) => 
      PublicSignalPreviewServiceBuilder().getSignalPreview(uuid, signal),
  });
};

const useCopySignalPreview = () => {
  return useMutation({
    mutationFn: (data: { uuid: string; dto: CopySignalPreviewDto }) =>
      PrivateSignalPreviewService.copyPreviewSignal(data),
  });
};
```

### Service Layer Architecture

```
┌─────────────────────┐
│   Query Hooks       │
├─────────────────────┤
│ Signal Preview      │
│ Service             │
├─────────────────────┤
│ Service Wrappers    │
├─────────────────────┤
│ HTTP Client         │
└─────────────────────┘
```

## Best Practices

### Service Architecture Adherence

✅ **Simple, focused methods** - Each method handles a single signal preview operation
✅ **No error handling** - Delegates error management to query layer
✅ **No data transformation** - Returns raw API response data
✅ **Proper credential management** - Uses appropriate service wrappers
✅ **HTTP Exception pattern** - Leverages wrapper error handling

### Usage Guidelines

- **Use public service** for unauthenticated signal preview access
- **Use private service** for authenticated operations and signal copying
- **Leverage AbortSignal** for request cancellation support
- **Handle errors at query level** using TanStack Query error boundaries
- **Cache appropriately** using proper query keys in hooks

### Performance Considerations

- **Request cancellation** supported through AbortSignal
- **Efficient caching** when integrated with TanStack Query
- **Minimal payload** - services return only necessary data
- **Automatic retry logic** handled by query layer