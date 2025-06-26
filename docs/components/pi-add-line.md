# PiAddLine Icon Component

## Purpose
The `PiAddLine` component is a pure SVG icon component that renders a plus/add symbol with a clean, minimalist line design. It serves as a reusable UI element for add actions, create buttons, and expansion controls throughout the application. This component is part of the Pi icon library, providing consistent iconography for user interface elements.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and doesn't require the 'use client' directive.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | - | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

### Common SVG Props
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role attribute |

## Usage Example

```tsx
import { PiAddLine } from '@/components/icons/pi/pi-add-line';
import { Button } from '@/components/ui/button';

// Basic usage
export function CreateButton() {
  return (
    <Button>
      <PiAddLine className="w-4 h-4 mr-2" />
      Add Item
    </Button>
  );
}

// Icon button
export function AddIconButton() {
  return (
    <Button 
      variant="ghost" 
      size="icon"
      aria-label="Add new item"
    >
      <PiAddLine className="w-5 h-5" />
    </Button>
  );
}

// With custom styling
export function CustomAddIcon() {
  return (
    <PiAddLine 
      className="w-6 h-6 text-blue-500 hover:text-blue-600 cursor-pointer"
      onClick={() => console.log('Add clicked')}
      aria-label="Add new record"
    />
  );
}

// In a form context
export function FormFieldAdder() {
  const { append } = useFieldArray({ name: 'items' });
  
  return (
    <button
      type="button"
      onClick={() => append({ value: '' })}
      className="flex items-center gap-2 text-sm text-blue-600"
    >
      <PiAddLine className="w-4 h-4" />
      Add Another Field
    </button>
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisp at any size using SVG format
- **Responsive Sizing**: Uses `1em` dimensions to scale with font size
- **Color Inheritance**: Uses `currentColor` to inherit text color from parent
- **Accessibility Ready**: Accepts ARIA attributes for screen reader support
- **Event Handling**: Supports all standard mouse and keyboard events
- **Customizable**: Accepts all SVG props for flexible styling and behavior

### Visual Design
- **Minimalist Line Design**: Clean plus symbol with consistent stroke width
- **Centered Composition**: Perfectly centered within 24x24 viewBox
- **Even Rule Application**: Uses `evenodd` fill rule for consistent rendering

## State Management
**No State Management** - This is a pure presentational component with no internal state. It simply renders SVG markup based on the props passed to it.

## Side Effects
**No Side Effects** - The component has no side effects, API calls, or external interactions. It's a pure function component that renders deterministic output based on input props.

## Dependencies

### Direct Dependencies
- `react` - For `SVGProps` type definition

### Integration Dependencies
- Works seamlessly with UI components like `Button`, `IconButton`
- Compatible with form libraries like React Hook Form
- Integrates with styling systems (Tailwind CSS, CSS Modules, styled-components)

## Integration

### Application Architecture
```
src/
├── components/
│   ├── icons/
│   │   └── pi/
│   │       └── pi-add-line.tsx     # ← This component
│   ├── ui/
│   │   ├── button.tsx              # Often used together
│   │   └── icon-button.tsx         # Common wrapper
│   └── features/
│       ├── products/
│       │   └── create-product-button.tsx  # Feature usage
│       └── forms/
│           └── dynamic-form.tsx           # Form field usage
```

### Common Integration Patterns
- **Button Icons**: Primary use case in buttons and clickable elements
- **Form Controls**: Add/remove dynamic form fields
- **Navigation**: Expand/collapse sections, add new tabs
- **Data Tables**: Add new rows or records
- **Modal Triggers**: Open create/add dialogs

## Best Practices

### Architecture Adherence
✅ **Server Component**: Correctly implemented as server component without unnecessary client-side code  
✅ **Component Decomposition**: Atomic icon component that stacks well with other UI components  
✅ **Reusability**: Located in `/ui/` adjacent structure (`/icons/`) for maximum reusability  
✅ **Flat Structure**: Simple, non-nested component design  

### Usage Recommendations
- **Accessibility**: Always provide `aria-label` when used as standalone clickable element
- **Sizing**: Use Tailwind size classes (`w-4 h-4`, `w-5 h-5`) rather than custom dimensions
- **Color**: Leverage `currentColor` by setting text color on parent elements
- **Semantic HTML**: Wrap in appropriate semantic elements (`<button>`, `<a>`) for interactive use
- **Consistency**: Use consistently across the application for all add/create actions

### Performance Considerations
- **Bundle Size**: Minimal impact due to simple SVG structure
- **Rendering**: Fast server-side rendering with no hydration overhead
- **Caching**: Static component benefits from build-time optimizations