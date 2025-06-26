# TextInput & PasswordInput Components

## Purpose

The `TextInput` and `PasswordInput` components provide flexible, accessible form input elements that integrate seamlessly with our design system. The `TextInput` component supports various input types with customizable icons and labels, while `PasswordInput` extends this functionality with built-in password visibility toggle and security-focused styling.

## Props Interface

### InputProps (TextInput & PasswordInput)

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `classNames` | `object` | No | - | Custom class names for different parts of the component |
| `classNames.container` | `string` | No | - | Class name for the outer container |
| `classNames.label` | `string` | No | - | Class name for the label element |
| `classNames.wrapper` | `string` | No | - | Class name for the input wrapper |
| `classNames.input` | `string` | No | - | Class name for the input element |
| `label` | `string` | No | - | Label text displayed above the input |
| `leftIcon` | `ReactNode` | No | - | Icon displayed on the left side of the input |
| `rightIcon` | `ReactNode` | No | - | Icon displayed on the right side of the input |
| `hint` | `ReactNode` | No | - | Helper text or validation message displayed below the input |
| `error` | `boolean` | No | `false` | Whether the input is in an error state |
| `size` | `'xs' \| 's' \| 'm'` | No | `'m'` | Size variant of the input |
| `autoFocusAfterMount` | `boolean` | No | `false` | Whether to auto-focus the input after mounting |
| `disabled` | `boolean` | No | `false` | Whether the input is disabled |

All standard HTML input attributes are also supported (excluding `className` and `size` which are handled separately).

## Usage Examples

### Basic TextInput

```tsx
import { TextInput } from '@/components/ui/text-input';
import { PiUserLine } from '@/components/icons';

export function BasicInputExample() {
  return (
    <TextInput
      label="Full Name"
      placeholder="Enter your full name"
      leftIcon={<PiUserLine />}
    />
  );
}
```

### TextInput with Error State

```tsx
import { TextInput } from '@/components/ui/text-input';
import { PiEnvelopeLine } from '@/components/icons';

export function ErrorInputExample() {
  return (
    <TextInput
      label="Email Address"
      placeholder="Enter your email"
      leftIcon={<PiEnvelopeLine />}
      error={true}
      hint={
        <span className="typography-labelSmall text-pgStateError-base">
          Please enter a valid email address
        </span>
      }
    />
  );
}
```

### PasswordInput

```tsx
import { PasswordInput } from '@/components/ui/text-input';

export function PasswordExample() {
  return (
    <PasswordInput
      label="Password"
      placeholder="Enter your password"
      hint={
        <span className="typography-labelSmall text-pgText-600">
          Must be at least 8 characters long
        </span>
      }
    />
  );
}
```

### Different Sizes

```tsx
import { TextInput } from '@/components/ui/text-input';

export function SizeVariantsExample() {
  return (
    <div className="space-y-4">
      <TextInput
        size="xs"
        placeholder="Extra small input"
        label="XS Size"
      />
      <TextInput
        size="s"
        placeholder="Small input"
        label="Small Size"
      />
      <TextInput
        size="m"
        placeholder="Medium input"
        label="Medium Size (Default)"
      />
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **Input Text**: `.typography-paragraphSmall` for consistent input text styling
- **File Input**: `.typography-paragraphSmall` for file input button text
- **Labels**: Uses the `Label` component which applies appropriate typography classes

### Color Tokens
- **Background**: `bg-pgBackground-0` (primary), `bg-pgBackground-50` (hover/disabled)
- **Text**: `text-pgText-950` (primary), `text-pgText-400` (placeholder), `text-pgText-300` (disabled)
- **Borders**: `border-pgStrokeBlue` (focus/hover), `border-pgStateError-base` (error state)
- **Icons**: `text-pgIcon-600` (active), `text-pgIcon-400` (inactive), `text-pgIcon-300` (disabled)

### Shadow & Effects
- **Box Shadow**: `shadow-inputFieldPop` for elevation (light mode only)
- **Dark Mode**: `dark:shadow-none` removes shadows in dark mode

## Variants

The component uses CVA (Class Variance Authority) with the following variants:

### Size Variants
```tsx
// Extra Small
<TextInput size="xs" /> // px-2 py-1.5

