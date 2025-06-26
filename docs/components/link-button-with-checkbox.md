# LinkButtonWithCheckbox Component

## Purpose
The `LinkButtonWithCheckbox` component combines a checkbox input with a clickable label and optional tooltip. It provides an enhanced user experience by making the entire label area clickable and offering contextual help through tooltips when needed.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `label` | `string` | ✅ | - | The text label displayed next to the checkbox |
| `size` | `'md' \| 'sm'` | ❌ | `'md'` | Controls the label typography size |
| `tooltip` | `ReactNode \| ReactNode[]` | ❌ | - | Optional tooltip content shown when hovering/clicking the info icon |
| `className` | `string` | ❌ | - | Additional CSS classes to apply to the wrapper |
| `id` | `string` | ❌ | - | Custom ID for the checkbox (auto-generated if not provided) |
| ...other | `CheckboxProps` | ❌ | - | All other props are forwarded to the underlying Checkbox component |

## Usage Example

```tsx
import { LinkButtonWithCheckbox } from '@/components/ui/link-button-with-checkbox';

function FormExample() {
  const [agreed, setAgreed] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  return (
    <div className="space-y-4">
      {/* Basic usage */}
      <LinkButtonWithCheckbox
        label="I agree to the terms and conditions"
        checked={agreed}
        onCheckedChange={setAgreed}
        size="md"
      />

      {/* With tooltip */}
      <LinkButtonWithCheckbox
        label="Subscribe to newsletter"
        checked={newsletter}
        onCheckedChange={setNewsletter}
        size="sm"
        tooltip={
          <div>
            <p>Get weekly updates about new features and promotions.</p>
            <p>You can unsubscribe at any time.</p>
          </div>
        }
      />

      {/* Disabled state */}
      <LinkButtonWithCheckbox
        label="This option is currently unavailable"
        checked={false}
        disabled
        tooltip="This feature is coming soon!"
      />
    </div>
  );
}
```

## Design System Usage

### Typography Classes
The component uses typography classes from our design system based on the `size` prop:

- **Medium (`md`)**: `.typography-paragraphSmall`
- **Small (`sm`)**: `.typography-paragraphXSmall`

### Color Tokens
The component leverages our color system with semantic naming:

- **Label Text States**:
  - Default: `text-pgText-700`
  - Hover/Focus/Checked: `text-pgText-800`
  - Disabled: `text-pgText-300`
- **Icon Color**: `text-pgIcon-300`

### Tailwind Utilities
- **Layout**: `flex items-center` for horizontal alignment
- **Spacing**: `ml-2` for checkbox-label gap, `ml-1` for label-tooltip gap
- **Sizing**: `size-3.5` for tooltip icon dimensions
- **Interactive**: `cursor-pointer` for clickable elements
- **Transitions**: `transition-colors` for smooth color changes

## Styling

### Size Variants
```tsx
// Medium size (default)
<LinkButtonWithCheckbox label="Medium label" size="md" />

// Small size
<LinkButtonWithCheckbox label="Small label" size="sm" />
```

### State Variations
The component automatically handles various states through peer selectors:

- **Default**: Standard text color (`pgText-700`)
- **Hover**: Enhanced text color (`pgText-800`)
- **Focus**: Focus-visible styling with enhanced text color
- **Checked**: Stronger text color when checkbox is selected
- **Disabled**: Reduced opacity and disabled cursor

### Custom Styling
```tsx
<LinkButtonWithCheckbox
  label="Custom styled checkbox"
  className="bg-pgBackground-50 p-4 rounded-lg border border-pgStroke-200"
  tooltip="Custom container styling"
/>
```

## Responsive Design

The component is responsive by default and adapts to different screen sizes:

- **Mobile (sm)**: Maintains compact spacing and readable text
- **Tablet (md+)**: Standard spacing and sizing
- **Desktop (lg+)**: Optimal spacing for mouse interactions

The tooltip positioning automatically adjusts based on available screen space.

## Accessibility

### ARIA Features
- **Label Association**: Uses `htmlFor` attribute to properly associate label with checkbox
- **Focus Management**: Supports keyboard navigation with focus-visible states
- **Screen Reader Support**: Proper semantic markup for assistive technologies

### Keyboard Navigation
- **Tab**: Navigate to checkbox
- **Space**: Toggle checkbox state
- **Enter**: Activate tooltip (when present)

### Focus Indicators
- Clear focus-visible indicators using `peer-focus-visible:` selectors
- High contrast focus states for better visibility

## Dependencies

### Internal Components
- **Checkbox**: Base checkbox component that handles the input functionality
- **Tooltip/TooltipContent/TooltipTrigger**: Tooltip system for contextual help
- **PiInformationLine**: Information icon from the icon system

### Hooks & Utilities
- **useIdFallback**: Generates fallback IDs when not provided
- **cn**: Utility for conditional className merging

### Design System Integration
- Fully integrated with our color system (`pgText-*`, `pgIcon-*`)
- Uses standardized typography scales
- Follows our spacing and sizing conventions
- Supports dark mode through CSS variable system