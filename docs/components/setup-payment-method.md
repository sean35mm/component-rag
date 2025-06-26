# SetupPaymentMethod

## Purpose

The `SetupPaymentMethod` component handles the creation and setup of new payment methods for organizations using Stripe's payment infrastructure. It provides a user interface for collecting payment information and securely storing payment methods for future billing operations within the subscription billing flow.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Integrates with Stripe's client-side JavaScript SDK
- Handles browser-specific payment form interactions
- Manages asynchronous payment setup workflows
- Requires client-side state management for payment processing

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onPaymentMethodSetup` | `(method: OrganizationPaymentMethod) => void` | Yes | Callback function triggered when a payment method is successfully created and saved |

## Usage Example

```tsx
import { SetupPaymentMethod } from '@/components/settings/billing/subscribe-dialog/setup-payment-method';
import { OrganizationPaymentMethod } from '@/lib/types';

function SubscriptionDialog() {
  const handlePaymentMethodSetup = (method: OrganizationPaymentMethod) => {
    // Handle successful payment method creation
    console.log('Payment method created:', method.id);
    // Navigate to next step or update UI state
    setCurrentStep('subscription-selection');
  };

  return (
    <div className="subscription-setup">
      <h2>Setup Payment Method</h2>
      <SetupPaymentMethod 
        onPaymentMethodSetup={handlePaymentMethodSetup}
      />
    </div>
  );
}
```

## Functionality

- **Payment Method Collection**: Renders payment form interface through the `PaymentDetails` component
- **Stripe Integration**: Configures Stripe Elements with setup mode for future payment collection
- **Intent Creation**: Creates setup intents for secure payment method storage
- **Payment Confirmation**: Handles Stripe setup confirmation with error handling
- **Method Persistence**: Saves payment methods to the organization's account
- **Success Callback**: Notifies parent components when setup is complete

## State Management

- **TanStack Query**: Uses custom hooks for server state management:
  - `useSetupIntent`: Creates Stripe setup intents
  - `useUpdatePaymentMethod`: Saves payment method data to the backend
- **Configuration**: Both mutations use `throwOnError: false` for custom error handling
- **Local State**: Minimal local state, primarily relies on Stripe Elements internal state

## Side Effects

- **API Calls**:
  - Creates setup intents via `onSetupIntent`
  - Confirms setup with Stripe's client SDK
  - Updates payment method records via `onUpdatePaymentMethod`
- **External Integrations**:
  - Stripe payment processing
  - Browser redirect handling (conditional)
- **Error Handling**: Custom error throwing for setup failures

## Dependencies

### Hooks
- `useSetupIntent` - Creates Stripe setup intents
- `useUpdatePaymentMethod` - Persists payment method data

### Components
- `PaymentDetails` - Renders the actual payment form interface

### External Libraries
- `@stripe/stripe-js` - Stripe JavaScript SDK types and interfaces

### Configuration
- `env.NEXT_PUBLIC_BASE_URL` - Base URL for return URL configuration

## Integration

### Billing Flow Position
The component is part of the subscription setup workflow:
```
Subscribe Dialog → Setup Payment Method → Payment Details → Stripe Elements
```

### Data Flow
1. Parent component renders `SetupPaymentMethod`
2. Component configures Stripe options and renders `PaymentDetails`
3. User completes payment form
4. Stripe setup intent is created and confirmed
5. Payment method is saved to organization
6. Success callback notifies parent component

### Architecture Alignment
- **Domain Organization**: Located in `/settings/billing/` following feature-based structure
- **Component Decomposition**: Delegates UI rendering to `PaymentDetails`, focusing on business logic
- **Server State**: Properly uses TanStack Query for API interactions

## Best Practices

### Architectural Compliance
- ✅ **Appropriate Client Component**: Correctly uses client-side rendering for Stripe integration
- ✅ **Single Responsibility**: Focuses solely on payment method setup workflow
- ✅ **Composition Over Nesting**: Composes with `PaymentDetails` rather than implementing UI directly
- ✅ **Query Hook Usage**: Proper implementation of TanStack Query patterns

### Security Considerations
- **PCI Compliance**: Leverages Stripe's secure tokenization
- **No Sensitive Data Storage**: Payment details handled entirely by Stripe
- **Secure Redirects**: Uses environment-based return URLs

### Error Handling
- **Graceful Degradation**: Custom error handling with descriptive messages
- **User Feedback**: Throws meaningful errors for UI error boundaries
- **Mutation Safety**: Disabled error throwing on mutations for custom handling

### Configuration
- **Stripe Setup**: Properly configured for future payment collection
- **Currency Standardization**: Uses USD as base currency
- **Session Management**: Configured for off-session future usage