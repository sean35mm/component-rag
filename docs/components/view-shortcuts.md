# ViewShortcuts Component

## Purpose

The `ViewShortcuts` component provides a keyboard shortcut reference interface for the omnibar toolbar. It displays available command shortcuts in a popover overlay, helping users discover and remember workflow commands, chat initialization, search functionality, and other omnibar features. This component serves as a user guidance tool within the application's command interface.

## Component Type

**Client Component** - Uses the `'use client'` directive (implied by state usage). This is necessary because the component:
- Manages local state for popover open/close state with `useState`
- Handles interactive click events for opening/closing the popover
- Requires client-side event handling for the close button

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `containerRef` | `HTMLDivElement \| undefined` | No | `undefined` | Reference to a container element used as collision boundary for popover positioning |

## Usage Example

```tsx
import { ViewShortcuts } from '@/components/omnibar/omni-toolbar/view-shortcuts';
import { useRef } from 'react';

function OmniToolbar() {
  const toolbarRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={toolbarRef} className="omni-toolbar">
      {/* Other toolbar content */}
      <ViewShortcuts containerRef={toolbarRef.current} />
    </div>
  );
}

// Basic usage without container reference
function SimpleUsage() {
  return (
    <div className="toolbar">
      <ViewShortcuts />
    </div>
  );
}
```

## Functionality

- **Shortcut Display**: Renders a comprehensive list of omnibar keyboard shortcuts including workflow entry (`/`), chat (`/chat`), search (`/search`), signals (`/signal`), story lookup (`/story`), trending view (`⌘ /`), and file search (`//"file name"`)
- **Interactive Popover**: Click-to-open popover interface with close button functionality
- **Visual Shortcut Keys**: Displays shortcuts as styled badges with proper typography and theming
- **Responsive Positioning**: Popover positioning with collision boundary support for optimal placement
- **Accessibility**: Proper button roles and keyboard interaction support

## State Management

**Local State Only** - Uses React's built-in `useState` for:
- `open`: Boolean state controlling popover visibility
- State changes triggered by user interactions (trigger click, close button click)

No external state management (TanStack Query/Zustand) required as this is purely a UI presentation component.

## Side Effects

**Minimal Side Effects**:
- DOM manipulation through popover open/close state changes
- Event listener attachment for click handling
- No API calls or external data fetching
- No persistent state changes

## Dependencies

**UI Components**:
- `Badge` - For displaying shortcut key combinations
- `Popover`, `PopoverContent`, `PopoverTrigger` - Core popover functionality
- `Separator` - Visual divider in popover content
- `Typography` - Consistent text styling

**Icons**:
- `PiCloseLine` - Close button icon

**Utilities**:
- `cva` (class-variance-authority) - For conditional badge styling

## Integration

**Omnibar Ecosystem Integration**:
- **Location**: Part of the omni-toolbar component hierarchy
- **Role**: User guidance and shortcut discovery within the omnibar interface
- **Positioning**: Typically positioned as a help/reference element in the toolbar
- **Theming**: Fully integrated with the application's design system and dark mode support

**Architecture Fit**:
- **UI Component Pattern**: Self-contained presentation component following flat component architecture
- **Reusability**: Could be reused in other contexts requiring shortcut documentation
- **State Isolation**: Manages only local presentation state without affecting global application state

## Best Practices

**Architecture Adherence**:
- ✅ **Proper Client Component Usage**: Uses client-side state only when necessary for interactivity
- ✅ **Component Decomposition**: Clean separation with `ShortcutItem` sub-component for list items
- ✅ **Flat Architecture**: Avoids deep nesting, uses composition pattern effectively
- ✅ **Consistent Styling**: Uses design system components and CVA for conditional styling

**Implementation Quality**:
- ✅ **TypeScript Integration**: Proper type definitions for props and shortcut data structure
- ✅ **Accessibility**: Semantic HTML with proper button roles and interactive elements
- ✅ **Performance**: Minimal re-renders with focused state management
- ✅ **Maintainability**: Clear constant definition (`OMNI_SHORTCUTS`) for easy shortcut management

**Design System Compliance**:
- ✅ **Typography Consistency**: Uses Typography component variants throughout
- ✅ **Theme Support**: Proper dark mode class handling with conditional styling
- ✅ **Spacing Standards**: Consistent padding, margins, and gap values following design tokens