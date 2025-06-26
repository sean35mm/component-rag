# PiArrowDownLine Icon Component

## Purpose

The `PiArrowDownLine` component is a downward-pointing arrow icon that displays both an arrow head and a vertical line. This icon is typically used in user interfaces to indicate downward movement, sorting order, dropdown states, or navigation to content below. As part of the Phosphor icon collection, it provides a consistent visual language for directional interactions throughout the application.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG content without any interactive behavior, state management, or browser-specific APIs. It can be safely rendered on the server and hydrated on the client without requiring the 'use client' directive.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | - | All standard SVG element props including className, style, onClick, etc. Spread to the root SVG element |

### Inherited SVG Props
Common props you can pass include:
- `className`: CSS classes for styling
- `style`: Inline styles
- `onClick`: Click event handler
- `onMouseEnter/Leave`: Mouse event handlers
- `aria-label`: Accessibility label
- `role`: ARIA role override

## Usage Example

```tsx
import { PiArrowDownLine } from '@/components/icons/pi/pi-arrow-down-line';

// Basic usage
function SortButton() {
  return (
    <button className="flex items-center gap-2">
      Sort by Date
      <PiArrowDownLine className="w-4 h-4" />
    </button>
  );
}

// With click handler and styling
function ExpandableSection({ isExpanded, onToggle }: Props) {
  return (
    <button 
      onClick={onToggle}
      className="flex items-center justify-between w-full p-4"
    >
      <span>Advanced Options</span>
      <PiArrowDownLine 
        className={`w-5 h-5 transition-transform ${
          isExpanded ? 'rotate-180' : ''
        }`}
      />
    </button>
  );
}

// In a dropdown component
function Dropdown({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <button className="flex items-center gap-2 px-4 py-2 border rounded">
        Select Option
        <PiArrowDownLine className="w-4 h-4 text-gray-500" />
      </button>
      {children}
    </div>
  );
}

// With accessibility
function ScrollToBottom() {
  return (
    <button 
      aria-label="Scroll to bottom of page"
      className="fixed bottom-4 right-4 p-3 bg-blue-600 text-white rounded-full"
    >
      <PiArrowDownLine className="w-6 h-6" />
    </button>
  );
}
```

## Functionality

### Core Features
- **Scalable Vector Graphics**: Renders crisp at any size using SVG format
- **Color Inheritance**: Uses `currentColor` to inherit text color from parent elements
- **Responsive Sizing**: Uses `1em` dimensions to scale with font size
- **Accessibility Ready**: Accepts ARIA attributes for screen reader support

### Visual Design
- **Dual Element Design**: Combines arrow head with vertical line for clear directional indication
- **24x24 Viewport**: Standard icon dimensions for consistent sizing
- **Optimized Paths**: Uses `fillRule` and `clipRule` for clean rendering

## State Management

**No State Management Required** - This is a stateless presentational component that doesn't manage any internal state or require external state management solutions like TanStack Query or Zustand.

## Side Effects

**No Side Effects** - The component is purely functional with no:
- API calls or data fetching
- DOM manipulation outside of rendering
- External service interactions
- Browser storage access
- Event subscriptions

## Dependencies

### Internal Dependencies
- `React`: Uses `SVGProps` type from React for prop typing

### External Dependencies
- None - This component has no external dependencies

### Related Components
- Other Phosphor icon components in `/components/icons/pi/`
- UI components that commonly use directional icons (dropdowns, accordions, sort controls)

## Integration

### Application Architecture
- **Icon System**: Part of the comprehensive Phosphor icon collection providing consistent iconography
- **Design System**: Integrates with the application's visual design language
- **Component Reusability**: Can be used across different domains and features
- **Theme Integration**: Respects color schemes through `currentColor` usage

### Common Integration Patterns
```tsx
// In dropdown components
import { PiArrowDownLine } from '@/components/icons/pi/pi-arrow-down-line';
import { DropdownMenu } from '@/components/ui/dropdown-menu';

// In sort controls
import { PiArrowDownLine } from '@/components/icons/pi/pi-arrow-down-line';
import { Button } from '@/components/ui/button';

// In navigation components
import { PiArrowDownLine } from '@/components/icons/pi/pi-arrow-down-line';
import { Accordion } from '@/components/ui/accordion';
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: Correctly implemented as server component without unnecessary client-side code
- ✅ **Flat Component Structure**: Simple, single-level component without nested complexity
- ✅ **Reusable Design**: Generic icon that can be used across multiple domains
- ✅ **TypeScript Integration**: Properly typed with SVG props interface

### Usage Recommendations
- **Sizing**: Use Tailwind classes like `w-4 h-4` or `w-5 h-5` for consistent sizing
- **Color**: Leverage `currentColor` by setting text color on parent elements
- **Accessibility**: Always provide `aria-label` when icon is the only content in interactive elements
- **Animation**: Apply CSS transitions for smooth state changes (rotation, color changes)
- **Semantic HTML**: Combine with appropriate semantic elements (buttons, links) for proper meaning

### Performance Considerations
- **Bundle Size**: Minimal impact due to simple SVG structure
- **Rendering**: Efficient server-side rendering with no hydration overhead
- **Caching**: Benefits from component-level caching in server components
- **Tree Shaking**: Can be tree-shaken if imported but not used