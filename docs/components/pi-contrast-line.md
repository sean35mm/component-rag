# PiContrastLine Icon Component

## Purpose

The `PiContrastLine` component is a React SVG icon that renders a contrast/brightness symbol, typically used in UI controls for visual settings, theme toggles, or display adjustments. It displays a circle with half filled and half empty sections to represent contrast or light/dark mode functionality.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element properties including className, style, onClick, etc. |

### Common SVG Props
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `width` | `string \| number` | Override default width (1em) |
| `height` | `string \| number` | Override default height (1em) |
| `fill` | `string` | Override fill color (defaults to currentColor) |

## Usage Example

```tsx
import { PiContrastLine } from '@/components/icons/pi/pi-contrast-line';

// Basic usage
export function ThemeToggle() {
  return (
    <button className="p-2 rounded-lg hover:bg-gray-100">
      <PiContrastLine className="w-5 h-5" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

// With custom styling
export function DisplaySettings() {
  return (
    <div className="flex items-center gap-2">
      <PiContrastLine 
        className="w-6 h-6 text-blue-600" 
        style={{ filter: 'drop-shadow(0 1px 2px rgb(0 0 0 / 0.1))' }}
      />
      <span>Contrast Settings</span>
    </div>
  );
}

// With click handler
export function ContrastControl({ onToggle }: { onToggle: () => void }) {
  return (
    <PiContrastLine 
      className="w-4 h-4 cursor-pointer hover:text-gray-600 transition-colors"
      onClick={onToggle}
      role="button"
      tabIndex={0}
      aria-label="Adjust contrast"
    />
  );
}

// Responsive sizing
export function ResponsiveIcon() {
  return (
    <PiContrastLine className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
  );
}
```

## Functionality

- **Scalable Vector Graphics**: Renders crisp at any size using SVG format
- **Color Inheritance**: Uses `currentColor` to inherit text color from parent elements
- **Responsive Sizing**: Uses `1em` dimensions to scale with font size
- **Accessibility Ready**: Accepts ARIA attributes and event handlers
- **Customizable**: Supports all standard SVG properties for styling and behavior

## State Management

**No State Management** - This is a stateless presentational component that doesn't manage any internal state or interact with external state management systems.

## Side Effects

**No Side Effects** - Pure functional component with no API calls, localStorage access, or other side effects.

## Dependencies

### Internal Dependencies
- `React.SVGProps` type from React for TypeScript support

### External Dependencies
- React (peer dependency)

## Integration

This icon component integrates into the application architecture as:

- **UI Building Block**: Part of the foundational UI component library in `/components/icons/`
- **Design System**: Consistent with other Pi icon family components for unified visual language
- **Theme Integration**: Works seamlessly with CSS custom properties and Tailwind CSS color utilities
- **Component Composition**: Can be composed into buttons, navigation items, settings panels, and other UI elements

### Common Integration Patterns

```tsx
// In theme toggle components
import { PiContrastLine } from '@/components/icons/pi/pi-contrast-line';
import { useTheme } from '@/hooks/use-theme';

// In settings panels
import { PiContrastLine } from '@/components/icons/pi/pi-contrast-line';
import { SettingsCard } from '@/components/ui/settings-card';

// In navigation menus
import { PiContrastLine } from '@/components/icons/pi/pi-contrast-line';
import { NavigationItem } from '@/components/navigation/navigation-item';
```

## Best Practices

### ✅ Adherence to Architecture Patterns

- **Server-First**: Properly implemented as server component for optimal performance
- **Component Decomposition**: Atomic, reusable icon that can be composed into larger components
- **Flat Structure**: Simple, focused component without unnecessary nesting
- **TypeScript Integration**: Properly typed with React.SVGProps for type safety

### ✅ Recommended Usage

```tsx
// Good: Semantic usage with proper labeling
<button aria-label="Toggle dark mode">
  <PiContrastLine className="w-5 h-5" />
</button>

// Good: Consistent sizing with Tailwind classes
<PiContrastLine className="w-4 h-4 text-gray-500" />

// Good: Composition with other UI components
<SettingsItem icon={<PiContrastLine />} label="Display Settings" />
```

### ❌ Anti-Patterns to Avoid

```tsx
// Avoid: Missing accessibility labels
<PiContrastLine onClick={handleClick} />

// Avoid: Inline styles when CSS classes are available
<PiContrastLine style={{ width: '16px', height: '16px' }} />

// Avoid: Wrapping in unnecessary client components
'use client';
export function ClientIcon() {
  return <PiContrastLine />;
}
```