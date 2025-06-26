# IconTools Component

## Purpose

The `IconTools` component renders an SVG icon representing tools or settings functionality. This is a utility component that provides a consistent visual representation for tools-related features across the application, such as settings panels, configuration options, or utility menus.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGAttributes<SVGElement>` | No | `{}` | Standard SVG element attributes including `className`, `style`, `onClick`, `aria-label`, etc. |

### Common SVG Attributes
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role
- `data-*` - Data attributes

## Usage Example

```tsx
import { IconTools } from '@/components/icons/icon-tools';

// Basic usage
export function SettingsButton() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded">
      <IconTools />
      Settings
    </button>
  );
}

// With custom styling
export function ToolsMenu() {
  return (
    <div className="flex items-center">
      <IconTools 
        className="w-6 h-6 text-gray-600 hover:text-gray-900" 
        aria-label="Open tools menu"
      />
    </div>
  );
}

// With click handler
export function ConfigurationPanel() {
  const handleToolsClick = () => {
    console.log('Tools clicked');
  };

  return (
    <IconTools 
      onClick={handleToolsClick}
      className="cursor-pointer text-blue-500"
      role="button"
      aria-label="Open configuration tools"
    />
  );
}

// In a navigation context
export function Sidebar() {
  return (
    <nav className="space-y-2">
      <a href="/tools" className="flex items-center gap-3 p-2 hover:bg-gray-100">
        <IconTools className="w-5 h-5" />
        <span>Tools</span>
      </a>
    </nav>
  );
}
```

## Functionality

### Core Features
- **SVG Rendering**: Displays a tools icon using scalable vector graphics
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Current Color**: Uses `fill='currentColor'` to inherit text color from parent
- **Prop Forwarding**: Accepts and forwards all standard SVG attributes

### Visual Characteristics
- **Viewbox**: `0 0 20 20` coordinate system
- **Fill Rule**: Uses `evenodd` for complex path rendering
- **Clip Rule**: Uses `evenodd` for proper clipping behavior
- **Paths**: Contains two path elements forming a tools/settings icon shape

## State Management

**No State Management** - This is a stateless presentational component that doesn't require any state management solutions. It simply renders SVG markup based on the provided props.

## Side Effects

**No Side Effects** - This component is purely functional with no side effects, API calls, or external interactions. It only renders SVG content.

## Dependencies

### Internal Dependencies
- React and SVGAttributes type from React
- No internal component dependencies

### External Dependencies
- None - this is a self-contained SVG icon component

## Integration

### Application Architecture Role
- **UI Component Layer**: Part of the base UI component library in `/components/icons/`
- **Design System**: Contributes to the application's icon system and visual consistency
- **Reusability**: Used across multiple features for tools/settings functionality

### Usage Patterns
```tsx
// Feature components
import { IconTools } from '@/components/icons/icon-tools';

// Settings page
export function SettingsPage() {
  return (
    <div className="page-header">
      <IconTools className="w-8 h-8" />
      <h1>Settings</h1>
    </div>
  );
}

// Admin toolbar
export function AdminToolbar() {
  return (
    <div className="toolbar">
      <button className="tool-button">
        <IconTools />
        Configuration
      </button>
    </div>
  );
}
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: Correctly implemented as server component for static content
- ✅ **Component Decomposition**: Simple, focused component following single responsibility
- ✅ **Reusability**: Placed in `/components/icons/` for cross-application usage
- ✅ **Prop Interface**: Uses standard SVG attributes for maximum flexibility

### Implementation Guidelines
- ✅ **Accessibility**: Include `aria-label` when used as interactive elements
- ✅ **Styling**: Use `className` for consistent styling with design system
- ✅ **Sizing**: Leverage `1em` sizing for responsive behavior
- ✅ **Color**: Utilize `currentColor` for theme integration

### Usage Recommendations
```tsx
// ✅ Good: Semantic usage with accessibility
<button aria-label="Open settings">
  <IconTools className="w-5 h-5" />
</button>

// ✅ Good: Consistent with design system
<IconTools className="text-primary-600 hover:text-primary-700" />

// ❌ Avoid: Hardcoded sizes that break responsive design
<IconTools style={{ width: '24px', height: '24px' }} />
```