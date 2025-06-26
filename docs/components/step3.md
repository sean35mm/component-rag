# Step3 Component

## Purpose

The `Step3` component is the final step in the signal creation wizard that allows users to select their signal type and configuration preferences. It handles the creation or updating of signals, manages validation for signal types and schedule policies, and provides a preview of articles that will be included in the signal.

## Component Type

**Client Component** - Uses `'use client'` directive because it:
- Manages complex interactive state through Zustand stores
- Handles form validation and user interactions
- Performs asynchronous operations with user feedback
- Uses React hooks for state management and side effects

## Props Interface

This component accepts no props - it's designed as a self-contained step in the signal creation flow.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | This component has no external props |

## Usage Example

```tsx
import { Step3 } from '@/components/signals/creation/steps/step3';

export function SignalCreationWizard() {
  return (
    <div className="signal-creation-container">
      {/* Previous steps */}
      <Step3 />
    </div>
  );
}
```

## Functionality

### Core Features
- **Signal Type Selection**: Allows users to choose between different signal types (articles, newsletters, etc.)
- **Configuration Validation**: Validates signal type, notification policy, and schedule policy settings
- **Signal Creation/Update**: Handles both creating new signals and updating existing ones in edit mode
- **Articles Preview**: Shows a preview of articles that match the current query and filters
- **High Volume Protection**: Automatically disables email notifications for high-volume article signals
- **Auto-naming**: Generates signal names automatically based on query content

### Validation Logic
- Ensures signal type, notification policy, and selection policy are selected
- Validates schedule policy for non-immediate notifications
- Provides specific error messages for different validation failures

### Smart Defaults
- Automatically generates signal names from queries
- Handles high-volume scenarios by clearing contact points and showing warnings

## State Management

### Zustand Stores
- **`useCreateSignalStore`**: Primary state management for the entire signal creation process
  - Signal configuration (type, policies, schedules)
  - Validation state and error handling
  - Edit mode detection
  - Query and filter state

- **`useFiltersDrawerStore`**: Manages filter state for signal queries

### TanStack Query Hooks
- **`useCreateSignal`**: Creates new signals with optimistic updates
- **`useUpdateSignal`**: Updates existing signal configurations
- **`useGenerateNameFromQuery`**: Auto-generates meaningful signal names
- **`useSignalById`**: Fetches existing signal data in edit mode

## Side Effects

### API Operations
- **Signal Creation**: Creates new signals with complete configuration
- **Signal Updates**: Updates existing signals with new settings
- **Name Generation**: Calls AI service to generate descriptive names
- **Contact Point Management**: Automatically removes contact points for high-volume signals

### User Notifications
- Shows toast notifications when contact points are removed due to high volume
- Provides validation feedback through error states
- Updates UI state based on successful operations

### Volume Monitoring
- Monitors article volume through `useSignalArticlesVolume` hook
- Automatically adjusts notification settings for high-volume scenarios

## Dependencies

### Internal Components
- **`ArticlesPreview`**: Shows preview of matching articles
- **`SignalStepHeader`**: Provides step navigation and description
- **`SignalTypes`**: Signal type selection interface
- **`SignalActionButtons`**: Save and continue action buttons

### Custom Hooks
- **`useSignalArticlesVolume`**: Monitors article volume for the current query
- **`useToast`**: Provides user notifications

### External Dependencies
- **React**: `useCallback`, `useMemo` for performance optimization
- **Type Definitions**: Signal types, validation enums, and interfaces

## Integration

### Signal Creation Flow
This component represents the final step in a multi-step signal creation wizard:
1. **Step 1**: Query definition and filtering
2. **Step 2**: Additional configuration and refinement
3. **Step 3**: Signal type selection and finalization (this component)

### Data Flow
```
User Selection → Validation → Signal Creation/Update → Success Feedback
     ↓                ↓              ↓                    ↓
Signal Types → Error Handling → API Calls → Toast Notifications
```

### Store Integration
- Reads comprehensive state from `useCreateSignalStore`
- Updates signal UUID upon successful creation
- Manages validation state throughout the process

## Best Practices

### Architecture Compliance
- ✅ **Flat Component Structure**: Uses composition over nesting with clear component boundaries
- ✅ **State Management Separation**: TanStack Query for server state, Zustand for client state
- ✅ **Single Responsibility**: Focuses solely on signal type selection and finalization
- ✅ **Error Handling**: Comprehensive validation with user-friendly error messages

### Performance Optimizations
- **`useMemo`**: Optimizes validation calculations
- **`useCallback`**: Prevents unnecessary re-renders of child components
- **Conditional Queries**: Only fetches signal data when UUID exists

### User Experience
- **Progressive Enhancement**: Handles both creation and edit modes seamlessly
- **Smart Validation**: Context-aware validation based on selected options
- **Automatic Protection**: Prevents email overflow with high-volume signals
- **Clear Feedback**: Immediate validation feedback and success notifications

### Code Organization
- **Clear Separation**: Distinct handlers for creation, updates, and validation
- **Type Safety**: Full TypeScript integration with proper type definitions
- **Consistent Patterns**: Follows established patterns for hooks and state management