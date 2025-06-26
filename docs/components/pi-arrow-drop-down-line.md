# PiArrowDropDownLine Component

## Purpose

The `PiArrowDropDownLine` component is an SVG icon component that renders a downward-pointing arrow designed for dropdown interfaces. It provides a consistent visual indicator for expandable content, dropdown menus, select inputs, and other UI elements that reveal additional content when activated. As part of the Phosphor Icons collection, it maintains visual consistency across the application's iconography.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser-specific APIs. It can be safely rendered on the server, improving initial page load performance and SEO.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `width` | `string \| number` | No | `'1em'` | Sets the width of the SVG icon |
| `height` | `string \| number` | No | `'1em'` | Sets the height of the SVG icon |
| `fill` | `string` | No | `'currentColor'` | Sets the fill color of the icon |
| `className` | `string` | No | - | CSS classes for styling the icon |
| `onClick` | `MouseEventHandler<SVGSVGElement>` | No | - | Click event handler |
| `style` | `CSSProperties` | No | - | Inline styles for the icon |
| `...props` | `SVGProps<SVGSVGElement>` | No | - | Any other valid SVG element props |

## Usage Example

```tsx
import { PiArrowDropDownLine } from '@/components/icons/pi/pi-arrow-drop-down-line';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

// Basic usage in a dropdown button
export function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        Select Option
        <PiArrowDropDownLine 
          className={`transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </Button>
      
      {isOpen && (
        <div className="absolute top-full mt-1 w-full bg-white border rounded-md shadow-lg">
          <div className="p-2">Dropdown content</div>
        </div>
      )}
    </div>
  );
}

// Usage in a select component
export function CustomSelect({ options, value, onChange }) {
  return (
    <div className="relative">
      <select 
        value={value} 
        onChange={onChange}
        className="appearance-none pr-8 border rounded px-3 py-2"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <PiArrowDropDownLine 
        className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
        width={16}
        height={16}
      />
    </div>
  );
}

// Usage with custom styling
export function StyledDropdownIcon() {
  return (
    <PiArrowDropDownLine 
      className="text-blue-600 hover:text-blue-700"
      style={{ fontSize: '20px' }}
    />
  );
}
```

## Functionality

- **SVG Rendering**: Renders a crisp, scalable arrow icon using SVG format
- **Responsive Sizing**: Uses `1em` dimensions by default, making it scale with font size
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent elements
- **Accessibility**: Proper SVG structure with defined viewBox for screen readers
- **Customization**: Accepts all standard SVG props for flexible styling and behavior
- **Rotation Support**: Can be easily animated or rotated using CSS transforms

## State Management

**No State Management** - This is a stateless presentational component that doesn't manage any internal state. It renders based solely on the props passed to it. Any state management for dropdown open/close states or selection values should be handled by parent components.

## Side Effects

**No Side Effects** - The component has no side effects, API calls, or external interactions. It's a pure function that renders SVG markup based on input props.

## Dependencies

### Internal Dependencies
- `React.SVGProps` - TypeScript interface for SVG element properties

### External Dependencies
- **None** - No external libraries or services required

### Peer Dependencies
- React (implicit) - Core React library for JSX rendering

## Integration

This component integrates into the application architecture as:

- **UI Layer Component**: Part of the base icon system in `/components/icons/`
- **Design System**: Maintains consistency with Phosphor Icons design language
- **Reusable Asset**: Can be imported and used across any feature domain
- **Server-Side Friendly**: Renders efficiently in SSR/SSG contexts
- **Theme Integration**: Inherits colors and sizing from design system tokens

### Common Integration Patterns

```tsx
// In form components
import { PiArrowDropDownLine } from '@/components/icons/pi/pi-arrow-drop-down-line';
import { Select } from '@/components/ui/select';

// In navigation components
import { DropdownMenu } from '@/components/ui/dropdown-menu';

// In data tables for sorting
import { DataTable } from '@/components/ui/data-table';
```

## Best Practices

### ✅ Adherence to Architecture Patterns

- **Flat Component Structure**: Simple, single-purpose icon component without nested complexity
- **Server Component Default**: No unnecessary client-side JavaScript
- **Props Interface**: Clean TypeScript interface extending standard SVG props
- **Reusability**: Located in shared `/icons/` directory for cross-domain usage

### ✅ Recommended Usage

```tsx
// Use with semantic HTML
<button aria-expanded={isOpen}>
  Menu <PiArrowDropDownLine aria-hidden="true" />
</button>

// Combine with transitions
<PiArrowDropDownLine 
  className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
/>

// Size consistently with text
<span className="text-lg">
  <PiArrowDropDownLine /> {/* Automatically scales */}
</span>
```

### ❌ Anti-patterns to Avoid

```tsx
// Don't use for non-dropdown contexts
<PiArrowDropDownLine /> // in navigation breadcrumbs

// Don't override core SVG attributes unnecessarily
<PiArrowDropDownLine viewBox="0 0 32 32" /> // breaks icon design

// Don't use without proper semantic context
<PiArrowDropDownLine /> // floating without associated interactive element
```

### Performance Considerations

- **Bundle Size**: Minimal impact due to simple SVG structure
- **Runtime Performance**: No JavaScript execution overhead
- **Accessibility**: Include `aria-hidden="true"` when purely decorative
- **SEO**: Server-rendered, no impact on search indexing