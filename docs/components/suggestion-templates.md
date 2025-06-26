# SuggestionTemplates Component

## Purpose

The `SuggestionTemplates` component provides a templated starting point for signal creation by displaying a curated selection of suggestion templates. It helps users who are unsure how to begin creating signals by offering pre-written template options they can select and customize.

## Component Type

**Client Component** - Uses `'use client'` directive (implied by hooks usage) because it:
- Manages interactive state through Zustand store
- Handles user interactions (template selection)
- Uses callbacks and local state management
- Requires client-side randomization logic

## Props Interface

This component accepts no props - it's a self-contained feature component.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | This component has no external props |

## Usage Example

```tsx
// In a signal creation flow
import { SuggestionTemplates } from '@/components/signals/creation/suggestion-templates';

export function SignalCreationForm() {
  return (
    <div className="signal-creation-container">
      <h2>Create a New Signal</h2>
      
      {/* Query input field */}
      <QueryInput />
      
      {/* Template suggestions */}
      <SuggestionTemplates />
      
      {/* Other creation form elements */}
      <SignalFormFields />
    </div>
  );
}
```

## Functionality

### Core Features

- **Template Display**: Shows 6 randomly selected suggestion templates in a responsive grid
- **Seeded Randomization**: Uses consistent random selection based on stored seed for predictable results
- **Template Selection**: Allows users to select templates to populate the query field
- **Loading States**: Shows skeleton loading while fetching templates
- **Responsive Layout**: Adapts from single column on mobile to 3-column grid on desktop

### User Interactions

- **Template Selection**: Click on any template to populate the main query field
- **State Clearing**: Automatically clears validation errors and suggestions when template is selected

## State Management

### Zustand Store Integration

```tsx
// Store selectors used
const setSuggestionTemplatesSelectionSeed = useCreateSignalStore(
  (state) => state.setSuggestionTemplatesSelectionSeed
);
const suggestionTemplatesSelectionSeed = useCreateSignalStore(
  (state) => state.suggestionTemplatesSelectionSeed
);
const setQuery = useCreateSignalStore((state) => state.setQuery);
const setSuggestionsQuery = useCreateSignalStore(
  (state) => state.setSuggestionsQuery
);
const clearValidationError = useCreateSignalStore(
  (state) => state.clearValidationError
);
```

### TanStack Query Integration

```tsx
// Server state management
const { data: templates, isFetching: isTemplatesFetching } =
  useSignalSuggestionTemplates(
    {
      sortBy: 'createdAt',
      sortOrder: 'desc', 
      size: 100,
    },
    {
      select: selectRandomTemplates, // Client-side data transformation
    }
  );
```

## Side Effects

### Data Fetching
- Fetches up to 100 suggestion templates sorted by creation date
- Applies client-side selection to show only 6 templates

### State Updates
- Generates and persists random seed for consistent template selection
- Updates query field when template is selected
- Clears validation errors for query field
- Resets suggestions query state

### Random Selection Logic
```tsx
const selectRandomTemplates = useCallback(
  (data: SignalSuggestionTemplate[]) => {
    let seed: number = suggestionTemplatesSelectionSeed ?? 0;
    
    if (!suggestionTemplatesSelectionSeed) {
      seed = getRandomNumber(1000000, 9999999);
      setSuggestionTemplatesSelectionSeed(seed);
    }
    
    return getSeededSelection(data, 6, seed);
  },
  [setSuggestionTemplatesSelectionSeed, suggestionTemplatesSelectionSeed]
);
```

## Dependencies

### Internal Components
- `Typography` - UI component for styled text
- `SuggestionTemplatesSkeleton` - Loading state component
- `Template` - Individual template display component

### Hooks & Services
- `useCreateSignalStore` - Zustand store for signal creation state
- `useSignalSuggestionTemplates` - TanStack Query hook for fetching templates

### Utilities
- `getSeededSelection` - Array utility for consistent random selection
- `getRandomNumber` - Number utility for seed generation

### Types
- `SIGNAL_CREATION_VALIDATION_ERRORS` - Validation error constants
- `SignalSuggestionTemplate` - Template data structure

## Integration

### Application Flow
1. **Signal Creation Context**: Integrated into the signal creation workflow
2. **State Synchronization**: Connects template selection to main query input
3. **Validation Integration**: Clears related validation errors when templates are used
4. **Suggestion System**: Coordinates with suggestion query system

### Data Flow
```
Templates API → TanStack Query → Seeded Selection → Grid Display
Template Selection → Zustand Store → Query Field Population
```

## Best Practices

### ✅ Architecture Adherence

- **Component Decomposition**: Uses `Template` child component for individual items
- **State Management**: Properly separates server state (TanStack Query) from client state (Zustand)
- **Loading States**: Implements proper loading skeleton pattern
- **Error Handling**: Integrates with validation error system

### ✅ Performance Patterns

- **Memoized Callbacks**: Uses `useCallback` for expensive operations
- **Data Transformation**: Leverages TanStack Query's `select` option for client-side filtering
- **Consistent Randomization**: Implements seeded selection for predictable UX

### ✅ User Experience

- **Progressive Enhancement**: Shows helpful guidance text
- **Responsive Design**: Adapts layout for different screen sizes  
- **Clear Interactions**: Provides immediate feedback on template selection
- **State Consistency**: Maintains selection seed for consistent template display

### ✅ Code Organization

- **Single Responsibility**: Focused solely on template suggestion functionality
- **Clean Dependencies**: Clear separation between UI, state, and data concerns
- **Type Safety**: Proper TypeScript integration with validation constants