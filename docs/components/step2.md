# Step2 Component

## Purpose

The Step2 component is the second step in the signal creation workflow, responsible for refining and configuring search queries. It allows users to preview articles, edit keywords, manage entities, and configure filters to fine-tune their signal search criteria before proceeding to the next step or saving their signal.

## Component Type

**Client Component** - Uses the `'use client'` directive because it manages complex interactive state, handles form interactions, performs client-side validations, and integrates with multiple Zustand stores for real-time updates.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | This component takes no props and relies entirely on Zustand store state |

## Usage Example

```tsx
import { Step2 } from '@/components/signals/creation/steps/step2';

// Used within a signal creation wizard or workflow
function SignalCreationWizard() {
  return (
    <div className="signal-creation-container">
      {/* Previous steps */}
      <Step2 />
      {/* Subsequent steps */}
    </div>
  );
}

// Or as part of a step-based router
function SignalCreationStep() {
  const currentStep = useCreateSignalStore((state) => state.currentStep);
  
  if (currentStep === 2) {
    return <Step2 />;
  }
  
  return null;
}
```

## Functionality

### Core Features
- **Article Preview**: Displays preview of articles matching current search criteria
- **Keywords Editing**: Allows users to refine search keywords and query text
- **Entity Management**: Enables adding/editing people, companies, and topics
- **Filter Configuration**: Provides interface for setting search filters
- **Query Validation**: Validates search parameters before saving or continuing
- **Auto-naming**: Generates signal names from query content when not in edit mode

### Key Behaviors
- **Real-time Validation**: Validates query fields as users interact with editors
- **High Volume Protection**: Automatically removes contact points for high-volume signals
- **State Synchronization**: Syncs temporary state with persistent store state
- **Smart Defaults**: Handles empty queries and titles gracefully

## State Management

### Zustand Stores
- **`useCreateSignalStore`**: Primary store for signal creation state
  - Signal UUID, queries, titles, validation states
  - Mode flags (edit mode, title-only, query textarea active)
  - Validation error management
- **`useFiltersDrawerStore`**: Manages filter configuration state

### Store Dependencies
```tsx
// Key state accessed from stores
const {
  signalUuid,
  enhancedQuery,
  temporaryQuery,
  temporaryTitle,
  queryTitle,
  isEditMode,
  isTitleOnlyActive,
  isQueryTextareaActive
} = useCreateSignalStore();

const { filters } = useFiltersDrawerStore();
```

## Side Effects

### API Interactions
- **Signal Updates**: Updates signal configuration via `useUpdateSignal`
- **Name Generation**: Generates signal names from queries via `useGenerateNameFromQuery`
- **Signal Fetching**: Retrieves existing signal data via `useSignalById`

### Side Effect Handlers
```tsx
// Signal update with conditional name generation
const handleUpdateSignal = async (signalUuid, signalName) => {
  let name = signalName;
  
  if (!isEditMode && !signalName && (enhancedQuery || queryTitle)) {
    name = await getSignalNameFromQuery({
      q: enhancedQuery ?? undefined,
      title: queryTitle ?? undefined,
    });
  }
  
  return await updateSignal({
    uuid: signalUuid,
    dto: { name, query: signalQuery.query }
  });
};
```

### Notifications
- **Toast Notifications**: Shows user feedback for contact point removal due to high volume
- **Validation Feedback**: Displays validation errors through store state

## Dependencies

### Custom Hooks
- `useSignalArticlesVolume` - Article volume calculation and management
- `useToast` - Toast notification system

### Query Hooks
- `useGenerateNameFromQuery` - Auto-generate signal names
- `useSignalById` - Fetch existing signal data
- `useUpdateSignal` - Update signal configuration

### Child Components
- `ArticlesPreview` - Preview matching articles
- `EntitiesEditor` - Manage people, companies, topics
- `FiltersEditor` - Configure search filters
- `KeywordsEditor` - Edit search keywords
- `SignalActionButtons` - Save/Continue actions
- `SignalStepHeader` - Step header with title and description

### Utilities
- `validateSignalQueryFields` - Query validation logic
- `SIGNAL_VALIDATION_ERROR_MESSAGES` - Validation error constants

## Integration

### Workflow Integration
```tsx
// Part of multi-step signal creation process
Step1 (Initial Setup) → Step2 (Query Refinement) → Step3 (Notifications)
```

### Store Integration
- Reads from and updates `useCreateSignalStore` for signal state
- Integrates with `useFiltersDrawerStore` for filter management
- Coordinates with article volume detection for UX optimization

### Validation Flow
```tsx
const validateValues = () => {
  return validateSignalQueryFields({
    temporaryQuery,
    temporaryTitle,
    isTitleOnlyActive,
    isQueryTextareaActive,
    setValidationError,
    clearValidationError,
    // ... other validation params
  });
};
```

## Best Practices

### Architectural Adherence
- ✅ **Client Component Usage**: Appropriately uses client component for interactive functionality
- ✅ **State Management**: Follows Zustand patterns for client state, TanStack Query for server state
- ✅ **Component Decomposition**: Flat structure with focused child components
- ✅ **Separation of Concerns**: Delegates specific functionality to specialized components

### Performance Optimizations
- **Callback Memoization**: Uses `useCallback` for expensive operations
- **Conditional Queries**: Enables queries only when necessary data is available
- **State Synchronization**: Batches state updates for better performance

### Error Handling
- **Validation Integration**: Comprehensive validation with user-friendly error messages
- **Graceful Degradation**: Handles missing or invalid data gracefully
- **User Feedback**: Provides clear feedback for validation errors and system actions

### UX Considerations
- **High Volume Protection**: Automatically manages contact points for high-volume signals
- **Smart Defaults**: Handles empty states and provides reasonable fallbacks
- **Progressive Enhancement**: Allows users to refine queries incrementally