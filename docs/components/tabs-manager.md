# TabsManager Component

## Purpose

The `TabsManager` component provides a comprehensive tab management system for the application's main layout. It handles the display, navigation, and lifecycle management of both regular file tabs and generic navigation tabs. The component supports desktop-specific tab bar functionality with drag scrolling, tab prefetching, and various tab operations like closing, moving, and renaming.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Browser-specific features (scroll containers, drag interactions)
- Navigation hooks (`usePathname`, `useRouter`)
- Complex state management and event handlers
- DOM manipulation and refs for scrolling behavior

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `ReactNode` | Yes | Content to be rendered within the tab container |

## Usage Example

```tsx
import { TabsManager } from '@/components/main-layout/tabs-manager/tabs-manager';

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen">
      <TabsManager>
        {children}
      </TabsManager>
    </div>
  );
}

// The component automatically handles tab state from the tabs store
// and renders appropriate content based on current route
```

## Functionality

### Core Features
- **Responsive Design**: Desktop shows full tab bar, mobile shows simplified view
- **Tab Types**: Supports both regular file tabs and generic navigation tabs
- **Tab Operations**: Close, close others, close to right, move, rename
- **Navigation**: Automatic routing when tabs are closed or activated
- **Prefetching**: Intelligent prefetching of tab routes for performance
- **Drag Scrolling**: Horizontal scrolling for overflow tabs on desktop

### Tab Management Operations
- **Individual Close**: Close single tabs with automatic navigation fallback
- **Batch Close**: Efficiently close multiple tabs simultaneously
- **Close Others**: Close all tabs except the selected one
- **Close to Right**: Close all tabs positioned after the selected tab
- **Move/Rename**: Integration with file panel operations

### Visual Features
- **Active State**: Visual indication of currently active tab
- **Sticky Navigation**: Home and generic tabs remain visible during scroll
- **Overflow Handling**: Horizontal scrolling container for many tabs

## State Management

### Zustand Stores
- **`useTabsStore`**: Manages tab collection and operations
  - `tabs`: Regular file tabs
  - `genericTabs`: Navigation tabs
  - `onTabClose`, `onTabCloseBatch`: Tab removal operations
  - `onGenericTabClose`: Generic tab removal

### Context Providers
- **`TabContainerProvider`**: Provides tab container reference for scrolling
- **`useFileDisplayPanel`**: Manages file operation modals (move, rename)
- **`useAccessToken`**: Authorization state for conditional rendering

### Local State
- **`alreadyPrefetchedTabs`**: Tracks prefetched routes to avoid duplicates
- **Tab positioning**: Calculated href mappings for navigation fallbacks

## Side Effects

### Navigation Effects
- **Route Prefetching**: Automatically prefetches tab routes on mount and window focus
- **Automatic Navigation**: Redirects to appropriate route when active tab is closed
- **Scroll Reset**: Resets container scroll position on route changes

### Cleanup Effects
- **Modal State**: Resets file panel modal states on unmount
- **Event Listeners**: Removes window focus listeners for prefetching

### Analytics
- **Tab Tracking**: Sends analytics events for tab close operations
- **Error Reporting**: Captures exceptions with Sentry for debugging

## Dependencies

### Core Dependencies
- **Navigation**: `next/navigation` for routing and pathname detection
- **Scrolling**: `react-indiana-drag-scroll` for horizontal drag scrolling
- **Breakpoints**: `useBreakpoint` hook for responsive behavior

### Internal Dependencies
- **`TabRenderer`**: Renders individual tab components
- **`TabButton`**: Renders generic navigation buttons
- **`useTabAction`**: Hook for tab operation handlers
- **Tab Utilities**: Constants and helper functions for tab management

### External Services
- **Analytics**: `TabsTracker` for user interaction tracking
- **Error Monitoring**: Sentry integration for error reporting

## Integration

### Layout Integration
```tsx
// Main layout structure
<TabContainerProvider>
  <div className="flex h-full flex-col">
    {/* Desktop tab bar */}
    <TabsManagerDesktop />
    
    {/* Content container */}
    <TabsManagerInner>
      {children}
    </TabsManagerInner>
  </div>
</TabContainerProvider>
```

### Route Integration
- Automatically syncs with Next.js routing system
- Handles both file-based routes (`/files/[id]`) and generic routes (`/`, `/settings`)
- Provides fallback navigation when tabs are closed

### Store Integration
- Connects to centralized tab state management
- Coordinates with file operations and authorization state
- Maintains consistency between UI state and route state

## Best Practices

### Architecture Adherence
- **✅ Component Decomposition**: Properly split into `TabsManager`, `TabsManagerDesktop`, and `TabsManagerInner`
- **✅ State Management**: Uses Zustand for client state, proper separation of concerns
- **✅ Client Component Usage**: Appropriately uses client component for interactive features
- **✅ Hook Composition**: Leverages custom hooks for complex operations

### Performance Optimizations
- **Memoization**: Uses `useMemo` for expensive computations (tab arrays, href mappings)
- **Batch Operations**: Implements efficient batch closing for multiple tabs
- **Prefetching**: Intelligent route prefetching for improved navigation performance
- **Conditional Rendering**: Avoids rendering tab bar during authorization loading

### Error Handling
- **Graceful Fallbacks**: Safe navigation fallbacks when tabs are closed
- **Exception Tracking**: Proper error reporting for debugging
- **Validation**: Position and state validation for tab operations

### Accessibility & UX
- **Keyboard Navigation**: Supports standard tab navigation patterns
- **Visual Feedback**: Clear active states and hover interactions
- **Responsive Design**: Appropriate behavior across device sizes
- **Smooth Interactions**: Optimized scrolling and drag behavior