# ArrowsRoundRightStreamlineMicro Icon Component

## Purpose

The `ArrowsRoundRightStreamlineMicro` component renders a micro-sized SVG icon depicting a curved arrow pointing to the right. This icon is commonly used to indicate forward navigation, "next" actions, refresh operations, or directional flow in user interfaces. It provides a clean, minimalist visual cue for user interactions and navigation elements.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and rehydrated on the client without any functional differences.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGAttributes<SVGElement>` | No | `{}` | All standard SVG element attributes including `className`, `style`, `onClick`, `aria-label`, etc. Spread to the root `<svg>` element |

### Common SVG Attributes
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role
- `width`/`height` - Override default dimensions (16x16)

## Usage Example

```tsx
import { ArrowsRoundRightStreamlineMicro } from '@/components/icons/arrows-round-right-streamline-micro';

// Basic usage
function NavigationButton() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded">
      Next Step
      <ArrowsRoundRightStreamlineMicro className="w-4 h-4" />
    </button>
  );
}

// As a refresh indicator
function RefreshButton() {
  return (
    <button 
      onClick={handleRefresh}
      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      aria-label="Refresh content"
    >
      <ArrowsRoundRightStreamlineMicro className="w-4 h-4 text-gray-600" />
    </button>
  );
}

// In a stepper component
function StepperNavigation({ onNext, disabled }) {
  return (
    <div className="flex justify-between mt-6">
      <button className="text-gray-500">Previous</button>
      <button 
        onClick={onNext}
        disabled={disabled}
        className="flex items-center gap-1 text-blue-600 disabled:opacity-50"
      >
        Continue
        <ArrowsRoundRightStreamlineMicro className="w-3 h-3" />
      </button>
    </div>
  );
}

// With custom styling
function CustomArrow() {
  return (
    <ArrowsRoundRightStreamlineMicro 
      className="w-6 h-6 text-green-500 hover:text-green-700 transition-colors"
      style={{ transform: 'rotate(45deg)' }}
    />
  );
}
```

## Functionality

- **SVG Rendering**: Renders a 16x16 pixel SVG icon with a curved right arrow design
- **Color Inheritance**: Uses `currentColor` for stroke, inheriting text color from parent elements
- **Scalable Vector**: Maintains crisp appearance at any size due to SVG format
- **Accessibility Ready**: Accepts ARIA attributes for screen reader compatibility
- **Event Handling**: Supports all standard SVG/DOM events through props spreading
- **Customizable**: Fully customizable through className, style, and SVG attributes

## State Management

**No State Management** - This is a stateless presentational component that renders static SVG markup. It doesn't manage any internal state, server state, or client state. All behavior is controlled through props passed from parent components.

## Side Effects

**No Side Effects** - This component is a pure function that renders SVG markup without any side effects, API calls, timers, or external interactions. It's completely deterministic based on its props.

## Dependencies

### Internal Dependencies
- `React.SVGAttributes<SVGElement>` - TypeScript interface for SVG element attributes

### External Dependencies
- None - This component has no external dependencies beyond React's built-in types

### Related Components
- Other icon components in `/components/icons/`
- Button components that commonly use icons
- Navigation and stepper components

## Integration

### Application Architecture
- **Icon System**: Part of the centralized icon component library in `/components/icons/`
- **Design System**: Integrates with the application's design tokens for consistent sizing and coloring
- **Component Composition**: Used as a building block in higher-level UI components like buttons, navigation, and steppers

### Usage Patterns
```tsx
// In navigation components
import { ArrowsRoundRightStreamlineMicro } from '@/components/icons/arrows-round-right-streamline-micro';

// In button components
function NextButton({ children, ...props }) {
  return (
    <button {...props}>
      {children}
      <ArrowsRoundRightStreamlineMicro className="ml-2 w-4 h-4" />
    </button>
  );
}

// In form wizards
function FormStep({ onNext }) {
  return (
    <div className="space-y-4">
      {/* Form content */}
      <button onClick={onNext} className="btn-primary">
        Continue <ArrowsRoundRightStreamlineMicro />
      </button>
    </div>
  );
}
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: Correctly implemented as a server component without unnecessary client-side features
- ✅ **Component Decomposition**: Simple, focused component that can be easily composed with other components
- ✅ **Reusability**: Placed in `/components/icons/` for application-wide reuse
- ✅ **Prop Spreading**: Properly spreads SVG attributes for maximum flexibility

### Implementation Guidelines
```tsx
// ✅ Good - Semantic usage with accessibility
<button aria-label="Go to next page">
  Next <ArrowsRoundRightStreamlineMicro className="w-4 h-4" />
</button>

// ✅ Good - Consistent sizing with Tailwind
<ArrowsRoundRightStreamlineMicro className="w-4 h-4 text-blue-600" />

// ✅ Good - Color inheritance
<div className="text-red-500">
  <ArrowsRoundRightStreamlineMicro /> {/* Inherits red color */}
</div>

// ❌ Avoid - Inline styles when classes are available
<ArrowsRoundRightStreamlineMicro style={{ color: 'blue', width: '16px' }} />

// ❌ Avoid - Missing accessibility context
<button><ArrowsRoundRightStreamlineMicro /></button> // No label
```

### Performance Considerations
- Icon is lightweight and renders efficiently as static SVG
- Can be safely used in lists or repeated elements
- Consider icon sprite systems for applications with many icons
- SVG format ensures optimal loading and rendering performance