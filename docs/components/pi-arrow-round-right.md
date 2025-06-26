# PiArrowRoundRight Icon Component

## Purpose

The `PiArrowRoundRight` component is an SVG icon that displays a curved arrow pointing to the right in a circular motion. This icon is typically used to represent actions like "redo", "forward", "next step", or "circular navigation" in user interfaces. It's part of the Phosphor Icons (Pi) collection and provides a consistent visual element for navigation and action-related UI components.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and doesn't require the 'use client' directive.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| ...props | `SVGProps<SVGSVGElement>` | No | - | All standard SVG element props including className, style, onClick, etc. Props are spread to the underlying SVG element |

**Inherited SVG Props:**
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `onMouseEnter/Leave` - Mouse event handlers
- `aria-label` - Accessibility label
- `role` - ARIA role
- `data-*` - Data attributes

## Usage Example

```tsx
import { PiArrowRoundRight } from '@/components/icons/pi/pi-arrow-round-right';

// Basic usage
function RedoButton() {
  return (
    <button className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded">
      <PiArrowRoundRight />
      Redo
    </button>
  );
}

// Custom styling and sizing
function NavigationArrow() {
  return (
    <PiArrowRoundRight
      className="text-gray-600 hover:text-blue-600 transition-colors"
      style={{ fontSize: '1.5rem' }}
      aria-label="Go to next step"
    />
  );
}

// Interactive usage with click handler
function CircularNavigation({ onNext }: { onNext: () => void }) {
  return (
    <button
      onClick={onNext}
      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
      aria-label="Next item"
    >
      <PiArrowRoundRight className="w-5 h-5" />
    </button>
  );
}

// Within a larger UI component
function StepperControls({ currentStep, onNextStep, canGoNext }: StepperProps) {
  return (
    <div className="flex justify-between items-center">
      <span>Step {currentStep}</span>
      <button
        onClick={onNextStep}
        disabled={!canGoNext}
        className="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
      >
        Continue
        <PiArrowRoundRight className="w-4 h-4" />
      </button>
    </div>
  );
}
```

## Functionality

- **SVG Rendering**: Renders a scalable vector graphic with a curved right arrow path
- **Responsive Sizing**: Uses `1em` dimensions that scale with parent font size
- **Color Inheritance**: Uses `currentColor` for fill and stroke, inheriting text color from parent
- **Accessibility Ready**: Accepts ARIA attributes for screen reader support
- **Customizable**: All SVG properties can be overridden via props spreading
- **CSS Integration**: Supports Tailwind classes and custom CSS styling

## State Management

**No State Management** - This is a stateless presentational component that doesn't manage any internal state or connect to external state management systems (TanStack Query/Zustand).

## Side Effects

**No Side Effects** - The component has no side effects, API calls, or external interactions. It's a pure rendering component.

## Dependencies

### Internal Dependencies
- `React` - Uses `SVGProps` type from React
- No other internal component dependencies

### External Dependencies
- None - Self-contained SVG icon component

## Integration

### Application Architecture Integration

```tsx
// Icon library barrel export (src/components/icons/index.ts)
export { PiArrowRoundRight } from './pi/pi-arrow-round-right';

// Usage in feature components
import { PiArrowRoundRight } from '@/components/icons';

// Common integration patterns
function WorkflowStep() {
  return (
    <div className="flex items-center gap-2">
      <span>Complete Profile</span>
      <PiArrowRoundRight className="text-green-500" />
      <span>Verification</span>
    </div>
  );
}

// Navigation components
function BreadcrumbSeparator() {
  return <PiArrowRoundRight className="w-3 h-3 text-gray-400 mx-2" />;
}

// Form wizards and multi-step processes
function FormWizardNavigation({ onNext }: { onNext: () => void }) {
  return (
    <button onClick={onNext} className="btn-primary">
      Next <PiArrowRoundRight />
    </button>
  );
}
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: Properly implemented as server component (no client-side features)
- ✅ **Component Decomposition**: Atomic, reusable icon component that stacks well with other components
- ✅ **Flat Structure**: Simple, non-nested component structure
- ✅ **Reusability**: Located in `/icons/` for shared usage across domains

### Implementation Best Practices

```tsx
// ✅ Good: Semantic usage with proper labeling
<button aria-label="Redo last action">
  <PiArrowRoundRight />
</button>

// ✅ Good: Consistent sizing patterns
<PiArrowRoundRight className="w-4 h-4" /> // Small
<PiArrowRoundRight className="w-5 h-5" /> // Medium
<PiArrowRoundRight className="w-6 h-6" /> // Large

// ✅ Good: Color inheritance
<div className="text-blue-600">
  <PiArrowRoundRight /> {/* Inherits blue color */}
</div>

// ❌ Avoid: Hardcoded colors that break theme consistency
<PiArrowRoundRight style={{ color: '#123456' }} />

// ✅ Good: Responsive and accessible
<PiArrowRoundRight 
  className="w-4 h-4 sm:w-5 sm:h-5" 
  aria-hidden="true" // When used decoratively
/>
```

### Performance Considerations
- Lightweight SVG with minimal DOM overhead
- No JavaScript bundle impact (server-rendered)
- Scales without pixelation at any size
- CSS-optimized with `currentColor` for efficient styling