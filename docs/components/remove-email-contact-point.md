# RemoveContactPoint Component

## Purpose

The `RemoveContactPoint` component provides a confirmation dialog interface for removing email contact points from signals. It ensures users confirm their intention before permanently removing email notifications from their signal configurations.

## Component Type

**Client Component** - Uses the `'use client'` directive (inferred from hook usage) because it:
- Manages interactive dialog state
- Handles user interactions (onClick events)
- Uses browser-only hooks like `useToast`
- Performs asynchronous operations with user feedback

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `signal` | `Signal` | Yes | The signal object containing contact points to be modified |
| `contactPointId` | `number` | Yes | The unique identifier of the contact point to remove |

## Usage Example

```tsx
import { RemoveContactPoint } from '@/components/signals/details/email/remove-email-contact-point';

function SignalContactPointsList({ signal }) {
  return (
    <div className="contact-points-list">
      {signal.contactPoints.map((contactPoint) => (
        <div key={contactPoint.id} className="contact-point-item">
          <span>{contactPoint.email}</span>
          <RemoveContactPoint 
            signal={signal} 
            contactPointId={contactPoint.id} 
          />
        </div>
      ))}
    </div>
  );
}
```

## Functionality

- **Confirmation Dialog**: Displays a warning dialog before contact point removal
- **Contact Point Filtering**: Removes the specified contact point from the signal's contact points array
- **Dynamic Identification**: Automatically identifies the contact point by email or webhook URL for user feedback
- **Success/Error Handling**: Provides user feedback through toast notifications
- **Responsive Design**: Adapts dialog size across different screen sizes

## State Management

- **TanStack Query**: Uses `useUpdateSignal` mutation for server state management
- **Local State**: Dialog open/closed state managed internally by the Dialog component
- **No Zustand**: No global client state requirements

## Side Effects

- **API Mutation**: Calls signal update endpoint to modify contact points
- **Toast Notifications**: Displays success or error messages to the user
- **UI State Changes**: Closes dialog on successful removal
- **Signal Refetch**: TanStack Query automatically refetches related signal data after mutation

## Dependencies

### UI Components
- `Dialog` suite (DialogTrigger, DialogContent, etc.)
- `Button` - For action and cancel buttons
- `Typography` - For consistent text styling

### Hooks & Services
- `useUpdateSignal` - TanStack Query mutation hook
- `useToast` - Toast notification system

### Icons
- `PiErrorWarningLine` - Warning icon for confirmation dialog

### Types
- `Signal` - TypeScript interface for signal data structure

## Integration

The component integrates into the signals management workflow by:

1. **Signal Details Pages**: Embedded within email contact point management sections
2. **Contact Point Lists**: Used as an action component alongside each removable contact point
3. **Mutation Chain**: Participates in the application's signal modification flow
4. **Toast System**: Connects to the global notification system for user feedback

## Best Practices

### ✅ Follows Architecture Guidelines

- **Appropriate Component Type**: Correctly implements as Client Component due to interactivity needs
- **Single Responsibility**: Focused solely on contact point removal functionality
- **Proper State Management**: Uses TanStack Query for server state, avoiding unnecessary local state
- **Error Handling**: Implements comprehensive try-catch with user-friendly error messages

### ✅ UI/UX Best Practices

- **Confirmation Pattern**: Prevents accidental deletions with clear confirmation dialog
- **Responsive Design**: Implements consistent dialog sizing across breakpoints
- **Accessible**: Uses semantic dialog components with proper ARIA attributes
- **Visual Hierarchy**: Clear warning iconography and destructive action styling

### ✅ Code Quality

- **Type Safety**: Properly typed props and internal variables
- **Error Boundaries**: Graceful error handling with user feedback
- **Async Handling**: Proper async/await pattern with error catching
- **Clean Separation**: UI logic separated from business logic through custom hooks