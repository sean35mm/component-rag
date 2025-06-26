# useAdvancedSearch Hook

## Purpose

The `useAdvancedSearch` hook is a comprehensive search orchestration hook that manages all aspects of advanced search functionality across articles, stories, and entities. It serves as the central coordinator for search operations, handling query construction, data fetching, state synchronization, and search result management in the application's search interface.

## Component Type

**Client Component Hook** - This is a custom React hook that uses client-side state management and effects. It integrates with Zustand stores (`useExploreStore`, `useFiltersDrawerStore`) and coordinates multiple TanStack Query hooks for data fetching, requiring client-side execution.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `size` | `number` | No | `10` | Default page size for results |
| `sizes` | `{ stories?: number; articles?: number; }` | No | `undefined` | Specific page sizes for stories and articles |
| `entitiesSize` | `number` | No | `undefined` | Number of top entities to fetch |
| `page` | `number` | No | `undefined` | Current page number for pagination |
| `enabled` | `{ stories?: boolean; articles?: boolean; intervalCounts?: boolean; topEntities?: boolean; }` | No | `{ stories: true, articles: true, intervalCounts: true, topEntities: true }` | Controls which data queries are enabled |
| `storiesSortBy` | `GetStoriesListParams['sortBy']` | No | `'count'` | Sort order for stories results |
| `articlesSortBy` | `AllEndpointParams['sortBy']` | No | `'addDate'` | Sort order for articles results |
| `entity` | `TopEntity \| TopEntity[]` | No | `undefined` | Specific entities to filter by |
| `onlyStats` | `boolean` | No | `false` | Whether to fetch only statistics without full results |
| `disableSave` | `boolean` | No | `false` | Whether to disable automatic search saving |

## Usage Example

```tsx
import { useAdvancedSearch } from '@/components/search/hooks/use-advanced-search';

// Basic usage in a search results component
function SearchResultsPage() {
  const {
    articlesData,
    storiesData,
    totalCounts,
    isLoadingArticles,
    isLoadingStories,
    articlesError
  } = useAdvancedSearch({
    size: 20,
    enabled: {
      stories: true,
      articles: true,
      intervalCounts: false,
      topEntities: true
    }
  });

  if (isLoadingArticles || isLoadingStories) {
    return <SearchLoadingState />;
  }

  if (articlesError) {
    return <ErrorDisplay error={articlesError} />;
  }

  return (
    <div>
      <SearchStats totalCounts={totalCounts} />
      <ArticlesList articles={articlesData?.results} />
      <StoriesList stories={storiesData?.results} />
    </div>
  );
}

// Usage with custom pagination and sorting
function AdvancedSearchResults({ currentPage }: { currentPage: number }) {
  const {
    articlesData,
    articleCountsData,
    isLoadingArticles,
    isStaleArticlesCount
  } = useAdvancedSearch({
    page: currentPage,
    sizes: {
      articles: 25,
      stories: 10
    },
    articlesSortBy: 'relevance',
    storiesSortBy: 'date',
    enabled: {
      stories: true,
      articles: true,
      intervalCounts: true,
      topEntities: false
    }
  });

  return (
    <SearchResultsContainer>
      <TimelineChart 
        data={articleCountsData} 
        isStale={isStaleArticlesCount} 
      />
      <PaginatedArticles 
        articles={articlesData?.results}
        currentPage={currentPage}
        isLoading={isLoadingArticles}
      />
    </SearchResultsContainer>
  );
}

// Stats-only usage for dashboard
function SearchDashboard() {
  const { totalCounts, isLoadingTotalCounts } = useAdvancedSearch({
    onlyStats: true,
    disableSave: true,
    enabled: {
      stories: false,
      articles: false,
      intervalCounts: false,
      topEntities: true
    },
    entity: ['companies', 'people', 'topics']
  });

  return (
    <DashboardStats 
      counts={totalCounts} 
      isLoading={isLoadingTotalCounts} 
    />
  );
}
```

## Functionality

### Core Features
- **Multi-Domain Search**: Coordinates search across articles, stories, entities, and statistics
- **Query Construction**: Builds optimized queries for different data types from unified search state
- **Filter Integration**: Applies complex filters from the filters drawer to all search operations
- **Pagination Support**: Handles page-based navigation with configurable page sizes
- **Sort Management**: Supports different sorting strategies for articles and stories
- **Statistics Aggregation**: Provides interval counts and top entities for analytics
- **Conditional Fetching**: Selectively enables/disables different data queries based on needs

