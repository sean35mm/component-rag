# Popover Component

## Purpose

The Popover component provides a flexible, accessible overlay container for displaying contextual content, menus, or additional information. Built on Radix UI primitives, it offers controlled visibility states, smart positioning, and smooth enter/exit animations while maintaining full accessibility standards.

## Props Interface

### Popover (Root)
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | ReactNode | ✓ | PopoverTrigger and PopoverContent components |
| open | boolean | ✗ | Controlled open state |
| defaultOpen | boolean | ✗ | Default open state for uncontrolled usage |
| onOpenChange | (open: boolean) => void | ✗ | Callback when open state changes |

### PopoverTrigger
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | ReactNode | ✓ | Element that triggers the popover |
| asChild | boolean | ✗ | Render as child element instead of button |

### PopoverAnchor
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | ReactNode | ✓ | Element to anchor the popover to |
| asChild | boolean | ✗ | Render as child element |

### PopoverContent
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | ReactNode | ✓ | Content to display in the popover |
| className | string | ✗ | Additional CSS classes |
| align | 'start' \| 'center' \| 'end' | ✗ | Alignment relative to trigger (default: 'center') |
| side | 'top' \| 'right' \| 'bottom' \| 'left' | ✗ | Preferred side to render |
| sideOffset | number | ✗ | Offset from the trigger (default: 4) |
| alignOffset | number | ✗ | Offset from the aligned edge |
| avoidCollisions | boolean | ✗ | Adjust position to avoid collisions |
| collisionBoundary | Element \| Element[] | ✗ | Boundary elements for collision detection |

## Usage Example

```tsx
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

// Basic Usage
function BasicPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="typography-labelMedium">
          Open Menu
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-3">
          <h3 className="typography-titleH6 text-pgText-950">
            Account Settings
          </h3>
          <p className="typography-paragraphSmall text-pgText-600">
            Manage your account preferences and settings.
          </p>
          <div className="flex gap-2">
            <Button size="sm" className="typography-labelSmall">
              Save Changes
            </Button>
            <Button variant="ghost" size="sm" className="typography-labelSmall">
              Cancel
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// Controlled State
function ControlledPopover() {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="secondary" 
          className="typography-labelMedium bg-pgBlue-50 text-pgBlue-700 hover:bg-pgBlue-100"
        >
          {open ? 'Close' : 'Open'} Popover
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-96 p-6 bg-gradient-to-br from-pgBackground-0 to-pgNeutral-50"
        side="bottom"
        align="start"
        sideOffset={8}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-pgGreen-500"></div>
            <h4 className="typography-subheadingMedium text-pgText-950">
              Status Update
            </h4>
          </div>
          <p className="typography-paragraphMedium text-pgText-700 leading-relaxed">
            Your changes have been saved successfully and will take effect immediately.
          </p>
          <Button 
            onClick={() => setOpen(false)}
            className="w-full typography-labelMedium"
          >
            Acknowledge
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// Complex Menu Example
function MenuPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontalIcon className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-1" side="bottom" align="end">
        <div className="space-y-1">
          {[
            { label: 'Edit Profile', icon: '✏️', color: 'text-pgText-700' },
            { label: 'Settings', icon: '⚙️', color: 'text-pgText-700' },
            { label: 'Help Center', icon: '❓', color: 'text-pgText-700' },
            { label: 'Sign Out', icon: '🚪', color: 'text-pgRed-600' }
          ].map((item) => (
            <button
              key={item.label}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                'typography-labelMedium text-left',
                'hover:bg-pgNeutral-100 focus:bg-pgNeutral-100',
                'focus:outline-none focus:ring-2 focus:ring-pgBlue-500/20',
                item.color
              )}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

## Design System Usage

### Typography Classes Used
- **Titles**: `.typography-titleH6` for main headings in popover content
- **Labels**: `.typography-labelMedium`, `.typography-labelSmall` for buttons and interactive elements
- **Paragraphs**: `.typography-paragraphMedium`, `.typography-paragraphSmall` for descriptive text
- **Subheadings**: `.typography-subheadingMedium` for section headers

### Color Tokens
- **Background**: `bg-pgBackground-0` (main background), `bg-pgNeutral-50` (subtle variants)
- **Text**: `text-pgText-950` (primary), `text-pgText-700` (secondary), `text-pgText-600` (muted)
- **Borders**: `border-pgStroke-100` (dark mode), default border in light mode
- **State Colors**: `bg-pgBlue-50`, `text-pgBlue-700`, `text-pgRed-600` for semantic states

### Tailwind Utilities
- **Layout**: `size-full`, `w-80`, `w-96`, `w-56`, `p-4`, `p-6`, `p-1`
- **Spacing**: `space-y-3`, `space-y-4`, `gap-2`, `gap-3`
- **Border Radius**: `rounded-xl`, `rounded-lg`
- **Shadow**: `shadow-tooltip`
- **Z-Index**: `z-50`

## Styling

### Default Styles
- Rounded corners with `rounded-xl`
- Subtle border with design system stroke colors
- Tooltip-style shadow for elevation
- Full size container (`size-full`) that adapts to content

### Animation States
- **Enter**: `fade-in-0`, `zoom-in-95`, directional slide-in animations
- **Exit**: `fade-out-0`, `zoom-out-95`, directional slide-out animations
- **Smooth Transitions**: Built-in Radix UI animation system

### Customization Options
```tsx
// Custom styling with design system tokens
<PopoverContent 
  className={cn(
    "w-80 p-6",
    "bg-gradient-to-br from-pgBackground-0 to-pgBlue-50",
    "border-pgBlue-200 shadow-lg",
    "dark:from-pgBackground-900 dark:to-pgBlue-950"
  )}
