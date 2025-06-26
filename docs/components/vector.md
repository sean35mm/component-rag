# Vector Icon Component

## Purpose

The `Vector` component is a lightweight, reusable SVG icon that renders a star/sparkle shape. It serves as part of the application's icon system, providing consistent visual elements for UI decoration, status indicators, or interactive elements that need a distinctive star-like symbol.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server, contributing to better performance and SEO.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGAttributes<SVGElement>` | No | `{}` | All standard SVG attributes including `className`, `style`, `onClick`, `aria-label`, etc. Allows full customization of the SVG element. |

**Inherited SVG Attributes:**
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role
- `data-*` - Data attributes
- And all other standard SVG element attributes

## Usage Example

```tsx
import { Vector } from '@/components/icons/vector';

// Basic usage
export function FeatureHighlight() {
  return (
    <div className="flex items-center gap-2">
      <Vector />
      <span>Premium Feature</span>
    </div>
  );
}

// With custom styling and accessibility
export function StatusIndicator({ isPremium }: { isPremium: boolean }) {
  return (
    <div className="flex items-center">
      {isPremium && (
        <Vector 
          className="text-yellow-500 w-4 h-4" 
          aria-label="Premium status"
          role="img"
        />
      )}
      <span>Account Status</span>
    </div>
  );
}

// Interactive usage
export function FavoriteButton({ onToggle }: { onToggle: () => void }) {
  return (
    <button 
      onClick={onToggle}
      className="p-2 hover:bg-gray-100 rounded"
    >
      <Vector 
        className="text-blue-600 transition-colors hover:text-blue-800"
        aria-label="Mark as favorite"
      />
    </button>
  );
}

// In a list or grid context
export function PremiumFeatureList({ features }: { features: string[] }) {
  return (
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-2">
          <Vector className="text-purple-500 flex-shrink-0" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}
```

## Functionality

### Core Features
- **Scalable Vector Graphics**: Renders crisp at any size using SVG format
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent
- **Flexible Styling**: Accepts all standard SVG attributes for customization
- **Accessibility Ready**: Can be enhanced with ARIA labels and roles

### Visual Characteristics
- **ViewBox**: `0 0 12 12` - optimized 12x12 unit coordinate system
- **Shape**: Eight-pointed star/sparkle with tapered rays
- **Fill**: Solid fill using current text color
- **Proportions**: Symmetrical design with balanced visual weight

## State Management

**No State Management** - This is a stateless presentational component that doesn't require any state management solution. It simply renders SVG markup based on the props passed to it.

## Side Effects

**No Side Effects** - The component is purely functional with no side effects, API calls, or external interactions. It only renders static SVG content.

## Dependencies

### Internal Dependencies
- **React**: Core React library for component definition
- **SVGAttributes**: TypeScript interface for SVG element attributes

### External Dependencies
- None - This component has no external library dependencies

### Related Components
- Other icon components in `/components/icons/`
- UI components that might use this icon for visual enhancement
- Button components that might incorporate this icon

## Integration

### Application Architecture Role
- **Icon System**: Part of the centralized icon component library
- **Design System**: Contributes to consistent visual language
- **Component Library**: Reusable UI primitive for other components
- **Server-Side Rendering**: Fully compatible with SSR/SSG workflows

### Usage Patterns
```tsx
// In feature components
import { Vector } from '@/components/icons/vector';

// In UI components
export function Badge({ variant, children }) {
  return (
    <span className={`badge badge-${variant}`}>
      {variant === 'premium' && <Vector className="mr-1" />}
      {children}
    </span>
  );
}

// In layout components
export function Navigation() {
  return (
    <nav>
      <NavItem icon={<Vector />} label="Featured" />
    </nav>
  );
}
```

## Best Practices

### Architecture Adherence
✅ **Server Component**: Correctly implemented as server component for optimal performance  
✅ **Component Decomposition**: Simple, focused component that stacks well with others  
✅ **Reusability**: Properly placed in icon system for cross-application usage  
✅ **Props Interface**: Uses standard SVG attributes for maximum flexibility  

### Implementation Guidelines
- **Accessibility**: Always provide `aria-label` when used as meaningful content
- **Sizing**: Leverage the `1em` sizing or override with CSS classes
- **Coloring**: Use CSS classes to set `color` property for inherited coloring
- **Performance**: No optimization needed - component is already minimal
- **Consistency**: Use consistently across the application for similar semantic meanings

### Anti-Patterns to Avoid
- ❌ Don't hardcode colors in the SVG - use `currentColor` for flexibility
- ❌ Don't add client-side state to this component - keep it purely presentational  
- ❌ Don't inline SVG code - use this component for maintainability
- ❌ Don't skip accessibility attributes when the icon conveys meaning