# PiFileSearchLine Icon Component

## Purpose
The `PiFileSearchLine` component is an SVG icon that visually represents file search functionality. It displays a document icon with an overlaid magnifying glass, commonly used to indicate file search, document discovery, or content lookup features in the application interface.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any interactive behavior, state management, or browser-specific APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

**Common SVG Props:**
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role
- `data-*` - Data attributes

## Usage Example

```tsx
import { PiFileSearchLine } from '@/components/icons/pi/pi-file-search-line';

// Basic usage
export function SearchButton() {
  return (
    <button className="flex items-center gap-2">
      <PiFileSearchLine />
      Search Files
    </button>
  );
}

// With custom styling
export function FileSearchCard() {
  return (
    <div className="p-4 border rounded-lg">
      <PiFileSearchLine 
        className="w-8 h-8 text-blue-600 mb-2" 
        aria-label="File search feature"
      />
      <h3>Document Search</h3>
      <p>Find documents quickly across your workspace</p>
    </div>
  );
}

// In navigation or toolbar
export function SearchToolbar() {
  return (
    <div className="flex items-center space-x-4">
      <button 
        onClick={() => openSearchModal()}
        className="p-2 hover:bg-gray-100 rounded"
        aria-label="Search documents"
      >
        <PiFileSearchLine className="w-5 h-5" />
      </button>
    </div>
  );
}
```

## Functionality
- **SVG Rendering**: Renders a scalable vector graphic with file and search magnifying glass imagery
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent elements
- **Accessibility**: Accepts ARIA attributes for screen reader compatibility
- **Customizable**: Supports all standard SVG props for styling and event handling

## State Management
**None** - This is a stateless presentational component that doesn't manage any internal state or require external state management solutions.

## Side Effects
**None** - The component has no side effects, API calls, or external interactions. It purely renders SVG markup.

## Dependencies
- **React**: Uses `SVGProps` type from React
- **No External Dependencies**: Self-contained component with no external library requirements

## Integration
This icon component integrates into the application's design system as part of the `/icons/pi/` collection:

- **Design System**: Part of the Phosphor icon family providing consistent visual language
- **Component Library**: Located in `/components/icons/` following the flat component architecture
- **Feature Integration**: Used across file management, search interfaces, and document-related features
- **Theming**: Inherits colors from parent components and design system color tokens

## Best Practices

### ✅ Follows Architecture Guidelines
- **Server Component**: Correctly implemented as server component (no 'use client' needed)
- **Flat Structure**: Placed in `/components/icons/pi/` following flat over nested principle
- **Reusable Design**: Pure UI component that can be reused across different features
- **Props Spreading**: Properly spreads SVG props for maximum flexibility

### ✅ Implementation Best Practices
```tsx
// Good: Semantic usage with proper accessibility
<button aria-label="Search documents">
  <PiFileSearchLine className="w-5 h-5" />
</button>

// Good: Consistent sizing using Tailwind classes
<PiFileSearchLine className="w-6 h-6 text-gray-600" />

// Good: Proper integration in component composition
<div className="flex items-center gap-2">
  <PiFileSearchLine />
  <span>Find Files</span>
</div>
```

### 🔄 Integration Patterns
- Use within button components for search actions
- Include in navigation menus for file search features
- Combine with text labels for clear user interface elements
- Apply consistent sizing and spacing using design system tokens