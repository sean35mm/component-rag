# AsItHappensType Component Documentation

## Purpose

The `AsItHappensType` component provides a signal configuration interface that allows users to set up continuous monitoring alerts. It enables users to choose between real-time notifications ("as it happens") and daily roundup delivery options, with built-in volume management for high-traffic searches. This component is part of the signal creation workflow, specifically handling the configuration of continuous monitoring signals.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive state through radio buttons and dropdowns
- Handles click events and form interactions
- Uses React hooks for state management and memoization
- Integrates with Zustand stores that require client-side reactivity

## Props Interface

This component doesn't accept any props - it's a self-contained configuration step that manages its state through Zustand stores.

## Usage Example

```tsx
import { AsItHappensType, HighVolumeCallout } from '@/components/signals/creation/signal-types/as-it-happens-type';

// Basic usage in signal creation flow
function SignalCreationStep() {
  return (
    <div className="signal-creation-container">
      <h2>Choose Signal Type</h2>
      <AsItHappensType />
    </div>
  );
}

// Standalone high volume warning
function SearchVolumeWarning() {
  return (
    <div className="search-feedback">
      <HighVolumeCallout />
    </div>
  );
}

// Using exported constants
import { ALL_DAYS } from '@/components/signals/creation/signal-types/as-it-happens-type';

function ScheduleConfig() {
  const defaultSchedule = {
    intervals: [{
      hour: 9,
      minute: 0,
      days: ALL_DAYS, // All week days
    }]
  };
  
  return <ScheduleSelector defaultValue={defaultSchedule} />;
}
```

## Functionality

### Core Features
- **Signal Type Selection**: Configures continuous monitoring with latest article selection
- **Delivery Options**: Radio button selection between "as it happens" and "daily roundup"
- **Volume Management**: Automatically detects high-volume searches and shows warning callout
- **Schedule Configuration**: Provides time selection for daily roundup option
- **Edit Mode Handling**: Disables interactions when in edit mode
- **Validation Integration**: Clears relevant validation errors on user interaction

### Interactive Behaviors
- **Click to Select**: Main container click activates the signal type
- **Delivery Toggle**: Radio buttons switch between immediate and scheduled delivery
- **Dynamic Content**: Shows different UI based on selection and article volume
- **Navigation**: High volume callout can redirect users back to search editing

## State Management

### Zustand Store Integration
```tsx
// Primary state management through useCreateSignalStore
const signalType = useCreateSignalStore((state) => state.signalType);
const deliveryOption = useCreateSignalStore((state) => state.deliveryOption);
const setNotificationPolicy = useCreateSignalStore((state) => state.setNotificationPolicy);
const clearValidationError = useCreateSignalStore((state) => state.clearValidationError);

// Additional stores
const filters = useFiltersDrawerStore((state) => state.filters);
```

### State Updates
- **Signal Configuration**: Sets `SignalTypeEnum.ARTICLES` and `SelectionPolicyEnum.LATEST`
- **Notification Policy**: Switches between `IMMEDIATE` and `SCHEDULED` based on delivery option
- **Schedule Policy**: Creates default UTC schedule for daily roundup (9 AM local time)
- **Validation**: Clears signal type and schedule policy validation errors

## Side Effects

### Data Fetching
```tsx
const { data: averageArticlesPerMonth } = useIntervalArticleCounts(
  getSignalIntervalArticleCountsParams(enhancedQuery, queryTitle, entities, filters),
  { select: (data) => getAverageArticlesPerMonth(data.results) }
);
```

### Navigation Side Effects
- **Step Navigation**: Can redirect users to previous steps via `setActiveStep`
- **State Reset**: Resets subsequent steps when navigating backwards
- **Store Updates**: Multiple store updates when changing delivery options

## Dependencies

### UI Components
- `Button`, `Callout` family, `RadioGroup`, `Typography` from `/ui/` directory
- `ScheduleTimeDropdown` for time selection
- Custom icons: `IconAsItHappens`, `PiErrorWarningLine`

### Hooks and Utilities
- `useIntervalArticleCounts` for volume data fetching
- `getAverageArticlesPerMonth`, `getSignalArticleVolumeRange` for volume calculations
- `getSignalIntervalArticleCountsParams` for query parameter construction

### Store Dependencies
- `useCreateSignalStore` for signal creation state
- `useFiltersDrawerStore` for search filter state

## Integration

### Signal Creation Workflow
```tsx
// Part of multi-step signal creation process
SIGNAL_CREATION_STEP.STEP2 → AsItHappensType (Step 3) → Next Steps

// State flow integration
Search Criteria → Signal Type Selection → Schedule Configuration → Final Creation
```

### Volume Management Flow
```tsx
// High volume detection and handling
Search Query → Article Count API → Volume Analysis → 
  High Volume → Show Warning + Dashboard Option
  Normal Volume → Allow Email Delivery
```

## Best Practices

### Architecture Adherence
- ✅ **Component Decomposition**: Cleanly separated `HighVolumeCallout` as reusable sub-component
- ✅ **State Management**: Proper Zustand integration for client state, TanStack Query for server state
- ✅ **Client Boundaries**: Correctly uses client component for interactive functionality
- ✅ **Single Responsibility**: Focused on signal type configuration without mixing concerns

### Performance Optimizations
```tsx
// Memoized computations
const articleVolumeRange = useMemo(() => {
  return getSignalArticleVolumeRange(averageArticlesPerMonth);
}, [averageArticlesPerMonth]);

// Optimized callbacks
const handleClick = useCallback(() => {
  // Batch state updates
}, [dependencies]);
```

### Error Handling
- **Validation Integration**: Proactively clears validation errors on user interaction
- **Graceful Degradation**: Handles missing volume data with sensible defaults
- **Edit Mode Protection**: Prevents unintended modifications in edit mode

### Accessibility
- **Semantic Structure**: Uses proper radio group semantics
- **Click Targets**: Adequate size for interactive elements
- **Visual Feedback**: Clear selected/disabled states