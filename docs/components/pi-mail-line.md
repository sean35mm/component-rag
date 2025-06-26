# PiMailLine Icon Component

## Purpose
The `PiMailLine` component is an SVG-based mail/email icon that renders an outlined envelope symbol. It's part of the Phosphor icon family and serves as a reusable UI element for email-related features, navigation items, buttons, and form inputs throughout the application.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactions, state management, or browser APIs. It can be safely rendered on the server side for optimal performance.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | `{}` | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Spreads to the root `<svg>` element |

### Common SVG Props:
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role
- `data-*` - Data attributes

## Usage Example

```tsx
import { PiMailLine } from '@/components/icons/pi/pi-mail-line';

// Basic usage
<PiMailLine />

// With custom styling
<PiMailLine 
  className="w-6 h-6 text-blue-600" 
  aria-label="Email icon"
/>

// In a button
<button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded">
  <PiMailLine className="w-4 h-4" />
  Send Email
</button>

// In navigation
<nav className="flex space-x-4">
  <a href="/inbox" className="flex items-center gap-2">
    <PiMailLine className="w-5 h-5" />
    Inbox
  </a>
</nav>

// With click handler (requires 'use client' in parent)
<PiMailLine 
  className="w-6 h-6 cursor-pointer hover:text-blue-600"
  onClick={() => openEmailComposer()}
  role="button"
  aria-label="Open email composer"
/>

// In forms
<div className="relative">
  <PiMailLine className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
  <input 
    type="email" 
    placeholder="Email address"
    className="pl-10 pr-4 py-2 border rounded-lg"
  />
</div>
```

## Functionality

### Key Features:
- **Scalable Vector Graphics**: Renders crisp at any size using SVG format
- **Responsive Sizing**: Uses `1em` dimensions to scale with font size
- **Theme Integration**: Uses `currentColor` to inherit text color from parent
- **Accessibility Ready**: Accepts ARIA attributes for screen readers
- **Customizable**: Accepts all standard SVG props for styling and behavior
- **Outlined Style**: Provides a clean, minimal outline version of mail icon

### Visual Characteristics:
- **Viewbox**: 24x24 coordinate system
- **Style**: Outlined/line version (not filled)
- **Design**: Classic envelope with fold lines and mail slot details
- **Fill**: Uses `currentColor` for consistent theming

## State Management
**None** - This is a stateless presentational component that doesn't manage any internal state, use TanStack Query, or Zustand stores.

## Side Effects
**None** - The component has no side effects, doesn't make API calls, or interact with external services. It's a pure rendering component.

## Dependencies

### Internal Dependencies:
- `React.SVGProps<SVGSVGElement>` - TypeScript interface for SVG element props

### No External Dependencies:
- No third-party libraries
- No custom hooks or utilities
- No other components

## Integration

### Application Architecture Role:
- **UI Layer**: Part of the base UI component library in `/components/icons/`
- **Design System**: Provides consistent iconography across the application
- **Reusable Asset**: Can be used in any component that needs an email icon
- **Server-First**: Aligns with server component architecture for optimal performance

### Common Integration Patterns:
```tsx
// In email-related features
const EmailHeader = () => (
  <header className="flex items-center gap-2 mb-4">
    <PiMailLine className="w-6 h-6" />
    <h1 className="text-xl font-semibold">Email Center</h1>
  </header>
);

// In contact forms (server component)
const ContactForm = () => (
  <form className="space-y-4">
    <div className="relative">
      <PiMailLine className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
      <input 
        type="email" 
        name="email"
        className="pl-10 w-full p-2 border rounded"
        placeholder="Your email"
      />
    </div>
  </form>
);

// In navigation menus
const MainNav = () => (
  <nav>
    <Link href="/contact" className="nav-link">
      <PiMailLine className="w-4 h-4" />
      Contact
    </Link>
  </nav>
);
```

## Best Practices

### Architecture Adherence:
✅ **Server Component Default**: No client-side features, perfect for server rendering  
✅ **Component Decomposition**: Single responsibility (mail icon rendering)  
✅ **Reusability**: Flexible props interface for various use cases  
✅ **Performance**: Lightweight SVG with no runtime overhead  

### Usage Recommendations:
1. **Accessibility**: Always provide `aria-label` when icon has semantic meaning
2. **Sizing**: Use Tailwind classes (`w-4 h-4`, `w-6 h-6`) for consistent sizing
3. **Theming**: Leverage `currentColor` with text color utilities
4. **Semantic HTML**: Use appropriate parent elements (`button`, `a`, etc.)
5. **Performance**: Keep as server component unless interactivity needed in parent

### Anti-Patterns to Avoid:
❌ Don't wrap in unnecessary client components  
❌ Don't use for decorative purposes without `aria-hidden="true"`  
❌ Don't inline SVG code - use this reusable component  
❌ Don't override viewBox or core SVG structure props