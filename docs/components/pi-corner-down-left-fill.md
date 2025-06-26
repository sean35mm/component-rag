# PiCornerDownLeftFill Icon Component

## Purpose

The `PiCornerDownLeftFill` component renders a filled corner down-left arrow icon, commonly used in navigation interfaces, directional indicators, or flow diagrams. This icon represents a downward then leftward direction change, making it useful for breadcrumbs, step indicators, or any UI element that needs to show a corner turn navigation pattern.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, event handlers, or state management. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

### Common SVGProps Include:
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role
- `width` - Override default width (defaults to '1em')
- `height` - Override default height (defaults to '1em')

## Usage Example

```tsx
import { PiCornerDownLeftFill } from '@/components/icons/pi/pi-corner-down-left-fill';

// Basic usage
export default function NavigationExample() {
  return (
    <div className="flex items-center gap-2">
      <span>Turn here</span>
      <PiCornerDownLeftFill className="text-blue-500" />
    </div>
  );
}

// With event handling (converts to Client Component)
'use client';

export function InteractiveDirectionIndicator() {
  const handleDirectionClick = () => {
    console.log('Direction clicked');
  };

  return (
    <button 
      onClick={handleDirectionClick}
      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
    >
      <PiCornerDownLeftFill 
        className="text-gray-700 hover:text-blue-600 transition-colors"
        aria-label="Turn down then left"
      />
      <span>Follow this path</span>
    </button>
  );
}

// In breadcrumb navigation
export function BreadcrumbNavigation() {
  return (
    <nav className="flex items-center space-x-2 text-sm">
      <a href="/" className="text-blue-600">Home</a>
      <PiCornerDownLeftFill className="text-gray-400 w-4 h-4" />
      <a href="/products" className="text-blue-600">Products</a>
      <PiCornerDownLeftFill className="text-gray-400 w-4 h-4" />
      <span className="text-gray-900">Current Page</span>
    </nav>
  );
}

// Custom sizing and styling
export function CustomStyledIcon() {
  return (
    <PiCornerDownLeftFill 
      className="text-red-500"
      style={{ fontSize: '2rem' }}
      role="img"
      aria-label="Redirect indicator"
    />
  );
}
```

## Functionality

- **SVG Rendering**: Renders a scalable vector graphic with a filled corner down-left arrow design
- **Responsive Sizing**: Uses `1em` dimensions, automatically scaling with parent font size
- **Color Inheritance**: Uses `currentColor` fill, inheriting the text color of its container
- **Accessibility Ready**: Accepts ARIA attributes for screen reader compatibility
- **Event Handling**: Supports all standard SVG events when used in Client Components
- **Styling Flexibility**: Accepts `className` and `style` props for custom appearance

## State Management

**No State Management** - This is a stateless presentational component that doesn't require any state management. It simply renders SVG markup based on the props provided.

## Side Effects

**No Side Effects** - This component is purely functional with no side effects, API calls, or external interactions. It only renders SVG markup.

## Dependencies

### Internal Dependencies:
- `SVGProps` from React (for TypeScript prop types)

### External Dependencies:
- None - This component has no external dependencies

### Related Components:
- Other Phosphor icon components in the `/icons/pi/` directory
- UI components that might use this icon (buttons, navigation, etc.)

## Integration

This component integrates into the larger application architecture as:

- **UI Building Block**: Used within larger UI components for visual enhancement
- **Design System Component**: Part of the icon library following consistent sizing and styling patterns
- **Accessibility Layer**: Contributes to accessible interfaces when proper ARIA labels are provided
- **Theme Integration**: Respects design system colors through `currentColor` usage

```tsx
// Integration with design system
import { Button } from '@/components/ui/button';
import { PiCornerDownLeftFill } from '@/components/icons/pi/pi-corner-down-left-fill';

export function DirectionButton() {
  return (
    <Button variant="outline" className="gap-2">
      <PiCornerDownLeftFill />
      Turn Left
    </Button>
  );
}
```

## Best Practices

### ✅ Follows Architecture Guidelines:

1. **Server Component by Default**: No unnecessary client-side JavaScript
2. **Flat Component Structure**: Simple, single-purpose component without complex nesting
3. **Reusable Design**: Generic icon component usable across different features
4. **TypeScript Integration**: Properly typed with SVGProps interface
5. **Accessibility Considerations**: Supports ARIA attributes for inclusive design

### ✅ Recommended Usage Patterns:

```tsx
// ✅ Good: Semantic usage with proper labeling
<PiCornerDownLeftFill 
  aria-label="Navigate to previous step" 
  className="text-blue-600" 
/>

// ✅ Good: Consistent sizing with design system
<PiCornerDownLeftFill className="w-4 h-4 text-gray-500" />

// ✅ Good: Using with other UI components
<Button>
  <PiCornerDownLeftFill className="mr-2" />
  Back
</Button>
```

### ❌ Anti-patterns to Avoid:

```tsx
// ❌ Avoid: Hardcoded colors that don't follow design system
<PiCornerDownLeftFill style={{ color: '#ff0000' }} />

// ❌ Avoid: Missing accessibility context when used as interactive element
<div onClick={handleClick}>
  <PiCornerDownLeftFill /> {/* No aria-label */}
</div>

// ❌ Avoid: Overriding viewBox or core SVG structure
<PiCornerDownLeftFill viewBox="0 0 100 100" /> {/* Breaks icon design */}
```