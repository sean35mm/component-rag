# PiGlobalFill Icon Component

## Purpose
The `PiGlobalFill` component is a filled SVG icon that represents global or worldwide concepts. It renders a globe/earth icon commonly used for internationalization features, global settings, world-wide services, or geographic-related functionality. This is part of the Phosphor icon library integration and follows our icon component patterns.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, event handlers, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `width` | `string \| number` | No | `"1em"` | Sets the width of the SVG icon |
| `height` | `string \| number` | No | `"1em"` | Sets the height of the SVG icon |
| `fill` | `string` | No | `"currentColor"` | Sets the fill color of the SVG paths |
| `className` | `string` | No | `undefined` | CSS classes to apply to the SVG element |
| `style` | `CSSProperties` | No | `undefined` | Inline styles to apply to the SVG element |
| `onClick` | `MouseEventHandler<SVGSVGElement>` | No | `undefined` | Click event handler |
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All other standard SVG element props |

## Usage Example

```tsx
import { PiGlobalFill } from '@/components/icons/pi/pi-global-fill';

// Basic usage
export function LanguageSelector() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 rounded-md">
      <PiGlobalFill className="w-5 h-5 text-blue-600" />
      <span>English</span>
    </button>
  );
}

// In a navigation menu
export function GlobalSettingsLink() {
  return (
    <a href="/settings/global" className="flex items-center gap-3 p-3 hover:bg-gray-100">
      <PiGlobalFill className="w-6 h-6 text-gray-600" />
      <span>Global Settings</span>
    </a>
  );
}

// With custom styling
export function WorldwideServiceBadge() {
  return (
    <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full">
      <PiGlobalFill 
        className="w-4 h-4 text-green-600" 
        aria-label="Available worldwide"
      />
      <span className="text-sm text-green-800">Global</span>
    </div>
  );
}

// In a form field
export function RegionSelector() {
  return (
    <div className="relative">
      <PiGlobalFill className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <select className="pl-10 pr-4 py-2 border rounded-md w-full">
        <option>Select Region</option>
        <option>North America</option>
        <option>Europe</option>
        <option>Asia Pacific</option>
      </select>
    </div>
  );
}
```

## Functionality
- **SVG Rendering**: Renders a filled globe icon with consistent visual styling
- **Responsive Sizing**: Uses `1em` dimensions by default to scale with parent font size
- **Color Inheritance**: Uses `currentColor` to inherit text color from parent elements
- **Accessibility**: Supports ARIA attributes and semantic markup when wrapped appropriately
- **Customizable**: Accepts all standard SVG props for styling and behavior customization

## State Management
**No State Management** - This is a stateless presentational component that renders static SVG content. It doesn't manage any internal state or interact with external state management systems.

## Side Effects
**No Side Effects** - This component performs no side effects, API calls, or external interactions. It's a pure rendering component.

## Dependencies
- **React**: Uses `SVGProps` type from React for prop typing
- **No External Dependencies**: Self-contained SVG icon component

## Integration
- **Icon System**: Part of the Phosphor icon library integration in `/components/icons/pi/`
- **Design System**: Integrates with the application's visual design system and color palette
- **Component Library**: Can be used across all feature domains as a reusable UI primitive
- **Theming**: Responds to theme colors through `currentColor` and CSS custom properties
- **Accessibility**: Works with screen readers when proper semantic context is provided by parent components

## Best Practices
- **Server-First**: Implemented as a Server Component following our default approach
- **Prop Spreading**: Uses `{...props}` to accept all valid SVG attributes for maximum flexibility
- **Consistent Sizing**: Follows our icon sizing conventions with `1em` default dimensions
- **Color Inheritance**: Uses `currentColor` for seamless integration with design system
- **Type Safety**: Properly typed with `SVGProps<SVGSVGElement>` for full TypeScript support
- **Accessibility**: When used in interactive contexts, ensure proper labeling with `aria-label` or surrounding context
- **Performance**: Lightweight and optimized for server-side rendering without client-side JavaScript overhead

The component exemplifies our architectural principles of being a simple, reusable UI primitive that can be composed into larger features while maintaining consistent visual and behavioral patterns across the application.