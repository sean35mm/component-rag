# SignalCreateButton Component

## Purpose

The `SignalCreateButton` component provides a contextual action button that allows users to create a new signal based on their current saved search. It appears as a dropdown menu item in the navigation when users are on a search page and have appropriate permissions. The component intelligently maps the current search query, filters, and entities into a new signal creation flow.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages user interactions and click handlers
- Uses Next.js navigation hooks (`useRouter`, `useParams`, `usePathname`)
- Accesses multiple client-side contexts and state stores
- Requires real-time state updates and conditional rendering

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | Optional | Additional CSS classes to apply to the component for styling customization |

## Usage Example

```tsx
import { SignalCreateButton } from '@/components/main-layout/navigation/page-title/signal-create-button';

// Basic usage in a navigation menu
<DropdownMenu>
  <DropdownMenuContent>
    {/* Other menu items */}
    <SignalCreateButton className="border-t pt-2" />
  </DropdownMenuContent>
</DropdownMenu>

// In a page title component
function PageTitle() {
  return (
    <div className="flex items-center justify-between">
      <h1>Search Results</h1>
      <DropdownMenu>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <SignalCreateButton />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
```

## Functionality

### Core Features
- **Conditional Rendering**: Only displays for authorized users on search pages
- **Search Context Mapping**: Automatically extracts current search parameters to pre-populate signal creation
- **Usage Limit Enforcement**: Checks signal creation limits and provides user feedback
- **Loading State Management**: Disables interaction while loading saved search data
- **Smart Navigation**: Routes users appropriately based on authorization and usage status

### Key Behaviors
- Extracts query content, title, filters, entities, and saved filter presets from current search
- Resets signal creation store before starting new signal creation
- Handles unauthorized users by redirecting to signals page
- Shows toast notification when signal limits are reached
- Preserves search context when transitioning to signal creation

## State Management

### Zustand Stores
- **`useCreateSignalStore`**: Resets signal creation state before starting new signal
- **`useUsageContext`**: Tracks remaining signal creation quota

### TanStack Query
- **`useSavedDeepSearchById`**: Fetches saved search data when on search pages with saved search ID

### Custom Hooks
- **`useRouteState`**: Manages navigation with state preservation for signal creation flow
- **`useSignalCreation`**: Provides signal limit checking and user feedback

## Side Effects

### API Interactions
- Fetches saved search data based on URL parameters
- Conditionally enabled query that only runs on search pages with valid saved search ID

### Navigation Effects
- Programmatic routing to `/signals` or `/signals/new`
- State preservation during navigation for seamless user experience

### User Feedback
- Toast notifications for usage limit violations
- Visual loading states during data fetching

## Dependencies

### UI Components
- `DropdownMenuItemBase`: Base dropdown menu item component
- `PiFlashlightLine`: Signal creation icon

### Contexts & Hooks
- `useAccessToken`: Authorization state management
- `useUsageContext`: Signal usage tracking
- `useSignalCreation`: Signal creation utilities
- `useRouteState`: Enhanced navigation with state

### Utilities
- `mapComplexAllEndpointQueryToFilters`: Converts query to filter format
- `mapArticleQueryToEntities`: Extracts entities from article queries
- `TABS_TO_HREF_BASE`: Tab routing configuration

## Integration

### Application Architecture
- **Navigation Layer**: Integrates into main layout navigation components
- **Search Flow**: Bridges search results to signal creation workflow
- **Permission System**: Respects user authorization and usage limits
- **State Flow**: Seamlessly transfers search context to signal creation

### Data Flow
```
Search Page → Saved Search Data → Extract Parameters → Signal Creation State → New Signal Page
```

## Best Practices

### Architectural Adherence
- ✅ **Client Component Usage**: Appropriately uses client component for interactive functionality
- ✅ **State Management**: Proper separation of server state (TanStack Query) and client state (Zustand)
- ✅ **Component Decomposition**: Single responsibility focused on signal creation action
- ✅ **Conditional Rendering**: Smart display logic based on context and permissions

### Performance Optimizations
- Conditional query enabling to avoid unnecessary API calls
- Memoized pathname checking for search page detection
- Optimized dependency arrays in useCallback

### User Experience
- Loading states prevent premature interactions
- Clear visual feedback for different user states
- Intelligent routing based on authorization status
- Preserved context during navigation transitions

### Error Handling
- Graceful handling of missing saved search data
- Appropriate fallbacks for unauthorized users
- Usage limit enforcement with user-friendly messaging