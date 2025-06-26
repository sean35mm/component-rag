# Organization Limits Type Definition

## Purpose

The `organization-limits` type system defines the API rate limiting, permission tracking, and usage constraints for organizations within the application. This type represents the comprehensive set of limitations and capabilities available to an organization based on their subscription status and billing plan, providing a unified interface for managing API quotas, request tracking, and feature permissions.

## Type Definition

```typescript
import { PermissionMeta } from './billing-plan';

export interface PermissionInfo {
  name: PermissionMeta['friendlyName'];
  enabled: boolean;
}

interface Tracking {
  numRequests: number;
  since: string;
  lastMadeAt: string | null;
  resetAt: string;
}

interface OrganizationApiLimitsOfUserWithSub {
  tracking: Tracking | null;
  permissions: PermissionInfo[];
  actualPermissions: PermissionInfo[];
  requestLimit: number;
  paginationLimit: number;
  maxHistoricalDataLookupDays: number | null;
}

export type OrganizationApiLimits =
  | OrganizationApiLimitsOfUserWithSub
  | Record<keyof OrganizationApiLimitsOfUserWithSub, null>;
```

## Properties

### PermissionInfo Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | `PermissionMeta['friendlyName']` | ✅ | Human-readable permission name derived from billing plan metadata |
| `enabled` | `boolean` | ✅ | Whether the permission is currently active for the organization |

### Tracking Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `numRequests` | `number` | ✅ | Current number of API requests made in the tracking period |
| `since` | `string` | ✅ | ISO timestamp when tracking period started |
| `lastMadeAt` | `string \| null` | ✅ | ISO timestamp of the last API request, null if no requests made |
| `resetAt` | `string` | ✅ | ISO timestamp when the tracking period will reset |

### OrganizationApiLimitsOfUserWithSub Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `tracking` | `Tracking \| null` | ✅ | Request tracking data, null if tracking is disabled |
| `permissions` | `PermissionInfo[]` | ✅ | List of permissions available to the organization |
| `actualPermissions` | `PermissionInfo[]` | ✅ | List of permissions currently active (may differ from available permissions) |
| `requestLimit` | `number` | ✅ | Maximum number of API requests allowed per period |
| `paginationLimit` | `number` | ✅ | Maximum number of items returned per paginated request |
| `maxHistoricalDataLookupDays` | `number \| null` | ✅ | Maximum days of historical data accessible, null for unlimited |

### OrganizationApiLimits Union Type

A discriminated union that represents either:
- Full organization limits for users with active subscriptions (`OrganizationApiLimitsOfUserWithSub`)
- Null values for all properties when no subscription exists (`Record<keyof OrganizationApiLimitsOfUserWithSub, null>`)

## Usage Examples

### Component Usage with Type Guards

```typescript
import { OrganizationApiLimits, PermissionInfo } from '@/lib/types/organization-limits';

interface LimitsDisplayProps {
  limits: OrganizationApiLimits;
}

function LimitsDisplay({ limits }: LimitsDisplayProps) {
  // Type guard to check if user has active subscription
  const hasActiveSubscription = (limits: OrganizationApiLimits): limits is OrganizationApiLimitsOfUserWithSub => {
    return limits.requestLimit !== null;
  };

  if (!hasActiveSubscription(limits)) {
    return <div>No active subscription</div>;
  }

  return (
    <div>
      <h3>API Limits</h3>
      <p>Request Limit: {limits.requestLimit}</p>
      <p>Pagination Limit: {limits.paginationLimit}</p>
      
      {limits.tracking && (
        <div>
          <p>Requests Used: {limits.tracking.numRequests}</p>
          <p>Resets At: {new Date(limits.tracking.resetAt).toLocaleDateString()}</p>
        </div>
      )}
      
      <h4>Permissions</h4>
      {limits.permissions.map((permission) => (
        <PermissionBadge key={permission.name} permission={permission} />
      ))}
    </div>
  );
}

function PermissionBadge({ permission }: { permission: PermissionInfo }) {
  return (
    <span className={`badge ${permission.enabled ? 'enabled' : 'disabled'}`}>
      {permission.name}
    </span>
  );
}
```

### Service Layer Usage

```typescript
import { OrganizationApiLimits } from '@/lib/types/organization-limits';

class OrganizationLimitsService {
  async fetchOrganizationLimits(orgId: string): Promise<OrganizationApiLimits> {
    const response = await fetch(`/api/organizations/${orgId}/limits`);
    return response.json();
  }

  canMakeRequest(limits: OrganizationApiLimits): boolean {
    if (limits.requestLimit === null) return false;
    
    if (!limits.tracking) return true;
    
    return limits.tracking.numRequests < limits.requestLimit;
  }

  hasPermission(limits: OrganizationApiLimits, permissionName: string): boolean {
    if (limits.actualPermissions === null) return false;
    
    return limits.actualPermissions.some(
      permission => permission.name === permissionName && permission.enabled
    );
  }

  getRemainingRequests(limits: OrganizationApiLimits): number | null {
    if (limits.requestLimit === null || !limits.tracking) return null;
    
    return Math.max(0, limits.requestLimit - limits.tracking.numRequests);
  }
}
```

