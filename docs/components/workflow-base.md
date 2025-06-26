# WorkflowBase Component Documentation

## Purpose

The `workflow-base` component provides a standardized layout foundation for workflow interfaces within the omnibar system. It creates a consistent structure with header, content, and info sections, handling responsive height calculations and scroll behavior for different workflow types.

## Component Type

**Client Component** - Uses `'use client'` due to:
- Zustand store integration (`useOmnibarStore`)
- Responsive breakpoint detection (`useBreakpoint`)
- Dynamic height calculations based on viewport

## Props Interface

### WorkflowSection Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | Optional | Header title displayed at the top of the workflow section |
| `command` | `string` | Optional | Keyboard shortcut command displayed as a badge in the header |
| `children` | `ReactNode` | Required | Main content area for workflow-specific UI elements |
| `info` | `ReactNode` | Optional | Additional information displayed at the bottom of the section |

## Usage Example

```tsx
import { WorkflowSection } from '@/components/omnibar/workflows/workflow-base';

// Basic workflow section
<WorkflowSection title="Search Files" command="⌘K">
  <div className="space-y-2">
    {searchResults.map(result => (
      <div key={result.id} className="p-2 hover:bg-gray-100">
        {result.name}
      </div>
    ))}
  </div>
</WorkflowSection>

// With info section
<WorkflowSection 
  title="Recent Actions" 
  command="⌘R"
  info={
    <div className="text-sm text-gray-500">
      Showing last 10 actions
    </div>
  }
>
  <ActionsList />
</WorkflowSection>

// Content-only workflow
<WorkflowSection>
  <QuickAccessPanel />
</WorkflowSection>
```

## Functionality

### Core Features
- **Responsive Layout**: Adapts height calculations for desktop and mobile viewports
- **Scroll Management**: Custom scrollbar styling with overflow handling
- **Header Structure**: Flexible header with title and command shortcut display
- **Content Areas**: Dedicated sections for main content and supplementary information

### Height Calculation
- **Desktop**: Fixed maximum height of 302px
- **Mobile**: Dynamic height based on container minus 160px offset
- **Responsive**: Automatically adjusts based on `lg` breakpoint

### Visual Structure
- Scrollable container with custom webkit scrollbar styling
- Justified header layout with title/command alignment
- Consistent spacing and padding throughout sections

## State Management

### Zustand Integration
```tsx
const height = useOmnibarStore((state) => state.workflowContainerHeight);
```
- Subscribes to `workflowContainerHeight` from omnibar store
- Reactive height updates trigger re-calculations

### Responsive State
- Uses `useBreakpoint('lg')` for desktop/mobile detection
- No local state management - relies on external stores and hooks

## Side Effects

- **Height Recalculation**: Triggers when store height or breakpoint changes
- **Style Application**: Dynamic maxHeight style injection
- **Scroll Behavior**: Webkit scrollbar customization applied on render

## Dependencies

### Internal Dependencies
- `@/components/hooks/use-breakpoint` - Responsive breakpoint detection
- `@/components/ui/shortcut` - Command shortcut display component
- `@/components/ui/typography` - Text styling and typography
- `@/lib/contexts` - Omnibar store access

### External Dependencies
- `class-variance-authority` - CSS class composition utility
- `react` - Core React functionality

## Integration

### Omnibar Architecture
- **Base Layer**: Provides foundation for all workflow types
- **Container System**: Integrates with omnibar's height management
- **Responsive Design**: Adapts to omnibar's mobile/desktop modes

### Workflow Pattern
```tsx
// Typical workflow implementation
const SearchWorkflow = () => (
  <WorkflowSection title="Search" command="⌘K">
    <SearchInput />
    <SearchResults />
  </WorkflowSection>
);
```

### Export Pattern
- **CVA Utilities**: Exported for custom workflow styling
- **Helper Functions**: `getWorkflowContainerMaxHeight` for external use
- **Main Component**: `WorkflowSection` as primary interface

## Best Practices

### Architecture Adherence
- ✅ **Flat Composition**: Provides base layer for stacking workflow components
- ✅ **State Separation**: Uses Zustand for omnibar state, hooks for responsive state
- ✅ **Component Decomposition**: Separates layout concerns from workflow logic

### Usage Patterns
- **Consistent Structure**: Use for all omnibar workflow interfaces
- **Height Management**: Rely on built-in calculations rather than custom heights
- **Content Organization**: Leverage header/content/info sections appropriately

### Performance Considerations
- **Selective Subscriptions**: Only subscribes to necessary store slices
- **Memoized Calculations**: Height calculation occurs only on dependency changes
- **Scroll Optimization**: Efficient scrollbar styling without JavaScript scroll handlers

### Integration Guidelines
- **Workflow Foundation**: Use as base for all workflow components
- **Responsive Design**: Trust built-in breakpoint handling
- **Consistent Styling**: Leverage exported CVA utilities for custom extensions