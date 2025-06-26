# CreateSubscriptionFlow Component

## Purpose

The `CreateSubscriptionFlow` component manages the subscription creation process within a dialog flow. It handles plan selection, payment method setup, and subscription finalization, providing a complete user experience for upgrading to paid billing plans. The component orchestrates the entire subscription workflow from payment method configuration to final subscription confirmation.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages complex interactive state through Zustand store
- Handles user interactions for plan selection and payment processing
- Integrates with Stripe Elements for payment processing
- Uses callbacks and event handlers for flow navigation

## Props Interface

### CreateSubscriptionFlow Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `meta` | `SubscribeDialogCreateSubscriptionFlow['meta']` | Yes | Metadata containing flow state including plans, selected plan, payment method, and UI preferences |

### FinalizeSubscription Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isMonthMode` | `boolean` | Yes | Whether monthly billing is selected |
| `isPending` | `boolean` | No | Loading state during subscription creation |
| `paymentMethod` | `OrganizationPaymentMethod` | Yes | Selected payment method details |
| `plans` | `BillingPlanWithPricingAndPermissions[]` | Yes | Available billing plans with pricing |
| `selectedPlanId` | `number` | Yes | ID of currently selected plan |
| `onIsMonthModeChange` | `(isMonthMode: boolean) => void` | Yes | Callback for billing period changes |
| `onPaymentMethodEditing` | `() => void` | Yes | Callback to edit payment method |
| `onSelectPlan` | `(selectedPlanId: number) => void` | Yes | Callback for plan selection |
| `onSubscribe` | `(dto: UpdateOrganizationSubscriptionDto) => void` | Yes | Callback to initiate subscription |

## Usage Example

```tsx
import { CreateSubscriptionFlow } from '@/components/settings/billing/subscribe-dialog/create-subscription-flow';
import { SubscribeDialogFlowType } from '@/lib/stores';

// Usage within subscription dialog
function SubscribeDialog() {
  const flow = useSubscribeDialogStore(store => store.flow);
  
  if (flow.type === SubscribeDialogFlowType.CREATE_SUBSCRIPTION) {
    return (
      <CreateSubscriptionFlow 
        meta={flow.meta}
      />
    );
  }
  
  return null;
}

// Meta object structure example
const subscriptionMeta = {
  isMonthMode: true,
  isPaymentMethodEditingForceOpen: false,
  paymentMethod: {
    id: 'pm_123',
    cardLast4: '4242',
    // ... other payment method properties
  },
  plans: [
    {
      id: 1,
      name: 'Pro Plan',
      productTier: ProductTier.API,
      pricing: {
        monthly: 29.99,
        yearly: 299.99,
        monthlyPriceId: 'price_monthly',
        yearlyPriceId: 'price_yearly'
      }
    }
  ],
  selectedPlanId: 1
};
```

## Functionality

### Core Features
- **Conditional Flow Rendering**: Shows payment setup or subscription finalization based on payment method status
- **Plan Selection**: Interactive plan selector with monthly/yearly toggle
- **Payment Method Display**: Shows configured payment method with edit capability
- **Price Calculation**: Dynamic pricing display based on billing period
- **Subscription Creation**: Handles final subscription submission with loading states

### User Interactions
- Plan selection and billing period toggle
- Payment method editing access
- Subscription confirmation with visual feedback
- Loading states during payment processing

### Data Flow
- Manages subscription flow state through Zustand store
- Updates flow metadata for state persistence
- Handles navigation between payment setup and finalization

## State Management

### Zustand Store Integration
- **`useSubscribeDialogStore`**: Manages dialog flow state and navigation
- **Flow Navigation**: Updates flow type and metadata through `onFlowChange`
- **State Persistence**: Maintains user selections across flow steps

### Local State
- **Derived State**: Computed plans list filtered for API tier
- **Selection State**: Managed through store metadata updates
- **Loading State**: From `useSubscribe` hook

## Side Effects

### API Interactions
- **Subscription Creation**: Via `useSubscribe` hook
- **Payment Processing**: Integration with Stripe payment confirmation
- **Success Handling**: Navigation to success flow state

### Flow Navigation
- Transitions to payment confirmation flow on payment required
- Redirects to payment setup when payment method missing
- Updates flow metadata for state changes

## Dependencies

### UI Components
- `Button`, `DialogHeader`, `Typography` from UI library
- `LinkButton` for secondary actions
- Icons from `@/components/icons`

### Domain Components
- `StripeElements` for payment processing context
- `SubscribeDialogPlanSelector` for plan selection
- `SetupPaymentMethod` for payment configuration
- `SubscribeDialogWrapper`, `SubscribeDialogTitle` for layout

### Hooks & Services
- `useSubscribe` for subscription creation
- `useSubscribeSuccess` for success handling
- `useSubscribeDialogStore` for state management

### Types & DTOs
- `UpdateOrganizationSubscriptionDto` for API requests
- `BillingPlanWithPricingAndPermissions` for plan data
- `OrganizationPaymentMethod` for payment details

## Integration

### Dialog System Integration
- Renders within subscribe dialog flow
- Integrates with dialog header and layout components
- Manages flow transitions through centralized store

### Billing System Integration
- Connects to organization billing management
- Handles subscription tier upgrades
- Integrates with payment processing pipeline

### Stripe Integration
- Wrapped in `StripeElements` provider
- Handles payment method setup and confirmation
- Manages secure payment processing flow

## Best Practices

### Architecture Adherence
- ✅ **Component Decomposition**: Well-decomposed with `FinalizeSubscription` inner component
- ✅ **State Management**: Proper Zustand usage for complex flow state
- ✅ **Client Component**: Appropriately marked for interactive functionality
- ✅ **Separation of Concerns**: Clear separation between flow logic and UI presentation

### Code Quality
- **Memoization**: Uses `useMemo` for expensive plan calculations
- **Callback Optimization**: Proper `useCallback` usage for event handlers
- **Type Safety**: Strong TypeScript integration with proper interfaces
- **Currency Formatting**: Standardized `CURRENCY_FORMATTER` constant

### Integration Patterns
- **Hook Composition**: Combines multiple custom hooks effectively
- **Flow Management**: Clean state transitions through centralized store
- **Error Boundaries**: Integrates with payment processing error handling
- **Loading States**: Comprehensive pending state management