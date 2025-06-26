# PiMapPin2Line Icon Component

## Purpose

The `PiMapPin2Line` component is an SVG-based icon that renders a map pin location marker with an inner circle detail. It's part of the Phosphor Icons collection and is designed to represent geographical locations, addresses, or points of interest in user interfaces. This component is commonly used in maps, location pickers, address forms, and any UI element that needs to indicate a specific location.

## Component Type

**Server Component** - This is a server-rendered component that outputs static SVG markup. It doesn't require client-side JavaScript for interactivity, making it ideal for server-side rendering. The component only needs client-side hydration when used within interactive elements or when receiving dynamic props.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Spread props allow full customization of the SVG element. |

### Common SVG Props
- `className`: CSS classes for styling
- `style`: Inline styles
- `onClick`: Click event handler
- `aria-label`: Accessibility label
- `role`: ARIA role
- `width`: Override default width (defaults to '1em')
- `height`: Override default height (defaults to '1em')

## Usage Example

```tsx
import { PiMapPin2Line } from '@/components/icons/pi/pi-map-pin-2-line';

// Basic usage
export function LocationIndicator() {
  return (
    <div className="flex items-center gap-2">
      <PiMapPin2Line className="text-red-500" />
      <span>123 Main Street, City, State</span>
    </div>
  );
}

// Interactive usage in a button
export function LocationButton() {
  return (
    <button 
      className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
      onClick={() => openLocationPicker()}
    >
      <PiMapPin2Line className="w-5 h-5 text-blue-600" />
      Select Location
    </button>
  );
}

// Usage in a form field
export function AddressField() {
  return (
    <div className="relative">
      <input 
        type="text" 
        placeholder="Enter address"
        className="pl-10 pr-4 py-2 border rounded-lg w-full"
      />
      <PiMapPin2Line 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
        aria-hidden="true"
      />
    </div>
  );
}

// Sized variants
export function LocationCards() {
  return (
    <div className="space-y-4">
      {/* Small */}
      <div className="flex items-center gap-2">
        <PiMapPin2Line className="w-4 h-4 text-gray-500" />
        <span className="text-sm">Office Location</span>
      </div>
      
      {/* Medium */}
      <div className="flex items-center gap-3">
        <PiMapPin2Line className="w-6 h-6 text-blue-600" />
        <span>Primary Address</span>
      </div>
      
      {/* Large */}
      <div className="flex items-center gap-4">
        <PiMapPin2Line className="w-8 h-8 text-red-500" />
        <span className="text-lg font-medium">Store Location</span>
      </div>
    </div>
  );
}
```

## Functionality

- **Scalable Vector Icon**: Renders as crisp SVG at any size using `1em` dimensions that scale with font size
- **Color Inheritance**: Uses `fill='currentColor'` to inherit text color from parent elements
- **Accessibility Ready**: Accepts ARIA attributes for screen reader compatibility
- **Customizable**: All SVG properties can be overridden through props
- **Responsive Design**: Scales appropriately with text size and container dimensions
- **Event Handling**: Supports all standard DOM events (click, hover, focus, etc.)

## State Management

This component is **stateless** and doesn't require any state management solutions:
- No internal state - pure presentation component
- No TanStack Query usage - no data fetching
- No Zustand store integration - no global state
- Props-driven rendering only

## Side Effects

**No side effects** - This component:
- Makes no API calls
- Performs no DOM manipulation beyond rendering
- Has no lifecycle effects or subscriptions
- Doesn't interact with external services
- Pure function component with predictable output

## Dependencies

### Internal Dependencies
- `React.SVGProps<SVGSVGElement>` type from React

### External Dependencies
- None - completely self-contained component

### Runtime Dependencies
- React (peer dependency)
- No additional libraries required

## Integration

### Within Our Architecture
```tsx
// UI Component Layer (/components/ui/)
import { PiMapPin2Line } from '@/components/icons/pi/pi-map-pin-2-line';

// Feature Components (by domain)
export function LocationPicker() {
  return (
    <button className="location-btn">
      <PiMapPin2Line />
      Choose Location
    </button>
  );
}

// Forms with React Hook Form
import { useFormContext } from 'react-hook-form';

export function AddressInput() {
  const { register } = useFormContext();
  
  return (
    <div className="relative">
      <PiMapPin2Line className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
      <input {...register('address')} className="pl-10" />
    </div>
  );
}

// With TanStack Query data
export function LocationsList() {
  const { data: locations } = useQuery({
    queryKey: ['locations'],
    queryFn: fetchLocations
  });

  return (
    <div>
      {locations?.map(location => (
        <div key={location.id} className="flex items-center gap-2">
          <PiMapPin2Line className="text-blue-600" />
          <span>{location.name}</span>
        </div>
      ))}
    </div>
  );
}
```

### Design System Integration
- Consistent with Phosphor Icons design language
- Follows our icon sizing conventions (w-4 h-4, w-5 h-5, w-6 h-6)
- Uses Tailwind color utilities for theming
- Integrates with our component spacing system

## Best Practices

### Architecture Compliance
✅ **Server Component**: Used correctly as a stateless, server-renderable component  
✅ **Component Decomposition**: Single responsibility - renders one specific icon  
✅ **Reusability**: Placed in appropriate location for cross-domain usage  
✅ **Type Safety**: Properly typed with TypeScript  

### Implementation Guidelines

1. **Use Semantic HTML**
   ```tsx
   <button aria-label="Select location">
     <PiMapPin2Line aria-hidden="true" />
   </button>
   ```

2. **Consistent Sizing**
   ```tsx
   // Good - use standard sizes
   <PiMapPin2Line className="w-5 h-5" />
   
   // Avoid - arbitrary sizes
   <PiMapPin2Line className="w-[17px] h-[17px]" />
   ```

3. **Color Through Classes**
   ```tsx
   // Good - semantic colors
   <PiMapPin2Line className="text-primary" />
   <PiMapPin2Line className="text-red-500" />
   
   // Avoid - inline styles
   <PiMapPin2Line style={{color: '#ef4444'}} />
   ```

4. **Accessibility**
   ```tsx
   // Decorative use
   <PiMapPin2Line aria-hidden="true" />
   
   // Semantic use
   <PiMapPin2Line aria-label="Location" role="img" />
   ```

5. **Performance**
   - Component is already optimized for SSR
   - No additional optimization needed
   - Use React.memo() only if parent re-renders frequently with same props