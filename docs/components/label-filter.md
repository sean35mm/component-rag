# LabelFilter Component

## Purpose

The `LabelFilter` component provides a filtering interface for content labels in a drawer-based filter system. It displays a list of available content type labels with checkboxes for inclusion/exclusion filtering, allowing users to refine content based on labels like article types, categories, or content classifications. The component integrates with a broader filtering system to enable sophisticated content discovery.

## Component Type

**Client Component** - Uses the `'use client'` directive implicitly through:
- React hooks (`useCallback`, `useMemo`) for state management
- Interactive event handlers for checkbox changes
- Dynamic state updates for active filters and exclusions

This component requires client-side interactivity for real-time filter state management and user interactions.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `active` | `Set<LabelsFilters>` | Yes | Set of currently active/selected label filters |
| `onActiveChange` | `(items: Set<LabelsFilters>) => void` | Yes | Callback fired when active filters change |
| `excludedItems` | `ExcludedFilterItem[]` | Yes | Array of items that are explicitly excluded from filtering |
| `onExcludedItemsChange` | `(items: ExcludedFilterItem[]) => void` | Yes | Callback fired when excluded items change |
| `disabled` | `boolean` | No | Whether the entire filter component is disabled |

## Usage Example

```tsx
import { useState } from 'react';
import { LabelFilter } from '@/components/filters/filters-drawer/label-filter';
import { LabelsFilters, ExcludedFilterItem } from '@/lib/types';

function ContentFilters() {
  const [activeLabels, setActiveLabels] = useState<Set<LabelsFilters>>(
    new Set([LabelsFilters.Article, LabelsFilters.Tutorial])
  );
  const [excludedItems, setExcludedItems] = useState<ExcludedFilterItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="filters-container">
      <LabelFilter
        active={activeLabels}
        onActiveChange={setActiveLabels}
        excludedItems={excludedItems}
        onExcludedItemsChange={setExcludedItems}
        disabled={isLoading}
      />
    </div>
  );
}
```

## Functionality

### Core Features
- **Multi-select Filtering**: Allows selection of multiple label filters simultaneously
- **Inclusion/Exclusion Logic**: Supports both positive (include) and negative (exclude) filtering
- **Dynamic Counter**: Shows count of active filters in the accordion header
- **Tooltip Support**: Displays helpful tooltips for each label option
- **State Persistence**: Maintains filter state across component re-renders

### Filter Operations
- **Add Filter**: Click checkbox to include a label in active filters
- **Remove Filter**: Uncheck to remove label from active filters
- **Exclude Filter**: Use exclusion toggle to explicitly exclude content with specific labels
- **Clear Exclusions**: Remove items from exclusion list to restore normal filtering

### UI Behaviors
- Accordion-style collapsible interface with icon and description
- Visual indicators for active filters (counter badge)
- Disabled state support for loading or readonly scenarios
- Contextual tooltips from `LABELS_TOOLTIPS` constant

## State Management

**Local State Management**: Uses React's built-in state management patterns:

- **Props-based State**: Receives state from parent components via `active` and `excludedItems` props
- **Controlled Component Pattern**: All state changes flow through parent-provided callbacks
- **Memoized Computations**: Uses `useMemo` for derived state (items array) to optimize re-renders
- **Optimized Callbacks**: Uses `useCallback` for event handlers to prevent unnecessary re-renders

The component follows a controlled component pattern where the parent manages the actual filter state, making it easy to integrate with global state management solutions like Zustand or TanStack Query at higher levels.

## Side Effects

### State Mutations
- **Set Operations**: Creates new Set instances for immutable state updates
- **Array Operations**: Modifies excluded items array through filtering and concatenation
- **Callback Execution**: Triggers parent callbacks for state synchronization

### No External Side Effects
- No direct API calls or data fetching
- No localStorage or sessionStorage interactions
- No URL parameter management (handled by parent components)

## Dependencies

### Internal Components
- `FiltersDrawerAccordionList`: Core UI component for accordion-style filter lists
- `PiFileList3Line`: Icon component for visual representation

### Type Definitions
- `LabelsFilters`: Enum defining available label filter options
- `ExcludedFilterItem` & `ExcludedFilterItemType`: Types for exclusion functionality
- `LabelFilterProps`: Component prop interface

### Constants
- `LABELS_TOOLTIPS`: Mapping object providing tooltip text for each label

### React Hooks
- `useCallback`: Performance optimization for event handlers
- `useMemo`: Performance optimization for derived state

## Integration

### Filter System Architecture
The `LabelFilter` integrates into a larger filtering ecosystem:

```
FiltersDrawer
├── LabelFilter (content types)
├── CategoryFilter 
├── DateFilter
└── StatusFilter
```

### Data Flow Integration
1. **Parent State Management**: Receives filter state from parent drawer component
2. **Query Integration**: Filter changes propagate to search/query systems
3. **URL Synchronization**: Parent components sync filters with URL parameters
4. **Analytics Tracking**: Filter interactions can be tracked via parent callbacks

### API Integration Pattern
```tsx
// Typical integration with TanStack Query
function useContentFilters() {
  const [labelFilters, setLabelFilters] = useState<Set<LabelsFilters>>(new Set());
  
  const { data, isLoading } = useQuery({
    queryKey: ['content', { labels: Array.from(labelFilters) }],
    queryFn: () => fetchContent({ labels: labelFilters }),
  });

  return {
    labelFilters,
    setLabelFilters,
    isLoading,
  };
}
```

## Best Practices

### Architecture Adherence
- ✅ **Component Decomposition**: Single responsibility (label filtering only)
- ✅ **State Management**: Controlled component pattern with parent state ownership
- ✅ **Performance**: Proper memoization of expensive computations
- ✅ **Type Safety**: Comprehensive TypeScript interfaces and type usage

### Usage Recommendations
- **State Location**: Keep filter state in parent components or global state
- **Performance**: Use `useCallback` and `useMemo` when passing props down multiple levels
- **Accessibility**: Leverage `FiltersDrawerAccordionList` built-in accessibility features
- **Integration**: Combine with URL state synchronization for bookmarkable filters

### Common Patterns
```tsx
// Good: Controlled component with parent state
const [filters, setFilters] = useState<Set<LabelsFilters>>(new Set());

// Good: Integration with URL state
const [searchParams, setSearchParams] = useSearchParams();
const labelFilters = useMemo(() => 
  new Set(searchParams.getAll('labels') as LabelsFilters[]), 
  [searchParams]
);

// Good: Debounced filter application
const debouncedApplyFilters = useDebouncedCallback(applyFilters, 300);
```

The component exemplifies our architecture principles by maintaining clear separation of concerns, providing excellent reusability, and integrating seamlessly with both local and global state management patterns.