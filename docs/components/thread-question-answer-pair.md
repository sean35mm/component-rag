# AnswersThreadQuestionAnswerPair Component

## Purpose

The `AnswersThreadQuestionAnswerPair` component renders a complete question-answer interaction pair within an answers thread. It combines question display, answer content with citations, and interactive elements like filters and regeneration controls. This component serves as the core building block for displaying conversational AI interactions in the answers feature.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages responsive breakpoint detection with `useBreakpoint`
- Handles dynamic styling based on viewport calculations
- Processes user interactions for filtering and regeneration
- Requires access to browser APIs for layout calculations

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `threadId` | `string` | ✅ | Unique identifier for the thread containing this Q&A pair |
| `pair` | `QnAPair` | ✅ | The question-answer data object (extends `AnswersThreadHistoryItem`) |
| `excludedItems` | `ExcludedFilterItem[]` | ✅ | Array of items currently excluded from filtering |
| `isLatestQnA` | `boolean` | ✅ | Whether this is the most recent Q&A pair in the thread |
| `isStreaming` | `boolean` | ❌ | Whether the answer is currently being streamed (default: `false`) |
| `citations` | `AnswersThreadHistoryItemCitations` | ❌ | Map of citations referenced in the answer (default: empty Map) |
| `onExcludedFilterItemsChange` | `(excludedItems: ExcludedFilterItem[]) => void` | ✅ | Callback fired when filter exclusions change |
| `thinkingBranches` | `BranchItem[]` | ❌ | Branches of thinking process data for display |
| `thinkingDuration` | `ThinkingDuration` | ❌ | Duration information for thinking process |

## Usage Example

```tsx
import { AnswersThreadQuestionAnswerPair } from '@/components/answers/thread-question-answer-pair/thread-question-answer-pair';

function AnswersThread() {
  const [excludedItems, setExcludedItems] = useState<ExcludedFilterItem[]>([]);
  
  return (
    <div>
      {qnaPairs.map((pair, index) => (
        <AnswersThreadQuestionAnswerPair
          key={pair.id}
          threadId="thread-123"
          pair={pair}
          excludedItems={excludedItems}
          isLatestQnA={index === qnaPairs.length - 1}
          isStreaming={index === qnaPairs.length - 1 && isGenerating}
          citations={pair.citations}
          onExcludedFilterItemsChange={setExcludedItems}
          thinkingBranches={pair.thinkingBranches}
          thinkingDuration={pair.thinkingDuration}
        />
      ))}
    </div>
  );
}
```

## Functionality

### Core Features
- **Question Display**: Renders the user's question using `ThreadQuestion` component
- **Answer Rendering**: Displays AI response with citations using `ThreadAnswer` component
- **Citation Processing**: Remaps IEEE-style citations for proper display
- **Responsive Layout**: Adapts layout and sizing based on screen size
- **Interactive Elements**: Provides filtering controls and regeneration options

### Dynamic Styling
- **Viewport Height Calculation**: Adjusts minimum height based on public/private thread status
- **Responsive Breakpoints**: Different layouts for desktop (`lg`) vs mobile
- **Conditional Spacing**: Varies spacing based on streaming state and position

### Visual Indicators
- **Mile Markers**: Shows error states and filter updates
- **Dividers**: Separates Q&A pairs when appropriate
- **Loading States**: Displays skeletons during streaming

## State Management

### Local State
- **Memoized Citations**: Uses `useMemo` to process citation remapping efficiently
- **Dynamic Styling**: Computes responsive styles based on component state

### External State Dependencies
- **Access Token Context**: Determines public vs private thread behavior
- **Breakpoint Hook**: Manages responsive layout changes
- **Filter State**: Managed by parent component, passed down via props

## Side Effects

### Layout Effects
- **Viewport Calculations**: Dynamically calculates minimum heights based on screen size
- **Responsive Rendering**: Conditionally renders elements based on breakpoint detection

### User Interactions
- **Filter Management**: Updates excluded items through callback prop
- **Regeneration Triggers**: Enables answer regeneration for latest Q&A pairs

## Dependencies

### Internal Components
- `ThreadQuestion` - Displays the user's question
- `ThreadAnswer` - Renders the AI response with citations
- `ThreadChatDivider` - Visual separator between Q&A pairs
- `ThreadChatMileMarker` - Status indicators for errors/updates
- `Skeleton` - Loading state placeholders

### Hooks & Utilities
- `useBreakpoint` - Responsive design management
- `useAccessToken` - Authentication and permission context
- `remapIEEECitations` - Citation formatting utility
- `cn` - Conditional className utility

### Types & Stores
- `AnswersThreadHistoryItem` - Core data structure
- `BranchItem`, `ThinkingDuration` - Thinking process data
- `ExcludedFilterItem` - Filter management types

## Integration

### Thread Architecture
```
AnswersThread (Parent)
├── AnswersThreadQuestionAnswerPair (This Component)
│   ├── ThreadQuestion
│   ├── ThreadAnswer
│   │   ├── Citation processing
│   │   ├── Next steps
│   │   └── Source builder
│   ├── ThreadChatDivider
│   └── ThreadChatMileMarker
└── Filter management
```

### Data Flow
1. Parent thread component manages Q&A pairs array
2. Each pair rendered with this component
3. Citations processed and remapped for display
4. Filter changes propagated back to parent
5. Responsive layout adjustments applied

## Best Practices

### Component Architecture Adherence
- ✅ **Flat Composition**: Uses direct child components without deep nesting
- ✅ **Single Responsibility**: Focused on Q&A pair rendering and layout
- ✅ **Prop Interface**: Clear, well-typed props with sensible defaults
- ✅ **Responsive Design**: Mobile-first with progressive enhancement

### Performance Optimizations
- ✅ **Memoization**: Citations and styling calculations memoized
- ✅ **Conditional Rendering**: Only renders necessary UI elements
- ✅ **Fallback Component**: Provides efficient loading state

### State Management
- ✅ **Minimal Local State**: Uses memoization instead of unnecessary state
- ✅ **Props Down, Events Up**: Clear data flow pattern
- ✅ **Context Usage**: Leverages existing contexts appropriately

### Error Handling
- ✅ **Error States**: Handles and displays error conditions
- ✅ **Fallback UI**: Provides skeleton loading states
- ✅ **Graceful Degradation**: Works with partial data