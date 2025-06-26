# ArticlesList Component

## Purpose

The `ArticlesList` component displays a paginated, searchable list of articles with infinite scrolling functionality. It serves as the primary content display component within the signals creation flow, allowing users to preview and interact with articles that match their search criteria and filters.

## Component Type

**Client Component** - Uses `'use client'` directive because it requires:
- State management with Zustand stores
- Browser APIs (Intersection Observer)
- Event handlers and interactive features
- Real-time data fetching with TanStack Query

## Props Interface

This component accepts no props - it's a standalone feature component that manages its own state through global stores.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| None | - | - | Component uses global state management |

## Usage Example

```tsx
import { ArticlesList } from '@/components/signals/creation/articles-preview/articles-list';

// Basic usage within a signals creation flow
function ArticlesPreview() {
  return (
    <div className="articles-preview">
      <div className="articles-preview__header">
        <h2>Matching Articles</h2>
      </div>
      <div className="articles-preview__content">
        <ArticlesList />
      </div>
    </div>
  );
}

// Usage with filters sidebar
function SignalsCreationPage() {
  return (
    <div className="signals-creation">
      <aside className="filters-sidebar">
        <FiltersDrawer />
      </aside>
      <main className="content">
        <ArticlesList />
      </main>
    </div>
  );
}
```

## Functionality

### Core Features
- **Infinite Scrolling**: Automatically loads more articles when user scrolls to bottom
- **Article Preview**: Displays article cards with preview information
- **External Links**: Articles open in new tabs when clicked
- **Loading States**: Shows loading indicators during data fetching
- **Empty States**: Displays appropriate message when no articles found
- **Responsive Design**: Adapts to different screen sizes

### Key Behaviors
- Fetches articles in batches of 25 (`BATCH_SIZE`)
- Uses intersection observer to trigger pagination
- Flattens paginated results into single articles array
- Prevents unnecessary API calls during loading states

## State Management

### Zustand Stores
- **`useCreateSignalStore`**: Manages signal creation state
  - `enhancedQuery`: Search query string
  - `entities`: Selected entities for filtering
  - `queryTitle`: Display title for the query
- **`useFiltersDrawerStore`**: Manages filter state
  - `filters`: Active filter criteria

### TanStack Query
- **`useArticlesInfinite`**: Handles infinite pagination of articles
  - Caches paginated results
  - Provides loading states and error handling
  - Manages `fetchNextPage` functionality

## Side Effects

### API Interactions
- Fetches articles based on search parameters and filters
- Automatically triggers additional requests on scroll
- Caches results for performance optimization

### Browser APIs
- **Intersection Observer**: Monitors scroll position for infinite loading
- **External Navigation**: Opens article links in new browser tabs

### Performance Optimizations
- Memoizes search parameters to prevent unnecessary re-renders
- Uses callback memoization for data selection
- Implements threshold-based intersection detection

## Dependencies

### UI Components
- `ArticlePreviewCardSmall`: Individual article display cards
- `Typography`: Consistent text styling
- `PiLoader5Line`: Loading spinner icon

### Hooks and Utilities
- `useIntersectionObserver`: Scroll detection for infinite loading
- `useArticlesInfinite`: Data fetching and pagination
- `getSignalIntervalArticleCountsParams`: Parameter construction utility

### External Libraries
- `@tanstack/react-query`: Data fetching and caching
- `next/link`: Client-side navigation
- `@react-hook/intersection-observer`: Scroll detection

## Integration

### Application Architecture
```
Signals Creation Flow
├── FiltersDrawer (filter management)
├── ArticlesPreview
│   └── ArticlesList (content display)
└── SignalConfiguration (result processing)
```

### Data Flow
1. User configures search query and filters
2. Component derives search parameters from global state
3. Infinite query fetches paginated articles
4. Intersection observer triggers additional page loads
5. Articles render as clickable preview cards

### Store Integration
- Consumes search state from `useCreateSignalStore`
- Reacts to filter changes from `useFiltersDrawerStore`
- Automatically updates when upstream state changes

## Best Practices

### Architecture Adherence
- ✅ **Feature Component**: Domain-specific, located in signals creation flow
- ✅ **State Management**: Uses TanStack Query for server state, Zustand for client state
- ✅ **Component Decomposition**: Flat structure with reusable UI components
- ✅ **Performance**: Implements memoization and optimized re-rendering

### Code Quality
- ✅ **Single Responsibility**: Focused solely on article list display
- ✅ **Separation of Concerns**: UI logic separate from data fetching
- ✅ **Accessibility**: Includes screen reader support for loading states
- ✅ **Error Handling**: Graceful handling of empty states and loading errors

### Integration Patterns
- ✅ **Global State**: Leverages centralized state management
- ✅ **Query Optimization**: Efficient parameter memoization
- ✅ **User Experience**: Smooth infinite scrolling with appropriate feedback

## Exports

```tsx
export const BATCH_SIZE = 25; // Pagination batch size constant
export function ArticlesList(); // Main component
```