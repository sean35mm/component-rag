# PlanListContainer

## Purpose

The `PlanListContainer` component displays subscription plans for the start trial page, adapting its behavior based on user authentication status. It provides different views for authenticated users (with subscription dialog integration) and public users (redirecting to sign-up), while handling loading states and fallbacks.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive subscription dialog state via Zustand
- Handles click events for plan subscription actions
- Conditionally renders based on authentication state
- Integrates with client-side routing for sign-up redirects

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | CSS class name for styling the container |

## Usage Example

```tsx
import { PlanListContainer } from '@/components/developers/start-trial-page/plan-list-container';

// Basic usage on start trial page
export default function StartTrialPage() {
  return (
    <div className="container mx-auto py-8">
      <h1>Choose Your Plan</h1>
      <PlanListContainer className="mt-6" />
    </div>
  );
}

// With custom styling
export default function CustomTrialPage() {
  return (
    <PlanListContainer className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6" />
  );
}
```

## Functionality

### Core Features
- **Adaptive Rendering**: Shows different plan views based on authentication status
- **Subscription Management**: Integrates with subscription dialog for authenticated users
- **Public Sign-up Flow**: Redirects unauthenticated users to registration
- **Loading States**: Displays skeleton loaders and fallbacks during data fetching
- **Conditional Actions**: Shows appropriate action buttons (Subscribe vs. Start Trial)

### Authentication-Based Views
- **Authenticated Users**: Full subscription dialog with payment method integration
- **Public Users**: Sign-up redirect with trial messaging
- **Unauthenticated**: Fallback view with loading states

## State Management

### TanStack Query
- `useCurrentOrganization()` - Fetches current user's organization data
- `useCurrentOrganizationSubscriptablePlans()` - Retrieves available plans for authenticated users
- `usePublicSubscriptablePlans()` - Fetches public plan information
- `usePaymentMethod()` - Gets user's payment method details

### Zustand Store
- `useSubscribeDialogStore()` - Manages subscription dialog state and flow transitions
- `onFlowChange()` - Triggers subscription dialog with specific flow type and metadata

### Local State
- `useMemo()` - Memoizes plan data transformation to prevent unnecessary re-renders

## Side Effects

### API Interactions
- Fetches organization subscription plans based on authentication status
- Retrieves payment method information for subscription flow
- Loads public plan data for unauthenticated users

### Navigation Effects
- Redirects to sign-up page with configuration redirect parameter
- Opens subscription dialog with pre-populated plan selection

## Dependencies

### UI Components
- `PlanList`, `PlanItem`, `PlanListFallback` - Plan display components
- `Button` - Action button component
- `Skeleton` - Loading state component
- `SubscribeDialog` - Subscription management dialog

### Hooks & Contexts
- `useAccessToken()` - Authentication state management
- `SubscribeDialogStoreProvider` - Zustand store provider
- Custom query hooks for data fetching

### Utilities
- `mapBillingPlans()` - Transforms plan data with action buttons
- `isSubscriptionActiveOrRequiresAction()` - Subscription status validation

## Integration

### Application Architecture
```
StartTrialPage
├── PlanListContainer (Authentication Router)
    ├── PrivatePlanListContainer (Authenticated)
    │   ├── SubscribeDialogStoreProvider
    │   ├── SubscribeDialog
    │   └── PlanList (with Subscribe buttons)
    ├── PublicPlanListContainer (Public)
    │   └── PlanList (with Sign-up buttons)
    └── PlanListFallback (Loading/Error)
```

### Data Flow
1. Authentication status determines component variant
2. Appropriate query hooks fetch plan data
3. Plans are transformed with context-specific action buttons
4. User interactions trigger dialog flows or navigation

## Best Practices

### Architecture Adherence
- ✅ **Proper Client Component Usage**: Uses `'use client'` for interactive subscription management
- ✅ **Component Decomposition**: Separates concerns into Private/Public containers
- ✅ **State Management**: TanStack Query for server state, Zustand for subscription dialog
- ✅ **Conditional Rendering**: Clean authentication-based component switching

### Performance Optimizations
- Uses `useMemo()` for expensive plan data transformations
- Implements skeleton loading states for better UX
- Conditional data fetching based on authentication status

### Error Handling
- Provides fallback components for loading and error states
- Graceful degradation for unauthenticated users
- Skeleton loaders prevent layout shift during data loading

### Code Organization
- Exports constants (`ACTION_LABEL`, `ACTION_LABEL_PUBLIC`) for reusability
- Separates private and public logic into dedicated sub-components
- Clear separation of concerns between authentication states