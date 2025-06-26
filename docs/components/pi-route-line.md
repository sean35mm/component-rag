# PiRouteLine Icon Component

## Purpose

The `PiRouteLine` component is an SVG icon component that renders a route/path visualization graphic. This icon typically represents navigation routes, pathways, or directional flow in UI contexts such as maps, navigation interfaces, or workflow diagrams. It's part of the Phosphor icon library integration and provides a scalable vector graphic with consistent styling.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be rendered on the server and doesn't require the 'use client' directive.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

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
import { PiRouteLine } from '@/components/icons/pi/pi-route-line';

// Basic usage
export function NavigationHeader() {
  return (
    <div className="flex items-center gap-2">
      <PiRouteLine />
      <span>Route Planning</span>
    </div>
  );
}

// With custom styling
export function RouteButton() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded">
      <PiRouteLine 
        className="w-5 h-5" 
        aria-label="Route icon"
      />
      Plan Route
    </button>
  );
}

// In a navigation menu
export function MapControls() {
  return (
    <nav className="flex gap-4">
      <button 
        className="p-2 hover:bg-gray-100 rounded"
        aria-label="Show routes"
      >
        <PiRouteLine className="w-6 h-6 text-gray-600" />
      </button>
    </nav>
  );
}

// With dynamic sizing
export function StatusIndicator({ size = "default" }: { size?: "sm" | "default" | "lg" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    default: "w-5 h-5", 
    lg: "w-6 h-6"
  };

  return (
    <PiRouteLine 
      className={`${sizeClasses[size]} text-blue-600`}
      role="img"
      aria-label="Route status"
    />
  );
}
```

## Functionality

- **Scalable Vector Rendering**: Renders crisp icons at any size using `1em` width/height
- **Color Inheritance**: Uses `fill='currentColor'` to inherit text color from parent elements
- **Responsive Design**: Automatically scales with font-size changes
- **Accessibility Ready**: Accepts ARIA attributes for screen reader compatibility
- **Event Handling**: Supports all standard SVG events (click, hover, focus, etc.)
- **Flexible Styling**: Accepts className and style props for custom appearance

## State Management

**No State Management Required** - This is a stateless presentational component that doesn't manage any internal state, server state, or client state. It simply renders SVG markup based on the provided props.

## Side Effects

**No Side Effects** - This component is a pure function that:
- Doesn't perform API calls
- Doesn't access browser APIs
- Doesn't cause any side effects
- Doesn't interact with external services
- Simply renders static SVG content

## Dependencies

### Direct Dependencies
- `react` - For `SVGProps` type definition
- No external libraries or components

### Peer Dependencies
- **CSS Framework** (optional) - Works with Tailwind CSS, CSS modules, or styled-components
- **Icon System** - Part of broader Phosphor icon integration

## Integration

### Application Architecture Integration

```tsx
// In UI component library
export { PiRouteLine } from '@/components/icons/pi/pi-route-line';

// In feature components
import { PiRouteLine } from '@/components/icons/pi/pi-route-line';

// Map feature component
export function MapInterface() {
  return (
    <div className="map-container">
      <div className="map-controls">
        <button>
          <PiRouteLine className="w-5 h-5" />
          Routes
        </button>
      </div>
    </div>
  );
}

// Navigation feature
export function NavigationFlow() {
  const steps = [
    { icon: PiRouteLine, label: "Plan Route", completed: true },
    // other steps...
  ];

  return (
    <ol className="flex gap-4">
      {steps.map((step, index) => (
        <li key={index} className="flex items-center gap-2">
          <step.icon className={step.completed ? "text-green-600" : "text-gray-400"} />
          <span>{step.label}</span>
        </li>
      ))}
    </ol>
  );
}
```

### Design System Integration
- Consistent with Phosphor icon design language
- Integrates with design token sizing (1em base)
- Compatible with design system color schemes
- Follows accessibility patterns

## Best Practices

### Architecture Adherence
✅ **Server Component**: Correctly implemented as server component without unnecessary client directive  
✅ **Component Decomposition**: Simple, focused component with single responsibility  
✅ **Reusability**: Located in `/icons/` directory for cross-application usage  
✅ **Type Safety**: Properly typed with `SVGProps<SVGSVGElement>`

### Usage Recommendations

```tsx
// ✅ Good: Semantic usage with proper accessibility
<button aria-label="Plan new route">
  <PiRouteLine className="w-5 h-5" />
  <span className="sr-only">Plan Route</span>
</button>

// ✅ Good: Consistent sizing with design system
<PiRouteLine className="w-5 h-5 text-primary-600" />

// ✅ Good: Responsive sizing
<PiRouteLine className="w-4 h-4 md:w-5 md:h-5" />

// ❌ Avoid: Missing accessibility context
<PiRouteLine onClick={handleClick} />

// ❌ Avoid: Fixed pixel sizes that don't scale
<PiRouteLine style={{ width: '20px', height: '20px' }} />
```

### Performance Considerations
- No re-rendering issues (stateless)
- Lightweight SVG markup
- Server-side rendering compatible
- No bundle size impact from client-side JavaScript