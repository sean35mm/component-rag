# PiArrowRightLine Component

## Purpose
The `PiArrowRightLine` component is a reusable SVG icon component that renders a right-pointing arrow with a clean, minimal line design. It's part of the Phosphor Icons (`pi`) collection and serves as a visual indicator for navigation, actions that move forward, or directional cues throughout the application interface.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and hydrated on the client without requiring the `'use client'` directive.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including className, style, onClick, etc. Spread to the root SVG element |

### Inherited SVG Props (Common Usage)
| Prop Name | Type | Description |
|-----------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `role` | `string` | ARIA role attribute |
| `aria-label` | `string` | Accessibility label |

## Usage Example

```tsx
import { PiArrowRightLine } from '@/components/icons/pi/pi-arrow-right-line';

// Basic usage
function NavigationButton() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md">
      Next Step
      <PiArrowRightLine className="w-4 h-4" />
    </button>
  );
}

// With custom styling and interaction
function CarouselControls() {
  const handleNext = () => {
    // Navigate to next slide
  };

  return (
    <button
      onClick={handleNext}
      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
      aria-label="Next slide"
    >
      <PiArrowRightLine 
        className="w-6 h-6 text-gray-700" 
        role="img"
        aria-hidden="true"
      />
    </button>
  );
}

// In breadcrumb navigation
function Breadcrumbs({ items }: { items: string[] }) {
  return (
    <nav className="flex items-center space-x-2">
      {items.map((item, index) => (
        <React.Fragment key={item}>
          <span>{item}</span>
          {index < items.length - 1 && (
            <PiArrowRightLine className="w-3 h-3 text-gray-400" />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
```

## Functionality
- **Scalable Vector Graphics**: Renders crisp icons at any size using `1em` dimensions that scale with font-size
- **Current Color Inheritance**: Uses `fill='currentColor'` to inherit text color from parent elements
- **Accessible Design**: Compatible with screen readers and supports ARIA attributes
- **Responsive Sizing**: Automatically scales with parent container's font-size
- **Customizable Appearance**: Accepts all standard SVG props for styling and interaction

## State Management
**No State Management** - This is a stateless presentational component that doesn't require any state management solution. It simply renders SVG markup based on the props passed to it.

## Side Effects
**No Side Effects** - The component has no side effects, API calls, or external interactions. It's a pure function that returns JSX based on its props.

## Dependencies
- **React**: Uses `SVGProps` type from React for prop typing
- **No External Dependencies**: Completely self-contained with no dependencies on other components, hooks, or services

## Integration
This component integrates into the larger application architecture as:

- **UI Component Layer**: Lives in `/components/icons/pi/` following the flat component structure
- **Design System**: Part of the icon library that provides consistent visual elements
- **Reusable Asset**: Can be imported and used across any feature domain without coupling
- **Accessibility Foundation**: Supports WCAG compliance when used with proper ARIA attributes
- **Theme Integration**: Works seamlessly with CSS custom properties and theme systems through `currentColor`

## Best Practices

### ✅ Follows Architecture Guidelines
- **Server Component Default**: No unnecessary client-side code
- **Flat Component Structure**: Simple, single-purpose component without nesting
- **Reusable Design**: Generic enough for use across multiple domains
- **TypeScript Integration**: Proper typing with SVG props interface

### ✅ Recommended Usage Patterns
```tsx
// Good: Semantic usage with accessibility
<PiArrowRightLine 
  className="w-4 h-4" 
  aria-label="Next page"
  role="img"
/>

// Good: Consistent sizing with Tailwind
<PiArrowRightLine className="w-5 h-5 text-blue-600" />

// Good: Interactive usage
<button onClick={handleNext}>
  Next <PiArrowRightLine className="ml-1 w-4 h-4" />
</button>
```

### ❌ Anti-patterns to Avoid
```tsx
// Avoid: Hardcoded colors (use currentColor instead)
<PiArrowRightLine style={{ fill: '#000000' }} />

// Avoid: Missing accessibility for interactive elements
<div onClick={handleClick}>
  <PiArrowRightLine /> {/* Should have proper ARIA labels */}
</div>
```

### Performance Considerations
- **Bundle Optimization**: Import only needed icons to avoid bundle bloat
- **Server Rendering**: Renders efficiently on server without hydration issues
- **Memory Efficient**: No state or effect cleanup required