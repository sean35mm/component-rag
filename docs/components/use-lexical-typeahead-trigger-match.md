# useTypeaheadTriggerMatch Hook

## Purpose
The `useTypeaheadTriggerMatch` hook is a custom React hook that provides enhanced typeahead trigger matching for Lexical editor components. It extends the basic typeahead functionality by allowing matches of complete strings including whitespaces and punctuation, making it ideal for mention systems, command palettes, or autocomplete features that need to capture multi-word inputs.

## Component Type
**Client Component Hook** - This hook uses React's `useCallback` and is designed to work with Lexical's client-side editor functionality. It must be used within client components as it handles real-time text input matching and DOM interactions.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `trigger` | `string` | ✅ | - | The character that triggers the typeahead matching (e.g., '@', '#', '/') |
| `options` | `object` | ❌ | `{}` | Configuration options for the trigger matching |
| `options.minLength` | `number` | ❌ | `1` | Minimum length of matching string required to trigger |
| `options.maxLength` | `number` | ❌ | `75` | Maximum length of matching string allowed |

## Usage Example

```tsx
'use client';

import { LexicalTypeaheadMenuPlugin } from '@lexical/react/LexicalTypeaheadMenuPlugin';
import { useTypeaheadTriggerMatch } from '@/components/hooks/use-lexical-typeahead-trigger-match';

function MentionPlugin() {
  // Basic mention trigger
  const checkForMentionMatch = useTypeaheadTriggerMatch('@', {
    minLength: 2,
    maxLength: 50
  });

  // Command trigger
  const checkForCommandMatch = useTypeaheadTriggerMatch('/', {
    minLength: 1,
    maxLength: 30
  });

  return (
    <>
      <LexicalTypeaheadMenuPlugin
        onQueryChange={setMentionQuery}
        onSelectOption={onSelectMention}
        triggerFn={checkForMentionMatch}
        options={mentionOptions}
        // ... other props
      />
      
      <LexicalTypeaheadMenuPlugin
        onQueryChange={setCommandQuery}
        onSelectOption={onSelectCommand}
        triggerFn={checkForCommandMatch}
        options={commandOptions}
        // ... other props
      />
    </>
  );
}

// In a rich text editor component
function RichTextEditor() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<div>Start typing...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <MentionPlugin />
    </LexicalComposer>
  );
}
```

## Functionality

### Core Features
- **Enhanced Pattern Matching**: Matches complete strings including spaces and punctuation
- **Configurable Triggers**: Supports any trigger character (@, #, /, etc.)
- **Length Constraints**: Enforces minimum and maximum length requirements
- **Context Awareness**: Recognizes trigger context (start of line, after whitespace, after parenthesis)
- **Replace String Detection**: Provides both matching string and replaceable string for clean substitutions

### Matching Behavior
- Triggers at beginning of line, after whitespace, or after opening parenthesis
- Captures all characters except the trigger character and punctuation
- Returns match object with offset positions for precise replacement
- Validates against length constraints before returning matches

## State Management
**Local State Only** - This hook uses React's `useCallback` for memoization and doesn't interact with external state management systems. It's a pure utility hook that processes text input and returns match results.

## Side Effects
**None** - This is a pure function hook that performs regex matching without side effects. It doesn't make API calls, modify DOM, or trigger external actions.

## Dependencies

### Internal Dependencies
- React (`useCallback` hook)

### External Dependencies
- `@lexical/react/LexicalTypeaheadMenuPlugin` - Provides `TriggerFn` type and `PUNCTUATION` constant
- Must be used within a Lexical editor context

### Related Components
- `LexicalTypeaheadMenuPlugin` - Primary consumer of this hook
- Mention/Command suggestion components
- Rich text editor implementations

## Integration

### Architecture Role
This hook serves as a bridge between user input and suggestion systems in rich text editors:

```
User Input → useTypeaheadTriggerMatch → LexicalTypeaheadMenuPlugin → Suggestion UI
```

### Common Integration Patterns

```tsx
// Feature-specific hooks that use this base hook
export function useMentionTrigger() {
  return useTypeaheadTriggerMatch('@', { minLength: 2, maxLength: 50 });
}

export function useHashtagTrigger() {
  return useTypeaheadTriggerMatch('#', { minLength: 1, maxLength: 30 });
}

export function useCommandTrigger() {
  return useTypeaheadTriggerMatch('/', { minLength: 1, maxLength: 20 });
}
```

## Best Practices

### Architectural Adherence
- ✅ **Single Responsibility**: Focused solely on trigger matching logic
- ✅ **Reusability**: Generic implementation that works with any trigger character
- ✅ **Type Safety**: Properly typed with Lexical's `TriggerFn` interface
- ✅ **Performance**: Memoized with `useCallback` to prevent unnecessary re-renders

### Usage Recommendations

```tsx
// ✅ Good: Create feature-specific wrapper hooks
const useMentionMatch = () => useTypeaheadTriggerMatch('@', { 
  minLength: 2, 
  maxLength: 50 
});

// ✅ Good: Reasonable length limits
const checkMatch = useTypeaheadTriggerMatch('#', { 
  minLength: 1, 
  maxLength: 30 
});

// ❌ Avoid: Extremely high max lengths (performance impact)
const badMatch = useTypeaheadTriggerMatch('@', { 
  maxLength: 1000 
});

// ❌ Avoid: Zero min length (too many false positives)
const tooPermissive = useTypeaheadTriggerMatch('#', { 
  minLength: 0 
});
```

### Performance Considerations
- Keep `maxLength` reasonable to avoid expensive regex operations
- Use appropriate `minLength` to reduce false positive matches
- The hook is memoized, so trigger and options should be stable references