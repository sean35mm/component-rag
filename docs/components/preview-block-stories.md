# PreviewBlockStories Component

## Purpose

The `PreviewBlockStories` component displays a comprehensive preview of a news story with key metrics and metadata. It provides a card-based interface showing story details including title, image, velocity chart, publication metrics, reach statistics, AI-generated summary, and a link to view the full story. This component is designed for dashboards and story overview interfaces where users need quick access to story insights.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `story` | `StoryWithPageInfo` | Yes | The story object containing all story data including metadata, metrics, sources, and content |

### Type Definitions

```typescript
interface PreviewBlockStoriesProps {
  story: StoryWithPageInfo;
}

// StoryWithPageInfo includes properties like:
// - id: string
// - name: string
// - imageUrl?: string
// - summary?: string
// - updatedAt: Date
// - uniqueSources: string[]
// - uniqueCount: number
```

## Usage Example

```tsx
import { PreviewBlockStories } from '@/components/ui/preview-block-stories';

// Basic usage
function StoryDashboard() {
  const story = {
    id: 'story-123',
    name: 'Breaking News: Tech Industry Updates',
    imageUrl: 'https://example.com/story-image.jpg',
    summary: 'Latest developments in the technology sector...',
    updatedAt: new Date(),
    uniqueSources: ['example.com', 'news.com', 'tech.org'],
    uniqueCount: 45000,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <PreviewBlockStories story={story} />
    </div>
  );
}

// Multiple stories grid
function StoriesGrid({ stories }) {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {stories.map((story) => (
          <PreviewBlockStories key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **`.typography-titleH6`** - Used for main headings ("Story° Preview", story name)
- **`.typography-subheadingXSmall`** - Applied to section labels (Velocity, Last Updated, etc.)
- **`.typography-paragraphSmall`** - Used for data values and story summary

### Color Tokens
- **Background Colors:**
  - `bg-pgNeutral-400/12` - Main card background with 12% opacity
- **Text Colors:**
  - `text-pgIcon-600` - Icon color
  - Color variants: `800`, `600`, `400` - Applied through Typography component
- **Border Colors:**
  - `border-pgStroke-250` - Section divider borders

### Tailwind Utilities
- **Layout:** `flex`, `size-full`, `flex-col`, `items-center`, `justify-between`
- **Spacing:** `gap-4`, `gap-2`, `gap-1`, `gap-0.5`, `p-4`
- **Borders:** `rounded-2xl`, `border`, `border-y-2`
- **Effects:** `shadow-xl`
- **Overflow:** `overflow-y-scroll`, `scrollbar-hide`

## Styling

### Card Structure
```css
/* Main container */
.preview-card {
  @apply flex size-full flex-col gap-4 rounded-2xl border bg-pgNeutral-400/12 p-4 shadow-xl;
}

/* Section divider */
.metrics-section {
  @apply border-y-2 border-pgStroke-250 p-4;
}
```

### Visual Hierarchy
- **Header:** Icon + title with consistent spacing
- **Content:** Story image (112x112px) + title in horizontal layout
- **Metrics:** 4-column grid showing velocity, update time, sources, and reach
- **Summary:** Scrollable section with AI tag and copy functionality
- **Action:** Full-width primary button for navigation

### Interactive States
- **Hover Effects:** Inherited from Button component for the "View Story°" action
- **Copy Button:** Integrated tooltip and copy functionality
- **External Link:** Opens in new tab with proper security attributes

## Responsive Design

The component adapts across breakpoints through its container usage:

### Mobile (< 640px)
- Single column layout when used in grids
- Maintains fixed 112px image size
- Scrollable summary section prevents overflow

### Tablet (640px - 1024px)
- Typically displayed 1-2 per row in grid layouts
- All internal spacing remains consistent

### Desktop (1024px+)
- Optimal display in 2-3 column grids
- Fixed aspect ratios maintain visual consistency

### Implementation Example
```tsx
// Responsive grid container
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <PreviewBlockStories story={story} />
</div>
```

## Accessibility

### ARIA Features
- **Semantic Structure:** Proper heading hierarchy with Typography component
- **Image Alt Text:** Story ID used as fallback alt text
- **External Links:** `rel="noopener noreferrer"` for security
- **Interactive Elements:** Button and CopyButton components include built-in accessibility

### Keyboard Navigation
- **Tab Order:** Natural flow through interactive elements
- **Focus Management:** Button and copy functionality are keyboard accessible
- **Screen Reader Support:** Descriptive labels and proper semantic markup

### Color Contrast
- Uses design system color tokens ensuring WCAG compliance
- Text colors (800, 600, 400) provide appropriate contrast ratios
- Icon colors maintain visibility standards

## Dependencies

### Internal Components
- **`Typography`** - Text rendering with design system integration
- **`Button`** - Primary action button with variant support
- **`ImageWithFallback`** - Robust image loading with placeholder support
- **`CopyButton`** - Copy-to-clipboard functionality with tooltip
- **`AiTag`** - Visual indicator for AI-generated content
- **`CitationBubbleListBase`** - Source visualization components
- **`TimeLineChart`** - Velocity data visualization
- **`Reach`** - Audience reach statistics display
- **`TooltipProvider`** - Tooltip context and management

### External Dependencies
- **`date-fns/format`** - Date formatting utilities
- **`next/link`** - Next.js navigation component

### Hooks and Services
- **`useImagePlaceholder`** - Generates placeholder images
- **`useSources`** - Fetches source data
- **`useStoryVelocity`** - Retrieves story velocity metrics
- **`getStoryHref`** - URL generation utility

### Usage Requirements
```tsx
// Required providers at app level
<TooltipProvider>
  <PreviewBlockStories story={story} />
</TooltipProvider>
```