# PiLightbulbLine Icon Component

## Purpose

The `PiLightbulbLine` component is an SVG icon component that renders a lightbulb outline icon. It's part of the Phosphor Icons collection and is typically used to represent ideas, inspiration, innovation, tips, or creative thinking within the application's user interface.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | - | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

### Common SVG Props
| Prop Name | Type | Description |
|-----------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role |
| `width` | `string \| number` | Override default width |
| `height` | `string \| number` | Override default height |

## Usage Example

```tsx
import { PiLightbulbLine } from '@/components/icons/pi/pi-lightbulb-line';

// Basic usage
export function IdeaSection() {
  return (
    <div className="flex items-center gap-2">
      <PiLightbulbLine />
      <span>Got an idea? Share it with us!</span>
    </div>
  );
}

// With custom styling
export function TipCard() {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <PiLightbulbLine 
          className="text-yellow-600 mt-0.5" 
          aria-label="Tip icon"
        />
        <div>
          <h3 className="font-semibold text-yellow-800">Pro Tip</h3>
          <p className="text-yellow-700">Use keyboard shortcuts to speed up your workflow.</p>
        </div>
      </div>
    </div>
  );
}

// Interactive usage
export function FeatureButton() {
  const handleSuggestFeature = () => {
    // Handle feature suggestion
  };

  return (
    <button 
      onClick={handleSuggestFeature}
      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
    >
      <PiLightbulbLine className="w-5 h-5" />
      Suggest Feature
    </button>
  );
}

// In navigation or menu
export function InnovationTab() {
  return (
    <nav>
      <a href="/innovation" className="flex items-center gap-2 p-2 hover:bg-gray-100">
        <PiLightbulbLine className="w-4 h-4" />
        Innovation Hub
      </a>
    </nav>
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisp at any size using SVG format
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent
- **Accessibility Ready**: Accepts ARIA attributes for screen reader support
- **Customizable**: Accepts all standard SVG props for full customization

### Visual Design
- **Style**: Outlined/line style lightbulb icon
- **Viewbox**: 24x24 coordinate system
- **Fill Rule**: Uses `evenodd` for proper path rendering
- **Paths**: Two path elements creating the bulb shape and base

## State Management

**No State Management** - This is a stateless presentational component that doesn't require any state management. It simply renders SVG markup based on the props passed to it.

## Side Effects

**No Side Effects** - This component is pure and doesn't perform any side effects, API calls, or external interactions. It only renders SVG markup.

## Dependencies

### Internal Dependencies
- React's `SVGProps` type for proper TypeScript support

### External Dependencies
- None - This is a self-contained SVG icon component

## Integration

### Application Architecture Fit
- **UI Component Layer**: Located in `/components/icons/pi/` following the flat component structure
- **Reusable Asset**: Can be used across any feature domain that needs lightbulb iconography
- **Design System**: Part of the Phosphor Icons collection providing consistent iconography
- **Accessibility**: Integrates with the application's accessibility standards

### Common Integration Patterns
```tsx
// In feature components
import { PiLightbulbLine } from '@/components/icons/pi/pi-lightbulb-line';

// In idea management features
export function IdeaSubmissionForm() {
  return (
    <form className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <PiLightbulbLine className="text-yellow-500" />
        <h2>Share Your Idea</h2>
      </div>
      {/* Form fields */}
    </form>
  );
}

// In dashboard widgets
export function InnovationMetrics() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Ideas Generated</h3>
        <PiLightbulbLine className="text-gray-400" />
      </div>
      {/* Metrics content */}
    </div>
  );
}
```

## Best Practices

### Architecture Compliance
- ✅ **Server Component**: Properly implemented as a server component without unnecessary client-side code
- ✅ **Flat Structure**: Located in appropriate icon directory without deep nesting
- ✅ **Reusable Design**: Can be used across different feature domains
- ✅ **TypeScript Safety**: Properly typed with SVG props interface

### Usage Recommendations
- **Semantic Usage**: Use specifically for ideas, tips, innovation, or creative concepts
- **Accessibility**: Always provide `aria-label` when the icon conveys important information
- **Sizing**: Leverage the `1em` default sizing or use Tailwind classes like `w-4 h-4`, `w-5 h-5`
- **Color**: Let it inherit color from parent or use Tailwind color classes
- **Performance**: Import only when needed to optimize bundle size

### Anti-patterns to Avoid
- ❌ Don't use for unrelated concepts (use appropriate icons instead)
- ❌ Don't override the viewBox unless absolutely necessary
- ❌ Don't make it a client component unless adding client-side interactivity
- ❌ Don't inline SVG code when this reusable component exists