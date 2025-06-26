# PiEyeFill Icon Component

## Purpose
The `PiEyeFill` component is a filled eye icon SVG component that represents visibility, viewing, or "show" actions. It's commonly used for password visibility toggles, view actions, or indicating that something is visible/being watched. This component is part of the icon library and provides a consistent, scalable eye icon throughout the application.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and hydrated on the client.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including className, style, onClick, etc. Spread onto the root SVG element |

### Inherited SVG Props
Common props you can pass through `SVGProps<SVGSVGElement>`:
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `onMouseEnter/onMouseLeave` - Mouse event handlers
- `aria-label` - Accessibility label
- `role` - ARIA role
- `data-*` - Data attributes

## Usage Example

```tsx
import { PiEyeFill } from '@/components/icons/pi/pi-eye-fill';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

// Basic usage
export function ViewButton() {
  return (
    <Button variant="ghost" size="sm">
      <PiEyeFill className="h-4 w-4 mr-2" />
      View Details
    </Button>
  );
}

// Password visibility toggle
export function PasswordToggle() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2"
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      <PiEyeFill 
        className={`h-4 w-4 transition-colors ${
          showPassword ? 'text-blue-600' : 'text-gray-400'
        }`}
      />
    </button>
  );
}

// With custom styling
export function WatchlistIcon() {
  return (
    <PiEyeFill 
      className="h-5 w-5 text-green-600 hover:text-green-700"
      style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))' }}
    />
  );
}

// In a data table action
export function UserTableActions({ userId }: { userId: string }) {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" asChild>
        <Link href={`/users/${userId}`}>
          <PiEyeFill className="h-4 w-4" />
          <span className="sr-only">View user</span>
        </Link>
      </Button>
    </div>
  );
}
```

## Functionality
- **Scalable Vector Rendering**: Renders as SVG for crisp display at any size
- **Current Color Inheritance**: Uses `fill='currentColor'` to inherit text color from parent
- **Responsive Sizing**: Uses `1em` dimensions to scale with font-size
- **Accessibility Ready**: Accepts ARIA attributes for screen reader support
- **Interactive Capable**: Supports event handlers for interactive use cases
- **Themeable**: Can be styled with CSS classes and CSS custom properties

## State Management
**No State Management** - This is a pure presentational component with no internal state. Any state management for visibility toggles or interactive behaviors should be handled by parent components using:
- Local `useState` for simple toggles
- Zustand stores for complex UI state
- TanStack Query for server-side visibility preferences

## Side Effects
**No Side Effects** - This component has no side effects, API calls, or external interactions. It's a pure function that renders SVG markup based on props.

## Dependencies
### Direct Dependencies
- `react` - For `SVGProps` type definition

### Integration Dependencies
- **UI Components**: Often used within Button, IconButton, or other interactive components
- **Form Components**: Common in password inputs and form controls
- **Navigation Components**: Used in view/detail action buttons
- **Layout Components**: May appear in headers, sidebars, or action bars

## Integration
This component integrates into the application architecture as:

### Icon System
```tsx
// Part of the larger icon library
import { PiEyeFill } from '@/components/icons/pi/pi-eye-fill';
import { PiEyeSlash } from '@/components/icons/pi/pi-eye-slash';
```

### Form Integration
```tsx
// With React Hook Form
function PasswordField() {
  const { register } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        {...register('password')}
        type={showPassword ? 'text' : 'password'}
      />
      <button onClick={() => setShowPassword(!showPassword)}>
        <PiEyeFill className="h-4 w-4" />
      </button>
    </div>
  );
}
```

### Data Table Integration
```tsx
// In server components with data tables
function UserTable({ users }: { users: User[] }) {
  return (
    <Table>
      {users.map(user => (
        <TableRow key={user.id}>
          <TableCell>{user.name}</TableCell>
          <TableCell>
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/users/${user.id}`}>
                <PiEyeFill className="h-4 w-4" />
              </Link>
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
}
```

## Best Practices

### ✅ Architectural Adherence
- **Server-First**: Renders on server, no unnecessary client boundaries
- **Composition**: Designed to be composed within other UI components
- **Prop Spreading**: Follows React patterns for prop forwarding
- **Type Safety**: Leverages TypeScript for proper SVG prop typing

### ✅ Usage Patterns
```tsx
// Good: Semantic usage with proper labeling
<button aria-label="Show password">
  <PiEyeFill className="h-4 w-4" />
</button>

// Good: Consistent sizing with design system
<PiEyeFill className="h-4 w-4" /> // Small
<PiEyeFill className="h-5 w-5" /> // Medium
<PiEyeFill className="h-6 w-6" /> // Large

// Good: Theme-aware coloring
<PiEyeFill className="text-muted-foreground hover:text-foreground" />
```

### ❌ Anti-patterns
```tsx
// Avoid: Hardcoded dimensions that break responsive design
<PiEyeFill style={{ width: '16px', height: '16px' }} />

// Avoid: Missing accessibility context
<button onClick={toggleVisibility}>
  <PiEyeFill /> {/* No label for screen readers */}
</button>

// Avoid: Inconsistent sizing patterns
<PiEyeFill className="w-3 h-5" /> {/* Inconsistent aspect ratio */}
```

### 🎯 Performance Considerations
- **Bundle Size**: Minimal impact as it's a simple SVG component
- **Rendering**: Efficient server-side rendering with no hydration overhead
- **Reusability**: Can be safely reused across components without performance penalty