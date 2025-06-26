# OrganizationTrial Type Documentation

## Purpose

The `OrganizationTrial` interface represents a trial period for an organization's subscription to a billing plan. It serves as a domain object that tracks the lifecycle of trial subscriptions, including timing, pricing, and organizational associations. This type is central to managing free trial periods, billing transitions, and subscription state management within the application.

## Type Definition

```typescript
export interface OrganizationTrial {
  id: number;
  createdAt: string;
  updatedAt: string;
  billingPrice: BillingPrice;
  organization: Organization;
  startsAt: string;
  endsAt: string;
}
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `number` | ✅ | Unique identifier for the trial record |
| `createdAt` | `string` | ✅ | ISO 8601 timestamp when the trial record was created |
| `updatedAt` | `string` | ✅ | ISO 8601 timestamp when the trial was last modified |
| `billingPrice` | `BillingPrice` | ✅ | Associated pricing plan for the trial period |
| `organization` | `Organization` | ✅ | Organization entity that owns this trial |
| `startsAt` | `string` | ✅ | ISO 8601 timestamp when the trial period begins |
| `endsAt` | `string` | ✅ | ISO 8601 timestamp when the trial period expires |

## Usage Examples

### Basic Trial Display Component

```typescript
import { OrganizationTrial } from '@/lib/types/organization-trial';

interface TrialStatusProps {
  trial: OrganizationTrial;
}

