# Step4 Component

## Purpose

The `Step4` component represents the final step in the signal creation wizard, where users configure alert methods and contact points for their signal notifications. It validates the selected alert methods, handles the final signal submission, and manages contact point filtering based on signal configuration.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive form state and validation
- Handles user callbacks and event handlers
- Interacts with multiple Zustand stores for state management
- Performs asynchronous operations with user feedback

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| No props | - | - | This component doesn't accept any props |

## Usage Example

```tsx
import { Step4 } from '@/components/signals/creation/steps/step4';

function SignalCreationWizard() {
  return (
    <div className="signal-wizard">
      {/* Previous steps */}
      <Step4 />
    </div>
  );
}

// Typical usage within a step-based navigation
function SignalWizardContainer() {
  const currentStep = useCreateSignalStore(state => state.currentStep);
  
  return (
    <div>
      {currentStep === 4 && <Step4 />}
    </div>
  );
}
```

## Functionality

### Core Features
- **Alert Method Configuration**: Displays and validates selected alert methods (email, connected apps)
- **Email Validation**: Ensures at least one email is selected when email alerts are enabled
- **Contact Point Management**: Retrieves and filters contact points based on signal configuration
- **High Volume Filtering**: Automatically disables email contact points for high-volume immediate signals
- **Final Signal Submission**: Updates the signal with all configured settings and activates it
- **Loading State Management**: Provides feedback during the final save operation

### Key Behaviors
- Validates email alert method selection before submission
- Filters out email contact points for high-volume immediate article signals
- Converts draft signals to active status upon successful submission
- Handles submission errors gracefully with proper state management

## State Management

### Zustand Stores
- **useCreateSignalStore**: Primary store managing signal creation state
  - `selectedContactPointEmails`: Selected email contact points
  - `isEmailAlertMethodChecked`: Email alert method selection state
  - `signalUuid`: Current signal identifier
  - `schedulePolicy`, `notificationPolicy`, `selectionPolicy`: Signal configuration
  - `setIsFinalCreationStepSaving`: Loading state management
- **useFiltersDrawerStore**: Manages signal query filters

### Local State
- `isSavingRef`: Ref to track saving state and prevent duplicate submissions

## Side Effects

### API Operations
- **Signal Update**: Updates signal with final configuration via `useUpdateSignal`
- **Contact Point Retrieval**: Fetches contact points via `useSignalContactPoints`

### State Updates
- Sets loading states during submission
- Updates error states for validation failures
- Manages final creation step saving state

## Dependencies

### Custom Hooks
- `useSignalArticlesVolume`: Determines article volume for filtering logic
- `useSignalContactPoints`: Manages contact point operations
- `useUpdateSignal`: Handles signal update mutations

### Components
- `AlertMethods`: Displays alert method selection interface
- `SignalActionButtons`: Provides navigation and submission controls
- `SignalStepHeader`: Shows step title and progress

### External Dependencies
- Zustand stores for state management
- TanStack Query for server state mutations
- Various enums for type safety

## Integration

### Wizard Flow Integration
- Serves as the final step in a multi-step signal creation process
- Integrates with previous steps through shared Zustand state
- Provides completion functionality for the entire wizard

### Contact Point System
- Integrates with contact point management system
- Applies business rules for contact point filtering
- Handles both email and connected app alert methods

### Signal Lifecycle
- Transitions signals from draft to active status
- Applies all accumulated configuration from previous steps
- Handles signal activation and error recovery

## Best Practices

### Architecture Adherence
- ✅ **Single Responsibility**: Focuses solely on final step submission and alert method configuration
- ✅ **State Management**: Properly uses Zustand for client state and TanStack Query for server mutations
- ✅ **Component Decomposition**: Breaks down into smaller, focused sub-components
- ✅ **Error Handling**: Implements proper validation and error state management

### Implementation Patterns
- ✅ **Validation**: Uses callback-based validation with proper error state management
- ✅ **Loading States**: Provides user feedback during async operations
- ✅ **Business Logic**: Implements complex filtering rules based on signal configuration
- ✅ **Type Safety**: Leverages TypeScript enums for type-safe comparisons

### Performance Considerations
- Uses `useCallback` for memoized event handlers
- Implements ref-based duplicate submission prevention
- Efficient state selection with Zustand selectors