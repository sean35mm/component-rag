# VolumeGraph Component

## Purpose

The `VolumeGraph` component serves as a container wrapper for visualizing and controlling anomaly detection volume thresholds in signal creation workflows. It connects the application's signal creation state management to the underlying chart visualization, allowing users to interactively set volume multipliers for anomaly detection algorithms.

## Component Type

**Client Component** - Uses 'use client' directive because it:
- Manages interactive state through Zustand stores
- Handles user interactions via callbacks
- Requires client-side state synchronization between multiple stores

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `readOnly` | `boolean` | Optional | `false` | When true, disables interactive controls and makes the graph view-only |

## Usage Example

```tsx
import { VolumeGraph } from '@/components/signals/creation/anomaly-detection/volume-graph';

// Interactive mode for signal creation
function SignalCreationForm() {
  return (
    <div className="signal-setup">
      <h3>Configure Anomaly Detection</h3>
      <VolumeGraph />
    </div>
  );
}

// Read-only mode for signal preview
function SignalPreview() {
  return (
    <div className="signal-preview">
      <h3>Signal Configuration Preview</h3>
      <VolumeGraph readOnly />
    </div>
  );
}

// Within a larger signal creation wizard
function AnomalyDetectionStep() {
  return (
    <section>
      <p>Adjust the volume threshold for anomaly detection:</p>
      <VolumeGraph />
    </section>
  );
}
```

## Functionality

### Core Features
- **Volume Threshold Visualization**: Displays current anomaly detection volume multiplier setting
- **Interactive Adjustment**: Allows users to modify volume thresholds through chart interactions
- **Read-Only Mode**: Supports view-only scenarios for previews or completed configurations
- **Dynamic State Sync**: Automatically reflects changes from the signal creation store
- **Conditional Interaction**: Enables/disables controls based on anomaly detection volume type

### Key Behaviors
- Converts percentage-based chart interactions to volume multiplier values
- Respects custom volume type settings to determine interactivity
- Maintains state consistency across the signal creation workflow
- Prevents modifications when in read-only mode

## State Management

### Zustand Store Integration
The component integrates with two primary Zustand stores:

**useCreateSignalStore**:
- `anomalyDetectionVolumeMultiplier` - Current volume threshold multiplier
- `anomalyDetectionVolumeType` - Type of volume detection (affects interactivity)
- `enhancedQuery` - Query data for chart visualization
- `queryTitle` - Display title for the chart
- `setAnomalyDetectionVolumeMultiplier` - Action to update multiplier

**useFiltersDrawerStore**:
- `filters` - Applied filters that affect volume calculations

### State Flow
1. Reads current volume settings from signal creation store
2. Passes data to chart component for visualization
3. Handles chart interactions and converts to appropriate multiplier values
4. Updates store state through provided actions

## Side Effects

### State Updates
- Modifies `anomalyDetectionVolumeMultiplier` in response to user interactions
- Triggers re-renders of dependent components when volume settings change

### User Interactions
- Chart position changes trigger volume multiplier recalculations
- Respects read-only mode to prevent unintended modifications

## Dependencies

### Internal Dependencies
- `VolumeGraphChart` - Underlying chart visualization component
- `useCreateSignalStore` - Signal creation state management
- `useFiltersDrawerStore` - Filter state management
- `getAnomalyArticlesVolumeMultiplier` - Utility for multiplier calculations
- `AnomalyDetectionVolumeType` - Type definitions for volume detection modes

### External Dependencies
- React hooks (`useCallback`) for performance optimization

## Integration

### Application Architecture Role
The component serves as a bridge between:
- **State Layer**: Zustand stores managing signal creation workflow
- **UI Layer**: Chart visualization components
- **Business Logic**: Volume multiplier calculation utilities

### Workflow Integration
- **Signal Creation**: Primary use case within anomaly detection configuration
- **Signal Editing**: Supports modification of existing signal parameters
- **Signal Preview**: Read-only mode for displaying configured settings

### Data Flow
```
User Interaction → Chart Component → VolumeGraph → Store Update → State Propagation
```

## Best Practices

### Architecture Adherence
✅ **Component Decomposition**: Properly delegates chart rendering to specialized component  
✅ **State Management**: Uses appropriate Zustand stores for client-side state  
✅ **Separation of Concerns**: Focuses on state coordination rather than visualization logic  
✅ **Reusability**: Supports multiple use cases through read-only prop  

### Performance Considerations
- Uses `useCallback` to memoize event handlers and prevent unnecessary re-renders
- Delegates complex visualization logic to child components
- Minimal state subscriptions to reduce update frequency

### Error Handling
- Gracefully handles missing state values with fallback defaults
- Prevents interactions when in inappropriate modes (read-only, wrong volume type)

### Accessibility
- Inherits accessibility features from underlying chart component
- Maintains semantic structure for assistive technologies