# StorySearchPlugin

## Purpose

The `StorySearchPlugin` is a Lexical editor plugin that captures and processes text input in the omnibar editor specifically for story search workflows. It debounces user input, sanitizes content, and updates the global search state to enable real-time story searching functionality within the omnibar interface.

## Component Type

**Client Component** - Uses the `'use client'` directive (implicitly through hooks) because it:
- Manages interactive state with Zustand store
- Handles real-time text input events
- Uses debounced callbacks for performance optimization
- Integrates with Lexical editor's change detection system

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| None | - | - | This component accepts no props as it's a self-contained plugin |

## Usage Example

```tsx
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { StorySearchPlugin } from '@/components/omnibar/omni-editor/plugins/story-search-plugin';

function OmniEditor() {
  const initialConfig = {
    namespace: 'omni-editor',
    theme: {},
    onError: (error: Error) => console.error(error),
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<div>Search stories...</div>}
        ErrorBoundary={({ children }) => <div>{children}</div>}
      />
      {/* Story search functionality */}
      <StorySearchPlugin />
    </LexicalComposer>
  );
}
```

## Functionality

### Core Features

- **Workflow-Aware Processing**: Only activates when the current workflow is set to `OMNI_WORKFLOWS.STORY`
- **Real-time Search Updates**: Monitors editor content changes and updates search query in real-time
- **Content Sanitization**: Processes raw editor content through `sanitizeEditorContent` utility
- **Debounced Input**: Uses 300ms debounce to prevent excessive API calls during typing
- **State Synchronization**: Automatically clears selected story menu items when search query changes
- **Empty State Handling**: Properly clears search query when editor content is empty

### Behavior Patterns

```tsx
// Workflow filtering
if (currentWorkflow !== OMNI_WORKFLOWS.STORY) return;

// Content processing pipeline
const content = root.getTextContent();
const sanitizedContent = sanitizeEditorContent(content);

// State management
setSelectedStoryMenuItem(null);
debouncedSetStoriesSearchQuery(sanitizedContent);
```

## State Management

### Zustand Store Integration

Uses `useOmnibarStore` for centralized state management:

```tsx
const setStoriesSearchQuery = useOmnibarStore(
  (state) => state.setStoriesSearchQuery
);
const currentWorkflow = useOmnibarStore((state) => state.currentWorkflow);
const setSelectedStoryMenuItem = useOmnibarStore(
  (state) => state.setSelectedStoryMenuItem
);
```

### State Updates

- **Search Query**: Updates global story search query with debounced user input
- **Selected Item**: Clears selected story menu item when search changes
- **Workflow Context**: Reads current workflow to determine plugin activation

## Side Effects

### Performance Optimizations

- **Debounced Updates**: 300ms debounce prevents excessive state updates during rapid typing
- **Conditional Execution**: Early return when not in story workflow prevents unnecessary processing
- **Memoized Callbacks**: Uses `useCallback` to prevent unnecessary re-renders

### State Synchronization

- Automatically resets selected story menu item when search query changes
- Clears search query when editor content becomes empty
- Maintains consistency between editor content and global search state

## Dependencies

### External Libraries

- `@lexical/react/LexicalOnChangePlugin` - Core Lexical change detection
- `lexical` - Editor state management and content reading
- `usehooks-ts` - Debounce utility hook
- `react` - Core React functionality

### Internal Dependencies

- `@/lib/contexts` - Omnibar store for state management
- `@/lib/types` - Workflow type definitions
- `@/lib/utils/omnibar` - Content sanitization utilities

## Integration

### Omnibar Architecture

```
OmniEditor
├── LexicalComposer
├── RichTextPlugin
├── StorySearchPlugin ← This component
├── HistoryPlugin
└── Other plugins...
```

### Workflow Integration

- Integrates with omnibar workflow system
- Responds to `OMNI_WORKFLOWS.STORY` context
- Coordinates with story search results display
- Supports story selection and navigation

### Store Architecture

```
OmnibarStore
├── currentWorkflow
├── storiesSearchQuery ← Updated by this plugin
├── selectedStoryMenuItem ← Cleared by this plugin
└── setStoriesSearchQuery
```

## Best Practices

### Architecture Adherence

✅ **State Management**: Properly uses Zustand for client state management
✅ **Component Decomposition**: Single responsibility - only handles story search input
✅ **Performance**: Implements debouncing for optimal performance
✅ **Error Handling**: Graceful handling of empty content states

### Implementation Patterns

✅ **Hook Usage**: Leverages custom hooks (`useOmnibarStore`, `useDebounceCallback`)
✅ **Memoization**: Uses `useCallback` for performance optimization
✅ **Conditional Logic**: Implements workflow-aware activation
✅ **Content Processing**: Applies proper sanitization before state updates

### Integration Best Practices

✅ **Plugin Architecture**: Follows Lexical plugin patterns for editor integration
✅ **State Synchronization**: Maintains consistency across related state properties
✅ **Workflow Awareness**: Respects global application workflow context
✅ **Performance Optimization**: Balances real-time updates with system performance