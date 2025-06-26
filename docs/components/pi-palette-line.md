# PiPaletteLine Component

## Purpose
The `PiPaletteLine` component renders an SVG icon representing a painter's palette with a brush. This is a presentational icon component used throughout the application to indicate color selection, theming, customization features, or design-related functionality.

## Component Type
**Server Component** - This is a pure presentational SVG icon component with no interactivity, state management, or browser-specific APIs. It can safely render on the server, improving initial page load performance.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including className, style, onClick, etc. Spread to the root SVG element |

### Extended SVG Props
Common props you might use:
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role
- `width` / `height` - Override default 1em sizing

## Usage Example

```tsx
import { PiPaletteLine } from '@/components/icons/pi/pi-palette-line';

// Basic usage
function ColorPicker() {
  return (
    <button className="flex items-center gap-2">
      <PiPaletteLine />
      Choose Colors
    </button>
  );
}

// With custom styling
function ThemeSelector() {
  return (
    <div className="theme-controls">
      <PiPaletteLine 
        className="text-blue-500 hover:text-blue-700" 
        aria-label="Theme customization"
        width="24"
        height="24"
      />
    </div>
  );
}

// In a navigation menu
function DesignToolsMenu() {
  return (
    <nav>
      <button 
        onClick={() => openDesignPanel()}
        className="nav-button"
      >
        <PiPaletteLine className="w-5 h-5" />
        <span>Design Tools</span>
      </button>
    </nav>
  );
}

// With conditional rendering
function CustomizationToggle({ showCustomization }: { showCustomization: boolean }) {
  return (
    <PiPaletteLine 
      className={`transition-colors ${
        showCustomization ? 'text-accent' : 'text-muted'
      }`}
    />
  );
}
```

## Functionality
- **SVG Rendering**: Displays a scalable vector icon of a paint palette with brush
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Current Color**: Uses `fill='currentColor'` to inherit text color from parent
- **Accessibility Ready**: Accepts ARIA attributes for screen reader compatibility
- **Style Inheritance**: Inherits styling through CSS classes and inline styles
- **Event Handling**: Supports all standard SVG event handlers when needed

## State Management
**No State Management** - This is a stateless presentational component that doesn't manage any internal state, server state, or client state. It purely renders based on the props passed to it.

## Side Effects
**No Side Effects** - This component has no side effects, API calls, or external interactions. It's a pure rendering component.

## Dependencies
- **React**: Uses `SVGProps` type from React
- **No External Dependencies**: Self-contained icon component

## Integration
This icon component integrates into the larger application architecture as:

- **UI Layer**: Part of the foundational UI icon system in `/components/icons/`
- **Design System**: Consistent with other Phosphor icon components for visual harmony
- **Feature Components**: Used by domain-specific components for color/theme functionality
- **Accessibility**: Supports application-wide accessibility standards through ARIA props

### Common Integration Patterns:
```tsx
// In a design tool feature
import { PiPaletteLine } from '@/components/icons/pi/pi-palette-line';

function ColorCustomizationPanel() {
  return (
    <Card>
      <CardHeader>
        <PiPaletteLine className="w-6 h-6" />
        <h3>Color Customization</h3>
      </CardHeader>
      {/* Panel content */}
    </Card>
  );
}

// In theme switching functionality
function ThemeToggle() {
  const { setTheme } = useTheme();
  
  return (
    <Button 
      variant="ghost" 
      onClick={() => setTheme('custom')}
    >
      <PiPaletteLine />
    </Button>
  );
}
```

## Best Practices

### ✅ Adherence to Architecture Guidelines

1. **Server Component Default**: Correctly implemented as a server component since no client-side features are needed

2. **Component Decomposition**: 
   - Single responsibility (icon rendering)
   - Flat structure - doesn't nest other components
   - Composable with other UI components

3. **Reusability**: 
   - Located in `/components/icons/` for reuse across features
   - Generic props interface allows flexible usage
   - No hardcoded styling or behavior

4. **Performance**: 
   - Lightweight SVG implementation
   - No runtime dependencies
   - Server-renderable for optimal loading

### 🎯 Usage Recommendations

- Use `className` for styling instead of inline styles when possible
- Provide `aria-label` when the icon's meaning isn't clear from context
- Combine with text labels for better UX in interactive elements
- Leverage the `currentColor` fill for consistent theming
- Size appropriately using Tailwind classes (`w-4 h-4`, `w-5 h-5`, etc.)

### 🚫 Anti-patterns to Avoid

- Don't add `'use client'` unless wrapping with interactive behavior
- Don't hardcode colors - use CSS classes for theme consistency
- Don't use for decorative purposes without proper ARIA handling
- Avoid excessive prop drilling - keep usage simple and direct