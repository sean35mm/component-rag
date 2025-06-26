# SocialButton Component

## Purpose

The `SocialButton` component is a specialized button designed for social media authentication and login actions. It provides a consistent, accessible interface for social platform integrations with support for custom icons and content through the Radix UI Slot pattern.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `'stroke'` | No | `'stroke'` | Visual style variant of the button |
| `size` | `'md'` | No | `'md'` | Size variant controlling padding and dimensions |
| `asChild` | `boolean` | No | `false` | When true, merges props with immediate child instead of rendering a button |
| `className` | `string` | No | - | Additional CSS classes to merge with component styles |
| `...props` | `ButtonHTMLAttributes` | No | - | All standard HTML button attributes |

*Extends `React.ButtonHTMLAttributes<HTMLButtonElement>` and `VariantProps<typeof socialButtonVariants>`*

## Usage Example

```tsx
import { SocialButton } from '@/components/ui/social-button';
import { GoogleIcon, FacebookIcon, TwitterIcon } from '@/components/icons';

// Basic usage with icon
<SocialButton>
  <GoogleIcon className="w-5 h-5" />
</SocialButton>

// With custom styling
<SocialButton className="border-pgStroke-200 hover:bg-pgNeutral-50">
  <FacebookIcon className="w-5 h-5 text-pgBlue-600" />
</SocialButton>

// As child component (renders as anchor)
<SocialButton asChild>
  <a href="/auth/google">
    <GoogleIcon className="w-5 h-5" />
    <span className="typography-labelSmall ml-2">Continue with Google</span>
  </a>
</SocialButton>

// Multiple social buttons layout
<div className="flex gap-3">
  <SocialButton>
    <GoogleIcon className="w-5 h-5" />
  </SocialButton>
  <SocialButton>
    <FacebookIcon className="w-5 h-5 text-pgBlue-600" />
  </SocialButton>
  <SocialButton>
    <TwitterIcon className="w-5 h-5 text-pgNeutral-900" />
  </SocialButton>
</div>
```

## Design System Usage

### Typography Classes
- Use `.typography-labelSmall` or `.typography-labelXSmall` for optional text labels
- Apply `.typography-labelMedium` for larger social login text when needed

### Color Tokens
- **Background**: `bg-pgBackground-0` (default light background)
- **Border**: Uses system stroke colors, customizable with `border-pgStroke-[variant]`
- **Hover States**: `hover:border-transparent` removes border on hover
- **Social Brand Colors**: 
  - Google: `text-pgNeutral-700`
  - Facebook: `text-pgBlue-600`
  - Twitter: `text-pgNeutral-900`
  - LinkedIn: `text-pgBlue-700`

### Spacing & Layout
- **Padding**: `p-2.5` (10px) for medium size
- **Border Radius**: `rounded-xl` (12px) for modern appearance
- **Gap**: Use `gap-3` (12px) for multiple button layouts

## Styling

### Available Variants

#### Variant: `stroke` (default)
- Light background with subtle border
- Hover effect removes border for clean interaction
- Maintains accessibility contrast ratios

#### Size: `md` (default)
- `p-2.5` padding suitable for 20px × 20px icons
- Optimal touch target size for mobile interaction

### Customization Options

```tsx
// Custom border colors
<SocialButton className="border-pgStroke-300 hover:border-pgStroke-400">

// Custom hover states
<SocialButton className="hover:bg-pgNeutral-100 hover:shadow-md">

// Custom sizing
<SocialButton className="p-3 rounded-2xl">

// Brand-specific styling
<SocialButton className="border-pgBlue-200 hover:bg-pgBlue-50">
  <FacebookIcon className="w-5 h-5 text-pgBlue-600" />
</SocialButton>
```

## Responsive Design

The component adapts across breakpoints through Tailwind utilities:

```tsx
// Responsive sizing
<SocialButton className="p-2 sm:p-2.5 md:p-3">

// Responsive layout
<div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
  <SocialButton>Google</SocialButton>
  <SocialButton>Facebook</SocialButton>
</div>

// Mobile-first approach
<SocialButton className="w-full sm:w-auto">
  Continue with Google
</SocialButton>
```

## Accessibility

### Built-in Features
- **Keyboard Navigation**: Full keyboard support through native button element
- **Focus Management**: Automatic focus indicators with system focus styles
- **Screen Reader Support**: Inherits semantic button behavior

### Recommended Practices
```tsx
// Proper labeling for icon-only buttons
<SocialButton aria-label="Sign in with Google">
  <GoogleIcon className="w-5 h-5" />
</SocialButton>

// Loading and disabled states
<SocialButton disabled aria-label="Signing in...">
  <Spinner className="w-5 h-5" />
</SocialButton>

// Form integration
<SocialButton type="submit" form="social-login-form">
  Continue with Facebook
</SocialButton>
```

### ARIA Considerations
- Use `aria-label` for icon-only buttons
- Include `aria-describedby` for additional context
- Implement `aria-pressed` for toggle states if applicable

## Dependencies

### Internal Dependencies
- `@/lib/utils/cn` - Class name utility for merging Tailwind classes
- Design system color tokens (pgBackground, pgStroke, etc.)
- Typography classes from globals.css

### External Dependencies
- `@radix-ui/react-slot` - Enables component composition patterns
- `class-variance-authority` - Type-safe variant handling
- `React.forwardRef` - Proper ref forwarding for accessibility

### Related Components
- Icon components for social platforms
- Loading/Spinner components for async states
- Form components for authentication flows
- Button component (base button implementation)

### Integration Notes
- Works seamlessly with authentication libraries (NextAuth.js, Auth0)
- Compatible with form libraries (React Hook Form, Formik)
- Supports custom routing solutions through `asChild` prop