# useSuggestedEntities Hook

## Purpose

The `useSuggestedEntities` hook provides intelligent entity suggestions for search functionality by analyzing top-performing entities (people and companies) from the current data set. It filters entities based on a 20% relevance threshold and excludes already selected entities, returning up to 4 suggestions (2 people, 2 companies) to enhance user search experience.

## Component Type

**Client Component Hook** - This is a custom React hook that uses client-side state management with `useCallback`, `useMemo`, and integrates with TanStack Query hooks. It requires client-side execution for state management and data processing.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `queryParams` | `AllEndpointParams` | Yes | Query parameters used to fetch top entities data |
| `excludedEntities` | `SearchEntityItem[]` | No | Array of entities to exclude from suggestions |

## Usage Example

```tsx
import { useSuggestedEntities } from '@/components/hooks/use-suggested-entities';

function SearchSuggestions() {
  const queryParams = {
    dateRange: '30d',
    sources: ['news', 'social'],
    // ... other query parameters
  };

  const excludedEntities = [
    { id: 'company-123', originalName: 'Apple Inc.', type: 'company' },
    { id: 'person-456', originalName: 'John Doe', type: 'person' }
  ];

  const {
    allEntities,
    peopleEntities,
    companiesEntities,
    isFetching
  } = useSuggestedEntities(queryParams, excludedEntities);

  if (isFetching) {
    return <div>Loading suggestions...</div>;
  }

  return (
    <div className="suggestions-container">
      <h3>Suggested Entities</h3>
      {allEntities.map((entity) => (
        <div key={entity.id} className="suggestion-item">
          <span>{entity.originalName}</span>
          <span className="entity-type">{entity.type}</span>
        </div>
      ))}
    </div>
  );
}
```

## Functionality

### Core Features

- **Smart Entity Filtering**: Identifies entities appearing in >20% of total articles
- **Exclusion Logic**: Filters out already selected entities to prevent duplicates
- **Balanced Suggestions**: Returns up to 2 people and 2 companies for diverse suggestions
- **Real-time Updates**: Responds to changes in query parameters and exclusions
- **Loading States**: Provides unified loading state across multiple data sources

### Key Behaviors

- Automatically fetches top entities based on provided query parameters
- Calculates relevance threshold (20% of total articles) dynamically
- Maps raw entity data to standardized `SearchEntityItem` format
- Maintains entity order based on relevance/count

## State Management

**TanStack Query Integration**:
- Uses `useTopEntitiesCounts` for fetching entity statistics
- Uses `usePeoples` and `useCompanies` for detailed entity data
- Implements conditional query enabling based on data availability
- Custom `select` functions for data transformation

**Local State Optimization**:
- `useMemo` for expensive computations (entity filtering, key extraction)
- `useCallback` for stable function references in query selectors

## Side Effects

### API Calls
1. **Top Entities API**: Fetches entity counts and statistics
2. **People API**: Retrieves detailed person information for top people
3. **Companies API**: Retrieves detailed company information for top companies

### Query Dependencies
- People and companies queries are conditionally enabled based on top entities data
- Automatic refetching when `queryParams` or `excludedEntities` change

## Dependencies

### Internal Dependencies
- `@/lib/query-hooks`: `useCompanies`, `usePeoples`, `useTopEntitiesCounts`
- `@/lib/types`: Type definitions for entities and search results
- `@/components/search/search-bar/hooks`: Entity mapping utilities (`mapCompany`, `mapPeople`)

### External Dependencies
- `react`: `useCallback`, `useMemo` for performance optimization
- TanStack Query (via query hooks) for server state management

## Integration

### Application Architecture Role
- **Search Enhancement Layer**: Sits between search UI and data fetching layer
- **Entity Intelligence**: Provides smart suggestions based on data analysis
- **State Coordination**: Coordinates multiple data sources into unified suggestions

### Usage Patterns
```tsx
// In search components
const suggestions = useSuggestedEntities(currentQuery, selectedEntities);

// In filter components
const entitySuggestions = useSuggestedEntities(filterParams, activeFilters);

// In analytics dashboards
const topEntities = useSuggestedEntities(reportParams);
```

## Best Practices

### Architectural Adherence

✅ **Server State Management**: Properly uses TanStack Query for all server interactions

✅ **Performance Optimization**: Implements `useMemo` and `useCallback` for expensive operations

✅ **Component Decomposition**: Single responsibility - focuses solely on entity suggestions

✅ **Type Safety**: Full TypeScript integration with proper type definitions

### Usage Recommendations

```tsx
// ✅ Good: Memoize query parameters
const queryParams = useMemo(() => ({
  dateRange,
  sources,
  filters
}), [dateRange, sources, filters]);

const suggestions = useSuggestedEntities(queryParams, excludedEntities);

// ❌ Avoid: Creating new objects on every render
const suggestions = useSuggestedEntities({
  dateRange,
  sources // This creates new object reference each render
}, excludedEntities);
```

### Error Handling
The hook gracefully handles loading states and missing data through:
- Conditional query enabling
- Safe array operations with optional chaining
- Fallback empty arrays for consistent return types

This hook exemplifies our architecture principles by providing a focused, reusable data layer that efficiently coordinates multiple API calls while maintaining optimal performance through proper memoization and query management.