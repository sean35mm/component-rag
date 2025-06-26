# ThreadTimeline Component

## Purpose

The `ThreadTimeline` component renders a visual timeline of AI thinking steps for question-answer threads. It displays sequential branches of thought processes with loading states and duration indicators, providing users with insight into the AI's reasoning progression.

## Component Type

**Client Component** - Uses the `'use client'` directive because it handles user interaction feedback and potentially manages animation states based on the `prefersReducedMotion` prop.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `branches` | `BranchItem[]` | Optional | Array of thinking process branches to display in the timeline |
| `duration` | `ThinkingDuration` | Optional | Duration information for the thinking process |
| `prefersReducedMotion` | `boolean \| null` | Required | User's motion preference setting for accessibility |

## Usage Example

```tsx
import { ThreadTimeline } from '@/components/answers/thread-question-answer-pair/thread-thinking/timeline';
import { useAnswersThreadChatStore } from '@/lib/stores/answers-thread-chat-store';

function ThinkingDisplay() {
  const { currentThinking } = useAnswersThreadChatStore();
  const prefersReducedMotion = useReducedMotion();

  return (
    <ThreadTimeline
      branches={currentThinking?.branches}
      duration={currentThinking?.duration}
      prefersReducedMotion={prefersReducedMotion}
    />
  );
}
```

## Functionality

- **Timeline Visualization**: Renders a vertical timeline showing AI thinking progression
- **Branch Display**: Maps through thinking branches and renders each with proper indexing
- **Loading States**: Shows appropriate loading skeletons when content is still being generated
- **Accessibility**: Respects user motion preferences for animations
- **Conditional Rendering**: Handles both populated and empty branch states gracefully

## State Management

- **No Direct State**: Component is stateless and receives data through props
- **External State**: Likely consumes data from `answers-thread-chat-store` (Zustand store)
- **Prop-Driven**: All rendering decisions based on passed props

## Side Effects

- **No Direct Side Effects**: Pure rendering component
- **Animation Effects**: May trigger CSS animations/transitions based on `prefersReducedMotion`
- **Layout Effects**: Renders connecting lines and visual timeline elements

## Dependencies

### Components
- `Branch` - Individual thinking step component
- `DurationLoadingSkeleton` - Loading state for duration display
- `LoadingConnectorLine` - Visual connector between timeline elements

### Types
- `BranchItem` from `answers-thread-chat-store/types`
- `ThinkingDuration` from global types

### Stores
- Indirectly depends on `answers-thread-chat-store` for data structure

## Integration

The component fits into the question-answer thread architecture:

```
ThreadQuestionAnswerPair
  └── ThreadThinking
      └── ThreadTimeline ← Current component
          ├── Branch (multiple)
          ├── DurationLoadingSkeleton
          └── LoadingConnectorLine
```

- **Parent Context**: Part of the thread thinking display system
- **Data Flow**: Receives thinking data from parent components that connect to chat store
- **UI Layer**: Presentation component focused on timeline visualization

## Best Practices

✅ **Component Decomposition**: Properly decomposed with separate `Branch` and loading components

✅ **Client Component Usage**: Correctly uses client component for interactive/animated content

✅ **Props Interface**: Clean, typed interface with optional props for flexible usage

✅ **Conditional Rendering**: Handles both loaded and loading states appropriately

✅ **Accessibility**: Includes motion preference handling for inclusive design

✅ **Separation of Concerns**: Focuses solely on timeline presentation, delegates branch logic to child components

✅ **State Management**: Follows pattern of receiving state through props rather than directly accessing stores

The component exemplifies good React patterns with clear responsibility boundaries and proper handling of loading states and accessibility concerns.