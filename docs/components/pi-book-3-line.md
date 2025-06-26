# PiBook3Line Icon Component

## Purpose

The `PiBook3Line` component is an SVG icon that renders a book illustration with an outline style. It's part of the Phosphor Icons (pi) collection and is designed to represent books, reading, documentation, or educational content within the application interface.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG content without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop Name | Type | Required | Description |
|-----------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Spread to the root `<svg>` element |

### Inherited SVG Props (commonly used)
| Prop Name | Type | Description |
|-----------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role attribute |

## Usage Example

```tsx
import { PiBook3Line } from '@/components/icons/pi/pi-book-3-line';

// Basic usage
function DocumentSection() {
  return (
    <div className="flex items-center gap-2">
      <PiBook3Line />
      <span>Documentation</span>
    </div>
  );
}

// With custom styling
function BookmarkButton() {
  return (
    <button className="flex items-center gap-2 p-2 hover:bg-gray-100">
      <PiBook3Line 
        className="text-blue-600" 
        style={{ fontSize: '20px' }}
      />
      Reading List
    </button>
  );
}

// As clickable icon with accessibility
function ReadingModeToggle({ onToggle }: { onToggle: () => void }) {
  return (
    <PiBook3Line
      onClick={onToggle}
      className="cursor-pointer text-gray-600 hover:text-gray-900"
      aria-label="Toggle reading mode"
      role="button"
      tabIndex={0}
    />
  );
}

// In navigation or menu
function Sidebar() {
  return (
    <nav>
      <a href="/library" className="nav-link">
        <PiBook3Line className="w-5 h-5" />
        Library
      </a>
    </nav>
  );
}
```

## Functionality

- **SVG Rendering**: Renders a scalable vector graphic of a book icon
- **Responsive Sizing**: Uses `1em` dimensions to scale with font size
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent
- **Prop Forwarding**: Accepts and forwards all standard SVG props for maximum flexibility
- **Accessibility Ready**: Can receive ARIA attributes for screen reader support

## State Management

**None** - This is a stateless presentational component. It doesn't manage any internal state or connect to external state management systems (TanStack Query or Zustand).

## Side Effects

**None** - This component has no side effects, API calls, or external interactions. It's a pure function that renders SVG markup based on props.

## Dependencies

### Internal Dependencies
- `SVGProps` from React for type safety

### External Dependencies
- React (for `SVGProps` type)

### No Dependencies On
- Custom hooks or services
- State management libraries
- Other components

## Integration

### Application Architecture Fit
- **UI Component Layer**: Lives in `/src/components/icons/pi/` following the flat component structure
- **Design System**: Part of the icon system using Phosphor Icons for consistent visual language
- **Reusability**: Highly reusable across features - navigation, buttons, content sections, forms
- **Composition**: Designed to be composed with other UI components (buttons, links, cards)

### Common Integration Patterns
```tsx
// In feature components
function CourseCard({ course }) {
  return (
    <Card>
      <div className="flex items-center">
        <PiBook3Line className="text-blue-500" />
        <h3>{course.title}</h3>
      </div>
    </Card>
  );
}

// In layout components
function Header() {
  return (
    <header>
      <nav>
        <NavLink icon={<PiBook3Line />} href="/docs">
          Documentation
        </NavLink>
      </nav>
    </header>
  );
}
```

## Best Practices

### Architectural Adherence
- ✅ **Server Component**: Correctly implemented as server component (no client-side features)
- ✅ **Flat Structure**: Placed in appropriate `/icons/pi/` directory
- ✅ **Composition Over Nesting**: Designed to be composed with other components
- ✅ **Single Responsibility**: Only handles SVG icon rendering

### Usage Recommendations
- **Sizing**: Use CSS classes or font-size to control icon size rather than fixed dimensions
- **Accessibility**: Always provide `aria-label` when used as interactive elements
- **Semantic Usage**: Use in contexts related to books, reading, documentation, or learning
- **Color**: Leverage `currentColor` by setting text color on parent elements
- **Performance**: Safe to use extensively as it has no runtime overhead

### Anti-Patterns to Avoid
- ❌ Don't add client-side state or effects to this component
- ❌ Don't hardcode colors - use CSS classes or inherit from parent
- ❌ Don't wrap in unnecessary containers - compose directly
- ❌ Don't modify the SVG paths - use transform CSS for rotations/scaling