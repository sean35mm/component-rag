# StoryStats Component Documentation

## Purpose

The `StoryStats` component displays comprehensive statistics for a news story, including article count, source count, publication reach, geographical coverage, posting timeline trends, and last post information. It provides a horizontal scrollable layout of key metrics that help users understand the scope and activity of a story at a glance.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Utilizes responsive breakpoint detection with `useBreakpoint` hook
- Performs date calculations and memoization that require client-side JavaScript
- Integrates with TanStack Query for real-time data fetching
- Handles interactive UI elements like tooltips

## Props Interface

### StoryStatsProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | ❌ | Additional CSS classes for styling customization |
| `story` | `StoryWithPageInfoAndSelectedArticles` | ✅ | Complete story object containing metadata, counts, and geographical data |
| `lastArticle` | `Article \| null` | ✅ | Most recent article in the story for timeline calculations |
| `hideTrend` | `boolean` | ❌ | Flag to hide the trend chart visualization |

### TimeLineChartProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `clusterId` | `string` | ✅ | Unique identifier for the story cluster |
| `isArchived` | `boolean` | ✅ | Whether the story is archived (older than 3 days) |

## Usage Example

```tsx
import { StoryStats } from '@/components/story/stats/stats';
import { StoryWithPageInfoAndSelectedArticles, Article } from '@/lib/types';

function StoryDetail({ story, articles }: { 
  story: StoryWithPageInfoAndSelectedArticles;
  articles: Article[];
}) {
  const lastArticle = articles.length > 0 ? articles[0] : null;
  
  return (
    <div className="story-detail">
      {/* Story header content */}
      
      <StoryStats 
        story={story}
        lastArticle={lastArticle}
        className="border-t border-gray-200"
      />
      
      {/* Story content */}
    </div>
  );
}

// Usage with hidden trend for compact layouts
function CompactStoryCard({ story, lastArticle }: {
  story: StoryWithPageInfoAndSelectedArticles;
  lastArticle: Article | null;
}) {
  return (
    <div className="compact-card">
      <StoryStats 
        story={story}
        lastArticle={lastArticle}
        hideTrend={true}
        className="px-2"
      />
    </div>
  );
}
```

## Functionality

### Core Statistics Display
- **Article Count**: Total number of articles in the story
- **Source Count**: Number of unique news sources covering the story
- **Publication Reach**: Visual indicator of story reach across publications
- **Geographical Coverage**: Country-based coverage visualization when available
- **Last Post Timing**: Relative time since the most recent article

### Responsive Behavior
- Adapts component sizes and typography based on desktop/mobile breakpoints
- Uses horizontal scrolling on mobile for space-constrained layouts
- Adjusts chart and component dimensions for optimal viewing

### Archive Detection
- Automatically determines if a story is archived (older than 3 days)
- Displays "Story° Archived" badge for inactive stories
- Modifies trend chart visualization for archived content

### Dynamic Content
- Conditionally renders coverage section based on available country data
- Shows appropriate last post information based on story status
- Adapts trend visualization based on story activity

## State Management

### TanStack Query Integration
```tsx
const { data: velocities, isLoading, isStale } = useStoryVelocity(
  { clusterId },
  { select: (res) => res.results }
);
```
- Fetches story velocity data for trend visualization
- Handles loading states with skeleton placeholders
- Manages data staleness indicators

### Local State Management
- Uses `useMemo` for expensive calculations (archive status, stats items)
- Leverages `useBreakpoint` for responsive behavior
- Maintains derived state for UI adaptations

## Side Effects

### Data Fetching
- Fetches story velocity data via `useStoryVelocity` hook
- Automatically updates when cluster ID changes
- Handles loading and error states gracefully

### Date Calculations
- Computes relative time distances for last post display
- Determines archive status based on story creation date
- Uses date-fns for consistent date formatting

## Dependencies

### Internal Dependencies
```tsx
// Hooks
import { useBreakpoint } from '@/components/hooks/use-breakpoint';
import { useStoryVelocity } from '@/lib/query-hooks';

// UI Components
import { Skeleton } from '@/components/ui/skeleton';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Typography } from '@/components/ui/typography';

// Feature Components
import { Coverage } from './coverage';
import { Reach } from './reach';
import { TimeLineChart } from './time-line-chart';
```

### External Dependencies
- `date-fns` for date manipulation and formatting
- Custom utilities for styling and formatting

### Type Dependencies
- `Article` and `StoryWithPageInfoAndSelectedArticles` from type definitions
- Internal type definitions for stats item structure

## Integration

### Story Display Architecture
```tsx
Story Page/Component
├── StoryHeader
├── StoryStats ← This component
├── StoryContent
└── StoryArticles
```

### Data Flow Integration
- Receives story data from parent components
- Integrates with global data fetching patterns via TanStack Query
- Communicates story status through visual indicators

### UI System Integration
- Uses design system typography and spacing patterns
- Integrates with tooltip system for enhanced UX
- Follows responsive design patterns established in the app

## Best Practices

### Component Architecture Adherence
✅ **Lego Block Design**: Composed of smaller, focused components (`Coverage`, `Reach`, `TimeLineChart`)  
✅ **Separation of Concerns**: Statistics logic separated from visualization components  
✅ **Reusable Patterns**: Uses established UI components and patterns  
✅ **Client-Side Only When Needed**: Uses client component only for necessary interactivity  

### Performance Optimization
```tsx
const isArchived = useMemo(() => {
  const now = new Date();
  const pubDate = parseISO(story.createdAt);
  return now.getTime() - pubDate.getTime() > THREE_DAYS;
}, [story]);

const items = useMemo<StatsItem[]>(() => {
  // Expensive computation memoized
}, [isDesktop, isArchived, lastArticle, story]);
```

### State Management Best Practices
- Uses TanStack Query for server state (velocity data)
- Leverages derived state patterns with useMemo
- Maintains single source of truth for story data

### Accessibility & UX
- Provides loading states with skeleton components
- Uses semantic markup with proper heading hierarchy
- Implements responsive design for various screen sizes
- Includes tooltips for enhanced information discovery