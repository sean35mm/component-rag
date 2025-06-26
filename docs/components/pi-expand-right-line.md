# PiExpandRightLine Icon Component

## Purpose

The `PiExpandRightLine` component is an SVG icon that visually represents an "expand right" action. It displays an arrow pointing right with a vertical line, commonly used in UI elements like sidebars, panels, or navigation to indicate expansion or forward movement functionality.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup. It has no client-side interactivity, state management, or browser APIs, making it ideal for server-side rendering by default.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | All standard SVG element props including `className`, `onClick`, `style`, `aria-label`, etc. Spread to the root `<svg>` element |

## Usage Example

```tsx
import { PiExpandRightLine } from '@/components/icons/pi/pi-expand-right-line';
import { Button } from '@/components/ui/button';

// Basic usage
<PiExpandRightLine />

// With custom styling
<PiExpandRightLine 
  className="text-blue-500 hover:text-blue-700" 
  style={{ fontSize: '1.5rem' }}
/>

// In a button component
<Button 
  variant="ghost" 
  size="sm"
  onClick={() => expandSidebar()}
  aria-label="Expand sidebar"
>
  <PiExpandRightLine className="mr-2" />
  Expand Panel
</Button>

// With accessibility
<PiExpandRightLine 
  role="img"
  aria-label="Expand to the right"
  className="w-5 h-5"
/>

// In navigation or toolbar
<div className="flex items-center gap-2">
  <span>More Options</span>
  <PiExpandRightLine className="text-gray-400" />
</div>
```

## Functionality

- **Scalable Rendering**: Uses `1em` width/height for automatic scaling with font size
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent elements
- **Responsive Design**: Scales appropriately with CSS font-size or explicit width/height
- **Accessibility Ready**: Accepts ARIA attributes and semantic props for screen readers
- **Customizable**: All SVG props can be overridden for styling and behavior

## State Management

**No State Management** - This is a stateless presentational component. It renders SVG markup based on props without any internal state, TanStack Query, or Zustand usage.

## Side Effects

**No Side Effects** - Pure component with no API calls, DOM manipulation, or external interactions. It only renders SVG content based on the provided props.

## Dependencies

- **React**: Uses `SVGProps` type from React for type safety
- **No External Dependencies**: Self-contained component with no additional imports or hooks

## Integration

This icon component integrates into the larger application architecture as:

- **UI Layer Component**: Located in `/components/icons/pi/` following the icon organization pattern
- **Design System Element**: Part of the Phosphor Icons collection for consistent visual language
- **Reusable Asset**: Can be imported and used across any feature domain or UI component
- **Styling Integration**: Works with Tailwind CSS classes and CSS-in-JS solutions
- **Component Composition**: Combines with buttons, navigation, panels, and other interactive elements

## Best Practices

✅ **Architectural Alignment**:
- Server Component by default (no unnecessary client-side JavaScript)
- Flat component structure with no nested complexity
- Proper TypeScript integration with `SVGProps<SVGSVGElement>`
- Follows icon naming convention (`pi-` prefix for Phosphor Icons)

✅ **Usage Recommendations**:
- Always provide `aria-label` when used standalone for accessibility
- Use semantic sizing (`className="w-5 h-5"`) rather than inline styles when possible
- Combine with interactive elements (buttons, links) rather than handling clicks directly
- Leverage `currentColor` for theme-aware color inheritance
- Import only when needed to maintain optimal bundle size

✅ **Integration Patterns**:
- Pair with UI components from `/components/ui/` for consistent behavior
- Use in feature components organized by domain
- Apply consistent spacing and alignment with layout utilities
- Maintain visual hierarchy through appropriate sizing and color contrast