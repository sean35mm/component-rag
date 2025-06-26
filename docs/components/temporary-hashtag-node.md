# TemporaryHashtagNode Component

## Purpose

The `TemporaryHashtagNode` is a specialized Lexical.js editor node that represents hashtag tokens in a temporary state within the omnibar editor. It extends the `BaseTokenNode` to provide visual styling and behavior for hashtags that are being typed or edited before they are finalized. This component is part of the rich text editing system that allows users to create and manage hashtag content with real-time visual feedback.

## Component Type

**Lexical Editor Node** - This is not a traditional React component but rather a Lexical.js node class that integrates with React through the Lexical framework. It operates within the Lexical editor's virtual DOM system and provides custom rendering and behavior for hashtag tokens.

## Props Interface

### TemporaryHashtagNode Constructor

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `hashtagName` | `string` | Yes | The hashtag content without the '#' symbol |
| `text` | `string` | Optional | The display text (inherited from BaseTokenNode) |
| `key` | `string` | Optional | Unique identifier for the node (inherited) |

### SerializedTemporaryHashtagNode

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `hashtagName` | `string` | Yes | The hashtag name for serialization |
| `type` | `'temporary-hashtag'` | Yes | Node type identifier |
| `version` | `1` | Yes | Serialization version |
| `text` | `string` | Yes | Serialized text content |
| `format` | `number` | Yes | Text formatting flags |
| `detail` | `number` | Yes | Text detail flags |
| `mode` | `string` | Yes | Text mode |
| `style` | `string` | Yes | CSS styles |

## Usage Example

```tsx
import { 
  $createTemporaryHashtagNode, 
  $createTemporaryHashtagNodeFromTextNode,
  $isTemporaryHashtagNode,
  TEMPORARY_HASHTAG_NODE_MATCH_REGEX 
} from '@/components/omnibar/omni-editor/nodes/temporary-hashtag-node';
import { $getSelection, $isTextNode } from 'lexical';

// Creating a temporary hashtag node
function handleHashtagCreation(hashtagText: string) {
  const temporaryHashtagNode = $createTemporaryHashtagNode(hashtagText);
  // Insert into editor...
}

// Converting text node to temporary hashtag
function convertTextToTemporaryHashtag() {
  const selection = $getSelection();
  if (selection) {
    const nodes = selection.getNodes();
    nodes.forEach(node => {
      if ($isTextNode(node)) {
        const text = node.getTextContent();
        if (TEMPORARY_HASHTAG_NODE_MATCH_REGEX.test(text)) {
          const hashtagNode = $createTemporaryHashtagNodeFromTextNode(node);
          node.replace(hashtagNode);
        }
      }
    });
  }
}

// Type checking
function processNode(node: LexicalNode) {
  if ($isTemporaryHashtagNode(node)) {
    // Handle temporary hashtag specific logic
    console.log('Processing temporary hashtag:', node.getToken());
  }
}

// Pattern matching for hashtag detection
const text = "Check out #react and #typescript";
const hashtags = text.match(TEMPORARY_HASHTAG_NODE_MATCH_REGEX);
// Result: ["#react", "#typescript"]
```

## Functionality

### Core Features

- **Visual Styling**: Applies distinctive visual styling with rounded borders, background colors, and shadow effects
- **Token Management**: Manages hashtag content as discrete tokens within the editor
- **DOM Conversion**: Handles conversion between DOM elements and Lexical nodes
- **Serialization**: Supports JSON serialization and deserialization for persistence
- **Text Entity Behavior**: Behaves as a text entity that allows text insertion after it
- **Pattern Matching**: Provides regex pattern for identifying hashtag text

### Key Methods

- **`$createTemporaryHashtagNode()`**: Factory function for creating new instances
- **`$createTemporaryHashtagNodeFromTextNode()`**: Converts existing text nodes to hashtag nodes  
- **`$isTemporaryHashtagNode()`**: Type guard for identifying hashtag nodes
- **`$convertTemporaryHashtagElement()`**: Converts DOM elements to hashtag nodes

### Styling

