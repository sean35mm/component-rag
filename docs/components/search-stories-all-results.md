# SearchStoriesAllResults Component

## Purpose

The `SearchStoriesAllResults` component displays a paginated, sortable table of search results for stories. It provides a comprehensive view of all story results from advanced search queries, with features including sorting, pagination, row selection, and detailed story preview capabilities through a drawer interface.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive state (pagination, sorting, row selection)
- Handles user interactions (clicking rows, sorting columns)
- Uses browser-specific hooks and event handlers
- Integrates with Zustand stores for client-side state management

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `index` | `string \| number` | ✅ | Unique identifier for this results tab, used for page state management in the store |

*Note: Full props interface comes from `TabAllResultsProps` type*

## Usage Example

```tsx
import { SearchStoriesAllResults } from '@/components/search/all-results/search-stories-all-results';

// In a search results page or tab container
function SearchResultsTabs() {
  return (
    <div className="search-results">
      <SearchStoriesAllResults index="stories-tab" />
    </div>
  );
}

// With multiple result tabs
function AdvancedSearchResults() {
  const tabs = [
    { key: 'stories', component: SearchStoriesAllResults },
    // ... other result types
  ];

  return (
    <div>
      {tabs.map((tab) => (
        <SearchStoriesAllResults 
          key={tab.key}
          index={tab.key} 
        />
      ))}
    </div>
  );
}
```

## Functionality

### Core Features
- **Paginated Results**: Displays 25 stories per page with navigation controls
- **Sortable Columns**: Supports sorting by creation date, update date, and count metrics
- **Row Selection**: Multi-select functionality for bulk operations
- **Story Detail Drawer**: Click-to-view detailed story information
- **Responsive Design**: Mobile-optimized with card view for smaller screens
- **Loading States**: Skeleton components during data fetching
- **Empty States**: User-friendly messaging when no results found

### Interactive Elements
- **Row Click**: Opens story detail drawer
- **Column Sorting**: Toggles sort direction and updates query
- **Page Navigation**: Maintains page state per tab index
- **Export Functionality**: Prepared infrastructure (currently commented)

## State Management

### Zustand Stores
```tsx
// Page state management
const page = useAllResultsStore(state => 
  state.pages.find(({ key }) => key === index)?.page || 1
);
const setPage = useAllResultsStore(state => state.onSetPage);

// Drawer state management
const setStory = useEntityDetailDrawerStore(state => state.setStory);
const setIsStoryDrawerOpen = useEntityDetailDrawerStore(state => state.setIsOpen);
```

### Local State
```tsx
// Table interaction state
const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
const [sorting, setSorting] = useState<SortingState>([
  { id: 'updatedAt', desc: false }
]);
```

### TanStack Query Integration
- Uses `useAdvancedSearch` hook for server state management
- Implements pagination and sorting parameters
- Separate query for maximum count data

## Side Effects

### Data Fetching
- **Primary Query**: Fetches paginated story results based on current page and sorting
- **Count Query**: Separate query to get total result count for pagination
- **Real-time Updates**: Queries re-run when search parameters change

### User Interactions
- **Drawer Management**: Opens/closes story detail drawer with selected story data
- **Page Persistence**: Maintains page state across tab switches
- **Sort State**: Updates query parameters when sorting changes

## Dependencies

### Components
- `StoryDrawer` - Detail view component
- `ResultsTable` - Generic table component with pagination
- `StoryPreviewCardMobile` - Mobile view component
- `NoResults` - Empty state component
- Various UI components (Typography, Icons, Skeletons)

### Hooks
- `useAdvancedSearch` - Custom hook for search functionality
- `useStoriesAllResultsTable` - Table configuration hook
- `useAllResultsStore` - Page state management
- `useEntityDetailDrawerStore` - Drawer state management

### Services
- `story-service` - API service types and interfaces
- `search-utils` - Search-related utilities and constants

## Integration

### Search Architecture
```tsx
// Integrates with advanced search system
const { storiesData, isLoadingStories } = useAdvancedSearch({
  size: PER_PAGE,
  page: page - 1,
  enabled: { stories: true },
  storiesSortBy: mapSortingToStoriesSorting(sorting[0].id)
});
```

### Table System
- Uses generic `ResultsTable` component for consistent UI/UX
- Implements responsive design with mobile card fallbacks
- Supports custom column definitions and sizing

### Drawer System
- Integrates with global drawer state management
- Provides seamless transition between list and detail views

## Best Practices

### Architectural Adherence
✅ **State Management**: Proper separation of server state (TanStack Query) and client state (Zustand)
✅ **Component Decomposition**: Leverages reusable UI components from `/ui/` directory
✅ **Client-Side Rendering**: Appropriate use of client component for interactive features

### Performance Patterns
✅ **Pagination**: Limits data fetching to 25 items per page
✅ **Separate Queries**: Optimizes count query with minimal data fetching
✅ **Memoization**: Uses stable state selectors for Zustand stores

### User Experience
✅ **Loading States**: Comprehensive skeleton loading states
✅ **Empty States**: Meaningful messaging for no results
✅ **Responsive Design**: Mobile-first approach with adaptive layouts
✅ **Accessibility**: Proper ARIA attributes through table component

### Code Organization
✅ **Export Structure**: Clear separation of constants, utilities, and main component
✅ **Type Safety**: Proper TypeScript integration with tanstack-table types
✅ **Custom Hooks**: Logic separation through custom hooks for table configuration