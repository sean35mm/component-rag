# PrefillWorkflow Component

## Purpose

The `PrefillWorkflow` component automatically prefills a Lexical editor with workflow-specific text based on the currently selected omnibar workflow. It acts as an invisible helper component that enhances user experience by providing contextual starter text for different workflow types (Chat, Search, Signal).

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive editor state through Lexical
- Uses React hooks (`useEffect`, `useCallback`) for side effects
- Subscribes to Zustand store state changes
- Manipulates DOM elements through the Lexical editor

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | This component accepts no props |

## Usage Example

```tsx
import { PrefillWorkflow } from '@/components/omnibar/workflows/prefill-workflow';
import { OmnibarEditor } from '@/components/omnibar/editor';

function OmnibarContainer() {
  return (
    <div className="omnibar-container">
      <OmnibarEditor />
      {/* Invisible component that handles prefilling */}
      <PrefillWorkflow />
    </div>
  );
}

// Using the exported utilities independently
import { WORKFLOWS_PREFILLED_TEXT, getPrefilledText } from './prefill-workflow';

const chatText = getPrefilledText(OMNI_WORKFLOWS.CHAT); // "What's the latest on "
const searchText = WORKFLOWS_PREFILLED_TEXT[OMNI_WORKFLOWS.SEARCH]; // "Analyze mentions of "
```

## Functionality

### Core Features

1. **Automatic Text Prefilling**: Inserts workflow-specific text when editor is empty
2. **Workflow Text Switching**: Replaces existing prefilled text when workflow changes
3. **Text Cleanup**: Removes prefilled text when switching to workflows without prefill
4. **Cursor Management**: Positions cursor at the end of prefilled text for immediate typing

### Prefilled Text Mapping

- **Chat Workflow**: `"What's the latest on "`
- **Search Workflow**: `"Analyze mentions of "`
- **Signal Workflow**: `"Stay updated on "`

### Editor State Logic

```tsx
// Prefill empty editor
if (prefilledText && textContent.trim() === '') {
  // Insert prefilled text
}

// Replace existing prefilled text
if (prefilledText && textContent.trim() !== '') {
  // Check if current text matches any prefilled text
  // Replace with new workflow text
}

// Clear prefilled text for workflows without prefill
if (!prefilledText) {
  // Remove any existing prefilled text
}
```

## State Management

### Zustand Store Integration

```tsx
const currentWorkflow = useOmnibarStore((state) => state.currentWorkflow);
```

- **Store**: `useOmnibarStore` - Tracks current workflow selection
- **Reactive**: Automatically responds to workflow changes
- **Pattern**: Follows our Zustand client state management guidelines

## Side Effects

### Editor Manipulation

- **Lexical Updates**: Modifies editor content through Lexical's update mechanism
- **Discrete Updates**: Uses `{ discrete: true }` to prevent unnecessary re-renders
- **DOM Interaction**: Indirectly manipulates DOM through Lexical's virtual editor state

### Workflow Synchronization

- **Effect Trigger**: Runs when `currentWorkflow` changes
- **Debounced**: Callback memoization prevents unnecessary re-executions

## Dependencies

### Core Dependencies

```tsx
// Lexical Editor Integration
import { useLexicalEditorTools } from '@/components/hooks/use-lexical-editor-tools';

// State Management
import { useOmnibarStore } from '@/lib/contexts';

// Type Definitions
import { OMNI_WORKFLOWS } from '@/lib/types';

// Lexical Core
import { $createTextNode, $getRoot, $insertNodes } from 'lexical';
```

### Component Relationships

- **Parent**: Omnibar container components
- **Sibling**: Lexical editor components
- **Hook Dependency**: `useLexicalEditorTools` for editor access

## Integration

### Application Architecture

```
Omnibar System
├── OmnibarContainer
│   ├── WorkflowSelector (updates store)
│   ├── LexicalEditor (renders content)
│   └── PrefillWorkflow (invisible helper)
└── OmnibarStore (Zustand)
    └── currentWorkflow state
```

### Data Flow

1. User selects workflow → Store updates
2. `PrefillWorkflow` detects change → Triggers effect
3. Component evaluates editor state → Determines action
4. Lexical editor updates → UI reflects changes

## Best Practices

### Architecture Adherence

✅ **Proper Client Component Usage**: Uses client-side features appropriately  
✅ **Single Responsibility**: Focused solely on prefilling functionality  
✅ **Zustand Integration**: Correctly subscribes to global state  
✅ **Hook Patterns**: Proper use of `useCallback` and `useEffect`  

### Code Quality

✅ **Memoization**: Callbacks are properly memoized  
✅ **Separation of Concerns**: Logic separated from presentation  
✅ **Type Safety**: Proper TypeScript usage with enum types  
✅ **Utility Exports**: Reusable functions exported for testing/external use  

### Performance Considerations

- **Discrete Updates**: Prevents unnecessary Lexical re-renders
- **Dependency Optimization**: Minimal effect dependencies
- **Conditional Logic**: Efficient text comparison and replacement