# useEntities Hook

## Purpose

The `useEntities` hook is a custom React hook that provides access to and processes search entities from the explore store. It categorizes entities by type (companies, people, topics) and transforms them into appropriate formats for search functionality. This hook serves as an abstraction layer between the raw entity data and components that need to display or search through different types of entities.

## Component Type

**Client Component Hook** - This is a custom hook that uses React's `useMemo` and integrates with Zustand store (`useExploreStore`). It requires client-side state management and reactivity, making it inherently a client-side hook.

## Props Interface

This hook takes no parameters.

### Return Type

| Property | Type | Description |
|----------|------|-------------|
| `companies` | `string[]` | Array of company IDs converted to strings |
| `peoples` | `string[]` | Array of people IDs converted to strings |
| `topics` | `string[]` | Array of topic original names |
| `entitiesByKey` | `Record<string, string[]>` | Object mapping query keys to their respective entity arrays |
| `count` | `number` | Total count of all entities |

## Usage Example

```tsx
import { useEntities } from '@/components/search/hooks/use-entities';

function SearchFilters() {
  const { companies, peoples, topics, entitiesByKey, count } = useEntities();

  return (
    <div className="search-filters">
      <div className="entity-counts">
        <span>Total Entities: {count}</span>
      </div>
      
      <div className="company-filters">
        <h3>Companies ({companies.length})</h3>
        {companies.map(companyId => (
          <FilterChip key={companyId} value={companyId} />
        ))}
      </div>
      
      <div className="people-filters">
        <h3>People ({peoples.length})</h3>
        {peoples.map(personId => (
          <FilterChip key={personId} value={personId} />
        ))}
      </div>
      
      <div className="topic-filters">
        <h3>Topics ({topics.length})</h3>
        {topics.map(topicName => (
          <FilterChip key={topicName} value={topicName} />
        ))}
      </div>
    </div>
  );
}

// Using entitiesByKey for search queries
function SearchComponent() {
  const { entitiesByKey } = useEntities();
  
  const searchParams = new URLSearchParams();
  Object.entries(entitiesByKey).forEach(([key, values]) => {
    values.forEach(value => searchParams.append(key, value));
  });
  
  // Use searchParams for API calls or URL construction
  return <SearchResults params={searchParams} />;
}
```

## Functionality

### Core Features

1. **Entity Categorization**: Automatically categorizes entities by type (companies, people, topics)
2. **Data Transformation**: Converts entity data to appropriate string formats:
   - Companies/People: Uses entity ID converted to string
   - Topics: Uses original name property
3. **Query Key Mapping**: Creates a structured object mapping search query keys to entity values
4. **Performance Optimization**: Uses `useMemo` to prevent unnecessary recalculations
5. **Count Tracking**: Provides total entity count for UI display

### Data Processing Logic

- Filters entities by type using `getEntitiesByType` utility
- Applies different transformation functions based on entity type
- Only includes entity types in `entitiesByKey` if they have values and valid query keys

## State Management

**Zustand Integration**: This hook consumes state from the `useExploreStore` Zustand store, specifically the `entities` state slice. It follows our architecture pattern of using Zustand for client-side state management.

### State Dependencies
- `entities`: Array of entity objects from the explore store
- Reactive updates when entities change in the store

## Side Effects

**No Direct Side Effects**: This hook is purely reactive and doesn't perform any side effects like API calls or external mutations. It only processes and transforms existing state data.

## Dependencies

### Internal Dependencies
- `@/lib/contexts` - For `useExploreStore` Zustand store
- `@/lib/types` - For `SearchEntities` enum/types
- `@/lib/utils/search-utils` - For utility functions:
  - `getEntitiesByType`
  - `SEARCH_ENTITY_TO_QUERY_KEY`

### React Dependencies
- `useMemo` - For performance optimization

## Integration

### Application Architecture Role

1. **Search Feature Layer**: Acts as a data provider for search-related components
2. **State Abstraction**: Provides a clean interface between raw store data and UI components
3. **Search Query Building**: Enables construction of search parameters for API calls or URL routing
4. **Filter Components**: Powers entity-based filtering interfaces

### Integration Patterns

```tsx
// Filter panels
const FilterPanel = () => {
  const { companies, peoples, topics } = useEntities();
  // Render filter options
};

// Search builders
const SearchBuilder = () => {
  const { entitiesByKey } = useEntities();
  // Build search queries
};

// Entity counters
const EntityStats = () => {
  const { count } = useEntities();
  // Display statistics
};
```

## Best Practices

### Architecture Adherence

✅ **Proper State Management**: Uses Zustand for client state as per guidelines
✅ **Performance Optimization**: Implements memoization to prevent unnecessary re-renders
✅ **Separation of Concerns**: Separates data processing logic from UI components
✅ **Type Safety**: Properly typed return values and dependencies

### Recommended Usage Patterns

1. **Component Composition**: Use in combination with UI components for modular search interfaces
2. **Conditional Rendering**: Leverage count and array lengths for conditional UI display
3. **Search Integration**: Use `entitiesByKey` for consistent search parameter construction
4. **Performance**: Rely on memoization - avoid additional processing of returned arrays

### Anti-Patterns to Avoid

❌ Don't mutate returned arrays directly
❌ Don't perform additional filtering without memoization
❌ Don't use for server-side rendering contexts
❌ Don't bypass this hook to access entities directly in search components