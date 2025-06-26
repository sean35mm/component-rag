# StoryPageTitle Component

## Purpose

The `StoryPageTitle` component is a navigation element that displays the title of a story page and provides contextual actions like sharing and search functionality. It adapts its behavior based on user authentication state, screen size, and story context, serving as a key part of the main layout navigation system.

## Component Type

**Client Component** (`'use client'`)

This component requires client-side rendering because it:
- Uses Next.js `usePathname` hook for route detection
- Manages interactive states (popovers, sheets)
- Handles user interactions (clicks, navigation)
- Conditionally renders based on authentication state

## Props Interface

### StoryPageTitle

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isActiveMobile` | `boolean` | Yes | Controls mobile-specific behavior and action visibility |
| `onOpenOmnibar` | `() => void` | Yes | Callback function to trigger omnibar/search functionality |

### PrivateStoryPageTitle

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `folderEntity` | `FolderEntity` | Yes | Story metadata including name, ID, and navigation info |
| `isVisible` | `boolean` | Yes | Controls visibility of action buttons |
| `onOpenOmnibar` | `() => void` | Yes | Callback function to open search interface |

### PublicStoryPageTitle

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isVisible` | `boolean` | Yes | Controls visibility of action buttons |
| `onOpenOmnibar` | `() => void` | Yes | Callback function to open search interface |

### ShareButton

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isVisible` | `boolean` | Yes | Controls button visibility state |
| `story` | `StoryWithPageInfo` | Yes | Story data required for sharing functionality |

## Usage Example

```tsx
import { StoryPageTitle } from '@/components/main-layout/navigation/page-title/story-page-title';

function MainNavigation() {
  const [isOmnibarOpen, setIsOmnibarOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <nav className="flex items-center justify-between p-4">
      <StoryPageTitle
        isActiveMobile={isMobile}
        onOpenOmnibar={() => setIsOmnibarOpen(true)}
      />
      
      {/* Other navigation elements */}
    </nav>
  );
}
```

## Functionality

### Core Features

- **Adaptive Rendering**: Displays different UI based on authentication state (private vs public)
- **Story Context Detection**: Automatically identifies current story from URL and tab state
- **Mobile Responsiveness**: Adjusts action visibility based on screen size
- **Interactive Elements**: Provides share and search actions with appropriate triggers

### Behavior Patterns

- **Loading State**: Shows placeholder content while authentication status loads
- **Conditional Actions**: Share button only appears when story data is available
- **Fallback Handling**: Gracefully handles missing story data with disabled states

## State Management

### TanStack Query Usage

```tsx
// Story data fetching
const { data: savedStory } = useSavedStoryById(entityId!, {
  enabled: !!entityId,
});

const { data: story } = useStoryById(folderEntity.entityId, {
  enabled: !!folderEntity.entityId,
});

// Public story fetching
const { data: story } = useStoriesListWithPageInfo(
  { slug: meta?.slug, size: 1, showDuplicates: true },
  { enabled: !!meta?.slug, select: (res) => res.results.at(0) }
);
```

### Zustand Store Integration

```tsx
// Tab and navigation state
const { tabs, genericTabs } = useTabsStore();

// Authentication context
const { isLoading, isAuthorizedAndVerified } = useAccessToken();
```

## Side Effects

- **Route Monitoring**: Watches pathname changes to update story context
- **Data Fetching**: Triggers API calls based on entity IDs and slugs
- **Share Actions**: Initiates sharing workflows through story share hooks

## Dependencies

### UI Components
- `SheetTitle` from `@/components/ui/sheet`
- `PageTitleTrigger`, `PageTitleTriggerWithSheet`
- `TitleActionsContainer`
- `NewSearchAction`, `ShareAction`

### Hooks and Contexts
- `useAccessToken` - Authentication state
- `useTabsStore` - Navigation and tab management
- `useSavedStoryById`, `useStoryById`, `useStoriesListWithPageInfo` - Data fetching
- `useHandleStoryShareButtonClick` - Share functionality

### Utilities
- `cn` - Class name utility
- `isGenericHrefMatchPathname`, `tabToHref` - URL/routing utilities

## Integration

### Navigation Architecture

```
MainLayout
├── Navigation
│   ├── PageTitle
│   │   └── StoryPageTitle ← This component
│   ├── TabsManager
│   └── OmnibarTrigger
```

### Data Flow

1. **Route Detection**: Component monitors `usePathname()` for current story
2. **Entity Resolution**: Maps pathname to entity ID via tab store
3. **Data Fetching**: Queries appropriate story data based on auth state
4. **UI Rendering**: Shows context-appropriate title and actions

## Best Practices

### Architecture Adherence

✅ **Proper Client Component Usage**: Uses `'use client'` only for interactive features
✅ **Component Decomposition**: Well-separated concerns with focused sub-components
✅ **State Management**: TanStack Query for server state, Zustand for client state
✅ **Conditional Rendering**: Clean authentication-based component switching

### Implementation Patterns

```tsx
// ✅ Good: Memoized computations
const entityId = useMemo(
  () => tabs.find((it) => tabToHref(it) === pathname)?.metadata.entityId ?? null,
  [pathname, tabs]
);

// ✅ Good: Enabled query conditions
const { data: savedStory } = useSavedStoryById(entityId!, {
  enabled: !!entityId,
});

// ✅ Good: Loading state handling
if (isLoading) {
  return <LoadingState />;
}
```

### Component Composition

- **Single Responsibility**: Each sub-component handles one specific case
- **Props Interface**: Clear and focused prop contracts
- **Error Boundaries**: Graceful fallbacks for missing data
- **Performance**: Memoized calculations and conditional queries