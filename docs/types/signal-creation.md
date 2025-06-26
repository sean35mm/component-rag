# Signal Creation Types Documentation

## Purpose

The `SIGNAL_CREATION_STEP` enum defines the discrete steps in a multi-step signal creation workflow. This enum provides type-safe step identifiers for managing UI state, form validation, and navigation flow throughout the signal creation process. It serves as the foundation for step-based component rendering and progress tracking.

## Type Definition

```tsx
export enum SIGNAL_CREATION_STEP {
  STEP1 = 'step1',
  STEP2 = 'step2',
  STEP3 = 'step3',
  STEP4 = 'step4',
}
```

### Enum Values

| Value | String Literal | Description |
|-------|---------------|-------------|
| `STEP1` | `'step1'` | Initial step - typically signal type selection or basic configuration |
| `STEP2` | `'step2'` | Second step - parameter configuration or criteria definition |
| `STEP3` | `'step3'` | Third step - validation, preview, or advanced settings |
| `STEP4` | `'step4'` | Final step - confirmation, summary, or submission |

## Usage Examples

### Basic Step Management

```tsx
import { SIGNAL_CREATION_STEP } from '@/lib/types/signal-creation';

interface SignalCreationState {
  currentStep: SIGNAL_CREATION_STEP;
  completedSteps: Set<SIGNAL_CREATION_STEP>;
  isStepValid: (step: SIGNAL_CREATION_STEP) => boolean;
}

// Component state management
const [currentStep, setCurrentStep] = useState<SIGNAL_CREATION_STEP>(
  SIGNAL_CREATION_STEP.STEP1
);

// Step navigation
const nextStep = () => {
  switch (currentStep) {
    case SIGNAL_CREATION_STEP.STEP1:
      setCurrentStep(SIGNAL_CREATION_STEP.STEP2);
      break;
    case SIGNAL_CREATION_STEP.STEP2:
      setCurrentStep(SIGNAL_CREATION_STEP.STEP3);
      break;
    case SIGNAL_CREATION_STEP.STEP3:
      setCurrentStep(SIGNAL_CREATION_STEP.STEP4);
      break;
    default:
      break;
  }
};
```

### Step-Based Component Rendering

```tsx
interface SignalCreationWizardProps {
  step: SIGNAL_CREATION_STEP;
  onStepChange: (step: SIGNAL_CREATION_STEP) => void;
}

const SignalCreationWizard: React.FC<SignalCreationWizardProps> = ({
  step,
  onStepChange
}) => {
  const renderStepContent = () => {
    switch (step) {
      case SIGNAL_CREATION_STEP.STEP1:
        return <SignalTypeSelection />;
      case SIGNAL_CREATION_STEP.STEP2:
        return <ParameterConfiguration />;
      case SIGNAL_CREATION_STEP.STEP3:
        return <SignalPreview />;
      case SIGNAL_CREATION_STEP.STEP4:
        return <SignalConfirmation />;
      default:
        return null;
    }
  };

  return (
    <div className="signal-creation-wizard">
      <StepIndicator currentStep={step} />
      {renderStepContent()}
      <NavigationControls 
        currentStep={step} 
        onStepChange={onStepChange} 
      />
    </div>
  );
};
```

### Progress Tracking

```tsx
interface StepProgress {
  step: SIGNAL_CREATION_STEP;
  isCompleted: boolean;
  isActive: boolean;
  isAccessible: boolean;
}

const useStepProgress = (currentStep: SIGNAL_CREATION_STEP) => {
  const steps = Object.values(SIGNAL_CREATION_STEP);
  const currentIndex = steps.indexOf(currentStep);

  return steps.map((step, index): StepProgress => ({
    step,
    isCompleted: index < currentIndex,
    isActive: index === currentIndex,
    isAccessible: index <= currentIndex
  }));
};
```

## Type Architecture Pattern

This enum follows our **domain-first** architecture pattern:

