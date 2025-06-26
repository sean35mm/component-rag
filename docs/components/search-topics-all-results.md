# SearchTopicsAllResults Component

## Purpose

The `SearchTopicsAllResults` component renders a comprehensive table/list view of topic search results with sorting, pagination, filtering, and batch selection capabilities. It serves as the main interface for displaying and interacting with topic data in the search results view, supporting both desktop table and mobile card layouts.

## Component Type

**Client Component** - Uses `'use client'` directive because it requires:
- Interactive state management (sorting, pagination, row selection)
- Browser-specific APIs through TanStack Table
- Real-time user interactions (filtering, selection)
- Complex client-side state synchronization across multiple stores

## Props Interface

### SearchTopicsAllResults Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `index` | `string \| number` | ✅ | Unique identifier for the tab/page instance used for state management |

### TopicPreviewCardMobileEntity Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `entityStats` | `EntityCount[]` | ❌ | Array of entity statistics for displaying counts |
| `isAuthorizedAndVerified` | `boolean` | ✅ | User authorization status for content access |
| `isPublic` | `boolean` | ✅ | Public access mode flag |
| `row` | `Row<EntityCount>` | ✅ | TanStack Table row data containing topic information |
| `token` | `AccessToken` | ❌ | Authentication token for API requests |

## Usage Example

```tsx
import { SearchTopicsAllResults } from '@/components/search/all-results/search-topics-all-results';

// Basic usage in a search results tab
function SearchResultsPage() {
  return (
    <div className="search-results">
      <SearchTopicsAllResults index="topics-tab" />
    </div>
  );
}

// Usage with multiple tabs
function MultiTabSearchResults() {
  return (
    <TabsContent value="topics">
      <SearchTopicsAllResults index="topics-all-results" />
    </TabsContent>
  );
}
```

## Functionality

### Core Features
- **Paginated Results**: Displays topics with configurable pagination (25 per page, 1000 limit)
- **Sorting**: Supports sorting by article count and alphabetical order
- **Batch Selection**: Multi-select topics with checkbox interface
- **Search Integration**: Add/exclude topics from active search filters
- **Responsive Design**: Desktop table view with mobile card fallback
- **Authentication Aware**: Different behavior for public vs authenticated users

### Interactive Capabilities
- **Add to Search**: Convert selected topics to search entities
- **Exclude from Search**: Add selected topics to exclusion filters
- **Mobile Cards**: Suspense-wrapped topic preview cards for mobile
- **Export Ready**: Prepared for data export functionality (commented out)

### Visual Features
- **Entity Count Display**: Shows total topics with hashtag icon
- **Loading States**: Skeleton loaders for counts and content
- **No Results State**: Helpful messaging when no topics found
- **Limit Banner**: Public user limitations notification

## State Management

### Zustand Stores
- **`useAllResultsStore`**: Manages pagination state across tabs
- **`useExploreStore`**: Handles search entities and filters
- **`useFiltersDrawerStore`**: Controls filter state and application

### Local State
- **`rowSelection`**: TanStack Table row selection state
- **`sorting`**: Table sorting configuration (default: articles ascending)

### TanStack Query
- **`useAdvancedSearch`**: Fetches topic counts and statistics
- **`useTopicByNameSuspense`**: Loads individual topic data for mobile cards

## Side Effects

### API Interactions
- Fetches topic counts and statistics through `useAdvancedSearch`
- Loads individual topic details for mobile card rendering
- Respects authentication context for data access

### State Synchronization
- Updates global search entities when topics are added/excluded
- Synchronizes pagination state across component instances
- Manages filter exclusions and inclusions

### Performance Optimizations
- Memoized topic sorting and filtering
- Suspense boundaries for mobile card loading
- Conditional rendering based on loading states

## Dependencies

### Internal Components
- `ResultsTable`: Main table component with selection capabilities
- `TopicPreviewCardMobile`: Mobile-specific topic card component
- `NoResults`: Empty state component
- `SearchLimitBanner`: Public user limitation notice

### Custom Hooks
- `useAdvancedSearch`: Topic data fetching and statistics
- `useTopicsAllResultsTable`: Table configuration and columns
- `useTopicByNameSuspense`: Individual topic data loading

### Context Providers
- `EntityDetailDrawerProvider`: Wraps component for detail modals
- `useAccessToken`: Authentication and authorization context
- Multiple Zustand stores for state management

## Integration

### Search Architecture
- Integrates with advanced search functionality
- Connects to global filter and entity management
- Supports multi-tab search result interfaces

### Authentication Flow
- Respects public vs authenticated user permissions
- Conditionally renders content based on verification status
- Handles token-based API access

### Mobile Responsiveness
- Desktop: Full table with sorting and pagination
- Mobile: Card-based layout with Suspense loading
- Responsive breakpoints and conditional rendering

## Best Practices

### Architecture Adherence
- ✅ **Client Component**: Appropriately uses client directive for interactivity
- ✅ **Flat Component Structure**: Minimal nesting with clear separation of concerns
- ✅ **State Management**: Proper use of Zustand for client state, TanStack Query for server state
- ✅ **Component Decomposition**: Separates mobile entity rendering into dedicated component

### Performance Patterns
- ✅ **Memoization**: Uses `useMemo` for expensive sorting operations
- ✅ **Suspense Boundaries**: Implements loading states for async components
- ✅ **Conditional Rendering**: Avoids unnecessary renders based on auth state

### Code Organization
- ✅ **Constants Export**: Exposes `PER_PAGE` and `LIMIT` for reuse
- ✅ **Type Safety**: Proper TypeScript interfaces for all props
- ✅ **Error Boundaries**: Graceful fallbacks for loading states

### Integration Quality
- ✅ **Context Usage**: Leverages multiple contexts appropriately
- ✅ **Hook Composition**: Combines custom hooks effectively
- ✅ **State Synchronization**: Maintains consistency across global state