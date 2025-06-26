# ScheduledDigestType Component

## Purpose

The `ScheduledDigestType` component is a selectable signal type option that allows users to configure scheduled digest notifications. It presents a UI card for selecting "Most important" signal type with scheduling options, enabling users to receive curated reports with updates delivered on their preferred schedule.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive state through click handlers
- Uses multiple Zustand store hooks for state management
- Provides dynamic UI updates based on selection state
- Handles user interactions for signal type configuration

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | This component accepts no props and is self-contained |

## Usage Example

```tsx
import { ScheduledDigestType } from '@/components/signals/creation/signal-types/scheduled-digest-type';

function SignalCreationForm() {
  return (
    <div className="signal-types-container">
      <ScheduledDigestType />
      {/* Other signal type options */}
    </div>
  );
}
```

## Functionality

### Core Features
- **Signal Type Selection**: Configures signal as scheduled digest type when clicked
- **Visual Feedback**: Shows selected/unselected states with appropriate styling
- **Schedule Configuration**: Displays schedule controls (days and time) when selected
- **Edit Mode Handling**: Disables interaction when in edit mode
- **Validation Integration**: Clears validation errors when selected

### Behavior Patterns
- **Selection Logic**: Sets notification policy to SCHEDULED, signal type to ARTICLES, and selection policy to AI_NEWSLETTER_SUMMARY
- **Newsletter Configuration**: Automatically configures newsletter settings with bullet points format and max 10 events
- **Conditional Rendering**: Shows schedule configuration UI only when this type is selected
- **State Synchronization**: Maintains consistency across multiple store properties

## State Management

**Zustand Store Integration** via `useCreateSignalStore`:

### State Properties Used
- `notificationPolicy` - Current notification policy setting
- `signalType` - Selected signal type
- `selectionPolicy` - Policy for content selection
- `isEditMode` - Whether component is in edit mode
- `schedulePolicy` - Schedule configuration

### State Actions Used
- `setNotificationPolicy()` - Updates notification policy
- `setSignalType()` - Sets the signal type
- `setSelectionPolicy()` - Configures selection policy
- `setNewsletterConfig()` - Sets newsletter configuration
- `setSchedulePolicy()` - Updates schedule settings
- `clearValidationError()` - Removes validation errors

## Side Effects

### State Updates
- **Signal Configuration**: Sets multiple related state properties when selected
- **Validation Clearing**: Removes signal type validation errors on selection
- **Schedule Reset**: Clears existing schedule policy to reset configuration

### UI Effects
- **Dynamic Styling**: Updates container appearance based on selection state
- **Conditional Content**: Shows/hides schedule configuration interface
- **Interactive States**: Manages disabled and selected visual states

## Dependencies

### Internal Components
- `IconScheduledDigest` - Visual icon for the signal type
- `Typography` - Text styling and formatting
- `ScheduleDays` - Day selection component for scheduling
- `ScheduleTimeDropdown` - Time selection component for scheduling

### Utilities & Styles
- `signalTypeContainer` - CSS-in-JS styling function for container
- Various enums from `@/lib/types` for type safety

### State Management
- `useCreateSignalStore` - Zustand store for signal creation state

## Integration

### Signal Creation Flow
```
Signal Creation Form
├── Signal Type Selection
│   ├── ScheduledDigestType ← This component
│   ├── ImmediateAlertType
│   └── CustomScheduleType
├── Configuration Details
└── Validation & Submission
```

### State Flow Integration
1. **Selection Phase**: User clicks to select scheduled digest type
2. **Configuration Phase**: Component sets appropriate policies and configurations
3. **Schedule Phase**: Sub-components handle specific scheduling details
4. **Validation Phase**: Integrates with form validation system

## Best Practices

### Architecture Adherence
- ✅ **Flat Component Structure**: Uses composition with `ScheduleDays` and `ScheduleTimeDropdown`
- ✅ **State Management**: Properly uses Zustand for client state management
- ✅ **Component Decomposition**: Single responsibility for scheduled digest type selection
- ✅ **Reusability**: Self-contained component that can be used in different contexts

### Implementation Patterns
- **Memoized Computations**: Uses `useMemo` for derived state calculations
- **Callback Optimization**: Uses `useCallback` for event handler stability
- **Conditional Rendering**: Efficiently shows schedule controls only when needed
- **Type Safety**: Leverages TypeScript enums for consistent state values

### Performance Considerations
- Minimal re-renders through proper memoization
- Efficient state updates with targeted store actions
- Lazy rendering of schedule configuration UI