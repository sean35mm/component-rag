# SearchPeoplesAllResults Component

## Purpose

The `SearchPeoplesAllResults` component displays search results for people entities in a comprehensive table/card view format. It serves as the main interface for browsing, selecting, and interacting with people search results, supporting both desktop table view and mobile card view with advanced features like sorting, pagination, selection, and filtering.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Interactive state management (row selection, sorting, pagination)
- Event handlers for user interactions (clicks, selections)
- Real-time UI updates based on user actions
- Integration with client-side stores (Zustand)

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `index` | `string` | ✅ | Unique identifier for the tab/results instance, used for page state management |

```typescript
interface TabAllResultsProps {
  index: string;
}
```

## Usage Example

```tsx
import { SearchPeoplesAllResults } from '@/components/search/all-results/search-peoples-all-results';

function SearchResultsPage() {
  return (
    <div className="search-results">
      <SearchPeoplesAllResults index="people-tab-1" />
    </div>
  );
}

// Usage within a tabbed interface
function SearchTabs() {
  return (
    <Tabs>
      <TabsContent value="people">
        <SearchPeoplesAllResults index="people-results" />
      </TabsContent>
    </Tabs>
  );
}
```

## Functionality

### Core Features
- **Search Results Display**: Shows people entities in table (desktop) or card (mobile) format
- **Interactive Selection**: Multi-row selection with bulk actions
- **Sorting**: Sort by article count or other criteria
- **Pagination**: Navigate through large result sets (25 items per page)
- **Responsive Design**: Adaptive UI for desktop and mobile devices
- **Entity Actions**: Add to search, exclude from search, view details

### User Interactions
- **Row Selection**: Select individual or multiple people for bulk actions
- **Detail View**: Click on a person to open detailed drawer
- **Search Integration**: Add selected people to active search filters
- **Exclusion Filters**: Exclude selected people from search results
- **Sorting Control**: Change result ordering by different criteria

### Display Features
- **Entity Count**: Shows total number of people found
- **Loading States**: Skeleton loading for better UX
- **Empty States**: Informative no-results messaging
- **Limit Indicators**: Shows search limitations for public users

## State Management

### Local State (useState)
```typescript
const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
const [sorting, setSorting] = useState<SortingState>([
  { id: 'articles', desc: false }
]);
```

### Zustand Stores
- **`useAllResultsStore`**: Manages pagination state across tabs
- **`useExploreStore`**: Handles search entities and filters
- **`useFiltersDrawerStore`**: Manages filter state and application
- **`useEntityDetailDrawerStore`**: Controls detail drawer visibility and data

### TanStack Query
- **`usePeoples`**: Fetches people data based on Wikidata IDs
- **`useAdvancedSearch`**: Provides search totals and entity counts

## Side Effects

### Data Fetching
- Fetches people data when total counts are available
- Reactively updates when page, filters, or search parameters change
- Handles loading and error states gracefully

### Filter Management
- Updates global search entities when adding people to search
- Manages exclusion filters for removed entities
- Synchronizes filter state across the application

### Navigation Effects
- Updates page state in global store
- Maintains pagination state per tab instance
- Handles deep linking and browser navigation

## Dependencies

### UI Components
- `PeopleDrawer` - Detail view drawer
- `ResultsTable` - Main table/card display component
- `PeoplePreviewCardMobile` - Mobile card representation
- `NoResults` - Empty state component
- `Typography` - Text styling components

### Custom Hooks
- `useAdvancedSearch` - Search functionality and data
- `usePeoplesAllResultsTable` - Table configuration and columns
- Various context hooks for state management

### External Libraries
- `@tanstack/react-table` - Table functionality and types
- Icon components for UI elements

## Integration

### Search Architecture
```
SearchPeoplesAllResults
├── Integrates with global search state
├── Connects to filter management system
├── Shares data with other search result components
└── Coordinates with navigation and routing
```

### Data Flow
1. **Search Parameters** → `useAdvancedSearch` → **Entity Counts**
2. **Entity IDs** → `usePeoples` → **Detailed People Data**
3. **User Selections** → **Filter Updates** → **Global Search State**
4. **Pagination** → **Store Updates** → **Cross-tab Synchronization**

## Best Practices

### Architecture Adherence
✅ **State Management**: Proper separation of server state (TanStack Query) and client state (Zustand)
✅ **Component Decomposition**: Well-structured with focused responsibilities
✅ **Reusability**: Uses shared UI components and hooks
✅ **Performance**: Memoized sorting logic and conditional rendering

### Code Quality
- **Type Safety**: Full TypeScript coverage with proper interfaces
- **Error Handling**: Graceful loading and empty states
- **Accessibility**: Proper semantic structure and keyboard navigation
- **Responsive Design**: Mobile-first approach with adaptive layouts

### Integration Patterns
- **Store Coordination**: Multiple Zustand stores working together
- **Query Coordination**: Dependent queries with proper enablement logic
- **State Synchronization**: Consistent state across components and tabs
- **Side Effect Management**: Clean separation of concerns for data updates

## Constants

```typescript
export const PER_PAGE = 25;    // Items per page for pagination
export const LIMIT = 1000;    // Maximum results limit
```

These constants control pagination behavior and result set limitations, particularly important for performance and public user restrictions.