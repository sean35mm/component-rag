# PiFileList2Fill Icon Component

## Purpose

The `PiFileList2Fill` component is a filled document list icon that represents files or documents with list content. It's part of the Phosphor Icons (pi) collection and provides a visual indicator for file listings, document management interfaces, or any UI element that deals with structured document content.

## Component Type

**Server Component** - This is a pure presentational SVG icon component with no interactivity, state, or client-side JavaScript requirements. It can be safely rendered on the server side for optimal performance.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | All standard SVG element props including `className`, `style`, `onClick`, `width`, `height`, etc. |

### Common SVG Props
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role attribute

## Usage Example

```tsx
import { PiFileList2Fill } from '@/components/icons/pi/pi-file-list-2-fill';

// Basic usage
export function DocumentHeader() {
  return (
    <div className="flex items-center gap-2">
      <PiFileList2Fill />
      <h2>My Documents</h2>
    </div>
  );
}

// With custom styling
export function FileManagerSidebar() {
  return (
    <nav>
      <button className="flex items-center gap-3 p-2 hover:bg-gray-100">
        <PiFileList2Fill 
          className="text-blue-600" 
          style={{ fontSize: '20px' }}
        />
        <span>Document Lists</span>
      </button>
    </nav>
  );
}

// With click handler (converts to Client Component)
'use client';

export function DocumentAction() {
  const handleViewDocuments = () => {
    // Handle document viewing logic
  };

  return (
    <button 
      onClick={handleViewDocuments}
      className="p-2 rounded hover:bg-gray-50"
      aria-label="View document list"
    >
      <PiFileList2Fill className="w-5 h-5" />
    </button>
  );
}
```

## Functionality

- **Scalable Vector Graphics**: Renders as crisp SVG at any size using `1em` dimensions
- **Theme Integration**: Uses `currentColor` fill to inherit text color from parent elements
- **Accessibility Ready**: Accepts ARIA attributes for screen reader compatibility
- **Responsive Design**: Scales with font-size using `em` units
- **Style Flexibility**: Accepts all standard SVG props for customization

## State Management

**No State Management** - This is a stateless presentational component that doesn't require any state management solutions. All visual states are controlled through props and CSS.

## Side Effects

**No Side Effects** - Pure rendering component with no API calls, DOM mutations, or external interactions beyond standard SVG rendering.

## Dependencies

### Internal Dependencies
- React's `SVGProps` type for prop typing

### External Dependencies
- None - Pure React component with no external libraries

## Integration

### Icon System Integration
```tsx
// Can be used in icon mapping systems
const documentIcons = {
  fileList: PiFileList2Fill,
  // other document icons...
};

// Component library integration
export const FileListIcon = () => <PiFileList2Fill />;
```

### UI Component Integration
```tsx
// Button components
import { Button } from '@/components/ui/button';

<Button variant="ghost" size="sm">
  <PiFileList2Fill className="mr-2 h-4 w-4" />
  View Files
</Button>

// Card headers
import { Card, CardHeader } from '@/components/ui/card';

<Card>
  <CardHeader className="flex flex-row items-center gap-2">
    <PiFileList2Fill />
    <h3>Document Summary</h3>
  </CardHeader>
</Card>
```

## Best Practices

### ✅ Recommended Patterns

```tsx
// Use semantic sizing with Tailwind classes
<PiFileList2Fill className="w-4 h-4" /> // Small
<PiFileList2Fill className="w-5 h-5" /> // Medium  
<PiFileList2Fill className="w-6 h-6" /> // Large

// Leverage currentColor for theme consistency
<div className="text-blue-600">
  <PiFileList2Fill /> {/* Inherits blue color */}
</div>

// Add accessibility attributes when interactive
<button aria-label="Open document list">
  <PiFileList2Fill />
</button>
```

### ❌ Anti-patterns

```tsx
// Don't override the default size unnecessarily
<PiFileList2Fill width="24" height="24" /> // Use className instead

// Don't hardcode colors when theme colors work
<PiFileList2Fill fill="#ff0000" /> // Use CSS classes instead

// Don't forget accessibility for interactive icons
<button onClick={handler}>
  <PiFileList2Fill /> {/* Missing aria-label */}
</button>
```

### Architecture Adherence

- **Server-First**: Renders on server by default for optimal performance
- **Composable**: Designed to stack with other UI components seamlessly
- **Flat Structure**: Simple, non-nested component that integrates easily
- **Consistent API**: Follows standard SVG prop patterns across the icon system
- **Theme Integration**: Works with design system color and sizing patterns