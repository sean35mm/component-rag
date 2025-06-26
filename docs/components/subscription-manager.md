# SubscriptionManager Component

## Purpose

The `SubscriptionManager` component serves as the central orchestrator for subscription and billing management in the settings interface. It dynamically renders appropriate subscription interfaces based on the user's current subscription state, including active trials, paid subscriptions, canceled plans, and subscription setup flows.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages multiple client-side dialog flows through Zustand store
- Handles click events and user interactions
- Uses Next.js router for navigation
- Performs complex conditional rendering based on subscription state

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | This component accepts no props |

## Usage Example

```tsx
import { SubscriptionManager } from '@/components/settings/billing/subscription-manager';

// In a billing settings page
export default function BillingPage() {
  return (
    <div className="space-y-6">
      <h1>Billing & Subscription</h1>
      <SubscriptionManager />
    </div>
  );
}
```

## Functionality

### Core Features

- **Dynamic State Detection**: Automatically detects and handles multiple subscription states:
  - Active API trials with expiration tracking
  - Active paid subscriptions (API plans)
  - Enterprise/Organization plans
  - Canceled subscriptions with expiration dates
  - Payment action required states

- **Conditional UI Rendering**: 
  - Shows `PlanSelector` for users without active subscriptions or during trials
  - Displays `SubscriptionDetails` for active subscription management
  - Renders loading state while data is being fetched

- **Action Management**: Provides contextual actions based on subscription state:
  - Payment completion for failed payments
  - Payment method editing
  - Plan management and upgrades
  - Support contact for enterprise plans

### State-Specific Behaviors

1. **Trial State**: Shows trial information with expiration date and plan selector
2. **Active Subscription**: Displays full subscription details with management options
3. **Canceled Subscription**: Shows cancellation status with expiration date
4. **Payment Issues**: Provides payment completion or support contact options
5. **Enterprise Plans**: Shows organization plan details with support contact

## State Management

### TanStack Query Integration
- `useCurrentOrganization()` - Fetches organization and subscription data
- `useCurrentOrganizationTrials()` - Retrieves trial information
- `usePaymentMethod()` - Gets payment method details
- `useSubscriptionIntents()` - Fetches payment intent data for failed payments

### Zustand Store Usage
- `useSubscribeDialogStore()` - Manages subscription dialog flows and state transitions

### Local State
- Complex `useMemo` configuration object that determines UI state based on fetched data

## Side Effects

- **Navigation**: Uses Next.js router to redirect to support email
- **Dialog Management**: Triggers various subscription dialog flows through Zustand store
- **Payment Processing**: Initiates payment confirmation flows when needed

## Dependencies

### Components
- `Block` - UI loading component
- `PlanSelector` - Plan selection interface
- `SubscriptionDetails` - Subscription information display

### Hooks
- `useCurrentOrganization`
- `useCurrentOrganizationTrials`
- `usePaymentMethod`
- `useSubscriptionIntents`
- `useSubscribeDialogStore`

### Utilities
- `getApiBillingPrice` - Extracts API billing information
- `getEnterpriseBillingPrice` - Extracts enterprise billing information
- `getFirstActiveApiTrial` - Finds active trial
- `isSubscriptionActiveOrRequiresAction` - Subscription state validation
- `isSubscriptionRequiresAction` - Payment action validation

### Types
- `BillingPriceInterval`
- `SubscriptionDetailsMeta`
- `SubscribeDialogEditSubscriptionFlow`

## Integration

### Application Architecture
- **Settings Domain**: Core component in the billing settings flow
- **Dialog System**: Integrates with centralized subscription dialog management
- **Payment Flow**: Connects to Stripe payment processing system
- **Organization Management**: Works within multi-tenant organization context

### Data Flow
1. Fetches organization, trial, and payment data via TanStack Query
2. Processes data through utility functions to determine subscription state
3. Renders appropriate UI components based on computed configuration
4. Handles user actions through dialog store state management

## Best Practices

### Architecture Adherence
- ✅ **Lego Block Pattern**: Composes `PlanSelector` and `SubscriptionDetails` components
- ✅ **State Management**: Properly separates server state (TanStack Query) from client state (Zustand)
- ✅ **Domain Organization**: Located in appropriate settings/billing domain folder
- ✅ **Client Component Usage**: Justified use of client-side rendering for interaction handling

### Performance Optimizations
- **Memoized Configuration**: Uses `useMemo` to prevent unnecessary recalculations
- **Conditional Rendering**: Only renders components when data is available
- **Loading States**: Provides appropriate loading feedback during data fetching

### Error Handling
- **Graceful Degradation**: Handles undefined data states elegantly
- **Fallback Actions**: Provides support contact when payment flows fail
- **State Validation**: Uses utility functions to validate subscription states before rendering