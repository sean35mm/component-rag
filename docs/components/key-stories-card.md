# KeyStoriesCard Component

## Purpose

The `KeyStoriesCard` component displays a compact, interactive card for individual stories within signal details. It presents key story information including title, dates, velocity trends, source attribution, and citation bubbles in a clickable card format. This component serves as a preview and navigation element for accessing full story details.

## Component Type

**Client Component** - Uses `'use client'` directive because it:
- Implements interactive click handlers
- Uses responsive breakpoint detection with `useBreakpoint`
- Manages hover states and visual transitions
- Requires client-side date formatting based on viewport size

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `story` | `StoryWithPageInfo` | Yes | Story data object containing id, name, dates, and source information |
| `onClick` | `() => void` | No | Callback function executed when the card is clicked |

## Usage Example

```tsx
import { KeyStoriesCard } from '@/components/signals/details/key-stories-card';

function SignalStoriesList({ stories }: { stories: StoryWithPageInfo[] }) {
  const router = useRouter();

  const handleStoryClick = (storyId: string) => {
    router.push(`/stories/${storyId}`);
  };

  return (
    <div className="space-y-3">
      {stories.map((story) => (
        <KeyStoriesCard
          key={story.id}
          story={story}
          onClick={() => handleStoryClick(story.id)}
        />
      ))}
    </div>
  );
}
```

## Functionality

- **Story Preview**: Displays story title, initialization date, and last updated time
- **Velocity Visualization**: Shows story momentum through interactive timeline chart
- **Source Attribution**: Presents citation bubbles for top sources and total source count
- **Responsive Design**: Adapts layout and content based on screen size (desktop vs mobile)
- **Interactive Navigation**: Provides clickable interface with hover states for story access
- **Content Truncation**: Implements line clamping for long story titles to maintain consistent card height

## State Management

**TanStack Query Integration**:
- `useStoryVelocity`: Fetches story momentum data for timeline visualization
- `useSources`: Retrieves source information for citation bubble generation
- Both queries use optimized selectors to extract only necessary data (`res.results`)

**Local State**:
- `useMemo` for computed values (source parameters, citation bubbles, formatted dates)
- Responsive breakpoint detection via `useBreakpoint` hook

## Side Effects

- **API Calls**: 
  - Story velocity data fetching based on cluster ID
  - Source information retrieval for citation display
- **Date Formatting**: Client-side relative date calculation with responsive formatting
- **Citation Processing**: Dynamic citation bubble generation from source data

## Dependencies

**UI Components**:
- `Typography` - Text rendering with consistent styling
- `CitationBubbleListBase` - Source attribution display
- `TimeLineChart` - Story velocity visualization

**Hooks & Utilities**:
- `useBreakpoint` - Responsive design detection
- `useSources`, `useStoryVelocity` - Data fetching hooks
- `buildCitationBubbles` - Citation processing utility
- `formatRelativeDateWithMaxTime` - Date formatting utility

**External Libraries**:
- `date-fns/format` - Date formatting operations

## Integration

This component integrates into the signals detail view architecture:

- **Parent Context**: Used within signal detail pages to display associated stories
- **Navigation Flow**: Cards serve as entry points to individual story detail views
- **Data Flow**: Consumes story data from parent signal queries and enriches with additional API calls
- **Design System**: Follows established card patterns with hover states and responsive behavior

## Best Practices

✅ **Architectural Adherence**:
- **Client Component Justification**: Properly uses client directive for interactive functionality
- **Component Decomposition**: Leverages existing UI components (`Typography`, `TimeLineChart`, `CitationBubbleListBase`)
- **Query Optimization**: Uses selectors to extract only needed data from API responses
- **Memoization**: Optimizes expensive computations (citation building, date formatting)

✅ **Performance Patterns**:
- Limits source processing to first 3 domains for citation bubbles
- Implements responsive data loading (different chart sizes for mobile/desktop)
- Uses efficient dependency arrays in `useMemo` hooks

✅ **User Experience**:
- Provides immediate visual feedback with hover states
- Maintains consistent card heights through content truncation
- Adapts content density based on viewport size

✅ **Data Management**:
- Follows TanStack Query patterns for server state
- Implements proper error boundaries through query hook defaults
- Uses type-safe interfaces for all data structures