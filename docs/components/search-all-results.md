# SearchAllResults Component

## Purpose
`SearchAllResults` is a comprehensive search results interface that displays multiple categories of search results (stories, articles, sources, people, companies, topics, locations, and authors) in a tabbed layout. It serves as the main results display component for the application's search functionality, providing users with organized access to different types of search results.

## Component Type
**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive state through Zustand store
- Uses Next.js `useSearchParams` hook for URL parameter handling
- Handles user interactions for tab switching
- Manages loading states and error handling with toast notifications

## Props Interface
This component accepts no props - it's a self-contained search results interface.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | This component doesn't accept props |

## Usage Example
```tsx
import { SearchAllResults } from '@/components/search/search-all-results';

// Basic usage in a search page
export default function SearchPage() {
  return (
    <div className="search-container">
      <SearchInput />
      <SearchAllResults />
    </div>
  );
}

// Usage with URL parameters for specific tab
// URL: /search?q=technology&resultsType=totalCompanies
export default function SearchResultsPage() {
  return <SearchAllResults />;
}
```

## Functionality
- **Multi-category Search Results**: Displays 8 different types of search results in organized tabs
- **Dynamic Tab Counts**: Shows result counts for each category with loading states
- **URL Parameter Sync**: Synchronizes active tab with `resultsType` URL parameter
- **Error Handling**: Displays toast notifications for API errors with retry functionality
- **No Results Handling**: Shows appropriate UI when no search results are found
- **Entity Detail Integration**: Provides context for detailed entity viewing through drawer interface

## State Management
**Zustand Store Integration**:
- `allResultsTab`: Current active tab index
- `onSetAllResultsTab`: Function to update active tab
- `onTriggerRefetch`: Function to retry failed API calls

**URL State Synchronization**:
- Uses Next.js `useSearchParams` to read `resultsType` parameter
- Automatically updates active tab based on URL parameters

## Side Effects
1. **Search Data Fetching**: Uses `useAdvancedSearch` hook to fetch search results and statistics
2. **Error Toast Notifications**: Displays error messages when API calls fail
3. **URL Parameter Monitoring**: Watches for changes in `resultsType` URL parameter
4. **Tab State Synchronization**: Updates Zustand store when URL parameters change

## Dependencies

### Hooks
- `useAdvancedSearch`: Custom hook for fetching search data
- `useToast`: UI hook for displaying notifications
- `useExploreStore`: Zustand store for search state management
- `useSearchParams`: Next.js hook for URL parameter access

### Components
- `TabMenuHorizontal` & `TabMenuHorizontalItem`: Tab navigation UI
- `LinkButton`: Interactive button component
- `EntityDetailDrawerProvider`: Context provider for entity details
- Various search result components (8 different result type components)
- `SearchNoMatches`: No results state component

### External Dependencies
- React hooks (`useEffect`, `useMemo`)
- Next.js navigation utilities

## Integration
This component serves as a central hub in the search architecture:

1. **Search Flow Integration**: Positioned after search input components to display results
2. **Entity Detail System**: Wraps results in `EntityDetailDrawerProvider` for detailed views
3. **URL Routing**: Integrates with Next.js routing for deep-linkable search states
4. **State Management Layer**: Connects to global search state through Zustand store
5. **Error Boundary**: Handles API errors gracefully with user-friendly notifications

## Best Practices
✅ **Follows Architecture Guidelines**:
- Uses client component appropriately for interactive functionality
- Implements proper state management with Zustand for global state
- Uses custom hooks for data fetching logic separation
- Employs component composition with specialized result components

✅ **Performance Optimizations**:
- Uses `useMemo` for expensive stats calculations
- Separates loading states for different data types
- Implements conditional rendering for no-results state

✅ **User Experience**:
- Provides loading indicators for all data fetching operations
- Implements error recovery with retry functionality
- Maintains URL synchronization for shareable search states
- Shows appropriate feedback for empty results

✅ **Maintainability**:
- Exports reusable constants (`TAB_SEARCH_PARAM`, `tabs`)
- Uses typed interfaces for tab configuration
- Separates concerns between data fetching and UI rendering
- Implements clear error handling patterns