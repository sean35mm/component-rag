# WorkflowDisplay Component

## Purpose

The `WorkflowDisplay` component renders a dynamic visual indicator for the current workflow state within the omnibar infobar. It conditionally displays either a default search AI icon or an active workflow badge with animated transitions, providing users with clear visual feedback about the current workflow context.

## Component Type

**Client Component** - This component uses the `'use client'` directive implicitly through its use of Framer Motion animations (`motion.div`). Client-side execution is necessary for the smooth transitions and interactive animations that enhance the user experience when switching between workflow states.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `currentWorkflow` | `OMNI_WORKFLOWS` | Yes | The currently active workflow type that determines the display content and styling |
| `isDefault` | `boolean` | Yes | Flag indicating whether to show the default state (search icon) or active workflow state (badge with label) |

## Usage Example

```tsx
import { WorkflowDisplay } from '@/components/omnibar/infobar/workflow-display';
import { OMNI_WORKFLOWS } from '@/lib/types';

// Basic usage in omnibar
function OmnibarInfobar() {
  const [currentWorkflow, setCurrentWorkflow] = useState<OMNI_WORKFLOWS>('SEARCH');
  const [isDefaultState, setIsDefaultState] = useState(true);

  return (
    <div className="omnibar-infobar">
      <WorkflowDisplay 
        currentWorkflow={currentWorkflow}
        isDefault={isDefaultState}
      />
    </div>
  );
}

// Usage with workflow switching
function WorkflowSwitcher() {
  const { workflow, isActive } = useWorkflowState();
  
  return (
    <WorkflowDisplay 
      currentWorkflow={workflow}
      isDefault={!isActive}
    />
  );
}
```

## Functionality

### Core Features
- **Conditional Rendering**: Switches between default icon and active workflow badge based on `isDefault` prop
- **Smooth Animations**: Implements entrance animations with different directions for visual continuity
- **Visual Feedback**: Provides clear indication of current workflow state through icons and labels
- **Responsive Design**: Adapts width automatically during transitions for seamless layout changes

### Animation Behavior
- **Default State**: Slides in from right (x: 10) with fade-in effect
- **Active State**: Slides in from left (x: -10) with fade-in effect
- **Timing**: 200ms duration with `circOut` easing for smooth, natural motion
- **Width Transition**: Animates from fixed 26px to auto width for fluid layout adaptation

## State Management

This component is **stateless** and relies entirely on props for its display logic. State management occurs in parent components:

- **Workflow State**: Managed by parent components, likely through Zustand store for workflow management
- **Display State**: `isDefault` prop controlled by parent based on user interactions or application state
- **No Internal State**: Component focuses purely on presentation logic

## Side Effects

- **No Direct Side Effects**: Component is purely presentational with no API calls or external mutations
- **Animation Side Effects**: Framer Motion handles DOM manipulation for smooth transitions
- **Layout Impact**: Dynamic width changes may trigger layout recalculations in parent containers

## Dependencies

### Internal Dependencies
- `@/components/icons` - `IconSearchAI`, `ShiningFill` icons
- `@/components/omnibar/infobar/utils` - `iconContainer` utility for styling
- `@/components/ui/typography` - Typography component for text rendering
- `@/lib/types` - `OMNI_WORKFLOWS` type definitions

### External Dependencies
- `framer-motion` - Animation library for smooth transitions and micro-interactions

## Integration

### Application Architecture Role
- **Omnibar Component**: Core part of the omnibar infobar system providing workflow feedback
- **Visual Hierarchy**: Works within the broader omnibar UI to maintain consistent visual language
- **Workflow System**: Integrates with application-wide workflow management for state synchronization

### Parent Component Integration
```tsx
// Typical integration pattern
<div className="infobar-container">
  <WorkflowDisplay 
    currentWorkflow={workflowStore.current}
    isDefault={!workflowStore.isActive}
  />
  {/* Other infobar elements */}
</div>
```

## Best Practices

### Architecture Adherence
- ✅ **Component Decomposition**: Single responsibility focused on workflow display
- ✅ **Reusability**: Generic props interface allows usage across different contexts
- ✅ **Performance**: Stateless design minimizes re-renders and complexity
- ✅ **Animation**: Uses Framer Motion for professional, smooth transitions

### Implementation Patterns
- **Conditional Rendering**: Clean ternary structure for different states
- **Motion Keys**: Proper `key` attributes ensure correct animation behavior during state changes
- **Responsive Design**: Auto-width transitions maintain layout flexibility
- **Accessibility**: Semantic HTML structure with proper typography components

### Integration Guidelines
- Integrate with Zustand stores for workflow state management
- Ensure parent components handle workflow logic and state transitions
- Use within omnibar context for consistent visual hierarchy
- Consider animation timing when nesting within other animated components