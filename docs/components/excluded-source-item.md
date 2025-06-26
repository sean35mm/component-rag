# ExcludedSourceItem Component

## Purpose

The `ExcludedSourceItem` component renders a visual representation of an excluded source within a filter drawer interface. It displays source information with an icon, domain name, and provides click interaction to remove the source from the excluded list. This component is specifically designed for filter management UI where users can view and manage excluded sources.

## Component Type

**Client Component** - This component uses the `useSourceByDomain` hook which likely performs data fetching operations, requiring client-side rendering capabilities for React hooks and state management.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `domain` | `string` | ✅ | The domain string of the source to be displayed and excluded |
| `onClick` | `() => void` | ✅ | Callback function triggered when the item is clicked, typically to remove the exclusion |

## Usage Example

```tsx
import { ExcludedSourceItem } from '@/components/filters/filters-drawer/excluded-source-item';

// Within a filter drawer component
const FilterDrawer = () => {
  const excludedSources = ['example.com', 'news.site.com'];
  
  const handleRemoveExcludedSource = (domain: string) => {
    // Remove source from excluded list
    removeFromExcludedSources(domain);
  };

  return (
    <div className="filter-drawer">
      <h3>Excluded Sources</h3>
      {excludedSources.map((domain) => (
        <ExcludedSourceItem
          key={domain}
          domain={domain}
          onClick={() => handleRemoveExcludedSource(domain)}
        />
      ))}
    </div>
  );
};
```

## Functionality

- **Source Display**: Shows excluded source information with proper visual representation
- **Source Resolution**: Fetches additional source metadata based on the domain
- **Click Interaction**: Provides click handling to remove sources from exclusion list
- **Fallback Display**: Uses the provided domain as fallback when source data is unavailable
- **Consistent UI**: Maintains consistent styling through the base component pattern

## State Management

The component leverages **TanStack Query** through the `useSourceByDomain` hook for server state management:

- Fetches source metadata based on the provided domain
- Handles loading states and data caching automatically
- Provides fallback behavior when source data is not available
- No local state management required - relies on server state and prop drilling

## Side Effects

- **API Data Fetching**: The `useSourceByDomain` hook triggers API calls to fetch source information
- **Click Event Handling**: Executes the provided `onClick` callback when user interacts with the item
- **Dynamic Content Updates**: Re-renders when source data is fetched or updated

## Dependencies

### Components
- `SourceCitationItem` - UI component for displaying source icons/citations
- `ExcludedFilterListItemBase` - Base component providing consistent excluded item layout

### Hooks
- `useSourceByDomain` - Custom query hook for fetching source data by domain

### External Dependencies
- TanStack Query (via `useSourceByDomain` hook)
- React (implicit for component functionality)

## Integration

This component integrates into the larger application architecture as:

- **Filter Management System**: Part of the filters drawer UI for managing search/content filters
- **Source Management**: Connects to the broader source citation and management system
- **UI Component Layer**: Follows the established pattern of decomposed, reusable components
- **Data Layer Integration**: Seamlessly connects to the server state management layer via query hooks

## Best Practices

✅ **Follows Architecture Guidelines**:
- Uses TanStack Query for server state management
- Implements proper component decomposition with base components
- Maintains flat component structure rather than deep nesting
- Separates concerns between data fetching and UI presentation

✅ **Code Quality**:
- Well-defined TypeScript interfaces
- Proper prop destructuring
- Fallback handling for missing data
- Consistent naming conventions

✅ **Reusability**:
- Generic enough to work with any domain string
- Composable through props interface
- Leverages shared base components for consistency

✅ **Performance**:
- Utilizes TanStack Query caching mechanisms
- Minimal re-renders through proper state management
- Efficient data fetching patterns

The component exemplifies good React patterns by maintaining single responsibility, proper state management integration, and consistent UI composition following the established component architecture.