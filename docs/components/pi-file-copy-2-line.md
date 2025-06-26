# PiFileCopy2Line Icon Component

## Purpose

The `PiFileCopy2Line` component renders an SVG icon representing file copying or duplication functionality. This icon visually communicates copy operations in the user interface, typically used alongside copy buttons, file management features, or duplicate actions. The icon displays two overlapping document outlines to clearly indicate the copy concept.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and doesn't require the 'use client' directive.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

### Common SVG Props
| Prop | Type | Example | Description |
|------|------|---------|-------------|
| `className` | `string` | `"w-5 h-5 text-blue-500"` | CSS classes for styling |
| `style` | `CSSProperties` | `{{ color: 'red' }}` | Inline styles |
| `onClick` | `MouseEventHandler` | `() => handleCopy()` | Click event handler |
| `aria-label` | `string` | `"Copy file"` | Accessibility label |

## Usage Example

```tsx
import { PiFileCopy2Line } from '@/components/icons/pi/pi-file-copy-2-line';
import { Button } from '@/components/ui/button';

// Basic usage
export function FileActionsServer() {
  return (
    <div className="flex items-center gap-2">
      <PiFileCopy2Line className="w-5 h-5 text-gray-600" />
      <span>Copy Document</span>
    </div>
  );
}

// Interactive usage in a client component
'use client';

import { useState } from 'react';

export function CopyFileButton({ fileId }: { fileId: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    // Copy logic here
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      className="flex items-center gap-2"
    >
      <PiFileCopy2Line 
        className={`w-4 h-4 transition-colors ${
          copied ? 'text-green-600' : 'text-gray-500'
        }`}
        aria-label="Copy file"
      />
      {copied ? 'Copied!' : 'Copy'}
    </Button>
  );
}

// File manager context
export function FileListItem({ file }: { file: FileItem }) {
  return (
    <div className="flex items-center justify-between p-2 hover:bg-gray-50">
      <span>{file.name}</span>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon">
          <PiFileCopy2Line className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
```

## Functionality

- **SVG Rendering**: Renders a scalable vector icon with two overlapping document shapes
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font-size
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent
- **Accessibility Ready**: Accepts `aria-label` and other accessibility props
- **Event Handling**: Supports click handlers and other mouse/keyboard events
- **Styling Flexibility**: Accepts `className` and `style` props for customization

## State Management

**No State Management** - This is a stateless presentational component that doesn't manage any internal state. When used in interactive contexts, state management is handled by parent components using:
- **Local State**: `useState` for simple copy status
- **TanStack Query**: For server-side copy operations
- **Zustand**: For global copy/clipboard state if needed

## Side Effects

**No Direct Side Effects** - The component itself has no side effects. However, when used interactively:
- Parent components may trigger API calls for file copying
- Click handlers may update clipboard or local storage
- Copy operations may trigger notifications or toast messages

## Dependencies

### Direct Dependencies
- `react` - For `SVGProps` type definition

### Common Usage Dependencies
- `@/components/ui/button` - When used in interactive buttons
- `@/components/ui/tooltip` - For enhanced UX with hover descriptions
- `@/lib/utils` - For className utilities (cn)

### Integration Dependencies
- File management stores (Zustand)
- Copy operation mutations (TanStack Query)
- Notification systems (toast libraries)

## Integration

### File Management Systems
```tsx
// Integration with file operations
const fileCopyMutation = useMutation({
  mutationFn: copyFile,
  onSuccess: () => toast.success('File copied successfully')
});

<Button onClick={() => fileCopyMutation.mutate(fileId)}>
  <PiFileCopy2Line className="w-4 h-4 mr-2" />
  Duplicate
</Button>
```

### Clipboard Operations
```tsx
// Integration with clipboard API
const copyToClipboard = async (content: string) => {
  await navigator.clipboard.writeText(content);
};

<Button onClick={() => copyToClipboard(fileContent)}>
  <PiFileCopy2Line className="w-4 h-4" />
</Button>
```

### Design System Integration
```tsx
// Consistent with design system
<PiFileCopy2Line className="w-icon-sm h-icon-sm text-muted-foreground" />
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: Used appropriately for static content
- ✅ **Component Decomposition**: Single responsibility for icon rendering
- ✅ **Flat Structure**: No unnecessary nesting or complexity
- ✅ **Reusability**: Generic icon that works across features

### Usage Patterns
```tsx
// ✅ Good: Semantic usage with proper labeling
<Button aria-label="Copy document">
  <PiFileCopy2Line className="w-4 h-4" />
</Button>

// ✅ Good: Consistent sizing with design system
<PiFileCopy2Line className="w-icon-md h-icon-md" />

// ❌ Avoid: Hardcoded dimensions that don't scale
<PiFileCopy2Line style={{ width: '16px', height: '16px' }} />

// ✅ Good: Color inheritance
<div className="text-blue-600">
  <PiFileCopy2Line /> {/* Inherits blue color */}
</div>
```

### Performance Considerations
- Icon renders efficiently as static SVG
- No re-renders unless props change
- Minimal bundle impact due to tree-shaking
- Scales without pixelation at any size

### Accessibility
- Always provide `aria-label` when used without text
- Ensure sufficient color contrast
- Support keyboard navigation when interactive
- Consider `role="img"` for screen readers when appropriate