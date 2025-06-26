# PiArrowRightDownLine Icon Component

## Purpose

The `PiArrowRightDownLine` component renders an SVG icon depicting a diagonal arrow pointing from the top-left to the bottom-right corner. This icon is commonly used to indicate directional movement, external links, expansion actions, or navigation to a detailed view. It's part of the Phosphor icon collection and serves as a visual cue for "go to" or "expand" actions in user interfaces.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactions, state management, or browser APIs. It can be safely rendered on the server and hydrated on the client without any behavioral changes.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Spread to the root `<svg>` element |

### Common SVG Props
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role |

## Usage Example

```tsx
import { PiArrowRightDownLine } from '@/components/icons/pi/pi-arrow-right-down-line';

// Basic usage
export function ExternalLink() {
  return (
    <a href="https://example.com" className="flex items-center gap-2">
      Visit our website
      <PiArrowRightDownLine className="w-4 h-4" />
    </a>
  );
}

// Interactive card with expansion indicator
export function ProductCard({ product, onExpand }) {
  return (
    <div className="border rounded-lg p-4">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <button 
        onClick={onExpand}
        className="flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-800"
      >
        View details
        <PiArrowRightDownLine 
          className="w-4 h-4 transition-transform hover:translate-x-0.5 hover:translate-y-0.5" 
        />
      </button>
    </div>
  );
}

// Navigation breadcrumb
export function BreadcrumbSeparator() {
  return (
    <PiArrowRightDownLine 
      className="w-3 h-3 text-gray-400 rotate-45" 
      aria-hidden="true"
    />
  );
}

// With accessibility
export function ExpandButton({ onExpand, isExpanded }) {
  return (
    <button onClick={onExpand}>
      <PiArrowRightDownLine 
        className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        aria-label={isExpanded ? "Collapse section" : "Expand section"}
      />
    </button>
  );
}
```

## Functionality

### Core Features
- **SVG Rendering**: Renders a scalable vector icon with crisp edges at any size
- **Current Color**: Uses `fill='currentColor'` to inherit text color from parent elements
- **Responsive Sizing**: Uses `1em` dimensions to scale with font size by default
- **Prop Forwarding**: Accepts and forwards all standard SVG props for maximum flexibility

### Visual Characteristics
- **24x24 ViewBox**: Designed on a 24-unit grid for consistency with other Phosphor icons
- **Dual Path Design**: Composed of two paths - one for the L-shaped line and one for the arrow shaft
- **Fill Rule**: Uses `evenodd` fill rule for consistent rendering across browsers

## State Management

**No State Management** - This is a stateless presentational component that doesn't require any state management. It renders based solely on the props passed to it.

## Side Effects

**No Side Effects** - The component has no side effects, API calls, or external interactions. It's a pure function that returns JSX based on its props.

## Dependencies

### Internal Dependencies
- `React` - Uses `SVGProps` type from React for prop typing

### External Dependencies
- None - The component has no external dependencies beyond React

### Related Components
- Other Phosphor icon components in `/components/icons/pi/`
- UI components that commonly use directional icons (buttons, links, cards)

## Integration

### Application Architecture Fit
- **UI Layer**: Sits in the foundational UI layer as a reusable icon component
- **Design System**: Part of the icon system ensuring visual consistency
- **Component Composition**: Can be composed with buttons, links, and other interactive elements
- **Theming**: Integrates with color schemes through `currentColor` inheritance

### Common Integration Patterns
```tsx
// With UI Button component
import { Button } from '@/components/ui/button';
import { PiArrowRightDownLine } from '@/components/icons/pi/pi-arrow-right-down-line';

<Button variant="ghost" size="sm">
  <PiArrowRightDownLine className="w-4 h-4 mr-2" />
  External Link
</Button>

// In data tables for row actions
<TableCell>
  <button className="p-1 hover:bg-gray-100 rounded">
    <PiArrowRightDownLine className="w-4 h-4" />
  </button>
</TableCell>

// With navigation components
import { Link } from 'next/link';

<Link href="/details" className="inline-flex items-center gap-1">
  Learn more
  <PiArrowRightDownLine className="w-3 h-3" />
</Link>
```

## Best Practices

### Architectural Adherence
- ✅ **Server Component**: Correctly implemented as a server component with no client-side dependencies
- ✅ **Component Decomposition**: Simple, focused component that does one thing well
- ✅ **Reusability**: Placed in appropriate location for UI-level reuse across features
- ✅ **Prop Interface**: Uses standard React patterns with proper TypeScript typing

### Implementation Recommendations
- **Accessibility**: Always provide `aria-label` when the icon conveys meaning without accompanying text
- **Sizing**: Use Tailwind size classes (`w-4 h-4`) rather than overriding the default `1em` sizing when possible
- **Color**: Rely on `currentColor` inheritance rather than explicit color props for theme consistency
- **Performance**: No optimization needed as this is a static SVG component
- **Semantic Usage**: Use for actions that involve navigation, expansion, or external links

### Anti-Patterns to Avoid
- ❌ Don't use for purely decorative purposes without proper ARIA attributes
- ❌ Avoid hardcoding colors that break theme consistency
- ❌ Don't wrap in unnecessary client components unless interactivity is required
- ❌ Avoid using for non-directional actions where other icons would be more semantic