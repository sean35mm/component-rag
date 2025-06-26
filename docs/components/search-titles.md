# SearchTitles Component

## Purpose

The `SearchTitles` component provides an expandable search input interface specifically designed for searching within titles. It features boolean operator auto-completion, syntax highlighting, and collapsible UI behavior. This component is part of a smart search modal system that allows users to refine their search queries with advanced title-specific filtering.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Interactive state management (expansion, editing states)
- Event handlers for keyboard input and user interactions
- DOM manipulation with refs and focus management
- Animation libraries (Framer Motion)

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onChangeValue` | `(value: string) => void` | Optional | Callback function triggered when the search value changes |
| `title` | `string` | Optional | Current title search value to display |
| `validationError` | `string \| null` | Optional | Error message to display for validation failures |
| `className` | `string` | Optional | Additional CSS classes to apply to the root element |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | Optional | Standard HTML div attributes |

## Usage Example

```tsx
import { useState } from 'react';
import { SearchTitles } from '@/components/search/smart-search-input/search-modal/search-titles';

function SearchModal() {
  const [titleQuery, setTitleQuery] = useState('');
  const [titleError, setTitleError] = useState<string | null>(null);

  const handleTitleChange = (value: string) => {
    setTitleQuery(value);
    // Clear error when user starts typing
    if (titleError) setTitleError(null);
  };

  const validateTitle = (query: string) => {
    if (query.length > 500) {
      setTitleError('Title search must be less than 500 characters');
      return false;
    }
    return true;
  };

  return (
    <div className="search-modal">
      <SearchTitles
        title={titleQuery}
        onChangeValue={handleTitleChange}
        validationError={titleError}
        className="border-b-2"
      />
    </div>
  );
}
```

## Functionality

### Core Features
- **Collapsible Interface**: Expands/collapses with smooth animations
- **Boolean Operator Support**: Auto-completion for AND, OR, NOT operators
- **Syntax Highlighting**: Real-time highlighting of boolean operators and brackets
- **Smart Focus Management**: Automatically focuses textarea when expanded
- **Clear Functionality**: One-click removal of search terms
- **Validation Display**: Shows error messages for invalid input

### Interactive Behaviors
- **Auto-expansion**: Expands automatically when `title` prop has value
- **Keyboard Navigation**: Supports boolean operator auto-completion via keyboard
- **Visual Feedback**: Hover states and transition animations
- **Event Isolation**: Prevents event propagation to parent components

## State Management

**Local State Only** - Uses React's built-in `useState` for:
- `isExpanded`: Controls collapse/expand state
- `isEditing`: Tracks whether the textarea is in edit mode

**External State Integration**:
- Receives search value via `title` prop (likely from parent form state)
- Communicates changes via `onChangeValue` callback
- Follows controlled component pattern for integration with form libraries

## Side Effects

### DOM Effects
- **Focus Management**: Uses `setTimeout` to focus textarea after expansion animation
- **Event Handling**: Attaches keyboard event handlers for boolean operator completion
- **Animation Triggers**: Coordinates with Framer Motion for smooth transitions

### No External API Calls
- Pure UI component with no direct server interactions
- Delegates data operations to parent components

## Dependencies

### UI Components
- `Button` - For the remove/clear action
- `RichTextarea` - Enhanced textarea with syntax highlighting
- `Typography` - Consistent text styling
- Icons: `PiAddLine`, `PiDeleteBin7Line`

### Animation & Interaction
- `framer-motion` - Smooth expand/collapse animations
- `react-collapsed` - Collapsible behavior hook

### Utility Functions
- `booleanAutoCompleteHandler` - Boolean operator auto-completion logic
- `combinedBooleanAndBracketRenderer` - Syntax highlighting renderer
- `cn` - Conditional className utility

## Integration

### Search Modal Architecture
```
SearchModal
├── SearchTitles (this component)
├── SearchContent (likely sibling)
├── SearchAuthors (likely sibling)
└── SearchFilters (likely sibling)
```

### Form Integration Pattern
- Designed to work with React Hook Form and Zod validation
- Controlled component pattern allows easy integration with form state
- Error handling supports form validation workflows

### Parent Component Responsibilities
- Managing overall search state
- Validating search inputs
- Coordinating between multiple search components
- Submitting search queries

## Best Practices

### Architecture Adherence
✅ **Client Component Usage**: Appropriately uses client-side rendering for interactive features  
✅ **Component Decomposition**: Single responsibility (title search only)  
✅ **Controlled Component**: Follows React patterns for form integration  
✅ **Event Handling**: Proper event isolation and propagation control  

### Recommended Usage Patterns
- Combine with form libraries for validation and submission
- Use within modal or sidebar contexts for search interfaces
- Integrate with debounced search for performance optimization
- Pair with other search refinement components for comprehensive search UI

### Performance Considerations
- Uses `useCallback` for event handlers to prevent unnecessary re-renders
- Implements controlled expansion to avoid layout thrashing
- Leverages `react-collapsed` for optimized collapse animations