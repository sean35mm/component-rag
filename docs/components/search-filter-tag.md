# SearchFilterTag Component

## Purpose

The `SearchFilterTag` component is a checkable tag control designed for filtering search results or data sets. It combines a checkbox with a styled tag appearance, allowing users to select/deselect filter options. The component provides visual feedback through state changes and supports both checked and unchecked states with smooth animations.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `label` | `string` | ✅ | - | The text label displayed within the tag |
| `size` | `'18' \| '20'` | ❌ | `'18'` | Controls the overall size of the tag and internal spacing |
| `className` | `string` | ❌ | - | Additional CSS classes to apply to the component |
| `checked` | `boolean` | ❌ | - | Controls the checked state of the tag |
| `defaultChecked` | `boolean` | ❌ | - | Default checked state for uncontrolled usage |
| `onCheckedChange` | `(checked: boolean) => void` | ❌ | - | Callback fired when the checked state changes |
| `disabled` | `boolean` | ❌ | `false` | Whether the tag is disabled |
| `required` | `boolean` | ❌ | `false` | Whether the tag is required |
| `name` | `string` | ❌ | - | Name attribute for form submission |
| `value` | `string` | ❌ | - | Value attribute for form submission |

*Inherits all other props from Radix UI Checkbox primitive*

## Usage Example

```tsx
import { SearchFilterTag } from '@/components/ui/search-filter-tag';
import { useState } from 'react';

export function FilterExample() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleFilterChange = (filterId: string, checked: boolean) => {
    setSelectedFilters(prev => 
      checked 
        ? [...prev, filterId]
        : prev.filter(id => id !== filterId)
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      <SearchFilterTag
        label="Design"
        size="20"
        checked={selectedFilters.includes('design')}
        onCheckedChange={(checked) => handleFilterChange('design', checked)}
      />
      
      <SearchFilterTag
        label="Development"
        size="18"
        checked={selectedFilters.includes('development')}
        onCheckedChange={(checked) => handleFilterChange('development', checked)}
      />
      
      <SearchFilterTag
        label="Marketing"
        disabled
        checked={false}
        onCheckedChange={(checked) => handleFilterChange('marketing', checked)}
      />
    </div>
  );
}
```

## Design System Usage

### Typography
- **Primary Text**: `.typography-labelSmall` - Used for the tag label with normal-case styling

### Colors
- **Background (Unchecked)**: Transparent with `hover:bg-alphaNeutral/24` on hover
- **Background (Checked)**: `bg-pgBackground-800` with `hover:bg-pgBackground-950` on hover
- **Text (Unchecked)**: Inherits from parent (typically `pgText-950`)
- **Text (Checked)**: `text-pgText-0` (white text on dark background)
- **Text (Disabled)**: `text-pgText-300`
- **Background (Disabled)**: `bg-pgBackground-50`
- **Focus Ring**: `ring-alphaNeutral/6` (unchecked), `ring-alphaSapphire/10` (checked)

### Spacing & Layout
- **Minimum Height**: `min-h-7` (28px)
- **Padding**: `pl-[.1875rem]` (3px left padding)
- **Gap (Size 18)**: `gap-1` (checked), `gap-0.5` (unchecked)
- **Gap (Size 20)**: `gap-0.5` (consistent)

## Styling

### Size Variants
- **Size 18**: Smaller variant with dynamic gap spacing and `.875rem` (14px) icon
- **Size 20**: Larger variant with consistent gap spacing and `1.125rem` (18px) icon

### Interactive States
- **Default**: Transparent background with subtle hover effect
- **Hover**: `bg-alphaNeutral/24` background overlay
- **Checked**: Dark background (`pgBackground-800`) with white text
- **Checked + Hover**: Darker background (`pgBackground-950`)
- **Disabled**: Reduced opacity with `pgBackground-50` background and `pgText-300` text
- **Focus**: Ring outline with `ring-2` width

### Animations
- **Check Indicator**: Smooth width and opacity transitions using `transition-all ease-linear`
- **Color Changes**: `transition-colors` for background and text color changes

## Responsive Design

The component maintains consistent sizing across all breakpoints. The design is optimized for touch interactions on mobile devices with adequate hit targets (minimum 28px height). The flexible layout adapts well to various container widths and can be used in responsive grid or flexbox layouts.

## Accessibility

### ARIA Support
- Built on Radix UI Checkbox primitive with full ARIA compliance
- Proper `role="checkbox"` semantics
- `aria-checked` state management
- Keyboard navigation support (Space to toggle, Tab to focus)

### Focus Management
- Custom focus ring styling with `focus-visible:ring-2`
- High contrast focus indicators
- Proper focus order in tab navigation

### Screen Reader Support
- Label text is properly associated with the checkbox
- State changes are announced to screen readers
- Disabled state is properly communicated

### Keyboard Interaction
- **Space**: Toggle checked state
- **Tab**: Move focus to/from the component
- **Enter**: Activate the checkbox (browser default)

## Dependencies

### Internal Dependencies
- `SearchFilterTagBase` - Base styling component
- `searchFilterTagBaseVariants` - Variant configuration
- `PiCheckLine` - Check icon component
- `cn` - Utility for conditional class names

### External Dependencies
- `@radix-ui/react-checkbox` - Accessible checkbox primitive
- `class-variance-authority` - Type-safe variant props
- React `forwardRef` for ref forwarding

### Related Components
- Works alongside other filter components in search interfaces
- Can be used with `SearchFilterTagBase` for custom implementations
- Integrates with form libraries through standard checkbox props