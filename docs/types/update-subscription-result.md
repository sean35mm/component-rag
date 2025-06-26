# UpdateSubscriptionResult Type Documentation

## Purpose

The `UpdateSubscriptionResult` type defines the response structure returned after updating a subscription through the Stripe payment system. It encapsulates both the updated organization information and any required payment setup details, facilitating the complete subscription update flow including payment method changes and confirmation requirements.

This type serves as a critical bridge between subscription management operations and payment processing, ensuring type safety when handling complex subscription state transitions that may require additional user actions.

## Type Definition

```typescript
import { Organization } from './organization';

interface Intent {
  clientSecret: string | null;
  status:
    | 'requires_payment_method'
    | 'requires_confirmation'
    | 'requires_action'
    | 'processing'
    | 'canceled'
    | 'succeeded';
}

export interface SubscriptionSetup {
  stripeSubscriptionId: string;
  pendingSetupIntent: Intent | null;
  paymentIntent: Intent | null;
}

export interface UpdateSubscriptionResult {
  organization: Organization;
  subscriptionSetup: SubscriptionSetup | null;
}
```

## Properties

### UpdateSubscriptionResult

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `organization` | `Organization` | Yes | The updated organization entity with current subscription details |
| `subscriptionSetup` | `SubscriptionSetup \| null` | Yes | Payment setup information if additional actions are required, null if update completed without payment changes |

### SubscriptionSetup

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `stripeSubscriptionId` | `string` | Yes | The Stripe subscription identifier for tracking |
| `pendingSetupIntent` | `Intent \| null` | Yes | Setup intent for future payments (e.g., payment method updates) |
| `paymentIntent` | `Intent \| null` | Yes | Payment intent for immediate charges (e.g., plan upgrades) |

### Intent

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `clientSecret` | `string \| null` | Yes | Stripe client secret for frontend payment confirmation |
| `status` | `IntentStatus` | Yes | Current status of the payment/setup intent |

### Intent Status Values

| Value | Description |
|-------|-------------|
| `requires_payment_method` | Customer needs to provide a payment method |
| `requires_confirmation` | Payment method provided, awaiting confirmation |
| `requires_action` | Additional customer action required (3D Secure, etc.) |
| `processing` | Payment is being processed |
| `canceled` | Intent was canceled |
| `succeeded` | Payment/setup completed successfully |

## Usage Examples

### Basic Subscription Update Handling

```typescript
import { UpdateSubscriptionResult } from '@/lib/types/update-subscription-result';

async function handleSubscriptionUpdate(
  organizationId: string,
  planId: string
): Promise<UpdateSubscriptionResult> {
  const result = await updateSubscription({ organizationId, planId });
  
  // Type-safe access to organization data
  console.log(`Updated org: ${result.organization.name}`);
  
  // Handle payment setup if required
  if (result.subscriptionSetup) {
    return handlePaymentSetup(result.subscriptionSetup);
  }
  
  return result;
}
```

### Payment Intent Processing

```typescript
import { SubscriptionSetup, UpdateSubscriptionResult } from '@/lib/types/update-subscription-result';

function processSubscriptionResult(result: UpdateSubscriptionResult): {
  requiresAction: boolean;
  clientSecret?: string;
  actionType?: 'payment' | 'setup';
} {
  const { subscriptionSetup } = result;
  
  if (!subscriptionSetup) {
    return { requiresAction: false };
  }
  
  // Check payment intent first (immediate charges)
  if (subscriptionSetup.paymentIntent?.status === 'requires_action') {
    return {
      requiresAction: true,
      clientSecret: subscriptionSetup.paymentIntent.clientSecret ?? undefined,
      actionType: 'payment'
    };
  }
  
  // Check setup intent (future payments)
  if (subscriptionSetup.pendingSetupIntent?.status === 'requires_confirmation') {
    return {
      requiresAction: true,
      clientSecret: subscriptionSetup.pendingSetupIntent.clientSecret ?? undefined,
      actionType: 'setup'
    };
  }
  
  return { requiresAction: false };
}
```

### React Component Integration

```typescript
import React, { useState } from 'react';
import { UpdateSubscriptionResult } from '@/lib/types/update-subscription-result';

interface SubscriptionUpdateProps {
  onUpdate: (planId: string) => Promise<UpdateSubscriptionResult>;
}

export function SubscriptionUpdateForm({ onUpdate }: SubscriptionUpdateProps) {
  const [result, setResult] = useState<UpdateSubscriptionResult | null>(null);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (planId: string) => {
    setLoading(true);
    try {
      const updateResult = await onUpdate(planId);
      setResult(updateResult);
      
      // Handle different subscription setup scenarios
      if (updateResult.subscriptionSetup?.paymentIntent?.status === 'requires_action') {
        // Redirect to payment confirmation
        handlePaymentConfirmation(updateResult.subscriptionSetup.paymentIntent);
      } else if (updateResult.subscriptionSetup?.pendingSetupIntent) {
        // Handle setup intent
        handleSetupConfirmation(updateResult.subscriptionSetup.pendingSetupIntent);
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      {result && (
        <div>
          <h3>Updated: {result.organization.name}</h3>
          {result.subscriptionSetup && (
            <PaymentSetupComponent setup={result.subscriptionSetup} />
          )}
        </div>
      )}
    </div>
  );
}
```

## Type Architecture Pattern

This type follows our established pattern of **domain objects → response types → request types**:

