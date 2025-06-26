# IconNotificationFilled Component

## Purpose
The `IconNotificationFilled` component renders a filled notification bell icon with a badge indicator. This SVG-based icon is typically used to represent notifications with active/unread status in navigation bars, headers, or notification systems throughout the application.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, event handlers, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

### Inherited SVG Props
| Common Props | Type | Description |
|--------------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role |
| `width` | `string \| number` | Override default width (24px) |
| `height` | `string \| number` | Override default height (24px) |

## Usage Example

```tsx
import { IconNotificationFilled } from '@/components/icons/icon-notification-filled';

// Basic usage
function NotificationButton() {
  return (
    <button className="relative p-2">
      <IconNotificationFilled 
        className="text-blue-600 hover:text-blue-700" 
        aria-label="Notifications"
      />
    </button>
  );
}

// With custom sizing and styling
function HeaderNotification() {
  return (
    <div className="relative">
      <IconNotificationFilled 
        width={28}
        height={28}
        className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
        onClick={() => console.log('Open notifications')}
        role="button"
        aria-label="View notifications (3 unread)"
      />
    </div>
  );
}

// In a notification component with state
function NotificationCenter() {
  const { data: notifications } = useNotifications();
  const hasUnread = notifications?.some(n => !n.read);

  return (
    <button className="relative p-2 rounded-lg hover:bg-gray-100">
      <IconNotificationFilled 
        className={cn(
          "transition-colors",
          hasUnread ? "text-blue-600" : "text-gray-400"
        )}
        aria-label={`Notifications ${hasUnread ? '(has unread)' : ''}`}
      />
    </button>
  );
}
```

## Functionality

### Core Features
- **SVG Rendering**: Renders a scalable notification bell icon with filled badge
- **Color Inheritance**: Uses `fill='currentColor'` to inherit text color from parent
- **Accessibility**: Supports ARIA attributes for screen readers
- **Responsive Scaling**: Maintains aspect ratio when resized
- **Event Handling**: Supports all standard mouse and keyboard events

### Visual Design
- Default size: 24x24 pixels
- Filled notification bell with badge indicator
- Clean, modern design suitable for various UI contexts
- Optimized SVG paths for crisp rendering at all sizes

## State Management
**No State Management** - This component is stateless and purely presentational. Any notification state (count, unread status) should be managed by parent components using:
- **TanStack Query** for fetching notification data from APIs
- **Zustand** for global notification state (e.g., unread count, notification preferences)

## Side Effects
**No Side Effects** - This component performs no API calls, side effects, or external interactions. It only renders SVG markup based on provided props.

## Dependencies

### Direct Dependencies
- `react` - For `SVGProps` type definition

### Related Components
- Other icon components in `/components/icons/`
- Notification badge components for displaying counts
- Button/clickable wrapper components
- Navigation and header components

## Integration

### Application Architecture
```
Navigation/Header Components
├── NotificationButton (business logic)
│   ├── IconNotificationFilled (presentation)
│   └── NotificationBadge (count display)
└── NotificationDropdown (content)
```

### Common Integration Patterns
1. **Navigation Bars**: Combined with notification count badges
2. **Dropdown Triggers**: Used as trigger for notification panels
3. **Status Indicators**: Visual representation of notification states
4. **Interactive Elements**: Wrapped in buttons or clickable containers

## Best Practices

### Architectural Adherence
✅ **Server Component**: Leverages server-side rendering for better performance  
✅ **Single Responsibility**: Focused solely on rendering the icon  
✅ **Composition**: Designed to be composed with other UI elements  
✅ **Reusability**: Generic enough for various notification contexts  

### Usage Guidelines
1. **Accessibility**: Always provide `aria-label` for interactive usage
2. **State Management**: Keep notification logic in parent components
3. **Styling**: Use CSS classes rather than inline styles when possible
4. **Event Handling**: Attach events to wrapper elements rather than the SVG
5. **Performance**: Component can be safely used in lists without memoization

### Example Implementation Pattern
```tsx
// ✅ Good: Business logic in parent, icon as presentation
function NotificationTrigger() {
  const { data: count } = useNotificationCount();
  const { mutate: markAsRead } = useMarkNotificationsRead();
  
  return (
    <button onClick={() => markAsRead()}>
      <IconNotificationFilled className="text-blue-600" />
      {count > 0 && <Badge count={count} />}
    </button>
  );
}

// ❌ Avoid: Mixing business logic with icon component
```