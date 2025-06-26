# AnswersChatInputInner Component

## Purpose

The `AnswersChatInputInner` component is an internal UI component that renders the actual input interface for chat functionality in the answers feature. It provides a styled textarea with an animated icon indicator and handles the visual presentation of the chat input field, including focus states and transitions.

## Component Type

**Client Component** - Uses the `'use client'` directive because it needs to handle DOM interactions, focus events, and animations for the textarea and icon transitions.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `classNames` | `{ wrapper?: string; textarea?: string }` | No | Custom CSS classes for styling the wrapper div and textarea elements |
| `isActive` | `boolean` | Yes | Controls the visual state of the input, affecting icon visibility and textarea padding |
| `textareaProps` | `Omit<ComponentPropsWithoutRef<'textarea'>, 'className'>` | No | Standard textarea HTML attributes (excluding className) |
| `textareaRef` | `ForwardedRef<HTMLTextAreaElement>` | No | React ref for the textarea element |
| `children` | `ReactNode` | No | Additional elements to render inside the wrapper (e.g., submit button) |
| `...other` | `Omit<ComponentPropsWithoutRef<'div'>, 'className'>` | No | Standard div HTML attributes (excluding className) |

## Usage Example

```tsx
import { useRef, useState } from 'react';
import { AnswersChatInputInner } from '@/components/answers/chat-input/chat-input-inner';
import { SendButton } from '@/components/ui/send-button';

function ChatInput() {
  const [inputValue, setInputValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    setIsActive(e.target.value.length > 0);
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      // Handle message submission
      console.log('Sending message:', inputValue);
      setInputValue('');
      setIsActive(false);
    }
  };

  return (
    <AnswersChatInputInner
      isActive={isActive}
      textareaRef={textareaRef}
      textareaProps={{
        value: inputValue,
        onChange: handleInputChange,
        placeholder: "Ask a question...",
        rows: 1,
        onKeyDown: (e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }
      }}
      classNames={{
        wrapper: "max-w-4xl mx-auto",
        textarea: "min-h-[48px]"
      }}
    >
      <SendButton 
        onClick={handleSubmit}
        disabled={!inputValue.trim()}
        className="absolute right-4"
      />
    </AnswersChatInputInner>
  );
}
```

## Functionality

- **Animated Input States**: Provides smooth transitions between active and inactive states
- **Icon Animation**: The `ElbowLine` icon smoothly transitions in/out based on the `isActive` prop
- **Dynamic Padding**: Textarea padding adjusts based on active state to accommodate the icon
- **Focus Styling**: Enhanced visual feedback with border color changes and shadow effects on focus
- **Flexible Content**: Supports children elements (typically action buttons) positioned within the input
- **Responsive Design**: Adapts spacing and sizing for different screen sizes
- **Accessibility**: Maintains proper focus management and semantic structure

## State Management

This component uses **no internal state management** - it's a controlled component that relies on:

- **Props for State**: All state is managed by parent components through props
- **Ref Forwarding**: Exposes textarea ref for parent components to control focus and selection
- **Event Delegation**: Delegates all interaction events to parent components via `textareaProps`

## Side Effects

- **CSS Transitions**: Manages smooth animations for icon visibility and textarea padding
- **Focus Events**: Handles visual state changes on textarea focus/blur
- **No External Calls**: Pure UI component with no API interactions or external side effects

## Dependencies

- **Icons**: `@/components/icons` - Uses `ElbowLine` icon component
- **Utilities**: `@/lib/utils/cn` - For conditional CSS class concatenation
- **React**: `forwardRef`, `ComponentPropsWithoutRef` for proper TypeScript integration

## Integration

This component fits into the answers feature architecture as:

- **UI Layer Component**: Pure presentation component in the UI layer
- **Controlled Input**: Designed to be controlled by parent chat components
- **Part of Chat System**: Integrates with larger chat/answers functionality
- **Reusable**: Can be used across different chat interfaces in the answers domain
- **Composable**: Designed to work with various button and action components as children

## Best Practices

✅ **Follows Architecture Guidelines**:
- **Client Component Usage**: Appropriately uses client-side rendering for DOM interactions
- **Flat Composition**: Simple, flat component structure without unnecessary nesting
- **Forward Refs**: Proper ref forwarding for parent component control
- **TypeScript Integration**: Strong typing with proper prop interfaces
- **Controlled Component**: Follows controlled component pattern for predictable behavior

✅ **UI Component Patterns**:
- **Single Responsibility**: Focused solely on input presentation
- **Flexible Styling**: Supports custom styling through `classNames` prop
- **Responsive Design**: Mobile-first responsive design patterns
- **Accessibility**: Maintains semantic HTML structure and focus management