# AuthFormTitle Component

## Purpose

The `AuthFormTitle` component provides a consistent header section for authentication forms throughout the application. It displays the Perigon logo (either icon-only or full logo) alongside a customizable title, maintaining visual consistency across login, registration, and other auth-related forms.

## Component Type

**Server Component** - This is a pure presentational component that renders static content without any client-side interactivity, event handlers, or browser APIs. It follows our default server component pattern and doesn't require the 'use client' directive.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `as` | `ElementType` | No | `undefined` | HTML element or React component to render the title as (h1, h2, etc.) |
| `children` | `ReactNode \| ReactNode[]` | Yes | - | The title text or content to display |
| `onlyLogo` | `boolean` | No | `true` | When true, shows only the Perigon icon; when false, shows the full logo |
| `noLogo` | `boolean` | No | `false` | When true, hides the logo entirely |

## Usage Example

```tsx
// Basic usage with default settings
<AuthFormTitle>
  Welcome Back
</AuthFormTitle>

// Using full logo instead of icon
<AuthFormTitle onlyLogo={false}>
  Create Your Account
</AuthFormTitle>

// Custom heading element with no logo
<AuthFormTitle as="h1" noLogo>
  Reset Password
</AuthFormTitle>

// Complex title with multiple elements
<AuthFormTitle as="h2">
  Sign in to your account
  <span className="block text-sm font-normal text-gray-500">
    Enter your credentials below
  </span>
</AuthFormTitle>
```

## Functionality

- **Logo Display Logic**: Conditionally renders either the Perigon icon (`IconPerigon`) or full logo (`IconPerigonLogoFull`) based on the `onlyLogo` prop
- **Logo Visibility**: Provides option to hide logo entirely with `noLogo` prop
- **Flexible Title Rendering**: Accepts any React content as children and allows customization of the underlying HTML element
- **Responsive Typography**: Uses responsive typography classes that adapt between mobile (`titleH5`) and desktop (`titleH4`) sizes
- **Consistent Spacing**: Maintains uniform gap and alignment across all authentication forms

## State Management

This component is stateless and doesn't require any state management. It's a pure presentational component that renders based solely on the provided props.

## Side Effects

No side effects. This component performs no API calls, external interactions, or DOM manipulations beyond standard React rendering.

## Dependencies

### Internal Components
- `IconPerigon` - Small Perigon logo icon
- `IconPerigonLogoFull` - Full Perigon logo with text
- `Typography` - Base typography component for consistent text styling

### External Dependencies
- `React` - Core React functionality for component creation

## Integration

### Application Architecture Role
- **Authentication Flow**: Serves as the standard header for all authentication-related forms (login, register, forgot password, etc.)
- **Design System**: Acts as a reusable component that enforces brand consistency across auth pages
- **Layout Structure**: Typically used at the top of authentication form containers

### Common Integration Patterns
```tsx
// In login page
function LoginPage() {
  return (
    <div className="auth-container">
      <AuthFormTitle>Sign in to your account</AuthFormTitle>
      <LoginForm />
    </div>
  );
}

// In registration flow
function RegisterPage() {
  return (
    <div className="auth-container">
      <AuthFormTitle onlyLogo={false}>
        Create your Perigon account
      </AuthFormTitle>
      <RegisterForm />
    </div>
  );
}
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: Correctly implemented as a server component without unnecessary client-side code
- ✅ **Component Decomposition**: Simple, focused component that does one thing well
- ✅ **Reusability**: Generic enough to be used across different authentication scenarios
- ✅ **Flat Structure**: Minimal nesting with clear, direct prop interfaces

### Usage Recommendations
- Use `as="h1"` for primary page headings to maintain proper semantic HTML structure
- Prefer `onlyLogo={true}` (default) for compact auth forms, `onlyLogo={false}` for branded landing pages
- Use `noLogo={true}` sparingly, typically only for secondary auth actions or embedded forms
- Keep title text concise and action-oriented to maintain form focus

### Performance Considerations
- Zero runtime overhead as it's a server component
- Efficient rendering with minimal DOM structure
- Responsive classes reduce layout shift between breakpoints