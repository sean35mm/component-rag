# ValidationError Component

## Purpose

The `ValidationError` component provides a consistent way to display validation error messages throughout the application. It's specifically designed for form validation feedback, showing error messages with an information icon while maintaining proper spacing and visibility states when no error is present.

## Component Type

**Server Component** - This is a pure presentational component that doesn't require client-side interactivity, state management, or browser APIs. It renders static content based on props, making it suitable for server-side rendering.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `error` | `string \| null \| undefined` | Optional | The error message to display. When falsy, the component remains in the DOM but becomes invisible |

## Usage Example

```tsx
import { ValidationError } from '@/components/signals/creation/validation-error';

// Basic usage with form validation
function SignalForm() {
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  return (
    <form>
      <input 
        type="text" 
        placeholder="Signal name"
        onChange={(e) => validateName(e.target.value)}
      />
      <ValidationError error={errors.name} />
      
      <input 
        type="email" 
        placeholder="Email"
        onChange={(e) => validateEmail(e.target.value)}
      />
      <ValidationError error={errors.email} />
    </form>
  );
}

// Usage with React Hook Form and Zod
function SignalFormWithRHF() {
  const { register, formState: { errors } } = useForm<SignalSchema>();

  return (
    <form>
      <input {...register('name')} />
      <ValidationError error={errors.name?.message} />
      
      <input {...register('email')} />
      <ValidationError error={errors.email?.message} />
    </form>
  );
}
```

## Functionality

- **Conditional Visibility**: Shows error message with icon when error exists, remains invisible but present in DOM when no error
- **Consistent Styling**: Uses standardized typography and error colors from the design system
- **Responsive Layout**: Adapts spacing behavior between mobile (`h-0`) and desktop (`lg:h-auto`) viewports
- **Accessibility**: Maintains DOM presence for screen readers even when invisible
- **Icon Integration**: Displays information icon alongside error text for visual clarity

## State Management

**No State Management** - This is a pure presentational component that receives all necessary data through props. It doesn't manage any internal state, server state, or client state.

## Side Effects

**No Side Effects** - The component has no side effects, API calls, or external interactions. It purely renders content based on the provided props.

## Dependencies

### Internal Dependencies
- `@/components/icons` - `PiInformationFill` icon component
- `@/components/ui/typography` - Typography component for consistent text styling
- `@/lib/utils/cn` - Utility function for conditional class name merging

### External Dependencies
- **React** - Core React functionality for component rendering

## Integration

### Application Architecture
- **Location**: `src/components/signals/creation/` - Domain-specific component for signal creation forms
- **Design System**: Integrates with the UI typography system and error color tokens
- **Form Integration**: Designed to work seamlessly with React Hook Form error objects and Zod validation messages

### Usage Patterns
```tsx
// With Zod validation schema
const signalSchema = z.object({
  name: z.string().min(1, "Signal name is required"),
  description: z.string().optional()
});

// In form component
<ValidationError error={errors.name?.message} />
```

## Best Practices

### Architecture Compliance
- ✅ **Server Component Default**: Uses server component as it's purely presentational
- ✅ **Component Decomposition**: Small, focused component that does one thing well
- ✅ **Reusability**: Can be used across different forms and validation contexts
- ✅ **Domain Organization**: Placed in signals domain but could be moved to `/ui/` for broader reuse

### Recommended Usage
- Use with React Hook Form's error objects for seamless integration
- Pair with Zod validation schemas for type-safe error messages
- Maintain consistent error messaging across forms
- Consider moving to `/ui/` directory if used beyond signals domain

### Performance Considerations
- Lightweight component with minimal rendering overhead
- Uses conditional rendering to avoid unnecessary DOM updates
- Maintains DOM presence for layout stability and accessibility