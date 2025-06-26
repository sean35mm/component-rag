# SwitchToggleMenu Component

## Purpose

The `SwitchToggleMenu` component provides a tabbed navigation interface with toggle-style buttons. It consists of a container (`SwitchToggleMenu`) that holds multiple toggle items (`SwitchToggleItem`), creating a pill-style switcher commonly used for filtering, categorization, or view toggling. The component supports icons, active states, and smooth transitions.

## Props Interface

### SwitchToggleMenu Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | - | Additional CSS classes to apply to the container |
| `children` | `ReactNode` | No | - | SwitchToggleItem components to render |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | No | - | Standard HTML div attributes |

### SwitchToggleItem Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `active` | `boolean` | No | `false` | Whether the toggle item is in active state |
| `leftIcon` | `ReactNode` | No | - | Icon or element to display before the text |
| `rightIcon` | `ReactNode` | No | - | Icon or element to display after the text |
| `typographyVariant` | `TypographyProps['variant']` | No | `'labelSmall'` | Typography variant for the button text |
| `className` | `string` | No | - | Additional CSS classes to apply to the button |
| `children` | `ReactNode` | No | - | Button text content |
| `...rest` | `ButtonHTMLAttributes<HTMLButtonElement>` | No | - | Standard HTML button attributes |

## Usage Example

```tsx
import { SwitchToggleMenu, SwitchToggleItem } from '@/components/ui/switch-toggle-menu';
import { Calendar, List, Grid } from 'lucide-react';

function ViewToggle() {
  const [activeView, setActiveView] = useState('list');

  return (
    <SwitchToggleMenu className="mb-4">
      <SwitchToggleItem
        active={activeView === 'list'}
        leftIcon={<List size={16} />}
        onClick={() => setActiveView('list')}
        typographyVariant="labelMedium"
      >
        List View
      </SwitchToggleItem>
      
      <SwitchToggleItem
        active={activeView === 'grid'}
        leftIcon={<Grid size={16} />}
        onClick={() => setActiveView('grid')}
      >
        Grid View
      </SwitchToggleItem>
      
      <SwitchToggleItem
        active={activeView === 'calendar'}
        leftIcon={<Calendar size={16} />}
        rightIcon={<span className="text-pgStateFeature-base">NEW</span>}
        onClick={() => setActiveView('calendar')}
      >
        Calendar
      </SwitchToggleItem>
    </SwitchToggleMenu>
  );
}
```

## Design System Usage

### Typography Classes
- **Default**: `.typography-labelSmall` - Used for button text
- **Configurable**: Accepts any typography variant through `typographyVariant` prop
- **Common variants**: `labelSmall`, `labelMedium`, `labelXSmall`

### Color Tokens Used
- **Container Background**: `bg-alphaNeutral/10` - Semi-transparent neutral background
- **Default Text**: `text-pgText-700` - Medium contrast text
- **Hover Text**: `text-pgText-950` - High contrast text on hover
- **Active Background**: `bg-pgStroke-0` - White/light background for active state
- **Active Text**: `text-pgStroke-950` - Dark text for active state
- **Icon Colors**: `text-pgIcon-600` (default), `text-pgBackground-950` (active)
- **Hover Background**: `hover:bg-alphaNeutral/16` - Light hover state

### Tailwind Utilities
- **Layout**: `inline-flex`, `flex`, `items-center`, `justify-center`
- **Spacing**: `gap-1`, `px-4`, `py-1`, `p-1`, `mr-2`, `ml-2`
- **Borders**: `rounded-xl`, `rounded-[.625rem]`
- **Transitions**: `transition-all`, `transition-colors`
- **Sizing**: `min-w-[100px]`
- **Overflow**: `overflow-x-auto` for horizontal scrolling
- **Text**: `whitespace-nowrap`

## Styling

### Available Variants

#### SwitchToggleItem Active State
- **Default**: Neutral colors with hover effects
- **Active**: White background with shadow (`shadow-toggleSwitch`) and dark text

### Customization Options

```tsx
// Custom styling with design system tokens
<SwitchToggleMenu className="bg-pgNeutral-50 border border-pgStroke-200">
  <SwitchToggleItem 
    className="min-w-[120px] text-pgBlue-600"
    typographyVariant="labelMedium"
  >
    Custom Item
  </SwitchToggleItem>
</SwitchToggleMenu>

// With state colors
<SwitchToggleItem 
  active={isActive}
  className={cn(
    "hover:bg-pgStateSuccess-lighter/20",
    isActive && "bg-pgStateSuccess-base text-pgNeutral-0"
  )}
>
  Success State
</SwitchToggleItem>
```

## Responsive Design

The component adapts across breakpoints:

- **Mobile (< 640px)**: `overflow-x-auto` enables horizontal scrolling when items don't fit
- **Tablet/Desktop**: Items display inline with proper spacing
- **All breakpoints**: `min-w-[100px]` ensures minimum touch target size

```tsx
// Responsive variations
<SwitchToggleMenu className="w-full sm:w-auto sm:max-w-fit">
  <SwitchToggleItem className="flex-1 sm:flex-none sm:min-w-[100px]">
    Responsive Item
  </SwitchToggleItem>
</SwitchToggleMenu>
```

## Accessibility

### Built-in Features
- **Semantic HTML**: Uses proper `<button>` elements
- **Focus Management**: Standard button focus behavior
- **Keyboard Navigation**: Tab navigation and Enter/Space activation
- **Color Contrast**: Meets WCAG guidelines with design system colors

### Recommended Enhancements

```tsx
<SwitchToggleMenu role="tablist" aria-label="View options">
  <SwitchToggleItem
    role="tab"
    aria-selected={activeView === 'list'}
    aria-controls="content-panel"
    id="list-tab"
  >
    List View
  </SwitchToggleItem>
</SwitchToggleMenu>

// With screen reader support
<SwitchToggleItem
  active={isActive}
  aria-pressed={isActive}
  aria-describedby="toggle-help"
>
  Filter Option
</SwitchToggleItem>
```

## Dependencies

### Internal Dependencies
- **Typography Component**: For consistent text rendering
- **cn Utility**: For className merging
- **CVA (Class Variance Authority)**: For variant management

### External Dependencies
- **React**: `forwardRef`, `ButtonHTMLAttributes`, `HTMLAttributes`
- **class-variance-authority**: For type-safe variant props

### Related Components
- **Typography**: Used internally for text rendering
- **Button**: Similar interactive patterns
- **Tabs**: Alternative navigation component
- **SegmentedControl**: Similar toggle-style interface

### CSS Dependencies
- **Custom Shadow**: `shadow-toggleSwitch` (defined in design system)
- **Alpha Colors**: `alphaNeutral` variables
- **Design System Colors**: All `pg*` color tokens