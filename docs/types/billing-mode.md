# BillingMode Type Documentation

## Purpose

The `BillingMode` enum defines the available billing cycle options for subscription-based services within the application. This type ensures type safety when handling billing frequency selections, payment processing, and subscription management across the platform.

## Type Definition

```typescript
export const enum BillingMode {
  MONTHLY = 'Monthly',
  YEARLY = 'Yearly',
}
```

### Enum Analysis

- **Type**: `const enum` (compile-time constant for better performance)
- **Values**: String literals for human-readable serialization
- **Immutable**: Enum values cannot be modified at runtime

## Properties

| Property | Value | Type | Description |
|----------|-------|------|-------------|
| `MONTHLY` | `'Monthly'` | `string` | Monthly billing cycle (recurring every month) |
| `YEARLY` | `'Yearly'` | `string` | Annual billing cycle (recurring every year) |

## Usage Examples

### Basic Usage

```typescript
import { BillingMode } from '@/lib/types/billing-mode';

// Function parameter typing
function calculatePrice(mode: BillingMode, basePrice: number): number {
  switch (mode) {
    case BillingMode.MONTHLY:
      return basePrice;
    case BillingMode.YEARLY:
      return basePrice * 10; // 2 months free
    default:
      throw new Error('Invalid billing mode');
  }
}

// Usage in components
const selectedMode: BillingMode = BillingMode.YEARLY;
const price = calculatePrice(selectedMode, 29.99);
```

### React Component Integration

```typescript
import { useState } from 'react';
import { BillingMode } from '@/lib/types/billing-mode';

interface BillingToggleProps {
  onModeChange: (mode: BillingMode) => void;
  defaultMode?: BillingMode;
}

export function BillingToggle({ onModeChange, defaultMode = BillingMode.MONTHLY }: BillingToggleProps) {
  const [selectedMode, setSelectedMode] = useState<BillingMode>(defaultMode);

  const handleModeChange = (mode: BillingMode) => {
    setSelectedMode(mode);
    onModeChange(mode);
  };

  return (
    <div className="billing-toggle">
      {Object.values(BillingMode).map((mode) => (
        <button
          key={mode}
          onClick={() => handleModeChange(mode)}
          className={selectedMode === mode ? 'active' : ''}
        >
          {mode}
        </button>
      ))}
    </div>
  );
}
```

### API Request/Response Usage

```typescript
import { BillingMode } from '@/lib/types/billing-mode';

// Request type
interface CreateSubscriptionRequest {
  planId: string;
  billingMode: BillingMode;
  paymentMethodId: string;
}

// Response type
interface SubscriptionResponse {
  id: string;
  status: 'active' | 'pending' | 'cancelled';
  billingMode: BillingMode;
  nextBillingDate: string;
  amount: number;
}

// Service function
async function createSubscription(request: CreateSubscriptionRequest): Promise<SubscriptionResponse> {
  const response = await fetch('/api/subscriptions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  
  return response.json();
}
```

## Type Architecture Pattern

### Domain Object Foundation

```typescript
// Domain: Core billing mode enum (current implementation)
export const enum BillingMode {
  MONTHLY = 'Monthly',
  YEARLY = 'Yearly',
}

// Domain: Extended billing information
interface BillingCycle {
  mode: BillingMode;
  intervalCount: number;
  trialDays?: number;
}
```

### Response Types

```typescript
// API Response shapes
interface PricingResponse {
  plans: Array<{
    id: string;
    name: string;
    pricing: Record<BillingMode, {
      amount: number;
      currency: string;
      discountPercentage?: number;
    }>;
  }>;
}

interface SubscriptionDetailsResponse {
  subscription: {
    id: string;
    billingMode: BillingMode;
    currentPeriodStart: string;
    currentPeriodEnd: string;
  };
}
```

### Request Types

```typescript
// API Request shapes
interface UpdateBillingModeRequest {
  subscriptionId: string;
  newBillingMode: BillingMode;
  prorationBehavior: 'immediate' | 'next_cycle';
}

interface PricingCalculationRequest {
  planId: string;
  billingMode: BillingMode;
  couponCode?: string;
}
```

## Related Types

### Extending Types

```typescript
// Subscription management
interface Subscription {
  id: string;
  billingMode: BillingMode;
  status: 'active' | 'cancelled' | 'past_due';
  plan: {
    id: string;
    name: string;
  };
}

// Pricing structures
interface PricingTier {
  planId: string;
  billingOptions: Record<BillingMode, {
    price: number;
    currency: string;
    savings?: string; // e.g., "Save 20%"
  }>;
}

// Payment processing
interface PaymentIntent {
  amount: number;
  currency: string;
  billingMode: BillingMode;
  metadata: {
    planId: string;
    userId: string;
  };
}
```

