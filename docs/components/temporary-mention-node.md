# TemporaryMentionNode Component

## Purpose

The `TemporaryMentionNode` is a specialized Lexical editor node that represents temporary mention tokens (e.g., `@username`) during text input. It provides visual styling and behavior for mentions before they are resolved into permanent mention nodes, serving as an intermediate state in the mention creation process within the omni-editor.

## Component Type

**Lexical Node Class** - This is not a traditional React component but a Lexical editor node class that extends `BaseTokenNode`. It operates within the Lexical editor's node system and is used during text editing operations.

## Props Interface

### TemporaryMentionNode Constructor
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `token` | `string` | Yes | The mention token (e.g., "@username") |
| `text` | `string` | Optional | Display text for the node |
| `key` | `string` | Optional | Unique key for the node |

### Factory Functions
| Function | Parameters | Return Type | Description |
|----------|------------|-------------|-------------|
| `$createTemporaryMentionNode` | `mentionName: string` | `TemporaryMentionNode` | Creates a new temporary mention node |
| `$createTemporaryMentionNodeFromTextNode` | `textNode: TextNode` | `TemporaryMentionNode` | Creates temporary mention from existing text node |

## Usage Example

```tsx
import { 
  $createTemporaryMentionNode,
  $isTemporaryMentionNode,
  TEMPORARY_MENTION_NODE_MATCH_REGEX 
} from '@/components/omnibar/omni-editor/nodes/temporary-mention-node';
import { $getSelection, $isRangeSelection } from 'lexical';

// Creating a temporary mention node
function handleMentionInput(mentionText: string) {
  const temporaryMention = $createTemporaryMentionNode(mentionText);
  
  const selection = $getSelection();
  if ($isRangeSelection(selection)) {
    selection.insertNodes([temporaryMention]);
  }
}

// Processing text for mentions
function processMentionsInText(text: string) {
  const mentions = text.match(TEMPORARY_MENTION_NODE_MATCH_REGEX);
  mentions?.forEach(mention => {
    const node = $createTemporaryMentionNode(mention);
    // Insert node logic here
  });
}

// Type checking nodes
function processEditorNodes(nodes: LexicalNode[]) {
  nodes.forEach(node => {
    if ($isTemporaryMentionNode(node)) {
      // Handle temporary mention conversion
      console.log('Found temporary mention:', node.getTextContent());
    }
  });
}
```

## Functionality

### Core Features
- **Token Recognition**: Matches `@` followed by any non-`@` characters using regex pattern
- **Visual Styling**: Applies consistent styling with rounded borders, background, and typography
- **DOM Conversion**: Converts HTML elements to Lexical nodes and vice versa
- **Serialization**: Supports JSON serialization/deserialization for persistence
- **Text Entity Behavior**: Allows text insertion after the mention token

### Styling System
```tsx
// Applies consistent visual treatment
const styling = temporaryMentionClassName();
// Results in: rounded pill with border, background, and bold text
```

### Node Behavior
- **Directionless**: Toggles directionless mode for proper text flow
- **Normal Mode**: Sets to normal editing mode
- **Text Entity**: Behaves as a text entity allowing adjacent text input

## State Management

**No Direct State Management** - This component operates within Lexical's internal state management system. State is managed through:
- Lexical's editor state for node positioning and content
- Node replacement system for dynamic updates
- Serialization state for persistence

## Side Effects

### DOM Interactions
- **Element Creation**: Generates DOM elements with specific data attributes
- **Attribute Management**: Sets `data-lexical-temporary-mention` and `data-lexical-temporary-mention-name`
- **Style Application**: Applies CSS classes through class-variance-authority

### Editor Integration
- **Node Replacement**: Triggers Lexical's node replacement system
- **Selection Handling**: Integrates with editor selection and cursor positioning
- **Text Processing**: Participates in text transformation pipelines

## Dependencies

### Core Dependencies
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

### Related Components
- **BaseTokenNode**: Parent class providing token-specific behavior
- **MentionNode**: Final mention node after resolution
- **OmniEditor**: Container editor that utilizes this node type

## Integration

### Omnibar Architecture
```
OmniEditor
├── Mention Detection Plugin
├── TemporaryMentionNode (this component)
├── Mention Resolution Service
└── Final MentionNode
```

### Usage Flow
1. **Text Input**: User types `@username`
2. **Pattern Matching**: Regex detects mention pattern
3. **Node Creation**: Creates `TemporaryMentionNode`
4. **Visual Feedback**: Applies styling to show mention state
5. **Resolution**: Converts to permanent `MentionNode` when resolved

## Best Practices

### Architecture Adherence
- **Single Responsibility**: Focused solely on temporary mention representation
- **Lexical Integration**: Properly extends Lexical's node system
- **Type Safety**: Comprehensive TypeScript interfaces and type guards

### Performance Considerations
```tsx
// Efficient node checking
if ($isTemporaryMentionNode(node)) {
  // Process only when needed
}

// Regex compilation
export const TEMPORARY_MENTION_NODE_MATCH_REGEX = /@[^@]*/g;
// Pre-compiled regex for performance
```

### Styling Consistency
```tsx
// Uses CVA for consistent styling
export const temporaryMentionClassName = cva(
  'rounded-[10px] border border-pgStroke-200 bg-pgBackground-50...'
);
```

### Error Handling
- **Null Checks**: Validates DOM content before processing
- **Fallback Values**: Provides sensible defaults for missing data
- **Type Guards**: Uses proper type checking for node identification

This component exemplifies proper Lexical node architecture while maintaining consistency with the application's styling and TypeScript patterns.