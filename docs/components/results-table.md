# Results Table Component

## Purpose

The `ResultsTable` component is a flexible, feature-rich data table component built on TanStack Table that provides sorting, pagination, row selection, and responsive mobile card layouts. It includes loading states, bulk actions, and supports both desktop table views and mobile card layouts for optimal user experience across devices.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `columns` | `ColumnDef<T>[]` | ✅ | - | TanStack Table column definitions |
| `data` | `T[]` | ✅ | - | Array of data objects to display |
| `count` | `number` | ✅ | - | Total number of items for pagination |
| `rowSelection` | `RowSelectionState` | ✅ | - | Current row selection state |
| `onRowSelectionChange` | `Required<RowSelectionOptions<T>>['onRowSelectionChange']` | ✅ | - | Callback for row selection changes |
| `perPage` | `number` | ❌ | `25` | Number of items per page |
| `isLoading` | `boolean` | ❌ | `false` | Shows loading skeleton when true |
| `onPageChange` | `(page: number) => void` | ❌ | - | Callback when page changes |
| `onSortChange` | `(sorting: SortingState) => void` | ❌ | - | Callback when sorting changes |
| `page` | `number` | ❌ | - | Current page number |
| `LoadSkeleton` | `FC` | ❌ | - | Custom loading skeleton component |
| `celsSize` | `string[]` | ❌ | - | Array of column widths |
| `enableSelection` | `boolean` | ❌ | `false` | Enables row selection with bulk actions |
| `onAddToSearch` | `(items: RowSelectionState) => void` | ❌ | - | Callback for "Add to Search" bulk action |
| `onExcludeFromSearch` | `(items: RowSelectionState) => void` | ❌ | - | Callback for "Exclude from Search" bulk action |
| `onRowClick` | `(row: Row<T>) => void` | ❌ | - | Callback when row is clicked |
| `disableHeaderRound` | `boolean` | ❌ | `false` | Disables rounded corners on header |
| `defaultSorting` | `SortingState` | ❌ | `[]` | Initial sorting state |
| `renderMobileTableCard` | `(data: T, row: Row<T>, handleExpand: Function) => ReactNode` | ❌ | - | Custom mobile card renderer |
| `classNames` | `object` | ❌ | - | Custom class names for table, body, and cell |
| `mobileCardPreview` | `ReactNode` | ❌ | - | Preview content for mobile loading state |
| `isDisablePagination` | `boolean` | ❌ | `false` | Disables pagination controls |

## Usage Example

```tsx
import { ResultsTable } from '@/components/ui/results-table';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <Typography variant="labelMedium" color="800">
        {row.getValue('name')}
      </Typography>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <Typography variant="paragraphSmall" color="600">
        {row.getValue('email')}
      </Typography>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <Badge 
          variant={status === 'active' ? 'success' : 'error'}
          className="capitalize"
        >
          {status}
        </Badge>
      );
    },
  },
];

export function UserTable() {
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'active'
    },
    // ... more users
  ]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [rowSelection, setRowSelection] = useState({});

  const handleAddToSearch = (selectedRows) => {
    console.log('Adding to search:', selectedRows);
  };

  const handleExcludeFromSearch = (selectedRows) => {
    console.log('Excluding from search:', selectedRows);
  };

  const renderMobileCard = (user: User, row, handleExpand) => (
    <div className="bg-pgBackground-0 border border-pgStroke-200 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <Typography variant="labelMedium" color="800">
          {user.name}
        </Typography>
        <Badge variant={user.status === 'active' ? 'success' : 'error'}>
          {user.status}
        </Badge>
      </div>
      <Typography variant="paragraphSmall" color="600">
        {user.email}
      </Typography>
      <Typography variant="paragraphXSmall" color="500">
        {user.role}
      </Typography>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="bg-pgBackground-0 border border-pgStroke-200 rounded-xl overflow-hidden">
        <ResultsTable
          columns={columns}
          data={users}
          count={users.length}
          page={currentPage}
          onPageChange={setCurrentPage}
          enableSelection
          onAddToSearch={handleAddToSearch}
          onExcludeFromSearch={handleExcludeFromSearch}
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
          renderMobileTableCard={renderMobileCard}
          classNames={{
            table: 'bg-pgBackground-0',
            cell: 'text-pgText-700'
          }}
        />
      </div>
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **Labels**: `.typography-labelSmall` - Used for action buttons and selected count
- **Paragraphs**: `.typography-paragraphSmall` - Used for pagination info and secondary text

### Color Tokens
- **Background**: `pgBackground-0`, `pgBackground-50` - Table and detail backgrounds
- **Text**: `pgText-700`, `pgText-800`, `pgIcon-600` - Various text hierarchies
- **Interactive**: `pgBlueVSGold` - Selection highlight color
- **Borders**: `pgStroke-200` - Table borders and separators

### Tailwind Utilities
- **Layout**: `flex`, `grid`, `hidden`, `block`, `table-row`, `table-header-group`
- **Spacing**: `gap-1`, `gap-2`, `gap-3`, `gap-4`, `gap-8`, `ml-3`, `ml-8`, `mt-4`, `mt-7`
- **Borders**: `border-none`, `border-b-0`, `rounded-xl`, `rounded-tl-none`, `rounded-tr-none`
- **Interactive**: `cursor-pointer`, `hover:text-pgIcon-600`, `select-none`

## Styling

### Variants
- **Desktop Table**: Full table layout with sortable headers
- **Mobile Cards**: Responsive card layout for mobile devices
- **Loading State**: Skeleton placeholders with shimmer effect

### States
- **Selected Rows**: Highlighted with `data-state="selected"`
- **Sorted Columns**: Bold text with `text-pgText-800` and `font-semibold`
- **Hover States**: Interactive elements with opacity transitions
- **Loading**: Skeleton components with consistent sizing

### Customization Options
```tsx
// Custom class names
classNames={{
  table: 'custom-table-styles',
  body: 'custom-body-styles', 
  cell: 'custom-cell-styles'
}}

