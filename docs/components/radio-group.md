# RadioGroup Component

## Purpose

The RadioGroup component provides a controlled selection interface where users can choose one option from a set of mutually exclusive choices. Built on Radix UI primitives, it offers comprehensive keyboard navigation, accessibility features, and consistent styling that aligns with the design system.

## Props Interface

### RadioGroup Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | - | Additional CSS classes to apply to the radio group container |
| `...props` | `ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>` | No | - | All standard Radix UI RadioGroup.Root props (value, onValueChange, etc.) |

### RadioGroupItem Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `label` | `ReactNode` | Yes | - | The text or content to display next to the radio button |
| `accented` | `boolean` | No | `false` | Whether to use accented typography (labelSmall vs paragraphSmall) |
| `customLabel` | `ReactNode` | No | - | Custom label component that replaces the default label rendering |
| `containerClassName` | `string` | No | - | Additional CSS classes for the item container wrapper |
| `disabled` | `boolean` | No | `false` | Whether the radio item is disabled |
| `className` | `string` | No | - | Additional CSS classes for the radio input element |
| `...props` | `ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>` | No | - | All standard Radix UI RadioGroup.Item props (value, id, etc.) |

## Usage Example

```tsx
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState } from 'react';

function PaymentMethodSelector() {
  const [paymentMethod, setPaymentMethod] = useState('card');

  return (
    <div className="space-y-6">
      <h3 className="typography-titleH4 text-pgText-950">
        Choose Payment Method
      </h3>
      
      <RadioGroup
        value={paymentMethod}
        onValueChange={setPaymentMethod}
        className="gap-6"
      >
        <RadioGroupItem
          value="card"
          label="Credit Card"
          accented
        />
        
        <RadioGroupItem
          value="paypal"
          label="PayPal"
          accented
        />
        
        <RadioGroupItem
          value="bank"
          label="Bank Transfer"
          disabled
        />
        
        {/* Custom label example */}
        <RadioGroupItem
          value="crypto"
          label=""
          customLabel={
            <div className="flex flex-col">
              <span className="typography-labelSmall text-pgText-950">
                Cryptocurrency
              </span>
              <span className="typography-paragraphXSmall text-pgText-600">
                Bitcoin, Ethereum, and other digital currencies
              </span>
            </div>
          }
        />
      </RadioGroup>
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **Default Labels**: `.typography-paragraphSmall` for standard radio labels
- **Accented Labels**: `.typography-labelSmall` when `accented={true}` prop is used

### Color Tokens
- **Radio Button Border**: `pgStrokeGreyTint` for unchecked state borders
- **Focus States**: `pgBackground-800` for focus-visible borders and indicator fills
- **Hover Effects**: `pgBackgroundBlueTintDark` for hover state indicators
- **Text Colors**: `pgText-950` for labels, `pgText-600` for secondary text
- **Disabled States**: `pgBackground-300` for disabled borders and indicators

### Tailwind Utilities
- **Layout**: `grid gap-4` for RadioGroup container spacing
- **Item Layout**: `flex items-center gap-2` for radio item alignment
- **Sizing**: `size-4` for radio button dimensions with `aspect-square`
- **States**: `disabled:opacity-65` for consistent disabled appearance

## Styling

### Available Variants

#### Standard Radio Items
```tsx
<RadioGroupItem
  value="option1"
  label="Standard option with paragraph typography"
/>
```

#### Accented Radio Items
```tsx
<RadioGroupItem
  value="option2"
  label="Accented option with label typography"
  accented
/>
```

#### Custom Labels
```tsx
<RadioGroupItem
  value="option3"
  label=""
  customLabel={
    <div className="space-y-1">
      <div className="typography-labelSmall text-pgText-950">Custom Title</div>
      <div className="typography-paragraphXSmall text-pgText-600">Description</div>
    </div>
  }
/>
```

### States

- **Default**: Clean border with hover ring effects
- **Checked**: Filled indicator with border styling
- **Disabled**: Reduced opacity with pointer-events disabled
- **Focus**: Enhanced border and ring for keyboard navigation
- **Hover**: Ring effect on unchecked items when not disabled

### Customization Options

```tsx
// Custom spacing between items
<RadioGroup className="gap-8">

// Custom container styling for individual items
<RadioGroupItem
  containerClassName="p-4 border border-pgStroke-200 rounded-lg"
  // ...other props
/>

// Custom radio button styling
<RadioGroupItem
  className="size-5" // Larger radio button
  // ...other props
/>
```

## Responsive Design

The RadioGroup component uses a flexible grid layout that adapts naturally to different screen sizes:

- **Mobile (sm and below)**: Full-width stacking with consistent gap spacing
- **Tablet (md)**: Maintains vertical layout with comfortable spacing
- **Desktop (lg+)**: Can be customized to use horizontal layouts when needed

```tsx
// Responsive layout example
<RadioGroup className="gap-4 md:gap-6 lg:grid-cols-2 xl:grid-cols-3">
  {/* Items will stack vertically on mobile, can flow into columns on larger screens */}
</RadioGroup>
```

## Accessibility

### Built-in Features
- **Keyboard Navigation**: Arrow keys navigate between radio options
- **Focus Management**: Proper focus indicators and tab order
- **Screen Reader Support**: Proper labeling and grouping semantics
- **ARIA Compliance**: Full ARIA attributes for radio group functionality

### Implementation Details
- Uses `useIdFallback` hook for consistent ID generation
- Proper `htmlFor` attribute linking labels to radio inputs
- Disabled state properly removes items from tab order
- Focus-visible styling for keyboard-only navigation

### Best Practices
```tsx
// Always provide descriptive labels
<RadioGroup aria-label="Payment method selection">
  <RadioGroupItem value="card" label="Credit or Debit Card" />
</RadioGroup>

// Group related options with clear context
<fieldset>
  <legend className="typography-labelMedium text-pgText-950 mb-4">
    Shipping Speed
  </legend>
  <RadioGroup>
    <RadioGroupItem value="standard" label="Standard (5-7 days)" />
    <RadioGroupItem value="express" label="Express (2-3 days)" />
  </RadioGroup>
</fieldset>
```

## Dependencies

### Internal Dependencies
- `@/components/hooks/use-id-fallback` - Consistent ID generation utility
- `@/lib/utils/cn` - Class name utility for conditional styling

### External Dependencies
- `@radix-ui/react-radio-group` - Base primitive component
- `react` - Core React functionality

### Related Components
- Form components for integration into larger forms
- Label components for complex labeling scenarios
- Card components for enhanced radio option presentation