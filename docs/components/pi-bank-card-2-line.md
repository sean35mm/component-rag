# PiBankCard2Line Icon Component

## Purpose

The `PiBankCard2Line` component is a specialized SVG icon component that renders a line-style bank card/credit card icon. It's part of the Phosphor Icons library integration and is designed to display bank card related visual elements throughout the application, particularly in financial interfaces, payment forms, and banking features.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactions, state management, or browser APIs. It can be safely rendered on the server side for optimal performance.

## Props Interface

| Prop Name | Type | Required | Description |
|-----------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Spread to the root `<svg>` element |

### Common SVG Props
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role
- `tabIndex` - Tab navigation index

## Usage Example

```tsx
import { PiBankCard2Line } from '@/components/icons/pi/pi-bank-card-2-line';

// Basic usage
export default function PaymentMethodSelector() {
  return (
    <div className="payment-options">
      <button className="flex items-center gap-2 p-3 border rounded-lg">
        <PiBankCard2Line className="w-5 h-5 text-gray-600" />
        <span>Credit Card</span>
      </button>
    </div>
  );
}

// With interaction and accessibility
export default function BankingDashboard() {
  return (
    <div className="banking-features">
      <button 
        className="feature-card"
        onClick={() => navigateToCards()}
        aria-label="Manage bank cards"
      >
        <PiBankCard2Line 
          className="w-8 h-8 text-blue-600 mb-2"
          aria-hidden="true"
        />
        <h3>My Cards</h3>
        <p>View and manage your bank cards</p>
      </button>
    </div>
  );
}

// In form context
export default function PaymentForm() {
  return (
    <form className="payment-form">
      <div className="form-field">
        <label className="flex items-center gap-2 font-medium">
          <PiBankCard2Line className="w-4 h-4" />
          Card Information
        </label>
        <input type="text" placeholder="Card number" />
      </div>
    </form>
  );
}
```

## Functionality

### Core Features
- **SVG Rendering**: Displays a detailed line-style bank card icon with card outline and stripe details
- **Responsive Sizing**: Uses `1em` dimensions that scale with font size of parent container
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent elements
- **Accessibility Ready**: Accepts all standard ARIA attributes for screen reader compatibility

### Visual Elements
- Bank card outline with rounded corners
- Horizontal stripe detail (representing magnetic strip)
- Small rectangular element (representing chip or security code area)
- Clean line-style design suitable for various UI contexts

## State Management

**No State Management** - This is a stateless presentational component that doesn't require any state management solution (TanStack Query, Zustand, or local state).

## Side Effects

**No Side Effects** - This component is a pure function with no side effects, API calls, or external interactions. It only renders SVG markup based on props.

## Dependencies

### Internal Dependencies
- React's `SVGProps` type for TypeScript prop validation

### External Dependencies
- None - this is a self-contained SVG component

### Related Components
- Other Phosphor icon components in `/components/icons/pi/` directory
- UI components that might use this icon (buttons, cards, forms)

## Integration

### Application Architecture Integration
- **UI Layer**: Used as a visual element in UI components for banking and payment interfaces
- **Component Composition**: Can be composed within buttons, cards, form labels, and navigation elements
- **Design System**: Part of the icon system supporting consistent visual language across financial features
- **Feature Domains**: Integrates with banking, payments, and financial management feature areas

### Common Integration Patterns
```tsx
// In navigation menus
<NavigationItem icon={PiBankCard2Line} label="Cards" href="/cards" />

// In feature cards
<FeatureCard 
  icon={PiBankCard2Line} 
  title="Payment Methods" 
  description="Manage your cards and payment options"
/>

// In form field groups
<FormFieldGroup icon={PiBankCard2Line} title="Card Details">
  <CardNumberField />
  <ExpiryField />
  <CVVField />
</FormFieldGroup>
```

## Best Practices

### Architectural Adherence
- ✅ **Server Component**: Correctly implemented as server component for optimal performance
- ✅ **Component Decomposition**: Simple, focused component that can be easily composed with other components
- ✅ **Reusability**: Located in `/components/icons/` following UI component organization patterns
- ✅ **Flat Structure**: No nested components, simple composition

### Usage Recommendations
- Always provide `aria-label` when icon is interactive or provides important context
- Use `aria-hidden="true"` when icon is purely decorative alongside text
- Size appropriately using CSS classes rather than inline width/height props
- Maintain color contrast ratios when styling with custom colors
- Consider loading performance by importing only needed icons

### Integration Best Practices
- Combine with semantic HTML elements for proper accessibility
- Use consistent sizing patterns across similar UI contexts
- Leverage CSS custom properties for theme-aware coloring
- Group related icons using consistent visual patterns