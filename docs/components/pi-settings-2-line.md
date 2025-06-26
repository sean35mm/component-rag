# PiSettings2Line Icon Component

## Purpose

The `PiSettings2Line` component is an SVG icon that renders a settings/configuration gear symbol with an outlined design. It's part of the application's icon library and is typically used to indicate settings functionality, configuration options, or administrative features in the user interface.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactions, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | All standard SVG element props including `className`, `onClick`, `style`, `aria-label`, etc. |

### Inherited SVG Props
Common props you might use:
- `className` - CSS classes for styling
- `onClick` - Click event handler
- `style` - Inline styles
- `aria-label` - Accessibility label
- `title` - Tooltip text
- `data-*` - Data attributes

## Usage Example

```tsx
import { PiSettings2Line } from '@/components/icons/pi/pi-settings-2-line';

// Basic usage
<PiSettings2Line />

// With custom styling
<PiSettings2Line 
  className="w-6 h-6 text-gray-600 hover:text-blue-600 transition-colors" 
/>

// As a clickable button
<button 
  onClick={() => openSettings()}
  className="p-2 rounded-md hover:bg-gray-100"
>
  <PiSettings2Line className="w-5 h-5" />
  <span className="sr-only">Open Settings</span>
</button>

// In a navigation menu
<nav className="flex items-center gap-4">
  <Link href="/settings" className="flex items-center gap-2">
    <PiSettings2Line className="w-4 h-4" />
    Settings
  </Link>
</nav>

// With dynamic color based on state
<PiSettings2Line 
  className={`w-6 h-6 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} 
/>
```

## Functionality

- **Scalable Vector Graphics**: Renders crisp at any size using `1em` dimensions
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent
- **Responsive Design**: Scales with font-size when using `em` units
- **Accessibility Ready**: Accepts ARIA attributes for screen readers
- **Event Handling**: Supports all standard SVG event handlers
- **CSS Customizable**: Fully styleable with CSS classes and inline styles

## State Management

**None** - This is a stateless presentational component. It doesn't manage any internal state or interact with external state management systems.

## Side Effects

**None** - Pure component with no side effects, API calls, or external interactions.

## Dependencies

### Internal Dependencies
- `SVGProps` from React (TypeScript type definition)

### External Dependencies
- React (implicit JSX usage)

## Integration

### Icon System Integration
```tsx
// Centralized icon exports
export { PiSettings2Line } from './pi/pi-settings-2-line';

// Usage in design system components
const IconButton = ({ icon: Icon, ...props }) => (
  <button className="icon-button" {...props}>
    <Icon className="w-4 h-4" />
  </button>
);

<IconButton icon={PiSettings2Line} onClick={handleSettings} />
```

### Theme Integration
```tsx
// With CSS custom properties
<PiSettings2Line 
  className="icon-settings" 
  style={{ color: 'var(--color-primary)' }} 
/>

// With Tailwind theme colors
<PiSettings2Line className="text-primary-600 dark:text-primary-400" />
```

### Component Composition
```tsx
// In header components
const Header = () => (
  <header className="flex justify-between items-center">
    <Logo />
    <div className="flex items-center gap-2">
      <NotificationIcon />
      <PiSettings2Line className="cursor-pointer" onClick={openSettings} />
    </div>
  </header>
);

// In card components
const SettingsCard = () => (
  <Card>
    <CardHeader>
      <PiSettings2Line className="w-5 h-5 text-blue-600" />
      <CardTitle>Settings</CardTitle>
    </CardHeader>
  </Card>
);
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: Properly implemented as a server component
- ✅ **Flat Structure**: Simple, non-nested component design
- ✅ **Reusable**: Lives in `/icons/` directory for cross-feature usage
- ✅ **Type Safety**: Uses proper TypeScript interfaces

### Usage Patterns
```tsx
// ✅ Good: Semantic usage with accessibility
<button aria-label="Open settings">
  <PiSettings2Line className="w-5 h-5" />
</button>

// ✅ Good: Consistent sizing with design system
<PiSettings2Line className="icon-md text-muted-foreground" />

// ❌ Avoid: Hardcoded colors that don't respect themes
<PiSettings2Line style={{ color: '#ff0000' }} />

// ❌ Avoid: Missing accessibility for interactive usage
<div onClick={handleClick}>
  <PiSettings2Line />
</div>
```

### Performance Optimization
- Icon is tree-shakeable when imported individually
- No runtime dependencies beyond React
- Minimal bundle impact due to SVG optimization
- Can be used in both client and server components efficiently

### Accessibility Considerations
- Always provide `aria-label` when used as interactive element
- Use semantic HTML elements (`button`, `link`) for clickable icons
- Consider `role="img"` and `aria-labelledby` for decorative usage
- Ensure sufficient color contrast for icon visibility