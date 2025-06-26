# SourceGroupFilter Component

## Purpose

The `SourceGroupFilter` component provides a filterable list of source groups for search refinement. It displays pre-configured collections of sources (both system and user-defined) in an accordion-style interface with infinite scrolling, allowing users to quickly filter search results by selecting relevant source groups.

## Component Type

**Client Component** - Uses the `'use client'` directive because it manages interactive state (selection tracking), handles user interactions (checkbox changes), implements intersection observer for infinite scrolling, and uses effects for data fetching triggers.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `active` | `Set<SourceGroupsFilterType>` | Yes | Set of currently selected source group names |
| `onActiveChange` | `(items: Set<SourceGroupsFilterType>) => void` | Yes | Callback function called when the selection changes |

## Usage Example

```tsx
import { useState } from 'react';
import { SourceGroupFilter } from '@/components/filters/filters-drawer/source-group-filter';
import { SourceGroupsFilterType } from '@/lib/types';

function SearchFilters() {
  const [selectedSourceGroups, setSelectedSourceGroups] = useState<Set<SourceGroupsFilterType>>(
    new Set()
  );

  const handleSourceGroupChange = (newSelection: Set<SourceGroupsFilterType>) => {
    setSelectedSourceGroups(newSelection);
    // Apply filters to search results
    applySearchFilters({ sourceGroups: Array.from(newSelection) });
  };

  return (
    <div className="filters-panel">
      <SourceGroupFilter
        active={selectedSourceGroups}
        onActiveChange={handleSourceGroupChange}
      />
    </div>
  );
}
```

## Functionality

### Core Features

- **Infinite Scrolling**: Loads source groups in batches of 100 using intersection observer
- **Dual Category Display**: Separates system source groups from user-defined groups
- **Real-time Filtering**: Updates selection state immediately on checkbox interactions
- **Rich Tooltips**: Shows descriptions and source domains for each group
- **Loading States**: Displays loading indicators during data fetching
- **Selection Counter**: Shows count of active filters in the accordion header

### Key Behaviors

- Automatically fetches next page when user scrolls to bottom
- Filters system groups (no `organizationId`) and user groups (with `organizationId`)
- Maintains selection state across data updates
- Provides fallback display names and loading states

## State Management

### Local State
- `ref`: HTMLDivElement reference for intersection observer
- Uses React's `useState` for DOM reference management

### Server State
- **TanStack Query**: Uses `useSourceGroupsInfinite` hook for paginated source groups data
- **Data Selection**: Implements custom selector to flatten paginated results
- **Caching**: Leverages React Query's built-in caching and background updates

### External State
- **Props-based**: Receives active selections and change handler from parent
- **Controlled Component**: Parent manages the selection state

## Side Effects

### Data Fetching
```tsx
// Infinite scroll trigger
useEffect(() => {
  if (isIntersecting && !isInfiniteSourceGroupsFetching && hasNextSourceGroupsPage) {
    fetchNextSourceGroupsPage();
  }
}, [isIntersecting, isInfiniteSourceGroupsFetching, hasNextSourceGroupsPage, fetchNextSourceGroupsPage]);
```

### Intersection Observer
- Monitors scroll position to trigger next page loads
- Uses `@react-hook/intersection-observer` for efficient scroll detection

## Dependencies

### Hooks
- `useSourceGroupsInfinite`: Custom query hook for paginated source groups
- `useIntersectionObserver`: Scroll-based loading trigger

### UI Components
- `FiltersDrawerAccordionList`: Reusable accordion list component
- `PiLinksLine`: Icon from the icons library

### Types
- `SourceGroupsFilterType`: Type definition for source group identifiers
- `SourceGroupsResponse`: API response type for source groups data

## Integration

### Filters Architecture
```
FiltersDrawer
├── SourceGroupFilter (this component)
├── SourceFilter
├── DateRangeFilter
└── OtherFilters
```

### Data Flow
1. **Parent Component** → Passes active selections and change handler
2. **API Layer** → Fetches source groups via TanStack Query
3. **User Interaction** → Updates selection through callback
4. **Search System** → Applies selected source groups as search filters

### Search Integration
- Integrates with the broader search filtering system
- Selection changes trigger search result updates
- Maintains filter state across navigation

## Best Practices

### Architecture Compliance
- ✅ **Controlled Component**: Follows our state management patterns
- ✅ **TanStack Query**: Uses recommended server state management
- ✅ **Component Decomposition**: Leverages reusable UI components
- ✅ **Performance**: Implements efficient infinite scrolling

### Code Quality
- **Memoization**: Uses `useMemo` for expensive list transformations
- **Callback Optimization**: Uses `useCallback` for event handlers
- **Type Safety**: Fully typed props and internal state
- **Error Boundaries**: Graceful handling of loading and error states

### Reusability
- **Generic Props Interface**: Can be used with different selection types
- **Configurable Batch Size**: Exported `BATCH_SIZE` constant for customization
- **Flexible Styling**: Uses design system components for consistent appearance

## Exports

```tsx
export const BATCH_SIZE = 100;
export const SourceGroupFilter;
```

The `BATCH_SIZE` constant is exported for potential reuse in other infinite scrolling implementations.