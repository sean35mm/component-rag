# Step1

A client-side component that handles the first step of signal creation, allowing users to define what they want to monitor through natural language queries.

## Component Type

**Client Component** - Uses `'use client'` directive because it:
- Manages interactive form state through Zustand store
- Handles user input and validation
- Performs async mutations with user feedback

## Purpose

The Step1 component serves as the initial step in the signal creation workflow, where users input natural language queries describing what they want to monitor. It validates the input, converts it to an enhanced query format, and manages the progression to the next step.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| None | - | - | This component doesn't accept any props |

## Usage Example

```tsx
import { Step1 } from '@/components/signals/creation/steps/step1';

export function SignalCreationWizard() {
  return (
    <div className="signal-creation-container">
      <Step1 />
    </div>
  );
}
```

## Functionality

### Core Features
- **Query Input**: Provides interface for users to enter monitoring queries
- **Input Validation**: Validates queries using `isSignalBaseQueryValid`
- **NLP Conversion**: Converts natural language to structured query format
- **Suggestion Templates**: Offers pre-built query templates for common use cases
- **Navigation Controls**: Handles save/continue functionality with validation

### User Interaction Flow
1. User enters a natural language query (e.g., "mentions of my company")
2. Component validates the input on save attempt
3. Valid queries are converted via NLP service to enhanced format
4. Enhanced query is stored for use in subsequent steps
5. User can proceed to next step or modify their input

## State Management

### Zustand Store Integration
Uses `useCreateSignalStore` for:

```tsx
const query = useCreateSignalStore((state) => state.query);
const setValidationError = useCreateSignalStore((state) => state.setValidationError);
const clearValidationError = useCreateSignalStore((state) => state.clearValidationError);
const setEnhancedQuery = useCreateSignalStore((state) => state.setEnhancedQuery);
const setTemporaryQuery = useCreateSignalStore((state) => state.setTemporaryQuery);
```

**State Operations:**
- `query`: Current user input
- `setValidationError/clearValidationError`: Validation state management
- `setEnhancedQuery`: Stores NLP-processed query
- `setTemporaryQuery`: Temporary query storage during processing

## Side Effects

### API Interactions
- **NLP Query Conversion**: Uses `useConvertNlpQuery` mutation to process natural language
- **Success Handling**: Updates enhanced and temporary queries on successful conversion
- **Error Handling**: Validation errors are stored in global state for UI feedback

### Validation Side Effects
- Clears previous validation errors on successful validation
- Sets specific validation errors using `SIGNAL_CREATION_VALIDATION_ERRORS.QUERY`

## Dependencies

### Components
- `SearchEnhanceQuery`: Query input and enhancement interface
- `SignalActionButtons`: Save/continue navigation controls
- `SignalStepHeader`: Step indicator and instructions
- `SuggestionTemplates`: Pre-built query suggestions

### Hooks & Services
- `useCreateSignalStore`: Signal creation state management
- `useConvertNlpQuery`: NLP query processing mutation
- `isSignalBaseQueryValid`: Query validation utility

### Utilities
- `stepContainer`: CSS class utility for consistent step styling
- `SIGNAL_CREATION_VALIDATION_ERRORS`: Validation error constants

## Integration

### Signal Creation Workflow
Step1 integrates into the multi-step signal creation process:

```tsx
// Typical integration in parent wizard component
export function SignalCreationWizard() {
  const currentStep = useCreateSignalStore((state) => state.currentStep);
  
  return (
    <>
      {currentStep === 1 && <Step1 />}
      {currentStep === 2 && <Step2 />}
      {/* Additional steps */}
    </>
  );
}
```

### Data Flow
1. **Input**: User query via `SearchEnhanceQuery`
2. **Processing**: NLP conversion via `useConvertNlpQuery`
3. **Storage**: Enhanced query stored in Zustand store
4. **Progression**: Success enables navigation to next step

## Best Practices

### Architecture Compliance
- ✅ **Client Component Usage**: Appropriately uses client-side rendering for interactivity
- ✅ **State Management**: Leverages Zustand for client state, TanStack Query for server state
- ✅ **Component Decomposition**: Flat structure with focused child components
- ✅ **Separation of Concerns**: Validation, API calls, and UI rendering are properly separated

### Implementation Patterns
- **Validation Strategy**: Validates on save attempt rather than on every input change
- **Error Handling**: Uses centralized error state management through Zustand
- **Async Operations**: Properly handles async NLP conversion with loading states
- **Callback Optimization**: Uses `useCallback` for performance optimization

### Code Quality
- **Type Safety**: Leverages TypeScript for type checking
- **Reusability**: Composed of reusable child components
- **Maintainability**: Clear separation between validation, state management, and UI logic