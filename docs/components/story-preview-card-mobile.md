# StoryPreviewCardMobile Component

## Purpose

The `StoryPreviewCardMobile` component is a mobile-optimized wrapper that renders story preview cards with drawer interaction functionality. It leverages the `StoryPreviewCardSmall` component and integrates with the entity detail drawer system to provide a seamless mobile experience for story browsing and selection.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `story` | `StoryWithPageInfoAndSelectedArticles` | ✅ | Story data object containing page information and selected articles |
| `onClick` | `() => Promise<void>` | ❌ | Optional async callback function executed when the card is clicked |

## Usage Example

```tsx
import { StoryPreviewCardMobile } from '@/components/ui/story-preview-card-mobile';
import { StoryWithPageInfoAndSelectedArticles } from '@/lib/types';

// Basic usage
function MobileStoriesList({ stories }: { stories: StoryWithPageInfoAndSelectedArticles[] }) {
  return (
    <div className="space-y-4 p-4">
      {stories.map((story) => (
        <StoryPreviewCardMobile
          key={story.id}
          story={story}
        />
      ))}
    </div>
  );
}

// With custom click handler
function EnhancedMobileStoriesList({ stories }: { stories: StoryWithPageInfoAndSelectedArticles[] }) {
  const handleStoryClick = async () => {
    // Custom analytics or tracking
    await trackStoryView();
  };

  return (
    <div className="grid gap-4 p-6 bg-pgBackground-50">
      {stories.map((story) => (
        <StoryPreviewCardMobile
          key={story.id}
          story={story}
          onClick={handleStoryClick}
        />
      ))}
    </div>
  );
}
```

## Design System Usage

### Colors
- **Background**: `bg-pgBackground-0` - Clean neutral background for card container
- **System Integration**: Inherits color scheme from `StoryPreviewCardSmall` component

### Layout & Spacing
- **Fixed Height**: `h-[180px]` - Consistent card height for mobile viewport
- **Padding**: `p-4` (16px) - Standard spacing following 4px base unit
- **Container Spacing**: Utilizes Tailwind spacing scale for consistent layouts

### Typography
Typography is handled by the underlying `StoryPreviewCardSmall` component, which typically uses:
- **Story Titles**: `.typography-titleH6` or `.typography-headlines16`
- **Meta Information**: `.typography-labelSmall` or `.typography-paragraph3XSmall`
- **Content Preview**: `.typography-paragraphSmall`

## Styling

### Default Appearance
- Clean, minimal design with neutral background
- Fixed dimensions optimized for mobile touch targets
- Consistent spacing and typography hierarchy

### Customization Options
```tsx
// Custom container styling
<div className="space-y-3 px-4 py-6 bg-pgBackground-100">
  <StoryPreviewCardMobile story={story} />
</div>

// Dark mode support (automatic via CSS variables)
<div className="bg-pgBackground-900 dark:bg-pgBackground-950">
  <StoryPreviewCardMobile story={story} />
</div>
```

### State Variations
- **Default**: Clean neutral appearance
- **Interactive**: Hover and focus states managed by underlying component
- **Loading**: Can be wrapped with loading states using `pgState` colors

## Responsive Design

### Mobile-First Approach
```tsx
// Responsive grid layout
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
  {stories.map(story => (
    <StoryPreviewCardMobile key={story.id} story={story} />
  ))}
</div>

// Breakpoint-specific visibility
<div className="block lg:hidden">
  <StoryPreviewCardMobile story={story} />
</div>
```

### Breakpoint Behavior
- **Mobile (< 640px)**: Primary use case, full-width cards
- **Small (640px+)**: Can be used in 2-column grid layouts
- **Large (1024px+)**: Typically hidden in favor of desktop components

## Accessibility

### Interactive Elements
- **Touch Targets**: 180px height provides adequate touch target size (minimum 44px)
- **Keyboard Navigation**: Inherits keyboard support from `StoryPreviewCardSmall`
- **Screen Reader Support**: Story content and metadata properly structured

### ARIA Considerations
```tsx
// Enhanced accessibility
<div role="region" aria-label="Story previews">
  {stories.map((story, index) => (
    <StoryPreviewCardMobile
      key={story.id}
      story={story}
      aria-posinset={index + 1}
      aria-setsize={stories.length}
    />
  ))}
</div>
```

### Focus Management
- Proper focus handling when drawer opens
- Maintains focus context for screen readers
- Supports keyboard navigation patterns

## Dependencies

### Internal Components
- **`StoryPreviewCardSmall`**: Core rendering component for story preview display
- **`useEntityDetailDrawerStore`**: Zustand store for drawer state management

### Type Dependencies
- **`StoryWithPageInfoAndSelectedArticles`**: TypeScript interface for story data structure

### Context Dependencies
```tsx
// Required store setup in app
import { useEntityDetailDrawerStore } from '@/lib/contexts';

// Drawer state management
const setStory = useEntityDetailDrawerStore((state) => state.setStory);
const setIsStoryDrawerOpen = useEntityDetailDrawerStore((state) => state.setIsOpen);
```

### Design System Integration
- Follows design system color tokens and spacing conventions
- Integrates with dark mode system via CSS variables
- Maintains consistency with other card components in the system

## Best Practices

### Performance
```tsx
// Memoize expensive operations
const MemoizedStoryCard = React.memo(StoryPreviewCardMobile);

// Virtualization for large lists
import { VirtualizedList } from '@/components/ui/virtualized-list';

<VirtualizedList
  items={stories}
  renderItem={(story) => <StoryPreviewCardMobile story={story} />}
/>
```

### Error Handling
```tsx
// Graceful error handling
{stories?.length > 0 ? (
  stories.map(story => (
    <StoryPreviewCardMobile
      key={story.id}
      story={story}
      onClick={async () => {
        try {
          await handleStoryInteraction();
        } catch (error) {
          console.error('Story interaction failed:', error);
        }
      }}
    />
  ))
) : (
  <div className="text-pgText-500 typography-paragraphMedium">
    No stories available
  </div>
)}
```