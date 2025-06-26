# PlanSelector Component

## Purpose

The `PlanSelector` component provides a comprehensive billing plan selection interface for organizations. It displays available subscription plans with monthly/yearly billing mode switching and integrates with the subscription flow to enable plan purchases. This component serves as the primary entry point for users to view and select billing plans within the settings billing section.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive state (billing mode toggle)
- Handles user interactions (plan selection, mode switching)
- Integrates with Zustand store for subscription dialog management
- Requires event handlers for dynamic subscription flow initiation

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `paymentMethod` | `OrganizationPaymentMethod \| null` | Yes | The organization's current payment method, passed to subscription flow for payment processing |

## Usage Example

```tsx
import { PlanSelector } from '@/components/settings/billing/plan-selector';
import { useCurrentOrganizationPaymentMethod } from '@/lib/query-hooks';

function BillingSettingsPage() {
  const { data: paymentMethod } = useCurrentOrganizationPaymentMethod();

  return (
    <div className="billing-settings">
      <PlanSelector paymentMethod={paymentMethod} />
    </div>
  );
}
```

## Functionality

### Core Features
- **Plan Display**: Renders available subscription plans in a structured list format
- **Billing Mode Toggle**: Allows switching between monthly and yearly billing cycles
- **Plan Selection**: Initiates subscription flow when users click "Subscribe" on a plan
- **Loading States**: Shows fallback UI while plans are loading
- **Responsive Design**: Adapts layout for different screen sizes

### Key Behaviors
- Dynamically generates subscription buttons for each plan
- Preserves billing mode preference during component lifecycle
- Passes complete subscription context (payment method, selected plan, billing mode) to dialog flow
- Disables billing mode switch when no plans are available

## State Management

### TanStack Query
- **`useCurrentOrganizationSubscriptablePlans()`**: Fetches available subscription plans for the current organization

### Zustand Store
- **`useSubscribeDialogStore`**: Manages subscription dialog flow state
  - `onFlowChange`: Initiates subscription creation flow with plan selection context

### Local State
- **`isMonthMode`**: Boolean state controlling monthly vs. yearly billing display mode

## Side Effects

### API Interactions
- Fetches organization's subscribable plans on component mount
- No direct mutations - subscription flow handled by dialog components

### External State Updates
- Updates subscription dialog store when user selects a plan
- Triggers subscription flow with comprehensive metadata including payment method and plan details

## Dependencies

### UI Components
- `Block`: Container component providing consistent padding and styling
- `Button`: Interactive element for plan subscription actions
- `PlanList`, `PlanItem`, `PlanListFallback`: Specialized components for plan display
- `Typography`: Text rendering with consistent styling

### Feature Components
- `BillingModeSwitch`: Toggle component for monthly/yearly billing mode selection

### Hooks & Services
- `useCurrentOrganizationSubscriptablePlans`: Query hook for fetching available plans
- `useSubscribeDialogStore`: Zustand store hook for subscription flow management

### Utilities
- `mapBillingPlans`: Transforms raw plan data into UI-ready format with subscription buttons

### Types
- `OrganizationPaymentMethod`: Type definition for payment method data
- `SubscribeDialogFlowType`: Enum for subscription dialog flow types

## Integration

### Application Architecture
- **Settings Flow**: Integrated into billing settings section as primary plan selection interface
- **Subscription System**: Serves as entry point to subscription creation workflow
- **Payment Integration**: Connects existing payment methods with new subscription flows
- **Organization Context**: Operates within organization-scoped data and permissions

### Data Flow
1. Component fetches organization's available plans
2. User toggles billing mode (monthly/yearly)
3. Plans re-render with updated pricing and billing cycles
4. User selects plan via "Subscribe" button
5. Component initiates subscription dialog flow with complete context
6. Subscription dialog handles payment processing and plan activation

## Best Practices

### Architecture Adherence
- ✅ **Client Component Usage**: Appropriately uses client component for interactive functionality
- ✅ **Component Decomposition**: Leverages specialized UI components (`PlanList`, `BillingModeSwitch`) rather than building monolithic structure
- ✅ **State Management**: Follows pattern with TanStack Query for server state, Zustand for global client state, React state for local UI state
- ✅ **Separation of Concerns**: Delegates subscription processing to specialized dialog components
- ✅ **Reusability**: Uses domain-agnostic UI components from `/ui/` directory

### Implementation Patterns
- **Memoization**: Uses `useMemo` for expensive plan transformation operations
- **Loading States**: Provides fallback UI for better user experience
- **Type Safety**: Properly types all props and state with TypeScript
- **Responsive Design**: Implements mobile-friendly layouts with Tailwind classes
- **Error Boundaries**: Gracefully handles missing data states