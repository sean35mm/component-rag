# TrendingStories Component

## Purpose

The `TrendingStories` component displays a curated view of trending news stories worldwide. It features a prominent grid of top stories at the top, followed by a paginated table of all trending stories. The component provides both desktop and mobile-optimized layouts with interactive story cards and detailed story viewing through a drawer interface.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Interactive state management (pagination, sorting, row selection)
- Browser APIs (scrolling, navigation)
- Event handlers for user interactions
- Real-time UI updates based on user actions

## Props Interface

This component accepts no props - it's a self-contained feature component.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| None | - | - | This component doesn't accept any props |

## Usage Example

```tsx
import { TrendingStories } from '@/components/trending/trending-stories';

export default function TrendingPage() {
  return (
    <div className="container mx-auto">
      <h1>Trending Stories</h1>
      <TrendingStories />
    </div>
  );
}
```

## Functionality

### Core Features

- **Top Stories Grid**: Displays 4 most trending stories in a responsive grid layout
- **Paginated Stories Table**: Shows comprehensive list of trending stories with sorting and pagination
- **Interactive Story Cards**: Click-to-navigate or expand story details
- **Responsive Design**: Adapts layout for mobile and desktop viewing
- **Story Drawer**: Modal overlay for detailed story viewing
- **Analytics Integration**: Tracks user interactions for analytics

### Key Behaviors

- **Automatic Data Fetching**: Fetches trending stories from the last 24 hours
- **Smart Pagination**: Maintains scroll position when navigating pages
- **Sorting Support**: Allows sorting by various story metrics
- **Progressive Loading**: Shows fallback components while data loads
- **No Results Handling**: Displays appropriate message when no stories found

## State Management

### Local State (useState)
- `rowSelection`: Manages table row selection state
- `page`: Current pagination page
- `sorting`: Table sorting configuration

### Global State (Zustand)
- `useEntityDetailDrawerStore`: Manages story drawer visibility and content

### Server State (TanStack Query)
- `useStoriesWithPageInfoAndSelectedArticles`: Fetches paginated trending stories
- Secondary query for top 4 stories displayed in the grid

## Side Effects

### API Calls
- Fetches trending stories with country filtering and pagination
- Separate query for top stories grid data
- Real-time updates based on user interactions

### Navigation
- Programmatic navigation to story detail pages
- Smooth scrolling to table on page changes

### Analytics
- Tracks story card clicks and expansions
- Monitors pagination interactions
- Records story engagement metrics

## Dependencies

### UI Components
- `StoryPreviewCardLarge/Small`: Story card display components
- `StoryPreviewCardMobile`: Mobile-optimized story cards
- `ResultsTable`: Paginated table component
- `NoResults`: Empty state component

### Hooks & Utilities
- `useStoriesAllResultsTable`: Table configuration hook
- `useTabContainer`: Container scroll management
- `getStoryHref`: Story URL generation utility
- `mapSortingToStoriesSorting`: Sorting translation utility

### External Services
- `TrendingPageTracker`: Analytics event tracking
- Date utilities for time-based filtering

## Integration

### Application Architecture
- Integrates with global drawer state management
- Connects to centralized analytics tracking system
- Uses shared table and card components for consistency
- Leverages application-wide query caching strategies

### Data Flow
1. Component mounts and initiates data fetching
2. Displays loading states while queries resolve
3. Renders top stories grid and paginated table
4. Handles user interactions with state updates
5. Manages drawer state for detailed story viewing

## Best Practices

### Architecture Adherence
- ✅ **Client Component Usage**: Appropriate use of 'use client' for interactive features
- ✅ **Component Decomposition**: Leverages reusable UI components (cards, tables)
- ✅ **State Management**: Proper separation of local, global, and server state
- ✅ **Query Management**: Efficient use of TanStack Query with proper selectors

### Performance Optimizations
- Memoized callback functions to prevent unnecessary re-renders
- Separate queries for different data needs (top stories vs. paginated stories)
- Progressive loading with fallback components
- Efficient pagination with scroll position management

### Code Organization
- Clear separation of concerns between data fetching and presentation
- Reusable helper functions (renderMobileTableCardBuilder)
- Consistent styling patterns with shared constants
- Proper error handling with no-results states

### Integration Patterns
- Follows established patterns for table components
- Consistent analytics tracking across interactions
- Proper drawer state management integration
- Responsive design patterns matching application standards