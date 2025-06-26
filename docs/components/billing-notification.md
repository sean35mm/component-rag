# BillingNotification Component

## Purpose

The `BillingNotification` component provides contextual billing alerts and notifications for users based on their subscription status. It displays different notification banners for various billing states including failed payments, canceled subscriptions, early access plans, and subscription issues requiring user action.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive elements and click handlers for payment actions
- Uses client-side routing with `useRouter` from Next.js
- Handles user interactions for payment flow management
- Requires real-time subscription status updates and user interactions

## Props Interface

### BillingNotification

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| - | - | - | No props required |

### RequiresActionAlertBanner

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| - | - | - | No props required |

## Usage Example

```tsx
import { BillingNotification } from '@/components/settings/billing/billing-notification';

export default function BillingSettingsPage() {
  return (
    <div className="billing-settings">
      {/* Notification banner appears at top of billing section */}
      <BillingNotification />
      
      <div className="billing-content">
        {/* Other billing components */}
      </div>
    </div>
  );
}

// Usage in layout or dashboard
export default function SettingsLayout({ children }) {
  return (
    <div className="settings-layout">
      <BillingNotification />
      {children}
    </div>
  );
}
```

## Functionality

### Core Features

- **Conditional Rendering**: Displays appropriate notification based on subscription state
- **Payment Recovery**: Provides action buttons to complete failed payments
- **Subscription Alerts**: Shows cancellation dates and access expiration warnings
- **Early Access Messaging**: Informs users about free tier limitations and upgrade options
- **Error State Handling**: Gracefully handles loading states and missing data

### Notification States

1. **Requires Action**: Failed payments or billing issues needing immediate attention
2. **Canceled Subscription**: Shows end date and resubscription options
3. **Early Access**: Encourages API plan upgrades for workspace users
4. **No Notification**: Clean state when billing is current

## State Management

### TanStack Query
- `useCurrentOrganization()` - Fetches organization and subscription data
- `useSubscriptionIntents()` - Retrieves payment intent information for failed payments

### Zustand Store
- `useSubscribeDialogStore` - Manages subscription dialog flow state
- Handles payment confirmation flow transitions

### Local State
- Uses `useMemo` and `useCallback` for performance optimization
- Manages computed action buttons and event handlers

## Side Effects

- **Router Navigation**: Redirects to support email for certain billing issues
- **Dialog State Changes**: Triggers subscription dialog flows for payment completion
- **External Links**: Opens email client for support contact

## Dependencies

### UI Components
- `AlertBanner` - Base notification banner component
- `PiSelectBoxCircleFill` - Icon for early access notifications

### Hooks & Utilities
- `useIsUserHasAccessToApi` - Determines API access permissions
- `isSubscriptionRequiresAction` - Subscription status validation utility
- `format` from `date-fns` - Date formatting for cancellation notices

### Constants & Configuration
- `SUPPORT_EMAIL` - Support contact email address
- `SubscribeDialogFlowType` - Payment flow type definitions

## Integration

### Application Architecture
```
Settings Page
├── BillingNotification (status alerts)
├── SubscriptionPlan (current plan details)
├── PaymentMethods (billing management)
└── Usage (API consumption)
```

### Data Flow
1. Component queries organization subscription status
2. Evaluates billing state using utility functions
3. Renders appropriate notification with contextual actions
4. Handles user interactions through Zustand store updates

## Best Practices

### Architecture Adherence
- ✅ **Proper Client Component Usage**: Uses client boundaries only for interactive features
- ✅ **Component Decomposition**: Separates `RequiresActionAlertBanner` as focused sub-component
- ✅ **State Management Patterns**: Combines TanStack Query for server state with Zustand for UI state
- ✅ **Conditional Rendering**: Clean early returns prevent unnecessary nesting

### Performance Optimizations
- Uses `useMemo` for expensive action button computations
- Implements `useCallback` for stable event handler references
- Early returns prevent unnecessary component rendering

### Error Handling
- Graceful loading state handling with undefined checks
- Fallback empty fragments for error states
- Safe property access with optional chaining

### Future Improvements
- TODO comment indicates planned closable notification feature
- Consider extracting notification state logic into custom hook
- Potential for notification persistence/dismissal tracking