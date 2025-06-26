# AllWorkflows Component

## Purpose

The `AllWorkflows` component serves as the main interface for displaying and selecting workflow options within an omnibar interface. It provides a comprehensive list of available workflows that users can search through and execute, with support for different layout configurations and conditional rendering based on user interaction states.

## Component Type

**Client Component** - Uses the `'use client'` directive (implied through hooks usage) because it:
- Manages interactive state through Zustand store (`useOmnibarStore`)
- Handles user interactions (clicks, selections, keyboard navigation)
- Performs real-time filtering based on search queries
- Uses callback functions for event handling

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `defaultWorkflow` | `ReactNode` | Yes | - | The default workflow to render when the editor is not empty (i.e., when the user starts typing) |
| `twoColumnLayout` | `boolean` | No | `false` | Whether to display workflow items in two columns instead of a single column |
| `workflowTitle` | `string` | No | `'Workflows'` | The title to display in the workflow section |
| `hideCommand` | `boolean` | No | `false` | Whether to hide the command for each workflow item |

## Usage Example

```tsx
import { AllWorkflows } from '@/components/omnibar/workflows/all-workflows';
import { CustomWorkflow } from '@/components/workflows/custom-workflow';

function OmnibarInterface() {
  return (
    <div className="omnibar-container">
      <AllWorkflows
        defaultWorkflow={<CustomWorkflow />}
        twoColumnLayout={true}
        workflowTitle="Available Actions"
        hideCommand={false}
      />
    </div>
  );
}

// Basic usage with minimal configuration
function SimpleOmnibar() {
  return (
    <AllWorkflows
      defaultWorkflow={<div>Start typing to search...</div>}
    />
  );
}
```

## Functionality

### Core Features
- **Workflow Filtering**: Real-time search filtering based on workflow commands
- **Layout Flexibility**: Support for single-column or two-column grid layouts
- **Conditional Rendering**: Switches between different views based on application state
- **Keyboard Navigation**: Integrated selector menu with keyboard support
- **File Search Integration**: Seamlessly transitions to file search when activated

### Key Behaviors
- Displays file selector when file search is active
- Shows default workflow when editor contains content and no workflow plugin match
- Filters workflows based on search query matching command text
- Handles workflow selection and execution through callback system
- Provides visual feedback for selected items

## State Management

### Zustand Store Integration
Uses `useOmnibarStore` for accessing and managing:
- `workflowsSearchQuery`: Current search filter text
- `isFileSearchActive`: Boolean flag for file search mode
- `workflowsPluginMatch`: Plugin matching state
- `setCurrentWorkflow`: Action to set the active workflow

### Local State
- `filteredWorkflows`: Computed from search query and workflow list
- `workflowsMenuItems`: Transformed workflow data for menu rendering
- `isNoWorkflowsFound`: Computed boolean for empty state handling

## Side Effects

### Event Handlers
- **Workflow Selection**: Triggers workflow activation through store action
- **Search Filtering**: Updates filtered results based on user input
- **Menu Navigation**: Handles keyboard and mouse interactions

### External Interactions
- Integrates with lexical editor tools for content state checking
- Communicates with omnibar store for state synchronization
- Triggers workflow execution through callback system

## Dependencies

### Components
- `FilesSelector`: Alternative view for file search mode
- `SelectorMenu` & `SelectorMenuItem`: Menu infrastructure components
- `WorkflowSection`: Layout wrapper for workflow content
- `WorkflowItem`: Individual workflow display component
- `Typography` & `Shortcut`: UI components for text display

### Hooks & Utilities
- `useLexicalEditorTools`: Editor state management
- `useOmnibarStore`: Global omnibar state access
- `DEFAULT_WORKFLOWS`: Static workflow configuration

### Types
- `Workflow`: Workflow data structure interface
- `SelectorMenuItem`: Menu item type definition

## Integration

### Omnibar Architecture
The component serves as a central hub within the omnibar system:
- **Entry Point**: Primary interface for workflow discovery
- **State Coordinator**: Manages transitions between different omnibar modes
- **Plugin Integration**: Responds to workflow plugin matching

### Search System
- Integrates with file search functionality
- Provides seamless transitions between workflow and file modes
- Maintains search context across mode switches

### Workflow Execution
- Acts as a launcher for various workflow types
- Maintains workflow state through global store
- Provides consistent interface for workflow activation

## Best Practices

### Architecture Adherence
- ✅ **Component Decomposition**: Uses composed UI components and feature-specific components
- ✅ **State Management**: Proper use of Zustand for global omnibar state
- ✅ **Reusability**: Configurable through props for different use cases
- ✅ **Separation of Concerns**: Clear distinction between UI logic and business logic

### Performance Considerations
- Uses `useMemo` for expensive computations (filtering, menu items)
- Implements `useCallback` for stable event handlers
- Minimizes re-renders through selective store subscriptions

### User Experience
- Provides clear visual feedback for different states
- Supports both mouse and keyboard interactions
- Offers flexible layout options for different screen sizes
- Includes helpful instructional text for user guidance