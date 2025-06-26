# AlertDetailPanelDrawer Component

## Purpose

The `AlertDetailPanelDrawer` component provides a mobile-optimized drawer interface for displaying detailed alert information. It serves as a responsive wrapper around the `AlertHistoryDetailPanel`, presenting signal notification details in a slide-out sheet format optimized for mobile devices and smaller screens.

## Component Type

**Client Component** - Uses the `'use client'` directive because it manages interactive UI state (open/close drawer functionality) and handles user interactions that require browser-side JavaScript execution.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `signalNotification` | `SignalNotification \| undefined` | Yes | The signal notification data to display in the detail panel. Can be undefined when no alert is selected |
| `open` | `boolean` | Yes | Controls the open/closed state of the drawer |
| `setIsOpen` | `(open: boolean) => void` | Yes | Callback function to update the drawer's open state |

## Usage Example

```tsx
import { useState } from 'react';
import { AlertDetailPanelDrawer } from '@/components/signals/details/alert-detail-panel-drawer';
import { SignalNotification } from '@/lib/types';

function AlertsPage() {
  const [selectedAlert, setSelectedAlert] = useState<SignalNotification | undefined>();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleAlertSelect = (alert: SignalNotification) => {
    setSelectedAlert(alert);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    // Optionally clear selection after animation completes
    setTimeout(() => setSelectedAlert(undefined), 300);
  };

  return (
    <div>
      {/* Alert list or trigger components */}
      <AlertDetailPanelDrawer
        signalNotification={selectedAlert}
        open={drawerOpen}
        setIsOpen={handleDrawerClose}
      />
    </div>
  );
}
```

## Functionality

- **Responsive Alert Display**: Provides a mobile-optimized interface for viewing alert details
- **Conditional Rendering**: Only renders the detail panel when a signal notification is available
- **Drawer Management**: Handles the opening and closing of the sheet drawer with smooth animations
- **Mobile Optimization**: Configured specifically for mobile devices with appropriate spacing and layout
- **Accessibility**: Leverages the Sheet component's built-in accessibility features

## State Management

**Local State**: The component receives state management through props rather than managing state internally. The parent component is responsible for:
- Tracking the selected `SignalNotification`
- Managing the drawer's open/closed state
- Coordinating between alert selection and drawer visibility

This follows the "lift state up" pattern, allowing multiple components to coordinate around alert selection and drawer visibility.

## Side Effects

- **Sheet Animation**: Triggers slide-in/slide-out animations when the drawer opens or closes
- **Focus Management**: The underlying Sheet component handles focus trapping and restoration
- **Scroll Lock**: Prevents background scrolling when the drawer is open on mobile devices

## Dependencies

### UI Components
- `Sheet`, `SheetContent`, `SheetHeader` from `@/components/ui/sheet`

### Feature Components
- `AlertHistoryDetailPanel` from `./alert-detail-panel`

### Types
- `SignalNotification` from `@/lib/types`

## Integration

The `AlertDetailPanelDrawer` fits into the signals feature architecture as:

```
signals/
├── details/
│   ├── alert-detail-panel-drawer.tsx     # Mobile drawer wrapper
│   ├── alert-detail-panel.tsx            # Core detail panel
│   └── [other detail components]
├── list/
│   └── [alert list components]           # Components that trigger drawer
└── [other signal features]
```

**Integration Points**:
- **Alert Lists**: Triggered by alert selection in list components
- **Detail Panel**: Wraps and presents the main detail panel component
- **Mobile Layout**: Part of the responsive design system for mobile alert management

## Best Practices

### Architecture Adherence
- ✅ **Component Decomposition**: Simple wrapper component that composes UI and feature components
- ✅ **Reusability**: Separates mobile presentation logic from core detail panel functionality
- ✅ **Props Interface**: Clear, focused interface with proper TypeScript typing
- ✅ **Client Component Usage**: Appropriately uses client component for interactive UI state

### Implementation Patterns
- **Conditional Rendering**: Safely handles undefined signal notifications
- **Prop Drilling**: Accepts state management through props rather than internal state
- **Mobile-First**: Specifically designed and configured for mobile user experience
- **Composition**: Leverages existing UI components rather than reimplementing drawer functionality

### Usage Recommendations
- Always handle the undefined state of `signalNotification` in parent components
- Consider debouncing rapid open/close state changes to prevent animation conflicts
- Implement proper cleanup when unmounting to prevent memory leaks
- Use with responsive design patterns to show different interfaces on different screen sizes