# Usage Query Hooks

## Purpose

The usage query hooks manage API usage data and limits for both authenticated and public users. These hooks provide real-time access to usage statistics, rate limits, and quota information across different authentication states.

## Hooks Overview

| Hook | Type | Purpose |
|------|------|---------|
| `useUsageQuery` | Query | Fetches current usage limits and statistics |

## Service Builder

### UsageServiceBuilder

A service builder that creates appropriate usage service instances based on authentication state:

```tsx
const UsageServiceBuilder = ServiceBuilder(
  PublicUsageServiceBuilder,
  UsageService
);
```

**Parameters:**
- `isAuthorizedAndVerified: boolean` - Whether user is authenticated and verified
- `isPublic: boolean` - Whether operating in public mode
- `token: AccessToken | null` - Current access token

**Returns:** Configured usage service instance (public or authenticated)

## Query Hooks

### useUsageQuery

Fetches current usage limits and statistics for the authenticated or public user.

```tsx
function useUsageQuery<T = UsageDto>(
  options?: UseQueryOptions<UsageDto, T>
): UseQueryResult<T, Error>
```

**Parameters:**
- `options?: UseQueryOptions<UsageDto, T>` - TanStack Query options with selector support

**Returns:** Query result containing usage data

**Key Features:**
- Always fetches fresh data (`staleTime: 0`)
- Automatically enabled for authorized or public users
- Supports custom selectors for data transformation
- Uses dynamic query keys based on token type

## Query Keys

Usage query keys are structured using `@lukemorales/query-key-factory`:

```tsx
queryKeys.usage.getLimits(tokenType, tokenValue)
```

**Structure:**
- `tokenType` - Type of authentication token (if any)
- `tokenValue` - Token value for cache isolation

## Usage Examples

### Basic Usage Query

```tsx
function UsageDashboard() {
  const { data: usage, isLoading, error } = useUsageQuery();

  if (isLoading) return <div>Loading usage data...</div>;
  if (error) return <div>Error loading usage</div>;

  return (
    <div>
      <h2>API Usage</h2>
      <p>Requests Used: {usage.requestsUsed}</p>
      <p>Requests Limit: {usage.requestsLimit}</p>
      <p>Reset Date: {usage.resetDate}</p>
    </div>
  );
}
```

### With Custom Options

```tsx
function UsageMonitor() {
  const { data: usage } = useUsageQuery({
    refetchInterval: 30000, // Refresh every 30 seconds
    retry: 3,
    retryDelay: 1000,
  });

  return <UsageDisplay usage={usage} />;
}
```

### Conditional Fetching

```tsx
function OptionalUsageDisplay({ showUsage }: { showUsage: boolean }) {
  const { data: usage } = useUsageQuery({
    enabled: showUsage, // Only fetch when needed
  });

  return showUsage ? <UsageStats usage={usage} /> : null;
}
```

## Selector Support

Transform usage data using selector functions:

### Extract Specific Usage Metrics

```tsx
function useUsagePercentage() {
  return useUsageQuery({
    select: (usage) => ({
      percentage: (usage.requestsUsed / usage.requestsLimit) * 100,
      remaining: usage.requestsLimit - usage.requestsUsed,
      isNearLimit: usage.requestsUsed / usage.requestsLimit > 0.8,
    }),
  });
}
```

### Format Usage Data

```tsx
function useFormattedUsage() {
  return useUsageQuery({
    select: (usage) => ({
      ...usage,
      formattedResetDate: new Date(usage.resetDate).toLocaleDateString(),
      usageRatio: `${usage.requestsUsed}/${usage.requestsLimit}`,
    }),
  });
}
```

### Usage Status Check

```tsx
function useUsageStatus() {
  return useUsageQuery({
    select: (usage) => {
      const percentage = (usage.requestsUsed / usage.requestsLimit) * 100;
      
      if (percentage >= 100) return 'exceeded';
      if (percentage >= 80) return 'warning';
      if (percentage >= 50) return 'moderate';
      return 'low';
    },
  });
}
```

## Caching Strategy

### Cache Configuration

- **Stale Time**: `0` - Always fetches fresh data to ensure accuracy
- **Cache Key**: Based on token type and value for proper isolation
- **Garbage Collection**: Automatic cleanup when tokens change

