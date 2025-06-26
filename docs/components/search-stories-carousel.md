# SearchStoriesCarousel

## Purpose

The `SearchStoriesCarousel` component displays a horizontal carousel of story preview cards with navigation controls and responsive design. It serves as an interactive browsing interface for search results, allowing users to scroll through stories and visually identify an active/selected story.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages local state for carousel API and responsive behavior
- Handles user interactions (carousel navigation)
- Uses browser-specific hooks (`useBreakpoint`)
- Implements DOM event handling and effects

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `stories` | `StoryWithPageInfoAndSelectedArticles[]` | Yes | Array of story objects to display in the carousel |
| `isLoading` | `boolean` | No | Controls loading state display with fallback cards |
| `activeStory` | `StoryWithPageInfoAndSelectedArticles \| null` | No | Currently selected story that will be highlighted and scrolled to |
| `className` | `string` | No | Additional CSS classes for styling customization |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | No | Standard HTML div attributes passed through |

## Usage Example

```tsx
import { SearchStoriesCarousel } from '@/components/search/search-stories-carousel';

function SearchResultsPage() {
  const { data: stories, isLoading } = useQuery({
    queryKey: ['search-stories', searchTerm],
    queryFn: () => searchStories(searchTerm)
  });

  const [selectedStory, setSelectedStory] = useState(null);

  return (
    <div className="space-y-6">
      <SearchStoriesCarousel
        stories={stories || []}
        isLoading={isLoading}
        activeStory={selectedStory}
        className="mb-8"
      />
      
      {/* Other search result components */}
    </div>
  );
}
```

## Functionality

- **Responsive Card Display**: Shows `StoryPreviewCardMd` on mobile and `StoryPreviewCardSmall` on desktop
- **Navigation Controls**: Provides previous/next buttons on desktop with disabled state handling
- **Active Story Highlighting**: Visually highlights the currently selected story
- **Auto-scroll to Active**: Automatically scrolls to show the active story when it changes
- **Loading States**: Displays skeleton fallback cards during data loading
- **Touch/Swipe Support**: Enables touch navigation on mobile devices
- **Overflow Handling**: Different overflow behaviors for mobile vs desktop

## State Management

**Local State**:
- `api`: CarouselApi instance for programmatic control
- `isMobile`: Responsive breakpoint state via `useBreakpoint` hook

The component expects story data to be managed externally (typically via TanStack Query) and passed as props.

## Side Effects

- **Carousel Scrolling**: `useEffect` monitors `activeStory` changes and programmatically scrolls to the corresponding story
- **Breakpoint Detection**: Uses `useBreakpoint` hook to determine responsive behavior

## Dependencies

**UI Components**:
- `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselNext`, `CarouselPrevious`
- `StoryPreviewCardMd`, `StoryPreviewCardMdFallback`
- `StoryPreviewCardSmall`, `StoryPreviewCardSmallFallback`

**Hooks**:
- `useBreakpoint` - Responsive design detection

**Utilities**:
- `getStoryHref` - Story URL generation
- `cn` - CSS class name merging

**External**:
- `NextLink` - Client-side navigation

## Integration

This component fits into the search feature domain as a visual browser for search results. It integrates with:

- **Search Pages**: Primary display component for story search results
- **Story Navigation**: Works with story detail views through active story highlighting
- **Responsive Layout**: Adapts to different screen sizes and touch interfaces
- **Routing**: Each story card links to individual story pages via Next.js routing

## Best Practices

✅ **Proper Client Component Usage**: Uses `'use client'` appropriately for interactive features

✅ **Component Decomposition**: Leverages smaller UI components (`StoryPreviewCard*`) for clean composition

✅ **Responsive Design**: Implements mobile-first responsive behavior with breakpoint detection

✅ **Loading States**: Provides proper loading fallbacks for better UX

✅ **Accessibility**: Maintains semantic HTML structure and keyboard navigation support

✅ **Performance**: Uses `useCallback` for stable function references and `prefetch` for Next.js links

✅ **State Externalization**: Keeps data fetching concerns external while managing only UI-specific state internally

The component follows our architecture by being a focused, reusable piece that composes well with other components while handling its specific carousel interaction responsibilities.