# PiMailUnreadLine Component

## Purpose
The `PiMailUnreadLine` component is an SVG icon component that displays an envelope icon with an unread notification indicator (circle). It's part of the icon system and is typically used to represent unread mail/messages in user interfaces, navigation menus, or notification systems.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or event handling. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | Standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Spread to the root `<svg>` element |

### Common SVG Props
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click handler for interactive usage
- `aria-label` - Accessibility label
- `role` - ARIA role
- `data-*` - Data attributes

## Usage Example

```tsx
import { PiMailUnreadLine } from '@/components/icons/pi/pi-mail-unread-line';

// Basic usage
function NotificationIcon() {
  return <PiMailUnreadLine />;
}

// With styling and accessibility
function MailNotificationButton() {
  return (
    <button 
      className="p-2 hover:bg-gray-100 rounded-full"
      aria-label="View unread messages"
    >
      <PiMailUnreadLine 
        className="w-6 h-6 text-blue-600" 
        aria-hidden="true"
      />
    </button>
  );
}

// In navigation with badge
function NavigationItem() {
  const unreadCount = 5;
  
  return (
    <div className="relative">
      <PiMailUnreadLine className="w-5 h-5 text-gray-700" />
      {unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </div>
  );
}

// With click handler
function InteractiveMailIcon() {
  const handleMailClick = () => {
    // Navigate to messages or open mail modal
    console.log('Mail icon clicked');
  };

  return (
    <PiMailUnreadLine 
      className="w-6 h-6 text-blue-500 cursor-pointer hover:text-blue-700"
      onClick={handleMailClick}
      role="button"
      aria-label="Open messages"
      tabIndex={0}
    />
  );
}
```

## Functionality

### Core Features
- **SVG Rendering**: Renders a scalable mail envelope icon with unread indicator
- **Responsive Sizing**: Uses `1em` dimensions to scale with font size
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent
- **Accessibility Ready**: Accepts ARIA attributes for screen reader support
- **Fully Customizable**: All standard SVG props can be applied

### Visual Elements
- Mail envelope outline
- Unread notification circle indicator
- Clean line-style design
- 24x24 viewBox for crisp rendering

## State Management
**No State Management** - This is a stateless presentational component that doesn't require any state management solution. All behavior is controlled through props.

## Side Effects
**No Side Effects** - Pure component with no API calls, DOM manipulation, or external interactions beyond rendering SVG markup.

## Dependencies

### Direct Dependencies
- `react` - For `SVGProps` type definition
- No runtime dependencies

### Integration Dependencies
- **CSS Framework**: Works with Tailwind CSS or any CSS solution for styling
- **Icon System**: Part of the Phosphor Icons (Pi) collection
- **Theme System**: Inherits colors through `currentColor`

## Integration

### Application Architecture
```
src/
├── components/
│   ├── icons/
│   │   └── pi/
│   │       └── pi-mail-unread-line.tsx  ← This component
│   ├── ui/                              ← Used in UI components
│   └── features/                        ← Used in feature components
```

### Common Integration Patterns
- **Navigation Components**: Mail/inbox links in headers or sidebars
- **Notification Systems**: Unread message indicators
- **Dashboard Widgets**: Email/message summary cards
- **Button Components**: Action buttons for mail-related features
- **Status Indicators**: Show unread state in lists or feeds

### With UI Components
```tsx
// In a Button component
import { Button } from '@/components/ui/button';
import { PiMailUnreadLine } from '@/components/icons/pi/pi-mail-unread-line';

<Button variant="outline" size="icon">
  <PiMailUnreadLine />
</Button>

// In a Badge component
import { Badge } from '@/components/ui/badge';
import { PiMailUnreadLine } from '@/components/icons/pi/pi-mail-unread-line';

<Badge variant="secondary">
  <PiMailUnreadLine className="w-4 h-4 mr-1" />
  Unread Messages
</Badge>
```

## Best Practices

### Architecture Adherence
✅ **Server Component**: Correctly implemented as server component (no client interactivity)
✅ **Component Decomposition**: Single responsibility - renders one specific icon
✅ **Reusability**: Placed in `/icons/` directory for cross-application usage
✅ **Props Pattern**: Uses standard SVG props interface for maximum flexibility

### Usage Guidelines
- **Accessibility**: Always provide `aria-label` when used as interactive element
- **Semantic HTML**: Wrap in appropriate semantic elements (`<button>`, `<link>`, etc.)
- **Sizing**: Use CSS classes or `style` prop to control size rather than hardcoded dimensions
- **Color**: Leverage `currentColor` by setting text color on parent elements
- **Performance**: No performance concerns - static SVG with minimal markup

### Anti-patterns to Avoid
- ❌ Don't hardcode colors in the SVG - use `currentColor`
- ❌ Don't add client-side logic directly to this component
- ❌ Don't use without proper semantic context for interactive elements
- ❌ Don't forget accessibility attributes when used for navigation or actions