# Table Component

## Purpose

The Table component provides a comprehensive table system with semantic HTML elements, styled with our design system. It includes wrapper styling, proper spacing, hover states, and dark mode support. The component is composed of multiple sub-components that work together to create accessible, responsive data tables.

## Props Interface

### Table

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | Additional CSS classes for the table element |
| `wrapperClassName` | `string` | No | Additional CSS classes for the wrapper div |
| `...props` | `React.HTMLAttributes<HTMLTableElement>` | No | Standard HTML table attributes |

### TableHeader, TableBody, TableFooter

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | Additional CSS classes |
| `...props` | `React.HTMLAttributes<HTMLTableSectionElement>` | No | Standard HTML table section attributes |

### TableRow

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | Additional CSS classes |
| `data-state` | `"selected"` | No | Selection state for styling |
| `...props` | `React.HTMLAttributes<HTMLTableRowElement>` | No | Standard HTML table row attributes |

### TableHead

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | Additional CSS classes |
| `...props` | `React.ThHTMLAttributes<HTMLTableCellElement>` | No | Standard HTML th attributes |

### TableCell

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | Additional CSS classes |
| `...props` | `React.TdHTMLAttributes<HTMLTableCellElement>` | No | Standard HTML td attributes |

### TableCaption

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | Additional CSS classes |
| `...props` | `React.HTMLAttributes<HTMLTableCaptionElement>` | No | Standard HTML caption attributes |

## Usage Example

```tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function UserTable() {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
  ];

  return (
    <Table className="border-pgStroke-200" wrapperClassName="bg-pgBackground-0">
      <TableCaption className="typography-paragraphSmall text-pgText-500">
        A list of users in the system
      </TableCaption>
      
      <TableHeader>
        <TableRow>
          <TableHead className="typography-labelMedium">Name</TableHead>
          <TableHead className="typography-labelMedium">Email</TableHead>
          <TableHead className="typography-labelMedium">Role</TableHead>
          <TableHead className="typography-labelMedium text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      
      <TableBody>
        {users.map((user) => (
          <TableRow 
            key={user.id}
            className="hover:bg-pgBackground-50"
            data-state={user.role === 'Admin' ? 'selected' : undefined}
          >
            <TableCell className="typography-paragraphMedium font-medium text-pgText-900">
              {user.name}
            </TableCell>
            <TableCell className="typography-paragraphMedium text-pgText-700">
              {user.email}
            </TableCell>
            <TableCell className="typography-paragraphMedium">
              <span className={`inline-flex items-center px-2 py-1 rounded-full typography-labelSmall ${
                user.role === 'Admin' 
                  ? 'bg-pgStateFeature-light text-pgStateFeature-dark' 
                  : 'bg-pgNeutral-100 text-pgNeutral-700'
              }`}>
                {user.role}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <button className="typography-labelSmall text-pgBlue-600 hover:text-pgBlue-800">
                Edit
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

## Design System Usage

### Typography Classes
- **Headers**: Uses `typography-paragraphXSmall` for table headers with muted text
- **Content**: Recommended to use `typography-paragraphMedium` for cell content
- **Labels**: Use `typography-labelMedium` and `typography-labelSmall` for headers and badges
- **Captions**: Use `typography-paragraphSmall` for table captions

### Color Tokens
- **Background Colors**: 
  - `bg-pgBackground-0` for main table background
  - `bg-pgBackground-50` for selected state
  - `bg-pgBackground-100` for hover state
  - `bg-alphaNeutral/16` for header background
- **Text Colors**:
  - `text-pgText-600` for headers
  - `text-pgText-900` for primary content
  - `text-pgText-700` for secondary content
- **Border Colors**: `border-pgStroke-200` for table borders
- **State Colors**: `bg-pgStateFeature-light` for status indicators

### Tailwind Utilities
- **Spacing**: `p-2`, `px-4`, `h-8`, `min-h-12`
- **Layout**: `w-full`, `relative`, `text-left`, `text-right`
- **Effects**: `shadow-sm`, `rounded-xl`, `transition-colors`

## Styling

### Available Variants

#### Table Wrapper
- Default: Rounded corners with border and shadow
- Custom: Override with `wrapperClassName` prop

#### Row States
- **Default**: Standard row styling with hover effect
- **Selected**: Apply `data-state="selected"` for selected styling
- **Hover**: Automatic hover state with background color change

#### Header Styling
- Semi-transparent background with neutral overlay
- Smaller typography for headers
- Left-aligned by default

#### Cell Styling
- Minimum height of 48px (min-h-12)
- Responsive padding
- Special handling for checkbox columns

## Responsive Design

The Table component adapts across breakpoints:

- **Mobile (< 640px)**: 
  - Full width with horizontal scroll
  - Reduced padding on cells
  - Checkbox columns get full padding

- **Desktop (lg+)**:
  - Checkbox columns remove right padding for better alignment
  - Standard spacing maintained

```tsx
// Responsive example
<Table className="text-sm md:text-base">
  <TableCell className="px-2 md:px-4 py-1 md:py-2">
    Responsive content
  </TableCell>
</Table>
```

## Accessibility

### Semantic HTML
- Uses proper table elements (`<table>`, `<thead>`, `<tbody>`, etc.)
- Supports `<caption>` for table descriptions
- Maintains proper heading hierarchy

### ARIA Support
- Built-in support for `role="checkbox"` in cells
- Proper table structure for screen readers
- Selection states communicated through `data-state`

### Keyboard Navigation
- Standard table keyboard navigation
- Focus management for interactive elements
- Proper tab order maintained

### Screen Reader Support
```tsx
<Table>
  <TableCaption className="sr-only">
    User management table with 3 users
  </TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead scope="col">Name</TableHead>
      <TableHead scope="col">Email</TableHead>
    </TableRow>
  </TableHeader>
</Table>
```

## Dependencies

### Internal Dependencies
- `@/lib/utils/cn` - Class name utility for conditional styling
- Design system color tokens and typography classes from `globals.css`

### External Dependencies
- `React` - Core React functionality and forwardRef
- `Tailwind CSS` - Utility classes for styling

### Related Components
- Form components for inline editing
- Button components for actions
- Badge/Chip components for status indicators
- Pagination components for large datasets
- Loading/Skeleton components for data fetching states

### Usage with Other Components
```tsx
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

<TableCell>
  <Badge variant="outline" className="bg-pgStateSuccess-light">
    Active
  </Badge>
</TableCell>
<TableCell>
  <Button variant="ghost" size="sm" className="text-pgBlue-600">
    Edit
  </Button>
</TableCell>
```