# SharedThreadPageTitle Component

## Purpose

The `SharedThreadPageTitle` component renders the page title and actions for shared thread pages in the main navigation layout. It adapts its display based on user authentication status (public vs private access) and provides contextual actions like sharing and search functionality.

## Component Type

**Client Component** - Uses `'use client'` directive because it relies on:
- Next.js `usePathname` hook for routing
- Multiple context hooks for state management
- Interactive UI elements requiring event handlers

## Props Interface

### SharedThreadPageTitle

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isActiveMobile` | `boolean` | Yes | Controls visibility of actions on mobile devices |
| `onOpenOmnibar` | `() => void` | Yes | Callback function to open the search omnibar |

### PrivateSharedThreadPageTitle (Internal)

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isVisible` | `boolean` | Yes | Controls visibility of action buttons |
| `thread` | `SavedSharedMemberThread` | Yes | Thread data for private shared threads |
| `onOpenOmnibar` | `() => void` | Yes | Callback function to open the search omnibar |

### ShareButton

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isVisible` | `boolean` | Yes | Controls visibility of the share button |
| `threadId` | `string` | Yes | ID of the thread to generate share URL |

## Usage Example

```tsx
import { SharedThreadPageTitle } from '@/components/main-layout/navigation/page-title/shared-thread-page-title';

function NavigationLayout() {
  const [isOmnibarOpen, setIsOmnibarOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleOpenOmnibar = () => {
    setIsOmnibarOpen(true);
  };

  return (
    <header className="navigation-header">
      <SharedThreadPageTitle
        isActiveMobile={isMobile}
        onOpenOmnibar={handleOpenOmnibar}
      />
    </header>
  );
}
```

## Functionality

### Core Features

- **Adaptive Rendering**: Displays different content based on user authentication status
- **Thread Context**: Shows thread name and folder information for authenticated users
- **Action Integration**: Provides share and search actions with conditional visibility
- **Mobile Responsiveness**: Adjusts action visibility based on mobile state
- **Loading States**: Handles loading states with skeleton components

### Display Modes

1. **Private/Authenticated Mode**: Shows full thread details with folder context
2. **Public Mode**: Shows basic thread name with limited actions
3. **Fallback Mode**: Shows placeholder content when data is unavailable

## State Management

### TanStack Query
- `useSavedSharedMemberThreadById`: Fetches thread data for authenticated users
- `useFolderById`: Retrieves folder information for thread organization

### Zustand Stores
- `useTabsStore`: Manages active tabs and navigation state

### Context Usage
- `useAccessToken`: Determines authentication status and access level
- `usePublicSharedThreadPage`: Provides metadata for public shared threads

## Side Effects

- **Route Monitoring**: Tracks pathname changes to identify current thread
- **Data Fetching**: Conditionally fetches thread and folder data based on entity ID
- **URL Generation**: Creates share URLs for thread sharing functionality

## Dependencies

### UI Components
- `PageTitleTrigger`, `PageTitleTriggerWithSheet`: Title display components
- `TitleActionsContainer`: Container for action buttons
- `NewSharePopover`: Share functionality popover
- `Skeleton`: Loading state component

### Feature Components
- `NewSearchAction`, `ShareAction`: Action button components
- `useThreadShareFromThreadId`: Hook for generating share URLs

### External Dependencies
- Next.js navigation hooks
- Custom query hooks and contexts
- Icon components

## Integration

### Application Architecture
- **Navigation Layer**: Integral part of main layout navigation system
- **Route-Aware**: Responds to route changes and tab state
- **Authentication-Aware**: Adapts to user access levels
- **Mobile-First**: Considers mobile experience in action visibility

### Data Flow
1. Component receives navigation state from parent layout
2. Determines current thread from pathname and tabs store
3. Fetches relevant data based on authentication status
4. Renders appropriate UI variant with contextual actions

## Best Practices

### Architecture Adherence
- ✅ **Component Decomposition**: Well-decomposed with specialized sub-components
- ✅ **State Management**: Proper separation of server state (TanStack Query) and client state (Zustand)
- ✅ **Conditional Rendering**: Clean separation of concerns for different access modes
- ✅ **Props Interface**: Clear, focused props for each component level

### Performance Considerations
- Uses `useMemo` for expensive computations (entity ID extraction)
- Conditional data fetching with proper `enabled` flags
- Skeleton loading states for better perceived performance

### Error Handling
- Graceful fallbacks for missing data
- Proper null checks and optional chaining
- Default folder handling for orphaned threads