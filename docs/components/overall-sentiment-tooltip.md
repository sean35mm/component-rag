# OverallSentimentTooltip Component

## Purpose

The `OverallSentimentTooltip` component displays a comprehensive sentiment analysis breakdown in a tooltip format. It visualizes the distribution of positive, negative, and neutral sentiment percentages across all articles within a story, providing users with an at-a-glance understanding of the overall emotional tone of the content.

## Component Type

**Server Component** - This is a pure presentation component that renders static content based on props. It doesn't require browser APIs, event handlers, or client-side state, making it suitable for server-side rendering to improve performance and SEO.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `sentiment` | `SentimentHolder` | Yes | Object containing sentiment probabilities for positive, negative, and neutral classifications |

### Type Definitions

```tsx
interface SentimentHolder {
  positive: number;
  negative: number;
  neutral: number;
}
```

## Usage Example

```tsx
import { OverallSentimentTooltip } from '@/components/story/content/overall-sentiment-tooltip';

// Basic usage within a Tooltip trigger
function StoryHeader({ story }) {
  const sentimentData = {
    positive: 0.65,
    negative: 0.20,
    neutral: 0.15
  };

  return (
    <div className="story-header">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm">
            <SentimentIcon />
            Sentiment Analysis
          </Button>
        </TooltipTrigger>
        <OverallSentimentTooltip sentiment={sentimentData} />
      </Tooltip>
    </div>
  );
}

// Usage with dynamic sentiment data
function ArticleAnalytics({ articles }) {
  const aggregatedSentiment = useMemo(() => 
    calculateOverallSentiment(articles), [articles]
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="sentiment-indicator">
          View Sentiment Breakdown
        </div>
      </TooltipTrigger>
      <OverallSentimentTooltip sentiment={aggregatedSentiment} />
    </Tooltip>
  );
}
```

## Functionality

### Core Features

- **Sentiment Visualization**: Displays horizontal bar charts representing sentiment distribution
- **Percentage Formatting**: Converts probability values (0-1) to readable percentages
- **Color-Coded Display**: Uses distinct colors for each sentiment type for visual clarity
- **Responsive Layout**: Adapts to tooltip constraints with proper spacing and typography

### Visual Elements

- **Progress Bars**: Width-based visualization of sentiment percentages
- **Color Mapping**: 
  - Positive: `bg-pgBackgroundBlueTintDark`
  - Negative: `bg-pgNeutral-500`
  - Neutral: `bg-pgNeutral-300`
- **Typography Hierarchy**: Clear labeling with appropriate font weights and colors

## State Management

**No State Management Required** - This component is purely presentational and stateless. It receives all necessary data through props and renders static content. Any sentiment data management would be handled by parent components using:

- **TanStack Query**: For fetching sentiment analysis from APIs
- **Computed Values**: For aggregating sentiment across multiple articles

## Side Effects

**No Side Effects** - The component performs no API calls, DOM manipulation, or external interactions. It's a pure rendering component that transforms props into UI elements.

## Dependencies

### Internal Dependencies
- `@/components/ui/tooltip` - TooltipContent for container styling
- `@/components/ui/typography` - Typography component for consistent text styling
- `@/lib/types` - SentimentHolder type definition
- `@/lib/utils/cn` - Utility for conditional class name composition

### External Dependencies
- `React` - Core React library for component structure

## Integration

### Application Architecture Role

```
Story Management
├── Story List/Grid
├── Story Detail View
│   ├── Story Header
│   │   └── Sentiment Indicator → OverallSentimentTooltip
│   ├── Article List
│   └── Analytics Dashboard
└── Content Analysis Pipeline
```

### Data Flow Integration

```tsx
// Typical integration pattern
function StoryAnalytics() {
  // TanStack Query for server state
  const { data: storyData } = useQuery({
    queryKey: ['story', storyId],
    queryFn: fetchStoryWithSentiment
  });

  return (
    <div className="analytics-panel">
      <Tooltip>
        <TooltipTrigger>
          <SentimentSummary />
        </TooltipTrigger>
        <OverallSentimentTooltip 
          sentiment={storyData.aggregatedSentiment} 
        />
      </Tooltip>
    </div>
  );
}
```

## Best Practices

### Architecture Adherence

✅ **Server Component Pattern**: Correctly implemented as a server component for optimal performance

✅ **Component Decomposition**: Single responsibility focused on sentiment display

✅ **Reusability**: Generic enough to work with any SentimentHolder data

✅ **UI Component Integration**: Properly utilizes design system components

### Implementation Best Practices

✅ **Type Safety**: Full TypeScript integration with proper interfaces

✅ **Accessibility**: Uses semantic HTML with proper ARIA considerations via Typography component

✅ **Performance**: Lightweight with no unnecessary computations

✅ **Maintainability**: Clear separation of constants, utilities, and component logic

### Usage Recommendations

- **Data Validation**: Ensure sentiment probabilities sum to approximately 1.0
- **Error Handling**: Implement fallbacks in parent components for missing sentiment data
- **Responsive Design**: Consider tooltip positioning on mobile devices
- **Performance**: Memoize sentiment calculations in parent components when dealing with large datasets

### Exported Utilities

The component exports utility functions and constants for broader application use:

```tsx
import { 
  formatSentiment, 
  SENTIMENT_LABELS, 
  SENTIMENT_COLORS 
} from '@/components/story/content/overall-sentiment-tooltip';

// Use in other sentiment-related components
const percentage = formatSentiment(0.75); // Returns 75
const label = SENTIMENT_LABELS.positive; // Returns "Positive"
const colorClass = SENTIMENT_COLORS.negative; // Returns "bg-pgNeutral-500"
```