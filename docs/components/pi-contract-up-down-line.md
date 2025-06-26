# PiContractUpDownLine Icon Component

## Purpose

The `PiContractUpDownLine` component is an SVG icon that represents a contract or collapse action with vertical up-down arrows. This icon is typically used in UI elements that allow users to collapse or minimize content vertically, such as collapsible panels, accordion sections, or data table row controls. It visually communicates the ability to compress or contract content in the vertical direction.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup. It contains no client-side interactivity, state management, or browser APIs, making it ideal for server-side rendering. The component only accepts standard SVG props and renders deterministic output.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element properties including className, style, onClick, etc. |

### Common SVG Props
| Prop Name | Type | Description |
|-----------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `onMouseEnter` | `MouseEventHandler` | Mouse enter event handler |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role |

## Usage Example

```tsx
import { PiContractUpDownLine } from '@/components/icons/pi/pi-contract-up-down-line';

// Basic usage
function CollapsiblePanel() {
  return (
    <button className="flex items-center gap-2">
      <PiContractUpDownLine />
      <span>Collapse Section</span>
    </button>
  );
}

// With custom styling
function DataTableRow() {
  return (
    <button 
      className="hover:bg-gray-100 p-2 rounded"
      aria-label="Collapse row details"
    >
      <PiContractUpDownLine 
        className="w-4 h-4 text-gray-600 hover:text-gray-800" 
      />
    </button>
  );
}

// In accordion component
function AccordionHeader({ isExpanded, onToggle, children }) {
  return (
    <button 
      onClick={onToggle}
      className="flex items-center justify-between w-full p-4"
    >
      <span>{children}</span>
      <PiContractUpDownLine 
        className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
      />
    </button>
  );
}

// With accessibility features
function AccessibleCollapseButton() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  return (
    <button
      onClick={() => setIsCollapsed(!isCollapsed)}
      aria-expanded={!isCollapsed}
      aria-label={isCollapsed ? "Expand content" : "Collapse content"}
    >
      <PiContractUpDownLine 
        role="img"
        aria-hidden="true"
        className="w-5 h-5"
      />
    </button>
  );
}
```

## Functionality

### Core Features
- **SVG Rendering**: Renders a scalable vector graphic with two opposing arrows indicating vertical contraction
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Current Color**: Inherits color from parent text color via `fill='currentColor'`
- **Prop Forwarding**: Accepts and forwards all standard SVG element properties

### Visual Design
- **Viewbox**: 24x24 coordinate system for consistent scaling
- **Fill Rule**: Uses `evenodd` and `clipRule` for proper path rendering
- **Arrow Paths**: Two separate path elements creating up and down pointing arrows that suggest compression

## State Management

**No State Management** - This is a stateless presentational component that doesn't manage any internal state. State management for expand/collapse functionality should be handled by parent components using:

- **Local State**: `useState` for simple toggle states
- **Zustand**: For collapse states that need to persist across components
- **TanStack Query**: Not applicable for this purely visual component

## Side Effects

**No Side Effects** - This component has no side effects, API calls, or external interactions. It's a pure function that renders SVG markup based on props.

## Dependencies

### Internal Dependencies
- **React**: `SVGProps` type from React
- **TypeScript**: Uses TypeScript for prop type safety

### External Dependencies
- None - This is a self-contained component with no external dependencies

## Integration

### Application Architecture
- **Icon System**: Part of the Phosphor icon library integration (`/icons/pi/`)
- **UI Components**: Can be composed into button, accordion, and panel components in `/ui/`
- **Feature Components**: Used across domain-specific components that need collapse functionality
- **Design System**: Provides consistent iconography for contraction/collapse actions

### Usage Patterns
```tsx
// In UI components (/ui/)
function Accordion({ items }) {
  return (
    <div className="space-y-2">
      {items.map(item => (
        <AccordionItem 
          key={item.id}
          icon={<PiContractUpDownLine />}
          {...item} 
        />
      ))}
    </div>
  );
}

// In feature components (by domain)
function ProductSpecifications() {
  return (
    <CollapsibleSection 
      title="Technical Specifications"
      collapseIcon={<PiContractUpDownLine />}
    >
      {/* specifications content */}
    </CollapsibleSection>
  );
}
```

## Best Practices

### Component Architecture Adherence
- ✅ **Server Component**: Properly implemented as server component for static content
- ✅ **Flat Composition**: Simple, non-nested component that stacks well with others
- ✅ **Single Responsibility**: Focused solely on rendering the contract icon
- ✅ **Prop Forwarding**: Accepts all standard SVG props for maximum flexibility

### Implementation Guidelines
```tsx
// ✅ Good: Semantic usage with proper accessibility
<button aria-label="Collapse section">
  <PiContractUpDownLine aria-hidden="true" />
  <span className="sr-only">Collapse</span>
</button>

// ✅ Good: Responsive sizing with parent font size
<div className="text-lg">
  <PiContractUpDownLine /> {/* Automatically scales to 18px */}
</div>

// ✅ Good: Color inheritance
<div className="text-blue-600">
  <PiContractUpDownLine /> {/* Inherits blue color */}
</div>

// ❌ Avoid: Missing accessibility context
<PiContractUpDownLine onClick={handleClick} />

// ❌ Avoid: Fixed sizing that doesn't scale
<PiContractUpDownLine style={{ width: '16px', height: '16px' }} />
```

### Accessibility Considerations
- Always provide context when used as interactive element
- Use `aria-hidden="true"` when accompanying text provides context
- Include `aria-label` or `aria-labelledby` for standalone usage
- Consider `role="img"` with descriptive `aria-label` for decorative usage