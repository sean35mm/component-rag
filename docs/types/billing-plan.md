# Billing Plan Type Definitions

## Purpose

The billing plan type definitions provide a comprehensive type system for managing subscription plans, pricing tiers, and permission-based access control in the application. These types form the foundation for billing management, feature gating, and user access control across different product tiers.

## Type Definition

### Core Domain Types

```typescript
export const enum ProductTier {
  API = 'API',
  WORKSPACE = 'WORKSPACE',
  ENTERPRISE = 'ENTERPRISE',
}

export const enum BillingPlanScope {
  SIGN_UP = 'SIGN_UP',
  UPDATE = 'UPDATE',
}

export const enum PlatformUsageCategory {
  FREE = 'FREE',
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM',
}
```

### Base Domain Object

```typescript
export interface BillingPlan {
  id: number;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  name: string;
  description: string | null;
  trialSupported: boolean;
  requestLimit: number;
  requestRateLimit: number | null;
  paginationLimit: number | null;
  maxHistoricalDataLookupDays: number | null;
  custom: boolean;
  defaultSignUp: boolean;
  productTier: ProductTier | null;
}
```

### Composition Types

```typescript
export interface BillingPlanPricing {
  monthly: number;
  monthlyPriceId: number;
  yearly: number;
  yearlyPriceId: number;
}

export type PermissionMeta = 
  | PermissionBase<'CATEGORIES', 'Categories'>
  | PermissionBase<'CLUSTERS', 'Clusters'>
  // ... 26 total permission types
```

### Enhanced Domain Objects

```typescript
export interface BillingPlanWithDetails extends BillingPlan, WithPermissions {
  stripeId: string;
  scopes: BillingPlanScope[];
  platformUsageCategory: PlatformUsageCategory | null;
}

export type BillingPlanWithPricing = BillingPlan & WithPricing;
export type BillingPlanWithPricingAndPermissions = BillingPlanWithPricing & WithPermissions;
```

## Properties

### BillingPlan Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `number` | ✓ | Unique identifier for the billing plan |
| `createdAt` | `string` | ✓ | ISO 8601 timestamp of plan creation |
| `updatedAt` | `string` | ✓ | ISO 8601 timestamp of last update |
| `active` | `boolean` | ✓ | Whether the plan is currently active |
| `name` | `string` | ✓ | Human-readable plan name |
| `description` | `string \| null` | ✓ | Optional plan description |
| `trialSupported` | `boolean` | ✓ | Whether trial periods are supported |
| `requestLimit` | `number` | ✓ | Maximum API requests allowed |
| `requestRateLimit` | `number \| null` | ✓ | Rate limiting configuration |
| `paginationLimit` | `number \| null` | ✓ | Maximum pagination size |
| `maxHistoricalDataLookupDays` | `number \| null` | ✓ | Historical data access limit |
| `custom` | `boolean` | ✓ | Whether this is a custom enterprise plan |
| `defaultSignUp` | `boolean` | ✓ | Default plan for new signups |
| `productTier` | `ProductTier \| null` | ✓ | Associated product tier |

### BillingPlanPricing Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `monthly` | `number` | ✓ | Monthly price in cents |
| `monthlyPriceId` | `number` | ✓ | Stripe price ID for monthly billing |
| `yearly` | `number` | ✓ | Yearly price in cents |
| `yearlyPriceId` | `number` | ✓ | Stripe price ID for yearly billing |

### BillingPlanWithDetails Interface

Extends `BillingPlan` and `WithPermissions` with:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `stripeId` | `string` | ✓ | Stripe product identifier |
| `scopes` | `BillingPlanScope[]` | ✓ | Available plan scopes |
| `platformUsageCategory` | `PlatformUsageCategory \| null` | ✓ | Usage tier classification |
| `permissions` | `PermissionMeta['name'][]` | ✓ | Array of permission names |

## Usage Examples

### Basic Plan Display

```typescript
import { BillingPlan, ProductTier } from '@/lib/types/billing-plan';

interface PlanCardProps {
  plan: BillingPlan;
}

export function PlanCard({ plan }: PlanCardProps) {
  const isEnterprise = plan.productTier === ProductTier.ENTERPRISE;
  const hasUnlimitedRequests = plan.requestLimit === -1;
  
  return (
    <div className="plan-card">
      <h3>{plan.name}</h3>
      <p>{plan.description}</p>
      <div className="limits">
        <span>
          Requests: {hasUnlimitedRequests ? 'Unlimited' : plan.requestLimit.toLocaleString()}
        </span>
        {plan.trialSupported && <span>Trial Available</span>}
      </div>
    </div>
  );
}
```

