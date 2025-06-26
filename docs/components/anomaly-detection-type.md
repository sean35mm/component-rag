# AnomalyDetectionType Component

## Purpose

The `AnomalyDetectionType` component provides a selectable signal type option for anomaly detection (spike detection) within the signal creation workflow. It allows users to configure signals that alert when key trends significantly change, automatically setting up the appropriate policies and configuration for anomaly-based notifications.

## Component Type

**Client Component** - Uses the `'use client'` directive (implied by hooks usage) because it:
- Manages interactive state with Zustand store
- Handles click events and user interactions
- Uses refs for DOM manipulation and scrolling
- Requires client-side state management for the signal creation workflow

## Props Interface

This component accepts no props - it's a self-contained signal type selector.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | This component doesn't accept any props |

## Usage Example

```tsx
import { AnomalyDetectionType } from '@/components/signals/creation/signal-types/anomaly-detection-type';

// Used within a signal type selection interface
function SignalTypeSelector() {
  return (
    <div className="signal-types-container">
      <AnomalyDetectionType />
      {/* Other signal type options */}
    </div>
  );
}

// Typically used in signal creation workflows
function CreateSignalPage() {
  return (
    <div className="create-signal-layout">
      <h2>Choose Signal Type</h2>
      <AnomalyDetectionType />
    </div>
  );
}
```

## Functionality

### Core Features
- **Signal Type Selection**: Allows users to select anomaly detection as their signal type
- **Automatic Configuration**: Sets up appropriate policies when selected:
  - Signal type: `ARTICLES_VOLUME`
  - Notification policy: `SCHEDULED`
  - Selection policy: `LATEST`
  - Schedule policy: Predefined anomaly signal schedule
- **Conditional Rendering**: Shows detailed configuration options when selected
- **Edit Mode Handling**: Disables interaction when in edit mode
- **Auto-scroll**: Automatically scrolls to configuration section when selected

### Visual States
- **Default**: Unselected state with hover effects
- **Selected**: Highlighted state with expanded configuration
- **Disabled**: Non-interactive state during edit mode

## State Management

### Zustand Store Integration
Uses `useCreateSignalStore` for comprehensive signal creation state:

```tsx
// Read state
const signalType = useCreateSignalStore((state) => state.signalType);
const notificationPolicy = useCreateSignalStore((state) => state.notificationPolicy);
const isEditMode = useCreateSignalStore((state) => state.isEditMode);

// Write actions
const setSignalType = useCreateSignalStore((state) => state.setSignalType);
const setSchedulePolicy = useCreateSignalStore((state) => state.setSchedulePolicy);
const setNotificationPolicy = useCreateSignalStore((state) => state.setNotificationPolicy);
// ... other setters
```

### Computed State
- `isSelected`: Derived from signal type and notification policy combination
- `isDisabled`: Based on edit mode status

## Side Effects

### DOM Manipulation
- **Auto-scroll**: Uses `scrollToElementInTabContainer` utility when option is selected
- **Ref Management**: Maintains container reference for scroll targeting

### State Updates
When selected, triggers multiple store updates:
1. Sets schedule policy to anomaly-specific configuration
2. Clears newsletter configuration
3. Sets selection policy to latest
4. Forces notification policy to scheduled
5. Sets signal type to articles volume

## Dependencies

### Internal Components
- `IconAnomalyDetection`: Visual icon for the signal type
- `Typography`: Text rendering with consistent styling
- `AnomalyDetection`: Configuration component for anomaly settings

### Hooks & Stores
- `useCreateSignalStore`: Zustand store for signal creation state
- `useCallback`, `useMemo`, `useRef`: React hooks for optimization

### Utilities & Types
- `cn`: Class name utility for conditional styling
- `signalTypeContainer`: Shared styling function
- `scrollToElementInTabContainer`: Tab navigation utility
- Various enums: `NotificationPolicyEnum`, `SelectionPolicyEnum`, `SignalTypeEnum`

### Constants
- `ANOMALY_SIGNAL_SCHEDULE_POLICY`: Predefined schedule configuration

## Integration

### Signal Creation Workflow
```
SignalCreation → SignalTypeSelector → AnomalyDetectionType → AnomalyDetection
```

### Store Architecture
- Integrates with centralized `useCreateSignalStore`
- Coordinates with other signal type components
- Maintains consistent state across creation workflow

### Navigation Integration
- Works within tabbed interfaces
- Provides smooth scrolling to configuration sections
- Handles container-based navigation patterns

## Best Practices

### Architecture Adherence
✅ **Client Component Usage**: Appropriate use of client component for interactive features  
✅ **State Management**: Proper Zustand integration for complex state  
✅ **Component Decomposition**: Clean separation with `AnomalyDetection` child component  
✅ **Reusability**: Uses shared styling functions and utilities  

### Performance Optimizations
- `useMemo` for expensive computations (`isSelected`, `isDisabled`)
- `useCallback` for event handlers to prevent unnecessary re-renders
- Conditional rendering of heavy configuration component

### User Experience
- Clear visual feedback for selection states
- Automatic configuration setup reduces user effort
- Smooth scrolling enhances navigation experience
- Disabled state prevents invalid operations

### Code Organization
- Logical grouping of store selectors and actions
- Clear separation of concerns between selection and configuration
- Consistent naming conventions and type safety