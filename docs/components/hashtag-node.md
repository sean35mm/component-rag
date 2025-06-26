# HashtagNode Component

## Purpose
The `hashtag-node` is a specialized Lexical editor node that represents hashtag tokens within the omni-editor. It extends the BaseTokenNode to provide hashtag-specific functionality including visual styling, serialization, and DOM conversion for rich text editing experiences. This component enables users to create and interact with hashtag elements that are visually distinct and semantically meaningful within the editor content.

## Component Type
**Lexical Node Component** - This is neither a traditional Server nor Client Component, but rather a Lexical editor node class that operates within the client-side editor framework. It requires client-side interaction for text editing functionality and real-time DOM manipulation.

## Props Interface
Since this is a Lexical node class rather than a React component, it doesn't use traditional props but has the following key parameters:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `hashtagName` | `string` | Yes | The hashtag identifier/name used for the token |
| `__text` | `string` | Optional | The display text content of the node |
| `__key` | `string` | Optional | Unique identifier for the Lexical node |

## Usage Example

```tsx
import { 
  $createHashtagNode, 
  $isHashtagNode, 
  HashtagNode 
} from '@/components/omnibar/omni-editor/nodes/hashtag-node';
import { $getSelection, $isRangeSelection } from 'lexical';

// Creating a hashtag node programmatically
function insertHashtag(hashtagName: string) {
  const selection = $getSelection();
  if ($isRangeSelection(selection)) {
    const hashtagNode = $createHashtagNode(hashtagName);
    selection.insertNodes([hashtagNode]);
  }
}

// Usage in editor command or plugin
function handleHashtagInsertion() {
  editor.update(() => {
    insertHashtag('productivity');
  });
}

// Type checking existing nodes
function processEditorNodes(node: LexicalNode) {
  if ($isHashtagNode(node)) {
    // Handle hashtag-specific logic
    const hashtagName = node.getTextContent();
    console.log('Found hashtag:', hashtagName);
  }
}

// Registering the node with the editor
const editorConfig = {
  nodes: [HashtagNode],
  // ... other config
};
```

## Functionality

### Core Features
- **Visual Styling**: Applies consistent hashtag appearance with rounded borders, background color, and typography
- **Token Management**: Extends BaseTokenNode for standardized token behavior
- **Serialization**: Converts between DOM elements and Lexical node representations
- **Type Safety**: Provides TypeScript type guards and serialization interfaces
- **DOM Conversion**: Handles import/export of hashtag elements from HTML

### Key Methods
- `$createHashtagNode()`: Factory function for creating new hashtag instances
- `$isHashtagNode()`: Type guard for hashtag node identification
- `$convertHashtagElement()`: Converts DOM elements to hashtag nodes
- `importJSON()`: Deserializes hashtag nodes from JSON
- `importDOM()`: Handles DOM-to-node conversion mapping

## State Management
**Local Node State** - This component manages its own internal state through the Lexical node system:
- Hashtag name and text content are stored within the node instance
- Node formatting, styling, and mode are managed by the base Lexical infrastructure
- No external state management (TanStack Query/Zustand) required as this is a pure editor node

## Side Effects
- **DOM Manipulation**: Creates and updates DOM elements when rendered in the editor
- **Editor State Updates**: Triggers editor re-renders when hashtag nodes are added, modified, or removed
- **Serialization Events**: Participates in editor save/load operations through JSON serialization

## Dependencies

### Internal Dependencies
- `BaseTokenNode`: Parent class providing core token functionality
- `cva`: Class variance authority for dynamic styling

### External Dependencies
- `lexical`: Core Lexical editor framework and types
- Editor configuration and plugin system
- CSS classes following the design system (pgStroke, pgBackground, pgText)

## Integration

### Editor Integration
```tsx
// In the main editor configuration
import { HashtagNode } from './nodes/hashtag-node';

const editorConfig: InitialConfigType = {
  namespace: 'omni-editor',
  nodes: [
    HashtagNode,
    // ... other custom nodes
  ],
  // ... other config
};
```

### Plugin Integration
```tsx
// In hashtag plugin or transformer
import { $createHashtagNode } from './hashtag-node';

function hashtagTransformer() {
  return {
    tag: 'span',
    getNode: (element) => {
      if (element.hasAttribute('data-lexical-hashtag')) {
        return $createHashtagNode(element.textContent || '');
      }
      return null;
    }
  };
}
```

## Best Practices

### Architecture Adherence
- ✅ **Single Responsibility**: Focused solely on hashtag token representation
- ✅ **Type Safety**: Comprehensive TypeScript interfaces and type guards
- ✅ **Extensibility**: Built on BaseTokenNode for consistent token behavior
- ✅ **Styling Consistency**: Uses CVA for maintainable CSS class management

### Usage Guidelines
- Always use `$createHashtagNode()` factory function instead of direct instantiation
- Utilize `$isHashtagNode()` type guard for safe node type checking
- Ensure hashtag names are properly sanitized before node creation
- Follow Lexical's transaction patterns when creating or modifying hashtag nodes

### Performance Considerations
- Node creation is lightweight and optimized for real-time editing
- DOM conversion is efficient with targeted attribute checking
- Serialization format is minimal to reduce payload size