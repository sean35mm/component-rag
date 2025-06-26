# StoriesSearch Component

## Purpose

The `StoriesSearch` component provides a searchable interface for finding and selecting stories within the omnibar. It renders a filtered list of stories based on the current search query, displays them in a selector menu with previews, and handles story selection and navigation prefetching for optimal user experience.

## Component Type

**Client Component** - Uses the `'use client'` directive (implied through hooks usage) because it:
- Manages interactive search state through Zustand store
- Handles user interactions (story selection, keyboard navigation)
- Performs side effects like router prefetching
- Renders dynamic content based on search queries

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onStorySelect` | `(item: SelectorMenuItem) => void` | Yes | Callback function executed when a story is selected from the search results |

## Usage Example

```tsx
import { StoriesSearch } from '@/components/omnibar/stories-search/stories-search';

function Omnibar() {
  const handleStorySelect = (selectedStory) => {
    // Handle story selection logic
    console.log('Selected story:', selectedStory);
    // Navigate to story or perform other actions
  };

  return (
    <div className="omnibar">
      <StoriesSearch onStorySelect={handleStorySelect} />
    </div>
  );
}
```

## Functionality

- **Dynamic Search**: Renders only when there's an active search query from the omnibar store
- **Real-time Filtering**: Displays stories filtered by relevance based on the search query
- **Interactive Selection**: Supports both click and keyboard navigation for story selection
- **Story Previews**: Shows detailed story information through the `StoryPreview` component
- **Performance Optimization**: Prefetches story routes for faster navigation
- **Loading States**: Displays appropriate loading indicators and result counts
- **Empty States**: Shows "No Stories Found" when search yields no results

## State Management

- **Zustand Store**: Uses `useOmnibarStore` for:
  - `storiesSearchQuery`: Current search query string
  - `setSelectedStoryMenuItem`: Updates selected item for keyboard navigation
- **TanStack Query**: Uses `useStoriesListWithPageInfo` for:
  - Fetching filtered stories based on search criteria
  - Caching and managing server state
  - Handling loading states and error conditions

## Side Effects

- **Route Prefetching**: Automatically prefetches story routes when search results are loaded to improve navigation performance
- **Query Execution**: Conditionally triggers API calls based on search query presence
- **Navigation**: Integrates with Next.js router for story navigation

## Dependencies

### Components
- `CitationItem`: Displays story avatars/images
- `Typography`: Consistent text styling
- `SelectorMenu`: Base menu component for item selection
- `WorkflowSection`: Section wrapper with title
- `StoryPreview`: Story detail preview component

### Hooks & Utilities
- `useOmnibarStore`: Zustand store for omnibar state
- `useStoriesListWithPageInfo`: TanStack Query hook for stories data
- `getStoryHref`: Utility for generating story URLs
- `useRouter`: Next.js navigation hook

### Styling
- `listItemContent`: Shared styling utility for list items

## Integration

The `StoriesSearch` component integrates into the omnibar workflow system:

- **Parent Integration**: Embedded within the main omnibar interface
- **Search Flow**: Responds to global search state changes
- **Selection Flow**: Communicates selections back to parent through callback
- **Navigation Flow**: Coordinates with routing system for story navigation
- **Preview System**: Works with story preview components for rich interactions

## Best Practices

✅ **State Management**: Properly separates server state (stories data) from client state (UI interactions)

✅ **Component Decomposition**: Maintains flat structure by composing smaller, focused components

✅ **Performance**: Implements prefetching and memoization for optimal user experience

✅ **Conditional Rendering**: Returns `null` when inactive, following React best practices

✅ **Error Handling**: Gracefully handles empty states and loading conditions

✅ **Accessibility**: Supports keyboard navigation through the selector menu

✅ **Reusability**: Uses shared UI components and follows consistent patterns

✅ **Clean Dependencies**: Proper separation of concerns with clear prop interfaces

The component exemplifies our architecture by combining server-side data fetching with client-side interactions while maintaining clean separation of concerns and optimal performance characteristics.