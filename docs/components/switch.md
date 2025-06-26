# Switch Component

## Purpose

The Switch component is a toggleable binary control that allows users to switch between two states (on/off, enabled/disabled). Built on top of Radix UI's Switch primitive, it provides a visually appealing and accessible toggle control with smooth animations and proper focus management.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `checked` | `boolean` | No | `undefined` | The controlled state of the switch |
| `defaultChecked` | `boolean` | No | `false` | The default state when uncontrolled |
| `onCheckedChange` | `(checked: boolean) => void` | No | `undefined` | Callback fired when the switch state changes |
| `disabled` | `boolean` | No | `false` | Whether the switch is disabled |
| `required` | `boolean` | No | `false` | Whether the switch is required in a form |
| `name` | `string` | No | `undefined` | The name attribute for form submission |
| `value` | `string` | No | `"on"` | The value attribute for form submission |
| `className` | `string` | No | `undefined` | Additional CSS classes to apply |
| `id` | `string` | No | `undefined` | The id attribute for the switch |

*Note: This component accepts all standard HTML button attributes via Radix UI's Switch primitive.*

## Usage Example

```tsx
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

function SettingsPanel() {
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="space-y-6 p-6 bg-pgBackground-50 rounded-lg">
      <h2 className="typography-titleH3 text-pgText-900">Settings</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="typography-labelMedium text-pgText-800">
              Push Notifications
            </label>
            <p className="typography-paragraphSmall text-pgText-600 mt-1">
              Receive notifications about important updates
            </p>
          </div>
          <Switch
            checked={notifications}
            onCheckedChange={setNotifications}
            id="notifications"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="typography-labelMedium text-pgText-800">
              Dark Mode
            </label>
            <p className="typography-paragraphSmall text-pgText-600 mt-1">
              Switch between light and dark themes
            </p>
          </div>
          <Switch
            checked={darkMode}
            onCheckedChange={setDarkMode}
            id="dark-mode"
          />
        </div>

        <div className="flex items-center justify-between opacity-50">
          <div>
            <label className="typography-labelMedium text-pgText-800">
              Beta Features
            </label>
            <p className="typography-paragraphSmall text-pgText-600 mt-1">
              Enable experimental features (currently unavailable)
            </p>
          </div>
          <Switch disabled />
        </div>
      </div>
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- Use `.typography-labelMedium` or `.typography-labelSmall` for switch labels
- Use `.typography-paragraphSmall` or `.typography-paragraphXSmall` for helper text

### Colors Used
- **Background (Unchecked)**: `bg-pgNeutral-200` - Light gray background for inactive state
- **Background (Checked)**: `bg-pgNeutral-900` - Dark background for active state
- **Thumb**: `bg-white` - White thumb with shadow
- **Focus Ring**: `ring-pgNeutral-950` - Dark focus ring
- **Focus Ring Offset**: `ring-offset-white` - White offset for focus visibility

### Tailwind Utilities
- `h-6 w-11` - Switch dimensions (24px × 44px)
- `h-5 w-5` - Thumb dimensions (20px × 20px)
- `rounded-full` - Fully rounded corners
- `transition-colors` - Smooth color transitions
- `transition-transform` - Smooth thumb movement
- `shadow-lg` - Thumb shadow for depth

## Styling

### Default State
- 44px width × 24px height
- Light gray background (`pgNeutral-200`)
- White thumb with subtle shadow
- Black dot indicator on thumb

### Checked State
- Dark gray background (`pgNeutral-900`)
- Thumb slides to the right (`translate-x-5`)
- Maintains visual feedback with dot indicator

### Disabled State
- Reduced opacity (`opacity-50`)
- Cursor changes to `not-allowed`
- Maintains current visual state but prevents interaction

### Focus State
- 2px focus ring (`ring-2`)
- Dark ring color (`ring-pgNeutral-950`)
- 2px white offset (`ring-offset-2`)

### Customization Options

```tsx
// Custom colors
<Switch className="data-[state=checked]:bg-pgBlue-600 data-[state=unchecked]:bg-pgNeutral-300" />

// Custom size
<Switch className="h-8 w-14 [&>span]:h-7 [&>span]:w-7 [&>span]:data-[state=checked]:translate-x-6" />

// Custom focus ring
<Switch className="focus-visible:ring-pgBlue-500" />
```

## Responsive Design

The Switch component maintains consistent sizing across all breakpoints by default. For responsive variations:

```tsx
// Responsive sizing
<Switch className="h-5 w-9 md:h-6 md:w-11 [&>span]:h-4 [&>span]:w-4 md:[&>span]:h-5 md:[&>span]:w-5" />

// Responsive layout in forms
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
  <label className="typography-labelMedium">Setting</label>
  <Switch />
</div>
```

## Accessibility

### ARIA Support
- **Role**: Automatically set to `switch`
- **State**: `aria-checked` reflects the current state
- **Labeling**: Associate with labels using `id` and `htmlFor`

### Keyboard Navigation
- **Space**: Toggles the switch state
- **Enter**: Toggles the switch state (in forms)
- **Tab**: Focuses the switch
- **Focus Management**: Clear focus ring with proper offset

### Screen Reader Support
```tsx
<Switch
  id="notifications"
  aria-describedby="notifications-description"
/>
<span id="notifications-description" className="sr-only">
  Toggle to enable or disable push notifications
</span>
```

### Best Practices
- Always provide accessible labels
- Use descriptive text for context
- Ensure sufficient color contrast
- Test with keyboard navigation
- Provide clear visual feedback for all states

## Dependencies

### Internal Dependencies
- `@/lib/utils/cn` - Utility for conditional class merging

### External Dependencies
- `@radix-ui/react-switch` - Accessible switch primitive
- `react` - React library for component functionality

### Related Components
- **Label**: For accessible labeling
- **Form**: For form integration
- **Checkbox**: Alternative boolean input
- **Radio Group**: For mutually exclusive options

### Usage with Form Libraries
```tsx
// React Hook Form integration
import { Controller } from 'react-hook-form';

<Controller
  name="notifications"
  control={control}
  render={({ field }) => (
    <Switch
      checked={field.value}
      onCheckedChange={field.onChange}
    />
  )}
/>
```