# Workflowbar Component

## Purpose
The `Workflowbar` component serves as a horizontal layout container within the omnibar's infobar section that displays the current workflow status alongside an optional close button. It provides a consistent interface for workflow-related information display and user interaction controls.

## Component Type
**Server Component** - This component renders static layout structure without requiring client-side interactivity, browser APIs, or event handlers at the component level. Interactive functionality is delegated to child components (`CurrentWorkflowChip` and `CloseButton`).

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `isCloseButtonVisible` | `boolean` | No | `true` | Controls whether the close button is rendered in the workflow bar |

## Usage Example

```tsx
// Basic usage with close button (default)
<Workflowbar />

// Hide close button for read-only views
<Workflowbar isCloseButtonVisible={false} />

// Within an omnibar context
function InfoBar() {
  const [showCloseButton, setShowCloseButton] = useState(true);
  
  return (
    <div className="infobar">
      <Workflowbar isCloseButtonVisible={showCloseButton} />
    </div>
  );
}

// Conditional rendering based on user permissions
function WorkflowInterface({ userCanClose }: { userCanClose: boolean }) {
  return (
    <Workflowbar isCloseButtonVisible={userCanClose} />
  );
}
```

## Functionality
- **Layout Management**: Provides a responsive flex layout that positions workflow information and controls
- **Conditional Rendering**: Optionally displays close button based on prop configuration
- **Responsive Design**: Maintains proper spacing and alignment across different screen sizes
- **Component Composition**: Acts as a container for workflow-related UI elements

## State Management
**No Direct State Management** - This component is stateless and relies on:
- Props for configuration (`isCloseButtonVisible`)
- Child components (`CurrentWorkflowChip`, `CloseButton`) for their own state management
- Parent components for workflow data and close functionality

## Side Effects
**None** - This component has no side effects, API calls, or external interactions. All interactive behavior is handled by child components.

## Dependencies

### Internal Components
- `CloseButton` (`../close-button`) - Provides close functionality for the workflow interface
- `CurrentWorkflowChip` (`./current-workflow-chip`) - Displays current workflow status and information

### External Dependencies
- React (implicit) - For JSX and component structure
- Tailwind CSS (via className) - For styling and layout

## Integration

### Application Architecture
```
omnibar/
├── infobar/
│   ├── workflowbar.tsx        # Layout container
│   ├── current-workflow-chip.tsx # Workflow status display
│   └── ...
├── close-button.tsx           # Shared close functionality
└── ...
```

### Usage Context
- **Omnibar Integration**: Primary usage within the application's omnibar system
- **Infobar Section**: Specifically designed for the infobar portion of the omnibar
- **Workflow Management**: Part of the larger workflow management interface

### Data Flow
```
Parent Component
├── Workflow Data → CurrentWorkflowChip
└── Close Permissions → Workflowbar → CloseButton
```

## Best Practices

### Architectural Adherence
✅ **Server Component**: Correctly implemented as server component with no client-side requirements  
✅ **Component Decomposition**: Follows flat composition pattern with clear separation of concerns  
✅ **Reusability**: Flexible prop interface allows for different usage scenarios  
✅ **Domain Organization**: Properly placed within omnibar/infobar domain structure  

### Implementation Patterns
✅ **Single Responsibility**: Focuses solely on layout and conditional rendering  
✅ **Prop Defaults**: Provides sensible default for `isCloseButtonVisible`  
✅ **Responsive Design**: Uses Tailwind's responsive utilities for consistent layout  
✅ **Component Composition**: Delegates specific functionality to specialized child components  

### Usage Recommendations
- Use default `isCloseButtonVisible={true}` for most interactive workflow contexts
- Set `isCloseButtonVisible={false}` for read-only or restricted workflow views
- Consider user permissions and workflow state when determining close button visibility
- Leverage this component's flexibility for different workflow interface requirements