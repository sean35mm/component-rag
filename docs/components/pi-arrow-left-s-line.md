# PiArrowLeftSLine Icon Component

## Purpose

The `PiArrowLeftSLine` component is a reusable SVG icon that renders a left-pointing arrow with a sleek, single-line design. This icon is part of the Pi icon library and is commonly used for navigation elements such as "back" buttons, previous page links, breadcrumb navigation, and directional indicators in user interfaces.

## Component Type

**Server Component** - This is a server component as it's a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and hydrated on the client without any behavioral changes.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Spread to the root `<svg>` element |

### Common SVG Props
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role
- `width`/`height` - Dimensions (defaults to `1em`)

## Usage Example

```tsx
import { PiArrowLeftSLine } from '@/components/icons/pi/pi-arrow-left-s-line';
import { Button } from '@/components/ui/button';

// Basic usage
export function BackButton() {
  return (
    <Button variant="ghost" onClick={() => window.history.back()}>
      <PiArrowLeftSLine className="mr-2 h-4 w-4" />
      Back
    </Button>
  );
}

// Navigation breadcrumb
export function BreadcrumbNavigation() {
  return (
    <nav className="flex items-center space-x-2 text-sm">
      <a href="/dashboard">Dashboard</a>
      <PiArrowLeftSLine className="h-3 w-3 rotate-180 text-gray-400" />
      <a href="/users">Users</a>
      <PiArrowLeftSLine className="h-3 w-3 rotate-180 text-gray-400" />
      <span className="text-gray-600">Profile</span>
    </nav>
  );
}

// Custom styling
export function CustomArrow() {
  return (
    <PiArrowLeftSLine 
      className="h-6 w-6 text-blue-600 hover:text-blue-800 transition-colors"
      aria-label="Go to previous page"
      role="button"
      tabIndex={0}
    />
  );
}

// In a carousel or slider
export function ImageCarousel() {
  const goToPrevious = () => {
    // Previous slide logic
  };

  return (
    <div className="relative">
      <button 
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg"
      >
        <PiArrowLeftSLine className="h-5 w-5 text-gray-700" />
      </button>
      {/* Carousel content */}
    </div>
  );
}
```

## Functionality

- **SVG Rendering**: Renders a clean, scalable left arrow icon using SVG paths
- **Responsive Sizing**: Uses `1em` dimensions by default, making it scale with font size
- **Current Color**: Uses `fill='currentColor'` to inherit text color from parent elements
- **Accessibility Ready**: Accepts ARIA attributes for screen reader compatibility
- **Customizable**: All SVG props can be overridden for custom styling and behavior
- **Geometric Design**: Clean geometric path with proper fill rules for crisp rendering

## State Management

**No State Management** - This is a stateless presentational component that doesn't manage any internal state, server state, or client state. It purely renders based on the props passed to it.

## Side Effects

**No Side Effects** - This component has no side effects, API calls, or external interactions. It's a pure function that renders SVG markup based on input props.

## Dependencies

### Internal Dependencies
- `React.SVGProps<SVGSVGElement>` - TypeScript interface for SVG element props

### External Dependencies
- **React** - Core React library for JSX and component definition

### Integration Dependencies
- Commonly used with UI components like `Button`, `IconButton`
- Often paired with navigation components and layout elements

## Integration

This icon component follows our architectural patterns for reusable UI components:

- **Location**: Stored in `/components/icons/pi/` following the domain-based organization
- **Naming Convention**: Follows the Pi icon library naming pattern
- **Reusability**: Can be imported and used across any feature domain
- **Composition**: Designed to be composed with other UI components like buttons, links, and navigation elements
- **Styling Integration**: Works seamlessly with Tailwind CSS classes and CSS-in-JS solutions

```tsx
// Example integration in a feature component
import { PiArrowLeftSLine } from '@/components/icons/pi/pi-arrow-left-s-line';
import { Button } from '@/components/ui/button';

export function UserProfileHeader() {
  return (
    <header className="flex items-center mb-6">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/users">
          <PiArrowLeftSLine className="mr-2 h-4 w-4" />
          Back to Users
        </Link>
      </Button>
    </header>
  );
}
```

## Best Practices

### Architectural Compliance
- ✅ **Server Component**: Correctly implemented as a server component since no client features needed
- ✅ **Flat Composition**: Simple, single-responsibility component that composes well with others
- ✅ **Reusable Design**: Stored in `/components/icons/` for cross-domain usage
- ✅ **Type Safety**: Properly typed with TypeScript using React's SVG prop types

### Usage Recommendations
- **Accessibility**: Always provide `aria-label` when used as interactive elements
- **Sizing**: Use Tailwind classes like `h-4 w-4` for consistent sizing across the app
- **Color**: Leverage `currentColor` by setting text color on parent elements
- **Performance**: No performance concerns as it's a lightweight SVG component
- **Semantic HTML**: Wrap in appropriate semantic elements (`<button>`, `<a>`) for interactive use cases

### Anti-patterns to Avoid
- ❌ Don't add `'use client'` directive unless adding client-side interactivity
- ❌ Don't inline SVG paths in multiple places - use this reusable component
- ❌ Don't override the `viewBox` unless you understand the visual implications
- ❌ Don't use without proper accessibility attributes in interactive contexts