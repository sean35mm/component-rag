# PiTerminalLine Icon Component

## Purpose

The `PiTerminalLine` component is a terminal/command line icon that displays a command prompt symbol with a cursor line. This SVG icon component is designed to represent terminal interfaces, command line operations, or development tools within the application's user interface.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | - | All standard SVG element props (className, style, onClick, etc.) |

### Inherited SVG Props
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role
- And all other standard SVG attributes

## Usage Example

```tsx
import { PiTerminalLine } from '@/components/icons/pi/pi-terminal-line';

// Basic usage
export default function DeveloperTools() {
  return (
    <div className="flex items-center gap-2">
      <PiTerminalLine />
      <span>Terminal</span>
    </div>
  );
}

// With custom styling
export default function CommandSection() {
  return (
    <button className="flex items-center gap-2 p-2 hover:bg-gray-100">
      <PiTerminalLine 
        className="text-blue-600" 
        style={{ fontSize: '1.25rem' }}
      />
      Open Terminal
    </button>
  );
}

// In a navigation menu
export default function DevToolsNav() {
  return (
    <nav>
      <a href="/terminal" className="nav-link">
        <PiTerminalLine aria-label="Terminal" />
        Command Line
      </a>
    </nav>
  );
}

// With click handler for interactive elements
export default function ToolbarButton() {
  const handleTerminalOpen = () => {
    // Open terminal functionality
  };

  return (
    <PiTerminalLine 
      onClick={handleTerminalOpen}
      className="cursor-pointer hover:text-blue-600"
      role="button"
      aria-label="Open terminal"
    />
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisply at any size using SVG format
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Theme Integration**: Uses `currentColor` fill to inherit text color from parent
- **Accessibility Ready**: Accepts ARIA attributes for screen reader compatibility
- **Flexible Styling**: Accepts all standard SVG props for customization

### Visual Design
- Displays a command prompt angle bracket (`>`) symbol
- Includes a horizontal line representing a cursor or input line
- Clean, minimalist design suitable for modern interfaces
- Follows consistent stroke and fill patterns

## State Management

**No State Management Required** - This is a stateless presentational component that doesn't require:
- TanStack Query (no server state)
- Zustand (no client state)
- Local state (no internal state)

## Side Effects

**No Side Effects** - This component:
- Makes no API calls
- Performs no external interactions
- Has no lifecycle effects
- Is purely declarative SVG rendering

## Dependencies

### Direct Dependencies
- `react` - For SVGProps type definition
- No external libraries or custom hooks

### Related Components
- Other Phosphor icon components in `/components/icons/pi/`
- UI components that may use this icon (buttons, navigation, toolbars)

## Integration

### Application Architecture Integration

```tsx
// In feature components
import { PiTerminalLine } from '@/components/icons/pi/pi-terminal-line';

// Developer tools feature
export default function CodeEditor() {
  return (
    <div className="toolbar">
      <button>
        <PiTerminalLine />
        Terminal
      </button>
    </div>
  );
}

// Admin dashboard integration
export default function SystemTools() {
  return (
    <section>
      <h3>
        <PiTerminalLine className="inline mr-2" />
        Command Center
      </h3>
    </section>
  );
}
```

### Design System Integration
- Follows icon component patterns in the design system
- Consistent sizing and color inheritance
- Compatible with button, navigation, and toolbar components

## Best Practices

### Architectural Adherence
✅ **Server Component**: Correctly implemented as server component (no client-side features)
✅ **Component Decomposition**: Simple, focused component with single responsibility
✅ **Reusability**: Properly placed in `/components/icons/` for cross-feature usage
✅ **Props Interface**: Uses standard React patterns with SVGProps spread

### Usage Recommendations

```tsx
// ✅ Good: Semantic usage with proper labeling
<PiTerminalLine aria-label="Open terminal" />

// ✅ Good: Consistent sizing with parent text
<span className="text-lg">
  <PiTerminalLine /> Terminal
</span>

// ✅ Good: Proper color inheritance
<button className="text-blue-600">
  <PiTerminalLine /> {/* Inherits blue color */}
</button>

// ❌ Avoid: Hardcoded dimensions that break responsiveness
<PiTerminalLine style={{ width: '16px', height: '16px' }} />

// ❌ Avoid: Missing accessibility labels for interactive elements
<PiTerminalLine onClick={handler} /> {/* Missing aria-label */}
```

### Performance Considerations
- Lightweight SVG with minimal DOM nodes
- No JavaScript execution overhead
- Efficient re-rendering due to prop stability
- Can be safely used in lists or repeated elements