// Custom column sizing
celsSize={['200px', '300px', '150px', '100px']}

// Disable rounded headers
disableHeaderRound={true}
```

## Responsive Design

### Breakpoints
- **Mobile (`< lg`)**: Card-based layout using `renderMobileTableCard`
- **Desktop (`≥ lg`)**: Traditional table layout with full features

### Mobile Adaptations
- Selection controls collapse on mobile (`max-h-0` to `max-h-8`)
- Table headers hidden on mobile (`hidden lg:table-header-group`)
- Mobile cards replace table rows (`hidden lg:table-row`)
- Pagination info hidden on mobile (`hidden lg:block`)

### Responsive Classes
```tsx
// Selection controls
className={cn(
  'flex items-center overflow-hidden pb-0 pl-0 transition-all lg:overflow-visible lg:pb-4 lg:pl-4',
  isMobile && 'max-h-0',
  isMobile && countSelected > 0 && 'max-h-8 pb-4'
)}

// Table visibility
className={cn(
  'cursor-pointer',
  renderMobileTableCard && 'hidden lg:table-row'
)}
```

## Accessibility

### ARIA Features
- **Role Buttons**: Selection actions use `role="button"`
- **Table Semantics**: Proper table structure with `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`
- **Keyboard Navigation**: Sortable headers support click and keyboard activation
- **Screen Reader Support**: Selection state communicated through table structure

### Interactive Elements
- **Clickable Rows**: Full row click targets with cursor pointer
- **Sort Controls**: Visual sort indicators with `PiArrowDownSFill` icons
- **Selection Controls**: Checkbox integration for row selection
- **Action Prevention**: `data-action="table-action"` prevents row click on interactive elements

### Focus Management
- Keyboard navigation through sortable headers
- Focus indicators on interactive elements
- Proper tab order through table structure

## Dependencies

### Internal Components
- `PaginationComponent` - Handles page navigation
- `Skeleton` - Loading state placeholders
- `Table`, `TableBody`, `TableCell`, `TableHead`, `TableHeader`, `TableRow` - Base table components
- `Typography` - Text rendering with design system styles

### External Dependencies
- `@tanstack/react-table` - Table functionality and state management
- `framer-motion` - Selection controls animation
- `react-collapsed` - Detail row expand/collapse functionality

### Hooks & Utilities
- `useBreakpoint` - Responsive breakpoint detection
- `cn` - Conditional class name utility
- Icons: `PiAddLine`, `PiArrowDownSFill`, `PiForbidLine` - Action and sort indicators

### Related Components
- Works with form components for filtering
- Integrates with modal components for row actions
- Compatible with badge components for status display