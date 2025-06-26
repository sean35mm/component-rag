# Tooltip Component

## Purpose

The Tooltip component provides contextual information in a small overlay that appears when users hover over or interact with trigger elements. Built on Radix UI primitives, it offers enhanced touch support, flexible positioning, and comprehensive customization options aligned with our design system.

## Props Interface

### TooltipProvider Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `delayDuration` | `number` | No | `50` | Delay in milliseconds before tooltip appears |
| `skipDelayDuration` | `number` | No | - | Duration to skip delay when moving between tooltips |
| `disableHoverableContent` | `boolean` | No | - | Prevents tooltip content from being hoverable |

### Tooltip Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `useTouch` | `boolean` | No | `true` | Enables touch interaction support for mobile devices |
| `closeOnClickOutside` | `boolean` | No | `true` | Controls whether tooltip closes when clicking outside |
| `propagateClicks` | `boolean` | No | `false` | Allows click events to propagate to parent elements |
| `open` | `boolean` | No | - | Controlled open state |
| `defaultOpen` | `boolean` | No | - | Default open state for uncontrolled usage |
| `onOpenChange` | `(open: boolean) => void` | No | - | Callback fired when open state changes |

### TooltipContent Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `arrow` | `boolean` | No | `true` | Shows/hides the tooltip arrow |
| `dark` | `boolean` | No | `false` | Applies dark theme variant |
| `size` | `'xxs' \| 'xs' \| 'l'` | No | `'xs'` | Controls tooltip size and typography |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | No | `'right'` | Preferred side for tooltip placement |
| `sideOffset` | `number` | No | `4` | Distance in pixels from the trigger |
| `align` | `'start' \| 'center' \| 'end'` | No | `'center'` | Alignment relative to the trigger |
| `alignOffset` | `number` | No | `0` | Offset in pixels from the aligned position |

## Usage Example

```tsx
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { InfoIcon } from '@/components/icons';

function UserProfile() {
  return (
    <TooltipProvider>
      {/* Basic tooltip */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm">
            <InfoIcon className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Additional information about this feature</p>
        </TooltipContent>
      </Tooltip>

      {/* Dark theme tooltip */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="text-pgText-600 hover:text-pgText-950">
            Help
          </button>
        </TooltipTrigger>
        <TooltipContent dark size="l" side="top">
          <div className="space-y-1">
            <p className="typography-labelSmall text-pgText-0">Pro Tip</p>
            <p>Use keyboard shortcuts to navigate faster</p>
          </div>
        </TooltipContent>
      </Tooltip>

      {/* Touch-optimized tooltip */}
      <Tooltip useTouch closeOnClickOutside={false}>
        <TooltipTrigger asChild>
          <div className="inline-flex items-center gap-2">
            <span>Mobile Feature</span>
            <InfoIcon className="w-3 h-3 text-pgBlue-500" />
          </div>
        </TooltipTrigger>
        <TooltipContent size="xxs" side="bottom">
          Tap to learn more
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
```

## Design System Usage

### Typography Classes
- **Size XXS**: `.typography-paragraphXSmall` - Minimal tooltips with compact text
- **Size XS**: `.typography-paragraphSmall` - Standard tooltip text (default)
- **Size L**: `.typography-paragraphSmall` - Larger tooltips with more content

### Color Tokens
- **Light Theme Background**: `bg-pgBackground-0` with `text-pgText-950`
- **Dark Theme Background**: `bg-pgBackground-950` with `text-pgText-0`
- **Shadow**: Custom shadow using `rgba(14,18,27,0.06)` and `rgba(14,18,27,0.03)`
- **Border**: `border-transparent` (light) / `border-pgBackground-950` (dark)

### Spacing & Layout
- **XXS Size**: `px-1.5 py-0.5` with `rounded`
- **XS Size**: `px-2.5 py-1` with `rounded-md`
- **L Size**: `p-3` with `rounded-xl`
- **Default Offset**: `sideOffset={4}` (16px from trigger)

## Styling

### Size Variants
```tsx
// Minimal tooltip for icons or short labels
<TooltipContent size="xxs">?</TooltipContent>

// Standard tooltip (default)
<TooltipContent size="xs">Standard tooltip text</TooltipContent>

// Large tooltip for detailed content
<TooltipContent size="l">
  <div className="space-y-2">
    <p className="typography-labelSmall">Title</p>
    <p>Detailed explanation with multiple lines of content.</p>
  </div>
</TooltipContent>
```

### Theme Variants
```tsx
// Light theme (default)
<TooltipContent>Light tooltip</TooltipContent>

// Dark theme
<TooltipContent dark>Dark tooltip</TooltipContent>
```

### Custom Styling
```tsx
<TooltipContent 
  className="max-w-xs border border-pgStroke-200"
  dark
  size="l"
>
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 rounded-full bg-pgBlue-100 flex items-center justify-center">
      <InfoIcon className="w-4 h-4 text-pgBlue-600" />
    </div>
    <div>
      <p className="typography-labelMedium text-pgText-0 mb-1">Feature Update</p>
      <p className="typography-paragraphSmall text-pgText-200">
        New functionality is now available in your dashboard.
      </p>
    </div>
  </div>
</TooltipContent>
```

## Responsive Design

The tooltip component adapts automatically across breakpoints:

- **Mobile (< 640px)**: Touch interactions enabled by default, larger touch targets
- **Tablet (640px - 1024px)**: Hybrid hover/touch support
- **Desktop (> 1024px)**: Hover-optimized interactions with reduced delay

```tsx
// Responsive tooltip positioning
<TooltipContent 
  side="bottom" 
  className="sm:side-right lg:max-w-sm xl:max-w-md"
>
  Content adapts to screen size
</TooltipContent>
```

## Accessibility

### ARIA Support
- Automatic `aria-describedby` relationship between trigger and content
- `role="tooltip"` applied to content
- Keyboard navigation support (Escape to close)
- Focus management when tooltip opens/closes

### Keyboard Interactions
- **Escape**: Closes the tooltip
- **Tab**: Moves focus away and closes tooltip
- **Enter/Space**: Opens tooltip when trigger is focused

### Screen Reader Support
```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <button aria-label="User settings">
      <SettingsIcon />
    </button>
  </TooltipTrigger>
  <TooltipContent>
    Access your account settings and preferences
  </TooltipContent>
</Tooltip>
```

## Dependencies

### Internal Dependencies
- `@/lib/utils/cn` - Class name utility for conditional styling
- Design system color tokens (pgBackground, pgText, pgStroke)
- Typography scale classes

### External Dependencies
- `@radix-ui/react-tooltip` - Base tooltip primitives
- `class-variance-authority` - Variant management
- `react` - Core React functionality

### Related Components
- **Button** - Common trigger element
- **IconButton** - Frequent tooltip trigger
- **FormField** - Often uses tooltips for help text
- **Badge** - May include explanatory tooltips

### Best Practices
1. **Content Length**: Keep tooltip content concise (< 100 characters for standard size)
2. **Trigger Size**: Ensure triggers have adequate touch targets (minimum 44px)
3. **Positioning**: Test tooltip positioning near viewport edges
4. **Performance**: Use `TooltipProvider` at app level to share delay settings
5. **Mobile**: Consider alternative patterns for complex tooltip content on small screens