# PiSortDesc Icon Component Documentation

## Purpose

The `PiSortDesc` component is a React SVG icon that represents descending sort functionality. It displays horizontal lines of decreasing length (longest to shortest) with a downward-pointing arrow, providing users with a clear visual indicator for descending sort operations in tables, lists, and data displays.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG content without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server side for optimal performance.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | `{}` | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

### Common SVG Props
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role
- `title` - Tooltip text

## Usage Example

```tsx
import { PiSortDesc } from '@/components/icons/pi/pi-sort-desc';

// Basic usage
export function DataTable() {
  return (
    <button className="flex items-center gap-2">
      Sort Descending
      <PiSortDesc className="w-4 h-4" />
    </button>
  );
}

// Interactive sort button
export function SortableHeader({ label, onSort, sortDirection }) {
  return (
    <button
      onClick={() => onSort('desc')}
      className={cn(
        "flex items-center gap-1 hover:text-blue-600",
        sortDirection === 'desc' && "text-blue-600"
      )}
      aria-label={`Sort ${label} in descending order`}
    >
      {label}
      <PiSortDesc 
        className={cn(
          "w-3 h-3 transition-opacity",
          sortDirection === 'desc' ? "opacity-100" : "opacity-50"
        )}
      />
    </button>
  );
}

// Table column header
export function TableHeader() {
  return (
    <th className="px-4 py-2">
      <div className="flex items-center justify-between">
        <span>Created Date</span>
        <div className="flex items-center gap-1">
          <PiSortDesc 
            className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer"
            onClick={() => handleSort('createdAt', 'desc')}
          />
        </div>
      </div>
    </th>
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisp at any size using SVG format
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Current Color**: Inherits text color from parent elements via `fill='currentColor'`
- **Accessibility Ready**: Accepts ARIA attributes for screen reader support
- **Event Handling**: Supports all standard DOM events through props spreading

### Visual Design
- Displays three horizontal lines decreasing in length from top to bottom
- Features a downward-pointing arrow on the right side
- Uses consistent spacing and alignment for professional appearance
- Follows design system patterns for sorting indicators

## State Management

**No State Management Required** - This is a stateless presentational component that relies entirely on props. Any state management for sort functionality should be handled by parent components using:

- **TanStack Query**: For server-side sorting with API calls
- **Zustand**: For complex client-side sort state across multiple components
- **Local State**: For simple component-level sort state

## Side Effects

**No Side Effects** - This component is purely functional with no:
- API calls
- Local storage access
- Browser API usage
- External service interactions

All interactions are handled through event props passed from parent components.

## Dependencies

### Internal Dependencies
- React's `SVGProps` type for TypeScript support

### External Dependencies
- None - completely self-contained

### Related Components
- Other sort icons (`PiSortAsc`, `PiSort`)
- Table components that use sorting
- Data display components with sort functionality

## Integration

### Application Architecture
```
├── Data Layer (TanStack Query)
│   └── Sort queries and mutations
├── State Layer (Zustand/Local State)
│   └── Sort direction and column state
├── Feature Components
│   └── DataTable, SortableList components
└── UI Components
    └── PiSortDesc (this component)
```

### Common Usage Patterns
1. **Table Headers**: Combined with column sorting logic
2. **Filter Controls**: Part of data filtering interfaces
3. **Search Results**: Indicating sort options for results
4. **Data Dashboards**: Sorting charts and data visualizations

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: Renders on server for optimal performance
- ✅ **Flat Component Structure**: No unnecessary nesting
- ✅ **Single Responsibility**: Only handles icon rendering
- ✅ **Prop Spreading**: Flexible integration with parent components

### Usage Guidelines
```tsx
// ✅ Good: Semantic usage with proper accessibility
<button aria-label="Sort by date descending">
  <PiSortDesc className="w-4 h-4" />
</button>

// ✅ Good: Responsive sizing
<PiSortDesc className="w-3 h-3 sm:w-4 sm:h-4" />

// ✅ Good: Color inheritance
<div className="text-blue-600">
  <PiSortDesc /> {/* Inherits blue color */}
</div>

// ❌ Avoid: Fixed dimensions that don't scale
<PiSortDesc style={{ width: '16px', height: '16px' }} />

// ❌ Avoid: Using without context
<PiSortDesc /> {/* No clear purpose or interaction */}
```

### Performance Considerations
- Use consistent sizing classes across the application
- Leverage CSS-in-JS libraries for dynamic styling when needed
- Consider icon bundling strategies for large applications
- Implement proper tree-shaking to minimize bundle size