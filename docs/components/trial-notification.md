# TrialNotification Component

## Purpose

The `TrialNotification` component displays a time-sensitive alert banner to notify users about their API trial expiration. It shows the remaining days in the trial and provides a call-to-action to manage their subscription, helping prevent service interruption.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Requires the `useRouter` hook for navigation
- Uses interactive event handlers (`onClick`)
- Manages client-side routing to the billing page

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | `undefined` | Optional CSS class for styling the notification banner |

```tsx
export interface TrialNotificationProps {
  className?: string;
}
```

## Usage Example

```tsx
import { TrialNotification } from '@/components/developers/trial-notification';

// Basic usage
export default function DeveloperDashboard() {
  return (
    <div>
      <TrialNotification />
      {/* Other dashboard content */}
    </div>
  );
}

// With custom styling
export default function ApiDocsPage() {
  return (
    <div>
      <TrialNotification className="mb-6 mx-4" />
      {/* API documentation content */}
    </div>
  );
}
```

## Functionality

- **Trial Detection**: Automatically identifies active API trials for the current organization
- **Dynamic Countdown**: Calculates and displays remaining trial days using date arithmetic
- **Smart Pluralization**: Handles singular/plural day formatting (e.g., "1 day" vs "2 days")
- **Conditional Rendering**: Only displays when an active trial exists
- **Navigation Integration**: Provides direct link to billing management

## State Management

**TanStack Query**: Uses server state management for trial data
- `useCurrentOrganizationTrials()` - Fetches organization trial information
- Automatically handles caching, refetching, and loading states
- Data is memoized to prevent unnecessary recalculations

```tsx
const { data: trials } = useCurrentOrganizationTrials();
const trial = useMemo((): OrganizationTrial | null | undefined => {
  return trials ? getFirstActiveApiTrial(trials, new Date()) : undefined;
}, [trials]);
```

## Side Effects

- **Navigation**: Triggers client-side navigation to `/account/billing` when action button is clicked
- **Date Calculations**: Performs real-time date difference calculations on each render
- **API Queries**: Fetches trial data through TanStack Query hooks

## Dependencies

### Components
- `AlertBanner` - UI component for displaying the notification
- Next.js `useRouter` - Client-side navigation

### Hooks & Services
- `useCurrentOrganizationTrials` - Query hook for trial data
- `getFirstActiveApiTrial` - Utility for filtering active trials

### Utilities
- `date-fns/differenceInCalendarDays` - Date arithmetic
- `pluralize` - Text pluralization

### Types
- `OrganizationTrial` - Type definition for trial data structure

## Integration

The component integrates into the application architecture as:

1. **Developer-Focused Feature**: Located in `/developers/` indicating it's part of the developer experience
2. **Cross-Page Usage**: Can be embedded in any developer-facing page (dashboards, documentation, API console)
3. **Billing Integration**: Connects users to the subscription management flow
4. **Notification System**: Part of the broader user notification and alert system

## Best Practices

✅ **Follows Architecture Guidelines**:
- **Minimal Client Usage**: Only uses 'use client' for necessary interactivity
- **Proper State Management**: Uses TanStack Query for server state
- **Component Decomposition**: Leverages existing UI components (`AlertBanner`)
- **Domain Organization**: Properly placed in developer-specific directory

✅ **Performance Optimizations**:
- Memoizes trial calculations to prevent unnecessary processing
- Conditional rendering prevents DOM pollution when no trial exists
- Leverages TanStack Query caching for efficient data fetching

✅ **User Experience**:
- Clear, actionable messaging with urgency
- Direct path to resolution (billing page)
- Graceful handling of loading and empty states

✅ **Type Safety**:
- Proper TypeScript interfaces
- Handles undefined/null states safely
- Uses typed query hooks and utilities