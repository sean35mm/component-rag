# MemoizedGenericTabItem Component

## Purpose

The `MemoizedGenericTabItem` component is a memoized wrapper for rendering generic tab items in the application's tab management system. It handles the display of generic tabs (such as dashboard, settings, profile pages) with appropriate icons, names, and close functionality. The component optimizes performance by preventing unnecessary re-renders when props haven't changed and manages tab-specific behaviors like closing, preview display, and active state detection.

## Component Type

**Client Component** - Uses the `'use client'` directive implicitly through its use of React hooks (`memo`, `useCallback`) and interactive event handlers. This component needs to handle user interactions like tab closing and responds to client-side routing changes.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `tab` | `TabStructure` | ✅ | The tab data structure containing type, href, name, and preview information |
| `position` | `number` | ✅ | The position index of the tab in the tabs list |
| `pathname` | `string` | ✅ | Current pathname used to determine if the tab is active |
| `isAuthorized` | `boolean` | ✅ | Whether the user is authorized, affects tab name resolution |
| `containerRef` | `RefObject<HTMLDivElement \| null>` | ✅ | Reference to the tabs container for positioning and scrolling |
| `handleGenericTabClose` | `(type: TabOptionType) => (href: string, isActive: boolean, position: number) => Promise<void>` | ✅ | Curried function to handle closing a specific tab |
| `handleGenericCloseOthers` | `(tabHref: string) => Promise<void>` | ❌ | Optional function to close all other tabs except the current one |
| `handleGenericCloseToRight` | `(position: number) => Promise<void>` | ❌ | Optional function to close all tabs to the right of the current position |

## Usage Example

```tsx
import { MemoizedGenericTabItem } from '@/components/main-layout/tabs-manager/memoized-generic-tab-item';
import { TabOptionType, TabStructure } from '@/lib/types';

function TabsManager() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isAuthorized = useAuth().isAuthenticated;

  const genericTabs: TabStructure[] = [
    {
      type: 'dashboard',
      href: '/dashboard',
      name: 'Dashboard',
      preview: '/images/dashboard-preview.png'
    },
    {
      type: 'settings',
      href: '/settings',
      name: 'Settings'
    }
  ];

  const handleGenericTabClose = useCallback(
    (type: TabOptionType) => 
      async (href: string, isActive: boolean, position: number) => {
        // Handle tab closing logic
        await closeTab(href);
        if (isActive) {
          // Navigate to another tab if closing active tab
          router.push('/dashboard');
        }
      },
    []
  );

  const handleCloseOthers = useCallback(
    async (tabHref: string) => {
      // Close all tabs except the specified one
      await closeAllTabsExcept(tabHref);
    },
    []
  );

  const handleCloseToRight = useCallback(
    async (position: number) => {
      // Close all tabs to the right of the position
      await closeTabsFromPosition(position + 1);
    },
    []
  );

  return (
    <div ref={containerRef} className="tabs-container">
      {genericTabs.map((tab, index) => (
        <MemoizedGenericTabItem
          key={tab.href}
          tab={tab}
          position={index}
          pathname={pathname}
          isAuthorized={isAuthorized}
          containerRef={containerRef}
          handleGenericTabClose={handleGenericTabClose}
          handleGenericCloseOthers={handleCloseOthers}
          handleGenericCloseToRight={handleCloseToRight}
        />
      ))}
    </div>
  );
}
```

## Functionality

- **Memoized Rendering**: Prevents unnecessary re-renders when props haven't changed
- **Active State Detection**: Uses `isGenericHrefMatchPathname` to determine if the tab matches the current pathname
- **Dynamic Tab Names**: Resolves tab names based on authorization status using lookup maps
- **Icon/Preview Display**: Shows either a preview image with fallback icon or just the tab type icon
- **Tab Actions**: Supports closing individual tabs, closing others, and closing tabs to the right
- **Callback Optimization**: Uses `useCallback` to memoize action handlers and prevent child re-renders

## State Management

**Local State Only** - This component doesn't directly manage global state but receives state through props:
- Tab state is managed by parent components
- Authorization state is passed down as a prop
- Current pathname comes from Next.js routing

The component optimizes rendering through React's `memo` and `useCallback` hooks rather than external state management.

## Side Effects

- **Tab Navigation**: Clicking tabs triggers navigation through the underlying `TabItem` component
- **Tab Closing**: Executes asynchronous close operations that may trigger navigation
- **Context Menu Actions**: Close others/close to right operations affect multiple tabs

No direct API calls or external data fetching occurs in this component.

## Dependencies

### Components
- `TabItem` - The underlying tab component that handles rendering and interactions
- `TabPreview` - Displays tab preview images with fallback support

### Utilities
- `GENERIC_TAB_TO_NAME` / `GENERIC_TAB_TO_NAME_UNAUTH` - Tab name lookup maps
- `GENERIC_TABS_ICONS` - Icon mapping for different tab types
- `isGenericHrefMatchPathname` - Utility for matching hrefs to pathnames

### Types
- `TabOptionType` - Enum/type for different tab options
- `TabStructure` - Interface defining tab data structure

## Integration

The `MemoizedGenericTabItem` fits into the larger tab management architecture:

1. **Tab Management System**: Part of the main layout's tab management functionality
2. **Navigation Integration**: Works with Next.js routing to handle tab navigation
3. **Performance Layer**: Provides memoization optimization for tab rendering
4. **Authentication Awareness**: Adapts behavior based on user authorization status
5. **Context Menu Integration**: Supports advanced tab operations through context menus

## Best Practices

✅ **Follows Architecture Guidelines**:
- **Memoization**: Uses `React.memo` for performance optimization
- **Callback Optimization**: Leverages `useCallback` to prevent unnecessary re-renders
- **Component Decomposition**: Acts as a thin wrapper around `TabItem`, following composition patterns
- **Props Interface**: Clear, typed interface with appropriate required/optional props

✅ **Performance Optimizations**:
- Memoized component prevents re-renders when props are unchanged
- Callbacks are memoized to maintain referential equality
- Efficient prop drilling for tab management functions

✅ **Type Safety**:
- Fully typed props interface with TypeScript
- Proper integration with application type definitions

✅ **Separation of Concerns**:
- Focuses only on generic tab rendering logic
- Delegates actual tab functionality to `TabItem`
- Keeps tab management logic in parent components