### Utility Types

```typescript
// Create arrays of billing modes
type BillingModeArray = Array<BillingMode>;

// Create objects with billing mode keys
type BillingModeConfig<T> = Record<BillingMode, T>;

// Example usage
const discountRates: BillingModeConfig<number> = {
  [BillingMode.MONTHLY]: 0,
  [BillingMode.YEARLY]: 0.2, // 20% discount
};
```

## Integration Points

### Services Layer

```typescript
// pricing.service.ts
export class PricingService {
  static calculateDiscount(billingMode: BillingMode): number {
    return billingMode === BillingMode.YEARLY ? 0.2 : 0;
  }
  
  static formatBillingPeriod(mode: BillingMode): string {
    return mode === BillingMode.MONTHLY ? 'month' : 'year';
  }
}

// subscription.service.ts
export class SubscriptionService {
  static async changeBillingMode(
    subscriptionId: string, 
    newMode: BillingMode
  ): Promise<void> {
    // Implementation
  }
}
```

### State Management

```typescript
// Redux/Zustand store
interface BillingState {
  selectedMode: BillingMode;
  availableModes: BillingMode[];
  pricing: Record<BillingMode, number>;
}

// Actions
type BillingAction = 
  | { type: 'SET_BILLING_MODE'; payload: BillingMode }
  | { type: 'LOAD_PRICING'; payload: Record<BillingMode, number> };
```

### Database Models

```typescript
// Prisma schema representation
interface DbSubscription {
  id: string;
  userId: string;
  planId: string;
  billingMode: BillingMode;
  createdAt: Date;
  updatedAt: Date;
}
```

## Validation

### Zod Schema

```typescript
import { z } from 'zod';
import { BillingMode } from '@/lib/types/billing-mode';

// Enum validation
export const BillingModeSchema = z.nativeEnum(BillingMode);

// Usage in request validation
export const CreateSubscriptionSchema = z.object({
  planId: z.string().uuid(),
  billingMode: BillingModeSchema,
  paymentMethodId: z.string(),
});

// Type inference
type CreateSubscriptionInput = z.infer<typeof CreateSubscriptionSchema>;

// Validation function
export function validateBillingMode(value: unknown): BillingMode {
  return BillingModeSchema.parse(value);
}

// Form validation
export const BillingFormSchema = z.object({
  billingMode: BillingModeSchema,
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  }),
});
```

### Runtime Type Guards

```typescript
export function isBillingMode(value: unknown): value is BillingMode {
  return typeof value === 'string' && 
         Object.values(BillingMode).includes(value as BillingMode);
}

export function assertBillingMode(value: unknown): asserts value is BillingMode {
  if (!isBillingMode(value)) {
    throw new Error(`Invalid billing mode: ${value}`);
  }
}
```

## Best Practices

### ✅ Recommended Patterns

```typescript
// 1. Use enum values directly in switch statements
function getBillingDescription(mode: BillingMode): string {
  switch (mode) {
    case BillingMode.MONTHLY:
      return 'Billed monthly';
    case BillingMode.YEARLY:
      return 'Billed annually';
    default:
      // TypeScript ensures exhaustiveness
      const _exhaustive: never = mode;
      throw new Error(`Unhandled billing mode: ${_exhaustive}`);
  }
}

// 2. Use const enum for performance
// (Already implemented correctly)

// 3. Leverage Record for mapping
const billingIntervals: Record<BillingMode, number> = {
  [BillingMode.MONTHLY]: 1,
  [BillingMode.YEARLY]: 12,
};

// 4. Type-safe iteration
const allModes = Object.values(BillingMode) as BillingMode[];
```

### ❌ Anti-patterns to Avoid

```typescript
// Don't use string literals directly
// Bad
const mode = 'Monthly'; // Type is string, not BillingMode

// Good
const mode = BillingMode.MONTHLY; // Type is BillingMode

// Don't bypass type checking
// Bad
const mode = 'Invalid' as BillingMode;

// Good
const mode = validateBillingMode(userInput);
```

### Guidelines Adherence

1. **Strict Typing**: ✅ Uses const enum for compile-time type safety
2. **Enums for Reusable Values**: ✅ Perfect use case for billing modes across the application
3. **No 'any' Usage**: ✅ All types are strictly defined
4. **Domain-First Architecture**: ✅ Core enum serves as foundation for related types
5. **Utility Type Integration**: ✅ Works seamlessly with Record, Array, and other utility types

This enum serves as a foundational type in our billing domain, ensuring type safety while maintaining flexibility for future billing mode additions.