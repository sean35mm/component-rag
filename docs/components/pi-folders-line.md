# PiFoldersLine Icon Component

## Purpose

`PiFoldersLine` is a React SVG icon component that renders a line-style folders icon. It's part of the Phosphor Icons (Pi) icon library integration, providing a visual representation of multiple folders or file organization. This icon is commonly used in file management interfaces, navigation menus, and anywhere folder organization needs to be represented.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG content without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and hydrated on the client.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Spread onto the root `<svg>` element |

### Common SVG Props
| Prop | Type | Example | Description |
|------|------|---------|-------------|
| `className` | `string` | `"w-6 h-6 text-blue-500"` | CSS classes for styling |
| `style` | `CSSProperties` | `{{ color: 'red' }}` | Inline styles |
| `onClick` | `MouseEventHandler` | `() => handleClick()` | Click handler |
| `aria-label` | `string` | `"Open folders"` | Accessibility label |

## Usage Example

```tsx
import { PiFoldersLine } from '@/components/icons/pi/pi-folders-line';

// Basic usage
export function FileManagerHeader() {
  return (
    <div className="flex items-center gap-2">
      <PiFoldersLine className="w-5 h-5 text-gray-600" />
      <span>My Folders</span>
    </div>
  );
}

// Interactive usage with click handler
export function FolderNavigationButton() {
  const handleFolderClick = () => {
    // Navigate to folders view
    router.push('/folders');
  };

  return (
    <button 
      onClick={handleFolderClick}
      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded"
      aria-label="View all folders"
    >
      <PiFoldersLine className="w-4 h-4" />
      <span>All Folders</span>
    </button>
  );
}

// With custom styling and sizing
export function SidebarFolderIcon() {
  return (
    <PiFoldersLine 
      className="w-6 h-6 text-blue-600" 
      style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }}
    />
  );
}

// Accessibility-focused usage
export function AccessibleFolderIcon() {
  return (
    <PiFoldersLine 
      className="w-5 h-5"
      role="img"
      aria-label="Folders"
    />
  );
}
```

## Functionality

### Core Features
- **SVG Rendering**: Renders a crisp, scalable vector icon of folders in line style
- **Responsive Sizing**: Uses `1em` width/height, making it scale with parent font-size
- **Color Inheritance**: Uses `currentColor` fill, inheriting text color from parent
- **Prop Forwarding**: Accepts and forwards all standard SVG props for maximum flexibility

### Visual Characteristics
- **Viewbox**: `0 0 24 24` - Standard 24x24 grid
- **Style**: Line/outline style folders icon
- **Path**: Single path element with fill rule and clip rule for clean rendering

## State Management

**No State Management** - This is a stateless presentational component that doesn't manage any internal state. It relies purely on props for configuration and styling.

## Side Effects

**No Side Effects** - This component has no side effects, API calls, or external interactions. It's a pure function that renders SVG markup based on props.

## Dependencies

### Direct Dependencies
- `react` - For `SVGProps` type definition
- No runtime dependencies beyond React

### Related Components
- Other Pi icon components in the same family
- UI components that might use this icon (buttons, navigation, file managers)

### Integration Points
- Icon button components
- Navigation menus
- File management interfaces
- Sidebar navigation
- Toolbar components

## Integration

### Application Architecture
```tsx
// Typical integration in a file management feature
src/
  components/
    icons/pi/
      pi-folders-line.tsx          # This component
    ui/
      button.tsx                   # May use this icon
      navigation.tsx               # May use this icon
  app/
    dashboard/
      file-manager/
        components/
          folder-grid.tsx          # Consumer of this icon
          sidebar.tsx              # Consumer of this icon
```

### Usage Patterns
- **Navigation Icons**: In sidebar or menu navigation for folder sections
- **Action Buttons**: As part of "Open Folders" or "View Folders" buttons
- **Status Indicators**: To indicate folder-related content or sections
- **File Manager UI**: Within file browser interfaces and folder hierarchies

## Best Practices

### ✅ Recommended Patterns

```tsx
// 1. Use with semantic HTML and proper accessibility
<button aria-label="View folders">
  <PiFoldersLine className="w-4 h-4" />
</button>

// 2. Size with Tailwind width/height classes
<PiFoldersLine className="w-5 h-5" /> // Standard size
<PiFoldersLine className="w-6 h-6" /> // Larger size

// 3. Color with text color utilities
<PiFoldersLine className="text-blue-600" />

// 4. Combine with text for clear labeling
<div className="flex items-center gap-2">
  <PiFoldersLine className="w-4 h-4" />
  <span>Folders</span>
</div>
```

### ❌ Anti-patterns

```tsx
// DON'T: Use without proper sizing
<PiFoldersLine /> // Will be tiny (1em)

// DON'T: Override width/height with inline styles when Tailwind is available
<PiFoldersLine style={{ width: '20px', height: '20px' }} />

// DON'T: Use without context in interactive elements
<button><PiFoldersLine /></button> // No accessibility

// DON'T: Hardcode colors when theme colors are available
<PiFoldersLine style={{ color: '#3B82F6' }} />
```

### Architecture Compliance
- **✅ Server Component**: Renders efficiently on server without client-side JavaScript
- **✅ Composable**: Works as a building block in larger UI components
- **✅ Reusable**: Generic icon component usable across features
- **✅ Accessible**: Supports ARIA attributes and semantic usage
- **✅ Type Safe**: Fully typed with TypeScript SVG props interface