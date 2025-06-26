# Omnibar Component

## Purpose

The Omnibar component provides a universal search and command interface that allows users to quickly access various workflows and functionalities throughout the application. It serves as a centralized entry point for user actions, similar to command palettes found in modern development tools.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- DOM event handling for keyboard shortcuts and focus management
- State management through Zustand store
- Browser APIs for resize observation and breakpoint detection
- Interactive dialog functionality with complex user interactions

## Props Interface

### Omnibar
No external props - state is managed internally through Zustand store.

### OmnibarContent
No external props - fully self-contained component.

### Exported CVA Classes
| Export | Type | Description |
|--------|------|-------------|
| `dialogContainer` | `cva` | Styling for the dialog wrapper container |
| `omnibarContainer` | `cva` | Main omnibar container styling |
| `omnibarInnerContainer` | `cva` | Inner container with padding and layout |
| `omnibarContent` | `cva` | Content area styling with borders and background |

## Usage Example

```tsx
import { Omnibar } from '@/components/omnibar/omnibar';
import { useOmnibarStore } from '@/lib/contexts';

// Basic usage - component handles its own state
function App() {
  return (
    <div>
      {/* Other app content */}
      <Omnibar />
    </div>
  );
}

// Programmatic control
function Header() {
  const setIsOpen = useOmnibarStore((state) => state.setIsOpen);
  
  const handleOpenOmnibar = () => {
    setIsOpen(true);
  };

  return (
    <button onClick={handleOpenOmnibar}>
      Open Command Palette
    </button>
  );
}

// Using CVA classes for custom styling
import { omnibarContent } from '@/components/omnibar/omnibar';

function CustomOmnibar() {
  return (
    <div className={omnibarContent({ className: "custom-modifier" })}>
      {/* Custom content */}
    </div>
  );
}
```

## Functionality

### Core Features
- **Universal Search Interface**: Provides a centralized search and command palette
- **Responsive Design**: Adapts layout and behavior for mobile and desktop viewports
- **Workflow Management**: Integrates with workflows manager for task execution
- **Input Validation**: Includes validation through OmniValidator component
- **Auto-focus Prevention**: Prevents unwanted focus behavior on dialog open
- **Height Tracking**: Monitors container height for mobile layout optimization

### Interactive Behaviors
- **Modal Dialog**: Opens as an overlay dialog with backdrop
- **Keyboard Navigation**: Supports standard dialog keyboard interactions
- **Responsive Toolbar**: Positions toolbar inside/outside based on screen size
- **Auto-reset**: Automatically resets state when closed

## State Management

**Zustand Store** (`useOmnibarStore`):
- `isOpen`: Controls dialog visibility state
- `setIsOpen(boolean)`: Opens/closes the omnibar
- `setWorkflowContainerHeight(number)`: Sets container height for mobile
- `reset()`: Resets all omnibar state to initial values

The component follows our architecture pattern of using Zustand for client-side UI state management.

## Side Effects

### Resize Observation
```tsx
const { height } = useResizeObserver({
  ref: containerRef,
  box: 'content-box',
});
```
- Monitors container size changes for responsive behavior

### Breakpoint Detection
```tsx
const isDesktop = useBreakpoint('md');
```
- Tracks viewport size for responsive layout decisions

### State Synchronization
- Automatically resets state when dialog closes
- Syncs container height with store for mobile optimization

## Dependencies

### Internal Components
- `OmnibarBase`: Base omnibar functionality and layout
- `WorkflowsManager`: Handles workflow execution and management
- `OmniValidator`: Provides input validation capabilities

### UI Components
- `Dialog`, `DialogContent`, `DialogDescription`, `DialogTitle`: Modal dialog primitives

### Hooks
- `useBreakpoint`: Custom hook for responsive breakpoint detection
- `useResizeObserver`: Third-party hook for element size observation

### External Libraries
- `class-variance-authority`: For styling variants
- `use-resize-observer`: For container size monitoring

## Integration

### Application Architecture
```tsx
// Global placement in app layout
function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ZustandProvider>
          {children}
          <Omnibar /> {/* Global omnibar instance */}
        </ZustandProvider>
      </body>
    </html>
  );
}

// Trigger from anywhere in app
function AnyComponent() {
  const setIsOpen = useOmnibarStore((state) => state.setIsOpen);
  
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [setIsOpen]);
}
```

### Workflow Integration
- Connects to workflow system through `WorkflowsManager`
- Provides workflow execution interface
- Handles workflow state validation

## Best Practices

### Architecture Adherence
✅ **Client Component**: Properly uses `'use client'` for interactive functionality  
✅ **Component Decomposition**: Splits into `Omnibar` and `OmnibarContent` for separation of concerns  
✅ **State Management**: Uses Zustand for client state following our patterns  
✅ **Reusability**: Exports CVA classes for styling reuse  

### Implementation Patterns
✅ **Controlled State**: State managed through centralized store  
✅ **Responsive Design**: Adapts behavior based on viewport size  
✅ **Accessibility**: Includes proper dialog labels and descriptions  
✅ **Performance**: Uses resize observer for efficient size tracking  

### Usage Guidelines
- Place single `<Omnibar />` instance at application root level
- Control visibility through `useOmnibarStore` from any component
- Use exported CVA classes for consistent styling across related components
- Leverage responsive behavior rather than implementing custom breakpoint logic