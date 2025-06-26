# PiFilter2Line Icon Component

## Purpose

The `PiFilter2Line` component is a React icon component that renders a filter icon in SVG format. It displays a funnel-shaped filter symbol commonly used to indicate filtering functionality in user interfaces, such as table filters, search filters, or data sorting controls.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | All standard SVG element props including `className`, `style`, `onClick`, `width`, `height`, etc. |

### Common SVG Props
- `className`: CSS classes for styling
- `style`: Inline styles
- `onClick`: Click event handler
- `onMouseEnter/onMouseLeave`: Mouse event handlers
- `aria-label`: Accessibility label
- `role`: ARIA role attribute

## Usage Example

```tsx
import { PiFilter2Line } from '@/components/icons/pi/pi-filter-2-line';

// Basic usage
export function FilterButton() {
  return (
    <button className="flex items-center gap-2 px-3 py-2 border rounded">
      <PiFilter2Line />
      Filter
    </button>
  );
}

// With custom styling
export function TableFilter() {
  return (
    <div className="flex items-center">
      <PiFilter2Line 
        className="w-4 h-4 text-gray-500 hover:text-gray-700" 
        aria-label="Filter table data"
      />
    </div>
  );
}

// With click handler
export function InteractiveFilter({ onFilterClick }: { onFilterClick: () => void }) {
  return (
    <PiFilter2Line 
      className="w-5 h-5 cursor-pointer text-blue-600"
      onClick={onFilterClick}
      role="button"
      aria-label="Open filter menu"
    />
  );
}

// In a data table header
export function DataTableHeader() {
  return (
    <th className="px-4 py-2">
      <div className="flex items-center justify-between">
        <span>Name</span>
        <PiFilter2Line className="w-4 h-4 text-gray-400" />
      </div>
    </th>
  );
}
```

## Functionality

- **SVG Icon Rendering**: Displays a clean, scalable filter icon using SVG paths
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent
- **Accessibility Ready**: Accepts ARIA attributes for screen reader support
- **Event Handling**: Supports all standard mouse and keyboard events
- **Customizable**: Accepts all SVG props for flexible styling and behavior

## State Management

**No State Management** - This is a stateless presentational component that doesn't require any state management. It simply renders SVG markup based on the props passed to it.

## Side Effects

**No Side Effects** - This component is purely functional with no side effects, API calls, or external interactions. It only renders SVG content.

## Dependencies

### Internal Dependencies
- `SVGProps` from React for TypeScript prop definitions

### External Dependencies
- React (for SVGProps type)

## Integration

The `PiFilter2Line` component integrates into the application's icon system and UI components:

### Icon System Integration
```tsx
// Part of a larger icon library
import { PiFilter2Line } from '@/components/icons/pi/pi-filter-2-line';
import { PiSearchLine } from '@/components/icons/pi/pi-search-line';
import { PiSortLine } from '@/components/icons/pi/pi-sort-line';
```

### UI Component Integration
```tsx
// Used in reusable UI components
import { PiFilter2Line } from '@/components/icons/pi/pi-filter-2-line';

export function FilterDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <PiFilter2Line className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      {/* Dropdown content */}
    </DropdownMenu>
  );
}
```

### Feature Component Integration
```tsx
// Used in domain-specific components
import { PiFilter2Line } from '@/components/icons/pi/pi-filter-2-line';

export function ProductListFilters() {
  return (
    <div className="flex items-center gap-4">
      <PiFilter2Line className="w-5 h-5" />
      <span>Filter Products</span>
    </div>
  );
}
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: Correctly implemented as a server component since it has no client-side interactivity
- ✅ **Component Decomposition**: Simple, single-purpose component that can be easily composed with other components
- ✅ **Flat Structure**: No unnecessary nesting, straightforward SVG rendering
- ✅ **Reusability**: Highly reusable across different UI contexts

### Usage Guidelines
```tsx
// ✅ Good: Semantic usage with proper accessibility
<button aria-label="Filter results">
  <PiFilter2Line className="w-4 h-4" />
</button>

// ✅ Good: Consistent sizing using Tailwind classes
<PiFilter2Line className="w-5 h-5 text-gray-600" />

// ✅ Good: Color inheritance from parent
<div className="text-blue-600">
  <PiFilter2Line /> {/* Automatically blue */}
</div>

// ❌ Avoid: Hardcoded dimensions that don't scale
<PiFilter2Line width="20" height="20" />

// ❌ Avoid: Missing accessibility for interactive usage
<PiFilter2Line onClick={handleClick} /> {/* Missing role/aria-label */}
```

### Performance Considerations
- Lightweight SVG with minimal DOM impact
- No JavaScript bundle size increase for client components
- Efficient re-rendering due to no internal state
- Optimal for server-side rendering