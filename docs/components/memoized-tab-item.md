# MemoizedTabItem Component

## Purpose

The `MemoizedTabItem` component is a performance-optimized wrapper around the `TabItem` component that prevents unnecessary re-renders in the tabs manager system. It handles the rendering of individual tab items with their associated icons, preview images, and action handlers while maintaining optimal performance through React's memoization.

## Component Type

**Client Component** - Uses the `'use client'` directive implicitly through its use of React hooks (`memo`, `useCallback`) and interactive event handlers. This component needs to handle user interactions like clicking, closing tabs, and context menu actions that require client-side JavaScript.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `tab` | `Tab` | ✅ | The tab object containing type, id, name, and metadata |
| `position` | `number` | ✅ | The position index of the tab in the tabs list |
| `pathname` | `string` | ✅ | Current pathname to determine if tab is active |
| `containerRef` | `RefObject<HTMLDivElement>` | ✅ | Reference to the tabs container element |
| `handleTabClose` | `(name: string) => (tabId: number, isActive: boolean, position: number) => Promise<void>` | ✅ | Handler for closing a specific tab |
| `handleCloseOthers` | `(tabId: number \| string) => Promise<void>` | ❌ | Handler for closing all other tabs except the current one |
| `handleCloseToRight` | `(position: number) => Promise<void>` | ❌ | Handler for closing all tabs to the right of current position |
| `handleMoveTo` | `(tab: Tab) => void` | ❌ | Handler for moving/navigating to a tab |
| `handleRename` | `(tab: Tab) => void` | ❌ | Handler for renaming a tab (disabled for story tabs) |

## Usage Example

```tsx
import { MemoizedTabItem } from '@/components/main-layout/tabs-manager/memoized-tab-item';
import { useRef } from 'react';
import { usePathname } from 'next/navigation';

function TabsManager() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  const handleTabClose = (name: string) => 
    async (tabId: number, isActive: boolean, position: number) => {
      // Close tab logic
      await tabsStore.closeTab(tabId);
      if (isActive && position > 0) {
        // Navigate to previous tab
        router.push(tabs[position - 1].href);
      }
    };

  const handleCloseOthers = async (tabId: number | string) => {
    await tabsStore.closeOtherTabs(tabId);
  };

  const handleRename = (tab: Tab) => {
    setEditingTab(tab);
    setIsRenameModalOpen(true);
  };

  return (
    <div ref={containerRef} className="tabs-container">
      {tabs.map((tab, index) => (
        <MemoizedTabItem
          key={tab.id}
          tab={tab}
          position={index}
          pathname={pathname}
          containerRef={containerRef}
          handleTabClose={handleTabClose}
          handleCloseOthers={handleCloseOthers}
          handleRename={handleRename}
        />
      ))}
    </div>
  );
}
```

## Functionality

- **Performance Optimization**: Uses `React.memo` to prevent re-renders when props haven't changed
- **Event Handler Memoization**: Memoizes callback functions using `useCallback` to maintain referential equality
- **Dynamic Icon Rendering**: Displays either tab preview images or fallback icons based on metadata
- **Active State Management**: Determines and displays active tab state based on current pathname
- **Conditional Actions**: Conditionally renders action handlers based on tab type and available props
- **Null Safety**: Returns empty fragment if tab href cannot be generated

## State Management

**Local State Only** - This component doesn't directly manage state but receives all necessary data and handlers through props. It relies on:
- Parent components for tab data and state management
- Memoized callbacks to prevent unnecessary re-renders
- Props-based state derivation for active tab determination

## Side Effects

- **Navigation**: Indirectly triggers navigation through the `TabItem` component
- **Tab Operations**: Executes tab close, rename, and move operations through provided handlers
- **DOM Interactions**: Interacts with container ref for positioning and layout calculations

## Dependencies

### Components
- `TabItem` - The underlying tab item component
- `TabPreview` - Component for displaying tab preview images
- `TABS_ICONS` - Icon mapping utility for different tab types

### Types & Utilities
- `Tab`, `TabEntity` - Type definitions for tab data structures
- `tabToHref` - Utility function to generate href from tab data

### React Hooks
- `memo` - Performance optimization wrapper
- `useCallback` - Callback memoization
- `RefObject` - Container reference typing

## Integration

The `MemoizedTabItem` fits into the tabs management system as:

```
TabsManager
├── MemoizedTabItem (multiple instances)
│   └── TabItem
│       └── TabPreview (conditional)
└── Other tab management components
```

- **Parent**: Rendered by tabs manager components that handle the overall tab state
- **Children**: Renders `TabItem` with optimized props and memoized handlers
- **Siblings**: Works alongside other tab management utilities and components

## Best Practices

✅ **Performance Optimization**: Proper use of `React.memo` and `useCallback` for preventing unnecessary re-renders

✅ **Component Decomposition**: Clean separation between memoization logic and actual tab rendering

✅ **Conditional Rendering**: Smart handling of optional props and conditional feature rendering

✅ **Type Safety**: Strong TypeScript integration with proper prop typing

✅ **Display Name**: Includes `displayName` for better debugging experience

✅ **Null Safety**: Graceful handling of invalid tab states

✅ **Props Drilling Prevention**: Efficient prop passing without excessive nesting

This component exemplifies our architecture's focus on performance, reusability, and clean separation of concerns while maintaining the flexibility needed for complex tab management scenarios.