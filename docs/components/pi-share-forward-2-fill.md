# PiShareForward2Fill Icon Component

## Purpose
The `PiShareForward2Fill` component is a filled variant of a share/forward icon from the Phosphor Icons library. It renders an SVG icon representing a sharing or forwarding action, typically used in UI elements like share buttons, forward actions, or export functionality. The icon visually depicts an arrow pointing forward/right with additional elements suggesting sharing or forwarding content.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup. It has no client-side interactivity, state management, or browser-specific APIs, making it ideal for server-side rendering to improve initial page load performance.

## Props Interface

| Prop Name | Type | Required | Description |
|-----------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Spread to the root `<svg>` element |

### Inherited SVG Props (Common Usage)
| Prop Name | Type | Description |
|-----------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `aria-label` | `string` | Accessibility label |
| `title` | `string` | Tooltip text |

## Usage Example

```tsx
import { PiShareForward2Fill } from '@/components/icons/pi/pi-share-forward-2-fill';

// Basic usage
function ShareButton() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
      <PiShareForward2Fill className="w-4 h-4" />
      Share
    </button>
  );
}

// With click handler and accessibility
function ForwardAction({ onForward }: { onForward: () => void }) {
  return (
    <button
      onClick={onForward}
      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
      aria-label="Forward this message"
    >
      <PiShareForward2Fill 
        className="w-5 h-5 text-gray-600" 
        aria-hidden="true"
      />
    </button>
  );
}

// In a toolbar with custom styling
function MessageToolbar() {
  return (
    <div className="flex items-center space-x-1">
      <button className="toolbar-button">
        <PiShareForward2Fill 
          style={{ fontSize: '18px', color: '#4f46e5' }}
        />
      </button>
    </div>
  );
}

// With conditional rendering
function ShareOptions({ canShare }: { canShare: boolean }) {
  if (!canShare) return null;
  
  return (
    <div className="share-menu">
      <PiShareForward2Fill className="menu-icon" />
      <span>Forward to...</span>
    </div>
  );
}
```

## Functionality
- **SVG Rendering**: Renders a scalable vector graphic with a 24x24 viewBox
- **Responsive Sizing**: Uses `1em` dimensions to scale with font size
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent
- **Accessibility Ready**: Accepts all standard SVG props for ARIA attributes
- **Style Flexibility**: Supports custom styling through className, style, and CSS
- **Event Handling**: Can receive click, hover, and other event handlers

## State Management
**No State Management** - This is a stateless presentational component. It renders static SVG content and passes through props without managing any internal state. Any interactive behavior should be handled by parent components.

## Side Effects
**No Side Effects** - The component has no side effects, API calls, or external interactions. It's a pure rendering component that outputs SVG markup based on its props.

## Dependencies

### Internal Dependencies
- `React.SVGProps<SVGSVGElement>` - TypeScript interface for SVG element props

### External Dependencies
- None - Pure React component with no external libraries

### Related Components
- Other Phosphor Icons components in `/components/icons/pi/`
- UI components that commonly use icons (buttons, toolbars, menus)

## Integration
This component fits into the application architecture as:

- **Icon System**: Part of the standardized icon library for consistent visual language
- **Design System**: Integrates with UI components that need share/forward iconography
- **Accessibility Layer**: Works with screen readers and keyboard navigation when properly labeled
- **Theming Support**: Inherits colors from design system through `currentColor`

### Common Integration Patterns
```tsx
// In button components
<Button variant="primary" icon={<PiShareForward2Fill />}>
  Share
</Button>

// In dropdown menus
<DropdownItem icon={<PiShareForward2Fill />}>
  Forward message
</DropdownItem>

// In navigation
<NavItem href="/share" icon={<PiShareForward2Fill />}>
  Share Content
</NavItem>
```

## Best Practices

### ✅ Adherence to Architecture Guidelines
- **Server Component**: Correctly implemented as server component for optimal performance
- **Component Decomposition**: Simple, focused component that does one thing well
- **Reusability**: Located in `/components/icons/` for application-wide reuse
- **Type Safety**: Properly typed with TypeScript interfaces

### ✅ Recommended Usage
- Always provide `aria-label` when used in interactive elements without text
- Use `aria-hidden="true"` when icon is decorative alongside text
- Apply consistent sizing using CSS classes rather than inline styles
- Leverage `currentColor` for theme-aware coloring

### ✅ Performance Considerations
- Icon renders server-side for better initial load performance
- No JavaScript bundle impact for static usage
- SVG format ensures crisp rendering at all sizes

### ✅ Accessibility Best Practices
```tsx
// Good: Icon with accessible label
<button aria-label="Share this post">
  <PiShareForward2Fill aria-hidden="true" />
</button>

// Good: Icon with visible text
<button>
  <PiShareForward2Fill aria-hidden="true" />
  <span>Share</span>
</button>

// Avoid: Icon without context
<PiShareForward2Fill /> // No accessible label
```