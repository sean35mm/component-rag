# SearchEnhanceQuery Component

## Purpose

The `SearchEnhanceQuery` component serves as the main query input interface for signal creation. It provides a comprehensive search input experience that includes text input capabilities, custom filtering options, query enhancement features, and real-time validation feedback. This component acts as the primary user interaction point for defining search criteria when creating signals.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive input state through child components
- Integrates with Zustand store for client-side state management
- Handles real-time validation error display
- Provides dynamic styling based on validation state

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| None | - | - | This component accepts no props and manages its state through the global store |

## Usage Example

```tsx
import { SearchEnhanceQuery } from '@/components/signals/creation/search-enhance-query';

// Basic usage within signal creation flow
function SignalCreationForm() {
  return (
    <div className="signal-creation-container">
      <h2>Create New Signal</h2>
      <SearchEnhanceQuery />
      {/* Other signal creation components */}
    </div>
  );
}

// Integration with form validation
function SignalCreationPage() {
  return (
    <CreateSignalProvider>
      <form className="space-y-6">
        <div className="query-section">
          <label htmlFor="signal-query-input">
            Search Query
          </label>
          <SearchEnhanceQuery />
        </div>
        {/* Additional form fields */}
      </form>
    </CreateSignalProvider>
  );
}
```

## Functionality

### Core Features
- **Text Input Management**: Handles query text input through the `TextInput` child component
- **Custom Filtering**: Integrates custom filter controls via the `CustomFilters` component
- **Query Enhancement**: Provides AI-powered query enhancement through the `EnhanceQueryButton`
- **Validation Display**: Shows real-time validation errors with visual feedback
- **Responsive Layout**: Adapts to different screen sizes with mobile-first design

### Visual States
- **Default State**: Clean input container with subtle border and background
- **Hover State**: Enhanced background opacity for better user feedback
- **Error State**: Red border styling when validation errors are present
- **Focus State**: Managed by child components for optimal user experience

## State Management

### Zustand Integration
```tsx
const inputValidationError = useCreateSignalStore(
  (state) => state.validationErrors[SIGNAL_CREATION_VALIDATION_ERRORS.QUERY]
);
```

**State Dependencies:**
- Reads validation errors from the global signal creation store
- Error state drives visual styling through the `inputContainer` CVA
- Child components manage their own specific state while contributing to the global store

**State Flow:**
1. User interacts with input components
2. Child components update global store
3. Validation errors are computed and stored
4. Component re-renders with appropriate error styling

## Side Effects

### Validation Effects
- Monitors validation errors from the global store
- Triggers visual state changes based on error presence
- Provides accessibility support through error state styling

### Layout Effects
- Dynamically adjusts container styling based on validation state
- Manages z-index for proper layering in the UI
- Handles responsive layout adjustments

## Dependencies

### Child Components
- **`TextInput`**: Handles the actual text input functionality
- **`CustomFilters`**: Manages additional filtering options
- **`EnhanceQueryButton`**: Provides AI query enhancement capabilities
- **`InputValidationError`**: Displays validation error messages

### External Dependencies
- **`class-variance-authority`**: For dynamic styling based on component state
- **`useCreateSignalStore`**: Zustand hook for accessing global signal creation state
- **`SIGNAL_CREATION_VALIDATION_ERRORS`**: Type definitions for validation error keys

### Styling Dependencies
- **Tailwind CSS**: For responsive design and component styling
- **Custom Design Tokens**: Uses project-specific color and spacing tokens

## Integration

### Application Architecture
```
Signal Creation Flow
├── SearchEnhanceQuery (Main Input)
│   ├── TextInput (Text Entry)
│   ├── CustomFilters (Filter Controls)
│   ├── EnhanceQueryButton (AI Enhancement)
│   └── InputValidationError (Error Display)
├── Additional Signal Config
└── Signal Preview/Submit
```

### Store Integration
- Connects to the global `CreateSignalStore` for state management
- Participates in the signal creation validation pipeline
- Contributes to the overall signal configuration state

### Form Integration
- Designed to work within larger form contexts
- Provides proper accessibility attributes (`id="signal-query-input"`)
- Supports form validation patterns through error state management

## Best Practices

### Architecture Adherence
✅ **Component Decomposition**: Follows flat component structure with clear separation of concerns
✅ **State Management**: Uses Zustand for client state, avoiding prop drilling
✅ **Reusability**: Child components are modular and reusable
✅ **Client Component Usage**: Appropriately uses client component for interactive functionality

### Design Patterns
✅ **CVA Integration**: Uses class-variance-authority for maintainable conditional styling
✅ **Responsive Design**: Mobile-first approach with progressive enhancement
✅ **Accessibility**: Provides semantic HTML structure and proper labeling
✅ **Error Handling**: Graceful error state management with visual feedback

### Performance Considerations
✅ **Selective State Subscription**: Only subscribes to specific validation errors
✅ **Efficient Re-renders**: Minimal re-render scope through targeted state selection
✅ **Optimized Styling**: Uses CSS classes for styling over inline styles

## Exports

- **`inputContainer`**: CVA function for dynamic container styling based on error state
- **`SearchEnhanceQuery`**: Main component for query input interface