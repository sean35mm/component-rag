# PiKeyLine Icon Component

## Purpose

The `PiKeyLine` component is an SVG icon component that renders a key outline icon. It's part of the Phosphor icon library implementation, specifically designed to represent keys, security, access control, or authentication concepts in the user interface. This icon follows a line/outline visual style and is commonly used in forms, navigation, security features, and access-related UI elements.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and doesn't require the 'use client' directive.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | `{}` | All standard SVG element props including className, style, onClick, etc. Spreads directly to the root SVG element |

### Inherited SVG Props
| Common Props | Type | Description |
|--------------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `width` | `string \| number` | Override default width (defaults to '1em') |
| `height` | `string \| number` | Override default height (defaults to '1em') |
| `fill` | `string` | Override fill color (defaults to 'currentColor') |

## Usage Example

```tsx
import { PiKeyLine } from '@/components/icons/pi/pi-key-line';

// Basic usage
export function SecuritySettings() {
  return (
    <div className="settings-section">
      <h3 className="flex items-center gap-2">
        <PiKeyLine />
        Security & Access
      </h3>
    </div>
  );
}

// With custom styling
export function LoginForm() {
  return (
    <form className="space-y-4">
      <div className="relative">
        <PiKeyLine 
          className="absolute left-3 top-3 text-gray-400" 
          width={20} 
          height={20} 
        />
        <input 
          type="password" 
          placeholder="Enter password"
          className="pl-10 pr-4 py-2 border rounded-lg"
        />
      </div>
    </form>
  );
}

// Interactive usage
export function AccessControlButton() {
  const handlePermissionChange = () => {
    // Handle permission logic
  };

  return (
    <button 
      onClick={handlePermissionChange}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      <PiKeyLine className="w-4 h-4" />
      Manage Access
    </button>
  );
}

// In navigation
export function AdminNavigation() {
  return (
    <nav className="space-y-2">
      <a href="/admin/keys" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100">
        <PiKeyLine className="w-5 h-5 text-gray-600" />
        <span>API Keys</span>
      </a>
    </nav>
  );
}
```

## Functionality

### Core Features
- **Scalable Vector Icon**: Renders crisp at any size using SVG format
- **Theme Integration**: Uses `currentColor` to inherit text color from parent elements
- **Responsive Sizing**: Default `1em` sizing makes it scale with font size
- **Accessibility Ready**: Can accept ARIA attributes and semantic props
- **Style Flexible**: Accepts all standard SVG props for complete customization

### Visual Characteristics
- **Line Style**: Outline/stroke-based icon design
- **Key Shape**: Depicts a traditional key with circular head and rectangular shaft
- **Clean Geometry**: Uses precise path definitions for sharp, professional appearance

## State Management

**No State Management Required** - This is a stateless presentational component that doesn't manage any internal state. It simply renders SVG markup based on the props passed to it.

## Side Effects

**No Side Effects** - This component is purely functional with no side effects, API calls, or external interactions. It only renders SVG markup.

## Dependencies

### Internal Dependencies
- `React.SVGProps<SVGSVGElement>` type from React for prop typing

### External Dependencies
- None - This is a self-contained component

## Integration

### Application Architecture Integration
- **Icon System**: Part of the standardized Phosphor icon library implementation
- **Design System**: Integrates with the application's visual design language
- **Component Library**: Located in `/components/icons/pi/` following the organized icon structure
- **Theme System**: Inherits colors from CSS custom properties and Tailwind classes

### Common Integration Patterns
```tsx
// With form libraries (React Hook Form)
const { register } = useForm();
<div className="relative">
  <PiKeyLine className="absolute left-3 top-3 text-gray-400" />
  <input {...register("password")} className="pl-10" type="password" />
</div>

// With state management (Zustand)
const { hasAccess } = useAuthStore();
<button disabled={!hasAccess}>
  <PiKeyLine className={hasAccess ? "text-green-600" : "text-gray-400"} />
  Access Control
</button>

// With data fetching (TanStack Query)
const { data: permissions } = useQuery({
  queryKey: ['permissions'],
  queryFn: fetchPermissions
});

return (
  <div className="permissions-list">
    <h2 className="flex items-center gap-2">
      <PiKeyLine />
      Permissions ({permissions?.length || 0})
    </h2>
  </div>
);
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: Properly implemented as server component for optimal performance
- ✅ **Single Responsibility**: Focused solely on rendering the key icon
- ✅ **Prop Spreading**: Uses TypeScript-safe prop spreading for flexibility
- ✅ **No Client Dependencies**: Doesn't require client-side JavaScript

### Usage Recommendations
- **Consistent Sizing**: Use consistent sizing across similar UI contexts
- **Semantic Usage**: Use in contexts related to security, access, authentication, or keys
- **Color Inheritance**: Rely on `currentColor` for theme consistency
- **Accessibility**: Add `aria-label` when used without accompanying text

### Performance Considerations
- **Bundle Size**: Minimal impact due to inline SVG implementation
- **Rendering**: Server-side rendering compatible
- **Caching**: Benefits from component-level caching strategies
- **Tree Shaking**: Properly exports for dead code elimination

### Anti-Patterns to Avoid
- ❌ Don't use for non-security related concepts
- ❌ Avoid hardcoding colors instead of using `currentColor`
- ❌ Don't wrap in unnecessary client components
- ❌ Avoid inconsistent sizing patterns across the application