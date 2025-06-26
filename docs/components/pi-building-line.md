# PiBuildingLine Icon Component

## Purpose

The `PiBuildingLine` component is an SVG icon component that renders a line-style building icon. It's part of the icon system and provides a visual representation of buildings, offices, or real estate elements within the application interface.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

### Common SVG Props
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role |

## Usage Example

```tsx
import { PiBuildingLine } from '@/components/icons/pi/pi-building-line';

// Basic usage
export function PropertyCard() {
  return (
    <div className="flex items-center gap-2">
      <PiBuildingLine />
      <span>Office Building</span>
    </div>
  );
}

// With custom styling
export function RealEstateHeader() {
  return (
    <div className="flex items-center">
      <PiBuildingLine 
        className="w-6 h-6 text-blue-600 mr-3" 
        aria-label="Building icon"
      />
      <h1>Property Management</h1>
    </div>
  );
}

// Interactive usage
export function PropertyTypeButton({ onSelect }: { onSelect: () => void }) {
  return (
    <button 
      onClick={onSelect}
      className="flex items-center gap-2 p-3 hover:bg-gray-100 rounded-lg"
    >
      <PiBuildingLine className="text-gray-700" />
      <span>Commercial Buildings</span>
    </button>
  );
}

// In navigation or menus
export function SidebarNavigation() {
  return (
    <nav>
      <Link href="/properties" className="nav-item">
        <PiBuildingLine className="nav-icon" />
        Properties
      </Link>
    </nav>
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisp at any size using SVG format
- **Theme Integration**: Uses `currentColor` fill to inherit text color from parent
- **Responsive Sizing**: Uses `1em` dimensions to scale with font size
- **Accessibility Ready**: Accepts ARIA attributes for screen readers
- **Style Flexible**: Accepts all standard SVG props for customization

### Visual Design
- **Style**: Line/outline style building icon
- **Viewbox**: 24x24 coordinate system
- **Elements**: Building structure with windows and entrance door
- **Fill Rule**: Uses `evenodd` for consistent rendering

## State Management

**No State Management** - This is a stateless presentational component. It doesn't manage any internal state, server state, or client state. All styling and behavior is controlled through props.

## Side Effects

**No Side Effects** - This component is pure and doesn't perform any:
- API calls
- Local storage operations
- Browser API interactions
- Event subscriptions
- External service calls

## Dependencies

### Internal Dependencies
- `React.SVGProps` type from React for prop typing

### External Dependencies
- None - This is a self-contained component

### Related Components
- Other icon components in `/components/icons/pi/`
- UI components that accept icon props
- Button, Card, and navigation components that commonly use icons

## Integration

### Application Architecture
```
src/
├── components/
│   ├── icons/
│   │   └── pi/
│   │       └── pi-building-line.tsx  # This component
│   ├── ui/                          # May consume this icon
│   └── features/                    # Feature components using this icon
```

### Common Integration Patterns
- **Feature Components**: Used in property, real estate, or facility management features
- **Navigation**: Sidebar and menu items for building-related sections
- **Cards and Lists**: Property listings, building directories
- **Buttons**: Action buttons for building-related operations
- **Forms**: Icon indicators for building type selection

## Best Practices

### Architecture Adherence
✅ **Server Component**: Correctly implemented as server component
✅ **Component Decomposition**: Single responsibility (renders one icon)
✅ **Reusability**: Generic icon component usable across features
✅ **Flat Structure**: No unnecessary nesting or complexity

### Usage Recommendations
```tsx
// ✅ Good: Semantic usage with proper ARIA
<PiBuildingLine aria-label="Office building" className="text-blue-600" />

// ✅ Good: Consistent sizing with design system
<PiBuildingLine className="w-5 h-5" />

// ✅ Good: Proper color inheritance
<div className="text-gray-700">
  <PiBuildingLine /> {/* Inherits gray-700 color */}
</div>

// ❌ Avoid: Hardcoded styles that break design consistency
<PiBuildingLine style={{ color: '#ff0000', width: '23px' }} />
```

### Accessibility
- Always provide `aria-label` when icon has semantic meaning
- Use `aria-hidden="true"` when icon is purely decorative
- Ensure sufficient color contrast when styling
- Consider icon alternatives for users who prefer reduced motion