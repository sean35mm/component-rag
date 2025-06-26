# OmnibarBase Component

## Purpose

The `OmnibarBase` component serves as the foundational container for an omnibar interface, providing a flexible layout structure that combines an editor, toolbar, and workflow information bar. It acts as the core building block for search, command palette, or content editing interfaces, offering customizable positioning and visibility controls for its child components.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive state through the `useOmnibarStore` hook
- Handles dynamic UI updates based on workflow state
- Provides context providers that manage client-side state
- Renders interactive editor and toolbar components

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `containerClassName` | `string` | No | - | Custom class name for the outermost container |
| `innerContainerClassName` | `string` | No | - | Custom class name for the inner flex container |
| `editorContainerClassName` | `string` | No | - | Custom class name for the editor section container |
| `hideWorkflowbarForAllWorkflow` | `boolean` | No | `true` | Whether to hide the workflowbar when current workflow is ALL |
| `isWorkflowbarCloseButtonVisible` | `boolean` | No | `true` | Controls visibility of the workflowbar close button |
| `toolbarProps` | `object` | No | `{}` | Configuration object for the toolbar component |
| `toolbarProps.customLabel` | `ReactNode` | No | - | Custom label content for the toolbar |
| `toolbarProps.className` | `string` | No | - | Custom class name for the toolbar |
| `toolbarProps.size` | `'xs' \| 'md' \| 'xxs'` | No | `'xs'` | Size variant for the toolbar |
| `toolbarProps.position` | `'inside' \| 'outside'` | No | `'inside'` | Whether toolbar is positioned inside or outside the editor container |
| `editorChildren` | `ReactNode` | No | - | Children to render inside the OmniEditor component |
| `children` | `ReactNode` | No | - | Additional children to render after the editor section |
| `containerRef` | `RefObject<HTMLDivElement \| null>` | No | - | Reference for the editor container element |
| `editable` | `boolean` | No | `true` | Whether the editor component is editable |

## Usage Example

```tsx
import { useRef } from 'react';
import { OmnibarBase } from '@/components/omnibar/omnibar-base';

function SearchInterface() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <OmnibarBase
      containerClassName="h-screen bg-background"
      editorContainerClassName="border rounded-lg"
      hideWorkflowbarForAllWorkflow={false}
      toolbarProps={{
        customLabel: <span>Search Commands</span>,
        size: 'md',
        position: 'outside',
        className: 'border-t'
      }}
      containerRef={containerRef}
      editable={true}
      editorChildren={
        <div className="p-2">
          <input 
            type="text" 
            placeholder="Type to search..." 
            className="w-full border-none outline-none"
          />
        </div>
      }
    >
      <div className="p-4">
        <h3>Search Results</h3>
        {/* Search results content */}
      </div>
    </OmnibarBase>
  );
}
```

## Functionality

- **Flexible Layout Management**: Provides a structured container with configurable sections for editor, toolbar, and workflow components
- **Conditional Workflowbar Display**: Shows/hides the workflowbar based on current workflow state and configuration
- **Toolbar Positioning**: Supports both inside and outside positioning of the toolbar relative to the editor
- **Context Provider Integration**: Wraps content with necessary context providers for state management
- **Responsive Design**: Uses Tailwind classes for responsive padding and layout adjustments
- **Overflow Handling**: Manages scrollable content areas within the editor section
- **Ref Forwarding**: Supports container references for parent component integration

## State Management

The component integrates with **Zustand** for client state management:

- **`useOmnibarStore`**: Accesses the current workflow state to determine workflowbar visibility
- **`OmniEditorProvider`**: Provides editor-specific state context to child components
- **`FiltersDrawerStoreProvider`**: Manages filter drawer state for the omnibar interface

No direct API calls or server state management - relies on provided context stores.

## Side Effects

- **Dynamic UI Updates**: Re-renders workflowbar based on workflow state changes
- **Context Initialization**: Initializes provider contexts that may trigger downstream effects
- **Layout Recalculation**: Toolbar position changes may cause layout shifts

## Dependencies

### Components
- `Workflowbar` - Displays workflow information and controls
- `OmniEditor` - Core editor component for content input
- `OmniToolbar` - Action toolbar with customizable positioning

### Contexts & Hooks
- `useOmnibarStore` - Zustand store for omnibar state
- `OmniEditorProvider` - Context provider for editor state
- `FiltersDrawerStoreProvider` - Context provider for filter drawer state

### Utilities
- `cn` - Utility for conditional class name merging
- `OMNI_WORKFLOWS` - Workflow type constants

## Integration

The `OmnibarBase` component fits into the application architecture as:

- **Foundation Layer**: Base component for all omnibar interfaces (search, command palette, content editors)
- **Context Bridge**: Connects global state management with feature-specific components
- **Layout Controller**: Manages the structural layout while delegating specific functionality to child components
- **Composition Root**: Serves as a composition point where different omnibar features can be assembled

## Best Practices

✅ **Follows Architecture Guidelines**:
- **Flat Composition**: Uses flat component structure rather than deep nesting
- **Flexible Props Interface**: Provides extensive customization without forcing specific implementations
- **Context Separation**: Separates concerns between editor, filters, and omnibar state
- **Client Component Justification**: Appropriately uses client component for interactive state management

✅ **Design Patterns**:
- **Container/Presenter**: Acts as a container that orchestrates layout and delegates functionality
- **Composition over Configuration**: Accepts children and custom components rather than hardcoding behavior
- **Progressive Enhancement**: Provides sensible defaults while allowing full customization

✅ **Reusability**:
- **Domain-Agnostic**: Can be used for various omnibar implementations (search, commands, editors)
- **Customizable Styling**: Supports extensive className customization at multiple levels
- **Flexible Content**: Accepts both editor children and additional children for diverse use cases