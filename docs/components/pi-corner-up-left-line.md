# PiCornerUpLeftLine Icon Component

## Purpose

The `PiCornerUpLeftLine` component renders an SVG icon that depicts a corner arrow pointing up and left. This icon is part of the Phosphor icon set and is commonly used to indicate directional navigation, turning actions, or movement from bottom-right to top-left in user interfaces.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and hydrated on the client without any JavaScript requirements.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| ...props | `SVGProps<SVGSVGElement>` | Optional | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Props are spread to the root `<svg>` element |

## Usage Example

```tsx
import { PiCornerUpLeftLine } from '@/components/icons/pi/pi-corner-up-left-line';

// Basic usage
function NavigationButton() {
  return (
    <button className="flex items-center gap-2">
      <PiCornerUpLeftLine />
      <span>Back to Top</span>
    </button>
  );
}

// With custom styling
function StyledIcon() {
  return (
    <PiCornerUpLeftLine 
      className="w-6 h-6 text-blue-500 hover:text-blue-600"
      aria-label="Navigate up and left"
    />
  );
}

// In a navigation component
function BreadcrumbNavigation() {
  return (
    <nav className="flex items-center space-x-2">
      <button 
        onClick={() => navigateToParent()}
        className="p-2 rounded-md hover:bg-gray-100"
      >
        <PiCornerUpLeftLine className="w-4 h-4" />
      </button>
      <span>Current Page</span>
    </nav>
  );
}

// As part of a direction indicator
function DirectionGuide() {
  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="flex items-center justify-center p-4 border rounded">
        <PiCornerUpLeftLine className="w-8 h-8 text-gray-600" />
      </div>
      {/* Other direction icons */}
    </div>
  );
}
```

## Functionality

- **SVG Rendering**: Renders a scalable vector graphic using two path elements that create the corner up-left arrow shape
- **Responsive Sizing**: Uses `1em` dimensions to scale with the parent element's font size
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent elements
- **Accessibility Ready**: Accepts all standard SVG props including accessibility attributes
- **Style Flexibility**: Supports all CSS styling through className and style props

## State Management

**No State Management** - This is a stateless presentational component that doesn't require any state management. It simply renders SVG markup based on the props passed to it.

## Side Effects

**No Side Effects** - This component is purely functional with no side effects, API calls, or external interactions. It only renders static SVG content.

## Dependencies

- **React**: Uses `SVGProps` type from React for proper TypeScript support
- **No External Dependencies**: Self-contained component with no dependencies on other components, hooks, or services

## Integration

This icon component follows our flat component architecture and integrates seamlessly into the application:

- **Icon System**: Part of the Phosphor icon collection under `/components/icons/pi/`
- **Design System**: Integrates with Tailwind CSS classes for consistent styling
- **Component Composition**: Can be composed within buttons, navigation elements, and other UI components
- **Theme Integration**: Automatically adapts to theme colors through `currentColor`
- **Accessibility**: Works with screen readers when proper `aria-label` or surrounding context is provided

## Best Practices

✅ **Follows Architecture Guidelines**:
- **Server Component**: Correctly implemented as a server component since no client-side functionality is needed
- **Flat Structure**: Properly placed in the flat icon directory structure
- **Lego Block Design**: Can be easily composed into larger components
- **TypeScript Safety**: Properly typed with `SVGProps<SVGSVGElement>`

✅ **Implementation Best Practices**:
- Use semantic HTML structure when composing with this icon
- Provide proper accessibility attributes (`aria-label`, `role`) when the icon conveys meaning
- Leverage `currentColor` for theme consistency rather than hardcoding colors
- Use Tailwind classes for responsive sizing (`w-4 h-4`, `w-6 h-6`, etc.)
- Consider the icon's semantic meaning when choosing usage context (directional navigation, corner actions)

✅ **Performance Optimized**:
- Lightweight SVG implementation
- No JavaScript bundle impact for basic usage
- Server-side renderable for optimal loading performance