# History Component

## Purpose

The History component displays a chronological timeline of events for a story, including creation, publication, and update events. It provides users with a complete audit trail of how a story has evolved over time, organized by date with detailed timestamps and descriptions.

## Component Type

**Client Component** - Uses the `'use client'` directive (implied by hooks usage) because it:
- Manages complex local state with custom hooks
- Handles user interactions and dynamic data fetching
- Uses `useEffect` for side effects and automatic pagination
- Requires real-time updates and interactive timeline rendering

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `clusterId` | `string` | ✅ | Unique identifier for the story cluster |
| `createdAt` | `string` | ✅ | ISO date string when the story was created |
| `isAuthorizedAndVerified` | `boolean` | ✅ | Whether the user has proper authorization |
| `isPublic` | `boolean` | ✅ | Whether the story is publicly accessible |
| `token` | `AccessToken` | ❌ | Authentication token for private stories |

## Usage Example

```tsx
import { History } from '@/components/story/history-drawer/history';

export function StoryHistoryDrawer({ story, user }) {
  return (
    <div className="drawer-content">
      <History
        clusterId={story.id}
        createdAt={story.createdAt}
        isAuthorizedAndVerified={user?.isVerified ?? false}
        isPublic={story.isPublic}
        token={user?.accessToken}
      />
    </div>
  );
}

// Loading state handling
export function HistorySection({ storyId, isLoading }) {
  if (isLoading) {
    return <HistoryLoader />;
  }

  return (
    <ErrorBoundary fallback={<HistoryErrorFallback />}>
      <History
        clusterId={storyId}
        createdAt="2024-01-15T10:30:00Z"
        isAuthorizedAndVerified={true}
        isPublic={false}
      />
    </ErrorBoundary>
  );
}
```

## Functionality

### Core Features

- **Timeline Display**: Chronological view of story events grouped by date
- **Event Types**: Tracks story creation, first publication, and updates
- **Smart Date Labels**: Shows "Today", "Yesterday", or formatted dates
- **Automatic Pagination**: Loads all available changelog pages automatically
- **Loading States**: Skeleton loaders during data fetching
- **Error Handling**: Graceful fallback for failed data loads
- **Empty States**: User-friendly message when no history exists

### Event Types

- **Story Created**: Initial story creation timestamp
- **Article First Published**: When the first article was published (with source)
- **Updated**: Changelog entries with descriptions of changes

## State Management

### TanStack Query Integration

```tsx
// Custom hook combines multiple queries
const useHistory = (clusterId, createdAt, isAuthorizedAndVerified, isPublic, token) => {
  const { data: article } = useFirstArticleInStory(/* params */);
  const { data: changelogs, fetchNextPage } = useStoryHistory(/* params */);
  
  // Returns processed timeline data
  return { isFetching, history };
};
```

### Data Processing

- Groups events by date using `reduce()`
- Sorts timeline items chronologically (newest first)
- Processes ISO date strings with `date-fns`
- Combines multiple data sources into unified timeline

## Side Effects

### Automatic Data Loading

```tsx
useEffect(() => {
  if (!isChangelogsFetching && hasNextChangelogsPage) {
    fetchNextPage(); // Automatically loads all pages
  }
}, [isChangelogsFetching, hasNextChangelogsPage, fetchNextPage]);
```

### Date Processing

- Parses ISO date strings to Date objects
- Groups events by calendar date
- Formats display dates based on recency and year

## Dependencies

### Internal Dependencies

- `useFirstArticleInStory` - Fetches initial article data
- `useStoryHistory` - Fetches changelog data with pagination
- `Skeleton` - Loading state component
- `Typography` - Consistent text styling
- `PiErrorWarningFill` - Error state icon

### External Dependencies

- `date-fns` - Date parsing, formatting, and comparison utilities
- `@/lib/types` - TypeScript type definitions
- `@/lib/utils/cn` - CSS class name utility

## Integration

### Application Architecture

```
Story Detail View
├── Story Header
├── Story Content
└── History Drawer
    ├── History (this component)
    ├── HistoryLoader
    └── HistoryErrorFallback
```

### Data Flow

1. **Props Flow**: Parent passes story metadata and auth context
2. **Query Execution**: Parallel fetching of article and changelog data
3. **Data Processing**: Combines and groups timeline events
4. **UI Rendering**: Displays chronological timeline with proper formatting

## Best Practices

### Architecture Adherence

✅ **Proper State Management**: Uses TanStack Query for server state, avoiding local state for remote data

✅ **Component Decomposition**: Separates concerns with dedicated loader and error components

✅ **Reusable Patterns**: Exports utility hook (`useHistory`) for potential reuse

✅ **Error Boundaries**: Provides proper error fallback component

### Performance Optimizations

✅ **Memoization**: Uses `useMemo()` for expensive timeline processing

✅ **Automatic Pagination**: Efficiently loads all data without user interaction

✅ **Conditional Rendering**: Proper loading and empty states

### Accessibility

✅ **Screen Reader Support**: Includes `sr-only` loading announcements

✅ **Semantic HTML**: Uses appropriate heading and list structures

✅ **Keyboard Navigation**: Timeline is keyboard accessible through proper DOM structure

### Type Safety

✅ **Strong Typing**: All props and internal types properly defined

✅ **Enum Usage**: Uses TypeScript enums for history item types

✅ **Null Safety**: Handles optional data gracefully