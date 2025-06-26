# PiPhoneLine Component

## Purpose
The `PiPhoneLine` component is an SVG icon component that renders a phone line icon. It's part of the Phosphor Icons (pi) collection and is designed to be used throughout the application for representing phone-related functionality, contact information, or communication features.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup. It doesn't require any client-side interactivity, state management, or browser APIs, making it suitable for server-side rendering by default.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | - | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

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
import { PiPhoneLine } from '@/components/icons/pi/pi-phone-line';

// Basic usage
export default function ContactCard() {
  return (
    <div className="flex items-center gap-2">
      <PiPhoneLine />
      <span>+1 (555) 123-4567</span>
    </div>
  );
}

// With custom styling
export default function PhoneButton() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded">
      <PiPhoneLine className="text-lg" />
      Call Now
    </button>
  );
}

// As clickable icon with event handler
export default function ContactActions() {
  const handleCall = () => {
    window.open('tel:+15551234567');
  };

  return (
    <PiPhoneLine 
      className="w-6 h-6 cursor-pointer hover:text-blue-500 transition-colors"
      onClick={handleCall}
      aria-label="Call phone number"
      role="button"
    />
  );
}

// In a form or UI component
export default function ContactForm() {
  return (
    <div className="space-y-4">
      <div className="relative">
        <PiPhoneLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input 
          type="tel" 
          placeholder="Phone number"
          className="pl-10 pr-4 py-2 border rounded-md w-full"
        />
      </div>
    </div>
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisp at any size using SVG format
- **Responsive Sizing**: Uses `1em` dimensions to scale with font size
- **Theme Integration**: Uses `currentColor` fill to inherit text color
- **Accessibility Ready**: Accepts ARIA props for screen reader support
- **Flexible Styling**: Accepts all standard SVG props for customization

### Visual Characteristics
- **Viewbox**: 24x24 coordinate system
- **Style**: Outlined/line style phone icon
- **Fill Rule**: Uses `evenodd` for consistent rendering
- **Default Size**: 1em × 1em (scales with font size)

## State Management
**No State Management** - This is a stateless presentational component that doesn't manage any internal state or require external state management solutions.

## Side Effects
**No Side Effects** - This component has no side effects, API calls, or external interactions. It's a pure function that renders SVG markup based on props.

## Dependencies

### Internal Dependencies
- `react` - Uses `SVGProps` type for prop typing
- No other internal dependencies

### External Dependencies
- None - This is a self-contained SVG icon component

## Integration

### Within Application Architecture
- **UI Layer**: Lives in `/components/icons/pi/` following the icon organization pattern
- **Design System**: Part of the Phosphor Icons collection for consistent iconography
- **Reusability**: Can be used across all application domains (forms, buttons, navigation, etc.)
- **Theme Integration**: Inherits colors from design system via `currentColor`

### Common Integration Patterns
```tsx
// In navigation components
import { PiPhoneLine } from '@/components/icons/pi/pi-phone-line';

// In contact-related features
import { PiPhoneLine } from '@/components/icons/pi/pi-phone-line';

// In form components with other UI elements
import { PiPhoneLine } from '@/components/icons/pi/pi-phone-line';
import { Input } from '@/components/ui/input';
```

## Best Practices

### Architectural Adherence
✅ **Server Component Default**: Correctly implemented as server component  
✅ **Component Decomposition**: Simple, focused, single-responsibility component  
✅ **Reusability**: Highly reusable across different application domains  
✅ **Type Safety**: Properly typed with TypeScript interfaces  

### Usage Best Practices

#### Accessibility
```tsx
// Always provide context for screen readers
<PiPhoneLine aria-label="Phone number" />

// Use semantic roles when interactive
<PiPhoneLine role="button" onClick={handleCall} />
```

#### Styling
```tsx
// Use Tailwind classes for consistent sizing
<PiPhoneLine className="w-4 h-4" /> // Small
<PiPhoneLine className="w-6 h-6" /> // Medium  
<PiPhoneLine className="w-8 h-8" /> // Large

// Leverage currentColor for theme integration
<div className="text-blue-500">
  <PiPhoneLine /> {/* Will be blue */}
</div>
```

#### Performance
```tsx
// Component is lightweight and doesn't require memoization
// Can be used freely without performance concerns
<PiPhoneLine className="inline" />
```

### Integration with Other Patterns
- **Forms**: Combine with React Hook Form and Zod validation
- **Buttons**: Use within button components for visual enhancement
- **Navigation**: Include in menu items and navigation components
- **Data Display**: Use in contact cards, user profiles, and listings