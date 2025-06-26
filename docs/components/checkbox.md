# Checkbox Component

## Purpose
The Checkbox component is a customizable checkbox input built on Radix UI primitives that supports standard checked/unchecked states as well as an indeterminate state. It follows our design system's visual styling with hover, focus, and disabled states, and includes proper accessibility features.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `'default' \| 'rounded'` | No | `'default'` | Visual variant of the checkbox |
| `checked` | `boolean \| 'indeterminate'` | No | `undefined` | Controlled checked state |
| `defaultChecked` | `boolean` | No | `undefined` | Default checked state for uncontrolled usage |
| `onCheckedChange` | `(checked: boolean \| 'indeterminate') => void` | No | `undefined` | Callback fired when checked state changes |
| `disabled` | `boolean` | No | `false` | Whether the checkbox is disabled |
| `required` | `boolean` | No | `false` | Whether the checkbox is required |
| `name` | `string` | No | `undefined` | Name attribute for form submission |
| `value` | `string` | No | `undefined` | Value attribute for form submission |
| `className` | `string` | No | `undefined` | Additional CSS classes to apply |

*Inherits all other props from `ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>`*

## Usage Example

```tsx
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

function SettingsForm() {
  const [notifications, setNotifications] = useState(false);
  const [permissions, setPermissions] = useState<boolean | 'indeterminate'>('indeterminate');

  return (
    <div className="space-y-4">
      {/* Basic controlled checkbox */}
      <div className="flex items-center space-x-3">
        <Checkbox
          id="notifications"
          checked={notifications}
          onCheckedChange={setNotifications}
        />
        <label 
          htmlFor="notifications"
          className="typography-labelMedium text-pgText-700 cursor-pointer"
        >
          Enable notifications
        </label>
      </div>

      {/* Rounded variant with indeterminate state */}
      <div className="flex items-center space-x-3">
        <Checkbox
          id="permissions"
          variant="rounded"
          checked={permissions}
          onCheckedChange={setPermissions}
        />
        <label 
          htmlFor="permissions"
          className="typography-labelMedium text-pgText-700 cursor-pointer"
        >
          Grant permissions (partial)
        </label>
      </div>

      {/* Disabled checkbox */}
      <div className="flex items-center space-x-3">
        <Checkbox
          id="disabled"
          disabled
          checked={true}
        />
        <label 
          htmlFor="disabled"
          className="typography-labelMedium text-pgText-400 cursor-not-allowed"
        >
          Disabled option
        </label>
      </div>
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- Use with label typography: `.typography-labelMedium`, `.typography-labelSmall`, `.typography-labelXSmall`
- For descriptions: `.typography-paragraphSmall`, `.typography-paragraphXSmall`

### Colors Used
- **Border Colors**: `pgStrokeGreyTint`, `pgBackground-800`, `pgBackground-300`
- **Background Colors**: `pgBackground-800`, `pgBackground-300`, `alphaNeutral/6`
- **Text Colors**: `pgStroke-0`, `pgText-700`, `pgText-400`
- **Interactive States**: `pgIcon-600`
- **Focus**: `buttonsImportantFocus` shadow

### Tailwind Utilities
- **Size**: `size-4` (16px × 16px)
- **Spacing**: Standard spacing scale for layouts
- **Border**: `border-[1.5px]`, `rounded-[.25rem]`
- **Transitions**: `transition-colors`

## Styling

### Variants
- **`default`** (default): Standard rounded corners (`rounded-[.25rem]`)
- **`rounded`**: More rounded corners (`rounded-xl`)

### States
- **Default**: Transparent background with grey border
- **Hover**: Light neutral background overlay (`alphaNeutral/6`)
- **Checked**: Dark background (`pgBackground-800`) with white check icon
- **Indeterminate**: Dark background with white subtract icon
- **Focus**: Enhanced border color and focus shadow
- **Disabled**: Muted colors and disabled cursor

### Customization
```tsx
// Custom styling
<Checkbox 
  className="size-5 rounded-lg border-2" 
  variant="rounded"
/>

// With custom colors (override via CSS variables)
<Checkbox 
  style={{
    '--checkbox-border': 'rgb(var(--pgBlue-500))',
    '--checkbox-bg': 'rgb(var(--pgBlue-600))'
  } as React.CSSProperties}
/>
```

## Responsive Design
The checkbox maintains consistent `size-4` (16px) dimensions across all breakpoints. For responsive layouts:

```tsx
{/* Responsive checkbox groups */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div className="flex items-center space-x-2 sm:space-x-3">
    <Checkbox id="option1" />
    <label className="typography-labelSmall md:typography-labelMedium">
      Option 1
    </label>
  </div>
</div>
```

## Accessibility

### Built-in Features
- **Keyboard Navigation**: Focus with Tab, toggle with Space
- **Screen Reader Support**: Proper ARIA states and labels
- **Focus Management**: Visible focus indicators with custom shadow
- **State Communication**: Checked, unchecked, and indeterminate states announced

### Implementation Best Practices
```tsx
{/* Always provide labels */}
<div className="flex items-center space-x-3">
  <Checkbox 
    id="terms"
    required
    aria-describedby="terms-description" 
  />
  <div>
    <label htmlFor="terms" className="typography-labelMedium">
      I agree to the terms
    </label>
    <p id="terms-description" className="typography-paragraphXSmall text-pgText-500">
      Required to create an account
    </p>
  </div>
</div>

{/* Checkbox groups */}
<fieldset>
  <legend className="typography-labelLarge text-pgText-800 mb-3">
    Notification Preferences
  </legend>
  {/* Individual checkboxes */}
</fieldset>
```

## Dependencies

### Internal Dependencies
- **Icons**: `PiCheckLine`, `PiSubtractLine` from `@/components/icons`
- **Design System**: CSS variables and color tokens
- **Utilities**: `cva` for variant management

### External Dependencies
- **@radix-ui/react-checkbox**: Accessible checkbox primitive
- **class-variance-authority**: Variant management
- **React**: `forwardRef`, `ComponentPropsWithoutRef`, `ElementRef`

### Related Components
- **Label**: For checkbox labels
- **Form**: Form wrapper components
- **Switch**: Alternative toggle input
- **Radio Group**: Single-selection alternative