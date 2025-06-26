# CustomFiltersDrawer

## Purpose

The `CustomFiltersDrawer` component provides a specialized interface for editing signal filters. It acts as a bridge between the generic filters drawer container and signal-specific filter operations, handling the application of custom filters to signal data through server state mutations.

## Component Type

**Client Component** - Uses the `useCallback` hook and manages interactive state mutations. The component handles user interactions and asynchronous operations that require client-side JavaScript execution.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `signalData` | `Signal` | Yes | The signal object containing current configuration and metadata needed for filter updates |

## Usage Example

```tsx
import { CustomFiltersDrawer } from '@/components/signals/details/edit-filters/custom-filters-drawer';
import { Signal } from '@/lib/types';

function SignalDetailsPage({ signal }: { signal: Signal }) {
  return (
    <div className="signal-details">
      <h1>{signal.name}</h1>
      
      {/* Other signal details */}
      
      <CustomFiltersDrawer signalData={signal} />
    </div>
  );
}

// Usage in a signal editing context
function EditSignalFilters() {
  const { data: signal } = useGetSignal(signalId);
  
  if (!signal) return <div>Loading...</div>;
  
  return (
    <div className="edit-filters-container">
      <CustomFiltersDrawer signalData={signal} />
    </div>
  );
}
```

## Functionality

- **Filter Application**: Processes and applies custom filter configurations to signal data
- **Signal Updates**: Handles server-side signal updates through optimized mutation operations
- **State Bridging**: Connects generic filter UI components with signal-specific business logic
- **Query Parameter Generation**: Transforms filter states into appropriate signal update parameters

## State Management

- **TanStack Query**: Uses `useUpdateSignal` mutation hook for server state management
- **No Local State**: Delegates filter state management to the `FiltersDrawerContainer` child component
- **Callback Optimization**: Implements `useCallback` for performance optimization of filter application handlers

## Side Effects

- **Signal Mutation**: Triggers server-side signal updates when filters are applied
- **API Calls**: Executes HTTP requests through the `updateSignal` mutation
- **State Invalidation**: Automatically invalidates related query cache entries upon successful updates

## Dependencies

### Components
- `FiltersDrawerContainer` - Generic filters drawer UI container component

### Hooks
- `useUpdateSignal` - TanStack Query mutation hook for signal updates
- `useCallback` - React optimization hook for stable callback references

### Utilities
- `getSignalUpdateQueryParams` - Utility function to transform signal data and filters into update parameters

### Types
- `FiltersState` - Type definition for filter configuration state
- `Signal` - Type definition for signal data structure

## Integration

The component integrates into the signals feature domain as part of the edit filters workflow:

```
signals/
├── details/
│   ├── edit-filters/
│   │   └── custom-filters-drawer.tsx  ← This component
│   └── signal-details-page.tsx
└── list/
```

**Architecture Flow**:
1. **Signal Details Page** → Renders `CustomFiltersDrawer` with signal data
2. **Custom Filters Drawer** → Wraps `FiltersDrawerContainer` with signal-specific logic
3. **Filters Container** → Handles filter UI and calls back to signal update logic
4. **Query Hook** → Manages server state and cache invalidation

## Best Practices

✅ **Follows Architecture Guidelines**:
- **Domain Organization**: Properly placed in signals feature directory
- **Component Decomposition**: Acts as a thin wrapper, delegating UI concerns to specialized components
- **State Management**: Correctly uses TanStack Query for server state mutations
- **Separation of Concerns**: Isolates signal-specific logic from generic filter UI

✅ **Performance Optimizations**:
- Uses `useCallback` to prevent unnecessary re-renders of child components
- Leverages TanStack Query's built-in caching and optimization features

✅ **Type Safety**:
- Strongly typed props interface with required `Signal` data
- Type-safe filter state handling through `FiltersState` interface

✅ **Reusability Pattern**:
- Composes reusable `FiltersDrawerContainer` with signal-specific behavior
- Maintains single responsibility while enabling flexible filter implementations