### Custom Hook Implementation

```typescript
import { useState, useEffect } from 'react';
import { OrganizationApiLimits } from '@/lib/types/organization-limits';

interface UseLimitsReturn {
  limits: OrganizationApiLimits | null;
  loading: boolean;
  error: Error | null;
  canMakeRequest: boolean;
  remainingRequests: number | null;
}

export function useLimits(organizationId: string): UseLimitsReturn {
  const [limits, setLimits] = useState<OrganizationApiLimits | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchLimits() {
      try {
        setLoading(true);
        const service = new OrganizationLimitsService();
        const fetchedLimits = await service.fetchOrganizationLimits(organizationId);
        setLimits(fetchedLimits);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    fetchLimits();
  }, [organizationId]);

  const canMakeRequest = limits ? 
    new OrganizationLimitsService().canMakeRequest(limits) : false;
  
  const remainingRequests = limits ? 
    new OrganizationLimitsService().getRemainingRequests(limits) : null;

  return {
    limits,
    loading,
    error,
    canMakeRequest,
    remainingRequests
  };
}
```

## Type Architecture Pattern

This type follows our domain-first architecture pattern:

```typescript
// Domain Objects (Base Types)
interface PermissionInfo { /* ... */ }
interface Tracking { /* ... */ }
interface OrganizationApiLimitsOfUserWithSub { /* ... */ }

// Response Types (API Responses)
interface OrganizationLimitsResponse {
  limits: OrganizationApiLimits;
  lastUpdated: string;
  organizationId: string;
}

// Request Types (API Requests)
interface UpdateLimitsRequest {
  organizationId: string;
  requestLimit?: number;
  paginationLimit?: number;
  permissions?: Pick<PermissionInfo, 'name' | 'enabled'>[];
}

// Utility Types for specific use cases
type LimitKeys = keyof OrganizationApiLimitsOfUserWithSub;
type RequiredLimits = Required<Pick<OrganizationApiLimitsOfUserWithSub, 'requestLimit' | 'paginationLimit'>>;
```

## Related Types

### Dependencies
- `PermissionMeta` from `./billing-plan` - Provides the structure for permission metadata
- Likely relationships with subscription and billing plan types

### Derived Types
```typescript
// Utility types that could be derived
type PermissionName = PermissionInfo['name'];
type EnabledPermissions = PermissionInfo & { enabled: true };
type LimitsWithoutTracking = Omit<OrganizationApiLimitsOfUserWithSub, 'tracking'>;
type TrackingMetrics = Pick<Tracking, 'numRequests' | 'resetAt'>;
```

## Integration Points

### API Endpoints
- `GET /api/organizations/{id}/limits` - Fetch organization limits
- `PUT /api/organizations/{id}/limits` - Update organization limits
- `POST /api/organizations/{id}/limits/reset` - Reset tracking counters

### Components
- Rate limiting middleware components
- Permission-based feature flags
- Usage dashboard displays
- Billing and subscription management interfaces

### Services
- API request interceptors for rate limiting
- Permission validation services
- Analytics and usage tracking
- Billing integration services

## Validation

### Zod Schema Example

```typescript
import { z } from 'zod';

const PermissionInfoSchema = z.object({
  name: z.string(),
  enabled: z.boolean()
});

const TrackingSchema = z.object({
  numRequests: z.number().int().min(0),
  since: z.string().datetime(),
  lastMadeAt: z.string().datetime().nullable(),
  resetAt: z.string().datetime()
});

const OrganizationApiLimitsOfUserWithSubSchema = z.object({
  tracking: TrackingSchema.nullable(),
  permissions: z.array(PermissionInfoSchema),
  actualPermissions: z.array(PermissionInfoSchema),
  requestLimit: z.number().int().min(0),
  paginationLimit: z.number().int().min(1).max(1000),
  maxHistoricalDataLookupDays: z.number().int().min(1).nullable()
});

const OrganizationApiLimitsSchema = z.union([
  OrganizationApiLimitsOfUserWithSubSchema,
  z.record(z.null())
]);

export {
  PermissionInfoSchema,
  TrackingSchema,
  OrganizationApiLimitsSchema
};
```

## Best Practices

### Type Safety
- ✅ Uses strict typing with no `any` types
- ✅ Leverages union types for different subscription states
- ✅ Uses interface over type for object shapes
- ✅ Properly handles nullable values with explicit `null` types

### Architecture Adherence
- ✅ Follows domain-first approach with clear object shapes
- ✅ Uses composition pattern with separate interfaces
- ✅ Implements discriminated unions for state management
- ✅ Leverages TypeScript utility types implicitly through Record<>

### Code Organization
- ✅ Clear separation of concerns between tracking, permissions, and limits
- ✅ Proper dependency injection through imports
- ✅ Consistent naming conventions
- ✅ Appropriate use of nullability for optional features

### Performance Considerations
- Use type guards to avoid runtime type checking overhead
- Implement proper caching strategies for frequently accessed limits
- Consider using React.memo for components that consume this type frequently
- Validate API responses at the boundary rather than throughout the application