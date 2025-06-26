# Select Component

## Purpose

The Select component provides a customizable dropdown selection interface built on top of Radix UI primitives. It offers a consistent, accessible way to present users with a list of options while maintaining full design system integration with our typography, color tokens, and responsive behavior.

## Props Interface

### Select (Root)
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | `ReactNode` | Yes | SelectTrigger and SelectContent components |
| defaultValue | `string` | No | Default selected value |
| value | `string` | No | Controlled selected value |
| onValueChange | `(value: string) => void` | No | Callback when selection changes |
| disabled | `boolean` | No | Disables the entire select |
| name | `string` | No | Form field name |
| required | `boolean` | No | Makes field required |

### SelectTrigger
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| size | `'xs' \| 'sm' \| 'md'` | No | Size variant (default: 'md') |
| className | `string` | No | Additional CSS classes |
| children | `ReactNode` | No | Custom trigger content |

### SelectContent
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| position | `'item-aligned' \| 'popper'` | No | Positioning strategy (default: 'popper') |
| className | `string` | No | Additional CSS classes |
| children | `ReactNode` | Yes | SelectItem, SelectLabel, SelectSeparator components |

### SelectItem
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| value | `string` | Yes | The value for this option |
| indicatorPosition | `'left' \| 'right'` | No | Check icon position (default: 'left') |
| noIndicator | `boolean` | No | Hide the check indicator |
| disabled | `boolean` | No | Disable this option |
| className | `string` | No | Additional CSS classes |
| children | `ReactNode` | Yes | Option display content |

### SelectLabel
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| indicatorPosition | `'left' \| 'right'` | No | Align with item indicators (default: 'left') |
| className | `string` | No | Additional CSS classes |
| children | `ReactNode` | Yes | Label text content |

