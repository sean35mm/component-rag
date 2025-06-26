# PiLibraryCollapse Component

## Purpose

The `PiLibraryCollapse` component is an SVG icon that represents a library collapse action in the application's UI. This icon typically indicates functionality to minimize, close, or collapse a library panel or sidebar containing collections of items, files, or resources.

## Component Type

**Server Component** - This is a pure SVG icon component with no interactive state, event handlers, or browser-specific APIs. It can be safely rendered on the server and doesn't require the 'use client' directive.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | - | All standard SVG element props including className, style, onClick, etc. |

**Common SVGProps include:**
- `className?: string` - CSS classes for styling
- `style?: CSSProperties` - Inline styles
- `onClick?: (event: MouseEvent) => void` - Click event handler
- `onMouseEnter?: (event: MouseEvent) => void` - Mouse enter handler
- `aria-label?: string` - Accessibility label
- `role?: string` - ARIA role

## Usage Example

```tsx
import { PiLibraryCollapse } from '@/components/icons/pi/pi-library-collapse';
import { Button } from '@/components/ui/button';

// Basic usage
export function LibraryHeader() {
  return (
    <div className="flex items-center justify-between p-4">
      <h2>Library</h2>
      <Button variant="ghost" size="sm">
        <PiLibraryCollapse className="h-4 w-4" />
      </Button>
    </div>
  );
}

// With click handler and accessibility
export function CollapsibleLibraryPanel() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="library-panel">
      <Button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? "Expand library" : "Collapse library"}
        variant="ghost"
      >
        <PiLibraryCollapse 
          className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors"
        />
      </Button>
      {!isCollapsed && (
        <div className="library-content">
          {/* Library items */}
        </div>
      )}
    </div>
  );
}

// Custom styling
export function StyledLibraryIcon() {
  return (
    <PiLibraryCollapse 
      className="h-6 w-6 text-blue-600"
      style={{ transform: 'rotate(90deg)' }}
    />
  );
}
```

## Functionality

- **Scalable Vector Rendering**: Uses `1em` dimensions to scale with parent font size
- **Current Color Inheritance**: Inherits text color from parent elements via `fill='currentColor'`
- **Responsive Design**: Adapts to different sizes through CSS classes or font-size changes
- **Accessibility Ready**: Supports ARIA attributes and semantic HTML patterns
- **Event Handling**: Can receive click, hover, and other mouse/keyboard events

## State Management

**No State Management** - This is a stateless presentational component that doesn't manage any internal state. Any interactive behavior (like toggling collapse state) should be handled by parent components using:

- **Local State**: `useState` for simple toggle states
- **Zustand**: For complex UI state shared across multiple components
- **TanStack Query**: If collapse state needs to be persisted to server

## Side Effects

**No Side Effects** - This component is purely functional with no side effects. It doesn't perform API calls, access localStorage, or trigger any external actions.

## Dependencies

### Direct Dependencies
- `react` - For SVGProps type definition

### Integration Dependencies
- **UI Components**: Commonly used with Button, Tooltip, and Panel components
- **Parent Components**: Library panels, sidebars, navigation components
- **Styling**: Tailwind CSS classes for sizing and colors

## Integration

This icon component integrates into the larger application architecture as:

### UI Layer
```tsx
// Typically used in layout components
<Sidebar>
  <SidebarHeader>
    <Button onClick={toggleLibrary}>
      <PiLibraryCollapse />
    </Button>
  </SidebarHeader>
</Sidebar>
```

### Feature Components
```tsx
// Document management features
export function DocumentLibrary() {
  const { isCollapsed, toggle } = useLibraryState();
  
  return (
    <div className="document-library">
      <header>
        <Button onClick={toggle}>
          <PiLibraryCollapse />
          {isCollapsed ? 'Expand' : 'Collapse'}
        </Button>
      </header>
    </div>
  );
}
```

## Best Practices

### ✅ Follows Architecture Guidelines

1. **Server Component Default**: No client-side interactivity required
2. **Component Decomposition**: Single responsibility (icon rendering only)
3. **Reusability**: Located in `/icons/` directory for shared usage
4. **Flat Structure**: No unnecessary nesting or complexity

### ✅ Implementation Best Practices

```tsx
// Good: Semantic usage with proper accessibility
<Button 
  onClick={handleCollapse}
  aria-label="Collapse library panel"
>
  <PiLibraryCollapse className="h-4 w-4" />
  <span className="sr-only">Collapse</span>
</Button>

// Good: Consistent sizing with design system
<PiLibraryCollapse className="h-4 w-4" /> // Small
<PiLibraryCollapse className="h-5 w-5" /> // Medium  
<PiLibraryCollapse className="h-6 w-6" /> // Large

// Good: Color inheritance
<div className="text-blue-600">
  <PiLibraryCollapse /> {/* Will be blue */}
</div>
```

### ❌ Anti-patterns to Avoid

```tsx
// Bad: Hardcoded dimensions
<PiLibraryCollapse style={{ width: '16px', height: '16px' }} />

// Bad: Inline event handlers in icon
<PiLibraryCollapse onClick={handleClick} /> // Should be on Button wrapper

// Bad: Missing accessibility context
<PiLibraryCollapse /> // Needs semantic parent or aria-label
```