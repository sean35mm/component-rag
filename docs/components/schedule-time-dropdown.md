# ScheduleTimeDropdown Component

## Purpose

The `ScheduleTimeDropdown` component provides a time picker interface for scheduling signals in the signal creation workflow. It allows users to select specific times (in 30-minute intervals) and automatically handles timezone conversion from local time to UTC for storage in the schedule policy.

## Component Type

**Client Component** - Uses the `'use client'` directive (implicitly through hooks) because it:
- Manages local state with `useState`
- Uses `useEffect` for side effects
- Handles user interactions with form controls
- Integrates with Zustand store for client-side state management

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | `undefined` | Additional CSS classes to apply to the root container |

## Usage Example

```tsx
import { ScheduleTimeDropdown } from '@/components/signals/creation/signal-types/schedule-time-dropdown';

function SignalScheduleForm() {
  return (
    <div className="space-y-4">
      <h3>Schedule Configuration</h3>
      
      {/* Basic usage */}
      <ScheduleTimeDropdown />
      
      {/* With custom styling */}
      <ScheduleTimeDropdown className="max-w-xs" />
    </div>
  );
}
```

## Functionality

### Core Features
- **Time Selection**: Provides 30-minute interval time slots from 12:00 AM to 11:30 PM
- **12-Hour Format**: Displays times in user-friendly 12-hour format with AM/PM
- **Timezone Handling**: Automatically converts local time to UTC for storage
- **Persistence**: Maintains selected time across component re-renders
- **Initial Value**: Pre-populates with existing schedule policy time or defaults to 9:00 AM

### Time Generation
- Generates 48 time options (24 hours × 2 intervals per hour)
- Creates options with both display labels and internal hour/minute values
- Handles proper time formatting using `toLocaleTimeString`

### Timezone Conversion
- Displays times in user's local timezone
- Converts selected times to UTC for storage in schedule policy
- Handles timezone differences automatically using JavaScript Date objects

## State Management

### Zustand Integration
Uses the `useCreateSignalStore` for global signal creation state:
```tsx
const schedulePolicy = useCreateSignalStore((state) => state.schedulePolicy);
const setSchedulePolicy = useCreateSignalStore((state) => state.setSchedulePolicy);
```

### Local State
- **`selectedTime`**: Tracks the currently selected time string for UI display
- Initialized from existing schedule policy or defaults to "9:00 AM"

### State Flow
1. Component reads existing schedule policy from Zustand store
2. Converts UTC time back to local time for display
3. User selection updates both local state and global store
4. Local time is converted to UTC before storage

## Side Effects

### useEffect Hook
```tsx
useEffect(() => {
  updateSchedulePolicy(selectedTime);
}, []);
```
- Runs once on component mount to ensure schedule policy is initialized
- Handles cases where component mounts without existing schedule data

### Store Updates
- Automatically updates the global schedule policy when time changes
- Preserves existing day selections while updating time
- Maintains data structure consistency for schedule intervals

## Dependencies

### UI Components
- `Select`, `SelectContent`, `SelectItem`, `SelectTrigger`, `SelectTriggerIcon`, `SelectValue` from `@/components/ui/select`
- `Typography` from `@/components/ui/typography`
- `PiTimeLine` icon from `@/components/icons`

### Utilities & Contexts
- `useCreateSignalStore` from `@/lib/contexts`
- `cn` utility from `@/lib/utils/cn`

### Browser APIs
- JavaScript `Date` object for time manipulation
- `toLocaleTimeString` for time formatting
- `setHours`, `setUTCHours`, `getUTCHours`, `getUTCMinutes` for timezone handling

## Integration

### Signal Creation Workflow
- Part of the larger signal creation form process
- Integrates with schedule policy configuration
- Works alongside day selection components
- Feeds into the overall signal scheduling system

### Data Flow
```
User Selection → Local State → Timezone Conversion → Zustand Store → Signal Schedule Policy
```

### Store Structure
Updates the schedule policy with structure:
```tsx
{
  intervals: [{
    hour: number,     // UTC hour (0-23)
    minute: number,   // UTC minute (0 or 30)
    days: string[]    // Preserved from existing policy
  }]
}
```

## Best Practices

### Architecture Compliance
- ✅ **Client Component**: Appropriately uses client-side rendering for interactive form control
- ✅ **State Management**: Uses Zustand for global state, local state for UI-specific concerns
- ✅ **Component Decomposition**: Single responsibility focused on time selection
- ✅ **Reusability**: Generic enough for various scheduling contexts

### Implementation Patterns
- **Controlled Component**: Fully controlled through Zustand store integration
- **Timezone Safety**: Handles timezone conversion transparently
- **Error Prevention**: Validates time options and maintains data consistency
- **Accessibility**: Uses semantic select components with proper labeling

### Performance Considerations
- Time options generated once and memoized through component lifecycle
- Minimal re-renders through targeted state updates
- Efficient store selectors for specific state slices