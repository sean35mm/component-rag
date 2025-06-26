# FileDisplayPanelFooter Component

## Purpose

The `FileDisplayPanelFooter` component renders the bottom section of the file display panel sidebar, containing navigation links for developers and settings, authentication widget, and user profile information. It provides conditional rendering based on user authentication state and panel expansion status.

## Component Type

**Client Component** - Uses the `'use client'` directive (implied by hooks usage) because it:
- Manages interactive state through Zustand stores (`useFileDisplayPanel`)
- Handles conditional rendering based on authentication state
- Requires client-side navigation and tooltip interactions

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | This component accepts no props |

## Usage Example

```tsx
import { FileDisplayPanelFooter } from '@/components/main-layout/file-display-panel/file-display-panel-footer';

function FileDisplayPanel() {
  return (
    <div className="flex flex-col h-full">
      {/* Panel header and content */}
      <div className="flex-1">
        {/* Main panel content */}
      </div>
      
      {/* Footer with navigation and user widget */}
      <FileDisplayPanelFooter />
    </div>
  );
}
```

## Functionality

### Core Features
- **Dynamic Navigation Links**: Renders primary (Developers) and conditional secondary (Settings) navigation links
- **Authentication Integration**: Shows authentication widget for public/unauthenticated users when panel is expanded
- **Responsive Layout**: Adapts navigation link display based on panel expansion state
- **Tooltip Support**: Provides tooltips for navigation items when panel is collapsed
- **User Profile Display**: Shows user widget with profile information

### Conditional Rendering Logic
- Authentication widget appears only for public users when panel is expanded
- Settings link appears only for authorized users
- Tooltips display only when panel is collapsed
- Link styling adapts to expansion state

## State Management

### Zustand Store Integration
```tsx
const isExpanded = useFileDisplayPanel((state) => state.isExpanded);
```
- **Store**: `useFileDisplayPanel` - Manages panel expansion state
- **Usage**: Controls layout and tooltip visibility

### TanStack Query Integration
```tsx
const { data: userData } = useUserDetails();
```
- **Query**: `useUserDetails` - Fetches current user profile data
- **Usage**: Provides user information to UserWidget component

### Context Dependencies
```tsx
const { isAuthorized, isPublic } = useAccessToken();
```
- **Context**: `useAccessToken` - Provides authentication state
- **Usage**: Controls conditional rendering of authentication and settings features

## Side Effects

### Navigation Effects
- Renders navigation links that trigger client-side routing
- Tooltip interactions for collapsed panel state

### Authentication State Responses
- Conditionally renders authentication widget based on user state
- Shows/hides settings link based on authorization status

## Dependencies

### Internal Components
- `WidgetAuthentication` - Authentication interface for public users
- `TabMenuVertical` - Vertical navigation menu container
- `Tooltip`, `TooltipContent`, `TooltipTrigger` - Tooltip system
- `LinkItem` - Individual navigation link component
- `UserWidget` - User profile display component

### Icons
- `IconSettings` - Settings navigation icon
- `IconTools` - Developers navigation icon

### Hooks & Contexts
- `useFileDisplayPanel` - Panel state management
- `useAccessToken` - Authentication state
- `useUserDetails` - User profile data query

### Utilities
- `cn` - Conditional class name utility

## Integration

### Application Architecture Role
```
Main Layout
├── File Display Panel
│   ├── Header
│   ├── Content Area
│   └── Footer (FileDisplayPanelFooter) ← This component
│       ├── Authentication Widget
│       ├── Navigation Links
│       └── User Widget
```

### Data Flow
1. **Panel State**: Subscribes to panel expansion state from Zustand store
2. **Authentication State**: Receives auth status from context
3. **User Data**: Queries user details via TanStack Query
4. **Navigation**: Provides links to developers and settings sections

## Best Practices

### Architecture Adherence
- ✅ **State Management**: Properly uses Zustand for UI state and TanStack Query for server state
- ✅ **Component Decomposition**: Leverages existing UI components (`TabMenuVertical`, `Tooltip`)
- ✅ **Conditional Rendering**: Clean separation of concerns for different user states
- ✅ **Reusability**: Uses shared `LinkItem` component for consistent navigation

### Code Organization
```tsx
// Clear separation of link configurations
const PRIMARY_LINKS: SidebarLinkItem[] = [/* always visible */];
const SECONDARY_LINKS: SidebarLinkItem[] = [/* auth-dependent */];

// Logical composition of navigation items
[...PRIMARY_LINKS, ...(isAuthorized ? SECONDARY_LINKS : [])]
```

### Performance Considerations
- Efficient re-renders through selective state subscriptions
- Conditional array spreading prevents unnecessary component mounting
- Tooltip rendering optimized with `hidden` prop vs conditional rendering