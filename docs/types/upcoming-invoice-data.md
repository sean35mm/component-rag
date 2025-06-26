# UpcomingInvoiceData Type Definition

## Purpose

The `UpcomingInvoiceData` type represents billing information for an upcoming invoice in a subscription-based application. It encapsulates the financial details of pending charges, billing schedule information, and the nature of subscription changes. This type serves as a domain object for handling invoice preview data, typically used in billing confirmations, subscription upgrade/downgrade flows, and payment preview screens.

## Type Definition

### Core Interface

```typescript
export interface UpcomingInvoiceData {
  amountDueToday: string;
  amountDueNextBillingPeriod: string;
  nextBillingPeriodInvoiceAt: string;
  changeType: UpcomingInvoiceChangeType;
}
```

### Change Type Enum

```typescript
export const enum UpcomingInvoiceChangeType {
  UPGRADE = 'UPGRADE',
  DOWNGRADE = 'DOWNGRADE',
  NOOP = 'NOOP',
}
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `amountDueToday` | `string` | ✅ | Monetary amount due immediately for the current billing period or prorated charges |
| `amountDueNextBillingPeriod` | `string` | ✅ | Monetary amount that will be charged in the next billing cycle |
| `nextBillingPeriodInvoiceAt` | `string` | ✅ | ISO date string indicating when the next billing period begins |
| `changeType` | `UpcomingInvoiceChangeType` | ✅ | Enum indicating the type of subscription change being applied |

### UpcomingInvoiceChangeType Values

| Value | Description |
|-------|-------------|
| `UPGRADE` | User is upgrading to a higher-tier plan or adding features |
| `DOWNGRADE` | User is downgrading to a lower-tier plan or removing features |
| `NOOP` | No operation - no changes to the current subscription |

## Usage Examples

### Basic Usage in Components

```typescript
import { UpcomingInvoiceData, UpcomingInvoiceChangeType } from '@/lib/types/upcoming-invoice-data';

interface BillingPreviewProps {
  invoiceData: UpcomingInvoiceData;
}

const BillingPreview: React.FC<BillingPreviewProps> = ({ invoiceData }) => {
  const formatAmount = (amount: string) => `$${parseFloat(amount).toFixed(2)}`;
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();

  return (
    <div className="billing-preview">
      <h3>Billing Summary</h3>
      
      {parseFloat(invoiceData.amountDueToday) > 0 && (
        <div className="immediate-charge">
          <span>Due Today: {formatAmount(invoiceData.amountDueToday)}</span>
        </div>
      )}
      
      <div className="next-billing">
        <span>Next Billing ({formatDate(invoiceData.nextBillingPeriodInvoiceAt)}): </span>
        <span>{formatAmount(invoiceData.amountDueNextBillingPeriod)}</span>
      </div>
      
      <div className={`change-indicator ${invoiceData.changeType.toLowerCase()}`}>
        {invoiceData.changeType === UpcomingInvoiceChangeType.UPGRADE && '↗️ Upgrading'}
        {invoiceData.changeType === UpcomingInvoiceChangeType.DOWNGRADE && '↘️ Downgrading'}
        {invoiceData.changeType === UpcomingInvoiceChangeType.NOOP && '→ No Changes'}
      </div>
    </div>
  );
};
```

### Service Layer Integration

```typescript
import { UpcomingInvoiceData } from '@/lib/types/upcoming-invoice-data';

interface SubscriptionService {
  getUpcomingInvoice(subscriptionId: string): Promise<UpcomingInvoiceData>;
  previewPlanChange(subscriptionId: string, newPlanId: string): Promise<UpcomingInvoiceData>;
}

class BillingService implements SubscriptionService {
  async getUpcomingInvoice(subscriptionId: string): Promise<UpcomingInvoiceData> {
    const response = await fetch(`/api/subscriptions/${subscriptionId}/upcoming-invoice`);
    return response.json() as UpcomingInvoiceData;
  }

  async previewPlanChange(subscriptionId: string, newPlanId: string): Promise<UpcomingInvoiceData> {
    const response = await fetch(`/api/subscriptions/${subscriptionId}/preview-change`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ planId: newPlanId }),
    });
    return response.json() as UpcomingInvoiceData;
  }
}
```

### Utility Types and Transformations

```typescript
import { UpcomingInvoiceData, UpcomingInvoiceChangeType } from '@/lib/types/upcoming-invoice-data';

// Create a partial type for optional invoice updates
type PartialInvoiceData = Partial<UpcomingInvoiceData>;

// Extract only financial information
type InvoiceAmounts = Pick<UpcomingInvoiceData, 'amountDueToday' | 'amountDueNextBillingPeriod'>;

// Omit change type for simple billing display
type SimpleBillingInfo = Omit<UpcomingInvoiceData, 'changeType'>;

// Utility function with type guards
const hasImmediateCharge = (invoice: UpcomingInvoiceData): boolean => {
  return parseFloat(invoice.amountDueToday) > 0;
};

const isUpgrade = (invoice: UpcomingInvoiceData): boolean => {
  return invoice.changeType === UpcomingInvoiceChangeType.UPGRADE;
};
```

## Type Architecture Pattern

Following our **domain objects → response types → request types** pattern:

### 1. Domain Object (Current)
```typescript
// Core domain representation
export interface UpcomingInvoiceData {
  amountDueToday: string;
  amountDueNextBillingPeriod: string;
  nextBillingPeriodInvoiceAt: string;
  changeType: UpcomingInvoiceChangeType;
}
```

### 2. API Response Types (Extended)
```typescript
// API response wrapper
interface UpcomingInvoiceResponse {
  data: UpcomingInvoiceData;
  metadata: {
    currency: string;
    timezone: string;
    generatedAt: string;
  };
}

