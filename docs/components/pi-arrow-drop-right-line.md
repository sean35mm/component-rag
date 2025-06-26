# PiArrowDropRightLine Icon Component

## Purpose

The `PiArrowDropRightLine` component is a presentational SVG icon that renders a right-pointing arrow typically used for dropdown menus, expandable sections, navigation controls, and directional indicators. This icon follows a line/outline visual style and is part of the application's icon system for consistent visual hierarchy and user interface patterns.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG content without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server, improving initial page load performance and SEO.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | - | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Supports full SVG customization and event handling. |

### Common SVG Props
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role
- `width` / `height` - Override default size (defaults to `1em`)

## Usage Example

```tsx
import { PiArrowDropRightLine } from '@/components/icons/pi/pi-arrow-drop-right-line';

// Basic usage
function DropdownTrigger() {
  return (
    <button className="flex items-center gap-2">
      Options
      <PiArrowDropRightLine />
    </button>
  );
}

// Expandable sidebar menu item
function SidebarMenuItem({ label, isExpanded, onToggle }: SidebarMenuItemProps) {
  return (
    <button 
      onClick={onToggle}
      className="flex items-center justify-between w-full p-2 hover:bg-gray-100"
      aria-expanded={isExpanded}
    >
      <span>{label}</span>
      <PiArrowDropRightLine 
        className={`transition-transform duration-200 ${
          isExpanded ? 'rotate-90' : ''
        }`}
        aria-hidden="true"
      />
    </button>
  );
}

// Navigation breadcrumb separator
function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={item.id} className="flex items-center">
            <a href={item.href}>{item.label}</a>
            {index < items.length - 1 && (
              <PiArrowDropRightLine 
                className="mx-2 text-gray-400" 
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Styled with custom size and color
function CustomStyledIcon() {
  return (
    <PiArrowDropRightLine 
      className="w-6 h-6 text-blue-500 hover:text-blue-700"
      role="img"
      aria-label="Expand section"
    />
  );
}
```

## Functionality

- **SVG Rendering**: Renders a right-pointing arrow icon using optimized SVG path
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Current Color**: Inherits text color from parent context via `fill='currentColor'`
- **Prop Forwarding**: Accepts and forwards all standard SVG element properties
- **Accessibility Ready**: Supports ARIA attributes and semantic roles
- **Transform Compatible**: Works with CSS transforms for rotation and animation effects

## State Management

**No State Management** - This is a stateless presentational component that doesn't manage any internal state or interact with external state management systems. State should be managed by parent components when needed for interactive behaviors.

## Side Effects

**No Side Effects** - This component performs no side effects, API calls, or external interactions. It's a pure function that renders SVG markup based on props.

## Dependencies

### Internal Dependencies
- `React.SVGProps<SVGSVGElement>` - TypeScript interface for SVG element props

### No External Dependencies
- No custom hooks, services, or other components
- No third-party libraries beyond React's built-in types

## Integration

### Icon System Integration
```tsx
// Typically used within UI components
import { PiArrowDropRightLine } from '@/components/icons/pi/pi-arrow-drop-right-line';

// Common integration patterns
export const Dropdown = () => (
  <DropdownPrimitive.Trigger>
    Content <PiArrowDropRightLine />
  </DropdownPrimitive.Trigger>
);
```

### Design System Integration
- **Consistent Sizing**: Uses `1em` to maintain proportional scaling
- **Color Inheritance**: Follows design system color patterns via `currentColor`
- **Accessibility**: Integrates with screen readers and keyboard navigation
- **Animation Ready**: Compatible with design system transition utilities

## Best Practices

### ✅ Architectural Alignment
- **Server-First**: Correctly implemented as Server Component for optimal performance
- **Reusable**: Located in `/components/icons/` following UI component organization
- **Single Responsibility**: Focused solely on rendering the arrow icon
- **Prop Transparency**: Forwards all SVG props for maximum flexibility

### ✅ Usage Recommendations
```tsx
// Good: Semantic usage with proper accessibility
<button aria-expanded={isOpen}>
  Menu <PiArrowDropRightLine aria-hidden="true" />
</button>

// Good: Animation with CSS transforms
<PiArrowDropRightLine className="transition-transform rotate-90" />

// Good: Size inheritance from parent typography
<h3 className="text-lg">
  Section <PiArrowDropRightLine />
</h3>
```

### ✅ Accessibility Best Practices
- Use `aria-hidden="true"` when icon is decorative
- Provide `aria-label` when icon conveys important information
- Include proper `role` attributes for semantic meaning
- Ensure sufficient color contrast in parent styling

### ✅ Performance Optimization
- No unnecessary re-renders (pure component)
- Server-side rendering compatible
- Minimal bundle impact with tree-shaking support
- Efficient SVG markup with optimized path data