# ShiningStars Icon Component

## Purpose

The `ShiningStars` component is a decorative SVG icon that renders two stylized stars with a sparkling effect. This icon is commonly used to indicate premium features, achievements, highlights, or to add visual emphasis to important content. It provides a consistent and scalable way to display star graphics throughout the application.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup. It has no interactivity, state, or browser-specific APIs, making it ideal for server-side rendering and optimal performance.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | - | All standard SVG element props including `className`, `style`, `onClick`, `width`, `height`, etc. |

### Common SVG Props
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `width` | `string \| number` | Override default width (16px) |
| `height` | `string \| number` | Override default height (16px) |
| `fill` | `string` | Override the default fill color |
| `onClick` | `MouseEventHandler` | Click event handler |

## Usage Example

```tsx
import { ShiningStars } from '@/components/icons/shining-stars';

// Basic usage
<ShiningStars />

// With custom styling
<ShiningStars 
  className="text-yellow-500" 
  width={24} 
  height={24} 
/>

// As part of a premium feature indicator
<div className="flex items-center gap-2">
  <ShiningStars className="text-amber-400" />
  <span className="font-semibold">Premium Feature</span>
</div>

// With click handler for interactive elements
<button 
  className="flex items-center gap-1 p-2 rounded hover:bg-gray-100"
  onClick={handleStarClick}
>
  <ShiningStars width={20} height={20} />
  <span>Add to Favorites</span>
</button>

// In a card header to indicate featured content
<div className="card-header">
  <div className="flex items-center justify-between">
    <h3>Featured Article</h3>
    <ShiningStars className="text-blue-600" />
  </div>
</div>
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisp at any size without pixelation
- **Customizable Styling**: Accepts all standard SVG props for flexible styling
- **Consistent Design**: Maintains visual consistency across the application
- **Accessibility Ready**: Can be enhanced with ARIA labels when needed
- **Performance Optimized**: Lightweight SVG with minimal markup

### Visual Design
- Two stars of different sizes creating a sparkling effect
- Default blue color scheme (`#227C9D`)
- 16x16px default dimensions
- Clean, modern star design with pointed rays

## State Management

**No State Management** - This is a stateless presentational component that doesn't require any state management. It simply renders SVG markup based on the props passed to it.

## Side Effects

**No Side Effects** - The component has no side effects, API calls, or external interactions. It's a pure function that returns JSX based on its props.

## Dependencies

### External Dependencies
- `react` - For `SVGProps` type definition

### Internal Dependencies
- None - This is a standalone icon component

## Integration

### Application Architecture Role
- **Icon System**: Part of the centralized icon system in `/components/icons/`
- **Design System**: Contributes to the visual design language
- **Reusability**: Can be used across any feature domain
- **Theming**: Integrates with CSS-in-JS or Tailwind for consistent theming

### Common Integration Patterns

```tsx
// In feature cards
const FeatureCard = ({ feature, isPremium }) => (
  <div className="card">
    <div className="card-header">
      <h3>{feature.title}</h3>
      {isPremium && <ShiningStars />}
    </div>
  </div>
);

// In navigation menus
const MenuItem = ({ item }) => (
  <a href={item.href} className="menu-item">
    {item.icon}
    <span>{item.label}</span>
    {item.isNew && <ShiningStars className="ml-auto" width={12} height={12} />}
  </a>
);

// In status indicators
const StatusBadge = ({ status }) => (
  <div className={`badge badge-${status}`}>
    {status === 'featured' && <ShiningStars width={14} height={14} />}
    <span>{status}</span>
  </div>
);
```

## Best Practices

### Architectural Adherence
✅ **Server Component**: Correctly implemented as a server component
✅ **Component Decomposition**: Simple, single-purpose component
✅ **Reusability**: Placed in shared `/icons/` directory
✅ **Performance**: Lightweight with no unnecessary complexity

### Usage Recommendations

```tsx
// ✅ Good: Semantic usage with proper accessibility
<button aria-label="Mark as favorite">
  <ShiningStars />
</button>

// ✅ Good: Consistent sizing with design system
<ShiningStars className="w-4 h-4 text-amber-500" />

// ✅ Good: Conditional rendering for premium features
{isPremium && <ShiningStars />}

// ❌ Avoid: Overusing for non-premium/non-special content
<p>Regular text <ShiningStars /> with unnecessary stars</p>

// ❌ Avoid: Inconsistent sizing without design system values
<ShiningStars width="13.5px" height="17.2px" />
```

### Accessibility Considerations
- Add `aria-hidden="true"` for purely decorative usage
- Include `aria-label` or `title` when the icon conveys meaning
- Ensure sufficient color contrast when customizing colors
- Consider screen reader context when used in interactive elements