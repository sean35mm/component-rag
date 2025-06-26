# ContentEditable Component

## Purpose

The `ContentEditable` component is a specialized wrapper around Lexical's `ContentEditable` that provides a customized text editing experience for the omnibar's editor. It applies consistent styling and enforces specific editing behaviors, particularly preventing line breaks to maintain single-line input functionality typical of command bars and search interfaces.

## Component Type

**Client Component** - Uses the `'use client'` directive (implicit through hooks usage). This is necessary because:
- Uses `useEffect` for DOM manipulation and event handling
- Integrates with Lexical editor state which requires client-side JavaScript
- Implements real-time text transformation behaviors
- Manages interactive text editing functionality

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | Optional | Additional CSS classes to apply to the content editable element |
| `...rest` | `LexicalContentEditableProps` | Optional | All other props from Lexical's ContentEditable component (placeholder, ariaLabel, etc.) |

*Inherits all props from `@lexical/react/LexicalContentEditable`*

## Usage Example

```tsx
import { ContentEditable } from '@/components/omnibar/omni-editor/content-editable';
import { LexicalComposer } from '@lexical/react/LexicalComposer';

function OmniEditor() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="relative">
        <ContentEditable
          className="focus:ring-2 focus:ring-blue-500"
          placeholder="Type a command or search..."
          ariaLabel="Omnibar input"
        />
      </div>
    </LexicalComposer>
  );
}
```

## Functionality

### Core Features
- **Text Editing**: Provides rich text editing capabilities through Lexical
- **Line Break Prevention**: Automatically removes line break nodes to maintain single-line input
- **Consistent Styling**: Applies standardized appearance using CVA class variants
- **Accessibility**: Inherits accessibility features from Lexical's ContentEditable

### Styling System
- Uses `class-variance-authority` for consistent styling
- Applies responsive design with minimum height and full width
- Implements theme-consistent text colors and typography

### Text Transformation
- Registers a node transform to automatically remove `LineBreakNode` instances
- Maintains single-line input behavior essential for command bar functionality

## State Management

**External State Dependencies**:
- Relies on Lexical editor state managed by parent `LexicalComposer`
- Uses `useLexicalEditorTools` hook to access editor instance
- No internal state management - purely presentational with behavior modifications

## Side Effects

### Editor Transformations
- **Node Registration**: Registers line break node transformation on mount
- **Real-time Processing**: Continuously monitors and removes line break nodes
- **Cleanup**: Properly unregisters transformations on unmount through `mergeRegister`

### DOM Interactions
- Manages focus and blur states
- Handles text input and editing operations
- Applies dynamic styling based on interaction state

## Dependencies

### Internal Dependencies
- `useLexicalEditorTools` - Custom hook for accessing Lexical editor instance
- CVA utility for class variance management

### External Dependencies
- `@lexical/react/LexicalContentEditable` - Base contenteditable component
- `@lexical/utils` - Utility functions for editor management
- `lexical` - Core Lexical editor types and nodes

## Integration

### Omnibar Architecture
```
OmniEditor (Parent)
├── LexicalComposer (Context Provider)
├── ContentEditable (This Component)
├── EditorPlugins
└── CommandProcessor
```

### Editor Ecosystem
- **Editor Context**: Operates within Lexical's editor context
- **Plugin System**: Works alongside other Lexical plugins
- **Command Processing**: Provides input interface for command parsing
- **Search Integration**: Serves as input mechanism for search functionality

## Best Practices

### Architecture Adherence
✅ **Single Responsibility**: Focused solely on content editing presentation and behavior  
✅ **Composition**: Wraps and extends Lexical's ContentEditable rather than reimplementing  
✅ **Reusability**: Designed as a specialized component for omnibar use cases  
✅ **Client-side Appropriate**: Correctly uses client component for interactive functionality  

### Implementation Patterns
✅ **Hook Integration**: Properly uses custom hooks for editor access  
✅ **Effect Management**: Properly registers and cleans up editor transformations  
✅ **Prop Forwarding**: Maintains flexibility by forwarding Lexical props  
✅ **Styling System**: Uses CVA for consistent and maintainable styling  

### Performance Considerations
- Minimal re-renders through proper effect dependencies
- Efficient node transformation registration
- Leverages Lexical's optimized rendering pipeline

### Usage Guidelines
- Always use within a `LexicalComposer` context
- Combine with appropriate plugins for full functionality
- Consider accessibility requirements when setting props
- Test line break prevention behavior in various input scenarios