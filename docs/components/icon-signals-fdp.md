# IconSignalsFDP Component

## Purpose

The `IconSignalsFDP` component renders an SVG icon representing signals or alerts in the FDP (Financial Data Platform) context. This is a presentation component that displays a lightning bolt/signal icon, typically used to indicate active signals, alerts, or notifications within financial data interfaces.

## Component Type

**Server Component** - This is a pure presentation component that renders static SVG content without any client-side interactivity, state management, or browser APIs. It can safely run on the server and be hydrated on the client.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| ...props | `SVGAttributes<SVGElement>` | No | - | Standard SVG element attributes (className, style, onClick, etc.) spread to the root SVG element |

### Common SVG Attributes
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `onMouseEnter/onMouseLeave` - Mouse event handlers
- `aria-label` - Accessibility label
- `role` - ARIA role

## Usage Example

```tsx
import { IconSignalsFDP } from '@/components/icons/icon-signals-fdp';

// Basic usage
export function SignalsIndicator() {
  return (
    <div className="flex items-center gap-2">
      <IconSignalsFDP />
      <span>Active Signals</span>
    </div>
  );
}

// With custom styling
export function AlertButton() {
  return (
    <button className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
      <IconSignalsFDP 
        className="text-orange-500" 
        style={{ fontSize: '1.5rem' }}
      />
      <span>View FDP Signals</span>
    </button>
  );
}

// With accessibility
export function AccessibleSignalsIcon() {
  return (
    <IconSignalsFDP 
      aria-label="Financial data signals"
      role="img"
      className="text-blue-600"
    />
  );
}

// In a navigation or status component
export function FDPStatus({ hasActiveSignals }: { hasActiveSignals: boolean }) {
  return (
    <div className="flex items-center">
      <IconSignalsFDP 
        className={hasActiveSignals ? 'text-red-500' : 'text-gray-400'}
      />
      <span className="ml-1">
        {hasActiveSignals ? 'Active' : 'No'} Signals
      </span>
    </div>
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisp at any size using SVG format
- **Current Color Inheritance**: Uses `fill='currentColor'` to inherit text color from parent
- **Responsive Sizing**: Uses `1em` dimensions to scale with font size
- **Flexible Styling**: Accepts all standard SVG attributes for customization
- **Accessibility Ready**: Can accept ARIA attributes for screen readers

### Visual Characteristics
- Lightning bolt design suggesting signals/alerts
- 20x20 viewBox with optimized path
- Fill-rule and clip-rule for clean rendering
- Designed for financial data platform context

## State Management

**No State Management** - This is a stateless presentation component that doesn't manage any internal state or interact with external state management systems.

## Side Effects

**No Side Effects** - This component performs no side effects, API calls, or external interactions. It's a pure rendering component.

## Dependencies

### Internal Dependencies
- `React` - Core React library for component definition
- `SVGAttributes` type from React for TypeScript props

### External Dependencies
- None - This is a self-contained icon component

## Integration

### Application Architecture Fit
- **UI Component Layer**: Lives in `/components/icons/` as a reusable UI element
- **Design System**: Part of the icon library for consistent visual language
- **Feature Integration**: Used across FDP-related features for signal indication
- **Server-Side Rendering**: Compatible with SSR/SSG due to server component nature

### Common Integration Patterns
```tsx
// In feature components
import { IconSignalsFDP } from '@/components/icons/icon-signals-fdp';

// Dashboard widgets
export function SignalsDashboardWidget() {
  return (
    <Card>
      <CardHeader>
        <IconSignalsFDP className="text-blue-500" />
        <h3>FDP Signals</h3>
      </CardHeader>
      {/* ... */}
    </Card>
  );
}

// Navigation items
export function NavigationItem() {
  return (
    <NavLink to="/signals">
      <IconSignalsFDP />
      Signals
    </NavLink>
  );
}
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: Correctly implemented as server component (no client-side features)
- ✅ **Component Decomposition**: Single responsibility (icon rendering only)
- ✅ **Reusability**: Placed in `/components/icons/` for cross-feature usage
- ✅ **Props Interface**: Uses standard SVG attributes for maximum flexibility

### Usage Recommendations
- **Sizing**: Use CSS `font-size` or `className` for consistent sizing
- **Coloring**: Leverage `currentColor` by setting text color on parent elements
- **Accessibility**: Add `aria-label` and `role="img"` for screen readers
- **Performance**: Component is lightweight and renders efficiently
- **Consistency**: Use alongside other icons from the same design system

### Integration Best Practices
- Import directly in feature components that need signal indication
- Combine with status text or badges for clear communication
- Apply consistent color coding (red for alerts, blue for info, etc.)
- Consider loading states in parent components that fetch signal data