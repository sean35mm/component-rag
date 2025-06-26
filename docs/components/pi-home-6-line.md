# PiHome6Line Component

## Purpose
The `PiHome6Line` component is an SVG icon component representing a home/house symbol with a line-style design. It serves as a visual indicator for home-related navigation, buttons, or UI elements throughout the application. This component is part of the icon system and provides a consistent, scalable home icon that adapts to the current text color and size.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and doesn't require the 'use client' directive.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Spread onto the root `<svg>` element |

## Usage Example

```tsx
import { PiHome6Line } from '@/components/icons/pi/pi-home-6-line';

// Basic usage
function NavigationBar() {
  return (
    <nav className="flex items-center space-x-4">
      <button className="flex items-center space-x-2">
        <PiHome6Line />
        <span>Home</span>
      </button>
    </nav>
  );
}

// With custom styling and accessibility
function HomeButton() {
  return (
    <button 
      className="p-2 hover:bg-gray-100 rounded-lg"
      aria-label="Go to home page"
    >
      <PiHome6Line 
        className="text-blue-600 w-6 h-6" 
        aria-hidden="true"
      />
    </button>
  );
}

// In a breadcrumb navigation
function Breadcrumbs() {
  return (
    <nav className="flex items-center space-x-2 text-sm">
      <a href="/" className="flex items-center text-gray-600 hover:text-gray-900">
        <PiHome6Line className="w-4 h-4 mr-1" />
        Home
      </a>
      <span>/</span>
      <span>Current Page</span>
    </nav>
  );
}

// With click handler
function DashboardHeader() {
  const handleHomeClick = () => {
    // Navigation logic
    window.location.href = '/dashboard';
  };

  return (
    <header className="flex items-center justify-between p-4">
      <PiHome6Line 
        className="w-8 h-8 cursor-pointer text-gray-700 hover:text-gray-900"
        onClick={handleHomeClick}
        role="button"
        tabIndex={0}
      />
    </header>
  );
}
```

## Functionality
- **Scalable Vector Graphics**: Renders as crisp SVG at any size using `1em` dimensions
- **Color Inheritance**: Uses `fill='currentColor'` to inherit text color from parent elements
- **Responsive Design**: Automatically scales with font size using `em` units
- **Accessibility Ready**: Accepts all standard SVG props for ARIA attributes and semantic markup
- **Style Flexibility**: Can be styled with CSS classes, inline styles, or CSS-in-JS solutions
- **Event Handling**: Supports all standard DOM events through props spreading

## State Management
**No State Management** - This is a stateless presentational component that doesn't manage any internal state or connect to external state management solutions. It purely renders SVG markup based on the props passed to it.

## Side Effects
**No Side Effects** - The component has no side effects, API calls, or external interactions. It's a pure function that returns JSX based on its props.

## Dependencies
- **React**: Uses `SVGProps` type from React for prop typing
- **No External Dependencies**: Self-contained component with no dependencies on other components, hooks, or services

## Integration
This component fits into the application architecture as:

- **Icon System Component**: Part of the standardized icon library located in `/components/icons/pi/`
- **Design System Element**: Provides consistent visual language across the application
- **Reusable UI Building Block**: Can be composed into larger UI components following the "Lego blocks" principle
- **Server-First Architecture**: Aligns with the server component default approach, reducing client bundle size
- **Theme Integration**: Works seamlessly with CSS-in-JS solutions, Tailwind CSS, or traditional CSS for theming

## Best Practices

✅ **Follows Architecture Guidelines**:
- Server Component by default (no unnecessary client-side code)
- Flat component structure (no nested complexity)
- Highly reusable and composable
- Proper TypeScript integration

✅ **Recommended Usage Patterns**:
```tsx
// Good: Semantic usage with proper accessibility
<button aria-label="Navigate to home">
  <PiHome6Line aria-hidden="true" />
  <span className="sr-only">Home</span>
</button>

// Good: Consistent sizing with design system
<PiHome6Line className="w-5 h-5 text-primary-600" />

// Good: Event handling for interactive icons
<PiHome6Line 
  className="cursor-pointer hover:text-blue-600" 
  onClick={handleClick}
  role="button"
  tabIndex={0}
/>
```

⚠️ **Considerations**:
- Always provide proper accessibility attributes when used interactively
- Use semantic HTML elements (`<button>`, `<a>`) rather than relying solely on click handlers
- Consider icon size in relation to touch targets (minimum 44px for mobile)
- Ensure sufficient color contrast when applying custom colors