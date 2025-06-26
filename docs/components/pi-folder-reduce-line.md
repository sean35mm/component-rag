# PiFolderReduceLine Icon Component

## Purpose

The `PiFolderReduceLine` component is a specialized SVG icon that represents a folder with a reduce/minimize action, typically used in file management interfaces to indicate collapsing or reducing folder contents. This icon is part of the Pi icon library and provides a consistent visual representation for folder reduction operations.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser-specific APIs. It can be safely rendered on the server for optimal performance.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | - | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

### Common SVGProps Include:
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role
- `width` / `height` - Override default sizing

## Usage Example

```tsx
import { PiFolderReduceLine } from '@/components/icons/pi/pi-folder-reduce-line';

// Basic usage
export function FileManager() {
  return (
    <div className="file-explorer">
      <button className="folder-action">
        <PiFolderReduceLine />
        Collapse Folder
      </button>
    </div>
  );
}

// With custom styling and accessibility
export function FolderControls({ onCollapse }: { onCollapse: () => void }) {
  return (
    <button 
      onClick={onCollapse}
      className="p-2 hover:bg-gray-100 rounded"
      aria-label="Collapse folder contents"
    >
      <PiFolderReduceLine 
        className="w-5 h-5 text-gray-600" 
        role="img"
        aria-hidden="true"
      />
    </button>
  );
}

// In a toolbar component
export function FolderToolbar() {
  return (
    <div className="flex items-center gap-2">
      <PiFolderReduceLine className="text-blue-500" />
      <span>Minimize View</span>
    </div>
  );
}
```

## Functionality

### Key Features:
- **Scalable Vector Graphics**: Renders crisp at any size using SVG format
- **Responsive Sizing**: Uses `1em` dimensions to scale with font size
- **Theme Integration**: Uses `currentColor` fill to inherit text color
- **Accessibility Ready**: Accepts ARIA attributes for screen readers
- **Flexible Styling**: Supports all standard SVG props for customization

### Visual Design:
- Depicts a folder icon with a minimize/reduce line indicator
- Uses fill-rule and clip-rule for precise rendering
- Optimized 24x24 viewBox for crisp display at standard icon sizes

## State Management

**No State Management** - This is a stateless functional component that only renders SVG markup. Any state management would be handled by parent components that use this icon.

## Side Effects

**No Side Effects** - Pure functional component with no:
- API calls
- Local storage interactions  
- Browser API usage
- External service dependencies

## Dependencies

### Internal Dependencies:
- `React.SVGProps` type from React for prop typing

### External Dependencies:
- React (for JSX and TypeScript types)

### No Dependencies On:
- Custom hooks
- State management libraries
- Other components
- Utility functions

## Integration

### Application Architecture Integration:

```tsx
// In feature components
import { PiFolderReduceLine } from '@/components/icons/pi/pi-folder-reduce-line';

// File management features
export function DocumentExplorer() {
  return (
    <div className="document-tree">
      {folders.map(folder => (
        <FolderItem 
          key={folder.id}
          icon={<PiFolderReduceLine />}
          onCollapse={() => collapseFolder(folder.id)}
        />
      ))}
    </div>
  );
}

// UI component integration
export function IconButton({ icon, children, ...props }: IconButtonProps) {
  return (
    <button {...props}>
      {icon}
      {children}
    </button>
  );
}

// Usage in layouts
<IconButton icon={<PiFolderReduceLine />}>
  Collapse All
</IconButton>
```

### Design System Integration:
- Follows consistent icon sizing patterns (`1em` based)
- Integrates with color theming via `currentColor`
- Compatible with design system spacing and layout utilities

## Best Practices

### ✅ Architectural Compliance:

1. **Server-First Approach**: Correctly implemented as Server Component
2. **Component Decomposition**: Simple, focused component with single responsibility
3. **Reusability**: Located in `/ui/` equivalent path for cross-feature usage
4. **Type Safety**: Proper TypeScript integration with SVGProps

### ✅ Usage Recommendations:

```tsx
// Good: Semantic usage with accessibility
<button aria-label="Collapse folder">
  <PiFolderReduceLine aria-hidden="true" />
</button>

// Good: Consistent sizing
<PiFolderReduceLine className="w-4 h-4" /> // Small
<PiFolderReduceLine className="w-6 h-6" /> // Large

// Good: Color theming
<PiFolderReduceLine className="text-primary" />

// Avoid: Inline styling when classes available
<PiFolderReduceLine style={{ color: '#000' }} /> // Use className instead
```

### ✅ Performance Considerations:
- Lightweight SVG implementation
- No runtime JavaScript overhead
- Server-side rendering compatible
- Minimal bundle impact

### ✅ Accessibility Best Practices:
- Include `aria-label` on interactive parent elements
- Use `aria-hidden="true"` when icon is decorative
- Provide text alternatives for screen readers
- Ensure sufficient color contrast in themed implementations