// Small  
<TextInput size="s" />  // px-2.5 py-2

// Medium (Default)
<TextInput size="m" />  // px-3 py-2.5
```

### Error State
```tsx
// Error state - adds red border
<TextInput error={true} />
```

## Styling

### Available States
- **Default**: Clean, neutral styling with subtle borders
- **Hover**: Enhanced border color and background on hover
- **Focus**: Blue border and enhanced visual prominence
- **Disabled**: Reduced opacity and disabled cursor
- **Error**: Red border indicating validation errors

### Interactive Elements
- **Icons**: Responsive color changes based on input state
- **Password Toggle**: Eye icons that switch between filled/outline states
- **Placeholder**: Dynamic color transitions on focus and hover

## Responsive Design

The components are built with mobile-first responsive design:

- **Base (Mobile)**: Optimized touch targets and spacing
- **sm (640px+)**: Maintains mobile optimizations
- **md (768px+)**: Standard desktop interactions
- **lg (1024px+)**: Enhanced spacing for larger screens
- **xl (1280px+)**: Maximum width constraints where appropriate

The input components automatically adapt their touch targets and spacing across breakpoints while maintaining consistent visual hierarchy.

## Accessibility

### Keyboard Navigation
- **Tab Navigation**: Full keyboard navigation support
- **Focus Management**: Clear focus indicators with `focus-visible` styling
- **Password Toggle**: Clickable eye icons for password visibility

### Screen Reader Support
- **Labels**: Proper `htmlFor` association with input IDs
- **ARIA States**: Automatic disabled state handling
- **Error States**: Error styling with semantic hint support

### Form Integration
- **ID Management**: Automatic ID generation with `useIdFallback` hook
- **Label Association**: Proper label-input relationships
- **Validation**: Error state communication through visual and text cues

## Dependencies

### Internal Dependencies
- `useIdFallback` - Hook for consistent ID generation
- `Label` - Component for accessible label styling
- `cn` - Utility for conditional class name merging
- `mergeRefs` - Utility for combining multiple refs

### Icon Dependencies
- `PiEyeFill` - Filled eye icon for password visibility
- `PiEyeLine` - Outline eye icon for password visibility  
- `PiLock2Line` - Default lock icon for password inputs

### External Dependencies
- `class-variance-authority` - For variant management
- `merge-refs` - For ref forwarding

## Customization

### Using classNames Prop

```tsx
<TextInput
  classNames={{
    container: "mb-6",
    label: "text-pgBlue-600 font-semibold",
    wrapper: "border-2 border-pgGreen-300",
    input: "text-lg"
  }}
/>
```

### Custom Styling with Design Tokens

```tsx
// Custom error styling
<TextInput
  error={true}
  classNames={{
    wrapper: "border-pgRed-500 bg-pgRed-50/10",
    input: "text-pgRed-900 placeholder:text-pgRed-400"
  }}
  hint={
    <div className="typography-labelXSmall text-pgStateError-base mt-1">
      This field is required
    </div>
  }
/>

// Custom success styling
<TextInput
  classNames={{
    wrapper: "border-pgGreen-400 bg-pgGreen-50/20",
    input: "text-pgGreen-900"
  }}
  rightIcon={<CheckIcon className="text-pgGreen-600" />}
/>
```

### Extending with Tailwind Classes

```tsx
// Responsive sizing
<TextInput
  classNames={{
    container: "w-full max-w-md mx-auto",
    wrapper: "rounded-2xl lg:rounded-xl",
    input: "text-sm md:text-base"
  }}
/>
```

The component maintains full compatibility with our design system while providing maximum flexibility for customization through the `classNames` prop and standard HTML input attributes.