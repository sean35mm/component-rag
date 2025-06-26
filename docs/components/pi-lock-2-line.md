# PiLock2Line Icon Component

## Purpose

The `PiLock2Line` component is an SVG icon component that renders a line-style lock icon with a circular lock mechanism. It's part of the icon system and provides a visual representation for security-related features, authentication states, locked content, privacy settings, or secure actions throughout the application.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup with no client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and hydrated on the client without any client-specific logic.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Extends native SVG attributes for full customization |

## Usage Example

```tsx
import { PiLock2Line } from '@/components/icons/pi/pi-lock-2-line';

// Basic usage
function SecurityStatus() {
  return (
    <div className="flex items-center gap-2">
      <PiLock2Line />
      <span>Secure Connection</span>
    </div>
  );
}

// With custom styling and accessibility
function PrivacyToggle() {
  return (
    <button 
      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
      aria-label="Toggle privacy settings"
    >
      <PiLock2Line 
        className="text-green-600 w-5 h-5" 
        aria-hidden="true"
      />
      <span>Privacy Settings</span>
    </button>
  );
}

// In form validation states
function SecureField({ isLocked }: { isLocked: boolean }) {
  return (
    <div className="relative">
      <input 
        type="password" 
        disabled={isLocked}
        className="pr-10 border rounded px-3 py-2"
      />
      {isLocked && (
        <PiLock2Line 
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={16}
        />
      )}
    </div>
  );
}

// With conditional rendering
function DocumentAccess({ hasAccess }: { hasAccess: boolean }) {
  return (
    <div className="flex items-center gap-2">
      {!hasAccess && (
        <PiLock2Line className="text-red-500" />
      )}
      <span className={!hasAccess ? 'text-gray-500' : ''}>
        {hasAccess ? 'Full Access' : 'Restricted Access'}
      </span>
    </div>
  );
}
```

## Functionality

- **Scalable Vector Rendering**: Renders crisp lock icon at any size using SVG format
- **Current Color Inheritance**: Uses `fill='currentColor'` to inherit text color from parent elements
- **Responsive Sizing**: Default 1em sizing scales with parent font size
- **Lock Design**: Features a padlock body with circular lock mechanism detail
- **Accessibility Ready**: Supports ARIA attributes and semantic markup
- **Style Customization**: Accepts all standard SVG props for styling and interaction

## State Management

**No State Management** - This is a stateless presentational component that doesn't manage any internal state, server state, or global state. It simply renders SVG markup based on the props passed to it.

## Side Effects

**No Side Effects** - This component has no side effects, API calls, or external interactions. It's a pure function that returns JSX based on its props.

## Dependencies

- **React**: Uses `SVGProps` type from React for type safety
- **No External Dependencies**: Self-contained component with no additional dependencies

## Integration

This icon component integrates into the larger application architecture as:

- **UI Component Layer**: Part of the foundational UI component system in `/components/icons/`
- **Design System**: Follows consistent sizing, coloring, and accessibility patterns
- **Feature Integration**: Used across security features, authentication flows, privacy controls, and access management
- **Reusable Asset**: Can be composed into buttons, form fields, status indicators, and navigation elements
- **Server-Side Rendering**: Compatible with SSR and static generation patterns

## Best Practices

### ✅ Follows Architecture Guidelines

- **Server Component Default**: Correctly implemented as server component with no client-side dependencies
- **Component Decomposition**: Atomic, reusable component that stacks well with other UI components
- **Flat Structure**: Simple, non-nested component structure
- **Props Interface**: Uses standard React/SVG prop patterns for maximum flexibility

### ✅ Recommended Usage Patterns

```tsx
// ✅ Good: Semantic usage with accessibility
<button aria-label="Lock document">
  <PiLock2Line aria-hidden="true" />
  Lock
</button>

// ✅ Good: Conditional rendering for states
{isSecure && <PiLock2Line className="text-green-500" />}

// ✅ Good: Consistent sizing with design system
<PiLock2Line className="w-4 h-4 text-gray-600" />

// ❌ Avoid: Missing semantic context
<PiLock2Line onClick={handleClick} /> // Use proper button wrapper

// ❌ Avoid: Inline styles (use Tailwind classes)
<PiLock2Line style={{ color: 'red' }} /> // Use className instead
```

### ✅ Integration with Architecture

- Combines well with form components using React Hook Form
- Integrates with state management when used in interactive components
- Supports theming and design system tokens through CSS custom properties
- Compatible with animation libraries for enhanced interactions