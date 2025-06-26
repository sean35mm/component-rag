# Placeholder Component

## Purpose

The `Placeholder` component provides dynamic placeholder text for the omnibar editor input field. It displays contextual hints that cycle through various example queries to guide users on what they can search for or ask, with different behaviors based on the current workflow and system settings.

## Component Type

**Client Component** - Uses `'use client'` because it requires:
- React hooks (`useState`, `useEffect`, `useRef`, `useCallback`)
- Browser APIs (`document.visibilityState`, event listeners)
- Real-time state updates and animations
- Zustand store subscriptions for reactive updates

## Props Interface

This component accepts no props - it's a self-contained component that derives all its data from global state and browser context.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| None | - | - | Component operates entirely through global state |

## Usage Example

```tsx
import { Placeholder } from '@/components/omnibar/omni-editor/placeholder';

// Basic usage in omni-editor
function OmniEditor() {
  return (
    <div className="relative">
      <input 
        type="text" 
        className="w-full p-4"
        // other input props
      />
      <Placeholder />
    </div>
  );
}

// The component automatically adapts based on:
// - Current workflow (STORY vs others)
// - Animation preferences
// - Screen size
// - Tab visibility
```

## Functionality

### Core Features

- **Dynamic Text Cycling**: Rotates through 6 predefined example queries every 3 seconds
- **Workflow-Aware**: Shows different placeholder text for STORY workflow vs general workflows
- **Responsive Typography**: Adjusts text size based on screen breakpoint (desktop vs mobile)
- **Smooth Animations**: Uses Framer Motion for enter/exit transitions
- **Performance Optimized**: Pauses animation when tab is not visible

### Animation States

- **Static Mode**: Shows fixed placeholder text (for STORY workflow or when animations disabled)
- **Animated Mode**: Cycles through example queries with smooth transitions
- **Pause/Resume**: Automatically pauses when tab loses focus, resumes when visible

### Responsive Behavior

```tsx
// Typography adjusts based on screen size
<Typography
  variant={isDesktop ? 'paragraphLarge' : 'paragraphMedium'}
  color='400'
>
```

## State Management

### Zustand Store Integration

```tsx
// Subscribes to omnibar store for reactive updates
const currentWorkflow = useOmnibarStore((state) => state.currentWorkflow);
const isDisablePlaceholderAnimation = useOmnibarStore(
  (state) => state.isDisablePlaceholderAnimation
);
```

### Local State

- `currentPlaceholderIndex`: Tracks which placeholder text to display
- `intervalRef`: Manages the cycling timer for cleanup and control

## Side Effects

### Timer Management

- **Interval Setup**: Creates 3-second intervals for text cycling
- **Cleanup**: Properly clears intervals on unmount and workflow changes
- **Visibility API**: Pauses/resumes based on tab visibility to conserve resources

### Event Listeners

```tsx
useEffect(() => {
  const handleVisibilityChange = () => {
    if (document.visibilityState !== 'visible') {
      // Pause animation
    } else {
      // Resume animation
    }
  };
  
  document.addEventListener('visibilitychange', handleVisibilityChange);
  return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
}, []);
```

## Dependencies

### Hooks & Utilities

- `useBreakpoint('lg')`: Responsive design hook for desktop detection
- `useOmnibarStore`: Zustand store for omnibar state
- `cva`: Class variance authority for styling
- `motion`/`AnimatePresence`: Framer Motion for animations

### UI Components

- `Typography`: Design system component for consistent text rendering

### Constants & Types

- `OMNI_WORKFLOWS`: Workflow type definitions
- `placeholderTexts`: Array of example queries

## Integration

### Omnibar Architecture

```
OmniEditor (Parent)
├── Input Field
├── Placeholder (This Component)
├── Suggestions
└── Other Editor Components
```

### Store Dependencies

The component is tightly integrated with the omnibar store, reacting to:
- Workflow changes (triggers placeholder reset)
- Animation preferences (enables/disables cycling)
- Global UI state

### Positioning

Uses absolute positioning (`absolute left-0 top-0.5`) to overlay the input field without affecting layout.

## Best Practices

### ✅ Architectural Adherence

- **Client Component Usage**: Properly identified as client component due to interactivity needs
- **State Management**: Uses Zustand for global state, local state only for component-specific concerns
- **Performance**: Implements proper cleanup and pause/resume logic
- **Responsive Design**: Adapts to breakpoints using design system patterns

### ✅ Code Quality

- **Separation of Concerns**: Logic separated into utility functions (`getPlaceholderText`)
- **Type Safety**: Proper TypeScript usage with workflow types
- **Memory Management**: Proper interval cleanup and event listener removal
- **Accessibility**: Uses semantic typography components

### ✅ Performance Optimizations

```tsx
// Memoized callback to prevent unnecessary re-renders
const startAnimation = useCallback(() => {
  // Animation logic
}, [isDisablePlaceholderAnimation, currentWorkflow]);

// Visibility API integration for resource conservation
const handleVisibilityChange = () => {
  if (document.visibilityState !== 'visible') {
    clearInterval(intervalRef.current);
  }
};
```

### ✅ Maintainability

- **Configurable**: Easy to modify placeholder texts and timing
- **Testable**: Pure functions and clear state management
- **Extensible**: Easy to add new workflows or animation patterns