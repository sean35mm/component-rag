# useArticlesAllResultsTable Hook

## Purpose

The `useArticlesAllResultsTable` hook provides table column definitions for displaying article search results in a tabular format. It encapsulates the presentation logic for article data including images, titles, sources, publication dates, and labels, creating a reusable configuration for TanStack Table components.

## Component Type

**Client Component Hook** - This hook is designed for client-side use with TanStack Table, handling interactive table rendering and cell formatting that requires client-side execution.

## Props Interface

This hook does not accept any parameters.

**Return Value:**
| Property | Type | Description |
|----------|------|-------------|
| `columns` | `ColumnDef<Article>[]` | Array of TanStack Table column definitions for article data |

## Usage Example

```tsx
'use client';

import { useArticlesAllResultsTable } from '@/components/search/all-results/hooks/use-articles-all-results-table';
import { DataTable } from '@/components/ui/data-table';
import { Article } from '@/lib/types';

interface ArticlesTableProps {
  articles: Article[];
  isLoading?: boolean;
}

export function ArticlesTable({ articles, isLoading }: ArticlesTableProps) {
  const { columns } = useArticlesAllResultsTable();

  return (
    <DataTable
      columns={columns}
      data={articles}
      loading={isLoading}
      emptyMessage="No articles found"
    />
  );
}

// Usage in a search results component
export function SearchResults() {
  const { data: articles, isLoading } = useQuery({
    queryKey: ['articles', searchQuery],
    queryFn: () => fetchArticles(searchQuery),
  });

  return (
    <div className="space-y-4">
      <h2>Article Results</h2>
      <ArticlesTable articles={articles || []} isLoading={isLoading} />
    </div>
  );
}
```

## Functionality

### Column Definitions

1. **Article Title Column**
   - Displays article thumbnail image with fallback
   - Shows truncated article title with consistent typography
   - Non-sortable for performance optimization

2. **Source Column**
   - Renders source domain using `SourceEntitySimple` component
   - Provides consistent source identification across the application

3. **Published Date Column**
   - Formats publication date using date-fns
   - Displays in user-friendly format: "MMM d h:mmaaaaa'm'"
   - Sortable by default for chronological ordering

4. **Labels Column**
   - Shows primary label as a tag component
   - Displays count indicator for additional labels (+N format)
   - Handles empty label arrays gracefully

### Image Handling

- Integrates with `useImagePlaceholder` for consistent fallback images
- Uses `ImageWithFallback` component for robust image loading
- Maintains consistent 32x32 pixel sizing for table optimization

## State Management

**Local State**: Uses `useMemo` for column definition memoization to prevent unnecessary re-renders when the component using this hook re-renders.

**Dependencies**: Relies on `useImagePlaceholder` hook for placeholder image generation, which may have its own state management patterns.

## Side Effects

- **Image Loading**: Triggers image loading for article thumbnails and fallback generation
- **Date Parsing**: Performs date parsing and formatting operations
- **Memoization**: Optimizes performance through memoized column definitions

## Dependencies

### Internal Components
- `useImagePlaceholder` - Generates placeholder images for articles
- `ImageWithFallback` - Handles image loading with fallback support
- `SourceEntitySimple` - Displays source information
- `Tag` - Renders label tags
- `Typography` - Provides consistent text styling

### External Libraries
- `@tanstack/react-table` - Table functionality and column definitions
- `date-fns` - Date parsing and formatting utilities

### Types
- `Article` - Type definition for article data structure

## Integration

### Search Architecture
This hook integrates into the search results system by providing standardized article presentation:

```tsx
// Search results flow
SearchPage → AllResultsView → ArticlesSection → ArticlesTable → useArticlesAllResultsTable
```

### Data Flow
1. Article data flows from search API responses
2. Hook transforms data into table-compatible format
3. TanStack Table renders using provided column definitions
4. UI components handle individual cell rendering

### Table Ecosystem
Works seamlessly with the application's table infrastructure:
- Compatible with `DataTable` wrapper components
- Supports standard table features (sorting, pagination)
- Integrates with loading and empty states

## Best Practices

### Architecture Adherence
- ✅ **Single Responsibility**: Focused solely on article table configuration
- ✅ **Reusability**: Encapsulates table logic for use across multiple components
- ✅ **Performance**: Uses memoization to prevent unnecessary recalculations
- ✅ **Type Safety**: Strongly typed with TypeScript interfaces

### UI Component Patterns
- ✅ **Consistent Styling**: Uses design system components (`Typography`, `Tag`)
- ✅ **Responsive Design**: Implements appropriate sizing and spacing
- ✅ **Graceful Degradation**: Handles missing data with fallbacks

### Data Handling
- ✅ **Null Safety**: Handles undefined/null values appropriately
- ✅ **Performance Optimization**: Disables sorting on complex columns
- ✅ **User Experience**: Provides meaningful visual hierarchy and information density

### Integration Patterns
- ✅ **Separation of Concerns**: Separates table configuration from data fetching
- ✅ **Composability**: Designed to work with various table wrapper components
- ✅ **Maintainability**: Centralized column definitions for easy updates