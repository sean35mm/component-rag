# PiFileCopyLine Icon Component

## Purpose

The `PiFileCopyLine` component renders a file copy icon using SVG. This icon typically represents file duplication, copying documents, or clipboard operations within the application's user interface. It's part of the icon library and follows a consistent visual design pattern for document-related actions.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG content without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server side for optimal performance.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | - | All standard SVG element props including `className`, `style`, `onClick`, `aria-*`, etc. |

### Common SVG Props
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role |

## Usage Example

```tsx
import { PiFileCopyLine } from '@/components/icons/pi/pi-file-copy-line';

// Basic usage
export default function DocumentActions() {
  return (
    <div className="flex gap-2">
      <button className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded">
        <PiFileCopyLine />
        Copy Document
      </button>
    </div>
  );
}

// With custom styling and accessibility
export function DuplicateButton({ onDuplicate }: { onDuplicate: () => void }) {
  return (
    <button
      onClick={onDuplicate}
      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      aria-label="Duplicate file"
    >
      <PiFileCopyLine 
        className="w-5 h-5 text-gray-600" 
        aria-hidden="true"
      />
    </button>
  );
}

// In a file manager context
export function FileItem({ file }: { file: File }) {
  const handleCopy = () => {
    // Copy file logic
  };

  return (
    <div className="flex items-center justify-between p-3 border rounded">
      <span>{file.name}</span>
      <div className="flex gap-1">
        <button 
          onClick={handleCopy}
          className="p-1 hover:bg-gray-100 rounded"
          title="Copy file"
        >
          <PiFileCopyLine className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisp at any size using SVG format
- **Current Color Inheritance**: Uses `fill='currentColor'` to inherit text color from parent
- **Responsive Sizing**: Default `1em` sizing scales with font size
- **Accessibility Ready**: Accepts all ARIA attributes for screen reader support
- **Customizable**: Accepts all standard SVG props for styling and behavior

### Visual Design
- **Outline Style**: Line-based design following the "line" variant pattern
- **Dual Document Representation**: Shows two overlapping rectangles to represent copying
- **Consistent Proportions**: 24x24 viewBox maintains aspect ratio
- **Clean Geometry**: Uses `fillRule` and `clipRule` for precise rendering

## State Management

**No State Management** - This is a stateless presentational component that doesn't require any state management solutions. It simply renders SVG markup based on the provided props.

## Side Effects

**No Side Effects** - The component has no side effects, API calls, or external interactions. It's a pure function component that renders deterministic output based on input props.

## Dependencies

### Internal Dependencies
- **React**: Uses `SVGProps<SVGSVGElement>` type from React

### External Dependencies
- None - This component has no external dependencies beyond React

### Related Components
- Other Pi icon components in the `/icons/pi/` directory
- UI components that use this icon (buttons, toolbars, file managers)

## Integration

### Application Architecture
```
src/
├── components/
│   ├── icons/
│   │   └── pi/
│   │       └── pi-file-copy-line.tsx  ← This component
│   ├── ui/
│   │   ├── button.tsx                 ← May use this icon
│   │   └── dropdown-menu.tsx          ← May use this icon
│   └── features/
│       ├── documents/
│       │   └── document-actions.tsx   ← Likely consumer
│       └── file-manager/
│           └── file-item.tsx          ← Likely consumer
```

### Usage Patterns
- **Button Icons**: Commonly used inside button components for copy actions
- **Menu Items**: Used in dropdown menus and context menus
- **Toolbar Elements**: Part of document editing toolbars
- **File Management**: Core icon for file operation interfaces

## Best Practices

### Architecture Adherence
✅ **Server Component**: No client-side JavaScript needed, renders on server  
✅ **Single Responsibility**: Only responsible for rendering the copy icon  
✅ **Reusable Design**: Generic icon that works across different contexts  
✅ **Props Spreading**: Accepts all SVG props for maximum flexibility  

### Implementation Guidelines
```tsx
// ✅ Good: Semantic usage with accessibility
<button aria-label="Copy document">
  <PiFileCopyLine aria-hidden="true" />
  <span className="sr-only">Copy</span>
</button>

// ✅ Good: Consistent sizing with design system
<PiFileCopyLine className="w-5 h-5" />

// ✅ Good: Color inheritance
<div className="text-blue-600">
  <PiFileCopyLine /> {/* Inherits blue color */}
</div>

// ❌ Avoid: Hardcoded colors that break theming
<PiFileCopyLine style={{ color: '#ff0000' }} />

// ❌ Avoid: Missing accessibility attributes in interactive contexts
<div onClick={handleCopy}>
  <PiFileCopyLine />
</div>
```

### Performance Considerations
- **Server Rendering**: Component renders on server, reducing client-side work
- **No JavaScript Bundle**: Adds minimal bytes to the client bundle
- **SVG Optimization**: Inline SVG provides optimal loading performance
- **Tree Shaking**: Can be tree-shaken if unused in the application