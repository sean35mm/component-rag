# MentionNode Component Documentation

## Purpose

The MentionNode component is a Lexical editor node implementation that represents user mentions (e.g., @username) within the omnibar editor. It extends the BaseTokenNode to create styled, interactive mention tokens that can be embedded in text content, providing a rich text editing experience for referencing users or entities.

## Component Type

**Lexical Node Class** - This is not a traditional React component but a Lexical editor node class that integrates with React-based Lexical editors. It operates within the Lexical framework's node system to provide custom mention functionality.

## Props Interface

### MentionNode Constructor
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `mentionName` | `string` | Yes | The name/identifier of the mentioned entity |
| `text` | `string` | Optional | Display text for the mention (inherited from BaseTokenNode) |
| `key` | `string` | Optional | Unique key for the node (inherited from BaseTokenNode) |

### SerializedMentionNode Interface
| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `mentionName` | `string` | Yes | The name/identifier of the mentioned entity |
| `type` | `'mention'` | Yes | Node type identifier |
| `version` | `1` | Yes | Serialization version |
| `text` | `string` | Yes | Display text content (from SerializedTextNode) |
| `format` | `number` | Yes | Text formatting flags (from SerializedTextNode) |
| `detail` | `number` | Yes | Text detail flags (from SerializedTextNode) |
| `mode` | `string` | Yes | Text mode (from SerializedTextNode) |
| `style` | `string` | Yes | Inline styles (from SerializedTextNode) |

## Usage Example

```tsx
import { $createMentionNode, $isMentionNode, mentionClassName } from '@/components/omnibar/omni-editor/nodes/mention-node';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

// Creating a mention node programmatically
function insertMention(mentionName: string) {
  const [editor] = useLexicalComposerContext();
  
  editor.update(() => {
    const mentionNode = $createMentionNode(mentionName);
    $insertNodes([mentionNode]);
  });
}

// Using in a mention picker component
function MentionPicker({ onSelectMention }: { onSelectMention: (name: string) => void }) {
  const handleUserSelect = (username: string) => {
    onSelectMention(username);
  };

  return (
    <div className="mention-picker">
      {users.map(user => (
        <button 
          key={user.id}
          onClick={() => handleUserSelect(user.username)}
          className={mentionClassName()}
        >
          @{user.username}
        </button>
      ))}
    </div>
  );
}

// Checking if a node is a mention node
editor.update(() => {
  const nodes = $getSelection()?.getNodes();
  nodes?.forEach(node => {
    if ($isMentionNode(node)) {
      console.log('Found mention:', node.__token);
    }
  });
});
```

## Functionality

### Core Features
- **Mention Token Creation**: Creates styled mention tokens with consistent visual appearance
- **Serialization/Deserialization**: Handles saving and loading mention nodes to/from JSON
- **DOM Conversion**: Converts HTML span elements with mention attributes to MentionNode instances
- **Type Safety**: Provides type guards and interfaces for safe mention node handling
- **Styling**: Applies consistent mention styling using class-variance-authority

### Key Methods
- `$createMentionNode(mentionName)`: Factory function to create new mention nodes
- `$isMentionNode(node)`: Type guard to check if a node is a mention node
- `$convertMentionElement(domNode)`: Converts DOM elements to mention nodes
- `importJSON()`: Deserializes mention nodes from JSON
- `importDOM()`: Handles DOM import with mention-specific attributes

## State Management

**No Direct State Management** - As a Lexical node class, this component doesn't manage React state directly. Instead:
- **Editor State**: Managed by Lexical's editor state system
- **Node Properties**: Stored as class properties (`__token`, `__text`, etc.)
- **Persistence**: Handled through Lexical's serialization system

The mention data itself would typically be managed by:
- **TanStack Query**: For fetching user data and mention suggestions
- **Zustand**: For managing mention picker state and selected mentions

## Side Effects

### DOM Interactions
- **Element Creation**: Creates styled DOM elements when rendered in the editor
- **Attribute Setting**: Sets `data-lexical-mention` and `data-lexical-mention-name` attributes
- **Class Application**: Applies CVA-generated classes for consistent styling

### Editor Integration
- **Node Registration**: Registers with Lexical's node system for recognition and handling
- **Event Handling**: Participates in editor events like selection, formatting, and deletion
- **Content Updates**: Triggers editor re-renders when mention content changes

## Dependencies

### Internal Dependencies
- `BaseTokenNode`: Parent class providing core token functionality
- `mentionClassName`: CVA-based styling configuration

### External Dependencies
- **Lexical**: Core editor framework and node system
- **class-variance-authority**: For dynamic class name generation
- **React**: Indirect dependency through Lexical React integration

### Related Components
- Omnibar editor components that consume mention nodes
- User search/picker components that create mentions
- Message/content display components that render mentions

## Integration

### Omnibar Editor Architecture
```
OmniEditor (Parent)
├── Lexical Editor Context
├── Mention Plugin
│   ├── MentionNode (this component)
│   ├── Mention Picker UI
│   └── Mention Detection Logic
└── Other Editor Nodes
```

### Data Flow
1. **User Input**: User types "@" trigger character
2. **Mention Detection**: Plugin detects mention trigger and shows picker
3. **Selection**: User selects mention from picker
4. **Node Creation**: `$createMentionNode()` creates mention node
5. **Editor Update**: Node inserted into editor state
6. **Rendering**: Node renders with styled appearance

## Best Practices

### Architecture Adherence
- **✅ Component Decomposition**: Single responsibility for mention node functionality
- **✅ Reusability**: Exported utilities can be used across different editor contexts
- **✅ Type Safety**: Strong TypeScript interfaces and type guards
- **✅ Styling**: Consistent styling using CVA pattern

### Usage Guidelines
```tsx
// ✅ Good: Use factory function
const mentionNode = $createMentionNode(username);

// ✅ Good: Use type guard
if ($isMentionNode(node)) {
  // Safe to access mention-specific properties
}

// ✅ Good: Handle serialization properly
const serialized = mentionNode.exportJSON();
const restored = MentionNode.importJSON(serialized);

// ❌ Avoid: Direct constructor usage
// const node = new MentionNode(name); // Use factory instead
```

### Performance Considerations
- **Immutable Updates**: Leverage Lexical's immutable node system
- **Efficient Rendering**: Minimal re-renders through proper node comparison
- **Memory Management**: Proper cleanup through Lexical's node lifecycle

### Integration Patterns
- Use with mention detection plugins for automatic mention creation
- Integrate with user search APIs through TanStack Query
- Combine with keyboard navigation for accessibility
- Support both mouse and keyboard mention selection workflows