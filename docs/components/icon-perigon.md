# IconPerigon Component

## Purpose
The `IconPerigon` component renders an SVG icon representing the Perigon brand or logo. This is a presentational component that displays a golden rounded square with the distinctive Perigon "P" logo in black, designed to be used throughout the application for branding purposes, navigation elements, or as part of user interface elements that reference the Perigon service.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, event handlers, or browser APIs. It can be safely rendered on the server as it only accepts props and returns JSX.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGAttributes<SVGElement>` | Optional | All standard SVG element attributes (className, style, onClick, etc.) are spread to the root SVG element |

### Common SVG Attributes
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `onMouseEnter/onMouseLeave` - Mouse event handlers
- `aria-label` - Accessibility label
- `role` - ARIA role
- `width/height` - Override default 1em sizing

## Usage Example

```tsx
import { IconPerigon } from '@/components/icons/icon-perigon';

// Basic usage
export function AppHeader() {
  return (
    <header className="flex items-center gap-4">
      <IconPerigon className="w-8 h-8" />
      <h1>My Application</h1>
    </header>
  );
}

// With click handler and custom styling
export function BrandLogo() {
  const handleLogoClick = () => {
    // Navigate to home or perform action
    window.location.href = '/';
  };

  return (
    <button 
      onClick={handleLogoClick}
      className="hover:opacity-80 transition-opacity"
      aria-label="Go to homepage"
    >
      <IconPerigon 
        className="w-10 h-10"
        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
      />
    </button>
  );
}

// In navigation or sidebar
export function Sidebar() {
  return (
    <nav className="flex flex-col gap-4">
      <div className="flex items-center gap-2 p-4">
        <IconPerigon className="w-6 h-6" />
        <span className="font-semibold">Perigon</span>
      </div>
      {/* Other nav items */}
    </nav>
  );
}

// As favicon or app icon reference
export function AppMeta() {
  return (
    <div className="flex items-center gap-2">
      <IconPerigon className="w-4 h-4" />
      <span className="text-sm text-gray-600">Powered by Perigon</span>
    </div>
  );
}
```

## Functionality
- **SVG Rendering**: Displays a scalable vector graphic with the Perigon logo
- **Responsive Sizing**: Uses `1em` default sizing that scales with font size
- **Color Consistency**: Fixed brand colors (golden yellow `#F9C035` background, black `#121212` logo)
- **Prop Forwarding**: Accepts and forwards all standard SVG attributes for customization
- **Accessibility Ready**: Can accept ARIA attributes for screen reader compatibility

## State Management
**None** - This is a stateless presentational component that doesn't manage any internal state or connect to external state management systems.

## Side Effects
**None** - This component has no side effects, doesn't make API calls, doesn't interact with browser APIs, and doesn't perform any asynchronous operations.

## Dependencies

### Internal Dependencies
- `React` - Core React library for JSX and component functionality
- `SVGAttributes` type from React for TypeScript prop typing

### External Dependencies
None - This component is self-contained and doesn't depend on other components, hooks, or services.

## Integration

### Application Architecture Role
- **UI Layer**: Part of the foundational UI component library in `/components/icons/`
- **Brand System**: Core component of the application's branding and visual identity
- **Design System**: Fits into the icon system alongside other branded and functional icons
- **Layout Components**: Used within headers, navigation, footers, and branding sections

### Usage Patterns
```tsx
// In layout components
import { IconPerigon } from '@/components/icons/icon-perigon';

// In feature components that need branding
import { IconPerigon } from '@/components/icons/icon-perigon';

// Typically used alongside other UI components
import { Button } from '@/components/ui/button';
import { IconPerigon } from '@/components/icons/icon-perigon';
```

## Best Practices

### ✅ Follows Architecture Guidelines
- **Server Component**: Correctly implemented as a server component since no client interactivity is needed
- **Component Decomposition**: Simple, focused component that does one thing well
- **Reusability**: Located in `/components/icons/` for reuse across features
- **Props Interface**: Uses standard React patterns with proper TypeScript typing

### ✅ Recommended Usage
```tsx
// Good: Semantic sizing with Tailwind classes
<IconPerigon className="w-8 h-8" />

// Good: Accessible interactive usage
<button aria-label="Perigon homepage">
  <IconPerigon className="w-6 h-6" />
</button>

// Good: Consistent with design system
<IconPerigon className="w-5 h-5 text-current" />
```

### ❌ Anti-patterns to Avoid
```tsx
// Avoid: Modifying fill colors (breaks brand consistency)
<IconPerigon style={{ fill: 'red' }} />

// Avoid: Extreme size distortions
<IconPerigon style={{ width: '100px', height: '20px' }} />

// Avoid: Missing accessibility for interactive usage
<div onClick={handleClick}>
  <IconPerigon />
</div>
```

### Performance Considerations
- **Lightweight**: Pure SVG with no runtime overhead
- **Cacheable**: Static component that can be efficiently cached
- **SSR-friendly**: Renders identically on server and client
- **Bundle-efficient**: Small footprint with no external dependencies