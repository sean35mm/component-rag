# PiArrowLeftLine Icon Component

## Purpose
The `PiArrowLeftLine` component is a reusable SVG icon that renders a left-pointing arrow with a line/stroke design. This icon is part of the Pi icon family and is commonly used for navigation controls, back buttons, previous actions, or directional indicators in the user interface.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | - | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

### Common SVG Props
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role |

## Usage Example

```tsx
import { PiArrowLeftLine } from '@/components/icons/pi/pi-arrow-left-line';
import { Button } from '@/components/ui/button';

// Basic usage
export function BackButton() {
  return (
    <Button variant="ghost" onClick={() => window.history.back()}>
      <PiArrowLeftLine className="w-4 h-4 mr-2" />
      Back
    </Button>
  );
}

// Navigation breadcrumb
export function BreadcrumbNavigation() {
  return (
    <nav className="flex items-center space-x-2">
      <a href="/dashboard" className="flex items-center text-muted-foreground hover:text-foreground">
        <PiArrowLeftLine className="w-3 h-3 mr-1" />
        Dashboard
      </a>
    </nav>
  );
}

// Carousel control
export function CarouselPrevious({ onPrevious }: { onPrevious: () => void }) {
  return (
    <button
      onClick={onPrevious}
      className="p-2 rounded-full bg-white shadow-md hover:shadow-lg"
      aria-label="Previous slide"
    >
      <PiArrowLeftLine className="w-5 h-5 text-gray-600" />
    </button>
  );
}

// With custom styling
export function StyledArrow() {
  return (
    <PiArrowLeftLine 
      className="w-6 h-6 text-blue-500 hover:text-blue-700 transition-colors"
      style={{ transform: 'rotate(45deg)' }}
    />
  );
}
```

## Functionality
- **Scalable Vector Graphics**: Renders as crisp vector graphics at any size
- **Responsive Sizing**: Uses `1em` dimensions to scale with font size
- **Theme Integration**: Uses `currentColor` fill to inherit text color
- **Accessibility Ready**: Accepts ARIA attributes for screen readers
- **Event Handling**: Supports all standard mouse and keyboard events
- **Customizable**: Fully customizable through CSS classes and inline styles

## State Management
**None** - This is a stateless presentational component. It does not manage any internal state, server state, or client state. All dynamic behavior is handled by parent components that use this icon.

## Side Effects
**None** - This component has no side effects. It performs no API calls, localStorage interactions, or other external operations. It purely renders SVG markup based on the provided props.

## Dependencies
- **React**: Uses `SVGProps` type from React
- **No External Dependencies**: Self-contained with no external library dependencies

## Integration
This component fits into our application architecture as:

- **UI Component Layer**: Located in `/components/icons/pi/` following our icon organization pattern
- **Design System**: Part of the Pi icon family for consistent visual language
- **Reusable Asset**: Can be used across any feature domain (navigation, forms, carousels, etc.)
- **Composable**: Designed to be composed with other UI components like buttons, links, and navigation elements

### Integration Examples
```tsx
// In navigation components
import { PiArrowLeftLine } from '@/components/icons/pi/pi-arrow-left-line';

// In feature components
import { PiArrowLeftLine } from '@/components/icons/pi/pi-arrow-left-line';
import { Button } from '@/components/ui/button';

// In layout components
import { PiArrowLeftLine } from '@/components/icons/pi/pi-arrow-left-line';
```

## Best Practices

### ✅ Follows Architecture Guidelines
- **Server Component**: Correctly implemented as server component (no client-side features)
- **Reusability**: Placed in shared `/components/icons/` directory
- **Flat Structure**: Simple, non-nested component design
- **TypeScript**: Properly typed with SVG props interface

### ✅ Recommended Usage Patterns
```tsx
// Good: Semantic usage with accessibility
<button aria-label="Go back">
  <PiArrowLeftLine className="w-4 h-4" />
</button>

// Good: Consistent sizing with Tailwind
<PiArrowLeftLine className="w-5 h-5 text-muted-foreground" />

// Good: Event handling on parent element
<div onClick={handleClick} className="cursor-pointer">
  <PiArrowLeftLine />
  <span>Back</span>
</div>
```

### ❌ Anti-patterns to Avoid
```tsx
// Avoid: Fixed pixel sizes (not responsive)
<PiArrowLeftLine style={{ width: '16px', height: '16px' }} />

// Avoid: Missing accessibility context
<PiArrowLeftLine onClick={handleClick} /> // No semantic context

// Avoid: Overriding fill color directly
<PiArrowLeftLine style={{ fill: '#000' }} /> // Use color classes instead
```

### Accessibility Considerations
- Always provide `aria-label` when used as interactive element
- Use semantic HTML elements (`button`, `a`) for clickable icons
- Ensure adequate color contrast when customizing colors
- Consider `role="img"` for decorative usage