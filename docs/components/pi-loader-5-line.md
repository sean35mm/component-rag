# PiLoader5Line Icon Component

## Purpose

The `PiLoader5Line` component is a loading spinner icon that provides visual feedback to users during asynchronous operations. It renders an SVG icon representing a partial circular loader, typically used to indicate content is loading or processing. This component is part of the Phosphor icon library integration and follows our standardized icon component patterns.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup. It has no client-side interactivity, state management, or browser-specific APIs, making it suitable for server-side rendering by default.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | - | All standard SVG element props including `className`, `style`, `onClick`, `width`, `height`, `color`, etc. |

### Common SVG Props
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `(event: MouseEvent) => void` | Click event handler |
| `width` | `string \| number` | Override default width (1em) |
| `height` | `string \| number` | Override default height (1em) |
| `color` | `string` | Override fill color (defaults to currentColor) |

## Usage Example

```tsx
import { PiLoader5Line } from '@/components/icons/pi/pi-loader-5-line';

// Basic loading indicator
export function LoadingSpinner() {
  return (
    <div className="flex items-center gap-2">
      <PiLoader5Line className="animate-spin text-blue-500" />
      <span>Loading...</span>
    </div>
  );
}

// Loading button state
export function SubmitButton({ isLoading }: { isLoading: boolean }) {
  return (
    <button 
      disabled={isLoading}
      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded"
    >
      {isLoading && <PiLoader5Line className="animate-spin" />}
      {isLoading ? 'Saving...' : 'Save Changes'}
    </button>
  );
}

// Data fetching indicator with TanStack Query
export function UserProfile({ userId }: { userId: string }) {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId)
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <PiLoader5Line 
          className="animate-spin text-gray-400" 
          width={24} 
          height={24} 
        />
      </div>
    );
  }

  return <div>{/* User profile content */}</div>;
}

// Custom styled loader
export function CustomLoader() {
  return (
    <PiLoader5Line 
      className="animate-spin text-emerald-500 drop-shadow-lg"
      style={{ fontSize: '2rem' }}
    />
  );
}
```

## Functionality

- **SVG Rendering**: Renders a scalable vector graphic of a partial circular loader
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Color Inheritance**: Uses `currentColor` to inherit text color from parent elements
- **Prop Forwarding**: Accepts and forwards all standard SVG element props
- **Animation Ready**: Designed to work seamlessly with CSS animations (typically `animate-spin`)

## State Management

**No State Management** - This is a stateless presentational component. It doesn't manage any internal state or interact with external state management systems.

## Side Effects

**No Side Effects** - The component has no side effects, API calls, or external interactions. It purely renders SVG markup based on provided props.

## Dependencies

### Internal Dependencies
- React's `SVGProps` type for prop typing

### External Dependencies
- None - This is a self-contained SVG icon component

### Styling Dependencies
- Tailwind CSS classes (when used in examples)
- CSS animations (for spinning effect)

## Integration

### Icon System Integration
```tsx
// Part of centralized icon exports
export { PiLoader5Line } from './pi/pi-loader-5-line';

// Used in loading states across the application
import { PiLoader5Line } from '@/components/icons';
```

### Loading State Patterns
```tsx
// With TanStack Query
const { data, isLoading } = useQuery({
  queryKey: ['data'],
  queryFn: fetchData
});

// With form submissions
const { register, handleSubmit, formState: { isSubmitting } } = useForm();

// With Zustand store
const isLoading = useStore(state => state.isLoading);
```

### UI Component Integration
```tsx
// In reusable UI components
export function Button({ isLoading, children, ...props }: ButtonProps) {
  return (
    <button {...props}>
      {isLoading && <PiLoader5Line className="animate-spin mr-2" />}
      {children}
    </button>
  );
}
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: No unnecessary client-side JavaScript
- ✅ **Prop Forwarding**: Flexible and reusable through SVG props
- ✅ **Flat Structure**: Simple, non-nested component structure
- ✅ **Domain Agnostic**: Reusable across different application domains

### Usage Patterns
```tsx
// ✅ Good: Semantic usage with loading states
{isLoading && <PiLoader5Line className="animate-spin" />}

// ✅ Good: Accessible loading indicators
<div role="status" aria-label="Loading">
  <PiLoader5Line className="animate-spin" />
</div>

// ✅ Good: Consistent sizing with design system
<PiLoader5Line className="w-4 h-4 animate-spin" /> // Small
<PiLoader5Line className="w-6 h-6 animate-spin" /> // Medium
<PiLoader5Line className="w-8 h-8 animate-spin" /> // Large

// ❌ Avoid: Using without animation context
<PiLoader5Line /> // Static loader doesn't indicate loading

// ❌ Avoid: Overriding fill directly
<PiLoader5Line fill="red" /> // Use className or currentColor instead
```

### Performance Considerations
- Lightweight SVG with minimal DOM impact
- No JavaScript bundle increase for Server Components
- Efficient with CSS animations over JavaScript animations
- Reusable across multiple loading contexts without duplication