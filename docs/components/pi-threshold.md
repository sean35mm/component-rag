# PiThreshold Icon Component

## Purpose

The `PiThreshold` component renders an SVG icon representing a threshold indicator, featuring a circular point on a dashed horizontal line. This icon is typically used in dashboards, analytics interfaces, or configuration panels to visually represent threshold values, limits, or measurement points.

## Component Type

**Server Component** - This is a pure presentational SVG icon component with no interactivity, state, or client-side logic. It can be rendered on the server and doesn't require the 'use client' directive.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | All standard SVG element properties including `className`, `style`, `width`, `height`, `onClick`, etc. |

### Common SVG Props Used
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `width` | `string \| number` | Override default width |
| `height` | `string \| number` | Override default height |
| `onClick` | `() => void` | Click handler when used as interactive element |
| `aria-label` | `string` | Accessibility label |

## Usage Example

```tsx
import { PiThreshold } from '@/components/icons/pi/pi-threshold';

// Basic usage
export function ThresholdIndicator() {
  return (
    <div className="flex items-center gap-2">
      <PiThreshold className="w-4 h-4 text-gray-600" />
      <span>Threshold: 75%</span>
    </div>
  );
}

// In a dashboard card
export function MetricCard({ threshold, value }) {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <h3>Performance Metric</h3>
        <PiThreshold 
          className="w-5 h-5 text-orange-500" 
          aria-label="Threshold indicator"
        />
      </div>
      <div className="mt-2">
        <span className="text-2xl font-bold">{value}%</span>
        <span className="text-sm text-gray-500 ml-2">
          Threshold: {threshold}%
        </span>
      </div>
    </div>
  );
}

// As interactive button icon
export function ThresholdButton({ onClick }) {
  return (
    <button 
      onClick={onClick}
      className="p-2 hover:bg-gray-100 rounded-md"
      aria-label="Configure threshold"
    >
      <PiThreshold className="w-4 h-4 text-gray-700" />
    </button>
  );
}

// With custom sizing and colors
export function CustomThreshold() {
  return (
    <PiThreshold 
      width={24}
      height={12}
      className="text-red-500"
      style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }}
    />
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Crisp rendering at any size
- **Color Inheritance**: Uses `currentColor` for both fill and stroke, inheriting from parent text color
- **Flexible Sizing**: Default viewBox of "0 0 18 8" with customizable dimensions
- **Visual Elements**:
  - Circular indicator (filled) positioned at coordinates (8.67, 4.67) with radius of 2
  - Dashed horizontal line from x=1.33 to x=16 with 5.33 dash pattern
- **Accessibility Ready**: Accepts ARIA attributes for screen readers

### Visual Design
- Minimalist design suitable for technical interfaces
- Balanced composition with threshold point positioned slightly off-center
- Consistent stroke width (1.25) for line elements

## State Management

**No State Management Required** - This is a stateless presentational component that doesn't manage any internal state or require external state management solutions.

## Side Effects

**No Side Effects** - Pure functional component with no API calls, DOM manipulation, or external interactions beyond rendering SVG content.

## Dependencies

### Internal Dependencies
- `SVGProps` from React for TypeScript prop definitions

### External Dependencies
- React (implicit)
- No additional third-party dependencies

## Integration

### Application Architecture Integration
- **Icon System**: Part of the standardized icon library under `/components/icons/pi/`
- **Design System**: Follows consistent naming and structure patterns with other Pi icons
- **Theming**: Integrates with CSS custom properties and Tailwind color utilities
- **Component Composition**: Can be embedded in any UI component requiring threshold visualization

### Common Integration Patterns
```tsx
// With data visualization components
import { PiThreshold } from '@/components/icons/pi/pi-threshold';
import { MetricChart } from '@/components/charts/metric-chart';

export function DashboardWidget({ data, threshold }) {
  return (
    <div className="widget">
      <div className="widget-header">
        <PiThreshold className="w-4 h-4" />
        <span>Threshold Analysis</span>
      </div>
      <MetricChart data={data} threshold={threshold} />
    </div>
  );
}

// With form controls
import { PiThreshold } from '@/components/icons/pi/pi-threshold';
import { Input } from '@/components/ui/input';

export function ThresholdInput({ value, onChange }) {
  return (
    <div className="relative">
      <PiThreshold className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <Input 
        value={value}
        onChange={onChange}
        className="pl-10"
        placeholder="Enter threshold value"
      />
    </div>
  );
}
```

## Best Practices

### Architecture Adherence
✅ **Server Component**: Correctly implemented as server component without client-side requirements  
✅ **Component Decomposition**: Simple, focused component with single responsibility  
✅ **Reusability**: Located in appropriate `/icons/` directory for cross-feature usage  
✅ **Type Safety**: Proper TypeScript integration with SVGProps  

### Usage Recommendations
- **Accessibility**: Always provide `aria-label` when used as standalone interactive elements
- **Sizing**: Use Tailwind classes (`w-4 h-4`, `w-5 h-5`) for consistent sizing across the application
- **Color Context**: Leverage `currentColor` behavior by setting text color on parent elements
- **Performance**: Component is lightweight and suitable for frequent rendering in lists or grids
- **Semantic Usage**: Use specifically for threshold-related functionality to maintain icon semantic consistency

### Integration Best Practices
- Combine with tooltip components for additional context
- Use within button components for threshold configuration actions
- Pair with form inputs for threshold value setting
- Include in data visualization legends and labels
- Maintain consistent spacing when used with text labels