```typescript
// 1. Domain Objects (foundation)
Organization (imported domain entity)

// 2. Response Types (this type)
UpdateSubscriptionResult (API response shape)
├── SubscriptionSetup (payment processing data)
└── Intent (Stripe payment state)

// 3. Request Types (would be defined elsewhere)
UpdateSubscriptionRequest {
  organizationId: string;
  planId: string;
  paymentMethodId?: string;
}
```

### Architecture Benefits

- **Separation of Concerns**: Payment setup logic separated from organization data
- **Type Safety**: Strict typing prevents runtime errors in payment flows
- **Extensibility**: Easy to add new intent types or setup requirements
- **Nullability**: Explicit null handling for optional payment setup

## Related Types

### Direct Dependencies
- `Organization` - Core domain entity representing the organization
- Stripe types (implied) - Intent status values align with Stripe's API

### Potential Extensions
```typescript
// Enhanced version with additional metadata
interface EnhancedUpdateSubscriptionResult extends UpdateSubscriptionResult {
  metadata: {
    planChanges: PlanChangeDetails;
    pricingAdjustment: PricingDetails;
    effectiveDate: Date;
  };
}

// Utility types for specific scenarios
type SuccessfulUpdate = UpdateSubscriptionResult & {
  subscriptionSetup: null;
};

type PendingPaymentUpdate = UpdateSubscriptionResult & {
  subscriptionSetup: SubscriptionSetup;
};
```

## Integration Points

### Services
- **Subscription Service**: Primary producer of this type
- **Payment Service**: Consumes `SubscriptionSetup` for Stripe integration
- **Organization Service**: Updates organization data post-payment

### Components
- **Subscription Management**: Displays organization and handles payment flows
- **Payment Confirmation**: Processes payment/setup intents
- **Billing Dashboard**: Shows subscription status and history

### API Endpoints
```typescript
// REST endpoint
POST /api/subscriptions/update
Response: UpdateSubscriptionResult

// GraphQL mutation
mutation UpdateSubscription($input: UpdateSubscriptionInput!) {
  updateSubscription(input: $input) {
    organization { id name }
    subscriptionSetup {
      stripeSubscriptionId
      paymentIntent { status clientSecret }
    }
  }
}
```

## Validation

### Zod Schema Implementation

```typescript
import { z } from 'zod';

const IntentSchema = z.object({
  clientSecret: z.string().nullable(),
  status: z.enum([
    'requires_payment_method',
    'requires_confirmation',
    'requires_action',
    'processing',
    'canceled',
    'succeeded'
  ])
});

const SubscriptionSetupSchema = z.object({
  stripeSubscriptionId: z.string().min(1),
  pendingSetupIntent: IntentSchema.nullable(),
  paymentIntent: IntentSchema.nullable()
});

export const UpdateSubscriptionResultSchema = z.object({
  organization: OrganizationSchema, // Defined elsewhere
  subscriptionSetup: SubscriptionSetupSchema.nullable()
});

// Type guard utility
export function isValidUpdateSubscriptionResult(
  data: unknown
): data is UpdateSubscriptionResult {
  return UpdateSubscriptionResultSchema.safeParse(data).success;
}
```

### Runtime Validation Example

```typescript
async function validateAndProcessUpdate(
  rawResponse: unknown
): Promise<UpdateSubscriptionResult> {
  const result = UpdateSubscriptionResultSchema.safeParse(rawResponse);
  
  if (!result.success) {
    throw new Error(`Invalid subscription update result: ${result.error.message}`);
  }
  
  return result.data;
}
```

## Best Practices

### Adherence to TypeScript Guidelines

✅ **Strict Typing**: All properties explicitly typed, no `any` usage
✅ **Interface over Type**: Uses `interface` for object shapes
✅ **Literal Types**: Status values use string literals for type safety
✅ **Explicit Nullability**: Clear null handling for optional payment setup

### Recommended Patterns

```typescript
// ✅ Good: Explicit null checking
function handleResult(result: UpdateSubscriptionResult) {
  if (result.subscriptionSetup?.paymentIntent?.clientSecret) {
    // Type-safe access to client secret
    processPayment(result.subscriptionSetup.paymentIntent.clientSecret);
  }
}

// ✅ Good: Type narrowing with status checks
function getNextAction(setup: SubscriptionSetup): string {
  const intent = setup.paymentIntent ?? setup.pendingSetupIntent;
  
  if (!intent) return 'complete';
  
  switch (intent.status) {
    case 'requires_payment_method':
      return 'add_payment_method';
    case 'requires_confirmation':
      return 'confirm_payment';
    case 'requires_action':
      return 'authenticate';
    default:
      return 'wait';
  }
}

// ✅ Good: Utility types for specific use cases
type CompletedSubscriptionUpdate = Pick<UpdateSubscriptionResult, 'organization'>;
type PendingSubscriptionUpdate = Required<UpdateSubscriptionResult>;
```

### Error Handling Best Practices

```typescript
// Handle subscription update with proper error boundaries
async function safeSubscriptionUpdate(
  params: UpdateSubscriptionParams
): Promise<UpdateSubscriptionResult | { error: string }> {
  try {
    const result = await updateSubscription(params);
    
    // Validate critical fields
    if (!result.organization?.id) {
      throw new Error('Invalid organization data in response');
    }
    
    return result;
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
```

This type definition exemplifies our commitment to type safety in payment processing workflows while maintaining flexibility for various subscription update scenarios.