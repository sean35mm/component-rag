# PiBuilding2Fill Icon Component

## Purpose

The `PiBuilding2Fill` component is a presentational SVG icon that renders a filled building illustration with two connected structures. This icon is part of the Phosphor Icons collection and is used throughout the application to represent buildings, offices, real estate, or corporate entities in user interfaces.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, event handlers, or state management. It can be safely rendered on the server side for optimal performance.

## Props Interface

| Prop Name | Type | Required | Description |
|-----------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Spread to the root `<svg>` element |

### Common SVG Props
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler (requires 'use client' in parent)
- `aria-label` - Accessibility label
- `role` - ARIA role attribute
- `width`/`height` - Override default 1em sizing

## Usage Example

```tsx
import { PiBuilding2Fill } from '@/components/icons/pi/pi-building-2-fill';

// Basic usage
export function PropertyCard() {
  return (
    <div className="flex items-center gap-2">
      <PiBuilding2Fill className="text-blue-600" />
      <span>Office Building</span>
    </div>
  );
}

// With custom styling and accessibility
export function RealEstateHeader() {
  return (
    <header className="flex items-center">
      <PiBuilding2Fill 
        className="w-8 h-8 text-slate-700 mr-3"
        aria-label="Buildings"
        role="img"
      />
      <h1>Property Management</h1>
    </header>
  );
}

// In a navigation menu
export function SidebarNav() {
  return (
    <nav>
      <a href="/properties" className="nav-link">
        <PiBuilding2Fill className="w-5 h-5" />
        Properties
      </a>
    </nav>
  );
}

// With dynamic styling
export function PropertyStatus({ isActive }: { isActive: boolean }) {
  return (
    <PiBuilding2Fill 
      className={`w-6 h-6 ${isActive ? 'text-green-600' : 'text-gray-400'}`}
    />
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisp at any size using SVG format
- **Responsive Sizing**: Defaults to `1em` width/height, inheriting font size from parent
- **Color Inheritance**: Uses `currentColor` fill, automatically inheriting text color
- **Accessibility Ready**: Accepts ARIA attributes for screen reader compatibility
- **Customizable**: All SVG props can be overridden for styling and behavior

### Visual Design
- Depicts two connected building structures with filled styling
- Left building shows multiple floors with window details
- Right building appears as an additional connected structure
- Clean, modern line work suitable for professional interfaces

## State Management

**No State Management** - This is a pure presentational component with no internal state. It simply renders SVG markup based on the props passed to it.

## Side Effects

**No Side Effects** - This component performs no API calls, side effects, or external interactions. It's a pure rendering function.

## Dependencies

### Direct Dependencies
- `react` - For `SVGProps` type definition

### No Internal Dependencies
- Does not depend on other custom components, hooks, or services
- Completely self-contained and reusable

## Integration

### Application Architecture Role
- **UI Layer**: Sits in the base UI component layer (`/components/icons/`)
- **Cross-Domain Usage**: Can be used across all feature domains (real estate, corporate, navigation, etc.)
- **Design System**: Part of the standardized icon system for consistent visual language
- **Atomic Component**: Follows atomic design principles as a foundational UI atom

### Common Integration Patterns
```tsx
// In feature components
export function PropertyListItem({ property }: { property: Property }) {
  return (
    <div className="property-card">
      <PiBuilding2Fill className="property-icon" />
      <span>{property.name}</span>
    </div>
  );
}

// In layout components
export function DashboardSidebar() {
  return (
    <aside>
      <NavItem icon={PiBuilding2Fill} label="Buildings" href="/buildings" />
    </aside>
  );
}

// With other UI components
import { Button } from '@/components/ui/button';

export function AddPropertyButton() {
  return (
    <Button variant="outline">
      <PiBuilding2Fill className="mr-2 h-4 w-4" />
      Add Property
    </Button>
  );
}
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: No client-side state or interactivity
- ✅ **Atomic Design**: Pure UI atom with single responsibility
- ✅ **Prop Forwarding**: Properly spreads SVG props for maximum flexibility
- ✅ **Type Safety**: Uses proper TypeScript interfaces from React

### Usage Recommendations
- Always provide `aria-label` when used without accompanying text
- Use semantic sizing (`w-4 h-4`, `w-5 h-5`) rather than arbitrary values
- Leverage `currentColor` by setting text color on parent elements
- Combine with other UI components rather than building complex layouts internally

### Performance Considerations
- Renders on server by default for optimal loading performance
- No JavaScript bundle impact beyond the component definition
- SVG format ensures minimal file size and infinite scalability
- Can be safely used in lists or repeated elements without performance concerns