# PiGroupLine Icon Component

## Purpose

The `PiGroupLine` component is a React SVG icon component that renders a group/users icon with a line style design. It's part of the Pi icon library and displays multiple user silhouettes to represent groups, teams, or user management functionality. This icon is commonly used in navigation menus, buttons, and UI elements that relate to user groups or collaborative features.

## Component Type

**Client Component** - While this component doesn't explicitly use the `'use client'` directive, it should be treated as a client component when interactive features are needed (hover states, click handlers). However, it can be rendered on the server when used purely for display purposes without interactivity.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `width` | `string \| number` | No | `'1em'` | Width of the SVG icon |
| `height` | `string \| number` | No | `'1em'` | Height of the SVG icon |
| `fill` | `string` | No | `'currentColor'` | Fill color of the icon paths |
| `className` | `string` | No | `undefined` | CSS classes for styling |
| `onClick` | `(event: MouseEvent<SVGSVGElement>) => void` | No | `undefined` | Click handler function |
| `style` | `CSSProperties` | No | `undefined` | Inline styles object |
| `...props` | `SVGProps<SVGSVGElement>` | No | - | All other valid SVG element props |

## Usage Example

```tsx
import { PiGroupLine } from '@/components/icons/pi/pi-group-line';
import { Button } from '@/components/ui/button';

// Basic usage
export function UserGroupsSection() {
  return (
    <div className="flex items-center gap-2">
      <PiGroupLine className="text-gray-600" />
      <span>Team Members</span>
    </div>
  );
}

// Interactive usage with button
export function GroupManagementButton() {
  const handleGroupClick = () => {
    // Navigate to groups page or open modal
    console.log('Groups clicked');
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleGroupClick}
      className="flex items-center gap-2"
    >
      <PiGroupLine className="w-4 h-4" />
      Manage Groups
    </Button>
  );
}

// Custom styling
export function CustomStyledGroupIcon() {
  return (
    <PiGroupLine 
      className="w-8 h-8 text-blue-600 hover:text-blue-800 cursor-pointer"
      onClick={() => {/* handle click */}}
    />
  );
}

// Navigation menu usage
export function NavigationMenu() {
  return (
    <nav className="space-y-2">
      <a href="/teams" className="flex items-center gap-3 p-2 hover:bg-gray-100">
        <PiGroupLine className="w-5 h-5 text-gray-500" />
        <span>Teams</span>
      </a>
    </nav>
  );
}
```

## Functionality

- **SVG Rendering**: Renders a scalable vector graphic icon representing user groups
- **Responsive Sizing**: Uses `1em` dimensions by default, scaling with parent font size
- **Color Inheritance**: Uses `currentColor` to inherit text color from parent elements
- **Accessibility**: Accepts `aria-*` props for screen reader compatibility
- **Event Handling**: Supports all standard SVG event handlers (onClick, onMouseOver, etc.)
- **Styling Flexibility**: Accepts className and style props for custom appearance

## State Management

**No State Management Required** - This is a pure presentational component that doesn't manage any internal state. It simply renders an SVG based on the props passed to it.

## Side Effects

**No Side Effects** - This component is purely functional with no side effects, API calls, or external interactions. It only renders SVG markup based on input props.

## Dependencies

- **React**: Uses `SVGProps` type from React
- **No External Dependencies**: Self-contained component with no additional library requirements

## Integration

The `PiGroupLine` component integrates into the larger application architecture as:

- **UI Layer**: Part of the foundational UI component library in `/components/icons/`
- **Design System**: Provides consistent iconography across the application
- **Feature Components**: Used by domain-specific components for user management, team features, and collaboration tools
- **Navigation**: Common in sidebar navigation, breadcrumbs, and menu systems
- **Form Elements**: Often used in buttons, form labels, and interactive elements

```tsx
// Integration example in a feature component
import { PiGroupLine } from '@/components/icons/pi/pi-group-line';
import { useTeams } from '@/hooks/use-teams'; // TanStack Query hook

export function TeamDashboard() {
  const { data: teams } = useTeams();
  
  return (
    <div className="dashboard-header">
      <div className="flex items-center gap-2">
        <PiGroupLine className="w-6 h-6 text-primary" />
        <h1>Team Dashboard ({teams?.length || 0})</h1>
      </div>
    </div>
  );
}
```

## Best Practices

1. **Consistent Sizing**: Use Tailwind classes like `w-4 h-4`, `w-5 h-5` for consistent icon sizing across the application

2. **Color Management**: Leverage `currentColor` for automatic color inheritance or use Tailwind color classes

3. **Accessibility**: Always provide context when icons convey important information:
   ```tsx
   <PiGroupLine aria-label="User groups" role="img" />
   ```

4. **Performance**: Icon components are lightweight and can be safely imported without code-splitting concerns

5. **Semantic Usage**: Use this icon specifically for group/team related functionality to maintain visual consistency

6. **Component Composition**: Follow the flat component architecture by composing with other UI components rather than nesting deeply

7. **Reusability**: Create wrapper components for common icon + text patterns to maintain DRY principles

This component exemplifies our architecture patterns by being a focused, reusable, and composable building block that integrates seamlessly with our design system and larger application components.