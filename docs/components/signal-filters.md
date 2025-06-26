# SignalFilters Component

## Purpose
The `SignalFilters` component provides a visual representation of active filters applied to signal article queries. It displays filter tags with appropriate icons and labels, helping users understand what filters are currently active in their signal search. The component handles various filter types including sources, journalists, locations, and exclusions.

## Component Type
**Client Component** - Uses the `'use client'` directive (implied by React hooks usage) because it:
- Uses `useMemo` hooks for computed values
- Manages conditional rendering based on loading states
- Integrates with TanStack Query for data fetching

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `signalArticlesQuery` | `Partial<ComplexAllEndpointQuery>` | Yes | Query parameters object containing filter criteria for signal articles |
| `showReprints` | `boolean` | Yes | Flag indicating whether to include reprints in the filter display |

## Usage Example

```tsx
import { SignalFilters } from '@/components/signals/preview/signal-filters';

function SignalPreview() {
  const query = {
    sources: ['source-1', 'source-2'],
    locations: ['New York', 'London'],
    journalists: ['journalist-id-1'],
    languages: ['en', 'es']
  };

  return (
    <div className="signal-preview">
      <SignalFilters 
        signalArticlesQuery={query}
        showReprints={true}
      />
      {/* Other signal preview content */}
    </div>
  );
}
```

## Functionality

### Core Features
- **Filter Visualization**: Displays active filters as styled tags with icons
- **Dynamic Mapping**: Converts complex query objects into user-friendly filter representations
- **Journalist Resolution**: Fetches and displays journalist names instead of IDs
- **Empty State Handling**: Automatically hides when no meaningful filters are active
- **Icon Association**: Maps each filter type to an appropriate visual icon

### Filter Types Supported
- Sources (Global icon)
- Source Groups (Links icon)
- Source Locations (Building icon)
- Languages (Translate icon)
- Locations (Map Pin icon)
- Labels (File List icon)
- Journalists (Quill Pen icon)
- Categories (Function icon)
- Excluded items (Forbid icon)

## State Management

### TanStack Query Integration
```tsx
const { data: journalists, isFetching: isFetchingJournalists } = useJournalists(
  { id: filters.journalists },
  { enabled: filters.journalists.length > 0 }
);
```

### Local Computed State
- `filters`: Memoized transformation of query parameters
- `groupedFilters`: Processed filter data with labels and values
- `isFiltersEmpty`: Boolean indicating if any meaningful filters exist

## Side Effects

### API Interactions
- **Journalist Data Fetching**: Conditionally fetches journalist details when journalist IDs are present in filters
- **Optimized Loading**: Only triggers journalist queries when journalist filters exist

### Performance Optimizations
- Memoized filter transformations to prevent unnecessary recalculations
- Conditional rendering to avoid empty filter displays
- Efficient re-computation based on dependency changes

## Dependencies

### Hooks
- `useJournalists` - Custom query hook for fetching journalist data
- `useMemo` - React hook for memoization

### Utilities
- `mapComplexAllEndpointQueryToFilters` - Transforms query objects to filter format
- `cva` (class-variance-authority) - For consistent icon styling

### UI Components
- `Typography` - Text rendering with consistent styling
- Various Phosphor icons for filter type representation

### Types
- `ComplexAllEndpointQuery` - Type definition for query parameters
- `ExcludedFilterItem` - Type for excluded filter items

## Integration

### Application Architecture Role
- **Signal Management**: Core component in the signal preview system
- **Filter System**: Visual layer for the broader filtering architecture
- **Data Layer Integration**: Bridges query parameters with user interface
- **Search Experience**: Enhances user understanding of active search criteria

### Component Relationships
- Used within signal preview interfaces
- Integrates with search and filtering systems
- Depends on journalist management services
- Utilizes shared UI component library

## Best Practices

### Architecture Adherence
✅ **State Management**: Properly uses TanStack Query for server state (journalists)  
✅ **Component Decomposition**: Well-separated concerns with `FilterItem` and `FilterIcon` sub-components  
✅ **Performance**: Implements memoization for expensive computations  
✅ **Conditional Rendering**: Gracefully handles loading and empty states  

### Code Quality
✅ **Type Safety**: Comprehensive TypeScript interfaces and type checking  
✅ **Reusability**: Modular design with reusable filter icon system  
✅ **Accessibility**: Uses semantic HTML structure and proper icon implementations  
✅ **Maintainability**: Clear separation of concerns and logical component organization  

### Integration Patterns
✅ **Query Optimization**: Conditional data fetching based on actual needs  
✅ **Error Handling**: Graceful degradation when data is unavailable  
✅ **Responsive Design**: Flexible layout that adapts to content  
✅ **Consistent Styling**: Uses design system components and utilities