# PiArrowUpSLine

## Purpose

The `PiArrowUpSLine` component is an SVG icon component that renders an upward-pointing arrow with a subtle line style. This icon is commonly used for UI elements like scroll-to-top buttons, collapse/expand controls, sorting indicators, and navigation elements that indicate upward movement or direction.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and hydrated on the client.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

### Common SVG Props
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `(event: MouseEvent) => void` | Click event handler |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role |

## Usage Example

```tsx
import { PiArrowUpSLine } from '@/components/icons/pi/pi-arrow-up-s-line';

// Basic usage
export function ScrollToTop() {
  return (
    <button 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="p-2 bg-blue-500 rounded-full text-white"
    >
      <PiArrowUpSLine />
    </button>
  );
}

// With custom styling and accessibility
export function CollapseButton({ isExpanded, onToggle }: { isExpanded: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label={isExpanded ? "Collapse section" : "Expand section"}
      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
    >
      <span>Details</span>
      <PiArrowUpSLine 
        className={`transition-transform duration-200 ${
          isExpanded ? 'rotate-0' : 'rotate-180'
        }`}
        style={{ fontSize: '1.2rem' }}
      />
    </button>
  );
}

// In a table header for sorting
export function SortableHeader({ children, sortDirection, onSort }: {
  children: React.ReactNode;
  sortDirection: 'asc' | 'desc' | null;
  onSort: () => void;
}) {
  return (
    <th className="px-4 py-2 cursor-pointer hover:bg-gray-50" onClick={onSort}>
      <div className="flex items-center justify-between">
        {children}
        {sortDirection && (
          <PiArrowUpSLine 
            className={`ml-2 transition-transform ${
              sortDirection === 'desc' ? 'rotate-180' : 'rotate-0'
            }`}
          />
        )}
      </div>
    </th>
  );
}
```

## Functionality

- **SVG Rendering**: Renders a clean, scalable upward arrow icon
- **Responsive Sizing**: Uses `1em` dimensions to scale with font size
- **Color Inheritance**: Uses `currentColor` to inherit text color from parent
- **Prop Forwarding**: Spreads all SVG props for maximum flexibility
- **Accessibility Ready**: Supports ARIA attributes and roles
- **Transform Compatible**: Can be rotated and transformed via CSS

## State Management

**No State Management** - This is a stateless presentational component. Any state management for interactions (like toggling, sorting, or navigation) should be handled by parent components using:
- **Local State**: `useState` for simple toggle states
- **Zustand**: For complex UI state shared across components
- **TanStack Query**: If the icon's state depends on server data

## Side Effects

**No Side Effects** - This component has no side effects, API calls, or external interactions. It's a pure function that renders SVG markup based on props.

## Dependencies

### Internal Dependencies
- **React**: `SVGProps` type for proper TypeScript support

### External Dependencies
- None - This is a self-contained SVG component

### Related Components
- Other icon components in the `/pi/` icon family
- UI components that commonly use arrow icons (buttons, dropdowns, tables)

## Integration

### File Structure
```
src/
├── components/
│   ├── icons/
│   │   └── pi/
│   │       └── pi-arrow-up-s-line.tsx
│   └── ui/
│       ├── button.tsx
│       ├── dropdown.tsx
│       └── table.tsx
```

### Common Integration Patterns

1. **With UI Components**: Combine with button, dropdown, and table components
2. **In Navigation**: Use in breadcrumbs, pagination, and menu components
3. **With Animations**: Apply CSS transitions for smooth state changes
4. **In Forms**: Use with collapsible sections and multi-step wizards

## Best Practices

### ✅ Recommended Patterns

```tsx
// ✅ Use semantic HTML with proper accessibility
<button aria-label="Scroll to top">
  <PiArrowUpSLine />
</button>

// ✅ Apply styling through className for consistency
<PiArrowUpSLine className="text-blue-500 text-lg" />

// ✅ Use CSS transforms for directional changes
<PiArrowUpSLine className={isExpanded ? 'rotate-0' : 'rotate-180'} />

// ✅ Keep state management in parent components
const [isExpanded, setIsExpanded] = useState(false);
```

### ❌ Anti-Patterns

```tsx
// ❌ Don't add state directly to icon components
const [expanded, setExpanded] = useState(false); // Should be in parent

// ❌ Don't use inline styles when className would work
<PiArrowUpSLine style={{ color: 'blue' }} /> // Use className instead

// ❌ Don't forget accessibility attributes
<div onClick={handleClick}>
  <PiArrowUpSLine />
</div> // Should be a button with aria-label
```

### Architecture Alignment

- **Lego Block Pattern**: This icon composes naturally with other UI components
- **Flat Structure**: Kept in organized icon directory without deep nesting
- **Server-First**: Renders efficiently on server without client-side overhead
- **Reusable Design**: Generic enough for multiple use cases across the application