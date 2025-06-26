# Summarize Component

## Purpose

The `Summarize` component displays an AI-generated summary of search results with citations and source attribution. It provides a condensed overview of articles returned from search queries, helping users quickly understand key information without reading through individual results. The component includes a loading fallback state and responsive behavior for different screen sizes.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive state with animations using Framer Motion
- Handles responsive text truncation behavior
- Requires dynamic DOM manipulation for loading states

## Props Interface

### Summarize Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `articleQuery` | `AllEndpointParams` | Yes | Query parameters used to fetch article data and generate summary |
| `className` | `string` | No | Additional CSS classes for styling customization |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | No | Standard HTML div attributes |

### SummarizeFallback Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `active` | `boolean` | Yes | Controls visibility of the loading skeleton |
| `className` | `string` | No | Additional CSS classes for styling customization |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | No | Standard HTML div attributes |

## Usage Example

```tsx
import { Summarize } from '@/components/search/summarize';

export default function SearchResultsPage() {
  const searchQuery = {
    query: "climate change renewable energy",
    limit: 10,
    offset: 0
  };

  return (
    <div className="search-results">
      <Summarize 
        articleQuery={searchQuery}
        className="mb-6"
      />
      {/* Other search result components */}
    </div>
  );
}

// Using the fallback component independently
import { SummarizeFallback } from '@/components/search/summarize';

<SummarizeFallback 
  active={isLoading}
  className="custom-loading-styles"
/>
```

## Functionality

### Core Features
- **AI-Generated Summaries**: Displays AI-powered summaries of search results with clear AI tagging
- **Citation Integration**: Shows citation bubbles linking summary content to source articles
- **Responsive Text Display**: Truncates text on mobile (6 lines max) while showing full content on desktop
- **Loading States**: Smooth transitions between loading and loaded states with skeleton placeholders
- **Source Attribution**: Processes and displays unique sources based on domain analysis

### Interactive Behaviors
- **Smooth Animations**: Uses Framer Motion for fluid loading state transitions
- **Responsive Breakpoints**: Different layouts and text handling for mobile vs desktop
- **Dynamic Height**: Container height adjusts based on content and loading state

## State Management

### TanStack Query Integration
- **`useSummarize(articleQuery)`**: Fetches AI-generated summary data
- **`useSources(sourcesParams)`**: Retrieves source information for citations
- **Stale-While-Revalidate**: Implements SWR pattern for optimal UX during refetching

### Computed State
- **Citation Processing**: Uses `buildCitationBubbles()` to generate citation components
- **Domain Filtering**: Applies `domainUniquenessByTwoTopLevels()` for source deduplication
- **Loading Coordination**: Combines multiple loading states for cohesive UX

## Side Effects

### Data Fetching
- Fetches summary data based on article query parameters
- Dynamically loads source information when summary data becomes available
- Implements conditional fetching to prevent unnecessary API calls

### DOM Interactions
- Manages overflow states during loading transitions
- Controls opacity and height animations for smooth state changes

## Dependencies

### UI Components
- `AiTag` - Identifies AI-generated content
- `CitationBubbleListBase`, `buildCitationBubbles` - Citation display system
- `Skeleton` - Loading state placeholders
- `TruncatedText` - Responsive text truncation
- `Typography` - Consistent text styling

### Hooks & Services
- `useSummarize` - Summary data fetching
- `useSources` - Source information retrieval
- Query hooks follow TanStack Query patterns

### Utilities
- `cn` - Conditional class name composition
- `domainUniquenessByTwoTopLevels` - Source deduplication logic

## Integration

### Search Architecture
- **Search Results Flow**: Integrates with broader search result display system
- **Query Parameter Sharing**: Reuses search parameters across components for consistency
- **Source Management**: Coordinates with citation and source tracking systems

### State Coordination
- **Loading State Synchronization**: Coordinates multiple async operations for unified UX
- **Error Boundary Compatible**: Designed to work within error handling infrastructure

## Best Practices

### Architecture Adherence
- ✅ **Client Component Justification**: Only uses client-side rendering for interactive features
- ✅ **Flat Component Structure**: Avoids deep nesting, uses composition patterns
- ✅ **TanStack Query Integration**: Properly implements server state management
- ✅ **Separation of Concerns**: Loading fallback extracted as separate component

### Performance Optimization
- **Conditional Rendering**: Only renders citations when data is available
- **Memoized Computations**: Uses `useMemo` for expensive operations
- **Efficient Re-renders**: Minimizes unnecessary updates through proper dependency arrays

### User Experience
- **Progressive Loading**: Shows skeleton states while maintaining layout stability
- **Responsive Design**: Adapts content presentation across device sizes
- **Accessibility**: Maintains semantic HTML structure and proper heading hierarchy

### Code Quality
- **TypeScript Integration**: Full type safety with proper interface definitions
- **Reusable Fallback**: Loading state component can be used independently
- **Consistent Styling**: Follows established design system patterns