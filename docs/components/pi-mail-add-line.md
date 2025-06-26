# PiMailAddLine Icon Component

## Purpose
The `PiMailAddLine` component is an SVG icon component that renders a mail envelope with an add/plus symbol. It's part of the icon library and is typically used to represent actions like "add email," "compose new email," or "create email contact" in user interfaces.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup. It doesn't require client-side interactivity, state management, or browser APIs, making it suitable as a server component by default.

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
import { PiMailAddLine } from '@/components/icons/pi/pi-mail-add-line';

// Basic usage
export function EmailActions() {
  return (
    <div className="flex gap-2">
      <PiMailAddLine className="w-6 h-6 text-blue-600" />
      <span>Add Email</span>
    </div>
  );
}

// Interactive button
export function ComposeButton() {
  const handleCompose = () => {
    // Handle email composition
  };

  return (
    <button
      onClick={handleCompose}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      aria-label="Compose new email"
    >
      <PiMailAddLine className="w-5 h-5" />
      Compose
    </button>
  );
}

// In a form context
export function EmailContactForm() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <PiMailAddLine className="w-6 h-6 text-gray-600" />
        <h2 className="text-lg font-semibold">Add Email Contact</h2>
      </div>
      {/* Form fields */}
    </div>
  );
}

// Custom styling
export function StyledEmailIcon() {
  return (
    <PiMailAddLine 
      className="w-8 h-8 text-emerald-600 hover:text-emerald-700 transition-colors"
      style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
    />
  );
}
```

## Functionality
- **SVG Rendering**: Renders an optimized SVG icon with mail envelope and plus symbol
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Current Color**: Uses `currentColor` fill to inherit text color from parent
- **Accessibility Ready**: Accepts all standard SVG props including ARIA attributes
- **Customizable**: Fully customizable through className, style, and other props

## State Management
**None** - This is a stateless presentational component. It doesn't manage any internal state or interact with external state management systems.

## Side Effects
**None** - This component has no side effects. It's a pure function that renders SVG markup based on props.

## Dependencies
- **React**: Uses `SVGProps` type from React
- **No External Dependencies**: Self-contained component with no external libraries

## Integration
This component integrates into the application architecture as:

- **Icon Library Component**: Part of the centralized icon system in `/components/icons/`
- **Reusable UI Element**: Can be used across different features and domains
- **Design System Component**: Follows consistent sizing and styling patterns
- **Accessible Component**: Supports ARIA attributes for screen readers

### Common Integration Patterns

```tsx
// In email management features
import { PiMailAddLine } from '@/components/icons/pi/pi-mail-add-line';

// In navigation menus
export function EmailNavItem() {
  return (
    <Link href="/email/compose" className="nav-item">
      <PiMailAddLine className="nav-icon" />
      New Email
    </Link>
  );
}

// In action buttons
export function EmailActionButton() {
  return (
    <Button variant="primary" size="sm">
      <PiMailAddLine className="w-4 h-4 mr-2" />
      Add Email
    </Button>
  );
}
```

## Best Practices

### ✅ Adherence to Architecture Patterns
- **Server Component**: Correctly implemented as server component (no 'use client')
- **Single Responsibility**: Focused solely on rendering the mail-add icon
- **Prop Spreading**: Uses TypeScript's SVGProps for type safety
- **Composition Ready**: Easily composable with other UI components

### ✅ Recommended Usage
```tsx
// Good: Semantic usage with proper accessibility
<button aria-label="Add new email contact">
  <PiMailAddLine className="w-5 h-5" />
</button>

// Good: Consistent sizing with Tailwind
<PiMailAddLine className="w-6 h-6 text-blue-600" />

// Good: Inherit color from parent
<div className="text-red-500">
  <PiMailAddLine /> {/* Will be red */}
</div>
```

### ❌ Avoid
```tsx
// Avoid: Hardcoded dimensions
<PiMailAddLine style={{ width: '24px', height: '24px' }} />

// Avoid: Missing accessibility for interactive elements
<div onClick={handleClick}>
  <PiMailAddLine />
</div>

// Avoid: Inline styles when classes would work
<PiMailAddLine style={{ color: 'blue' }} />
```

### Performance Considerations
- **Zero Bundle Impact**: SVG is inlined, no external resources
- **Tree Shakeable**: Only bundled when imported
- **Optimized SVG**: Uses efficient path definitions and fill rules