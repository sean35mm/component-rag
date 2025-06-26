# TabItem Component

## Purpose

The `TabItem` component renders an individual tab within a tab manager interface. It provides a clickable tab with close functionality, context menu integration, and smart positioning behavior that adapts to scroll position. This component is a core building block of the main layout's tab management system.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Browser APIs (scroll events, `getBoundingClientRect()`)
- Mouse event handlers for clicks and context menus
- State management for scroll position tracking
- DOM manipulation for scroll behavior

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `containerRef` | `RefObject<HTMLDivElement \| null>` | No | Reference to the tab container for scroll calculations |
| `href` | `string` | Yes | Navigation URL for the tab |
| `icon` | `ReactNode` | No | Icon element to display before the tab name |
| `id` | `T` | Yes | Unique identifier for the tab (generic type) |
| `isActive` | `boolean` | Yes | Whether this tab is currently active |
| `name` | `string` | Yes | Display name for the tab |
| `position` | `number` | Yes | Position index of the tab in the tab list |
| `entityId` | `string` | No | Optional entity identifier for the tab content |
| `onClick` | `(href: string) => void` | No | Callback when tab is clicked |
| `onClose` | `(id: T, isActive: boolean, position: number) => void` | No | Callback when tab is closed |
| `onCloseOthers` | `() => void` | No | Callback to close all other tabs |
| `onCloseToRight` | `() => void` | No | Callback to close tabs to the right |
| `onMove` | `() => void` | No | Callback for tab reordering |
| `onRename` | `() => void` | No | Callback to rename the tab |

## Usage Example

```tsx
import { TabItem } from '@/components/main-layout/tabs-manager/tab-item';
import { PiFileIcon } from '@/components/icons';

function TabsContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTabId, setActiveTabId] = useState('tab-1');

  const handleTabClick = (href: string) => {
    // Navigate to the tab's route
    router.push(href);
  };

  const handleTabClose = (id: string, isActive: boolean, position: number) => {
    // Remove tab from state and handle navigation if needed
    removeTab(id);
    if (isActive) {
      navigateToNearestTab(position);
    }
  };

  return (
    <div ref={containerRef} className="flex overflow-x-auto">
      <TabItem
        id="tab-1"
        href="/dashboard/signals/123"
        name="Signal Analysis"
        icon={<PiFileIcon />}
        position={0}
        isActive={activeTabId === 'tab-1'}
        containerRef={containerRef}
        onClick={handleTabClick}
        onClose={handleTabClose}
        onCloseOthers={() => closeAllTabsExcept('tab-1')}
        onCloseToRight={() => closeTabsToRight(0)}
        onMove={() => enableTabReordering('tab-1')}
        onRename={() => openRenameDialog('tab-1')}
      />
    </div>
  );
}
```

## Functionality

### Core Features
- **Tab Navigation**: Clickable tab that navigates to the specified `href`
- **Close Button**: Dismissible with a close icon that appears on hover or when active
- **Context Menu**: Right-click menu with options for close, close others, close to right, move, and rename
- **Active State Styling**: Visual distinction for the currently active tab
- **Icon Support**: Optional icon display alongside the tab name

### Smart Positioning
- **Sticky Behavior**: Active tabs stick to the left edge when scrolling
- **Right-Side Adaptation**: When scrolled far right, active tab sticks to the right edge instead
- **Auto-Scroll**: Active tabs automatically scroll into view when activated

### State Management Integration
- **Signal Store**: Clears create signal state when closing signal creation tabs
- **Generic ID Support**: Works with any identifier type through TypeScript generics

## State Management

**Local State (useState)**:
- `isStickRight`: Boolean tracking whether the tab should stick to the right edge during scroll

**External State**:
- **Signal Store (Zustand)**: Uses `useCreateSignalStore` to reset form state when closing signal creation tabs
- **Tab Manager State**: Integrates with parent tab management system through callback props

## Side Effects

### Scroll Event Listeners
- Attaches scroll listeners to the container when tab becomes active
- Calculates tab position relative to viewport to determine sticky positioning
- Automatically cleans up event listeners when tab becomes inactive

### Navigation Integration
- Uses Next.js `Link` component with prefetch for optimized navigation
- Handles programmatic navigation through callback props

### DOM Manipulation
- Automatically scrolls active tabs into view using `scrollIntoView()`
- Calculates element positioning with `getBoundingClientRect()`

## Dependencies

### Components
- `TabContextMenu`: Provides right-click context menu functionality
- `PiCloseLine`: Close icon from the icon system
- `NextLink`: Next.js navigation component

### Utilities
- `cn`: Utility for conditional className composition
- `useCreateSignalStore`: Zustand store for signal creation state

### External Libraries
- React hooks (`useCallback`, `useEffect`, `useRef`, `useState`)
- Next.js Link component for navigation

## Integration

### Tab Manager System
- Integrates with the main layout's tab management system
- Communicates with parent components through callback props
- Supports tab lifecycle events (open, close, move, rename)

### Navigation Architecture
- Works with Next.js App Router for client-side navigation
- Supports prefetching for performance optimization
- Integrates with application routing patterns

### Design System
- Uses design system color tokens (`pgText-*`, `pgBackground-*`, `pgStroke-*`)
- Follows typography scale (`typography-labelSmall`, `typography-paragraphSmall`)
- Implements consistent spacing and sizing patterns

## Best Practices

### Component Architecture Adherence
- ✅ **Appropriate Client Component**: Uses client directive only when necessary for browser APIs
- ✅ **Flat Composition**: Composes with context menu and icon components without deep nesting
- ✅ **Generic Typing**: Supports type-safe integration with different ID types
- ✅ **Callback Pattern**: Uses callback props for parent communication instead of prop drilling

### Performance Considerations
- Event listener cleanup prevents memory leaks
- Scroll calculations are throttled through useCallback
- Next.js Link prefetching optimizes navigation performance
- Conditional sticky positioning reduces layout thrashing

### Accessibility
- Proper ARIA roles (`role='tab'`) for screen readers
- Keyboard navigation support through native button elements
- Visual focus indicators for tab selection
- Semantic HTML structure for assistive technologies