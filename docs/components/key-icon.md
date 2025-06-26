# KeyIcon Component

## Purpose

The `KeyIcon` component is a versatile circular container designed to display icons with consistent styling across different states and contexts. It provides semantic color coding through various state-based color variants and supports multiple sizes for different UI hierarchies. The component is commonly used for status indicators, feature highlights, and contextual icon displays.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `'lighter' \| 'stroke'` | No | `'lighter'` | Visual style variant - `lighter` for filled background, `stroke` for bordered outline |
| `color` | `'blue' \| 'gray' \| 'orange' \| 'red' \| 'green' \| 'yellow' \| 'purple' \| 'pink' \| 'teal'` | No | `'gray'` | Semantic color mapping to design system state colors |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | No | `'sm'` | Size variant controlling padding and text size |
| `className` | `string` | No | - | Additional CSS classes for customization |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | No | - | Standard HTML div attributes (excluding `color` which is overridden) |

## Usage Example

```tsx
import { KeyIcon } from '@/components/ui/key-icon';
import { CheckIcon, AlertTriangleIcon, InfoIcon } from 'lucide-react';

function StatusDashboard() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Success Status */}
      <div className="flex items-center gap-3">
        <KeyIcon color="green" size="md" variant="lighter">
          <CheckIcon className="h-5 w-5" />
        </KeyIcon>
        <span className="typography-labelMedium text-pgText-950">
          System Online
        </span>
      </div>

      {/* Warning Alert */}
      <div className="flex items-center gap-3">
        <KeyIcon color="orange" size="lg" variant="stroke">
          <AlertTriangleIcon className="h-6 w-6" />
        </KeyIcon>
        <span className="typography-labelMedium text-pgText-950">
          High Memory Usage
        </span>
      </div>

      {/* Information Notice */}
      <div className="flex items-center gap-3">
        <KeyIcon color="blue" size="xl" variant="lighter">
          <InfoIcon className="h-7 w-7" />
        </KeyIcon>
        <span className="typography-labelLarge text-pgText-950">
          New Features Available
        </span>
      </div>
    </div>
  );
}
```

## Design System Usage

### Typography Classes
The component uses Tailwind's text sizing utilities that align with our typography system:
- `text-lg` (18px) - Equivalent to typography-headlines18
- `text-xl` (20px) - Equivalent to typography-headlines20  
- `text-2xl` (24px) - Equivalent to typography-headlines24
- `text-[1.5rem]` (24px) - Custom sizing for xl variant
- `text-[1.75rem]` (28px) - Custom sizing for 2xl variant

### Color System
The component leverages our semantic state color system:
- **Information**: `bg-pgStateInformation-lighter` + `text-pgStateInformation-base`
- **Success**: `bg-pgStateSuccess-lighter` + `text-pgStateSuccess-base`
- **Warning**: `bg-pgStateWarning-lighter` + `text-pgStateWarning-base`
- **Error**: `bg-pgStateError-lighter` + `text-pgStateError-base`
- **Neutral**: `bg-pgStateFaded-lighter` + `text-pgText-950`

### Tailwind Utilities
- **Layout**: `shrink-0` prevents flex shrinking
- **Borders**: `rounded-full` creates circular shape
- **Spacing**: Standard Tailwind padding scale (`p-1.5` to `p-4`)
- **Borders**: `border border-alphaNeutral/24` for stroke variant

## Styling

### Size Variants
```tsx
// Small - Compact UI elements
<KeyIcon size="sm" /> // p-1.5 text-lg (6px padding, 18px text)

// Medium - Standard usage  
<KeyIcon size="md" /> // p-2.5 text-xl (10px padding, 20px text)

// Large - Prominent displays
<KeyIcon size="lg" /> // p-3 text-2xl (12px padding, 24px text)

// Extra Large - Hero sections
<KeyIcon size="xl" /> // p-3.5 text-[1.5rem] (14px padding, 24px text)

// 2X Large - Major focal points
<KeyIcon size="2xl" /> // p-4 text-[1.75rem] (16px padding, 28px text)
```

### Visual Variants
```tsx
// Filled background (default)
<KeyIcon variant="lighter" color="blue" />

// Outlined with transparent background
<KeyIcon variant="stroke" color="red" />
```

### Color Semantic Mapping
- `blue` → Information/Primary actions
- `green` → Success states
- `red` → Error/Critical alerts
- `orange` → Warning/Caution
- `yellow` → Away/Pending states
- `purple` → Feature highlights
- `pink` → Special emphasis
- `teal` → Verified/Trusted content
- `gray` → Neutral/Default state

## Responsive Design

The KeyIcon component maintains consistent circular proportions across all breakpoints. For responsive sizing, combine with Tailwind responsive prefixes:

```tsx
// Responsive size scaling
<KeyIcon 
  size="sm" 
  className="md:p-2.5 md:text-xl lg:p-3 lg:text-2xl"
  color="blue"
/>

// Responsive visibility
<KeyIcon 
  size="md" 
  className="hidden sm:flex"
  color="green"
/>
```

## Accessibility

### ARIA Considerations
```tsx
// For decorative icons
<KeyIcon color="blue" role="presentation" aria-hidden="true">
  <StarIcon />
</KeyIcon>

// For semantic icons
<KeyIcon color="red" aria-label="Error status">
  <AlertCircleIcon />
</KeyIcon>

// With descriptive content
<KeyIcon color="green" aria-describedby="status-text">
  <CheckIcon />
</KeyIcon>
<span id="status-text" className="sr-only">
  Operation completed successfully
</span>
```

### Color Accessibility
- All color combinations meet WCAG AA contrast requirements
- State colors provide semantic meaning beyond color alone
- Consider adding text labels or tooltips for critical information

### Keyboard Navigation
The component accepts standard div attributes, enabling keyboard interaction:

```tsx
<KeyIcon 
  color="blue" 
  tabIndex={0}
  onKeyDown={(e) => e.key === 'Enter' && handleAction()}
  className="cursor-pointer focus:ring-2 focus:ring-pgStateInformation-base"
>
  <ButtonIcon />
</KeyIcon>
```

## Dependencies

### Internal Dependencies
- `@/lib/utils/cn` - Utility for conditional className merging
- `class-variance-authority` - Variant management system

### Related Components
- **Button**: Often used together for actionable icons
- **Badge**: Similar circular styling for text content
- **Avatar**: Shared circular container patterns
- **Tooltip**: Commonly paired for additional context

### Design System Integration
- Inherits dark mode support through CSS variable system
- Automatically adapts to theme changes
- Consistent with other circular UI elements in the system