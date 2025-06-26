# PiStopCircleLine Icon Component

## Purpose

The `PiStopCircleLine` component is an SVG icon that displays a stop symbol (square) inside a circular outline. It's part of the Phosphor icon family and is typically used to represent "stop" actions in media controls, halt operations, or pause functionality within the application interface.

## Component Type

**Server Component** - This is a presentational SVG icon component with no interactivity, state, or client-side logic. It can be rendered on the server and doesn't require the 'use client' directive, making it optimal for performance and SEO.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | `{}` | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

### Common SVG Props
| Prop Name | Type | Description |
|-----------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role |
| `width` | `string \| number` | Override default width (1em) |
| `height` | `string \| number` | Override default height (1em) |

## Usage Example

```tsx
import { PiStopCircleLine } from '@/components/icons/pi/pi-stop-circle-line';

// Basic usage
export function MediaControls() {
  return (
    <div className="flex items-center gap-2">
      <button className="p-2 hover:bg-gray-100 rounded">
        <PiStopCircleLine className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
}

// With click handler and accessibility
export function StopButton({ onStop }: { onStop: () => void }) {
  return (
    <button
      onClick={onStop}
      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      aria-label="Stop playback"
    >
      <PiStopCircleLine 
        className="w-4 h-4" 
        aria-hidden="true"
      />
      Stop
    </button>
  );
}

// Custom sizing and styling
export function ProcessControl() {
  return (
    <div className="control-panel">
      <PiStopCircleLine 
        className="w-8 h-8 text-red-500 cursor-pointer hover:text-red-700"
        onClick={() => console.log('Process stopped')}
        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
      />
    </div>
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisply at any size using SVG format
- **Responsive Sizing**: Uses `1em` dimensions to scale with font size
- **Current Color**: Uses `fill='currentColor'` to inherit text color from parent
- **Accessible**: Supports all standard ARIA attributes and event handlers
- **Customizable**: Accepts all SVG props for styling and behavior

### Visual Design
- **Outline Style**: Features a circular border with a square stop symbol inside
- **Consistent Proportions**: Follows 24x24 viewBox standard for icon consistency
- **Clean Paths**: Uses `fillRule` and `clipRule` for precise rendering

## State Management

**No State Management Required** - This is a pure presentational component that doesn't manage any internal state. Any interactive behavior is handled through props (like `onClick`) passed from parent components.

## Side Effects

**No Side Effects** - This component has no side effects, API calls, or external interactions. It's a pure rendering component that only displays SVG content.

## Dependencies

### Internal Dependencies
- `React.SVGProps<SVGSVGElement>` - TypeScript interface for SVG element props

### External Dependencies
- **React** - Core React library for component structure
- **TypeScript** - Type safety for props interface

## Integration

### Application Architecture
```
├── components/
│   ├── icons/
│   │   └── pi/
│   │       └── pi-stop-circle-line.tsx  ← Current component
│   ├── ui/
│   │   ├── button.tsx                   ← Often used together
│   │   └── media-player.tsx             ← Common integration
│   └── features/
│       ├── audio/
│       ├── video/
│       └── process-control/
```

### Common Integration Patterns
- **Media Players**: Stop playback functionality
- **Process Control**: Halt running operations
- **Form Controls**: Stop/cancel form submissions
- **Navigation**: Stop loading or cancel actions
- **Status Indicators**: Show stopped state

## Best Practices

### Architecture Adherence
✅ **Server Component**: Properly implemented as server component for optimal performance  
✅ **Flat Structure**: Simple, non-nested component design  
✅ **Reusable**: Generic icon component usable across domains  
✅ **Type Safety**: Full TypeScript support with proper prop typing  

### Usage Guidelines
- **Always provide accessibility labels** when used in interactive contexts
- **Use semantic HTML** - wrap in `<button>` for clickable actions
- **Consistent sizing** - use Tailwind classes like `w-4 h-4`, `w-5 h-5` for standardization
- **Color inheritance** - leverage `currentColor` for theme consistency
- **Event delegation** - handle interactions in parent components, not the icon itself

### Performance Considerations
- **Server-side rendering** compatible for fast initial page loads
- **No JavaScript bundle impact** when used in server components
- **Minimal DOM footprint** with optimized SVG paths
- **CSS-friendly** for efficient styling and animations

### Integration Examples
```tsx
// ✅ Good: Semantic button with accessibility
<button onClick={handleStop} aria-label="Stop recording">
  <PiStopCircleLine className="w-5 h-5" aria-hidden="true" />
</button>

// ✅ Good: Consistent with design system
<PiStopCircleLine className="w-4 h-4 text-muted-foreground" />

// ❌ Avoid: Missing accessibility context
<PiStopCircleLine onClick={handleStop} />
```