# ChatWorkflow Component

## Purpose

The ChatWorkflow component provides a comprehensive chat interface for the omnibar system, enabling users to submit questions with configurable filters and AI templates. It handles the complete workflow from user input to navigation, creating new chat threads and managing the omnibar's open/closed state.

## Component Type

**Client Component** - Uses the `'use client'` directive due to:
- Interactive form submission with keyboard event handling
- Real-time state management with Zustand stores
- Navigation with route state management
- Lexical editor integration for rich text input

## Props Interface

### ChatWorkflowBase Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onSubmit` | `(question: string, filters: FiltersState \| null, savedFilterPresetId?: string \| null) => void` | Yes | Callback function triggered when user submits a question |

### ChatWorkflow Props

No props - This is the main export component that handles authentication internally.

### Chat Props

No props - Internal component that provides the submit handler for ChatWorkflowBase.

## Usage Example

```tsx
import { ChatWorkflow } from '@/components/omnibar/workflows/chat-workflow';

// Basic usage in omnibar
function OmnibarContent() {
  return (
    <div className="omnibar-container">
      <ChatWorkflow />
    </div>
  );
}

// Custom implementation with ChatWorkflowBase
import { ChatWorkflowBase } from '@/components/omnibar/workflows/chat-workflow';

function CustomChatWorkflow() {
  const handleSubmit = (question: string, filters: FiltersState | null, savedFilterPresetId?: string | null) => {
    // Custom submission logic
    console.log('Question:', question);
    console.log('Filters:', filters);
    console.log('Preset ID:', savedFilterPresetId);
  };

  return (
    <ChatWorkflowBase onSubmit={handleSubmit} />
  );
}
```

## Functionality

- **Question Input**: Integrates with Lexical editor for rich text question input
- **Filter Management**: Provides selectors for entities, topics, and AI templates
- **Keyboard Shortcuts**: Handles Enter key submission with duplicate prevention
- **Thread Creation**: Generates unique thread UUIDs for new chat sessions
- **Navigation**: Automatically navigates to answer threads with route state
- **Omnibar Control**: Closes omnibar after successful submission
- **Content Sanitization**: Sanitizes editor content before submission

## State Management

### Zustand Store Integration

```tsx
// Omnibar state management
const setIsOpen = useOmnibarStore((state) => state.setIsOpen);
const filters = useOmnibarStore((state) => state.filters);
const savedFilterPresetId = useOmnibarStore((state) => state.savedFilterPresetId);
```

### Local State

- **hasSubmitted**: Ref-based duplicate submission prevention
- **Route State**: Manages navigation with question and filter context

## Side Effects

- **Enter Key Registration**: Registers keyboard event handlers with Lexical editor
- **Navigation**: Pushes new routes with state when questions are submitted
- **Omnibar State**: Modifies global omnibar open/closed state
- **UUID Generation**: Creates unique identifiers for chat threads

## Dependencies

### Hooks
- `useLexicalEditorTools` - Editor integration and keyboard handling
- `useRouteState` - Navigation with state management
- `useAccessToken` - Authentication state
- `useOmnibarStore` - Global omnibar state management

### Components
- `AiTemplatesSelector` - AI template selection interface
- `EntitiesSelector` - Entity filtering interface
- `TopicsSelector` - Topic filtering interface

### Utilities
- `sanitizeEditorContent` - Content sanitization
- `GENERIC_TABS_TO_HREF` - URL mapping utilities
- `@lukeed/uuid/secure` - Secure UUID generation

## Integration

### Omnibar Ecosystem

```tsx
// Typical integration in omnibar workflow selector
function WorkflowSelector({ activeWorkflow }: { activeWorkflow: string }) {
  return (
    <div className="workflow-container">
      {activeWorkflow === 'chat' && <ChatWorkflow />}
      {activeWorkflow === 'search' && <SearchWorkflow />}
    </div>
  );
}
```

### Route State Integration

```tsx
// Integrates with answers thread routing
const routeState: AnswersThreadChatRouteState = {
  question: "User's question",
  filters: { entities: [...], topics: [...] },
  selectedSavedFilterId: "preset-id"
};
```

## Best Practices

### Architecture Adherence

✅ **Component Decomposition**: Properly stacked components (ChatWorkflow → Chat → ChatWorkflowBase)

✅ **State Management**: Uses Zustand for global state, local state for component-specific logic

✅ **Separation of Concerns**: Authentication, submission logic, and UI rendering are properly separated

✅ **Hook Integration**: Leverages custom hooks for editor tools and route management

### Implementation Patterns

```tsx
// ✅ Good: Proper callback memoization
const handleSubmit = useCallback(() => {
  // Implementation
}, [dependencies]);

// ✅ Good: Cleanup registration
useEffect(() => {
  return registerEnterCommandHandler(submitEventHandler);
}, [registerEnterCommandHandler, submitEventHandler]);

// ✅ Good: Conditional rendering based on authentication
if (!token) {
  return null;
}
```

### Performance Considerations

- Uses `useCallback` for event handlers to prevent unnecessary re-renders
- Implements duplicate submission prevention with refs
- Properly manages effect cleanup for keyboard handlers
- Conditional rendering prevents unnecessary component mounting