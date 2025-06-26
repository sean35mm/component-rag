# PiServerLine Icon Component

## Purpose

The `PiServerLine` component is an SVG icon that renders a server outline graphic. It displays two stacked server units in a minimalist line-art style, commonly used to represent server infrastructure, hosting services, or backend systems in the application's UI.

## Component Type

**Server Component** - This is a pure SVG icon component with no client-side interactivity, state management, or event handlers. It renders static markup and can be safely used as a Server Component, making it optimal for performance and SEO.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | All standard SVG element properties including `className`, `style`, `onClick`, `aria-label`, etc. Spread to the root `<svg>` element |

### Common SVG Props
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role
- `data-*` - Data attributes

## Usage Example

```tsx
import { PiServerLine } from '@/components/icons/pi/pi-server-line';

// Basic usage
export function ServerStatus() {
  return (
    <div className="flex items-center gap-2">
      <PiServerLine />
      <span>Server Online</span>
    </div>
  );
}

// With custom styling
export function ServerCard() {
  return (
    <div className="server-card">
      <PiServerLine 
        className="text-blue-500 w-8 h-8" 
        aria-label="Server infrastructure"
      />
      <h3>Production Server</h3>
    </div>
  );
}

// Interactive usage
export function ServerToggle({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="p-2 hover:bg-gray-100 rounded">
      <PiServerLine className="w-5 h-5" />
    </button>
  );
}

// In navigation or menus
export function AdminSidebar() {
  return (
    <nav>
      <Link href="/admin/servers" className="nav-item">
        <PiServerLine className="w-4 h-4" />
        Server Management
      </Link>
    </nav>
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisp at any size using em units
- **Color Inheritance**: Uses `currentColor` to inherit text color from parent
- **Accessibility Ready**: Accepts ARIA attributes for screen readers
- **Responsive Design**: 1em sizing adapts to parent font-size
- **Server Representation**: Dual-server stack design with connection indicators

### Visual Elements
- Two stacked rectangular server units
- Connection/status indicators on each server
- Clean outline style without fill
- 24x24 viewBox for consistent proportions

## State Management

**No State Management** - This is a stateless presentational component that renders static SVG markup. It doesn't require TanStack Query, Zustand, or local state management.

## Side Effects

**No Side Effects** - The component has no side effects, API calls, or external interactions. It's a pure rendering component that outputs SVG markup based on props.

## Dependencies

### Internal Dependencies
- React's `SVGProps` type for prop typing

### External Dependencies
- None - completely self-contained component

### Related Components
- Other Phosphor icon components in `/components/icons/pi/`
- UI components that use server-related iconography

## Integration

### Application Architecture Fit
- **Icon System**: Part of the standardized Phosphor icon library
- **Design System**: Provides consistent server iconography across the application
- **Component Composition**: Used as a building block in server management UIs, dashboards, and navigation
- **Server Components**: Fits perfectly in server-rendered layouts and static content

### Common Integration Patterns
```tsx
// In server status dashboards
<ServerMetrics icon={<PiServerLine />} />

// In admin panels
<AdminCard icon={PiServerLine} title="Server Management" />

// In feature toggles
<FeatureToggle icon={PiServerLine} feature="server-monitoring" />
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: No client-side JavaScript needed
- ✅ **Component Decomposition**: Flat, reusable icon component
- ✅ **Prop Interface**: Uses standard SVG props pattern
- ✅ **No State Dependencies**: Stateless and pure

### Usage Recommendations
1. **Semantic HTML**: Always provide `aria-label` for accessibility when used standalone
2. **Consistent Sizing**: Use Tailwind classes like `w-4 h-4`, `w-5 h-5` for consistent sizing
3. **Color Inheritance**: Leverage `currentColor` by setting text color on parent elements
4. **Performance**: Can be used freely in Server Components without hydration costs

### Anti-Patterns to Avoid
- ❌ Don't use 'use client' directive unless adding interactivity
- ❌ Don't manage internal state for static icons
- ❌ Don't override viewBox or internal paths
- ❌ Don't use without semantic context in forms or interactive elements