# IconWaves Component

## Purpose

The `IconWaves` component renders an animated-looking wave icon using concentric circles with decreasing opacity to create a ripple or wave effect. This icon is commonly used to represent concepts like signals, broadcasting, connectivity, sound waves, or any propagating effect in the user interface.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| ...props | `SVGAttributes<SVGElement>` | No | - | All standard SVG attributes (className, style, onClick, etc.) are spread to the root SVG element |

### Common SVG Props
- `className` - Additional CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `onMouseEnter/onMouseLeave` - Mouse event handlers
- `aria-label` - Accessibility label
- `role` - ARIA role

## Usage Example

```tsx
import { IconWaves } from '@/components/icons/icon-waves';

// Basic usage
export function SignalIndicator() {
  return (
    <div className="flex items-center gap-2">
      <IconWaves />
      <span>Broadcasting</span>
    </div>
  );
}

// With custom styling
export function ConnectivityStatus() {
  return (
    <IconWaves 
      className="w-6 h-6 text-blue-500" 
      aria-label="Signal strength indicator"
    />
  );
}

// Interactive usage
export function WaveButton() {
  const handleBroadcast = () => {
    // Broadcast action
  };

  return (
    <button 
      onClick={handleBroadcast}
      className="p-2 hover:bg-gray-100 rounded-lg"
    >
      <IconWaves className="w-5 h-5 text-green-600" />
    </button>
  );
}

// In a status component
export function DeviceStatus({ isConnected }: { isConnected: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <IconWaves 
        className={`w-4 h-4 ${isConnected ? 'text-green-500' : 'text-gray-400'}`}
      />
      <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
    </div>
  );
}
```

## Functionality

### Key Features
- **Wave Pattern**: Renders 8 concentric circles with decreasing opacity (1.0 to 0.0) to create a wave/ripple effect
- **Responsive Sizing**: Uses `1em` width/height to scale with parent font size
- **Color Inheritance**: Uses `currentColor` for stroke and custom CSS class for consistent theming
- **Accessibility Ready**: Accepts ARIA attributes for screen readers
- **Customizable**: All SVG attributes can be overridden via props spreading

### Visual Design
- Center point at (384, 384) in a 768x768 viewBox
- Circles with radii from 47.5 to 383.5 pixels (48px increments)
- Opacity progression from 100% (innermost) to 0% (outermost)
- Uses `stroke-pgStroke-250` CSS class for consistent theming

## State Management

**No State Management** - This is a stateless presentational component that only renders SVG markup based on props.

## Side Effects

**No Side Effects** - Pure component with no API calls, timers, or external interactions.

## Dependencies

### Internal Dependencies
- None

### External Dependencies
- `react` - For React types and JSX
- CSS classes - Requires `stroke-pgStroke-250` class to be defined in the application's CSS

### Type Dependencies
- `SVGAttributes<SVGElement>` from React for prop typing

## Integration

### Application Architecture Role
- **UI Layer**: Part of the icon system in `/components/icons/`
- **Design System**: Provides consistent wave/signal iconography across the application
- **Reusability**: Can be used in any component needing wave/signal representation

### Common Integration Patterns
```tsx
// In navigation components
<IconWaves className="w-4 h-4" />

// In status indicators
<IconWaves className={signalStrengthClass} />

// In feature components
import { IconWaves } from '@/components/icons/icon-waves';

// In button components
<Button icon={<IconWaves />}>Broadcast</Button>
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: Correctly implemented as server component
- ✅ **Flat Structure**: Simple, non-nested component design
- ✅ **Reusable**: Properly placed in `/components/icons/` for reuse
- ✅ **Props Interface**: Uses standard SVG props pattern
- ✅ **No Client State**: No unnecessary client-side complexity

### Usage Recommendations
- Use for representing signals, connectivity, broadcasting, or wave-like concepts
- Apply appropriate `aria-label` when used without accompanying text
- Customize colors using CSS classes or the `stroke` prop
- Consider animation libraries if animated waves are needed
- Size using CSS classes rather than inline styles for consistency

### Performance Considerations
- Lightweight SVG with minimal DOM nodes
- No JavaScript execution or re-renders
- Can be safely used in lists or repeated UI elements