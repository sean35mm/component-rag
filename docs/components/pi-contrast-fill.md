# PiContrastFill Icon Component

## Purpose
The `PiContrastFill` component is a filled contrast adjustment icon that renders an SVG depicting a circle with half-filled contrast visualization. This icon is commonly used in UI elements related to display settings, theme toggles, accessibility controls, or image editing features where contrast adjustment is available.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG content without any client-side interactivity, event handlers, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | Standard SVG element props including className, style, onClick, etc. Spread to the root SVG element |

## Usage Example

```tsx
import { PiContrastFill } from '@/components/icons/pi/pi-contrast-fill';

// Basic usage
export function DisplaySettings() {
  return (
    <div className="settings-panel">
      <button className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
        <PiContrastFill className="w-5 h-5 text-gray-600" />
        <span>Adjust Contrast</span>
      </button>
    </div>
  );
}

// Theme toggle usage
export function ThemeToggle({ onToggle }: { onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
      aria-label="Toggle contrast theme"
    >
      <PiContrastFill 
        className="w-6 h-6 text-blue-600" 
        role="img"
        aria-hidden="true"
      />
    </button>
  );
}

// Accessibility settings
export function AccessibilityControls() {
  return (
    <div className="accessibility-controls">
      <label className="flex items-center gap-3 cursor-pointer">
        <PiContrastFill className="w-4 h-4 text-purple-600 flex-shrink-0" />
        <span>High Contrast Mode</span>
        <input type="checkbox" className="ml-auto" />
      </label>
    </div>
  );
}
```

## Functionality
- **SVG Rendering**: Renders a scalable vector graphic of a contrast adjustment icon
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent
- **Accessibility Ready**: Accepts ARIA attributes and can be used with screen readers
- **Customizable**: Accepts all standard SVG props for styling and event handling

## State Management
**None** - This is a stateless presentational component that doesn't manage any internal state. It simply renders SVG markup based on the props passed to it.

## Side Effects
**None** - This component has no side effects. It doesn't perform API calls, interact with browser APIs, or cause any external state changes.

## Dependencies
- **React**: Uses `SVGProps` type from React for prop typing
- **No External Dependencies**: Self-contained component with no external library dependencies

## Integration
This icon component follows our flat component architecture and integrates seamlessly within the application:

- **Icon System**: Part of the Phosphor Icons (`pi`) collection in `/components/icons/pi/`
- **Design System**: Integrates with Tailwind CSS classes for consistent styling
- **Reusable UI**: Can be used across different domains (settings, accessibility, themes)
- **Component Composition**: Easily composable with buttons, labels, and other UI elements

```tsx
// Example integration in a settings feature
import { PiContrastFill } from '@/components/icons/pi/pi-contrast-fill';
import { Button } from '@/components/ui/button';

export function DisplaySettingsCard() {
  return (
    <div className="card">
      <div className="card-header">
        <PiContrastFill className="w-5 h-5" />
        <h3>Display Settings</h3>
      </div>
      <div className="card-content">
        {/* Settings content */}
      </div>
    </div>
  );
}
```

## Best Practices
- **Accessibility**: Always provide appropriate ARIA labels when used as interactive elements
- **Sizing**: Use Tailwind size classes (`w-4 h-4`, `w-5 h-5`) rather than inline styles
- **Color**: Leverage `currentColor` by setting text color on parent elements
- **Semantic Usage**: Use in contexts related to contrast, display settings, or visual adjustments
- **Composition**: Combine with text labels for better user experience
- **Performance**: No performance concerns as it's a lightweight SVG component

This component adheres to our architectural patterns by being a focused, reusable UI component that can be easily integrated across different feature domains while maintaining consistent styling and behavior.