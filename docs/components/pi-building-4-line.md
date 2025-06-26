# PiBuilding4Line Component

## Purpose

The `PiBuilding4Line` component is an SVG icon component that renders a line-style building icon. This icon is part of the Phosphor Icons (pi) collection and is typically used to represent buildings, offices, commercial properties, or architectural elements in user interfaces. It provides a consistent visual representation for building-related features across the application.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any interactivity, state management, or browser-specific APIs. It can be safely rendered on the server, improving performance and SEO.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

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
import { PiBuilding4Line } from '@/components/icons/pi/pi-building-4-line';

// Basic usage
function PropertyCard() {
  return (
    <div>
      <PiBuilding4Line />
      <span>Office Building</span>
    </div>
  );
}

// With custom styling
function BuildingsList() {
  return (
    <div>
      <PiBuilding4Line 
        className="w-6 h-6 text-blue-600" 
        aria-label="Building"
      />
      <PiBuilding4Line 
        style={{ fontSize: '24px', color: '#059669' }}
      />
    </div>
  );
}

// Interactive usage
function PropertyTypeSelector() {
  const handleBuildingSelect = () => {
    // Handle building type selection
  };

  return (
    <button onClick={handleBuildingSelect} className="flex items-center gap-2">
      <PiBuilding4Line className="w-5 h-5" />
      Commercial Building
    </button>
  );
}

// In navigation or menus
function PropertyNavigation() {
  return (
    <nav>
      <a href="/buildings" className="flex items-center gap-2">
        <PiBuilding4Line className="w-4 h-4" />
        Buildings
      </a>
    </nav>
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisp at any size using SVG format
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Theme Integration**: Uses `currentColor` for fill, inheriting text color from parent
- **Accessibility Ready**: Accepts ARIA attributes for screen reader compatibility
- **Customizable**: Supports all standard SVG props for styling and interaction

### Visual Design
- Line-style building icon with windows and door elements
- Clean, minimalist design suitable for professional interfaces
- Consistent with Phosphor Icons design system
- 24x24 viewBox providing optimal clarity

## State Management

**No State Management** - This is a stateless presentational component that doesn't require any state management. It simply renders SVG markup based on the props passed to it.

## Side Effects

**No Side Effects** - This component has no side effects, API calls, or external interactions. It's a pure function that returns JSX based on its props.

## Dependencies

### Direct Dependencies
- `react` - For `SVGProps` type definition

### Related Components
- Other Phosphor Icons components in the `/icons/pi/` directory
- UI components that might use this icon (buttons, cards, navigation items)

### Integration Points
- Theme system (inherits color via `currentColor`)
- CSS framework classes (Tailwind CSS, etc.)
- Parent components that provide sizing and spacing context

## Integration

### Application Architecture Fit
```tsx
// Property management feature
src/
├── components/
│   ├── icons/pi/
│   │   └── pi-building-4-line.tsx     # This component
│   └── ui/
│       ├── button.tsx                 # May use this icon
│       └── navigation.tsx             # May use this icon
├── features/
│   └── properties/
│       ├── components/
│       │   ├── property-card.tsx      # Uses building icon
│       │   └── property-filters.tsx   # Uses building icon
│       └── pages/
│           └── buildings-list.tsx     # Uses building icon
```

### Common Integration Patterns
- **Navigation Icons**: Used in sidebar navigation for building-related sections
- **Feature Icons**: Represents building features in property listings
- **Category Icons**: Indicates building type in filters and categories
- **Action Icons**: Used in buttons for building-related actions

## Best Practices

### Architectural Alignment
✅ **Server Component Usage**: Correctly implemented as a server component since it's purely presentational
✅ **Component Decomposition**: Single responsibility - renders one specific icon
✅ **Reusability**: Placed in `/components/icons/` for application-wide reuse
✅ **Props Pattern**: Uses spread operator for maximum flexibility

### Usage Recommendations

```tsx
// ✅ Good: Semantic usage with proper accessibility
<PiBuilding4Line 
  className="w-5 h-5 text-gray-600" 
  aria-label="Office building"
  role="img"
/>

// ✅ Good: Consistent sizing using Tailwind classes
<PiBuilding4Line className="w-6 h-6" />

// ✅ Good: Color inheritance from parent
<div className="text-blue-600">
  <PiBuilding4Line /> {/* Inherits blue color */}
</div>

// ❌ Avoid: Hardcoded colors that don't match theme
<PiBuilding4Line style={{ color: '#ff0000' }} />

// ❌ Avoid: Missing accessibility attributes for interactive usage
<button onClick={handleClick}>
  <PiBuilding4Line /> {/* Should have aria-label */}
</button>
```

### Performance Considerations
- Icon is lightweight and renders efficiently as SVG
- No JavaScript bundle impact beyond the component itself
- Can be safely used in lists or repeated elements
- Consider icon sprite optimization for applications with many icons