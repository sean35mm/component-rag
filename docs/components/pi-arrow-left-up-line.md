# PiArrowLeftUpLine Icon Component

## Purpose

The `PiArrowLeftUpLine` component renders an SVG icon depicting an arrow pointing diagonally to the upper-left direction with a line. This icon is part of the Phosphor Icons collection and is commonly used for navigation actions like "back and up", "previous page", "return to parent", or indicating directional movement in UI interfaces.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and doesn't require the `'use client'` directive.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | - | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

### Inherited SVG Props
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role |
| `width` | `string \| number` | Override default width (1em) |
| `height` | `string \| number` | Override default height (1em) |

## Usage Example

```tsx
import { PiArrowLeftUpLine } from '@/components/icons/pi/pi-arrow-left-up-line';

// Basic usage
export function NavigationButton() {
  return (
    <button className="flex items-center gap-2">
      <PiArrowLeftUpLine />
      Back to Parent
    </button>
  );
}

// With custom styling
export function StyledBackButton() {
  return (
    <PiArrowLeftUpLine 
      className="w-6 h-6 text-blue-500 hover:text-blue-700"
      aria-label="Return to previous level"
    />
  );
}

// As clickable icon
export function InteractiveIcon() {
  const handleNavigation = () => {
    // Navigation logic
  };

  return (
    <PiArrowLeftUpLine 
      onClick={handleNavigation}
      className="cursor-pointer w-5 h-5"
      role="button"
      aria-label="Navigate back and up"
    />
  );
}

// In breadcrumb navigation
export function BreadcrumbSeparator() {
  return (
    <div className="flex items-center">
      <span>Current Page</span>
      <PiArrowLeftUpLine className="mx-2 w-4 h-4 text-gray-400" />
      <span>Parent Section</span>
    </div>
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisp at any size using SVG format
- **Responsive Sizing**: Uses `1em` dimensions to scale with font size
- **Color Inheritance**: Uses `currentColor` fill to inherit text color
- **Accessibility Ready**: Accepts all ARIA attributes for screen readers
- **Flexible Styling**: Supports all standard SVG props for customization

### Visual Design
- **24x24 viewBox**: Standard icon dimensions for consistent sizing
- **Dual Path Design**: Combines arrow shape with directional line
- **Clean Line Art**: Outlined style suitable for modern UI designs
- **Fill Rule**: Uses `evenOdd` for proper shape rendering

## State Management

**No State Management Required** - This is a stateless presentational component that doesn't manage any internal state, server state, or client state. It simply renders SVG markup based on the provided props.

## Side Effects

**No Side Effects** - The component has no side effects, API calls, or external interactions. It's a pure function that takes props and returns JSX.

## Dependencies

### Direct Dependencies
- `react` - For `SVGProps` type definition

### Related Components
- Other Phosphor Icons in `/components/icons/pi/` directory
- UI components that use this icon (buttons, navigation, etc.)

### Integration Points
- Navigation components
- Button components
- Breadcrumb components
- Toolbar components

## Integration

### Application Architecture Fit
```
src/
├── components/
│   ├── icons/
│   │   └── pi/
│   │       └── pi-arrow-left-up-line.tsx  ← This component
│   ├── ui/
│   │   ├── button.tsx                     ← May use this icon
│   │   └── breadcrumb.tsx                 ← May use this icon
│   └── features/
│       └── navigation/
│           └── back-button.tsx            ← May consume this icon
```

### Usage Patterns
- **Icon Libraries**: Part of the centralized icon system
- **Design System**: Consistent iconography across the application
- **Composition**: Used within larger UI components
- **Theming**: Inherits colors from design system tokens

## Best Practices

### Architecture Adherence
✅ **Server Component**: Correctly implemented as server component  
✅ **Single Responsibility**: Focused solely on rendering one specific icon  
✅ **Reusability**: Generic implementation usable across features  
✅ **Type Safety**: Properly typed with TypeScript  

### Implementation Guidelines
- **Accessibility**: Always provide `aria-label` for interactive usage
- **Semantic HTML**: Use appropriate parent elements (button, link, etc.)
- **Performance**: Lightweight SVG with optimized paths
- **Consistency**: Follows Phosphor Icons naming and structure conventions

### Usage Recommendations
```tsx
// ✅ Good: Semantic usage with accessibility
<button aria-label="Back to parent directory">
  <PiArrowLeftUpLine />
</button>

// ✅ Good: Styled with Tailwind classes
<PiArrowLeftUpLine className="w-4 h-4 text-muted-foreground" />

// ❌ Avoid: Missing accessibility context
<PiArrowLeftUpLine onClick={handleClick} />

// ❌ Avoid: Overriding viewBox (breaks icon proportions)
<PiArrowLeftUpLine viewBox="0 0 20 20" />
```