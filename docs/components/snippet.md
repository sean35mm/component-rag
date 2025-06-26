# Snippet Component

## Purpose

The `Snippet` component provides a collapsible text display with automatic clamping detection for cited source content. It renders text snippets with a visual border indicator and automatically determines when content is truncated, offering expand/collapse functionality to users when needed.

## Component Type

**Client Component** - Uses the `'use client'` directive (implicitly required) due to:
- Interactive state management with `useState`
- DOM refs with `useRef` for element measurement
- Resize observation with `useResizeObserver`
- Click event handlers for expand/collapse functionality

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `snippet` | `string` | Yes | The text content to display in the snippet |
| `isExpanded` | `boolean` | Yes | Controls whether the snippet is in expanded or collapsed state |
| `onIsExpandedChange` | `(isExpanded: boolean) => void` | Yes | Callback function called when the expand/collapse state should change |

## Usage Example

```tsx
import { useState } from 'react';
import { Snippet } from '@/components/story/cited-sources-drawer/snippet';

function CitedSourceCard() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const sourceText = `This is a long excerpt from a cited source that contains 
    detailed information about the topic being discussed. It may span multiple 
    lines and could potentially be quite lengthy, requiring truncation for 
    better user experience.`;

  return (
    <div className="p-4">
      <h3>Source Citation</h3>
      <Snippet
        snippet={sourceText}
        isExpanded={isExpanded}
        onIsExpandedChange={setIsExpanded}
      />
    </div>
  );
}

// Usage in a list of sources
function SourcesList({ sources }) {
  const [expandedStates, setExpandedStates] = useState({});
  
  const handleExpansion = (index: number, isExpanded: boolean) => {
    setExpandedStates(prev => ({
      ...prev,
      [index]: isExpanded
    }));
  };

  return (
    <div className="space-y-4">
      {sources.map((source, index) => (
        <Snippet
          key={index}
          snippet={source.text}
          isExpanded={expandedStates[index] || false}
          onIsExpandedChange={(expanded) => handleExpansion(index, expanded)}
        />
      ))}
    </div>
  );
}
```

## Functionality

- **Automatic Clamp Detection**: Dynamically determines if content is truncated using scroll height comparison
- **Responsive Clamping**: Adjusts clamp detection when component size changes through resize observation
- **Visual Indication**: Provides a left border to visually distinguish snippet content
- **Conditional Controls**: Only shows expand/collapse button when content is actually clamped
- **Smooth Transitions**: Uses CSS classes for line clamping with potential for smooth visual transitions

## State Management

**Local State Only** - Uses React's built-in `useState` for:
- `isClamped`: Tracks whether the text content is currently truncated
- Expansion state is controlled externally via props (controlled component pattern)

The component follows a controlled pattern where the parent manages the `isExpanded` state, promoting reusability and allowing for complex state coordination in parent components.

## Side Effects

- **Resize Observation**: Monitors element size changes to recalculate clamp state
- **DOM Measurement**: Measures element scroll height vs client height on resize events
- **Ref Management**: Maintains a ref to the text element for measurement purposes

## Dependencies

### Internal Dependencies
- `@/components/ui/link-button` - For the expand/collapse button
- `@/components/ui/typography` - For consistent text rendering
- `@/lib/utils/cn` - For conditional className composition

### External Dependencies
- `use-resize-observer` - For monitoring element resize events
- `react` - Core React functionality (useState, useRef)

## Integration

The `Snippet` component integrates into the story reading experience as part of the cited sources drawer:

```
Story Reader
├── Cited Sources Drawer
│   ├── Source List
│   │   ├── Source Item
│   │   │   ├── Source Metadata
│   │   │   └── Snippet ← This component
│   │   └── ...
└── ...
```

**Integration Patterns**:
- Used within cited source cards to display source excerpts
- Enables progressive disclosure of source content
- Maintains consistent visual hierarchy with border styling
- Supports responsive behavior in various container sizes

## Best Practices

✅ **Follows Architecture Guidelines**:
- **Controlled Component**: Delegates state management to parent for flexibility
- **Single Responsibility**: Focuses solely on snippet display and truncation
- **Reusable Design**: Generic enough for various text snippet scenarios
- **Proper Typing**: Exports utility function and well-defined props interface

✅ **Implementation Best Practices**:
- Uses resize observer for accurate clamp detection
- Implements proper ref typing with RefObject
- Provides accessible expand/collapse interactions
- Exports utility function `isNodeClamped` for reuse
- Uses semantic HTML structure with proper typography components

✅ **Performance Considerations**:
- Efficient resize observation without unnecessary re-renders
- Conditional rendering of expand/collapse button
- Leverages CSS classes for visual state changes

The component exemplifies good client component design by encapsulating complex DOM measurement logic while maintaining a clean, controlled interface for parent components.