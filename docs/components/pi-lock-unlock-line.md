# PiLockUnlockLine Icon Component

## Purpose
The `PiLockUnlockLine` component is a scalable SVG icon that displays a partially unlocked padlock symbol. It represents security states, unlocking actions, or access control features in the user interface. This icon is part of the Phosphor Icons (pi) collection and follows a consistent visual design system.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and doesn't require the 'use client' directive.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `width` | `string \| number` | No | `'1em'` | Sets the width of the SVG icon |
| `height` | `string \| number` | No | `'1em'` | Sets the height of the SVG icon |
| `fill` | `string` | No | `'currentColor'` | Controls the fill color of the icon |
| `className` | `string` | No | `undefined` | CSS classes for styling the SVG element |
| `onClick` | `MouseEventHandler<SVGSVGElement>` | No | `undefined` | Click event handler for interactive usage |
| `...props` | `SVGProps<SVGSVGElement>` | No | - | All other standard SVG element props |

## Usage Example

```tsx
import { PiLockUnlockLine } from '@/components/icons/pi/pi-lock-unlock-line';

// Basic usage
export function SecurityStatus() {
  return (
    <div className="flex items-center gap-2">
      <PiLockUnlockLine className="text-amber-500" />
      <span>Account Partially Secured</span>
    </div>
  );
}

// Interactive usage
export function UnlockButton() {
  const handleUnlock = () => {
    // Unlock logic here
  };

  return (
    <button 
      onClick={handleUnlock}
      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded"
    >
      <PiLockUnlockLine width={20} height={20} />
      Unlock Account
    </button>
  );
}

// Status indicator
export function SecurityLevel({ isUnlocking }: { isUnlocking: boolean }) {
  return (
    <div className="flex items-center">
      {isUnlocking ? (
        <PiLockUnlockLine className="text-yellow-500 animate-pulse" />
      ) : (
        <PiLockLine className="text-green-500" />
      )}
    </div>
  );
}
```

## Functionality
- **Scalable Vector Rendering**: Uses SVG format for crisp display at any size
- **Responsive Sizing**: Defaults to `1em` dimensions, scaling with font size
- **Color Inheritance**: Uses `currentColor` to inherit text color from parent elements
- **Accessibility Ready**: Compatible with screen readers when paired with appropriate labels
- **Style Customization**: Accepts all standard SVG props for flexible styling

## State Management
**None** - This is a stateless presentational component that doesn't require any state management. It simply renders SVG markup based on the provided props.

## Side Effects
**None** - The component has no side effects, makes no API calls, and doesn't interact with external systems. It's a pure rendering component.

## Dependencies
- **React**: Uses `SVGProps` type from React for prop typing
- **No External Dependencies**: Self-contained component with no external library requirements

## Integration
This icon component integrates seamlessly into the application architecture:

- **Design System**: Part of the Phosphor Icons collection ensuring visual consistency
- **Component Composition**: Can be composed with buttons, status indicators, and form elements
- **Theme Integration**: Works with CSS custom properties and design tokens
- **Accessibility**: Pairs with ARIA labels and semantic HTML for inclusive design

```tsx
// Integration with other components
import { PiLockUnlockLine } from '@/components/icons/pi/pi-lock-unlock-line';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function SecurityDashboard() {
  return (
    <div className="space-y-4">
      <Badge variant="warning">
        <PiLockUnlockLine className="mr-1" />
        Partial Access
      </Badge>
      
      <Button variant="outline">
        <PiLockUnlockLine className="mr-2" />
        Review Security Settings
      </Button>
    </div>
  );
}
```

## Best Practices
- **Server-First Rendering**: Leverages server components for optimal performance
- **Prop Spreading**: Uses TypeScript's `SVGProps` for comprehensive prop support
- **Flexible Sizing**: Implements em-based sizing for responsive design
- **Color Inheritance**: Uses `currentColor` for seamless theme integration
- **Semantic Usage**: Pair with descriptive text or ARIA labels for accessibility
- **Performance**: No JavaScript bundle impact when used in server components
- **Consistency**: Follows established patterns from the Phosphor Icons design system

The component adheres to the flat component architecture by being a focused, single-purpose icon that can be easily composed with other UI elements without creating unnecessary nesting or complexity.