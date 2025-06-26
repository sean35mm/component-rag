# Context Menu Component

## Purpose

The Context Menu component provides a collection of contextual menu primitives built on top of Radix UI. It enables right-click or long-press interactions to display contextual actions, submenus, checkboxes, radio buttons, and keyboard shortcuts. The component follows our design system's visual language with proper styling, animations, and accessibility features.

## Props Interface

### ContextMenu
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | `ReactNode` | ✓ | The trigger and content elements |

### ContextMenuTrigger
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | `ReactNode` | ✓ | The element that triggers the context menu |
| asChild | `boolean` | ✗ | Merge props with immediate child |

### ContextMenuContent
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| className | `string` | ✗ | Additional CSS classes |
| children | `ReactNode` | ✓ | Menu items and content |
| align | `'start' \| 'center' \| 'end'` | ✗ | Alignment relative to trigger |
| sideOffset | `number` | ✗ | Distance from trigger (default: 4) |

### ContextMenuItem
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| className | `string` | ✗ | Additional CSS classes |
| inset | `boolean` | ✗ | Adds left padding for alignment with items containing icons |
| disabled | `boolean` | ✗ | Disables the menu item |
| onSelect | `(event: Event) => void` | ✗ | Callback when item is selected |
| children | `ReactNode` | ✓ | Item content |

### ContextMenuCheckboxItem
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| className | `string` | ✗ | Additional CSS classes |
| checked | `boolean \| 'indeterminate'` | ✗ | Checked state |
| onCheckedChange | `(checked: boolean) => void` | ✗ | Callback when checked state changes |
| children | `ReactNode` | ✓ | Item content |

### ContextMenuRadioItem
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| className | `string` | ✗ | Additional CSS classes |
| value | `string` | ✓ | The value for the radio item |
| children | `ReactNode` | ✓ | Item content |

### ContextMenuSubTrigger
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| className | `string` | ✗ | Additional CSS classes |
| inset | `boolean` | ✗ | Adds left padding for alignment |
| children | `ReactNode` | ✓ | Trigger content |

### ContextMenuLabel
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| className | `string` | ✗ | Additional CSS classes |
| inset | `boolean` | ✗ | Adds left padding for alignment |
| children | `ReactNode` | ✓ | Label content |

### ContextMenuShortcut
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| className | `string` | ✗ | Additional CSS classes |
| children | `ReactNode` | ✓ | Shortcut text (e.g., "⌘K") |

## Usage Example

```tsx
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuLabel,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from '@/components/ui/context-menu';

function DocumentContextMenu() {
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [person, setPerson] = useState('pedro');

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-48 items-center justify-center rounded-xl border border-pgStroke-200 bg-pgBackground-50 text-sm">
        <span className="typography-labelMedium text-pgText-700">
          Right click here
        </span>
      </ContextMenuTrigger>
      
      <ContextMenuContent className="w-64">
        <ContextMenuItem>
          <span className="typography-labelSmall">Back</span>
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        
        <ContextMenuItem disabled>
          <span className="typography-labelSmall">Forward</span>
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        
        <ContextMenuItem>
          <span className="typography-labelSmall">Reload</span>
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <span className="typography-labelSmall">More Tools</span>
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>
              <span className="typography-labelSmall">Save Page As...</span>
              <ContextMenuShortcut>⌘+S</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              <span className="typography-labelSmall">Create Shortcut...</span>
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        
        <ContextMenuSeparator />
        
        <ContextMenuCheckboxItem
          checked={showBookmarks}
          onCheckedChange={setShowBookmarks}
        >
          <span className="typography-labelSmall">Show Bookmarks Bar</span>
          <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
        </ContextMenuCheckboxItem>
        
        <ContextMenuSeparator />
        
        <ContextMenuRadioGroup value={person} onValueChange={setPerson}>
          <ContextMenuLabel inset>
            <span className="typography-labelSmall text-pgText-600">People</span>
          </ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuRadioItem value="pedro">
            <span className="typography-labelSmall">Pedro Duarte</span>
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value="colm">
            <span className="typography-labelSmall">Colm Tuite</span>
          </ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
```

