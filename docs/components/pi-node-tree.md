# PiNodeTree Icon Component

## Purpose
The `PiNodeTree` component is an SVG icon that represents a hierarchical tree structure or organizational chart. It displays connected nodes in a tree-like arrangement, commonly used in navigation menus, file explorers, organizational diagrams, or any interface requiring visual representation of hierarchical data relationships.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG content without any interactive behavior, state management, or browser-specific APIs. It can be safely rendered on the server side for optimal performance.

## Props Interface
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Spread to the root `<svg>` element |

### Common SVG Props
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role attribute
- `data-*` - Data attributes

## Usage Example

```tsx
import { PiNodeTree } from '@/components/icons/pi/pi-node-tree';

// Basic usage
export function NavigationHeader() {
  return (
    <div className="flex items-center gap-2">
      <PiNodeTree className="text-gray-600" />
      <span>Site Map</span>
    </div>
  );
}

// Interactive usage with click handler
export function TreeViewToggle({ onToggle }: { onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
      aria-label="Toggle tree view"
    >
      <PiNodeTree className="w-5 h-5 text-blue-600" />
      <span>Tree View</span>
    </button>
  );
}

// Styled usage with custom size
export function OrganizationChart() {
  return (
    <div className="text-center">
      <PiNodeTree 
        className="mx-auto mb-4 text-green-500" 
        style={{ fontSize: '2rem' }}
      />
      <h3>Company Structure</h3>
    </div>
  );
}

// With accessibility features
export function AccessibleTreeIcon() {
  return (
    <PiNodeTree 
      role="img"
      aria-label="Hierarchical tree structure"
      className="text-current"
    />
  );
}
```

## Functionality
- **Scalable Vector Graphics**: Renders crisp at any size using `1em` dimensions that scale with font size
- **Theme Integration**: Uses `currentColor` fill to inherit text color from parent elements
- **Flexible Styling**: Accepts all standard SVG props for complete customization
- **Accessibility Ready**: Can be enhanced with ARIA attributes for screen readers
- **Tree Structure Visual**: Displays interconnected nodes representing hierarchical relationships

## State Management
**None** - This is a stateless presentational component. It doesn't manage any internal state and relies entirely on props for configuration.

## Side Effects
**None** - Pure component with no side effects, API calls, or external interactions. Simply renders SVG markup based on provided props.

## Dependencies
- `react` - Uses `SVGProps` type from React
- No external dependencies or other components

## Integration
This icon component integrates into the application's design system following these patterns:

- **Icon Library Structure**: Part of the organized icon collection under `/components/icons/pi/`
- **Design System**: Consistent sizing (`1em`) and color inheritance (`currentColor`) across all icons
- **Accessibility**: Can be enhanced with ARIA attributes when used in interactive contexts
- **Styling**: Seamlessly works with Tailwind CSS classes and custom CSS
- **Component Composition**: Easily embedded in buttons, headers, navigation elements, and data visualization components

## Best Practices

### ✅ Recommended Patterns
```tsx
// Semantic usage with proper labeling
<PiNodeTree aria-label="Organization chart" role="img" />

// Consistent sizing with Tailwind
<PiNodeTree className="w-4 h-4 text-gray-500" />

// Interactive elements with accessibility
<button aria-label="View site structure">
  <PiNodeTree />
</button>
```

### ❌ Anti-Patterns
```tsx
// Avoid inline styles when Tailwind classes exist
<PiNodeTree style={{ width: '16px', color: 'gray' }} />

// Don't use without context in interactive elements
<div onClick={handleClick}>
  <PiNodeTree /> {/* Missing accessibility context */}
</div>
```

### Architecture Alignment
- **Reusability**: Follows UI component patterns in `/components/icons/` directory
- **Composability**: Designed to be embedded in higher-level feature components
- **Consistency**: Maintains uniform icon API across the application
- **Performance**: Server-rendered for optimal loading performance
- **Maintainability**: Single responsibility principle with clear separation of concerns