# CategoryFilter Component

## Purpose

The `CategoryFilter` component provides a category-based filtering interface within a filters drawer. It displays available categories as a collapsible accordion list with checkboxes, allowing users to select/deselect multiple categories to filter content. The component includes a counter badge showing the number of active filters and uses a function icon to represent the category filtering concept.

## Component Type

**Client Component** - This component uses the `'use client'` directive (implicit) because it:
- Manages interactive state through checkbox selections
- Handles user click events and state updates
- Uses React hooks (`useCallback`, `useMemo`) for performance optimization
- Requires client-side interactivity for the accordion and checkbox functionality

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `active` | `Set<CategoriesFilters>` | Yes | Set of currently selected category filters |
| `onActiveChange` | `(items: Set<CategoriesFilters>) => void` | Yes | Callback function called when the selection changes, receives the updated Set of active categories |

## Usage Example

```tsx
import { useState } from 'react';
import { CategoryFilter } from '@/components/filters/filters-drawer/category-filter';
import { CategoriesFilters } from '@/lib/types';

function FiltersDrawer() {
  const [activeCategories, setActiveCategories] = useState<Set<CategoriesFilters>>(
    new Set([CategoriesFilters.TECHNOLOGY, CategoriesFilters.DESIGN])
  );

  const handleCategoryChange = (categories: Set<CategoriesFilters>) => {
    setActiveCategories(categories);
    // Apply filters to your data/search
    applyFilters({ categories: Array.from(categories) });
  };

  return (
    <div className="filters-drawer">
      <CategoryFilter
        active={activeCategories}
        onActiveChange={handleCategoryChange}
      />
      {/* Other filter components */}
    </div>
  );
}
```

## Functionality

- **Category Selection**: Renders all available categories from `CategoriesFilters` enum as checkable items
- **Multi-Selection**: Supports selecting multiple categories simultaneously using Set data structure
- **Visual Feedback**: Shows active filter count in a counter badge when categories are selected
- **Alphabetical Sorting**: Automatically sorts categories alphabetically for consistent display
- **Accordion Interface**: Implements collapsible accordion pattern for space-efficient UI
- **State Synchronization**: Maintains checkbox states in sync with the active Set
- **Immutable Updates**: Creates new Set instances for state updates to ensure proper re-rendering

## State Management

**Local State Management** - The component follows a controlled component pattern:
- Receives current state via `active` prop from parent component
- Delegates state updates to parent through `onActiveChange` callback
- Uses `useMemo` to optimize item list generation and prevent unnecessary re-renders
- Uses `useCallback` to memoize the change handler and prevent child re-renders
- No internal state management - all state is lifted up to parent components

## Side Effects

**No Direct Side Effects** - This component is purely presentational for filter selection:
- Does not make API calls or external requests
- Does not directly modify external data sources
- State changes trigger parent callbacks which may cause side effects
- Parent components typically handle applying filters to data queries or search results

## Dependencies

### Internal Dependencies
- `@/components/icons` - `PiFunctionLine` icon for visual representation
- `@/components/ui/filters-drawer` - `FiltersDrawerAccordionList` base component
- `@/lib/types` - `CategoriesFilters` enum for available category options

### React Dependencies
- `useCallback` - Performance optimization for event handlers
- `useMemo` - Performance optimization for computed values

## Integration

### Application Architecture Role
- **Filter Layer**: Part of the filtering system within the application's search/browse functionality
- **Drawer Component**: Designed to work within a filters drawer or sidebar interface
- **Reusable Filter**: Can be integrated into any filtering interface that needs category selection
- **Type Safety**: Leverages TypeScript enums for compile-time safety of category values

### Common Integration Patterns
```tsx
// With search/query state management
const [filters, setFilters] = useFilters();

<CategoryFilter
  active={new Set(filters.categories)}
  onActiveChange={(categories) => 
    setFilters(prev => ({ ...prev, categories: Array.from(categories) }))
  }
/>

// With URL state synchronization
const [searchParams, setSearchParams] = useSearchParams();

<CategoryFilter
  active={new Set(searchParams.getAll('category'))}
  onActiveChange={(categories) => {
    const params = new URLSearchParams(searchParams);
    params.delete('category');
    categories.forEach(cat => params.append('category', cat));
    setSearchParams(params);
  }}
/>
```

## Best Practices

### Architecture Compliance
- ✅ **Controlled Component**: Follows controlled component pattern with lifted state
- ✅ **Single Responsibility**: Focused solely on category selection UI
- ✅ **Reusability**: Generic enough to be used in different filtering contexts
- ✅ **Performance**: Uses React optimization hooks appropriately
- ✅ **Type Safety**: Leverages TypeScript for compile-time safety

### Implementation Patterns
- ✅ **Immutable Updates**: Creates new Set instances instead of mutating existing ones
- ✅ **Consistent API**: Uses Set data structure for efficient lookup and uniqueness
- ✅ **Accessibility**: Delegates accessibility concerns to the base accordion component
- ✅ **Separation of Concerns**: UI logic separated from business logic (filtering application)

### Integration Recommendations
- Combine with URL state management for shareable filter states
- Integrate with debounced search to avoid excessive API calls
- Consider wrapping in error boundaries for robust filter experiences
- Use with React Query for optimistic updates and cache invalidation