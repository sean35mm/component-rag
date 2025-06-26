# ConfirmPayment Component

## Purpose

The `ConfirmPayment` component handles the Stripe payment confirmation flow within the subscription dialog. It processes payment confirmations, updates the organization's default payment method, and manages the necessary cache invalidations to keep the billing state synchronized across the application.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Integrates with Stripe's client-side JavaScript SDK
- Manages payment confirmation callbacks and user interactions
- Handles complex async operations with user feedback (toasts)
- Requires browser-specific APIs for payment processing

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `clientSecret` | `string` | Yes | Stripe client secret for the payment intent, used to authenticate the payment confirmation |
| `onPaymentConfirm` | `() => void` | Yes | Callback function executed after successful payment confirmation and cache updates |

## Usage Example

```tsx
import { ConfirmPayment } from '@/components/settings/billing/subscribe-dialog/confirm-payment';

function SubscribeDialog() {
  const [clientSecret, setClientSecret] = useState<string>('');
  
  const handlePaymentConfirmed = () => {
    // Close dialog, show success message, redirect, etc.
    setIsDialogOpen(false);
    toast.success('Payment confirmed successfully!');
  };

  return (
    <Dialog open={isDialogOpen}>
      <DialogContent>
        {clientSecret && (
          <ConfirmPayment
            clientSecret={clientSecret}
            onPaymentConfirm={handlePaymentConfirmed}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
```

## Functionality

### Core Features
- **Stripe Payment Confirmation**: Processes payment using Stripe's `confirmPayment` method with elements integration
- **Payment Method Persistence**: Automatically saves the payment method for future use
- **Default Payment Method Update**: Sets the confirmed payment method as the organization's default
- **Comprehensive Cache Invalidation**: Updates all related queries after successful payment
- **Error Handling**: Graceful error handling with user-friendly toast notifications
- **Sentry Integration**: Captures exceptions for monitoring payment-related issues

### Payment Flow
1. Confirms payment with Stripe using provided elements
2. Saves payment method for future transactions
3. Invalidates relevant organization queries
4. Updates default payment method
5. Executes success callback

## State Management

### TanStack Query Integration
- **Mutations**: Uses `useUpdatePaymentMethod` for setting default payment method
- **Cache Management**: Invalidates multiple query keys related to organization billing:
  - Current organization data
  - API limits and usage
  - Trial information
  - Available subscription plans
  - Transaction history
  - Subscription intents
  - Upcoming invoice details

### Query Invalidation Strategy
```tsx
await Promise.all([
  queryClient.invalidateQueries({ queryKey: queryKeys.currentOrganization.getCurrent._def }),
  queryClient.invalidateQueries({ queryKey: queryKeys.currentOrganization.getApiLimits._def }),
  // ... additional invalidations
]);
```

## Side Effects

### External API Interactions
- **Stripe Payment Confirmation**: Calls `stripe.confirmPayment()` with redirect handling
- **Payment Method Update**: API call to set default payment method
- **Cache Invalidation**: Triggers refetch of multiple organization-related queries

### Error Handling
- Stripe payment errors are thrown and handled by parent components
- Payment method update failures are captured in Sentry but don't block the flow
- User-friendly error messages via toast notifications

## Dependencies

### External Libraries
- `@stripe/stripe-js`: Stripe payment processing
- `@tanstack/react-query`: Server state management

### Internal Dependencies
- `useHandleToastError`: Error handling and user feedback
- `useUpdatePaymentMethod`: Payment method management
- `PaymentDetails`: Child component for payment form rendering
- `queryKeys`: Centralized query key management
- `captureException`: Sentry error reporting

## Integration

### Application Architecture Role
- **Billing Flow Component**: Core part of the subscription and payment management system
- **Dialog Integration**: Designed to work within modal/dialog contexts
- **Organization Context**: Operates within organization-scoped billing operations
- **Query Ecosystem**: Fully integrated with the application's TanStack Query setup

### Data Flow
```
Parent Dialog → ConfirmPayment → PaymentDetails → Stripe Elements
                     ↓
            Query Invalidation → Organization State Update
                     ↓
            Success Callback → UI Update
```

## Best Practices

### Architecture Adherence
- ✅ **Proper Client Component Usage**: Uses `'use client'` appropriately for Stripe integration
- ✅ **Single Responsibility**: Focused solely on payment confirmation logic
- ✅ **Composition Over Inheritance**: Delegates UI rendering to `PaymentDetails` component
- ✅ **Error Boundary Integration**: Proper error handling with Sentry integration

### State Management Patterns
- ✅ **TanStack Query for Server State**: Uses mutations and query invalidation correctly
- ✅ **Comprehensive Cache Management**: Invalidates all related queries to maintain consistency
- ✅ **Optimistic UI Patterns**: Handles success/error states appropriately

### Code Organization
- ✅ **Domain-Specific Location**: Properly placed in billing-specific component tree
- ✅ **Clear Prop Interface**: Simple, focused props with clear responsibilities
- ✅ **Memoization**: Uses `useMemo` for Stripe options to prevent unnecessary re-renders
- ✅ **Callback Stability**: Uses `useCallback` for payment handler to prevent child re-renders