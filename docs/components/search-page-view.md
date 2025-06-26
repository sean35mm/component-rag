# SearchPageView Component

## Purpose

The `SearchPageView` component serves as the main container and entry point for search functionality within the application. It orchestrates the search experience by setting up the necessary context providers with search metadata and filter state, then rendering the core search interface. This component acts as a bridge between route-level search data and the interactive search UI components.

## Component Type

**Client Component** - Uses the `'use client'` directive because it manages interactive state through context providers and handles dynamic filter transformations that require client-side processing. The component needs to provide reactive state management for search filters and user interactions.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `searchId` | `string` | Yes | Unique identifier for the current search session |
| `search` | `DeepSearchMetadata` | Yes | Complete search metadata including query parameters and configuration |
| `savedFilterPresetId` | `string` | No | ID of the currently selected saved filter preset |
| `onChangeSavedFilterId` | `(id?: string) => void` | Yes | Callback function triggered when the saved filter selection changes |

## Usage Example

```tsx
import { SearchPageView } from '@/components/search/search-page-view';
import { DeepSearchMetadata } from '@/lib/types';

function SearchPage() {
  const [savedFilterId, setSavedFilterId] = useState<string>();
  
  const searchMetadata: DeepSearchMetadata = {
    id: 'search-123',
    query: {
      articlesQuery: {
        query: { /* complex query object */ },
        showReprints: false
      }
    },
    // ... other metadata
  };

  return (
    <SearchPageView
      searchId="search-123"
      search={searchMetadata}
      savedFilterPresetId={savedFilterId}
      onChangeSavedFilterId={setSavedFilterId}
    />
  );
}
```

## Functionality

- **Context Setup**: Initializes `ExploreStoreProvider` and `FiltersDrawerStoreProvider` with appropriate search and filter data
- **Filter Transformation**: Converts complex search queries into filter format using `mapComplexAllEndpointQueryToFilters`
- **State Coordination**: Manages the relationship between saved filter presets and active search state
- **Search Orchestration**: Provides the foundational setup for the entire search experience

## State Management

- **Context Providers**: Uses Zustand-based context providers (`ExploreStoreProvider`, `FiltersDrawerStoreProvider`) for managing search and filter state
- **Memoized Computation**: Employs `useMemo` to optimize filter transformation from search query data
- **Callback Handling**: Manages saved filter state changes through prop callbacks to parent components

## Side Effects

- **Filter Derivation**: Transforms search query data into filter state during component initialization
- **State Propagation**: Updates parent component state when saved filter selections change
- **Context Initialization**: Sets up reactive state stores that child components will subscribe to

## Dependencies

### Components
- `SearchScreen` - The main search interface component
- `ExploreStoreProvider` - Context provider for search-related state
- `FiltersDrawerStoreProvider` - Context provider for filter management

### Utilities
- `mapComplexAllEndpointQueryToFilters` - Transforms API query format to UI filter format

### Types
- `DeepSearchMetadata` - Type definition for comprehensive search data
- `SearchPageViewProps` - Component props interface

## Integration

The `SearchPageView` component fits into the application architecture as:

- **Route Integration**: Typically rendered by page components that receive search data from route parameters or server-side data fetching
- **State Bridge**: Connects server-provided search metadata with client-side interactive state management
- **Provider Layer**: Establishes the context layer that enables child components to access search and filter state
- **Feature Boundary**: Encapsulates the entire search feature within its provider hierarchy

## Best Practices

- **Component Decomposition**: Follows the flat composition pattern by wrapping a single main component (`SearchScreen`) rather than nesting multiple UI elements
- **State Management**: Properly uses Zustand context providers for complex state that needs to be shared across multiple child components
- **Performance Optimization**: Implements `useMemo` for expensive filter transformations to prevent unnecessary recalculations
- **Separation of Concerns**: Delegates actual search UI rendering to specialized components while focusing on state setup and coordination
- **Type Safety**: Leverages TypeScript interfaces for clear prop contracts and type-safe data flow

This component exemplifies the application's architecture by serving as a focused coordinator that sets up the necessary state infrastructure while delegating specific functionality to specialized child components.