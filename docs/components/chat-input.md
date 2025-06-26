# AnswersChatInput

## Purpose

The `AnswersChatInput` component provides an intelligent, auto-resizing chat input interface for the Answers feature. It handles message submission, streaming chat interactions, and provides visual feedback for chat limitations. The component automatically adjusts its height based on content and supports both submitting new questions and aborting streaming responses.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Interactive event handlers (keyboard, focus, blur)
- Local state management for input value and UI states
- DOM manipulation for dynamic height calculations
- Real-time streaming chat interactions
- Browser APIs (ResizeObserver, window.getComputedStyle)

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | `undefined` | Additional CSS classes for styling |
| `placeholder` | `string` | No | `"Follow-up question?"` | Placeholder text displayed in the input |
| `onSubmit` | `(value: string) => void` | Yes | - | Callback function called when user submits a message |
| `chatsRemaining` | `number \| null` | No | `undefined` | Number of remaining chats allowed, disables input when 0 |

## Usage Example

```tsx
import { AnswersChatInput } from '@/components/answers/chat-input';

function ChatInterface() {
  const handleSubmit = (message: string) => {
    console.log('User submitted:', message);
    // Process the message
  };

  return (
    <div className="chat-container">
      <AnswersChatInput
        className="border-t bg-white"
        placeholder="Ask a follow-up question..."
        onSubmit={handleSubmit}
        chatsRemaining={5}
      />
    </div>
  );
}

// In a chat thread with streaming capability
function AnswersThread() {
  const { askQuestion } = useAskQuestion();
  
  return (
    <AnswersChatInput
      onSubmit={(question) => askQuestion(question)}
      chatsRemaining={chatsRemaining}
    />
  );
}
```

## Functionality

### Core Features
- **Auto-resizing Textarea**: Automatically adjusts height from 1 to 5 rows based on content
- **Smart Height Calculation**: Uses shadow DOM elements for precise height measurements
- **Streaming Chat Support**: Handles both message submission and stream abortion
- **Keyboard Shortcuts**: Enter to submit, Shift+Enter for new lines
- **Visual State Management**: Different styles for active/expanded states
- **Chat Limitations**: Respects remaining chat quotas

### Interactive Elements
- **Expand/Collapse Button**: Shows when textarea expands beyond single row
- **Submit/Stop Button**: Dual-purpose button for submission and stream abortion
- **Focus Management**: Visual feedback for active input state

### Responsive Behavior
- Adapts button positioning for different screen sizes
- Maintains consistent UX across desktop and mobile devices

## State Management

### Local State (useState)
- `value`: Current textarea input value
- `isActive`: Focus state for styling and behavior changes
- `abortRequested`: Tracks if user requested stream abortion

### Zustand Store (useAnswersThreadChatStore)
- `streamingMessageUuid`: ID of currently streaming message
- `isStreaming`: Global streaming state

### TanStack Query (useMutation)
- `abortChat`: Mutation for stopping streaming responses
- Handles loading states and success callbacks

## Side Effects

### Height Synchronization
- **ResizeObserver**: Monitors textarea resize events
- **useEffect**: Syncs height calculations when dependencies change
- **DOM Manipulation**: Directly modifies element styles for performance

### Stream Management
- **Abort Handling**: Manages transition from abort request to completion
- **State Cleanup**: Resets abort state when streaming ends

### Performance Optimizations
- Uses `useCallback` for event handlers to prevent unnecessary re-renders
- Memoizes textarea props to avoid recreation on each render

## Dependencies

### UI Components
- `AnswersChatInputInner`: Core textarea wrapper component
- `AnswersTextAreaButton`: Submit/stop action button
- `CompactButton`: Collapse/expand button
- `PiContractUpDownLine`: Icon for expand/collapse functionality

### Hooks & Context
- `useAnswersThreadChatStore`: Global chat state management
- `useAskQuestion`: Chat functionality and stream control
- `useResizeObserver`: Textarea resize detection
- `useMutation`: Stream abortion handling

### Utilities
- `cn`: Class name utility for conditional styling

## Integration

### Answers Architecture
- **Primary Input**: Main interface for user questions in chat threads
- **Stream Integration**: Seamlessly works with streaming chat responses
- **State Coordination**: Integrates with global Answers state management

### Chat Flow Integration
1. User types question → Local state updates
2. User submits → Calls `onSubmit` prop → Triggers chat flow
3. During streaming → Shows abort option
4. Stream completion → Resets to input mode

### Responsive Design
- Adapts to different container sizes
- Maintains consistent behavior across viewports
- Integrates with parent layout systems

## Best Practices

### Architectural Adherence
- ✅ **Proper Client Component Usage**: Only client-side due to interactive requirements
- ✅ **Component Decomposition**: Leverages `AnswersChatInputInner` for core functionality
- ✅ **State Management**: Uses appropriate mix of local state, Zustand, and TanStack Query
- ✅ **Performance**: Implements memoization and callback optimization

### Implementation Patterns
- **Separation of Concerns**: Height calculation logic separated from input handling
- **Error Boundaries**: Graceful handling of missing DOM elements
- **Accessibility**: Proper ARIA attributes and keyboard navigation
- **Type Safety**: Comprehensive TypeScript interfaces and proper typing

### Integration Guidelines
- Always provide meaningful `onSubmit` handler
- Consider chat limitations when implementing
- Integrate with existing Answers state management
- Maintain consistent styling with parent components

## Exported Items

- `getStyleValue`: Utility function for parsing CSS values
- `isTextAreaEmpty`: Type guard for textarea style states
- `MIN_ROWS`, `MAX_ROWS`: Constants for textarea sizing
- `STYLES`: Predefined styles object for internal elements
- `DEFAULT_PLACEHOLDER`: Default placeholder text
- `AnswersChatInput`: Main component export