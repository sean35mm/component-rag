# StoryPreviewCardTiny Component Documentation

## Purpose

The `StoryPreviewCardTiny` component displays a compact preview of a news story, featuring the story's image, headline, publication date, source count, and velocity chart. It's designed for use in story lists, carousels, or feeds where space is limited but key story information needs to be accessible. The component includes hover states, selection states, and mobile-specific interactions.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `story` | `StoryWithPageInfoAndSelectedArticles` | ✅ | - | The story object containing all story data including metadata, articles, and sources |
| `onClick` | `(e: React.MouseEvent) => void` | ❌ | - | Callback fired when the card is clicked |
| `isSelected` | `boolean` | ❌ | `false` | Whether the card is currently selected (affects visual state) |
| `isActiveSlide` | `boolean` | ❌ | `false` | Whether the card is the active slide in a carousel context |
| `isLoading` | `boolean` | ❌ | `false` | Loading state that triggers fallback display |
| `onMobileExpand` | `(e: React.MouseEvent) => void` | ❌ | - | Callback for mobile expand button (shows expand button when provided) |
| `className` | `string` | ❌ | - | Additional CSS classes to apply to the root element |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | ❌ | - | Standard HTML div attributes |

## Usage Example

```tsx
import { StoryPreviewCardTiny } from '@/components/ui/story-preview-card-tiny';

function StoryFeed() {
  const [selectedStory, setSelectedStory] = useState<string | null>(null);

  return (
    <div className="grid gap-2 md:gap-4">
      {stories.map((story) => (
        <StoryPreviewCardTiny
          key={story.id}
          story={story}
          isSelected={selectedStory === story.id}
          onClick={() => setSelectedStory(story.id)}
          onMobileExpand={(e) => {
            // Handle mobile-specific expansion
            setMobileExpanded(story.id);
          }}
          className="hover:shadow-lg transition-shadow"
        />
      ))}
    </div>
  );
}

// Loading state usage
function LoadingStoryFeed() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <StoryPreviewCardTinyFallback key={i} />
      ))}
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **`.typography-labelXSmall`**: Used for date and time information
- **`.typography-headlines14`**: Applied to story headlines for optimal readability
- **`.typography-subheadingXSmall`**: Used for source count display

### Color Tokens
- **Border Colors**: 
  - `pgStroke-250`: Default border color
  - `pgStroke-950`: Hover and selected state borders
- **Background Colors**:
  - `pgBackgroundWhiteInv-800`: Selected/hover background
- **Text Colors**:
  - `color='800'`: Primary text color for headlines and dates
  - `color='700'`: Secondary text color for time information

### Tailwind Utilities
- **Layout**: `flex`, `flex-col`, `justify-between`, `items-center`
- **Spacing**: `px-3`, `py-2`, `gap-2`, `gap-4`, `mb-2`, `mt-2.5`
- **Borders**: `rounded-xl`, `border`
- **Effects**: `shadow-sm`, `transition-all`, `duration-500`
- **Sizing**: `size-[40px]`, `aspect-square`, `max-h-8`, `max-w-20`

## Styling

### Component States

#### Default State
```css
border-pgStroke-250 px-3 py-2 shadow-sm
```

#### Hover State
```css
hover:border-pgStroke-950 hover:bg-pgBackgroundWhiteInv-800
```

#### Selected/Active State
```css
border-pgStroke-950 bg-pgBackgroundWhiteInv-800
```

### Customization Options

The component accepts a `className` prop for additional styling:

```tsx
<StoryPreviewCardTiny
  story={story}
  className="hover:shadow-lg border-2" // Custom enhancements
/>
```

### Image Styling
- Fixed size: `40px × 40px`
- Rounded corners: `rounded-lg`
- Aspect ratio maintained: `aspect-square`
- Object fit: `object-cover`

## Responsive Design

### Breakpoint Adaptations

| Breakpoint | Behavior |
|------------|----------|
| **Mobile** (`< 640px`) | Compact layout with mobile expand button visible |
| **Desktop** (`lg: 1024px+`) | Increased bottom margin (`lg:mb-4`) |

### Mobile-Specific Features
- **Mobile Expand Button**: Appears when `onMobileExpand` prop is provided
- **Compact Layout**: Optimized spacing for touch interactions
- **Responsive Margins**: `mb-2` on mobile, `lg:mb-4` on desktop

## Accessibility

### Current Implementation
- **Semantic HTML**: Uses proper `div` structure with meaningful content hierarchy
- **Interactive Elements**: Properly handles click events and keyboard navigation
- **Image Alt Text**: Includes alt text for story images using story name
- **Focus Management**: Supports standard focus states through CSS

### Recommendations for Enhancement
```tsx
// Enhanced accessibility example
<StoryPreviewCardTiny
  story={story}
  onClick={handleClick}
  role="article"
  aria-label={`Story: ${story.name}, published ${timeSinceInitialization}`}
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick(e);
    }
  }}
/>
```

## Dependencies

### Internal Components
- **`ImageWithFallback`**: Handles image loading with fallback support
- **`Typography`**: Provides consistent text styling
- **`Skeleton`**: Loading state component
- **`CompactButton`**: Mobile expand button
- **`CitationBubbleListBase`**: Source citation display
- **`TimeLineChart`**: Story velocity visualization

### Hooks
- **`useImagePlaceholder`**: Generates placeholder images
- **`useSources`**: Fetches source data
- **`useStoryVelocity`**: Retrieves story velocity data

### External Dependencies
- **`date-fns`**: Date formatting and manipulation
- **`@/lib/utils/cn`**: Tailwind class merging utility

### Types
- **`StoryWithPageInfoAndSelectedArticles`**: Core story data structure
- **`GetSourcesListParams`**: Source query parameters

## Fallback Component

The `StoryPreviewCardTinyFallback` provides a skeleton loading state that matches the component's layout:

```tsx
<StoryPreviewCardTinyFallback />
```

**Features:**
- Matches the original component's dimensions
- Uses `Skeleton` components for consistent loading states
- Maintains the same spacing and layout structure
- Automatically styled with design system colors