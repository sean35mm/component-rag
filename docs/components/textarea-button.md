# AnswersTextAreaButton Component

## Purpose

The `AnswersTextAreaButton` component is a specialized button designed to control AI answer generation within textarea interfaces. It dynamically displays different states: a submit arrow when ready to send, a stop icon during streaming responses, and a loading spinner when stopping the stream. This component provides users with clear visual feedback and control over AI response generation.

## Component Type

**Client Component** - This component requires client-side interactivity to handle button clicks and respond to real-time state changes during AI streaming operations. The dynamic icon switching and user interactions necessitate client-side rendering.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isStreaming` | `boolean` | ✅ | Indicates whether an AI response is currently being streamed |
| `isStopping` | `boolean` | ✅ | Indicates whether the streaming process is in the process of being stopped |
| `className` | `string` | ❌ | Additional CSS classes to apply to the button |
| `...props` | `ComponentPropsWithoutRef<'button'>` | ❌ | All standard HTML button attributes (onClick, disabled, etc.) |

## Usage Example

```tsx
'use client';

import { useState } from 'react';
import { AnswersTextAreaButton } from '@/components/answers/textarea-button';

function ChatInterface() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [isStopping, setIsStopping] = useState(false);

  const handleSubmit = async () => {
    if (isStreaming) {
      // Stop the current stream
      setIsStopping(true);
      await stopAIStream();
      setIsStreaming(false);
      setIsStopping(false);
    } else {
      // Start a new AI response
      setIsStreaming(true);
      await startAIStream();
      setIsStreaming(false);
    }
  };

  return (
    <div className="relative">
      <textarea 
        placeholder="Ask a question..."
        className="w-full p-4 pr-12 border rounded-lg"
      />
      <div className="absolute bottom-2 right-2">
        <AnswersTextAreaButton
          isStreaming={isStreaming}
          isStopping={isStopping}
          onClick={handleSubmit}
          disabled={isStopping}
          className="text-blue-600"
        />
      </div>
    </div>
  );
}
```

## Functionality

### Core Features
- **Dynamic Icon Display**: Automatically switches between three icons based on current state
  - Arrow up circle: Ready to submit/send
  - Stop circle: Currently streaming (allows user to stop)
  - Loading spinner: In process of stopping the stream
- **Accessibility**: Proper focus management with visible focus rings
- **Responsive Design**: Fixed size (36px) with flexible positioning
- **State-Aware Styling**: Visual feedback through hover states and disabled states

### Visual States
1. **Idle State**: Shows arrow up icon, ready for user input
2. **Streaming State**: Shows stop icon, allows interruption of AI response
3. **Stopping State**: Shows spinning loader, indicates transition period

## State Management

**Local State (Component Props)** - This component is purely presentational and receives its state through props. The parent component manages the actual streaming state using:
- React `useState` for immediate UI state
- TanStack Query for AI streaming operations and server state
- Zustand store for global chat/answer session state

```tsx
// Typical parent component state management
const { mutate: generateAnswer, isPending } = useMutation({
  mutationFn: generateAIAnswer,
  onSuccess: () => setIsStreaming(false)
});
```

## Side Effects

**No Direct Side Effects** - This component is purely presentational and doesn't perform any side effects directly. All side effects are handled by parent components:
- API calls for AI generation
- WebSocket connections for streaming
- State updates in global stores

## Dependencies

### Internal Dependencies
- `@/components/icons` - Icon components (IconArrowUpCircle, PiLoader3Line, PiStopCircleLine)
- `@/lib/utils/cn` - Utility for conditional className merging

### React Dependencies
- `forwardRef` - For ref forwarding to the underlying button element
- `ComponentPropsWithoutRef<'button'>` - TypeScript utility for button props

### No External Libraries
- Uses native HTML button element
- Leverages Tailwind CSS for styling

## Integration

### Application Architecture Integration
- **Feature Domain**: Part of the answers feature domain (`/components/answers/`)
- **UI Layer**: Acts as a specialized UI component for AI interfaces
- **Form Integration**: Commonly used within form contexts with React Hook Form
- **Chat Systems**: Integrates with chat interfaces and AI response systems

### Common Integration Patterns
```tsx
// With React Hook Form
const { handleSubmit } = useForm();

<form onSubmit={handleSubmit(onSubmit)}>
  <textarea {...register('question')} />
  <AnswersTextAreaButton 
    isStreaming={isStreaming}
    isStopping={isStopping}
    type="submit"
  />
</form>
```

## Best Practices

### Architectural Compliance
✅ **Component Decomposition**: Single responsibility - only handles button UI state  
✅ **Reusability**: Generic enough for any textarea/AI interface context  
✅ **Props Interface**: Clear, typed interface with logical prop groupings  
✅ **Ref Forwarding**: Properly implements forwardRef for DOM access  

### Usage Recommendations
1. **Always provide both state props**: Both `isStreaming` and `isStopping` should be controlled
2. **Handle disabled state**: Disable button during `isStopping` to prevent multiple actions
3. **Provide click handlers**: Always implement `onClick` to handle state transitions
4. **Position appropriately**: Typically positioned absolutely within a relative container
5. **Accessibility**: Ensure proper ARIA labels for screen readers when implementing

### Performance Considerations
- Lightweight component with minimal re-renders
- Icon switching is CSS-based with no heavy operations
- Animations use CSS transforms for optimal performance