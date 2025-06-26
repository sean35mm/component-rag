# SearchQueries Component

## Purpose

The `SearchQueries` component provides an interactive search refinement interface that allows users to build complex search queries using boolean operators and keywords. It features a collapsible design with smooth animations, rich text editing capabilities with syntax highlighting, and real-time query validation. This component is part of the smart search system and enables advanced search functionality for filtering content based on titles and content.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Interactive state management for expansion/collapse behavior
- Real-time text input handling and validation
- Browser-specific APIs for focus management and keyboard event handling
- Animation libraries (Framer Motion) that depend on browser APIs
- Dynamic DOM manipulation for rich text rendering

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `onChangeValue` | `(value: string) => void` | No | `undefined` | Callback function triggered when the search query value changes |
| `expand` | `boolean` | No | `false` | Controls whether the component is initially expanded |
| `query` | `string` | No | `''` | Initial or controlled value for the search query |
| `validationError` | `string \| null` | No | `null` | Error message to display when query validation fails |
| `className` | `string` | No | `undefined` | Additional CSS classes to apply to the root element |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | No | `{}` | Standard HTML div attributes |

## Usage Example

```tsx
import { useState } from 'react';
import { SearchQueries } from '@/components/search/smart-search-input/search-modal/search-queries';

function SearchInterface() {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    
    // Example validation
    if (value.includes('(') && !value.includes(')')) {
      setError('Unmatched parentheses in query');
    } else {
      setError(null);
    }
  };

  const handleSearch = () => {
    if (query && !error) {
      // Perform search with the query
      console.log('Searching for:', query);
    }
  };

  return (
    <div className="search-container">
      <SearchQueries
        query={query}
        expand={isExpanded}
        onChangeValue={handleQueryChange}
        validationError={error}
        className="mb-4"
      />
      <button 
        onClick={handleSearch}
        disabled={!!error}
        className="search-button"
      >
        Search
      </button>
    </div>
  );
}
```

## Functionality

### Core Features
- **Collapsible Interface**: Smooth expand/collapse animation with visual state transitions
- **Rich Text Editing**: Syntax-highlighted textarea with boolean operator support
- **Auto-completion**: Intelligent completion for boolean operators (AND, OR, NOT)
- **Query Validation**: Real-time error display and validation feedback
- **Clear Functionality**: One-click query clearing with state reset
- **Keyboard Navigation**: Enhanced keyboard support with event handling

### Interactive Behaviors
- **Dynamic Focus Management**: Automatically focuses textarea when expanded
- **State Persistence**: Maintains query state across expand/collapse cycles
- **Visual Feedback**: Animated icons and layout changes based on state
- **Error Handling**: Contextual error display with visual indicators

## State Management

**Local State Management** using React's built-in hooks:

- `useState` for managing:
  - `isExpanded`: Controls collapse/expand state
  - `tempQuery`: Temporary query value for real-time editing
  - `isEditing`: Tracks active editing state
- `useRef` for direct DOM access to the textarea element
- `useEffect` for synchronizing props with internal state and managing side effects

The component follows a controlled/uncontrolled hybrid pattern where it can operate independently or be controlled by parent components through props.

## Side Effects

### DOM Interactions
- **Focus Management**: Programmatically focuses textarea after expansion animations
- **Event Propagation**: Prevents keyboard event bubbling to parent components
- **Scroll Behavior**: Manages textarea scroll position during text manipulation

### Animation Effects
- **Framer Motion**: Smooth transitions for icon and text positioning
- **React Collapsed**: Manages height animations for expand/collapse behavior

### Timing Dependencies
- **Delayed Focus**: 20ms timeout to ensure DOM updates complete before focusing
- **Animation Coordination**: Synchronized state changes with visual transitions

## Dependencies

### UI Components
- `Button` - For the remove/clear action
- `RichTextarea` - Core text input with syntax highlighting
- `Typography` - Consistent text styling and hierarchy

### Utility Functions
- `booleanAutoCompleteHandler` - Handles boolean operator auto-completion
- `combinedBooleanAndBracketRenderer` - Provides syntax highlighting for queries
- `cn` - Utility for conditional className concatenation

### External Libraries
- `framer-motion` - Animation and transition effects
- `react-collapsed` - Collapse/expand functionality

### Icons
- `PiAddLine` - Indicates expandable state
- `PiDeleteBin7Line` - Clear/remove action

## Integration

### Search System Architecture
This component integrates into the larger smart search system as a query refinement tool:

```
SearchModal
├── SearchQueries (this component)
├── SearchFilters
└── SearchResults
```

### Data Flow
1. **User Input**: Captures and validates search queries
2. **Parent Communication**: Communicates changes via `onChangeValue` callback
3. **Query Processing**: Integrates with boolean operator parsing and validation
4. **Search Execution**: Provides refined queries to search execution layer

### State Coordination
- Works with parent search modal state management
- Integrates with overall search form validation
- Coordinates with search result filtering and display

## Best Practices

### Architectural Adherence
✅ **Client Component Usage**: Appropriately uses client component for interactive features  
✅ **Component Decomposition**: Leverages existing UI components following Lego block principle  
✅ **Prop Interface**: Clean, well-typed interface with optional props for flexibility  
✅ **State Management**: Uses local state appropriately for component-specific behavior

### Implementation Patterns
✅ **Controlled Components**: Supports both controlled and uncontrolled usage patterns  
✅ **Error Handling**: Implements comprehensive validation and error display  
✅ **Accessibility**: Provides keyboard navigation and focus management  
✅ **Performance**: Uses useCallback for event handlers to prevent unnecessary re-renders

### Integration Guidelines
✅ **Single Responsibility**: Focuses solely on query input and refinement  
✅ **Composability**: Designed to integrate seamlessly with other search components  
✅ **Extensibility**: Prop-based configuration allows for diverse usage scenarios  
✅ **Type Safety**: Full TypeScript coverage with proper interface definitions