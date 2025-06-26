# AnomalyDetection Component

## Purpose

The `AnomalyDetection` component provides an interface for detecting and visualizing anomalies within the signals creation workflow. It serves as a container component that orchestrates volume selection and graphical display of anomaly detection data, enabling users to configure and monitor volume-based anomaly detection parameters for signal creation.

## Component Type

**Server Component** - This component is implemented as a server component since it only handles layout composition without requiring client-side interactivity at this level. The interactive functionality is delegated to its child components (`VolumeDropdown` and `VolumeGraph`), following our architecture pattern of keeping container components on the server when possible.

## Props Interface

| Prop Name | Type | Required | Description |
|-----------|------|----------|-------------|
| No props | - | - | This component accepts no props and manages its internal composition |

## Usage Example

```tsx
import { AnomalyDetection } from '@/components/signals/creation/anomaly-detection/anomaly-detection';

// Basic usage within a signal creation form
export function SignalCreationPage() {
  return (
    <div className="space-y-6">
      <h2>Create New Signal</h2>
      
      {/* Other signal configuration sections */}
      
      <section>
        <h3>Anomaly Detection Configuration</h3>
        <AnomalyDetection />
      </section>
      
      {/* Additional form sections */}
    </div>
  );
}

// Usage in a multi-step wizard
export function AnomalyDetectionStep() {
  return (
    <div className="wizard-step">
      <div className="step-header">
        <h3>Configure Anomaly Detection</h3>
        <p>Set up volume-based anomaly detection parameters</p>
      </div>
      
      <AnomalyDetection />
      
      <div className="step-actions">
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  );
}
```

## Functionality

- **Volume Selection Interface**: Provides dropdown controls for selecting volume parameters and thresholds
- **Visual Data Representation**: Displays volume data and anomaly patterns through interactive graphs
- **Layout Management**: Arranges child components in a vertical stack with consistent spacing
- **Responsive Design**: Implements full-width layout that adapts to container constraints
- **Component Orchestration**: Coordinates the interaction between volume selection and visualization components

## State Management

This component follows a **stateless container pattern**:

- **No Direct State**: The component itself manages no state, acting purely as a layout container
- **Child Component State**: State management is delegated to child components:
  - `VolumeDropdown`: Likely manages selection state using React Hook Form or local state
  - `VolumeGraph`: Potentially uses TanStack Query for fetching graph data
- **State Coordination**: Child components communicate through shared context or parent component state management when this component is embedded in forms

## Side Effects

- **No Direct Side Effects**: This container component produces no side effects
- **Delegated Effects**: Side effects are handled by child components:
  - API calls for volume data fetching
  - Graph rendering and updates
  - Form state synchronization

## Dependencies

### Internal Components
- `VolumeDropdown` - Provides volume parameter selection interface
- `VolumeGraph` - Renders volume data visualization and anomaly detection graphs

### External Dependencies
- **React**: Core framework for component composition
- **Tailwind CSS**: Styling through className utilities for layout and spacing

### Implicit Dependencies
- Child components may depend on:
  - TanStack Query for data fetching
  - Chart libraries for graph rendering
  - Form context for state management

## Integration

### Application Architecture Role
- **Signals Domain**: Part of the signals creation workflow within the broader application
- **Feature Component**: Domain-specific component that encapsulates anomaly detection functionality
- **Composition Layer**: Serves as a composition point between UI components and business logic

### Data Flow Integration
```
Signal Creation Flow
├── Signal Configuration
├── AnomalyDetection (this component)
│   ├── VolumeDropdown (parameter selection)
│   └── VolumeGraph (data visualization)
└── Signal Validation
```

### Form Integration
When integrated with forms, this component likely participates in:
- React Hook Form field registration through child components
- Zod schema validation for anomaly detection parameters
- Form state persistence and validation feedback

## Best Practices

### Architecture Adherence
- ✅ **Server Component Default**: Correctly implemented as server component for layout composition
- ✅ **Component Decomposition**: Follows flat decomposition pattern with clear separation of concerns
- ✅ **Domain Organization**: Properly placed within signals creation domain structure
- ✅ **Lego Block Pattern**: Simple, composable component that can be easily integrated

### Implementation Patterns
- ✅ **Separation of Concerns**: Layout logic separated from business logic
- ✅ **Responsive Design**: Uses Tailwind utilities for flexible layout
- ✅ **Consistent Spacing**: Implements design system spacing patterns
- ✅ **Single Responsibility**: Focused solely on composition and layout

### Usage Recommendations
- Embed within form components using React Hook Form for state management
- Use within step-based wizards for signal creation workflows
- Combine with error boundaries for robust error handling
- Implement loading states at the parent level when needed for better UX