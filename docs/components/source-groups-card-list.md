# SourceGroupsCardList Component

## Purpose
The `SourceGroupsCardList` component serves as a render cell component for TanStack Table, transforming table row data into card-based presentation for source groups in the search customization settings. It acts as an adapter between the table's row structure and the card display format.

## Component Type
**Server Component** - This is a pure presentational component that doesn't require client-side interactivity, state management, or browser APIs. It simply transforms table row data into a card component, making it suitable for server-side rendering.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `row` | `Row<SourceGroup>` | Yes | TanStack Table row object containing the source group data and table utilities |

### Type Details
```tsx
// From @tanstack/react-table
interface Row<SourceGroup> {
  original: SourceGroup;
  // ... other TanStack Table row properties
}

// From @/lib/types
interface SourceGroup {
  // Source group properties (specific structure depends on your type definition)
}
```

## Usage Example

```tsx
import { ColumnDef } from '@tanstack/react-table';
import { SourceGroup } from '@/lib/types';
import { SourceGroupsCardList } from '@/components/settings/search-customization/source-groups-list/source-groups-card-list';

// In a table column definition
const columns: ColumnDef<SourceGroup>[] = [
  {
    id: 'card',
    cell: ({ row }) => <SourceGroupsCardList {...row} />,
  },
];

// Or used directly with a table row
function ExampleUsage() {
  const tableRow = useTableRow(); // Hypothetical hook to get table row
  
  return (
    <div className="source-groups-container">
      <SourceGroupsCardList {...tableRow} />
    </div>
  );
}
```

## Functionality
- **Data Transformation**: Extracts the original source group data from the TanStack Table row structure
- **Component Bridging**: Acts as a bridge between table row data and card presentation
- **Clean Abstraction**: Provides a clean interface for rendering source groups as cards within table contexts

## State Management
**No State Management** - This component is stateless and purely functional. It receives data through props and passes it down to the child component without managing any internal state.

## Side Effects
**No Side Effects** - The component performs no API calls, subscriptions, or other side effects. It's a pure rendering component that transforms props into JSX.

## Dependencies

### Internal Dependencies
- `SourceGroupCard` - The actual card component that renders the source group data
- `SourceGroup` type from `@/lib/types`

### External Dependencies
- `@tanstack/react-table` - For the `Row` type interface
- `React` - For component functionality

### Dependency Graph
```
SourceGroupsCardList
├── SourceGroupCard (renders the actual card)
├── @tanstack/react-table (Row type)
└── @/lib/types (SourceGroup type)
```

## Integration

### Application Architecture Role
```
Settings Page
├── Search Customization Section
    ├── Source Groups List (Table Container)
        ├── TanStack Table
            └── SourceGroupsCardList (Cell Renderer)
                └── SourceGroupCard (Actual Card)
```

### Table Integration Pattern
This component follows the TanStack Table cell renderer pattern:
- Receives a `Row<SourceGroup>` object from the table
- Extracts `row.original` to get the actual data
- Passes the data to a specialized presentation component

## Best Practices

### ✅ Architectural Compliance
- **Component Decomposition**: Acts as a thin adapter layer, delegating actual rendering to `SourceGroupCard`
- **Server Component**: Appropriately uses server component for pure data transformation
- **Single Responsibility**: Focused solely on bridging table row data to card presentation
- **Type Safety**: Properly typed with TanStack Table's `Row<T>` interface

### ✅ Design Patterns
- **Adapter Pattern**: Transforms table row structure into card component props
- **Composition**: Delegates rendering to specialized child components
- **Pure Function**: No side effects or state mutations

### ✅ Integration Guidelines
- **Table Cell Renderer**: Perfect example of a table cell renderer component
- **Data Flow**: Clear unidirectional data flow from table → adapter → card
- **Reusability**: Can be reused in any table context that displays source groups

### 📝 Usage Recommendations
1. Use this component specifically as a TanStack Table cell renderer
2. Ensure the table data structure includes `SourceGroup` objects
3. The actual card styling and interaction logic should remain in `SourceGroupCard`
4. Consider this pattern for other table-to-card transformations in the application