// Stripe-specific response mapping
interface StripeUpcomingInvoiceResponse {
  upcoming_invoice: {
    amount_due: number;
    next_payment_attempt: number;
    // ... other Stripe fields
  };
}
```

### 3. Request Types (Derived)
```typescript
// Request for invoice preview
interface InvoicePreviewRequest {
  subscriptionId: string;
  planId?: string;
  quantity?: number;
  couponId?: string;
}

// Plan change preview request
interface PlanChangePreviewRequest extends Pick<InvoicePreviewRequest, 'subscriptionId'> {
  newPlanId: string;
  effectiveDate?: string;
}
```

## Related Types

### Composition Types
```typescript
// Subscription with upcoming invoice
interface SubscriptionWithInvoice {
  subscription: Subscription;
  upcomingInvoice: UpcomingInvoiceData;
}

// Billing summary combining multiple invoices
interface BillingSummary {
  currentInvoice?: UpcomingInvoiceData;
  pendingChanges: UpcomingInvoiceData[];
  paymentMethod: PaymentMethod;
}
```

### Extension Types
```typescript
// Enhanced invoice data with calculations
interface EnhancedInvoiceData extends UpcomingInvoiceData {
  prorationAmount: string;
  taxAmount: string;
  discountAmount: string;
  subtotal: string;
}
```

## Integration Points

### Components
- `BillingPreview` - Displays upcoming charges
- `PlanUpgradeModal` - Shows cost implications of plan changes
- `SubscriptionSettings` - Billing information display
- `CheckoutConfirmation` - Final billing review

### Services
- `BillingService` - Fetches and processes invoice data
- `SubscriptionService` - Manages subscription changes
- `PaymentService` - Processes payments based on invoice data

### API Endpoints
- `GET /api/subscriptions/:id/upcoming-invoice`
- `POST /api/subscriptions/:id/preview-change`
- `POST /api/billing/calculate-proration`

## Validation

### Zod Schema
```typescript
import { z } from 'zod';

const UpcomingInvoiceChangeTypeSchema = z.enum(['UPGRADE', 'DOWNGRADE', 'NOOP']);

const UpcomingInvoiceDataSchema = z.object({
  amountDueToday: z.string().regex(/^\d+(\.\d{2})?$/, 'Invalid monetary format'),
  amountDueNextBillingPeriod: z.string().regex(/^\d+(\.\d{2})?$/, 'Invalid monetary format'),
  nextBillingPeriodInvoiceAt: z.string().datetime('Invalid ISO date format'),
  changeType: UpcomingInvoiceChangeTypeSchema,
});

// Runtime validation function
export const validateUpcomingInvoiceData = (data: unknown): UpcomingInvoiceData => {
  return UpcomingInvoiceDataSchema.parse(data);
};

// Type-safe validation with error handling
export const safeParseUpcomingInvoiceData = (data: unknown) => {
  return UpcomingInvoiceDataSchema.safeParse(data);
};
```

### Custom Validation Utilities
```typescript
const isValidMonetaryAmount = (amount: string): boolean => {
  const parsed = parseFloat(amount);
  return !isNaN(parsed) && parsed >= 0 && /^\d+(\.\d{2})?$/.test(amount);
};

const isValidFutureDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime()) && date > new Date();
};
```

## Best Practices

### ✅ Adherence to Guidelines

1. **Strict Typing**: All properties are strictly typed with no `any` usage
2. **Interface Usage**: Uses `interface` for the main object shape
3. **Enum Usage**: Employs `const enum` for reusable change type values
4. **Utility Types**: Examples demonstrate `Pick`, `Omit`, and `Partial` usage

### 📝 Recommended Patterns

```typescript
// ✅ Good: Type-safe amount parsing
const parseAmount = (amount: string): number => {
  const parsed = parseFloat(amount);
  if (isNaN(parsed)) throw new Error(`Invalid amount: ${amount}`);
  return parsed;
};

// ✅ Good: Discriminated union for enhanced type safety
type InvoiceWithStatus = UpcomingInvoiceData & {
  status: 'pending' | 'confirmed' | 'processing';
};

// ✅ Good: Readonly for immutable invoice data
type ReadonlyInvoiceData = Readonly<UpcomingInvoiceData>;

// ❌ Avoid: Loose typing
// const processInvoice = (data: any) => { ... }

// ❌ Avoid: Mutation of invoice data
// invoice.amountDueToday = newAmount;
```

### 🔧 Type Safety Enhancements

```typescript
// Branded types for enhanced type safety
type MonetaryAmount = string & { readonly _brand: 'MonetaryAmount' };
type ISODateString = string & { readonly _brand: 'ISODateString' };

interface StrictUpcomingInvoiceData {
  amountDueToday: MonetaryAmount;
  amountDueNextBillingPeriod: MonetaryAmount;
  nextBillingPeriodInvoiceAt: ISODateString;
  changeType: UpcomingInvoiceChangeType;
}
```

This type definition exemplifies our commitment to strict typing while providing practical functionality for billing and subscription management workflows.