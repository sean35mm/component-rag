# EditorErrorBoundary Component

## Purpose

The `EditorErrorBoundary` component serves as an error boundary wrapper for the Lexical editor within the omnibar system. It extends Lexical's built-in error boundary functionality to provide graceful error handling and recovery for editor-related errors, ensuring the application remains stable when text editing operations fail.

## Component Type

**Client Component** - This component extends `LexicalErrorBoundaryProps` which requires client-side JavaScript for error boundary functionality. Error boundaries must be client components as they need to catch JavaScript errors during rendering, in lifecycle methods, and in constructors of the component tree below them.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | ReactNode | Yes | The child components to be wrapped by the error boundary |
| onError | (error: Error) => void | No | Callback function called when an error is caught (inherited from LexicalErrorBoundaryProps) |
| fallback | ComponentType<{error: Error}> \| ReactNode | No | Fallback UI to display when an error occurs (inherited from LexicalErrorBoundaryProps) |

## Usage Example

```tsx
import { EditorErrorBoundary } from '@/components/omnibar/omni-editor/errors/editor-error-boundary';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';

function OmniEditor() {
  const handleEditorError = (error: Error) => {
    console.error('Editor error:', error);
    // Log to error tracking service
  };

  return (
    <LexicalComposer>
      <EditorErrorBoundary 
        onError={handleEditorError}
        fallback={<div>Something went wrong with the editor</div>}
      >
        <RichTextPlugin
          contentEditable={<div contentEditable />}
          placeholder={<div>Start typing...</div>}
        />
      </EditorErrorBoundary>
    </LexicalComposer>
  );
}
```

## Functionality

- **Error Containment**: Catches JavaScript errors in the Lexical editor component tree
- **Error Recovery**: Provides a fallback UI when errors occur, preventing app crashes
- **Error Reporting**: Supports error callback for logging and monitoring
- **Transparent Wrapper**: Acts as a pass-through container when no errors occur
- **Lexical Integration**: Seamlessly integrates with Lexical's error handling system

## State Management

This component does not manage application state directly. It:
- Uses React's built-in error boundary state (inherited from Lexical's implementation)
- Does not interact with TanStack Query or Zustand
- Maintains minimal internal state for error tracking and recovery

## Side Effects

- **Error Logging**: Triggers error callbacks when JavaScript errors are caught
- **UI Recovery**: Automatically renders fallback UI when errors occur
- **Error Boundary Reset**: May reset error state based on prop changes or user interactions

## Dependencies

### External Dependencies
- `@lexical/react/LexicalErrorBoundary` - Provides base error boundary functionality
- React - Core error boundary capabilities

### Internal Dependencies
- Typically used within Lexical editor composition
- Integrates with omnibar editor architecture
- May interact with error tracking services through callbacks

## Integration

The `EditorErrorBoundary` fits into the application architecture as:

```
Omnibar
└── OmniEditor
    └── EditorErrorBoundary
        └── LexicalComposer
            └── Editor Plugins & Components
```

- **Error Isolation**: Prevents editor errors from crashing the entire omnibar
- **User Experience**: Maintains app stability during text editing operations
- **Development Support**: Provides error information for debugging and monitoring
- **Production Safety**: Ensures graceful degradation in production environments

## Best Practices

### Architecture Adherence
- ✅ **Minimal Implementation**: Currently a simple wrapper, ready for extension
- ✅ **Component Decomposition**: Single responsibility for error handling
- ✅ **Client Component Usage**: Appropriately marked as client component for error boundaries
- ✅ **Interface Extension**: Properly extends Lexical's error boundary interface

### Recommended Enhancements
```tsx
// Enhanced implementation with better error handling
export function EditorErrorBoundary(props: EditorErrorBoundaryProps) {
  const { children, onError, fallback = <DefaultErrorFallback /> } = props;

  const handleError = useCallback((error: Error) => {
    // Log to monitoring service
    console.error('Editor Error:', error);
    onError?.(error);
  }, [onError]);

  return (
    <LexicalErrorBoundary onError={handleError} fallback={fallback}>
      {children}
    </LexicalErrorBoundary>
  );
}
```

### Integration Patterns
- Wrap the entire editor composition for maximum error coverage
- Provide meaningful fallback UI with recovery options
- Implement error logging for production monitoring
- Consider error boundary placement in the component hierarchy for optimal isolation