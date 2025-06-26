# Fastn Token Query Hooks

## Purpose

The `fastn-token` query hooks manage the authentication token required for Fastn integration. These hooks provide a secure way to fetch and cache the organization's Fastn access token, enabling seamless integration with Fastn services while maintaining proper authentication flow.

## Hooks Overview

| Hook | Type | Purpose | Cache Key |
|------|------|---------|-----------|
| `useFastnAccessToken` | Query | Fetches the current organization's Fastn access token | `fastn.getFastnToken` |

## Query Hooks

### `useFastnAccessToken`

Fetches the Fastn access token for the current organization. The token is cached and automatically managed by TanStack Query for optimal performance.

**Signature:**
```tsx
function useFastnAccessToken<TData = string>(
  options?: UseQueryOptions<string, HttpException, TData, QueryKey>
): UseQueryResult<TData, HttpException>
```

**Parameters:**
- `options` - Optional TanStack Query options including selectors, enabled conditions, etc.

**Returns:**
- Query result containing the Fastn access token string

## Query Keys

The query keys are structured using `@lukemorales/query-key-factory` for consistency and type safety:

```tsx
// Query key structure
queryKeys.fastn.getFastnToken
// Resolves to: ['fastn', 'getFastnToken']
```

This ensures proper cache management and enables efficient invalidation patterns across the application.

## Usage Examples

### Basic Token Fetching

```tsx
import { useFastnAccessToken } from '@/lib/query-hooks/fastn-token';

function FastnIntegration() {
  const { data: token, isLoading, error } = useFastnAccessToken();

  if (isLoading) return <div>Loading Fastn token...</div>;
  if (error) return <div>Failed to load Fastn token</div>;

  return (
    <div>
      <p>Fastn integration ready</p>
      {/* Use token for Fastn API calls */}
    </div>
  );
}
```

### Conditional Token Fetching

```tsx
function ConditionalFastnAccess({ fastnEnabled }: { fastnEnabled: boolean }) {
  const { data: token, isLoading } = useFastnAccessToken({
    enabled: fastnEnabled,
  });

  if (!fastnEnabled) return <div>Fastn integration disabled</div>;
  if (isLoading) return <div>Authenticating with Fastn...</div>;

  return <FastnDashboard token={token} />;
}
```

### Error Handling with Retry Logic

```tsx
function RobustFastnIntegration() {
  const { 
    data: token, 
    isLoading, 
    error, 
    refetch,
    isRefetching 
  } = useFastnAccessToken({
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (error) {
    return (
      <div className="error-container">
        <p>Failed to authenticate with Fastn</p>
        <button 
          onClick={() => refetch()} 
          disabled={isRefetching}
        >
          {isRefetching ? 'Retrying...' : 'Retry Authentication'}
        </button>
      </div>
    );
  }

  return <FastnServices token={token} />;
}
```

## Selector Support

The hook supports selector functions for transforming or extracting specific data from the token response:

### Token Validation Selector

```tsx
interface TokenInfo {
  isValid: boolean;
  expiresAt?: Date;
}

function useTokenValidation() {
  return useFastnAccessToken({
    select: (token): TokenInfo => {
      if (!token) return { isValid: false };
      
      try {
        // Decode JWT token to check expiration
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiresAt = new Date(payload.exp * 1000);
        
        return {
          isValid: expiresAt > new Date(),
          expiresAt,
        };
      } catch {
        return { isValid: false };
      }
    },
  });
}
```

### Token Headers Selector

```tsx
function useFastnHeaders() {
  return useFastnAccessToken({
    select: (token) => ({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }),
    enabled: true,
  });
}
```

## Caching Strategy

### Cache Configuration

- **Stale Time**: Tokens are considered fresh for 5 minutes by default
- **Cache Time**: Unused tokens are garbage collected after 30 minutes
- **Background Refetch**: Automatic token refresh when the window regains focus
- **Retry Logic**: Failed requests are retried up to 3 times with exponential backoff

### Cache Invalidation

