# ViewAllButton Component

## Purpose

The `ViewAllButton` is a specialized UI component designed for story galleries that provides users with a clear call-to-action to view all images in a collection. It features a consistent visual design with an image icon and standardized styling that fits seamlessly into gallery interfaces.

## Component Type

**Client Component** - This component uses the `onClick` prop which requires client-side event handling, making it inherently interactive and necessitating client-side rendering.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | Optional | Additional CSS classes to customize component styling |
| `onClick` | `MouseEventHandler<HTMLButtonElement>` | Required | Click event handler triggered when the button is pressed |

## Usage Example

```tsx
import { ViewAllButton } from '@/components/story/gallery/view-all-button';
import { useRouter } from 'next/navigation';

function StoryGallery({ storyId }: { storyId: string }) {
  const router = useRouter();

  const handleViewAll = () => {
    router.push(`/stories/${storyId}/gallery`);
  };

  return (
    <div className="relative">
      {/* Gallery preview images */}
      <div className="grid grid-cols-2 gap-2">
        {/* Preview images here */}
      </div>
      
      {/* View all button overlay */}
      <div className="absolute bottom-4 right-4">
        <ViewAllButton 
          onClick={handleViewAll}
          className="shadow-lg"
        />
      </div>
    </div>
  );
}
```

## Functionality

- **Consistent Branding**: Uses `primaryFilled` variant with standardized typography (`labelXSmall`)
- **Visual Feedback**: Includes opacity styling (85%) for subtle visual hierarchy
- **Icon Integration**: Features `PiImage2Fill` icon with proper spacing and sizing
- **Responsive Design**: Uses `xxs` button size appropriate for gallery overlays
- **Customizable**: Accepts custom className for context-specific styling
- **Accessible**: Built on the base `Button` component which includes proper accessibility attributes

## State Management

This component is **stateless** and relies on:
- **External State**: Receives click handler from parent component
- **No Internal State**: Does not manage any local state
- **Event Delegation**: Passes user interactions up to parent components for handling

## Side Effects

- **Navigation**: Typically triggers navigation to full gallery view
- **Event Propagation**: Executes provided `onClick` handler which may trigger various side effects in parent components
- **No Direct API Calls**: Component itself doesn't make external requests

## Dependencies

### Internal Dependencies
- `@/components/ui/button` - Base button component providing core functionality
- `@/components/icons` - Icon library for the image symbol
- `@/lib/utils/cn` - Utility for conditional class name merging

### External Dependencies
- `React` - Core React library for component structure and event handling

## Integration

### Gallery System Architecture
```
Story Gallery Container
├── Gallery Preview Grid
├── Image Thumbnails
└── ViewAllButton (overlay)
    └── Triggers full gallery view
```

### Common Integration Patterns

**With Navigation Router**:
```tsx
const handleViewAll = useCallback(() => {
  router.push(`/gallery/${galleryId}`);
}, [router, galleryId]);
```

**With Modal System**:
```tsx
const handleViewAll = useCallback(() => {
  setGalleryModalOpen(true);
}, [setGalleryModalOpen]);
```

**With Analytics Tracking**:
```tsx
const handleViewAll = useCallback(() => {
  trackEvent('gallery_view_all_clicked', { storyId });
  router.push(`/stories/${storyId}/gallery`);
}, [storyId, trackEvent, router]);
```

## Best Practices

### Architecture Adherence
- ✅ **Single Responsibility**: Focused solely on triggering gallery view action
- ✅ **Composition**: Built by composing base `Button` component
- ✅ **Flat Structure**: Simple, non-nested component architecture
- ✅ **Domain Separation**: Located in story/gallery domain structure

### Usage Recommendations
- **Positioning**: Typically used as an overlay on gallery previews
- **Event Handling**: Always provide meaningful `onClick` handlers
- **Accessibility**: Ensure parent components provide proper context for screen readers
- ✅ **Styling**: Use `className` prop for context-specific styling rather than inline styles
- **Performance**: Component is lightweight and suitable for frequent re-renders

### Integration Guidelines
- **Parent Responsibility**: Parent components should handle navigation and state updates
- **Context Awareness**: Ensure the button appears only when there are additional images to view
- **Loading States**: Parent should handle loading states during navigation
- **Error Handling**: Implement error boundaries in parent components for navigation failures