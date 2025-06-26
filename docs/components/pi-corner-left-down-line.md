# PiCornerLeftDownLine

## Purpose

The `PiCornerLeftDownLine` component is an SVG icon that renders a corner left-down arrow symbol. This icon represents directional movement or navigation that goes left then down, commonly used in UI elements like navigation arrows, flow diagrams, or directional indicators within the application interface.

## Component Type

**Server Component** - This is a pure presentation component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and follows our default choice of using Server Components unless client-side features are explicitly needed.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | `{}` | All standard SVG element props including `className`, `style`, `onClick`, `width`, `height`, etc. Spread to the root `<svg>` element |

## Usage Example

```tsx
import { PiCornerLeftDownLine } from '@/components/icons/pi/pi-corner-left-down-line';

// Basic usage
export function NavigationArrow() {
  return (
    <div className="flex items-center gap-2">
      <span>Turn here</span>
      <PiCornerLeftDownLine className="text-blue-600" />
    </div>
  );
}

// Interactive usage with click handler
export function DirectionalButton() {
  const handleDirectionChange = () => {
    // Handle direction change logic
    console.log('Direction changed to left-down');
  };

  return (
    <button 
      onClick={handleDirectionChange}
      className="p-2 hover:bg-gray-100 rounded-md transition-colors"
      aria-label="Turn left then down"
    >
      <PiCornerLeftDownLine className="w-5 h-5 text-gray-700" />
    </button>
  );
}

// Styled with custom dimensions
export function LargeDirectionalIcon() {
  return (
    <PiCornerLeftDownLine 
      className="text-green-500"
      style={{ width: '2rem', height: '2rem' }}
    />
  );
}
```

## Functionality

- **SVG Rendering**: Renders a scalable vector graphic with a corner left-down arrow design
- **Responsive Sizing**: Uses `1em` width/height by default, making it scale with parent font size
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent elements
- **Accessibility**: Accepts standard SVG props for ARIA attributes and accessibility enhancements
- **Customizable**: Fully customizable through standard SVG props (className, style, event handlers)

## State Management

**No State Management** - This is a stateless presentational component that doesn't require any state management. It simply renders SVG markup based on the props passed to it.

## Side Effects

**No Side Effects** - This component has no side effects, API calls, or external interactions. It's a pure rendering component that outputs deterministic SVG markup.

## Dependencies

- **React**: Uses `SVGProps<SVGSVGElement>` type from React
- **No External Dependencies**: Self-contained component with no external library dependencies

## Integration

This icon component integrates into the larger application architecture as:

- **Icon System**: Part of the Phosphor Icons (`pi`) collection within the `/components/icons/` directory structure
- **Design System**: Serves as a reusable UI primitive following our Lego-block component architecture
- **Feature Components**: Can be composed into larger feature components for navigation, flow diagrams, or directional interfaces
- **Styling Integration**: Works seamlessly with Tailwind CSS classes and custom styling approaches

## Best Practices

✅ **Architectural Alignment**:
- **Server Component**: Correctly implemented as a Server Component following our default pattern
- **Flat Composition**: Simple, single-purpose component that stacks well with other components
- **Reusability**: Located in `/components/icons/` for maximum reusability across domains

✅ **Implementation Patterns**:
- **Props Spreading**: Uses proper props spreading to maintain SVG flexibility
- **Type Safety**: Properly typed with React's `SVGProps<SVGSVGElement>`
- **Accessibility Ready**: Accepts all standard SVG accessibility props
- **Performance Optimized**: No unnecessary re-renders or client-side overhead

✅ **Usage Guidelines**:
- Combine with semantic HTML elements for better accessibility
- Use `aria-label` on parent buttons/links when icon conveys meaning
- Apply Tailwind classes for consistent sizing and colors
- Leverage `currentColor` for theme-aware color inheritance