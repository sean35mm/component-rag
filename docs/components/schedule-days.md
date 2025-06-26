# ScheduleDays Component

## Purpose

The `ScheduleDays` component provides an interactive day-of-week selector for creating schedule-based signals. It displays a row of circular buttons representing days of the week (S-M-T-W-T-F-S) that users can toggle to specify when their scheduled signal should be active. This component is specifically designed for the signal creation workflow, integrating with the schedule policy configuration.

## Component Type

**Client Component** - Uses the `'use client'` directive (implicit from React hooks usage) because it:
- Manages interactive state through button clicks
- Uses `useCallback` hooks for event handling
- Requires DOM event handling (`onClick`, `MouseEvent`)
- Integrates with Zustand store for client-side state management

## Props Interface

This component accepts no props - it's a self-contained component that manages its state through the Zustand store.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | This component has no external props |

## Usage Example

```tsx
import { ScheduleDays } from '@/components/signals/creation/signal-types/schedule-days';

// Basic usage within a signal creation form
function SignalScheduleForm() {
  return (
    <div className="space-y-6">
      <h2>Schedule Configuration</h2>
      
      {/* Time intervals would go here */}
      <TimeIntervals />
      
      {/* Day selection */}
      <ScheduleDays />
      
      {/* Additional schedule options */}
      <ScheduleOptions />
    </div>
  );
}

// Usage in signal creation workflow
function CreateSignalWizard() {
  return (
    <div className="signal-creation-steps">
      <Step name="basic-info">
        <BasicSignalInfo />
      </Step>
      
      <Step name="schedule">
        <ScheduleDays />
      </Step>
      
      <Step name="review">
        <SignalReview />
      </Step>
    </div>
  );
}
```

## Functionality

### Core Features
- **Day Selection**: Toggle individual days of the week for schedule activation
- **Visual Feedback**: Active days are highlighted with different styling
- **Validation Integration**: Automatically clears validation errors when selections change
- **Event Propagation Control**: Prevents event bubbling with `stopPropagation()`

### Key Behaviors
- **Toggle Logic**: Clicking a selected day deselects it; clicking an unselected day selects it
- **Multiple Selection**: Users can select multiple days simultaneously
- **Immediate Updates**: Changes are applied immediately to the schedule policy
- **Error Clearing**: Automatically clears both signal type and schedule policy validation errors

## State Management

**Zustand Store Integration** (`useCreateSignalStore`):
- **Read State**: 
  - `schedulePolicy` - Current schedule configuration including day selections
- **Write Actions**:
  - `setSchedulePolicy()` - Updates the schedule policy with new day selections
  - `clearValidationError()` - Removes specific validation errors

### State Structure
```typescript
interface SchedulePolicy {
  intervals: Array<{
    days: DayOfWeek[];
    // other interval properties...
  }>;
}
```

## Side Effects

### Validation Management
- Clears `SIGNAL_CREATION_VALIDATION_ERRORS.SIGNAL_TYPE` on day selection
- Clears `SIGNAL_CREATION_VALIDATION_ERRORS.SCHEDULE_POLICY` on day selection

### State Mutations
- Modifies the first interval's `days` array in the schedule policy
- Performs immutable updates to prevent state mutation issues

## Dependencies

### Internal Dependencies
- `@/components/ui/button` - Base button component for day toggles
- `@/components/ui/typography` - Typography component for labels
- `@/lib/contexts` - Zustand store context for signal creation
- `@/lib/types` - Type definitions (`DayOfWeek`, validation errors)
- `@/lib/utils/cn` - Utility for conditional className handling

### React Dependencies
- `React.MouseEvent` - For type-safe event handling
- `useCallback` - For memoized event handlers

## Integration

### Signal Creation Workflow
- **Position**: Typically used in the schedule configuration step of signal creation
- **Data Flow**: Reads from and writes to the centralized signal creation store
- **Validation**: Integrates with the form validation system by clearing errors

### UI Component Hierarchy
```
SignalCreationForm
├── BasicSignalInfo
├── SignalTypeSelector
└── ScheduleConfiguration
    ├── TimeIntervals
    ├── ScheduleDays ← This component
    └── ScheduleOptions
```

## Best Practices

### Architecture Adherence
✅ **State Management**: Properly uses Zustand for client state management  
✅ **Component Decomposition**: Self-contained, single-responsibility component  
✅ **Event Handling**: Uses `useCallback` for optimized re-renders  
✅ **Type Safety**: Leverages TypeScript with proper type imports  

### Implementation Patterns
- **Immutable Updates**: Uses spread operators to avoid state mutations
- **Error Boundary**: Safely checks for schedule policy existence before operations
- **Accessibility**: Uses semantic button elements with proper event handling
- **Performance**: Memoizes event handlers with `useCallback`

### Integration Best Practices
- **Validation Integration**: Proactively clears related validation errors
- **Event Management**: Prevents unwanted event propagation
- **Conditional Rendering**: Safely handles undefined schedule policy states
- **Styling Consistency**: Uses design system components and utilities