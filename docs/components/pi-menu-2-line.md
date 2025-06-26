# PiMenu2Line Icon Component

## Purpose

The `PiMenu2Line` component is an SVG-based icon that displays a hamburger menu with two lines - a visual representation commonly used for navigation menus or toggle buttons. This icon features three horizontal lines with the middle line being shorter than the top and bottom lines, creating a distinctive "2-line" appearance while maintaining the recognizable hamburger menu pattern.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser-specific APIs. It can be safely rendered on the server and hydrated on the client.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

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
import { PiMenu2Line } from '@/components/icons/pi/pi-menu-2-line';

// Basic usage
export function NavigationHeader() {
  return (
    <header className="flex items-center justify-between p-4">
      <h1>My App</h1>
      <button className="lg:hidden">
        <PiMenu2Line className="w-6 h-6 text-gray-600" />
      </button>
    </header>
  );
}

// With click handler and accessibility
export function MobileMenuToggle() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="p-2 rounded hover:bg-gray-100"
      aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      aria-expanded={isMenuOpen}
    >
      <PiMenu2Line 
        className="w-5 h-5 text-gray-700 transition-colors"
        role="img"
        aria-hidden="true"
      />
    </button>
  );
}

// Styled with Tailwind variants
export function CustomMenuIcon() {
  return (
    <PiMenu2Line 
      className="w-8 h-8 text-blue-600 hover:text-blue-800 cursor-pointer"
      style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))' }}
    />
  );
}
```

## Functionality

### Core Features
- **Scalable Vector Graphics**: Renders crisp at any size using SVG format
- **Responsive Sizing**: Uses `1em` dimensions to scale with font size
- **Current Color Inheritance**: Uses `fill='currentColor'` to inherit text color
- **Prop Spreading**: Accepts all standard SVG element properties
- **Accessible Structure**: Semantic SVG structure with proper paths

### Visual Characteristics
- **Three Horizontal Lines**: Top (full width), middle (shorter), bottom (full width)
- **Consistent Spacing**: Evenly distributed vertical spacing between lines
- **Rounded Edges**: Smooth line endings for modern appearance
- **24x24 ViewBox**: Standard icon dimensions for consistent sizing

## State Management

**No State Management Required** - This is a pure presentational component that doesn't manage any internal state. Any state related to menu visibility or interaction should be managed by parent components using appropriate patterns:

- **Local State**: `useState` for simple toggle states
- **Global State**: Zustand store for app-wide navigation state
- **URL State**: Next.js router for persistent menu states

## Side Effects

**No Side Effects** - This component has no side effects, API calls, or external interactions. It's a pure function that renders SVG markup based on props.

## Dependencies

### Direct Dependencies
- **React**: `SVGProps` type from React for prop typing
- **No External Libraries**: Self-contained SVG implementation

### Integration Dependencies
- **Parent Components**: Buttons, navigation bars, or menu toggles
- **Styling Systems**: Tailwind CSS, styled-components, or CSS modules
- **Accessibility Libraries**: Works with screen readers and keyboard navigation

## Integration

### Application Architecture Role
```
┌─── Layout Components ───┐
│  Header, Sidebar, Nav   │
│         ↓               │
├─── Interactive Wrappers ┤
│  Button, IconButton     │
│         ↓               │
├─── Icon Components ─────┤
│    PiMenu2Line         │ ← This Component
└─────────────────────────┘
```

### Common Integration Patterns
- **Navigation Headers**: Mobile menu toggles
- **Sidebar Controls**: Collapse/expand triggers
- **Dropdown Menus**: Visual indicators
- **Settings Panels**: Configuration toggles

## Best Practices

### Architecture Adherence
✅ **Server Component**: Properly designed as server-renderable  
✅ **Single Responsibility**: Focused solely on rendering menu icon  
✅ **Prop Interface**: Uses standard SVG props for maximum flexibility  
✅ **No Side Effects**: Pure function with predictable output  

### Usage Recommendations

```tsx
// ✅ Good: Proper accessibility and styling
<button aria-label="Toggle menu">
  <PiMenu2Line className="w-6 h-6" aria-hidden="true" />
</button>

// ✅ Good: Responsive sizing
<PiMenu2Line className="w-5 h-5 md:w-6 md:h-6" />

// ❌ Avoid: Missing accessibility context
<PiMenu2Line onClick={handleClick} />

// ❌ Avoid: Hardcoded dimensions
<PiMenu2Line style={{ width: '24px', height: '24px' }} />
```

### Performance Considerations
- **Lightweight**: Minimal SVG markup with no JavaScript overhead
- **Tree Shakeable**: Can be imported individually
- **CSS Optimized**: Uses classes instead of inline styles when possible
- **Server Renderable**: No hydration mismatch concerns

### Accessibility Guidelines
- Always wrap in semantic elements (`<button>`, `<a>`)
- Provide `aria-label` on interactive parents
- Use `aria-hidden="true"` on the icon itself
- Ensure sufficient color contrast (4.5:1 minimum)