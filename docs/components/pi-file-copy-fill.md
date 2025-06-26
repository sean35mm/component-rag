# PiFileCopyFill Icon Component

## Purpose

The `PiFileCopyFill` component renders a filled file copy icon from the Phosphor Icons collection. This icon is typically used to represent file duplication, copy operations, or document management features in the user interface. It provides a visual cue for actions related to copying files or content within the application.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and streamed to the client.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | - | All standard SVG element props including className, style, onClick, etc. Spread to the root SVG element |
| `width` | `string \| number` | No | `"1em"` | Width of the icon (inherited via props spread) |
| `height` | `string \| number` | No | `"1em"` | Height of the icon (inherited via props spread) |
| `fill` | `string` | No | `"currentColor"` | Fill color of the icon (inherited via props spread) |
| `className` | `string` | No | - | CSS classes for styling the icon |
| `onClick` | `(event: React.MouseEvent<SVGSVGElement>) => void` | No | - | Click handler for interactive usage |

## Usage Example

```tsx
import { PiFileCopyFill } from '@/components/icons/pi/pi-file-copy-fill';
import { Button } from '@/components/ui/button';

// Basic usage
export function DocumentActions() {
  return (
    <div className="flex items-center gap-2">
      <PiFileCopyFill className="w-5 h-5 text-gray-600" />
      <span>Copy Document</span>
    </div>
  );
}

// Interactive button usage
export function CopyButton({ onCopy }: { onCopy: () => void }) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onCopy}
      className="flex items-center gap-2"
    >
      <PiFileCopyFill className="w-4 h-4" />
      Duplicate File
    </Button>
  );
}

// Custom styling
export function FileManagerIcon() {
  return (
    <PiFileCopyFill 
      className="w-6 h-6 text-blue-500 hover:text-blue-700 cursor-pointer"
      onClick={() => console.log('Copy action triggered')}
    />
  );
}

// In a data table action column
export function DocumentTable() {
  return (
    <table>
      <tbody>
        <tr>
          <td>document.pdf</td>
          <td>
            <div className="flex gap-1">
              <PiFileCopyFill 
                className="w-4 h-4 text-gray-500 hover:text-gray-700 cursor-pointer" 
                title="Copy file"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
```

## Functionality

- **SVG Icon Rendering**: Displays a filled file copy icon using inline SVG
- **Responsive Sizing**: Uses `1em` dimensions by default, making it scale with parent font-size
- **Flexible Styling**: Accepts all standard SVG props for complete customization
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent elements
- **Accessibility**: Can accept ARIA attributes and other accessibility props
- **Event Handling**: Supports all standard SVG events including click, hover, focus

## State Management

**No State Management** - This is a stateless presentational component that doesn't manage any internal state, server state, or global state. It simply renders SVG markup based on the props passed to it.

## Side Effects

**No Side Effects** - This component is purely functional with no side effects. It doesn't perform API calls, access browser APIs, or trigger any external operations. All behavior is determined by the props passed to it.

## Dependencies

### Internal Dependencies
- `React.SVGProps<SVGSVGElement>` - TypeScript interface for SVG element props

### External Dependencies
- **React** - Core React library for component definition

### No Dependencies On
- State management libraries (TanStack Query, Zustand)
- UI component libraries
- Custom hooks or services
- Other application components

## Integration

### Icon System Integration
```tsx
// Consistent with other Phosphor icons
import { PiFileCopyFill } from '@/components/icons/pi/pi-file-copy-fill';
import { PiFileText } from '@/components/icons/pi/pi-file-text';
import { PiTrash } from '@/components/icons/pi/pi-trash';

// Used in document management features
export function DocumentActions({ document }: { document: Document }) {
  const { mutate: copyDocument } = useCopyDocument();
  
  return (
    <div className="flex gap-2">
      <Button onClick={() => copyDocument(document.id)}>
        <PiFileCopyFill className="w-4 h-4 mr-2" />
        Copy
      </Button>
    </div>
  );
}
```

### UI Component Integration
```tsx
// Integration with button components
import { Button } from '@/components/ui/button';
import { PiFileCopyFill } from '@/components/icons/pi/pi-file-copy-fill';

export function CopyDocumentButton() {
  return (
    <Button variant="ghost" size="icon">
      <PiFileCopyFill className="w-4 h-4" />
    </Button>
  );
}
```

## Best Practices

### ✅ Follows Architecture Guidelines

- **Server Component Pattern**: Pure presentational component without client-side state
- **Component Decomposition**: Single responsibility - only renders an icon
- **Reusability**: Located in `/components/icons/` for shared usage across features
- **Type Safety**: Properly typed with TypeScript interfaces

### ✅ Recommended Usage Patterns

```tsx
// Good: Semantic sizing with Tailwind classes
<PiFileCopyFill className="w-5 h-5" />

// Good: Color inheritance from parent
<div className="text-blue-600">
  <PiFileCopyFill />
</div>

// Good: Combined with meaningful labels
<Button>
  <PiFileCopyFill className="w-4 h-4 mr-2" />
  Copy Document
</Button>

// Good: Accessibility attributes
<PiFileCopyFill 
  className="w-4 h-4" 
  role="img" 
  aria-label="Copy file"
/>
```

### ❌ Anti-patterns to Avoid

```tsx
// Avoid: Inline styles for sizing
<PiFileCopyFill style={{ width: '20px', height: '20px' }} />

// Avoid: Hard-coded colors
<PiFileCopyFill fill="#3b82f6" />

// Avoid: Missing context for screen readers
<button onClick={handleCopy}>
  <PiFileCopyFill /> {/* No accessible label */}
</button>
```

### Performance Considerations

- **Bundle Size**: Minimal impact as it's a simple SVG component
- **Rendering**: Server-side rendered by default, no hydration needed
- **Reusability**: Can be safely reused across multiple components without performance concerns