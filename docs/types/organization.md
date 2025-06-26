# Organization Type Definitions

## Purpose

The `organization.ts` module defines the core domain types for representing organizations, their subscriptions, and request tracking within the application. These types serve as the foundational data structures for managing billing, user organizations, and API usage analytics. The types follow our domain-first architecture pattern, providing strict typing for organization entities and their associated billing and tracking data.

## Type Definition

```typescript
export interface Subscription {
  stripeSubscriptionStatus: 'incomplete' | 'incomplete_expired' | 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid' | 'paused';
  cancelAt: string | null;
  trialExpiresAt: string | null; // @deprecated
  nextPaymentAt: string | null;
  billingPrices: BillingPrice[];
}

interface RequestTracking {
  numRequests: number;
  since: string;
  lastMadeAt: string | null;
}

export interface Organization {
  id: number;
  uuid: string;
  createdAt: string;
  updatedAt: string;
  stripeId: string | null;
  name: string;
  email: string;
  timezoneOffsetSeconds: number | null;
  trialedTiers: ProductTier[];
  subscription: Subscription | null;
  tracking: RequestTracking | null;
}

export interface OrganizationRequestStats {
  [statusCode: string]: {
    [date: string]: number;
  };
}

export interface OrganizationRequestCountByApiKey {
  apiKeyId: number;
  count: number;
}
```

## Properties

### Subscription Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `stripeSubscriptionStatus` | `'incomplete' \| 'incomplete_expired' \| 'trialing' \| 'active' \| 'past_due' \| 'canceled' \| 'unpaid' \| 'paused'` | ✅ | Current status of the Stripe subscription |
| `cancelAt` | `string \| null` | ✅ | ISO date string when subscription will be canceled, null if not scheduled for cancellation |
| `trialExpiresAt` | `string \| null` | ✅ | **@deprecated** ISO date string when trial expires, null if no trial |
| `nextPaymentAt` | `string \| null` | ✅ | ISO date string of next payment due date, null if no upcoming payment |
| `billingPrices` | `BillingPrice[]` | ✅ | Array of billing prices associated with the subscription |

### RequestTracking Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `numRequests` | `number` | ✅ | Total number of requests made |
| `since` | `string` | ✅ | ISO date string indicating when tracking started |
| `lastMadeAt` | `string \| null` | ✅ | ISO date string of the last request, null if no requests made |

### Organization Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `number` | ✅ | Unique numeric identifier |
| `uuid` | `string` | ✅ | UUID string for external references |
| `createdAt` | `string` | ✅ | ISO date string of creation timestamp |
| `updatedAt` | `string` | ✅ | ISO date string of last update timestamp |
| `stripeId` | `string \| null` | ✅ | Stripe customer ID, null if not connected to Stripe |
| `name` | `string` | ✅ | Organization display name |
| `email` | `string` | ✅ | Primary contact email address |
| `timezoneOffsetSeconds` | `number \| null` | ✅ | Timezone offset in seconds from UTC, null if not set |
| `trialedTiers` | `ProductTier[]` | ✅ | Array of product tiers that have been trialed |
| `subscription` | `Subscription \| null` | ✅ | Current subscription details, null if no active subscription |
| `tracking` | `RequestTracking \| null` | ✅ | Request tracking information, null if tracking disabled |

### OrganizationRequestStats Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `[statusCode: string]` | `{ [date: string]: number }` | ✅ | Nested object mapping status codes to date-count mappings |

### OrganizationRequestCountByApiKey Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `apiKeyId` | `number` | ✅ | Unique identifier for the API key |
| `count` | `number` | ✅ | Number of requests made with this API key |

## Usage Examples

### Basic Organization Usage

