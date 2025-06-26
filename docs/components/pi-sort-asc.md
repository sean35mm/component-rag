# PiSortAsc Icon Component

## Purpose

The `PiSortAsc` component is a pure SVG icon component that renders an ascending sort indicator. It displays horizontal bars of increasing length with an upward arrow, commonly used in data tables, lists, and sorting interfaces to indicate ascending sort order or to trigger ascending sort functionality.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG content without any client-side interactivity, state management, or browser-specific APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Spread to the root `<svg>` element |

### Inherited SVG Props (Common Usage)
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click handler for interactive usage |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role (e.g., "button" when clickable) |

## Usage Example

```tsx
import { PiSortAsc } from '@/components/icons/pi/pi-sort-asc';

// Basic usage
function DataTableHeader() {
  return (
    <th className="cursor-pointer select-none">
      Name
      <PiSortAsc className="ml-2 inline-block" />
    </th>
  );
}

// Interactive sorting button
function SortButton({ onSort }: { onSort: () => void }) {
  return (
    <button
      onClick={onSort}
      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
      aria-label="Sort ascending"
    >
      Sort A-Z
      <PiSortAsc className="w-4 h-4" />
    </button>
  );
}

// With custom styling
function CustomSortIndicator() {
  return (
    <PiSortAsc 
      className="text-blue-600 w-5 h-5 transition-colors hover:text-blue-800"
      style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }}
    />
  );
}

// In a table sorting context
function TableColumnHeader({ 
  children, 
  sortKey, 
  currentSort, 
  onSort 
}: {
  children: React.ReactNode;
  sortKey: string;
  currentSort: { key: string; direction: 'asc' | 'desc' } | null;
  onSort: (key: string) => void;
}) {
  const isActive = currentSort?.key === sortKey;
  const isAsc = isActive && currentSort.direction === 'asc';

  return (
    <th 
      className="cursor-pointer hover:bg-gray-50"
      onClick={() => onSort(sortKey)}
    >
      <div className="flex items-center justify-between">
        {children}
        {isAsc && <PiSortAsc className="ml-2 text-blue-600" />}
      </div>
    </th>
  );
}
```

## Functionality

### Core Features
- **SVG Rendering**: Renders a scalable vector graphic with ascending sort visual
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent
- **Accessibility Ready**: Accepts ARIA attributes for screen reader support

### Visual Design
- **Sort Bars**: Three horizontal bars of increasing length (short to long)
- **Upward Arrow**: Arrow pointing up on the right side indicating ascending direction
- **Consistent Styling**: Follows fill rules with proper clipping for clean rendering

## State Management

**None** - This is a stateless presentational component. State management for sorting functionality should be handled by parent components using:
- **TanStack Query**: For server-side sorting with API calls
- **Zustand**: For complex client-side sorting state across multiple components
- **Local State**: For simple component-level sorting using `useState`

## Side Effects

**None** - Pure function component with no side effects, API calls, or external interactions.

## Dependencies

### Internal Dependencies
- `React.SVGProps<SVGSVGElement>` type from React

### External Dependencies
- None - Self-contained SVG icon component

## Integration

### UI Component Layer
```
/components/icons/pi/pi-sort-asc.tsx (This component)
├── Used by: Table components
├── Used by: List components  
├── Used by: Data grid components
└── Used by: Sort control components
```

### Feature Integration
- **Data Tables**: Column header sort indicators
- **List Views**: Sort controls and status indicators
- **Admin Panels**: Data management interfaces
- **Search Results**: Result ordering controls

### Architecture Fit
- **Icon System**: Part of the Phosphor icon component library
- **Design System**: Consistent with other sort and navigation icons
- **Component Composition**: Can be composed with buttons, headers, and interactive elements

## Best Practices

### Architectural Adherence
✅ **Server Component**: Correctly implemented as server component (no 'use client')  
✅ **Single Responsibility**: Focused solely on rendering sort ascending icon  
✅ **Composition Ready**: Accepts all SVG props for flexible composition  
✅ **Type Safety**: Properly typed with SVG element props  

### Usage Recommendations

```tsx
// ✅ Good: Semantic usage with accessibility
<button aria-label="Sort by name ascending">
  <PiSortAsc />
</button>

// ✅ Good: Responsive sizing
<PiSortAsc className="w-4 h-4 sm:w-5 sm:h-5" />

// ✅ Good: State-driven visibility
{sortState.direction === 'asc' && <PiSortAsc />}

// ❌ Avoid: Hardcoded dimensions in component
// Use className or style props instead

// ❌ Avoid: Adding state management to this component
// Handle sorting logic in parent components
```

### Integration Patterns
- **Conditional Rendering**: Show/hide based on sort state
- **Event Delegation**: Pass click handlers from parent components  
- **Style Composition**: Use Tailwind classes for consistent theming
- **Accessibility**: Always provide appropriate ARIA labels when interactive