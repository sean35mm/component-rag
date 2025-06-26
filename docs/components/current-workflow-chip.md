# CurrentWorkflowChip Component Documentation

## Purpose

The `CurrentWorkflowChip` is a navigation and workflow selection component in the omnibar's infobar that displays the current active workflow and provides functionality to switch between different workflows. It acts as both a status indicator and a workflow selector, featuring a popover interface for workflow selection and a back button for returning to the default "All" workflow state.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages local state with `useState` for popover open/close state
- Handles user interactions (clicks, selections)
- Uses callback functions for event handling
- Requires browser-side interactivity for the popover and workflow switching functionality

## Props Interface

This component doesn't accept any props - it's a self-contained component that manages its own state and interactions through the omnibar store.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| - | - | - | No props accepted |

## Usage Example

```tsx
import { CurrentWorkflowChip } from '@/components/omnibar/infobar/current-workflow-chip';

// Basic usage in the infobar
function InfoBar() {
  return (
    <div className="infobar">
      <CurrentWorkflowChip />
      {/* Other infobar components */}
    </div>
  );
}

// The component automatically handles workflow state
// No configuration needed - it reads from omnibar store
function OmnibarLayout() {
  return (
    <div className="omnibar">
      <div className="infobar">
        <CurrentWorkflowChip />
      </div>
      <div className="editor">
        {/* Editor components */}
      </div>
    </div>
  );
}
```

## Functionality

### Core Features
- **Workflow Display**: Shows the current active workflow with appropriate styling
- **Workflow Selection**: Provides a popover interface to select different workflows
- **Back Navigation**: Displays a back button when not on the default "ALL" workflow
- **State Reset**: Automatically resets workflow-specific state when switching workflows
- **Editor Integration**: Clears and focuses the editor when returning to default state

### Interaction Patterns
- Click to open workflow selection popover
- Select workflow from dropdown options
- Use back button to return to "ALL" workflows
- Automatic popover closure on selection

## State Management

### Zustand Store Integration
Uses `useOmnibarStore` for:
- **`currentWorkflow`**: Current active workflow state
- **`setCurrentWorkflow`**: Updates the active workflow
- **`setWorkflowsSearchQuery`**: Resets search state when switching workflows
- **`resetStoryWorkflow`**: Resets story-specific workflow state

### Local State
- **`isOpen`**: Controls popover open/close state using `useState`

### State Flow
```typescript
// Workflow selection flow
handleWorkflowSelect(workflow) → setCurrentWorkflow() → setIsOpen(false)

// Back navigation flow
handleGoBack() → resetActiveWorkflow() → setCurrentWorkflow(ALL) → clearEditor() → focusEditor()
```

## Side Effects

### Editor Operations
- **`clearEditor()`**: Clears editor content when returning to default workflow
- **`focusEditor()`**: Focuses the editor after workflow reset

### Workflow Reset
- **Story Workflow**: Specifically resets story workflow state when switching away from story workflow
- **Search State**: Clears workflow search queries on navigation

## Dependencies

### Internal Components
- **`BackButton`**: Navigation component for returning to default workflow
- **`WorkflowDisplay`**: Displays current workflow information
- **`WorkflowOptions`**: Dropdown options for workflow selection
- **`Popover`**, **`PopoverContent`**, **`PopoverTrigger`**: UI components for dropdown interface

### Hooks & Stores
- **`useLexicalEditorTools`**: Editor manipulation (clear, focus)
- **`useOmnibarStore`**: Workflow state management

### Utilities & Types
- **`workflowChipContainer`**: Styling utility for container
- **`OMNI_WORKFLOWS`**: Workflow type constants
- **`Workflow`**: TypeScript interface for workflow objects

## Integration

### Omnibar Architecture
```
Omnibar
├── InfoBar
│   ├── CurrentWorkflowChip ← This component
│   └── Other info components
└── Editor Area
    └── Lexical Editor
```

### State Flow Integration
```typescript
// Component integrates with:
OmnibarStore ← CurrentWorkflowChip → LexicalEditor
     ↓                ↓                    ↓
Workflow State   UI Interactions    Editor Operations
```

### Workflow Ecosystem
- Works alongside workflow-specific components
- Coordinates with search functionality
- Integrates with editor state management

## Best Practices

### Architecture Adherence
✅ **Client Component Usage**: Correctly uses `'use client'` for interactive functionality
✅ **State Management**: Proper Zustand integration for global state
✅ **Component Decomposition**: Well-decomposed with separate display, options, and button components
✅ **Callback Optimization**: Uses `useCallback` for performance optimization

### Code Quality
✅ **Single Responsibility**: Focused on workflow chip functionality
✅ **Prop Interface**: Self-contained component with no complex prop drilling
✅ **Side Effect Management**: Properly handles editor and state cleanup
✅ **Type Safety**: Uses proper TypeScript interfaces and constants

### Integration Patterns
✅ **Store Integration**: Clean separation between UI and state logic
✅ **Component Composition**: Leverages reusable UI components from `/ui/`
✅ **Event Handling**: Proper event delegation and state updates
✅ **Performance**: Optimized with callbacks and controlled re-renders

### Recommendations
- Consider extracting workflow reset logic into a custom hook for reusability
- Could benefit from error boundary for workflow switching failures
- Consider adding keyboard navigation support for accessibility