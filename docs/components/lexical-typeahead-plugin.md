# LexicalTypeaheadPlugin Component

## Purpose

The `LexicalTypeaheadPlugin` is a specialized Lexical editor plugin that provides typeahead functionality for the omnibar. It enables users to trigger autocomplete suggestions by typing specific characters (like `/` for commands) and handles the selection and replacement of text based on typeahead matches. This component is adapted from Lexical's official typeahead plugin and customized for the omnibar's specific requirements.

## Component Type

**Client Component** - This component uses the `'use client'` directive (implied by React hooks usage) because it:
- Manages local state with `useState`
- Uses effects with `useEffect` for DOM interactions
- Handles keyboard events and editor state changes
- Requires access to browser APIs like `document` and `window`

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onQueryChange` | `(matchingString: string \| null) => void` | Yes | Callback fired when the typeahead query changes |
| `triggerFn` | `ExtendedTriggerFn` | Yes | Function that determines when to trigger typeahead based on text input |
| `onTrigger` | `(resolution: MenuResolution) => void` | No | Callback fired when typeahead is triggered/opened |
| `onUnTrigger` | `() => void` | No | Callback fired when typeahead is closed/dismissed |
| `onMatchChange` | `(match: MenuTextMatch \| null) => void` | No | Callback fired when the current match changes |
| `onEnter` | `(matchingString: string) => void` | No | Callback fired when user selects a typeahead option |
| `clearEditorOnEnter` | `boolean` | No | Whether to clear the editor content when an option is selected |
| `preventDefaultOnEnter` | `boolean` | No | Whether to prevent default Enter key behavior |
| `enableSpacebarTrigger` | `boolean` | No | Whether spacebar can trigger selection (in addition to Enter/Tab) |

## Usage Example

```tsx
import { LexicalTypeaheadPlugin, useBasicTypeaheadTriggerMatch } from '@/components/omnibar/omni-editor/plugins/lexical-typeahead-plugin';

function OmniEditor() {
  const [query, setQuery] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Create a trigger function for commands starting with '/'
  const triggerFn = useBasicTypeaheadTriggerMatch('/', {
    minLength: 0,
    maxLength: 50
  });

  const handleQueryChange = (matchingString: string | null) => {
    setQuery(matchingString);
    if (matchingString) {
      // Fetch suggestions based on the query
      fetchCommandSuggestions(matchingString).then(setSuggestions);
    }
  };

  const handleEnter = (matchingString: string) => {
    // Execute the selected command
    executeCommand(matchingString);
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <LexicalTypeaheadPlugin
        triggerFn={triggerFn}
        onQueryChange={handleQueryChange}
        onEnter={handleEnter}
        preventDefaultOnEnter={true}
        enableSpacebarTrigger={false}
      />
      {/* Other editor plugins */}
    </LexicalComposer>
  );
}
```

## Functionality

### Core Features
- **Pattern Matching**: Uses regex patterns to detect typeahead triggers in text
- **Text Replacement**: Handles replacing matched text with selected options
- **Keyboard Navigation**: Supports Enter, Tab, and optionally Space for selection
- **Position Tracking**: Maintains cursor position and selection ranges
- **Content Cleanup**: Removes trigger text and normalizes whitespace after selection

### Key Behaviors
- Monitors editor state changes to detect trigger patterns
- Calculates text positions for accurate replacement
- Handles edge cases like entity boundaries and selection states
- Provides scroll management utilities for typeahead menus
- Supports custom node types through configuration

## State Management

**Local State**: Uses React's `useState` for:
- `resolution`: Current typeahead menu resolution state
- Component manages its own lifecycle through open/close callbacks

**No External State**: This plugin doesn't integrate with TanStack Query or Zustand directly, but provides callbacks for parent components to integrate with external state management systems.

## Side Effects

### DOM Interactions
- Creates and manages DOM `Range` objects for text selection
- Listens to keyboard events on the editor root element
- Calculates bounding rectangles for positioning

### Editor Integration
- Registers update listeners with the Lexical editor
- Registers command handlers for keyboard events
- Modifies editor content when options are selected

### Cleanup
- Removes event listeners on component unmount
- Unregisters editor listeners and commands

## Dependencies

### External Dependencies
- `@lexical/react/LexicalComposerContext` - Editor context access
- `@lexical/react/LexicalTypeaheadMenuPlugin` - Type definitions
- `lexical` - Core editor functionality and commands

### Internal Dependencies
- Requires a parent `LexicalComposer` context
- Works with other Lexical plugins in the editor ecosystem

## Integration

### Omnibar Architecture
- Integrates with the omnibar editor as a plugin
- Supports command-based interactions (e.g., `/search`, `/create`)
- Enables quick actions and navigation through typeahead

### Editor Plugin System
- Follows Lexical's plugin architecture patterns
- Can be combined with other editor plugins
- Provides extensible trigger functions for different use cases

## Best Practices

### Component Architecture Alignment
- ✅ **Single Responsibility**: Focused solely on typeahead functionality
- ✅ **Composition**: Designed as a plugin that composes with other editor features
- ✅ **Reusability**: Configurable trigger functions allow reuse across different contexts

### Performance Considerations
- Uses `startTransition` for non-urgent state updates
- Efficiently manages event listeners and cleanup
- Minimizes DOM queries through caching

### Usage Recommendations
```tsx
// ✅ Good: Use with specific trigger patterns
const triggerFn = useBasicTypeaheadTriggerMatch('/', { minLength: 1 });

// ✅ Good: Handle errors in callbacks
const handleQueryChange = (query: string | null) => {
  try {
    updateSuggestions(query);
  } catch (error) {
    console.error('Failed to update suggestions:', error);
  }
};

// ❌ Avoid: Don't use without proper cleanup
// Always ensure parent component handles the plugin lifecycle correctly
```