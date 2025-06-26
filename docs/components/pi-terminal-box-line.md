# PiTerminalBoxLine Icon Component

## Purpose

The `PiTerminalBoxLine` component renders a terminal/command line interface icon with a rectangular box outline. This SVG-based icon typically represents terminal windows, command prompts, or coding environments in user interfaces. It features a box border with internal terminal-specific elements like a command prompt arrow and cursor line.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | All standard SVG element props (className, style, onClick, etc.) |

**Inherited SVG Props Include:**
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `onMouseOver` - Mouse over event handler
- `aria-label` - Accessibility label
- `role` - ARIA role
- `data-*` - Data attributes

## Usage Example

```tsx
import { PiTerminalBoxLine } from '@/components/icons/pi/pi-terminal-box-line';

// Basic usage
function DeveloperToolbar() {
  return (
    <div className="flex items-center gap-2">
      <PiTerminalBoxLine />
      <span>Terminal</span>
    </div>
  );
}

// With custom styling and size
function CodeEditor() {
  return (
    <button 
      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
      onClick={() => openTerminal()}
    >
      <PiTerminalBoxLine 
        className="text-green-600" 
        style={{ fontSize: '20px' }}
      />
      Open Terminal
    </button>
  );
}

// In navigation menu
function DeveloperMenu() {
  return (
    <nav>
      <ul>
        <li className="flex items-center gap-3 p-2">
          <PiTerminalBoxLine className="w-5 h-5 text-slate-700" />
          <span>Command Line</span>
        </li>
      </ul>
    </nav>
  );
}

// With accessibility
function TerminalLauncher() {
  return (
    <button onClick={launchTerminal}>
      <PiTerminalBoxLine 
        aria-label="Launch terminal"
        role="img"
        className="w-6 h-6"
      />
    </button>
  );
}
```

## Functionality

- **Scalable Vector Rendering**: Renders crisp terminal icon at any size using SVG
- **Theme Integration**: Uses `currentColor` fill to inherit text color from parent elements
- **Responsive Sizing**: Default `1em` dimensions scale with font size
- **Interactive Support**: Accepts event handlers for user interactions
- **Accessibility Ready**: Supports ARIA attributes for screen readers
- **Style Flexibility**: Accepts className and style props for customization

## State Management

**None Required** - This is a stateless presentational component with no internal state management needs.

## Side Effects

**None** - Pure component with no side effects, API calls, or external interactions.

## Dependencies

### Internal Dependencies
- `React.SVGProps<SVGSVGElement>` - TypeScript interface for SVG element props

### External Dependencies
- React (peer dependency)

### Runtime Dependencies
None - renders standard SVG markup

## Integration

### Icon System Integration
```tsx
// Part of consistent icon library
import { PiTerminalBoxLine } from '@/components/icons/pi/pi-terminal-box-line';
import { PiCodeBlock } from '@/components/icons/pi/pi-code-block';
import { PiFileCode } from '@/components/icons/pi/pi-file-code';

const developerIcons = {
  terminal: PiTerminalBoxLine,
  code: PiCodeBlock,
  file: PiFileCode,
};
```

### Design System Integration
```tsx
// With design system components
import { Button } from '@/components/ui/button';
import { PiTerminalBoxLine } from '@/components/icons/pi/pi-terminal-box-line';

function TerminalButton() {
  return (
    <Button variant="outline" size="sm">
      <PiTerminalBoxLine className="mr-2 h-4 w-4" />
      Terminal
    </Button>
  );
}
```

### Feature Component Integration
```tsx
// In developer tools feature
function DeveloperToolsPanel() {
  return (
    <div className="developer-tools">
      <ToolbarButton 
        icon={PiTerminalBoxLine}
        label="Terminal"
        action="open-terminal"
      />
    </div>
  );
}
```

## Best Practices

### ✅ Recommended Patterns

```tsx
// Use semantic sizing with Tailwind classes
<PiTerminalBoxLine className="w-5 h-5" />

// Inherit color from parent context
<div className="text-blue-600">
  <PiTerminalBoxLine /> {/* Will be blue */}
</div>

// Include accessibility attributes for interactive use
<button>
  <PiTerminalBoxLine aria-hidden="true" />
  <span>Terminal</span>
</button>

// Consistent sizing in lists
<ul className="space-y-2">
  {tools.map(tool => (
    <li key={tool.id} className="flex items-center gap-2">
      <PiTerminalBoxLine className="w-4 h-4 text-gray-500" />
      <span>{tool.name}</span>
    </li>
  ))}
</ul>
```

### ❌ Anti-patterns

```tsx
// Don't use for non-terminal related features
<PiTerminalBoxLine /> {/* for file operations */}

// Don't override viewBox or core SVG structure
<PiTerminalBoxLine viewBox="0 0 32 32" /> {/* breaks icon */}

// Don't use without semantic context
<PiTerminalBoxLine /> {/* standalone without meaning */}
```

### Architecture Compliance

- **✅ Server-First**: Renders on server without client-side JavaScript
- **✅ Composable**: Works seamlessly with other UI components
- **✅ Type-Safe**: Full TypeScript support with proper prop typing
- **✅ Accessible**: Supports screen readers and assistive technologies
- **✅ Performance**: Zero runtime overhead, pure SVG rendering
- **✅ Consistent**: Follows established icon component patterns