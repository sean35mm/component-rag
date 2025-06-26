# WelcomeToSignalsDialog Component

## Purpose

The `WelcomeToSignalsDialog` is a modal dialog component that introduces users to the Perigon Signals feature when they create their first signal. It provides an onboarding experience that explains how signals work, what users can expect, and how they can configure their monitoring preferences.

## Component Type

**Client Component** - Uses the `'use client'` directive (implied by useState and useCallback hooks)

This is a client component because it:
- Manages local state for dialog open/close behavior
- Handles user interactions (button clicks, dialog dismissal)
- Requires browser-side event handling and state updates

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `signalTitle` | `string` | Yes | The title/name of the signal that was created, used to personalize the welcome message |
| `isOpen` | `boolean` | Yes | Controls the initial open state of the dialog |
| `onClose` | `() => void` | Yes | Callback function triggered when the dialog is closed by any method |

## Usage Example

```tsx
import { WelcomeToSignalsDialog } from '@/components/signals/welcome-to-signals-dialog';

function SignalsPage() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [newSignalTitle, setNewSignalTitle] = useState('');

  const handleSignalCreated = (signalTitle: string) => {
    setNewSignalTitle(signalTitle);
    setShowWelcome(true);
  };

  const handleWelcomeClose = () => {
    setShowWelcome(false);
    // Optional: Navigate to signal details or refresh signals list
  };

  return (
    <div>
      {/* Signals management UI */}
      
      <WelcomeToSignalsDialog
        signalTitle={newSignalTitle}
        isOpen={showWelcome}
        onClose={handleWelcomeClose}
      />
    </div>
  );
}
```

## Functionality

### Core Features
- **Onboarding Experience**: Provides users with an introduction to Perigon Signals
- **Personalized Messaging**: Incorporates the specific signal title into the welcome message
- **Modal Dialog**: Uses a controlled dialog that overlays the main interface
- **Responsive Design**: Adapts to different screen sizes with responsive max-widths
- **Branded UI**: Includes Perigon branding with the Signals badge and shining icon

### User Interactions
- **Dialog Dismissal**: Users can close the dialog via the "View my Signal" button or standard dialog close methods
- **Controlled State**: Manages both internal state and communicates with parent component through callbacks

## State Management

**Local State Management**
- Uses `useState` to manage the dialog's open/close state internally
- Synchronizes with parent component through the `isOpen` prop and `onClose` callback
- Implements controlled component pattern for predictable state management

```tsx
const [open, setOpen] = useState(isOpen);

const onOpenChange = useCallback(
  (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      onClose();
    }
  },
  [onClose]
);
```

## Side Effects

### Callback Effects
- **onClose Trigger**: Automatically calls the parent's `onClose` callback when the dialog is dismissed
- **State Synchronization**: Updates internal state when dialog open state changes

### No External Side Effects
- No API calls or data fetching
- No persistent storage operations
- No global state mutations

## Dependencies

### UI Components
- `Dialog`, `DialogContent`, `DialogDescription`, `DialogPortal`, `DialogTitle` from `../ui/dialog`
- `Button` from `../ui/button`
- `Typography` from `../ui/typography`

### Icons
- `PiShiningFill` from `../icons`

### React Hooks
- `useState` for local state management
- `useCallback` for memoized event handlers

## Integration

### Application Flow
1. **Trigger Point**: Typically shown after a user successfully creates their first signal
2. **Parent Integration**: Requires parent component to manage when to show the dialog
3. **Navigation**: After closing, users are typically directed to view their signal details
4. **Onboarding Flow**: Part of the broader user onboarding experience for the Signals feature

### Architecture Fit
- **Feature Component**: Domain-specific component for signals functionality
- **Modal Pattern**: Follows standard modal/dialog patterns for user interactions
- **Controlled Component**: Implements controlled component pattern for predictable behavior

## Best Practices

### ✅ Follows Architecture Guidelines
- **Component Decomposition**: Uses composition with UI components from `/ui/` directory
- **Client Component Usage**: Appropriately uses client component for interactive behavior
- **State Management**: Uses local state for UI-specific concerns
- **Reusability**: Clear props interface makes it reusable across different signals

### ✅ Implementation Quality
- **Memoized Callbacks**: Uses `useCallback` to prevent unnecessary re-renders
- **Accessible Design**: Leverages semantic dialog components for accessibility
- **Responsive Design**: Implements responsive classes for different screen sizes
- **Type Safety**: Fully typed props interface with TypeScript

### ✅ User Experience
- **Clear Communication**: Explains what signals do and what users can expect
- **Actionable Content**: Provides clear next steps for users
- **Branded Experience**: Consistent with Perigon design system and branding