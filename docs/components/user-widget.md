# UserWidget Component Documentation

## Purpose

The UserWidget is a comprehensive user interface component that displays user information and provides access to account management, theme settings, and application features. It serves as the primary user interaction hub in the main layout, supporting both authenticated and guest user states with responsive design and smooth animations.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Interactive state management (dropdown open/close states)
- Theme manipulation via `useTheme` hook
- Browser-specific breakpoint detection
- User gesture handling for dropdowns and toggles

## Props Interface

### UserWidget Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `userData` | `User` | Optional | User object containing profile information (name, email, imageUrl) |
| `className` | `string` | Optional | Additional CSS classes for styling customization |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | Optional | Standard HTML div attributes |

### UsernameContainer Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `ReactNode \| ReactNode[]` | Yes | Content to display within the animated container |
| `isExpanded` | `boolean` | Yes | Controls the visibility and animation state of the container |

### UserWidgetMore Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `userData` | `User` | Optional | User object for profile display |
| `onClose` | `() => void` | Optional | Callback when closing the dropdown menu |
| `onCloseAll` | `() => void` | Optional | Callback when closing all related UI elements |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | Optional | Standard HTML div attributes |

## Usage Example

```tsx
import { UserWidget } from '@/components/main-layout/file-display-panel/user-widget';
import { useUser } from '@/lib/query-hooks';

function MainLayout() {
  const { data: userData } = useUser();

  return (
    <div className="sidebar">
      {/* Other sidebar content */}
      
      <UserWidget 
        userData={userData}
        className="mt-auto"
      />
    </div>
  );
}

// Using individual components
function CustomUserPanel() {
  const { data: userData } = useUser();
  const isExpanded = useFileDisplayPanel(state => state.isExpanded);

  return (
    <div>
      <UsernameContainer isExpanded={isExpanded}>
        <Typography variant="labelSmall">
          {getUserFullName(userData)}
        </Typography>
      </UsernameContainer>
      
      <ThemeToggle className="mt-4" />
    </div>
  );
}
```

## Functionality

### Core Features
- **User Profile Display**: Shows avatar, full name, and email for authenticated users
- **Guest User Support**: Provides sign-in/sign-up options for unauthenticated users
- **Theme Management**: System, light, and dark theme switching with visual indicators
- **Responsive Design**: Adapts layout and interactions for mobile and desktop
- **Animated Transitions**: Smooth expand/collapse animations for sidebar states

### Interactive Elements
- **Dropdown Menu**: Context-sensitive menu with different options based on auth state
- **Theme Toggle**: Three-way switch for theme preferences
- **Navigation Links**: Quick access to account, settings, developers, and support
- **Account Management**: Direct links to profile and account settings

### State-Dependent Rendering
- **Authenticated State**: Full profile info, account management, settings access
- **Guest State**: Sign-in/sign-up prompts with limited feature access
- **Loading State**: Graceful handling during authentication checks

## State Management

### Local State (useState)
- `active`: Controls visual active state of the dropdown trigger
- `open`: Manages dropdown menu open/close state

### External State Dependencies
- **useAccessToken**: Authentication state management (isAuthorized, isPublic, isLoading)
- **useFileDisplayPanel**: Sidebar expansion state from Zustand store
- **useTheme**: Theme preference management from next-themes
- **useBreakpoint**: Responsive breakpoint detection

### State Flow
```typescript
// Authentication state affects UI rendering
const { isAuthorized, isPublic, isLoading } = useAccessToken();

// Sidebar state controls animation behavior
const isExpanded = useFileDisplayPanel(state => state.isExpanded);

// Theme state manages appearance
const { theme, setTheme } = useTheme();
```

## Side Effects

### API Interactions
- **Logout Mutation**: Handles user logout with success callbacks
- **User Data Fetching**: Displays user profile information when available

### External Navigation
- **Account Management**: Routes to `/account/details`
- **Settings Navigation**: Links to various settings pages
- **External Support**: Opens support portal in new tab

### Theme Persistence
- Persists theme changes across browser sessions
- Syncs with system theme preferences when set to 'system'

## Dependencies

### UI Components
- `Avatar`: User profile image display
- `Button`: Action buttons and links
- `DropdownMenu`: Menu container and trigger
- `Typography`: Text styling and hierarchy
- `SwitchToggleMenu`: Theme selection interface

### Custom Hooks
- `useBreakpoint`: Responsive design utilities
- `useAccessToken`: Authentication state management
- `useFileDisplayPanel`: Sidebar state management
- `useLogout`: Logout functionality

### Utilities
- `getUserFullName`: User name formatting utility
- `cn`: Class name composition utility

### External Libraries
- `framer-motion`: Animation and transitions
- `next-themes`: Theme management
- `next/link`: Client-side navigation

## Integration

### Layout Integration
```typescript
// Typical placement in main layout
<Sidebar>
  <NavigationItems />
  <UserWidget userData={userData} className="mt-auto" />
</Sidebar>
```

### Authentication Flow
- Integrates with application authentication system
- Responds to auth state changes automatically
- Provides appropriate UI for each user state

### Theme System Integration
- Connects to global theme management
- Provides user-friendly theme switching interface
- Maintains theme consistency across application

## Best Practices

### Component Architecture Adherence
- ✅ **Lego Block Design**: Exports multiple focused components (UserWidget, ThemeToggle, UsernameContainer)
- ✅ **Flat Structure**: Components are composed rather than deeply nested
- ✅ **Single Responsibility**: Each export handles a specific concern

### State Management Best Practices
- ✅ **Appropriate State Tools**: Uses TanStack Query for server state (user data, logout)
- ✅ **Zustand Integration**: Leverages Zustand for client state (sidebar expansion)
- ✅ **Local State Scope**: Keeps UI-specific state (dropdown open/close) local

### Performance Considerations
- ✅ **Conditional Rendering**: Only renders auth-specific content when needed
- ✅ **Memoized Callbacks**: Uses `useCallback` for event handlers
- ✅ **Efficient Animations**: Framer Motion variants for optimized transitions

### Accessibility & UX
- ✅ **Semantic HTML**: Proper button and navigation structures
- ✅ **Keyboard Navigation**: Dropdown and toggle components support keyboard interaction
- ✅ **Visual Feedback**: Clear active states and hover effects
- ✅ **Responsive Design**: Adapts interface for different screen sizes

### Code Organization
- ✅ **Clear Exports**: Multiple focused exports for different use cases
- ✅ **Consistent Styling**: Uses design system tokens and utilities
- ✅ **Error Boundaries**: Graceful handling of missing user data
- ✅ **TypeScript Safety**: Proper typing for all props and state