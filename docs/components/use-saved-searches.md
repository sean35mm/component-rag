# use-saved-searches Hook

## Purpose
The `use-saved-searches` hook is a custom React hook that provides functionality for automatically saving and updating deep search queries in the application. It manages the persistence of search parameters, filters, and entity selections, enabling users to maintain their search state across sessions and navigation.

## Component Type
**Client Component** - This is a custom hook that uses client-side React hooks (`useCallback`, `useEffect`, `useMemo`, `useRef`) and manages local state updates. It requires the 'use client' directive due to its interactive nature and state management operations.

## Exports Interface

| Export | Type | Description |
|--------|------|-------------|
| `DELAY_BETWEEN_SAVES` | `number` | Constant defining the delay (2000ms) between consecutive save operations |
| `useSavedSearches` | `function` | Main hook for handling automatic search saves |
| `useHandleDeepSearchSave` | `function` | Hook for manual deep search save operations |

### useSavedSearches Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `articles` | `ArticlesSearchResult<Article>` | No | Search results to trigger save operations |
| `disabled` | `boolean` | No | Flag to disable automatic saving |

### useHandleDeepSearchSave Return Value

| Return Value | Type | Description |
|--------------|------|-------------|
| `handleDeepSearchSave` | `function` | Async function to save search with parameters: `(searchId, name, articlesQuery)` |

## Usage Example

```tsx
'use client';

import { useCallback } from 'react';
import { useSavedSearches, useHandleDeepSearchSave } from '@/components/search/hooks/use-saved-searches';

// Basic automatic saving
function SearchResults({ articles, isLoading }) {
  // Automatically saves search when articles change
  useSavedSearches(articles, isLoading);

  return (
    <div>
      {articles?.data?.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}

// Manual search saving
function SearchToolbar() {
  const handleSave = useHandleDeepSearchSave();

  const onSaveClick = useCallback(async () => {
    await handleSave(
      'search-123',
      'My Custom Search',
      {
        showReprints: false,
        from: '2024-01-01',
        to: '2024-12-31',
        query: {
          q: 'artificial intelligence',
          title: 'technology',
        },
      }
    );
  }, [handleSave]);

  return (
    <button onClick={onSaveClick}>
      Save Current Search
    </button>
  );
}

// Conditional saving based on user state
function SmartSearchContainer({ searchResults }) {
  const { isAuthorizedAndVerified } = useAccessToken();
  
  // Only auto-save for authenticated users
  useSavedSearches(
    searchResults, 
    !isAuthorizedAndVerified
  );

  return <SearchResults articles={searchResults} />;
}
```

## Functionality

### Core Features
- **Automatic Search Persistence**: Automatically saves search state when articles are updated
- **Debounced Updates**: Prevents excessive API calls with a 2-second delay between saves
- **Smart Name Generation**: Automatically generates search names based on query parameters
- **Authentication-Aware**: Handles different save behaviors for authenticated, public, and unauthorized users
- **URL Management**: Updates browser URL for shareable search states

### Key Behaviors
- **State Synchronization**: Combines search parameters, filters, and entity selections into a cohesive query
- **Duplicate Prevention**: Uses a ref-based locking mechanism to prevent concurrent save operations
- **Conditional Execution**: Respects disabled flag and authentication state
- **Error Handling**: Uses `throwOnError: false` for graceful failure handling

## State Management

### Zustand Store Integration
```tsx
// Reads from multiple Zustand stores
const searchId = useExploreStore((state) => state.searchId);
const filters = useFiltersDrawerStore((state) => state.filters);
```

### TanStack Query Integration
```tsx
// Uses mutation hooks for API operations
const { mutateAsync: onPrivateUpdateSavedDeepSearch } = useUpdateSavedDeepSearch();
const { mutateAsync: onPrivateGenerateNameFromQuery } = useGenerateNameFromQuery();
```

### Local State Management
- **Ref-based Locking**: Prevents concurrent save operations using `useRef`
- **Memoized Filters**: Optimizes filter mapping with `useMemo`
- **Callback Optimization**: Uses `useCallback` for stable function references

## Side Effects

### API Interactions
- **Search Updates**: Calls `updateSavedDeepSearch` API for authenticated users
- **Name Generation**: Requests AI-generated names for unnamed searches
- **Public/Private Handling**: Routes to appropriate API endpoints based on user type

### Navigation Effects
- **URL Updates**: Modifies browser URL using Next.js router
- **Parameter Preservation**: Maintains UI state parameters during navigation

### Timing Effects
- **Debounced Saves**: Implements 2-second delay to prevent API spam
- **Effect Cleanup**: Manages async operations and timeouts properly

## Dependencies

### Internal Dependencies
- `@/lib/contexts`: Zustand stores and authentication context
- `@/lib/query-hooks`: TanStack Query mutation hooks
- `@/lib/utils`: Utility functions for data transformation
- `./use-entities`: Entity selection hook

### External Dependencies
- `next/navigation`: Router for URL management
- `react`: Core React hooks

### Type Dependencies
- `Article`, `ArticlesSearchResult`: Search result types
- `ComplexAllEndpointBody`: API query structure
- `TabOptions`: Tab configuration types

## Integration

### Search Architecture
```tsx
// Integrates with the broader search system
Search Component → useSavedSearches → API Layer
     ↓                    ↓
Filter Drawer → useFiltersDrawerStore → Query Mapping
     ↓                    ↓
Entity Selection → useEntities → Query Enhancement
```

### Authentication Flow
```tsx
// Different behaviors based on auth state
if (isAuthorizedAndVerified) {
  // Full save functionality with private API
} else if (isPublic) {
  // Limited functionality with public API
} else {
  // Fallback behavior for unauthorized users
}
```

### URL Management
```tsx
// Maintains shareable search URLs
const baseUrl = getGenericDeepSearchHref(name, query);
const urlWithParams = preserveUrlParams(baseUrl);
router.replace(urlWithParams);
```

## Best Practices

### Architecture Adherence
- ✅ **Proper Separation**: Hook handles business logic, components handle presentation
- ✅ **State Management**: Uses Zustand for client state, TanStack Query for server state
- ✅ **Error Handling**: Implements graceful failure with `throwOnError: false`
- ✅ **Performance**: Memoizes expensive operations and debounces API calls

### Usage Recommendations
```tsx
// ✅ Good: Use with proper dependency management
useSavedSearches(articles, isLoading || isDisabled);

// ✅ Good: Handle async operations properly
const handleSave = useHandleDeepSearchSave();
await handleSave(searchId, name, query);

// ❌ Avoid: Don't disable without good reason
useSavedSearches(articles, true); // Only if genuinely needed

// ❌ Avoid: Don't ignore the delay constant
setTimeout(callback, 1000); // Use DELAY_BETWEEN_SAVES instead
```

### Integration Patterns
- **Composite Hooks**: Combines multiple concerns (search, filters, entities) elegantly
- **Conditional Logic**: Respects authentication state and user permissions
- **Error Boundaries**: Fails gracefully without breaking user experience
- **URL Synchronization**: Maintains consistent state between URL and application