>
```

### State Variants
- **Default**: Neutral background with system borders
- **Success**: Green accent colors (`pgGreen-*`)
- **Warning**: Orange accent colors (`pgOrange-*`)
- **Error**: Red accent colors (`pgRed-*`)
- **Info**: Blue accent colors (`pgBlue-*`)

## Responsive Design

### Breakpoint Adaptations
```tsx
// Responsive sizing
<PopoverContent className={cn(
  "w-80 sm:w-96 md:w-[28rem]",
  "p-4 sm:p-6",
  "text-sm sm:text-base"
)}>

// Mobile-optimized positioning
<PopoverContent 
  side="bottom"
  align="center"
  className="mx-4 sm:mx-0 max-w-[calc(100vw-2rem)] sm:max-w-none"
>
```

### Mobile Considerations
- Automatic collision detection prevents off-screen rendering
- Touch-friendly sizing with adequate padding
- Responsive width constraints for small screens

## Accessibility

### ARIA Features
- **Role Management**: Proper dialog/menu roles from Radix UI
- **Focus Management**: Automatic focus trapping and restoration
- **Keyboard Navigation**: ESC to close, arrow keys for menu navigation
- **Screen Reader Support**: Proper labeling and state announcements

### Keyboard Interactions
- **Enter/Space**: Open popover from trigger
- **Escape**: Close popover
- **Tab**: Navigate through focusable elements
- **Arrow Keys**: Navigate menu items (when applicable)

### Implementation
```tsx
// Accessible trigger labeling
<PopoverTrigger 
  asChild
  aria-label="Open user menu"
  aria-expanded={open}
>
  <Button>Menu</Button>
</PopoverTrigger>

// Accessible content structure
<PopoverContent>
  <div role="menu" aria-label="User actions">
    <button role="menuitem">Edit Profile</button>
    <button role="menuitem">Settings</button>
  </div>
</PopoverContent>
```

## Dependencies

### External Dependencies
- **@radix-ui/react-popover**: Core popover functionality and accessibility
- **React**: Required for component composition

### Internal Dependencies
- **@/lib/utils/cn**: Utility for conditional className merging
- **Design System Tokens**: Typography, color, and spacing classes from globals.css

### Related Components
- **Button**: Common trigger element
- **Menu**: For dropdown-style popovers
- **Tooltip**: Similar positioning behavior
- **Dialog**: For larger overlay content
- **DropdownMenu**: Alternative for action menus

### Usage with Other Components
```tsx
// With form components
<Popover>
  <PopoverTrigger asChild>
    <Input placeholder="Search..." />
  </PopoverTrigger>
  <PopoverContent>
    <SearchResults />
  </PopoverContent>
</Popover>

// With navigation
<Popover>
  <PopoverTrigger asChild>
    <Avatar />
  </PopoverTrigger>
  <PopoverContent>
    <UserMenu />
  </PopoverContent>
</Popover>
```