The component uses `class-variance-authority` (CVA) for consistent styling:
- Rounded borders with 10px radius
- Light background with stroke borders
- Bold text with specific color theming
- Padding and shadow for visual distinction

## State Management

**Node-Level State** - This component manages its state through the Lexical editor's internal state system:

- **Token State**: Hashtag name and display text stored as node properties
- **Editor Integration**: State changes propagated through Lexical's command system
- **Serialization**: State persisted through JSON serialization for editor persistence

No external state management (TanStack Query/Zustand) is used as this operates within Lexical's self-contained state system.

## Side Effects

### Editor Integration
- **Node Registration**: Registers itself with the Lexical editor for rendering and behavior
- **DOM Manipulation**: Creates and manages DOM elements for visual representation
- **Event Handling**: Responds to editor events for text insertion and navigation

### Pattern Recognition
- **Text Parsing**: Actively monitors text input for hashtag patterns
- **Node Transformation**: Converts plain text to structured hashtag nodes when patterns match

## Dependencies

### Internal Dependencies
- **BaseTokenNode**: Extends this base class for common token functionality
- **Lexical Framework**: Core dependency for editor node functionality
- **CVA**: Class Variance Authority for styling management

### External Dependencies
```tsx
import { BaseTokenNode } from './base-token-node';
import { cva } from 'class-variance-authority';
import { 
  $applyNodeReplacement,
  DOMConversionMap,
  LexicalNode,
  TextNode 
} from 'lexical';
```

## Integration

### Omnibar Editor Architecture
```
OmniEditor
├── EditorNodes
│   ├── BaseTokenNode
│   ├── TemporaryHashtagNode ← This component
│   ├── MentionNode
│   └── Other specialized nodes
├── Transforms
│   └── HashtagTransform (uses TEMPORARY_HASHTAG_NODE_MATCH_REGEX)
└── Commands
    └── HashtagCommands (creates/manages temporary hashtag nodes)
```

### Editor Plugin Integration
- **HashtagPlugin**: Uses this node for hashtag recognition and creation
- **TokenTransformPlugin**: Applies pattern matching using the exported regex
- **SerializationPlugin**: Handles persistence using the serialization methods

### Data Flow
1. User types hashtag pattern (`#something`)
2. Pattern recognition triggers node creation
3. Text node replaced with `TemporaryHashtagNode`
4. Visual styling applied automatically
5. Node can be converted to permanent hashtag or removed

## Best Practices

### Architecture Adherence

✅ **Single Responsibility**: Focused solely on temporary hashtag representation
✅ **Composition**: Extends BaseTokenNode for shared token functionality  
✅ **Type Safety**: Comprehensive TypeScript interfaces and type guards
✅ **Separation of Concerns**: Visual styling separated using CVA patterns

### Usage Guidelines

- **Use factory functions**: Always use `$createTemporaryHashtagNode()` instead of direct instantiation
- **Type checking**: Use `$isTemporaryHashtagNode()` type guard before casting
- **Pattern matching**: Use exported regex constant for consistent hashtag detection
- **State management**: Let Lexical manage node state, avoid external state manipulation

### Performance Considerations

- **Node replacement**: Use `$applyNodeReplacement()` for proper editor integration
- **Batch operations**: Group multiple node operations within editor updates
- **Memory management**: Nodes are automatically cleaned up by Lexical's garbage collection

### Integration Patterns

```tsx
// ✅ Proper usage in editor transforms
editor.update(() => {
  const nodes = $getNodesByType(TextNode);
  nodes.forEach(node => {
    const text = node.getTextContent();
    if (TEMPORARY_HASHTAG_NODE_MATCH_REGEX.test(text)) {
      const hashtagNode = $createTemporaryHashtagNodeFromTextNode(node);
      node.replace(hashtagNode);
    }
  });
});

// ❌ Avoid direct instantiation
const node = new TemporaryHashtagNode('hashtag'); // Don't do this
```

This component exemplifies our architecture principles by maintaining clear boundaries, providing type safety, and integrating seamlessly with the larger omnibar editing system while following Lexical.js best practices.