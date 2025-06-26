# PiGlobalLine Icon Component

## Purpose

The `PiGlobalLine` component is an SVG icon that renders a line-style globe symbol, commonly used to represent global, worldwide, or international concepts in user interfaces. This component is part of the icon library and provides a consistent, scalable globe icon that adapts to text size and color themes.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

### Common SVG Props
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role attribute |

## Usage Example

```tsx
import { PiGlobalLine } from '@/components/icons/pi/pi-global-line';

// Basic usage
export function LanguageSelector() {
  return (
    <div className="flex items-center gap-2">
      <PiGlobalLine />
      <span>Select Language</span>
    </div>
  );
}

// With custom styling
export function GlobalNavigation() {
  return (
    <button className="flex items-center gap-2 p-2 hover:bg-gray-100">
      <PiGlobalLine 
        className="text-blue-600 text-lg" 
        aria-label="Global settings"
      />
      <span>Global Settings</span>
    </button>
  );
}

// In a feature component
export function MultiRegionStatus() {
  return (
    <div className="status-card">
      <div className="flex items-center gap-3">
        <PiGlobalLine className="text-2xl text-green-500" />
        <div>
          <h3>Global Deployment</h3>
          <p>Active in 12 regions</p>
        </div>
      </div>
    </div>
  );
}

// Interactive usage
export function RegionToggle() {
  const [isGlobalMode, setIsGlobalMode] = useState(false);
  
  return (
    <button
      onClick={() => setIsGlobalMode(!isGlobalMode)}
      className={`flex items-center gap-2 p-3 rounded-lg transition-colors ${
        isGlobalMode ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'
      }`}
    >
      <PiGlobalLine className="text-xl" />
      <span>{isGlobalMode ? 'Global Mode' : 'Local Mode'}</span>
    </button>
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisp at any size using `1em` dimensions
- **Theme Adaptive**: Uses `currentColor` fill to inherit text color
- **Accessible**: Supports all standard ARIA attributes via props spreading
- **Responsive**: Automatically scales with font size using `em` units
- **Customizable**: Accepts all standard SVG props for styling and behavior

### Visual Design
- Line-style globe illustration with meridian and equator lines
- Circle outline representing Earth
- Horizontal line representing the equator
- Vertical ellipse representing meridian lines
- Clean, minimal design suitable for professional interfaces

## State Management

**No State Management** - This is a pure functional component that renders static SVG content. It doesn't manage any internal state or connect to external state management systems.

## Side Effects

**No Side Effects** - The component has no side effects, API calls, or external interactions. It's a pure rendering component.

## Dependencies

### Internal Dependencies
- `SVGProps` from React for TypeScript prop definitions

### External Dependencies
- None - completely self-contained component

## Integration

### Icon Library Architecture
```
src/components/icons/
├── pi/                     # Phosphor Icons collection
│   ├── pi-global-line.tsx  # This component
│   ├── pi-home.tsx
│   └── ...
├── lucide/                 # Lucide Icons collection
└── index.ts               # Re-exports for easier imports
```

### Usage Patterns
- **Navigation Components**: Global settings, language selectors, region switchers
- **Feature Indicators**: Multi-region deployments, worldwide services, international features
- **Status Displays**: Global system status, worldwide connectivity, international coverage
- **Action Buttons**: Export globally, share worldwide, international distribution

### Common Integration Points
```tsx
// In navigation components
import { PiGlobalLine } from '@/components/icons/pi/pi-global-line';

// In feature-specific components
import { PiGlobalLine } from '@/components/icons/pi/pi-global-line';

// Potential barrel export usage
import { PiGlobalLine } from '@/components/icons';
```

## Best Practices

### Architectural Adherence
- ✅ **Server Component**: Properly implemented as server component for optimal performance
- ✅ **Component Decomposition**: Small, focused, single-responsibility component
- ✅ **Reusability**: Located in `/icons/` directory for cross-application usage
- ✅ **Props Interface**: Uses standard React patterns with proper TypeScript support

### Accessibility Guidelines
```tsx
// Always provide context for screen readers
<PiGlobalLine aria-label="Global settings" />

// Use semantic HTML structure
<button aria-label="Switch to global view">
  <PiGlobalLine aria-hidden="true" />
  <span className="sr-only">Global View</span>
</button>

// Provide adequate color contrast
<PiGlobalLine className="text-gray-700 dark:text-gray-300" />
```

### Performance Considerations
- Icons are lightweight SVG components suitable for frequent rendering
- No runtime overhead from state management or effects
- Can be safely used in lists, tables, or repeated UI elements
- Consider icon sprite sheets for applications with hundreds of icons

### Styling Best Practices
```tsx
// Use Tailwind classes for consistent sizing
<PiGlobalLine className="text-sm" />   // 14px
<PiGlobalLine className="text-lg" />   // 18px
<PiGlobalLine className="text-2xl" />  // 24px

// Maintain color consistency
<PiGlobalLine className="text-primary" />
<PiGlobalLine className="text-muted-foreground" />

// Ensure proper spacing in layouts
<div className="flex items-center gap-2">
  <PiGlobalLine />
  <span>Content</span>
</div>
```