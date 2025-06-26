# PiGroupFill Component

## Purpose
The `PiGroupFill` component is an SVG icon that renders a filled group/team icon, typically used to represent multiple users, teams, or group-related functionality in the application. It displays a primary user figure with a secondary partial user figure in the background, indicating group membership or team collaboration features.

## Component Type
**Server Component** - This is a pure presentational SVG icon component with no interactive features, state management, or client-side logic. It can be safely rendered on the server as it only accepts SVG props and renders static markup.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| ...props | `SVGProps<SVGSVGElement>` | No | - | Standard SVG element props including `className`, `style`, `onClick`, `width`, `height`, etc. |

## Usage Example

```tsx
import { PiGroupFill } from '@/components/icons/pi/pi-group-fill';

// Basic usage
export function TeamHeader() {
  return (
    <div className="flex items-center gap-2">
      <PiGroupFill className="w-5 h-5 text-blue-600" />
      <h2>Team Dashboard</h2>
    </div>
  );
}

// With custom styling
export function GroupCard() {
  return (
    <div className="p-4 border rounded-lg">
      <PiGroupFill 
        className="w-8 h-8 text-gray-700 mb-2" 
        aria-label="Group members"
      />
      <p>12 Members</p>
    </div>
  );
}

// Interactive usage
export function TeamToggle({ onClick }: { onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
    >
      <PiGroupFill className="w-4 h-4" />
      <span>View Team</span>
    </button>
  );
}
```

## Functionality
- **SVG Rendering**: Renders a scalable vector icon with consistent appearance across devices
- **Size Adaptation**: Uses `1em` dimensions to inherit font-size from parent elements
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent
- **Prop Forwarding**: Accepts all standard SVG element props for maximum flexibility
- **Accessibility Ready**: Can accept `aria-label`, `role`, and other accessibility props

## State Management
**None** - This is a stateless presentational component that doesn't manage any state. It purely renders based on the props passed to it.

## Side Effects
**None** - The component has no side effects, API calls, or external interactions. It's a pure function that renders SVG markup.

## Dependencies
- **React**: Uses `SVGProps` type from React
- **No External Dependencies**: Self-contained component with no additional dependencies

## Integration
This icon component integrates into the larger application architecture as:

- **Design System Component**: Part of the icon library in `/components/icons/pi/`
- **Reusable UI Element**: Can be used across different features and domains
- **Server-Side Rendering**: Compatible with SSR/SSG as a server component
- **Theme Integration**: Works with CSS custom properties and Tailwind classes
- **Accessibility Layer**: Supports ARIA attributes and semantic HTML patterns

```tsx
// Integration with feature components
import { PiGroupFill } from '@/components/icons/pi/pi-group-fill';

export function UserManagementNav() {
  return (
    <nav>
      <Link href="/teams" className="nav-link">
        <PiGroupFill className="w-5 h-5" />
        Teams
      </Link>
    </nav>
  );
}
```

## Best Practices
✅ **Follows Architecture Guidelines**:
- **Server Component**: Correctly implemented as server component (no 'use client')
- **Component Decomposition**: Single responsibility - only renders an icon
- **Reusability**: Placed in `/components/icons/` for cross-domain usage
- **Prop Forwarding**: Accepts all SVG props for flexibility

✅ **Recommended Usage Patterns**:
- Use semantic HTML when wrapping (buttons, links)
- Provide `aria-label` for accessibility when icon stands alone
- Leverage `currentColor` for theme consistency
- Use Tailwind classes for responsive sizing (`w-4 h-4`, `w-5 h-5`, etc.)

✅ **Performance Optimized**:
- No runtime JavaScript required
- Minimal bundle size impact
- Server-side renderable
- No re-renders needed