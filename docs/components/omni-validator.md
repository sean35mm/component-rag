# OmniValidator Component

## Purpose

The `OmniValidator` component provides validation logic for the omnibar editor, ensuring users enter appropriate content before executing commands. It acts as a validation layer that intercepts Enter key presses and displays contextual error messages when the editor is empty or content doesn't match the selected workflow requirements.

## Component Type

**Client Component** - Uses the `'use client'` directive (implied by hook usage) because it:
- Manages interactive validation state
- Handles keyboard events (Enter key)
- Integrates with Lexical editor for real-time content validation
- Displays toast notifications for user feedback

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | This component accepts no props |

## Usage Example

```tsx
import { OmniValidator } from '@/components/omnibar/omni-validator/omni-validator';

// Used within the omnibar component structure
function OmnibarEditor() {
  return (
    <div className="omnibar-container">
      <LexicalComposer>
        <RichTextPlugin />
        <OmniValidator />
        {/* Other omnibar plugins */}
      </LexicalComposer>
    </div>
  );
}
```

## Functionality

### Core Features

- **Enter Key Validation**: Intercepts Enter key presses with high priority to validate content before execution
- **Workflow-Aware Validation**: Provides different validation messages based on the current workflow selection
- **Toast Notifications**: Shows contextual error messages when validation fails
- **Automatic Cleanup**: Dismisses validation toasts when content becomes valid

### Validation Rules

1. **ALL Workflow + Empty Content**: "Start with a question or command"
2. **Specific Workflow + Empty Content**: "Query required"
3. **Valid Content**: Dismisses all validation toasts and allows command execution

## State Management

### Zustand Store Integration
```tsx
const currentWorkflow = useOmnibarStore((state) => state.currentWorkflow);
```
- Subscribes to omnibar store for current workflow state
- Reactively updates validation logic based on workflow changes

### Local State
- No local state management
- Relies entirely on external state sources and hooks

## Side Effects

### Command Registration
- Registers Enter key handler with `COMMAND_PRIORITY_HIGH`
- Returns cleanup function to unregister handler

### Toast Management
- Shows validation error toasts when content is invalid
- Automatically dismisses all toasts on component unmount
- Dismisses toasts when validation passes

### Effect Cleanup
```tsx
useEffect(() => {
  return () => {
    dismiss(); // Cleanup toasts on unmount
  };
}, [dismiss]);
```

## Dependencies

### Hooks
- `useLexicalEditorTools` - Editor content validation and command registration
- `useToast` - Toast notification system
- `useOmnibarStore` - Workflow state management

### External Libraries
- **Lexical**: Command priority constants and editor integration
- **React**: Core hooks (useCallback, useEffect)

### Type Dependencies
- `OMNI_WORKFLOWS` - Workflow enumeration for validation logic

## Integration

### Omnibar Architecture
```
OmnibarComponent
├── LexicalComposer
│   ├── RichTextPlugin
│   ├── OmniValidator ← Validation layer
│   └── Other plugins
└── Workflow selector
```

### Command Flow
1. User types content in omnibar editor
2. User presses Enter key
3. OmniValidator intercepts with high priority
4. Validates content against current workflow
5. Shows error toast OR allows command to proceed

### Store Integration
- Subscribes to `useOmnibarStore` for workflow state
- Validates based on `OMNI_WORKFLOWS.ALL` vs specific workflows

## Best Practices

### Architecture Adherence ✅

- **Component Decomposition**: Single responsibility (validation only)
- **State Management**: Uses Zustand for shared state, no unnecessary local state
- **Client Component**: Appropriate use for interactive validation
- **Hook Integration**: Leverages custom hooks for editor and toast functionality

### Implementation Patterns ✅

```tsx
// Proper cleanup registration
useEffect(() => {
  return registerEnterCommandHandler(() => {
    return validateEditor();
  }, COMMAND_PRIORITY_HIGH);
}, [registerEnterCommandHandler, validateEditor]);

// Memoized validation logic
const validateEditor = useCallback((): boolean => {
  // Validation logic with early returns
}, [isEditorContentEmpty, currentWorkflow, toast, dismiss]);
```

### Performance Considerations
- Uses `useCallback` to prevent unnecessary re-registrations
- High priority command handling for immediate validation
- Efficient cleanup of side effects and event handlers