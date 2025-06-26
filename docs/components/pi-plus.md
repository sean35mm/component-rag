# PiPlus Icon Component

## Purpose
A scalable vector icon component that renders a plus/add symbol using SVG. This component provides a consistent visual element for add actions, create operations, and expandable content throughout the application interface.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without requiring client-side interactivity, event handlers, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop Name | Type | Required | Description |
|-----------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | All standard SVG element properties including `className`, `style`, `width`, `height`, `onClick`, etc. Spread to the root `<svg>` element |

### Common SVG Props
- `className` - CSS classes for styling
- `style` - Inline styles
- `width/height` - Dimensions (defaults to viewBox if not specified)
- `onClick` - Click event handler (requires 'use client' in consuming component)
- `aria-label` - Accessibility label
- `role` - ARIA role for screen readers

## Usage Example

```tsx
import { PiPlus } from '@/components/icons/pi/pi-plus';
import { Button } from '@/components/ui/button';

// Basic usage
export function AddButton() {
  return (
    <Button>
      <PiPlus className="w-4 h-4 mr-2" />
      Add Item
    </Button>
  );
}

// With custom styling
export function CreatePostButton() {
  return (
    <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
      <PiPlus 
        className="w-5 h-5 text-blue-600" 
        aria-label="Create new post"
      />
      <span>Create Post</span>
    </button>
  );
}

// As floating action button
export function FloatingAddButton() {
  return (
    <div className="fixed bottom-6 right-6">
      <button className="w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700">
        <PiPlus className="w-6 h-6 mx-auto" />
      </button>
    </div>
  );
}

// In form contexts
export function DynamicFormField() {
  return (
    <div className="flex items-center gap-2">
      <input type="text" className="flex-1 p-2 border rounded" />
      <button 
        type="button" 
        className="p-2 text-green-600 hover:bg-green-50 rounded"
        aria-label="Add another field"
      >
        <PiPlus className="w-4 h-4" />
      </button>
    </div>
  );
}
```

## Functionality
- **Scalable Vector Rendering**: Provides crisp plus icon at any size using SVG
- **Theme Integration**: Uses `currentColor` fill to inherit text color from parent elements
- **Flexible Sizing**: Responsive to CSS width/height classes via viewBox
- **Accessibility Ready**: Accepts ARIA attributes for screen reader compatibility
- **Event Handling**: Supports all standard SVG/DOM events when needed

## State Management
**None** - This is a stateless presentational component. It accepts props and renders SVG markup without managing any internal state, server state, or client state.

## Side Effects
**None** - Pure functional component with no side effects, API calls, or external interactions. Simply transforms props into SVG markup.

## Dependencies

### Internal Dependencies
- React's `SVGProps` type for prop typing

### External Dependencies
- None - Self-contained component

### Runtime Dependencies
- React (for JSX rendering)
- No additional libraries required

## Integration

### Application Architecture
- **UI Component Layer**: Located in `/components/icons/pi/` following icon organization patterns
- **Design System**: Part of the icon library providing consistent visual elements
- **Reusability**: Designed for use across all application domains (forms, navigation, content management)

### Usage Patterns
```tsx
// In navigation components
import { PiPlus } from '@/components/icons/pi/pi-plus';

// In form builders
export function FormBuilder() {
  return (
    <div>
      {/* Form fields */}
      <button onClick={addField}>
        <PiPlus /> Add Field
      </button>
    </div>
  );
}

// In data tables
export function UserTable() {
  return (
    <div>
      <button onClick={createUser}>
        <PiPlus /> New User
      </button>
      {/* Table content */}
    </div>
  );
}
```

## Best Practices

### Architecture Adherence
✅ **Server Component Default**: Correctly implemented as server component
✅ **Component Decomposition**: Atomic, reusable icon component following Lego block principle
✅ **Flat Structure**: Simple component without unnecessary nesting
✅ **Domain Agnostic**: Placed in shared `/icons/` directory for cross-domain usage

### Implementation Guidelines
- **Consistent Sizing**: Use Tailwind classes (`w-4 h-4`, `w-5 h-5`) for consistent icon sizing
- **Color Inheritance**: Leverage `currentColor` for theme integration rather than hardcoded colors
- **Semantic Usage**: Pair with descriptive text or `aria-label` for accessibility
- **Event Handling**: When adding click handlers, ensure parent component uses `'use client'`
- **Performance**: No performance considerations needed - lightweight SVG component

### Accessibility
```tsx
// Good: Descriptive context
<button aria-label="Add new item">
  <PiPlus className="w-4 h-4" />
</button>

// Better: Text + icon
<button>
  <PiPlus className="w-4 h-4 mr-2" />
  Add Item
</button>
```