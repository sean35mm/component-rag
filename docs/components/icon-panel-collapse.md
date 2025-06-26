# IconPanelDisplayCollapse

## Purpose

The `IconPanelDisplayCollapse` component is an SVG icon that represents a panel collapse action, typically used in UI interfaces to indicate that a panel or sidebar can be collapsed or hidden. The icon displays a left-pointing arrow within a panel-like structure, providing a clear visual cue for collapsing expanded content areas.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG content. It has no client-side interactivity, state management, or browser APIs dependencies, making it ideal for server-side rendering. The component only needs client-side rendering when used within interactive contexts that require event handlers.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | - | All standard SVG element props including `className`, `onClick`, `style`, `aria-label`, etc. Spread to the root `<svg>` element |

### Inherited SVG Props (commonly used)
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS class names for styling |
| `onClick` | `(event: MouseEvent) => void` | Click event handler |
| `style` | `CSSProperties` | Inline styles |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role attribute |

## Usage Example

```tsx
import { IconPanelDisplayCollapse } from '@/components/icons/icon-panel-collapse';

// Basic usage
export function Sidebar() {
  return (
    <div className="sidebar">
      <button className="collapse-button">
        <IconPanelDisplayCollapse />
        Collapse Panel
      </button>
    </div>
  );
}

// With custom styling and click handler
export function CollapsiblePanel() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="panel">
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="p-2 hover:bg-gray-100 rounded"
      >
        <IconPanelDisplayCollapse 
          className={`w-5 h-5 text-gray-600 transition-transform ${
            isCollapsed ? 'rotate-180' : ''
          }`}
          aria-label="Toggle panel visibility"
        />
      </button>
      {!isCollapsed && (
        <div className="panel-content">
          {/* Panel content */}
        </div>
      )}
    </div>
  );
}

// With Tailwind CSS sizing
export function NavigationHeader() {
  return (
    <header className="flex items-center justify-between p-4">
      <h1>Dashboard</h1>
      <IconPanelDisplayCollapse className="w-6 h-6 text-blue-600 cursor-pointer" />
    </header>
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisply at any size using SVG format
- **CSS Integration**: Uses `currentColor` for fill, inheriting text color from parent elements
- **Responsive Sizing**: Default `1em` sizing makes it scale with font size
- **Accessibility Ready**: Accepts all ARIA attributes for screen reader support
- **Theme Compatible**: Color inherits from CSS text color, works with dark/light themes

### Visual Design
- **Viewbox**: 18x18 coordinate system for precise scaling
- **Icon Elements**: Left-pointing arrow with panel/sidebar visual metaphor
- **Stroke Weight**: Optimized for clarity at small sizes

## State Management

**No State Management** - This is a stateless presentational component. Any state related to panel collapse/expand functionality should be managed by parent components using:

- **Local State**: `useState` for simple toggle functionality
- **Zustand**: For global sidebar/panel state across the application
- **URL State**: For persistent panel states using search params or routing

## Side Effects

**No Side Effects** - The component has no side effects, API calls, or external interactions. It's a pure presentational component that only renders SVG markup.

## Dependencies

### Direct Dependencies
- `react` - For `SVGProps` type definition

### Related Components
- Other icon components in `/components/icons/`
- Button components that typically wrap this icon
- Panel/Sidebar components that use this icon
- Navigation components requiring collapse functionality

## Integration

### Application Architecture
```
src/
├── components/
│   ├── icons/
│   │   ├── icon-panel-collapse.tsx     # This component
│   │   └── index.ts                    # Icon exports
│   ├── ui/
│   │   ├── button.tsx                  # Often wraps icons
│   │   └── sidebar.tsx                 # Uses collapse icons
│   └── layout/
│       └── navigation.tsx              # Implements panel controls
```

### Common Integration Patterns
- **Sidebar Controls**: Used in collapsible navigation panels
- **Dashboard Widgets**: Panel collapse controls in widget headers
- **Modal Dialogs**: Minimize/collapse functionality
- **Accordion Components**: Section expand/collapse indicators

## Best Practices

### Architecture Adherence
✅ **Server Component Default**: Correctly implemented as server component
✅ **Component Decomposition**: Single responsibility - only renders icon
✅ **Reusability**: Located in `/components/icons/` for cross-domain usage
✅ **Props Interface**: Uses standard React SVG props pattern

### Usage Recommendations

```tsx
// ✅ Good: Semantic usage with proper accessibility
<button 
  onClick={handleCollapse}
  aria-label="Collapse sidebar"
  aria-expanded={!isCollapsed}
>
  <IconPanelDisplayCollapse />
</button>

// ✅ Good: Consistent sizing with CSS
<IconPanelDisplayCollapse className="w-5 h-5" />

// ✅ Good: Color inheritance
<div className="text-blue-600">
  <IconPanelDisplayCollapse /> {/* Will be blue */}
</div>

// ❌ Avoid: Hardcoded colors
<IconPanelDisplayCollapse style={{ color: '#000000' }} />

// ❌ Avoid: Missing accessibility context
<IconPanelDisplayCollapse onClick={handleClick} /> {/* Icons shouldn't handle clicks directly */
```

### Performance Considerations
- **Bundle Size**: Minimal impact, pure SVG with no external dependencies
- **Rendering**: Optimized for server-side rendering
- **Reusability**: Single import can be used across multiple features

### Styling Integration
- Use Tailwind CSS classes for consistent sizing (`w-4 h-4`, `w-5 h-5`, etc.)
- Leverage `currentColor` for theme integration
- Apply hover states to parent interactive elements, not the icon itself