# PiArrowRightSLine Component

## Purpose

The `PiArrowRightSLine` component is a presentational SVG icon component that renders a right-pointing arrow with a line style. It's part of the icon library and is designed to provide consistent visual indicators for navigation, progression, or directional context throughout the application. This component is commonly used in buttons, navigation elements, pagination controls, and anywhere a right-pointing directional cue is needed.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and doesn't require the 'use client' directive.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Spread to the root `<svg>` element |

### Inherited SVG Props
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role
- `width` / `height` - Override default sizing (defaults to '1em')
- `fill` - Override fill color (defaults to 'currentColor')

## Usage Example

```tsx
import { PiArrowRightSLine } from '@/components/icons/pi/pi-arrow-right-s-line';
import { Button } from '@/components/ui/button';

// Basic usage
export function NavigationExample() {
  return (
    <div className="flex items-center gap-2">
      <span>Continue</span>
      <PiArrowRightSLine />
    </div>
  );
}

// In a button component
export function NextButton() {
  return (
    <Button variant="primary" className="flex items-center gap-2">
      Next Step
      <PiArrowRightSLine className="w-4 h-4" />
    </Button>
  );
}

// With custom styling and event handling
export function InteractiveArrow() {
  return (
    <PiArrowRightSLine 
      className="w-6 h-6 text-blue-600 hover:text-blue-800 cursor-pointer transition-colors"
      onClick={() => console.log('Arrow clicked')}
      aria-label="Navigate to next page"
      role="button"
    />
  );
}

// In a breadcrumb navigation
export function Breadcrumb({ items }: { items: string[] }) {
  return (
    <nav className="flex items-center space-x-2">
      {items.map((item, index) => (
        <div key={item} className="flex items-center space-x-2">
          <span>{item}</span>
          {index < items.length - 1 && (
            <PiArrowRightSLine className="w-4 h-4 text-gray-400" />
          )}
        </div>
      ))}
    </nav>
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisp at any size using SVG format
- **Theme Integration**: Uses `currentColor` fill to inherit text color from parent
- **Responsive Sizing**: Default 1em sizing adapts to parent font size
- **Accessibility Ready**: Accepts ARIA attributes for screen reader support
- **Flexible Styling**: Supports all standard SVG props for customization

### Visual Characteristics
- **Viewbox**: 24x24 coordinate system for consistent scaling
- **Path Design**: Clean line-style arrow pointing right
- **Fill Rule**: Uses `evenodd` and `nonzero` clip rules for proper rendering

## State Management

**No State Management** - This is a stateless presentational component that doesn't manage any internal state, server state, or client state. It purely renders SVG markup based on the props passed to it.

## Side Effects

**No Side Effects** - The component has no side effects, makes no API calls, and doesn't interact with external systems. It's a pure function that renders consistent output based on its props.

## Dependencies

### Internal Dependencies
- `React.SVGProps<SVGSVGElement>` - TypeScript interface for SVG element props

### External Dependencies
- **React** - Core React library for JSX and component functionality

### No Component Dependencies
This is a leaf component that doesn't depend on other custom components, hooks, or services within the application.

## Integration

### Application Architecture Role
- **UI Layer**: Sits in the base UI layer as a reusable icon component
- **Design System**: Part of the icon library that ensures visual consistency
- **Component Composition**: Used as a building block in higher-level components like buttons, navigation, and form controls

### Usage Patterns
```tsx
// Feature component integration
import { PiArrowRightSLine } from '@/components/icons/pi/pi-arrow-right-s-line';

// Used in domain-specific components
export function ProductCatalogNavigation() {
  return (
    <div className="product-navigation">
      <Button onClick={handleNext}>
        View More Products
        <PiArrowRightSLine />
      </Button>
    </div>
  );
}
```

## Best Practices

### Architecture Adherence
✅ **Server Component**: Correctly implemented as a server component without unnecessary client-side code  
✅ **Component Decomposition**: Simple, focused component that does one thing well  
✅ **Reusability**: Placed in appropriate icon directory for reuse across features  
✅ **Props Interface**: Uses standard SVG props interface for consistency  

### Recommended Usage Patterns
- **Semantic HTML**: Always provide `aria-label` when used as interactive element
- **Size Consistency**: Use Tailwind classes (`w-4 h-4`, `w-6 h-6`) for consistent sizing
- **Color Inheritance**: Leverage `currentColor` by setting text color on parent elements
- **Accessibility**: Add proper ARIA attributes when icon conveys important information

### Performance Considerations
- **Bundle Size**: Minimal impact due to simple SVG markup
- **Rendering**: Server-side rendering compatible, no hydration required
- **Reusability**: Can be safely imported and used in multiple components without performance concerns

### Integration Guidelines
```tsx
// ✅ Good: Semantic usage with proper accessibility
<Button aria-label="Go to next page">
  Next <PiArrowRightSLine aria-hidden="true" />
</Button>

// ✅ Good: Proper size and color inheritance
<div className="text-blue-600">
  <PiArrowRightSLine className="w-5 h-5" />
</div>

// ❌ Avoid: Redundant accessibility labels
<PiArrowRightSLine aria-label="Arrow" /> {/* Icon is decorative */}
```