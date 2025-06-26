# Separator Component

## Purpose

The Separator component provides a visual divider element that helps organize content and create clear sections within a layout. It's built on top of Radix UI's Separator primitive and offers both horizontal and vertical orientations for flexible use in various UI contexts.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `orientation` | `"horizontal" \| "vertical"` | No | `"horizontal"` | Sets the orientation of the separator line |
| `decorative` | `boolean` | No | `true` | When true, the separator is purely decorative and ignored by screen readers |
| `className` | `string` | No | `undefined` | Additional CSS classes for custom styling |
| `...props` | `React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>` | No | - | All other props from Radix Separator Root |

## Usage Example

```tsx
import { Separator } from '@/components/ui/separator';

function ContentSection() {
  return (
    <div className="p-6 space-y-4">
      {/* Basic horizontal separator */}
      <div className="typography-titleH3 text-pgText-900">Section Title</div>
      <Separator />
      <p className="typography-paragraphMedium text-pgText-700">
        Content goes here...
      </p>

      {/* Custom styled separator */}
      <Separator className="bg-pgBlue-500 h-[2px]" />

      {/* Vertical separator in flex layout */}
      <div className="flex items-center gap-4">
        <span className="typography-labelMedium text-pgText-800">Option 1</span>
        <Separator orientation="vertical" className="h-6" />
        <span className="typography-labelMedium text-pgText-800">Option 2</span>
        <Separator orientation="vertical" className="h-6" />
        <span className="typography-labelMedium text-pgText-800">Option 3</span>
      </div>

      {/* Semantic separator for screen readers */}
      <Separator decorative={false} />
    </div>
  );
}
```

## Design System Usage

### Colors
- **Default**: `bg-pgStroke-250` - Provides subtle visual separation
- **Custom Options**: Can be overridden with any pgStroke, pgNeutral, or brand color variants

### Typography Integration
The Separator works seamlessly with our typography system to create proper content hierarchy:
- Use with `.typography-titleH*` classes for section divisions
- Pair with `.typography-paragraphMedium` for content separation
- Complement `.typography-labelMedium` in navigation contexts

### Spacing
- **Horizontal**: `h-[1px] w-full` by default
- **Vertical**: `h-full w-[1px]` by default
- Integrates with Tailwind spacing utilities (`space-y-*`, `gap-*`)

## Variants

The component doesn't use CVA but offers built-in orientation variants:

### Orientation Variants
```tsx
// Horizontal (default)
<Separator orientation="horizontal" />

// Vertical
<Separator orientation="vertical" />
```

### Custom Styling Variants
```tsx
// Thick separator
<Separator className="h-[2px]" />

// Colored separators
<Separator className="bg-pgBlue-500" />
<Separator className="bg-pgGreen-400" />
<Separator className="bg-pgStroke-400" />

// Dashed style
<Separator className="border-t border-dashed border-pgStroke-300 bg-transparent h-0" />
```

## Styling

### Available Customizations

```tsx
// Thickness variations
<Separator className="h-[1px]" />    // Thin (default)
<Separator className="h-[2px]" />    // Medium
<Separator className="h-[3px]" />    // Thick

// Color variations using design system
<Separator className="bg-pgStroke-200" />   // Light
<Separator className="bg-pgStroke-250" />   // Default
<Separator className="bg-pgStroke-400" />   // Medium
<Separator className="bg-pgStroke-600" />   // Dark

// Brand colors
<Separator className="bg-pgBlue-500" />
<Separator className="bg-pgGreen-500" />
<Separator className="bg-pgRed-500" />

// Opacity variations
<Separator className="bg-pgStroke-250/50" />
```

### Dark Mode Support
The component automatically adapts to dark mode through CSS variables:
```tsx
// Automatically adjusts in dark mode
<Separator className="bg-pgStroke-250" />

// Manual dark mode override
<Separator className="bg-pgStroke-250 dark:bg-pgStroke-700" />
```

## Responsive Design

### Responsive Thickness
```tsx
<Separator className="h-[1px] md:h-[2px] lg:h-[3px]" />
```

### Responsive Visibility
```tsx
// Hide on mobile, show on desktop
<Separator className="hidden md:block" />

// Different orientations per breakpoint
<div className="flex flex-col md:flex-row">
  <div>Content 1</div>
  <Separator className="md:hidden" />
  <Separator orientation="vertical" className="hidden md:block h-6" />
  <div>Content 2</div>
</div>
```

## Accessibility

### Screen Reader Support
- **Decorative Mode** (`decorative={true}`): Hidden from assistive technology
- **Semantic Mode** (`decorative={false}`): Announced as a separator element

### ARIA Attributes
```tsx
// Decorative separator (default)
<Separator decorative={true} /> // role="none"

// Semantic separator
<Separator decorative={false} /> // role="separator"
```

### Best Practices
- Use `decorative={true}` for purely visual separators
- Use `decorative={false}` when the separator provides meaningful content structure
- Ensure sufficient color contrast (pgStroke-250 meets WCAG AA standards)

## Dependencies

### Internal Dependencies
- `@/lib/utils/cn` - Utility for conditional class merging

### External Dependencies
- `@radix-ui/react-separator` - Base primitive component
- React (forwardRef support)

### Related Components
Works well with:
- Layout components (Card, Container)
- Navigation components (Menu, Tabs)
- Typography components
- Content sections

## Customization

### Extending with className
```tsx
// Custom border styles
<Separator className="border-t-2 border-dotted border-pgBlue-300 bg-transparent h-0" />

// Gradient separator
<Separator className="bg-gradient-to-r from-pgBlue-500 to-pgGreen-500 h-[2px]" />

// Rounded edges
<Separator className="rounded-full h-[3px] bg-pgStroke-400" />

// Custom spacing
<Separator className="my-8 mx-4" />

// Animation on hover
<Separator className="transition-all duration-300 hover:bg-pgBlue-500 hover:h-[2px]" />
```

### Advanced Customization
```tsx
// Component composition
function CustomSeparator({ variant = "default", ...props }) {
  const variants = {
    default: "bg-pgStroke-250 h-[1px]",
    thick: "bg-pgStroke-400 h-[3px]",
    brand: "bg-pgBlue-500 h-[2px]",
    dashed: "border-t border-dashed border-pgStroke-300 bg-transparent h-0"
  };
  
  return <Separator className={variants[variant]} {...props} />;
}
```