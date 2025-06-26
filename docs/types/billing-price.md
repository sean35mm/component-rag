# BillingPrice Type Definition

## Purpose

The `BillingPrice` type represents the pricing model for billing plans within the application. It defines the structure for recurring billing intervals and pricing details, serving as a core domain object for subscription-based pricing systems. This type encapsulates the relationship between billing frequency, amount, and associated billing plans.

## Type Definition

```typescript
import { BillingPlan } from './billing-plan';

export const enum BillingPriceInterval {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  YEAR = 'YEAR',
}

export interface BillingPrice {
  id: number;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  interval: BillingPriceInterval;
  intervalCount: number;
  amount: number;
  billingPlan: BillingPlan;
}
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `number` | ✅ | Unique identifier for the billing price record |
| `createdAt` | `string` | ✅ | ISO 8601 timestamp of when the price was created |
| `updatedAt` | `string` | ✅ | ISO 8601 timestamp of the last update |
| `active` | `boolean` | ✅ | Whether this price is currently active and available |
| `interval` | `BillingPriceInterval` | ✅ | The billing frequency unit (DAY, WEEK, MONTH, YEAR) |
| `intervalCount` | `number` | ✅ | The number of intervals between charges (e.g., 2 for bi-weekly) |
| `amount` | `number` | ✅ | The price amount in the smallest currency unit (cents) |
| `billingPlan` | `BillingPlan` | ✅ | The associated billing plan object |

## Usage Examples

### Basic Usage

```typescript
import { BillingPrice, BillingPriceInterval } from '@/lib/types/billing-price';

// Example billing price for a monthly subscription
const monthlyPrice: BillingPrice = {
  id: 1,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  active: true,
  interval: BillingPriceInterval.MONTH,
  intervalCount: 1,
  amount: 2999, // $29.99 in cents
  billingPlan: {
    // BillingPlan properties...
  }
};

// Quarterly billing example
const quarterlyPrice: BillingPrice = {
  id: 2,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  active: true,
  interval: BillingPriceInterval.MONTH,
  intervalCount: 3, // Every 3 months
  amount: 7999, // $79.99 in cents
  billingPlan: {
    // BillingPlan properties...
  }
};
```

### Component Usage

```typescript
import React from 'react';
import { BillingPrice, BillingPriceInterval } from '@/lib/types/billing-price';

interface PricingCardProps {
  price: BillingPrice;
}

const PricingCard: React.FC<PricingCardProps> = ({ price }) => {
  const formatPrice = (amount: number): string => {
    return (amount / 100).toFixed(2);
  };

  const getIntervalText = (interval: BillingPriceInterval, count: number): string => {
    const unit = interval.toLowerCase();
    return count === 1 ? unit : `${count} ${unit}s`;
  };

  return (
    <div className="pricing-card">
      <h3>{price.billingPlan.name}</h3>
      <div className="price">
        ${formatPrice(price.amount)} / {getIntervalText(price.interval, price.intervalCount)}
      </div>
      {!price.active && <span className="inactive">Inactive</span>}
    </div>
  );
};
```

### Service Layer Usage

```typescript
import { BillingPrice, BillingPriceInterval } from '@/lib/types/billing-price';

class BillingService {
  async getActivePrices(): Promise<BillingPrice[]> {
    const response = await fetch('/api/billing/prices?active=true');
    const prices: BillingPrice[] = await response.json();
    return prices.filter(price => price.active);
  }

