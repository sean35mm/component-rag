# useCreateTextEntityFromTextNode Hook

## Purpose

The `useCreateTextEntityFromTextNode` hook provides a reusable abstraction for creating custom text entities within Lexical editor instances. It leverages Lexical's text entity system to transform text nodes that match specific patterns (via regex) into custom node types, enabling rich text features like mentions, hashtags, links, or other interactive text elements.

## Component Type

**Client Component Hook** - This hook requires the 'use client' directive as it:
- Uses React hooks (`useCallback`) for client-side state management
- Integrates with Lexical's client-side editor functionality
- Performs text matching and DOM manipulation that occurs in the browser

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `matchRegex` | `RegExp` | Yes | Regular expression pattern to match text that should be converted to entities |
| `targetNode` | `Klass<T>` | Yes | Lexical node class that represents the target entity type |
| `createNode` | `(textNode: TextNode) => T` | Yes | Factory function that creates a new entity node from a matched text node |
| `isNodeAlreadyExists` | `(text: string) => string \| null` | Yes | Function to check if an entity already exists and return existing text or null |

### Generic Type Parameters

- `T extends TextNode` - The specific type of text node that will be created, must extend Lexical's `TextNode`

## Usage Example

```tsx
'use client';

import { useCreateTextEntityFromTextNode } from '@/components/hooks/use-create-text-entity-from-text-node';
import { MentionNode } from '@/lib/lexical/nodes/mention-node';
import { HashtagNode } from '@/lib/lexical/nodes/hashtag-node';

// Example 1: Creating mention entities
function useMentionEntity() {
  const mentionRegex = /@[\w]+/g;
  
  const createMentionNode = (textNode: TextNode) => {
    const text = textNode.getTextContent();
    const username = text.slice(1); // Remove @ symbol
    return new MentionNode(username);
  };
  
  const checkExistingMention = (text: string) => {
    // Check if mention already exists in your data store
    const username = text.slice(1);
    return userExists(username) ? text : null;
  };
  
  useCreateTextEntityFromTextNode(
    mentionRegex,
    MentionNode,
    createMentionNode,
    checkExistingMention
  );
}

// Example 2: Creating hashtag entities
function useHashtagEntity() {
  const hashtagRegex = /#[\w]+/g;
  
  const createHashtagNode = (textNode: TextNode) => {
    const text = textNode.getTextContent();
    const tag = text.slice(1); // Remove # symbol
    return new HashtagNode(tag);
  };
  
  const checkExistingHashtag = (text: string) => {
    // Always allow hashtag creation
    return text;
  };
  
  useCreateTextEntityFromTextNode(
    hashtagRegex,
    HashtagNode,
    createHashtagNode,
    checkExistingHashtag
  );
}

// Usage in editor component
function RichTextEditor() {
  useMentionEntity();
  useHashtagEntity();
  
  return (
    <LexicalComposer>
      <div className="editor-container">
        <RichTextPlugin />
      </div>
    </LexicalComposer>
  );
}
```

## Functionality

### Core Features

1. **Pattern Matching**: Uses regex to identify text patterns that should become entities
2. **Entity Validation**: Checks if entities already exist before creation
3. **Node Transformation**: Converts matched text nodes into custom entity nodes
4. **Automatic Integration**: Seamlessly integrates with Lexical's text entity system

### Text Processing Flow

1. **Text Analysis**: Scans text content for matches against the provided regex
2. **Existence Check**: Validates whether the matched entity should be created
3. **Match Positioning**: Calculates start and end positions for entity replacement
4. **Node Creation**: Transforms text nodes into custom entity nodes

## State Management

- **Local State**: Uses `useCallback` for memoizing the entity matching function
- **Lexical Integration**: Leverages Lexical's internal state management for text entities
- **No External State**: Does not require TanStack Query or Zustand as it operates on editor-local text transformation

## Side Effects

1. **Text Node Replacement**: Automatically replaces matching text nodes with entity nodes
2. **Editor State Mutation**: Modifies the Lexical editor's internal state when entities are created
3. **Pattern Monitoring**: Continuously monitors text changes for pattern matches

## Dependencies

### Internal Dependencies
- React's `useCallback` hook for performance optimization
- `@lexical/react/useLexicalTextEntity` for core text entity functionality

### External Dependencies
- `lexical` - Core Lexical editor types (`Klass`, `TextNode`)
- Custom Lexical node classes (e.g., `MentionNode`, `HashtagNode`)

### Related Components
- Lexical editor components (`LexicalComposer`, `RichTextPlugin`)
- Custom node implementations that extend `TextNode`

## Integration

### Editor Architecture
```
RichTextEditor Component
├── LexicalComposer
├── useCreateTextEntityFromTextNode (mentions)
├── useCreateTextEntityFromTextNode (hashtags)
├── useCreateTextEntityFromTextNode (links)
└── RichTextPlugin
```

### Domain Integration
- **Content Creation**: Enables rich text features in post/comment editors
- **Social Features**: Powers mention and hashtag functionality
- **Link Detection**: Automatically converts URLs to interactive link entities

## Best Practices

### Architectural Compliance

1. **Reusability**: ✅ Generic hook design allows for multiple entity types
2. **Flat Composition**: ✅ Hook can be used alongside other Lexical hooks without nesting
3. **Client-Side Only**: ✅ Properly marked for client-side usage with editor interactions

### Performance Optimizations

```tsx
// Memoize regex patterns
const mentionRegex = useMemo(() => /@[\w]+/g, []);

// Optimize existence checks with caching
const checkExistingMention = useCallback((text: string) => {
  // Use cached user data or debounced API calls
  return getCachedUser(text.slice(1)) ? text : null;
}, []);
```

### Error Handling

```tsx
const createMentionNode = (textNode: TextNode) => {
  try {
    const text = textNode.getTextContent();
    if (!text.startsWith('@')) {
      throw new Error('Invalid mention format');
    }
    return new MentionNode(text.slice(1));
  } catch (error) {
    console.error('Failed to create mention node:', error);
    return textNode; // Fallback to original text node
  }
};
```

### Type Safety

```tsx
// Ensure proper typing for custom nodes
interface CustomEntityNode extends TextNode {
  getEntityType(): string;
  getEntityData(): Record<string, any>;
}

const useTypedEntity = <T extends CustomEntityNode>(
  // ... properly typed parameters
) => {
  // Implementation with full type safety
};
```