### Pricing Display Component

```typescript
import { BillingPlanWithPricing } from '@/lib/types/billing-plan';

interface PricingDisplayProps {
  plan: BillingPlanWithPricing;
  billingCycle: 'monthly' | 'yearly';
}

export function PricingDisplay({ plan, billingCycle }: PricingDisplayProps) {
  const price = billingCycle === 'monthly' ? plan.pricing.monthly : plan.pricing.yearly;
  const priceInDollars = price / 100;
  
  return (
    <div className="pricing">
      <span className="amount">${priceInDollars}</span>
      <span className="cycle">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
    </div>
  );
}
```

### Permission-Based Feature Gating

```typescript
import { BillingPlanWithDetails, PermissionMeta } from '@/lib/types/billing-plan';

interface FeatureGateProps {
  userPlan: BillingPlanWithDetails;
  requiredPermission: PermissionMeta['name'];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function FeatureGate({ 
  userPlan, 
  requiredPermission, 
  children, 
  fallback 
}: FeatureGateProps) {
  const hasPermission = userPlan.permissions.includes(requiredPermission);
  
  if (!hasPermission) {
    return fallback || <div>Feature not available in your plan</div>;
  }
  
  return <>{children}</>;
}

// Usage
<FeatureGate 
  userPlan={currentPlan} 
  requiredPermission="HISTORICAL_NEWS"
>
  <HistoricalNewsComponent />
</FeatureGate>
```

### Plan Comparison Logic

```typescript
import { 
  BillingPlanWithPricingAndPermissions, 
  PlatformUsageCategory 
} from '@/lib/types/billing-plan';

function comparePlans(
  planA: BillingPlanWithPricingAndPermissions,
  planB: BillingPlanWithPricingAndPermissions
): number {
  const categoryOrder = {
    [PlatformUsageCategory.FREE]: 0,
    [PlatformUsageCategory.BASIC]: 1,
    [PlatformUsageCategory.PREMIUM]: 2,
  };
  
  // Compare by platform usage category first
  const categoryA = planA.platformUsageCategory ?? PlatformUsageCategory.FREE;
  const categoryB = planB.platformUsageCategory ?? PlatformUsageCategory.FREE;
  
  if (categoryOrder[categoryA] !== categoryOrder[categoryB]) {
    return categoryOrder[categoryA] - categoryOrder[categoryB];
  }
  
  // Then by monthly price
  return planA.pricing.monthly - planB.pricing.monthly;
}
```

## Type Architecture Pattern

This type definition follows our established pattern:

```
Domain Objects → Response Types → Request Types
      ↓              ↓              ↓
  BillingPlan → BillingPlanAPI → CreatePlanRequest
```

### 1. Domain Objects (Base)
- `BillingPlan` - Core domain entity
- `BillingPlanPricing` - Pricing value object
- `PermissionMeta` - Permission value object

### 2. Response Types (Enhanced)
- `BillingPlanWithDetails` - Full plan with Stripe integration
- `BillingPlanWithPricing` - Plan with pricing information
- `BillingPlanWithPricingAndPermissions` - Complete plan data

### 3. Composition Interfaces
- `WithPricing` - Mixin for pricing data
- `WithPermissions` - Mixin for permission data

## Related Types

### Direct Extensions
```typescript
// Extended in user context
interface UserSubscription {
  plan: BillingPlanWithDetails;
  subscriptionId: string;
  status: 'active' | 'canceled' | 'past_due';
}

// Used in API responses
interface PlansResponse {
  plans: BillingPlanWithPricingAndPermissions[];
  total: number;
}
```

### Utility Types
```typescript
// Plan selection
type SelectablePlan = Pick<BillingPlan, 'id' | 'name' | 'description'>;

// Plan limits
type PlanLimits = Pick<
  BillingPlan, 
  'requestLimit' | 'requestRateLimit' | 'paginationLimit'
>;

// Plan metadata
type PlanMeta = Omit<BillingPlan, 'id' | 'createdAt' | 'updatedAt'>;
```

## Integration Points

### Services
```typescript
// billing.service.ts
class BillingService {
  async getPlans(): Promise<BillingPlanWithPricingAndPermissions[]> {
    // Implementation
  }
  
  async subscribeToPlan(planId: number): Promise<BillingPlanWithDetails> {
    // Implementation
  }
}
```

