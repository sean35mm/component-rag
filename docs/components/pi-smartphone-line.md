# PiSmartphoneLine Component

## Purpose
The `PiSmartphoneLine` component is an SVG icon component that renders a smartphone outline graphic. It serves as a reusable visual element for indicating mobile devices, phone-related features, or responsive design elements throughout the application interface.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG content without client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Spread to the root `<svg>` element |

## Usage Example

```tsx
import { PiSmartphoneLine } from '@/components/icons/pi/pi-smartphone-line';

// Basic usage
export function DeviceIndicator() {
  return (
    <div className="flex items-center gap-2">
      <PiSmartphoneLine />
      <span>Mobile Version</span>
    </div>
  );
}

// With custom styling and accessibility
export function ResponsiveToggle() {
  return (
    <button 
      className="flex items-center gap-2 p-2 hover:bg-gray-100"
      aria-label="Switch to mobile view"
    >
      <PiSmartphoneLine 
        className="w-5 h-5 text-blue-600" 
        aria-hidden="true"
      />
      <span>Mobile View</span>
    </button>
  );
}

// In a feature component
export function ContactMethodsCard() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <PiSmartphoneLine className="w-6 h-6 text-gray-600" />
        <div>
          <p className="font-medium">Mobile</p>
          <p className="text-sm text-gray-500">+1 (555) 123-4567</p>
        </div>
      </div>
    </div>
  );
}
```

## Functionality
- **SVG Rendering**: Displays a smartphone outline with rounded corners and a home button indicator
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent elements
- **Accessibility Ready**: Accepts ARIA attributes and other accessibility props
- **Style Flexibility**: Supports all standard SVG styling through props and CSS classes

## State Management
**None** - This is a stateless presentational component that doesn't require any state management. It purely renders SVG content based on props.

## Side Effects
**None** - The component has no side effects, API calls, or external interactions. It's a pure function that returns JSX.

## Dependencies
- **React**: Uses `SVGProps` type from React for prop typing
- **No external dependencies**: Self-contained SVG icon component

## Integration
This component fits into the application architecture as:

- **UI Layer Component**: Located in `/components/icons/pi/` following the flat component organization pattern
- **Design System Element**: Part of the Phosphor Icons (pi) icon set for consistent visual language
- **Reusable Asset**: Can be used across any feature domain without coupling
- **Composable Building Block**: Stacks easily with other UI components following the Lego block principle

```tsx
// Example integration in a feature component
import { PiSmartphoneLine } from '@/components/icons/pi/pi-smartphone-line';
import { Button } from '@/components/ui/button';

export function DevicePreviewToggle() {
  return (
    <Button variant="outline" size="sm">
      <PiSmartphoneLine className="mr-2" />
      Preview Mobile
    </Button>
  );
}
```

## Best Practices
✅ **Follows Architecture Guidelines**:
- **Server Component**: Correctly implemented as server component since no client features needed
- **Flat Organization**: Placed in appropriate `/icons/pi/` directory structure  
- **Component Decomposition**: Single responsibility - only renders smartphone icon
- **Reusability**: Generic enough for use across multiple domains

✅ **Icon Component Patterns**:
- Use semantic class names for sizing (`w-5 h-5`) rather than inline styles
- Always include `aria-hidden="true"` when icon is decorative
- Provide meaningful `aria-label` when icon conveys important information
- Leverage `currentColor` for theme integration

✅ **Performance Optimized**:
- No runtime JavaScript required
- Minimal bundle size impact
- Server-side renderable
- No state or effect overhead