# PiErrorWarningFill Icon Component

## Purpose

The `PiErrorWarningFill` component is a filled error/warning icon that displays a circular warning symbol with an exclamation mark. It's designed to visually communicate error states, warnings, or alerts to users in a clear and consistent manner across the application interface.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup. It doesn't require client-side interactivity, state management, or browser APIs, making it suitable for server-side rendering by default.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | - | All standard SVG element properties including `className`, `style`, `onClick`, `aria-label`, etc. |

### Inherited SVG Props
Common props you can use:
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role
- `data-*` - Data attributes

## Usage Example

```tsx
import { PiErrorWarningFill } from '@/components/icons/pi/pi-error-warning-fill';

// Basic usage
<PiErrorWarningFill />

// With custom styling
<PiErrorWarningFill 
  className="text-red-500 w-6 h-6" 
  aria-label="Error warning"
/>

// In error message component
const ErrorMessage = ({ message }: { message: string }) => (
  <div className="flex items-center gap-2 text-red-600">
    <PiErrorWarningFill className="w-5 h-5 flex-shrink-0" />
    <span>{message}</span>
  </div>
);

// In form validation
const FormField = () => (
  <div className="space-y-1">
    <input 
      className={cn(
        "border rounded px-3 py-2",
        hasError && "border-red-500"
      )}
    />
    {hasError && (
      <div className="flex items-center gap-1 text-sm text-red-600">
        <PiErrorWarningFill className="w-4 h-4" />
        <span>This field is required</span>
      </div>
    )}
  </div>
);

// In notification toast
<Toast variant="error">
  <div className="flex items-center gap-2">
    <PiErrorWarningFill className="w-5 h-5" />
    <span>Failed to save changes</span>
  </div>
</Toast>
```

## Functionality

### Key Features
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Theme Integration**: Uses `currentColor` fill to inherit text color from parent
- **Accessibility Ready**: Accepts ARIA attributes for screen reader compatibility
- **Flexible Styling**: Supports all standard SVG props for customization
- **Consistent Design**: 24x24 viewBox provides crisp rendering at standard sizes

### Visual Design
- Circular filled background with warning triangle
- Exclamation mark with dot for clear warning indication
- Follows established icon design patterns in the application

## State Management

**No State Management** - This is a stateless presentational component that doesn't manage any internal state or require external state management solutions.

## Side Effects

**No Side Effects** - Pure component with no API calls, side effects, or external interactions. It only renders SVG markup based on the provided props.

## Dependencies

### Direct Dependencies
- `react` - For `SVGProps` type definition

### Integration Dependencies
- Works seamlessly with CSS frameworks (Tailwind CSS)
- Compatible with component libraries and design systems
- Integrates with form libraries (React Hook Form) for validation indicators

## Integration

### Application Architecture Fit
- **UI Component Layer**: Lives in `/components/icons/` as a reusable UI primitive
- **Design System**: Part of the icon system ensuring visual consistency
- **Component Composition**: Used as building blocks in higher-level components
- **Feature Integration**: Consumed by domain-specific components for error states

### Common Integration Patterns
```tsx
// In error boundary components
const ErrorBoundary = ({ error }: { error: Error }) => (
  <div className="error-container">
    <PiErrorWarningFill className="error-icon" />
    <h2>Something went wrong</h2>
  </div>
);

// In validation schemas with React Hook Form
const FormComponent = () => {
  const { formState: { errors } } = useForm();
  
  return (
    <div>
      {errors.email && (
        <div className="validation-error">
          <PiErrorWarningFill />
          <span>{errors.email.message}</span>
        </div>
      )}
    </div>
  );
};
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: Correctly implemented as server component for optimal performance
- ✅ **Component Decomposition**: Small, focused component that serves as a Lego block
- ✅ **Reusability**: Generic icon component usable across different domains
- ✅ **Prop Interface**: Uses standard SVG props pattern for maximum flexibility

### Usage Recommendations
- **Accessibility**: Always provide `aria-label` when used without accompanying text
- **Sizing**: Use CSS classes or style props to control size rather than hardcoded dimensions
- **Color**: Leverage `currentColor` behavior by setting text color on parent elements
- **Context**: Pair with meaningful text or place in semantically appropriate containers
- **Performance**: Import only when needed to maintain optimal bundle size

### Anti-patterns to Avoid
- ❌ Don't wrap in unnecessary client components unless interactivity is required
- ❌ Don't hardcode colors - use CSS classes or theme tokens
- ❌ Don't use without proper semantic context for accessibility
- ❌ Don't duplicate this component - reuse across different features