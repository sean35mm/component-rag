# SubscriptionDetails Component

## Purpose

The `SubscriptionDetails` component displays comprehensive subscription and billing information for an organization, including usage metrics, costs, billing schedules, and payment methods. It serves as the primary interface for users to view their current subscription status and access billing-related actions.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Requires interactivity for action buttons with click handlers
- Uses `useMemo` for computed values that depend on props changes
- Handles dynamic content rendering based on conditional data

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `meta` | `SubscriptionDetailsMeta` | ✅ | Complete subscription metadata including pricing, usage, and available actions |

### SubscriptionDetailsMeta Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | `string` | ✅ | Subscription plan name |
| `hint` | `string \| null` | ✅ | Optional badge text (e.g., "Current Plan") |
| `numRequests` | `number` | ✅ | Current month's API request count |
| `price` | `number` | ✅ | Subscription price amount |
| `period` | `BillingPriceInterval` | ✅ | Billing interval (monthly, yearly, etc.) |
| `date` | `{ label: string; value: string } \| null` | ✅ | Billing date information with display label |
| `email` | `string \| null` | ✅ | Primary billing email address |
| `cardLast4` | `string \| null \| undefined` | ✅ | Last 4 digits of payment card |
| `actions` | `Array<{ label: string; variant: ButtonProps['variant']; onClick: () => void }>` | ✅ | Available billing actions (upgrade, cancel, etc.) |

## Usage Example

```tsx
import { SubscriptionDetails } from '@/components/settings/billing/subscription-details';

function BillingPage() {
  const handleUpgrade = () => {
    // Navigate to upgrade flow
    router.push('/billing/upgrade');
  };

  const handleCancel = () => {
    // Open cancellation modal
    setCancelModalOpen(true);
  };

  const subscriptionMeta = {
    name: "Professional Plan",
    hint: "Current Plan",
    numRequests: 45000,
    price: 99,
    period: "month" as BillingPriceInterval,
    date: {
      label: "Next billing date",
      value: "2024-02-15T00:00:00Z"
    },
    email: "billing@company.com",
    cardLast4: "4242",
    actions: [
      {
        label: "Upgrade Plan",
        variant: "primary" as const,
        onClick: handleUpgrade
      },
      {
        label: "Cancel Subscription",
        variant: "secondary" as const,
        onClick: handleCancel
      }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto">
      <SubscriptionDetails meta={subscriptionMeta} />
    </div>
  );
}
```

## Functionality

### Core Features
- **Usage Display**: Shows current API request usage with progress indication
- **Pricing Information**: Displays subscription cost with billing frequency
- **Billing Schedule**: Shows next billing or renewal dates when available
- **Payment Method**: Displays masked credit card information
- **Action Management**: Renders contextual action buttons for subscription management
- **Responsive Layout**: Adapts layout for mobile and desktop viewports

### Visual Elements
- **Status Badge**: Optional hint badge for plan status indication
- **Loading States**: Skeleton loaders for async data (API limits)
- **Icon Integration**: Uses Phosphor icons for billing and email indicators
- **Typography Hierarchy**: Consistent text sizing and color schemes

## State Management

### TanStack Query Integration
```tsx
const { data: requestLimit } = useCurrentOrganizationApiLimits({
  select: (it) => it.requestLimit,
});
```
- Fetches current organization's API request limits
- Uses selective data extraction to minimize re-renders
- Handles loading states with skeleton components

### Local State (useMemo)
- **Primary Columns**: Computed layout for main subscription metrics
- **Secondary Columns**: Computed layout for billing details
- Optimizes rendering performance by memoizing complex layouts

## Side Effects

### Data Fetching
- Automatically fetches API limits on component mount
- Handles loading and error states gracefully
- Updates display when limit data becomes available

### User Interactions
- Executes callback functions passed through action configurations
- No direct side effects - delegates to parent components
- Maintains separation of concerns for billing operations

## Dependencies

### UI Components
- `Badge` - Status indication
- `Block` - Layout container
- `Button` - Action triggers
- `Skeleton` - Loading states
- `Typography` - Text rendering

### Data & Utilities
- `date-fns` - Date formatting and parsing
- `useCurrentOrganizationApiLimits` - API limit data fetching
- Subscription constants (formatters, labels)

### Icons
- `PiBankCard2Line` - Payment method indicator
- `PiMailLine` - Billing email indicator

## Integration

### Application Architecture
```
Settings Page
└── Billing Section
    ├── SubscriptionDetails (current usage & plan info)
    ├── PaymentMethod (card management)
    └── BillingHistory (transaction history)
```

### Data Flow
1. Parent component fetches subscription data
2. Formats data into `SubscriptionDetailsMeta` structure
3. Passes action handlers for billing operations
4. Component handles display and user interactions
5. Delegates business logic back to parent components

## Best Practices

### Architecture Adherence
- ✅ **Client Component Usage**: Appropriately uses client-side rendering for interactivity
- ✅ **Component Composition**: Well-decomposed with clear single responsibility
- ✅ **State Management**: Proper separation of server state (TanStack Query) and computed state
- ✅ **Props Interface**: Strongly typed with comprehensive interface definitions

### Performance Optimization
- Uses `useMemo` for expensive layout calculations
- Selective data fetching with TanStack Query
- Conditional rendering to avoid unnecessary DOM updates
- Skeleton loading for perceived performance

### Maintainability
- Clear separation between data structure and presentation logic
- Flexible action system allowing parent control over behavior
- Consistent styling with design system components
- Comprehensive TypeScript interfaces for type safety