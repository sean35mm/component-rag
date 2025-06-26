# TextOrPasswordInput Component

## Purpose

The `TextOrPasswordInput` component is a polymorphic wrapper that dynamically renders either a `TextInput` or `PasswordInput` component based on the input type. This component provides a unified interface for handling both text and password input fields while maintaining type safety and consistent styling across authentication forms.

## Component Type

**Client Component** - While not explicitly marked with 'use client', this component inherits its client-side nature from the underlying `TextInput` and `PasswordInput` components, which require DOM interactions for input handling and password visibility toggling.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `type` | `string` | Optional | Input type that determines component rendering. When set to 'password', renders `PasswordInput`; otherwise renders `TextInput` |
| `...props` | `InputProps` | Optional | All other props from the `InputProps` interface (placeholder, value, onChange, etc.) are passed through to the underlying component |
| `ref` | `React.Ref<HTMLInputElement>` | Optional | Forward ref to the underlying input element for direct DOM access |

*Note: This component extends all props from the `InputProps` interface defined in the text-input component.*

## Usage Example

```tsx
import { TextOrPasswordInput } from '@/components/authentication/text-or-password-input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginForm) => {
    console.log('Login data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email">Email</label>
        <TextOrPasswordInput
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register('email')}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <TextOrPasswordInput
          id="password"
          type="password"
          placeholder="Enter your password"
          {...register('password')}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>

      <button type="submit">Sign In</button>
    </form>
  );
}
```

## Functionality

- **Dynamic Component Selection**: Automatically selects the appropriate input component based on the `type` prop
- **Prop Forwarding**: Transparently passes all props to the underlying component without modification
- **Ref Forwarding**: Maintains ref forwarding capability for form libraries and direct DOM manipulation
- **Type Safety**: Preserves TypeScript type safety through the shared `InputProps` interface
- **Consistent API**: Provides a single interface for both text and password inputs

## State Management

This component is **stateless** and does not manage any internal state. State management is handled by:
- **Parent Components**: Form state managed via React Hook Form
- **Underlying Components**: Internal state (like password visibility) managed by `PasswordInput` component
- **No External State**: Does not interact with TanStack Query or Zustand stores

## Side Effects

This component has **no side effects**. It is a pure presentational component that:
- Does not make API calls
- Does not perform any asynchronous operations
- Does not trigger external state changes
- Simply renders the appropriate input component based on props

## Dependencies

### Internal Dependencies
- `@/components/ui/text-input` - Provides `TextInput`, `PasswordInput` components and `InputProps` interface

### External Dependencies
- `react` - For `forwardRef` and React component functionality

### Form Integration
- Compatible with React Hook Form through ref forwarding
- Works with Zod validation schemas
- Integrates with form state management patterns

## Integration

This component fits into the application architecture as:

### Authentication Layer
- **Domain-Specific**: Located in `/components/authentication/` following domain-based organization
- **Form Building Block**: Used as a primitive in authentication forms (login, register, password reset)
- **UI Abstraction**: Bridges the gap between generic UI components and authentication-specific needs

### Component Hierarchy
```
Authentication Forms
├── LoginForm
├── RegisterForm
└── PasswordResetForm
    └── TextOrPasswordInput (this component)
        ├── TextInput (from /ui/)
        └── PasswordInput (from /ui/)
```

## Best Practices

### ✅ Adherence to Architecture Guidelines

- **Component Decomposition**: ✅ Simple, focused wrapper that stacks UI components like Lego blocks
- **Reusability**: ✅ UI components remain in `/ui/`, feature-specific wrapper in domain folder
- **State Management**: ✅ No state management, delegates to appropriate patterns (React Hook Form)
- **Server/Client Boundaries**: ✅ Correctly inherits client-side nature from underlying interactive components

### ✅ Implementation Best Practices

- **Single Responsibility**: Component has one clear purpose - dynamic input type selection
- **Prop Transparency**: All props are forwarded without interference
- **Type Safety**: Maintains strict TypeScript typing through shared interfaces
- **Ref Forwarding**: Properly implements ref forwarding for form library compatibility

### ✅ Usage Recommendations

- Use in authentication flows where input type may vary dynamically
- Combine with React Hook Form for robust form handling
- Apply Zod schemas for validation
- Leverage in forms where you need consistent styling across different input types