# ShiningFill Icon Component

## Purpose
The `ShiningFill` component renders a filled star/sparkle SVG icon that represents shining, sparkling, or highlighting content. This icon is typically used to indicate premium features, favorites, achievements, or to add visual emphasis to important UI elements.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, event handlers, or state management. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `color` | `string` | No | `'currentColor'` | Sets the color of the icon. Uses CSS currentColor by default to inherit text color |
| `...props` | `SVGProps<SVGSVGElement>` | No | - | All standard SVG element props (width, height, className, onClick, etc.) |

## Usage Example

```tsx
import { ShiningFill } from '@/components/icons/shining-fill';

// Basic usage with default styling
function PremiumBadge() {
  return (
    <div className="flex items-center gap-2">
      <ShiningFill />
      <span>Premium Feature</span>
    </div>
  );
}

// Custom color and size
function AchievementIcon() {
  return (
    <ShiningFill 
      color="#FFD700" 
      width={24} 
      height={24}
      className="animate-pulse"
    />
  );
}

// Interactive usage with event handlers
function FavoriteButton() {
  return (
    <button 
      onClick={() => console.log('Favorited!')}
      className="p-2 hover:bg-gray-100 rounded"
    >
      <ShiningFill 
        width={20} 
        height={20}
        className="text-yellow-500 hover:text-yellow-600"
      />
    </button>
  );
}

// In a rating or quality indicator
function QualityBadge({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {Array.from({ length: rating }, (_, i) => (
        <ShiningFill key={i} className="text-amber-400" width={16} height={16} />
      ))}
    </div>
  );
}
```

## Functionality
- **SVG Icon Rendering**: Displays a filled star/sparkle shape using SVG path elements
- **Color Customization**: Accepts custom colors while defaulting to `currentColor` for theme consistency
- **Flexible Sizing**: Inherits all SVG props for complete control over dimensions and styling
- **Accessibility Ready**: Can receive ARIA attributes and other accessibility props through prop spreading

## State Management
**None** - This is a stateless presentational component that doesn't require any state management. It simply renders SVG markup based on the provided props.

## Side Effects
**None** - Pure component with no side effects, API calls, or external interactions. It only renders static SVG content.

## Dependencies
- **React**: Uses `SVGProps` type from React for prop typing
- **No external dependencies**: Self-contained icon component

## Integration
This icon component integrates seamlessly into the application's design system:

- **Icon System**: Part of the centralized icon library in `/components/icons/`
- **Theme Integration**: Uses `currentColor` by default to inherit theme colors
- **Component Composition**: Can be easily composed within buttons, badges, lists, and other UI components
- **Styling System**: Works with Tailwind CSS classes and CSS-in-JS solutions
- **Design Consistency**: Maintains consistent 16x16 default size with other system icons

## Best Practices

### ✅ Follows Architecture Guidelines
- **Server Component**: Correctly implemented as a server component since no client-side features are needed
- **Component Decomposition**: Simple, focused component that does one thing well
- **Reusability**: Located in `/components/icons/` for system-wide reuse
- **Type Safety**: Properly typed with TypeScript interfaces

### ✅ Recommended Usage Patterns
```tsx
// Good: Use currentColor for theme consistency
<ShiningFill className="text-primary" />

// Good: Compose with other components
<Badge>
  <ShiningFill width={14} height={14} />
  Premium
</Badge>

// Good: Use semantic HTML when interactive
<button type="button" aria-label="Mark as favorite">
  <ShiningFill />
</button>
```

### ❌ Anti-patterns to Avoid
```tsx
// Avoid: Hardcoding colors that don't match theme
<ShiningFill color="#ff0000" />

// Avoid: Inconsistent sizing across the app
<ShiningFill width={13} height={15} />

// Avoid: Missing accessibility when interactive
<div onClick={handleClick}>
  <ShiningFill />
</div>
```

### Performance Considerations
- **Lightweight**: Minimal SVG markup with no external dependencies
- **Server Rendered**: Can be included in initial HTML payload
- **Reusable**: Single component definition serves all use cases
- **Optimized**: Uses efficient SVG path for crisp rendering at any size