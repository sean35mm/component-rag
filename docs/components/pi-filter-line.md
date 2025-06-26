# PiFilterLine Component Documentation

## Purpose
The `PiFilterLine` component is an SVG icon component that renders a filter icon with a line-style design. It's part of the Phosphor Icons (Pi) icon library and is typically used in interfaces to represent filtering functionality, such as filtering data tables, search results, or content lists.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server side, improving initial page load performance.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | - | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

### Common SVG Props
| Prop Name | Type | Description |
|-----------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role |

## Usage Example

```tsx
import { PiFilterLine } from '@/components/icons/pi/pi-filter-line';
import { Button } from '@/components/ui/button';

// Basic usage
export function DataTableHeader() {
  return (
    <div className="flex items-center gap-2">
      <h2>Products</h2>
      <Button variant="outline" size="sm">
        <PiFilterLine className="mr-2 h-4 w-4" />
        Filter
      </Button>
    </div>
  );
}

// With custom styling
export function FilterToggle({ isActive }: { isActive: boolean }) {
  return (
    <button 
      className="p-2 rounded hover:bg-gray-100"
      aria-label="Toggle filters"
    >
      <PiFilterLine 
        className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}
      />
    </button>
  );
}

// In a dropdown menu
export function TableActions() {
  return (
    <DropdownMenu>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <PiFilterLine className="mr-2 h-4 w-4" />
          Apply Filters
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisp at any size using SVG format
- **Responsive Sizing**: Uses `1em` dimensions to scale with font size
- **Theme Integration**: Uses `currentColor` to inherit text color from parent
- **Accessibility Ready**: Accepts ARIA attributes for screen reader support
- **Customizable**: Accepts all standard SVG props for styling and interaction

### Visual Characteristics
- **Viewbox**: 24x24 coordinate system
- **Style**: Line-based filter icon design
- **Fill**: Uses current text color (`currentColor`)
- **Design**: Clean, minimal filter funnel representation

## State Management
**No State Management** - This is a stateless presentational component that doesn't manage any internal state. Any interactive behavior should be handled by parent components using:
- **Local State**: For simple toggle states
- **Zustand**: For complex filter state across multiple components
- **TanStack Query**: For server-side filtering operations

## Side Effects
**No Side Effects** - This component is pure and doesn't perform any side effects, API calls, or external interactions. It simply renders SVG markup based on the provided props.

## Dependencies

### Internal Dependencies
- **React**: Uses `SVGProps` type from React
- **TypeScript**: Leverages TypeScript for prop type safety

### External Dependencies
- None - This is a self-contained icon component

## Integration

### Application Architecture Role
- **UI Layer**: Part of the foundational UI component library
- **Icon System**: Member of the Phosphor Icons collection
- **Design System**: Provides consistent iconography across the application

### Common Integration Patterns
```tsx
// With Button components
<Button>
  <PiFilterLine className="mr-2 h-4 w-4" />
  Filter Results
</Button>

// In Table headers
<TableHead>
  <div className="flex items-center gap-1">
    Name
    <PiFilterLine className="h-3 w-3 opacity-50" />
  </div>
</TableHead>

// With form controls
<div className="relative">
  <Input placeholder="Search..." />
  <PiFilterLine className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
</div>
```

## Best Practices

### Architecture Adherence
✅ **Server Component**: Correctly implemented as server component
✅ **Flat Structure**: Simple, non-nested component design  
✅ **Reusable**: Located in appropriate `/icons/` directory
✅ **TypeScript**: Proper typing with SVGProps interface

### Usage Recommendations
1. **Semantic HTML**: Always provide `aria-label` when used as interactive element
2. **Size Consistency**: Use consistent sizing classes (`h-4 w-4`, `h-5 w-5`)
3. **Color Integration**: Leverage `currentColor` by setting text color on parent
4. **Performance**: No client-side bundle impact when used in server components
5. **Accessibility**: Include descriptive labels for screen readers

### Anti-Patterns to Avoid
❌ Don't add state management to this component
❌ Don't include business logic or side effects
❌ Don't hardcode colors (use currentColor inheritance)
❌ Don't wrap in unnecessary client components