# IconNavigationSignals Component

## Purpose

The `IconNavigationSignals` component renders a lightning bolt SVG icon typically used to represent signals, navigation actions, or real-time updates in the user interface. This icon component provides a consistent, scalable visual element that inherits color and sizing from its parent context.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and hydrated on the client.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

**Common SVG Props:**
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role
- `data-*` - Data attributes

## Usage Example

```tsx
import { IconNavigationSignals } from '@/components/icons/icon-navigation-signals';

// Basic usage
export function NavigationMenu() {
  return (
    <div className="flex items-center gap-2">
      <IconNavigationSignals />
      <span>Live Signals</span>
    </div>
  );
}

// With custom styling
export function SignalsButton() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded">
      <IconNavigationSignals 
        className="w-5 h-5" 
        aria-label="Navigation signals"
      />
      View Signals
    </button>
  );
}

// With interaction handlers
export function InteractiveSignal() {
  const handleSignalClick = () => {
    console.log('Signal icon clicked');
  };

  return (
    <IconNavigationSignals
      className="w-6 h-6 text-yellow-500 cursor-pointer hover:text-yellow-600"
      onClick={handleSignalClick}
      role="button"
      aria-label="Toggle navigation signals"
    />
  );
}

// In navigation context
export function NavItem() {
  return (
    <nav>
      <a href="/signals" className="flex items-center gap-2 p-2 hover:bg-gray-100">
        <IconNavigationSignals className="w-4 h-4 text-gray-600" />
        <span>Signal Dashboard</span>
      </a>
    </nav>
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisp at any size using SVG format
- **Inherited Styling**: Uses `currentColor` fill to inherit text color from parent
- **Responsive Sizing**: Default `1em` dimensions scale with font size
- **Accessibility Ready**: Accepts ARIA attributes for screen readers
- **Event Handling**: Supports standard SVG/DOM events through props spreading

### Visual Characteristics
- Lightning bolt shape indicating signals or real-time activity
- 20x20 viewBox with precise path coordinates
- Fill rule and clip rule optimized for clean rendering
- Grouped elements with semantic IDs for potential styling hooks

## State Management

**No State Management** - This is a stateless presentational component that doesn't manage any internal state, server state, or client state. It simply renders SVG markup based on the props provided.

## Side Effects

**No Side Effects** - The component has no side effects, API calls, or external interactions. It's a pure function that returns consistent SVG markup.

## Dependencies

### Internal Dependencies
- `React` - `SVGProps` type for prop typing
- No custom hooks or services

### External Dependencies
- None - Self-contained SVG component

## Integration

### Application Architecture Role
- **UI Layer**: Part of the foundational icon system in `/components/icons/`
- **Design System**: Provides consistent visual language across the application
- **Reusable Asset**: Can be used throughout the application without coupling to specific features

### Common Integration Patterns
```tsx
// In navigation components
import { IconNavigationSignals } from '@/components/icons/icon-navigation-signals';

// In dashboard widgets
export function SignalWidget() {
  return (
    <div className="widget">
      <h3 className="flex items-center gap-2">
        <IconNavigationSignals className="w-5 h-5 text-blue-500" />
        Active Signals
      </h3>
      {/* Widget content */}
    </div>
  );
}

// In button components from /ui/
import { Button } from '@/components/ui/button';

export function SignalButton() {
  return (
    <Button variant="outline" size="sm">
      <IconNavigationSignals className="w-4 h-4 mr-2" />
      Signals
    </Button>
  );
}
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: Correctly implemented as server component
- ✅ **Component Decomposition**: Flat, reusable icon component
- ✅ **Proper Typing**: Uses React's `SVGProps` for comprehensive prop support
- ✅ **Single Responsibility**: Only handles SVG rendering

### Usage Recommendations
1. **Accessibility**: Always provide `aria-label` when used as interactive elements
2. **Sizing**: Use CSS classes rather than hardcoded width/height props
3. **Color**: Leverage `currentColor` by setting text color on parent elements
4. **Performance**: Component can be safely imported and used without impact
5. **Consistency**: Use consistently across similar navigation/signal contexts

### Anti-patterns to Avoid
```tsx
// ❌ Don't hardcode colors - use currentColor inheritance
<IconNavigationSignals style={{ fill: '#ff0000' }} />

// ✅ Do set color on parent
<div className="text-red-500">
  <IconNavigationSignals />
</div>

// ❌ Don't use for non-signal related contexts
<IconNavigationSignals /> Delete Item

// ✅ Do use semantically appropriate icons
<IconTrash /> Delete Item
```