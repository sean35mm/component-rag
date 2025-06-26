# PiExpandUpDownFill Icon Component

## Purpose

The `PiExpandUpDownFill` component is an SVG icon that visually represents vertical expansion or collapse functionality. It displays two filled triangular arrows pointing up and down, commonly used for resizing panels, expanding/collapsing sections, or indicating vertical drag-to-resize interactions. This icon is part of the Phosphor Icons (Pi) library integration and provides a clear visual cue for bidirectional vertical operations.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup with no client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and hydrated on the client without any behavioral changes.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | - | All standard SVG element props including `className`, `style`, `onClick`, `aria-*`, `data-*`, etc. |

### Key SVG Props
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling the icon |
| `style` | `CSSProperties` | Inline styles for the SVG element |
| `onClick` | `MouseEventHandler` | Click event handler |
| `aria-label` | `string` | Accessibility label for screen readers |
| `role` | `string` | ARIA role attribute |

## Usage Example

```tsx
import { PiExpandUpDownFill } from '@/components/icons/pi/pi-expand-up-down-fill';

// Basic usage
function ResizablePanel() {
  return (
    <div className="border rounded-lg">
      <div className="p-4">
        <h3>Panel Content</h3>
      </div>
      <div className="flex justify-center border-t bg-gray-50 p-2 cursor-row-resize">
        <PiExpandUpDownFill 
          className="text-gray-500 hover:text-gray-700"
          aria-label="Resize panel vertically"
        />
      </div>
    </div>
  );
}

// Interactive resize handle
function VerticalResizer({ onResize }: { onResize: () => void }) {
  return (
    <button
      onClick={onResize}
      className="flex items-center gap-2 px-3 py-2 border rounded hover:bg-gray-50"
      aria-label="Toggle panel height"
    >
      <PiExpandUpDownFill className="w-4 h-4" />
      <span>Resize</span>
    </button>
  );
}

// Table column resizer
function DataTableHeader() {
  return (
    <th className="relative px-4 py-2 border-b">
      <span>Column Title</span>
      <div className="absolute right-1 top-1/2 -translate-y-1/2 cursor-col-resize">
        <PiExpandUpDownFill 
          className="w-3 h-3 text-gray-400 hover:text-gray-600"
          style={{ transform: 'rotate(90deg)' }}
        />
      </div>
    </th>
  );
}

// Collapsible section indicator
function CollapsibleSection({ 
  title, 
  isExpanded, 
  onToggle 
}: {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full p-3 border-b hover:bg-gray-50"
      aria-expanded={isExpanded}
    >
      <span className="font-medium">{title}</span>
      <PiExpandUpDownFill 
        className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
      />
    </button>
  );
}
```

## Functionality

- **Static SVG Rendering**: Renders a 24x24 viewBox SVG with two filled triangular arrow paths
- **Responsive Sizing**: Uses `1em` width/height for automatic scaling with font size
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent elements
- **Prop Forwarding**: Spreads all SVG props for maximum customization flexibility
- **Accessibility Ready**: Accepts ARIA attributes for screen reader compatibility
- **Transform Support**: Can be rotated or transformed for different orientations

## State Management

**No State Management Required** - This is a stateless presentational component that renders pure SVG markup. Any interactive behavior (hover effects, click handlers, state changes) should be managed by parent components using appropriate patterns:

- **UI State**: Parent components handle interaction state
- **Animation State**: CSS transitions or Framer Motion in parent components
- **Application State**: Business logic managed via TanStack Query or Zustand in consuming components

## Side Effects

**No Side Effects** - This component has no side effects, API calls, or external interactions. It renders deterministic SVG output based on props.

## Dependencies

### Internal Dependencies
- `SVGProps` from React for TypeScript prop definitions

### External Dependencies
- **React**: Core framework (^18.0.0)

### Related Components
- Other Phosphor Icons components in `/components/icons/pi/`
- UI components that use this icon (buttons, headers, panels)

## Integration

### Application Architecture Integration

```tsx
// Layout components
import { PiExpandUpDownFill } from '@/components/icons/pi/pi-expand-up-down-fill';

// Feature-specific usage
function DashboardLayout() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto]">
      <header>Header</header>
      <main className="relative">
        <ResizablePanel icon={PiExpandUpDownFill} />
      </main>
      <footer>Footer</footer>
    </div>
  );
}

// Design system integration
const iconVariants = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4', 
  lg: 'w-5 h-5'
};

function IconButton({ 
  size = 'md', 
  ...props 
}: { 
  size?: keyof typeof iconVariants 
}) {
  return (
    <button {...props}>
      <PiExpandUpDownFill className={iconVariants[size]} />
    </button>
  );
}
```

### Component Composition Patterns

```tsx
// Lego block composition - flat structure
function ResizableDataGrid() {
  return (
    <>
      <DataGridHeader />
      <DataGridBody />
      <ResizeHandle icon={PiExpandUpDownFill} />
    </>
  );
}

// UI kit integration
import { Button } from '@/components/ui/button';

function ExpandButton() {
  return (
    <Button variant="ghost" size="sm">
      <PiExpandUpDownFill />
      <span className="sr-only">Expand section</span>
    </Button>
  );
}
```

## Best Practices

### Architecture Adherence

✅ **Server Component Usage**: Properly implemented as server component for static SVG content

✅ **Flat Component Structure**: Simple, single-purpose icon component that composes well

✅ **Props Interface**: Uses standard React SVG props pattern for maximum flexibility

✅ **No Premature Client Boundaries**: Doesn't force 'use client' - leaves that to consuming components

### Usage Recommendations

```tsx
// ✅ Good: Semantic usage with proper accessibility
<button aria-label="Resize panel vertically">
  <PiExpandUpDownFill className="w-4 h-4" />
</button>

// ✅ Good: Composable with design system
<Button variant="ghost" icon={PiExpandUpDownFill}>
  Expand
</Button>

// ❌ Avoid: Inline styles instead of CSS classes
<PiExpandUpDownFill style={{ width: 16, height: 16 }} />

// ❌ Avoid: Missing accessibility context
<div onClick={handleClick}>
  <PiExpandUpDownFill />
</div>
```

### Performance Considerations

- **Bundle Size**: Minimal impact as pure SVG component
- **Runtime**: No re-renders or state updates
- **Accessibility**: Always provide context via `aria-label` or surrounding text
- **Semantic HTML**: Use within appropriate interactive elements (`button`, `a`, etc.)