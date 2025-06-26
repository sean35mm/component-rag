# Dollar Icon Component

## Purpose
The `Dollar` component is a reusable SVG icon component that renders a dollar sign symbol. It's designed to be used throughout the application wherever currency, pricing, or financial data needs to be visually represented. The component follows our icon system patterns with consistent sizing, coloring, and accessibility features.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGAttributes<SVGElement>` | No | `{}` | All standard SVG attributes including `className`, `style`, `onClick`, `aria-label`, etc. |

### Common SVG Attributes
| Attribute | Type | Description |
|-----------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `(event: MouseEvent) => void` | Click event handler |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role |
| `width` | `string \| number` | Override default width |
| `height` | `string \| number` | Override default height |

## Usage Example

```tsx
import { Dollar } from '@/components/icons/dollar';

// Basic usage
function PriceDisplay() {
  return (
    <div className="flex items-center gap-2">
      <Dollar />
      <span>Price</span>
    </div>
  );
}

// With custom styling
function PricingCard() {
  return (
    <div className="pricing-card">
      <Dollar 
        className="text-green-600 w-6 h-6" 
        aria-label="Price in USD"
      />
      <span className="text-2xl font-bold">299</span>
    </div>
  );
}

// As a button icon
function PaymentButton() {
  return (
    <button 
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded"
      onClick={() => handlePayment()}
    >
      <Dollar className="w-4 h-4" />
      Make Payment
    </button>
  );
}

// In a form field
function PriceInput() {
  return (
    <div className="relative">
      <Dollar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <input 
        type="number" 
        placeholder="0.00"
        className="pl-10 pr-4 py-2 border rounded-md"
      />
    </div>
  );
}

// In data tables
function ProductTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th className="flex items-center gap-1">
            <Dollar className="w-4 h-4" />
            Price
          </th>
        </tr>
      </thead>
      {/* table body */}
    </table>
  );
}
```

## Functionality

### Core Features
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Color Inheritance**: Uses `currentColor` to inherit text color from parent
- **Accessibility Ready**: Accepts ARIA attributes for screen readers
- **Customizable**: All SVG attributes can be overridden via props
- **Consistent Design**: Follows application icon design system

### Visual Characteristics
- **ViewBox**: `0 0 18 18` for crisp rendering at small sizes
- **Stroke & Fill**: Both use `currentColor` for consistent theming
- **Default Size**: `1em x 1em` for flexible scaling
- **Style**: Clean, modern dollar sign design

## State Management
**None** - This is a stateless presentational component with no internal state management requirements.

## Side Effects
**None** - Pure component with no side effects, API calls, or external interactions.

## Dependencies

### Direct Dependencies
- `React` - For component definition and JSX
- `SVGAttributes<SVGElement>` - TypeScript interface for props

### Integration Dependencies
- **Icon System**: Part of the `/components/icons/` collection
- **Design System**: Inherits colors and sizing from parent components
- **Accessibility**: Works with screen readers and keyboard navigation

## Integration

### Application Architecture
```
src/
├── components/
│   ├── icons/
│   │   ├── dollar.tsx      ← This component
│   │   ├── index.ts        ← Icon exports
│   │   └── ...
│   ├── ui/                 ← UI components using icons
│   └── features/           ← Feature components using icons
```

### Common Integration Patterns

#### With UI Components
```tsx
// In Button components
<Button>
  <Dollar className="w-4 h-4" />
  Purchase
</Button>

// In Badge components
<Badge variant="success">
  <Dollar className="w-3 h-3" />
  Paid
</Badge>
```

#### With Feature Components
```tsx
// In pricing features
import { Dollar } from '@/components/icons/dollar';

function PricingSection() {
  return (
    <section>
      <h2 className="flex items-center gap-2">
        <Dollar className="text-green-600" />
        Pricing Plans
      </h2>
      {/* pricing content */}
    </section>
  );
}
```

#### With Form Components
```tsx
// In form fields using React Hook Form
function PaymentForm() {
  const { register } = useForm();
  
  return (
    <div className="form-field">
      <label className="flex items-center gap-1">
        <Dollar className="w-4 h-4" />
        Amount
      </label>
      <input {...register('amount')} type="number" />
    </div>
  );
}
```

## Best Practices

### Architecture Adherence
✅ **Server Component**: Properly implemented as server component  
✅ **Component Decomposition**: Single responsibility (icon rendering)  
✅ **Reusability**: Generic, reusable across features  
✅ **Type Safety**: Proper TypeScript interfaces  

### Usage Guidelines

#### Do:
```tsx
// Use semantic sizing
<Dollar className="w-4 h-4" /> // Explicit size classes

// Provide accessibility labels
<Dollar aria-label="US Dollar" role="img" />

// Use with semantic HTML
<span className="price">
  <Dollar />
  $299.99
</span>
```

#### Don't:
```tsx
// Don't use inline styles for sizing
<Dollar style={{ width: '16px', height: '16px' }} />

// Don't hardcode colors
<Dollar style={{ color: '#00ff00' }} />

// Don't forget accessibility in interactive contexts
<button>
  <Dollar /> {/* Missing aria-label */}
  Pay Now
</button>
```

### Performance Considerations
- **Bundle Size**: Minimal impact as pure SVG
- **Rendering**: Server-rendered, no client-side overhead
- **Caching**: Cached with component bundle
- **Reusability**: Single import, multiple usage points

### Accessibility Best Practices
```tsx
// For decorative use
<Dollar role="presentation" aria-hidden="true" />

// For meaningful content
<Dollar aria-label="Price in US Dollars" role="img" />

// In interactive elements
<button aria-label="View pricing details">
  <Dollar aria-hidden="true" />
  Pricing
</button>
```