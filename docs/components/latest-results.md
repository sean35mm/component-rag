# LatestResults Component

## Purpose

The `LatestResults` component displays the latest articles and stories related to a signal in a responsive tabbed interface. It provides users with the ability to browse articles and stories, preview content, and navigate between different content types with desktop preview panes and mobile drawer interfaces.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Interactive state management for selections and drawer controls
- Event handlers for user interactions
- Responsive behavior based on breakpoints
- Side effects for body overflow management during loading states

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `signal` | `Signal \| undefined` | No | `undefined` | Signal object used to fetch related articles and stories |

## Usage Example

```tsx
import { LatestResults } from '@/components/signals/details/latest-results';
import { Signal } from '@/lib/types';

function SignalDetailsPage() {
  const signal: Signal = {
    id: 'signal-123',
    name: 'Market Trends',
    // ... other signal properties
  };

  return (
    <div className="container mx-auto">
      <LatestResults signal={signal} />
    </div>
  );
}

// Usage without signal (will show empty state)
function EmptyState() {
  return <LatestResults />;
}
```

## Functionality

### Core Features
- **Tabbed Interface**: Switches between "Articles" and "Stories" views
- **Responsive Design**: Different layouts and interactions for desktop and mobile
- **Content Preview**: Desktop shows side-by-side preview, mobile uses drawer overlays
- **Loading States**: Skeleton loading with body overflow management
- **Empty States**: NoMatches component when no content is available
- **Badge Counters**: Shows story count in the Stories tab

### User Interactions
- **Article Selection**: Click to preview articles in desktop panel or mobile drawer
- **Story Selection**: Similar preview functionality for story content
- **Tab Navigation**: Switch between Articles and Stories tabs
- **Mobile Drawers**: Touch-friendly overlay previews on mobile devices

## State Management

### Local State (useState)
- `selectedIndex`: Currently selected article index for preview
- `selectedStoryIndex`: Currently selected story index for preview
- `isMobileDrawerOpen`: Controls mobile article drawer visibility
- `isStoryDrawerOpen`: Controls mobile story drawer visibility

### TanStack Query
- `useArticles`: Fetches articles based on signal parameters
- `useStoriesWithPageInfoAndSelectedArticles`: Fetches stories for article cluster IDs

### Computed State
- `clusterIds`: Derived from articles using useMemo for performance
- `isLoading`: Combined loading state from both queries

## Side Effects

### Data Fetching
- Articles fetched based on signal query parameters
- Stories fetched based on cluster IDs from articles
- Automatic re-fetching when signal changes

### DOM Manipulation
```tsx
useEffect(() => {
  if (isLoading) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  return () => {
    document.body.style.overflow = 'auto';
  };
}, [isLoading]);
```

## Dependencies

### Custom Hooks
- `useBreakpoint`: Responsive behavior detection
- `useSignalArticlesIntervalData`: Signal-specific query parameters
- `useArticles`: Article data fetching
- `useStoriesWithPageInfoAndSelectedArticles`: Story data fetching

### UI Components
- `Tabs`, `TabsContent`, `TabsList`, `TabsTrigger`: Tab navigation
- `ArticlePreviewCard`, `ArticleMobileCard`: Article display components
- `StoryPreviewCard`, `StoryPreviewCardSmall`: Story display components
- `PreviewBlockArticles`, `PreviewBlockStories`: Content preview panels
- `PreviewBlockArticlesDrawer`, `StoryDrawer`: Mobile overlay components
- `Typography`: Text styling component

### Supporting Components
- `LatestResultsSkeleton`: Loading state component
- `NoMatches`: Empty state component

## Integration

### Application Architecture
- **Domain**: Part of the signals feature domain
- **Location**: `/signals/details/` - specifically for signal detail pages
- **Data Flow**: Receives signal prop from parent, fetches related content
- **Responsive Strategy**: Conditional rendering based on breakpoint detection

### Query Integration
```tsx
const { params: articleQueryParams } = useSignalArticlesIntervalData(signal, {
  onlyParams: true,
});

const { data: articles = [], isLoading: isArticlesLoading } = useArticles(
  articleQueryParams,
  { select: (res) => res.articles }
);
```

## Best Practices

### Architecture Adherence
✅ **Client Component Usage**: Appropriate use of `'use client'` for interactive functionality  
✅ **State Management**: TanStack Query for server state, local useState for UI state  
✅ **Component Decomposition**: Leverages multiple UI components in flat structure  
✅ **Responsive Design**: Conditional rendering based on breakpoints  
✅ **Performance**: useMemo for expensive computations (clusterIds)  

### Code Quality
✅ **Type Safety**: Proper TypeScript interfaces and optional chaining  
✅ **Error Handling**: Graceful fallbacks with empty states  
✅ **Accessibility**: Semantic HTML structure with proper tab navigation  
✅ **Side Effect Management**: Proper cleanup in useEffect  

### Exported Constants
```tsx
export const badgeStyle = 'ml-2 min-w-5 flex items-center justify-center h-5 flex items-center transition-colors border border-transparent rounded-lg bg-alphaNeutral/16 px-1 group-data-[state=active]:bg-pgBackground-100 group-data-[state=active]:border-pgStroke-250 group-data-[state=active]:dark:border-alphaNeutral/6';
```
The `badgeStyle` constant is exported for reuse in other components requiring similar badge styling.