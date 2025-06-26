# PiFilterOffLine Icon Component

## Purpose

The `PiFilterOffLine` component is an SVG icon that represents a disabled or turned-off filter state. It visually communicates when filtering functionality is inactive or unavailable, typically used in data tables, search interfaces, or any feature where filtering can be toggled on/off. The icon includes a diagonal line overlay to indicate the "off" or "disabled" state.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, event handlers, or state management. It can be safely rendered on the server and hydrated on the client without any interactive requirements.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

### Common SVG Props
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role |

## Usage Example

```tsx
import { PiFilterOffLine } from '@/components/icons/pi/pi-filter-off-line';

// Basic usage
function DataTableHeader() {
  return (
    <div className="flex items-center gap-2">
      <h2>Products</h2>
      <PiFilterOffLine className="text-gray-400" />
      <span className="text-sm text-gray-500">Filters disabled</span>
    </div>
  );
}

// Interactive filter toggle
function FilterToggle({ isFilterActive, onToggle }: { 
  isFilterActive: boolean; 
  onToggle: () => void; 
}) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-3 py-2 rounded-md border"
      aria-label={isFilterActive ? "Disable filters" : "Enable filters"}
    >
      {isFilterActive ? (
        <PiFilterLine className="text-blue-600" />
      ) : (
        <PiFilterOffLine className="text-gray-400" />
      )}
      <span>{isFilterActive ? "Filters On" : "Filters Off"}</span>
    </button>
  );
}

// In a data table toolbar
function TableToolbar({ filterCount }: { filterCount: number }) {
  const hasActiveFilters = filterCount > 0;
  
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-3">
        <h3>Data Table</h3>
        {hasActiveFilters ? (
          <div className="flex items-center gap-1 text-blue-600">
            <PiFilterLine />
            <span className="text-sm">{filterCount} active</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-gray-400">
            <PiFilterOffLine />
            <span className="text-sm">No filters</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Accessibility-focused usage
function FilterStatus({ disabled }: { disabled: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <PiFilterOffLine 
        className={disabled ? "text-gray-300" : "text-gray-500"}
        aria-hidden="true"
      />
      <span className="sr-only">
        {disabled ? "Filter functionality is disabled" : "No filters applied"}
      </span>
    </div>
  );
}
```

## Functionality

### Core Features
- **SVG Rendering**: Renders a scalable vector icon representing a disabled filter
- **Responsive Sizing**: Uses `1em` dimensions to scale with font size
- **Color Inheritance**: Uses `currentColor` to inherit text color from parent
- **Accessibility Ready**: Accepts all ARIA attributes for screen readers
- **Customizable**: Supports all standard SVG props for styling and behavior

### Visual Characteristics
- **Dimensions**: 24x24 viewBox with 1em sizing
- **Style**: Outline/line style with diagonal "off" indicator
- **Fill**: Uses `currentColor` for easy theming
- **Design**: Consistent with Phosphor icon library design system

## State Management

**No State Management** - This is a stateless presentational component that doesn't manage any internal state. State related to filter status should be managed by parent components using:

- **TanStack Query**: For server-side filter state synchronization
- **Zustand**: For client-side filter UI state
- **Local State**: For simple toggle interactions

## Side Effects

**No Side Effects** - This component:
- ❌ Does not make API calls
- ❌ Does not perform any side effects
- ❌ Does not interact with external services
- ✅ Purely renders SVG markup based on props

## Dependencies

### Internal Dependencies
- React's `SVGProps` type for prop typing

### External Dependencies
- None - completely self-contained

### Related Components
- `PiFilterLine` - Active filter state icon
- `PiFilter` - Alternative filter icon variants
- Other Phosphor icon components in the `/icons/pi/` directory

## Integration

### Icon System Integration
```tsx
// Centralized icon exports
export { PiFilterOffLine } from './pi/pi-filter-off-line';

// Usage in feature components
import { PiFilterOffLine } from '@/components/icons';
```

### Component Library Integration
```tsx
// Filter-related components
import { PiFilterOffLine } from '@/components/icons/pi/pi-filter-off-line';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';

function FilterableTable() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Button variant="outline" size="sm">
          <PiFilterOffLine className="mr-2" />
          Clear Filters
        </Button>
      </div>
      <DataTable />
    </div>
  );
}
```

### Design System Integration
- Follows design system spacing and sizing conventions
- Integrates with theme color tokens via `currentColor`
- Maintains consistency with other UI components

## Best Practices

### Architecture Adherence
✅ **Server Component**: Correctly implemented as server component
✅ **Flat Structure**: Simple, non-nested component structure
✅ **Reusable**: Generic icon component usable across domains
✅ **Type Safe**: Proper TypeScript integration with SVGProps

### Usage Recommendations

```tsx
// ✅ Good: Semantic usage with proper context
<div className="flex items-center gap-2">
  <PiFilterOffLine aria-hidden="true" />
  <span>No active filters</span>
</div>

// ✅ Good: Interactive with proper accessibility
<button aria-label="Clear all filters">
  <PiFilterOffLine />
</button>

// ✅ Good: Conditional rendering based on state
{hasActiveFilters ? <PiFilterLine /> : <PiFilterOffLine />}

// ❌ Avoid: Using without context
<PiFilterOffLine />

// ❌ Avoid: Hardcoded sizing that breaks responsiveness
<PiFilterOffLine style={{ width: '16px', height: '16px' }} />
```

### Performance Considerations
- Lightweight SVG with minimal DOM nodes
- No JavaScript execution overhead
- Efficient re-rendering due to prop-based rendering
- Consider icon sprite systems for apps with many icons

### Accessibility Guidelines
- Use `aria-hidden="true"` when icon is decorative
- Provide `aria-label` when icon is interactive
- Ensure sufficient color contrast in all themes
- Include descriptive text for screen readers when needed