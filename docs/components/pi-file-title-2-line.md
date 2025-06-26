# PiFileTitle2Line Component

## Purpose

The `PiFileTitle2Line` component is an icon component that renders a file document SVG with two horizontal lines representing text content. It's part of the Pi icon library and is used to visually represent documents, files, or text-based content throughout the application interface.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser-specific APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

### Common SVG Props
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role
- `data-*` - Data attributes

## Usage Example

```tsx
import { PiFileTitle2Line } from '@/components/icons/pi/pi-file-title-2-line';

// Basic usage
export function DocumentList() {
  return (
    <div className="flex items-center gap-2">
      <PiFileTitle2Line />
      <span>Document Title</span>
    </div>
  );
}

// With custom styling
export function FileCard() {
  return (
    <div className="p-4 border rounded-lg">
      <PiFileTitle2Line 
        className="w-6 h-6 text-blue-600 mb-2" 
        aria-label="Document file"
      />
      <h3>Important Document</h3>
    </div>
  );
}

// As clickable button icon
export function DocumentButton({ onClick }: { onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="p-2 hover:bg-gray-100 rounded"
      aria-label="Open document"
    >
      <PiFileTitle2Line className="w-5 h-5" />
    </button>
  );
}

// In navigation or menu
export function SidebarMenu() {
  return (
    <nav>
      <a href="/documents" className="flex items-center gap-3 p-2">
        <PiFileTitle2Line className="w-4 h-4" />
        Documents
      </a>
    </nav>
  );
}
```

## Functionality

- **SVG Rendering**: Renders a scalable vector graphic of a document with title lines
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Current Color**: Uses `currentColor` fill to inherit text color from parent
- **Prop Forwarding**: Accepts and forwards all standard SVG props for maximum flexibility
- **Accessibility Ready**: Can accept ARIA attributes for screen reader compatibility

## State Management

**None** - This is a stateless presentational component with no internal state management. It purely renders SVG markup based on props.

## Side Effects

**None** - This component has no side effects, API calls, or external interactions. It's a pure rendering component.

## Dependencies

### Internal Dependencies
- React's `SVGProps` type for prop typing

### External Dependencies
- None - This is a self-contained icon component

## Integration

### Application Architecture
- **Icon System**: Part of the standardized Pi icon library for consistent iconography
- **Design System**: Integrates with the overall design system for visual consistency
- **Component Composition**: Used as a building block in larger UI components like cards, buttons, and navigation elements

### Usage Patterns
```tsx
// In document management features
import { PiFileTitle2Line } from '@/components/icons/pi/pi-file-title-2-line';

// File listing component
export function FileListItem({ file }: { file: FileType }) {
  return (
    <div className="flex items-center gap-3 p-3">
      <PiFileTitle2Line className="w-5 h-5 text-gray-500" />
      <span>{file.name}</span>
    </div>
  );
}

// Document upload area
export function UploadZone() {
  return (
    <div className="border-2 border-dashed p-8 text-center">
      <PiFileTitle2Line className="w-12 h-12 mx-auto mb-4 text-gray-400" />
      <p>Drop documents here</p>
    </div>
  );
}
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: Correctly implemented as server component for optimal performance
- ✅ **Component Decomposition**: Simple, focused component that serves as a reusable building block
- ✅ **Flat Structure**: No unnecessary nesting, straightforward composition
- ✅ **Props Interface**: Uses standard SVG props for maximum flexibility

### Implementation Guidelines
- **Accessibility**: Always provide `aria-label` when used without accompanying text
- **Sizing**: Use CSS classes or em-based sizing for responsive design
- **Color**: Leverage `currentColor` behavior for theme consistency
- **Performance**: No client-side JavaScript needed, renders efficiently on server

### Usage Recommendations
```tsx
// ✅ Good: Semantic usage with accessibility
<PiFileTitle2Line aria-label="Document" className="w-5 h-5" />

// ✅ Good: Consistent with design system
<PiFileTitle2Line className="text-primary w-4 h-4" />

// ❌ Avoid: Inline styles when design system classes exist
<PiFileTitle2Line style={{ width: '20px', color: '#blue' }} />

// ✅ Good: Proper event handling
<button onClick={handleClick}>
  <PiFileTitle2Line aria-hidden="true" />
  <span>Documents</span>
</button>
```