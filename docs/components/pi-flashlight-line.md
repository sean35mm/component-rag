# PiFlashlightLine Component

## Purpose

The `PiFlashlightLine` component is a pure SVG icon component that renders a flashlight icon in line/outline style. It's part of the Phosphor Icons (Pi) collection and serves as a visual element for flashlight-related features, lighting controls, or brightness toggles in the application.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG content without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

### Common SVG Props
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role
- `title` - Tooltip text

## Usage Example

```tsx
import { PiFlashlightLine } from '@/components/icons/pi/pi-flashlight-line';

// Basic usage
export function FlashlightButton() {
  return (
    <button className="p-2 rounded-md hover:bg-gray-100">
      <PiFlashlightLine className="w-5 h-5 text-gray-600" />
      <span className="sr-only">Toggle flashlight</span>
    </button>
  );
}

// With click handler
export function FlashlightControl() {
  const handleToggleFlashlight = () => {
    // Toggle flashlight functionality
  };

  return (
    <PiFlashlightLine 
      className="w-6 h-6 text-blue-500 cursor-pointer hover:text-blue-600"
      onClick={handleToggleFlashlight}
      aria-label="Toggle flashlight"
      role="button"
    />
  );
}

// In a feature component
export function CameraControls() {
  return (
    <div className="flex gap-2 p-4">
      <button className="flex items-center gap-2">
        <PiFlashlightLine className="w-4 h-4" />
        Flash
      </button>
    </div>
  );
}

// Different sizes
export function FlashlightIcons() {
  return (
    <div className="flex items-center gap-4">
      <PiFlashlightLine className="w-4 h-4" /> {/* Small */}
      <PiFlashlightLine className="w-6 h-6" /> {/* Medium */}
      <PiFlashlightLine className="w-8 h-8" /> {/* Large */}
    </div>
  );
}
```

## Functionality

- **SVG Rendering**: Renders a scalable flashlight icon using SVG paths
- **Responsive Sizing**: Uses `1em` width/height, scales with parent font-size or can be controlled via CSS classes
- **Color Inheritance**: Uses `currentColor` fill, inheriting text color from parent elements
- **Accessibility**: Accepts ARIA attributes for screen reader compatibility
- **Event Handling**: Supports all standard SVG event handlers (click, hover, etc.)

## State Management

**No State Management** - This is a stateless presentational component. Any state-related functionality should be handled by parent components using:
- **TanStack Query** for server state (if icon represents data from API)
- **Zustand** for complex client state (flashlight on/off state across app)
- **Local state** for simple toggle functionality in parent components

## Side Effects

**No Side Effects** - This component has no side effects, API calls, or external interactions. It's a pure rendering component.

## Dependencies

### Internal Dependencies
- React's `SVGProps` type for prop typing

### External Dependencies
- None - completely self-contained

### Related Components
- Other Pi icon components in the same collection
- Button components that might wrap this icon
- Form controls that use this icon for flashlight/brightness features

## Integration

### UI Component Layer
```tsx
// In /components/ui/button.tsx
import { PiFlashlightLine } from '@/components/icons/pi/pi-flashlight-line';

export function IconButton({ icon: Icon, ...props }) {
  return (
    <button {...props}>
      <Icon className="w-4 h-4" />
    </button>
  );
}
```

### Feature Component Layer
```tsx
// In /components/camera/camera-controls.tsx
import { PiFlashlightLine } from '@/components/icons/pi/pi-flashlight-line';
import { useCameraStore } from '@/stores/camera-store';

export function CameraControls() {
  const { flashEnabled, toggleFlash } = useCameraStore();
  
  return (
    <button 
      onClick={toggleFlash}
      className={`p-2 rounded ${flashEnabled ? 'bg-yellow-100' : 'bg-gray-100'}`}
    >
      <PiFlashlightLine 
        className={`w-5 h-5 ${flashEnabled ? 'text-yellow-600' : 'text-gray-600'}`}
      />
    </button>
  );
}
```

### Application Architecture
- **Design System**: Part of the icon library for consistent visual language
- **Component Composition**: Can be composed with buttons, controls, and interactive elements
- **Theme Integration**: Respects design system colors through `currentColor`

## Best Practices

### ✅ Following Architecture Guidelines

1. **Server Component**: Correctly implemented as server component (no 'use client' needed)
2. **Component Decomposition**: Simple, focused component that stacks well with other UI components
3. **Reusability**: Located in appropriate path for icon components, highly reusable
4. **Props Interface**: Uses standard SVG props for maximum flexibility

### ✅ Recommended Usage Patterns

```tsx
// Good: Semantic usage with accessibility
<button aria-label="Toggle flashlight">
  <PiFlashlightLine className="w-5 h-5" />
</button>

// Good: Consistent sizing with design system
<PiFlashlightLine className="w-icon-sm h-icon-sm text-primary" />

// Good: Conditional styling based on state
<PiFlashlightLine 
  className={cn("w-6 h-6", isActive ? "text-yellow-500" : "text-gray-400")}
/>
```

### ❌ Anti-patterns to Avoid

```tsx
// Bad: Inline styles instead of CSS classes
<PiFlashlightLine style={{ width: '20px', height: '20px' }} />

// Bad: Missing accessibility for interactive usage
<div onClick={handler}>
  <PiFlashlightLine />
</div>

// Bad: Hardcoded colors that don't respect theme
<PiFlashlightLine style={{ color: '#ffff00' }} />
```

### Integration Best Practices

- Always provide accessibility attributes when used interactively
- Use consistent sizing classes from design system
- Leverage `currentColor` for theme-aware coloring
- Compose with semantic HTML elements (buttons, links)
- Consider loading states and error states in parent components