```typescript
import { Organization, Subscription } from '@/lib/types/organization';
import { ProductTier } from '@/lib/types/billing-plan';

// Creating a new organization object
const organization: Organization = {
  id: 123,
  uuid: 'org_abc123def456',
  createdAt: '2024-01-15T10:30:00Z',
  updatedAt: '2024-01-20T14:45:00Z',
  stripeId: 'cus_stripe123',
  name: 'Acme Corporation',
  email: 'billing@acme.com',
  timezoneOffsetSeconds: -28800, // PST
  trialedTiers: [ProductTier.BASIC, ProductTier.PRO],
  subscription: {
    stripeSubscriptionStatus: 'active',
    cancelAt: null,
    trialExpiresAt: null,
    nextPaymentAt: '2024-02-15T10:30:00Z',
    billingPrices: []
  },
  tracking: {
    numRequests: 1250,
    since: '2024-01-01T00:00:00Z',
    lastMadeAt: '2024-01-20T14:30:00Z'
  }
};
```

### Subscription Status Checking

```typescript
function isSubscriptionActive(subscription: Subscription | null): boolean {
  if (!subscription) return false;
  
  return subscription.stripeSubscriptionStatus === 'active' || 
         subscription.stripeSubscriptionStatus === 'trialing';
}

function getSubscriptionDisplayStatus(org: Organization): string {
  if (!org.subscription) return 'No subscription';
  
  switch (org.subscription.stripeSubscriptionStatus) {
    case 'active':
      return 'Active';
    case 'trialing':
      return 'Trial';
    case 'past_due':
      return 'Payment overdue';
    case 'canceled':
      return 'Canceled';
    default:
      return 'Inactive';
  }
}
```

### Request Statistics Processing

```typescript
import { OrganizationRequestStats, OrganizationRequestCountByApiKey } from '@/lib/types/organization';

function processRequestStats(stats: OrganizationRequestStats) {
  const totalRequests = Object.values(stats).reduce((total, dateMap) => {
    return total + Object.values(dateMap).reduce((sum, count) => sum + count, 0);
  }, 0);
  
  return {
    totalRequests,
    statusCodes: Object.keys(stats),
    errorRequests: stats['4xx'] || {},
    successRequests: stats['2xx'] || {}
  };
}

function getTopApiKeys(apiKeyStats: OrganizationRequestCountByApiKey[]): OrganizationRequestCountByApiKey[] {
  return apiKeyStats
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}
```

### Component Integration

```typescript
import React from 'react';
import { Organization } from '@/lib/types/organization';

interface OrganizationCardProps {
  organization: Organization;
  onSubscriptionUpdate: (orgId: number) => void;
}

export function OrganizationCard({ organization, onSubscriptionUpdate }: OrganizationCardProps) {
  const subscriptionStatus = organization.subscription?.stripeSubscriptionStatus || 'none';
  const requestCount = organization.tracking?.numRequests || 0;
  
  return (
    <div className="border rounded-lg p-4">
      <h3>{organization.name}</h3>
      <p>Email: {organization.email}</p>
      <p>Status: {subscriptionStatus}</p>
      <p>Requests: {requestCount.toLocaleString()}</p>
      
      {organization.subscription?.cancelAt && (
        <p className="text-red-600">
          Canceling on: {new Date(organization.subscription.cancelAt).toLocaleDateString()}
        </p>
      )}
      
      <button onClick={() => onSubscriptionUpdate(organization.id)}>
        Manage Subscription
      </button>
    </div>
  );
}
```

## Type Architecture Pattern

This module follows our **domain objects → response types → request types** pattern:

### 1. Domain Objects (Current)
- `Organization`: Core entity representing business organizations
- `Subscription`: Billing and subscription state
- `RequestTracking`: API usage monitoring

### 2. Response Types (Derived)
```typescript
// Typical API response shapes
export type OrganizationListResponse = {
  organizations: Organization[];
  pagination: PaginationMeta;
};

export type OrganizationDetailResponse = Organization;

export type OrganizationStatsResponse = {
  organization: Pick<Organization, 'id' | 'name'>;
  stats: OrganizationRequestStats;
  apiKeyBreakdown: OrganizationRequestCountByApiKey[];
};
```

