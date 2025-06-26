# Label Component

## Purpose

The Label component is a form-focused UI element built on top of Radix UI's Label primitive. It provides accessible labeling for form inputs with consistent typography and state management, including disabled states. The component integrates seamlessly with our design system's typography scale and color tokens.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `disabled` | `boolean` | No | `false` | Controls the disabled appearance and cursor behavior |
| `className` | `string` | No | - | Additional CSS classes to merge with component styles |
| `children` | `ReactNode` | No | - | The label text or content |
| `htmlFor` | `string` | No | - | Associates the label with a form control by ID |
| `...props` | `ComponentPropsWithoutRef<typeof LabelPrimitive.Root>` | No | - | All other props from Radix UI Label primitive |

## Usage Example

```tsx
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

// Basic usage
<Label htmlFor="email">Email Address</Label>
<Input id="email" type="email" />

// Disabled state
<Label htmlFor="disabled-field" disabled>
  Disabled Field
</Label>
<Input id="disabled-field" disabled />

// Custom styling with design system tokens
<Label 
  htmlFor="custom-field"
  className="text-pgBlue-600 typography-labelMedium"
>
  Custom Styled Label
</Label>

// With state colors
<Label 
  htmlFor="error-field"
  className="text-pgStateError-base"
>
  Error Field Label
</Label>
```

## Design System Usage

### Typography
- **Default**: `.typography-labelSmall` - Consistent with our label typography scale
- **Alternative sizes**: Can be overridden with other label classes:
  - `.typography-labelXLarge`
  - `.typography-labelLarge` 
  - `.typography-labelMedium`
  - `.typography-labelXSmall`
  - `.typography-label2XSmall`
  - `.typography-label3XSmall`

### Colors
- **Default**: `text-pgText-800` - Primary text color for good contrast
- **Disabled**: `text-pgText-300` - Muted appearance for disabled state
- **Alternative colors** available through className prop:
  - State colors: `text-pgStateError-base`, `text-pgStateSuccess-base`, `text-pgStateWarning-base`
  - Brand colors: `text-pgBlue-600`, `text-pgGreen-600`, etc.
  - Text scale: `text-pgText-950` (darkest) to `text-pgText-50` (lightest)

## Styling

### Variants

#### Disabled State
```tsx
<Label disabled>Disabled Label</Label>
```
- Applies `cursor-not-allowed` for better UX
- Uses `text-pgText-300` for muted appearance
- Automatically handled through the `disabled` prop

### Customization Options

```tsx
// Custom typography size
<Label className="typography-labelLarge">
  Larger Label Text
</Label>

// Custom colors with state
<Label className="text-pgStateError-base">
  Error Label
</Label>

// Combined customizations
<Label 
  className="typography-labelMedium text-pgBlue-700 font-semibold"
  disabled={false}
>
  Custom Label
</Label>
```

## Responsive Design

The Label component inherits responsive typography from our design system:

```tsx
// Responsive typography scaling
<Label className="typography-labelSmall md:typography-labelMedium lg:typography-labelLarge">
  Responsive Label
</Label>

// Responsive colors for dark mode
<Label className="text-pgText-800 dark:text-pgText-200">
  Dark Mode Adaptive Label
</Label>
```

## Accessibility

### Built-in Features
- **Semantic HTML**: Uses proper `<label>` element through Radix UI primitive
- **Form Association**: Supports `htmlFor` attribute to associate with form controls
- **Screen Reader Support**: Properly announced by assistive technologies
- **Focus Management**: Clicking label focuses associated form control

### Best Practices
```tsx
// Proper form association
<Label htmlFor="username">Username</Label>
<Input id="username" type="text" />

// Required field indication
<Label htmlFor="required-field">
  Email Address <span className="text-pgStateError-base">*</span>
</Label>

// Descriptive labeling
<Label htmlFor="password">
  Password (minimum 8 characters)
</Label>
```

### ARIA Considerations
- The component inherits all ARIA features from Radix UI Label primitive
- Automatically provides proper labeling relationships
- Supports additional ARIA attributes when needed:

```tsx
<Label 
  htmlFor="complex-field"
  aria-describedby="field-description"
>
  Complex Field
</Label>
```

## Dependencies

### Internal Dependencies
- `@/lib/utils/cn` - Utility for conditional class name merging
- Design system CSS variables for colors and typography

### External Dependencies
- `@radix-ui/react-label` - Accessible label primitive
- `class-variance-authority` - Variant management
- `React` - Core framework

### Related Components
- **Input**: Primary use case for form labeling
- **Checkbox**: Often paired with labels
- **Radio**: Requires proper labeling
- **Select**: Benefits from associated labels
- **TextArea**: Form control that needs labeling

### Usage with Form Libraries
```tsx
// With React Hook Form
import { useFormContext } from 'react-hook-form';

const FormField = () => {
  const { register, formState: { errors } } = useFormContext();
  
  return (
    <>
      <Label 
        htmlFor="email"
        className={errors.email ? 'text-pgStateError-base' : undefined}
      >
        Email Address
      </Label>
      <Input
        id="email"
        {...register('email')}
        className={errors.email ? 'border-pgStateError-base' : undefined}
      />
    </>
  );
};
```