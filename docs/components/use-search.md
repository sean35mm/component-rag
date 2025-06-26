# use-search Hook

## Purpose

The `use-search` hook provides comprehensive search functionality across multiple entity types (companies, people, stories, and topics) with filtering, sorting, and highlighting capabilities. It serves as the core search logic for search bars and search interfaces throughout the application, offering unified access to different data sources with configurable filtering options.

## Component Type

**Custom Hook (Client-side)** - This is a React hook that leverages multiple TanStack Query hooks to fetch and manage search results from different APIs. It requires client-side execution due to its use of React hooks and state management.

## Props Interface

### FilterSortProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value` | `string` | ✅ | The search query string to filter results |
| `activeFilter` | `SearchEntities` | ✅ | Current active filter determining which entity types to display |
| `disableStories` | `boolean` | ❌ | When true, excludes stories from search results |
| `disabled` | `boolean` | ❌ | When true, disables all search queries |
| `disableTopics` | `boolean` | ❌ | When true, excludes topics from search results |
| `disablePeople` | `boolean` | ❌ | When true, excludes people from search results |
| `disableCompanies` | `boolean` | ❌ | When true, excludes companies from search results |

## Usage Example

```tsx
import { useState } from 'react';
import { useSearch } from '@/components/search/search-bar/hooks/use-search';
import { SearchEntities } from '@/lib/types';

function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const [activeFilter, setActiveFilter] = useState(SearchEntities.ALL);

  const { isLoading, results, notFilteredData } = useSearch({
    value: searchValue,
    activeFilter,
    disableStories: false,
    disabled: searchValue.length < 2, // Only search with 2+ characters
  });

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search companies, people, stories, or topics..."
      />
      
      <div className="filter-buttons">
        <button 
          onClick={() => setActiveFilter(SearchEntities.ALL)}
          className={activeFilter === SearchEntities.ALL ? 'active' : ''}
        >
          All
        </button>
        <button 
          onClick={() => setActiveFilter(SearchEntities.COMPANIES)}
          className={activeFilter === SearchEntities.COMPANIES ? 'active' : ''}
        >
          Companies
        </button>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="search-results">
          {results.map((result) => (
            <div key={`${result.type}-${result.id}`} className="search-result-item">
              <div className="result-icon">{result.icon}</div>
              <div className="result-content">
                <div dangerouslySetInnerHTML={{ __html: result.name }} />
                <div className="result-label">{result.label}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

## Functionality

### Core Features

- **Multi-entity Search**: Searches across companies, people, stories, and topics simultaneously
- **Search Highlighting**: Automatically highlights matching text in search results with HTML formatting
- **Intelligent Sorting**: Sorts results by relevance, prioritizing exact matches and match frequency
- **Flexible Filtering**: Supports filtering by entity type and selective disabling of entity categories
- **Performance Optimization**: Uses memoization and conditional query execution to minimize unnecessary API calls

### Entity Mapping

- **Companies**: Maps to include name, industry label, favicon icon, and domain
- **People**: Maps to include name, description, profile image, and Wikidata ID
- **Stories**: Maps to include name, category labels, featured images, and slug for routing
- **Topics**: Maps to include name, category labels, and hashtag icon

### Search Algorithm

1. **Input Sanitization**: Escapes special regex characters to prevent errors
2. **Primary Sort**: Orders by first match position in the string
3. **Secondary Sort**: Orders by total number of matches (relevance)
4. **Text Highlighting**: Wraps matches in `<strong>` and `<u>` tags for visual emphasis

## State Management

**TanStack Query Integration** - The hook leverages four separate TanStack Query hooks:

- `useCompanies` - Fetches company data with prefix-based search
- `usePeoples` - Fetches people data with prefix-based search  
- `useStoriesWithPageInfoAndSelectedArticles` - Fetches story data with associated metadata
- `useTopics` - Fetches topic data with name-based search

Each query includes:
- **Conditional Execution**: Queries are disabled based on component props and search state
- **Data Transformation**: Uses `select` callbacks to transform API responses into consistent `SearchEntityItem` format
- **Optimized Re-renders**: Memoized selectors prevent unnecessary re-computations

## Side Effects

### API Interactions
- Makes concurrent HTTP requests to multiple search endpoints
- Automatically debounces requests through TanStack Query's built-in mechanisms
- Handles loading states and error conditions gracefully

### Performance Optimizations
- Uses `useMemo` for expensive data transformations and sorting operations
- Implements `useCallback` for stable selector functions
- Conditionally disables queries to prevent unnecessary network requests

## Dependencies

### Internal Dependencies
- **Query Hooks**: `useCompanies`, `usePeoples`, `useStoriesWithPageInfoAndSelectedArticles`, `useTopics`
- **Types**: `Company`, `Person`, `StoryWithPageInfoAndSelectedArticles`, `Topic`, `SearchEntities`, `SearchEntityItem`
- **Icons**: `PiHashtag` from the application's icon system

### External Dependencies
- **React**: `useCallback`, `useMemo` for optimization
- **TanStack Query**: For data fetching and caching

## Integration

### Application Architecture Role

The `use-search` hook serves as a **data aggregation layer** that:

- **Unifies Multiple APIs**: Combines results from different backend services into a consistent interface
- **Abstracts Complexity**: Hides the complexity of managing multiple concurrent queries from consuming components
- **Enables Reusability**: Can be used by search bars, dropdown selectors, and other search interfaces
- **Maintains Consistency**: Ensures all search experiences follow the same sorting and filtering logic

### Integration Patterns

```tsx
// In a search dropdown component
const SearchDropdown = ({ onSelect }) => {
  const { results, isLoading } = useSearch({
    value: inputValue,
    activeFilter: SearchEntities.ALL,
    disableStories: true, // Only show entities, not content
  });

  return (
    <Dropdown>
      {results.map(result => (
        <DropdownItem 
          key={result.id} 
          onClick={() => onSelect(result)}
        >
          {result.name}
        </DropdownItem>
      ))}
    </Dropdown>
  );
};

