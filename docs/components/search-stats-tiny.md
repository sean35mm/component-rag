# SearchStatsTiny Component

## Purpose

`SearchStatsTiny` is a compact statistics display component that shows article and story counts in a condensed format. It's designed for space-constrained areas like headers, sidebars, or inline displays where search result metrics need to be presented efficiently.

## Component Type

**Client Component** - Uses the `'use client'` directive because it needs to handle loading states and potentially interactive behaviors in the browser environment. While the current implementation doesn't use hooks directly, it's positioned as a client component for future interactivity and consistent rendering behavior.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | `undefined` | Additional CSS classes for custom styling |
| `isLoading` | `boolean` | No | `false` | Shows skeleton loading state when true |
| `articlesCount` | `number` | Yes | - | Number of articles to display |
| `storiesCount` | `number` | Yes | - | Number of stories to display |

## Usage Example

```tsx
import { SearchStatsTiny } from '@/components/search/search-stats-tiny';

// Basic usage with search results
function SearchHeader({ searchResults, isLoading }) {
  return (
    <div className="flex items-center justify-between">
      <h1>Search Results</h1>
      <SearchStatsTiny
        articlesCount={searchResults.articles.length}
        storiesCount={searchResults.stories.length}
        isLoading={isLoading}
        className="text-sm"
      />
    </div>
  );
}

// Usage with large numbers (automatically formatted)
function DashboardStats() {
  return (
    <SearchStatsTiny
      articlesCount={1250000}  // Displays as "1.3M"
      storiesCount={45600}     // Displays as "45.6K"
      className="border-l pl-4"
    />
  );
}

// Loading state example
function SearchSidebar({ isSearching }) {
  return (
    <div className="sidebar">
      <SearchStatsTiny
        articlesCount={0}
        storiesCount={0}
        isLoading={isSearching}
        className="mb-4"
      />
    </div>
  );
}
```

## Functionality

### Core Features
- **Compact Display**: Shows article and story counts in a single line with bullet separator
- **Number Formatting**: Automatically formats large numbers using `nFormatter` (e.g., 1,500 → "1.5K")
- **Loading States**: Displays skeleton placeholders during data fetching
- **Responsive Typography**: Uses design system typography variants for consistent styling
- **Visual Hierarchy**: Different colors and opacities to emphasize counts over labels

### Display Format
```
1.2K Articles • 856 Stories°
```

### Loading State
Shows two skeleton placeholders side by side when `isLoading` is true.

## State Management

**No Internal State** - This is a pure presentational component that receives all data through props. State management is handled by parent components, typically using:

- **TanStack Query**: For fetching search results and counts from APIs
- **Local State**: For immediate loading states during searches
- **Search Context**: For shared search state across multiple components

## Side Effects

**None** - This component has no side effects. It's a pure rendering component that displays the data it receives through props.

## Dependencies

### UI Components
- `Skeleton` - For loading state placeholders
- `Typography` - For consistent text styling

### Utilities
- `cn` - For conditional className merging
- `nFormatter` - For number formatting (K, M, B suffixes)

### Type Dependencies
- Exports `SearchStatsTinyProps` interface for type safety

## Integration

### Application Architecture Role
- **Search Results**: Primary display component for search result counts
- **Dashboard Widgets**: Compact stats display in dashboard layouts
- **Navigation Elements**: Summary information in headers or sidebars
- **Filter Panels**: Show filtered result counts

### Common Integration Patterns

```tsx
// With TanStack Query
function SearchResults({ query }) {
  const { data: results, isLoading } = useSearchQuery(query);
  
  return (
    <div>
      <SearchStatsTiny
        articlesCount={results?.articles.length ?? 0}
        storiesCount={results?.stories.length ?? 0}
        isLoading={isLoading}
      />
      {/* Search results display */}
    </div>
  );
}

// With search context
function SearchSummary() {
  const { searchResults, isSearching } = useSearchContext();
  
  return (
    <SearchStatsTiny
      articlesCount={searchResults.totalArticles}
      storiesCount={searchResults.totalStories}
      isLoading={isSearching}
    />
  );
}
```

## Best Practices

### Architecture Adherence
- ✅ **Single Responsibility**: Focused solely on displaying search statistics
- ✅ **Composition**: Uses UI components from design system (`Typography`, `Skeleton`)
- ✅ **Prop Interface**: Clean, typed interface with optional customization
- ✅ **Utility Integration**: Leverages shared utilities for formatting and styling

### Implementation Patterns
- ✅ **Loading States**: Proper skeleton UI during data fetching
- ✅ **Accessibility**: Semantic typography components with proper hierarchy
- ✅ **Performance**: No unnecessary re-renders, pure component behavior
- ✅ **Flexibility**: Customizable styling through className prop

### Usage Guidelines
- Use for compact spaces where full search statistics aren't needed
- Pair with loading states from parent data fetching
- Apply consistent spacing and alignment in layouts
- Consider responsive behavior when integrating into flexible layouts