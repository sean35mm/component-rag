# PiEarthLine Icon Component

## Purpose

The `PiEarthLine` component is an SVG-based icon component that renders an earth/globe outline icon. It's part of the Pi icon collection and provides a clean, scalable earth icon for use in applications to represent global concepts, world-wide features, internationalization, or location-related functionality.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG content without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and hydrated on the client.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including className, style, onClick, etc. Allows full customization of the SVG element |

## Usage Example

```tsx
import { PiEarthLine } from '@/components/icons/pi/pi-earth-line';

// Basic usage
export function GlobalFeatures() {
  return (
    <div className="flex items-center gap-2">
      <PiEarthLine />
      <span>Global Settings</span>
    </div>
  );
}

// With custom styling
export function LocationSelector() {
  return (
    <button className="flex items-center gap-2 p-2 hover:bg-gray-100">
      <PiEarthLine 
        className="text-blue-600" 
        width="20" 
        height="20"
      />
      <span>Select Region</span>
    </button>
  );
}

// With click handler
export function WorldMapToggle() {
  const handleToggleMap = () => {
    // Toggle world map view
  };

  return (
    <PiEarthLine 
      className="cursor-pointer text-gray-700 hover:text-blue-600 transition-colors"
      onClick={handleToggleMap}
      role="button"
      aria-label="Toggle world map view"
    />
  );
}

// In navigation or menu
export function GlobalNavigation() {
  return (
    <nav className="flex items-center space-x-4">
      <a href="/regions" className="flex items-center gap-2">
        <PiEarthLine className="w-5 h-5" />
        Regions
      </a>
    </nav>
  );
}
```

## Functionality

- **Scalable Vector Icon**: Renders as an SVG with responsive sizing using `1em` dimensions
- **Theme Integration**: Uses `currentColor` fill to inherit text color from parent elements
- **Accessibility Ready**: Accepts ARIA attributes and standard SVG accessibility props
- **Style Customization**: Supports all standard SVG styling through className, style, and SVG-specific props
- **Event Handling**: Can receive click handlers and other event listeners
- **Earth Design**: Features a detailed earth outline with continental landmasses and circular border

## State Management

**No State Management** - This is a pure presentational component with no internal state. It renders static SVG content based on the props passed to it.

## Side Effects

**No Side Effects** - This component has no side effects, API calls, or external interactions. It's a pure rendering component.

## Dependencies

### Internal Dependencies
- React's `SVGProps` type for proper TypeScript support

### External Dependencies
- None - This is a self-contained icon component

## Integration

This component integrates into the application architecture as:

- **UI Component Layer**: Part of the foundational UI icon system in `/components/icons/`
- **Design System**: Contributes to the consistent iconography across the application
- **Reusable Asset**: Can be used across different feature domains for earth/global representations
- **Theme Compatible**: Works seamlessly with design system color schemes and theming

### Common Integration Patterns

```tsx
// In feature components
import { PiEarthLine } from '@/components/icons/pi/pi-earth-line';

// Global settings page
export function SettingsLayout() {
  return (
    <section>
      <h2 className="flex items-center gap-2">
        <PiEarthLine className="text-green-600" />
        Global Configuration
      </h2>
    </section>
  );
}

// Location picker component
export function LocationPicker() {
  return (
    <div className="relative">
      <PiEarthLine className="absolute left-3 top-3 text-gray-400" />
      <select className="pl-10 pr-4 py-2">
        <option>Select Country</option>
      </select>
    </div>
  );
}
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: Correctly implemented as a server component with no client-side dependencies
- ✅ **Component Decomposition**: Simple, focused component that does one thing well
- ✅ **Reusability**: Highly reusable across different feature domains
- ✅ **Props Interface**: Uses standard SVG props for maximum flexibility

### Usage Recommendations
- Use `className` for styling instead of inline styles when possible
- Provide `aria-label` when used as interactive elements
- Consider wrapping in semantic HTML elements (`<button>`, `<a>`) for interactivity
- Use consistent sizing props (`width`, `height`) for uniform appearance
- Leverage `currentColor` behavior by setting text color on parent elements

### Performance Considerations
- Renders efficiently as inline SVG without external dependencies
- No runtime overhead beyond basic React rendering
- Can be tree-shaken effectively if not used
- Suitable for server-side rendering and static generation