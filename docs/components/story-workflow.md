# StoryWorkflow Component Documentation

## Purpose

The `StoryWorkflow` component provides story search and navigation functionality within the omnibar interface. It manages the workflow for discovering and selecting stories, handling both search-based and trending story displays, with keyboard navigation support and smooth transitions to story pages.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive state with hooks (`useState`, `useEffect`, `useCallback`)
- Handles keyboard events through the Lexical editor
- Integrates with client-side navigation and state management
- Requires real-time user interaction for search and selection

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | This component accepts no props |

## Usage Example

```tsx
import { OmnibarProvider } from '@/lib/contexts';
import { StoryWorkflow } from '@/components/omnibar/workflows/story-workflow';

function OmnibarDialog() {
  return (
    <OmnibarProvider>
      <Dialog>
        <DialogContent>
          {/* Other workflow components */}
          <StoryWorkflow />
        </DialogContent>
      </Dialog>
    </OmnibarProvider>
  );
}
```

## Functionality

### Core Features
- **Dynamic Content Rendering**: Switches between search results and trending stories based on query state
- **Story Selection**: Handles story selection with proper state management and navigation
- **Keyboard Navigation**: Integrates with Lexical editor for Enter key command handling
- **Smooth Transitions**: Implements delayed navigation to allow omnibar closing animation
- **URL Generation**: Constructs proper story URLs using tab-to-href mapping utilities

### Behavior Patterns
- Displays `StoriesSearch` when a search query is active
- Shows `StoriesTrending` as the default view when no search query exists
- Closes omnibar and navigates to selected story on selection
- Registers workflow-specific keyboard handlers for enhanced UX

## State Management

### Zustand Store Integration
```tsx
// Omnibar state management
const selectedStoryMenuItem = useOmnibarStore(state => state.selectedStoryMenuItem);
const setIsOpen = useOmnibarStore(state => state.setIsOpen);
const storiesSearchQuery = useOmnibarStore(state => state.storiesSearchQuery);
```

### Local State
- `isDialogClosed`: Tracks omnibar closing state for delayed navigation
- `pendingSelectedStoryMenuItem`: Temporarily stores selected item during transition

## Side Effects

### Navigation Effect
```tsx
useEffect(() => {
  if (isDialogClosed && pendingSelectedStoryMenuItem) {
    redirectToStory(pendingSelectedStoryMenuItem.value);
    // Cleanup state after navigation
  }
}, [isDialogClosed, pendingSelectedStoryMenuItem]);
```

### Keyboard Handler Registration
```tsx
useEffect(() => {
  return registerEnterCommandHandler(enterCommandHandler);
}, [registerEnterCommandHandler, enterCommandHandler]);
```

## Dependencies

### Hooks
- `useLexicalEditorTools`: Keyboard command registration
- `useOmnibarStore`: Global omnibar state management
- `useRouter`: Next.js navigation

### Components
- `StoriesSearch`: Search results display
- `StoriesTrending`: Trending stories display

### Utilities
- `TABS_TO_HREF_BASE`: URL mapping for different tab types
- `TabEntity`: Type definitions for tab entities

### Types
- `SelectorMenuItem`: Interface for selectable menu items

## Integration

### Omnibar Architecture
```
OmnibarDialog
├── WorkflowSelector
├── StoryWorkflow ← This component
├── UserWorkflow
└── Other workflows
```

### Navigation Flow
1. User selects story → `onStorySelect` callback
2. Omnibar closes → `setIsOpen(false)`
3. Dialog animation completes → `isDialogClosed = true`
4. Navigation executes → `router.push(storyUrl)`
5. State cleanup → Reset pending selections

## Best Practices

### ✅ Architectural Adherence
- **Proper Client Component Usage**: Uses client directive only when necessary for interactivity
- **Flat Component Structure**: Delegates rendering to specialized search/trending components
- **Centralized State Management**: Leverages Zustand for cross-component state sharing
- **Hook-based Logic**: Properly separates concerns using custom hooks

### ✅ Performance Patterns
- **Callback Memoization**: Uses `useCallback` to prevent unnecessary re-renders
- **Effect Dependencies**: Properly manages effect dependency arrays
- **Conditional Rendering**: Efficiently switches between search and trending views

### ✅ User Experience
- **Keyboard Accessibility**: Implements Enter key handling for power users
- **Smooth Transitions**: Coordinates omnibar closing with navigation timing
- **State Consistency**: Maintains proper state cleanup after navigation

### ✅ Integration Patterns
- **Domain-specific Logic**: Handles story-specific workflow concerns
- **Shared Interface**: Uses common `SelectorMenuItem` interface for consistency
- **URL Management**: Leverages centralized URL mapping utilities