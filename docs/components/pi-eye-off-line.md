# PiEyeOffLine Icon Component

## Purpose

The `PiEyeOffLine` component is an SVG icon that represents hidden or invisible content, typically used for password visibility toggles, content masking, or privacy-related UI elements. It displays an eye with a diagonal slash through it, indicating that something is hidden from view.

## Component Type

**Server Component** - This is a pure SVG icon component with no client-side interactivity, state management, or event handling. It can be safely rendered on the server and hydrated on the client without any behavioral logic.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including className, style, onClick, etc. |

**Note**: This component accepts all standard SVG props through spread syntax, allowing full customization of the SVG element.

## Usage Example

```tsx
import { PiEyeOffLine } from '@/components/icons/pi/pi-eye-off-line';

// Basic usage
export function PasswordField() {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="relative">
      <input 
        type={showPassword ? "text" : "password"}
        className="pr-10"
      />
      <button
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-2 top-1/2 -translate-y-1/2"
      >
        {showPassword ? <PiEyeLine /> : <PiEyeOffLine />}
      </button>
    </div>
  );
}

// With custom styling
export function HiddenContentIndicator() {
  return (
    <div className="flex items-center gap-2">
      <PiEyeOffLine 
        className="text-gray-500 hover:text-gray-700" 
        width={20} 
        height={20}
      />
      <span>Content is hidden</span>
    </div>
  );
}

// As clickable element
export function VisibilityToggle({ isVisible, onToggle }) {
  return (
    <PiEyeOffLine
      className="cursor-pointer text-blue-600 hover:text-blue-800"
      onClick={onToggle}
      role="button"
      tabIndex={0}
    />
  );
}
```

## Functionality

- **Scalable Vector Graphics**: Renders as crisp SVG at any size using `1em` dimensions
- **Theme Integration**: Uses `currentColor` fill to inherit text color from parent elements
- **Accessibility Ready**: Can accept ARIA attributes and event handlers for interactive use
- **Responsive Design**: Scales automatically with font-size changes
- **Customizable**: Accepts all standard SVG props for styling and behavior

## State Management

This component has **no internal state management**. It's a pure presentational component that relies on:
- Parent components to manage visibility state when used in interactive contexts
- CSS classes for visual state changes
- External state management solutions (Zustand/TanStack Query) when part of larger features

## Side Effects

**No side effects** - This is a pure component that:
- Renders SVG markup only
- Does not perform API calls
- Does not modify external state
- Does not use browser APIs

## Dependencies

### Internal Dependencies
- `React.SVGProps<SVGSVGElement>` - TypeScript interface for SVG element props

### Potential Related Components
- `PiEyeLine` - Companion icon for visible state
- Form input components that use visibility toggles
- Privacy/security related UI components

## Integration

This component integrates into the application architecture as:

### Icon System Integration
```tsx
// Part of icon library barrel exports
export { PiEyeOffLine } from './pi-eye-off-line';

// Used in design system components
import { PiEyeOffLine } from '@/components/icons/pi/pi-eye-off-line';
```

### Form Components Integration
```tsx
// In form field components
import { PiEyeOffLine } from '@/components/icons/pi/pi-eye-off-line';

export function PasswordInput({ ...props }) {
  // Component logic using the icon
}
```

### Feature Components Integration
```tsx
// In authentication features
import { PiEyeOffLine } from '@/components/icons/pi/pi-eye-off-line';

export function LoginForm() {
  // Uses icon for password visibility toggle
}
```

## Best Practices

### ✅ Following Architecture Guidelines

- **Server Component**: Leverages server-side rendering for optimal performance
- **Flat Composition**: Can be easily composed into larger UI components without nesting complexity
- **Reusable Design**: Located in `/icons/` directory for cross-feature usage
- **Type Safety**: Uses proper TypeScript interfaces for SVG props

### ✅ Recommended Patterns

```tsx
// DO: Use semantic HTML when interactive
<button onClick={toggleVisibility} aria-label="Hide password">
  <PiEyeOffLine />
</button>

// DO: Combine with state management in parent
const { isVisible, toggle } = useVisibilityStore();
return <PiEyeOffLine onClick={toggle} />;

// DO: Use with proper accessibility
<PiEyeOffLine 
  role="img" 
  aria-label="Content hidden"
  className="text-gray-500"
/>
```

### ❌ Anti-Patterns

```tsx
// DON'T: Add client-side logic to the icon component
// Keep it pure and handle interactions in parent components

// DON'T: Hardcode sizes when responsive behavior is needed
// Use className with Tailwind size utilities instead

// DON'T: Use for non-visibility related contexts
// Choose semantically appropriate icons for different use cases
```

This component exemplifies our architecture principles by being a focused, reusable, server-renderable building block that composes well into larger features while maintaining clear separation of concerns.