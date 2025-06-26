# PiMailCheckLine Icon Component

## Purpose
The `PiMailCheckLine` component renders an SVG icon depicting an envelope with a checkmark overlay. This icon is typically used to represent verified email addresses, successful email delivery, email confirmation, or other email-related success states in user interfaces.

## Component Type
**Server Component** - This is a pure presentation component that renders static SVG markup. It has no client-side interactions, state management, or browser APIs, making it suitable for server-side rendering by default.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including className, style, onClick, etc. |

### Inherited SVG Props
Since this component accepts `SVGProps<SVGSVGElement>`, it supports all standard SVG attributes:
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `onMouseEnter/Leave` - Mouse event handlers
- `aria-label` - Accessibility label
- `role` - ARIA role
- `data-*` - Data attributes

## Usage Example

```tsx
import { PiMailCheckLine } from '@/components/icons/pi/pi-mail-check-line';

// Basic usage
export function EmailStatus() {
  return (
    <div className="flex items-center gap-2">
      <PiMailCheckLine />
      <span>Email verified</span>
    </div>
  );
}

// With custom styling
export function VerifiedEmailBadge() {
  return (
    <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
      <PiMailCheckLine 
        className="text-green-600 w-5 h-5"
        aria-label="Verified email"
      />
      <span className="text-green-800">Email confirmed</span>
    </div>
  );
}

// Interactive usage
export function EmailActionButton() {
  const handleVerifyEmail = () => {
    // Verification logic
  };

  return (
    <button 
      onClick={handleVerifyEmail}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded"
    >
      <PiMailCheckLine className="w-4 h-4" />
      Verify Email
    </button>
  );
}

// In notification components
export function EmailNotification() {
  return (
    <div className="notification">
      <PiMailCheckLine className="text-success" />
      <p>Email successfully sent!</p>
    </div>
  );
}
```

## Functionality

### Core Features
- **Scalable Vector Graphics**: Renders crisp at any size using em units (1em × 1em)
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent
- **Accessibility Ready**: Accepts ARIA attributes for screen reader support
- **Flexible Styling**: Supports all standard SVG props for customization

### Visual Design
- **Mail Icon**: Envelope shape with proper proportions
- **Check Overlay**: Checkmark positioned to indicate verification/success
- **Line Style**: Outlined design suitable for various UI contexts
- **24×24 Viewbox**: Standard icon dimensions for consistent sizing

## State Management
**None** - This is a stateless presentational component that doesn't manage any internal state or external state dependencies.

## Side Effects
**None** - Pure component with no side effects, API calls, or external interactions.

## Dependencies

### Direct Dependencies
- `React` - For SVGProps type definition
- No external libraries or components

### Runtime Dependencies
- Modern browser with SVG support
- React 16.8+ (for TypeScript support)

## Integration

### Icon System Integration
```tsx
// Part of icon library
import { PiMailCheckLine } from '@/components/icons/pi/pi-mail-check-line';
import { PiMailLine } from '@/components/icons/pi/pi-mail-line';
import { PiCheckLine } from '@/components/icons/pi/pi-check-line';

// Consistent usage across components
const iconMap = {
  'mail-verified': PiMailCheckLine,
  'mail': PiMailLine,
  'check': PiCheckLine,
};
```

### Design System Integration
```tsx
// With design tokens
export function StatusIcon({ status }: { status: 'verified' | 'pending' }) {
  return (
    <PiMailCheckLine 
      className={cn(
        'w-icon-md h-icon-md', // Design system sizing
        status === 'verified' ? 'text-success' : 'text-muted'
      )}
    />
  );
}
```

### Feature Component Integration
```tsx
// In email verification feature
export function EmailVerificationStatus({ isVerified }: { isVerified: boolean }) {
  if (!isVerified) return null;
  
  return (
    <div className="verification-badge">
      <PiMailCheckLine className="text-success" />
      <span>Verified</span>
    </div>
  );
}
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: Correctly implemented as server component for static rendering
- ✅ **Single Responsibility**: Focused solely on rendering the mail-check icon
- ✅ **Composition Ready**: Designed to be composed into larger UI components
- ✅ **Type Safety**: Full TypeScript support with proper prop typing

### Usage Patterns
```tsx
// ✅ Good: Semantic usage with context
<div className="email-status">
  <PiMailCheckLine aria-label="Email verified" />
  <span>Verified</span>
</div>

// ✅ Good: Consistent sizing with design system
<PiMailCheckLine className="w-icon-sm h-icon-sm text-success" />

// ❌ Avoid: Inline styles when design tokens exist
<PiMailCheckLine style={{ width: '16px', color: '#00ff00' }} />

// ✅ Good: Accessible implementation
<PiMailCheckLine 
  role="img" 
  aria-label="Email verification successful"
  className="text-success"
/>
```

### Performance Considerations
- **Bundle Size**: Minimal impact as pure SVG component
- **Rendering**: Fast server-side rendering with no hydration needed
- **Reusability**: Can be safely reused across components without performance cost