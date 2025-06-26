# WorkflowItem Component Documentation

## Purpose

The `WorkflowItem` component renders individual workflow entries within an omnibar interface. It displays workflow information including icon, title, description, and optional keyboard shortcuts in a selectable, interactive format. This component serves as the building block for workflow selection lists in command palette or search interfaces.

## Component Type

**Client Component** - Uses `'use client'` directive because it:
- Handles user interactions (click events)
- Manages hover and selection states
- Uses `useCallback` hook for event handling optimization
- Requires DOM event listeners for user interaction

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `workflow` | `Workflow` | Yes | - | Workflow object containing icon, title, description, and command |
| `onClick` | `(workflow: Workflow) => void` | Yes | - | Callback function triggered when workflow item is clicked |
| `isSelected` | `boolean` | No | `false` | Whether the workflow item is currently selected/highlighted |
| `hideCommand` | `boolean` | No | `false` | Whether to hide the keyboard shortcut display |

## Usage Example

```tsx
import { WorkflowItem } from '@/components/omnibar/workflows/workflow-item';
import { Workflow } from '@/lib/types';

const ExampleWorkflowList = () => {
  const workflows: Workflow[] = [
    {
      id: 'create-task',
      title: 'Create Task',
      description: 'Create a new task in the current project',
      command: '⌘T',
      icon: <PlusIcon />
    },
    {
      id: 'search-files',
      title: 'Search Files',
      description: 'Search through project files',
      command: '⌘P',
      icon: <SearchIcon />
    }
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleWorkflowClick = (workflow: Workflow) => {
    console.log('Selected workflow:', workflow.id);
    // Execute workflow logic
  };

  return (
    <div className="space-y-2">
      {workflows.map((workflow, index) => (
        <WorkflowItem
          key={workflow.id}
          workflow={workflow}
          onClick={handleWorkflowClick}
          isSelected={selectedIndex === index}
          hideCommand={false}
        />
      ))}
    </div>
  );
};
```

## Functionality

### Core Features
- **Visual Workflow Display**: Shows workflow icon, title, and description in a structured layout
- **Selection States**: Visual feedback for selected/unselected states with CSS variants
- **Keyboard Shortcut Display**: Optional display of workflow command shortcuts
- **Click Handling**: Optimized click event handling with useCallback
- **Responsive Layout**: Flexible layout that adapts to content and container width

### Visual States
- **Default State**: Subtle background with border styling
- **Hover State**: Enhanced background opacity on mouse over
- **Selected State**: Distinct background styling to indicate current selection
- **Dark Mode Support**: Automatic theme adaptation through CSS custom properties

### Layout Structure
- **Left Section**: Icon and text content with flexible spacing
- **Right Section**: Optional keyboard shortcut display
- **Responsive Behavior**: Text truncation and flexible sizing for various container widths

## State Management

**Local State Only** - This component:
- Uses `useCallback` for memoized click handler optimization
- Receives all state through props (isSelected, workflow data)
- Delegates state management to parent components
- Follows stateless component pattern for maximum reusability

## Side Effects

**No Direct Side Effects** - The component:
- Does not make API calls or external requests
- Does not modify global state directly
- Triggers callbacks to parent components for state changes
- Maintains pure component behavior for predictable rendering

## Dependencies

### Internal Dependencies
- `@/components/ui/shortcut` - Keyboard shortcut display component
- `@/components/ui/typography` - Text styling and typography system
- `@/lib/types` - Workflow type definitions

### External Dependencies
- `class-variance-authority` - CSS variant management for styling states
- `react` - Core React hooks (forwardRef, useCallback)

### Type Dependencies
- `Workflow` interface from types system
- `VariantProps` for component styling variants

## Integration

### Application Architecture Role
- **Omnibar System**: Core building block for workflow selection interfaces
- **Command Palette**: Individual item renderer in command/search interfaces
- **List Components**: Reusable item component for workflow listing scenarios

### Parent Component Integration
```tsx
// Typical parent component pattern
const WorkflowList = () => {
  const { workflows } = useWorkflows(); // TanStack Query
  const { selectedIndex, selectWorkflow } = useOmnibarState(); // Zustand

  return (
    <>
      {workflows.map((workflow, index) => (
        <WorkflowItem
          key={workflow.id}
          workflow={workflow}
          onClick={selectWorkflow}
          isSelected={selectedIndex === index}
        />
      ))}
    </>
  );
};
```

### Event Flow Integration
1. User clicks WorkflowItem
2. Component calls onClick prop with workflow data
3. Parent component handles workflow execution
4. Global state updates through appropriate state management layer

## Best Practices

### Architecture Adherence
✅ **Flat Component Structure**: Single-level component without unnecessary nesting  
✅ **Props-Based State**: All state passed through props, no internal state management  
✅ **Forward Ref Support**: Proper ref forwarding for parent component control  
✅ **Variant-Based Styling**: CVA pattern for consistent, maintainable styling  

### Performance Optimizations
✅ **Memoized Callbacks**: useCallback prevents unnecessary re-renders  
✅ **Efficient Styling**: CSS variants over inline styles for better performance  
✅ **Minimal Re-renders**: Stateless design minimizes render cycles  

### Reusability Patterns
✅ **Generic Workflow Support**: Works with any Workflow type implementation  
✅ **Flexible Display Options**: hideCommand prop for different UI contexts  
✅ **Theme Integration**: Automatic dark/light mode support  
✅ **Accessibility Ready**: Semantic HTML structure for screen readers  

### Integration Best Practices
- Use with TanStack Query for workflow data fetching in parent components
- Integrate with Zustand for omnibar/selection state management
- Combine with keyboard navigation hooks for full command palette experience
- Style with consistent spacing using the design system's spacing scale