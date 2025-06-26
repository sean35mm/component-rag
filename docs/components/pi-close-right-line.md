# PiCloseRightLine Icon Component

## Purpose

The `PiCloseRightLine` component is an SVG icon that represents a "close right" action, featuring both a close (X) symbol and a right-pointing arrow. This icon is typically used in UI elements like dialogs, panels, or navigation components where users need to close or dismiss content while indicating a directional action to the right.

## Component Type

**Server Component** - This is a purely presentational SVG icon component with no client-side interactivity, state management, or browser APIs. It can be rendered on the server and doesn't require the 'use client' directive.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Spread to the root `<svg>` element |

### Extended SVG Props (via spread)
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role |

## Usage Example

```tsx
import { PiCloseRightLine } from '@/components/icons/pi/pi-close-right-line';

// Basic usage
export default function DialogHeader() {
  return (
    <div className="flex items-center justify-between">
      <h2>Settings Panel</h2>
      <button 
        type="button"
        className="p-2 hover:bg-gray-100 rounded"
        aria-label="Close and continue right"
      >
        <PiCloseRightLine className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
}

// With click handler
export default function NavigationStep() {
  const handleCloseAndNext = () => {
    // Close current step and move to next
    closeCurrentStep();
    navigateToNext();
  };

  return (
    <button 
      onClick={handleCloseAndNext}
      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded"
    >
      Skip Step
      <PiCloseRightLine className="w-4 h-4" />
    </button>
  );
}

// Custom styling
export default function CustomStyledIcon() {
  return (
    <PiCloseRightLine 
      className="w-6 h-6 text-red-500 hover:text-red-700 transition-colors"
      style={{ opacity: 0.9 }}
    />
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Uses `1em` sizing for responsive scaling with font size
- **Current Color Fill**: Inherits text color from parent elements via `fill="currentColor"`
- **Semantic Design**: Combines close (X) and right arrow symbols to indicate dismissal with forward progression
- **Accessibility Ready**: Accepts all ARIA attributes for screen reader compatibility
- **Flexible Styling**: Supports all standard SVG props for customization

### Visual Elements
- **Close Symbol**: X-shaped icon in the upper left area
- **Right Arrow**: Directional arrow pointing right
- **Horizontal Line**: Connecting element suggesting flow or progression
- **Opacity Layer**: Wrapped in group with 0.8 opacity for subtle appearance

## State Management

**None** - This is a stateless presentational component. Any state management should be handled by parent components that use this icon.

## Side Effects

**None** - Pure presentational component with no side effects, API calls, or external interactions.

## Dependencies

### Internal Dependencies
- `React` - Uses `SVGProps` type from React
- No other internal component dependencies

### External Dependencies
- None - Standalone SVG icon component

## Integration

### Application Architecture Integration
- **UI Component Layer**: Part of the icon system in `/components/icons/pi/`
- **Design System**: Follows consistent sizing (`1em`) and color (`currentColor`) patterns
- **Accessibility**: Integrates with application accessibility standards through ARIA props
- **Theming**: Adapts to design system colors through `currentColor`

### Common Integration Patterns
```tsx
// In button components
<Button variant="ghost" size="sm">
  <PiCloseRightLine />
</Button>

// In dialog components
<DialogClose asChild>
  <button aria-label="Close dialog">
    <PiCloseRightLine />
  </button>
</DialogClose>

// In navigation components
<nav>
  <button onClick={handleSkipToNext}>
    Skip <PiCloseRightLine className="ml-1" />
  </button>
</nav>
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: Correctly implemented as server component (no client-side features)
- ✅ **Flat Structure**: Simple, non-nested component design
- ✅ **Reusable**: Generic icon component usable across domains
- ✅ **Prop Spreading**: Uses TypeScript props spreading for flexibility

### Usage Recommendations
- **Accessibility**: Always provide `aria-label` when used in interactive elements
- **Sizing**: Use Tailwind classes or CSS for consistent sizing (`w-4 h-4`, `w-5 h-5`, etc.)
- **Color**: Leverage `currentColor` by setting text color on parent elements
- **Interactive Use**: Wrap in `<button>` elements for clickable actions
- **Context**: Use when the action involves both closing/dismissing and forward progression

### Performance Considerations
- **Server-side Rendering**: Renders on server, reducing client bundle size
- **No Runtime Overhead**: Pure SVG with no JavaScript execution
- **Caching**: Can be cached effectively as static content