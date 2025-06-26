# ResultsOverTime Component Documentation

## Purpose

The `ResultsOverTime` component renders an interactive timeline chart displaying article publishing data over time. It visualizes search results with a line/area chart and includes story markers for specific events, providing users with insights into content publishing patterns and allowing them to explore stories at specific time points.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Interactive chart functionality with hover states and click handlers
- Local state management for active dates and animation states
- Mouse event handling for chart interactions
- Browser-specific APIs for responsive chart rendering

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `data` | `IntervalArticleCounts[]` | Optional | Array of article count data points over time intervals |
| `stories` | `StandardSearchResult<StoryWithPageInfoAndSelectedArticles>` | Optional | Collection of stories to display as markers on the timeline |
| `isLoading` | `boolean` | Optional | Loading state indicator |
| `onStoryClick` | `(story: StoryWithPageInfoAndSelectedArticles) => void` | Optional | Callback function when a story marker is clicked |
| `isSplitByHour` | `boolean` | Required | Whether data is grouped by hour or day intervals |
| `isStale` | `boolean` | Optional | Whether data is stale (affects animation playback), defaults to `true` |
| `statsBar` | `ReactNode` | Optional | Additional statistics display element |
| `widget` | `ReactNode` | Optional | Additional widget element for the header |
| `className` | `string` | Optional | Additional CSS classes |

## Usage Example

```tsx
import { ResultsOverTime } from '@/components/search/results-over-time';

function SearchResultsPage() {
  const [selectedStory, setSelectedStory] = useState<StoryWithPageInfoAndSelectedArticles | null>(null);
  
  const { data: timelineData, isLoading } = useQuery({
    queryKey: ['timeline', searchQuery],
    queryFn: () => fetchTimelineData(searchQuery)
  });

  const { data: stories } = useQuery({
    queryKey: ['stories', searchQuery],
    queryFn: () => fetchStories(searchQuery)
  });

  return (
    <div className="space-y-4">
      <ResultsOverTime
        data={timelineData?.intervals}
        stories={stories}
        isLoading={isLoading}
        isSplitByHour={false}
        onStoryClick={(story) => setSelectedStory(story)}
        statsBar={
          <span className="text-sm text-gray-600">
            {timelineData?.totalCount} articles found
          </span>
        }
        widget={
          <FilterDropdown />
        }
      />
      
      {selectedStory && (
        <StoryDetails story={selectedStory} />
      )}
    </div>
  );
}
```

## Functionality

### Core Features
- **Interactive Timeline Chart**: Line and area chart showing article counts over time
- **Story Markers**: Visual indicators on the timeline for significant stories
- **Responsive Design**: Adapts layout and interactions for mobile/desktop
- **Custom Tooltips**: Detailed information on hover with smart positioning
- **Animation System**: Smooth chart animations with playback control
- **Time Granularity**: Support for both hourly and daily time intervals

### Interactive Elements
- **Hover States**: Chart cursor with story previews and data tooltips
- **Click Handlers**: Story selection through timeline markers
- **Smart Positioning**: Tooltip positioning that adapts to screen boundaries
- **Mobile Optimization**: Touch-friendly interactions and simplified UI

### Visual Components
- **Custom Cursor**: Dashed line indicator with story highlighting
- **Story Icons**: Interactive chart symbols for story events
- **Gradient Fill**: Visual area chart with custom styling
- **Responsive Axes**: Adaptive tick marks and labels based on screen size

## State Management

### Local State (useState)
- `activeDate`: Currently highlighted date on the timeline
- `isPlaying`: Animation playback state for chart transitions
- Internal hover states for interactive elements

### Refs (useRef)
- `isOutside`: Tracks mouse position relative to chart area

### Effects (useEffect)
- Automatic story selection based on latest story data
- Story click callbacks triggered by mobile interactions
- Date change notifications for tooltip updates

## Side Effects

- **Story Auto-Selection**: Automatically selects the most recent story when data loads
- **Animation Callbacks**: Triggers animation state changes during chart transitions
- **Mouse Event Handling**: Manages hover states and click interactions
- **Responsive Updates**: Adapts chart layout based on screen size changes

## Dependencies

### Internal Dependencies
- `useBreakpoint`: Responsive design hook for mobile detection
- `ArrowTrendUp`: Icon component for timeline header
- `Typography`: Text styling component
- `LineChartPlaceholder`: Loading state placeholder component

### External Dependencies
- **Recharts**: Chart rendering library (`ComposedChart`, `Area`, `Line`, `Tooltip`, etc.)
- **date-fns**: Date manipulation and formatting utilities
- **React**: Core hooks for state management and effects

### Type Dependencies
- `IntervalArticleCounts`: Data structure for timeline points
- `StandardSearchResult`: Search result container type
- `StoryWithPageInfoAndSelectedArticles`: Story data structure

## Integration

### Search Architecture
- Integrates with search result pages to visualize temporal patterns
- Works alongside other search components for comprehensive result display
- Supports filtering and query refinement through story selection

### Data Flow
```
Search Query → Timeline Data + Stories → ResultsOverTime → Story Selection → Detail Views
```

### Event Handling
- Propagates story selections to parent components
- Coordinates with other search result components
- Maintains selection state across component updates

## Best Practices

### Component Architecture Adherence
- ✅ **Client Component Usage**: Appropriately uses client-side rendering for interactive features
- ✅ **Flat Composition**: Individual sub-components for cursor, tooltip, and axis elements
- ✅ **Props Interface**: Clear, well-typed props with optional/required distinctions
- ✅ **State Separation**: Local state for UI interactions, external state for data

### Performance Considerations
- **Animation Control**: Manages chart animations to prevent performance issues
- **Responsive Optimization**: Different rendering strategies for mobile vs desktop
- **Event Debouncing**: Prevents excessive re-renders during mouse interactions

### Accessibility
- **Keyboard Navigation**: Chart elements support interaction patterns
- **Screen Reader Support**: Semantic structure with proper ARIA attributes
- **Color Contrast**: Uses design system colors for accessibility compliance

### Integration Patterns
- **Callback Props**: Uses standard React callback patterns for event handling
- **Conditional Rendering**: Graceful loading and empty states
- **Responsive Design**: Mobile-first approach with desktop enhancements

## Exported Components

- `ResultsOverTime`: Main timeline chart component
- `CustomCursor`: Interactive chart cursor element
- `CustomizedAxisTick`: Custom X-axis tick component
- `CustomTooltip`: Smart positioning tooltip component
- `StoryIcon`: Interactive story marker component
- `TOOLTIP_WIDTH`: Constant for tooltip width calculations