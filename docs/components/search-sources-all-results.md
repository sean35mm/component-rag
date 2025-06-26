# SearchSourcesAllResults Component

## Purpose

The `SearchSourcesAllResults` component displays paginated search results for sources in a tabular format with advanced filtering, sorting, and selection capabilities. It serves as the primary interface for viewing and interacting with source data in search results, supporting both desktop table view and mobile card layouts.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages complex local state (row selection, sorting, pagination)
- Handles user interactions (clicks, selections, sorting)
- Uses TanStack React Table for interactive data display
- Requires real-time UI updates based on user actions

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `index` | `string \| number` | Yes | Unique identifier for the tab/page instance, used for state management across multiple result tabs |

## Usage Example

```tsx
import { SearchSourcesAllResults } from '@/components/search/all-results/search-sources-all-results';

function SearchResultsPage() {
  return (
    <div className="search-results">
      <SearchSourcesAllResults index="sources-tab-1" />
    </div>
  );
}

// Within a tabbed interface
function SearchTabs() {
  const tabs = [
    { id: 'sources', label: 'Sources', component: SearchSourcesAllResults },
    // other tabs...
  ];

  return (
    <TabContainer>
      {tabs.map((tab) => (
        <TabPanel key={tab.id}>
          <tab.component index={`${tab.id}-${Date.now()}`} />
        </TabPanel>
      ))}
    </TabContainer>
  );
}
```

## Functionality

### Core Features
- **Paginated Results**: Displays 25 sources per page with navigation controls
- **Advanced Sorting**: Supports sorting by articles count and monthly visits
- **Row Selection**: Multi-select functionality for bulk operations
- **Filter Integration**: Add/exclude sources from search filters
- **Responsive Design**: Desktop table view with mobile card layout
- **Source Details**: Click-to-view detailed source information in drawer
- **Search Limits**: Handles public user limitations (1000 result cap)

### Interactive Operations
- **Bulk Selection**: Select multiple sources for filtering operations
- **Add to Search**: Include selected sources in active search filters
- **Exclude from Search**: Remove selected sources from search results
- **Sort Control**: Toggle between article count and monthly visits sorting
- **Detail View**: Open source detail drawer on row click

## State Management

### Global State (Zustand)
- **`useAllResultsStore`**: Manages pagination state across multiple tabs
- **`useFiltersDrawerStore`**: Handles search filters and filter operations
- **`useEntityDetailDrawerStore`**: Controls source detail drawer visibility and content

### Local State (React)
- **`rowSelection`**: Tracks selected table rows for bulk operations
- **`sorting`**: Manages current sort configuration

### Server State (TanStack Query)
- **`useAdvancedSearch`**: Fetches aggregated source counts and search data
- **`useSources`**: Retrieves detailed source information for current page

## Side Effects

### API Interactions
- **Source Data Fetching**: Retrieves source details based on domain list
- **Search Analytics**: Fetches source counts and article statistics
- **Filter Synchronization**: Updates search filters based on user selections

### External State Updates
- **Filter Application**: Modifies global filter state when adding/excluding sources
- **Drawer Management**: Opens source detail drawer with selected source data
- **Page Navigation**: Updates global pagination state for tab persistence

## Dependencies

### UI Components
- `ResultsTable`: Core table component with sorting and selection
- `SourceDrawer`: Detail view drawer for individual sources
- `SourcePreviewCardMobile`: Mobile-optimized source display cards
- `NoResults`: Empty state component for no search results

### Hooks & Services
- `useAdvancedSearch`: Advanced search functionality and data aggregation
- `useSourcesAllResultsTable`: Table configuration and column definitions
- `useSources`: Source data fetching and caching
- `useAccessToken`: User authentication and permission checking

### Utilities
- `mapSortingToStoriesSorting`: Maps UI sorting to API parameters
- `nFormatter`: Number formatting for display

## Integration

### Search Architecture
- **Filter System**: Integrates with global filter state for dynamic search refinement
- **Tab Management**: Supports multiple concurrent search result tabs
- **Responsive Framework**: Adapts to mobile/desktop viewing contexts

### Data Flow
1. **Search Execution**: Receives aggregated source data from advanced search
2. **Detail Fetching**: Loads full source details for current page
3. **Filter Integration**: Applies user selections to global search state
4. **State Persistence**: Maintains pagination and selection across navigation

## Best Practices

### Architecture Adherence
- ✅ **Client Component Usage**: Appropriately uses client-side rendering for interactive features
- ✅ **State Separation**: Clear distinction between server state (queries) and client state (UI)
- ✅ **Component Decomposition**: Leverages specialized UI components for table, cards, and drawers
- ✅ **Hook Composition**: Combines multiple focused hooks for complex functionality

### Performance Optimizations
- **Memoized Sorting**: Uses `useMemo` for expensive sort operations
- **Conditional Queries**: Enables queries only when dependencies are ready
- **Efficient Selection**: Callback memoization for bulk operations

### User Experience
- **Loading States**: Provides skeleton loading for better perceived performance
- **Mobile Responsiveness**: Dedicated mobile card layout for optimal mobile experience
- **Accessibility**: Supports keyboard navigation and screen readers through table component

## Exported Constants

```tsx
export const PER_PAGE = 25; // Results per page
export const LIMIT = 1000; // Maximum total results
export const mapSortingToStoriesSorting; // Sorting mapper utility
```