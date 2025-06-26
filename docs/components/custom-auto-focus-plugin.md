# CustomAutoFocusPlugin

## Purpose

The `CustomAutoFocusPlugin` is a specialized Lexical editor plugin that automatically focuses the editor and manages cursor positioning within the omnibar's rich text editor. It provides intelligent focus behavior that adapts to different screen sizes and ensures proper editor focus state management, particularly for mobile responsiveness.

## Component Type

**Client Component** - This component uses the `'use client'` directive (implied by usage of hooks like `useEffect`) because it:
- Interacts directly with the DOM through focus management
- Uses browser-specific APIs (`document.activeElement`)
- Requires immediate user interaction handling
- Manages editor focus state that needs to respond to user actions

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `defaultSelection` | `'rootStart' \| 'rootEnd'` | Optional | `undefined` | Determines where the cursor should be positioned when the editor gains focus - either at the beginning or end of the content |

## Usage Example

```tsx
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { CustomAutoFocusPlugin } from '@/components/omnibar/omni-editor/plugins/custom-auto-focus-plugin';

function OmniEditor() {
  const initialConfig = {
    namespace: 'omni-editor',
    onError: (error: Error) => console.error(error),
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<div>Start typing...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      {/* Auto-focus at the end of existing content */}
      <CustomAutoFocusPlugin defaultSelection="rootEnd" />
    </LexicalComposer>
  );
}

// Usage in different scenarios
function SearchOmnibar() {
  return (
    <LexicalComposer initialConfig={config}>
      {/* Focus at start for new searches */}
      <CustomAutoFocusPlugin defaultSelection="rootStart" />
    </LexicalComposer>
  );
}

function EditingOmnibar() {
  return (
    <LexicalComposer initialConfig={config}>
      {/* Focus at end when editing existing content */}
      <CustomAutoFocusPlugin defaultSelection="rootEnd" />
    </LexicalComposer>
  );
}
```

## Functionality

### Core Features
- **Automatic Focus Management**: Ensures the editor gains focus when mounted or when focus conditions change
- **Cursor Positioning**: Controls where the text cursor appears within the editor content
- **Mobile Responsiveness**: Adapts focus behavior based on screen size using breakpoint detection
- **Focus State Validation**: Verifies and corrects focus state to prevent focus inconsistencies
- **Scroll Prevention**: Prevents unwanted scrolling when focusing (with Webkit limitations noted)

### Focus Behavior
- Automatically focuses the editor root element when the plugin mounts
- Validates that the focused element is actually within the editor's DOM tree
- Handles edge cases where Selection API and Focus API might diverge
- Re-establishes focus if the active element is outside the editor's scope

## State Management

**Local State Only** - This component uses:
- **No external state management** - Operates purely through Lexical's internal editor state
- **Effect-based side effects** - Uses `useEffect` to trigger focus behavior
- **Responsive state** - Leverages `useBreakpoint` hook for mobile detection
- **Editor context** - Accesses Lexical editor instance through context

The component doesn't manage persistent state but rather orchestrates focus behavior based on external conditions.

## Side Effects

### DOM Interactions
- **Editor Focus**: Directly calls `editor.focus()` to manage focus state
- **Element Focus**: Uses native `HTMLElement.focus()` with scroll prevention
- **DOM Queries**: Checks `document.activeElement` for focus validation
- **Element Containment**: Validates focus containment within editor boundaries

### Timing Effects
- **Mount-time Focus**: Triggers focus behavior when component mounts
- **Dependency Updates**: Re-runs focus logic when `defaultSelection`, `editor`, or `isMobile` changes
- **Responsive Updates**: Adjusts behavior when screen size breakpoints change

## Dependencies

### Internal Dependencies
- `@/components/hooks/use-breakpoint` - For responsive behavior detection
- Lexical Editor Context - For editor instance access

### External Dependencies
- `@lexical/react/LexicalComposerContext` - Lexical editor context provider
- `react` - Core React functionality (`useEffect`)

### Browser APIs
- **DOM Focus API** - For element focus management
- **Selection API** - For cursor positioning (indirectly through Lexical)

## Integration

### Omnibar Architecture
```
OmniEditor
├── LexicalComposer
├── RichTextPlugin
├── CustomAutoFocusPlugin ← This component
├── Other Lexical Plugins
└── ContentEditable
```

### Plugin Ecosystem
- **Complements** other Lexical plugins by ensuring proper initial focus state
- **Coordinates** with responsive design system through breakpoint detection
- **Integrates** with the broader omnibar user experience flow

### Application Flow
1. User activates omnibar (keyboard shortcut, click, etc.)
2. `CustomAutoFocusPlugin` ensures immediate editor focus
3. Cursor positioned according to `defaultSelection` prop
4. User can immediately begin typing without additional clicks

## Best Practices

### Architecture Adherence
- ✅ **Single Responsibility**: Focused solely on editor focus management
- ✅ **Client Component Usage**: Appropriately uses client-side rendering for DOM interactions
- ✅ **Hook Composition**: Leverages custom hooks (`useBreakpoint`) for reusable logic
- ✅ **Dependency Injection**: Receives configuration through props rather than hard-coding behavior

### Implementation Patterns
- ✅ **Effect Management**: Properly manages side effects with appropriate dependencies
- ✅ **Error Prevention**: Includes safety checks for null elements and focus validation
- ✅ **Mobile Consideration**: Adapts behavior for different device types
- ✅ **Plugin Architecture**: Follows Lexical plugin patterns (returns `null`, uses effects)

### Performance Considerations
- ✅ **Minimal Re-renders**: Effect dependencies are carefully chosen to prevent unnecessary updates
- ✅ **Conditional Logic**: Includes checks to prevent redundant focus operations
- ✅ **Browser Compatibility**: Acknowledges and documents Webkit limitations