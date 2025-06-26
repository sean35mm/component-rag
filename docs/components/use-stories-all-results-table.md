# useStoriesAllResultsTable Hook

## Purpose
The `useStoriesAllResultsTable` hook provides a table configuration for displaying stories in search results. It creates column definitions for a TanStack React Table that displays story metadata including title, publication dates, coverage metrics, source counts, reach statistics, and article counts with visual progress indicators.

## Component Type
**Client Component Hook** - This hook uses client-side features like `useMemo` for memoization and creates interactive table column definitions with custom cell renderers that require client-side state management and user interactions.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `maxArticlesCount` | `number` | No | `undefined` | Maximum number of articles across all stories, used to calculate relative progress bar values for article count visualization |

## Usage Example

```tsx
'use client';

import { useStoriesAllResultsTable } from '@/components/search/all-results/hooks/use-stories-all-results-table';
import { DataTable } from '@/components/ui/data-table';
import { StoryWithPageInfoAndSelectedArticles } from '@/lib/types';

interface StoriesTableProps {
  stories: StoryWithPageInfoAndSelectedArticles[];
  maxArticles: number;
}

export function StoriesTable({ stories, maxArticles }: StoriesTableProps) {
  const { columns } = useStoriesAllResultsTable(maxArticles);

  return (
    <div className="space-y-4">
      <h2>Search Results</h2>
      <DataTable
        columns={columns}
        data={stories}
        pagination
        sorting
      />
    </div>
  );
}

// In a parent component
export function SearchResultsPage() {
  const { data: stories } = useStoriesQuery();
  const maxArticles = Math.max(...stories.map(s => s.totalCount));

  return (
    <StoriesTable 
      stories={stories} 
      maxArticles={maxArticles}
    />
  );
}
```

## Functionality

### Column Definitions
- **Story Title**: Displays story name with thumbnail image and fallback placeholder
- **Last Article**: Shows relative time since last article publication
- **Coverage**: Renders story velocity component for trend visualization
- **Published**: Formatted creation date with precise timestamp
- **Sources**: Citation sources component showing unique source count
- **Reach**: Reach statistics with tooltip provider for additional context
- **Article Count**: Progress bar visualization with formatted count display

### Visual Features
- Image thumbnails with automatic fallbacks
- Progress bars for relative article count comparison
- Formatted timestamps and relative dates
- Typography consistency across all columns
- Responsive layout with proper text truncation

### Data Processing
- Date parsing and formatting using date-fns
- Number formatting for large counts
- Image URL resolution with fallback logic
- Sorting configuration for relevant columns

## State Management
**Local State with Memoization** - Uses `useMemo` to optimize column definition creation, preventing unnecessary re-renders when dependencies remain unchanged. No external state management required as this is a pure configuration hook.

## Side Effects
- **Image Placeholder Generation**: Calls `useImagePlaceholder` hook to generate consistent fallback images
- **Date Calculations**: Processes publication dates for relative time display
- **Number Formatting**: Applies text formatting utilities for large numbers

## Dependencies

### Internal Components
- `@/components/hooks/use-image-placeholder` - Placeholder image generation
- `@/components/story/stats/reach` - Reach statistics display
- `@/components/ui/citation-sources` - Source citation component
- `@/components/ui/image-with-fallback` - Image with fallback handling
- `@/components/ui/progress` - Progress bar component
- `@/components/ui/story-velocity` - Story velocity visualization
- `@/components/ui/tooltip` - Tooltip provider
- `@/components/ui/typography` - Typography component

### External Libraries
- `@tanstack/react-table` - Table column definitions
- `date-fns` - Date parsing and formatting

### Utilities
- `@/lib/utils/get-pub-date` - Publication date utilities
- `@/lib/utils/text` - Text formatting functions

## Integration
This hook integrates into the search results architecture by:

- **Search Results Flow**: Provides table configuration for story search results display
- **Data Visualization**: Transforms raw story data into visual table representations
- **Component Composition**: Leverages UI component library for consistent presentation
- **Table Framework**: Integrates with TanStack React Table for advanced table features
- **Search Context**: Supports search result pagination, sorting, and filtering requirements

## Best Practices

### ✅ Architectural Compliance
- **Reusable Configuration**: Separates table configuration from presentation logic
- **Component Decomposition**: Uses flat composition with focused UI components
- **Memoization**: Optimizes performance with proper dependency management
- **Type Safety**: Leverages TypeScript for column definition type safety

### ✅ Performance Optimization
- **Selective Memoization**: Only recreates columns when dependencies change
- **Efficient Rendering**: Uses optimized cell renderers for complex data
- **Progressive Enhancement**: Graceful handling of missing data

### ✅ Maintainability
- **Single Responsibility**: Focused solely on table column configuration
- **Dependency Injection**: Accepts configuration parameters for flexibility
- **Consistent Styling**: Uses design system components throughout
- **Error Resilience**: Handles missing images and data gracefully

### ✅ Integration Patterns
- **Hook Composition**: Leverages other hooks following React patterns
- **UI Library Integration**: Consistent use of shared UI components
- **Data Transformation**: Clean separation between data and presentation logic