### Cache Invalidation

Usage data cache is typically invalidated by:

```tsx
// After API calls that might affect usage
queryClient.invalidateQueries({
  queryKey: queryKeys.usage.getLimits(tokenType, tokenValue)._def,
});

// Or invalidate all usage queries
queryClient.invalidateQueries({
  queryKey: queryKeys.usage._def,
});
```

### Cache Isolation

Different authentication states maintain separate caches:

```tsx
// Public user cache
queryKeys.usage.getLimits(null, null)

// Authenticated user cache  
queryKeys.usage.getLimits('bearer', 'abc123')

// Different token = different cache
queryKeys.usage.getLimits('bearer', 'xyz789')
```

## Error Handling

### Service-Level Errors

The usage service throws `HttpException` for various scenarios:
- **401**: Invalid or expired authentication
- **403**: Insufficient permissions
- **429**: Rate limit exceeded
- **500**: Server-side errors

### Hook-Level Error Handling

```tsx
function UsageWithErrorHandling() {
  const { data: usage, error, isError } = useUsageQuery();

  if (isError) {
    if (error.status === 429) {
      return <div>Rate limit exceeded. Please try again later.</div>;
    }
    if (error.status === 401) {
      return <div>Please log in to view usage data.</div>;
    }
    return <div>Unable to load usage data.</div>;
  }

  return <UsageDisplay usage={usage} />;
}
```

### Global Error Boundary

```tsx
// Usage hooks work with global error boundaries
function App() {
  return (
    <QueryErrorBoundary>
      <UsageDashboard />
    </QueryErrorBoundary>
  );
}
```

## Related Services

### Core Services

- **`UsageService`**: Authenticated usage operations
- **`PublicUsageService`**: Public usage operations  
- **`ServiceBuilder`**: Creates appropriate service instances

### Integration Files

- **`@/lib/services/usage-service`**: Usage service implementations
- **`@/lib/dto/usage.dto`**: Usage data type definitions
- **`@/lib/contexts/access-token`**: Authentication context
- **`@/lib/query-keys`**: Centralized query key management

### Usage Service Integration

```tsx
// Services are automatically selected based on auth state
const service = UsageServiceBuilder(
  isAuthorizedAndVerified,
  isPublic, 
  token
);

// Calls appropriate service method
const limits = await service.getLimits(signal);
```

## Best Practices

### 1. Authentication-Aware Querying

```tsx
// ✅ Hook automatically handles auth state
function MyComponent() {
  const { data } = useUsageQuery(); // Works for both auth states
  return <UsageDisplay usage={data} />;
}

// ❌ Don't manually check auth state
function MyComponent() {
  const { isAuthorizedAndVerified } = useAccessToken();
  const { data } = useUsageQuery({
    enabled: isAuthorizedAndVerified, // Redundant
  });
}
```

### 2. Real-Time Usage Monitoring

```tsx
// ✅ Use intervals for live usage tracking
function LiveUsageMonitor() {
  const { data: usage } = useUsageQuery({
    refetchInterval: 10000, // Update every 10 seconds
    refetchIntervalInBackground: true,
  });

  return <RealTimeUsageChart usage={usage} />;
}
```

### 3. Efficient Data Selection

```tsx
// ✅ Select only needed data
function UsageWarning() {
  const { data: isNearLimit } = useUsageQuery({
    select: (usage) => usage.requestsUsed / usage.requestsLimit > 0.9,
  });

  return isNearLimit ? <WarningBanner /> : null;
}
```

### 4. Proper Loading States

```tsx
// ✅ Handle all query states
function UsageComponent() {
  const { data: usage, isLoading, isError, error } = useUsageQuery();

  if (isLoading) return <UsageSkeleton />;
  if (isError) return <UsageError error={error} />;
  
  return <UsageDisplay usage={usage} />;
}
```

### 5. Background Refetching

```tsx
// ✅ Keep usage data current
function CriticalUsageDisplay() {
  const { data: usage } = useUsageQuery({
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 0, // Already default, but explicit is good
  });

  return <CriticalUsageMetrics usage={usage} />;
}
```