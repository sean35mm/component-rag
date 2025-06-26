# StoryImageWithFallback Component

## Purpose

The `StoryImageWithFallback` component is a specialized image component designed to display story images with automatic fallback handling. It wraps the `ImageWithFallback` component and provides story-specific functionality, including automatic alt text generation from story names and intelligent placeholder image selection based on story IDs.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `story` | `Story` | ✅ | - | Story object containing `id`, `name`, and `imageUrl` properties |
| `className` | `string` | ❌ | - | Additional CSS classes to apply to the image |
| `width` | `number` | ❌ | - | Image width in pixels |
| `height` | `number` | ❌ | - | Image height in pixels |
| `fill` | `boolean` | ❌ | `false` | Whether the image should fill its container |
| `priority` | `boolean` | ❌ | `false` | Whether to prioritize loading this image |
| `loading` | `"lazy" \| "eager"` | ❌ | `"lazy"` | Image loading behavior |
| `onLoad` | `() => void` | ❌ | - | Callback fired when image loads successfully |
| `onError` | `() => void` | ❌ | - | Callback fired when image fails to load |

> **Note**: This component inherits all props from `ImageWithFallbackProps` except `alt`, `src`, `fallback`, and `ref`, which are automatically handled.

## Usage Example

```tsx
import { StoryImageWithFallback } from '@/components/ui/skeletons/story-image-with-fallback';
import { Story } from '@/lib/types';

const story: Story = {
  id: 'story-123',
  name: 'The Adventure Begins',
  imageUrl: 'https://example.com/story-image.jpg'
};

// Basic usage
<StoryImageWithFallback 
  story={story}
  width={400}
  height={300}
  className="rounded-lg shadow-md"
/>

// Card layout with design system tokens
<div className="bg-pgBackground-0 border border-pgStroke-200 rounded-xl p-6 dark:bg-pgBackground-900 dark:border-pgStroke-700">
  <StoryImageWithFallback
    story={story}
    width={320}
    height={240}
    className="w-full h-60 object-cover rounded-lg mb-4"
    priority
  />
  <h3 className="typography-titleH3 text-pgText-900 dark:text-pgText-100 mb-2">
    {story.name}
  </h3>
</div>

// Responsive story grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {stories.map((story) => (
    <div key={story.id} className="bg-pgBackground-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow dark:bg-pgBackground-850">
      <StoryImageWithFallback
        story={story}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <p className="typography-labelMedium text-pgText-700 dark:text-pgText-300">
          {story.name}
        </p>
      </div>
    </div>
  ))}
</div>
```

## Design System Usage

### Typography Classes
- Works well with story titles using `.typography-titleH3`, `.typography-titleH4`
- Story descriptions can use `.typography-paragraphMedium`, `.typography-labelLarge`
- Captions and metadata use `.typography-labelSmall`, `.typography-subheadingXSmall`

### Color Tokens
- **Backgrounds**: `bg-pgBackground-0`, `bg-pgBackground-50`, `bg-pgBackground-900`
- **Borders**: `border-pgStroke-200`, `border-pgStroke-700`
- **Text Colors**: `text-pgText-900`, `text-pgText-700`, `text-pgText-100`
- **State Colors**: `bg-pgStateFaded-light` for loading states

### Common Tailwind Utilities
- **Spacing**: `p-4`, `p-6`, `mb-4`, `gap-6`
- **Sizing**: `w-full`, `h-48`, `h-60`
- **Layout**: `object-cover`, `rounded-lg`, `rounded-xl`
- **Effects**: `shadow-md`, `shadow-lg`, `hover:shadow-lg`

## Styling

### Available Customization Options

```tsx
// Rounded variants
<StoryImageWithFallback story={story} className="rounded-none" />     // Sharp corners
<StoryImageWithFallback story={story} className="rounded-lg" />       // Standard rounded
<StoryImageWithFallback story={story} className="rounded-full" />     // Circular (for square images)

// Shadow variants
<StoryImageWithFallback story={story} className="shadow-sm" />        // Subtle shadow
<StoryImageWithFallback story={story} className="shadow-lg" />        // Prominent shadow
<StoryImageWithFallback story={story} className="shadow-2xl" />       // Dramatic shadow

// Border styles
<StoryImageWithFallback 
  story={story} 
  className="border-2 border-pgStroke-300 dark:border-pgStroke-600" 
/>

// Hover effects
<StoryImageWithFallback 
  story={story} 
  className="hover:scale-105 transition-transform duration-200" 
/>
```

## Responsive Design

The component adapts across breakpoints through responsive classes:

```tsx
// Responsive sizing
<StoryImageWithFallback
  story={story}
  className="
    w-full h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64
    object-cover
  "
/>

// Responsive grid layouts
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6">
  <StoryImageWithFallback story={story} className="w-full aspect-[4/3] object-cover" />
</div>

// Responsive padding and margins
<StoryImageWithFallback 
  story={story} 
  className="m-2 sm:m-4 lg:m-6 rounded-md sm:rounded-lg lg:rounded-xl"
/>
```

### Breakpoint Considerations
- **sm (640px+)**: 2-column grids, increased padding
- **md (768px+)**: Larger image heights, enhanced shadows
- **lg (1024px+)**: 3-column layouts, bigger gaps
- **xl (1280px+)**: 4-column grids, maximum sizes
- **2xl (1440px+)**: Optimal spacing for large screens

## Accessibility

### Built-in Accessibility Features
- **Alt Text**: Automatically generated from `story.name`
- **Loading States**: Proper loading indicators via fallback system
- **Keyboard Navigation**: Inherits focus states when wrapped in interactive elements
- **Screen Reader Support**: Descriptive alt text for story context

### Best Practices
```tsx
// Wrap in interactive elements for keyboard navigation
<button 
  className="focus:outline-none focus:ring-2 focus:ring-pgBlue-500 rounded-lg"
  aria-label={`View story: ${story.name}`}
>
  <StoryImageWithFallback story={story} />
</button>

// Provide loading state announcements
<div role="img" aria-label={`Loading story image: ${story.name}`}>
  <StoryImageWithFallback story={story} />
</div>
```

## Dependencies

### Internal Dependencies
- **`@/components/ui/image-with-fallback`**: Base image component with fallback functionality
- **`@/components/hooks/use-image-placeholder`**: Hook for generating placeholder images
- **`@/lib/types`**: Story type definitions

### Related Components
- **`ImageWithFallback`**: Base component for image fallback behavior
- **`StoryCard`**: Often used together for story display layouts
- **`LoadingSkeleton`**: Can be used while story data is loading

### Design System Components
```tsx
// Often used with these design system components
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

<Card className="bg-pgBackground-0 dark:bg-pgBackground-900">
  <StoryImageWithFallback story={story} />
  <div className="p-4">
    <Badge variant="secondary">Featured</Badge>
    <Button size="sm" className="mt-2">Read Story</Button>
  </div>
</Card>
```