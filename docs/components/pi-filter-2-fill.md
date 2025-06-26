# PiFilter2Fill Component Documentation

## Purpose
The `PiFilter2Fill` component is a filled filter icon that renders an SVG representation of a filter/funnel shape. This icon is typically used in UI elements related to filtering, sorting, or data refinement functionality, providing users with a visual cue for filter-related actions.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

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
import { PiFilter2Fill } from '@/components/icons/pi/pi-filter-2-fill';

// Basic usage
export function FilterButton() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded">
      <PiFilter2Fill />
      Filter Results
    </button>
  );
}

// With custom styling
export function CustomFilterIcon() {
  return (
    <PiFilter2Fill 
      className="text-gray-600 hover:text-blue-600 transition-colors"
      style={{ width: '20px', height: '20px' }}
    />
  );
}

// In a data table header
export function TableHeader() {
  const [isFilterActive, setIsFilterActive] = useState(false);
  
  return (
    <th className="px-4 py-2">
      <div className="flex items-center justify-between">
        <span>Product Name</span>
        <button 
          onClick={() => setIsFilterActive(!isFilterActive)}
          aria-label="Filter products"
        >
          <PiFilter2Fill 
            className={`w-4 h-4 ${isFilterActive ? 'text-blue-600' : 'text-gray-400'}`}
          />
        </button>
      </div>
    </th>
  );
}

// In a filter panel
export function FilterPanel() {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <PiFilter2Fill className="text-gray-700" />
        <h3 className="font-semibold">Filters</h3>
      </div>
      {/* Filter content */}
    </div>
  );
}
```

## Functionality
- **SVG Rendering**: Renders a filled filter/funnel icon as an SVG element
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Current Color**: Uses `fill='currentColor'` to inherit text color from parent
- **Accessibility Ready**: Accepts all standard SVG props for accessibility attributes
- **Event Handling**: Supports all standard DOM events through prop spreading

## State Management
**No State Management** - This is a stateless presentational component. Any state related to filter functionality should be managed by parent components using:
- **TanStack Query** for server-side filtering and data fetching
- **Zustand** for complex client-side filter state
- **Local useState** for simple toggle states

## Side Effects
**No Side Effects** - This component is purely presentational and performs no side effects, API calls, or external interactions.

## Dependencies
- **React**: Uses `SVGProps` type from React
- **No External Dependencies**: Self-contained SVG icon component

## Integration
This component integrates into the application architecture as:

### UI Layer
- **Icon System**: Part of the Phosphor Icons (pi) collection in `/components/icons/pi/`
- **Design System**: Provides consistent filter iconography across the application
- **Reusable Asset**: Can be used in any component requiring filter visualization

### Feature Integration
```tsx
// In data tables
import { DataTable } from '@/components/features/data-table';
import { PiFilter2Fill } from '@/components/icons/pi/pi-filter-2-fill';

// In search interfaces
import { SearchFilters } from '@/components/features/search/search-filters';

// In dashboard widgets
import { DashboardFilter } from '@/components/features/dashboard/dashboard-filter';
```

### Typical Usage Patterns
- Filter buttons and toggles
- Data table column headers
- Search interface controls
- Dashboard filter panels
- Navigation filter indicators

## Best Practices

### ✅ Recommended Patterns
```tsx
// Semantic usage with proper labeling
<button aria-label="Apply filters">
  <PiFilter2Fill />
</button>

// Consistent sizing with Tailwind classes
<PiFilter2Fill className="w-5 h-5" />

// State-aware styling
<PiFilter2Fill className={isActive ? 'text-blue-600' : 'text-gray-400'} />
```

### ❌ Anti-patterns
```tsx
// Don't use for non-filter related functionality
<PiFilter2Fill /> // in a save button

// Don't hardcode sizes in style prop when Tailwind classes exist
<PiFilter2Fill style={{ width: '20px', height: '20px' }} />

// Don't forget accessibility
<button><PiFilter2Fill /></button> // missing aria-label
```

### Architecture Adherence
- **Flat Component Structure**: Single-purpose icon component
- **Server-First**: Renders on server, no client-side dependencies
- **Prop Spreading**: Follows React patterns for extensibility
- **Type Safety**: Properly typed with TypeScript SVG props
- **Separation of Concerns**: Pure presentation, no business logic