// In a filtered search page
const SearchPage = () => {
  const { results, isLoading, notFilteredData } = useSearch({
    value: searchParams.q,
    activeFilter: searchParams.filter,
    disabled: !searchParams.q,
  });

  return (
    <SearchLayout>
      <SearchFilters totalResults={notFilteredData.length} />
      <SearchResults results={results} loading={isLoading} />
    </SearchLayout>
  );
};
```

## Best Practices

### Architectural Compliance

✅ **Proper State Management**: Uses TanStack Query for server state, avoiding local state for API data

✅ **Component Decomposition**: Separates data fetching logic from UI components, enabling reusability

✅ **Performance Optimization**: Implements proper memoization and conditional execution patterns

✅ **Type Safety**: Provides comprehensive TypeScript interfaces and proper generic typing

### Recommended Usage Patterns

```tsx
// ✅ Good: Conditional enablement for performance
const { results } = useSearch({
  value: searchTerm,
  activeFilter: SearchEntities.ALL,
  disabled: searchTerm.length < 2, // Wait for meaningful input
});

// ✅ Good: Selective entity disabling based on context
const { results } = useSearch({
  value: searchTerm,
  activeFilter: SearchEntities.ALL,
  disableStories: isPublicPage, // Hide internal content on public pages
  disablePeople: !hasUserPermissions,
});

// ❌ Avoid: Using the hook without proper loading states
const { results } = useSearch({ value, activeFilter });
// Missing isLoading check can cause UI flicker
```

### Integration Guidelines

- **Always handle loading states** when displaying results to users
- **Use `disabled` prop** to prevent unnecessary API calls for short search terms
- **Leverage `notFilteredData`** to show total result counts across all categories
- **Consider entity-specific disabling** based on user permissions or context
- **Implement proper error boundaries** around components using this hook