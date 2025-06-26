# OrganizationPaymentMethod Type Documentation

## Purpose

The `OrganizationPaymentMethod` interface defines the shape of payment method data for organizations, specifically handling Stripe payment method information. This type serves as a domain object for managing payment card details including identification, expiration, and display information while maintaining security by only storing non-sensitive card metadata.

## Type Definition

```typescript
export interface OrganizationPaymentMethod {
  stripeId: string;
  cardLast4: string;
  expMonth: number;
  expYear: number;
  brand: string;
}
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `stripeId` | `string` | ✅ | Unique Stripe payment method identifier for API operations |
| `cardLast4` | `string` | ✅ | Last four digits of the card number for display purposes |
| `expMonth` | `number` | ✅ | Card expiration month (1-12) |
| `expYear` | `number` | ✅ | Card expiration year (4-digit format) |
| `brand` | `string` | ✅ | Card brand/network (e.g., "visa", "mastercard", "amex") |

## Usage Examples

### Basic Usage in Components

```typescript
import { OrganizationPaymentMethod } from '@/lib/types/organization-payment-method';

// Display payment method in a component
function PaymentMethodCard({ paymentMethod }: { paymentMethod: OrganizationPaymentMethod }) {
  return (
    <div className="payment-card">
      <div className="brand">{paymentMethod.brand.toUpperCase()}</div>
      <div className="card-number">**** **** **** {paymentMethod.cardLast4}</div>
      <div className="expiry">
        {paymentMethod.expMonth.toString().padStart(2, '0')}/{paymentMethod.expYear}
      </div>
    </div>
  );
}
```

### Service Layer Integration

```typescript
import { OrganizationPaymentMethod } from '@/lib/types/organization-payment-method';

class PaymentService {
  async getOrganizationPaymentMethods(orgId: string): Promise<OrganizationPaymentMethod[]> {
    const response = await fetch(`/api/organizations/${orgId}/payment-methods`);
    return response.json();
  }

  async deletePaymentMethod(stripeId: string): Promise<void> {
    await fetch(`/api/payment-methods/${stripeId}`, {
      method: 'DELETE'
    });
  }
}
```

### Utility Functions

```typescript
import { OrganizationPaymentMethod } from '@/lib/types/organization-payment-method';

// Check if payment method is expired
export function isPaymentMethodExpired(paymentMethod: OrganizationPaymentMethod): boolean {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  
  return paymentMethod.expYear < currentYear || 
         (paymentMethod.expYear === currentYear && paymentMethod.expMonth < currentMonth);
}

// Format expiration date for display
export function formatExpirationDate(paymentMethod: OrganizationPaymentMethod): string {
  return `${paymentMethod.expMonth.toString().padStart(2, '0')}/${paymentMethod.expYear.toString().slice(-2)}`;
}
```

## Type Architecture Pattern

This type follows our **domain object → response types → request types** pattern:

### 1. Domain Object (Current)
```typescript
// Base domain representation
export interface OrganizationPaymentMethod {
  stripeId: string;
  cardLast4: string;
  expMonth: number;
  expYear: number;
  brand: string;
}
```

### 2. Response Types (Built from Domain)
```typescript
// API response wrapper
export interface PaymentMethodsResponse {
  data: OrganizationPaymentMethod[];
  hasMore: boolean;
  total: number;
}

// Single payment method response
export interface PaymentMethodResponse {
  paymentMethod: OrganizationPaymentMethod;
  isDefault: boolean;
  createdAt: string;
}
```

### 3. Request Types (Derived)
```typescript
// For updates (using utility types)
export interface UpdatePaymentMethodRequest {
  stripeId: string;
  isDefault?: boolean;
}

// For creation (Stripe handles the details)
export interface CreatePaymentMethodRequest {
  organizationId: string;
  stripePaymentMethodId: string;
}
```

## Related Types

### Extension Types
```typescript
// Extended with metadata
export interface PaymentMethodWithMetadata extends OrganizationPaymentMethod {
  isDefault: boolean;
  createdAt: Date;
  lastUsed?: Date;
}

