# PiShareForward2Line Icon Component

## Purpose

The `PiShareForward2Line` component is an SVG icon that visually represents a "share forward" action with a line-style design. It displays a forward arrow combined with sharing elements, commonly used for forwarding content, sharing to external platforms, or navigating users to sharing workflows. This icon is part of the Phosphor Icons library integration and follows consistent sizing and styling patterns.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and hydrated on the client without requiring the 'use client' directive.

## Props Interface

| Prop Name | Type | Required | Description |
|-----------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Spread to the root `<svg>` element |

## Usage Example

```tsx
import { PiShareForward2Line } from '@/components/icons/pi/pi-share-forward-2-line';

// Basic usage
function ShareButton() {
  return (
    <button className="flex items-center gap-2 px-4 py-2">
      <PiShareForward2Line />
      Share Forward
    </button>
  );
}

// With custom styling and accessibility
function ArticleActions() {
  return (
    <div className="flex gap-2">
      <button 
        onClick={() => handleShare()}
        className="p-2 hover:bg-gray-100 rounded-lg"
        aria-label="Forward this article"
      >
        <PiShareForward2Line 
          className="w-5 h-5 text-blue-600" 
          aria-hidden="true"
        />
      </button>
    </div>
  );
}

// In navigation or toolbar
function DocumentToolbar() {
  return (
    <div className="flex items-center space-x-1">
      <PiShareForward2Line className="w-4 h-4 text-gray-500" />
      <span className="text-sm">Forward Document</span>
    </div>
  );
}
```

## Functionality

- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Theme Integration**: Uses `currentColor` fill to inherit text color from parent
- **Accessibility Ready**: Accepts ARIA attributes and other accessibility props
- **Flexible Styling**: Accepts `className`, `style`, and other styling props
- **Event Handling**: Supports click handlers and other interactive props when wrapped in interactive elements

## State Management

**No State Management Required** - This is a stateless presentational component that renders static SVG content. It doesn't manage any internal state or require external state management solutions.

## Side Effects

**No Side Effects** - The component performs no API calls, localStorage access, or other side effects. It's a pure function that returns consistent SVG markup based on props.

## Dependencies

- **React**: Uses `SVGProps` type from React for proper TypeScript support
- **No External Dependencies**: Self-contained component with no additional library requirements

## Integration

This icon component integrates into the application architecture as:

- **UI Layer Component**: Located in `/components/icons/` as a reusable UI primitive
- **Design System Element**: Part of the consistent icon system across the application
- **Composable Building Block**: Can be used in buttons, navigation, toolbars, and other UI components
- **Theme Compatible**: Works with design system color schemes and sizing conventions

```tsx
// Integration in feature components
function ShareContentModal({ content }: { content: Content }) {
  return (
    <Modal>
      <div className="flex items-center gap-2 mb-4">
        <PiShareForward2Line className="w-6 h-6" />
        <h2>Forward Content</h2>
      </div>
      {/* Modal content */}
    </Modal>
  );
}

// Integration in layout components
function ActionBar() {
  return (
    <nav className="flex items-center justify-between">
      <ShareForwardButton icon={PiShareForward2Line} />
    </nav>
  );
}
```

## Best Practices

**✅ Follows Architecture Guidelines:**

- **Server-First Approach**: Leverages server component capabilities for static content
- **Flat Component Structure**: Simple, single-purpose component without unnecessary nesting
- **Reusable UI Primitive**: Located in appropriate `/icons/` directory for cross-feature usage
- **TypeScript Integration**: Proper typing with `SVGProps<SVGSVGElement>`
- **Accessibility Support**: Accepts ARIA props and semantic attributes
- **Performance Optimized**: No runtime JavaScript for basic rendering
- **Consistent API**: Follows standard SVG component patterns across the icon library

**Recommended Usage Patterns:**
- Always provide accessible labels when used in interactive contexts
- Use semantic HTML elements (`<button>`, `<a>`) for interactive icons
- Leverage CSS classes for consistent sizing across similar use cases
- Combine with text labels for better user experience
- Use `aria-hidden="true"` when icon is decorative alongside text