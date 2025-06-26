# cited-sources-drawer Component Documentation

## Purpose

The `CitedSourcesDrawer` is a comprehensive sheet component that displays sources cited in a story. It provides users with an interactive interface to view article sources, read snippets, and access the original articles. The component includes loading states, fallbacks for unauthorized users, and analytics tracking for article interactions.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Interactive state management (drawer open/closed, snippet expansion)
- Event handlers for user interactions
- Browser-only features (clipboard access, external navigation)
- Real-time analytics tracking

## Props Interface

### CitedSourcesDrawer Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `articlesCount` | `number` | Optional | Total count of articles for display purposes |
| `story` | `StoryWithPageInfo` | Required | Story object containing page information for analytics |

### SourceItem Props (Internal)

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `articleId` | `string` | Required | Unique identifier for the article |
| `now` | `Date` | Required | Current date for relative time formatting |
| `story` | `StoryWithPageInfo` | Required | Story context for analytics tracking |

## Usage Example

```tsx
import { CitedSourcesDrawer } from '@/components/story/cited-sources-drawer';

export function StoryPage() {
  const story = useStory();
  
  return (
    <div>
      {/* Story content */}
      <div className="story-content">
        {/* Story text with citation triggers */}
      </div>
      
      {/* Cited Sources Drawer */}
      <CitedSourcesDrawer 
        story={story}
        articlesCount={story.totalArticles}
      />
    </div>
  );
}
```

## Functionality

### Core Features

1. **Source Display**: Shows cited articles with thumbnails, titles, publication dates, and source information
2. **Snippet View**: Displays expandable text snippets with copy functionality
3. **Article Navigation**: Provides direct links to source articles with analytics tracking
4. **Loading States**: Implements skeleton loaders for better UX during data fetching
5. **Access Control**: Shows fallbacks for unauthorized users while maintaining UI consistency
6. **Responsive Design**: Adapts to different screen sizes with appropriate sheet widths

### Interactive Elements

- **Expandable Snippets**: Users can expand/collapse lengthy text snippets
- **Copy Functionality**: One-click copying of snippet text to clipboard
- **External Navigation**: Opens source articles in new tabs with proper security attributes
- **Sheet Controls**: Smooth open/close animations with backdrop interaction

## State Management

### Context State (Zustand)
- **`useStoryCitedSourcesDrawer`**: Manages drawer visibility, article IDs, and snippet content
- **`useAccessToken`**: Handles user authentication and authorization state

### Server State (TanStack Query)
- **`useArticleByIdSuspense`**: Fetches individual article data with Suspense integration
- Implements proper caching and error handling for article requests

### Local State
- **`isSnippetExpanded`**: Controls snippet expansion state, resets on drawer open

## Side Effects

### Analytics Tracking
```tsx
const handleViewArticleClick = useCallback(() => {
  StoryPageTracker.articleViewed(story, {
    source: ArticleViewedEventSource.CITED_SOURCES_DRAWER,
    article_id: article.articleId,
    url: article.url,
    title: article.title,
  });
}, [article, story]);
```

### External Navigation
- Opens articles in new tabs with `target='_blank'` and security attributes
- Tracks user engagement with source materials

## Dependencies

### UI Components
- `Sheet`, `SheetContent`, `SheetHeader`, etc. - Sheet/drawer functionality
- `Button`, `CopyButton` - Interactive elements
- `Typography`, `Skeleton` - Content display and loading states
- `ArticleImageWithFallback` - Image handling with fallbacks

### Business Logic
- `useStoryCitedSourcesDrawer` - Drawer state management
- `useAccessToken` - Authentication context
- `useArticleByIdSuspense` - Article data fetching
- `StoryPageTracker` - Analytics integration

### Utilities
- `pluralize` - Dynamic text pluralization
- `formatCustomDistanceToNow` - Relative date formatting

## Integration

### Story Context Integration
The component integrates seamlessly with the story reading experience:
- Triggered by citation interactions within story content
- Maintains story context for analytics and user journey tracking
- Provides additional context without disrupting reading flow

### Authentication Flow
- Gracefully handles unauthenticated users with consistent fallback UI
- Respects access controls while maintaining visual consistency
- Supports both authenticated and public content access patterns

## Best Practices

### Architecture Adherence

✅ **Client Component Usage**: Appropriately uses client-side rendering for interactive features

✅ **Component Decomposition**: Well-structured with focused sub-components:
- `SourceItemFallback` - Loading state
- `SourceItemSuspense` - Data-fetched state  
- `SourceItem` - Authorization wrapper
- `CitedSourcesDrawer` - Main orchestrator

✅ **State Management**: 
- Uses Zustand for global drawer state
- TanStack Query for server data with Suspense
- Local state only for UI-specific concerns

✅ **Error Boundaries**: Implements Suspense with fallbacks for graceful error handling

✅ **Accessibility**: Proper ARIA attributes, keyboard navigation, and semantic HTML structure

### Performance Optimizations
- Suspense-based loading for progressive enhancement
- Skeleton UI prevents layout shifts
- Memoized callbacks prevent unnecessary re-renders
- Efficient re-rendering through proper dependency arrays