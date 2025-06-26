# ThreadAnswer Component

## Purpose

The `ThreadAnswer` component renders an AI assistant's response within a conversational thread, displaying the answer content, citations, suggested next steps, and interactive feedback mechanisms. It serves as the primary container for presenting AI-generated responses with rich formatting, source citations, and user interaction capabilities.

## Component Type

**Client Component** - Uses `'use client'` directive (implied by hooks usage)

This is a client component because it:
- Manages multiple pieces of local state (drawer visibility, feedback selection)
- Handles user interactions (clicks, feedback, regeneration)
- Uses event handlers and callback functions
- Integrates with client-side tracking and toast notifications

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `threadId` | `string` | ✅ | Unique identifier for the conversation thread |
| `answer` | `AnswersThreadAssistantResponseWithOptionalId` | ❌ | The assistant's response data including content and metadata |
| `question` | `string` | ✅ | The original user question that prompted this answer |
| `citations` | `AnswersThreadHistoryItemCitations` | ❌ | Map of citation references used in the answer (defaults to empty Map) |
| `isLatestQnA` | `boolean` | ✅ | Whether this is the most recent Q&A pair in the thread |
| `showNextSteps` | `boolean` | ✅ | Whether to display next step recommendations |
| `isStreaming` | `boolean` | ❌ | Whether the answer is currently being streamed (defaults to false) |
| `excludedItems` | `ExcludedFilterItem[]` | ✅ | Array of items excluded from citation filtering |
| `onExcludedFilterItemsChange` | `(excludedItems: ExcludedFilterItem[]) => void` | ✅ | Callback when excluded filter items change |
| `thinkingBranches` | `BranchItem[]` | ❌ | Array of thinking process branches to display |
| `thinkingDuration` | `ThinkingDuration` | ❌ | Duration information for the thinking process |

## Usage Example

```tsx
import { ThreadAnswer } from '@/components/answers/thread-question-answer-pair/thread-answer';

function ConversationThread() {
  const [excludedItems, setExcludedItems] = useState<ExcludedFilterItem[]>([]);
  
  const answerData = {
    id: 'answer-123',
    content: 'Based on the latest research, artificial intelligence...',
    suggestions: [
      {
        type: NextStepActionType.SEARCH,
        title: 'Learn more about AI applications',
        query: 'AI applications in healthcare'
      }
    ],
    traceId: 'trace-456',
    hasCitations: true
  };

  const citations = new Map([
    [1, {
      id: 'cite-1',
      title: 'AI Research Paper',
      url: 'https://example.com/paper',
      snippet: 'Recent advances in AI...'
    }]
  ]);

  return (
    <ThreadAnswer
      threadId="thread-789"
      question="What are the latest developments in AI?"
      answer={answerData}
      citations={citations}
      isLatestQnA={true}
      showNextSteps={true}
      isStreaming={false}
      excludedItems={excludedItems}
      onExcludedFilterItemsChange={setExcludedItems}
      thinkingBranches={[
        { id: 'branch-1', content: 'Analyzing AI research trends...' }
      ]}
      thinkingDuration={{ startTime: Date.now() - 5000, endTime: Date.now() }}
    />
  );
}
```

## Functionality

### Core Features
- **Answer Rendering**: Displays AI-generated content with markdown formatting
- **Citation Management**: Shows inline citations and manages citation drawer
- **Interactive Feedback**: Provides positive/negative feedback buttons with tracking
- **Content Actions**: Copy, regenerate, and report issue functionality
- **Next Steps**: Displays AI-suggested follow-up actions and questions
- **Source Management**: Shows cited sources with filtering capabilities
- **Responsive Layout**: Adapts layout based on screen size (desktop/mobile)

### Interactive Elements
- Citation links that open detailed source drawer
- Feedback buttons for user rating
- Copy button for answer content
- Regenerate button for new responses
- Story cards for featured content recommendations

## State Management

### Local State (useState)
- `isCitedSourceDrawerOpen`: Controls citation sources drawer visibility
- `selectedFeedback`: Tracks user feedback selection ('positive' | 'negative' | null)

### TanStack Query
- `useUserDetails()`: Fetches current user information for admin features
- `useStoriesListWithPageInfo()`: Conditionally fetches featured story data when story ID exists

### Context Dependencies
- `useAskQuestion()`: Provides shared mode state and regeneration functionality
- `useUsageContext()`: Accesses chat usage limits for UI state
- `useReportIssueDialog()`: Manages issue reporting dialog state

## Side Effects

### Tracking Hooks
- `useTrackCitedSourceDrawerOpened`: Tracks when users open citation drawer
- `useTrackArticleViewed`: Tracks article/source interactions
- `useTrackPrimarySuggestionClick`: Tracks featured card clicks
- `useTrackSecondarySuggestionClick`: Tracks next step recommendation clicks

### Feedback Mutations
- `useFeedback().createFeedback`: Submits positive feedback to backend
- Report issue dialog integration for negative feedback

### Toast Notifications
- Success/error feedback using `useToast()` hook

## Dependencies

### UI Components
- `ThreadAnswerMarkdown`: Renders formatted answer content
- `ThreadThinking`: Displays AI thinking process
- `FeaturedCard`/`FeaturedSkeleton`: Featured story recommendations
- `NextSteps`: Follow-up suggestions and actions
- `AnswersThreadSourceBuilder`: Citation source management
- `AnswersThreadChatCitedSourcesDrawer`: Detailed citation drawer

### Utility Components
- `CopyButton`, `PositiveFeedback`, `NegativeFeedback`: Action buttons
- `RegenerateButton`: Answer regeneration
- `TraceLink`: Admin debugging link

### Hooks
- `useBreakpoint`: Responsive design detection
- Custom tracking hooks for analytics
- Form and feedback management hooks

## Integration

### Thread Architecture
- Integrates with parent thread components for conversation flow
- Manages answer-specific state while participating in thread-level state
- Coordinates with citation filtering system across thread

### Analytics Integration
- Comprehensive interaction tracking for product analytics
- Feedback collection for AI response quality monitoring
- User behavior tracking for UX optimization

### Content Management
- Works with citation remapping system for clean content copying
- Integrates with story recommendation engine
- Manages source exclusion filtering

## Best Practices

### Architecture Adherence
- ✅ **Proper Component Decomposition**: Well-structured with clear separation of concerns
- ✅ **State Management**: Appropriate use of local state, TanStack Query, and contexts
- ✅ **Reusability**: Leverages UI components from `/ui/` directory
- ✅ **Responsive Design**: Uses breakpoint hooks for adaptive layouts

### Performance Considerations
- Conditional data fetching based on actual needs (story data)
- Memoized callbacks to prevent unnecessary re-renders
- Efficient citation mapping and content processing

### User Experience
- Progressive disclosure with collapsible sections
- Loading states for async operations
- Comprehensive feedback mechanisms
- Accessibility support through tooltip providers

### Code Quality
- Type-safe props with comprehensive interfaces
- Clean separation of concerns across sub-components
- Consistent error handling and edge case management
- Clear callback naming and organization