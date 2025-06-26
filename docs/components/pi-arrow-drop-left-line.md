# PiArrowDropLeftLine Icon Component

## Purpose

The `PiArrowDropLeftLine` component is a scalable SVG icon that renders a left-pointing dropdown arrow. It's part of the Phosphor Icons collection and is commonly used in dropdown menus, navigation elements, collapsible sections, and any UI element that needs to indicate leftward direction or collapse functionality.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, event handlers, or browser APIs. It can be safely rendered on the server for optimal performance and SEO.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including className, style, onClick, etc. Spread to the root `<svg>` element |

### Common SVG Props
| Prop Name | Type | Description |
|-----------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `onMouseEnter` | `MouseEventHandler` | Mouse enter event handler |
| `role` | `string` | Accessibility role |
| `aria-label` | `string` | Accessibility label |

## Usage Example

```tsx
import { PiArrowDropLeftLine } from '@/components/icons/pi/pi-arrow-drop-left-line';

// Basic usage
export function DropdownMenu() {
  return (
    <button className="flex items-center gap-2">
      <span>Options</span>
      <PiArrowDropLeftLine />
    </button>
  );
}

// With custom styling
export function CollapsibleSidebar({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <button 
      className="p-2 hover:bg-gray-100 transition-colors"
      aria-label="Toggle sidebar"
    >
      <PiArrowDropLeftLine 
        className={`w-5 h-5 transition-transform ${
          isCollapsed ? 'rotate-180' : ''
        }`}
      />
    </button>
  );
}

// With event handlers
export function NavigationButton() {
  const handleClick = () => {
    // Handle navigation logic
  };

  return (
    <PiArrowDropLeftLine 
      className="cursor-pointer text-blue-600 hover:text-blue-800"
      onClick={handleClick}
      role="button"
      aria-label="Go back"
    />
  );
}

// In a dropdown component
export function CustomDropdown() {
  return (
    <div className="relative">
      <button className="flex items-center gap-1 px-3 py-2 border rounded">
        Select Option
        <PiArrowDropLeftLine className="w-4 h-4" />
      </button>
      {/* Dropdown content */}
    </div>
  );
}
```

## Functionality

- **Scalable Vector Graphics**: Renders as crisp SVG at any size using `1em` dimensions
- **Current Color Inheritance**: Uses `fill='currentColor'` to inherit text color from parent elements
- **Flexible Styling**: Accepts all standard SVG props for complete customization
- **Responsive Design**: Scales proportionally with font size due to `em` units
- **Accessibility Ready**: Can accept ARIA attributes and semantic roles
- **Transform Compatible**: Works well with CSS transforms for animations

## State Management

**No State Management** - This is a pure presentational component with no internal state. Any dynamic behavior (rotation, color changes, visibility) should be managed by parent components through props and CSS classes.

## Side Effects

**None** - This component has no side effects, API calls, or external interactions. It's a pure function that renders SVG markup based on provided props.

## Dependencies

### Internal Dependencies
- React's `SVGProps` type for prop typing

### External Dependencies
- None - completely self-contained

### Related Components
- Other Phosphor icon components in `/components/icons/pi/`
- UI components that commonly use directional icons (Button, Dropdown, Navigation)

## Integration

### Component Architecture Integration
- **UI Component**: Located in the icons directory as a reusable UI primitive
- **Server-First**: Renders on server by default, reducing client bundle size
- **Composable**: Designed to be composed into larger feature components
- **Domain Agnostic**: Can be used across all application domains

### Common Integration Patterns
```tsx
// In navigation components
import { PiArrowDropLeftLine } from '@/components/icons/pi/pi-arrow-drop-left-line';

// In dropdown components
export function DropdownTrigger() {
  return (
    <button>
      Menu <PiArrowDropLeftLine />
    </button>
  );
}

// In layout components
export function SidebarToggle() {
  return <PiArrowDropLeftLine className="toggle-icon" />;
}
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: No unnecessary client-side JavaScript
- ✅ **Flat Structure**: Simple, non-nested component design
- ✅ **Reusable Primitive**: Can be composed into any feature component
- ✅ **Prop Spreading**: Flexible API through SVG props spreading

### Usage Recommendations
- Use semantic HTML elements (`button`, `a`) as containers when interactive
- Provide appropriate ARIA labels for accessibility
- Leverage CSS classes for styling instead of inline styles when possible
- Use CSS transforms for smooth animations (rotation, scaling)
- Consider icon size in relation to surrounding text (typically 0.75em to 1.25em)

### Performance Considerations
- Icon renders on server, no hydration overhead
- Minimal DOM footprint with single SVG element
- Vector format scales without quality loss
- Uses currentColor for efficient color inheritance

### Accessibility Guidelines
```tsx
// Good: Semantic and accessible
<button aria-label="Collapse menu">
  <PiArrowDropLeftLine />
</button>

// Better: With visible text
<button>
  <span>Back</span>
  <PiArrowDropLeftLine aria-hidden="true" />
</button>
```