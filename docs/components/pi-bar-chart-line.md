# PiBarChartLine Icon Component

## Purpose
The `PiBarChartLine` component is an SVG icon component that renders a bar chart visualization symbol. It displays a rectangular container with three ascending bars, commonly used to represent data visualization, analytics, statistics, or reporting features within the application interface.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| ...props | `SVGProps<SVGSVGElement>` | Optional | - | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Spread to the root `<svg>` element |

## Usage Example

```tsx
import { PiBarChartLine } from '@/components/icons/pi/pi-bar-chart-line';

// Basic usage
export function DashboardNav() {
  return (
    <nav className="flex items-center gap-4">
      <a href="/analytics" className="flex items-center gap-2">
        <PiBarChartLine />
        <span>Analytics</span>
      </a>
    </nav>
  );
}

// With custom styling
export function StatsCard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center mb-4">
        <PiBarChartLine 
          className="text-blue-600 mr-3" 
          style={{ fontSize: '24px' }}
        />
        <h3 className="text-lg font-semibold">Performance Metrics</h3>
      </div>
      {/* Chart content */}
    </div>
  );
}

// As interactive button
export function ReportsButton({ onClick }: { onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      aria-label="View reports"
    >
      <PiBarChartLine />
      <span>Reports</span>
    </button>
  );
}

// In data visualization context
export function ChartTypeSelector({ onSelectChart }: { onSelectChart: (type: string) => void }) {
  return (
    <div className="flex gap-2">
      <button 
        onClick={() => onSelectChart('bar')}
        className="p-2 border rounded hover:bg-gray-50"
        title="Bar Chart"
      >
        <PiBarChartLine className="w-5 h-5" />
      </button>
    </div>
  );
}
```

## Functionality
- **Scalable Vector Rendering**: Uses `1em` dimensions to scale with parent font-size
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent elements
- **Accessibility Ready**: Accepts `aria-label`, `role`, and other accessibility props
- **Responsive Design**: Scales proportionally with CSS font-size or explicit width/height
- **Theme Integration**: Automatically adapts to parent element's color scheme

## State Management
**No State Management** - This is a stateless presentational component that renders static SVG content. It doesn't require TanStack Query, Zustand, or local state management.

## Side Effects
**No Side Effects** - The component performs no API calls, DOM manipulation, or external interactions. It purely renders SVG markup based on the provided props.

## Dependencies
- **React**: Uses `SVGProps<SVGSVGElement>` type from React
- **No External Dependencies**: Self-contained with no additional library requirements

## Integration
- **Icon System**: Part of the Pi icon collection (`/components/icons/pi/`) for consistent iconography
- **Design System**: Integrates with application's visual design language and theming
- **UI Components**: Can be composed within buttons, navigation, cards, and other UI components
- **Feature Domains**: Used across analytics, reporting, dashboard, and data visualization features
- **Layout Integration**: Works within navigation bars, sidebars, toolbars, and content areas

## Best Practices
- **Component Decomposition**: ✅ Single responsibility - renders one specific icon
- **Reusability**: ✅ Placed in `/components/icons/` for application-wide usage
- **Props Spreading**: ✅ Accepts all standard SVG props for maximum flexibility
- **Performance**: ✅ Lightweight SVG with no runtime overhead
- **Accessibility**: ✅ Supports ARIA attributes and semantic HTML patterns
- **Styling**: ✅ Uses CSS-in-JS friendly patterns with `currentColor` and `1em` sizing
- **Type Safety**: ✅ Properly typed with React's built-in SVG prop interfaces

### Recommended Usage Patterns
```tsx
// ✅ Good - Semantic usage with labels
<button aria-label="View analytics dashboard">
  <PiBarChartLine />
</button>

// ✅ Good - Consistent sizing with Tailwind
<PiBarChartLine className="w-5 h-5 text-blue-600" />

// ✅ Good - Color inheritance
<div className="text-gray-600">
  <PiBarChartLine /> {/* Inherits gray-600 color */}
</div>

// ❌ Avoid - Inline styles for colors (use CSS classes)
<PiBarChartLine style={{ color: '#blue' }} />
```