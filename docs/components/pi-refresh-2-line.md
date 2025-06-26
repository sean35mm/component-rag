# PiRefresh2Line Icon Component

## Purpose
The `PiRefresh2Line` component is a React SVG icon component that displays a refresh/reload symbol with a curved arrow and directional arrow. It's part of the icon system and provides a visual indicator for refresh, reload, or reset functionality in the user interface.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

### Inherited SVG Props
Common props you can pass through:
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role
- `data-*` - Data attributes

## Usage Example

```tsx
import { PiRefresh2Line } from '@/components/icons/pi/pi-refresh-2-line';

// Basic usage
export function RefreshButton() {
  return (
    <button className="flex items-center gap-2">
      <PiRefresh2Line />
      Refresh Data
    </button>
  );
}

// With custom styling
export function StyledRefreshIcon() {
  return (
    <PiRefresh2Line 
      className="text-blue-500 hover:text-blue-600 transition-colors"
      style={{ fontSize: '1.5rem' }}
    />
  );
}

// With click handler and accessibility
export function InteractiveRefreshIcon({ onRefresh }: { onRefresh: () => void }) {
  return (
    <PiRefresh2Line 
      onClick={onRefresh}
      aria-label="Refresh content"
      role="button"
      className="cursor-pointer hover:text-gray-600"
      tabIndex={0}
    />
  );
}

// In a data table header
export function DataTableHeader() {
  const { refetch } = useQuery({ queryKey: ['data'] });
  
  return (
    <div className="flex items-center justify-between">
      <h2>Data Table</h2>
      <button onClick={() => refetch()}>
        <PiRefresh2Line className="w-4 h-4" />
      </button>
    </div>
  );
}
```

## Functionality
- **SVG Rendering**: Renders a scalable vector graphic with two path elements forming a refresh icon
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent
- **Prop Forwarding**: Spreads all props to the underlying SVG element for maximum flexibility
- **Accessibility Ready**: Supports ARIA attributes and semantic props

## State Management
**No State Management** - This is a stateless presentational component. Any state related to refresh functionality should be managed by parent components using:
- **TanStack Query**: For server state refetching (`refetch`, `invalidateQueries`)
- **Zustand**: For client state reset operations
- **Local State**: For simple UI refresh states

## Side Effects
**No Side Effects** - This component has no side effects. It's a pure function that renders SVG markup based on props.

## Dependencies
- **React**: `SVGProps` type from React
- **No External Dependencies**: Self-contained icon component

## Integration
This component integrates into the application architecture as:

- **Icon System**: Part of the standardized icon library for consistent visual language
- **UI Components**: Used within buttons, headers, toolbars, and interactive elements
- **Feature Components**: Integrated into data fetching components, forms, and dashboards
- **Design System**: Follows size and color inheritance patterns for consistent theming

### Common Integration Patterns:
```tsx
// With TanStack Query
const { refetch, isRefetching } = useQuery({ queryKey: ['users'] });

<button onClick={() => refetch()} disabled={isRefetching}>
  <PiRefresh2Line className={isRefetching ? 'animate-spin' : ''} />
</button>

// In form reset
const { reset } = useForm();

<button type="button" onClick={() => reset()}>
  <PiRefresh2Line />
  Reset Form
</button>
```

## Best Practices

### ✅ Following Architecture Guidelines
- **Server-First**: Renders on server without client-side JavaScript
- **Reusable UI Component**: Located in icon directory for cross-domain usage
- **Composable**: Designed to be composed with other UI elements
- **Prop Transparency**: Forwards all props for maximum flexibility

### ✅ Recommended Usage
- Use semantic HTML when making interactive (`<button>`, not `<div>`)
- Provide accessibility labels for interactive icons
- Leverage CSS classes for styling rather than inline styles
- Combine with loading states for better UX

### ❌ Anti-Patterns
- Don't add client-side logic directly to this component
- Avoid hardcoding sizes - use CSS classes or font-size inheritance
- Don't use for non-refresh related functionality
- Don't nest complex interactive elements inside the SVG

### Performance Considerations
- Lightweight SVG with minimal paths
- No runtime JavaScript overhead
- Can be tree-shaken if unused
- Optimized for server-side rendering