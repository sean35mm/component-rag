# SearchStats Component

## Purpose

The `SearchStats` component displays a visual summary of search results statistics including stories, articles, sources, people, companies, topics, locations, and authors. It provides an interactive navigation interface that allows users to filter search results by clicking on different statistical categories.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Utilizes the `useSearchParams` hook from Next.js navigation
- Requires interactive click handlers for navigation
- Manages URL state transitions dynamically

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | `undefined` | Additional CSS classes for styling customization |
| `data` | `Stats` | No | `undefined` | Statistics data object containing counts for various entity types |
| `isLoading` | `boolean` | No | `false` | Loading state indicator that shows skeleton when true |

### Type Definitions

```tsx
interface Stats extends TopEntitiesCountsPicked {
  totalStories?: number;
  totalArticles?: number;
}

type TopEntitiesCountsPicked = Pick<
  TopEntitiesCounts,
  | 'totalTopics'
  | 'totalPeople'
  | 'totalCompanies'
  | 'totalCities'
  | 'totalJournalistsById'
  | 'totalSources'
>;
```

## Usage Example

```tsx
import { SearchStats } from '@/components/search/search-stats';

// Basic usage with loading state
function SearchPage() {
  const { data: stats, isLoading } = useSearchStats();
  
  return (
    <div className="search-layout">
      <SearchStats 
        data={stats} 
        isLoading={isLoading}
        className="sticky top-4"
      />
    </div>
  );
}

// Example with mock data
const mockStats = {
  totalStories: 1250,
  totalArticles: 3400,
  totalSources: 156,
  totalPeople: 890,
  totalCompanies: 234,
  totalTopics: 45,
  totalCities: 67,
  totalJournalistsById: 123
};

<SearchStats data={mockStats} />
```

## Functionality

### Core Features

1. **Statistics Display**: Shows formatted counts for 8 different entity types with corresponding icons
2. **Interactive Navigation**: Each statistic acts as a clickable link that filters search results
3. **URL State Preservation**: Maintains existing search parameters while adding new filters
4. **Loading State**: Displays skeleton placeholder during data fetching
5. **Visual Feedback**: Hover effects with color transitions and arrow indicators
6. **Formatted Numbers**: Uses `nFormatter` utility for readable large number display

### Navigation Behavior

- Clicking any statistic updates the URL with `tab: 'all'` and `resultsType: [selected type]`
- Preserves all existing search parameters
- "All Results" button navigates to comprehensive results view

## State Management

**URL State Management**: 
- Uses Next.js `useSearchParams` hook to read current URL parameters
- Maintains search state through URL query parameters
- No internal component state - relies on URL as single source of truth

**Data Flow**:
- Receives statistics data via props (typically from parent component using TanStack Query)
- No direct API calls or server state management within the component

## Side Effects

1. **URL Navigation**: Updates browser URL and triggers navigation when statistics are clicked
2. **Visual State Changes**: Hover interactions modify component appearance
3. **Route Transitions**: Clicking links may trigger page/component re-renders based on new URL parameters

## Dependencies

### UI Components
- `Button` - For the "All Results" action button
- `Skeleton` - Loading state placeholder
- `Typography` - Text styling and hierarchy
- `NextLink` - Next.js optimized navigation

### Icons
- Multiple Phosphor icons for different entity types
- Custom `IconArticlesFill` and `IconStoriesFill` components

### Utilities
- `cn` - Conditional className utility
- `nFormatter` - Number formatting for large values
- `useSearchParams` - Next.js navigation hook

### Types
- `TopEntitiesCounts` - Entity counting type definitions

## Integration

### Application Architecture Role

1. **Search Interface**: Core component of search result pages
2. **Navigation Hub**: Acts as a filter selector for different content types
3. **Data Visualization**: Provides quick overview of search result distribution
4. **State Coordination**: Bridges URL state with search functionality

### Typical Usage Patterns

```tsx
// In search results layout
function SearchLayout() {
  return (
    <div className="grid grid-cols-4 gap-6">
      <aside className="col-span-1">
        <SearchStats data={searchStats} isLoading={isLoading} />
        <SearchFilters />
      </aside>
      <main className="col-span-3">
        <SearchResults />
      </main>
    </div>
  );
}
```

## Best Practices

### Architecture Alignment

✅ **Client Component Usage**: Appropriately uses client-side rendering for interactive navigation features

✅ **Component Decomposition**: Well-structured with exported `statsList` configuration for reusability

✅ **State Management**: Follows URL-first state pattern, avoiding unnecessary client state

✅ **Reusability**: Configurable through props with sensible defaults

### Design Patterns

✅ **Loading States**: Implements proper loading UI with skeleton component

✅ **Type Safety**: Strong TypeScript interfaces with proper type extraction

✅ **Accessibility**: Uses semantic HTML with proper link elements

✅ **Performance**: Minimal re-renders due to URL state management

### Integration Best Practices

- Pair with TanStack Query in parent components for data fetching
- Use consistent `resultsType` values across the application
- Maintain URL parameter naming conventions
- Consider implementing error boundaries for robustness