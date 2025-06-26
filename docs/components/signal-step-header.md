# SignalStepHeader Component

## Purpose

The `SignalStepHeader` component provides a standardized header interface for multi-step signal creation flows. It displays the current step progress, title, and optional description to guide users through the signal creation process with clear visual hierarchy and progress indication.

## Component Type

**Server Component** - This is a pure presentational component that renders static content based on props. It has no client-side interactivity, state management, or event handlers, making it ideal as a server component for optimal performance.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `step` | `number` | Yes | Current step number in the signal creation flow |
| `title` | `string` | Yes | Main heading text for the current step |
| `description` | `string` | No | Optional descriptive text providing additional context for the step |

## Usage Example

```tsx
import { SignalStepHeader, TOTAL_STEPS } from '@/components/signals/creation/signal-step-header';

// Basic usage in a signal creation step
export function SignalBasicInfoStep() {
  return (
    <div className="space-y-6">
      <SignalStepHeader
        step={1}
        title="Basic Information"
        description="Provide the fundamental details for your signal"
      />
      {/* Step content */}
    </div>
  );
}

// Usage without description
export function SignalReviewStep() {
  return (
    <div className="space-y-6">
      <SignalStepHeader
        step={4}
        title="Review & Submit"
      />
      {/* Review content */}
    </div>
  );
}

// Using the exported constant
export function getStepProgress(currentStep: number) {
  return `${currentStep}/${TOTAL_STEPS}`;
}
```

## Functionality

- **Progress Indication**: Displays current step position relative to total steps
- **Responsive Typography**: Uses different heading sizes on mobile (`titleH5`) vs desktop (`titleH4`)
- **Conditional Description**: Renders description text only when provided
- **Consistent Styling**: Applies standardized color scheme and spacing
- **Flexible Layout**: Uses flexbox for consistent vertical spacing

## State Management

**No State Management** - This component is purely presentational and stateless. It receives all necessary data through props and renders static content without managing any internal state.

## Side Effects

**None** - The component has no side effects, API calls, or external interactions. It's a pure rendering component that transforms props into JSX.

## Dependencies

### Internal Dependencies
- `@/components/ui/typography` - Typography component for consistent text styling

### External Dependencies
- React (implicit) - JSX rendering

## Integration

The `SignalStepHeader` component integrates into the signal creation workflow architecture:

```tsx
// Example integration in a step wrapper
export function SignalCreationStep({ 
  stepNumber, 
  stepTitle, 
  stepDescription,
  children 
}: StepWrapperProps) {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <SignalStepHeader
        step={stepNumber}
        title={stepTitle}
        description={stepDescription}
      />
      <div className="mt-8">
        {children}
      </div>
    </div>
  );
}

// Usage in signal creation pages
export function CreateSignalPage() {
  const { currentStep } = useSignalCreationStore();
  
  return (
    <div>
      {currentStep === 1 && (
        <SignalCreationStep
          stepNumber={1}
          stepTitle="Signal Configuration"
          stepDescription="Configure your signal parameters and conditions"
        >
          <SignalConfigForm />
        </SignalCreationStep>
      )}
    </div>
  );
}
```

## Best Practices

### ✅ Architectural Adherence

- **Server Component Default**: Correctly implemented as server component since no client interactivity is needed
- **Component Decomposition**: Simple, focused component that does one thing well
- **Flat Structure**: Minimal nesting with clear prop interface
- **UI Component Pattern**: Follows presentational component patterns in the `/signals/creation/` domain

### ✅ Implementation Patterns

- **Responsive Design**: Uses responsive typography variants for different screen sizes
- **Conditional Rendering**: Properly handles optional description prop
- **Semantic Structure**: Uses appropriate div structure with meaningful CSS classes
- **Exported Constants**: Provides `TOTAL_STEPS` constant for reuse across the signal creation flow

### ✅ Integration Best Practices

- **Predictable Interface**: Simple prop structure makes it easy to integrate into various step components
- **Consistent Styling**: Leverages the design system typography component
- **Reusable Pattern**: Can be used across all signal creation steps with different content
- **Type Safety**: Provides proper TypeScript interfaces for compile-time validation

This component exemplifies good architectural patterns by being simple, reusable, and focused on a single responsibility within the signal creation domain.