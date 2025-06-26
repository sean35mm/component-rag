# PiBuilding2Line Icon Component

## Purpose
The `PiBuilding2Line` component is a specialized SVG icon component that renders a stylized building outline with two connected structures. It's part of the Phosphor icon library integration and provides a consistent, scalable building icon for use throughout the application interface.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server side for optimal performance.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including className, style, onClick, etc. Spread to the root SVG element |

### Inherited SVG Props
Common props you can pass through the SVG interface:
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `onMouseEnter/onMouseLeave` - Mouse event handlers
- `aria-label` - Accessibility label
- `role` - ARIA role attribute

## Usage Example

```tsx
import { PiBuilding2Line } from '@/components/icons/pi/pi-building-2-line';

// Basic usage
function PropertyCard() {
  return (
    <div className="property-card">
      <PiBuilding2Line />
      <span>Office Building</span>
    </div>
  );
}

// With custom styling
function BuildingSelector() {
  return (
    <button className="building-type-btn">
      <PiBuilding2Line 
        className="w-6 h-6 text-blue-600" 
        aria-label="Select building type"
      />
      Commercial Property
    </button>
  );
}

// With event handlers
function InteractiveBuildingIcon() {
  const handleBuildingClick = () => {
    console.log('Building icon clicked');
  };

  return (
    <PiBuilding2Line 
      className="cursor-pointer hover:text-blue-500 transition-colors"
      onClick={handleBuildingClick}
      role="button"
      aria-label="View building details"
    />
  );
}

// In navigation or menu context
function PropertyTypeFilter() {
  return (
    <div className="filter-option">
      <PiBuilding2Line className="w-4 h-4 mr-2" />
      <span>Multi-tenant Buildings</span>
    </div>
  );
}
```

## Functionality

### Core Features
- **Scalable Vector Graphics**: Renders crisp building icon at any size using `1em` width/height
- **Theme Integration**: Uses `currentColor` fill to inherit text color from parent elements
- **Accessibility Ready**: Accepts ARIA attributes for screen reader compatibility
- **Event Handling**: Supports all standard mouse and keyboard events through prop spreading
- **Responsive Design**: Automatically scales with font-size changes

### Visual Design
- Displays two connected building structures in outline style
- Left building appears taller with horizontal line details representing floors/windows
- Right building is shorter and positioned as an adjacent structure
- Clean, minimalist line art suitable for professional interfaces

## State Management
**No State Management** - This is a stateless presentational component that doesn't require any state management. It simply renders SVG markup based on the props provided.

## Side Effects
**No Side Effects** - This component has no side effects, API calls, or external interactions. It's a pure rendering component that outputs consistent SVG markup.

## Dependencies

### Internal Dependencies
- React's `SVGProps` type for proper TypeScript support

### External Dependencies
- None - This is a self-contained icon component

### Usage Context Dependencies
- Typically used alongside other icon components from the Phosphor icon set
- May be used within button, link, or card components for visual enhancement

## Integration

### Application Architecture Fit
- **UI Component Layer**: Lives in `/components/icons/pi/` as a reusable UI primitive
- **Design System**: Part of the standardized icon library for consistent visual language
- **Component Composition**: Designed to be composed within larger feature components
- **Theme System**: Integrates with CSS custom properties and Tailwind color utilities

### Common Integration Patterns
```tsx
// Property management dashboard
function PropertyTypeCard({ type, count }) {
  return (
    <Card>
      <PiBuilding2Line className="text-slate-600" />
      <div>
        <h3>{type}</h3>
        <p>{count} properties</p>
      </div>
    </Card>
  );
}

// Real estate listing filters
function PropertyFilters() {
  return (
    <FilterGroup>
      <FilterOption value="commercial">
        <PiBuilding2Line />
        Commercial
      </FilterOption>
    </FilterGroup>
  );
}
```

## Best Practices

### Architecture Adherence
✅ **Server Component**: Correctly implemented as server component for optimal performance  
✅ **Flat Component Structure**: Simple, single-purpose component without unnecessary nesting  
✅ **Reusable UI Primitive**: Properly placed in UI component layer for maximum reusability  
✅ **TypeScript Integration**: Proper typing with SVGProps interface  

### Usage Recommendations
- **Semantic Usage**: Use for representing multi-unit buildings, commercial properties, or office complexes
- **Accessibility**: Always provide `aria-label` when used as interactive elements
- **Styling**: Leverage `currentColor` by setting text color on parent elements
- **Performance**: Prefer this component over external icon libraries for better bundle optimization
- **Consistency**: Use alongside other Phosphor icons for visual consistency

### Integration Patterns
- Compose within domain-specific components rather than using directly in pages
- Combine with text labels for better user experience
- Use consistent sizing patterns across the application (w-4 h-4, w-6 h-6, etc.)
- Implement proper hover and focus states when used in interactive contexts