# useLoadingState Hook

## Purpose

The `useLoadingState` hook is a utility hook that aggregates multiple loading states and updates the global overview loading state in the explore store. It provides centralized loading state management for search components by determining if any of the provided loading states are active and updating the global state accordingly.

## Component Type

**Client Component** - This hook must run on the client side because it:
- Uses React hooks (`useEffect`)
- Manages client-side state through Zustand store
- Handles dynamic loading state aggregation

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `loadingStates` | `boolean[]` | ✅ | Array of boolean loading states to monitor and aggregate |

## Usage Example

```tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { useLoadingState } from '@/components/search/hooks/use-loading-states';

export function SearchResults() {
  // Multiple queries with individual loading states
  const { isLoading: isLoadingProjects } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  const { isLoading: isLoadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const { isLoading: isLoadingOrganizations } = useQuery({
    queryKey: ['organizations'],
    queryFn: fetchOrganizations,
  });

  // Aggregate all loading states
  useLoadingState([
    isLoadingProjects,
    isLoadingUsers,
    isLoadingOrganizations,
  ]);

  return (
    <div>
      {/* Component content */}
    </div>
  );
}
```

## Functionality

### Core Features

- **Loading State Aggregation**: Combines multiple boolean loading states into a single determination
- **Global State Updates**: Automatically updates the explore store's overview loading state
- **Reactive Updates**: Responds to changes in any of the provided loading states
- **Performance Optimized**: Uses dependency array to minimize unnecessary re-renders

### Behavior

1. **State Monitoring**: Watches all provided loading states for changes
2. **Aggregation Logic**: Uses `Array.some()` to determine if any state is loading
3. **Global Update**: Updates the explore store's `isLoadingOverview` state
4. **Automatic Cleanup**: Effect properly handles dependency changes

## State Management

### Zustand Integration

```tsx
// Accesses the explore store
const onSetIsLoadingOverview = useExploreStore(
  (state) => state.onSetIsLoadingOverview
);
```

- **Store**: Uses `useExploreStore` for global state management
- **State Type**: Client-side state management through Zustand
- **Scope**: Updates global overview loading state for the entire explore section

## Side Effects

### Primary Side Effect

- **Global State Update**: Modifies the explore store's loading state based on aggregated loading states

### Effect Dependencies

```tsx
useEffect(() => {
  const isLoading = loadingStates.some((state) => state);
  onSetIsLoadingOverview(isLoading);
}, [onSetIsLoadingOverview, loadingStates]);
```

- **Triggers**: Re-runs when `loadingStates` array or `onSetIsLoadingOverview` function changes
- **Cleanup**: Automatic cleanup through React's effect system

## Dependencies

### Internal Dependencies

- **Store**: `@/lib/contexts` - Accesses the explore store
- **React**: `useEffect` hook for side effect management

### External Dependencies

- **React**: Core React hooks
- **Zustand**: Underlying state management system (via explore store)

## Integration

### Application Architecture

```
Search Components
├── SearchResults
├── SearchFilters
├── SearchPagination
└── Hooks
    ├── useLoadingState ← Current component
    ├── useSearchQuery
    └── useSearchFilters
```

### Integration Points

1. **Search Components**: Used by search-related components to manage loading states
2. **Explore Store**: Updates global loading state for UI consistency
3. **Query States**: Typically used with TanStack Query loading states
4. **Loading UI**: Enables global loading indicators and overlays

## Best Practices

### Architecture Compliance

✅ **Single Responsibility**: Focused solely on loading state aggregation  
✅ **Proper State Management**: Uses Zustand for client state as per guidelines  
✅ **Hook Pattern**: Follows React hooks best practices  
✅ **Dependencies**: Minimal and focused dependencies  

### Usage Patterns

```tsx
// ✅ Good: Clear loading state sources
useLoadingState([
  isLoadingSearchResults,
  isLoadingFilters,
  isLoadingCategories,
]);

// ✅ Good: Dynamic loading states
const loadingStates = useMemo(() => [
  ...queryStates.map(q => q.isLoading),
  isProcessing,
], [queryStates, isProcessing]);

useLoadingState(loadingStates);

// ❌ Avoid: Static single states (use direct store access instead)
useLoadingState([false]);
```

### Performance Considerations

- **Memoization**: Consider memoizing complex loading state arrays
- **Dependency Optimization**: Ensure loading states array is stable when possible
- **Effect Efficiency**: Hook automatically optimizes re-renders through proper dependencies