# SavedFiltersCardList

## Purpose

A specialized list renderer component that displays individual saved filter items in card format. This component serves as a bridge between TanStack Table's row rendering system and the card-based UI presentation of saved filters in the search customization settings.

## Component Type

**Server Component** - This is a presentational component that doesn't require client-side interactivity, browser APIs, or event handlers. It simply renders data passed through props, making it suitable for server-side rendering.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `row` | `Row<SavedFilter>` | Yes | TanStack Table row object containing the saved filter data and table metadata |

### Type Definitions

```tsx
// From @tanstack/react-table
interface Row<SavedFilter> {
  original: SavedFilter;
  // ... other TanStack Table row properties
}

// From @/lib/types
interface SavedFilter {
  // Saved filter properties (exact structure depends on your type definition)
  id: string;
  name: string;
  filters: FilterCriteria[];
  // ... other filter properties
}
```

## Usage Example

```tsx
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { SavedFiltersCardList } from '@/components/settings/search-customization/saved-filters-list/saved-filters-card-list';

// Within a table component or saved filters management page
function SavedFiltersTable() {
  const savedFilters = useSavedFilters(); // Custom hook to fetch saved filters
  
  const table = useReactTable({
    data: savedFilters,
    columns: [
      {
        id: 'savedFilter',
        cell: ({ row }) => <SavedFiltersCardList {...row} />
      }
    ],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="saved-filters-grid">
      {table.getRowModel().rows.map(row => (
        <div key={row.id}>
          {row.getVisibleCells().map(cell => (
            <div key={cell.id}>
              {cell.renderValue()}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// Alternative usage in a custom list renderer
function CustomSavedFiltersList({ savedFilters }: { savedFilters: SavedFilter[] }) {
  return (
    <div className="filters-list">
      {savedFilters.map(filter => (
        <SavedFiltersCardList 
          key={filter.id}
          row={{
            original: filter,
            // ... other required row properties
          } as Row<SavedFilter>}
        />
      ))}
    </div>
  );
}
```

## Functionality

- **Row-to-Card Rendering**: Transforms TanStack Table row data into card-based UI presentation
- **Data Extraction**: Extracts the original saved filter data from the table row object
- **Component Delegation**: Delegates actual rendering to the `SavedFilterCard` component
- **Type Safety**: Ensures type-safe handling of saved filter data through the table system

## State Management

**No Direct State Management** - This component is purely presentational and doesn't manage any state directly. It relies on:
- Parent components to manage the table state via TanStack Table
- The `SavedFilterCard` component to handle any card-specific state or interactions
- Higher-level components to manage saved filters data through TanStack Query

## Side Effects

**None** - This component has no side effects. It's a pure presentational component that:
- Doesn't make API calls
- Doesn't interact with browser APIs
- Doesn't perform any asynchronous operations
- Simply passes data through to child components

## Dependencies

### Internal Dependencies
- `SavedFilterCard` - The actual card component that renders the saved filter UI
- `@/lib/types` - Type definitions for `SavedFilter`

### External Dependencies
- `@tanstack/react-table` - For the `Row` type interface
- `React` - Core React functionality

### Component Hierarchy
```
SavedFiltersCardList
└── SavedFilterCard
    └── [Card UI components and interactions]
```

## Integration

### Application Architecture Role
- **Settings Layer**: Part of the search customization settings section
- **List Rendering**: Serves as a rendering adapter between table data structures and card UI
- **Component Bridge**: Connects TanStack Table's data management with custom card presentations

### Data Flow
```
Table Data → SavedFiltersCardList → SavedFilterCard → UI Presentation
```

### File Structure Integration
```
src/components/settings/search-customization/saved-filters-list/
├── saved-filters-card-list.tsx (this component)
├── saved-filters-card.tsx
└── index.ts
```

## Best Practices

### Architecture Adherence
✅ **Server Component**: Correctly implemented as a server component since no client-side features are needed

✅ **Component Decomposition**: Follows the "Lego block" pattern by being a small, focused component that delegates to specialized child components

✅ **Flat Structure**: Maintains flat component hierarchy by directly rendering `SavedFilterCard` without unnecessary nesting

✅ **Single Responsibility**: Has one clear purpose - rendering table rows as cards

### Recommended Patterns

```tsx
// Good: Clean delegation pattern
export function SavedFiltersCardList(row: Row<SavedFilter>) {
  return <SavedFilterCard savedFilter={row.original} />;
}

// Good: Type-safe prop spreading if needed
export function SavedFiltersCardList(row: Row<SavedFilter>) {
  return (
    <SavedFilterCard 
      savedFilter={row.original}
      onEdit={() => {/* handled by parent */}}
      onDelete={() => {/* handled by parent */}}
    />
  );
}
```

### Integration Considerations
- Ensure parent components handle saved filter mutations through TanStack Query
- Let `SavedFilterCard` handle user interactions and bubble events up
- Maintain consistent styling with other card-based lists in the application
- Consider implementing virtualization for large lists of saved filters