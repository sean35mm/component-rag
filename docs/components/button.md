# Button Component

## Purpose

The Button component is a versatile, accessible button implementation built with class-variance-authority that provides extensive styling variants, sizes, and states. It supports polymorphic rendering through Radix UI's Slot component and includes comprehensive focus management, disabled states, and icon-only configurations.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `string` | No | `'primaryFilled'` | Visual style variant (see Styling section for all options) |
| `size` | `'xl' \| 'md' \| 'sm' \| 'xs' \| 'xxs' \| '3xs'` | No | `'md'` | Button size affecting padding and typography |
| `isActive` | `boolean` | No | `false` | Active state styling (primarily for toggle buttons) |
| `onlyIcon` | `boolean` | No | `false` | Optimizes styling for icon-only buttons |
| `underline` | `boolean` | No | `false` | Adds underline text decoration |
| `asChild` | `boolean` | No | `false` | Renders as child component using Radix Slot |
| `className` | `string` | No | - | Additional CSS classes |
| `ref` | `RefObject<HTMLButtonElement>` | No | - | React ref for the button element |
| `...other` | `ButtonHTMLAttributes<HTMLButtonElement>` | No | - | All standard HTML button attributes |

## Usage Example

```tsx
import { Button } from '@/components/ui/button';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

function ButtonExamples() {
  return (
    <div className="space-y-4">
      {/* Primary Actions */}
      <div className="flex gap-2">
        <Button variant="primaryFilled" size="xl">
          Create Account
        </Button>
        <Button variant="primaryStroke" size="xl">
          Learn More
        </Button>
        <Button variant="primaryGhost" size="xl">
          Cancel
        </Button>
      </div>

      {/* Icon Buttons */}
      <div className="flex gap-2">
        <Button variant="neutralStroke" size="sm" onlyIcon>
          <PlusIcon className="h-4 w-4" />
        </Button>
        <Button variant="errorFilled" size="sm" onlyIcon>
          <TrashIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* Link Buttons */}
      <div className="flex gap-2">
        <Button variant="primaryLink" asChild>
          <a href="/dashboard">Go to Dashboard</a>
        </Button>
        <Button variant="errorUnderlined">
          Delete Account
        </Button>
      </div>

      {/* Specialty Buttons */}
      <div className="flex gap-2">
        <Button variant="specialtyBlueFilled" size="md">
          Premium Feature
        </Button>
        <Button variant="specialtyGoldFilled" size="md">
          Upgrade Now
        </Button>
      </div>
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **XL Size**: `.typography-labelLarge` - Used for the largest button size
- **MD/SM/XS/XXS/3XS Sizes**: `.typography-labelSmall` - Standard button text
- **3XS Size**: `.typography-labelXSmall` - Smallest button text

### Color Tokens Used

#### Background Colors
- **Primary**: `pgBackground-950`, `pgBackground-800`, `pgBackground-0`, `pgBackground-50`, `pgBackground-100`
- **Specialty**: `pgSapphire-600`, `pgSapphire-700`, `pgGold-500`, `pgGold-400`
- **Error**: `pgRed-700`, `pgRed-800`

#### Text Colors
- **Primary**: `pgText-0`, `pgText-950`, `pgText-800`, `pgText-700`, `pgText-300`
- **Static**: `pgStatic-0`, `pgStatic-950`
- **Icons**: `pgIcon-600`, `pgIcon-950`, `pgIcon-300`

#### State Colors
- **Error**: `pgRed-500`, `pgStateError-dark`
- **Alpha Colors**: `alphaSapphire`, `alphaNeutral`, `alphaRed`, `alphaBlue`, `alphaGold`

#### Border/Stroke Colors
- **Strokes**: `pgStroke-950`, `pgStroke-0`
- **Neutral**: `pgNeutral-500`, `pgNeutral-950`

### Tailwind Utilities
- **Focus Ring**: `ring-offset-2`, `ring-offset-pgBackground-0`, `focus-visible:ring-2`
- **Transitions**: `transition-colors`
- **Layout**: `inline-flex`, `items-center`, `justify-center`
- **Border Radius**: `rounded-xl`, `rounded-lg`, `rounded-sm`

## Styling

### Variants

#### Primary Variants
- **`primaryFilled`**: Solid dark background with light text
- **`primaryStroke`**: Bordered outline style
- **`primaryLighter`**: Light background with dark text
- **`primaryGhost`**: Transparent with hover states
- **`primaryLink`**: Underlined link style

#### Neutral Variants
- **`neutralFilled`**: Neutral solid background
- **`neutralStroke`**: Neutral bordered style
- **`neutralLighter`**: Light neutral background
- **`neutralGhost`**: Transparent neutral style
- **`neutralLink`**: Neutral link style

#### Error Variants
- **`errorFilled`**: Red solid background
- **`errorStroke`**: Red bordered style  
- **`errorLighter`**: Light red background
- **`errorGhost`**: Transparent red style
- **`errorUnderlined`**: Red underlined text

#### Specialty Variants
- **`specialtyBlueFilled`**: Sapphire blue background
- **`specialtyGoldFilled`**: Gold background with dark text

### Sizes
- **`xl`**: Large padding (`px-4 py-3`), rounded-xl
- **`md`**: Medium padding (`p-2.5`), rounded-xl  
- **`sm`**: Small padding (`p-2`), rounded-xl
- **`xs`**: Extra small (`p-1.5`), rounded-[.625rem]
- **`xxs`**: Double extra small (`px-1.5 py-1`), rounded-lg
- **`3xs`**: Triple extra small (`p-0`), rounded-sm

### States
- **Hover**: Enhanced colors and subtle transformations
- **Focus**: Visible focus rings with `focus-visible:ring-2`
- **Disabled**: Reduced opacity and disabled pointer events
- **Active**: Special styling for toggle states

## Responsive Design

The Button component uses fixed sizing but can be made responsive through parent containers:

```tsx
<div className="flex flex-col sm:flex-row gap-2">
  <Button size="sm" className="sm:size-md lg:size-xl">
    Responsive Button
  </Button>
