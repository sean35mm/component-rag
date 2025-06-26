# PiMailOpenLine Icon Component

## Purpose

The `PiMailOpenLine` component is an SVG icon that represents an open mail/email document with outline styling. It displays a mail envelope in an opened state with visible content lines, commonly used to indicate email-related actions such as viewing, reading, or opening email messages in the application interface.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup. It has no client-side interactivity, state management, or browser APIs, making it suitable for server-side rendering by default.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Spread to the root `<svg>` element |

## Usage Example

```tsx
import { PiMailOpenLine } from '@/components/icons/pi/pi-mail-open-line';

// Basic usage
export function EmailSection() {
  return (
    <div className="flex items-center gap-2">
      <PiMailOpenLine />
      <span>Read Messages</span>
    </div>
  );
}

// With custom styling and accessibility
export function EmailButton() {
  return (
    <button 
      className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100"
      aria-label="Open email"
    >
      <PiMailOpenLine 
        className="text-blue-600" 
        width={20} 
        height={20}
        aria-hidden="true"
      />
      <span>View Email</span>
    </button>
  );
}

// In email status indicators
export function EmailList({ emails }: { emails: Email[] }) {
  return (
    <div className="space-y-2">
      {emails.map(email => (
        <div key={email.id} className="flex items-center gap-3 p-3 border rounded">
          <PiMailOpenLine 
            className={email.isRead ? "text-gray-400" : "text-blue-600"} 
          />
          <span className={email.isRead ? "text-gray-600" : "font-semibold"}>
            {email.subject}
          </span>
        </div>
      ))}
    </div>
  );
}
```

## Functionality

- **SVG Rendering**: Renders a scalable vector graphic of an open mail envelope
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent
- **Accessibility Ready**: Accepts ARIA attributes for screen reader support
- **Style Flexibility**: Accepts all standard SVG props for customization

## State Management

**None** - This is a stateless presentational component with no state management requirements.

## Side Effects

**None** - Pure component with no side effects, API calls, or external interactions.

## Dependencies

### Internal Dependencies
- React's `SVGProps` type for prop typing

### External Dependencies
- React (for JSX and type definitions)

## Integration

### Icon System Integration
```tsx
// Part of the Pi icon family
import { PiMailOpenLine } from '@/components/icons/pi/pi-mail-open-line';
import { PiMailLine } from '@/components/icons/pi/pi-mail-line';
import { PiInboxLine } from '@/components/icons/pi/pi-inbox-line';

// Used in email management interfaces
export function EmailToolbar() {
  return (
    <div className="flex gap-2">
      <button><PiInboxLine /> Inbox</button>
      <button><PiMailLine /> Compose</button>
      <button><PiMailOpenLine /> Read</button>
    </div>
  );
}
```

### UI Component Integration
```tsx
// Integration with button components
import { Button } from '@/components/ui/button';
import { PiMailOpenLine } from '@/components/icons/pi/pi-mail-open-line';

export function EmailActions() {
  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm">
        <PiMailOpenLine className="mr-2 h-4 w-4" />
        Mark as Read
      </Button>
    </div>
  );
}
```

### Email Feature Integration
```tsx
// Used in email-related features
export function EmailCard({ email }: { email: EmailType }) {
  const iconColor = email.status === 'read' ? 'text-gray-400' : 'text-blue-600';
  
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <PiMailOpenLine className={iconColor} />
        <span className="font-medium">{email.subject}</span>
      </div>
      <p className="text-gray-600">{email.preview}</p>
    </div>
  );
}
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: No client-side logic, suitable for SSR
- ✅ **Flat Structure**: Simple, single-purpose component without nesting
- ✅ **Reusable Design**: Generic icon component usable across domains
- ✅ **Type Safety**: Properly typed with SVGProps interface

### Usage Recommendations
- Use `aria-hidden="true"` when icon is decorative alongside text
- Provide `aria-label` when icon is used without accompanying text
- Apply consistent sizing using Tailwind classes (`h-4 w-4`, `h-5 w-5`)
- Use semantic color classes that reflect email state (read/unread)
- Combine with tooltips for better UX in icon-only buttons

### Performance Considerations
- Inline SVG for optimal performance (no additional HTTP requests)
- Scalable vector format suitable for all screen densities
- Minimal DOM footprint with single SVG element
- Server-renderable for faster initial page loads