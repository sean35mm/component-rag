# Terms Component

## Purpose

The `Terms` component displays a legal compliance message with links to Terms of Service, CSA, and Privacy Policy. It's designed for authentication flows where users need to acknowledge legal agreements before proceeding with account creation or authentication.

## Component Type

**Server Component** - This component renders static content with client-side navigation links. It doesn't require client-side interactivity, state management, or browser APIs, making it suitable as a server component for optimal performance.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | `undefined` | Additional CSS classes to apply to the component |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | No | `{}` | Standard HTML div attributes (id, data-*, aria-*, etc.) |

## Usage Example

```tsx
import { Terms } from '@/components/authentication/terms';

// Basic usage in authentication form
export function SignUpForm() {
  return (
    <div className="space-y-6">
      <form>
        {/* Form fields */}
        <button type="submit">Create Account</button>
      </form>
      
      {/* Legal compliance */}
      <Terms />
    </div>
  );
}

// With custom styling
export function AuthModal() {
  return (
    <div className="modal">
      <Terms className="mt-4 text-xs" />
    </div>
  );
}

// With additional HTML attributes
export function MobileAuthFlow() {
  return (
    <Terms 
      className="px-4" 
      data-testid="terms-agreement"
      role="note"
    />
  );
}
```

## Functionality

### Core Features
- **Legal Links Display**: Renders clickable links to Terms of Service, CSA, and Privacy Policy
- **Responsive Typography**: Uses the design system's `Typography` component for consistent styling
- **Navigation Integration**: Leverages Next.js Link component for client-side navigation
- **Accessibility**: Maintains proper link semantics and hover states
- **Customizable Styling**: Accepts className overrides while maintaining default appearance

### Visual Behavior
- **Default Appearance**: Centered text with 80% opacity using small paragraph styling
- **Interactive Links**: Underlined links that remove underline on hover
- **Flexible Layout**: Inherits container width and adapts to parent layout

## State Management

**No State Management** - This is a pure presentational component that doesn't manage any state. It renders static content based on props and external constants.

## Side Effects

**No Side Effects** - The component doesn't perform API calls, DOM manipulation, or other side effects. Navigation is handled by Next.js Link components.

## Dependencies

### Internal Dependencies
- `@/components/ui/typography` - Design system typography component
- `@/lib/constants` - PolicyLinks constants for URL management
- `@/lib/utils/cn` - Utility for conditional className merging

### External Dependencies
- `next/link` - Next.js client-side navigation
- `react` - Core React functionality for component structure

## Integration

### Authentication Flow Integration
```tsx
// Sign up page integration
import { Terms } from '@/components/authentication/terms';
import { SignUpForm } from '@/components/authentication/sign-up-form';

export function SignUpPage() {
  return (
    <div className="auth-container">
      <SignUpForm />
      <Terms className="mt-6" />
    </div>
  );
}
```

### Modal Integration
```tsx
// Authentication modal
import { Terms } from '@/components/authentication/terms';

export function AuthModal() {
  return (
    <Modal>
      <AuthForm />
      <Terms className="border-t pt-4 mt-6" />
    </Modal>
  );
}
```

## Best Practices

### ✅ Architecture Adherence
- **Server Component Usage**: Properly implemented as server component for static content
- **Component Decomposition**: Single responsibility for legal compliance display
- **Reusability**: Flexible props interface allows usage across authentication flows
- **Design System Integration**: Uses Typography component for consistent styling

### ✅ Implementation Patterns
- **Prop Spreading**: Properly spreads HTML attributes while extracting component-specific props
- **Conditional Styling**: Uses `cn()` utility for className merging following our patterns
- **Constants Usage**: Leverages centralized PolicyLinks constants for URL management
- **Type Safety**: Properly typed with HTMLAttributes interface

### ✅ Usage Guidelines
```tsx
// ✅ Good: Use in authentication contexts
<Terms className="mt-4" />

// ✅ Good: Customize styling while preserving semantics
<Terms className="text-xs border-t pt-2" />

// ❌ Avoid: Don't use for non-authentication legal text
// Use a more generic legal component instead

// ❌ Avoid: Don't override core functionality
// Component is specifically for authentication flows
```

### Integration Best Practices
- Place at the bottom of authentication forms for optimal UX flow
- Use consistent spacing with other form elements
- Maintain accessibility by not overriding link semantics
- Consider mobile viewport constraints when customizing styles