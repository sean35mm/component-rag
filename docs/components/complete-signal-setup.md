# CompleteDraftSignalSetup Component

## Purpose

The `CompleteDraftSignalSetup` component displays a notification banner that prompts users to complete their signal setup when the signal is in draft status. It provides a clear call-to-action to finish configuring the signal so users can receive alerts.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages local state with `useState` for animation control
- Uses `useEffect` for timed animations
- Handles user interactions with click events
- Integrates with Framer Motion for animations

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `signal` | `Signal` | ✅ | The signal object containing configuration data |
| `signalStatus` | `SignalStatusEnum` | ✅ | Current status of the signal (used to determine if notification should show) |

## Usage Example

```tsx
import { CompleteDraftSignalSetup } from '@/components/signals/complete-signal-setup';
import { Signal, SignalStatusEnum } from '@/lib/types';

function SignalDetailsPage() {
  const signal: Signal = {
    id: 'signal-123',
    name: 'My Trading Signal',
    // ... other signal properties
  };
  
  const signalStatus = SignalStatusEnum.DRAFT;

  return (
    <div>
      <CompleteDraftSignalSetup 
        signal={signal}
        signalStatus={signalStatus}
      />
      {/* Other signal components */}
    </div>
  );
}
```

## Functionality

- **Conditional Rendering**: Only displays when signal status is `DRAFT`
- **Responsive Design**: Adapts layout for mobile and desktop breakpoints
- **Smooth Animation**: Uses Framer Motion for expand/collapse animation with 1-second delay
- **Portal Rendering**: Renders through `TabNotificationPortal` for proper z-index layering
- **Navigation Integration**: Redirects users to signal editing mode when setup is initiated

## State Management

**Local State** (React `useState`):
- `isActive`: Boolean flag controlling the animation state of the notification banner
- Managed locally as it's purely UI-related animation state

No external state management (TanStack Query/Zustand) needed as this is a presentational component.

## Side Effects

**Animation Effect** (`useEffect`):
- Triggers after 1-second delay when `signalStatus` is `DRAFT`
- Sets `isActive` to `true` to begin the expand animation
- Dependency: `[signalStatus]`

## Dependencies

**Hooks**:
- `useBreakpoint('lg')` - Responsive design detection
- `useSwitchSignalEditMode(signal)` - Signal editing mode navigation

**UI Components**:
- `Button` - Call-to-action buttons
- `Typography` - Text styling
- `TabNotificationPortal` - Portal for proper rendering context

**External Libraries**:
- `framer-motion` - Animation library for smooth transitions

**Icons**:
- `PiEditBoxLine` - Visual indicator for editing action

## Integration

This component integrates into the signal management workflow by:

1. **Signal Status Monitoring**: Responds to signal status changes from the parent component
2. **Edit Mode Navigation**: Uses the signal editing system to redirect users to step 2 of setup
3. **Portal System**: Leverages the tab notification system for consistent UI placement
4. **Responsive Layout**: Adapts to the application's breakpoint system

## Best Practices

✅ **Architectural Alignment**:
- **Conditional Rendering**: Early return pattern for clean component logic
- **Feature-Based Organization**: Located in `/signals/` domain folder
- **Responsive Design**: Uses established breakpoint system
- **State Locality**: Keeps animation state local rather than lifting unnecessarily

✅ **Performance Optimizations**:
- **Memoized Callbacks**: Uses `useCallback` for event handlers
- **Conditional Effects**: Effect only runs when relevant dependencies change
- **Portal Usage**: Prevents unnecessary re-renders in main component tree

✅ **User Experience**:
- **Progressive Enhancement**: Works on both mobile and desktop
- **Clear Messaging**: Explicit call-to-action for draft signals
- **Smooth Animations**: Non-jarring expansion with appropriate timing

✅ **Component Composition**:
- **Single Responsibility**: Focused solely on draft signal notifications
- **Prop Interface**: Clean, minimal props following the signal domain model
- **Integration Points**: Well-defined interfaces with editing and navigation systems