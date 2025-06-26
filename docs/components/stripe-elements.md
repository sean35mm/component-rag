# StripeElements Component Documentation

## Purpose
The `StripeElements` component is a wrapper around Stripe's Elements provider that initializes the Stripe.js SDK and provides a context for Stripe payment elements throughout the billing section of the application. It serves as the foundation for all Stripe-related payment functionality by loading the Stripe instance and making it available to child components.

## Component Type
**Client Component** - This component uses the `@stripe/react-stripe-js` library which requires browser APIs and client-side JavaScript execution. The Stripe Elements provider must run in the browser to handle payment processing securely.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `ReactNode \| ReactNode[]` | ✅ | - | Child components that will have access to the Stripe context |
| `options` | `StripeElementsOptions` | ❌ | `undefined` | Configuration options for Stripe Elements (theme, locale, etc.) |

## Usage Example

```tsx
import { StripeElements } from '@/components/settings/billing/stripe-elements';
import { PaymentForm } from '@/components/settings/billing/payment-form';
import { SubscriptionCard } from '@/components/settings/billing/subscription-card';

// Basic usage
export function BillingPage() {
  return (
    <StripeElements>
      <PaymentForm />
      <SubscriptionCard />
    </StripeElements>
  );
}

// With custom options
export function CustomBillingPage() {
  const stripeOptions = {
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#0570de',
      },
    },
    locale: 'en' as const,
  };

  return (
    <StripeElements options={stripeOptions}>
      <PaymentForm />
    </StripeElements>
  );
}

// Integration with payment intent
export function CheckoutPage({ clientSecret }: { clientSecret: string }) {
  const stripeOptions = {
    clientSecret,
    appearance: {
      theme: 'night' as const,
    },
  };

  return (
    <StripeElements options={stripeOptions}>
      <CheckoutForm />
    </StripeElements>
  );
}
```

## Functionality

### Core Features
- **Stripe SDK Initialization**: Loads Stripe.js with the publishable key from environment variables
- **Context Provider**: Wraps child components with Stripe Elements context
- **Configuration Support**: Accepts optional Stripe Elements configuration for theming and localization
- **Promise-based Loading**: Uses a singleton promise to ensure Stripe is loaded only once

### Key Behaviors
- Automatically initializes Stripe with the application's publishable key
- Provides Stripe context to all nested payment components
- Supports custom styling and configuration through options prop
- Handles Stripe SDK loading state internally

## State Management
**No Direct State Management** - This component is a pure wrapper that delegates state management to:
- **Stripe SDK**: Handles internal Stripe state and payment processing
- **Child Components**: Payment forms and billing components manage their own state using React Hook Form and TanStack Query for server interactions

## Side Effects

### External Service Integration
- **Stripe SDK Loading**: Loads the Stripe.js library from Stripe's CDN
- **Environment Configuration**: Reads `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` from environment variables
- **Network Requests**: Child components can make Stripe API calls through the provided context

### No Direct Side Effects
The component itself doesn't perform API calls or mutations - it provides the infrastructure for child components to interact with Stripe securely.

## Dependencies

### External Libraries
- `@stripe/react-stripe-js` - React integration for Stripe Elements
- `@stripe/stripe-js` - Core Stripe.js library

### Internal Dependencies
- `@/env` - Environment configuration module

### Related Components
- Payment forms that use Stripe Elements (CardElement, PaymentElement)
- Billing management components
- Subscription components

## Integration

### Application Architecture
```
Settings Page
├── Billing Section
    ├── StripeElements (Provider)
        ├── PaymentMethodForm
        ├── SubscriptionManagement
        ├── InvoiceHistory
        └── BillingAddress
```

### Environment Setup
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Billing Flow Integration
1. **Setup Phase**: StripeElements initializes Stripe SDK
2. **Payment Collection**: Child forms collect payment information
3. **Processing**: TanStack Query mutations handle server-side Stripe operations
4. **State Updates**: Billing state refreshes through query invalidation

## Best Practices

### Architecture Adherence
✅ **Component Decomposition**: Acts as a focused provider component in the billing domain  
✅ **Reusability**: Encapsulates Stripe initialization logic for reuse across billing features  
✅ **Separation of Concerns**: Handles only Stripe context, delegates business logic to children  

### Implementation Patterns
- **Singleton Pattern**: Uses promise-based loading to prevent multiple Stripe initializations
- **Provider Pattern**: Follows React context provider pattern for dependency injection
- **Environment Configuration**: Properly uses environment variables for API keys

### Security Considerations
- Uses publishable key (safe for client-side)
- Relies on Stripe's secure iframe for sensitive data collection
- No sensitive payment data passes through React state

### Performance Optimization
- Stripe promise is created at module level to enable caching
- Stripe SDK loads asynchronously without blocking component rendering
- Minimal re-renders due to stable stripe promise reference