// For form state
export interface PaymentMethodFormState {
  selectedMethod: OrganizationPaymentMethod | null;
  isLoading: boolean;
  error?: string;
}
```

### Utility Type Applications
```typescript
// For partial updates
type PaymentMethodUpdate = Partial<Pick<OrganizationPaymentMethod, 'expMonth' | 'expYear'>>;

// For display-only data
type PaymentMethodDisplay = Omit<OrganizationPaymentMethod, 'stripeId'>;

// For API keys
type PaymentMethodKeys = keyof OrganizationPaymentMethod;
```

## Integration Points

### Components
- `PaymentMethodCard` - Display individual payment methods
- `PaymentMethodSelector` - Choose from available methods
- `BillingSettings` - Manage organization payment methods
- `SubscriptionUpgrade` - Select payment method for upgrades

### Services
- `PaymentService` - CRUD operations for payment methods
- `StripeService` - Integration with Stripe API
- `BillingService` - Subscription and invoice management

### API Routes
- `GET /api/organizations/:id/payment-methods`
- `POST /api/organizations/:id/payment-methods`
- `DELETE /api/payment-methods/:stripeId`
- `PUT /api/payment-methods/:stripeId/default`

## Validation

### Zod Schema
```typescript
import { z } from 'zod';

export const OrganizationPaymentMethodSchema = z.object({
  stripeId: z.string().min(1, 'Stripe ID is required'),
  cardLast4: z.string().length(4, 'Card last 4 must be exactly 4 digits').regex(/^\d{4}$/, 'Must be 4 digits'),
  expMonth: z.number().int().min(1).max(12, 'Month must be between 1 and 12'),
  expYear: z.number().int().min(new Date().getFullYear(), 'Year cannot be in the past'),
  brand: z.string().min(1, 'Brand is required')
});

// Runtime validation helper
export function validatePaymentMethod(data: unknown): OrganizationPaymentMethod {
  return OrganizationPaymentMethodSchema.parse(data);
}
```

### Custom Validation Functions
```typescript
export function isValidExpirationDate(expMonth: number, expYear: number): boolean {
  const now = new Date();
  const expiration = new Date(expYear, expMonth - 1);
  return expiration > now;
}

export function isValidCardBrand(brand: string): boolean {
  const validBrands = ['visa', 'mastercard', 'amex', 'discover', 'diners', 'jcb', 'unionpay'];
  return validBrands.includes(brand.toLowerCase());
}
```

## Best Practices

### ✅ Adherence to Guidelines

1. **Strict Typing**: All properties are strictly typed with primitive types
2. **Interface over Type**: Uses `interface` for object shape definition
3. **No Any Types**: Avoids `any` in favor of specific string/number types
4. **Domain-First**: Serves as the foundation domain object for payment methods

### ✅ Recommended Patterns

```typescript
// Good: Use utility types for derived interfaces
interface PaymentMethodSummary extends Pick<OrganizationPaymentMethod, 'cardLast4' | 'brand'> {
  isExpired: boolean;
}

// Good: Extend for additional context
interface PaymentMethodWithStatus extends OrganizationPaymentMethod {
  status: 'active' | 'expired' | 'invalid';
}

// Good: Use strict typing for arrays
interface PaymentMethodCollection {
  methods: OrganizationPaymentMethod[];
  defaultMethodId?: string;
}
```

### ⚠️ Areas for Enhancement

Consider these improvements for stronger typing:

```typescript
// Enhanced with literal types and validation
export interface OrganizationPaymentMethod {
  stripeId: `pm_${string}`; // Stripe ID format
  cardLast4: string; // Could be branded type for 4-digit validation
  expMonth: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // Strict month literals
  expYear: number; // Could be branded type for year validation
  brand: 'visa' | 'mastercard' | 'amex' | 'discover' | 'diners' | 'jcb' | 'unionpay'; // Known card brands
}
```

This type serves as a secure, well-structured foundation for handling organization payment methods while maintaining strict typing and clear integration patterns throughout the application.