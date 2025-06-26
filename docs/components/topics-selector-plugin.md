# TopicsSelectorPlugin

## Purpose

The `TopicsSelectorPlugin` is a specialized Lexical editor plugin that enables topic selection functionality within the omnibar editor. It provides typeahead functionality triggered by the `#` character, allowing users to search and select topics as they type. This component acts as a bridge between the Lexical editor's typeahead system and the application's topic management functionality.

## Component Type

**Client Component** - This component uses the `'use client'` directive (implied by hooks usage) because it:
- Manages interactive typeahead functionality requiring real-time user input handling
- Uses React hooks (`useCallback`) and custom hooks for editor interactions
- Integrates with Lexical editor plugins that require client-side DOM manipulation
- Manages debounced search queries and editor state updates

## Props Interface

This component accepts no props and is designed to be used as a self-contained plugin.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | This component accepts no props |

## Usage Example

```tsx
import { TopicsSelectorPlugin } from '@/components/omnibar/omni-editor/plugins/topics-selector-plugin';

// Within an omnibar editor setup
function OmniEditor() {
  return (
    <LexicalComposer>
      <RichTextPlugin />
      <TopicsSelectorPlugin />
      {/* Other editor plugins */}
    </LexicalComposer>
  );
}

// The plugin automatically activates when users type '#' in the editor
// Example usage flow:
// 1. User types "#proj" in the editor
// 2. Plugin triggers topic search for "proj"
// 3. Debounced search query updates the store
// 4. Topic suggestions appear in typeahead menu
```

## Functionality

### Core Features

- **Hash Trigger Detection**: Automatically detects when users type `#` character to initiate topic selection
- **Debounced Search**: Implements 300ms debounced search to optimize performance and reduce API calls
- **Typeahead Integration**: Seamlessly integrates with Lexical's typeahead menu system
- **State Synchronization**: Keeps omnibar store synchronized with current search state and plugin matches

### Behavior Flow

1. **Trigger Detection**: Monitors editor input for `#` character with minimum 1 character following
2. **Search Query Management**: Updates search query in debounced manner as user continues typing
3. **Match Tracking**: Maintains current plugin match state for proper menu positioning
4. **Cleanup Handling**: Clears search state when typeahead is dismissed or cancelled

## State Management

### Zustand Store Integration

The component heavily relies on **Zustand** through `useOmnibarStore` for client state management:

```tsx
// State updates managed through omnibar store
const setTopicsSearchQuery = useOmnibarStore(state => state.setTopicsSearchQuery);
const setTopicPluginMatch = useOmnibarStore(state => state.setTopicPluginMatch);
```

### State Properties

- **topicsSearchQuery**: Current search query string for filtering topics
- **topicPluginMatch**: Current typeahead match information for menu positioning

## Side Effects

- **Debounced Search Updates**: Triggers search query updates with 300ms delay to prevent excessive API calls
- **Editor State Modifications**: Integrates with Lexical editor's command system for text replacement
- **Store State Synchronization**: Updates global omnibar state based on user interactions

## Dependencies

### Core Dependencies

- **Lexical Editor**: `@lexical/react/LexicalTypeaheadMenuPlugin` for typeahead functionality
- **Custom Hooks**: `useTypeaheadTriggerMatch` for trigger pattern matching
- **Utility Hooks**: `useDebounceCallback` from `usehooks-ts` for performance optimization
- **State Management**: `useOmnibarStore` for global state management

### Component Dependencies

- **LexicalTypeaheadPlugin**: Underlying typeahead implementation that this component configures
- **Omnibar Context**: Provides the store context for state management

## Integration

### Omnibar Editor Architecture

The component fits into the omnibar editor plugin system:

```
OmniEditor
├── LexicalComposer
├── RichTextPlugin
├── TopicsSelectorPlugin ← This component
├── OtherSelectorPlugins
└── TypeaheadMenuPlugin
```

### Store Integration

Works in conjunction with the omnibar store to manage:
- Current active plugin state
- Search query synchronization
- Topic selection results
- Menu visibility and positioning

## Best Practices

### Architecture Adherence

✅ **Proper State Management**: Uses Zustand for client state, avoiding unnecessary prop drilling

✅ **Performance Optimization**: Implements debouncing to prevent excessive API calls

✅ **Component Decomposition**: Leverages the generic `LexicalTypeaheadPlugin` for reusable functionality

✅ **Separation of Concerns**: Focuses solely on topic selection logic, delegating UI rendering to other components

### Usage Guidelines

- **Plugin Ordering**: Ensure this plugin is loaded after core Lexical plugins
- **Store Context**: Must be used within an omnibar store provider context
- **Editor Integration**: Requires proper Lexical editor setup with typeahead support
- **Performance**: The 300ms debounce delay balances responsiveness with performance

### Integration Patterns

- **Modular Design**: Can be easily enabled/disabled based on feature flags
- **Extensible**: Pattern can be replicated for other selector types (users, files, etc.)
- **Testable**: Clear separation of concerns makes unit testing straightforward