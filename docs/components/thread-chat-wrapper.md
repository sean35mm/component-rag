# AnswersThreadChatWrapper Component

## Purpose

The `AnswersThreadChatWrapper` component provides a complete chat interface layout for the Answers feature, including message display, input controls, and filter functionality. It manages the visual structure and scroll behavior for threaded conversations while providing floating input controls and scroll-to-bottom functionality.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- DOM manipulation and refs for scroll control
- Layout effects for scroll positioning
- Resize observers for responsive behavior
- Interactive elements (scroll buttons, input handling)

## Props Interface

### AnswersThreadChatWrapper

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | Additional CSS classes for styling |
| `children` | `ReactNode \| ReactNode[]` | No | Chat messages or content to display |
| `counter` | `number` | Yes | Number for filter counter display |
| `isScrollOnInit` | `boolean` | No | Whether to scroll to bottom on initial load (default: `true`) |
| `onFiltersDrawerOpen` | `() => void` | Yes | Callback when filters drawer should open |
| `onQuestionSubmit` | `(question: string) => void` | Yes | Callback when user submits a question |

### AnswersThreadChatWrapperContainer

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | Additional CSS classes for styling |
| `children` | `ReactNode \| ReactNode[]` | No | Content to display in the chat area |
| `input` | `ReactNode` | No | Input component to render |
| `inputHeight` | `number` | Yes | Height of the input area in pixels |
| `parentDivRef` | `RefObject<HTMLDivElement \| null>` | No | Ref to parent container for scroll control |
| `chatsRemaining` | `number \| null` | No | Number of remaining chat messages allowed |

### AnswersThreadChatWrapperFallback

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | Additional CSS classes for styling |
| `children` | `ReactNode \| ReactNode[]` | No | Fallback content to display |

## Usage Example

```tsx
import { AnswersThreadChatWrapper } from '@/components/answers/thread-chat-wrapper';
import { ChatMessage } from '@/components/answers/chat-message';

function AnswersPage() {
  const [messages, setMessages] = useState([]);
  const [filterCount, setFilterCount] = useState(3);

  const handleQuestionSubmit = (question: string) => {
    // Process new question
    setMessages(prev => [...prev, { type: 'question', content: question }]);
  };

  const handleFiltersOpen = () => {
    // Open filters drawer
    setFiltersDrawerOpen(true);
  };

  return (
    <AnswersThreadChatWrapper
      counter={filterCount}
      onQuestionSubmit={handleQuestionSubmit}
      onFiltersDrawerOpen={handleFiltersOpen}
      className="h-full"
    >
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
    </AnswersThreadChatWrapper>
  );
}

// Fallback usage during loading
function LoadingState() {
  return (
    <AnswersThreadChatWrapperFallback>
      <div className="flex items-center justify-center p-8">
        <Spinner />
      </div>
    </AnswersThreadChatWrapperFallback>
  );
}
```

## Functionality

### Core Features
- **Responsive Layout**: Adapts input positioning and sizing for desktop/mobile
- **Scroll Management**: Auto-scroll to bottom with manual scroll detection
- **Floating Input**: Sticky input area with backdrop blur effects
- **Usage Limits**: Displays chat limit banner when quota is reached
- **Filter Integration**: Includes filter button with counter display
- **Smooth Animations**: Framer Motion animations for entrance and interactions

### Scroll Behavior
- Initial scroll to bottom on component mount (configurable)
- Floating scroll-to-bottom button when not at bottom
- Smooth scrolling with offset calculations
- Resize observer integration for layout changes

### Input Area
- Fixed height input with responsive max-width
- Integrated filter button and chat input
- Usage limit integration with banner display
- Backdrop blur and shadow effects

## State Management

### Zustand Stores
- **`useAnswersThreadChatStore`**: Manages chat questions and state
- **`useUsageContext`**: Tracks remaining chat quota

### Local State
- Scroll behavior refs for smooth/instant scrolling
- Resize observer for responsive adjustments
- Breakpoint detection for layout changes

## Side Effects

### Layout Effects
- **Initial Scroll**: Positions view at bottom of conversation on mount
- **Scroll Calculation**: Computes proper offset based on element margins
- **Behavior Toggle**: Switches from instant to smooth scrolling after initial load

### Observers
- **Resize Observer**: Monitors container size changes
- **Scroll Detection**: Tracks user scroll position for button visibility

## Dependencies

### Components
- `AnswersChatInput`: Main chat input component
- `ChatLimitBanner`: Usage limit notification
- `AnswersThreadFilterButton`: Filter controls with counter
- `PiArrowDownLine`: Scroll button icon

### Hooks
- `useBreakpoint`: Responsive design detection
- `useChatScrollControl`: Scroll position management
- `useTabContainer`: Container ref access
- `useResizeObserver`: Size change detection

### External Libraries
- `framer-motion`: Animations and transitions
- `merge-refs`: Ref combination utility

## Integration

### Application Architecture
- **Feature Component**: Domain-specific for Answers functionality
- **Layout Provider**: Manages chat interface structure
- **Context Integration**: Connects to usage and chat state systems
- **Responsive Design**: Adapts to breakpoint system

### Data Flow
```
Parent Component
    ↓ (messages, handlers)
AnswersThreadChatWrapper
    ↓ (layout structure)
AnswersThreadChatWrapperContainer
    ↓ (input components)
[AnswersChatInput, FilterButton]
```

## Best Practices

### Architectural Adherence
- ✅ **Client Component Usage**: Properly uses 'use client' for DOM interactions
- ✅ **Component Decomposition**: Separates container, main, and fallback concerns
- ✅ **State Management**: Leverages Zustand for feature state
- ✅ **Hook Integration**: Uses custom hooks for scroll and responsive behavior

### Performance Optimizations
- **Ref Merging**: Efficiently combines multiple refs
- **Animation Control**: Manages smooth vs instant scroll behavior
- **Resize Handling**: Responsive to layout changes
- **Conditional Rendering**: Shows elements based on state (scroll button, limit banner)

### Accessibility
- **Keyboard Navigation**: Scroll button supports keyboard interaction
- **Semantic Structure**: Proper container hierarchy
- **Visual Feedback**: Clear hover states and transitions
- **Screen Reader**: Proper button labeling for scroll controls