# StoryVelocity Component

## Purpose

The `StoryVelocity` component displays a compact timeline chart visualization showing the velocity/activity pattern of a story over time. It provides a visual representation of story momentum using a specialized chart component that adapts to loading states and data freshness.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `storyId` | `string` | ✅ | - | Unique identifier for the story to display velocity data for |
| `className` | `string` | ❌ | - | Additional CSS classes to apply to the root container |
| `chartClassName` | `string` | ❌ | - | Additional CSS classes to apply specifically to the TimeLineChart component |
| ...rest | `HTMLAttributes<HTMLDivElement>` | ❌ | - | Standard HTML div attributes (onClick, onMouseOver, etc.) |

## Usage Example

```tsx
import { StoryVelocity } from '@/components/ui/story-velocity';

function StoryCard() {
  return (
    <div className="bg-pgBackground-0 border border-pgStroke-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="typography-titleH6 text-pgText-950">
          Breaking News Story
        </h3>
        <StoryVelocity 
          storyId="story-123"
          className="ml-auto"
          chartClassName="h-6 w-16 text-pgBlue-600"
        />
      </div>
      
      <p className="typography-paragraphSmall text-pgText-700">
        Story content and details...
      </p>
    </div>
  );
}

// Usage in a story list with responsive sizing
function StoryList() {
  return (
    <div className="space-y-4">
      {stories.map(story => (
        <div key={story.id} className="flex items-start gap-4 p-4 bg-pgNeutral-50 rounded-lg">
          <div className="flex-1">
            <h4 className="typography-labelLarge text-pgText-950">{story.title}</h4>
            <p className="typography-paragraphSmall text-pgText-600 mt-1">{story.summary}</p>
          </div>
          
          <StoryVelocity 
            storyId={story.id}
            className="flex-shrink-0 mt-1"
            chartClassName="h-8 w-20 md:h-10 md:w-24"
          />
        </div>
      ))}
    </div>
  );
}
```

## Design System Usage

### Typography Classes
The component doesn't directly use typography classes but commonly pairs with:
- **Labels**: `.typography-labelSmall` or `.typography-labelXSmall` for velocity indicators
- **Paragraphs**: `.typography-paragraphXSmall` for additional context text

### Color Tokens
Commonly used with these color combinations:
- **Container**: `bg-pgBackground-0`, `bg-pgNeutral-50`
- **Chart Colors**: `text-pgBlue-600`, `text-pgGreen-600` for positive velocity
- **Stale States**: `text-pgNeutral-400`, `text-pgState-faded-base`
- **Borders**: `border-pgStroke-200`, `border-pgStroke-300`

### Tailwind Utilities
- **Layout**: `flex`, `self-baseline`, `items-center`
- **Sizing**: `max-h-8`, `max-w-20`, `h-6`, `w-16`
- **Spacing**: `ml-auto`, `mt-1`, `gap-4`

## Styling

### Default Styling
```tsx
// Base component with default constraints
<StoryVelocity 
  storyId="story-id"
  // Default: flex self-baseline container with max-h-8 max-w-20 chart
/>
```

### Size Variants
```tsx
// Compact variant for dense layouts
<StoryVelocity 
  storyId="story-id"
  chartClassName="h-4 w-12"
/>

// Standard variant
<StoryVelocity 
  storyId="story-id"
  chartClassName="h-8 w-20"
/>

// Large variant for featured stories
<StoryVelocity 
  storyId="story-id"
  chartClassName="h-12 w-28"
/>
```

### State Variants
```tsx
// High activity indicator
<StoryVelocity 
  storyId="story-id"
  chartClassName="h-8 w-20 text-pgGreen-600"
/>

// Moderate activity
<StoryVelocity 
  storyId="story-id"
  chartClassName="h-8 w-20 text-pgBlue-600"
/>

// Low activity or stale
<StoryVelocity 
  storyId="story-id"
  chartClassName="h-8 w-20 text-pgNeutral-400"
/>
```

## Responsive Design

The component adapts across breakpoints through the `chartClassName` prop:

```tsx
<StoryVelocity 
  storyId="story-id"
  chartClassName="
    h-6 w-16 
    sm:h-7 sm:w-18 
    md:h-8 md:w-20 
    lg:h-10 lg:w-24
    xl:h-12 xl:w-28
  "
/>
```

### Responsive Patterns
- **Mobile (< 640px)**: Compact sizing to preserve space
- **Tablet (640px+)**: Standard sizing with better visibility
- **Desktop (1024px+)**: Enhanced sizing for detailed visualization
- **Large Desktop (1280px+)**: Maximum sizing for dashboard contexts

## Accessibility

### Current Accessibility Features
- Semantic HTML structure with proper div containers
- Inherits accessibility features from the underlying `TimeLineChart` component

### Recommended Enhancements
```tsx
<StoryVelocity 
  storyId="story-id"
  role="img"
  aria-label={`Story velocity chart for ${storyTitle}`}
  className="focus:outline-none focus:ring-2 focus:ring-pgBlue-500 focus:ring-offset-2"
/>
```

### ARIA Considerations
- Consider adding `aria-describedby` linking to explanatory text about velocity metrics
- The `TimeLineChart` should provide appropriate ARIA labels for screen readers
- Loading states should be announced to assistive technologies

## Dependencies

### Internal Dependencies
- **`TimeLineChart`**: Core chart visualization component from `@/components/story/stats/time-line-chart`
- **`useStoryVelocity`**: React Query hook for fetching velocity data from `@/lib/query-hooks`
- **`cn`**: Utility function for conditional className merging from `@/lib/utils/cn`

### Related Components
- **Story Components**: Often used alongside story cards, story lists, and story headers
- **Stats Components**: Part of the story statistics component family
- **Chart Components**: Related to other data visualization components in the system

### External Dependencies
- **React**: Core React functionality and HTMLAttributes
- **React Query**: Underlying data fetching and caching (via useStoryVelocity hook)

### Usage with Related Components
```tsx
import { StoryVelocity } from '@/components/ui/story-velocity';
import { StoryCard } from '@/components/story/story-card';
import { TimelineChart } from '@/components/story/stats/time-line-chart';

// Commonly used together in story dashboards and analytics views
```