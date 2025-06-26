# SearchLocationsAllResults Component

## Purpose

The `SearchLocationsAllResults` component displays a comprehensive, paginated table of location search results with filtering, sorting, and interactive capabilities. It serves as the primary interface for browsing location entities with article counts, supporting bulk operations like adding/excluding locations from search filters.

## Component Type

**Client Component** - Uses `'use client'` directive because it requires:
- Interactive state management (row selection, pagination, sorting)
- Event handlers for user interactions
- Real-time filter updates and drawer controls
- TanStack Query client-side data fetching

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `index` | `string \| number` | Yes | Unique identifier for the tab/results instance, used for page state management |

**Type Definition:**
```tsx
interface TabAllResultsProps {
  index: string | number;
}
```

## Usage Example

```tsx
import { SearchLocationsAllResults } from '@/components/search/all-results/search-locations-all-results';

function SearchResultsPage() {
  return (
    <div className="search-results">
      <SearchLocationsAllResults index="locations-tab" />
    </div>
  );
}

// Multiple tabs scenario
function SearchTabs() {
  const tabs = ['locations', 'companies', 'people'];
  
  return (
    <div>
      {tabs.map((tab, index) => (
        <SearchLocationsAllResults 
          key={tab}
          index={`${tab}-${index}`} 
        />
      ))}
    </div>
  );
}
```

## Functionality

### Core Features
- **Paginated Results Display**: Shows locations in a responsive table with mobile card view
- **Sorting Capabilities**: Sort by article count or default order
- **Row Selection**: Multi-select locations for bulk operations
- **Search Integration**: Add selected locations to search filters or exclude them
- **Location Details**: Click rows to open detailed location drawer
- **Public/Private Access**: Different behaviors based on user access level

### Interactive Operations
- **Bulk Add to Search**: Selected locations become active search filters
- **Bulk Exclude**: Selected locations are excluded from future searches
- **Location Detail View**: Opens drawer with comprehensive location information
- **Export Functionality**: Prepared for data export features (commented out)

### Responsive Design
- **Desktop**: Full table with columns for location details and metrics
- **Mobile**: Card-based layout with `LocationPreviewCardMobileEntity`

## State Management

### TanStack Query
- **Search Results**: Fetches location data via `useAdvancedSearch` hook
- **Location Details**: Uses `usePlacekitSearch` for individual location data
- **Query Caching**: Leverages query client cache for Placekit results

### Zustand Stores
- **All Results Store**: Manages pagination state across multiple result tabs
- **Filters Drawer Store**: Controls search filters and exclusions
- **Entity Detail Drawer Store**: Manages location drawer visibility and content

### Local State
- **Row Selection**: `useState<RowSelectionState>` for table row selection
- **Sorting**: `useState<SortingState>` for table column sorting

## Side Effects

### Data Fetching
- Fetches total location counts with article statistics
- Loads individual location details from Placekit API
- Caches results for performance optimization

### Filter Management
- Updates global search filters when locations are added/excluded
- Synchronizes excluded items to prevent duplicates
- Applies filter changes across the application

### Drawer Control
- Opens location detail drawer on row click
- Manages drawer state and content updates

## Dependencies

### Components
- `LocationDrawer` - Detailed location information display
- `ResultsTable` - Reusable table component with selection capabilities
- `LocationPreviewCardMobile` - Mobile-optimized location cards
- `NoResults` - Empty state component
- Various UI components (Typography, Icons, Skeletons)

### Hooks & Contexts
- `useAdvancedSearch` - Main search functionality
- `useLocationsAllResultsTable` - Table configuration and columns
- `usePlacekitSearch` - Location data fetching
- Multiple Zustand stores for state management

### Utilities
- `placekitResultToLocationsFilter` - Data transformation
- `nFormatter` - Number formatting
- `isEqual` - Deep equality checking (Lodash)

## Integration

### Search Architecture
The component integrates into the broader search system by:
- Consuming search results from the advanced search pipeline
- Feeding selected locations back into the global filter state
- Coordinating with other result tabs through shared state management

### Filter System Integration
- Reads current filters to avoid duplicates
- Updates filters with selected locations
- Manages exclusion list for refined search results

### Navigation & Routing
- Maintains page state across navigation
- Supports multiple simultaneous result views
- Integrates with drawer-based detail views

## Best Practices

### Architecture Adherence
- ✅ **Proper Client Component Usage**: Uses `'use client'` only for interactive features
- ✅ **State Management Separation**: TanStack Query for server state, Zustand for client state
- ✅ **Component Decomposition**: Flat structure with specialized sub-components
- ✅ **Reusable UI Components**: Leverages shared components from `/ui/` directory

### Performance Optimization
- **Memoization**: Uses `useMemo` for expensive sorting operations
- **Callback Optimization**: `useCallback` for event handlers to prevent re-renders
- **Query Caching**: Leverages TanStack Query cache for repeated requests
- **Pagination**: Limits results with configurable page size (25 items)

### Code Organization
- **Constants**: Exports `PER_PAGE` and `LIMIT` for reusability
- **Type Safety**: Proper TypeScript interfaces and type definitions
- **Error Handling**: Graceful fallbacks for loading and empty states
- **Responsive Design**: Mobile-first approach with progressive enhancement