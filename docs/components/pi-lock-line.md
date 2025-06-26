# PiLockLine Icon Component

## Purpose

The `PiLockLine` component is an SVG icon component that renders a line-style lock icon. This component is part of the icon library and provides a visual representation of security, privacy, or access control features throughout the application. It's designed to be flexible, accessible, and easily integrated into various UI contexts where lock symbolism is needed.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server, improving performance and reducing client-side bundle size.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including className, style, onClick, etc. Spread onto the root SVG element |

### Inherited SVG Props
Common props you can pass through `SVGProps<SVGSVGElement>`:
- `className`: CSS classes for styling
- `style`: Inline styles
- `onClick`: Click event handler
- `onMouseEnter/Leave`: Mouse event handlers
- `aria-label`: Accessibility label
- `role`: ARIA role
- `data-*`: Data attributes

## Usage Example

```tsx
import { PiLockLine } from '@/components/icons/pi/pi-lock-line';

// Basic usage
<PiLockLine />

// With custom styling
<PiLockLine 
  className="text-blue-600 hover:text-blue-800" 
  style={{ fontSize: '24px' }}
/>

// As a clickable button icon
<button 
  onClick={() => toggleLock()}
  className="p-2 rounded hover:bg-gray-100"
  aria-label="Toggle lock status"
>
  <PiLockLine className="w-5 h-5" />
</button>

// In a form field with security indicator
<div className="flex items-center gap-2">
  <PiLockLine className="text-green-600" />
  <span>Secure Connection</span>
</div>

// With accessibility attributes
<PiLockLine 
  role="img"
  aria-label="Locked content"
  className="text-red-500"
/>
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisp at any size using SVG
- **Current Color Inheritance**: Uses `fill='currentColor'` to inherit text color from parent
- **Responsive Sizing**: Default 1em × 1em sizing adapts to parent font size
- **Accessibility Ready**: Accepts ARIA attributes for screen reader compatibility
- **Event Handling**: Supports all standard SVG/DOM events through prop spreading
- **CSS Integration**: Fully compatible with CSS classes and inline styles

### Visual Design
- **24×24 viewBox**: Standard icon sizing for consistent alignment
- **Line Style**: Outlined/stroke design rather than filled
- **Lock Elements**: Shows padlock body and shackle in unlocked position
- **Keyhole Detail**: Includes traditional keyhole design element

## State Management

**No State Management** - This is a stateless presentational component that doesn't manage any internal state, server state, or global state. It purely renders SVG markup based on the props provided.

## Side Effects

**No Side Effects** - The component has no side effects, API calls, or external interactions. It's a pure function that renders SVG content deterministically based on its props.

## Dependencies

### Direct Dependencies
- `react`: Uses `SVGProps` type for prop typing
- No runtime dependencies beyond React

### Related Components
- Other icon components in `/components/icons/pi/` directory
- UI components that might use this icon (buttons, form fields, cards)
- Layout components where security indicators are needed

## Integration

### Application Architecture Integration

```tsx
// In security-related UI components
import { PiLockLine } from '@/components/icons/pi/pi-lock-line';

// Authentication forms
const LoginForm = () => (
  <form>
    <div className="relative">
      <PiLockLine className="absolute left-3 top-3 text-gray-400" />
      <input type="password" className="pl-10" />
    </div>
  </form>
);

// Security status indicators
const SecurityBadge = ({ isSecure }: { isSecure: boolean }) => (
  <div className={`flex items-center gap-1 ${isSecure ? 'text-green-600' : 'text-red-600'}`}>
    <PiLockLine />
    <span>{isSecure ? 'Secure' : 'Unsecure'}</span>
  </div>
);

// Navigation with protected routes
const NavItem = ({ isProtected, children }: { isProtected: boolean, children: React.ReactNode }) => (
  <div className="flex items-center gap-2">
    {isProtected && <PiLockLine className="w-4 h-4 text-amber-500" />}
    {children}
  </div>
);
```

## Best Practices

### Architectural Adherence
- ✅ **Server Component**: No 'use client' directive needed, renders on server
- ✅ **Component Decomposition**: Single responsibility (icon rendering)
- ✅ **Flat Structure**: No unnecessary nesting, direct SVG rendering
- ✅ **Reusability**: Generic icon component usable across domains
- ✅ **TypeScript**: Proper typing with SVGProps extension

### Usage Recommendations

```tsx
// ✅ Good: Semantic usage with proper accessibility
<button aria-label="Lock account">
  <PiLockLine />
</button>

// ✅ Good: Consistent sizing with Tailwind
<PiLockLine className="w-5 h-5 text-blue-600" />

// ✅ Good: Color inheritance
<div className="text-red-500">
  <PiLockLine /> {/* Inherits red color */}
</div>

// ❌ Avoid: Hardcoded sizing that breaks responsive design
<PiLockLine style={{ width: '20px', height: '20px' }} />

// ❌ Avoid: Missing accessibility context
<PiLockLine onClick={handleClick} /> {/* Should be wrapped in button or have proper ARIA */}
```

### Performance Considerations
- Icon is lightweight SVG with minimal DOM nodes
- No JavaScript bundle impact (server-rendered)
- CSS-based styling avoids inline style recalculations
- Reusable across components without duplication