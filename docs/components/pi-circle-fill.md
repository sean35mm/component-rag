# PiCircleFill Icon Component

## Purpose
The `PiCircleFill` component is a simple, reusable SVG icon that renders a filled circle. It serves as a foundational UI element for indicating states, decorating interfaces, bullet points, status indicators, or any scenario requiring a solid circular visual element. This component is part of the icon library and follows consistent sizing and styling patterns.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server, improving initial page load performance.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including `className`, `style`, `onClick`, `aria-*`, `data-*`, etc. |

**Common SVG Props:**
- `className` - CSS classes for styling
- `style` - Inline styles object
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role attribute
- `fill` - Override the fill color (defaults to `currentColor`)

## Usage Example

```tsx
import { PiCircleFill } from '@/components/icons/pi/pi-circle-fill';

// Basic usage
export function StatusIndicator() {
  return (
    <div className="flex items-center gap-2">
      <PiCircleFill className="text-green-500" />
      <span>Online</span>
    </div>
  );
}

// With custom styling and interaction
export function InteractiveButton() {
  const handleClick = () => {
    console.log('Circle clicked');
  };

  return (
    <button 
      onClick={handleClick}
      className="flex items-center gap-2 p-2 hover:bg-gray-100"
    >
      <PiCircleFill 
        className="text-blue-600 hover:text-blue-800 transition-colors"
        aria-label="Action indicator"
      />
      <span>Click me</span>
    </button>
  );
}

// Multiple states with different colors
export function StatusList() {
  const statuses = [
    { label: 'Active', color: 'text-green-500' },
    { label: 'Pending', color: 'text-yellow-500' },
    { label: 'Inactive', color: 'text-red-500' },
  ];

  return (
    <ul className="space-y-2">
      {statuses.map((status) => (
        <li key={status.label} className="flex items-center gap-2">
          <PiCircleFill className={status.color} />
          <span>{status.label}</span>
        </li>
      ))}
    </ul>
  );
}

// Custom size using CSS
export function CustomSizedIcon() {
  return (
    <PiCircleFill 
      className="text-purple-600"
      style={{ fontSize: '2rem' }} // Makes icon 2rem size
    />
  );
}
```

## Functionality

### Core Features
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Color Inheritance**: Uses `currentColor` to inherit text color from parent elements
- **Accessibility Ready**: Accepts all ARIA attributes for screen reader compatibility
- **Event Handling**: Supports all standard SVG events (click, hover, focus, etc.)
- **CSS Integration**: Fully compatible with CSS classes and inline styles

### Visual Characteristics
- **Shape**: Perfect circle with solid fill
- **Viewbox**: 24x24 coordinate system for crisp rendering
- **Default Size**: 1em × 1em (scales with font size)
- **Fill**: Solid color using `currentColor`

## State Management
**No State Management** - This is a stateless presentational component that doesn't require any state management solutions. It simply renders SVG markup based on the props passed to it.

## Side Effects
**No Side Effects** - This component is purely functional with no side effects, API calls, or external interactions. It only renders SVG markup.

## Dependencies

### Internal Dependencies
- None - This is a standalone component

### External Dependencies
- `React` - Uses `SVGProps` type from React
- Standard SVG DOM APIs (handled by React)

### Related Components
This icon can be used alongside:
- Other icon components from the `/icons/pi/` collection
- Status components that need visual indicators
- Form components for bullet points or decorative elements
- Navigation components for active state indicators

## Integration

### Application Architecture Fit
- **UI Layer**: Positioned in the foundational UI layer as a reusable visual element
- **Component Hierarchy**: Leaf component designed to be composed into larger feature components
- **Icon System**: Part of the standardized icon library following consistent patterns
- **Design System**: Integrates with design tokens through CSS classes and currentColor

### Usage Patterns
```tsx
// Feature component integration
export function UserStatusCard({ user }: { user: User }) {
  return (
    <div className="card">
      <div className="flex items-center gap-2">
        <PiCircleFill className={user.isOnline ? 'text-green-500' : 'text-gray-400'} />
        <span>{user.name}</span>
      </div>
    </div>
  );
}

// Form integration
export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2">
          <PiCircleFill className="text-gray-600 mt-1.5" style={{ fontSize: '0.5rem' }} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
```

## Best Practices

### Architecture Adherence
✅ **Server Component**: Correctly implemented as server component for optimal performance  
✅ **Flat Composition**: Designed to be composed into larger components rather than nested  
✅ **Single Responsibility**: Focused solely on rendering a filled circle icon  
✅ **Reusability**: Generic enough to be used across different feature domains  

### Implementation Guidelines
- **Accessibility**: Always provide `aria-label` when the icon conveys important information
- **Color Inheritance**: Leverage `currentColor` behavior by setting text color on parent elements
- **Size Control**: Use font-size or CSS classes rather than width/height props for consistent scaling
- **Event Handling**: Add event handlers directly to the component for interactive scenarios

### Performance Considerations
- Renders efficiently as static SVG markup
- No re-renders unless props change
- Minimal bundle impact due to simple implementation
- Can be safely used in lists or repeated elements

### Common Patterns
```tsx
// Status indicator pattern
<div className="text-green-500">
  <PiCircleFill />
</div>

// Interactive element pattern
<PiCircleFill 
  className="cursor-pointer hover:text-blue-600" 
  onClick={handleClick}
  role="button"
  tabIndex={0}
/>

// Decorative element pattern
<PiCircleFill 
  className="text-gray-300" 
  aria-hidden="true" 
/>
```