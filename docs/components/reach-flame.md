# ReachFlame Icon Component

## Purpose

The `ReachFlame` component is an SVG icon component that renders a stylized flame symbol. It's designed as a reusable UI element that can be used throughout the application for branding, navigation, or decorative purposes. The component follows standard icon patterns with responsive sizing and theme-aware coloring.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup. It has no client-side interactivity, state management, or browser APIs, making it suitable for server-side rendering by default.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGAttributes<SVGElement>` | No | All standard SVG attributes (className, style, onClick, etc.) are spread to the underlying `<svg>` element |

### Common SVG Attributes
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role
- `width`/`height` - Override default sizing (defaults to "1em")

## Usage Example

```tsx
import { ReachFlame } from '@/components/icons/reach-flame';

// Basic usage
function Header() {
  return (
    <div className="flex items-center gap-2">
      <ReachFlame className="text-orange-500" />
      <h1>Reach App</h1>
    </div>
  );
}

// Custom sizing and styling
function Logo() {
  return (
    <ReachFlame 
      className="w-8 h-8 text-red-500 hover:text-red-600 transition-colors"
      aria-label="Reach application logo"
    />
  );
}

// Interactive usage
function IconButton() {
  return (
    <button className="p-2 rounded-lg hover:bg-gray-100">
      <ReachFlame 
        className="w-5 h-5 text-gray-700"
        role="img"
        aria-label="Flame icon"
      />
    </button>
  );
}

// Custom dimensions
function LargeFlame() {
  return (
    <ReachFlame 
      width="2rem"
      height="2rem"
      className="text-yellow-500"
    />
  );
}
```

## Functionality

- **Responsive Sizing**: Uses `1em` dimensions by default, scaling with parent font-size
- **Theme Integration**: Uses `currentColor` for both fill and stroke, inheriting text color
- **Customizable**: Accepts all standard SVG attributes for complete customization
- **Accessible**: Can be enhanced with ARIA attributes for screen readers
- **Scalable Vector**: Maintains crisp appearance at any size

## State Management

**No State Management** - This is a stateless presentational component. It doesn't use TanStack Query, Zustand, or local state as it only renders static SVG content.

## Side Effects

**No Side Effects** - The component has no side effects, API calls, or external interactions. It's a pure function that renders SVG markup based on props.

## Dependencies

### Internal Dependencies
- `React` - Core React library for JSX
- `SVGAttributes` type from React

### External Dependencies
- None - This is a self-contained component

### Related Components
- Other icon components in `/components/icons/`
- UI components that might use this icon (buttons, headers, navigation)

## Integration

This component fits into the application architecture as:

- **UI Layer**: Located in `/components/icons/` following the UI component organization pattern
- **Design System**: Part of the icon library for consistent visual elements
- **Reusability**: Can be imported and used across any feature or page component
- **Theming**: Integrates with CSS/Tailwind color system through `currentColor`

```tsx
// Example integration in a feature component
import { ReachFlame } from '@/components/icons/reach-flame';

function DashboardHeader() {
  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <ReachFlame className="text-brand-primary w-6 h-6" />
        <span className="text-xl font-semibold">Dashboard</span>
      </div>
    </header>
  );
}
```

## Best Practices

✅ **Architectural Alignment**:
- **Server Component**: Correctly implemented as server component (no 'use client')
- **Flat Structure**: Simple, non-nested component design
- **UI Component**: Properly placed in UI layer for reusability
- **Props Spreading**: Uses spread operator for maximum flexibility

✅ **Implementation Patterns**:
- **TypeScript**: Properly typed with React's `SVGAttributes`
- **Accessibility Ready**: Supports ARIA attributes through props spreading
- **Performance**: Lightweight with no unnecessary re-renders
- **Responsive**: Uses relative units (1em) for flexible sizing

✅ **Usage Guidelines**:
- Always provide `aria-label` when used as meaningful content
- Use `role="img"` for decorative usage
- Leverage `currentColor` for theme consistency
- Combine with Tailwind classes for responsive design
- Consider wrapping in buttons for interactive usage