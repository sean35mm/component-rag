# SearchCompaniesAllResults Component

## Purpose

The `SearchCompaniesAllResults` component displays paginated search results for companies in a tabular format. It provides comprehensive functionality for viewing, sorting, selecting, and managing company data within search results, including options to add or exclude companies from search filters.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Interactive state management for row selection and sorting
- Event handlers for user interactions (clicks, selections)
- Real-time updates to search filters and entities
- Dynamic table interactions and drawer management

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `index` | `string \| number` | ✓ | Unique identifier for the tab/page instance used for state management |

```typescript
interface TabAllResultsProps {
  index: string | number;
}
```

## Usage Example

```tsx
import { SearchCompaniesAllResults } from '@/components/search/all-results/search-companies-all-results';

// Within a search results page or tab container
function SearchResultsTabs() {
  return (
    <div className="search-results">
      <SearchCompaniesAllResults index="companies-tab" />
    </div>
  );
}

// In a paginated search interface
function CompanySearchPage() {
  return (
    <main>
      <SearchFilters />
      <SearchCompaniesAllResults index={0} />
    </main>
  );
}
```

## Functionality

### Core Features
- **Paginated Results**: Displays 25 companies per page with pagination controls
- **Sortable Columns**: Supports sorting by articles and other company attributes
- **Row Selection**: Multi-select functionality for bulk operations
- **Search Integration**: Add/exclude companies from active search filters
- **Mobile Responsive**: Adaptive UI with mobile-specific card layouts
- **Company Details**: Click-to-view detailed company information in drawer
- **Result Limits**: Enforces 1000 result limit with appropriate user feedback

### User Interactions
- **Company Selection**: Checkbox-based multi-selection for bulk actions
- **Add to Search**: Include selected companies in search filters
- **Exclude from Search**: Add selected companies to exclusion filters
- **View Details**: Open company detail drawer on row click
- **Pagination**: Navigate through result pages
- **Sorting**: Sort results by different criteria

## State Management

### Zustand Stores
- **`useAllResultsStore`**: Manages pagination state across different result tabs
- **`useExploreStore`**: Handles search entities and filters
- **`useFiltersDrawerStore`**: Manages filter state and applications
- **`useEntityDetailDrawerStore`**: Controls company detail drawer visibility

### TanStack Query
- **`useCompanies`**: Fetches company data based on IDs from search results
- **`useAdvancedSearch`**: Retrieves total counts and search metadata

### Local State
- **`rowSelection`**: Tracks selected table rows for bulk operations
- **`sorting`**: Manages table sorting configuration

## Side Effects

### API Calls
- Fetches company data when total counts are available
- Executes advanced search queries for entity counts
- Automatically refetches on filter or search changes

### Filter Management
- Updates global search entities when companies are added/excluded
- Applies filter changes across the application
- Synchronizes excluded items with current selections

### Navigation
- Updates page state in global store
- Maintains pagination across tab switches

## Dependencies

### Components
- `CompanyDrawer`: Detail view for individual companies
- `ResultsTable`: Core table functionality with selection
- `CompanyPreviewCardMobile`: Mobile-optimized company cards
- `NoResults`: Empty state display
- `SearchLimitBanner`: Public user limit notifications

### Hooks
- `useAdvancedSearch`: Custom search functionality
- `useCompaniesAllResultsTable`: Table configuration and columns
- `useAccessToken`: Authentication and access level detection

### Services
- `useCompanies`: Company data fetching query hook

## Integration

### Search Architecture
- Integrates with global search state management
- Coordinates with filter system for entity inclusion/exclusion
- Shares pagination state across multiple result tabs

### Data Flow
1. Search query triggers `useAdvancedSearch` for total counts
2. Company IDs extracted from paginated results
3. `useCompanies` fetches detailed company information
4. Results sorted and displayed in responsive table
5. User interactions update global search state

### Mobile Experience
- Responsive design with mobile-specific card components
- Touch-optimized interactions for selection and navigation
- Adaptive layout based on screen size

## Best Practices

### Architecture Adherence
- ✅ **Client Component**: Appropriately uses client-side rendering for interactivity
- ✅ **State Management**: Combines TanStack Query for server state with Zustand for client state
- ✅ **Component Decomposition**: Delegates specific functionality to specialized components
- ✅ **Reusability**: Leverages shared UI components from `/ui/` directory

### Performance Optimizations
- Memoized sorting logic to prevent unnecessary recalculations
- Conditional data fetching based on loading states
- Efficient pagination with configurable page sizes

### User Experience
- Loading states with skeleton components
- Empty states with helpful messaging
- Responsive design for all device types
- Intuitive bulk selection and management

### Code Organization
- Clear separation of concerns between data fetching and presentation
- Consistent naming conventions following established patterns
- Proper TypeScript typing for all props and state

## Exported Constants

```typescript
export const PER_PAGE = 25;    // Items per page for pagination
export const LIMIT = 1000;    // Maximum total results limit
```

These constants can be imported and used by parent components or related search functionality to maintain consistency across the application.