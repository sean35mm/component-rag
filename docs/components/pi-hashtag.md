# PiHashtag Component

## Purpose

The `PiHashtag` component renders a hashtag (#) icon as an SVG element. This icon component is part of the Pi icon library and is commonly used to represent tags, social media hashtags, or categorical labeling throughout the application interface.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup. It has no client-side interactivity, state management, or browser-specific APIs, making it suitable as a server component by default.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | - | All standard SVG element props including `className`, `style`, `onClick`, `aria-*` attributes, etc. |

**Common SVG Props:**
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role
- `width`/`height` - Override default 1em sizing

## Usage Example

```tsx
import { PiHashtag } from '@/components/icons/pi/pi-hashtag';

// Basic usage
export function TagButton() {
  return (
    <button className="flex items-center gap-2">
      <PiHashtag className="text-blue-500" />
      Add Tag
    </button>
  );
}

// With custom styling and accessibility
export function SocialMediaPost() {
  return (
    <div className="post-content">
      <p>Check out this amazing content!</p>
      <div className="flex items-center gap-1 mt-2">
        <PiHashtag 
          className="w-4 h-4 text-gray-600" 
          aria-label="Hashtag"
        />
        <span className="text-blue-600">#react</span>
      </div>
    </div>
  );
}

// Interactive usage with event handlers
export function HashtagInput() {
  const handleAddHashtag = () => {
    // Add hashtag logic
  };

  return (
    <button 
      onClick={handleAddHashtag}
      className="p-2 hover:bg-gray-100 rounded"
    >
      <PiHashtag 
        className="w-5 h-5 text-gray-700 hover:text-blue-600"
        aria-label="Add hashtag"
      />
    </button>
  );
}
```

## Functionality

- **SVG Rendering**: Renders a scalable hashtag icon using SVG paths
- **Responsive Sizing**: Uses `1em` dimensions by default, scaling with parent font size
- **Color Inheritance**: Uses `currentColor` fill, inheriting text color from parent
- **Prop Forwarding**: Accepts and forwards all standard SVG element properties
- **Accessibility Ready**: Supports ARIA attributes for screen readers

## State Management

**No State Management** - This is a stateless presentational component that doesn't require any state management solutions. It simply renders SVG markup based on the props passed to it.

## Side Effects

**No Side Effects** - This component has no side effects, API calls, or external interactions. It's a pure function that returns JSX based on its props.

## Dependencies

- **React**: Uses `SVGProps` type from React
- **No External Dependencies**: Self-contained component with no additional dependencies

## Integration

The `PiHashtag` component integrates into the application architecture as:

- **UI Component**: Part of the icon system in `/components/icons/pi/`
- **Design System**: Follows consistent sizing and color patterns with other Pi icons
- **Reusable Asset**: Can be imported and used across any feature domain
- **Server-First**: Renders on the server, reducing client-side JavaScript bundle

**Common Integration Patterns:**
```tsx
// In tag management features
import { PiHashtag } from '@/components/icons/pi/pi-hashtag';

// In navigation or UI components
import { PiHashtag } from '@/components/icons/pi/pi-hashtag';

// In social media or content features
import { PiHashtag } from '@/components/icons/pi/pi-hashtag';
```

## Best Practices

### ✅ Follows Architecture Guidelines

- **Server Component**: Uses server component by default for static content
- **Flat Structure**: Single-purpose icon component without unnecessary nesting
- **Reusable Design**: Located in `/icons/pi/` for cross-domain usage
- **Type Safety**: Properly typed with TypeScript using React's SVGProps

### ✅ Recommended Usage Patterns

```tsx
// Good: Semantic usage with proper accessibility
<PiHashtag aria-label="Add hashtag" className="text-blue-500" />

// Good: Consistent sizing using Tailwind classes
<PiHashtag className="w-4 h-4 text-gray-600" />

// Good: Using with interactive elements
<button onClick={handleClick}>
  <PiHashtag className="mr-2" />
  Add Tag
</button>
```

### ❌ Anti-patterns to Avoid

```tsx
// Avoid: Redundant wrapper divs
<div><PiHashtag /></div>

// Avoid: Inline styles when CSS classes are available
<PiHashtag style={{color: 'blue', width: '16px'}} />

// Avoid: Missing accessibility labels for interactive icons
<button><PiHashtag /></button> // Should include aria-label
```