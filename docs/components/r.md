# R Icon Component

## Purpose

The `R` component is an SVG icon component that renders the letter "R" in a consistent, scalable format. This component is part of the icon system and provides a reusable way to display the R letter icon throughout the application with proper styling inheritance and accessibility.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGAttributes<SVGElement>` | Optional | `{}` | All standard SVG element attributes including `className`, `style`, `onClick`, `aria-label`, etc. |

**Inherited SVG Attributes Include:**
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role
- `width` / `height` - Override default dimensions
- `fill` / `stroke` - Override color properties

## Usage Example

```tsx
import { R } from '@/components/icons/r';

// Basic usage
export function UserProfile() {
  return (
    <div>
      <R />
      <span>Rating</span>
    </div>
  );
}

// With custom styling
export function NavigationItem() {
  return (
    <button className="flex items-center gap-2">
      <R className="text-blue-500 hover:text-blue-600" />
      Reviews
    </button>
  );
}

// With accessibility
export function AccessibleIcon() {
  return (
    <R 
      aria-label="Rating indicator"
      className="w-6 h-6 text-yellow-500"
    />
  );
}

// With event handling (makes it a Client Component)
'use client';
export function InteractiveIcon() {
  return (
    <R 
      onClick={() => console.log('R icon clicked')}
      className="cursor-pointer hover:scale-110 transition-transform"
      role="button"
      tabIndex={0}
    />
  );
}
```

## Functionality

### Core Features
- **Scalable Vector Graphics**: Renders crisp at any size using SVG format
- **Color Inheritance**: Uses `currentColor` for fill and stroke, inheriting text color from parent
- **Responsive Sizing**: Default `1em` dimensions scale with font size
- **Accessibility Ready**: Accepts ARIA attributes for screen readers
- **Style Flexibility**: Supports all standard SVG styling and CSS classes

### Visual Characteristics
- **Dimensions**: 1em × 1em (scales with font size)
- **ViewBox**: 0 0 18 18 (internal coordinate system)
- **Color**: Inherits from `currentColor` (parent text color)
- **Stroke**: Uses currentColor with strokeWidth of 0

## State Management

**No State Management Required** - This is a pure presentational component that doesn't manage any internal state. All styling and behavior is controlled through props.

## Side Effects

**No Side Effects** - This component performs no API calls, side effects, or external interactions. It's a pure function that renders SVG markup based on props.

## Dependencies

### Internal Dependencies
- `React` - Core React library for JSX and component functionality
- `SVGAttributes` type from React for proper TypeScript support

### External Dependencies
- None - This component has no external dependencies beyond React

## Integration

### Icon System Integration
```tsx
// Commonly used with other icons
import { R } from '@/components/icons/r';
import { Star } from '@/components/icons/star';

export function RatingSection() {
  return (
    <div className="flex items-center gap-1">
      <R className="text-primary" />
      <Star className="text-yellow-500" />
      <span>4.5 Rating</span>
    </div>
  );
}
```

### UI Component Integration
```tsx
// Integration with button components
import { Button } from '@/components/ui/button';
import { R } from '@/components/icons/r';

export function RatingButton() {
  return (
    <Button variant="outline" className="gap-2">
      <R className="w-4 h-4" />
      Rate Item
    </Button>
  );
}
```

## Best Practices

### ✅ Architecture Adherence
- **Server-First**: Correctly implemented as Server Component for static SVG content
- **Flat Component Structure**: Simple, single-purpose component without unnecessary nesting
- **Reusable Design**: Generic icon component that can be used across different domains
- **Prop Spreading**: Properly spreads SVG attributes for maximum flexibility

### ✅ Usage Recommendations
```tsx
// Good: Semantic usage with proper labeling
<R aria-label="Rating" className="text-yellow-500" />

// Good: Consistent sizing with design system
<R className="w-4 h-4" /> // Small
<R className="w-6 h-6" /> // Medium  
<R className="w-8 h-8" /> // Large

// Good: Color inheritance
<div className="text-primary">
  <R /> {/* Inherits primary color */}
</div>
```

### ⚠️ Considerations
- Add `aria-label` when icon stands alone without accompanying text
- Use consistent sizing classes across the application
- Consider wrapping in Client Component only when interactivity is needed
- Ensure sufficient color contrast for accessibility compliance

### 🔧 Customization Patterns
```tsx
// Custom styled variant
const RatingIcon = (props: SVGAttributes<SVGElement>) => (
  <R 
    className="w-5 h-5 text-yellow-500 drop-shadow-sm" 
    {...props} 
  />
);

// With animation
<R className="animate-pulse text-blue-500" />
```