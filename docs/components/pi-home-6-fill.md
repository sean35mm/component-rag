# PiHome6Fill Icon Component

## Purpose
The `PiHome6Fill` component is a presentational SVG icon component that renders a filled home icon variant. It's part of the Phosphor Icons (pi) collection and provides a consistent, scalable home symbol for use throughout the application's user interface. This component is typically used in navigation elements, home buttons, dashboards, or any interface element that represents "home" or main pages.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server, improving initial page load performance and SEO.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element properties including `className`, `style`, `onClick`, `aria-label`, etc. Spread to the root `<svg>` element |

### Common SVG Props
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role
- `title` - Tooltip text

## Usage Example

```tsx
import { PiHome6Fill } from '@/components/icons/pi/pi-home-6-fill';

// Basic usage
export function NavigationBar() {
  return (
    <nav className="flex items-center space-x-4">
      <button className="flex items-center space-x-2">
        <PiHome6Fill className="w-5 h-5" />
        <span>Home</span>
      </button>
    </nav>
  );
}

// With event handling and accessibility
export function HomeButton() {
  const handleHomeClick = () => {
    // Navigation logic
    window.location.href = '/';
  };

  return (
    <button
      onClick={handleHomeClick}
      className="p-2 rounded hover:bg-gray-100"
    >
      <PiHome6Fill 
        className="w-6 h-6 text-blue-600"
        aria-label="Navigate to home page"
        role="img"
      />
    </button>
  );
}

// In a dashboard widget
export function DashboardCard() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center mb-2">
        <PiHome6Fill className="w-4 h-4 text-gray-500 mr-2" />
        <h3 className="text-lg font-medium">Home Dashboard</h3>
      </div>
      {/* Card content */}
    </div>
  );
}
```

## Functionality
- **Scalable Vector Rendering**: Renders crisp icons at any size using `1em` dimensions that scale with font size
- **Current Color Inheritance**: Uses `fill='currentColor'` to inherit text color from parent elements
- **Responsive Design**: Automatically adapts to parent container sizing through em-based dimensions
- **Accessibility Ready**: Accepts ARIA attributes for screen reader compatibility
- **Style Flexibility**: Accepts all standard SVG props for complete customization

## State Management
**No State Management** - This is a stateless presentational component. It does not use TanStack Query, Zustand, or local state. All behavior is controlled through props passed from parent components.

## Side Effects
**No Side Effects** - This component performs no API calls, DOM manipulation outside of its render, or external interactions. It's a pure function that renders SVG markup based on props.

## Dependencies
- **React**: Uses `SVGProps` type from React for prop typing
- **No External Dependencies**: Self-contained component with no additional library requirements

## Integration
- **Icon System**: Part of the centralized icon component library under `/components/icons/pi/`
- **Design System**: Integrates with the application's design system through consistent sizing (`1em`) and color inheritance
- **Navigation Components**: Commonly used in header navigation, sidebar menus, and breadcrumb components
- **Dashboard Layouts**: Frequently integrated into dashboard widgets and home page elements
- **Button Components**: Often composed within button components for enhanced UX

## Best Practices

### ✅ Adherence to Architecture Patterns

1. **Server Component Default**: Correctly implemented as a server component since no client-side features are needed
2. **Component Decomposition**: Simple, single-responsibility component that stacks well with other UI elements
3. **Reusability**: Placed in `/components/icons/` for application-wide reuse
4. **Prop Forwarding**: Uses spread operator to forward all SVG props, maintaining flexibility

### ✅ Recommended Usage Patterns

```tsx
// ✅ Good: Semantic sizing with Tailwind classes
<PiHome6Fill className="w-5 h-5" />

// ✅ Good: Color inheritance from parent
<div className="text-blue-600">
  <PiHome6Fill />
</div>

// ✅ Good: Accessibility labels
<PiHome6Fill aria-label="Home" role="img" />

// ❌ Avoid: Inline styles for sizing (use CSS classes instead)
<PiHome6Fill style={{ width: '20px', height: '20px' }} />
```

### ✅ Composition Patterns

```tsx
// ✅ Compose with buttons and navigation elements
const NavLink = ({ icon: Icon, children, ...props }) => (
  <Link className="flex items-center space-x-2" {...props}>
    <Icon className="w-4 h-4" />
    <span>{children}</span>
  </Link>
);

// Usage
<NavLink icon={PiHome6Fill} href="/">Home</NavLink>
```