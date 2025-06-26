# Usage Service

## Purpose

The Usage Service manages user and platform usage limits and quotas through the platform API. It provides access to usage restrictions and limitations for both authenticated members and public platform access, enabling applications to enforce and display usage constraints.

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getLimits` | `signal?: AbortSignal` | `Promise<UsageDto>` | Retrieves current usage limits and quotas |

## Authentication

### Member Access (UsageService)
- **Authentication**: Required - uses private member credentials
- **Endpoint**: `/members/limits`
- **Wrapper**: `PrivateApiServiceWrapper`

### Public Platform Access (PublicUsageServiceBuilder)
- **Authentication**: Platform API key required
- **Endpoint**: `/platform-api/public/limits`
- **Wrapper**: `PublicPlatformApiServiceWrapper`
- **Usage**: Requires builder pattern with platform credentials

## Error Handling

Follows the **HttpException pattern**:
- Service methods throw `HttpException` for non-2xx HTTP responses
- No internal error handling or transformation
- Error handling delegated to TanStack Query hooks
- AbortSignal support for request cancellation

## Usage Examples

### Member Usage Service
```typescript
import { UsageService } from '@/lib/services/usage-service';

// Get current user's usage limits
const limits = await UsageService.getLimits();
console.log(limits);
// Returns: UsageDto with current limits and quotas

// With abort signal for cancellation
const controller = new AbortController();
const limits = await UsageService.getLimits(controller.signal);
```

### Public Platform Usage Service
```typescript
import { PublicUsageServiceBuilder } from '@/lib/services/usage-service';

// Build service with platform credentials
const publicUsageService = PublicUsageServiceBuilder({
  apiKey: 'your-platform-api-key',
  baseUrl: 'https://api.platform.com'
});

// Get public usage limits
const publicLimits = await publicUsageService.getLimits();
```

### Integration with TanStack Query
```typescript
import { useQuery } from '@tanstack/react-query';
import { UsageService } from '@/lib/services/usage-service';

// Query hook for usage limits
function useUsageLimits() {
  return useQuery({
    queryKey: ['usage', 'limits'],
    queryFn: ({ signal }) => UsageService.getLimits(signal),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Usage in component
function UsageLimitsDisplay() {
  const { data: limits, error, isLoading } = useUsageLimits();
  
  if (isLoading) return <div>Loading limits...</div>;
  if (error) return <div>Error loading limits</div>;
  
  return (
    <div>
      <h3>Usage Limits</h3>
      <p>API Calls: {limits?.apiCalls}</p>
      <p>Storage: {limits?.storage}</p>
    </div>
  );
}
```

## Related Types

### UsageDto
```typescript
interface UsageDto {
  apiCalls?: number;
  storage?: number;
  bandwidth?: number;
  // Additional usage metrics
  [key: string]: unknown;
}
```

### Service Builder Options
```typescript
interface PlatformApiOptions {
  apiKey: string;
  baseUrl: string;
  // Additional platform configuration
}
```

## Dependencies

### Service Wrappers
- **`PrivateApiServiceWrapper`**: Handles authenticated member API calls
- **`PublicPlatformApiServiceWrapper`**: Manages platform API authentication and configuration

### Utilities
- **`Fetch`**: HTTP client utility for API communication
- **`AbortSignal`**: Native browser API for request cancellation

## Integration

### TanStack Query Integration
```typescript
// Query keys for usage data
export const usageKeys = {
  all: ['usage'] as const,
  limits: () => [...usageKeys.all, 'limits'] as const,
};

// Usage limits query
export function useUsageLimits() {
  return useQuery({
    queryKey: usageKeys.limits(),
    queryFn: ({ signal }) => UsageService.getLimits(signal),
    staleTime: 5 * 60 * 1000,
  });
}
```

### Service Architecture Compliance
- **Focused responsibility**: Single concern for usage/limits management
- **No transformation**: Returns raw `UsageDto` from API
- **Proper error delegation**: Throws HttpException, lets query hooks handle errors
- **AbortSignal support**: All methods support request cancellation

## Best Practices

### Service Architecture Adherence
✅ **Simple, focused methods** - Single `getLimits` method with clear purpose  
✅ **No error handling** - Delegates error handling to query layer  
✅ **No data transformation** - Returns raw API responses as `UsageDto`  
✅ **Proper credential management** - Uses appropriate service wrappers  
✅ **HTTP Exception pattern** - Throws HttpException for non-2xx responses  

### Usage Recommendations
- Use member service for user-specific usage limits
- Use public platform service for general platform constraints
- Implement proper query key strategies for cache management
- Handle loading and error states in UI components
- Cache usage data appropriately (5-15 minutes recommended)
- Use AbortSignal for request cancellation in components

### Performance Considerations
- Usage limits typically change infrequently - use longer stale times
- Consider background refetching for real-time usage monitoring
- Implement proper cache invalidation when usage changes
- Use optimistic updates for usage-related mutations