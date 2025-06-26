# EntitiesSelectorPlugin

## Purpose

The `EntitiesSelectorPlugin` is a specialized Lexical editor plugin that enables entity selection through typeahead functionality in the omnibar. It triggers when users type the `@` symbol and provides intelligent search and selection capabilities for entities within the text editor context.

## Component Type

**Client Component** - Uses `'use client'` directive due to:
- Interactive user input handling and event management
- Integration with Lexical editor's imperative APIs
- Real-time state updates and debounced callbacks
- Browser-specific text matching and cursor positioning

## Props Interface

This component accepts no props - it's a self-contained plugin that integrates with the omnibar context.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | No external props accepted |

## Usage Example

```tsx
import { EntitiesSelectorPlugin } from '@/components/omnibar/omni-editor/plugins/entities-selector-plugin';

// Used within the Lexical editor context
function OmniEditor() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <RichTextPlugin />
      <EntitiesSelectorPlugin />
      {/* Other plugins */}
    </LexicalComposer>
  );
}

// Example of triggering the plugin
// User types: "Assign this to @john" 
// - Plugin activates on "@"
// - Searches for entities matching "john"
// - Provides typeahead suggestions
```

## Functionality

### Core Features

- **Trigger Detection**: Activates when users type `@` symbol
- **Debounced Search**: Implements 300ms debounce for optimal search performance
- **Real-time Query Updates**: Updates search results as users continue typing
- **Match State Management**: Tracks current typeahead match state
- **Clean Cleanup**: Properly resets state when trigger is removed

### Behavior Patterns

- **Minimum Length**: Requires at least 1 character after `@` trigger
- **Context Awareness**: Integrates with omnibar's global state
- **Non-blocking**: Doesn't prevent default Enter key behavior
- **Progressive Enhancement**: Gracefully handles state transitions

## State Management

### Zustand Integration

```tsx
// Omnibar store state management
const setEntitiesSearchQuery = useOmnibarStore(
  (state) => state.setEntitiesSearchQuery
);

const setEntityPluginMatch = useOmnibarStore(
  (state) => state.setEntityPluginMatch
);
```

### State Flow

1. **Query Updates**: Debounced search query updates to store
2. **Match Tracking**: Current typeahead match position and content
3. **Cleanup Handling**: Proper state reset on trigger removal

## Side Effects

### Debounced API Interactions

- **Search Query Updates**: 300ms debounced entity search queries
- **Store State Updates**: Real-time match state synchronization
- **Editor Integration**: Lexical editor state monitoring and updates

### Performance Optimizations

- Debounced search prevents excessive API calls
- Memoized callback functions for optimal re-render performance
- Efficient trigger matching with configurable parameters

## Dependencies

### Core Dependencies

```tsx
// Lexical editor integration
import { MenuTextMatch } from '@lexical/react/LexicalTypeaheadMenuPlugin';
import { LexicalEditor } from 'lexical';

// Utility hooks
import { useDebounceCallback } from 'usehooks-ts';

// Internal dependencies
import { useTypeaheadTriggerMatch } from '@/components/hooks/use-lexical-typeahead-trigger-match';
import { useOmnibarStore } from '@/lib/contexts';
import { LexicalTypeaheadPlugin } from '../lexical-typeahead-plugin';
```

### Hook Dependencies

- **useTypeaheadTriggerMatch**: Custom hook for trigger pattern matching
- **useDebounceCallback**: Performance optimization for search queries
- **useOmnibarStore**: Global state management for omnibar context

## Integration

### Omnibar Architecture

```tsx
// Integration within the omnibar ecosystem
OmniEditor
├── LexicalComposer
│   ├── RichTextPlugin
│   ├── EntitiesSelectorPlugin  ← This component
│   └── Other plugins
└── OmnibarProvider (Zustand store)
```

### Data Flow

1. **User Input** → `@` trigger detection
2. **Query Processing** → Debounced search query updates
3. **State Management** → Zustand store synchronization
4. **UI Updates** → Typeahead suggestions rendering
5. **Selection** → Entity insertion into editor

## Best Practices

### Architecture Adherence

- ✅ **Single Responsibility**: Focused solely on entity selection functionality
- ✅ **State Management**: Proper Zustand integration for global state
- ✅ **Performance**: Debouncing and memoization for optimal UX
- ✅ **Composition**: Builds on reusable `LexicalTypeaheadPlugin`

### Implementation Patterns

```tsx
// Proper debouncing pattern
const debouncedSetEntitiesSearchQuery = useDebounceCallback(
  setEntitiesSearchQuery,
  300
);

// Memoized callback for performance
const checkForWorkflowsMatch = useCallback(
  (text: string, editor: LexicalEditor): MenuTextMatch | null => {
    const slashMatch = checkForAtTriggerMatch(text, editor);
    return slashMatch || null;
  },
  [checkForAtTriggerMatch]
);

// Clean state management
const handleOnUnTrigger = useCallback(() => {
  setEntitiesSearchQuery(null);
}, [setEntitiesSearchQuery]);
```

### Future Considerations

- TODO comment indicates potential for active selector type management
- Extensible pattern allows for additional trigger types
- Configurable debounce timing for different use cases