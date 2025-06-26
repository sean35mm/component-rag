# PiSparklingLine Icon Component

## Purpose

The `PiSparklingLine` component is a decorative SVG icon that renders a sparkling or magical effect symbol. It features two star-like sparkle shapes of different sizes, making it ideal for representing magic, enhancement, special features, premium content, or celebratory elements in the user interface.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG content without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | All standard SVG element props including `className`, `style`, `onClick`, `fill`, `stroke`, etc. |

### Common SVG Props
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `color` | `string` | Sets the `currentColor` value |
| `size` | `string \| number` | Can be applied via style to override default `1em` |

## Usage Example

```tsx
import { PiSparklingLine } from '@/components/icons/pi/pi-sparkling-line';

// Basic usage
export function FeatureCard() {
  return (
    <div className="feature-card">
      <PiSparklingLine className="text-yellow-500 w-6 h-6" />
      <h3>Premium Feature</h3>
      <p>Unlock advanced capabilities</p>
    </div>
  );
}

// In a button with interaction
export function UpgradeButton() {
  return (
    <button 
      className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg"
      onClick={() => handleUpgrade()}
    >
      <PiSparklingLine className="w-4 h-4" />
      Upgrade to Pro
    </button>
  );
}

// As status indicator
export function EnhancedBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative inline-flex items-center">
      {children}
      <PiSparklingLine 
        className="absolute -top-1 -right-1 w-3 h-3 text-amber-400"
        style={{ filter: 'drop-shadow(0 0 2px currentColor)' }}
      />
    </div>
  );
}

// In loading or success states
export function MagicLoader({ isComplete }: { isComplete: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <PiSparklingLine 
        className={`w-5 h-5 transition-colors duration-300 ${
          isComplete ? 'text-green-500' : 'text-blue-500 animate-pulse'
        }`}
      />
      <span>{isComplete ? 'Enhanced!' : 'Enhancing...'}</span>
    </div>
  );
}
```

## Functionality

- **Scalable Vector Graphics**: Renders crisp at any size using SVG format
- **Responsive Sizing**: Uses `1em` dimensions to scale with font size
- **Theme Integration**: Uses `currentColor` for stroke, inheriting text color
- **Accessibility Ready**: Accepts ARIA attributes and semantic props
- **Customizable Appearance**: Stroke width, colors, and effects can be modified via props
- **Dual Sparkle Design**: Features two distinct star shapes for visual depth

## State Management

**No State Management Required** - This is a stateless presentational component that relies purely on props for its appearance and behavior.

## Side Effects

**No Side Effects** - This component performs no API calls, DOM manipulation, or external interactions beyond rendering SVG content.

## Dependencies

### Internal Dependencies
- `React.SVGProps<SVGSVGElement>` type from React

### External Dependencies
- None - Pure React component

## Integration

This icon component fits into the application architecture as:

- **UI Layer Component**: Part of the foundational UI components in `/components/icons/`
- **Design System Element**: Provides consistent iconography across the application
- **Reusable Asset**: Can be used in any feature domain without coupling
- **Server-Side Rendered**: Contributes to fast initial page loads
- **Styling Integration**: Works seamlessly with Tailwind CSS and CSS-in-JS solutions

### Common Integration Patterns

```tsx
// In feature components
import { PiSparklingLine } from '@/components/icons/pi/pi-sparkling-line';

// Dashboard widgets
export function PremiumWidget() {
  return (
    <Card className="border-gradient">
      <CardHeader>
        <PiSparklingLine className="text-premium" />
        <CardTitle>Premium Analytics</CardTitle>
      </CardHeader>
    </Card>
  );
}

// Navigation elements
export function UpgradeMenuItem() {
  return (
    <MenuItem>
      <PiSparklingLine className="menu-icon" />
      Upgrade Account
    </MenuItem>
  );
}
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: No client-side JavaScript needed
- ✅ **Single Responsibility**: Only renders sparkling icon
- ✅ **Composition Ready**: Easily composed with other UI elements
- ✅ **Props Interface**: Uses standard SVG props pattern
- ✅ **No Side Effects**: Pure rendering component

### Recommended Usage Patterns
- Use for premium features, special content, or enhancement indicators
- Combine with animations for engagement (apply via className)
- Pair with gradients or special colors for magical effects
- Size appropriately for context (4-6 units for buttons, 3-4 for badges)
- Consider accessibility when using as functional elements (add proper ARIA labels)

### Performance Considerations
- Renders efficiently as inline SVG
- No external dependencies or bundle size impact
- Server-side rendering compatible
- Scales without quality loss