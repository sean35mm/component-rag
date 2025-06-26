# KeywordsEditor Component

## Purpose

The `KeywordsEditor` component provides a sophisticated interface for creating and editing signal queries with advanced keyword matching capabilities. It supports both full-content searches and title-only searches, allowing users to construct complex boolean queries with real-time validation and enhanced text rendering.

## Component Type

**Client Component** - Uses `'use client'` directive because it:
- Manages complex interactive state for editing modes
- Handles real-time text input and validation
- Requires DOM manipulation for textarea focus management
- Implements keyboard event handlers for autocomplete functionality

## Props Interface

This component accepts no props and relies entirely on Zustand store state management.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | Component uses global state exclusively |

## Usage Example

```tsx
import { KeywordsEditor } from '@/components/signals/creation/keywords-editor';

// Used within a signal creation flow
function SignalCreationPage() {
  return (
    <div className="signal-creation-container">
      <KeywordsEditor />
    </div>
  );
}

// The component automatically connects to the signal creation store
// and manages all its state through Zustand
```

## Functionality

### Core Features
- **Dual Search Modes**: Supports both full-content and title-only keyword searches
- **Boolean Query Building**: Advanced query construction with boolean operators (AND, OR, NOT)
- **Real-time Validation**: Immediate feedback on query syntax and content validation
- **Enhanced Text Rendering**: Syntax highlighting for boolean operators and query structure
- **Dynamic Field Management**: Add/remove search fields based on user needs
- **Auto-completion**: Intelligent autocomplete for boolean operators

### Interactive Behaviors
- **Edit Mode Toggle**: Switch between view and edit modes with focused input handling
- **Field Addition**: Dynamically add keyword or title-only search fields
- **Field Removal**: Remove unnecessary search fields with validation cleanup
- **Async Save Operations**: Non-blocking save with loading states and validation

## State Management

**Zustand Store Integration** - Uses `useCreateSignalStore` for:

### Primary State
- `enhancedQuery` / `temporaryQuery` - Main keyword search content
- `queryTitle` / `temporaryTitle` - Title-only search content  
- `isTitleOnlyActive` / `isQueryTextareaActive` - Field visibility controls
- `isContinueLoading` - Loading state for async operations

### Validation State
- `validationErrors` - Comprehensive error tracking for all field types
- Error types: `ENHANCED_QUERY`, `ENHANCED_QUERY_BOOLEAN_OPERATORS`, `QUERY_TITLE`

### Local State
- `isEditing` - Edit mode toggle
- `isSaving` - Save operation loading state

## Side Effects

### DOM Manipulation
- **Focus Management**: Programmatic focus on textareas after state changes
- **Textarea References**: Direct DOM access for enhanced user experience

### Validation Side Effects
- **Real-time Error Clearing**: Automatic validation error cleanup on input
- **Cross-field Validation**: Validation logic that considers multiple field states
- **Async Validation**: Promise-based validation with error state management

### State Persistence
- **Conditional Updates**: Only persist changes when values actually differ
- **Null Handling**: Proper cleanup of empty/whitespace-only values

## Dependencies

### UI Components
- `RichTextarea` - Enhanced textarea with syntax highlighting
- `Button` - Various action buttons with loading states
- `Typography` - Consistent text styling
- `BooleanOperatorsInfo` - Contextual help component

### Feature Components
- `TitleOnlyKeywordEditor` - Specialized editor for title searches
- `WithVerticalSeparator` - Layout component for visual separation
- `enhancedBooleanTextAreaRenderer` - Syntax highlighting renderer

### Utilities & Services
- `booleanAutoCompleteHandler` - Boolean operator autocomplete logic
- `validateSignalQueryFields` - Comprehensive validation service
- `useCreateSignalStore` - Zustand store hook

### Icons
- `PiAddLine`, `PiDeleteBin6Line`, `PiRefreshLine` - Action indicators

## Integration

### Signal Creation Flow
The component integrates into the broader signal creation workflow:

```tsx
// Part of multi-step signal creation
CreateSignalWizard
├── SignalBasicInfo
├── KeywordsEditor      // ← This component
├── AdvancedFilters
└── SignalPreview
```

### Store Architecture
Follows centralized state management pattern:
- **Global State**: All persistent data in Zustand store
- **Local State**: Only UI-specific temporary state
- **Validation Integration**: Coordinated with global validation system

### Validation Ecosystem
Integrates with application-wide validation:
- Uses shared validation error constants
- Implements consistent error message patterns
- Coordinates with form-level validation state

## Best Practices

### Architectural Adherence
✅ **Proper Client Component Usage**: Justified use of client-side rendering for interactive features
✅ **State Management Separation**: Clear distinction between global and local state
✅ **Component Decomposition**: Well-decomposed with specialized sub-components
✅ **Validation Integration**: Consistent with application validation patterns

### Performance Optimizations
- **Callback Memoization**: All event handlers properly memoized with `useCallback`
- **Conditional Rendering**: Efficient rendering based on state flags
- **Async Operations**: Non-blocking save operations with proper loading states

### User Experience
- **Progressive Enhancement**: Fields appear/disappear based on user needs
- **Immediate Feedback**: Real-time validation and error clearing
- **Accessible Focus Management**: Proper focus handling for keyboard navigation
- **Loading States**: Clear visual feedback during async operations

### Error Handling
- **Comprehensive Validation**: Multiple validation types with specific error messages
- **Graceful Degradation**: Continues to function even with validation errors
- **User-Friendly Messages**: Clear, actionable error feedback