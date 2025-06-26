# FileDisplayPanel Component

## Purpose

The `FileDisplayPanel` is a collapsible sidebar navigation component that serves as the primary navigation interface for the application. It provides quick access to core features like search, trending content, signals, and file organization through an expandable/collapsible panel with keyboard shortcuts and smooth animations.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Interactive state management for expand/collapse functionality
- Event handlers for keyboard shortcuts and click interactions
- Browser-specific logic for platform detection (macOS vs other platforms)
- Animation state management with Framer Motion
- Local storage or client-side state persistence

## Props Interface

### FileDisplayPanel
The main component accepts no props and manages its own state internally.

### LinkItem Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `link` | `SidebarLinkItem` | ✅ | Configuration object containing link details |
| `isExpanded` | `boolean` | ✅ | Whether the sidebar is in expanded state |
| `checkBaseUrl` | `boolean` | ❌ | Whether to check base URL for active state |
| `disableIsActive` | `boolean` | ❌ | Disables active state detection |
| `className` | `string` | ❌ | Additional CSS classes |

### SidebarLinkItem Interface
| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | `string` | ✅ | Display name for the link |
| `href` | `string` | ❌ | Navigation URL |
| `icon` | `React.ElementType` | ✅ | Icon component to display |
| `shortcut` | `string` | ❌ | Keyboard shortcut display text |
| `selected` | `boolean` | ❌ | Whether the item is selected |
| `tooltip` | `string` | ❌ | Tooltip text |
| `baseUrl` | `string` | ❌ | Base URL for active state checking |
| `iconClass` | `string` | ❌ | Additional icon styling |
| `onClick` | `() => void` | ❌ | Click handler function |
| `disableIsActive` | `boolean` | ❌ | Disables active state detection |

## Usage Example

```tsx
import { FileDisplayPanel } from '@/components/main-layout/file-display-panel';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <FileDisplayPanel />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}

// Using LinkItem independently
import { LinkItem, type SidebarLinkItem } from '@/components/main-layout/file-display-panel';

const customLink: SidebarLinkItem = {
  name: 'Dashboard',
  href: '/dashboard',
  icon: DashboardIcon,
  shortcut: 'Ctrl+D',
};

function CustomSidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  
  return (
    <LinkItem 
      link={customLink}
      isExpanded={isExpanded}
    />
  );
}
```

## Functionality

### Core Features
- **Collapsible Interface**: Smooth expand/collapse with animated transitions
- **Keyboard Navigation**: Global keyboard shortcuts (Cmd/Ctrl+K for search)
- **Platform Awareness**: Adapts keyboard shortcut display for macOS vs other platforms
- **Active State Management**: Automatically highlights current page/section
- **Tooltip Support**: Shows tooltips when collapsed for better UX
- **Responsive Design**: Adjusts layout based on expanded/collapsed state

### Navigation Links
- **New Search**: Opens omnibar with keyboard shortcut support
- **Trending**: Navigation to trending content
- **Signals**: Navigation to signals with cache invalidation
- **Folders**: Expandable file organization system

### Animations
- Smooth width transitions using Framer Motion variants
- Icon fade-in animations with staggered timing
- State-based animation controls

## State Management

### Zustand Stores
- **`useFileDisplayPanel`**: Manages panel expansion state
  - `isExpanded`: Current expansion state
  - `onIsExpandedToggle`: Toggle function
- **`useOmnibarStore`**: Controls search overlay
  - `setIsOpen`: Opens the omnibar search interface

### Local State
- **Platform Detection**: Tracks macOS for keyboard shortcut display
- **Animation States**: Managed by Framer Motion variants

### TanStack Query Integration
- **Cache Invalidation**: Invalidates usage queries when accessing signals
- **Query Client**: Direct access for manual cache management

## Side Effects

### Effects on Mount
- **Platform Detection**: Determines operating system for keyboard shortcut display
- **Keyboard Listener Setup**: Registers global Cmd/Ctrl+K handler

### Side Effects on Interaction
- **Omnibar Activation**: Opens search interface on shortcut or button click
- **Cache Invalidation**: Refreshes usage data when navigating to signals
- **Navigation**: Triggers Next.js routing for internal links

## Dependencies

### Internal Components
- `TabMenuVertical`: Vertical tab menu wrapper
- `SidebarLink`: Individual navigation link component
- `FoldersContainer`: File organization section
- `FileDisplayPanelFooter`: Bottom section of the panel
- `Tooltip` components: Hover information display

### Custom Hooks
- `useKeyCombination`: Global keyboard shortcut management
- `useFileDisplayPanel`: Panel state management
- `useOmnibarStore`: Search interface control

### External Libraries
- **Framer Motion**: Animation and transition effects
- **TanStack Query**: Server state and cache management
- **Next.js**: Navigation and routing (`usePathname`, `NextLink`)

### Icons
- Custom icon components for navigation and branding
- Platform-specific icon rendering

## Integration

### Application Architecture Role
- **Primary Navigation**: Main navigation interface for the entire application
- **Layout Component**: Integral part of the main layout structure
- **State Bridge**: Connects navigation actions to global application state

### Layout Integration
```tsx
// Typical integration in main layout
<div className="flex h-screen">
  <FileDisplayPanel />
  <main className="flex-1 overflow-hidden">
    {children}
  </main>
</div>
```

### Global State Integration
- Integrates with application-wide navigation state
- Coordinates with omnibar/search functionality
- Manages query cache invalidation for data freshness

## Best Practices

### Architecture Adherence
- ✅ **Client Component Usage**: Appropriately uses client component for interactive features
- ✅ **State Management**: Proper separation of concerns with Zustand for UI state and TanStack Query for server state
- ✅ **Component Decomposition**: Well-decomposed with separate concerns (footer, folders, links)
- ✅ **Reusability**: `LinkItem` component is reusable and well-abstracted

### Implementation Patterns
- ✅ **Forward Refs**: Properly implements `forwardRef` for `LinkItem`
- ✅ **TypeScript**: Comprehensive type definitions with interfaces
- ✅ **Performance**: Uses `useMemo` and `useCallback` for optimization
- ✅ **Accessibility**: Includes proper ARIA attributes and tooltip support

### Recommended Usage
- Use as a singleton component in the main layout
- Customize `PRIMARY_LINKS` for different application sections
- Extend `SidebarLinkItem` interface for additional functionality
- Leverage the `LinkItem` component for consistent navigation patterns

### State Management Best Practices
- Panel state persists across navigation
- Global keyboard shortcuts work from any page
- Cache invalidation is strategic and performance-conscious