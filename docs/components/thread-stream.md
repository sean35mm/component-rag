# ThreadStream Component

## Purpose

The `ThreadStream` component serves as a specialized wrapper that renders real-time streaming question-answer pairs in a chat thread. It bridges the streaming state from the Zustand store with the display layer, specifically handling the presentation of ongoing conversations with live answer generation, thinking processes, and citation management.

## Component Type

**Client Component** - Uses the `'use client'` directive (inherited from Zustand store usage) because it:
- Consumes real-time streaming state from `useAnswersThreadChatStore`
- Manages interactive filtering and citation handling
- Requires client-side reactivity for live updates during answer streaming

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `threadId` | `string` | Yes | Unique identifier for the chat thread being displayed |
| `excludedItems` | `ExcludedFilterItem[]` | Yes | Array of filter items to exclude from the stream display |
| `onExcludedFilterItemsChange` | `(excludedItems: ExcludedFilterItem[]) => void` | Yes | Callback function triggered when excluded filter items are modified |

## Usage Example

```tsx
import { ThreadStream } from '@/components/answers/thread-question-answer-pair/thread-stream';
import { ExcludedFilterItem } from '@/lib/types';

function ChatInterface() {
  const [excludedItems, setExcludedItems] = useState<ExcludedFilterItem[]>([]);
  
  const handleFilterChange = (newExcludedItems: ExcludedFilterItem[]) => {
    setExcludedItems(newExcludedItems);
    // Optional: Persist to user preferences
    saveUserFilterPreferences(newExcludedItems);
  };

  return (
    <div className="chat-container">
      <ThreadStream
        threadId="thread-abc123"
        excludedItems={excludedItems}
        onExcludedFilterItemsChange={handleFilterChange}
      />
    </div>
  );
}

// Integration with streaming session
function StreamingChatSession({ sessionId }: { sessionId: string }) {
  const { excludedFilters, updateExcludedFilters } = useFilterPreferences();
  
  return (
    <ThreadStream
      threadId={sessionId}
      excludedItems={excludedFilters}
      onExcludedFilterItemsChange={updateExcludedFilters}
    />
  );
}
```

## Functionality

### Core Features
- **Real-time Stream Rendering**: Displays live question-answer pairs as they stream
- **Thinking Process Visualization**: Shows AI thinking branches and duration
- **Citation Management**: Handles display of citations with filtering capabilities
- **Error Handling**: Gracefully displays streaming errors when they occur
- **Conditional Rendering**: Only renders when stream data is available

### Stream State Integration
- Automatically reflects current streaming question and answer content
- Displays metadata and trace information for debugging and analytics
- Handles citation count and availability indicators
- Manages streaming status and loading states

## State Management

### Zustand Store Integration
```tsx
// Consumes multiple pieces of streaming state
const stream = useAnswersThreadChatStore((state) => state.stream);
const thinkingBranches = useAnswersThreadChatStore((state) => state.thinkingBranches);
const thinkingDuration = useAnswersThreadChatStore((state) => state.thinkingDuration);
```

**State Dependencies:**
- `stream`: Core streaming data (question, answer, metadata, citations)
- `thinkingBranches`: AI reasoning process visualization data
- `thinkingDuration`: Performance metrics for thinking time

**Parent State Management:**
- Receives `excludedItems` from parent component's state management
- Delegates filter changes through `onExcludedFilterItemsChange` callback

## Side Effects

### Reactive Updates
- Automatically re-renders when streaming state changes in the Zustand store
- Triggers parent callbacks when filter exclusions are modified
- Updates citation display based on real-time citation data

### No Direct Side Effects
- Does not perform API calls directly (handled by store)
- Does not manage persistent storage (delegated to parent)
- Purely reactive to state changes

## Dependencies

### Internal Dependencies
```tsx
import { useAnswersThreadChatStore } from '@/lib/contexts';
import { ExcludedFilterItem } from '@/lib/types';
import { AnswersThreadQuestionAnswerPair } from './thread-question-answer-pair';
```

### Component Hierarchy
- **Child Component**: `AnswersThreadQuestionAnswerPair` - Handles actual Q&A pair rendering
- **Store Dependency**: `useAnswersThreadChatStore` - Provides streaming state
- **Type Dependency**: `ExcludedFilterItem` - Defines filter structure

## Integration

### Application Architecture Role
```
Chat Interface
├── ThreadStream (current component)
│   └── AnswersThreadQuestionAnswerPair
│       ├── Question display
│       ├── Answer display with streaming
│       ├── Citation management
│       └── Thinking process visualization
└── Thread management controls
```

### Data Flow
1. **Streaming Service** → Updates Zustand store with real-time data
2. **ThreadStream** → Consumes store state and transforms for display
3. **AnswersThreadQuestionAnswerPair** → Renders the actual UI
4. **User Interactions** → Flow back through callbacks to parent state

## Best Practices

### Architecture Adherence
- ✅ **Proper State Management**: Uses Zustand for client-side streaming state
- ✅ **Component Decomposition**: Delegates rendering to specialized child component
- ✅ **Separation of Concerns**: Focuses solely on state-to-props transformation
- ✅ **Reusability**: Accepts configuration through props for different thread contexts

### Performance Considerations
```tsx
// Efficient state selection - only subscribes to needed state slices
const stream = useAnswersThreadChatStore((state) => state.stream);
const thinkingBranches = useAnswersThreadChatStore((state) => state.thinkingBranches);
```

### Error Handling
```tsx
// Graceful handling of missing stream data
if (!stream) return null;
```

### Integration Patterns
- Accepts filter state from parent for flexible state management
- Provides callback interface for state updates
- Maintains thread-specific context through `threadId` prop