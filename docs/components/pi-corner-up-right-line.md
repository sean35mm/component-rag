# PiCornerUpRightLine Component

## Purpose

The `PiCornerUpRightLine` component is an SVG icon that renders a corner arrow pointing up and to the right. This icon is part of the Phosphor Icons (pi) collection and is commonly used to indicate directional navigation, link redirection, or corner-based actions in user interfaces.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG content without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | All standard SVG element props including className, style, onClick, etc. Spread to the root SVG element |

### Inherited SVG Props (commonly used)
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `onMouseOver` | `MouseEventHandler` | Mouse over event handler |
| `role` | `string` | Accessibility role |
| `aria-label` | `string` | Accessibility label |

## Usage Example

```tsx
import { PiCornerUpRightLine } from '@/components/icons/pi/pi-corner-up-right-line';

// Basic usage
export function NavigationButton() {
  return (
    <button className="flex items-center gap-2">
      <span>Go to external link</span>
      <PiCornerUpRightLine className="w-4 h-4" />
    </button>
  );
}

// With custom styling
export function DirectionalIndicator() {
  return (
    <div className="flex items-center">
      <PiCornerUpRightLine 
        className="text-blue-500 hover:text-blue-700" 
        style={{ fontSize: '1.5rem' }}
        aria-label="Navigate up and right"
      />
    </div>
  );
}

// In a card component for external links
export function LinkCard({ href, title }: { href: string; title: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
    >
      <span>{title}</span>
      <PiCornerUpRightLine className="w-5 h-5 text-gray-400" />
    </a>
  );
}

// With click handler for interactive usage
export function InteractiveIcon() {
  const handleRedirect = () => {
    window.open('/new-page', '_blank');
  };

  return (
    <PiCornerUpRightLine 
      className="w-6 h-6 cursor-pointer text-gray-600 hover:text-gray-800"
      onClick={handleRedirect}
      role="button"
      aria-label="Open in new window"
    />
  );
}
```

## Functionality

- **SVG Rendering**: Renders a scalable vector graphic with a corner up-right arrow design
- **Responsive Sizing**: Uses `1em` dimensions that scale with font size
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent elements
- **Accessibility Ready**: Accepts ARIA attributes for screen reader compatibility
- **Interactive Support**: Can receive click handlers and other event listeners through props spreading

## State Management

**No State Management** - This is a stateless presentational component that doesn't require any state management. It simply renders based on the props passed to it.

## Side Effects

**No Side Effects** - This component performs no side effects, API calls, or external interactions. It's a pure rendering component.

## Dependencies

### Internal Dependencies
- `SVGProps` from React for type safety

### External Dependencies
- React (implicit)

### Related Components
- Other Phosphor Icon components in `/components/icons/pi/`
- UI components that commonly use directional icons (buttons, links, navigation)

## Integration

This component fits into the application architecture as:

- **Icon System**: Part of the standardized icon collection for consistent visual language
- **UI Components**: Can be composed into buttons, links, and navigation components
- **Design System**: Provides consistent directional indicators across the application
- **Accessibility Layer**: Supports ARIA attributes for inclusive design

### Common Integration Patterns

```tsx
// In button components
import { Button } from '@/components/ui/button';
import { PiCornerUpRightLine } from '@/components/icons/pi/pi-corner-up-right-line';

export function ExternalLinkButton() {
  return (
    <Button variant="outline" className="gap-2">
      Visit Documentation
      <PiCornerUpRightLine className="w-4 h-4" />
    </Button>
  );
}

// In navigation menus
import { PiCornerUpRightLine } from '@/components/icons/pi/pi-corner-up-right-line';

export function NavItem({ href, external }: { href: string; external?: boolean }) {
  return (
    <a href={href} className="flex items-center gap-2">
      <span>Menu Item</span>
      {external && <PiCornerUpRightLine className="w-3 h-3" />}
    </a>
  );
}
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: Correctly implemented as a server component without unnecessary client-side code
- ✅ **Component Decomposition**: Simple, focused component that can be easily composed with other components
- ✅ **Reusability**: Placed in appropriate directory structure for shared icon components
- ✅ **Props Interface**: Uses standard SVG props for maximum flexibility

### Usage Guidelines
- Use consistent sizing classes (`w-4 h-4`, `w-5 h-5`) across the application
- Include `aria-label` when the icon has semantic meaning
- Combine with text labels for better accessibility
- Use `currentColor` behavior to maintain color consistency
- Consider hover states when using interactively

### Performance Considerations
- Component is lightweight and optimized for server-side rendering
- SVG is inline, avoiding additional HTTP requests
- No runtime JavaScript required for basic usage