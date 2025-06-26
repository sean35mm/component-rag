# BackButton Component

## Purpose

The `BackButton` component provides an animated, interactive back navigation button specifically designed for workflow contexts within the omnibar infobar. It renders a compact arrow button with smooth entrance animations to enhance user experience during workflow navigation.

## Component Type

**Client Component** - Uses the `'use client'` directive implicitly through `framer-motion` animations. The component requires client-side JavaScript for motion animations and click event handling.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onClick` | `() => void` | Yes | Callback function executed when the back button is clicked |

## Usage Example

```tsx
import { BackButton } from '@/components/omnibar/infobar/workflow-back-button';

function WorkflowHeader() {
  const handleGoBack = () => {
    // Navigate back in workflow
    router.back();
    // or
    setCurrentStep(previousStep);
  };

  return (
    <div className="workflow-header">
      <BackButton onClick={handleGoBack} />
      <h2>Current Workflow Step</h2>
    </div>
  );
}

// In a multi-step form
function WorkflowWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  
  const handleBackClick = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div>
      {currentStep > 0 && (
        <BackButton onClick={handleBackClick} />
      )}
      {/* Workflow content */}
    </div>
  );
}
```

## Functionality

- **Animated Entrance**: Smooth fade-in and slide-in animation when component mounts
- **Interactive Navigation**: Clickable button that triggers custom navigation logic
- **Visual Feedback**: Uses `CompactButton` with link variant for subtle, accessible interaction
- **Icon Display**: Renders a left-pointing arrow icon for clear navigation intent
- **Responsive Design**: Centered layout that adapts to container dimensions

## State Management

**No State Management** - This component is stateless and relies on:
- Parent components to manage navigation state
- External routing or step management systems
- Props-based event handling for all interactions

## Side Effects

**No Direct Side Effects** - The component itself performs no side effects. All navigation logic and state changes are handled through the `onClick` callback provided by parent components.

## Dependencies

### Internal Dependencies
- `@/components/icons` - `PiArrowLeftLine` icon component
- `@/components/ui/compact-button` - Base button component

### External Dependencies
- `framer-motion` - Animation library for entrance transitions

### Type Dependencies
```tsx
// Implicit interface
interface BackButtonProps {
  onClick: () => void;
}
```

## Integration

### Omnibar Architecture
```
omnibar/
├── infobar/
│   ├── workflow-back-button.tsx  ← Current component
│   └── other-infobar-components/
└── other-omnibar-components/
```

### Usage Context
- **Workflow Navigation**: Primary use in multi-step workflows
- **Infobar Integration**: Positioned within omnibar infobar for consistent UI placement
- **Modal Dialogs**: Can be used in workflow modals for step navigation
- **Form Wizards**: Common in multi-step form implementations

### Parent Component Integration
```tsx
// Typical parent component pattern
function WorkflowInfobar({ currentStep, onStepChange }) {
  return (
    <div className="infobar">
      {currentStep > 0 && (
        <BackButton onClick={() => onStepChange(currentStep - 1)} />
      )}
      <WorkflowProgress currentStep={currentStep} />
    </div>
  );
}
```

## Best Practices

### Architecture Adherence
✅ **Component Decomposition**: Simple, single-purpose component that stacks well with other UI elements

✅ **Flat Structure**: No nested complexity; composed of basic UI primitives

✅ **Separation of Concerns**: Presentation logic only; navigation logic handled by parents

### Implementation Patterns
```tsx
// ✅ Good: Clear callback handling
<BackButton onClick={handleWorkflowBack} />

// ✅ Good: Conditional rendering
{canGoBack && <BackButton onClick={goBack} />}

// ❌ Avoid: Embedding navigation logic in component
// Component should not handle routing directly
```

### Performance Considerations
- **Animation Optimization**: Uses `framer-motion` efficiently with simple transforms
- **Event Handler Stability**: Ensure `onClick` callbacks are memoized in parent components
- **Conditional Rendering**: Only render when back navigation is available

### Accessibility
- Inherits accessibility features from `CompactButton`
- Clear visual affordance with arrow icon
- Proper focus management through base button component

### Styling Integration
- Uses Tailwind classes for layout (`flex items-center justify-center`)
- Leverages design system through `CompactButton` variants
- Consistent with omnibar visual hierarchy