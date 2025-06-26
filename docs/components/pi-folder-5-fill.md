# PiFolder5Fill Component

## Purpose
The `PiFolder5Fill` component is a filled folder icon component from the Phosphor Icons (Pi) library. It renders an SVG representation of a folder with a tab, commonly used in file management interfaces, navigation menus, or anywhere a folder metaphor is needed to represent directories, collections, or organizational structures.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Spread to the root `<svg>` element |

## Usage Example

```tsx
import { PiFolder5Fill } from '@/components/icons/pi/pi-folder-5-fill';

// Basic usage
export function FileManager() {
  return (
    <div className="flex items-center gap-2">
      <PiFolder5Fill />
      <span>Documents</span>
    </div>
  );
}

// With custom styling and accessibility
export function FolderButton() {
  return (
    <button 
      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
      onClick={() => console.log('Folder clicked')}
    >
      <PiFolder5Fill 
        className="text-blue-600" 
        aria-hidden="true"
      />
      <span>My Projects</span>
    </button>
  );
}

// As part of a navigation menu
export function SidebarNav() {
  return (
    <nav className="space-y-1">
      <a href="/folders" className="flex items-center gap-3 px-3 py-2">
        <PiFolder5Fill className="w-5 h-5 text-gray-500" />
        <span>All Folders</span>
      </a>
    </nav>
  );
}

// With dynamic sizing
export function ResponsiveFolderIcon({ size = "1rem" }: { size?: string }) {
  return (
    <PiFolder5Fill 
      style={{ width: size, height: size }}
      className="text-yellow-600"
    />
  );
}
```

## Functionality
- **SVG Rendering**: Renders a scalable vector graphic of a filled folder icon
- **Responsive Sizing**: Uses `1em` for width/height, scaling with parent font size
- **Color Inheritance**: Uses `currentColor` fill, inheriting text color from parent
- **Accessibility Ready**: Accepts ARIA attributes and other accessibility props
- **Customizable**: Supports all standard SVG props for styling and event handling

## State Management
**None** - This is a stateless presentational component with no internal state management requirements.

## Side Effects
**None** - Pure component with no side effects, API calls, or external interactions.

## Dependencies
- **React**: Uses `SVGProps` type from React for prop typing
- **No external dependencies**: Self-contained SVG icon component

## Integration
This component integrates into the application's icon system as part of the Phosphor Icons collection:

- **Icon Library**: Part of the `/components/icons/pi/` directory structure
- **Design System**: Works with the application's color and sizing tokens through CSS classes
- **UI Components**: Can be composed into buttons, navigation items, cards, and other UI elements
- **Theming**: Inherits colors from parent components via `currentColor`
- **Accessibility**: Integrates with screen readers when proper ARIA attributes are provided

## Best Practices

### ✅ Follows Architecture Guidelines
- **Server Component**: Correctly implemented as server component (no 'use client' needed)
- **Component Decomposition**: Simple, focused component that can be easily composed
- **Reusability**: Located in appropriate `/icons/` directory for cross-application usage

### ✅ Implementation Best Practices
```tsx
// Good: Semantic usage with proper accessibility
<button aria-label="Open folder">
  <PiFolder5Fill aria-hidden="true" />
  <span className="sr-only">Documents folder</span>
</button>

// Good: Consistent sizing with design system
<PiFolder5Fill className="w-4 h-4 text-muted-foreground" />

// Good: Proper event handling
<PiFolder5Fill 
  onClick={handleFolderClick}
  className="cursor-pointer hover:text-blue-600"
/>
```

### ✅ Accessibility Considerations
- Use `aria-hidden="true"` when icon is decorative
- Provide `aria-label` or visible text when icon conveys meaning
- Ensure sufficient color contrast when applying custom colors
- Consider focus states for interactive usage

### ✅ Performance Optimizations
- No runtime overhead - pure SVG markup
- Tree-shakeable when using ES modules
- Small bundle size impact
- Server-side renderable