# ApiKeyCardList Component

## Purpose

The `ApiKeyCardList` component serves as a row renderer for displaying API key data in a card format within a table structure. It acts as an adapter between TanStack Table's row data and the `ApiKeyCard` presentation component, specifically designed for rendering individual API key entries in the developers' API key management interface.

## Component Type

**Server Component** - This component contains no client-side interactivity, event handlers, or state management. It purely transforms table row data into a card display format, making it suitable for server-side rendering to improve initial page load performance.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `row` | `Row<ApiKey>` | Yes | TanStack Table row object containing the API key data and table metadata. The `row.original` property contains the actual `ApiKey` object. |

## Usage Example

```tsx
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { ApiKeyCardList } from '@/components/developers/api-keys/api-key-card-list';
import { ApiKey } from '@/lib/types';

// Typical usage within a TanStack Table configuration
const apiKeys: ApiKey[] = [
  {
    id: 'ak_1234567890',
    name: 'Production API Key',
    key: 'sk_live_...',
    createdAt: '2024-01-15T10:30:00Z',
    lastUsed: '2024-01-20T14:22:00Z',
    permissions: ['read', 'write']
  }
];

const columns = [
  {
    id: 'card',
    cell: ({ row }) => <ApiKeyCardList {...row} />
  }
];

function ApiKeyTable() {
  const table = useReactTable({
    data: apiKeys,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4">
      {table.getRowModel().rows.map((row) => (
        <div key={row.id}>
          {row.getVisibleCells().map((cell) => 
            cell.column.id === 'card' ? cell.renderCell() : null
          )}
        </div>
      ))}
    </div>
  );
}
```

## Functionality

- **Data Transformation**: Extracts the raw `ApiKey` object from TanStack Table's row wrapper using `row.original`
- **Component Delegation**: Passes the extracted API key data to the `ApiKeyCard` component for rendering
- **Table Integration**: Seamlessly integrates with TanStack Table's rendering pipeline as a custom cell renderer

## State Management

**No State Management** - This component is stateless and relies entirely on props. It acts as a pure presenter component that transforms table row data without managing any internal state. Any state management for API keys would be handled at higher levels using TanStack Query for server state.

## Side Effects

**None** - The component performs no side effects, API calls, or external interactions. It's a pure function that transforms input props into JSX output.

## Dependencies

### Internal Dependencies
- `@/lib/types` - Imports the `ApiKey` type definition
- `./api-key-card` - Renders the actual API key card presentation

### External Dependencies
- `@tanstack/react-table` - Provides the `Row` type for table integration
- `react` - Core React library for component creation

## Integration

The `ApiKeyCardList` component fits into the application architecture as:

1. **Table Layer**: Integrates with TanStack Table as a custom cell renderer for card-based layouts
2. **Feature Domain**: Part of the developers/api-keys feature domain following domain-based component organization
3. **Presentation Bridge**: Connects table data structures with card-based UI components
4. **Developer Tools**: Supports the broader API key management interface in the developers section

```
┌─ Developers Dashboard
│  ├─ API Key Management
│  │  ├─ ApiKeyTable (TanStack Table)
│  │  │  └─ ApiKeyCardList (Row Renderer)
│  │  │     └─ ApiKeyCard (Presentation)
```

## Best Practices

✅ **Architectural Adherence**:
- **Server Component**: Correctly implemented as server component with no client-side features
- **Component Decomposition**: Follows flat composition by delegating rendering to `ApiKeyCard`
- **Domain Organization**: Properly placed in developers/api-keys feature domain
- **Single Responsibility**: Focused solely on row-to-card data transformation

✅ **Implementation Patterns**:
- **Pure Function**: No side effects or state mutations
- **Type Safety**: Leverages TypeScript with proper TanStack Table types
- **Prop Drilling Avoidance**: Directly extracts needed data from row object
- **Reusability**: Can be used in any table context requiring card-based API key display

✅ **Performance Considerations**:
- **Server Rendering**: Improves initial page load by rendering on server
- **Minimal Bundle**: No client-side JavaScript overhead
- **Efficient Re-renders**: Pure component that only re-renders when row data changes