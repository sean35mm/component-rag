# Typewriter Component

## Purpose

The `Typewriter` component creates an animated typing effect that displays text character by character, simulating a typewriter or terminal interface. It supports text formatting (bold), emoji display, and automatic cycling through multiple text strings with configurable typing speeds and pause durations.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- React hooks (`useState`, `useEffect`, `useCallback`) for animation state management
- Framer Motion animations for character transitions
- Real-time DOM updates for the typewriter effect
- Browser-based timers and intervals

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `texts` | `string[]` | Optional | `undefined` | Array of text strings to cycle through with typewriter effect |
| `typingInterval` | `number` | Optional | `100` | Delay between typing each character (in milliseconds) |
| `backspaceInterval` | `number` | Optional | `50` | Delay between deleting each character (in milliseconds) |
| `pauseDuration` | `number` | Optional | `1000` | Pause duration before starting to delete text (in milliseconds) |

## Usage Example

```tsx
import { Typewriter } from '@/components/answers/thread-question-answer-pair/typewriter';

// Basic usage with multiple texts
export function WelcomeMessage() {
  return (
    <div className="p-4">
      <Typewriter
        texts={[
          "Welcome to our platform!",
          "Ask me /bold(anything) you want to know",
          "I'm here to help! /emoji(🚀)"
        ]}
        typingInterval={80}
        backspaceInterval={40}
        pauseDuration={2000}
      />
    </div>
  );
}

// Single text with formatting
export function LoadingState() {
  return (
    <Typewriter
      texts={["Processing your request... /emoji(⏳)"]}
      typingInterval={120}
    />
  );
}

// Fast typing for notifications
export function NotificationBanner() {
  return (
    <Typewriter
      texts={[
        "Update available!",
        "/bold(New features) are ready"
      ]}
      typingInterval={50}
      backspaceInterval={30}
      pauseDuration={1500}
    />
  );
}
```

## Functionality

### Core Features
- **Animated Typing**: Characters appear progressively with configurable timing
- **Text Cycling**: Automatically cycles through multiple text strings
- **Backspace Animation**: Deletes text character by character before showing next string
- **Text Formatting**: Supports `/bold(text)` syntax for bold text styling
- **Emoji Support**: Renders emojis using `/emoji(🔥)` syntax
- **Blinking Cursor**: Animated cursor that blinks continuously
- **Pause Control**: Configurable pause between typing and deleting phases

### Text Parsing
- Parses special syntax for formatting: `/bold()` and `/emoji()`
- Maintains character-level control for smooth animations
- Preserves whitespace and special characters

### Animation States
- **Typing**: Adding characters progressively
- **Paused**: Waiting before starting deletion
- **Deleting**: Removing characters in reverse order
- **Final State**: Stops at last text in array without deletion

## State Management

**Local State** - Uses React's `useState` for component-specific animation state:

```tsx
interface State {
  textIndex: number;           // Current text being displayed
  displayedCharacters: CharacterInfo[]; // Currently visible characters
  isDeleting: boolean;         // Whether in deletion mode
  isPaused: boolean;          // Whether animation is paused
}
```

The component manages its own animation lifecycle without external state dependencies.

## Side Effects

### Timer Management
- **Typing Intervals**: Uses `setInterval` for character-by-character animation
- **Pause Timeouts**: Uses `setTimeout` for delays between typing and deleting
- **Cleanup**: Properly clears timers to prevent memory leaks

### Animation Lifecycle
- Automatically starts animation when `texts` prop is provided
- Handles component unmounting by clearing active timers
- Manages smooth transitions between different animation states

## Dependencies

### Internal Dependencies
- `@/components/ui/typography` - Typography component for text rendering
- Framer Motion - For character fade-in animations
- React hooks - State and lifecycle management

### External Libraries
- **Framer Motion**: Character-level animations and cursor blinking effect
- **React**: Core functionality and hooks

## Integration

### Application Context
- **Thread Interfaces**: Used in question-answer pairs for dynamic responses
- **Loading States**: Provides engaging feedback during processing
- **Welcome Messages**: Creates interactive first-time user experiences
- **Notifications**: Animates important updates or announcements

### Design System Integration
- Uses Typography component for consistent text styling
- Follows design system color tokens (`text-pgText-600`)
- Responsive and accessible text rendering

## Best Practices

### Architecture Adherence
✅ **Proper Client Component Usage**: Correctly uses `'use client'` for interactive animations  
✅ **Component Decomposition**: Single responsibility for typewriter functionality  
✅ **Performance Optimization**: Uses `useCallback` to prevent unnecessary re-renders  
✅ **Memory Management**: Proper cleanup of intervals and timeouts  

### Implementation Patterns
✅ **Controlled Animation**: Configurable timing parameters for different use cases  
✅ **Graceful Degradation**: Handles empty or undefined text arrays  
✅ **Accessibility**: Uses semantic markup and proper text contrast  
✅ **Responsive Design**: Works across different screen sizes and devices  

### Usage Guidelines
- Use for engagement, not critical information display
- Keep text arrays reasonably sized (3-5 items) for good UX
- Adjust timing based on text length and reading speed
- Consider reduced motion preferences for accessibility
- Test with various text lengths and special characters