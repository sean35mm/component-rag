# PiFlashlightFill Icon Component

## Purpose
The `PiFlashlightFill` component is a filled flashlight SVG icon designed for user interfaces. It provides a visual representation of a flashlight with a lightning bolt design, commonly used to indicate search functionality, illumination features, or highlighting capabilities within applications.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without requiring client-side interactivity, browser APIs, or state management. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | - | All standard SVG element props including `className`, `style`, `onClick`, etc. |

### Inherited SVG Props
Common props you might use:
- `className`: string - CSS classes for styling
- `style`: CSSProperties - Inline styles
- `onClick`: MouseEventHandler - Click event handler
- `aria-label`: string - Accessibility label
- `role`: string - ARIA role

## Usage Example

```tsx
import { PiFlashlightFill } from '@/components/icons/pi/pi-flashlight-fill';

// Basic usage
function SearchButton() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded">
      <PiFlashlightFill />
      Search
    </button>
  );
}

// With custom styling
function HighlightIndicator() {
  return (
    <PiFlashlightFill 
      className="w-6 h-6 text-yellow-500 hover:text-yellow-600 transition-colors"
      aria-label="Highlight feature"
    />
  );
}

// In a navigation menu
function NavigationItem() {
  return (
    <div className="flex items-center space-x-3 p-2">
      <PiFlashlightFill className="w-5 h-5 text-gray-600" />
      <span>Search & Highlight</span>
    </div>
  );
}

// With click handler
function InteractiveIcon() {
  const handleToggleSearch = () => {
    // Toggle search functionality
  };

  return (
    <PiFlashlightFill 
      className="w-4 h-4 cursor-pointer text-blue-600 hover:text-blue-800"
      onClick={handleToggleSearch}
      role="button"
      aria-label="Toggle search mode"
    />
  );
}
```

## Functionality
- **Scalable Vector Graphics**: Renders crisp at any size using SVG format
- **CSS Integration**: Inherits text color via `fill='currentColor'` for easy theming
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Accessibility Ready**: Accepts ARIA attributes for screen reader compatibility
- **Event Handling**: Supports all standard DOM events through prop spreading

## State Management
**None** - This is a stateless presentational component. Any state management should be handled by parent components using:
- **TanStack Query**: For server state related to search or highlight features
- **Zustand**: For client-side UI state like search modal visibility
- **Local State**: For simple toggle states in parent components

## Side Effects
**None** - This component has no side effects. It performs no API calls, localStorage operations, or external system interactions.

## Dependencies
- **React**: `SVGProps` type import for prop typing
- **No External Dependencies**: Pure React component with no additional library requirements

## Integration
This component integrates into the application architecture as:

### UI Component Layer
```
/src/components/icons/pi/pi-flashlight-fill.tsx  (Icon Component)
├── /src/components/ui/                          (UI Components using icons)
├── /src/components/features/                    (Feature components)
└── /src/app/                                   (Page components)
```

### Common Integration Patterns
```tsx
// In search feature components
import { PiFlashlightFill } from '@/components/icons/pi/pi-flashlight-fill';
import { SearchModal } from '@/components/features/search/search-modal';

// In UI library components
import { Button } from '@/components/ui/button';
import { PiFlashlightFill } from '@/components/icons/pi/pi-flashlight-fill';

// In navigation components
import { NavigationItem } from '@/components/ui/navigation-item';
```

## Best Practices

### ✅ Follows Architecture Guidelines
- **Server Component**: No unnecessary client-side rendering
- **Flat Component Structure**: Single-level icon component, no nested complexity
- **Reusable Design**: Pure UI component in appropriate `/icons/` directory
- **Prop Interface**: Uses standard React patterns with prop spreading

### ✅ Implementation Best Practices
```tsx
// ✅ Good: Semantic usage with proper ARIA labels
<PiFlashlightFill aria-label="Search documents" role="img" />

// ✅ Good: Consistent sizing with Tailwind classes
<PiFlashlightFill className="w-4 h-4" />

// ✅ Good: Color inheritance for theming
<div className="text-blue-600">
  <PiFlashlightFill /> {/* Inherits blue color */}
</div>

// ❌ Avoid: Inline styles when classes are available
<PiFlashlightFill style={{ width: '16px', height: '16px' }} />

// ❌ Avoid: Missing accessibility attributes for interactive icons
<PiFlashlightFill onClick={handleClick} /> {/* Missing role/aria-label */}
```

### ✅ Performance Considerations
- **Tree Shaking**: Named export enables efficient bundling
- **Server Rendering**: Reduces client-side JavaScript bundle
- **CSS Integration**: `currentColor` eliminates need for color prop variants