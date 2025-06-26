# StoryPreviewCardLarge Component

## Purpose

The `StoryPreviewCardLarge` component displays a comprehensive preview of a story with image, metadata, timeline chart, and source citations. It provides an interactive card interface for story selection with hover states, loading animations, and visual feedback for active/selected states.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `story` | `StoryWithPageInfoAndSelectedArticles` | ✅ | - | The story data object containing metadata, articles, and source information |
| `onClick` | `() => void` | ❌ | - | Callback function triggered when the card is clicked |
| `isSelected` | `boolean` | ❌ | `false` | Whether the card is currently selected |
| `isActiveSlide` | `boolean` | ❌ | `false` | Whether the card is the active slide in a carousel/slider |
| `isLoading` | `boolean` | ❌ | `false` | Override loading state |
| `className` | `string` | ❌ | - | Additional CSS classes to apply |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | ❌ | - | Standard HTML div attributes |

## Usage Example

```tsx
import { StoryPreviewCardLarge } from '@/components/ui/story-preview-card-large';

function StoryGrid() {
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stories.map((story, index) => (
        <StoryPreviewCardLarge
          key={story.id}
          story={story}
          isSelected={selectedStoryId === story.id}
          isActiveSlide={activeSlideIndex === index}
          onClick={() => setSelectedStoryId(story.id)}
          className="max-w-sm"
        />
      ))}
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **`.typography-titleH16`** - Story title with line clamping
- **`.typography-paragraphXSmall`** - Date and time metadata
- **`.typography-subheadingXSmall`** - Source count display

### Color Tokens
- **Border Colors**: 
  - `pgStroke-250` - Default border
  - `pgStroke-950` - Hover/selected border
- **Background Colors**:
  - `pgBackgroundWhiteInv-800` - Hover/selected background
- **Text Colors**:
  - `pgText-800` - Primary text (titles, active states)
  - `pgText-700` - Secondary text (metadata, separators)

### Spacing & Layout
- **Padding**: `p-4` (16px) - Card internal spacing
- **Margins**: `mb-4` (16px) - Card bottom margin
- **Gaps**: `gap-2` (8px), `gap-1.5` (6px) - Element spacing
- **Border Radius**: `rounded-xl` (12px) - Card corners, `rounded-[0.625rem]` (10px) - Image

## Styling

### States

#### Default State
```css
border-pgStroke-250 shadow-sm
```

#### Hover State
```css
hover:border-pgStroke-950 hover:bg-pgBackgroundWhiteInv-800
```

#### Selected State
```css
border-pgStroke-950 bg-pgBackgroundWhiteInv-800
```

#### Active Slide State
```css
border-pgStroke-950 bg-pgBackgroundWhiteInv-800
```

### Customization Options

```tsx
// Custom styling
<StoryPreviewCardLarge
  story={story}
  className="max-w-md shadow-lg hover:shadow-xl"
/>

// Different sizing
<StoryPreviewCardLarge
  story={story}
  className="w-80 h-96"
/>
```

## Responsive Design

The component adapts across breakpoints:

- **Mobile (default)**: Full width layout with stacked elements
- **Tablet (md:768px+)**: Maintains aspect ratios, suitable for grid layouts
- **Desktop (lg:1024px+)**: Optimized for multi-column grids

```tsx
// Responsive grid implementation
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {stories.map(story => (
    <StoryPreviewCardLarge key={story.id} story={story} />
  ))}
</div>
```

## Accessibility

### ARIA Considerations
- **Role**: Implicit `button` role via `onClick` handler
- **Keyboard Navigation**: Clickable via Enter/Space keys
- **Screen Readers**: Image alt text from story name
- **Focus Management**: Visual focus indicators through hover states

### Accessibility Best Practices
```tsx
<StoryPreviewCardLarge
  story={story}
  onClick={handleClick}
  role="button"
  tabIndex={0}
  aria-label={`Read story: ${story.name}`}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
/>
```

## Dependencies

### Internal Components
- **`Typography`** - Design system typography component
- **`ImageWithFallback`** - Image component with placeholder fallback
- **`Skeleton`** - Loading state component
- **`TimeLineChart`** - Story velocity visualization
- **`CitationBubbleListBase`** - Source citation display

### Hooks & Utilities
- **`useImagePlaceholder`** - Generates placeholder images
- **`useSources`** - Fetches source data
- **`useStoryVelocity`** - Fetches story activity data
- **`cn`** - Utility for conditional class names

### External Dependencies
- **`date-fns`** - Date formatting and manipulation
- **React** - Core component functionality

### Loading States

The component includes a comprehensive fallback component:

```tsx
// Automatic loading state
{isLoading && <StoryPreviewCardLargeFallback />}

// Manual loading override
<StoryPreviewCardLarge 
  story={story} 
  isLoading={true} // Forces loading state
/>
```

The fallback uses skeleton components matching the card layout structure with appropriate sizing and spacing from our design system.