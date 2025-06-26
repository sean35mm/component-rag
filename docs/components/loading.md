# Loading Components

## Purpose

The loading module provides a collection of loading indicators and skeleton components specifically designed for the thread thinking interface. These components create smooth visual feedback during AI reasoning processes, including branch loading states, duration indicators, and completion animations.

## Component Type

**Client Component** - Uses `'use client'` directive because it relies on Framer Motion for animations, DOM manipulation for spinners, and interactive loading states that require browser-side rendering.

## Props Interface

### LeafLoadingSkeleton
No props - renders a fixed skeleton layout.

### LoadingConnectorLine
No props - renders an animated connector line.

### DurationLoadingSkeleton
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `duration` | `ThinkingDuration \| undefined` | No | Duration data containing completion time |
| `branches` | `BranchItem[]` | Yes | Array of branch items for animation timing |
| `prefersReducedMotion` | `boolean \| null` | Yes | User's motion preference for accessibility |

### Spinner
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | Additional CSS classes for styling |

## Usage Example

```tsx
import { 
  LeafLoadingSkeleton, 
  LoadingConnectorLine, 
  DurationLoadingSkeleton, 
  Spinner 
} from '@/components/answers/thread-question-answer-pair/thread-thinking/loading';

// Basic leaf loading state
function ThinkingBranch() {
  return (
    <div className="thinking-branch">
      <LeafLoadingSkeleton />
      <LoadingConnectorLine />
    </div>
  );
}

// Duration with completion state
function ThinkingCompletion({ 
  duration, 
  branches, 
  prefersReducedMotion 
}: {
  duration?: ThinkingDuration;
  branches: BranchItem[];
  prefersReducedMotion: boolean;
}) {
  return (
    <DurationLoadingSkeleton
      duration={duration}
      branches={branches}
      prefersReducedMotion={prefersReducedMotion}
    />
  );
}

// Custom spinner
function CustomLoadingIndicator() {
  return (
    <div className="flex items-center gap-2">
      <Spinner className="size-6" />
      <span>Processing...</span>
    </div>
  );
}
```

## Functionality

### LeafLoadingSkeleton
- Renders placeholder content for thinking process steps
- Shows skeleton for main text and tag-like elements
- Provides consistent loading state appearance

### LoadingConnectorLine
- Animated vertical line connecting timeline elements
- Scales from top to bottom with smooth easing
- Positioned absolutely for timeline alignment

### DurationLoadingSkeleton
- Dual-state component (loading vs. completed)
- Shows spinner during processing
- Displays success indicator with duration on completion
- Includes pulsing animation for visual feedback
- Respects user motion preferences

### Spinner
- 8-segment rotating spinner with staggered animation
- Configurable size and positioning
- Accessible with proper ARIA labels
- Uses CSS transforms for smooth performance

## State Management

**Local State Only** - These components are purely presentational and don't manage application state. They receive their display state through props from parent components that handle the actual data fetching and state management.

## Side Effects

### Animation Effects
- Framer Motion animations for smooth transitions
- CSS keyframe animations for spinner rotation
- Transform-based scaling and opacity changes
- Respects `prefers-reduced-motion` accessibility setting

### Performance Considerations
- Uses `transform-gpu` class for hardware acceleration
- `will-change-transform` for animation optimization
- Staggered animation delays to prevent overwhelming users

## Dependencies

### Internal Dependencies
- `@/components/ui/skeleton` - Base skeleton component
- `@/components/ui/typography` - Text styling
- `@/components/icons` - Success indicator icons
- `@/lib/utils/cn` - Utility for conditional classNames

### External Dependencies
- `framer-motion` - Animation library for smooth transitions

### Type Dependencies
- `BranchItem` from answers thread chat store
- `ThinkingDuration` from answers thread types

## Integration

### Thread Thinking Architecture
```
ThreadThinking
├── ThinkingTimeline
│   ├── BranchItem
│   │   ├── LeafLoadingSkeleton (when loading)
│   │   └── LoadingConnectorLine
│   └── DurationLoadingSkeleton (completion state)
└── LoadingStates
```

### Animation Coordination
- Integrates with `itemVariants` from animation system
- Coordinates with branch loading sequences
- Synchronizes completion animations with data updates

### Accessibility Integration
- Responds to user motion preferences
- Provides semantic loading indicators
- Includes screen reader announcements

## Best Practices

### ✅ Follows Architecture Guidelines

**Component Decomposition**: Each loading component has a single responsibility
```tsx
// Good: Separate components for different loading states
<LeafLoadingSkeleton />      // Content loading
<LoadingConnectorLine />     // Timeline connection
<DurationLoadingSkeleton />  // Completion state
```

**Performance Optimization**: Uses efficient animation techniques
```tsx
// Hardware acceleration and performance hints
className='transform-gpu will-change-transform'
style={{ transformOrigin: 'top' }}
```

**Accessibility First**: Respects user preferences
```tsx
// Motion preference handling
variants={prefersReducedMotion ? {} : itemVariants}
```

**Type Safety**: Proper TypeScript interfaces
```tsx
interface SpinnerProps {
  className?: string;
}
```

### Integration Patterns

**State-Driven Rendering**: Components respond to data state
```tsx
// Conditional rendering based on completion
{duration?.duration ? (
  <CompletedState />
) : (
  <LoadingState />
)}
```

**Animation Coordination**: Staggered animations for better UX
```tsx
delay: 0.05 + branches.length * 0.03
```

This loading system provides a comprehensive solution for indicating progress states in the AI thinking interface while maintaining performance, accessibility, and visual consistency.