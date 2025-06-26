# PiExternalLinkLine Icon Component

## Purpose
The `PiExternalLinkLine` component is an SVG icon that represents an external link. It displays a line-style icon commonly used to indicate that a link will open in a new tab or navigate to an external website. This component is part of the application's icon system and follows the Phosphor icon design language.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup. It has no client-side interactivity, state management, or browser-specific APIs, making it ideal for server-side rendering. The component only accepts props and returns JSX, requiring no 'use client' directive.

## Props Interface

| Prop Name | Type | Required | Description |
|-----------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | Standard SVG element props including className, style, onClick, etc. Spreads all valid SVG attributes to the root svg element |

### Inherited SVG Props
Common props you might use:
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `onMouseEnter/onMouseLeave` - Mouse event handlers
- `aria-label` - Accessibility label
- `role` - ARIA role attribute

## Usage Example

```tsx
import { PiExternalLinkLine } from '@/components/icons/pi/pi-external-link-line';

// Basic usage
function ExternalLink() {
  return (
    <a href="https://example.com" target="_blank" rel="noopener noreferrer">
      Visit our website
      <PiExternalLinkLine className="ml-1 inline-block" />
    </a>
  );
}

// With custom styling
function StyledExternalLink() {
  return (
    <button className="flex items-center gap-2">
      Open Documentation
      <PiExternalLinkLine 
        className="text-blue-500 hover:text-blue-700 transition-colors" 
        aria-label="Opens in new tab"
      />
    </button>
  );
}

// In a navigation menu
function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  const isExternal = href.startsWith('http');
  
  return (
    <a 
      href={href} 
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="flex items-center gap-1"
    >
      {children}
      {isExternal && <PiExternalLinkLine className="w-4 h-4" />}
    </a>
  );
}
```

## Functionality
- **SVG Rendering**: Renders a scalable vector graphic with three path elements forming an external link icon
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Current Color**: Uses `fill='currentColor'` to inherit text color from parent elements
- **Flexible Styling**: Accepts all standard SVG props for customization
- **Accessibility Ready**: Can receive ARIA attributes for screen reader compatibility

## State Management
**None** - This is a stateless presentational component. It doesn't manage any internal state, use TanStack Query, or Zustand. All behavior is determined by the props passed to it.

## Side Effects
**None** - This component has no side effects, makes no API calls, and doesn't interact with external systems. It's a pure function that returns JSX based on its props.

## Dependencies
- **React**: Uses `SVGProps` type from React for prop typing
- **No external dependencies**: Completely self-contained component

## Integration
This icon component fits into the application architecture as:

- **UI Component Layer**: Part of the `/components/icons/` directory structure for reusable UI elements
- **Design System**: Contributes to the consistent icon system using Phosphor icons
- **Composable**: Can be embedded in buttons, links, navigation items, and other components
- **Theme Integration**: Works with CSS-in-JS, Tailwind CSS, or any styling system through className and style props

### Common Integration Patterns:
```tsx
// With buttons
<Button variant="outline">
  Open Link <PiExternalLinkLine />
</Button>

// With navigation
<NavigationMenuItem>
  External Resource <PiExternalLinkLine className="ml-auto" />
</NavigationMenuItem>

// With cards
<Card>
  <CardHeader>
    <CardTitle className="flex items-center justify-between">
      Resource Title
      <PiExternalLinkLine />
    </CardTitle>
  </CardHeader>
</Card>
```

## Best Practices
✅ **Adheres to Architecture Guidelines:**
- **Server Component**: Correctly implemented as a server component with no client-side dependencies
- **Flat Component Structure**: Simple, single-purpose component that composes well with others
- **Reusable UI Component**: Located in appropriate directory structure for reuse across features
- **No State Management Overhead**: Doesn't introduce unnecessary state management for static content

✅ **Recommended Usage Patterns:**
- Always provide `aria-label` when the icon conveys important information
- Use consistent sizing classes (`w-4 h-4`, `text-sm`, etc.) across the application
- Combine with proper `target="_blank"` and `rel="noopener noreferrer"` on external links
- Consider color contrast when styling for accessibility compliance

✅ **Performance Considerations:**
- Lightweight SVG component with minimal bundle impact
- Server-rendered by default for better initial page load
- No runtime JavaScript required for basic functionality