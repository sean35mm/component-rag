# AlertHistoryNoResults Component

## Purpose

The `AlertHistoryNoResults` component displays an empty state when no alert history is available for a signal. It provides visual feedback to users with a placeholder image, informative message, and a refresh action to check for updates without requiring a full page reload.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Utilizes the `useRouter` hook for navigation functionality
- Handles user interactions (refresh button click)
- Requires browser-side JavaScript for the refresh functionality

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| None | - | - | This component accepts no props |

## Usage Example

```tsx
// In a signal details page or alert history section
import { AlertHistoryNoResults } from '@/components/signals/details/alert-history-no-results';

function SignalAlertHistory({ alerts }: { alerts: Alert[] }) {
  if (alerts.length === 0) {
    return <AlertHistoryNoResults />;
  }

  return (
    <div className="alert-history">
      {alerts.map(alert => (
        <AlertHistoryItem key={alert.id} alert={alert} />
      ))}
    </div>
  );
}

// Or in a conditional render within alert management
function AlertManagementPanel() {
  const { data: alerts, isLoading } = useQuery({
    queryKey: ['alerts'],
    queryFn: fetchAlerts
  });

  if (isLoading) return <LoadingSpinner />;
  
  return (
    <div className="alerts-panel">
      {alerts?.length ? (
        <AlertsList alerts={alerts} />
      ) : (
        <AlertHistoryNoResults />
      )}
    </div>
  );
}
```

## Functionality

- **Empty State Display**: Renders a visually appealing placeholder when no alerts exist
- **Responsive Design**: Adapts image size based on screen size (180px on mobile, 341px on desktop)
- **User-Friendly Messaging**: Provides encouraging, conversational copy to set expectations
- **Refresh Action**: Allows users to manually check for new alerts without page reload
- **Consistent Styling**: Uses design system components for typography and buttons

## State Management

- **No State Management**: This component is stateless and doesn't manage any application state
- **Router State**: Utilizes Next.js router for navigation refresh functionality
- **Pure Presentation**: Focuses solely on UI presentation and user interaction

## Side Effects

- **Router Refresh**: `router.refresh()` triggers a soft refresh of the current route
- **Image Loading**: Loads placeholder image from the public directory
- **No API Calls**: Component doesn't directly make API calls; refresh delegates to parent components

## Dependencies

### Internal Dependencies
- `@/components/ui/button` - Design system button component
- `@/components/ui/typography` - Design system typography component

### External Dependencies
- `next/image` - Optimized image component from Next.js
- `next/navigation` - Next.js App Router navigation hooks
- `react` - Core React functionality

### Assets
- `/placeholders/alert-placeholder.png` - Placeholder image for empty state

## Integration

### Application Architecture
- **Domain Location**: Located in `signals/details/` indicating it's part of the signals feature domain
- **Empty State Pattern**: Follows the application's empty state UI patterns
- **Design System Integration**: Uses consistent UI components from the design system
- **Feature Component**: Domain-specific component that handles signal alert history edge cases

### Parent Components
- Signal details pages
- Alert history sections
- Alert management dashboards
- Any component displaying alert collections

## Best Practices

### Architecture Adherence
- ✅ **Flat Component Structure**: Simple, single-purpose component without nested complexity
- ✅ **Domain Organization**: Properly placed in signals feature domain
- ✅ **Client Component Usage**: Appropriately uses client component for interactive functionality
- ✅ **Design System Integration**: Leverages UI components for consistency

### Performance Considerations
- ✅ **Optimized Images**: Uses Next.js Image component for performance
- ✅ **Soft Refresh**: Uses `router.refresh()` for better UX than hard reload
- ✅ **Minimal Bundle**: No unnecessary dependencies or complex state management

### User Experience
- ✅ **Clear Messaging**: Provides friendly, informative copy
- ✅ **Action Availability**: Offers immediate action (refresh) for users
- ✅ **Responsive Design**: Adapts to different screen sizes
- ✅ **Visual Hierarchy**: Uses proper typography variants and spacing

### Code Quality
- ✅ **Single Responsibility**: Focused solely on empty state presentation
- ✅ **Accessibility**: Proper alt text for images
- ✅ **Type Safety**: Fully typed with TypeScript
- ✅ **Consistent Styling**: Uses Tailwind classes following project patterns