  calculateAnnualSavings(monthlyPrice: BillingPrice, annualPrice: BillingPrice): number {
    if (monthlyPrice.interval !== BillingPriceInterval.MONTH || 
        annualPrice.interval !== BillingPriceInterval.YEAR) {
      throw new Error('Invalid price intervals for annual savings calculation');
    }
    
    const annualMonthlyEquivalent = monthlyPrice.amount * 12;
    return annualMonthlyEquivalent - annualPrice.amount;
  }
}
```

## Type Architecture Pattern

Following our domain-driven type architecture:

### 1. Domain Object (Current)
```typescript
// Core domain representation
interface BillingPrice {
  id: number;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  interval: BillingPriceInterval;
  intervalCount: number;
  amount: number;
  billingPlan: BillingPlan;
}
```

### 2. Response Types
```typescript
// API response shapes
interface BillingPriceResponse {
  success: boolean;
  data: BillingPrice[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
}

interface BillingPriceDetailResponse {
  success: boolean;
  data: BillingPrice;
}
```

### 3. Request Types
```typescript
// API request shapes
interface CreateBillingPriceRequest {
  interval: BillingPriceInterval;
  intervalCount: number;
  amount: number;
  billingPlanId: number;
  active?: boolean;
}

interface UpdateBillingPriceRequest extends Partial<CreateBillingPriceRequest> {
  id: number;
}

interface BillingPriceFilters {
  active?: boolean;
  interval?: BillingPriceInterval;
  planId?: number;
  minAmount?: number;
  maxAmount?: number;
}
```

## Related Types

### Extending Types
```typescript
// Utility types for specific use cases
type ActiveBillingPrice = BillingPrice & { active: true };
type BillingPriceUpdate = Omit<BillingPrice, 'id' | 'createdAt' | 'updatedAt'>;
type BillingPriceSummary = Pick<BillingPrice, 'id' | 'amount' | 'interval' | 'intervalCount'>;

// Computed types
interface BillingPriceWithCalculations extends BillingPrice {
  formattedAmount: string;
  intervalText: string;
  annualEquivalent?: number;
}
```

### Composed Types
```typescript
interface SubscriptionPricing {
  currentPrice: BillingPrice;
  availablePrices: BillingPrice[];
  recommendedPrice?: BillingPrice;
}

interface PricingComparison {
  monthly: BillingPrice;
  annual: BillingPrice;
  savings: number;
  savingsPercentage: number;
}
```

## Integration Points

### Services
- `BillingService` - CRUD operations for billing prices
- `SubscriptionService` - Managing subscription pricing
- `PaymentService` - Processing payments with price information

### Components
- `PricingTable` - Displaying available pricing options
- `SubscriptionForm` - Price selection during signup
- `BillingSettings` - Admin interface for price management

### API Endpoints
- `GET /api/billing/prices` - List all prices
- `POST /api/billing/prices` - Create new price
- `PUT /api/billing/prices/:id` - Update existing price
- `DELETE /api/billing/prices/:id` - Deactivate price

## Validation

### Zod Schema
```typescript
import { z } from 'zod';

export const BillingPriceIntervalSchema = z.enum(['DAY', 'WEEK', 'MONTH', 'YEAR']);

export const BillingPriceSchema = z.object({
  id: z.number().positive(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  active: z.boolean(),
  interval: BillingPriceIntervalSchema,
  intervalCount: z.number().positive().max(365), // Reasonable upper limit
  amount: z.number().nonnegative(), // Allow free plans
  billingPlan: z.object({
    // BillingPlan schema properties
  })
});

export const CreateBillingPriceSchema = BillingPriceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

// Validation helpers
export const validateBillingPrice = (data: unknown): BillingPrice => {
  return BillingPriceSchema.parse(data);
};
```

### Runtime Validation
```typescript
function isValidBillingInterval(interval: string): interval is BillingPriceInterval {
  return Object.values(BillingPriceInterval).includes(interval as BillingPriceInterval);
}

function validatePriceAmount(amount: number): boolean {
  return amount >= 0 && amount <= 1000000; // $10,000 max
}
```

## Best Practices

### 1. Strict Typing Compliance
- ✅ Uses `interface` for object shapes
- ✅ Uses `const enum` for reusable interval values
- ✅ Avoids `any` type usage
- ✅ Leverages utility types for derived types

### 2. Type Safety Patterns
```typescript
// Type guards for runtime safety
function isBillingPrice(obj: unknown): obj is BillingPrice {
  return typeof obj === 'object' && 
         obj !== null && 
         'id' in obj && 
         'interval' in obj && 
         'amount' in obj;
}

// Discriminated unions for price types
type PriceStatus = 
  | { active: true; price: BillingPrice }
  | { active: false; reason: string };
```

### 3. Domain-Driven Design
- Represents core business concept clearly
- Maintains referential integrity with `BillingPlan`
- Supports flexible billing intervals and amounts
- Enables complex pricing strategies

### 4. API Design Consistency
```typescript
// Consistent error handling
interface BillingPriceError {
  code: 'INVALID_INTERVAL' | 'NEGATIVE_AMOUNT' | 'PLAN_NOT_FOUND';
  message: string;
  field?: keyof BillingPrice;
}

// Standardized response format
interface BillingPriceApiResponse<T = BillingPrice> {
  success: boolean;
  data?: T;
  error?: BillingPriceError;
}
```

This type definition follows our strict typing guidelines and provides a robust foundation for billing and subscription management within the application.