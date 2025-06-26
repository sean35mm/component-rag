# PiGrabber Icon Component

## Purpose

The `PiGrabber` component is an SVG icon that displays a grabber/handle visual commonly used for drag-and-drop functionality, reorderable lists, or resizable elements. It renders two horizontal white bars on a rounded background, providing a clear visual indicator that an element can be grabbed and manipulated.

## Component Type

**Server Component** - This is a pure presentational SVG component with no interactivity, state, or browser-specific APIs. It can be safely rendered on the server and doesn't require client-side JavaScript.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | All standard SVG element props including `className`, `style`, `onClick`, `width`, `height`, etc. |

### Common SVG Props
- `className` - CSS classes for styling
- `style` - Inline styles
- `width` / `height` - Dimensions (defaults to viewBox: 14x14)
- `fill` - Background color of the rounded rectangle
- `onClick` - Click handler for interactive use
- `aria-label` - Accessibility label

## Usage Example

```tsx
import { PiGrabber } from '@/components/icons/pi/pi-grabber';

// Basic usage
function DraggableItem() {
  return (
    <div className="flex items-center gap-2 p-2 border rounded">
      <PiGrabber className="cursor-grab text-gray-400" width={16} height={16} />
      <span>Drag me to reorder</span>
    </div>
  );
}

// In a sortable list
function SortableList({ items }: { items: string[] }) {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-3 p-3 bg-white border rounded-lg">
          <PiGrabber 
            className="cursor-grab hover:text-gray-600 text-gray-400 flex-shrink-0"
            aria-label="Drag to reorder"
          />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

// With custom styling
function CustomGrabber() {
  return (
    <PiGrabber 
      className="hover:scale-110 transition-transform"
      fill="rgb(59 130 246)" // Blue background
      width={20} 
      height={20}
    />
  );
}

// In a resizable panel
function ResizablePanel() {
  return (
    <div className="border rounded-lg">
      <div className="flex items-center justify-center p-1 border-b cursor-row-resize">
        <PiGrabber className="rotate-90 text-gray-300" width={14} height={14} />
      </div>
      <div className="p-4">
        Panel content here
      </div>
    </div>
  );
}
```

## Functionality

### Key Features
- **Pure SVG Rendering**: Renders a scalable vector graphic with consistent appearance
- **Flexible Styling**: Accepts all standard SVG props for customization
- **Accessibility Ready**: Can accept `aria-label` and other accessibility props
- **Responsive Design**: Scales cleanly at any size via viewBox
- **Theme Integration**: Background color can be customized via `fill` prop

### Visual Design
- 14x14 viewBox with 4px border radius
- Two horizontal bars (8x2px) with 1px border radius
- White fill on bars for contrast
- Centered layout with proper spacing

## State Management

**No State Management** - This is a stateless presentational component that renders static SVG markup. It doesn't manage any internal state, server state, or global state.

## Side Effects

**No Side Effects** - The component performs no API calls, DOM manipulation, or other side effects. It's a pure rendering component.

## Dependencies

### Direct Dependencies
- `react` - For `SVGProps` type definition

### Integration Dependencies
- **Drag & Drop Libraries**: Often used with libraries like `@dnd-kit/core`, `react-beautiful-dnd`, or `react-sortable-hoc`
- **UI Components**: Commonly paired with list items, cards, panels, or modal components
- **CSS Framework**: Works with Tailwind CSS classes for styling and interactions

## Integration

### Application Architecture Role
- **UI Component Layer**: Lives in `/components/icons/pi/` as a reusable icon primitive
- **Design System**: Part of the icon collection for consistent visual language
- **Feature Integration**: Used across features like task management, content organization, dashboard customization

### Common Integration Patterns
```tsx
// With drag-and-drop functionality
import { useSortable } from '@dnd-kit/sortable';
import { PiGrabber } from '@/components/icons/pi/pi-grabber';

function SortableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  
  return (
    <div ref={setNodeRef} style={{ transform, transition }}>
      <PiGrabber {...attributes} {...listeners} className="cursor-grab" />
      {children}
    </div>
  );
}

// In a reusable card component
function DraggableCard({ children, onDragStart }) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <PiGrabber 
          className="cursor-grab" 
          onMouseDown={onDragStart}
        />
      </div>
      {children}
    </div>
  );
}
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: Correctly implemented as server-renderable
- ✅ **Flat Structure**: Simple, non-nested component design
- ✅ **Reusable Primitive**: Focused, single-responsibility icon component
- ✅ **Props Interface**: Uses standard React/SVG prop patterns

### Usage Recommendations
- **Semantic HTML**: Pair with proper ARIA labels for accessibility
- **Visual Hierarchy**: Use consistent sizing and colors across the application
- **Interactive States**: Apply hover/focus styles when used as interactive elements
- **Performance**: Leverage SVG caching and avoid inline styles when possible

### Anti-Patterns to Avoid
- ❌ Don't add drag-and-drop logic directly to this component
- ❌ Don't hardcode colors - use CSS classes or the `fill` prop
- ❌ Don't nest complex functionality within this simple icon
- ❌ Don't use as a client component unless adding interactivity

This component exemplifies our architecture principles by remaining focused, reusable, and properly typed while integrating seamlessly into larger feature components.