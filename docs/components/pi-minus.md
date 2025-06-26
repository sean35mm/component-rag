# PiMinus Component

## Purpose
The `PiMinus` component is a reusable SVG icon component that renders a minus/subtract symbol. It's part of the Phosphor Icons (Pi) collection and provides a consistent, scalable minus icon for use throughout the application in buttons, forms, navigation, and other UI elements where a subtraction or collapse action is needed.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and doesn't require the 'use client' directive.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including `className`, `style`, `width`, `height`, `onClick`, etc. Spread into the root `<svg>` element |

## Usage Example

```tsx
import { PiMinus } from '@/components/icons/pi/pi-minus';
import { Button } from '@/components/ui/button';

// Basic usage
export function DecrementButton() {
  return (
    <Button variant="outline" size="sm">
      <PiMinus className="w-4 h-4" />
      Remove Item
    </Button>
  );
}

// In a quantity selector
export function QuantitySelector({ quantity, onDecrease, onIncrease }) {
  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="outline" 
        size="icon"
        onClick={onDecrease}
        disabled={quantity <= 1}
      >
        <PiMinus className="w-4 h-4" />
      </Button>
      <span className="px-3 py-1 text-sm font-medium">{quantity}</span>
      <Button variant="outline" size="icon" onClick={onIncrease}>
        <PiPlus className="w-4 h-4" />
      </Button>
    </div>
  );
}

// In a collapsible section
export function CollapsibleSection({ title, children, isExpanded, onToggle }) {
  return (
    <div className="border rounded-lg">
      <button 
        className="flex items-center justify-between w-full p-4 text-left"
        onClick={onToggle}
      >
        <span className="font-medium">{title}</span>
        {isExpanded ? (
          <PiMinus className="w-5 h-5 text-gray-500" />
        ) : (
          <PiPlus className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {isExpanded && (
        <div className="px-4 pb-4 border-t">
          {children}
        </div>
      )}
    </div>
  );
}

// With custom styling
export function CustomMinusIcon() {
  return (
    <PiMinus 
      className="w-6 h-6 text-red-500 hover:text-red-700 transition-colors"
      strokeWidth={2}
    />
  );
}
```

## Functionality
- **SVG Rendering**: Renders a clean, geometric minus symbol using SVG paths
- **Scalable Design**: Vector-based icon that scales perfectly at any size
- **Current Color**: Uses `fill="currentColor"` to inherit text color from parent elements
- **Flexible Styling**: Accepts all standard SVG props for complete customization
- **Consistent Viewbox**: 24x24 viewBox provides consistent proportions across icon sets

## State Management
**No State Management** - This is a stateless presentational component that doesn't manage any internal state or require external state management solutions like TanStack Query or Zustand.

## Side Effects
**No Side Effects** - The component performs no side effects, API calls, or external interactions. It's a pure function that renders SVG markup based on props.

## Dependencies
- **React**: Uses `SVGProps` type from React for prop typing
- **No External Dependencies**: Self-contained component with no additional dependencies

## Integration
- **Icon System**: Part of the Phosphor Icons collection in `/components/icons/pi/`
- **UI Components**: Commonly used within Button, IconButton, and other interactive components
- **Design System**: Integrates with Tailwind CSS classes for consistent sizing and styling
- **Accessibility**: Can be enhanced with `aria-label` or wrapped in accessible button components
- **Theming**: Automatically adapts to color schemes through `currentColor` inheritance

## Best Practices

### ✅ Follows Our Architecture Guidelines
- **Flat Component Structure**: Simple, single-purpose icon component without unnecessary nesting
- **Server-First**: Properly implemented as a Server Component without client-side dependencies
- **Reusable Design**: Generic icon component that can be composed into larger features
- **Type Safety**: Properly typed with TypeScript using React's built-in SVG prop types

### ✅ Recommended Usage Patterns
```tsx
// Good: Semantic sizing with Tailwind
<PiMinus className="w-4 h-4" />

// Good: Accessible button with icon
<Button aria-label="Remove item">
  <PiMinus className="w-4 h-4" />
</Button>

// Good: Color inheritance
<div className="text-red-500">
  <PiMinus className="w-5 h-5" /> {/* Will be red */}
</div>
```

### ❌ Anti-patterns to Avoid
```tsx
// Avoid: Hardcoded sizes
<PiMinus width={16} height={16} />

// Avoid: Inline styles when Tailwind classes exist
<PiMinus style={{ width: '16px', height: '16px' }} />

// Avoid: Missing accessibility context
<button><PiMinus /></button> // No label or context
```

### 🎯 Integration Best Practices
- **Consistent Sizing**: Use Tailwind size classes (`w-4 h-4`, `w-5 h-5`) for consistency
- **Semantic Context**: Always provide meaningful context when used in interactive elements
- **Color Theming**: Leverage `currentColor` behavior with text color classes
- **Composition**: Combine with other UI components rather than building custom wrappers