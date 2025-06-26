# PiMenuSearchLine Icon Component

## Purpose

The `PiMenuSearchLine` component is an SVG icon that combines a hamburger menu design with a search interface. It displays three horizontal lines (representing a menu) alongside a magnifying glass icon, commonly used in applications that offer both navigation menu access and search functionality in a unified interface.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

### Inherited SVG Props (Common Usage)
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role |

## Usage Example

```tsx
import { PiMenuSearchLine } from '@/components/icons/pi/pi-menu-search-line';

// Basic usage
export function AppHeader() {
  return (
    <header className="flex items-center justify-between p-4">
      <PiMenuSearchLine className="w-6 h-6 text-gray-700" />
      <h1>My Application</h1>
    </header>
  );
}

// Interactive usage with click handler
export function MobileNavigation() {
  const handleMenuSearchToggle = () => {
    // Toggle menu/search overlay
  };

  return (
    <button
      onClick={handleMenuSearchToggle}
      className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100"
      aria-label="Open menu and search"
    >
      <PiMenuSearchLine className="w-5 h-5" />
      <span>Menu & Search</span>
    </button>
  );
}

// With custom styling
export function ToolbarButton() {
  return (
    <PiMenuSearchLine 
      className="w-8 h-8 text-blue-600 hover:text-blue-800 cursor-pointer"
      style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }}
    />
  );
}
```

## Functionality

### Core Features
- **Responsive Sizing**: Uses `1em` units to scale with parent font size
- **Theme Integration**: Uses `currentColor` fill to inherit text color
- **Accessibility Ready**: Accepts ARIA attributes for screen readers
- **Customizable**: Accepts all standard SVG props for styling and behavior
- **Consistent Design**: Part of the Phosphor Icons design system

### Visual Elements
- Three horizontal lines representing menu items
- Magnifying glass icon with search handle
- Clean, minimalist line-based design
- Optimized for 24x24 viewBox

## State Management

**No State Management** - This is a pure presentational component with no internal state. Any state related to menu/search visibility or functionality should be managed by parent components using:

- **Local State**: `useState` for simple toggle states
- **Zustand**: For global UI state like mobile menu visibility
- **TanStack Query**: If search functionality involves server data

## Side Effects

**No Side Effects** - This component:
- Does not make API calls
- Does not access browser APIs
- Does not perform any side effects
- Is purely declarative SVG rendering

## Dependencies

### Direct Dependencies
- `react` - For `SVGProps` type definition

### Integration Dependencies
- **Parent Components**: Navigation bars, headers, mobile menus
- **Styling Systems**: Tailwind CSS classes, CSS modules, or styled-components
- **Icon Libraries**: Part of broader Phosphor Icons implementation

## Integration

### Application Architecture Integration

```tsx
// In navigation components
import { PiMenuSearchLine } from '@/components/icons/pi/pi-menu-search-line';

// Header component with menu/search
export function AppHeader() {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <PiMenuSearchLine className="w-6 h-6 lg:hidden" />
        {/* Rest of header */}
      </div>
    </header>
  );
}

// Mobile-first navigation
export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="md:hidden">
      <button onClick={() => setIsOpen(!isOpen)}>
        <PiMenuSearchLine className="w-6 h-6" />
      </button>
      {/* Mobile menu overlay */}
    </nav>
  );
}
```

### Design System Integration
- Consistent with other Phosphor Icons in the design system
- Follows icon sizing conventions (16px, 20px, 24px, 32px)
- Integrates with color tokens and theme variables

## Best Practices

### Architecture Adherence
✅ **Server Component**: Properly implemented as server component
✅ **Single Responsibility**: Focused solely on icon rendering  
✅ **Reusability**: Generic icon that can be used across features
✅ **Prop Forwarding**: Correctly spreads SVG props for flexibility

### Usage Recommendations

```tsx
// ✅ Good: Semantic usage with proper accessibility
<button aria-label="Open navigation menu and search">
  <PiMenuSearchLine className="w-5 h-5" />
</button>

// ✅ Good: Responsive sizing
<PiMenuSearchLine className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />

// ✅ Good: Theme integration
<PiMenuSearchLine className="text-primary-600 dark:text-primary-400" />

// ❌ Avoid: Hardcoded sizing that doesn't scale
<PiMenuSearchLine style={{ width: '20px', height: '20px' }} />

// ❌ Avoid: Missing accessibility context
<div onClick={handleClick}>
  <PiMenuSearchLine />
</div>
```

### Performance Considerations
- Lightweight SVG with minimal DOM nodes
- No JavaScript bundle impact when server-rendered
- Optimized path data for fast rendering
- Can be tree-shaken when unused