# PiMenu3Line Component

## Purpose

The `PiMenu3Line` component is an SVG icon component that renders a three-line hamburger menu icon. This icon is commonly used for navigation menus, especially in mobile interfaces or collapsible sidebar triggers. It displays three horizontal lines of varying lengths, creating a visual representation of a stacked menu structure.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser-specific APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

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
import { PiMenu3Line } from '@/components/icons/pi/pi-menu-3-line';
import { Button } from '@/components/ui/button';

// Basic usage
export function NavigationHeader() {
  return (
    <header className="flex items-center justify-between p-4">
      <h1>My App</h1>
      <PiMenu3Line className="w-6 h-6 text-gray-600" />
    </header>
  );
}

// Interactive menu button
export function MobileMenuButton({ onToggle }: { onToggle: () => void }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      aria-label="Toggle navigation menu"
      className="md:hidden"
    >
      <PiMenu3Line className="w-5 h-5" />
    </Button>
  );
}

// With custom styling
export function CustomMenuIcon() {
  return (
    <PiMenu3Line 
      className="w-8 h-8 text-blue-600 hover:text-blue-800 transition-colors"
      role="img"
      aria-label="Menu"
    />
  );
}

// In a navigation component
export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  return (
    <div className="flex">
      <button
        onClick={onToggle}
        className="p-2 rounded-md hover:bg-gray-100"
      >
        <PiMenu3Line className="w-6 h-6" />
      </button>
      {isOpen && (
        <nav className="ml-4">
          {/* Navigation items */}
        </nav>
      )}
    </div>
  );
}
```

## Functionality

### Key Features
- **Responsive Icon**: Uses `1em` dimensions that scale with font size
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent
- **Accessibility Ready**: Accepts ARIA props for screen reader compatibility
- **Flexible Styling**: Supports all standard SVG props for customization
- **Consistent Viewbox**: 24x24 viewBox provides consistent proportions

### Visual Design
- Three horizontal lines representing menu items
- Top and bottom lines span full width
- Middle line is shorter, creating visual hierarchy
- Rounded corners (controlled by CSS) for modern appearance

## State Management

**None** - This is a stateless presentational component. State management for menu visibility, interactions, or animations should be handled by parent components using:
- **Local state** (useState) for simple menu toggles
- **Zustand** for complex navigation state shared across components
- **URL state** for navigation state that should persist across page reloads

## Side Effects

**None** - This component has no side effects. It renders pure SVG markup without:
- API calls
- Local storage access
- DOM manipulation
- Event subscriptions

## Dependencies

### Direct Dependencies
- `react` - For SVGProps type definition

### Integration Dependencies
- **UI Components**: Often used with Button, Header, or Navigation components
- **Layout Components**: Commonly integrated with Sidebar, AppBar, or MobileNav components
- **State Management**: Parent components may use Zustand stores for navigation state

## Integration

### Application Architecture
```
┌─ Layout Components ─┐
│  ├─ Header         │
│  ├─ Sidebar        │ 
│  └─ MobileNav      │
│    └─ PiMenu3Line  │ ← Icon Component
└────────────────────┘
```

### Common Integration Patterns
1. **Mobile Navigation**: Trigger for collapsible mobile menus
2. **Sidebar Toggle**: Button to show/hide application sidebars
3. **Context Menus**: Visual indicator for dropdown or context menus
4. **Navigation Breadcrumbs**: Part of hierarchical navigation systems

### Accessibility Integration
```tsx
// Proper ARIA labeling
<PiMenu3Line 
  role="img"
  aria-label="Open navigation menu"
  className="w-6 h-6"
/>

// With button wrapper
<button aria-expanded={isOpen} aria-label="Toggle menu">
  <PiMenu3Line className="w-5 h-5" />
</button>
```

## Best Practices

### Architectural Adherence
✅ **Server Component**: Correctly implemented as server component without unnecessary client boundaries  
✅ **Component Decomposition**: Simple, focused component that stacks well with other UI components  
✅ **Reusability**: Located in appropriate `/icons/` directory for cross-application use  

### Implementation Best Practices
- **Always provide accessibility labels** when used as interactive elements
- **Use semantic HTML** - wrap in `<button>` for interactive use cases
- **Leverage CSS classes** instead of inline styles for consistent theming
- **Size appropriately** - typically 16-24px (w-4 h-4 to w-6 h-6) for UI elements
- **Consider animation** - parent components can animate rotation for open/close states

### Performance Considerations
- **Lightweight**: Minimal SVG markup with no JavaScript overhead
- **Cacheable**: Static SVG content is efficiently cached by browsers
- **Scalable**: Vector graphics scale without quality loss across device densities

### Styling Recommendations
```css
/* Smooth transitions for interactive states */
.menu-icon {
  transition: transform 0.2s ease, color 0.2s ease;
}

.menu-icon:hover {
  transform: scale(1.1);
}

/* Animation for menu state */
.menu-icon.open {
  transform: rotate(90deg);
}
```