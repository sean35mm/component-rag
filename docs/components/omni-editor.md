# OmniEditor Component Documentation

## Purpose

The OmniEditor is a sophisticated text editor component built on Lexical that serves as the main input interface for an omnibar system. It provides rich text editing capabilities with intelligent plugin-based features including AI templates, entity selection, file handling, topic management, and workflow integration. The component adapts its layout and behavior between desktop and mobile viewports while maintaining a consistent editing experience.

## Component Type

**Client Component** - Uses `'use client'` directive because it:
- Manages complex interactive editor state through Lexical
- Requires real-time DOM manipulation for text editing
- Handles multiple user interactions (typing, selection, plugin triggers)
- Uses browser-specific APIs for text editing and scrolling behavior
- Integrates with client-side state management (Zustand store)

## Props Interface

### OmniEditor Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `ReactNode` | No | `undefined` | Additional content to render below the editor |
| `editable` | `boolean` | No | `true` | Controls whether the editor accepts user input |

### Editor Props (Internal)
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `editable` | `boolean` | No | `true` | Controls the editable state of the Lexical editor |

### OmniEditorProvider Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `ReactNode` | Yes | - | Child components that need access to the Lexical editor context |

## Usage Example

```tsx
import { OmniEditorProvider, OmniEditor } from '@/components/omnibar/omni-editor/omni-editor';

// Basic usage
function OmnibarContainer() {
  return (
    <OmniEditorProvider>
      <OmniEditor />
    </OmniEditorProvider>
  );
}

// With additional content and read-only mode
function ReadOnlyEditorWithSidebar() {
  return (
    <OmniEditorProvider>
      <OmniEditor editable={false}>
        <div className="sidebar-content">
          <FileExplorer />
          <TemplatesList />
        </div>
      </OmniEditor>
    </OmniEditorProvider>
  );
}

// Integrated with omnibar workflow
function WorkflowOmnibar() {
  const isEditMode = useWorkflowStore(state => state.isEditMode);
  
  return (
    <OmniEditorProvider>
      <OmniEditor editable={isEditMode}>
        <WorkflowPanel />
      </OmniEditor>
    </OmniEditorProvider>
  );
}
```

## Functionality

### Core Features
- **Rich Text Editing**: Lexical-based plain text editing with plugin extensibility
- **Responsive Layout**: Adaptive max-height calculation for desktop (360px) vs mobile (dynamic)
- **Plugin Architecture**: Modular plugin system for enhanced functionality
- **Auto-focus Management**: Intelligent focus handling with customizable selection behavior
- **Error Boundaries**: Graceful error handling for editor failures

### Plugin Ecosystem
- **CustomAutoFocusPlugin**: Manages editor focus and initial cursor position
- **WorkflowsPlugin**: Integrates workflow functionality
- **EntitiesSelectorPlugin**: Enables entity selection and mention-like behavior
- **TopicsSelectorPlugin**: Provides topic selection capabilities
- **FilesSelectorPlugin**: Handles file attachment and selection
- **StorySearchPlugin**: Integrates story search functionality
- **AiTemplatesSuggestionsPlugin**: Provides AI-powered template suggestions

### Adaptive Behavior
- **Viewport-Aware Sizing**: Dynamic height calculation based on container and breakpoint
- **Custom Scrolling**: Styled scrollbars with rounded thumbs
- **Flexible Layout**: Accommodates additional child content below editor

## State Management

### Zustand Integration
- **useOmnibarStore**: Accesses `workflowContainerHeight` for dynamic sizing calculations
- **Plugin State**: Individual plugins manage their own state through respective stores

### Lexical State
- **useLexicalEditorTools**: Custom hook for accessing Lexical editor instance
- **Editor Configuration**: Centralized configuration through `getEditorConfig()`
- **Editable State**: Reactive control over editor's editable property

## Side Effects

### Editor Management
- **Editable State Sync**: Updates Lexical editor's editable state when prop changes
- **Height Recalculation**: Responds to container height changes for mobile layouts
- **Plugin Lifecycle**: Manages plugin initialization and cleanup

### DOM Interactions
- **Scroll Behavior**: Custom scrollbar styling and overflow management
- **Focus Management**: Automatic focus handling based on plugin configuration

## Dependencies

### External Libraries
- `@lexical/react`: Core Lexical React integration
- `class-variance-authority`: CSS class generation utilities

### Internal Dependencies
- `useBreakpoint`: Responsive breakpoint detection
- `useLexicalEditorTools`: Lexical editor utilities
- `useOmnibarStore`: Omnibar state management
- **Editor Components**: ContentEditable, Placeholder, EditorErrorBoundary
- **Plugin System**: Six specialized plugins for enhanced functionality

### Configuration
- `getEditorConfig()`: Centralized Lexical editor configuration

## Integration

### Application Architecture
- **Omnibar System**: Central component of the omnibar interface
- **Workflow Integration**: Seamlessly integrates with workflow management
- **State Coordination**: Coordinates between multiple state management systems
- **Plugin Ecosystem**: Extensible architecture for feature enhancement

### Layout System
- **Responsive Design**: Adapts to desktop/mobile viewports
- **Flexible Container**: Accommodates variable content through children prop
- **Z-index Management**: Proper layering for dropdown/overlay plugins

## Best Practices

### Architectural Adherence
✅ **Component Decomposition**: Properly decomposed into Provider, Editor, and OmniEditor layers
✅ **State Management**: Appropriate use of Zustand for client state
✅ **Responsive Design**: Mobile-first approach with breakpoint-aware behavior
✅ **Error Handling**: Comprehensive error boundaries for graceful failures

### Performance Optimizations
✅ **Lazy Plugin Loading**: Plugins only activate when needed
✅ **Memoized Configurations**: Efficient editor configuration management
✅ **Conditional Rendering**: Smart rendering based on state and props

### Development Guidelines
✅ **Plugin Architecture**: Extensible plugin system following separation of concerns
✅ **TypeScript Integration**: Strong typing for props and configurations
✅ **Accessibility**: Proper ARIA support through Lexical's built-in features
✅ **Maintainability**: Clear separation between provider, editor logic, and presentation

### Usage Recommendations
- Always wrap OmniEditor with OmniEditorProvider for proper context
- Use the editable prop for read-only scenarios rather than CSS pointer-events
- Leverage the children prop for additional UI elements that need to coordinate with the editor
- Consider the mobile height calculation when integrating with complex layouts