# DropdownMenu Component

## Purpose

The DropdownMenu component provides a flexible, accessible dropdown menu system built on top of Radix UI's DropdownMenu primitive. It supports various menu items including regular items, checkboxes, radio buttons, separators, and keyboard shortcuts. The component is fully integrated with our design system's color palette, typography scale, and spacing conventions.

## Props Interface

### DropdownMenu (Root)
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `ReactNode` | Yes | Menu trigger and content components |
| `open` | `boolean` | No | Controls the open state of the dropdown |
| `onOpenChange` | `(open: boolean) => void` | No | Callback fired when open state changes |
| `defaultOpen` | `boolean` | No | Default open state (uncontrolled) |
| `modal` | `boolean` | No | Whether the dropdown is modal (default: true) |

### DropdownMenuTrigger
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `asChild` | `boolean` | No | Merge props into child element instead of rendering button |
| `children` | `ReactNode` | Yes | Trigger element content |

### DropdownMenuContent
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `sideOffset` | `number` | No | Distance from trigger (default: 4) |
| `align` | `'start' \| 'center' \| 'end'` | No | Alignment relative to trigger |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | No | Preferred side to render |
| `className` | `string` | No | Additional CSS classes |

### DropdownMenuItem
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `asChild` | `boolean` | No | Render as child element |
| `inset` | `boolean` | No | Add left padding for alignment |
| `size` | `'mobile' \| 'sm'` | No | Size variant (default: 'sm') |
| `variant` | `'default' \| 'destructive'` | No | Visual variant (default: 'default') |
| `disabled` | `boolean` | No | Disable the menu item |
| `onSelect` | `(event: Event) => void` | No | Callback when item is selected |

### DropdownMenuRadioItem
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value` | `string` | Yes | Radio item value |
| `size` | `'sm' \| 'lg'` | No | Size variant (default: 'sm') |
| `disabled` | `boolean` | No | Disable the radio item |

### DropdownMenuCheckboxItem
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `checked` | `boolean \| 'indeterminate'` | No | Checkbox state |
| `onCheckedChange` | `(checked: boolean) => void` | No | Callback when checked state changes |
| `disabled` | `boolean` | No | Disable the checkbox item |

## Usage Example

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { PiDotsThreeVerticalBold, PiUserCircle, PiGear, PiSignOut } from '@/components/icons';

export function UserMenu() {
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState('light');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <PiDotsThreeVerticalBold className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="typography-labelSmall text-pgText-600">
          My Account
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem size="sm" variant="default">
          <PiUserCircle className="mr-2 h-4 w-4" />
          Profile
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        
        <DropdownMenuItem size="sm">
          <PiGear className="mr-2 h-4 w-4" />
          Settings
          <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuCheckboxItem
          checked={notifications}
          onCheckedChange={setNotifications}
        >
          Email notifications
        </DropdownMenuCheckboxItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel className="typography-labelSmall text-pgText-600">
          Theme
        </DropdownMenuLabel>
        
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenuRadioItem value="light" size="sm">
            Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark" size="sm">
            Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system" size="sm">
            System
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem variant="destructive" size="sm">
          <PiSignOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuShortcut>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## Design System Usage

### Typography Classes
- **Labels**: `.typography-labelSmall` for menu labels and radio items (large size)
- **Paragraphs**: `.typography-paragraphSmall` for small menu items, `.typography-paragraphMedium` for mobile size items

### Color Tokens
- **Background**: `bg-pgBackground-0` for menu content
- **Text Colors**: 
  - `text-pgText-950` for primary text
  - `text-pgText-600` for secondary text/labels
  - `text-pgText-300` for disabled states
- **Icon Colors**:
  - `text-pgIcon-600/80` for default icons with opacity
  - `text-pgIcon-600` for active/hover states
  - `text-pgIcon-300` for disabled icons
- **State Colors**:
  - `text-pgStateError-base` for destructive variant
- **Interactive States**:
  - `hover:bg-alphaNeutral/10` for hover backgrounds
  - `focus:bg-alphaNeutral/10` for focus backgrounds

### Spacing & Layout
- **Padding**: `p-2` for menu content and items
- **Gaps**: `gap-1` for menu content, `gap-2` for small items, `gap-3` for large items, `gap-3.5` for mobile items
- **Margins**: `my-1` for separators, `ml-auto` for shortcuts and indicators

## Styling

### Size Variants
- **`sm`** (default): Compact size with `typography-paragraphSmall`, `gap-2`, and `size-5` icons
- **`mobile`**: Larger touch-friendly size with `typography-paragraphMedium`, `gap-3.5`, and `size-[1.375rem]` icons
- **`lg`** (radio items): Large radio items with `typography-labelSmall` and `gap-3`

### Visual Variants
- **`default`**: Standard appearance with `text-pgText-950` and icon opacity transitions
- **`destructive`**: Red styling using `text-pgStateError-base` for dangerous actions

### Border Radius
- **Menu Content**: `rounded-xl` for modern, soft appearance
- **Menu Items**: `rounded-lg` for small items, `rounded-[.625rem]` for large radio items

## Responsive Design

The component adapts to different screen sizes through:
- **Mobile Size Variant**: Larger touch targets and typography for mobile interfaces
- **Flexible Width**: `min-w-[8rem]` ensures minimum usable width
- **Responsive Icons**: Different icon sizes for different variants
- **Touch-Friendly**: Mobile variant provides larger interaction areas

## Accessibility

### Keyboard Navigation
- **Arrow Keys**: Navigate between menu items
- **Enter/Space**: Activate menu items
- **Escape**: Close menu
- **Tab**: Focus management within menu

### Screen Reader Support
- **ARIA Labels**: Proper labeling for menu structure
- **Role Attributes**: Semantic menu roles from Radix UI
- **State Announcements**: Checked/unchecked states for radio and checkbox items
- **Keyboard Shortcuts**: Announced via `DropdownMenuShortcut` component

### Focus Management
- **Focus Trap**: Focus remains within menu when open
- **Focus Return**: Focus returns to trigger when menu closes
- **Visual Focus**: Clear focus indicators with background color changes

## Dependencies

### Internal Dependencies
- **Icons**: `PiArrowRightSLine`, `PiCheckLine` from `@/components/icons`
- **Utilities**: `cn` utility for class name merging from `@/lib/utils/cn`

### External Dependencies
- **Radix UI**: `@radix-ui/react-dropdown-menu` for primitive functionality
- **Class Variance Authority**: `cva` for variant management
- **Radix Slot**: For `asChild` prop functionality

### Related Components
- **Button**: Often used as trigger element
- **Icons**: Various icons for menu items
- **Separator**: Visual dividers between menu sections