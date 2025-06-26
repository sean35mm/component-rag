# WorkflowsManager Component

## Purpose

The `WorkflowsManager` component serves as the central orchestrator for different workflow types within the omnibar interface. It dynamically renders the appropriate workflow component based on the current workflow state and provides a unified interface for managing various user interactions like chat, search, signals, and stories. This component acts as a workflow router, ensuring the correct user interface is displayed for each specific task type.

## Component Type

**Client Component** - This component uses the `'use client'` directive (implicitly required) because it:
- Consumes Zustand store state via `useOmnibarStore`
- Manages dynamic UI state based on user workflow selection
- Requires client-side interactivity for workflow switching

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | `undefined` | Additional CSS classes to apply to the container element |
| `options` | `object` | No | `undefined` | Configuration options for workflow rendering |
| `options.twoColumnLayout` | `boolean` | No | `undefined` | Enables two-column layout for supported workflows |
| `options.workflowTitle` | `string` | No | `undefined` | Custom title to display for the workflow |
| `options.hideCommand` | `boolean` | No | `undefined` | Hides command interface elements when true |

## Usage Example

```tsx
import { WorkflowsManager } from '@/components/omnibar/workflows-manager';

// Basic usage
export function OmnibarInterface() {
  return (
    <div className="omnibar-container">
      <WorkflowsManager />
    </div>
  );
}

// With custom styling and options
export function CustomOmnibar() {
  return (
    <WorkflowsManager 
      className="custom-workflow-container"
      options={{
        twoColumnLayout: true,
        workflowTitle: "Advanced Search",
        hideCommand: false
      }}
    />
  );
}

// Using the switchWorkflow function directly
import { switchWorkflow } from '@/components/omnibar/workflows-manager';
import { OMNI_WORKFLOWS } from '@/lib/types';

export function DirectWorkflowUsage() {
  const workflowComponent = switchWorkflow(OMNI_WORKFLOWS.CHAT, {
    twoColumnLayout: false,
    workflowTitle: "Chat Assistant"
  });

  return (
    <div className="workflow-wrapper">
      {workflowComponent}
    </div>
  );
}
```

## Functionality

### Core Features

- **Dynamic Workflow Rendering**: Automatically renders the correct workflow component based on current state
- **Workflow Switching**: Provides `switchWorkflow` utility function for programmatic workflow management
- **Universal Prefill Support**: Always renders `PrefillWorkflow` for consistent data pre-population
- **Flexible Layout Options**: Supports various layout configurations through options prop
- **Fallback Handling**: Defaults to `AllWorkflows` with `ChatWorkflow` for unknown workflow types

### Supported Workflows

- **ALL**: Comprehensive workflow with default chat functionality
- **CHAT**: Direct chat interface
- **SIGNAL**: Signal-based interactions
- **SEARCH**: Search functionality
- **STORY**: Story creation and management
- **Default**: Falls back to ALL workflow for unrecognized types

## State Management

**Zustand Store Integration**:
- Consumes `currentWorkflow` from `useOmnibarStore`
- Reactively updates UI when workflow state changes
- No local state management - relies entirely on global store

```tsx
const currentWorkflow = useOmnibarStore((state) => state.currentWorkflow);
```

## Side Effects

- **Reactive Rendering**: Component re-renders when `currentWorkflow` changes in the store
- **Dynamic Component Loading**: Conditionally loads different workflow components based on state
- **No Direct API Calls**: Delegates API interactions to individual workflow components

## Dependencies

### Internal Dependencies
- `@/lib/contexts` - Omnibar store access
- `@/lib/types` - Workflow type definitions
- `@/lib/utils/cn` - CSS class name utility

### Workflow Components
- `AllWorkflows` - Comprehensive workflow interface
- `ChatWorkflow` - Chat-specific interface
- `PrefillWorkflow` - Data pre-population component
- `SearchWorkflow` - Search interface
- `SignalWorkflow` - Signal management interface
- `StoryWorkflow` - Story creation interface

## Integration

### Application Architecture Role

```
Omnibar System
├── WorkflowsManager (Central Router)
│   ├── PrefillWorkflow (Always Active)
│   └── Dynamic Workflow Component
│       ├── AllWorkflows
│       ├── ChatWorkflow
│       ├── SearchWorkflow
│       ├── SignalWorkflow
│       └── StoryWorkflow
```

### Store Integration
- Connects to global omnibar state management
- Serves as the primary consumer of workflow state changes
- Enables seamless workflow transitions throughout the application

## Best Practices

### Architecture Adherence

✅ **Proper Component Decomposition**: 
- Separates workflow routing logic from individual workflow implementations
- Uses composition over inheritance for workflow management

✅ **State Management Pattern**:
- Correctly uses Zustand for client-side workflow state
- Avoids prop drilling by consuming store directly

✅ **Reusability Design**:
- Exports both component and utility function for different use cases
- Provides flexible options interface for various integration scenarios

✅ **Error Handling**:
- Implements fallback workflow for unknown types
- Graceful degradation to default chat functionality

### Usage Recommendations

1. **Prefer Component Usage**: Use `<WorkflowsManager />` for most cases rather than `switchWorkflow` directly
2. **Options Configuration**: Leverage options prop for consistent workflow behavior across different contexts
3. **CSS Integration**: Use `className` prop for custom styling while maintaining base functionality
4. **Store Updates**: Update workflow state through store actions rather than direct manipulation