# IconStockChart Component

## Purpose

The `IconStockChart` component renders an SVG icon that displays a stock chart visualization with trending lines and vertical bars. This icon is commonly used in financial dashboards, analytics sections, and trading interfaces to represent stock market data, financial charts, or investment-related functionality.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup. It has no client-side interactivity, state management, or browser APIs usage, making it suitable for server-side rendering by default.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

### Common SVG Props
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role
- `data-*` - Data attributes

## Usage Example

```tsx
import { IconStockChart } from '@/components/icons/icon-stock-chart';

// Basic usage
export function DashboardHeader() {
  return (
    <div className="flex items-center gap-2">
      <IconStockChart className="text-blue-600" />
      <h1>Financial Dashboard</h1>
    </div>
  );
}

// As a button icon
export function StockAnalysisButton() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded">
      <IconStockChart className="w-4 h-4" />
      View Stock Analysis
    </button>
  );
}

// With accessibility
export function MarketTrendsCard() {
  return (
    <div className="card">
      <IconStockChart 
        className="w-6 h-6 text-green-600 mb-2"
        aria-label="Stock market trends"
        role="img"
      />
      <h3>Market Trends</h3>
      <p>Current market performance...</p>
    </div>
  );
}

// Interactive usage
export function ChartToggle({ onToggle }: { onToggle: () => void }) {
  return (
    <IconStockChart
      className="w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors"
      onClick={onToggle}
      role="button"
      aria-label="Toggle chart view"
      tabIndex={0}
    />
  );
}
```

## Functionality

### Core Features
- **Scalable Vector Graphics**: Renders crisp icons at any size using em units
- **Theme Integration**: Uses `currentColor` for stroke, inheriting text color from parent
- **Responsive Design**: Adapts to container size with `1em` width/height
- **Accessibility Ready**: Supports ARIA attributes and semantic roles

### Visual Elements
- **Trending Line**: Diagonal path showing market movement with connecting points
- **Bar Chart**: Vertical bars of varying heights representing data points
- **Professional Styling**: Clean stroke-based design with rounded line caps

## State Management

**No State Management** - This is a stateless presentational component that doesn't require any state management solutions. All visual states are controlled through props and CSS classes.

## Side Effects

**No Side Effects** - The component is a pure function with no side effects, API calls, or external interactions. It simply renders SVG markup based on the provided props.

## Dependencies

### Internal Dependencies
- React's `SVGProps` type for prop typing
- No custom hooks or utilities required

### External Dependencies
- None - uses only standard React and SVG APIs

## Integration

### Application Architecture
```tsx
// Icon registry pattern
export const iconMap = {
  'stock-chart': IconStockChart,
  // other icons...
} as const;

// Dynamic icon component
export function Icon({ name, ...props }: { name: keyof typeof iconMap } & SVGProps<SVGSVGElement>) {
  const IconComponent = iconMap[name];
  return <IconComponent {...props} />;
}

// Usage in feature components
export function TradingDashboard() {
  return (
    <div className="dashboard">
      <Icon name="stock-chart" className="header-icon" />
      {/* dashboard content */}
    </div>
  );
}
```

### Design System Integration
```tsx
// Button component integration
export function Button({ icon, children, ...props }: ButtonProps) {
  return (
    <button {...props}>
      {icon === 'stock-chart' && <IconStockChart className="button-icon" />}
      {children}
    </button>
  );
}

// Navigation menu integration
export function NavItem({ icon, label }: NavItemProps) {
  return (
    <a className="nav-item">
      <IconStockChart className="nav-icon" />
      <span>{label}</span>
    </a>
  );
}
```

## Best Practices

### Architecture Compliance
✅ **Server Component**: Correctly uses server component as default for static content  
✅ **Component Decomposition**: Simple, focused component with single responsibility  
✅ **Reusability**: Located in `/components/icons/` following UI component organization  
✅ **Props Interface**: Uses standard SVG props interface for maximum flexibility  

### Implementation Guidelines
- **Consistent Sizing**: Use `1em` units to inherit font size context
- **Color Inheritance**: Leverage `currentColor` for theme integration
- **Accessibility**: Always provide `aria-label` when used without text context
- **Performance**: No runtime overhead - pure SVG rendering
- **Customization**: Use className prop for styling rather than inline styles

### Usage Patterns
```tsx
// ✅ Good: Semantic usage with accessibility
<IconStockChart 
  className="w-5 h-5 text-blue-600" 
  aria-label="Financial data visualization"
/>

// ✅ Good: Consistent with design system
<Icon name="stock-chart" className="dashboard-icon" />

// ❌ Avoid: Hardcoded styles
<IconStockChart style={{ width: '20px', color: '#blue' }} />

// ❌ Avoid: Missing accessibility context
<IconStockChart onClick={handler} /> // Missing role and aria-label
```