## Usage Example

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Basic Select
function BasicSelect() {
  return (
    <Select>
      <SelectTrigger className="w-64">
        <SelectValue placeholder="Choose an option..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  );
}

// Grouped Select with Labels
function GroupedSelect() {
  return (
    <Select>
      <SelectTrigger size="sm" className="w-72">
        <SelectValue placeholder="Select a team member..." />
      </SelectTrigger>
      <SelectContent>
        <SelectLabel>Engineering</SelectLabel>
        <SelectItem value="john">John Smith</SelectItem>
        <SelectItem value="sarah">Sarah Johnson</SelectItem>
        <SelectSeparator />
        <SelectLabel>Design</SelectLabel>
        <SelectItem value="mike">Mike Chen</SelectItem>
        <SelectItem value="lisa">Lisa Davis</SelectItem>
      </SelectContent>
    </Select>
  );
}

// Controlled Select with Form
function ControlledSelect() {
  const [value, setValue] = useState('');

  return (
    <div className="space-y-2">
      <label className="typography-labelMedium text-pgText-800">
        Priority Level
      </label>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger size="md" className="w-full">
          <SelectValue placeholder="Select priority..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">
            <span className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-pgGreen-500" />
              Low Priority
            </span>
          </SelectItem>
          <SelectItem value="medium">
            <span className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-pgOrange-500" />
              Medium Priority
            </span>
          </SelectItem>
          <SelectItem value="high">
            <span className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-pgRed-500" />
              High Priority
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **Trigger & Items**: `.typography-paragraphSmall` - Consistent text sizing across all select elements
- **Labels**: `.typography-paragraphSmall` - Maintains hierarchy within dropdown content

### Color Tokens
- **Background Colors**:
  - `bg-pgBackground-0` - Main backgrounds for trigger and content
  - `bg-pgBackground-50` - Hover and disabled states
  - `bg-pgBackgroundWhiteInv-950` - Focus state background

- **Text Colors**:
  - `text-pgText-800` - Primary text color
  - `text-pgText-950` - High emphasis text (labels, items)
  - `text-pgText-400` - Placeholder text
  - `text-pgText-300` - Disabled text

- **Border Colors**:
  - `border-pgStroke-250` - Default border
  - `hover:border-pgStrokeBlue` - Interactive hover state
  - `focus:border-pgBackgroundBlueTintDark` - Focus ring

- **Icon Colors**:
  - `text-pgIcon-600` - Default icon color
  - `text-pgIcon-400` - Placeholder state icons
  - `text-pgIcon-300` - Disabled state icons

### Shadows & Effects
- `shadow-inputFieldPop` - Default field elevation
- `shadow-buttonsImportantFocus` - Focus state emphasis
- `shadow-tooltip` - Dropdown content elevation

## Styling

### Size Variants
```tsx
// Extra small - Compact forms
<SelectTrigger size="xs" />
// Classes: gap-1.5 rounded-lg py-1.5 pl-2 pr-1.5

// Small - Secondary actions
<SelectTrigger size="sm" />
// Classes: gap-2 rounded-xl py-2 pl-2.5 pr-2

// Medium (default) - Primary forms
<SelectTrigger size="md" />
// Classes: gap-2 rounded-xl px-3 py-2.5
```

### State Variations
```tsx
// Disabled state
<Select disabled>
  <SelectTrigger className="disabled:bg-pgBackground-50 disabled:text-pgText-300" />
</Select>

// Error state (custom)
<SelectTrigger className="border-pgRed-500 focus:border-pgRed-600" />

// Success state (custom)
<SelectTrigger className="border-pgGreen-500 focus:border-pgGreen-600" />
```

### Custom Styling
```tsx
// Right-aligned indicator
<SelectItem indicatorPosition="right" value="option1">
  Option 1
</SelectItem>

// No indicator
<SelectItem noIndicator value="option2">
  Option 2
</SelectItem>

// Custom trigger without default styling
<SelectTriggerUnstyled className="custom-trigger-styles">
  <SelectValue />
  <SelectTriggerIcon>
    <CustomIcon />
  </SelectTriggerIcon>
</SelectTriggerUnstyled>
```

## Responsive Design

The Select component adapts across breakpoints:

```tsx
// Responsive sizing
<SelectTrigger className="w-full sm:w-64 md:w-72 lg:w-80" />

// Responsive content positioning
<SelectContent className="w-full sm:w-auto" />

// Mobile-first approach for form layouts
<div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4">
  <Select>
    <SelectTrigger className="w-full sm:w-48" />
    <SelectContent />
  </Select>
</div>
```

### Breakpoint Behavior
- **Mobile (< 640px)**: Full-width triggers, optimized touch targets
- **Tablet (640px+)**: Flexible width with minimum constraints
- **Desktop (1024px+)**: Fixed widths with enhanced hover states

## Accessibility

### ARIA Features
- **Role Management**: Automatic `combobox`, `listbox`, and `option` roles
- **Keyboard Navigation**: Full arrow key, Enter, Escape, and type-ahead support
- **Screen Reader Support**: Proper announcements for selection changes
- **Focus Management**: Logical focus flow and visible focus indicators

### Implementation Best Practices
```tsx
// Always provide meaningful placeholder text
<SelectValue placeholder="Choose your preferred language..." />

// Use descriptive labels for form context
<label htmlFor="priority-select" className="typography-labelMedium">
  Task Priority
</label>
<Select>
  <SelectTrigger id="priority-select" />
</Select>

// Group related options with labels
<SelectLabel>Recent Projects</SelectLabel>
<SelectItem value="project1">Website Redesign</SelectItem>
<SelectItem value="project2">Mobile App</SelectItem>

// Provide clear disabled state feedback
<SelectItem disabled value="unavailable">
  Feature Coming Soon
</SelectItem>
```

### Color Contrast
- All text combinations meet WCAG AA standards (4.5:1 ratio)
- Focus indicators provide sufficient contrast in both light and dark modes
- Disabled states maintain readable contrast while indicating unavailability

## Dependencies

### Internal Dependencies
- **Icons**: `PiArrowDownSLine`, `PiArrowUpSLine`, `PiCheckLine` from `@/components/icons`
- **Utilities**: `cn` function from `@/lib/utils/cn`

### External Dependencies
- **@radix-ui/react-select**: Core select functionality and accessibility
- **@radix-ui/react-slot**: Icon composition utility
- **class-variance-authority**: Variant-based styling system

### Related Components
- **Form**: Often used within form contexts
- **Label**: Pairs with form labels for proper accessibility
- **Button**: Similar styling patterns and size variants
- **Input**: Consistent field styling and behavior patterns