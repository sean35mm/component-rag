# PiCornerDownLeftLine Icon Component

## Purpose

The `PiCornerDownLeftLine` component renders a corner down-left arrow icon, typically used to indicate directional navigation, flow direction, or corner turns in user interfaces. This icon is part of the Phosphor icon set and represents a visual cue for downward-left movement or corner routing.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG content without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and hydrated on the client.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

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
import { PiCornerDownLeftLine } from '@/components/icons/pi/pi-corner-down-left-line';

// Basic usage
export function NavigationArrow() {
  return (
    <div className="flex items-center gap-2">
      <span>Turn here</span>
      <PiCornerDownLeftLine className="w-4 h-4 text-blue-600" />
    </div>
  );
}

// Interactive button with icon
export function DirectionButton() {
  const handleTurn = () => {
    // Handle direction change
    console.log('Turning down-left');
  };

  return (
    <button
      onClick={handleTurn}
      className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md"
      aria-label="Turn down and left"
    >
      <PiCornerDownLeftLine className="w-5 h-5" />
      <span>Down Left</span>
    </button>
  );
}

// In a flow diagram or navigation component
export function FlowStep() {
  return (
    <div className="relative">
      <div className="step-content">Step 1</div>
      <PiCornerDownLeftLine 
        className="absolute -bottom-2 -left-2 w-6 h-6 text-gray-400"
        aria-hidden="true"
      />
    </div>
  );
}

// Customized with different sizes and colors
export function IconVariations() {
  return (
    <div className="flex items-center gap-4">
      {/* Small */}
      <PiCornerDownLeftLine className="w-3 h-3 text-gray-500" />
      
      {/* Medium */}
      <PiCornerDownLeftLine className="w-5 h-5 text-blue-600" />
      
      {/* Large */}
      <PiCornerDownLeftLine className="w-8 h-8 text-green-600" />
      
      {/* Custom color via CSS */}
      <PiCornerDownLeftLine 
        style={{ color: '#ff6b6b', width: '20px', height: '20px' }}
      />
    </div>
  );
}
```

## Functionality

### Core Features
- **SVG Rendering**: Renders a scalable vector graphic of a corner down-left arrow
- **Responsive Sizing**: Uses `1em` dimensions to scale with font size by default
- **Current Color**: Uses `currentColor` fill to inherit text color from parent
- **Accessibility Ready**: Accepts all ARIA attributes for screen reader support
- **Customizable**: Accepts all standard SVG props for full customization

### Visual Characteristics
- **Viewbox**: 24x24 coordinate system for crisp rendering
- **Style**: Line-based icon with clean, geometric appearance
- **Paths**: Two path elements creating the corner arrow shape
- **Fill Rules**: Uses `evenodd` fill rule for proper path rendering

## State Management

**No State Management** - This is a stateless presentational component that doesn't require any state management. It simply renders an SVG based on the props passed to it.

## Side Effects

**No Side Effects** - This component is purely functional with no side effects, API calls, or external interactions. It only renders SVG markup.

## Dependencies

### Internal Dependencies
- `React` - For `SVGProps` type definition
- No other internal component dependencies

### External Dependencies
- None - This is a self-contained SVG icon component

## Integration

### Application Architecture Fit
- **UI Component Layer**: Lives in the `/components/icons/pi/` directory as a reusable UI primitive
- **Icon System**: Part of the Phosphor icon collection providing consistent iconography
- **Design System**: Integrates with the application's design tokens through CSS classes
- **Component Composition**: Can be composed into buttons, navigation elements, and other UI components

### Usage Patterns
```tsx
// In navigation components
import { PiCornerDownLeftLine } from '@/components/icons/pi/pi-corner-down-left-line';

// In form components for directional inputs
export function DirectionSelector() {
  return (
    <div className="grid grid-cols-3 gap-2">
      <button className="direction-btn">
        <PiCornerDownLeftLine />
      </button>
      {/* Other direction buttons */}
    </div>
  );
}

// In data visualization for flow indicators
export function ProcessFlow() {
  return (
    <div className="flow-diagram">
      <div className="step">Process A</div>
      <PiCornerDownLeftLine className="flow-arrow" />
      <div className="step">Process B</div>
    </div>
  );
}
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: Correctly implemented as a server component since it has no client-side interactivity
- ✅ **Flat Structure**: Simple, single-purpose component without unnecessary nesting
- ✅ **Reusability**: Highly reusable across different contexts through prop spreading
- ✅ **Type Safety**: Uses proper TypeScript types from React's SVG props

### Implementation Guidelines
- **Accessibility**: Always provide `aria-label` or `aria-hidden="true"` depending on context
- **Sizing**: Use Tailwind classes like `w-4 h-4` for consistent sizing across the application
- **Color**: Leverage `currentColor` by setting text color on parent elements
- **Performance**: Component is lightweight and can be safely used in lists or repeated contexts

### Common Patterns
```tsx
// DO: Use semantic class names and proper accessibility
<PiCornerDownLeftLine 
  className="w-5 h-5 text-blue-600" 
  aria-label="Navigate down-left"
/>

// DO: Use as decorative element
<PiCornerDownLeftLine 
  className="w-4 h-4" 
  aria-hidden="true"
/>

// DON'T: Hardcode styles when classes are available
<PiCornerDownLeftLine 
  style={{ width: '20px', height: '20px', color: 'blue' }}
/>
```