export function TrialStatus({ trial }: TrialStatusProps) {
  const isExpired = new Date(trial.endsAt) < new Date();
  const daysRemaining = Math.ceil(
    (new Date(trial.endsAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="trial-status">
      <h3>{trial.organization.name} Trial</h3>
      <p>Plan: {trial.billingPrice.name}</p>
      <p>Status: {isExpired ? 'Expired' : `${daysRemaining} days remaining`}</p>
      <p>Ends: {new Date(trial.endsAt).toLocaleDateString()}</p>
    </div>
  );
}
```

### Trial Service Functions

```typescript
import { OrganizationTrial } from '@/lib/types/organization-trial';

// Service function to check trial status
export function getTrialStatus(trial: OrganizationTrial): 'active' | 'expired' | 'ending-soon' {
  const now = new Date();
  const endDate = new Date(trial.endsAt);
  const daysRemaining = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (endDate < now) return 'expired';
  if (daysRemaining <= 3) return 'ending-soon';
  return 'active';
}

// Helper function to calculate trial duration
export function getTrialDuration(trial: OrganizationTrial): number {
  const start = new Date(trial.startsAt);
  const end = new Date(trial.endsAt);
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}
```

### Utility Type Usage

```typescript
import { OrganizationTrial } from '@/lib/types/organization-trial';

// For creating new trials (omitting auto-generated fields)
export type CreateTrialRequest = Omit<OrganizationTrial, 'id' | 'createdAt' | 'updatedAt'>;

// For updating trial dates
export type UpdateTrialDates = Pick<OrganizationTrial, 'id' | 'startsAt' | 'endsAt'>;

// For trial summary views (with nested object selections)
export type TrialSummary = Omit<OrganizationTrial, 'organization' | 'billingPrice'> & {
  organizationName: string;
  planName: string;
  planPrice: number;
};
```

## Type Architecture Pattern

Following our domain-first approach:

```typescript
// 1. Domain Object (Current)
export interface OrganizationTrial {
  id: number;
  createdAt: string;
  updatedAt: string;
  billingPrice: BillingPrice;
  organization: Organization;
  startsAt: string;
  endsAt: string;
}

// 2. API Response Types
export interface TrialResponse {
  data: OrganizationTrial;
  meta: {
    canExtend: boolean;
    gracePeriodDays: number;
  };
}

export interface TrialListResponse {
  data: OrganizationTrial[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}

// 3. Request Types
export interface CreateTrialRequest {
  organizationId: number;
  billingPriceId: number;
  startsAt: string;
  endsAt: string;
}

export interface ExtendTrialRequest {
  trialId: number;
  newEndsAt: string;
  reason?: string;
}
```

## Related Types

### Direct Dependencies
- **`BillingPrice`** - Pricing plan associated with the trial
- **`Organization`** - Organization entity that owns the trial

### Derived Types
- **`TrialSubscription`** - May extend this for subscription conversions
- **`BillingEvent`** - Trial events may reference this type
- **`AuditLog`** - Trial changes may be logged with this type

### Compositional Usage
```typescript
// Organization with active trial
export interface OrganizationWithTrial extends Organization {
  activeTrial?: OrganizationTrial;
}

// Billing context with trial information
export interface BillingContext {
  organization: Organization;
  currentTrial?: OrganizationTrial;
  availablePlans: BillingPrice[];
}
```

## Integration Points

### Services
- **`TrialService`** - CRUD operations for trial management
- **`BillingService`** - Trial to subscription conversions
- **`NotificationService`** - Trial expiration notifications
- **`AnalyticsService`** - Trial conversion tracking

### Components
- **`TrialBanner`** - Display trial status in app header
- **`BillingDashboard`** - Show trial details and upgrade options
- **`TrialExtensionForm`** - Allow trial period modifications
- **`TrialHistoryList`** - Display historical trial data

### Hooks
```typescript
// Custom hooks for trial management
export function useOrganizationTrial(orgId: number) {
  // Hook implementation
}

export function useTrialStatus(trial: OrganizationTrial) {
  // Hook implementation
}
```

## Validation

### Zod Schema

```typescript
import { z } from 'zod';

export const OrganizationTrialSchema = z.object({
  id: z.number().positive(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  billingPrice: BillingPriceSchema,
  organization: OrganizationSchema,
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime(),
}).refine(data => new Date(data.endsAt) > new Date(data.startsAt), {
  message: "Trial end date must be after start date",
  path: ["endsAt"]
});

// Request validation schemas
export const CreateTrialRequestSchema = OrganizationTrialSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  billingPrice: true,
  organization: true,
}).extend({
  organizationId: z.number().positive(),
  billingPriceId: z.number().positive(),
});
```

### Runtime Validation
```typescript
export function validateTrialDates(trial: OrganizationTrial): boolean {
  const start = new Date(trial.startsAt);
  const end = new Date(trial.endsAt);
  const now = new Date();
  
  return start < end && end > now;
}
```

## Best Practices

### 1. Strict Typing Adherence
```typescript
// ✅ Good - Strict typing with proper interfaces
interface TrialManagerProps {
  trial: OrganizationTrial;
  onExtend: (newEndDate: string) => Promise<void>;
  onConvert: (planId: number) => Promise<void>;
}

// ❌ Avoid - Loose typing
interface TrialManagerProps {
  trial: any;
  onExtend: Function;
  onConvert: Function;
}
```

### 2. Utility Type Usage
```typescript
// ✅ Good - Leverage utility types for derived interfaces
type TrialUpdateFields = Pick<OrganizationTrial, 'startsAt' | 'endsAt'>;
type TrialDisplay = Omit<OrganizationTrial, 'organization' | 'billingPrice'> & {
  organizationName: string;
  planName: string;
};

// ❌ Avoid - Redefining similar structures
interface TrialUpdateFields {
  startsAt: string;
  endsAt: string;
}
```

### 3. Domain-First Architecture
```typescript
// ✅ Good - Build from domain object
const trial: OrganizationTrial = fetchTrial(id);
const response: TrialResponse = { data: trial, meta: { canExtend: true } };

// ❌ Avoid - API-first approach
const apiData = fetchTrialData(id);
const trial = apiData.trial; // Loose coupling
```

### 4. Type Safety in Date Handling
```typescript
// ✅ Good - Proper date validation and typing
function isTrialActive(trial: OrganizationTrial): boolean {
  const now = new Date();
  const endDate = new Date(trial.endsAt);
  return endDate > now && !isNaN(endDate.getTime());
}

// ❌ Avoid - Unsafe date operations
function isTrialActive(trial: any): boolean {
  return trial.endsAt > Date.now(); // Type unsafe
}
```

This type serves as a foundational element in the billing and subscription management system, providing type safety and clear contracts for trial-related operations throughout the application.