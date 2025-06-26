# PiFileTextLine Icon Component

## Purpose

The `PiFileTextLine` component is an SVG icon that visually represents a document or text file with content lines. It's part of the Phosphor icon library integration and is designed to be used throughout the application wherever a document or text file representation is needed, such as in file managers, document lists, or text-related features.

## Component Type

**Server Component** - This is a presentational SVG icon component with no client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and doesn't require the 'use client' directive.

## Props Interface

| Prop Name | Type | Required | Description |
|-----------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Spread to the root SVG element |

### Inherited SVG Props (commonly used)
| Prop Name | Type | Description |
|-----------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role |

## Usage Example

```tsx
import { PiFileTextLine } from '@/components/icons/pi/pi-file-text-line';

// Basic usage
export function DocumentIcon() {
  return <PiFileTextLine />;
}

// With styling and accessibility
export function DocumentListItem({ document }) {
  return (
    <div className="flex items-center gap-2">
      <PiFileTextLine 
        className="text-blue-600 w-5 h-5" 
        aria-label="Text document"
      />
      <span>{document.name}</span>
    </div>
  );
}

// Interactive usage
export function FileUploadButton() {
  const handleClick = () => {
    // Handle file upload
  };

  return (
    <button 
      onClick={handleClick}
      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded"
    >
      <PiFileTextLine className="w-4 h-4" />
      Upload Document
    </button>
  );
}

// With custom size using CSS custom properties
export function LargeDocumentIcon() {
  return (
    <PiFileTextLine 
      style={{ fontSize: '2rem' }} 
      className="text-gray-700"
    />
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisp at any size using SVG format
- **Current Color Inheritance**: Uses `fill='currentColor'` to inherit text color from parent elements
- **Responsive Sizing**: Uses `1em` dimensions to scale with font size
- **Accessibility Ready**: Accepts all ARIA attributes for screen reader support
- **Customizable**: Accepts all standard SVG props for styling and interaction

### Visual Design
- **Document Outline**: Shows a clean document silhouette with folded corner
- **Content Lines**: Displays horizontal lines representing text content
- **24x24 ViewBox**: Designed for optimal clarity at standard icon sizes
- **Line Style**: Outline style (not filled) providing a clean, modern appearance

## State Management

**No State Management** - This is a pure presentational component with no internal state. It doesn't use TanStack Query, Zustand, or local state as it simply renders static SVG content.

## Side Effects

**No Side Effects** - This component has no side effects, API calls, or external interactions. It's a pure function that renders SVG markup based on props.

## Dependencies

### Direct Dependencies
- `react`: Uses `SVGProps` type for prop typing
- No external libraries or custom hooks

### Integration Dependencies
- **Tailwind CSS**: Commonly styled using Tailwind utility classes
- **Parent Components**: Inherits color from parent text color
- **Design System**: Part of the broader Phosphor icon system

## Integration

### Application Architecture Integration
- **UI Components**: Used within buttons, cards, navigation items, and other UI components
- **Feature Components**: Integrated into document management, file upload, and content-related features
- **Layout Components**: Can be used in headers, sidebars, and navigation elements

### Common Integration Patterns
```tsx
// In file management features
export function FileManagerItem({ file }) {
  return (
    <div className="file-item">
      <PiFileTextLine className="file-icon" />
      <span>{file.name}</span>
    </div>
  );
}

// In navigation menus
export function DocumentsNavItem() {
  return (
    <NavLink to="/documents">
      <PiFileTextLine />
      Documents
    </NavLink>
  );
}

// In status indicators
export function DocumentStatus({ hasContent }) {
  return (
    <PiFileTextLine 
      className={hasContent ? 'text-green-600' : 'text-gray-400'} 
    />
  );
}
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: Correctly implemented as server component (no client-side features)
- ✅ **Component Decomposition**: Atomic, single-purpose component that stacks well with others
- ✅ **Reusability**: Located in `/components/icons/` for application-wide reuse
- ✅ **TypeScript**: Properly typed with React's SVG props interface

### Usage Best Practices
```tsx
// ✅ Good: Semantic usage with accessibility
<PiFileTextLine aria-label="Document type" role="img" />

// ✅ Good: Consistent sizing with design system
<PiFileTextLine className="w-4 h-4 text-gray-600" />

// ✅ Good: Color inheritance
<div className="text-blue-600">
  <PiFileTextLine /> {/* Inherits blue color */}
</div>

// ❌ Avoid: Hardcoded colors that break theme consistency
<PiFileTextLine style={{ color: '#FF0000' }} />

// ❌ Avoid: Missing accessibility for interactive usage
<button onClick={handleClick}>
  <PiFileTextLine /> {/* Add aria-label */}
</button>
```

### Performance Considerations
- **Lightweight**: No JavaScript bundle impact (server-rendered SVG)
- **Cacheable**: SVG content is static and highly cacheable
- **Scalable**: Vector format ensures crisp rendering at all sizes without multiple assets