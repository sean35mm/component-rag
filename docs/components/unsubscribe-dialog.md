# UnsubscribeDialog Component

## Purpose

The `UnsubscribeDialog` component provides a multi-modal interface for users to unsubscribe from Signal notifications. It intelligently renders different content based on user authentication status and ownership permissions, offering appropriate unsubscribe flows for signal owners, non-owner authenticated users, and guest users.

## Component Type

**Client Component** - Uses `'use client'` directive because it:
- Manages complex local state with hooks (`useState`, `useEffect`, `useRef`)
- Handles user interactions and form submissions
- Performs client-side navigation and redirects
- Uses browser APIs like `setTimeout` and `window.location`

## Props Interface

### UnsubscribeDialog

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | `boolean` | ✅ | Controls dialog visibility state |
| `onOpenChange` | `(open: boolean) => void` | ❌ | Callback fired when dialog open state changes |
| `email` | `string` | ✅ | Email address to unsubscribe from notifications |
| `signalUuid` | `string` | ❌ | Unique identifier for the signal being unsubscribed from |
| `contactPointUuid` | `string` | ❌ | Unique identifier for the contact point to remove |

### Modal Components (GuestModal, UnsubscribeNonOwnerAuth, UnsubscribeOwnerAuth)

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `email` | `string` | ✅ | Email address being unsubscribed |
| `onUnsubscribe` | `() => void` | ❌ | Callback to execute unsubscribe action |
| `isPending` | `boolean` | ❌ | Loading state for unsubscribe operation |
| `onOpenChange` | `(open: boolean) => void` | ❌ | Callback to close the dialog |
| `signalUuid` | `string` | ❌ | Signal identifier (owner auth only) |
| `contentType` | `string` | ❌ | Content type identifier (guest modal only) |

## Usage Example

```tsx
import { UnsubscribeDialog } from '@/components/signals/verification/unsubscribe-dialog';

function SignalManagement() {
  const [showUnsubscribe, setShowUnsubscribe] = useState(false);
  
  return (
    <>
      <Button onClick={() => setShowUnsubscribe(true)}>
        Unsubscribe from Signal
      </Button>
      
      <UnsubscribeDialog
        isOpen={showUnsubscribe}
        onOpenChange={setShowUnsubscribe}
        email="user@example.com"
        signalUuid="signal-123"
        contactPointUuid="contact-456"
      />
    </>
  );
}

// Guest user unsubscribe (from email link)
function GuestUnsubscribe() {
  return (
    <UnsubscribeDialog
      isOpen={true}
      email="guest@example.com"
      signalUuid="signal-123"
      contactPointUuid="contact-456"
    />
  );
}
```

## Functionality

### Core Features

- **Multi-Modal Interface**: Renders different content based on user authentication and ownership
- **Smart User Detection**: Automatically determines user relationship to the signal
- **Progressive Enhancement**: Shows loading skeleton while determining user state
- **Auto-Unsubscribe**: Automatically unsubscribes guest users after a delay
- **Signal Management**: Allows signal owners to pause instead of unsubscribe

### User Flow Variations

1. **Guest Users**: Auto-unsubscribe with account creation prompts
2. **Non-Owner Authenticated**: Confirmation dialog with unsubscribe action
3. **Signal Owners**: Choice between unsubscribe or pause signal

### Loading States

- Initial UI loading with skeleton component
- Pending states for unsubscribe and update operations
- Timeout fallback for user detection (2 seconds)

## State Management

### TanStack Query Integration

```tsx
// Server state queries
const { data: user, isSuccess } = useUserDetails();
const { mutate: unsubscribe, isPending } = useUnsubscribeContactPoint();
const { mutate: onUpdateSignal, isPending: isUpdating } = useUpdateSignal();
```

### Local State Management

- `isUiReady`: Controls skeleton vs content rendering
- `hasRun`: Prevents duplicate auto-unsubscribe execution
- Loading states for async operations

## Side Effects

### API Interactions

- **User Details Fetch**: Retrieves current user information
- **Contact Point Unsubscribe**: Removes user from signal notifications
- **Signal Update**: Updates signal status (pause functionality)

### Navigation Effects

- Redirects to `/signals` after successful owner operations
- Client-side navigation using `window.location.href`

### Timer Effects

- 300ms delay for guest auto-unsubscribe
- 2-second timeout for UI readiness fallback

## Dependencies

### UI Components
- `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`
- `Button`, `Separator`, `Typography`
- `useToast` for user feedback

### Business Logic
- `useUnsubscribeContactPoint` - Contact point removal
- `useUpdateSignal` - Signal status updates
- `useUserDetails` - User authentication state

### Supporting Components
- `UnsubscribeDialogSkeleton` - Loading state component
- `NextImage`, `NextLink` - Next.js optimized components

## Integration

### Signal Management System

The component integrates with the broader signal management system by:
- Handling unsubscribe flows from email notifications
- Managing contact point relationships
- Providing signal pause functionality for owners
- Supporting guest user conversion flows

### Authentication Flow

Works within the authentication system by:
- Detecting user authentication status
- Handling different permission levels
- Providing sign-up/sign-in paths for guests
- Respecting ownership permissions

## Best Practices

### Architecture Adherence

✅ **Component Decomposition**: Well-decomposed into focused sub-components
- `GuestModal` - Guest user experience
- `UnsubscribeNonOwnerAuth` - Non-owner authenticated flow
- `UnsubscribeOwnerAuth` - Owner-specific functionality

✅ **State Management**: Proper separation of concerns
- TanStack Query for server state
- Local state for UI interactions
- No unnecessary global state

✅ **Progressive Enhancement**: Graceful loading and error handling
- Skeleton loading states
- Timeout fallbacks
- Pending state management

✅ **User Experience**: Contextual interfaces based on user status
- Appropriate messaging for each user type
- Clear action paths and feedback
- Accessibility considerations with hidden dialog titles

### Error Handling

- Toast notifications for success/error states
- Graceful fallbacks for slow network conditions
- Proper cleanup of timers and effects