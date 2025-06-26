# SearchJournalistsAllResults

## Purpose

The `SearchJournalistsAllResults` component displays a comprehensive list of journalists found in advanced search results. It provides a sortable, paginated table view with selection capabilities, filtering options, and detailed journalist information access through drawer interactions. This component serves as the journalists tab within the search results interface.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires browser-side state management for table interactions, sorting, pagination, row selection, and drawer controls that need immediate user feedback.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `index` | `string \| number` | ✅ | Unique identifier for the tab/page state management in the all results store |

```typescript
interface TabAllResultsProps {
  index: string | number;
}
```

## Usage Example

```tsx
import { SearchJournalistsAllResults } from '@/components/search/all-results/search-journalists-all-results';

function SearchResultsTabs() {
  return (
    <div className="search-results">
      <SearchJournalistsAllResults index="journalists" />
    </div>
  );
}

// Within a tabbed interface
function AdvancedSearchResults() {
  const [activeTab, setActiveTab] = useState('journalists');
  
  return (
    <TabsContainer>
      <TabsContent value="journalists">
        <SearchJournalistsAllResults index="journalists" />
      </TabsContent>
    </TabsContainer>
  );
}
```

## Functionality

### Core Features
- **Paginated Results**: Displays journalists in pages of 25 items with navigation
- **Sortable Table**: Sort by article count or default ordering
- **Row Selection**: Multi-select journalists for bulk operations
- **Search Integration**: Add selected journalists to search filters or exclude them
- **Detail Access**: Click rows to open detailed journalist drawer
- **Mobile Responsive**: Adaptive card layout for mobile devices
- **Loading States**: Skeleton loaders during data fetching

### Interactive Elements
- **Filter Integration**: Add/exclude journalists from search filters
- **Drawer Navigation**: Access detailed journalist information
- **Export Functionality**: (Commented out but prepared for data export)
- **Limit Handling**: Special UI for public users with search limits

## State Management

### Zustand Stores
- **`useAllResultsStore`**: Manages pagination state across different result tabs
- **`useFiltersDrawerStore`**: Handles search filter state and modifications
- **`useEntityDetailDrawerStore`**: Controls journalist detail drawer state

### Local State
- **`rowSelection`**: Tracks selected table rows for bulk operations
- **`sorting`**: Manages table sorting configuration (defaults to articles ascending)

### TanStack Query
- **`useAdvancedSearch`**: Fetches journalist search results and total counts
- **`useJournalistByIdSuspense`**: Loads individual journalist details for mobile cards

## Side Effects

### Data Fetching
- Fetches journalist search results with 1000 item limit
- Loads individual journalist details for mobile card rendering
- Handles loading states and error boundaries

### Filter Modifications
- Updates global search filters when adding/excluding journalists
- Manages filter deduplication and conflict resolution
- Synchronizes selection state with filter changes

### Navigation Effects
- Opens journalist detail drawer on row clicks
- Updates drawer content with selected journalist data
- Manages drawer state transitions

## Dependencies

### UI Components
- `ResultsTable`: Core table functionality with selection and pagination
- `JournalistDrawer`: Detailed journalist information display
- `JournalistPreviewCardMobile`: Mobile-optimized journalist cards
- `NoResults`: Empty state display
- `SearchLimitBanner`: Public user limitation notice

### Custom Hooks
- `useAdvancedSearch`: Advanced search functionality
- `useJournalistsAllResultsTable`: Table configuration and columns
- `useAccessToken`: Authentication and authorization state

### External Libraries
- `@tanstack/react-table`: Table functionality and row selection
- React Suspense for async component loading

## Integration

### Search Architecture
Integrates with the broader advanced search system as a tab component within search results. Shares state with other result tabs through the `useAllResultsStore` and maintains consistent filter state across the application.

### Data Flow
```
Search Query → useAdvancedSearch → API → Results Processing → Table Display
     ↓
Filter Updates → useFiltersDrawerStore → Global State → Re-render
     ↓
Selection Actions → Row Selection → Bulk Operations → Filter Modifications
```

### Mobile Strategy
Uses Suspense boundaries to load detailed journalist data only when needed for mobile cards, optimizing performance while maintaining rich mobile experience.

## Best Practices

### ✅ Follows Architecture Guidelines
- **Component Decomposition**: Separates concerns with dedicated sub-components
- **State Management**: Proper separation of server state (TanStack Query) and client state (Zustand)
- **Reusability**: Leverages shared UI components from `/ui/` directory
- **Performance**: Uses React Suspense for optimal loading experiences

### ✅ Implementation Patterns
- **Constants Export**: Exposes `PER_PAGE` and `LIMIT` for testing and configuration
- **Memoization**: Uses `useMemo` for expensive sorting operations
- **Error Boundaries**: Implements fallback components for failed loads
- **Accessibility**: Maintains proper table semantics and keyboard navigation

### ✅ Data Management
- **Efficient Pagination**: Client-side pagination for better performance
- **Smart Sorting**: Optimized sorting logic with memoized results
- **State Synchronization**: Proper coordination between multiple state stores
- **Loading States**: Comprehensive loading and skeleton states for better UX

## Exported Constants

```typescript
export const PER_PAGE = 25;        // Items per page for pagination
export const LIMIT = 1000;         // Maximum results limit
```

These constants are exported to enable consistent pagination configuration across related components and facilitate testing scenarios.