# PiArrowDropUpLine Icon Component

## Purpose
The `PiArrowDropUpLine` component is a presentational SVG icon that renders an upward-pointing arrow typically used for dropdown menus, collapsible sections, and sorting indicators. It provides a consistent visual element for indicating upward direction or expanded states in the user interface.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | - | All standard SVG element props including `className`, `style`, `onClick`, `width`, `height`, etc. |

**Common SVG Props:**
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `width` / `height` - Override default 1em sizing
- `fill` - Override currentColor fill
- `aria-label` - Accessibility label

## Usage Example

```tsx
import { PiArrowDropUpLine } from '@/components/icons/pi/pi-arrow-drop-up-line';

// Basic usage
export function DropdownHeader() {
  return (
    <button className="flex items-center gap-2">
      Menu Options
      <PiArrowDropUpLine />
    </button>
  );
}

// With custom styling
export function SortableColumn() {
  return (
    <th className="cursor-pointer hover:bg-gray-50">
      <div className="flex items-center justify-between">
        Column Name
        <PiArrowDropUpLine 
          className="text-blue-500 transition-transform duration-200" 
          width="16"
          height="16"
        />
      </div>
    </th>
  );
}

// With click handler and accessibility
export function CollapsibleSection({ onToggle, isExpanded }: Props) {
  return (
    <button 
      onClick={onToggle}
      className="flex items-center gap-2 w-full text-left"
      aria-expanded={isExpanded}
    >
      Section Title
      <PiArrowDropUpLine 
        className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
      />
    </button>
  );
}
```

## Functionality
- **SVG Rendering**: Renders a scalable vector graphic of an upward arrow
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Color Inheritance**: Uses `currentColor` to inherit text color from parent
- **Prop Forwarding**: Accepts all standard SVG element properties
- **Accessibility Ready**: Can accept ARIA attributes for screen readers

## State Management
**None** - This is a stateless presentational component. State management should be handled by parent components that use this icon.

## Side Effects
**None** - Pure functional component with no side effects, API calls, or external interactions.

## Dependencies
- **React**: Uses `SVGProps` type from React
- **No external dependencies**: Self-contained SVG icon component

## Integration

### UI Component Library
```tsx
// Used in reusable UI components
import { PiArrowDropUpLine } from '@/components/icons/pi/pi-arrow-drop-up-line';

export function Select({ children, ...props }) {
  return (
    <select className="appearance-none pr-8" {...props}>
      {children}
      <PiArrowDropUpLine className="absolute right-2 pointer-events-none" />
    </select>
  );
}
```

### Feature Components
```tsx
// Used in domain-specific components
export function ProductCategoryFilter() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="filter-section">
      <button onClick={() => setIsExpanded(!isExpanded)}>
        Categories
        <PiArrowDropUpLine 
          className={isExpanded ? 'rotate-180' : ''} 
        />
      </button>
      {/* Filter content */}
    </div>
  );
}
```

### Component Architecture Fit
- **Lego Block Pattern**: Small, focused component that stacks well with others
- **Flat Hierarchy**: Direct import and usage without deep nesting
- **Reusable**: Placed in `/components/icons/` for cross-domain usage
- **Composable**: Works with any parent component needing arrow indicators

## Best Practices

### ✅ Recommended Patterns
```tsx
// Use semantic HTML with proper ARIA labels
<button aria-expanded={isOpen} aria-label="Toggle menu">
  <PiArrowDropUpLine aria-hidden="true" />
</button>

// Combine with Tailwind for responsive behavior
<PiArrowDropUpLine className="w-4 h-4 md:w-5 md:h-5 transition-transform" />

// Use CSS custom properties for theming
<PiArrowDropUpLine style={{ color: 'var(--primary-color)' }} />
```

### ❌ Anti-patterns
```tsx
// Don't wrap in unnecessary containers
<div><PiArrowDropUpLine /></div> // ❌

// Don't hardcode colors when inheritance works
<PiArrowDropUpLine fill="#000000" /> // ❌ Use currentColor instead

// Don't use for non-directional purposes
<PiArrowDropUpLine /> // ❌ Used as generic decoration
```

### Architecture Compliance
- **Server-First**: Renders on server by default
- **Prop Interface**: Uses standard React patterns with TypeScript
- **No State Coupling**: Doesn't manage its own state
- **Composable**: Integrates cleanly with form libraries and UI frameworks
- **Accessible**: Supports ARIA attributes and semantic usage