## Design System Usage

### Typography
- **Menu Items**: Use `.typography-labelSmall` or `.typography-labelMedium` for menu item text
- **Labels**: Use `.typography-labelSmall` with `text-pgText-600` for section labels
- **Shortcuts**: Automatically styled with smaller text and reduced opacity

### Colors
- **Background**: `bg-pgBackground-50` for menu content
- **Borders**: `border-pgStroke-250` for menu borders, `bg-pgStroke-200` for separators
- **Text**: `text-pgText-950` for primary text, `text-pgText-700` for secondary text
- **Focus States**: `focus:bg-alphaNeutral/6` for subtle hover effects
- **State Colors**: Supports all design system state colors for different menu item types

### Spacing & Layout
- **Padding**: `p-1` for menu container, `px-2 py-2` for menu items
- **Radius**: `rounded-xl` for menu container, `rounded-lg` for menu items
- **Icons**: `size-4` for action icons, `size-2` for radio indicators

## Styling

### Available Variants

**Menu Items:**
```tsx
// Standard item
<ContextMenuItem>Default Item</ContextMenuItem>

// Disabled item
<ContextMenuItem disabled>Disabled Item</ContextMenuItem>

// Item with inset (for alignment with checkboxes/radios)
<ContextMenuItem inset>Inset Item</ContextMenuItem>
```

**Interactive Items:**
```tsx
// Checkbox item
<ContextMenuCheckboxItem checked={true}>
  Checkbox Item
</ContextMenuCheckboxItem>

// Radio group
<ContextMenuRadioGroup value="option1">
  <ContextMenuRadioItem value="option1">Option 1</ContextMenuRadioItem>
  <ContextMenuRadioItem value="option2">Option 2</ContextMenuRadioItem>
</ContextMenuRadioGroup>
```

### States
- **Default**: Clean, minimal styling with design system colors
- **Hover/Focus**: Subtle background change with `bg-alphaNeutral/6`
- **Disabled**: Reduced opacity (50%) and disabled pointer events
- **Open/Closed**: Smooth animations with fade and zoom effects

### Customization
```tsx
// Custom styling
<ContextMenuContent className="w-80 bg-pgBackground-100">
  <ContextMenuItem className="text-pgBlue-600 hover:bg-pgBlue-50">
    Custom Styled Item
  </ContextMenuItem>
</ContextMenuContent>
```

## Responsive Design

The Context Menu is designed to work across all breakpoints:

- **Mobile (< 640px)**: Automatically adjusts positioning to stay within viewport
- **Tablet (640px - 1024px)**: Standard behavior with touch-friendly sizing
- **Desktop (> 1024px)**: Full feature set with keyboard navigation

The component uses Radix UI's collision detection to automatically reposition when it would overflow the viewport.

## Accessibility

### ARIA Support
- **Roles**: Proper `menu`, `menuitem`, `menuitemcheckbox`, and `menuitemradio` roles
- **States**: `aria-checked`, `aria-disabled`, and `aria-expanded` attributes
- **Labels**: Support for `aria-label` and `aria-labelledby`

### Keyboard Navigation
- **Arrow Keys**: Navigate between menu items
- **Enter/Space**: Activate menu items
- **Escape**: Close menu and submenus
- **Tab**: Move focus outside the menu (closes menu)

### Focus Management
- Automatic focus management when opening/closing
- Focus returns to trigger element when menu closes
- Proper focus trapping within submenus

### Screen Reader Support
- Announces menu state changes
- Provides context for checkbox and radio items
- Keyboard shortcuts are announced appropriately

## Dependencies

### Internal Dependencies
- `@/components/icons` - For PiArrowRightLine, PiCheckLine, PiCircleFill icons
- `@/lib/utils/cn` - For className merging utility

### External Dependencies
- `@radix-ui/react-context-menu` - Core context menu primitives
- `React` - For component composition and refs

### Related Components
- **Dropdown Menu** - For click-triggered menus
- **Command** - For command palette interfaces
- **Sheet** - For mobile menu alternatives
- **Dialog** - For confirmation actions triggered from menu items