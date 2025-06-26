# StoryPreviewCardSmall Component

## Purpose

The `StoryPreviewCardSmall` component renders a compact preview card for news stories, displaying essential information including the story headline, publication date, source count, velocity chart, and thumbnail image. It's designed for use in lists, carousels, or grid layouts where space is constrained but key story information needs to be quickly accessible.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `story` | `StoryWithPageInfoAndSelectedArticles` | ✅ | - | The story data object containing all necessary information to render the card |
| `onClick` | `(e: React.MouseEvent) => void` | ❌ | - | Callback function triggered when the card is clicked |
| `isSelected` | `boolean` | ❌ | `false` | Whether the card is currently selected (applies selected styling) |
| `isActiveSlide` | `boolean` | ❌ | `false` | Whether the card is the active slide in a carousel (applies active styling) |
| `isLoading` | `boolean` | ❌ | `false` | Loading state that renders the fallback skeleton |
| `onMobileExpand` | `(e: React.MouseEvent) => void` | ❌ | - | Mobile-specific expand callback that shows a more options button |
| `className` | `string` | ❌ | - | Additional CSS classes to apply to the root element |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | ❌ | - | Additional HTML attributes passed to the root div |

## Usage Example

```tsx
import { StoryPreviewCardSmall } from '@/components/ui/story-preview-card-small';

function StoryList() {
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);

  const handleStoryClick = (story: StoryWithPageInfoAndSelectedArticles) => {
    setSelectedStoryId(story.id);
    // Navigate to story detail or perform other actions
  };

  const handleMobileExpand = (story: StoryWithPageInfoAndSelectedArticles) => {
    // Show mobile context menu or additional options
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stories.map((story) => (
        <StoryPreviewCardSmall
          key={story.id}
          story={story}
          isSelected={selectedStoryId === story.id}
          onClick={() => handleStoryClick(story)}
          onMobileExpand={() => handleMobileExpand(story)}
          className="hover:shadow-lg"
        />
      ))}
    </div>
  );
}

// Carousel usage
function StoryCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex gap-4 overflow-x-auto">
      {stories.map((story, index) => (
        <StoryPreviewCardSmall
          key={story.id}
          story={story}
          isActiveSlide={activeIndex === index}
          onClick={() => setActiveIndex(index)}
          className="flex-shrink-0 w-80"
        />
      ))}
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **`.typography-paragraphXSmall`** - Used for date and time information
- **`.typography-titleH16`** - Applied to the story headline
- **`.typography-subheadingXSmall`** - Used for source count display

### Color Tokens
- **Border Colors**: 
  - `pgStroke-250` - Default border color
  - `pgStroke-950` - Hover and selected border color
- **Background Colors**:
  - `pgBackgroundWhiteInv-800` - Hover and selected background
- **Text Colors**:
  - `pgText-700` - Default secondary text
  - `pgText-800` - Primary text and hover states

### Tailwind Utilities
- **Layout**: `flex`, `flex-col`, `justify-between`, `items-center`
- **Spacing**: `px-3`, `py-2`, `gap-2`, `gap-4`, `mt-2`
- **Borders**: `rounded-xl`, `border`
- **Effects**: `shadow-sm`, `transition-all`, `duration-500`
- **Sizing**: `size-[68px]`, `aspect-square`, `max-h-8`, `max-w-20`

## Styling

### States and Variants

#### Default State
```tsx
<StoryPreviewCardSmall story={story} />
```
- Light border (`pgStroke-250`)
- Transparent background
- Subtle shadow

#### Selected/Active State
```tsx
<StoryPreviewCardSmall story={story} isSelected={true} />
// or
<StoryPreviewCardSmall story={story} isActiveSlide={true} />
```
- Dark border (`pgStroke-950`)
- Tinted background (`pgBackgroundWhiteInv-800`)
- Enhanced text contrast

#### Hover State
- Automatic border color change to `pgStroke-950`
- Background color change to `pgBackgroundWhiteInv-800`
- Text color enhancement for better readability

#### Loading State
```tsx
<StoryPreviewCardSmall story={story} isLoading={true} />
```
- Renders `StoryPreviewCardSmallFallback` with skeleton placeholders

### Customization Options

```tsx
// Custom styling
<StoryPreviewCardSmall
  story={story}
  className="shadow-lg hover:shadow-2xl border-pgBlue-200"
/>

// Mobile-specific features
<StoryPreviewCardSmall
  story={story}
  onMobileExpand={handleMobileMenu}
  className="md:hover:scale-105 transition-transform"
/>
```

## Responsive Design

The component adapts across breakpoints:

- **Mobile (< 640px)**: 
  - Shows expand button when `onMobileExpand` is provided
  - Compact layout optimized for touch interaction
  
- **Tablet (640px - 1024px)**:
  - Maintains compact design
  - Hover states become more prominent
  
- **Desktop (> 1024px)**:
  - Full hover interactions
  - Optimal spacing and typography scaling

### Responsive Usage Patterns

```tsx
// Grid layout that adapts to screen size
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {stories.map(story => (
    <StoryPreviewCardSmall key={story.id} story={story} />
  ))}
</div>

// Horizontal scroll on mobile, grid on desktop
<div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-2 md:overflow-x-visible lg:grid-cols-3">
  {stories.map(story => (
    <StoryPreviewCardSmall 
      key={story.id} 
      story={story}
      className="flex-shrink-0 w-80 md:w-auto"
    />
  ))}
</div>
```

## Accessibility

### Built-in Features
- **Keyboard Navigation**: Fully keyboard accessible as a clickable div
- **Screen Reader Support**: Semantic HTML structure with meaningful content hierarchy
- **Focus Management**: Proper focus indicators and tab order
- **Color Contrast**: Uses design system colors that meet WCAG contrast requirements

### ARIA Considerations

For enhanced accessibility, consider wrapping in semantic elements:

```tsx
<article role="article" aria-labelledby={`story-${story.id}`}>
  <StoryPreviewCardSmall
    story={story}
    onClick={handleClick}
    aria-label={`Read more about ${story.name}`}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleClick(e);
      }
    }}
  />
</article>
```

### Accessibility Best Practices

```tsx
// For lists of stories
<section aria-label="Story previews">
  <h2 className="typography-titleH2">Latest Stories</h2>
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    {stories.map((story, index) => (
      <StoryPreviewCardSmall
        key={story.id}
        story={story}
        aria-posinset={index + 1}
        aria-setsize={stories.length}
      />
    ))}
  </div>
</section>
```

## Dependencies

### Internal Components
- **`ImageWithFallback`** - Handles image loading with fallback support
- **`Typography`** - Provides consistent text styling
- **`CitationBubbleListBase`** - Displays source citations
- **`CompactButton`** - Mobile expand button
- **`Skeleton`** - Loading state placeholders
- **`TimeLineChart`** - Story velocity visualization

### Hooks and Utilities
- **`useImagePlaceholder`** - Generates placeholder images
- **`useSources`** - Fetches source data
- **`useStoryVelocity`** - Retrieves story velocity data
- **`cn`** - Utility for conditional class names
- **`domainUniquenessByTwoTopLevels`** - Domain processing utility

### External Dependencies
- **`date-fns`** - Date formatting and manipulation
- **React** - Core React functionality for hooks and event handling

### Type Dependencies
- **`StoryWithPageInfoAndSelectedArticles`** - TypeScript interface for story data
- **`GetSourcesListParams`** - API parameter types