### Data Processing
- **Filter Mapping**: Converts UI filters to appropriate API parameters for different endpoints
- **Date Handling**: Processes date ranges with timezone awareness using `getZonedDayISO`
- **Entity Integration**: Incorporates entity selections into all relevant queries
- **Result Normalization**: Provides consistent data structure across different query types

## State Management

### Zustand Store Integration
```tsx
// Explore store for search parameters
const q = useExploreStore((state) => state.q);
const title = useExploreStore((state) => state.title);
const from = useExploreStore((state) => state.from);
const to = useExploreStore((state) => state.to);

// Filters store for advanced filtering
const filters = useFiltersDrawerStore((state) => state.filters);
```

### TanStack Query Coordination
- **Articles Query**: `useArticles` with dynamic parameters and sorting
- **Stories Query**: `useStoriesWithPageInfoAndSelectedArticles` with pagination
- **Interval Counts**: `useIntervalArticleCounts` for timeline data
- **Top Entities**: `useTopEntitiesCounts` for statistics and filtering

## Side Effects

### Automatic Refetching
```tsx
useEffect(() => {
  if (refetch) {
    refetchArticles();
    refetchArticleCounts();
    refetchTotalCounts();
    refetchStories();
    onTriggerRefetch(false);
  }
}, [refetch, /* dependencies */]);
```

### Search Persistence
- **Saved Searches**: Automatically saves successful searches via `useSavedSearches`
- **Loading State Management**: Updates global loading state via `useLoadingState`

## Dependencies

### Internal Hooks
- `useEntities` - Entity selection and management
- `useLoadingState` - Global loading state coordination
- `useSavedSearches` - Search history and persistence

### Query Hooks
- `useArticles` - Article search and retrieval
- `useStoriesWithPageInfoAndSelectedArticles` - Story search with metadata
- `useIntervalArticleCounts` - Timeline data for charts
- `useTopEntitiesCounts` - Entity statistics and counts

### Store Dependencies
- `useExploreStore` - Search parameters and query state
- `useFiltersDrawerStore` - Advanced filter configurations

### Utility Functions
- `mapFiltersToAllEndpointParams` - Filter conversion for articles
- `mapFiltersToStoriesApiFilter` - Filter conversion for stories
- `getZonedDayISO` - Date formatting with timezone handling

## Integration

### Search Architecture Role
```
Search Interface
├── Search Input Components
├── Filters Drawer
├── useAdvancedSearch (Central Coordinator)
│   ├── Articles API
│   ├── Stories API
│   ├── Statistics API
│   └── Entities API
└── Results Display Components
```

### Data Flow
1. **Input Collection**: Search terms and filters from UI components
2. **Query Construction**: Builds optimized queries for each data type
3. **Parallel Fetching**: Coordinates multiple API calls simultaneously
4. **State Synchronization**: Updates global stores with results and loading states
5. **Result Delivery**: Provides normalized data to consuming components

## Best Practices

### Architectural Compliance
- ✅ **Server State Management**: Uses TanStack Query for all API interactions
- ✅ **Client State Integration**: Properly integrates with Zustand stores
- ✅ **Component Decomposition**: Separates concerns across multiple specialized hooks
- ✅ **Reusability**: Provides flexible configuration for different search scenarios

### Performance Optimization
```tsx
// Memoized query construction
const articleQuery = useMemo(() => ({
  // Query building logic
}), [dependencies]);

// Conditional enabling
const { enabled: { articles, stories } } = props;

// Selective data fetching
const { onlyStats, disableSave } = props;
```

### Error Handling
- **Granular Error States**: Provides specific error states for each query type
- **Graceful Degradation**: Allows partial functionality when some queries fail
- **Loading State Coordination**: Manages complex loading states across multiple queries

### Usage Guidelines
1. **Configure Appropriately**: Use `enabled` prop to disable unnecessary queries
2. **Handle Loading States**: Always check loading states before rendering results
3. **Monitor Errors**: Implement proper error handling for each data type
4. **Optimize Performance**: Use `onlyStats` when full results aren't needed
5. **Respect State**: Don't bypass the hook's state management with direct API calls