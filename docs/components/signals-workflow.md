# SignalWorkflow Component

## Purpose

The `SignalWorkflow` component provides a workflow interface within the omnibar for creating new signals. It renders entity selectors, topic selectors, and AI template selectors, handling form submission by collecting editor content and selected filters to navigate to the signal creation page with pre-populated data.

## Component Type

**Client Component** - Uses `'use client'` directive (implied by hooks usage) because it:
- Manages interactive state through Zustand store
- Handles form submission and navigation
- Uses browser-specific hooks like `useRouter` and editor tools
- Requires user interaction handling with keyboard commands

## Props Interface

### SignalWorkflowBase

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onSubmit` | `(content: string) => void` | Yes | Callback function executed when the workflow form is submitted with sanitized editor content |

### SignalWorkflow

No external props - self-contained component that manages its own state and dependencies.

## Usage Example

```tsx
// Basic usage in omnibar
import { SignalWorkflow } from '@/components/omnibar/workflows/signals-workflow';

function OmnibarContent() {
  return (
    <div className="omnibar-container">
      <SignalWorkflow />
    </div>
  );
}

// Custom workflow with different submission handler
import { SignalWorkflowBase } from '@/components/omnibar/workflows/signals-workflow';

function CustomSignalWorkflow() {
  const handleCustomSubmit = (content: string) => {
    // Custom submission logic
    console.log('Signal content:', content);
    // Additional processing...
  };

  return (
    <SignalWorkflowBase onSubmit={handleCustomSubmit} />
  );
}
```

## Functionality

### Core Features
- **Multi-step Selection**: Provides entity, topic, and AI template selection interfaces
- **Content Sanitization**: Automatically sanitizes editor content before submission
- **Keyboard Shortcuts**: Registers Enter key handler for quick form submission
- **Authentication Handling**: Redirects unauthorized users to signals page
- **State Preservation**: Maintains selected filters and presets during navigation

### User Interactions
- Select entities and topics through dedicated selectors
- Choose AI templates for content assistance
- Submit form via Enter key or explicit submission
- Automatic omnibar closure on successful submission

## State Management

### Zustand Store Integration
```tsx
// Omnibar state management
const selectedEntities = useOmnibarStore(state => state.selectedEntitiesMap);
const selectedTopics = useOmnibarStore(state => state.selectedTopicsMap);
const filters = useOmnibarStore(state => state.filters);
const setIsOpen = useOmnibarStore(state => state.setIsOpen);
```

### Local State
- Uses callback memoization for submission handler optimization
- Leverages custom hooks for editor state management

## Side Effects

### Navigation Effects
- **Route State Management**: Uses `pushWithState` to navigate with preserved data
- **Unauthorized Redirect**: Redirects to `/signals` for unauthorized users
- **Omnibar Closure**: Automatically closes omnibar on successful submission

### Editor Integration
- **Command Registration**: Registers Enter key handler with lexical editor
- **Content Extraction**: Retrieves and sanitizes editor content on submission

## Dependencies

### Internal Components
- `EntitiesSelector` - Entity selection interface
- `TopicsSelector` - Topic selection interface  
- `AiTemplatesSelector` - AI template selection interface

### Custom Hooks
- `useLexicalEditorTools` - Editor content management and command handling
- `useRouteState<NewSignalCreationState>` - Stateful navigation management
- `useAccessToken` - Authentication state management

### External Libraries
- `next/navigation` - Next.js navigation utilities
- Zustand store (`useOmnibarStore`) - Global state management

### Utility Functions
- `sanitizeEntitiesAndTopics` - Data sanitization for entities/topics
- `sanitizeEditorContent` - Editor content sanitization

## Integration

### Omnibar Ecosystem
The component integrates seamlessly into the omnibar workflow system:

```tsx
// Typical omnibar integration
function OmnibarWorkflows() {
  const currentWorkflow = useOmnibarStore(state => state.currentWorkflow);
  
  return (
    <div>
      {currentWorkflow === 'signals' && <SignalWorkflow />}
      {/* Other workflows... */}
    </div>
  );
}
```

### Signal Creation Flow
1. User interacts with omnibar workflow selectors
2. Component aggregates selected entities, topics, and filters
3. On submission, navigates to `/signals/new` with state
4. Signal creation page receives pre-populated form data

## Best Practices

### Architecture Adherence
- ✅ **Component Decomposition**: Properly separated base component for reusability
- ✅ **State Management**: Uses Zustand for client state, maintains single source of truth
- ✅ **Flat Structure**: Avoids deep nesting, composes multiple selector components
- ✅ **Client Component Usage**: Appropriate use of client component for interactive workflow

### Performance Optimizations
- Uses `useCallback` for submission handler to prevent unnecessary re-renders
- Memoizes expensive operations in custom hooks
- Efficient state selection from Zustand store

### Error Handling
- Graceful handling of unauthorized states
- Safe navigation with authentication checks
- Sanitization prevents malformed data submission

### Accessibility
- Keyboard navigation support through Enter key handler
- Semantic structure with proper component composition
- Clear separation of concerns between selection and submission logic