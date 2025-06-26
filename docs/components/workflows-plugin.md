# WorkflowsPlugin Component

## Purpose

The `WorkflowsPlugin` is a Lexical editor plugin that provides workflow command detection and execution within the omnibar. It monitors for slash commands (e.g., `/story`, `/search`) and manages workflow transitions based on user input. The component handles text matching, command parsing, and state updates to enable seamless workflow switching in the omnibar interface.

## Component Type

**Client Component** - Uses the `'use client'` directive (implied by hooks usage) because it:
- Manages interactive keyboard events and user input
- Integrates with Lexical editor state and context
- Requires browser APIs for event handling
- Updates Zustand store state based on user interactions

## Props Interface

This component accepts no props - it operates as a self-contained plugin within the Lexical editor context.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | No external props accepted |

## Usage Example

```tsx
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { WorkflowsPlugin } from '@/components/omnibar/omni-editor/plugins/workflows-plugin';

function OmniEditor() {
  const initialConfig = {
    namespace: 'omnibar-editor',
    onError: (error: Error) => console.error(error),
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="omnibar-editor">
        <RichTextPlugin
          contentEditable={<ContentEditable />}
          placeholder={<div>Type / for commands...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <WorkflowsPlugin />
        <HistoryPlugin />
      </div>
    </LexicalComposer>
  );
}
```

## Functionality

### Core Features

1. **Slash Command Detection**
   - Monitors editor input for `/` trigger character
   - Matches workflow commands with minimum length of 0
   - Provides real-time command suggestion feedback

2. **Workflow Matching**
   - Integrates with `matchWorkflowFromQuery` utility
   - Maps text input to specific workflow types
   - Handles fallback to `OMNI_WORKFLOWS.ALL` for unmatched queries

3. **Text Content Management**
   - Removes completed commands from editor content
   - Maintains cursor position after command execution
   - Cleans up whitespace and formatting

4. **Keyboard Shortcuts**
   - Supports `Cmd+/` (Meta+/) shortcut for quick story workflow access
   - Prevents default browser behavior for custom shortcuts

### Command Processing Flow

```typescript
// User types: "/story create new feature"
// 1. Detects "/" trigger
// 2. Matches "story" to OMNI_WORKFLOWS.STORY
// 3. Removes "/story" from editor content
// 4. Leaves "create new feature" as search query
// 5. Sets current workflow to STORY
```

## State Management

### Zustand Store Integration

The component heavily integrates with the omnibar Zustand store:

```typescript
// Store state updates
const setWorkflowsSearchQuery = useOmnibarStore(state => state.setWorkflowsSearchQuery);
const setCurrentWorkflow = useOmnibarStore(state => state.setCurrentWorkflow);
const setWorkflowsPluginMatch = useOmnibarStore(state => state.setWorkflowsPluginMatch);

// State flow:
// User input → Plugin detection → Store updates → UI reactions
```

### Local State

- Minimal local state usage
- Relies on Lexical editor context for text content state
- Uses callbacks to prevent unnecessary re-renders

## Side Effects

### Event Listeners

1. **Global Keyboard Events**
   - Listens for `Cmd+/` shortcut globally
   - Properly cleans up event listeners on unmount
   - Prevents memory leaks with useEffect cleanup

2. **Editor State Updates**
   - Modifies Lexical editor content programmatically
   - Updates cursor position and text selection
   - Triggers re-renders in connected components

### External Integrations

- Updates omnibar store state affecting other components
- Integrates with workflow routing system
- Connects to search and command execution pipelines

## Dependencies

### Required Components & Hooks

```typescript
// Lexical ecosystem
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useBasicTypeaheadTriggerMatch } from '@lexical/react/LexicalTypeaheadMenuPlugin';

// Internal dependencies
import { useOmnibarStore } from '@/lib/contexts';
import { OMNI_WORKFLOWS } from '@/lib/types';
import { matchWorkflowFromQuery } from '@/lib/utils/omnibar';
import { LexicalTypeaheadPlugin } from '../lexical-typeahead-plugin';
```

### Context Requirements

- Must be wrapped within `LexicalComposer` context
- Requires omnibar store provider in component tree
- Depends on properly configured Lexical editor instance

## Integration

### Omnibar Architecture

```typescript
// Component hierarchy
OmnibarContainer
├── LexicalComposer
│   ├── RichTextPlugin
│   ├── WorkflowsPlugin        // This component
│   ├── HistoryPlugin
│   └── OtherPlugins
├── WorkflowResults
└── CommandSuggestions
```

### Data Flow

1. **Input Detection**: User types in editor → Plugin detects patterns
2. **Command Processing**: Plugin parses commands → Updates store state
3. **UI Updates**: Store changes → Other components react → Results displayed
4. **Workflow Execution**: Command confirmed → Navigate to workflow → Execute action

## Best Practices

### Architecture Adherence

✅ **Proper State Management**
- Uses Zustand for omnibar-specific client state
- Avoids prop drilling through context usage
- Maintains single source of truth for workflow state

✅ **Component Decomposition**
- Single responsibility: workflow command detection
- Minimal external dependencies
- Clean separation from UI rendering logic

✅ **Performance Optimization**
- Uses `useCallback` for stable function references
- Minimal re-renders through targeted store subscriptions
- Efficient event listener management

### Implementation Patterns

```typescript
// ✅ Good: Stable callback references
const handleOnEnter = useCallback((matchingString: string) => {
  // Command processing logic
}, [setCurrentWorkflow, editor]);

// ✅ Good: Proper cleanup
useEffect(() => {
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [setCurrentWorkflow]);

// ✅ Good: Targeted store subscriptions
const setWorkflowsSearchQuery = useOmnibarStore(
  (state) => state.setWorkflowsSearchQuery
);
```

### Error Handling

- Graceful fallback to `OMNI_WORKFLOWS.ALL` for unmatched commands
- Safe editor state reads with proper selection checking
- Defensive programming for text node operations