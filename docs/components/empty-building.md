# EmptyBuilding Icon Component

## Purpose

The `EmptyBuilding` component is an SVG icon representing an empty building or vacant property. It displays two overlapping building structures with windows in a circular container, designed to communicate the concept of empty or available real estate. This icon is commonly used in property management systems, real estate applications, or dashboard interfaces to indicate vacant buildings or empty property listings.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup. It doesn't require client-side JavaScript, event handling, or browser APIs, making it ideal as a server component for optimal performance and SEO.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | - | All standard SVG element props including className, style, onClick, etc. Spreads to the root SVG element |

**Inherited SVG Props Include:**
- `className` - CSS class names for styling
- `style` - Inline styles object
- `onClick` - Click event handler
- `width` - Override default width (20px)
- `height` - Override default height (20px)
- `fill` - Override fill colors
- `stroke` - Stroke properties

## Usage Example

```tsx
import { EmptyBuilding } from '@/components/icons/empty-building';

// Basic usage
export function PropertyCard() {
  return (
    <div className="property-card">
      <EmptyBuilding />
      <span>No tenants</span>
    </div>
  );
}

// With custom styling
export function VacancyIndicator() {
  return (
    <div className="vacancy-status">
      <EmptyBuilding 
        className="text-gray-400 hover:text-gray-600" 
        width={24} 
        height={24}
      />
      <p>Building Available</p>
    </div>
  );
}

// Interactive usage
export function ClickableIcon() {
  const handleClick = () => {
    console.log('Empty building clicked');
  };

  return (
    <EmptyBuilding 
      onClick={handleClick}
      className="cursor-pointer transition-colors hover:opacity-75"
      role="button"
      tabIndex={0}
    />
  );
}

// In property management dashboard
export function PropertyStatus({ vacancy }: { vacancy: boolean }) {
  return (
    <div className="flex items-center gap-2">
      {vacancy ? (
        <>
          <EmptyBuilding className="text-orange-500" />
          <span className="text-orange-700">Vacant</span>
        </>
      ) : (
        <>
          <OccupiedBuilding className="text-green-500" />
          <span className="text-green-700">Occupied</span>
        </>
      )}
    </div>
  );
}
```

## Functionality

### Visual Design
- **Circular Container**: 20x20px circular background with light blue fill
- **Two-Building Structure**: Overlapping buildings of different heights creating depth
- **Window Details**: Multiple rectangular windows on each building
- **Transparency Effects**: Semi-transparent overlays with backdrop blur filters
- **Color Scheme**: Neutral grays and whites with subtle blue background

### Accessibility Features
- Proper SVG structure with defined viewBox for scalability
- Can accept ARIA attributes through props spreading
- Supports focus and click events for interactive usage

### Responsive Design
- Vector-based SVG scales cleanly at any size
- Default 20x20px optimized for UI elements
- Maintains aspect ratio and visual clarity when resized

## State Management

**No State Management Required** - This is a stateless presentational component that only renders SVG markup. It doesn't manage any internal state, server state, or client state.

## Side Effects

**No Side Effects** - Pure functional component with no:
- API calls
- External service interactions
- DOM manipulations
- Browser storage access
- Event subscriptions

## Dependencies

### Internal Dependencies
- React's `SVGProps` type for proper TypeScript support

### External Dependencies
- None - completely self-contained component

### Related Components
- Other icon components in `/components/icons/`
- UI components that display property status
- Dashboard components showing building information

## Integration

### Icon System Integration
```tsx
// Part of a comprehensive icon library
export { EmptyBuilding } from './empty-building';
export { OccupiedBuilding } from './occupied-building';
export { BuildingComplex } from './building-complex';
```

### Property Management System
```tsx
// Used in property cards, status indicators, and filters
export function PropertyGrid({ properties }: { properties: Property[] }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {properties.map(property => (
        <PropertyCard 
          key={property.id}
          property={property}
          icon={property.vacant ? EmptyBuilding : OccupiedBuilding}
        />
      ))}
    </div>
  );
}
```

### Dashboard Components
```tsx
// Integrated with data visualization
export function VacancyStats({ stats }: { stats: VacancyData }) {
  return (
    <div className="stats-card">
      <div className="flex items-center gap-2">
        <EmptyBuilding className="text-2xl" />
        <span>{stats.vacantCount} Empty Buildings</span>
      </div>
    </div>
  );
}
```

## Best Practices

### Architecture Compliance
- ✅ **Server Component**: No client-side requirements, optimal for performance
- ✅ **Component Decomposition**: Single responsibility, flat structure
- ✅ **Reusability**: Generic icon usable across different contexts
- ✅ **TypeScript**: Proper typing with SVGProps extension

### Usage Guidelines
```tsx
// ✅ Good: Clean, semantic usage
<EmptyBuilding className="vacancy-icon" />

// ✅ Good: Proper event handling
<EmptyBuilding onClick={handleVacancyClick} role="button" />

// ✅ Good: Consistent sizing
<EmptyBuilding width={16} height={16} />

// ❌ Avoid: Inline styles for complex styling
<EmptyBuilding style={{ transform: 'rotate(45deg) scale(2)' }} />

// ✅ Better: Use CSS classes
<EmptyBuilding className="rotate-45 scale-200" />
```

### Performance Optimization
- Server-side rendering by default
- No JavaScript bundle impact
- Efficient SVG markup with reusable filter definitions
- Scales without quality loss

### Accessibility Considerations
```tsx
// For decorative usage
<EmptyBuilding aria-hidden="true" />

// For interactive usage
<EmptyBuilding 
  role="button"
  aria-label="View vacant buildings"
  tabIndex={0}
/>

// For informational usage
<EmptyBuilding aria-label="Building is vacant" />
```