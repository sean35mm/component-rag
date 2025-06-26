# StoryCard Component

## Purpose

The `StoryCard` component renders an interactive card displaying a news story with its metadata, statistics, and source information. It's designed for use in featured content areas and story listings, providing users with a visual preview of story content including trend charts, citation bubbles, and navigation capabilities.

## Component Type

**Client Component** - Uses the `'use client'` directive due to:
- Interactive click handlers requiring browser events
- Next.js router navigation with `useRouter`
- Real-time data fetching with TanStack Query hooks
- Dynamic state management for loading and error states

## Props Interface

### StoryCard Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `storyPath` | `string` | Yes | URL path to the story following the pattern `/category/yyyy/mm/dd/slug` |
| `onClick` | `(title: string) => Promise<void>` | Yes | Async callback function executed when the card is clicked, receives story title |

### StoryCardContent Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `story` | `StoryWithPageInfoAndSelectedArticles` | Yes | Complete story object with pagination info and selected articles |
| `onClick` | `(title: string) => Promise<void>` | Yes | Async callback function for click handling |

## Usage Example

```tsx
import { StoryCard } from '@/components/home/featured-cards/story-card';

// Basic usage in a featured stories section
function FeaturedStories() {
  const handleStoryClick = async (title: string) => {
    // Track analytics or perform other side effects
    await analytics.track('story_viewed', { title });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StoryCard 
        storyPath="/politics/2024/01/15/election-update"
        onClick={handleStoryClick}
      />
      <StoryCard 
        storyPath="/technology/2024/01/14/ai-breakthrough"
        onClick={handleStoryClick}
      />
    </div>
  );
}

// Usage with direct story data
function StoryGrid({ stories }: { stories: StoryWithPageInfoAndSelectedArticles[] }) {
  const handleClick = async (title: string) => {
    console.log(`Navigating to story: ${title}`);
  };

  return (
    <>
      {stories.map((story) => (
        <StoryCardContent 
          key={story.id}
          story={story}
          onClick={handleClick}
        />
      ))}
    </>
  );
}
```

## Functionality

- **URL Parsing**: Validates and parses story paths using Zod schema validation
- **Story Loading**: Fetches story data based on parsed URL parameters
- **Visual Statistics**: Displays trend charts showing story velocity over time
- **Source Citations**: Shows citation bubbles for story sources with count display
- **Image Handling**: Displays story or article images with fallback logic
- **Navigation**: Handles click-to-navigate functionality with custom callback support
- **Loading States**: Provides skeleton loading states during data fetching
- **Error Handling**: Graceful handling of missing or invalid stories

## State Management

**TanStack Query** for server state management:
- `useStoriesWithPageInfoAndSelectedArticles` - Fetches story data with pagination
- `useSources` - Retrieves source information for citation bubbles
- `useStoryVelocity` - Gets trend data for timeline charts

**Local State**:
- `useMemo` for computed values (URL parsing, citations, source counts)
- `useCallback` for optimized event handlers

## Side Effects

- **Navigation**: Programmatic routing using Next.js `useRouter`
- **Analytics**: Custom `onClick` callback for tracking user interactions
- **API Calls**: Multiple parallel queries for story data, sources, and velocity metrics
- **Data Transformation**: URL parsing and citation bubble generation

## Dependencies

### Core Dependencies
- `next/navigation` - Router functionality
- `zod` - URL schema validation
- `react` - Hooks and component lifecycle

### Internal Components
- `TimeLineChart` - Story velocity visualization
- `CitationBubbleListBase` - Source citation display
- `BaseCard` - Shared card layout component
- `Typography` - Text styling component

### Query Hooks
- `useStoriesWithPageInfoAndSelectedArticles`
- `useSources`
- `useStoryVelocity`

### Utilities
- `formatDataShort` - Date formatting
- `domainUniquenessByTwoTopLevels` - Source domain processing
- `getStoryHref` - URL generation
- `nFormatter` - Number formatting

## Integration

The `StoryCard` fits into the application architecture as:

- **Featured Content**: Primary component for homepage story showcases
- **Story Lists**: Reusable element in various story collection views
- **Navigation Hub**: Entry point for story detail pages
- **Analytics Integration**: Data collection point for user engagement metrics

## Best Practices

✅ **Follows Architecture Guidelines**:
- Uses TanStack Query for server state management
- Implements proper component decomposition with `StoryCard` and `StoryCardContent`
- Leverages Zod for robust input validation
- Maintains flat component hierarchy

✅ **Performance Optimizations**:
- `useMemo` for expensive computations (URL parsing, citation building)
- `useCallback` for stable event handlers
- Conditional query enabling based on data availability
- Efficient data selection with query `select` options

✅ **Error Handling**:
- Graceful degradation for invalid URLs
- Loading states during data fetching
- Fallback content for missing stories

✅ **Accessibility**:
- Semantic HTML structure through `BaseCard`
- Proper image alt text handling
- Screen reader friendly typography components

## Exports

```tsx
export const newsUrlSchema; // Zod schema for URL validation
export function StoryCard(props: StoryCardProps);
export function StoryCardContent(props: StoryCardContentProps);
```