### State Management
```typescript
// billing.store.ts
interface BillingState {
  currentPlan: BillingPlanWithDetails | null;
  availablePlans: BillingPlanWithPricingAndPermissions[];
  loading: boolean;
}
```

### API Layer
```typescript
// api/billing.ts
export const billingApi = {
  getPlans: (): Promise<BillingPlanWithPricingAndPermissions[]> =>
    fetch('/api/billing/plans').then(res => res.json()),
    
  getPlan: (id: number): Promise<BillingPlanWithDetails> =>
    fetch(`/api/billing/plans/${id}`).then(res => res.json()),
};
```

## Validation

### Zod Schemas
```typescript
import { z } from 'zod';

export const ProductTierSchema = z.nativeEnum(ProductTier);

export const BillingPlanSchema = z.object({
  id: z.number().positive(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  active: z.boolean(),
  name: z.string().min(1).max(100),
  description: z.string().nullable(),
  trialSupported: z.boolean(),
  requestLimit: z.number().int().min(-1), // -1 for unlimited
  requestRateLimit: z.number().int().positive().nullable(),
  paginationLimit: z.number().int().positive().nullable(),
  maxHistoricalDataLookupDays: z.number().int().positive().nullable(),
  custom: z.boolean(),
  defaultSignUp: z.boolean(),
  productTier: ProductTierSchema.nullable(),
});

export const BillingPlanPricingSchema = z.object({
  monthly: z.number().int().nonnegative(),
  monthlyPriceId: z.number().int().positive(),
  yearly: z.number().int().nonnegative(),
  yearlyPriceId: z.number().int().positive(),
});
```

### Runtime Validation
```typescript
export function validatePlan(data: unknown): BillingPlan {
  return BillingPlanSchema.parse(data);
}

export function isPremiumPlan(plan: BillingPlan): boolean {
  return plan.productTier === ProductTier.ENTERPRISE || 
         plan.requestLimit > 10000;
}
```

## Best Practices

### ✅ Recommended Patterns

1. **Use Composition Over Inheritance**
   ```typescript
   // Good: Composable mixins
   type BillingPlanWithPricing = BillingPlan & WithPricing;
   
   // Avoid: Deep inheritance hierarchies
   ```

2. **Leverage Discriminated Unions for Permissions**
   ```typescript
   // Good: Type-safe permission names
   type PermissionName = PermissionMeta['name'];
   
   // Avoid: String literals without type safety
   ```

3. **Use Enums for Reusable Values**
   ```typescript
   // Good: Enum for product tiers used across the app
   export const enum ProductTier {
     API = 'API',
     WORKSPACE = 'WORKSPACE',
     ENTERPRISE = 'ENTERPRISE',
   }
   ```

4. **Explicit Null Handling**
   ```typescript
   // Good: Explicit nullable types
   description: string | null;
   
   // Avoid: Optional properties for null values
   description?: string;
   ```

### 🚫 Anti-Patterns

1. **Avoid Any Types**
   ```typescript
   // Bad
   permissions: any[];
   
   // Good
   permissions: PermissionMeta['name'][];
   ```

2. **Don't Mutate Base Types**
   ```typescript
   // Bad
   interface BillingPlan {
     // ... existing properties
     pricing?: BillingPlanPricing; // Don't extend base
   }
   
   // Good
   type BillingPlanWithPricing = BillingPlan & WithPricing;
   ```

3. **Avoid Magic Numbers**
   ```typescript
   // Bad
   const isUnlimited = plan.requestLimit === -1;
   
   // Good
   const UNLIMITED_REQUESTS = -1;
   const isUnlimited = plan.requestLimit === UNLIMITED_REQUESTS;
   ```

### Type Safety Guidelines

1. **Always Use Type Guards**
   ```typescript
   function hasPermission(
     plan: BillingPlanWithDetails, 
     permission: PermissionMeta['name']
   ): boolean {
     return plan.permissions.includes(permission);
   }
   ```

2. **Prefer Readonly for Immutable Data**
   ```typescript
   interface ReadonlyBillingPlan {
     readonly id: number;
     readonly permissions: readonly PermissionMeta['name'][];
   }
   ```

3. **Use Branded Types for IDs**
   ```typescript
   type PlanId = number & { __brand: 'PlanId' };
   type StripeProductId = string & { __brand: 'StripeProductId' };
   ```