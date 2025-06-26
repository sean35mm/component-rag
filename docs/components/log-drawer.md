# LogDrawer Component

## Purpose

The `LogDrawer` component provides a modal drawer interface for displaying detailed log information in the developers section. It renders as a responsive sheet overlay that slides in from the side, containing a `LogPreview` component to show comprehensive details about a selected organization request log entry.

## Component Type

**Client Component** - Uses the `'use client'` directive because it manages interactive UI state (drawer open/close) and requires client-side event handling for the sheet overlay functionality.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | `boolean` | Yes | Controls whether the drawer is currently open/visible |
| `onOpenChange` | `(open: boolean) => void` | Yes | Callback function triggered when drawer open state changes |
| `log` | `OrganizationRequestLog` | No | Log data object to display in the drawer. If undefined, no content is rendered |

> **Note**: The interface is named `StoryDrawerProps` but should likely be renamed to `LogDrawerProps` for consistency.

## Usage Example

```tsx
import { useState } from 'react';
import { LogDrawer } from '@/components/developers/logs/log-drawer';
import type { OrganizationRequestLog } from '@/lib/types';

function LogsPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<OrganizationRequestLog>();

  const handleLogSelect = (log: OrganizationRequestLog) => {
    setSelectedLog(log);
    setIsDrawerOpen(true);
  };

  return (
    <div>
      {/* Log list or table */}
      <LogList onLogSelect={handleLogSelect} />
      
      {/* Log detail drawer */}
      <LogDrawer
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        log={selectedLog}
      />
    </div>
  );
}
```

## Functionality

- **Modal Drawer Display**: Renders a responsive sheet overlay that slides in from the side
- **Conditional Content Rendering**: Only displays log preview when log data is provided
- **Responsive Design**: Adapts width and styling for mobile and desktop viewports
- **Scrollable Content**: Provides overflow handling for long log details
- **Custom Styling**: Uses consistent background colors and spacing patterns

## State Management

**Local State Only** - This component is purely presentational and relies on:
- Props for all data (`isOpen`, `onOpenChange`, `log`)
- Parent component manages drawer visibility state
- No internal state management or side effects
- Follows the controlled component pattern

## Side Effects

**None** - This component has no side effects:
- No API calls or data fetching
- No external service interactions
- Pure UI rendering based on props
- State changes are handled via callback props

## Dependencies

### Components
- `Sheet`, `SheetContent`, `SheetHeader` from `@/components/ui/sheet` - Base drawer/modal functionality
- `LogPreview` from `./log-preview` - Renders the actual log content

### Types
- `OrganizationRequestLog` from `@/lib/types` - TypeScript interface for log data structure

### External Libraries
- React (implicit) - Component framework

## Integration

This component fits into the developers logging system architecture:

```
DevelopersDashboard
├── LogsPage
│   ├── LogList/LogTable (displays log entries)
│   └── LogDrawer (shows detailed log view)
│       └── LogPreview (renders log content)
```

**Integration Points**:
- **Parent Components**: Embedded in log management pages or dashboards
- **Data Flow**: Receives log data from parent state management (likely TanStack Query)
- **Event Handling**: Communicates state changes back to parent via callbacks
- **UI System**: Leverages the application's design system components

## Best Practices

✅ **Follows Architecture Guidelines**:
- **Component Decomposition**: Properly delegates log rendering to `LogPreview` component
- **Client Component Usage**: Appropriately uses client component for interactive UI
- **Props Interface**: Clean, focused interface with clear responsibilities
- **Reusability**: Generic drawer that can display any `OrganizationRequestLog`

✅ **Code Quality**:
- Type-safe props with proper TypeScript interfaces
- Conditional rendering prevents errors when no log is provided
- Responsive design considerations built in
- Consistent styling patterns

⚠️ **Potential Improvements**:
- Interface name should be `LogDrawerProps` instead of `StoryDrawerProps`
- Could benefit from loading states if log data is async
- Consider adding error boundaries for log rendering failures
- Sheet header is empty - could include log metadata or title