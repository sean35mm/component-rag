# PaymentDetails Component

## Purpose

The `PaymentDetails` component provides a comprehensive payment form interface for subscription billing, integrating with Stripe to collect and process payment method information. It serves as a key component in the subscription flow, allowing users to enter credit card details and billing information within a themed, accessible payment form.

## Component Type

**Client Component** - Uses `'use client'` directive because it:
- Integrates with Stripe Elements which requires browser APIs
- Manages form state and user interactions
- Handles theme changes and dynamic styling
- Processes payment form submissions with real-time validation

## Props Interface

### PaymentDetails Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `options` | `Omit<StripeElementsOptionsClientSecret, 'appearance' \| 'loader'> \| Omit<StripeElementsOptionsMode, 'appearance' \| 'loader'>` | Yes | Stripe Elements configuration options (excluding appearance and loader which are handled internally) |
| `onPaymentMethodCreate` | `(stripe: Stripe, elements: StripeElements) => Promise<void>` | Yes | Callback function executed when payment method is successfully created |

### PaymentDetailsForm Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onPaymentMethodCreate` | `(stripe: Stripe, elements: StripeElements) => Promise<void>` | Yes | Callback function for handling payment method creation |

## Usage Example

```tsx
import { PaymentDetails } from '@/components/settings/billing/subscribe-dialog/payment-details';

// In a subscription dialog component
const SubscriptionDialog = () => {
  const handlePaymentMethodCreate = async (stripe, elements) => {
    try {
      // Create payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        elements,
        params: {
          billing_details: {
            name: 'Customer Name',
            email: 'customer@example.com',
          },
        },
      });

      if (error) {
        throw error;
      }

      // Process subscription with payment method
      await processSubscription(paymentMethod.id);
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  const stripeOptions = {
    clientSecret: 'pi_1234567890_secret_abcdef',
    appearance: {
      // Custom appearance will be overridden by component
    },
  };

  return (
    <PaymentDetails
      options={stripeOptions}
      onPaymentMethodCreate={handlePaymentMethodCreate}
    />
  );
};
```

## Functionality

### Core Features
- **Stripe Integration**: Full integration with Stripe Elements for secure payment processing
- **Theme-Aware Styling**: Dynamic styling that adapts to light/dark theme preferences
- **Form Validation**: Built-in Stripe validation with custom error handling
- **Loading States**: Visual feedback during payment processing with loading indicators
- **Accessibility**: Proper form structure and keyboard navigation support

### Payment Processing Flow
1. User enters payment information in Stripe Elements form
2. Form validation occurs on submission
3. Payment method is created through Stripe API
4. Success/error handling with toast notifications
5. Parent component receives payment method for subscription processing

## State Management

The component uses **local React state** for:
- `isPaymentElementReady`: Tracks when Stripe Elements have loaded
- `isSubmitting`: Manages form submission state and loading indicators

No external state management (TanStack Query/Zustand) is used as this is a pure form component that delegates business logic to parent components through callbacks.

## Side Effects

### External API Interactions
- **Stripe Elements**: Loads and renders secure payment form elements
- **Payment Method Creation**: Creates payment methods through Stripe API
- **Error Reporting**: Sends errors to Sentry for monitoring

### Theme Integration
- Dynamically applies color schemes based on `next-themes` resolved theme
- Updates Stripe Elements appearance in real-time

## Dependencies

### External Libraries
- `@stripe/react-stripe-js`: Stripe React integration
- `@stripe/stripe-js`: Core Stripe JavaScript library
- `next-themes`: Theme management

### Internal Dependencies
- `useHandleToastError`: Error handling and user notifications
- `StripeElements`: Wrapper component for Stripe Elements provider
- `SubscribeDialogTitle` & `SubscribeDialogWrapper`: Dialog layout components
- Icon components: `PiArrowRightLine`, `PiLoader3Line`
- UI components: `Button`
- Sentry utilities for error tracking

## Integration

### Application Architecture Role
- **Billing Flow**: Central component in subscription and payment workflows
- **Settings Integration**: Part of the billing settings dialog system
- **Error Handling**: Integrates with application-wide error handling patterns
- **Theme System**: Participates in the global theme management system

### Parent Component Requirements
- Must provide Stripe configuration options
- Must handle payment method creation success/failure
- Should manage dialog state and navigation flow

## Best Practices

### Architecture Adherence
✅ **Proper Component Decomposition**: Separates main component from form logic
✅ **Client Component Usage**: Correctly uses client component for interactive payment forms
✅ **Error Handling**: Implements consistent error handling with toast notifications
✅ **State Management**: Uses appropriate local state for UI concerns

### Stripe Integration Best Practices
✅ **Security**: Leverages Stripe Elements for PCI compliance
✅ **Error Handling**: Comprehensive error capture and user feedback
✅ **Loading States**: Proper loading indicators during async operations
✅ **Validation**: Uses Stripe's built-in validation and error messaging

### Recommendations
- Always handle the `onPaymentMethodCreate` callback with proper error handling
- Ensure Stripe public key is properly configured in environment
- Test payment flows in Stripe's test mode before production deployment
- Monitor Sentry for payment-related errors and user experience issues

## Exports

- `PaymentDetails`: Main component for payment form interface
- `INTERNAL_ERROR_MESSAGE`: Constant for generic error messaging
- `PaymentDetailsForm`: Internal form component (can be used independently if needed)