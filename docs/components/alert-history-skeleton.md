# AlertHistorySkeleton Component

## Purpose

The `AlertHistorySkeleton` component provides a loading skeleton for the alert history view in the signals details section. It displays placeholder content with animated loading states to improve perceived performance while the actual alert history data is being fetched from the server.

## Component Type

**Server Component** - This is a server component as it only renders static skeleton UI without any client-side interactivity, state management, or event handlers. It doesn't require the 'use client' directive.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| *No props* | - | - | This component accepts no props and renders a fixed skeleton layout |

## Usage Example

```tsx
import { AlertHistorySkeleton } from '@/components/signals/details/alert-history-skeleton';

// In a signals detail page or component
export function SignalDetailsPage({ signalId }: { signalId: string }) {
  const { data: alertHistory, isLoading } = useQuery({
    queryKey: ['alert-history', signalId],
    queryFn: () => fetchAlertHistory(signalId),
  });

  return (
    <div className="flex h-full">
      {isLoading ? (
        <AlertHistorySkeleton />
      ) : (
        <AlertHistoryContent data={alertHistory} />
      )}
    </div>
  );
}

// In a Suspense boundary
export function SignalDetailsWithSuspense() {
  return (
    <Suspense fallback={<AlertHistorySkeleton />}>
      <AlertHistoryContainer />
    </Suspense>
  );
}
```

## Functionality

- **Two-Panel Layout**: Mimics the actual alert history with a left panel (history list) and right panel (details)
- **Responsive Design**: Adapts layout for mobile (single column) and desktop (two columns)
- **List Simulation**: Renders 10 skeleton rows to simulate a typical alert history list
- **Header Structure**: Includes skeleton headers matching the actual component structure
- **Loading Animations**: Uses the Skeleton component for smooth loading animations
- **Scrollable Areas**: Maintains the same scroll behavior as the actual component

## State Management

**No State Management** - This component is stateless and purely presentational. It doesn't interact with TanStack Query, Zustand, or maintain any local state.

## Side Effects

**No Side Effects** - This component has no side effects, API calls, or external interactions. It's a pure rendering component.

## Dependencies

### Internal Dependencies
- `@/components/ui/skeleton` - Core skeleton loading component
- `@/components/ui/typography` - Typography component for headers

### External Dependencies
- **React** - Core React functionality
- **Tailwind CSS** - Styling and responsive design classes

## Integration

### Application Architecture
- **Domain**: Part of the signals feature domain (`src/components/signals/details/`)
- **UI Layer**: Acts as a loading state in the presentation layer
- **Data Layer**: Works with TanStack Query loading states for alert history data
- **Layout**: Integrates with responsive layouts and container components

### Related Components
```tsx
// Typical integration pattern
const AlertHistorySection = () => {
  const { data, isLoading } = useAlertHistory(signalId);
  
  if (isLoading) return <AlertHistorySkeleton />;
  
  return <AlertHistoryContent data={data} />;
};
```

## Best Practices

### Architectural Adherence
- ✅ **Server Component**: Correctly implemented as a server component without unnecessary client-side code
- ✅ **Component Decomposition**: Flat structure using composable UI components
- ✅ **Reusability**: Uses shared UI components from `/ui/` directory
- ✅ **Domain Organization**: Properly placed in signals feature directory

### Implementation Patterns
- **Consistent Structure**: Skeleton layout matches the actual component structure
- **Responsive Design**: Proper mobile-first responsive breakpoints
- **Accessibility**: Maintains semantic structure for screen readers
- **Performance**: Lightweight with no JavaScript bundle impact

### Usage Guidelines
```tsx
// ✅ Good: Use with data fetching
const { isLoading } = useQuery(...);
if (isLoading) return <AlertHistorySkeleton />;

// ✅ Good: Use with Suspense boundaries
<Suspense fallback={<AlertHistorySkeleton />}>

// ❌ Avoid: Don't use for error states
if (error) return <AlertHistorySkeleton />; // Use error component instead
```

### Design Consistency
- Skeleton dimensions match actual content sizes
- Responsive breakpoints align with design system
- Loading animation timing follows UI guidelines
- Color scheme respects dark/light mode theming