```tsx
// 1. Domain Object (this enum)
export enum SIGNAL_CREATION_STEP {
  STEP1 = 'step1',
  STEP2 = 'step2',
  STEP3 = 'step3',
  STEP4 = 'step4',
}

// 2. Response Types (derived from domain)
interface SignalCreationProgressResponse {
  currentStep: SIGNAL_CREATION_STEP;
  availableSteps: SIGNAL_CREATION_STEP[];
  completedSteps: SIGNAL_CREATION_STEP[];
  canProceed: boolean;
}

// 3. Request Types (using domain objects)
interface UpdateSignalCreationStepRequest {
  step: SIGNAL_CREATION_STEP;
  data: Record<string, unknown>;
  saveProgress: boolean;
}
```

## Related Types

### Step Validation Interface

```tsx
interface SignalCreationStepValidator {
  step: SIGNAL_CREATION_STEP;
  validate: () => Promise<boolean>;
  getErrors: () => string[];
}
```

### Step Configuration

```tsx
interface SignalCreationStepConfig {
  step: SIGNAL_CREATION_STEP;
  title: string;
  description: string;
  component: React.ComponentType;
  validation?: SignalCreationStepValidator;
}
```

### Navigation State

```tsx
interface SignalCreationNavigation {
  currentStep: SIGNAL_CREATION_STEP;
  canGoBack: boolean;
  canGoForward: boolean;
  completionPercentage: number;
}
```

## Integration Points

### Components
- `SignalCreationWizard` - Main wizard component
- `StepIndicator` - Progress visualization
- `NavigationControls` - Step navigation buttons
- Individual step components (`SignalTypeSelection`, etc.)

### Services
- `signalCreationService` - Step state persistence
- `validationService` - Step-specific validation
- `progressTrackingService` - Analytics and completion tracking

### State Management
- Wizard state in context or store
- URL routing for deep-linking to specific steps
- Form state persistence across steps

## Validation

### Zod Schema Integration

```tsx
import { z } from 'zod';

const SignalCreationStepSchema = z.nativeEnum(SIGNAL_CREATION_STEP);

const SignalCreationStateSchema = z.object({
  currentStep: SignalCreationStepSchema,
  completedSteps: z.array(SignalCreationStepSchema),
  stepData: z.record(z.string(), z.unknown()),
});

type SignalCreationState = z.infer<typeof SignalCreationStateSchema>;
```

### Runtime Validation

```tsx
const isValidStep = (step: string): step is SIGNAL_CREATION_STEP => {
  return Object.values(SIGNAL_CREATION_STEP).includes(step as SIGNAL_CREATION_STEP);
};

// Usage in route handlers or form validation
const validateStepTransition = (from: string, to: string) => {
  if (!isValidStep(from) || !isValidStep(to)) {
    throw new Error('Invalid step transition');
  }
  // Additional business logic validation
};
```

## Best Practices

### ✅ Adherence to Guidelines

1. **Enum Usage**: Correctly uses enum for reusable step identifiers across the application
2. **String Literals**: Each enum value maps to a descriptive string literal for serialization
3. **Strict Typing**: Provides compile-time safety for step management
4. **Domain-First**: Serves as foundation for related response and request types

### ✅ Recommended Patterns

```tsx
// Use type guards for runtime safety
const isValidStep = (value: unknown): value is SIGNAL_CREATION_STEP => {
  return typeof value === 'string' && 
         Object.values(SIGNAL_CREATION_STEP).includes(value as SIGNAL_CREATION_STEP);
};

// Leverage utility types for step subsets
type InitialSteps = Extract<SIGNAL_CREATION_STEP, 
  SIGNAL_CREATION_STEP.STEP1 | SIGNAL_CREATION_STEP.STEP2>;

// Use const assertions for step arrays
const STEP_ORDER = [
  SIGNAL_CREATION_STEP.STEP1,
  SIGNAL_CREATION_STEP.STEP2,
  SIGNAL_CREATION_STEP.STEP3,
  SIGNAL_CREATION_STEP.STEP4,
] as const;
```

### ✅ Integration Best Practices

- Use enum values in switch statements for exhaustive checking
- Persist step state using string literals for serialization compatibility
- Implement proper validation when deserializing step data
- Leverage TypeScript's discriminated unions for step-specific data types