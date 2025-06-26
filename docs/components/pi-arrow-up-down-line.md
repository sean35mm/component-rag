# PiArrowUpDownLine Icon Component

## Purpose

The `PiArrowUpDownLine` component is an SVG icon that displays bidirectional arrows pointing up and down. This icon is typically used to indicate sorting functionality, vertical movement capabilities, or bidirectional data flow in user interfaces. It's part of the Phosphor Icons collection and serves as a visual indicator for interactive elements that support vertical sorting or reordering.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup. It has no client-side interactivity, state management, or browser APIs, making it suitable for server-side rendering by default.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including className, style, onClick, etc. Spread to the root SVG element |

### Inherited SVG Props
Common props you can pass include:
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `onMouseEnter/onMouseLeave` - Mouse event handlers
- `aria-label` - Accessibility label
- `role` - ARIA role

## Usage Example

```tsx
import { PiArrowUpDownLine } from '@/components/icons/pi/pi-arrow-up-down-line';

// Basic usage
export function DataTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>
            Name
            <PiArrowUpDownLine className="ml-2 inline-block" />
          </th>
          <th>
            Date
            <PiArrowUpDownLine className="ml-2 inline-block" />
          </th>
        </tr>
      </thead>
    </table>
  );
}

// Interactive sorting button
export function SortButton({ column, onSort }: { column: string; onSort: (column: string) => void }) {
  return (
    <button
      onClick={() => onSort(column)}
      className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded"
    >
      Sort by {column}
      <PiArrowUpDownLine className="w-4 h-4 text-gray-500" />
    </button>
  );
}

// With custom styling
export function CustomIcon() {
  return (
    <PiArrowUpDownLine
      className="text-blue-500 hover:text-blue-700 transition-colors"
      style={{ fontSize: '1.5rem' }}
      aria-label="Toggle sort direction"
    />
  );
}
```

## Functionality

### Core Features
- **Scalable Vector Graphics**: Renders crisp arrows at any size using SVG
- **CSS Integration**: Uses `currentColor` fill and `1em` sizing for seamless CSS integration
- **Accessibility Ready**: Accepts ARIA props for screen reader compatibility
- **Event Handling**: Supports all standard mouse and keyboard events
- **Customizable**: Fully styleable through className and style props

### Visual Design
- **ViewBox**: 20x20 coordinate system for precise positioning
- **Dual Arrows**: Shows both up and down arrows to indicate bidirectional capability
- **Consistent Styling**: Uses `#454545` fill color that can be overridden via CSS
- **Responsive Sizing**: Inherits font size for consistent scaling

## State Management

**No State Management** - This is a stateless presentational component. It doesn't manage any internal state, use TanStack Query, or Zustand. Any state related to sorting or interaction should be managed by parent components.

## Side Effects

**No Side Effects** - The component has no side effects, API calls, or external interactions. It's a pure rendering component that displays SVG markup based on props.

## Dependencies

### Internal Dependencies
- React's `SVGProps` type for proper TypeScript support

### External Dependencies
- None - This is a self-contained SVG component

### Related Components
- Other Phosphor Icons in the `/components/icons/pi/` directory
- Table/DataGrid components that might use this for sorting indicators
- Button components that might incorporate this icon

## Integration

### Application Architecture
```tsx
// Typical integration in a data table component
import { PiArrowUpDownLine } from '@/components/icons/pi/pi-arrow-up-down-line';
import { useSortableTable } from '@/hooks/useSortableTable';

export function UserTable() {
  const { sortColumn, sortDirection, handleSort } = useSortableTable();
  
  return (
    <table>
      <thead>
        <tr>
          <th>
            <button onClick={() => handleSort('name')}>
              Name <PiArrowUpDownLine className="ml-1" />
            </button>
          </th>
        </tr>
      </thead>
    </table>
  );
}
```

### Design System Integration
- Use consistent sizing with `className="w-4 h-4"` for standard icons
- Apply theme colors through CSS classes
- Maintain accessibility with proper ARIA labels

## Best Practices

### Architecture Compliance
✅ **Server Component**: Correctly implemented as a server component with no client-side dependencies  
✅ **Component Decomposition**: Simple, focused component that does one thing well  
✅ **Reusability**: Placed in appropriate icon directory structure for easy reuse  
✅ **Props Interface**: Uses standard React patterns with proper TypeScript support  

### Usage Recommendations
- **Accessibility**: Always provide `aria-label` when used in interactive contexts
- **Sizing**: Use CSS classes or font-size for consistent scaling
- **Color**: Leverage `currentColor` by setting text color on parent elements
- **Performance**: Component is lightweight and suitable for frequent use in tables/lists

### Integration Patterns
```tsx
// ✅ Good: Proper accessibility and styling
<button aria-label="Sort by name">
  <PiArrowUpDownLine className="w-4 h-4 text-gray-600" />
</button>

// ✅ Good: Responsive sizing
<PiArrowUpDownLine style={{ fontSize: 'inherit' }} />

// ❌ Avoid: Hardcoded dimensions that don't scale
<PiArrowUpDownLine width="16" height="16" />
```