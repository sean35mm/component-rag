# PiMapPin2Fill Component

## Purpose

The `PiMapPin2Fill` component is a filled map pin icon that represents location markers, addresses, or geographical points of interest within the application. It's part of the Phosphor Icons (Pi) library integration and provides a visual indicator for location-related features such as store locations, delivery addresses, or map markers.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG content without any client-side interactivity, state management, or browser APIs. It can be rendered on the server and doesn't require the 'use client' directive.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | - | All standard SVG element props including className, style, onClick, etc. Spread to the root SVG element |
| `width` | `string \| number` | Optional | `'1em'` | Width of the icon (inherited via props spread) |
| `height` | `string \| number` | Optional | `'1em'` | Height of the icon (inherited via props spread) |
| `fill` | `string` | Optional | `'currentColor'` | Fill color of the icon (inherited via props spread) |
| `className` | `string` | Optional | - | CSS classes for styling the icon |
| `onClick` | `MouseEventHandler` | Optional | - | Click handler for interactive usage |

## Usage Example

```tsx
import { PiMapPin2Fill } from '@/components/icons/pi/pi-map-pin-2-fill';

// Basic usage
export function LocationIndicator() {
  return (
    <div className="flex items-center gap-2">
      <PiMapPin2Fill className="text-red-500" />
      <span>Current Location</span>
    </div>
  );
}

// Interactive usage with click handler
export function LocationSelector({ onLocationSelect }: { onLocationSelect: () => void }) {
  return (
    <button 
      onClick={onLocationSelect}
      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
    >
      <PiMapPin2Fill className="text-blue-600 w-5 h-5" />
      <span>Select Location</span>
    </button>
  );
}

// Styled usage in a map component
export function MapMarker({ isActive }: { isActive: boolean }) {
  return (
    <PiMapPin2Fill 
      className={`w-6 h-6 transition-colors ${
        isActive ? 'text-red-600' : 'text-gray-400'
      }`}
    />
  );
}

// Usage in forms with proper sizing
export function AddressField() {
  return (
    <div className="relative">
      <PiMapPin2Fill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <input 
        type="text" 
        placeholder="Enter address"
        className="pl-10 pr-4 py-2 border rounded-lg w-full"
      />
    </div>
  );
}
```

## Functionality

- **SVG Icon Rendering**: Renders a filled map pin icon using SVG paths
- **Responsive Sizing**: Uses `1em` dimensions by default, scaling with parent font size
- **Color Inheritance**: Uses `currentColor` for fill, inheriting text color from parent
- **Full Props Spreading**: Accepts and forwards all standard SVG element properties
- **Accessibility Ready**: Can accept ARIA attributes and other accessibility props

## State Management

**No State Management** - This is a stateless presentational component that doesn't manage any internal state, server state, or global state. It purely renders based on the props provided.

## Side Effects

**No Side Effects** - The component has no side effects, API calls, or external interactions. It's a pure rendering component that outputs consistent SVG markup based on input props.

## Dependencies

### Internal Dependencies
- `React.SVGProps<SVGSVGElement>` - TypeScript interface for SVG element props

### External Dependencies
- **React** - Core React library for component definition and props typing

### No Component Dependencies
- Standalone icon component with no dependencies on other application components
- No custom hooks, services, or utilities required

## Integration

### Application Architecture Integration

```tsx
// Feature component integration
export function StoreLocator() {
  const { data: stores } = useStoresQuery();
  
  return (
    <div className="space-y-4">
      {stores?.map(store => (
        <div key={store.id} className="flex items-center gap-3 p-4 border rounded-lg">
          <PiMapPin2Fill className="text-red-500 w-5 h-5" />
          <div>
            <h3 className="font-semibold">{store.name}</h3>
            <p className="text-gray-600">{store.address}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Form integration with validation
export function LocationForm() {
  const { register, handleSubmit } = useForm<LocationFormData>();
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative">
        <PiMapPin2Fill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          {...register('address', { required: true })}
          className="pl-10 pr-4 py-2 border rounded-lg w-full"
          placeholder="Enter location"
        />
      </div>
    </form>
  );
}
```

### Design System Integration
- Follows consistent icon sizing patterns (`1em` default)
- Integrates with design system color tokens via `currentColor`
- Maintains consistent visual weight with other filled icons

## Best Practices

### Architectural Adherence

✅ **Server Component Pattern**: Correctly implemented as a server component without unnecessary client-side overhead

✅ **Component Decomposition**: Single-responsibility component that can be composed into larger UI blocks

✅ **Reusability**: Placed in `/components/icons/` following the UI component organization pattern

### Usage Best Practices

```tsx
// ✅ Good: Semantic usage with proper sizing
<div className="flex items-center gap-2">
  <PiMapPin2Fill className="w-4 h-4 text-red-500" />
  <span>Store Location</span>
</div>

// ✅ Good: Accessible interactive usage
<button
  onClick={selectLocation}
  aria-label="Select location on map"
  className="p-2 hover:bg-gray-100 rounded"
>
  <PiMapPin2Fill className="w-5 h-5" />
</button>

// ❌ Avoid: Inline styles over Tailwind classes
<PiMapPin2Fill style={{ color: 'red', width: '20px' }} />

// ❌ Avoid: Non-semantic usage
<PiMapPin2Fill className="w-8 h-8" /> {/* Used as decoration without context */}
```

### Performance Considerations
- Lightweight SVG rendering with no JavaScript overhead
- Can be tree-shaken if not used
- Optimized for server-side rendering
- No runtime dependencies beyond React