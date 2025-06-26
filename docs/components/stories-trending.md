# StoriesTrending Component

## Purpose

The `StoriesTrending` component displays a list of trending news stories within the omnibar search interface. It fetches and presents the top stories from the last 24 hours based on total count and cluster size, allowing users to select trending stories for further interaction. The component provides an interactive menu with story previews and handles story selection workflow.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Interactive event handlers (`onSelect`, `onStorySelect`)
- Browser-specific hooks (`useRouter` from Next.js navigation)
- Client-side state management (Zustand store)
- Real-time user interactions with the selector menu

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onStorySelect` | `(item: SelectorMenuItem) => void` | Yes | Callback function triggered when a user selects a story from the trending list |

## Usage Example

```tsx
import { StoriesTrending } from '@/components/omnibar/stories-search/stories-trending';
import type { SelectorMenuItem } from '@/components/omnibar/selector-menu/selector-menu';

function StoriesSearchPanel() {
  const handleStorySelection = (item: SelectorMenuItem) => {
    // Handle the selected story
    console.log('Selected story:', item.name);
    // Navigate to story or perform other actions
  };

  return (
    <div className="search-panel">
      <StoriesTrending onStorySelect={handleStorySelection} />
    </div>
  );
}
```

## Functionality

- **Trending Stories Display**: Shows top 100 trending stories from the last 24 hours
- **Interactive Selection**: Provides keyboard and mouse navigation through story list
- **Story Previews**: Renders detailed previews when stories are highlighted
- **Route Prefetching**: Preloads story routes for improved navigation performance
- **Loading States**: Handles loading states during data fetching
- **Multi-country Support**: Fetches stories from multiple countries (US, GB, CA, AU, ES, FR, DE, KR, NZ, CN)

## State Management

### TanStack Query
- **`useStoriesListWithPageInfo`**: Fetches trending stories with specific filtering criteria
  - Minimum cluster size: 20
  - Sort by total count
  - Time range: Last 24 hours
  - Result transformation to extract only the results array

### Zustand Store
- **`useOmnibarStore`**: Manages omnibar-specific state
  - `setSelectedStoryMenuItem`: Updates the currently selected story item for keyboard navigation

### Local State
- **`isStoriesPrefetchedRef`**: Ref to track whether story routes have been prefetched to avoid duplicate prefetch calls

## Side Effects

1. **Route Prefetching**: Automatically prefetches story routes when data loads to improve navigation performance
2. **API Calls**: Fetches trending stories from the stories API with specific filtering parameters
3. **Navigation**: Integrates with Next.js router for route prefetching

## Dependencies

### Components
- `CitationItem`: Displays story thumbnails and icons
- `Typography`: Provides consistent text styling
- `SelectorMenu` & `SelectorMenuItem`: Core menu functionality and item types
- `WorkflowSection`: Wraps the component in a titled section
- `StoryPreview`: Renders detailed story previews

### Hooks & Services
- `useStoriesListWithPageInfo`: Custom hook for fetching stories data
- `useOmnibarStore`: Zustand store for omnibar state management
- `useRouter`: Next.js navigation hook
- `getStoryHref`: Utility for generating story URLs

### External Libraries
- `date-fns`: Date manipulation for time range filtering

## Integration

The `StoriesTrending` component integrates into the omnibar search workflow as a specialized section for discovering popular content. It works within the larger omnibar ecosystem:

- **Parent Context**: Used within stories search panels in the omnibar
- **Selection Flow**: Communicates selected stories back to parent components via callback
- **Navigation Integration**: Coordinates with the application's routing system
- **State Coordination**: Shares selection state with other omnibar components

## Best Practices

✅ **Adheres to Architecture Guidelines**:
- **Proper Client Component Usage**: Uses client-side features appropriately
- **Effective State Management**: Combines TanStack Query for server state with Zustand for UI state
- **Component Decomposition**: Leverages reusable UI components and specialized preview components
- **Performance Optimization**: Implements route prefetching and data transformation
- **Separation of Concerns**: Delegates rendering logic to specialized child components

✅ **Performance Optimizations**:
- Uses `useMemo` for expensive selector item transformations
- Implements `useCallback` for stable event handlers
- Prefetches routes only once using ref-based tracking
- Transforms API data to reduce memory footprint

✅ **User Experience**:
- Provides loading states during data fetching
- Supports both keyboard and mouse navigation
- Offers rich story previews for better selection context