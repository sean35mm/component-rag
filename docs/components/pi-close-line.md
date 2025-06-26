# PiCloseLine Icon Component

## Purpose
The `PiCloseLine` component is a reusable SVG icon that displays a close/cancel symbol (X shape) with a line style. It's part of the icon component library and provides a consistent visual element for dismiss actions, modal closures, and cancellation interactions throughout the application.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity. It doesn't require browser APIs, event handlers, or state management, making it suitable for server-side rendering.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | - | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Spread to the root `<svg>` element |

### Common SVG Props
| Prop Name | Type | Description |
|-----------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `(event: MouseEvent) => void` | Click event handler |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role attribute |

## Usage Example

```tsx
import { PiCloseLine } from '@/components/icons/pi/pi-close-line';

// Basic usage
export function CloseButton() {
  return (
    <button className="p-2 hover:bg-gray-100 rounded">
      <PiCloseLine className="w-4 h-4 text-gray-600" />
    </button>
  );
}

// Modal close button
export function ModalHeader({ onClose }: { onClose: () => void }) {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <h2 className="text-lg font-semibold">Modal Title</h2>
      <button
        onClick={onClose}
        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Close modal"
      >
        <PiCloseLine className="w-5 h-5 text-gray-500" />
      </button>
    </header>
  );
}

// Tag with remove functionality
export function RemovableTag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
      {label}
      <button
        onClick={onRemove}
        className="hover:bg-blue-200 rounded-full p-0.5"
        aria-label={`Remove ${label}`}
      >
        <PiCloseLine className="w-3 h-3" />
      </button>
    </span>
  );
}

// Custom styling
export function CustomCloseIcon() {
  return (
    <PiCloseLine 
      className="w-6 h-6 text-red-500 hover:text-red-700 cursor-pointer"
      style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))' }}
    />
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisp at any size using `1em` dimensions
- **Color Inheritance**: Uses `currentColor` to inherit text color from parent elements
- **Accessibility Ready**: Accepts ARIA attributes for screen reader compatibility
- **Flexible Styling**: Supports all standard SVG styling props and CSS classes
- **Event Handling**: Can receive click handlers and other event listeners
- **Responsive Design**: Size adapts to parent font-size due to `1em` dimensions

### Visual Design
- Clean X-shaped close icon with rounded line caps
- Optimized 24x24 viewBox for crisp rendering
- Line-style design (not filled) for modern, minimal appearance
- Consistent stroke weight for visual hierarchy

## State Management
**None** - This is a stateless presentational component. It doesn't manage any internal state or interact with external state management systems (TanStack Query or Zustand).

## Side Effects
**None** - This component has no side effects. It doesn't perform API calls, access browser APIs, or trigger any external actions. Any interactive behavior is handled by parent components through event props.

## Dependencies

### Internal Dependencies
- React (`SVGProps` type import)

### External Dependencies
- None - Pure React component with no external library dependencies

### Type Dependencies
```tsx
import { SVGProps } from 'react';
```

## Integration

### Application Architecture Fit
- **UI Component Layer**: Located in `/components/icons/pi/` following the flat component structure
- **Design System**: Part of the icon library providing consistent visual elements
- **Reusability**: Can be used across all feature domains without coupling
- **Composability**: Stacks easily with buttons, headers, modals, and interactive elements

### Common Integration Patterns
```tsx
// With UI components
import { Button } from '@/components/ui/button';
import { PiCloseLine } from '@/components/icons/pi/pi-close-line';

// With feature components
import { Modal } from '@/components/modals/modal';
import { Toast } from '@/components/notifications/toast';

// In form components
import { TagInput } from '@/components/forms/tag-input';
```

## Best Practices

### Architecture Adherence
✅ **Server Component Default**: Correctly implemented as server component  
✅ **Flat Structure**: Located in appropriate `/icons/pi/` directory  
✅ **Single Responsibility**: Focused solely on rendering close icon  
✅ **Prop Spreading**: Properly forwards all SVG props for flexibility  

### Usage Recommendations

1. **Accessibility**
   ```tsx
   <PiCloseLine aria-label="Close dialog" role="button" />
   ```

2. **Consistent Sizing**
   ```tsx
   // Use Tailwind size classes for consistency
   <PiCloseLine className="w-4 h-4" /> // Small
   <PiCloseLine className="w-5 h-5" /> // Medium  
   <PiCloseLine className="w-6 h-6" /> // Large
   ```

3. **Interactive States**
   ```tsx
   <PiCloseLine className="text-gray-400 hover:text-gray-600 transition-colors" />
   ```

4. **Semantic Usage**
   ```tsx
   // Always wrap in semantic elements for interactions
   <button onClick={handleClose}>
     <PiCloseLine />
   </button>
   ```

### Anti-patterns to Avoid
❌ Adding client-side logic directly to this component  
❌ Hardcoding dimensions instead of using flexible sizing  
❌ Using for non-close/dismiss actions (semantic clarity)  
❌ Forgetting accessibility attributes in interactive contexts