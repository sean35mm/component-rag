# PiSubtractLine Component

## Purpose
`PiSubtractLine` is a reusable SVG icon component that renders a minus/subtract symbol. It's part of the Phosphor Icons (Pi) library integration and provides a consistent, scalable icon for subtract operations, form controls, or any UI element requiring a minus symbol.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG content with no client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and doesn't require the 'use client' directive.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including `className`, `style`, `onClick`, `onMouseOver`, etc. |

### Common SVG Props
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `width` | `string \| number` | Override default width (default: '1em') |
| `height` | `string \| number` | Override default height (default: '1em') |
| `fill` | `string` | Override fill color (default: 'currentColor') |

## Usage Example

```tsx
import { PiSubtractLine } from '@/components/icons/pi/pi-subtract-line';

// Basic usage
export function QuantityCounter() {
  return (
    <div className="flex items-center gap-2">
      <button className="p-2 hover:bg-gray-100 rounded">
        <PiSubtractLine className="w-4 h-4 text-gray-600" />
      </button>
      <span>5</span>
      <button className="p-2 hover:bg-gray-100 rounded">
        <PiPlusLine className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  );
}

// With custom styling
export function RemoveButton() {
  return (
    <button 
      className="inline-flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50"
      onClick={() => handleRemove()}
    >
      <PiSubtractLine className="w-4 h-4" />
      Remove Item
    </button>
  );
}

// As form control
export function CollapsibleSection({ title, isExpanded, onToggle }) {
  return (
    <button 
      onClick={onToggle}
      className="flex items-center justify-between w-full p-4"
    >
      <span>{title}</span>
      {isExpanded ? (
        <PiSubtractLine className="w-5 h-5 text-gray-500" />
      ) : (
        <PiPlusLine className="w-5 h-5 text-gray-500" />
      )}
    </button>
  );
}
```

## Functionality
- **Scalable Vector Icon**: Renders as crisp SVG at any size
- **Responsive Sizing**: Uses '1em' dimensions to scale with font size
- **Color Inheritance**: Uses 'currentColor' to inherit text color from parent
- **Accessibility Ready**: Accepts ARIA attributes and event handlers
- **Customizable**: All SVG props can be overridden for specific use cases

## State Management
**None** - This is a stateless presentational component. Any state management occurs in parent components that use this icon.

## Side Effects
**None** - Pure component with no side effects, API calls, or external interactions.

## Dependencies
- **React**: Uses `SVGProps` type from React
- **No external dependencies**: Self-contained SVG component

## Integration
This component follows our **flat component architecture** patterns:

- **Icon Library Structure**: Part of the organized `/icons/pi/` directory structure
- **Reusable UI Component**: Can be used across any feature domain
- **Composable**: Designed to be composed with buttons, forms, and other UI elements
- **Consistent API**: Follows the same pattern as other icon components in the library

### Integration Examples:
```tsx
// In form components
import { PiSubtractLine } from '@/components/icons/pi/pi-subtract-line';

// In feature components
import { PiSubtractLine } from '@/components/icons/pi/pi-subtract-line';

// Bulk import (if using barrel exports)
import { PiSubtractLine, PiPlusLine } from '@/components/icons/pi';
```

## Best Practices

### ✅ Following Architecture Guidelines
- **Server Component**: Correctly implemented as server component (no client-side state)
- **Prop Spreading**: Uses `{...props}` for maximum flexibility
- **Type Safety**: Properly typed with `SVGProps<SVGSVGElement>`
- **Reusability**: Generic icon component usable across domains

### ✅ Recommended Usage Patterns
```tsx
// Good: Semantic sizing with Tailwind
<PiSubtractLine className="w-4 h-4" />

// Good: Color inheritance
<div className="text-red-500">
  <PiSubtractLine /> {/* Will be red */}
</div>

// Good: Event handling
<PiSubtractLine 
  onClick={handleClick}
  className="cursor-pointer hover:text-blue-500"
/>

// Good: Accessibility
<PiSubtractLine 
  role="img" 
  aria-label="Remove item"
  className="w-4 h-4"
/>
```

### ❌ Anti-patterns to Avoid
```tsx
// Avoid: Hardcoded dimensions that don't scale
<PiSubtractLine width="16" height="16" />

// Avoid: Overriding viewBox (breaks icon design)
<PiSubtractLine viewBox="0 0 12 12" />

// Avoid: Complex logic in icon component
// Keep icons simple and move logic to parent components
```

This component exemplifies our **Lego block** philosophy - a simple, focused, reusable piece that can be composed into larger UI patterns while maintaining consistency and type safety.