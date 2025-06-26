# PiCloseCircleFill

## Purpose
The `PiCloseCircleFill` component is an SVG icon that displays a filled circle with a close (X) symbol inside. It's designed for use in UI elements that require a prominent close or dismiss action, such as modals, alerts, notifications, or removable items. The filled design provides higher visual prominence compared to outline variants.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | - | All standard SVG element props including className, style, onClick, etc. Spreads to the root SVG element |

### Common SVG Props
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `onMouseEnter` | `MouseEventHandler` | Mouse enter event handler |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role |

## Usage Example

```tsx
import { PiCloseCircleFill } from '@/components/icons/pi/pi-close-circle-fill';

// Basic usage
function NotificationBanner() {
  return (
    <div className="flex items-center justify-between bg-red-50 p-4 rounded-lg">
      <span>Something went wrong. Please try again.</span>
      <button 
        onClick={handleDismiss}
        className="text-red-600 hover:text-red-800"
        aria-label="Dismiss notification"
      >
        <PiCloseCircleFill className="w-5 h-5" />
      </button>
    </div>
  );
}

// Modal close button
function Modal({ onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 relative max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <PiCloseCircleFill className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>
  );
}

// Removable tag component
function Tag({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
      {label}
      <button 
        onClick={onRemove}
        className="text-blue-600 hover:text-blue-800"
        aria-label={`Remove ${label} tag`}
      >
        <PiCloseCircleFill className="w-4 h-4" />
      </button>
    </span>
  );
}

// With custom styling
function ErrorAlert() {
  return (
    <div className="flex items-center gap-3 p-4 border border-red-200 rounded-lg">
      <PiCloseCircleFill 
        className="w-8 h-8 text-red-500 flex-shrink-0" 
        role="img"
        aria-label="Error icon"
      />
      <p className="text-red-700">Invalid form submission</p>
    </div>
  );
}
```

## Functionality
- **SVG Rendering**: Renders a 24x24 viewBox SVG with a filled circle and close icon
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font-size
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent
- **Accessibility**: Accepts ARIA attributes for screen reader support
- **Event Handling**: Supports all standard mouse and keyboard events via props spreading
- **Customization**: Fully customizable through className and style props

## State Management
**None** - This is a stateless presentational component. It does not manage any internal state or interact with external state management systems.

## Side Effects
**None** - This component has no side effects. It performs no API calls, DOM manipulation outside of rendering, or other external interactions.

## Dependencies

### Internal Dependencies
- React's `SVGProps` type for TypeScript prop validation

### External Dependencies
- None - This is a self-contained component

### Usage Dependencies
When used in applications, commonly paired with:
- Button components for interactive close actions
- Modal/Dialog components
- Alert/Notification components
- Form components for removable items

## Integration
The `PiCloseCircleFill` component integrates into the application architecture as:

- **Icon System**: Part of the Phosphor icon library components located in `/components/icons/pi/`
- **Design System**: Serves as a foundational UI element for dismiss/close actions
- **Component Composition**: Used within higher-level components like modals, alerts, and interactive elements
- **Accessibility Layer**: Supports ARIA attributes for inclusive user experiences
- **Theme Integration**: Inherits colors from parent context, works with design tokens

## Best Practices

### Architectural Adherence
- ✅ **Server Component**: Correctly implemented as a server component since it's purely presentational
- ✅ **Component Decomposition**: Simple, focused component that stacks well with other UI elements
- ✅ **Reusability**: Located in the appropriate `/icons/` directory for cross-application use

### Usage Recommendations
```tsx
// ✅ Good: Proper accessibility
<button onClick={handleClose} aria-label="Close dialog">
  <PiCloseCircleFill className="w-5 h-5" />
</button>

// ✅ Good: Semantic color usage
<PiCloseCircleFill className="text-red-500" />

// ✅ Good: Consistent sizing
<PiCloseCircleFill className="w-4 h-4" /> // Small
<PiCloseCircleFill className="w-6 h-6" /> // Large

// ❌ Avoid: Missing accessibility context
<PiCloseCircleFill onClick={handleClose} />

// ❌ Avoid: Inconsistent sizing methods
<PiCloseCircleFill style={{ width: '18px', height: '22px' }} />
```

### Integration Patterns
- Always wrap in interactive elements (button, clickable div) when used for actions
- Provide appropriate ARIA labels for accessibility
- Use consistent sizing classes across the application
- Leverage the `currentColor` behavior for theme integration
- Consider the visual hierarchy when choosing between filled and outline variants