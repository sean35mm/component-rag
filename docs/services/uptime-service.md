# Uptime Service

## Purpose

The Uptime Service provides API integration for monitoring uptime statistics and status information. This service specifically manages retrieval of monitor data for the "Perigon News API" with custom uptime ratio calculations over specified time periods.

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getMonitorsList` | `signal?: AbortSignal` | `Promise<Monitors>` | Retrieves monitor data for Perigon News API with 365-day uptime ratios |

## Authentication

This service uses the `UptimeApiServiceWrapper` for API communication. The wrapper handles:

- Base URL configuration for uptime monitoring endpoints
- Request/response formatting
- HTTP client setup with proper headers

**Note**: If authentication credentials are required, consider migrating to `ApiWithCredentialsServiceWrapper` for proper credential management.

## Error Handling

Following our service architecture patterns:

- **No service-level error handling**: All error handling is delegated to query hooks
- **HTTP Exception pattern**: Non-2xx responses are automatically converted to `HttpException` instances by the service wrapper
- **Abort signal support**: All methods support `AbortSignal` for request cancellation

## Usage Examples

### Basic Monitor Retrieval

```typescript
import { UptimeServiceBuilder } from '@/lib/services/uptime-service';

// Initialize the service
const uptimeService = UptimeServiceBuilder();

// Get monitor data
const monitors = await uptimeService.getMonitorsList();
console.log(monitors);
```

### With Abort Signal

```typescript
import { UptimeServiceBuilder } from '@/lib/services/uptime-service';

const uptimeService = UptimeServiceBuilder();
const controller = new AbortController();

try {
  const monitors = await uptimeService.getMonitorsList(controller.signal);
  // Handle monitors data
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
import { UptimeServiceBuilder } from '@/lib/services/uptime-service';

const uptimeService = UptimeServiceBuilder();

function useMonitorsList() {
  return useQuery({
    queryKey: ['uptime', 'monitors'],
    queryFn: ({ signal }) => uptimeService.getMonitorsList(signal),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
}

// Usage in component
function UptimeMonitors() {
  const { data: monitors, isLoading, error } = useMonitorsList();
  
  if (isLoading) return <div>Loading monitors...</div>;
  if (error) return <div>Error loading monitors</div>;
  
  return (
    <div>
      {/* Render monitors data */}
    </div>
  );
}
```

## Related Types

### Core Types

```typescript
// Import from @/lib/types
interface Monitors {
  // Monitor data structure returned by the uptime API
  // Specific fields depend on the uptime service response format
}
```

### Request Payload

The service sends the following payload structure:

```typescript
interface GetMonitorsRequest {
  search: string;                    // Filter criteria (e.g., "Perigon News API")
  custom_uptime_ratios: string;      // Time period for ratio calculation (e.g., "365")
}
```

## Dependencies

### Service Wrappers

- **`UptimeApiServiceWrapper`**: Provides HTTP client functionality and request/response handling for uptime monitoring APIs

### External Dependencies

- **`@/lib/types`**: Type definitions for API responses
- **Standard Web APIs**: `AbortSignal` for request cancellation

## Integration

### TanStack Query Integration

This service is designed to integrate seamlessly with TanStack Query hooks:

```typescript
// Query hook example
export function useUptimeMonitors() {
  const uptimeService = UptimeServiceBuilder();
  
  return useQuery({
    queryKey: ['uptime', 'monitors', 'perigon'],
    queryFn: ({ signal }) => uptimeService.getMonitorsList(signal),
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
}
```

### Service Composition

```typescript
// Can be composed with other services
class UptimeManager {
  private uptimeService = UptimeServiceBuilder();
  
  async getSystemStatus() {
    const monitors = await this.uptimeService.getMonitorsList();
    return this.processMonitorData(monitors);
  }
}
```

## Best Practices

### Architecture Compliance

✅ **Simple, focused methods**: Single responsibility per method  
✅ **No error handling**: Delegates to query layer  
✅ **No data transformation**: Returns raw API responses  
✅ **Abort signal support**: All methods support cancellation  

### Recommended Usage

1. **Use with Query Hooks**: Always wrap service calls in TanStack Query hooks
2. **Handle Cancellation**: Pass abort signals from query hooks to service methods
3. **Proper Error Handling**: Handle `HttpException` instances in query error handlers
4. **Caching Strategy**: Configure appropriate cache times based on data volatility

### Migration Considerations

- **Authentication**: If API requires credentials, migrate to `ApiWithCredentialsServiceWrapper`
- **Request Payload**: Consider making search parameters configurable for broader use cases
- **Type Safety**: Ensure `Monitors` type accurately reflects API response structure

### Performance Optimization

```typescript
// Use query invalidation for real-time updates
const queryClient = useQueryClient();

const refreshMonitors = () => {
  queryClient.invalidateQueries(['uptime', 'monitors']);
};
```