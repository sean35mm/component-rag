# Notification Component

## Purpose

The `Notification` component provides a standardized notification container for displaying temporary messages, alerts, or informational content to users. It features a dismissible interface with an optional label and supports custom content through children. This component is part of the signals domain and is commonly used for displaying signal-related notifications and alerts.

## Component Type

**Client Component** - This component uses event handlers (`onClick`) for the close functionality and manages user interactions, requiring client-side JavaScript execution. The component needs to respond to user clicks for dismissing notifications.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `onClose` | `() => void` | Optional | `undefined` | Callback function triggered when the close button is clicked |
| `label` | `ReactNode` | Optional | `undefined` | Optional header label displayed at the top of the notification |
| `children` | `ReactNode` | Optional | `undefined` | Main content of the notification |
| `className` | `string` | Optional | `undefined` | Additional CSS classes for custom styling |
| `...props` | `HTMLAttributes<HTMLDivElement>` | Optional | `{}` | Standard HTML div attributes |

## Usage Example

```tsx
import { Notification } from '@/components/signals/details/notification';

// Basic notification with close handler
function SignalAlert() {
  const [showNotification, setShowNotification] = useState(true);

  if (!showNotification) return null;

  return (
    <Notification 
      label="Signal Alert"
      onClose={() => setShowNotification(false)}
    >
      <p>Your signal has been successfully processed.</p>
    </Notification>
  );
}

// Notification without label
function SimpleNotification() {
  return (
    <Notification onClose={() => console.log('Notification closed')}>
      <div className="flex items-center gap-2">
        <span>Processing complete</span>
      </div>
    </Notification>
  );
}

// Custom styled notification
function CustomNotification() {
  return (
    <Notification 
      label="System Update"
      className="border-l-4 border-blue-500"
      onClose={() => handleDismiss()}
    >
      <Typography variant="bodyMedium">
        New features are now available in your dashboard.
      </Typography>
    </Notification>
  );
}
```

## Functionality

### Core Features
- **Dismissible Interface**: Provides a close button that triggers the `onClose` callback
- **Flexible Content**: Accepts any React content through children prop
- **Optional Labeling**: Supports an optional header label for categorizing notifications
- **Responsive Layout**: Automatically adjusts layout based on whether a label is present
- **Custom Styling**: Extends HTML div attributes and supports additional CSS classes

### Visual Behavior
- **Rounded Container**: Uses consistent rounded corners (1.25rem) following design system
- **Background Styling**: Applies standard background color (`pgBackground-100`)
- **Interactive States**: Close button shows hover effects with opacity transitions
- **Conditional Layout**: Header section adapts to center close button when no label is present

## State Management

**Local State Only** - This component is stateless and relies on parent components for state management. It follows our architecture pattern of keeping UI components pure and delegating state management to:

- **Parent Components**: Handle visibility state and notification data
- **Zustand Stores**: Can be used by parents for global notification state
- **TanStack Query**: Parents may use for server-state-related notifications

```tsx
// Example with Zustand store
const useNotificationStore = create((set) => ({
  notifications: [],
  dismissNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  }))
}));
```

## Side Effects

**Minimal Side Effects** - The component has no direct side effects but enables side effects through:

- **Close Callback**: Triggers parent-defined side effects when dismissed
- **Event Propagation**: Standard DOM events can bubble up from child content
- **No API Calls**: Does not make direct server requests

## Dependencies

### Internal Dependencies
- `@/components/icons` - PiCloseLine icon for close button
- `@/components/ui/typography` - Typography component for label rendering
- `@/lib/utils/cn` - Utility for conditional class name merging

### External Dependencies
- `React` - Core React functionality and TypeScript interfaces

### Design System Integration
- Uses design token colors (`pgBackground-100`, `pgText-600`)
- Follows spacing conventions (px-6, py-4, mb-1.5)
- Implements consistent border radius patterns

## Integration

### Application Architecture
- **Domain Placement**: Located in `/signals/details/` indicating signal-specific usage
- **Reusability**: Can be extracted to `/ui/` folder if needed across multiple domains
- **Composition Pattern**: Designed to be composed with other components following our Lego block approach

### Common Integration Patterns
```tsx
// With notification management hook
function SignalDetailsPage() {
  const { notifications, dismissNotification } = useNotifications();
  
  return (
    <div>
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          label={notification.type}
          onClose={() => dismissNotification(notification.id)}
        >
          {notification.content}
        </Notification>
      ))}
    </div>
  );
}
```

## Best Practices

### Architecture Adherence
- ✅ **Single Responsibility**: Focused solely on notification presentation
- ✅ **Composition Over Inheritance**: Uses children prop for flexible content
- ✅ **Prop Interface**: Clean, focused API with appropriate TypeScript types
- ✅ **Styling Patterns**: Uses design tokens and utility classes consistently

### Usage Recommendations
- **Always Provide onClose**: Even if just for logging/analytics
- **Use Appropriate Labels**: Help users categorize notification types
- **Consider Accessibility**: Ensure notifications are announced to screen readers
- **Manage Focus**: Handle focus management when notifications appear/disappear

### Performance Considerations
- **Lightweight Rendering**: Minimal DOM structure for fast rendering
- **Event Handler Stability**: Ensure `onClose` callbacks are stable to prevent unnecessary re-renders
- **Conditional Rendering**: Use parent state to conditionally render rather than hiding with CSS