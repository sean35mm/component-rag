# AiTemplatesSuggestionsPlugin

## Purpose

The `AiTemplatesSuggestionsPlugin` is a Lexical editor plugin that monitors user input in the omnibar editor and triggers AI template suggestions based on the content. It manages search queries for AI templates, handles character limits, and provides auto-reset functionality for disabled AI suggestions.

## Component Type

**Client Component** - Uses the `'use client'` directive (implied by React hooks usage) because it:
- Manages interactive editor state changes
- Uses browser-specific debouncing and refs
- Handles real-time user input monitoring
- Integrates with Lexical editor plugins that require client-side execution

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `allowAutoReset` | `boolean` | No | `false` | Enables automatic reset of disabled AI suggestions after multiple attempts |

## Usage Example

```tsx
import { AiTemplatesSuggestionsPlugin } from '@/components/omnibar/omni-editor/plugins/ai-templates-suggestions-plugin';

// Basic usage in an omnibar editor
function OmniEditor() {
  return (
    <LexicalComposer>
      <div className="editor-container">
        <RichTextPlugin />
        <AiTemplatesSuggestionsPlugin />
        {/* Other plugins */}
      </div>
    </LexicalComposer>
  );
}

// With auto-reset enabled
function AdvancedOmniEditor() {
  return (
    <LexicalComposer>
      <div className="editor-container">
        <RichTextPlugin />
        <AiTemplatesSuggestionsPlugin allowAutoReset={true} />
        {/* Other plugins */}
      </div>
    </LexicalComposer>
  );
}
```

## Functionality

### Core Features
- **Content Monitoring**: Tracks editor content changes in real-time
- **AI Suggestions Management**: Enables/disables AI template suggestions based on content
- **Character Limit Enforcement**: Automatically disables suggestions when content exceeds `MAX_EDITOR_CHARACTER_COUNT` (200 characters)
- **Slash Command Detection**: Prevents AI suggestions when slash commands are being used
- **Auto-Reset Capability**: Optionally re-enables disabled AI suggestions after user attempts

### Behavior Logic
1. **Empty Content**: Clears search queries and enables AI suggestions
2. **Slash Commands**: Temporarily disables AI suggestions during slash command usage
3. **Character Limit**: Disables AI suggestions when content exceeds 200 characters
4. **Auto-Reset**: Re-enables suggestions after 2 attempts when `allowAutoReset` is true

## State Management

### Zustand Store Integration
Uses `useOmnibarStore` for global state management:
- `setAiTemplatesSearchQuery`: Updates the search query for AI templates
- `isDisableAiSuggestions`: Boolean flag for AI suggestions state
- `setIsDisableAiSuggestions`: Controls enabling/disabling of AI suggestions

### Local State
- `disabledAiSuggestionsAttemptsRef`: Tracks attempts for auto-reset functionality
- `debouncedSetAiTemplatesSearchQuery`: Debounced search query updates (300ms delay)

## Side Effects

### Debounced Search Updates
- Updates AI template search queries with 300ms debounce to prevent excessive API calls
- Sanitizes editor content before processing

### Auto-Reset Mechanism
- Tracks user attempts when AI suggestions are disabled
- Automatically re-enables suggestions after threshold is met

## Dependencies

### Core Dependencies
- `@lexical/react/LexicalOnChangePlugin`: Lexical editor change detection
- `lexical`: Core editor state management
- `usehooks-ts`: Debounce functionality

### Internal Dependencies
- `useLexicalEditorTools`: Editor instance access
- `useOmnibarStore`: Global omnibar state management
- `sanitizeEditorContent`: Content sanitization utility
- `useBasicTypeaheadTriggerMatch`: Slash command detection

## Integration

### Omnibar Architecture
The plugin integrates into the omnibar's multi-layered suggestion system:
```
OmniEditor
├── LexicalComposer
├── RichTextPlugin
├── AiTemplatesSuggestionsPlugin  ← This component
├── LexicalTypeaheadPlugin
└── Other plugins
```

### Store Integration
Connects to the global omnibar store to coordinate with:
- AI template suggestion components
- Other omnibar plugins and features
- Search result displays

## Best Practices

### Architecture Adherence
✅ **Proper State Management**: Uses Zustand for global omnibar state
✅ **Plugin Pattern**: Follows Lexical's plugin architecture
✅ **Debounced Updates**: Prevents excessive state updates and API calls
✅ **Content Sanitization**: Ensures clean input processing

### Performance Considerations
- Debounced search queries reduce unnecessary computations
- Character limit prevents processing of overly long content
- Efficient state updates through targeted store selectors

### Error Prevention
- Content sanitization before processing
- Character count validation
- Safe state transitions between enabled/disabled states

## Exports

```tsx
export const MAX_EDITOR_CHARACTER_COUNT = 200;
export function AiTemplatesSuggestionsPlugin;
```

The `MAX_EDITOR_CHARACTER_COUNT` constant can be imported for consistent character limit enforcement across the application.