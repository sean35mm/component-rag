# Branch Component

## Purpose

The `Branch` component renders an individual branch item in a thread thinking visualization. It displays a timeline-style entry with an animated dot indicator and associated text, along with conditional rendering of leaf elements. This component is part of a hierarchical visualization system for displaying thought processes or decision trees in Q&A threads.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Leverages Framer Motion animations for visual feedback
- Requires browser APIs for motion preferences and viewport detection
- Implements interactive animations that need client-side JavaScript

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `branch` | `BranchItem` | ✅ | The branch data object containing id, text, and leaves array from the answers thread store |
| `index` | `number` | ✅ | The index position of this branch in the parent collection, used for staggered animations |
| `prefersReducedMotion` | `boolean \| null` | ✅ | User's motion preference setting to conditionally disable animations for accessibility |

## Usage Example

```tsx
import { Branch } from '@/components/answers/thread-question-answer-pair/thread-thinking/branch';
import { BranchItem } from '@/lib/stores/answers-thread-chat-store/types';

function ThinkingThread() {
  const branches: BranchItem[] = [
    {
      id: 'branch-1',
      text: 'Analyzing the user question for key concepts',
      leaves: [/* leaf items */]
    },
    {
      id: 'branch-2', 
      text: 'Considering multiple solution approaches',
      leaves: []
    }
  ];

  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="space-y-4">
      {branches.map((branch, index) => (
        <Branch
          key={branch.id}
          branch={branch}
          index={index}
          prefersReducedMotion={prefersReducedMotion}
        />
      ))}
    </div>
  );
}
```

## Functionality

### Core Features
- **Timeline Visualization**: Renders branch items with timeline-style dots and connecting visual elements
- **Animated Entry**: Implements staggered entry animations based on index position
- **Accessibility Support**: Respects user motion preferences to disable animations when needed
- **Conditional Rendering**: Only displays leaf components when leaves data is available
- **Visual Feedback**: Includes pulsing animation effects on timeline dots for enhanced UX

### Animation Behaviors
- Staggered entry animations with index-based delays
- Pulsing timeline dot with infinite repeat cycle
- Smooth scale and opacity transitions
- Motion-sensitive animation toggling

## State Management

**No Direct State Management** - This component is purely presentational and:
- Receives all data through props from parent components
- Relies on parent components to manage `BranchItem` state through Zustand stores
- Does not maintain internal state beyond animation states managed by Framer Motion

## Side Effects

### Animation Effects
- **Viewport Detection**: Uses Framer Motion's `whileInView` for scroll-triggered animations
- **Motion Queries**: Respects system/user motion preferences
- **Timeline Animations**: Manages continuous pulsing effects with infinite repeat cycles

**No External API Calls** - Component focuses solely on presentation of provided data.

## Dependencies

### Internal Dependencies
- `@/components/ui/typography` - Text rendering with consistent styling
- `@/lib/stores/answers-thread-chat-store/types` - Type definitions for BranchItem
- `./animation-variants` - Shared animation configuration
- `./leaves` - Child component for rendering leaf elements

### External Dependencies
- `framer-motion` - Animation library for timeline and entry effects
- React 18+ - For component architecture and rendering

## Integration

### Application Architecture Role
```
Thread Thinking System
├── ThreadThinking (Container)
├── Branch (Item Renderer) ← This Component
└── LeafRender (Child Elements)
```

### Data Flow Integration
- **Upstream**: Receives structured data from answers thread chat store via parent components
- **Downstream**: Passes leaf data to `LeafRender` child component
- **Store Integration**: Works with Zustand-managed thread state without direct store access

### Feature Domain
Located in the answers feature domain, specifically handling thread-based Q&A visualizations and thought process displays.

## Best Practices

### Architecture Adherence
- ✅ **Component Decomposition**: Maintains single responsibility for branch rendering
- ✅ **Flat Structure**: Delegates leaf rendering to separate component rather than nesting
- ✅ **Reusability**: Accepts configurable props for flexible usage across different thread contexts
- ✅ **Accessibility**: Implements motion preference respect following inclusive design patterns

### Performance Considerations
- Uses `key` prop with stable `branch.id` for optimal React reconciliation
- Implements conditional animation loading based on user preferences
- Leverages Framer Motion's optimized animation engine for smooth performance

### Type Safety
- Leverages TypeScript interfaces from centralized store types
- Maintains strict prop typing for reliable component contracts
- Uses discriminated unions through BranchItem type system