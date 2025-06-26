# MobileNavigation Component

## Purpose

The `MobileNavigation` component provides a responsive navigation interface specifically designed for mobile devices. It renders a collapsible sidebar with primary navigation links, folder management, user profile controls, and omnibar search functionality. The component appears only on mobile screens and provides a hamburger menu-style navigation experience.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Interactive state management for mobile sheet visibility
- Event handlers for user interactions (menu toggling, navigation)
- Browser-specific features like backdrop blur and responsive design
- Integration with multiple Zustand stores for UI state management

## Props Interface

This component accepts no props - it's a self-contained navigation solution.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | This component has no props |

## Usage Example

```tsx
import { MobileNavigation } from '@/components/main-layout/navigation/mobile-navigation';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {/* Mobile navigation appears only on mobile screens */}
      <MobileNavigation />
      
      <main className="lg:ml-64">
        {children}
      </main>
    </div>
  );
}
```

## Functionality

### Core Features
- **Responsive Header Bar**: Displays hamburger menu and page title with omnibar integration
- **Collapsible Sidebar**: Full-screen navigation panel with primary links and folders
- **User Profile Section**: Avatar display with expandable user menu
- **Primary Navigation**: Quick access to Home, Trending, and Signals pages
- **Folder Management**: Integrated folder container for file organization
- **Search Integration**: "New Search" button that opens the omnibar
- **Dual Sheet System**: Separate sheets for main navigation and user menu

### Interactive Elements
- Hamburger menu toggle for main navigation
- User avatar click for profile menu
- Close button for navigation panel
- Primary navigation links with custom styling
- Omnibar trigger from multiple entry points

## State Management

### Zustand Stores
- **`useFileDisplayPanel`**: Manages mobile navigation visibility state
  - `isActiveMobile`: Controls main navigation sheet visibility
  - `setIsActiveMobile`: Toggle function for navigation panel
- **`useOmnibarStore`**: Controls search interface
  - `setIsOpen`: Opens the omnibar search functionality

### Local State
- **`isActiveUserMore`**: Controls user profile menu sheet visibility using React's `useState`

### Server State
- **`useAccessToken`**: Authentication status and loading states
- **`useUserDetails`**: User profile information via TanStack Query

## Side Effects

### Authentication Integration
- Dynamically renders user avatar or guest icon based on auth status
- Displays appropriate username or "Guest User" fallback
- Handles loading states during authentication checks

### Navigation Management
- Automatically closes navigation when links are clicked
- Manages multiple sheet states without conflicts
- Integrates with global omnibar state management

## Dependencies

### UI Components
- `Sheet`, `SheetContent`, `SheetFooter` from UI library
- `Avatar`, `Button`, `Typography` for consistent styling
- Custom icons from centralized icon system

### Feature Components
- `LinkItem`, `SidebarLinkItem` for navigation items
- `FoldersContainer` for file organization
- `UserWidgetMore` for extended user menu
- `PageTitle` for header display

### Hooks & Contexts
- `useAccessToken` for authentication state
- `useFileDisplayPanel` for navigation state
- `useOmnibarStore` for search functionality
- `useUserDetails` for user profile data

### Utilities
- `getUserFullName` for name formatting
- `GENERIC_TABS_TO_HREF` for route mapping

## Integration

### Layout Architecture
- Positioned as a mobile-specific navigation layer
- Hidden on desktop screens (`lg:hidden` class)
- Provides backdrop blur for modern mobile experience
- Integrates with main layout's responsive design system

### Global State Integration
- Coordinates with omnibar for search functionality
- Manages file display panel state across the application
- Respects authentication state for personalized experience

### Routing Integration
- Uses predefined route constants for consistency
- Supports both static routes and dynamic tab-based navigation
- Maintains current page context through PageTitle component

## Best Practices

### Component Architecture Adherence
- **Client Component Usage**: Appropriately uses client-side rendering for interactive features
- **State Management**: Leverages Zustand for global UI state, local state for component-specific needs
- **Component Decomposition**: Composes smaller, reusable components rather than monolithic structure
- **Separation of Concerns**: Delegates specific functionality to specialized components

### Performance Considerations
- **Conditional Rendering**: Only renders on mobile screens to avoid unnecessary overhead
- **Memoized Computations**: Uses `useMemo` for username calculation to prevent re-renders
- **Callback Optimization**: Employs `useCallback` for event handlers to prevent child re-renders

### Accessibility
- **ARIA Labels**: Provides descriptive labels for icon-only buttons
- **Keyboard Navigation**: Supports standard keyboard interactions through Sheet component
- **Screen Reader Support**: Semantic HTML structure with proper button and navigation elements

### User Experience
- **Responsive Design**: Adapts to various mobile screen sizes with max-width constraints
- **Smooth Interactions**: Provides visual feedback and smooth transitions
- **Intuitive Navigation**: Follows common mobile navigation patterns with hamburger menu