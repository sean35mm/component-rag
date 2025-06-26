# RadioBoxItem Component

## Purpose

The `RadioBoxItem` component is a custom radio button input styled as a selectable box container. It extends the standard radio functionality with optional custom value input mode, allowing users to either select predefined options or enter custom values inline. The component integrates seamlessly with radio groups and provides visual feedback for selection states.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `label` | `ReactNode` | ✅ | - | The display label for the radio option |
| `value` | `string` | ✅ | - | The value associated with this radio option |
| `isSelected` | `boolean` | ✅ | - | Controls the selected state of the radio item |
| `onSelect` | `(value: string) => void` | ❌ | - | Callback triggered when the item is selected |
| `customValueInputMode` | `boolean` | ❌ | `false` | Enables inline text input for custom values |
| `onCustomValueChange` | `(value: string) => void` | ❌ | - | Callback for custom value input changes |
| `disabled` | `boolean` | ❌ | `false` | Disables the radio item interaction |

## Usage Example

```tsx
import { RadioBoxItem } from '@/components/ui/radio-box-item';
import { useState } from 'react';

function PaymentMethodSelector() {
  const [selectedPayment, setSelectedPayment] = useState('');
  const [customAmount, setCustomAmount] = useState('');

  return (
    <div className="space-y-3">
      {/* Standard radio box items */}
      <RadioBoxItem
        label={<span className="typography-labelMedium text-pgText-900">Credit Card</span>}
        value="credit-card"
        isSelected={selectedPayment === 'credit-card'}
        onSelect={setSelectedPayment}
      />
      
      <RadioBoxItem
        label={<span className="typography-labelMedium text-pgText-900">PayPal</span>}
        value="paypal"
        isSelected={selectedPayment === 'paypal'}
        onSelect={setSelectedPayment}
        disabled={true}
      />

      {/* Custom value input mode */}
      <RadioBoxItem
        label="Custom Amount"
        value={customAmount}
        isSelected={selectedPayment === customAmount}
        onSelect={setSelectedPayment}
        customValueInputMode={true}
        onCustomValueChange={setCustomAmount}
      />
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- Uses inherited typography from `label` prop content
- Recommended: `.typography-labelMedium` or `.typography-labelSmall` for labels
- Custom input inherits typography from `InlineTextInput` component

### Color Tokens
- **Container Background**: `bg-pgBackground-0` (light mode), `dark:bg-pgNeutral-950` (dark mode)
- **Border**: `border-pgStroke-200` for default border styling
- **Text Colors**: Inherits from content, typically `text-pgText-900` for primary text

### Layout & Spacing
- **Container**: `rounded-xl px-4 py-3` for consistent box styling
- **Internal Spacing**: `gap-2` between radio indicator and content
- **Width**: `w-full` for full container width

## Styling

### Available States

#### Default State
```tsx
<RadioBoxItem
  label="Standard Option"
  value="option-1"
  isSelected={false}
  onSelect={handleSelect}
/>
```

#### Selected State
- Automatically styled through `RadioGroupItem` checked state
- Visual indication via radio button selection

#### Disabled State
```tsx
<RadioBoxItem
  label="Disabled Option"
  value="disabled"
  isSelected={false}
  disabled={true}
/>
```
- Applies `opacity-65` to custom input when disabled
- Prevents interaction through underlying `RadioGroupItem`

#### Custom Input Mode
```tsx
<RadioBoxItem
  label="Enter custom value"
  value={customValue}
  isSelected={isSelected}
  customValueInputMode={true}
  onCustomValueChange={setCustomValue}
/>
```

### Customization Options

The component accepts `containerClassName` overrides through the underlying `RadioGroupItem`:

```tsx
// Custom styling would need to be applied via RadioGroupItem props
// The component uses cn() utility for className merging
```

## Responsive Design

The component uses responsive design principles:

- **Base**: Full width containers with flexible content
- **All Breakpoints**: Maintains consistent padding and spacing
- **Touch Targets**: Adequate touch target size with `px-4 py-3` padding
- **Content Flow**: Flexible layout adapts to content length

## Accessibility

### ARIA Support
- Inherits radio semantics from `RadioGroupItem` component
- Proper labeling through `label` prop association
- Keyboard navigation support through native radio group behavior

### Focus Management
- Custom input focus states managed with `isCustomValueInputFocused`
- Focus indicators through underlying form components
- Proper tab order maintained

### Interactive States
- Clear visual distinction between selected/unselected states
- Disabled state prevents interaction and provides visual feedback
- Cursor styling (`cursor-pointer`) indicates interactivity

## Dependencies

### Internal Components
- `RadioGroupItem` - Core radio functionality and styling
- `InlineTextInput` - Custom value input functionality

### Utilities
- `cn` from `@/lib/utils/cn` - Conditional className utility
- React hooks: `useCallback`, `useMemo`, `useRef`, `useState`

### Design System Integration
- Follows design system color tokens for consistent theming
- Uses standard spacing and typography conventions
- Integrates with dark mode through CSS variable system