```tsx
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';

function useTokenManagement() {
  const queryClient = useQueryClient();

  const invalidateToken = () => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.fastn.getFastnToken.queryKey,
    });
  };

  const clearTokenCache = () => {
    queryClient.removeQueries({
      queryKey: queryKeys.fastn.getFastnToken.queryKey,
    });
  };

  return { invalidateToken, clearTokenCache };
}
```

### Organization-Scoped Caching

Since tokens are organization-specific, they're automatically invalidated when the current organization changes:

```tsx
// In organization change handler
function handleOrganizationChange(newOrgId: string) {
  queryClient.invalidateQueries({
    queryKey: queryKeys.fastn._def, // Invalidate all fastn queries
  });
}
```

## Error Handling

### Error Types

The hook handles several types of authentication errors:

```tsx
function FastnErrorHandler() {
  const { error } = useFastnAccessToken();

  if (error) {
    switch (error.status) {
      case 401:
        return <div>Authentication failed. Please check your credentials.</div>;
      case 403:
        return <div>Access denied. Contact your administrator.</div>;
      case 404:
        return <div>Fastn integration not configured for this organization.</div>;
      case 500:
        return <div>Server error. Please try again later.</div>;
      default:
        return <div>Failed to connect to Fastn: {error.message}</div>;
    }
  }

  return null;
}
```

### Error Boundaries

```tsx
import { ErrorBoundary } from 'react-error-boundary';

function FastnTokenProvider({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      fallback={<div>Fastn authentication service unavailable</div>}
      onError={(error) => {
        console.error('Fastn token error:', error);
        // Log to error reporting service
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
```

## Related Services

### CurrentOrganizationService Integration

The hook integrates with the `CurrentOrganizationService`:

```tsx
// Service method signature
class CurrentOrganizationService {
  static async getFastnAccessToken(signal?: AbortSignal): Promise<string> {
    // Implementation handles:
    // - Organization context
    // - HTTP request with abort signal
    // - Error transformation to HttpException
  }
}
```

### Service Dependencies

- `CurrentOrganizationService.getFastnAccessToken()` - Core token fetching logic
- Organization context management
- HTTP client with proper error handling

## Best Practices

### 1. Token Security

```tsx
// ✅ Good: Never log or expose tokens
function useFastnAPI() {
  const { data: token } = useFastnAccessToken();
  
  return useMemo(() => {
    if (!token) return null;
    
    return {
      headers: { Authorization: `Bearer ${token}` },
      // Don't expose raw token
    };
  }, [token]);
}

// ❌ Bad: Exposing token in logs or state
function BadTokenUsage() {
  const { data: token } = useFastnAccessToken();
  console.log('Token:', token); // Security risk
  return <div>{token}</div>; // Never display tokens
}
```

### 2. Conditional Loading

```tsx
// ✅ Good: Conditional loading based on integration status
function FastnFeature({ fastnEnabled }: { fastnEnabled: boolean }) {
  const { data: token, isLoading } = useFastnAccessToken({
    enabled: fastnEnabled,
  });

  if (!fastnEnabled) return null;
  if (isLoading) return <Spinner />;
  
  return <FastnIntegration />;
}
```

### 3. Error Recovery

```tsx
// ✅ Good: Graceful error handling with recovery options
function ResilientFastnIntegration() {
  const { data: token, error, refetch } = useFastnAccessToken({
    retry: (failureCount, error) => {
      // Don't retry auth errors
      if (error.status === 401 || error.status === 403) return false;
      return failureCount < 3;
    },
  });

  if (error?.status === 401) {
    return <AuthenticationRequired />;
  }

  return <FastnServices token={token} onError={() => refetch()} />;
}
```

### 4. Token Lifecycle Management

```tsx
// ✅ Good: Proper token lifecycle management
function useFastnWithLifecycle() {
  const { data: token } = useFastnAccessToken({
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  // Invalidate on logout
  useEffect(() => {
    const handleLogout = () => {
      queryClient.removeQueries({
        queryKey: queryKeys.fastn._def,
      });
    };

    eventBus.on('logout', handleLogout);
    return () => eventBus.off('logout', handleLogout);
  }, []);

  return token;
}
```