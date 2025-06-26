# Ellipse Icon Component

## Purpose

The `Ellipse` component is a simple SVG icon that renders a semi-transparent circular dot. It serves as a visual indicator or decorative element in the user interface, commonly used for status indicators, bullet points, or as part of loading animations and visual separators.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `fill` | `string` | No | `'#505050'` | The fill color for the ellipse circle |
| `...rest` | `SVGAttributes<SVGElement>` | No | - | All standard SVG attributes (className, style, onClick, etc.) |

## Usage Example

```tsx
import { Ellipse } from '@/components/icons/ellipse';

// Basic usage with default styling
function StatusIndicator() {
  return (
    <div className="flex items-center gap-2">
      <Ellipse />
      <span>Inactive</span>
    </div>
  );
}

// Custom color for different states
function ActivityStatus({ isActive }: { isActive: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <Ellipse 
        fill={isActive ? '#22c55e' : '#ef4444'} 
        className="w-2 h-2"
      />
      <span>{isActive ? 'Active' : 'Inactive'}</span>
    </div>
  );
}

// As part of a navigation breadcrumb
function Breadcrumb() {
  return (
    <nav className="flex items-center space-x-2">
      <span>Home</span>
      <Ellipse fill="#9ca3af" />
      <span>Products</span>
      <Ellipse fill="#9ca3af" />
      <span>Details</span>
    </nav>
  );
}

// In a list as bullet points
function FeatureList() {
  return (
    <ul className="space-y-2">
      {['Feature 1', 'Feature 2', 'Feature 3'].map((feature) => (
        <li key={feature} className="flex items-center gap-3">
          <Ellipse fill="#3b82f6" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}
```

## Functionality

- **SVG Rendering**: Renders a clean, scalable vector graphic of a circular dot
- **Customizable Fill**: Accepts a `fill` prop to customize the circle color
- **Semi-transparent**: Uses 50% opacity for a subtle visual appearance
- **Fixed Dimensions**: Default viewBox of 3x4 units with a 1.5 radius circle
- **Flexible Styling**: Accepts all standard SVG attributes for additional customization

## State Management

**No State Management** - This is a stateless presentational component that doesn't require any state management. It purely renders based on the props passed to it.

## Side Effects

**No Side Effects** - The component has no side effects, API calls, or external interactions. It's a pure function that returns JSX based on its props.

## Dependencies

- **React**: Uses `SVGAttributes` type from React for prop typing
- **No External Dependencies**: Self-contained icon component with no dependencies on other components or services

## Integration

This component fits into the application architecture as:

- **UI Component**: Located in `/components/icons/` following the flat component structure
- **Reusable Asset**: Can be used across different domains and features
- **Design System Element**: Part of the icon library for consistent visual language
- **Composition Ready**: Designed to be easily composed with other UI elements

## Best Practices

✅ **Follows Architecture Guidelines:**
- **Server Component**: Correctly implemented as a server component (no 'use client' needed)
- **Flat Structure**: Simple, non-nested component design
- **Reusable**: Placed in shared UI location for cross-domain usage
- **Prop Spreading**: Uses proper prop destructuring and spreading patterns

✅ **Icon Component Best Practices:**
- **Accessibility**: Can accept ARIA attributes via prop spreading
- **Scalability**: Uses SVG for crisp rendering at any size
- **Customization**: Provides sensible defaults while allowing customization
- **Performance**: Lightweight with no unnecessary re-renders

✅ **Usage Recommendations:**
- Use consistent fill colors that align with your design system
- Consider accessibility when using as status indicators (pair with text or ARIA labels)
- Leverage the className prop for responsive sizing
- Combine with semantic HTML elements for proper document structure