### 3. Request Types (Input)
```typescript
// Request payloads for organization operations
export type CreateOrganizationRequest = Pick<Organization, 'name' | 'email'> & {
  timezoneOffsetSeconds?: number;
};

export type UpdateOrganizationRequest = Partial<Pick<Organization, 'name' | 'email' | 'timezoneOffsetSeconds'>>;

export type OrganizationStatsRequest = {
  organizationId: number;
  startDate: string;
  endDate: string;
  statusCodes?: string[];
};
```

## Related Types

### Dependencies
- `ProductTier` from `./billing-plan` - Enum for subscription tiers
- `BillingPrice` from `./billing-price` - Pricing structure interface

### Extensions
```typescript
// Extended types for specific use cases
export interface OrganizationWithStats extends Organization {
  stats: OrganizationRequestStats;
  apiKeyBreakdown: OrganizationRequestCountByApiKey[];
}

export interface OrganizationSummary extends Pick<Organization, 'id' | 'uuid' | 'name' | 'email'> {
  subscriptionStatus: Subscription['stripeSubscriptionStatus'] | 'none';
  requestCount: number;
}
```

## Integration Points

### Services
- **OrganizationService**: CRUD operations and business logic
- **BillingService**: Subscription management and Stripe integration
- **AnalyticsService**: Request tracking and statistics

### Components
- **OrganizationDashboard**: Main organization management interface
- **SubscriptionManager**: Billing and subscription controls
- **UsageAnalytics**: Request statistics and API key management

### API Endpoints
- `GET /api/organizations` - List organizations
- `GET /api/organizations/:id` - Get organization details
- `PUT /api/organizations/:id` - Update organization
- `GET /api/organizations/:id/stats` - Get usage statistics

## Validation

### Zod Schemas

```typescript
import { z } from 'zod';

export const SubscriptionSchema = z.object({
  stripeSubscriptionStatus: z.enum([
    'incomplete',
    'incomplete_expired', 
    'trialing',
    'active',
    'past_due',
    'canceled',
    'unpaid',
    'paused'
  ]),
  cancelAt: z.string().datetime().nullable(),
  trialExpiresAt: z.string().datetime().nullable(),
  nextPaymentAt: z.string().datetime().nullable(),
  billingPrices: z.array(BillingPriceSchema)
});

export const OrganizationSchema = z.object({
  id: z.number().positive(),
  uuid: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  stripeId: z.string().nullable(),
  name: z.string().min(1).max(255),
  email: z.string().email(),
  timezoneOffsetSeconds: z.number().int().min(-86400).max(86400).nullable(),
  trialedTiers: z.array(z.nativeEnum(ProductTier)),
  subscription: SubscriptionSchema.nullable(),
  tracking: z.object({
    numRequests: z.number().nonnegative(),
    since: z.string().datetime(),
    lastMadeAt: z.string().datetime().nullable()
  }).nullable()
});
```

## Best Practices

### 1. Strict Typing Adherence
- ✅ All properties explicitly typed with no `any` usage
- ✅ Union types used for Stripe subscription statuses
- ✅ Proper null handling for optional relationships

### 2. Interface Design
- ✅ Interfaces used consistently over type aliases
- ✅ Clear separation of concerns between domain objects
- ✅ Composition over inheritance (RequestTracking as separate interface)

### 3. Null Safety
```typescript
// Always check for null subscriptions
function getNextPaymentDate(org: Organization): Date | null {
  return org.subscription?.nextPaymentAt 
    ? new Date(org.subscription.nextPaymentAt) 
    : null;
}

// Use optional chaining for nested properties
function getRequestCount(org: Organization): number {
  return org.tracking?.numRequests ?? 0;
}
```

### 4. Deprecation Handling
- The `trialExpiresAt` field is marked as deprecated
- Consider migration strategy for removing deprecated fields
- Use TypeScript's `@deprecated` JSDoc tag for tooling support

### 5. Date Handling
- All dates stored as ISO 8601 strings for serialization safety
- Convert to Date objects only when needed for calculations
- Consider using utility types for date string validation