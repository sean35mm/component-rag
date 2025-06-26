# PiNotification2Line Icon Component

## Purpose

The `PiNotification2Line` component is an SVG icon that renders a notification bell with a line-style design. It serves as a visual indicator for notifications, alerts, or messaging features within the application's user interface. This icon is part of the Phosphor Icons (Pi) collection and follows a consistent design language for iconography.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG content without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server side for optimal performance.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | - | All standard SVG element properties including `className`, `style`, `onClick`, `aria-label`, etc. |

### Common SVG Props
| Prop Name | Type | Description |
|-----------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role attribute |

## Usage Example

```tsx
import { PiNotification2Line } from '@/components/icons/pi/pi-notification-2-line';

// Basic usage
export function NotificationIcon() {
  return <PiNotification2Line />;
}

// With custom styling
export function StyledNotificationIcon() {
  return (
    <PiNotification2Line 
      className="text-blue-600 hover:text-blue-800 transition-colors"
      style={{ fontSize: '1.5rem' }}
    />
  );
}

// Interactive notification button
export function NotificationButton({ onClick, hasUnread }: {
  onClick: () => void;
  hasUnread: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition-colors ${
        hasUnread ? 'text-red-500' : 'text-gray-600'
      }`}
      aria-label={hasUnread ? 'You have unread notifications' : 'Notifications'}
    >
      <PiNotification2Line className="w-6 h-6" />
      {hasUnread && (
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
      )}
    </button>
  );
}

// In a navigation header
export function HeaderNotifications() {
  return (
    <div className="flex items-center space-x-4">
      <PiNotification2Line 
        className="w-5 h-5 text-gray-700 cursor-pointer hover:text-gray-900"
        onClick={() => console.log('Show notifications')}
      />
    </div>
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisp at any size using SVG format
- **CSS Integration**: Inherits text color via `fill='currentColor'`
- **Responsive Sizing**: Uses `1em` dimensions to scale with font size
- **Accessibility Ready**: Accepts ARIA attributes for screen readers
- **Event Handling**: Supports all standard mouse and keyboard events
- **Style Flexibility**: Can be styled with CSS classes, inline styles, or CSS-in-JS

### Visual Design
- Line-style notification bell icon
- Clean, minimalist design with proper fill rules
- Optimized SVG paths for performance
- 24x24 viewBox for consistent proportions

## State Management

**No State Management Required** - This is a pure presentational component that doesn't manage any internal state. Any state related to notification status, counts, or visibility should be managed by parent components using:

- **TanStack Query**: For fetching notification data from APIs
- **Zustand**: For global notification state (unread count, preferences)
- **Local State**: For component-specific UI state in parent components

## Side Effects

**No Side Effects** - This component is purely functional and doesn't perform any:
- API calls
- DOM manipulation
- Browser storage access
- External service interactions

All side effects should be handled by parent components or custom hooks.

## Dependencies

### Direct Dependencies
- `react` - For SVGProps type definition
- No external icon libraries or dependencies

### Integration Dependencies
- **Tailwind CSS** - For styling classes in usage examples
- **Parent Components** - For notification logic and state management
- **Design System** - Follows application's iconography standards

## Integration

### Application Architecture Integration

```tsx
// Feature-level notification component
export function NotificationCenter() {
  const { data: notifications } = useNotifications(); // TanStack Query
  const { isOpen, toggle } = useNotificationStore(); // Zustand
  
  return (
    <div className="relative">
      <button onClick={toggle}>
        <PiNotification2Line className="w-6 h-6" />
        {notifications?.unreadCount > 0 && (
          <NotificationBadge count={notifications.unreadCount} />
        )}
      </button>
      {isOpen && <NotificationDropdown notifications={notifications} />}
    </div>
  );
}

// Layout integration
export function AppHeader() {
  return (
    <header className="flex items-center justify-between">
      <Logo />
      <nav className="flex items-center space-x-4">
        <NotificationCenter />
        <UserMenu />
      </nav>
    </header>
  );
}
```

## Best Practices

### Architecture Adherence

✅ **Server Component Pattern**
- Pure function with no client-side dependencies
- Can be rendered server-side for optimal performance
- No unnecessary 'use client' directive

✅ **Component Decomposition**
- Single responsibility: renders notification icon
- Flat structure without nested complexity
- Easily composable with other UI elements

✅ **Reusability**
- Located in `/components/icons/` for UI components
- Generic enough for multiple notification contexts
- Follows consistent naming convention

✅ **Props Pattern**
- Uses standard SVG props interface
- Spreads props for maximum flexibility
- Type-safe with TypeScript

### Usage Recommendations

1. **Accessibility**: Always provide `aria-label` for interactive usage
2. **Styling**: Use Tailwind classes for consistent design system integration
3. **State Management**: Keep notification logic in parent components
4. **Performance**: Leverage server-side rendering capabilities
5. **Consistency**: Use with other Phosphor Icons for design coherence

### Anti-Patterns to Avoid

❌ Don't add client-side logic to this component
❌ Don't manage notification state within the icon component
❌ Don't hardcode colors or sizes (use CSS for styling)
❌ Don't nest complex component logic inside icon usage