</div>
```

## Accessibility

### Built-in Features
- **Focus Management**: Visible focus rings with `focus-visible:outline-none` and `focus-visible:ring-2`
- **Disabled States**: Proper `disabled:pointer-events-none` and visual feedback
- **Keyboard Navigation**: Full keyboard support through native button element
- **Screen Reader Support**: Semantic button element with proper text content

### Implementation Notes
- Always provide accessible text content or `aria-label` for icon-only buttons
- Use `asChild` prop carefully to maintain semantic meaning
- Disabled buttons automatically receive appropriate ARIA states

```tsx
// Good: Accessible icon button
<Button variant="neutralStroke" onlyIcon aria-label="Add new item">
  <PlusIcon className="h-4 w-4" />
</Button>

// Good: Link button with proper semantics  
<Button variant="primaryLink" asChild>
  <a href="/profile" aria-label="View user profile">
    Profile
  </a>
</Button>
```

## Dependencies

### External Dependencies
- **@radix-ui/react-slot**: Polymorphic rendering capability
- **class-variance-authority**: Variant management system
- **@heroicons/react**: Icon components (for examples)

### Internal Dependencies
- **`cn` utility**: Class name merging from `@/lib/utils/cn`
- **Design System**: Relies on CSS variables defined in `globals.css`
- **Tailwind Configuration**: Custom color tokens and spacing scale

### Export Structure
```tsx
export { buttonVariants, Button } from '@/components/ui/button';
```

The `buttonVariants` export allows for custom implementations while maintaining consistent styling:

```tsx
import { buttonVariants } from '@/components/ui/button';

const customButton = cn(
  buttonVariants({ variant: 'primaryFilled', size: 'md' }),
  'custom-additional-styles'
);
```