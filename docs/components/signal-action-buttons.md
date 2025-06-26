# SignalActionButtons Component

## Purpose

The `SignalActionButtons` component provides a comprehensive navigation and action control system for the signal creation/editing workflow. It manages step progression, form persistence, and final signal submission across a multi-step signal creation process. This component acts as the primary controller for user actions during signal creation and editing workflows.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages complex user interactions (button clicks, navigation)
- Relies heavily on Zustand state management for multi-step workflow coordination
- Handles browser navigation with Next.js router
- Requires real-time state updates and loading states

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `disableContinue` | `boolean` | No | Disables the continue button when form validation fails or required data is missing |
| `onSave` | `() => Promise<{ success: boolean }>` | No | Callback function to save current step data, called before navigation |
| `onContinue` | `() => Promise<{ success: boolean }>` | No | Additional validation/processing callback before step progression |
| `isFinalStep` | `boolean` | No | Indicates if this is the last step in the workflow, changes button layout and behavior |
| `onSubmit` | `() => Promise<{ success: boolean; signal?: Signal }>` | No | Final submission handler for signal creation/update, returns created signal data |

## Usage Example

```tsx
// In a signal creation step component
import { SignalActionButtons } from '@/components/signals/creation/signal-action-buttons';

function SignalCreationStep() {
  const [formData, setFormData] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleSave = async () => {
    try {
      await saveStepData(formData);
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  };

  const handleSubmit = async () => {
    try {
      const signal = await createSignal(formData);
      return { success: true, signal };
    } catch (error) {
      return { success: false };
    }
  };

  return (
    <div>
      {/* Step content */}
      <SignalActionButtons
        disableContinue={!isValid}
        onSave={handleSave}
        onSubmit={handleSubmit}
        isFinalStep={currentStep === 4}
      />
    </div>
  );
}
```

## Functionality

### Core Features
- **Step Navigation**: Handles forward/backward progression through signal creation steps
- **Auto-Save**: Automatically saves form data when continuing to next step (except in edit mode)
- **Loading States**: Manages and displays loading indicators for save/continue operations
- **Edit Mode Support**: Adapts behavior for editing existing signals vs creating new ones
- **Smart Button Rendering**: Conditionally renders buttons based on current step and mode

### Navigation Logic
- **Back Navigation**: Returns to previous step with state cleanup, exits to signals list from step 1
- **Continue Navigation**: Validates, saves, and progresses to next step
- **Edit Mode Back**: Special handling for edit mode navigation and cancellation
- **Final Submission**: Handles signal activation/update with success animation timing

### State Cleanup
- Resets specific step data when navigating backward
- Clears all state when exiting workflow
- Manages filter state coordination with drawer components

## State Management

### Zustand Stores
- **`useCreateSignalStore`**: Primary workflow state management
  - `activeStep`: Current step in creation process
  - `isContinueLoading`, `isSaving`: Loading state flags
  - `isEditMode`: Distinguishes between create and edit workflows
  - `signalStatus`: Current signal status for edit operations
  - Step reset functions for data cleanup

- **`useFiltersDrawerStore`**: Filter state coordination
  - `reset()`: Clears filter state when exiting workflow

### Loading State Management
```tsx
// Example loading state patterns
const [isContinueLoading, setIsContinueLoading] = useState(false);
const [isSaving, setIsSaving] = useState(false);

// Coordinated loading states prevent concurrent operations
disabled={disableContinue || isContinueLoading || isSaving}
```

## Side Effects

### Navigation Effects
- **Router Navigation**: Programmatic navigation to `/signals` route
- **Window Location**: Direct page navigation for signal detail views
- **State Persistence**: Automatic form data saving during step progression

### Animation Timing
- **Minimum Animation Duration**: Ensures loading animations display for at least 1.5 seconds
- **Success State Management**: Coordinates UI feedback with actual operation completion

### Error Handling
- Graceful failure recovery for save/continue operations
- Loading state cleanup on operation failure
- Non-blocking error states that allow retry

## Dependencies

### UI Components
- `Button`: Primary action buttons with variant styling
- Icon components: `PiArrowLeftSLine`, `PiArrowRightSLine`, `PiArrowRightUpLine`, `PiLoader3Line`, `IconNavigationSignals`

### Hooks & Context
- `useRouter`: Next.js navigation
- `useCreateSignalStore`: Main workflow state
- `useFiltersDrawerStore`: Filter coordination

### Types & Utilities
- `Signal`, `SIGNAL_CREATION_STEP`, `SignalStatusEnum`: Type definitions
- `cn`: Utility for conditional className handling

## Integration

### Workflow Integration
This component serves as the central navigation controller for the signal creation workflow, integrating with:
- **Step Components**: Each creation step includes this component for consistent navigation
- **Form Validation**: Receives validation state to control button enabling
- **Data Persistence**: Coordinates with backend APIs through provided callbacks
- **Route Management**: Manages transitions between workflow and other app sections

### Store Coordination
Acts as a bridge between multiple Zustand stores to maintain consistent application state across the creation workflow.

## Best Practices

### Architecture Adherence
- ✅ **Client Component Justification**: Properly uses client-side rendering for interactive workflow control
- ✅ **State Management**: Leverages Zustand for complex workflow state coordination
- ✅ **Component Decomposition**: Focused single responsibility for action control
- ✅ **Prop Interface**: Clean, callback-based API for parent component integration

### Implementation Patterns
- **Async Operation Handling**: Proper promise-based error handling with loading states
- **Conditional Rendering**: Smart button display based on workflow state
- **Performance Optimization**: Memoized callbacks to prevent unnecessary re-renders
- **User Experience**: Minimum animation timing ensures perceived performance

### Usage Guidelines
- Always provide `onSave` callback for data persistence
- Use `disableContinue` for form validation integration
- Handle `onSubmit` success/failure appropriately in parent components
- Coordinate loading states to prevent user confusion