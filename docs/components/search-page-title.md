# SearchPageTitle Component

## Purpose
The `SearchPageTitle` component dynamically renders the appropriate page title and actions for search-related pages in the navigation bar. It intelligently switches between explore page and saved search page layouts based on the current URL path, providing contextual actions like creating signals, sharing searches, and starting new searches.

## Component Type
**Client Component** - Uses `'use client'` directive because it:
- Accesses browser APIs through `usePathname` hook
- Manages interactive UI state and user interactions
- Conditionally renders based on client-side routing state
- Handles click events and popover interactions

## Props Interface

### SearchPageTitleProps
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isActiveMobile` | `boolean` | Yes | Controls mobile-specific visibility and layout behavior |
| `onOpenOmnibar` | `() => void` | Yes | Callback function to trigger the omnibar (search interface) opening |

### PrivateSavedSearchPageTitleTriggerProps
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isVisible` | `boolean` | Yes | Controls visibility of action buttons |
| `search` | `SavedDeepSearch` | Yes | The saved search data to display |
| `onOpenOmnibar` | `() => void` | Yes | Callback to open the omnibar |

### ShareButtonProps
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isVisible` | `boolean` | Yes | Controls visibility of the share button |
| `metadata` | `DeepSearchMetadata` | Yes | Search metadata for sharing functionality |

## Usage Example

```tsx
import { SearchPageTitle } from '@/components/main-layout/navigation/page-title/search-page-title';

function NavigationBar() {
  const [isOmnibarOpen, setIsOmnibarOpen] = useState(false);
  const isMobileMenuActive = useMobileNavigation();

  return (
    <div className="navigation-bar">
      <SearchPageTitle
        isActiveMobile={isMobileMenuActive}
        onOpenOmnibar={() => setIsOmnibarOpen(true)}
      />
    </div>
  );
}
```

## Functionality

### Core Features
- **Dynamic Page Title Rendering**: Automatically switches between explore and saved search layouts
- **Contextual Actions**: Displays relevant actions based on page type and user permissions
- **Mobile Responsiveness**: Adapts visibility and layout for mobile devices
- **Authentication Awareness**: Shows different content for authenticated vs. unauthenticated users

### Action Buttons
- **Signal Creation**: Create monitoring signals from search results
- **Share Functionality**: Share searches with others via popover interface
- **New Search**: Quick access to start new searches via omnibar

### Page Type Detection
- **Explore Page**: Generic search page with public search metadata
- **Saved Search**: Private saved searches with full CRUD capabilities

## State Management

### Zustand Stores
- **`useCreateSignalStore`**: Manages deep search metadata for signal creation
- **`useTabsStore`**: Tracks open tabs and their metadata

### Context Providers
- **`useAccessToken`**: User authentication and verification status
- **`usePublicExplorePage`**: Public search metadata and state

### TanStack Query
- **`useSavedDeepSearchById`**: Fetches saved search data by ID with caching

## Side Effects

### Navigation Tracking
- Monitors URL pathname changes via `usePathname` hook
- Dynamically updates component rendering based on route matching

### Data Fetching
- Conditionally fetches saved search data when entity ID is available
- Automatically refetches when dependencies change

### User Interactions
- Triggers omnibar opening through callback prop
- Manages share popover state and interactions

## Dependencies

### UI Components
- `PageTitleTrigger`, `PageTitleTriggerWithSheet`: Base title trigger components
- `TitleActionsContainer`: Container for action buttons
- `SheetTitle`: Sheet dialog title component

### Feature Components
- `SearchCreateSignalButton`: Signal creation functionality
- `SearchSharePopover`: Search sharing interface
- `ShareAction`, `NewSearchAction`: Action button components

### Icons & Utilities
- `IconDeepSearch`: Search-specific icon
- `cn`: Class name utility for conditional styling
- Tab routing utilities for URL generation

## Integration

### Navigation Architecture
Integrates with the main layout navigation system as a specialized page title component for search-related routes.

### Tab Management
Works closely with the tabs system to:
- Match current pathname to active tab
- Extract entity IDs from tab metadata
- Generate proper navigation URLs

### Search System
Connects to the broader search architecture through:
- Deep search metadata management
- Signal creation workflows
- Search sharing capabilities

## Best Practices

### Component Decomposition
✅ **Follows flat component structure** with clear separation of concerns:
- Main component handles routing logic
- Sub-components handle specific page types
- Utility components handle individual actions

### Conditional Rendering
✅ **Smart component switching** based on URL patterns rather than deep nesting

### State Management Patterns
✅ **Proper state separation**:
- Server state via TanStack Query for saved searches
- Client state via Zustand for UI interactions
- Local state for component-specific behavior

### Performance Optimization
✅ **Efficient data fetching** with conditional queries and proper dependency arrays

### Accessibility
✅ **Semantic structure** with proper ARIA labels and keyboard navigation support