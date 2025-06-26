# PiArrowUpLine Component

## Purpose

The `PiArrowUpLine` component is an SVG icon component that renders an upward-pointing arrow with a line design. This icon is commonly used for navigation controls, scroll-to-top functionality, sorting indicators (ascending order), expand/collapse controls, and other UI elements that need to indicate upward direction or movement.

## Component Type

**Server Component** - This is a presentational SVG icon component with no client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and doesn't require the 'use client' directive.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | All standard SVG element props including `className`, `style`, `onClick`, `width`, `height`, `color`, etc. |

**Common SVG Props:**
- `className?: string` - CSS classes for styling
- `style?: CSSProperties` - Inline styles
- `onClick?: MouseEventHandler` - Click event handler
- `width?: string \| number` - Override default width (1em)
- `height?: string \| number` - Override default height (1em)
- `color?: string` - Icon color (uses currentColor by default)

## Usage Example

```tsx
import { PiArrowUpLine } from '@/components/icons/pi/pi-arrow-up-line';

// Basic usage
export function ScrollToTopButton() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button 
      onClick={handleScrollToTop}
      className="fixed bottom-4 right-4 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700"
    >
      <PiArrowUpLine className="w-5 h-5" />
    </button>
  );
}

// Sort indicator
export function TableHeader({ column, sortDirection, onSort }) {
  return (
    <th 
      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
      onClick={() => onSort(column)}
    >
      <div className="flex items-center space-x-2">
        <span>Name</span>
        {sortDirection === 'asc' && (
          <PiArrowUpLine className="w-4 h-4 text-blue-600" />
        )}
      </div>
    </th>
  );
}

// Navigation with custom styling
export function BackToTop() {
  return (
    <div className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
      <PiArrowUpLine 
        className="w-6 h-6" 
        style={{ transform: 'translateY(-1px)' }}
      />
      <span>Back to top</span>
    </div>
  );
}

// Collapsible section
export function CollapsibleSection({ isExpanded, onToggle, title, children }) {
  return (
    <div className="border rounded-lg">
      <button 
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between"
      >
        <span>{title}</span>
        <PiArrowUpLine 
          className={`w-5 h-5 transition-transform duration-200 ${
            isExpanded ? 'rotate-0' : 'rotate-180'
          }`}
        />
      </button>
      {isExpanded && (
        <div className="p-4 border-t">
          {children}
        </div>
      )}
    </div>
  );
}
```

## Functionality

- **SVG Rendering**: Renders a scalable vector graphic of an upward arrow with line styling
- **Responsive Sizing**: Uses `1em` dimensions to scale with font size by default
- **Current Color**: Uses `currentColor` fill to inherit text color from parent elements
- **Props Forwarding**: Accepts and forwards all standard SVG props for maximum flexibility
- **Accessibility**: Can receive ARIA attributes and event handlers for accessible interactions

## State Management

**No State Management** - This is a pure presentational component with no internal state. Any state management would be handled by parent components using:
- **Local State**: For simple toggle states (React useState)
- **Zustand**: For complex client-side state that needs to be shared
- **TanStack Query**: Not applicable for this icon component

## Side Effects

**No Side Effects** - This component has no side effects, API calls, or external interactions. It's a pure function that renders SVG markup based on props.

## Dependencies

**Minimal Dependencies:**
- `react` - For SVGProps type definition
- No external libraries or custom hooks required
- No other component dependencies

## Integration

This icon component integrates into the application architecture as:

**UI Component Layer:**
- Part of the `/components/icons/pi/` icon library
- Reusable across all application domains
- Follows flat component composition patterns

**Usage Patterns:**
- **Navigation Components**: Scroll-to-top buttons, breadcrumb navigation
- **Data Tables**: Sort direction indicators, column controls
- **Form Controls**: Accordion sections, dropdown indicators
- **Layout Components**: Collapsible sidebars, expandable content areas

**Styling Integration:**
- Works with Tailwind CSS utility classes
- Supports CSS-in-JS and styled-components
- Compatible with design system color tokens

## Best Practices

**Architecture Adherence:**
- ✅ **Server Component**: No client-side JavaScript needed
- ✅ **Flat Composition**: Can be composed into any parent component
- ✅ **Reusability**: Generic icon suitable for multiple use cases
- ✅ **Props Interface**: Flexible SVG props forwarding

**Usage Recommendations:**
- Use `className` for consistent sizing (`w-4 h-4`, `w-5 h-5`, etc.)
- Leverage `currentColor` for theme-aware coloring
- Add `aria-label` or `aria-hidden` for accessibility when needed
- Combine with interactive elements (buttons, links) for functionality
- Use CSS transforms for directional variations (rotate-180 for down arrow)

**Performance:**
- Lightweight SVG with minimal path complexity
- No runtime JavaScript execution
- Optimal for server-side rendering
- Cacheable as static content