# BaseTokenNode

## Purpose

`BaseTokenNode` is an abstract base class that extends Lexical's `TextNode` to provide specialized token functionality within the Omni Editor. It serves as the foundation for creating custom token types (like mentions, tags, or special commands) that need to be rendered with specific styling and behavior while maintaining proper serialization and DOM conversion capabilities.

## Component Type

**Abstract Class Component** - This is not a React component but rather a Lexical editor node class that integrates with React through the Lexical framework. It operates within the client-side editor context and requires 'use client' when used in components.

## Props Interface

### Constructor Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tokenName` | `string` | Yes | The token identifier/name |
| `text` | `string` | No | Display text (defaults to tokenName) |
| `key` | `NodeKey` | No | Lexical node key |

### Abstract Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `tokenType` | `string` | Yes | Unique identifier for the token type |
| `className` | `ReturnType<typeof cva>` | Yes | CVA function for styling classes |

### Type Definitions

```tsx
export type SerializedTokenNode = Spread<
  {
    tokenName: string;
    type: string;
    version: 1;
  },
  SerializedTextNode
>;
```

## Usage Example

```tsx
'use client';

import { cva } from 'class-variance-authority';
import { BaseTokenNode, $isBaseTokenNode } from '@/components/omnibar/omni-editor/nodes/base-token-node';

// Create a concrete implementation
class MentionTokenNode extends BaseTokenNode {
  tokenType = 'mention';
  
  className = cva([
    'inline-flex',
    'items-center',
    'px-2',
    'py-1',
    'bg-blue-100',
    'text-blue-800',
    'rounded-md',
    'font-medium'
  ]);

  static getType(): string {
    return 'mention';
  }

  static importJSON(serializedNode: SerializedTokenNode): MentionTokenNode {
    const { tokenName, text } = serializedNode;
    return new MentionTokenNode(tokenName, text);
  }
}

// Usage in editor configuration
const editorConfig = {
  nodes: [MentionTokenNode],
  // ... other config
};

// Type guard usage
function handleNodeSelection(node: LexicalNode) {
  if ($isBaseTokenNode(node)) {
    console.log('Token selected:', node.__token);
    console.log('Token type:', node.tokenType);
  }
}
```

## Functionality

### Core Features

- **Token Management**: Maintains token name and display text separately
- **DOM Conversion**: Handles conversion between DOM elements and Lexical nodes
- **Serialization**: Provides JSON export/import for persistence
- **Styling Integration**: Uses CVA (Class Variance Authority) for consistent styling
- **Text Entity Behavior**: Implements special text editing behaviors for tokens

### Key Methods

- `createDOM()`: Creates DOM element with proper classes and attributes
- `exportDOM()`: Exports to DOM with data attributes for external use
- `exportJSON()`: Serializes node data for persistence
- `toTextNode()`: Converts token back to plain text
- `getClassName()`: Returns array of CSS classes from CVA function

### Text Insertion Behavior

- **Before Token**: Prevents text insertion before token (`canInsertTextBefore(): false`)
- **After Token**: Allows text insertion after token (`canInsertTextAfter(): true`)

## State Management

**No Direct State Management** - As a Lexical node class, state is managed through:
- Lexical's internal node tree
- Editor state updates through Lexical commands
- Serialization/deserialization for persistence

## Side Effects

### DOM Manipulation
- Adds/removes CSS classes from DOM elements
- Sets `spellcheck="false"` on token elements
- Creates data attributes for external integrations

### Editor Integration
- Registers with Lexical's node system
- Participates in editor serialization/deserialization
- Affects text selection and editing behavior

## Dependencies

### External Dependencies
- **Lexical**: Core editor framework (`TextNode`, `LexicalNode`, etc.)
- **Class Variance Authority**: Styling utility (`cva`)

### Internal Dependencies
- Concrete implementations must provide `tokenType` and `className`
- Relies on editor configuration for proper registration

## Integration

### Omni Editor Architecture
```
OmniEditor
├── EditorConfig
│   ├── nodes: [ConcreteTokenNode]
│   └── theme: TokenStyling
├── TokenTransforms
│   ├── Text → Token conversion
│   └── Token → Text conversion
└── CommandHandlers
    ├── Token insertion
    └── Token deletion
```

### Usage Patterns
1. **Extend BaseTokenNode** for specific token types
2. **Register in Editor Config** as custom node
3. **Implement Transforms** for automatic token detection
4. **Add Commands** for programmatic token manipulation

## Best Practices

### Architectural Adherence

✅ **Component Decomposition**: Abstract base provides reusable token functionality
✅ **Reusability**: Enables consistent token behavior across different token types
✅ **State Management**: Integrates with Lexical's state system appropriately
✅ **Styling**: Uses CVA for maintainable, variant-based styling

### Implementation Guidelines

```tsx
// ✅ Good: Concrete implementation with proper typing
class HashtagTokenNode extends BaseTokenNode {
  static getType(): string {
    return 'hashtag';
  }
  
  tokenType = 'hashtag';
  className = cva(['token-base', 'token-hashtag']);
}

// ❌ Avoid: Direct instantiation of abstract class
// const token = new BaseTokenNode('test'); // Will fail

// ✅ Good: Use type guard for safe type checking
if ($isBaseTokenNode(node)) {
  // TypeScript knows this is a BaseTokenNode
  console.log(node.tokenType);
}
```

### Performance Considerations
- **Minimal DOM Updates**: Only updates classes when necessary
- **Efficient Serialization**: Lightweight JSON structure
- **Memory Management**: Proper cleanup through Lexical's lifecycle