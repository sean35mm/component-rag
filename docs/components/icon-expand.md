# IconExpand Component

## Purpose
The `IconExpand` component renders an SVG icon that represents expansion or opening functionality. It displays a chevron-style arrow pointing to the right, commonly used for expandable UI elements like dropdowns, accordions, collapsible sections, or navigation menus. The icon is designed to be rotated or animated to indicate state changes between expanded and collapsed states.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and hydrated on the client without any behavioral changes.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | All standard SVG element props including `className`, `style`, `onClick`, `aria-*`, `data-*`, etc. |

### Common SVG Props
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling and animations |
| `style` | `CSSProperties` | Inline styles for custom sizing, rotation, or transitions |
| `onClick` | `MouseEventHandler` | Click handler for interactive expand/collapse functionality |
| `aria-label` | `string` | Accessibility label for screen readers |
| `aria-expanded` | `boolean` | ARIA attribute indicating expansion state |

## Usage Example

```tsx
import { IconExpand } from '@/components/icons/icon-expand';

// Basic usage
<IconExpand />

// With custom styling and rotation
<IconExpand 
  className="transition-transform duration-200 rotate-90" 
  style={{ fontSize: '1.2rem' }} 
/>

// Interactive expand/collapse button
<button 
  onClick={() => setIsExpanded(!isExpanded)}
  aria-expanded={isExpanded}
  className="flex items-center gap-2"
>
  <span>View Details</span>
  <IconExpand 
    className={`transition-transform duration-200 ${
      isExpanded ? 'rotate-90' : 'rotate-0'
    }`}
  />
</button>

// In a dropdown component
<div className="relative">
  <button className="flex items-center gap-2">
    <span>Options</span>
    <IconExpand className="transform transition-transform group-data-[open]:rotate-90" />
  </button>
</div>

// With accessibility attributes
<IconExpand 
  aria-label="Expand section"
  role="img"
  className="text-gray-600 hover:text-gray-900"
/>
```

## Functionality
- **Scalable Vector Graphics**: Renders as crisp SVG at any size using `1em` dimensions
- **Inherits Text Color**: Uses `currentColor` fill to inherit text color from parent
- **Flexible Sizing**: Responds to parent element's font-size for consistent scaling
- **Transform Ready**: Optimized for CSS transforms like rotation and scaling
- **Accessibility Ready**: Accepts all ARIA attributes for proper screen reader support
- **Event Handling**: Supports all standard mouse and keyboard event handlers

## State Management
**No State Management** - This is a stateless presentational component. State management for expand/collapse functionality should be handled by parent components using:
- **Local State**: `useState` for simple expand/collapse states
- **Zustand**: For expand/collapse states that need to be shared across components
- **URL State**: For expand/collapse states that should persist across page refreshes

## Side Effects
**No Side Effects** - This component is purely functional with no side effects, API calls, or external interactions. All interactivity is handled through props passed from parent components.

## Dependencies
- **React**: `SVGProps` type for proper TypeScript support
- **No External Dependencies**: Completely self-contained SVG component

## Integration
The `IconExpand` component integrates into the application architecture as:

- **UI Component**: Located in `/components/icons/` following the flat component structure
- **Design System**: Part of the icon library providing consistent visual language
- **Reusable Asset**: Used across multiple feature domains (navigation, forms, content areas)
- **Accessibility Layer**: Supports ARIA attributes for inclusive user experiences

### Common Integration Patterns:
```tsx
// In feature components
import { IconExpand } from '@/components/icons/icon-expand';

// Navigation components
const NavigationItem = ({ label, isExpanded, onToggle }) => (
  <button onClick={onToggle} className="nav-item">
    {label}
    <IconExpand className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
  </button>
);

// Form components with collapsible sections
const FormSection = ({ title, children, isOpen, onToggle }) => (
  <div className="form-section">
    <button onClick={onToggle} className="section-header">
      {title} <IconExpand className={`transition-transform ${isOpen ? 'rotate-90' : ''}`} />
    </button>
    {isOpen && <div>{children}</div>}
  </div>
);
```

## Best Practices
- **Server-First**: Correctly implemented as a Server Component for optimal performance
- **Flat Architecture**: Properly placed in `/components/icons/` avoiding unnecessary nesting
- **Prop Spreading**: Uses proper prop spreading to maintain SVG flexibility
- **TypeScript Safety**: Implements proper typing with `SVGProps<SVGSVGElement>`
- **Accessibility Ready**: Designed to work with ARIA attributes and screen readers
- **Performance Optimized**: Uses `currentColor` and `1em` sizing for efficient rendering
- **Animation Friendly**: Structured for smooth CSS transitions and transforms
- **Consistent Naming**: Follows `Icon[Name]` naming convention for easy identification

The component adheres to our architectural guidelines by being a simple, reusable UI component that can be composed into more complex feature components while maintaining separation of concerns.