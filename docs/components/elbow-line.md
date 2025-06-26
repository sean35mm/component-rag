# ElbowLine Icon Component

## Purpose

The `ElbowLine` component is an SVG icon that renders an L-shaped elbow line connector. It's designed for use in diagrams, flowcharts, or UI elements where visual connections between components need to be displayed with a right-angled path. The icon shows a vertical line that turns 90 degrees to create a horizontal connection.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGAttributes<SVGElement>` | No | Standard SVG attributes that can be passed to customize the icon (className, style, onClick, etc.) |

## Usage Example

```tsx
import { ElbowLine } from '@/components/icons/elbow-line';

// Basic usage
function DiagramConnector() {
  return (
    <div className="flex items-center">
      <div className="node">Start</div>
      <ElbowLine className="text-blue-500 mx-2" />
      <div className="node">End</div>
    </div>
  );
}

// With custom styling
function FlowchartConnection() {
  return (
    <ElbowLine 
      className="text-gray-400 hover:text-gray-600 transition-colors"
      width="24"
      height="18"
      strokeWidth="2"
    />
  );
}

// Interactive usage
function ClickableConnector() {
  return (
    <ElbowLine 
      className="cursor-pointer text-indigo-500"
      onClick={() => console.log('Connection clicked')}
      role="button"
      tabIndex={0}
    />
  );
}
```

## Functionality

- **Scalable Vector Graphics**: Renders as crisp SVG at any size using `1em` dimensions
- **Theme Integration**: Uses `currentColor` for stroke, inheriting text color from parent
- **Customizable Appearance**: Accepts all standard SVG attributes for styling
- **Responsive Design**: Scales with font size using `em` units
- **Accessibility Ready**: Can accept ARIA attributes and event handlers

## State Management

**No State Management** - This component is stateless and purely presentational. It doesn't manage any internal state or require external state management solutions.

## Side Effects

**No Side Effects** - The component performs no API calls, DOM manipulation, or other side effects. It's a pure rendering component.

## Dependencies

- **React**: Uses React's JSX and TypeScript interfaces
- **SVGAttributes**: Leverages React's built-in SVG type definitions
- **No External Dependencies**: Self-contained with no additional library requirements

## Integration

### Icon System Architecture
```
src/components/icons/
├── elbow-line.tsx          # This component
├── arrow-right.tsx         # Related directional icons
├── corner-down-right.tsx   # Related corner icons
└── index.ts               # Barrel exports
```

### Usage Patterns
- **Diagram Components**: Integrate with flowchart and process diagram components
- **Navigation UI**: Use in breadcrumbs or step indicators to show connections
- **Form Flows**: Visual connectors in multi-step forms or wizards
- **Dashboard Layouts**: Connect related dashboard widgets or metrics

### Design System Integration
```tsx
// As part of a connection system
function ConnectionLine({ type = 'elbow', ...props }) {
  const icons = {
    elbow: ElbowLine,
    straight: StraightLine,
    curved: CurvedLine
  };
  
  const Icon = icons[type];
  return <Icon {...props} />;
}
```

## Best Practices

### ✅ Architectural Compliance
- **Server-First**: Properly implemented as server component
- **Flat Structure**: Located in dedicated `/icons/` directory, not nested
- **Prop Spreading**: Uses TypeScript-safe prop spreading with proper typing
- **Reusable Design**: Generic enough for multiple use cases

### ✅ Implementation Best Practices
```tsx
// DO: Use semantic sizing with currentColor
<ElbowLine className="text-blue-500 w-4 h-4" />

// DO: Combine with related components
<div className="connection-flow">
  <ProcessStep />
  <ElbowLine className="connector" />
  <ProcessStep />
</div>

// DO: Make interactive when needed
<ElbowLine 
  className="cursor-pointer hover:text-blue-600"
  onClick={handleConnectionClick}
  aria-label="View connection details"
/>

// AVOID: Hardcoding colors or sizes
<ElbowLine style={{ color: '#3b82f6', width: '16px' }} />
```

### ✅ Accessibility Considerations
- Add `aria-label` when used interactively
- Include `role="img"` for decorative usage
- Ensure sufficient color contrast
- Provide alternative text context in parent components

### ✅ Performance Optimization
- SVG is lightweight and performant
- No JavaScript bundle impact
- Can be tree-shaken if unused
- Consider icon sprite sheets for multiple icon usage