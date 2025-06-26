# PiCornerDownRightLine Icon Component

## Purpose

The `PiCornerDownRightLine` component renders an SVG icon representing a corner arrow pointing down and to the right. This icon is typically used in navigation interfaces, flow diagrams, or to indicate directional movement or redirection from a vertical path to a horizontal path moving rightward.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | All standard SVG element props including `className`, `style`, `onClick`, `width`, `height`, etc. Spread to the root `<svg>` element |

### Inherited SVG Props
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `width` / `height` - Override default size (defaults to `1em`)
- `fill` - Override fill color (defaults to `currentColor`)
- `stroke` - Stroke properties
- `aria-label` - Accessibility label
- `role` - ARIA role
- And all other standard SVG attributes

## Usage Example

```tsx
import { PiCornerDownRightLine } from '@/components/icons/pi/pi-corner-down-right-line';

// Basic usage
export function NavigationFlow() {
  return (
    <div className="flex items-center gap-2">
      <span>Main Menu</span>
      <PiCornerDownRightLine />
      <span>Submenu</span>
    </div>
  );
}

// With custom styling
export function DirectionalIndicator() {
  return (
    <PiCornerDownRightLine 
      className="text-blue-500 hover:text-blue-700 cursor-pointer"
      width={20}
      height={20}
      onClick={() => console.log('Direction clicked')}
    />
  );
}

// In a flow diagram
export function ProcessFlow() {
  return (
    <div className="flex flex-col items-start space-y-4">
      <div className="border p-4 rounded">Step 1: Vertical Process</div>
      <div className="flex items-center">
        <div className="w-8 border-t border-gray-300" />
        <PiCornerDownRightLine className="text-gray-400" />
        <div className="flex-1 border-t border-gray-300" />
      </div>
      <div className="border p-4 rounded ml-8">Step 2: Horizontal Process</div>
    </div>
  );
}

// Responsive sizing with Tailwind
export function ResponsiveIcon() {
  return (
    <PiCornerDownRightLine className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8" />
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisp at any size using SVG format
- **Current Color Inheritance**: Uses `currentColor` for fill, inheriting text color from parent
- **Responsive Sizing**: Defaults to `1em` for font-relative sizing
- **Accessibility Ready**: Accepts ARIA attributes for screen reader support
- **Customizable**: Accepts all standard SVG props for full customization

### Visual Design
- **Dual Path Design**: Consists of two path elements forming an arrow and corner line
- **Line Style**: Outlined/stroke style rather than filled
- **Geometric Precision**: Uses `fillRule='evenodd'` and `clipRule='evenodd'` for clean rendering
- **24x24 Viewbox**: Standard icon dimensions for consistent sizing

## State Management

**No State Management** - This is a stateless presentational component that doesn't require any state management solution. It renders static SVG content based on props.

## Side Effects

**No Side Effects** - This component is purely functional with no side effects, API calls, or external interactions. Any interactive behavior is handled through props passed from parent components.

## Dependencies

### Internal Dependencies
- `React.SVGProps` type from React for TypeScript prop validation

### External Dependencies
- None - Pure React component with no external libraries

### Related Components
- Other Pi icon components in the same icon family
- UI components that commonly use directional icons (navigation, buttons, flows)

## Integration

### Application Architecture
```
src/
├── components/
│   ├── icons/
│   │   └── pi/
│   │       └── pi-corner-down-right-line.tsx  ← This component
│   ├── ui/                                     ← May be used in UI components
│   │   ├── navigation/
│   │   ├── buttons/
│   │   └── flows/
│   └── features/                               ← Used in feature components
       ├── navigation/
       ├── workflows/
       └── diagrams/
```

### Common Integration Patterns
- **Navigation Components**: Indicating submenu directions or flow paths
- **Button Components**: As decorative elements in action buttons
- **Flow Diagrams**: Showing process direction changes
- **Form Wizards**: Indicating step progression with direction changes
- **Dashboard Widgets**: Visual indicators for data flow or navigation

## Best Practices

### Architecture Compliance
✅ **Server Component**: Correctly implemented as server component (no 'use client')  
✅ **Flat Structure**: Simple, non-nested component design  
✅ **Reusable UI**: Located in appropriate `/icons/` directory  
✅ **TypeScript**: Proper typing with SVGProps interface  

### Usage Recommendations

```tsx
// ✅ Good: Semantic usage with proper accessibility
<button 
  className="flex items-center gap-2"
  aria-label="Navigate to next section"
>
  Next Section
  <PiCornerDownRightLine aria-hidden="true" />
</button>

// ✅ Good: Responsive and themeable
<PiCornerDownRightLine className="w-5 h-5 text-primary hover:text-primary-dark" />

// ✅ Good: Consistent sizing in icon sets
<div className="flex items-center space-x-1 text-lg">
  <PiCornerDownRightLine />
  <span>Flow Direction</span>
</div>

// ❌ Avoid: Inline styles when CSS classes available
<PiCornerDownRightLine style={{ color: '#blue', width: '20px' }} />

// ❌ Avoid: Missing accessibility for interactive usage
<PiCornerDownRightLine onClick={handleClick} /> // Missing aria-label
```

### Performance Considerations
- Component is lightweight with no performance concerns
- SVG renders efficiently at any scale
- No re-renders as it's stateless
- Can be safely used in lists or repeated elements