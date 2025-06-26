# SearchArticlesAllResults Component

## Purpose

The `SearchArticlesAllResults` component displays search results for articles in a comprehensive table view with sorting, pagination, and mobile-responsive design. It serves as the "All Results" tab view for article searches, providing users with detailed article listings, interactive table functionality, and the ability to open article details in a drawer.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Interactive state management (sorting, pagination, row selection)
- Event handlers for user interactions (row clicks, sorting changes)
- Integration with client-side state stores (Zustand)
- Dynamic UI updates based on user actions

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `index` | `string` | ✅ | Unique identifier for the tab/view, used for state management and pagination tracking |

```typescript
interface TabAllResultsProps {
  index: string;
}
```

## Usage Example

```tsx
import { SearchArticlesAllResults } from '@/components/search/all-results/search-articles-all-results';

function SearchResultsPage() {
  return (
    <div className="search-results">
      <SearchArticlesAllResults index="articles-tab" />
    </div>
  );
}

// Within a tabbed interface
function SearchTabs() {
  return (
    <Tabs defaultValue="articles">
      <TabsContent value="articles">
        <SearchArticlesAllResults index="articles-all-results" />
      </TabsContent>
    </Tabs>
  );
}
```

## Functionality

### Core Features
- **Article Search Results Display**: Shows paginated articles in a responsive table
- **Sorting Capabilities**: Allows sorting by publication date and other fields
- **Mobile Responsiveness**: Renders as cards on mobile devices, table on desktop
- **Row Selection**: Supports multi-row selection for potential bulk operations
- **Article Detail Access**: Click-to-open article details in a drawer
- **Search Limit Handling**: Shows banners for public users with search limitations
- **Empty State Management**: Displays appropriate messaging when no results found

### Interactive Elements
- Sortable table columns
- Pagination controls
- Row click handlers for article detail viewing
- Mobile card interactions

## State Management

### Local State (useState)
```typescript
const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
const [sorting, setSorting] = useState<SortingState>([
  { id: 'pubDate', desc: false }
]);
```

### Zustand Stores
- **`useAllResultsStore`**: Manages pagination state across different result tabs
- **`useEntityDetailDrawerStore`**: Controls article drawer visibility and content

### TanStack Query (via useAdvancedSearch)
- Fetches article data with pagination and sorting parameters
- Handles loading states and data caching
- Manages search result updates

## Side Effects

### Data Fetching
```typescript
const { articlesData, isLoadingArticles } = useAdvancedSearch({
  size: PER_PAGE,
  page: page - 1,
  enabled: { articles: true },
  articlesSortBy: mapSortingToStoriesSorting(sorting[0].id)
});
```

### State Updates
- Page changes update global pagination state
- Sorting changes trigger new data fetching
- Row clicks open article drawer with selected article

## Dependencies

### Components
- `ArticleDrawer` - Detail view for selected articles
- `ResultsTable` - Main table component for displaying results
- `ArticlePreviewCardMobile` - Mobile card representation
- `NoResults` - Empty state component
- `SearchLimitBanner` - Public user limitation messaging

### Hooks
- `useAdvancedSearch` - Search functionality and data fetching
- `useArticlesAllResultsTable` - Table configuration and columns
- `useAccessToken` - Authentication and user type detection

### Utilities
- `mapSortingToStoriesSorting` - Converts UI sorting to API parameters
- `nFormatter` - Number formatting for result counts

## Integration

### Application Flow
1. **Search Context**: Receives search parameters from parent search components
2. **Result Display**: Renders articles in responsive table/card layout
3. **Detail Navigation**: Integrates with drawer system for article details
4. **State Persistence**: Maintains pagination state across tab switches

### Architecture Patterns
- **Flat Component Structure**: Minimal nesting, clear separation of concerns
- **State Co-location**: Local state for UI interactions, global state for shared data
- **Responsive Design**: Mobile-first approach with progressive enhancement

## Best Practices

### ✅ Architectural Compliance
- **Client Component Usage**: Appropriately uses client component for interactive features
- **State Management Separation**: Local state for UI, Zustand for global state, TanStack Query for server state
- **Component Decomposition**: Well-decomposed with specialized sub-components
- **Responsive Design**: Mobile-first with appropriate fallbacks

### ✅ Performance Considerations
- **Pagination**: Limits results per page (25) for optimal performance
- **Conditional Rendering**: Efficient rendering based on loading and data states
- **Memoization Opportunities**: Table columns from custom hook for stability

### ✅ User Experience
- **Loading States**: Skeleton components during data fetching
- **Empty States**: Meaningful no-results messaging
- **Mobile Optimization**: Card-based layout for better mobile interaction
- **Accessibility**: Proper ARIA handling through table component

### Configuration Constants
```typescript
const PER_PAGE = 25; // Optimal page size for performance and UX
```

This component exemplifies our architectural patterns by maintaining clear separation between client interactivity and server data fetching, providing excellent mobile responsiveness, and integrating seamlessly with the broader search ecosystem.