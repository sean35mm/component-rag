# PiRedditFill Icon Component

## Purpose
The `PiRedditFill` component renders a filled Reddit logo icon as an SVG element. This icon is part of the application's visual iconography system and provides a recognizable Reddit brand symbol for UI elements such as social media links, share buttons, or platform indicators.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup. It contains no client-side interactivity, state management, or browser-specific APIs, making it suitable for server-side rendering and optimal for performance.

## Props Interface

| Prop Name | Type | Required | Description |
|-----------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Props are spread to the root SVG element |

## Usage Example

```tsx
import { PiRedditFill } from '@/components/icons/pi/pi-reddit-fill';

// Basic usage
export function SocialLinks() {
  return (
    <div className="flex gap-4">
      <a href="https://reddit.com/r/yoursubreddit" aria-label="Visit our Reddit">
        <PiRedditFill className="w-6 h-6 text-orange-500 hover:text-orange-600" />
      </a>
    </div>
  );
}

// As a share button
export function ShareButton() {
  const handleRedditShare = () => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://reddit.com/submit?url=${url}&title=${title}`);
  };

  return (
    <button 
      onClick={handleRedditShare}
      className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
    >
      <PiRedditFill className="w-5 h-5" />
      Share on Reddit
    </button>
  );
}

// With custom styling and accessibility
export function PlatformIndicator() {
  return (
    <div className="flex items-center gap-2">
      <PiRedditFill 
        className="w-4 h-4 text-gray-600" 
        aria-hidden="true"
      />
      <span>Discussed on Reddit</span>
    </div>
  );
}
```

## Functionality
- **SVG Rendering**: Renders a filled Reddit logo as a scalable vector graphic
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent
- **Accessibility Ready**: Accepts ARIA attributes for proper accessibility labeling
- **Style Customization**: Supports all standard SVG styling through props and CSS classes

## State Management
**No State Management** - This is a stateless presentational component that renders static SVG markup based on props. No TanStack Query, Zustand, or local state is required.

## Side Effects
**No Side Effects** - The component performs no API calls, DOM manipulation, or other side effects. It is a pure rendering component.

## Dependencies
- **React**: `SVGProps` type import for proper TypeScript prop typing
- **No External Dependencies**: Self-contained component with no additional dependencies

## Integration
This icon component integrates into the application's design system as part of the iconography layer:

- **Icon System**: Part of the `/components/icons/pi/` collection following the Phosphor Icons naming convention
- **Design Tokens**: Works with the application's color system through `currentColor` and CSS classes
- **Component Composition**: Can be composed within buttons, links, navigation items, and other interactive elements
- **Theme Integration**: Responds to theme changes through inherited colors and CSS custom properties

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: Correctly implemented as a server component for optimal performance
- ✅ **Component Decomposition**: Simple, focused component that does one thing well
- ✅ **Reusability**: Placed in `/components/icons/` for reuse across features
- ✅ **Flat Structure**: No unnecessary nesting or complexity

### Usage Recommendations
```tsx
// ✅ Good: Semantic usage with proper accessibility
<a href="/reddit" aria-label="Visit our Reddit community">
  <PiRedditFill className="w-6 h-6 text-orange-500" />
</a>

// ✅ Good: Consistent sizing with design system
<PiRedditFill className="w-4 h-4" /> // Small
<PiRedditFill className="w-6 h-6" /> // Medium  
<PiRedditFill className="w-8 h-8" /> // Large

// ❌ Avoid: Inline styles when CSS classes are available
<PiRedditFill style={{ width: '24px', height: '24px' }} />

// ✅ Good: Proper color theming
<PiRedditFill className="text-orange-500 dark:text-orange-400" />
```

### Performance Considerations
- Component is optimized for server-side rendering
- SVG is inlined for optimal loading performance
- No runtime JavaScript required for basic rendering
- Scales efficiently at any size without pixelation