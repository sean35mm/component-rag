# useMatchEntities Hook

## Purpose

The `useMatchEntities` hook fetches and transforms entity data (companies, people, and topics) based on pending signal entities. It provides a unified interface for retrieving and formatting different types of entities into a consistent `SearchEntityItem` structure, primarily used for entity matching and search functionality in signal processing workflows.

## Component Type

**Client Component Hook** - This is a custom React hook that uses client-side state management with TanStack Query for data fetching. It leverages `useCallback`, `useMemo`, and multiple query hooks that require client-side execution.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `pendingSignalEntities` | `PendingSignalEntities \| null` | Yes | Object containing arrays of entity IDs/names to fetch (companies, people, topics) |

### PendingSignalEntities Structure
```typescript
interface PendingSignalEntities {
  companies?: string[];
  people?: string[];
  topics?: string[];
}
```

## Usage Example

```tsx
import { useMatchEntities } from '@/components/hooks/use-match-entities';

function SignalEntityMatcher() {
  const pendingEntities = {
    companies: ['company-123', 'company-456'],
    people: ['wikidata-789', 'wikidata-012'],
    topics: ['artificial intelligence', 'machine learning']
  };

  const {
    companies,
    people,
    topics,
    isFetching
  } = useMatchEntities(pendingEntities);

  if (isFetching) {
    return <div>Loading entities...</div>;
  }

  return (
    <div>
      <h3>Matched Companies ({companies.length})</h3>
      {companies.map(company => (
        <div key={company.id}>
          {company.icon && <img src={company.icon} alt="" />}
          {company.name}
        </div>
      ))}
      
      <h3>Matched People ({people.length})</h3>
      {people.map(person => (
        <div key={person.id}>
          {person.icon && <img src={person.icon} alt="" />}
          {person.name}
        </div>
      ))}
      
      <h3>Matched Topics ({topics.length})</h3>
      {topics.map(topic => (
        <div key={topic.id}>
          {topic.icon}
          {topic.name}
        </div>
      ))}
    </div>
  );
}
```

## Functionality

### Key Features

- **Multi-Entity Fetching**: Simultaneously fetches companies, people, and topics based on provided identifiers
- **Data Transformation**: Converts raw API responses into consistent `SearchEntityItem` format
- **Conditional Loading**: Only fetches data when entities are provided and arrays are non-empty
- **Loading State Management**: Aggregates loading states from multiple queries
- **Icon Handling**: Provides appropriate icons for each entity type (logos, images, hashtag symbol)

### Return Value

```typescript
{
  companies: SearchEntityItem[];
  people: SearchEntityItem[];
  topics: SearchEntityItem[];
  isFetching: boolean;
}
```

### SearchEntityItem Structure

```typescript
interface SearchEntityItem {
  id: string;
  name: string;
  originalName: string;
  icon: string | React.ReactNode | null;
  type: SearchEntities;
  label: string;
}
```

## State Management

**TanStack Query** - Uses multiple query hooks for server state management:

- `useCompanies` - Fetches company data by IDs
- `usePeoples` - Fetches people data by Wikidata IDs  
- `useTopicsByName` - Fetches topics by name strings

The hook employs query options with:
- **Conditional enabling** based on data availability
- **Data transformation** using select functions
- **Optimized re-renders** with memoized selectors

## Side Effects

### API Calls
- **Companies API**: Fetches company details when company IDs are provided
- **People API**: Fetches person details when Wikidata IDs are provided
- **Topics API**: Fetches topic details when topic names are provided

### Performance Optimizations
- Queries are conditionally enabled to prevent unnecessary API calls
- Selector functions are memoized with `useCallback` to prevent re-renders
- Topic results are processed with `useMemo` for efficient aggregation

## Dependencies

### Internal Dependencies
- `@/components/icons` - PiHashtag icon component
- `@/lib/query-hooks` - Data fetching hooks (useCompanies, usePeoples, useTopicsByName)
- `@/lib/types` - TypeScript interfaces and enums

### External Dependencies
- `react` - useCallback, useMemo hooks
- Implicitly depends on TanStack Query through query hooks

## Integration

### Application Architecture Role

This hook serves as a **data transformation layer** between:
- **Signal Processing**: Converts pending entity identifiers into rich entity objects
- **Search Components**: Provides formatted entities for search interfaces
- **Entity Matching**: Enables entity resolution workflows

### Common Integration Patterns

```tsx
// In signal creation workflows
function SignalBuilder() {
  const { pendingEntities } = useSignalForm();
  const matchedEntities = useMatchEntities(pendingEntities);
  
  return (
    <EntitySelector
      companies={matchedEntities.companies}
      people={matchedEntities.people}
      topics={matchedEntities.topics}
    />
  );
}

// In entity validation flows
function EntityValidator({ entities }) {
  const validatedEntities = useMatchEntities(entities);
  
  return (
    <ValidationResults
      isValidating={validatedEntities.isFetching}
      results={validatedEntities}
    />
  );
}
```

## Best Practices

### Architectural Adherence

✅ **TanStack Query for Server State**: Properly uses query hooks for all external data fetching

✅ **Performance Optimization**: Implements memoization patterns to prevent unnecessary re-renders

✅ **Conditional Data Fetching**: Only fetches data when needed, preventing wasteful API calls

✅ **Consistent Data Shape**: Transforms heterogeneous API responses into uniform entity structure

### Recommended Usage Patterns

1. **Null Safety**: Always handle the case where `pendingSignalEntities` is null
2. **Loading States**: Use the `isFetching` flag for loading indicators
3. **Error Handling**: Consider wrapping usage in error boundaries for query failures
4. **Data Validation**: Validate entity arrays before passing to the hook

### Integration Guidelines

- Use in components that need to resolve entity identifiers to full entity objects
- Ideal for search, validation, and entity matching workflows
- Consider debouncing when used with user input to prevent excessive API calls
- Combine with caching strategies for frequently accessed entities