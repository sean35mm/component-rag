# StoryContent Component

## Purpose

The `StoryContent` component displays a comprehensive story summary with AI-generated content, including key points, sentiment analysis, and interactive citations. It serves as the main content area for story pages, providing users with a digestible summary of news stories along with metadata like sentiment scoring and source citations.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Interactive event handlers for clicks and user interactions
- Local state management with hooks like `useCallback` and `useMemo`
- Browser-specific APIs for date formatting and user interactions
- Real-time breakpoint detection for responsive behavior

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | ❌ | Optional CSS classes for styling customization |
| `story` | `StoryWithPageInfo` | ✅ | Complete story object containing summary, sentiment, key points, and metadata |

## Usage Example

```tsx
import { StoryContent } from '@/components/story/content/content';

function StoryPage({ story }: { story: StoryWithPageInfo }) {
  return (
    <div className="container mx-auto px-4">
      <StoryContent 
        story={story}
        className="mb-8"
      />
    </div>
  );
}

// Example story data structure
const exampleStory: StoryWithPageInfo = {
  id: "story-123",
  summary: "This is the main story summary...",
  keyPoints: [
    {
      point: "Key insight about the story",
      references: ["article-1", "article-2"]
    }
  ],
  sentiment: {
    positive: 0.3,
    negative: 0.2,
    neutral: 0.5
  },
  summaryReferences: ["article-1", "article-3"],
  updatedAt: "2024-01-15T10:30:00Z"
};
```

## Functionality

### Core Features
- **AI-Generated Summary Display**: Shows the main story summary with AI tag indication
- **Interactive Citations**: Clickable citations that open source drawers with referenced articles
- **Key Points Visualization**: Displays bullet-pointed key insights with individual citations
- **Sentiment Analysis**: Visual sentiment meter with detailed breakdown tooltips
- **Content Copying**: One-click copy functionality for the entire summary and key points
- **Issue Reporting**: Built-in reporting mechanism for content quality feedback
- **Responsive Design**: Adaptive layout for desktop and mobile experiences

### Interactive Elements
- **Citation Bubbles**: Clickable reference indicators that show source articles
- **Sentiment Tooltip**: Detailed sentiment breakdown on hover
- **Copy Button**: Copies formatted content including summary and key points
- **Report Issue**: Opens feedback dialog for content quality issues

### Visual Components
- **Sentiment Meter**: Gradient bar with position indicator showing overall sentiment
- **Timestamp**: Formatted date showing last update in CST timezone
- **Key Points List**: Styled list with sparkle icons and citation support

## State Management

### Local State (Hooks)
- **`useMemo`**: Optimizes expensive calculations for sentiment scoring and key points transformation
- **`useCallback`**: Memoizes event handlers to prevent unnecessary re-renders
- **`useBreakpoint`**: Manages responsive behavior based on screen size

### No External State
- Component operates as a pure display component with no persistent state management
- All data flows down through props from parent components
- State changes trigger parent component updates through callback functions

## Side Effects

### Analytics Tracking
- **Copy Events**: Tracks when users copy story content
- **Citation Interactions**: Monitors clicks on citation bubbles and source references
- **Issue Reporting**: Logs when users report content issues
- **Drawer Opens**: Tracks when cited sources drawer is opened

### User Interactions
- **Dialog Management**: Opens report issue dialogs with contextual information
- **Drawer Navigation**: Triggers cited sources drawer with relevant article data
- **Content Copying**: Handles clipboard operations for story content

## Dependencies

### UI Components
- `AiTag`, `CitationBubbleListFromArticles`, `CopyButton`, `ReportIssueButton`
- `Tooltip`, `TooltipProvider`, `TooltipTrigger`, `Typography`

### Custom Hooks
- `useBreakpoint`: Responsive design management
- `useReportIssueDialog`: Issue reporting functionality
- `useStoryCitedSourcesDrawer`: Citation source management

### External Libraries
- `date-fns/parseISO`: Date parsing and formatting
- React hooks: `useCallback`, `useMemo` for performance optimization

### Analytics & Tracking
- `StoryPageTracker`: Comprehensive event tracking for user interactions

## Integration

### Application Architecture
- **Story Pages**: Primary consumer, renders story content with full interactivity
- **Citation System**: Integrates with drawer components for source exploration
- **Feedback System**: Connects to issue reporting workflows
- **Analytics Pipeline**: Feeds user interaction data to tracking systems

### Data Flow
```
Parent Component (Story Page)
    ↓ (story prop)
StoryContent Component
    ↓ (citation clicks)
StoryCitedSourcesDrawer
    ↓ (issue reports)
ReportIssueDialog
```

## Best Practices

### Architecture Adherence
- ✅ **Component Decomposition**: Uses focused UI components from `/ui/` directory
- ✅ **Client Component Usage**: Appropriately uses client component for interactivity
- ✅ **Performance Optimization**: Implements `useMemo` and `useCallback` for expensive operations
- ✅ **Separation of Concerns**: Analytics, UI, and business logic are properly separated

### Code Quality
- **Type Safety**: Comprehensive TypeScript interfaces and proper typing
- **Error Handling**: Graceful handling of missing or invalid data
- **Accessibility**: Proper semantic HTML and ARIA patterns
- **Responsive Design**: Mobile-first approach with breakpoint-aware rendering

### Integration Patterns
- **Props Interface**: Clean, typed interface following established patterns
- **Event Handling**: Consistent callback patterns for user interactions
- **State Management**: Appropriate use of local state without unnecessary complexity
- **Side Effect Management**: Analytics and user interactions properly isolated

## Exported Constants

```tsx
// Sentiment label mappings
export const SENTIMENT_LABELS: Record<keyof SentimentHolder, string>;

// Sentiment score mappings for visualization
export const SENTIMENT_SCORES: Record<keyof SentimentHolder, number>;

// Main component export
export function StoryContent(props: StoryContentProps);
```