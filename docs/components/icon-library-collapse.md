# IconLibraryCollapse

## Purpose

The `IconLibraryCollapse` component is an SVG icon component that renders a "collapse" or "hide" symbol, typically used in library panels, sidebars, or navigation interfaces. The icon visually represents the action of collapsing or hiding a panel, featuring a horizontal line with a left-pointing arrow and a vertical line separator.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | - | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

### Inherited SVG Props (Common Usage)
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `(event: MouseEvent) => void` | Click handler for interactive usage |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role attribute |

## Usage Example

```tsx
import { IconLibraryCollapse } from '@/components/icons/icon-library-collapse';
import { Button } from '@/components/ui/button';

// Basic usage
export function LibraryHeader() {
  return (
    <div className="flex items-center justify-between p-4">
      <h2 className="text-lg font-semibold">Library</h2>
      <IconLibraryCollapse className="w-5 h-5 text-gray-600" />
    </div>
  );
}

// Interactive usage with click handler
export function CollapsibleLibraryPanel() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="library-panel">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="p-2"
        aria-label="Toggle library panel"
      >
        <IconLibraryCollapse 
          className={`w-4 h-4 transition-transform ${
            isCollapsed ? 'rotate-180' : ''
          }`}
        />
      </Button>
      {!isCollapsed && (
        <div className="library-content">
          {/* Library content */}
        </div>
      )}
    </div>
  );
}

// With custom styling
export function CustomStyledIcon() {
  return (
    <IconLibraryCollapse 
      className="w-6 h-6 text-blue-500 hover:text-blue-700 cursor-pointer"
      onClick={() => console.log('Collapse clicked')}
    />
  );
}
```

## Functionality

- **SVG Rendering**: Renders a scalable vector graphic icon
- **Responsive Sizing**: Uses `1em` dimensions to scale with font size
- **Color Inheritance**: Uses `currentColor` to inherit text color from parent
- **Prop Forwarding**: Spreads all received props to the SVG element
- **Accessibility Ready**: Accepts ARIA attributes for screen readers

### Visual Elements
- Horizontal line representing content
- Left-pointing arrow indicating collapse direction
- Vertical line separator suggesting panel boundary

## State Management

**None** - This is a stateless presentational component. State management should be handled by parent components that use this icon for interactive functionality.

## Side Effects

**None** - This component has no side effects, API calls, or external interactions. It's a pure rendering component.

## Dependencies

### Direct Dependencies
- `react` - For `SVGProps` type definition

### Related Components
- Button components (when used interactively)
- Panel/sidebar components (common usage context)
- Other icon components in the icon library

## Integration

This component fits into the application architecture as:

### Icon System
- Part of the centralized icon library in `/components/icons/`
- Follows consistent naming convention: `Icon[Name]`
- Provides uniform SVG structure across the application

### UI Layer
- Used in navigation components, toolbars, and control panels
- Integrates with button components for interactive controls
- Works with layout components for collapsible interfaces

### Design System
- Maintains consistent visual language for collapse actions
- Supports theming through `currentColor` usage
- Scales appropriately with typography settings

## Best Practices

### ✅ Follows Architecture Guidelines

1. **Server Component Default**: Correctly implemented as server component
2. **Component Decomposition**: Simple, focused component that stacks well with others
3. **Reusability**: Placed in `/components/icons/` for cross-feature usage
4. **Props Pattern**: Uses standard SVG props interface

### ✅ Implementation Best Practices

```tsx
// ✅ Good: Semantic usage with accessibility
<Button aria-label="Collapse library panel">
  <IconLibraryCollapse className="w-4 h-4" />
</Button>

// ✅ Good: Responsive sizing with em units
<IconLibraryCollapse /> // Inherits font size

// ✅ Good: Theme-aware coloring
<IconLibraryCollapse className="text-primary" />

// ❌ Avoid: Fixed pixel dimensions that break responsive design
<IconLibraryCollapse style={{ width: '16px', height: '16px' }} />

// ❌ Avoid: Hardcoded colors that break theming
<IconLibraryCollapse style={{ color: '#000000' }} />
```

### Usage Recommendations

1. **Always provide accessibility labels** when used interactively
2. **Use CSS classes** for sizing rather than inline styles
3. **Leverage currentColor** for theme consistency
4. **Combine with semantic HTML** elements like buttons
5. **Consider animation** for state transitions in collapsible interfaces