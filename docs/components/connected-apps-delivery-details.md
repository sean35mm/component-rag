# ConnectedAppsDeliveryDetails Component

## Purpose

The `ConnectedAppsDeliveryDetails` component displays and manages connected applications for signal delivery. It shows active configurations, handles loading states, and provides functionality to edit delivery preferences. The component automatically manages FASTN contact points based on the availability of active configurations.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Local state management with `useState` hooks
- Side effects with `useEffect` for automatic signal updates
- Interactive collapsible behavior
- Event handlers for user interactions

## Props Interface

### ConnectedAppsDeliveryDetailsProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `signal` | `Signal` | ✅ | The signal object containing contact points and configuration details |
| `onEditDeliveryPreferences` | `() => void` | ✅ | Callback function triggered when user wants to edit delivery preferences |

### ConnectedAppsContentProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `activeConfigurations` | `Configuration[]` | ✅ | Array of active (enabled) configurations |
| `hasFastnContactPoint` | `boolean` | ✅ | Whether the signal has a FASTN contact point |
| `onEditDeliveryPreferences` | `() => void` | ✅ | Callback for editing delivery preferences |

## Usage Example

```tsx
import { ConnectedAppsDeliveryDetails } from '@/components/signals/details/connected-apps/connected-apps-delivery-details';

function SignalDetailsPage() {
  const signal = useSignal(signalId);
  
  const handleEditDeliveryPreferences = () => {
    // Navigate to delivery preferences editor
    router.push(`/signals/${signal.uuid}/delivery-preferences`);
  };

  return (
    <div className="signal-details">
      <ConnectedAppsDeliveryDetails
        signal={signal}
        onEditDeliveryPreferences={handleEditDeliveryPreferences}
      />
    </div>
  );
}
```

## Functionality

### Core Features

1. **Collapsible Interface**: Expandable/collapsible section with "See all" toggle
2. **Loading States**: Skeleton loading UI while fetching configurations
3. **Configuration Display**: Shows active connected applications with their details
4. **Empty State**: Displays message and edit button when no active configurations exist
5. **Automatic Cleanup**: Removes FASTN contact points when no active configurations remain

### State Management

- **Expansion State**: Local `useState` for collapsible behavior
- **Configurations**: TanStack Query via `useConfigurations` hook
- **Signal Updates**: TanStack Query via `useUpdateSignal` mutation

### Conditional Rendering Logic

```tsx
// Shows configurations if FASTN contact point exists and configurations are active
if (hasFastnContactPoint && activeConfigurations.length > 0) {
  return <ConfigurationList />;
}

// Otherwise shows empty state with edit option
return <EmptyStateWithEditButton />;
```

## State Management

The component follows our architectural patterns for state management:

- **Server State**: Uses TanStack Query for fetching configurations and updating signals
- **Local State**: Uses React's `useState` for UI state (collapsible expansion)
- **Derived State**: Uses `useMemo` for computed values (active configurations, FASTN contact point detection)

## Side Effects

### Automatic Signal Updates

The component includes a critical side effect that automatically cleans up signals:

```tsx
useEffect(() => {
  // Removes FASTN contact points when no active configurations exist
  if (hasFastnContactPoint && activeConfigurations.length === 0) {
    updateSignalAsync({
      contactPointIds: signal.contactPoints
        .filter((c) => c.type !== ContactPointTypeEnum.FASTN)
        .map((c) => c.id)
    });
  }
}, [hasFastnContactPoint, activeConfigurations.length, ...]);
```

### Error Handling

- Uses Sentry for error capture with specific scope
- Mutation configured with `throwOnError: false` for graceful error handling

## Dependencies

### Internal Dependencies

- `@/components/signals/details/connected-apps/connected-apps-delivery-item`
- `@/components/signals/details/delivery-details` (IconWrapper)
- `@/components/ui/*` (Button, Collapsible, Skeleton, Typography)
- `@/lib/query-hooks` (useUpdateSignal)
- `@/lib/types` (Signal, ContactPointTypeEnum)

### External Dependencies

- `@fastn-ai/react` (Configuration, useConfigurations)
- Phosphor icons for UI elements

## Integration

### Application Architecture Role

1. **Signal Management**: Part of the signal details flow for delivery configuration
2. **Configuration Integration**: Connects with FASTN AI's configuration system
3. **Contact Point Management**: Handles FASTN-specific contact point lifecycle
4. **Delivery Preferences**: Integrates with delivery preference editing workflow

### Data Flow

```
Signal → useConfigurations → Filter Active → Display/Update
```

## Best Practices

### Adherence to Architecture Guidelines

✅ **Component Decomposition**: Properly decomposed into three logical components
- `ConnectedAppsLoadingSkeleton` - Loading state
- `ConnectedAppsContent` - Content rendering logic  
- `ConnectedAppsDeliveryDetails` - Main orchestrator

✅ **State Management**: Follows patterns correctly
- TanStack Query for server state
- Local state for UI interactions
- Proper memoization for derived state

✅ **Error Handling**: Implements comprehensive error handling
- Sentry integration for monitoring
- Graceful degradation with loading states

✅ **Reusability**: Uses UI components from `/ui/` directory

✅ **Side Effect Management**: Properly manages side effects with dependency arrays and loading guards

### Performance Optimizations

- Uses `useMemo` for expensive computations
- Proper dependency arrays in `useEffect`
- Skeleton loading for better perceived performance
- Conditional rendering to avoid unnecessary work