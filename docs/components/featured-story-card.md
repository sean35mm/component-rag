# FeaturedStoryCard Component

## Purpose

The `FeaturedStoryCard` component renders a comprehensive story card within the "next steps" recommendations section. It displays story details including title, image, summary, source citations, timeline chart, and navigation controls. This component serves as a key entry point for users to discover and navigate to detailed story views from answer pages.

## Component Type

**Client Component** - Uses `'use client'` directive due to:
- Interactive click handlers and navigation
- Router hooks (`useRouter`) for programmatic navigation
- Resize observer for dynamic layout adjustments
- Complex state management with multiple data fetching hooks

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `item` | `StoryNextStepRecommendation` | Yes | Story recommendation object containing story data and metadata |
| `onClick` | `(item: StoryNextStepRecommendation) => Promise<void>` | No | Optional callback executed before navigation for analytics/tracking |

## Usage Example

```tsx
import { FeaturedStoryCard } from '@/components/answers/next-steps/featured-story-card';

function NextStepsSection({ recommendations }: { recommendations: StoryNextStepRecommendation[] }) {
  const handleStoryClick = async (item: StoryNextStepRecommendation) => {
    // Track story engagement
    await analytics.track('story_card_clicked', {
      storyId: item.story.id,
      source: 'next_steps'
    });
  };

  return (
    <div className="grid gap-4">
      {recommendations.map((recommendation) => (
        <FeaturedStoryCard
          key={recommendation.story.id}
          item={recommendation}
          onClick={handleStoryClick}
        />
      ))}
    </div>
  );
}
```

## Functionality

### Core Features
- **Story Display**: Renders story title, summary, and featured image
- **Source Visualization**: Shows citation bubbles and source count
- **Timeline Chart**: Displays story velocity/activity over time
- **Smart Layout**: Dynamically adjusts summary text based on title height
- **Navigation**: Handles clicks with optional callback and router navigation
- **Loading States**: Shows skeleton while data is fetching

### Visual Elements
- Story badge indicating content type
- Responsive image with fallback placeholder
- Citation bubbles from top sources
- Formatted source count with number abbreviation
- Timeline visualization chart
- Last updated timestamp
- Call-to-action with arrow icon

## State Management

### TanStack Query Usage
- **Sources Data**: Fetches source information for citation bubbles
  ```tsx
  const { data: sourcesData, isLoading: isLoadingSources } = useSources({
    domain: domainUniquenessByTwoTopLevels(story?.uniqueSources || []).slice(0, 10)
  });
  ```

- **Velocity Data**: Retrieves story activity timeline
  ```tsx
  const { data: velocities, isLoading: isLoadingVelocities } = useStoryVelocity({
    clusterId: story.id
  });
  ```

### Local State
- **Layout State**: Uses resize observer to track title height for responsive design
- **Computed Values**: Memoized story href and formatted data

## Side Effects

### Data Fetching
- Automatically fetches source data based on story's unique sources
- Retrieves velocity data for timeline visualization
- Both queries are enabled conditionally based on story availability

### Navigation
- Prevents default link behavior to execute callback first
- Programmatically navigates using Next.js router after callback completion

### Dynamic Layout
- Observes title element height to adjust summary line clamping
- Extends summary display when title is single line

## Dependencies

### UI Components
- `BaseFeaturedCard` - Layout wrapper component
- `FeatureBadge` - Story type indicator
- `ImageWithFallback` - Responsive image with error handling
- `Typography` - Consistent text styling
- `CitationBubbleListBase` - Source citation display
- `TimeLineChart` - Story velocity visualization

### Hooks & Utilities
- `useSources` - Source data fetching
- `useStoryVelocity` - Timeline data fetching
- `useImagePlaceholder` - Fallback image generation
- `useResizeObserver` - Layout dimension tracking
- `getStoryHref` - URL generation utility
- `formatDataShort` - Date formatting
- `nFormatter` - Number abbreviation

### External Libraries
- Next.js navigation (`useRouter`, `NextLink`)
- React hooks for state and effects

## Integration

### Answer Flow Integration
- Embedded within next steps recommendation sections
- Provides transition from answer content to related stories
- Supports analytics tracking through onClick callback

### Story Ecosystem
- Links to detailed story pages via generated URLs
- Integrates with story data models and APIs
- Shares visual patterns with other story components

### Data Dependencies
- Requires story recommendation data from parent components
- Fetches supplementary data (sources, velocities) independently
- Handles loading and error states gracefully

## Best Practices

### Architecture Compliance
- ✅ **Appropriate Client Component**: Uses client-side features responsibly
- ✅ **Component Decomposition**: Leverages BaseFeaturedCard for layout consistency
- ✅ **TanStack Query**: Proper server state management with conditional queries
- ✅ **Reusable UI Components**: Utilizes components from /ui/ directory

### Performance Patterns
- **Memoization**: Expensive computations cached with useMemo
- **Conditional Queries**: Data fetching enabled only when needed
- **Optimized Re-renders**: Proper dependency arrays in hooks
- **Image Optimization**: Uses Next.js Image with fallbacks

### User Experience
- **Loading States**: Skeleton component during data fetching
- **Responsive Design**: Adaptive layout based on content
- **Accessible Navigation**: Proper link semantics and keyboard support
- **Visual Hierarchy**: Clear information architecture with typography variants

### Code Quality
- **Type Safety**: Full TypeScript integration with proper interfaces
- **Error Handling**: Graceful fallbacks for missing data
- **Separation of Concerns**: Clear distinction between presentation and data logic
- **Testable Structure**: Isolated side effects and pure rendering logic