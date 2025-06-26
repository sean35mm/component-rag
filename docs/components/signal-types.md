# SignalTypes Component

## Purpose

The `SignalTypes` component serves as the signal type selection interface within the signal creation workflow. It renders three distinct signal type options (As It Happens, Anomaly Detection, and Scheduled Digest) and handles validation error display for signal type and schedule policy selections.

## Component Type

**Client Component** - This component uses the `'use client'` directive (implicitly required) because it:
- Consumes client-side state from Zustand store (`useCreateSignalStore`)
- Handles interactive form elements for signal type selection
- Manages real-time validation error display

## Props Interface

| Prop Name | Type | Required | Description |
|-----------|------|----------|-------------|
| N/A | N/A | N/A | This component accepts no props |

## Usage Example

```tsx
import { SignalTypes } from '@/components/signals/creation/signal-types';

function SignalCreationForm() {
  return (
    <div className="signal-creation-container">
      <h2>Create New Signal</h2>
      
      {/* Signal type selection step */}
      <div className="form-section">
        <h3>Choose Signal Type</h3>
        <SignalTypes />
      </div>
      
      {/* Other form sections */}
      <div className="form-actions">
        <button type="submit">Create Signal</button>
      </div>
    </div>
  );
}
```

## Functionality

### Core Features
- **Signal Type Selection**: Renders three signal type options as selectable cards
- **Validation Error Display**: Shows validation errors for signal type and schedule policy
- **Responsive Layout**: Adapts spacing and layout for different screen sizes
- **Error Aggregation**: Displays either signal type or schedule policy validation errors

### User Interactions
- Users can select from three signal types: As It Happens, Anomaly Detection, or Scheduled Digest
- Real-time validation feedback appears when selection errors occur
- Visual feedback for selected/unselected states

## State Management

### Zustand Store Integration
```tsx
// Accesses validation errors from create signal store
const signalTypeValidationError = useCreateSignalStore(
  (state) => state.validationErrors[SIGNAL_CREATION_VALIDATION_ERRORS.SIGNAL_TYPE]
);

const schedulePolicyValidationError = useCreateSignalStore(
  (state) => state.validationErrors[SIGNAL_CREATION_VALIDATION_ERRORS.SCHEDULE_POLICY]
);
```

**State Dependencies:**
- `validationErrors.SIGNAL_TYPE` - Validation error for signal type selection
- `validationErrors.SCHEDULE_POLICY` - Validation error for schedule policy configuration

## Side Effects

**None** - This component is purely presentational and state-reading:
- No API calls or external service interactions
- No side effects beyond reading from Zustand store
- No local state mutations

## Dependencies

### Internal Components
- `ValidationError` - Displays validation error messages
- `AsItHappensType` - Real-time signal type option
- `AnomalyDetectionType` - Anomaly detection signal type option  
- `ScheduledDigestType` - Scheduled digest signal type option

### Hooks & Context
- `useCreateSignalStore` - Zustand store for signal creation state
- `SIGNAL_CREATION_VALIDATION_ERRORS` - Validation error type constants

### External Dependencies
- React (implicit)
- Tailwind CSS classes for styling

## Integration

### Application Architecture Role
```
Signal Creation Flow
├── SignalCreationWizard
│   ├── SignalTypes (current component)
│   │   ├── AsItHappensType
│   │   ├── AnomalyDetectionType
│   │   └── ScheduledDigestType
│   ├── SignalConfiguration
│   └── SignalReview
```

### Data Flow
1. **Input**: Validation errors from `useCreateSignalStore`
2. **Processing**: Conditional error display logic
3. **Output**: Rendered signal type options with error feedback
4. **State Updates**: Child components handle signal type selection via store

## Best Practices

### Architecture Compliance
✅ **Component Decomposition**: Follows flat composition pattern with clear child components  
✅ **State Management**: Properly uses Zustand for client-side form state  
✅ **Reusability**: Domain-specific component appropriately placed in feature directory  
✅ **Separation of Concerns**: Validation logic separated from presentation  

### Implementation Patterns
- **Error Handling**: Graceful validation error display with fallback behavior
- **Responsive Design**: Mobile-first approach with `lg:` breakpoint modifiers
- **Component Composition**: Clear parent-child relationship with signal type variants
- **State Access**: Efficient store selectors to minimize re-renders

### Performance Considerations
- Minimal store subscriptions with targeted selectors
- No unnecessary re-renders from store changes
- Lightweight component with delegated complexity to children