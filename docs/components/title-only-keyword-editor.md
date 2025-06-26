# TitleOnlyKeywordEditor Component

## Purpose

The `TitleOnlyKeywordEditor` is a specialized keyword input component designed for creating search signals that target only article titles. It provides a rich text editing experience with boolean operator autocomplete functionality, visual separators for multiple criteria, and removal capabilities. This component is specifically tailored for title-only keyword filtering in signal creation workflows.

## Component Type

**Client Component** - This component uses client-side features including:
- Interactive text editing with `RichTextarea`
- Keyboard event handling for boolean operator autocomplete
- Click handlers and state management
- Rich text rendering capabilities

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isActive` | `boolean` | Yes | Controls whether the component renders. Returns null if false |
| `title` | `string` | Yes | Current value of the title keyword input |
| `setTitle` | `(title: string) => void` | Yes | Callback function to update the title value |
| `isAllowedToRemove` | `boolean` | No | Whether to show the remove button. Defaults to false |
| `onRemove` | `() => void` | Yes | Callback function triggered when remove button is clicked |
| `onClick` | `() => void` | No | Optional click handler for the textarea |
| `isPreviousTextareaVisible` | `boolean` | No | Controls display of "AND" separator for chaining multiple editors |
| `...rest` | `Omit<TextareaHighlightProps, 'value'>` | No | Additional props passed to the underlying RichTextarea |

## Usage Example

```tsx
import { useState } from 'react';
import { TitleOnlyKeywordEditor } from '@/components/signals/creation/keywords-editor/title-only-keyword-editor';

function SignalCreationForm() {
  const [titleKeywords, setTitleKeywords] = useState('');
  const [isEditorActive, setIsEditorActive] = useState(true);

  const handleRemoveEditor = () => {
    setIsEditorActive(false);
    setTitleKeywords('');
  };

  const handleTitleChange = (newTitle: string) => {
    setTitleKeywords(newTitle);
  };

  return (
    <div className="space-y-4">
      <TitleOnlyKeywordEditor
        isActive={isEditorActive}
        title={titleKeywords}
        setTitle={handleTitleChange}
        isAllowedToRemove={true}
        onRemove={handleRemoveEditor}
        isPreviousTextareaVisible={false}
        onClick={() => console.log('Editor focused')}
      />
    </div>
  );
}
```

## Functionality

### Core Features
- **Conditional Rendering**: Only renders when `isActive` is true
- **Rich Text Editing**: Enhanced textarea with syntax highlighting for boolean operators
- **Boolean Operator Autocomplete**: Automatic completion of AND, OR, NOT operators
- **Visual Separation**: Shows "AND" connector when chaining multiple editors
- **Removal Capability**: Optional remove button for dynamic editor management
- **Sticky Labeling**: Persistent "TITLES ONLY" label for clear context

### Key Behaviors
- **Keyboard Shortcuts**: Handles boolean operator autocomplete on keydown events
- **Visual Hierarchy**: Uses vertical separators to show relationship between multiple editors
- **Responsive Design**: Adapts layout with flexible CSS classes
- **Accessibility**: Proper forwarded refs for form integration

## State Management

**Local State Management** - This component follows a controlled component pattern:
- Receives state (`title`) and state setter (`setTitle`) as props
- No internal state management - delegates to parent component
- Parent component responsible for managing editor lifecycle and values
- Integrates with higher-level form state management (likely React Hook Form)

## Side Effects

### Event Handlers
- **Keyboard Events**: `booleanAutoCompleteHandler` modifies input value based on boolean operator patterns
- **Click Events**: Optional click handler for focus management
- **Remove Events**: Triggers parent callback for editor removal

### DOM Interactions
- Text selection and cursor positioning through boolean autocomplete
- Focus management through forwarded refs
- Rich text rendering updates

## Dependencies

### UI Components
- `RichTextarea` - Core rich text editing functionality
- `Button` - Remove action button
- `Typography` - "AND" separator text styling
- `WithVerticalSeparator` - Visual connection between editors

### Utilities & Icons
- `PiDeleteBin6Line` - Delete icon for remove button
- `booleanAutoCompleteHandler` - Boolean operator autocomplete logic
- `enhancedBooleanTextAreaRenderer` - Rich text syntax highlighting

### Types
- `TextareaHighlightProps` - Base textarea functionality
- Custom interface extending textarea props with editor-specific requirements

## Integration

### Signal Creation Workflow
- Part of the keywords editor system in signal creation
- Works alongside other keyword editor types (full-text, metadata)
- Integrates with form validation and submission pipeline
- Connects to search query building logic

### Form Integration
- Designed for React Hook Form integration through forwarded refs
- Supports validation and error handling patterns
- Participates in larger signal configuration forms

### Design System
- Uses consistent spacing, typography, and color patterns
- Follows monospace font convention for code-like input
- Integrates with application's visual separator patterns

## Best Practices

### Component Architecture Adherence
- ✅ **Proper Decomposition**: Single responsibility for title-only keyword editing
- ✅ **Controlled Component**: Follows React best practices for form inputs
- ✅ **Ref Forwarding**: Properly forwards refs for form integration
- ✅ **Props Interface**: Clear, typed interface with logical prop grouping

### Performance Considerations
- ✅ **Conditional Rendering**: Early return prevents unnecessary DOM updates
- ✅ **Event Handler Optimization**: Stable event handlers through prop callbacks
- ✅ **Minimal Re-renders**: Controlled component pattern minimizes unnecessary updates

### Accessibility & UX
- ✅ **Semantic Structure**: Proper HTML structure with meaningful labels
- ✅ **Keyboard Navigation**: Full keyboard support with autocomplete
- ✅ **Visual Feedback**: Clear visual indicators for state and relationships
- ✅ **Progressive Enhancement**: Graceful degradation if JavaScript disabled

### Integration Patterns
- ✅ **Domain-Specific**: Specialized for signals/keywords domain
- ✅ **Composable**: Works well with other keyword editor components
- ✅ **Form-Friendly**: Integrates seamlessly with form libraries
- ✅ **State Delegation**: Properly delegates state management to parent