# PiLoader3Line Icon Component

## Purpose

The `PiLoader3Line` component is a specialized SVG icon component that renders a spinning loader animation graphic. It's part of the Phosphor Icons collection and is used to indicate loading states in the application UI. This icon displays a partial circular loader pattern that visually communicates to users that a process is in progress.

## Component Type

**Server Component** - This is a server component by default as it contains no interactive logic, state management, or browser-specific APIs. It's a pure presentational component that renders static SVG markup and can be safely rendered on the server for optimal performance.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including className, style, onClick, aria-* attributes, etc. |

### Extended SVG Props
Since this component accepts `SVGProps<SVGSVGElement>`, it supports all standard SVG attributes:
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role
- `data-*` - Data attributes

## Usage Example

```tsx
import { PiLoader3Line } from '@/components/icons/pi/pi-loader-3-line';

// Basic usage
export function LoadingSpinner() {
  return (
    <div className="flex items-center gap-2">
      <PiLoader3Line className="animate-spin text-blue-500" />
      <span>Loading...</span>
    </div>
  );
}

// With custom sizing and styling
export function CustomLoader() {
  return (
    <PiLoader3Line 
      className="w-8 h-8 animate-spin text-primary" 
      aria-label="Loading content"
    />
  );
}

// In a button component
export function LoadingButton({ isLoading, onClick, children }) {
  return (
    <button 
      onClick={onClick} 
      disabled={isLoading}
      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded"
    >
      {isLoading && <PiLoader3Line className="animate-spin" />}
      {children}
    </button>
  );
}

// With TanStack Query loading state
export function DataComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ['data'],
    queryFn: fetchData
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <PiLoader3Line className="w-6 h-6 animate-spin text-gray-500" />
      </div>
    );
  }

  return <div>{/* Render data */}</div>;
}
```

## Functionality

- **SVG Rendering**: Renders a scalable vector graphic with a partial circular loader design
- **Responsive Sizing**: Uses `1em` dimensions by default, automatically scales with font-size
- **Color Inheritance**: Uses `currentColor` fill, inheriting text color from parent elements
- **Accessibility Ready**: Accepts ARIA attributes for screen reader compatibility
- **CSS Integration**: Fully compatible with CSS animations (commonly used with `animate-spin`)
- **Event Handling**: Supports all standard SVG event handlers

## State Management

**No State Management** - This component is stateless and purely presentational. It doesn't manage any internal state, nor does it interact with TanStack Query or Zustand stores. Any loading state logic should be handled by parent components.

## Side Effects

**No Side Effects** - This component has no side effects, API calls, or external interactions. It's a pure rendering component that converts props to SVG markup.

## Dependencies

### Internal Dependencies
- **React**: Uses `SVGProps` type from React for prop typing

### External Dependencies
- **None**: No external libraries or custom hooks required

### Related Components
- Other Phosphor icon components in `/components/icons/pi/`
- Loading state components that might use this icon
- Button components with loading states

## Integration

This component integrates into the application architecture as:

1. **UI Layer**: Part of the base icon system in the `/components/icons/` directory
2. **Design System**: Provides consistent loading iconography across the application
3. **Loading States**: Works with TanStack Query loading states and async operations
4. **Form Components**: Can be used in form submissions with React Hook Form
5. **Reusable Pattern**: Follows the flat component architecture for easy composition

```tsx
// Integration with form submission
const FormComponent = () => {
  const { handleSubmit, formState: { isSubmitting } } = useForm();
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* form fields */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting && <PiLoader3Line className="animate-spin mr-2" />}
        Submit
      </button>
    </form>
  );
};
```

## Best Practices

### ✅ Adherence to Architecture Patterns

1. **Server Component Usage**: Properly implemented as a server component with no client-side logic
2. **Prop Interface**: Uses standard React/SVG prop patterns for maximum compatibility
3. **Flat Architecture**: Simple, composable component that stacks well with other components
4. **Type Safety**: Leverages TypeScript with proper SVG prop typing

### ✅ Recommended Usage Patterns

```tsx
// Good: Use with CSS animations
<PiLoader3Line className="animate-spin" />

// Good: Provide accessibility labels
<PiLoader3Line aria-label="Loading data" role="img" />

// Good: Size with Tailwind classes
<PiLoader3Line className="w-4 h-4" />

// Good: Color with text color utilities
<PiLoader3Line className="text-blue-500" />
```

### ❌ Anti-patterns to Avoid

```tsx
// Avoid: Don't add 'use client' unless absolutely necessary
'use client' // Not needed for this component

// Avoid: Don't hardcode sizes in style prop when CSS classes are available
<PiLoader3Line style={{ width: '16px', height: '16px' }} />

// Avoid: Don't use without indicating purpose in loading contexts
<PiLoader3Line /> // Add aria-label or surrounding context
```

### Performance Considerations

- Component renders efficiently as SVG markup
- No JavaScript bundle impact for server-side rendering
- Optimal for use in loading states due to lightweight nature
- CSS animations perform better than JavaScript-based animations