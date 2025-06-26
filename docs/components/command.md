# Command Component

## Purpose

The Command component provides a comprehensive command palette interface with search functionality, built on top of the `cmdk` library. It offers a collection of composable components for creating searchable command menus, dialogs, and selection interfaces with full keyboard navigation support and our design system integration.

## Props Interface

### Command

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | `undefined` | No | Additional CSS classes to apply to the command container |
| `...props` | `ComponentPropsWithoutRef<typeof CommandPrimitive>` | - | No | All props from the underlying CommandPrimitive component |

### CommandDialog

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `ReactNode` | `undefined` | Yes | Command components to render inside the dialog |
| `...props` | `DialogProps` | - | No | Props passed to the underlying Dialog component |

### CommandInput

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | `undefined` | No | Additional CSS classes for the input wrapper |
| `placeholder` | `string` | `undefined` | No | Placeholder text for the search input |
| `...props` | `ComponentPropsWithoutRef<typeof CommandPrimitive.Input>` | - | No | All props from the underlying input component |

### CommandList

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | `undefined` | No | Additional CSS classes for the scrollable list container |
| `...props` | `ComponentPropsWithoutRef<typeof CommandPrimitive.List>` | - | No | All props from the underlying list component |

### CommandEmpty

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `ReactNode` | `undefined` | No | Content to display when no results are found |
| `...props` | `ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>` | - | No | All props from the underlying empty state component |

### CommandGroup

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `heading` | `string` | `undefined` | No | Group heading text |
| `className` | `string` | `undefined` | No | Additional CSS classes for the group container |
| `children` | `ReactNode` | `undefined` | Yes | CommandItem components within the group |
| `...props` | `ComponentPropsWithoutRef<typeof CommandPrimitive.Group>` | - | No | All props from the underlying group component |

### CommandItem

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `value` | `string` | `undefined` | No | Value used for filtering and selection |
| `onSelect` | `(value: string) => void` | `undefined` | No | Callback fired when item is selected |
| `disabled` | `boolean` | `false` | No | Whether the item is disabled |
| `className` | `string` | `undefined` | No | Additional CSS classes for the item |
| `children` | `ReactNode` | `undefined` | Yes | Item content |
| `...props` | `ComponentPropsWithoutRef<typeof CommandPrimitive.Item>` | - | No | All props from the underlying item component |

### CommandShortcut

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `className` | `string` | `undefined` | No | Additional CSS classes for the shortcut display |
| `children` | `ReactNode` | `undefined` | Yes | Shortcut text or key combination |
| `...props` | `HTMLAttributes<HTMLSpanElement>` | - | No | Standard span element attributes |

## Usage Example

```tsx
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';

// Basic Command Palette
function CommandPalette() {
  return (
    <Command className="rounded-lg border border-pgStroke-200 shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem>
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Settings">
          <CommandItem>
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

// Command Dialog Usage
function CommandDialogExample() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <p className="typography-paragraphSmall text-pgNeutral-600 dark:text-pgNeutral-400">
        Press{' '}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-pgNeutral-100 px-1.5 font-mono text-[10px] font-medium text-pgNeutral-600 opacity-100 dark:bg-pgNeutral-800 dark:text-pgNeutral-400">
          <span className="text-xs">⌘</span>K
        </kbd>
      </p>
      
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Quick Actions">
            <CommandItem onSelect={() => setOpen(false)}>
              <span>New Document</span>
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <span>Open File</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
```

## Design System Usage

### Typography Classes
- **Group Headings**: Uses `text-xs font-medium` for section labels
- **Command Items**: Uses `text-sm` for item content
- **Empty State**: Uses `text-sm` for no results messaging
- **Shortcuts**: Uses `text-xs tracking-widest` for keyboard shortcuts

### Color Tokens
- **Background Colors**:
  - `bg-white dark:bg-pgNeutral-950` - Main container background
  - `bg-pgBackground-100 dark:bg-pgBackground-200` - Selected item highlight
  - `bg-transparent` - Default item and input backgrounds

- **Text Colors**:
  - `text-pgNeutral-950 dark:text-pgNeutral-50` - Primary text
  - `text-pgNeutral-500 dark:text-pgNeutral-400` - Secondary text (placeholders, shortcuts, headings)
  - `text-pgText-950` - Selected item text

- **Border Colors**:
  - `border-b` - Input bottom border
  - `bg-pgNeutral-200 dark:bg-pgNeutral-800` - Separator lines

### Spacing & Layout
- **Container**: `p-1` for groups, `px-3` for input wrapper
- **Items**: `px-2 py-1.5` for command items, `px-2 py-1.5` for group headings
- **Input**: `h-11 py-3` for input field height and padding

## Styling

### States
- **Default**: Transparent background with subtle borders
- **Selected**: `data-[selected='true']:bg-pgBackground-100` with enhanced text contrast
- **Disabled**: `data-[disabled=true]:opacity-50` with `pointer-events-none`
- **Hover**: Automatic hover states via `cursor-default` and selection highlighting

### Customization Options
```tsx
// Custom container styling
<Command className="max-w-2xl mx-auto border-2 border-pgBlue-200 shadow-xl">

// Custom input styling
<CommandInput 
  className="border-none focus:ring-2 focus:ring-pgBlue-500" 
  placeholder="Search anything..."
/>

// Custom item styling
<CommandItem className="hover:bg-pgBlue-50 dark:hover:bg-pgBlue-900/20">
  Custom styled item
</CommandItem>

// Custom group styling
<CommandGroup className="border-l-4 border-pgBlue-500 pl-4">
```

## Responsive Design

The Command component is fully responsive and adapts across all breakpoints:

- **Mobile (sm)**: Full width with appropriate touch targets
- **Tablet (md)**: Maintains compact layout with adequate spacing
- **Desktop (lg+)**: Optimal sizing for keyboard navigation

### Dialog Responsive Behavior
```tsx
<CommandDialog>
  {/* Automatically responsive via DialogContent */}
  {/* Adjusts width and positioning based on viewport */}
</CommandDialog>
```

## Accessibility

### ARIA Support
- **Search Input**: Proper labeling and autocomplete attributes
- **List Navigation**: Full keyboard navigation with arrow keys
- **Screen Reader**: Announces selections and state changes
- **Focus Management**: Proper focus trapping in dialog mode

### Keyboard Navigation
- **↑/↓**: Navigate between items
- **Enter**: Select highlighted item
- **Escape**: Close dialog or clear selection
- **⌘K/Ctrl+K**: Common pattern for opening command palette

### Implementation
```tsx
<CommandItem 
  onSelect={(value) => {
    // Handle selection
    announce(`Selected ${value}`); // For screen readers
  }}
>
  <span className="sr-only">Press Enter to select</span>
  Visible content
</CommandItem>
```

## Dependencies

### Internal Dependencies
- `@/components/ui/dialog` - Dialog components for CommandDialog
- `@/components/icons` - PiSearchLine icon for search input
- `@/lib/utils/cn` - Utility for className concatenation

### External Dependencies
- `cmdk` - Core command palette functionality
- `@radix-ui/react-dialog` - Dialog primitive for modal command palette
- `react` - Core React functionality

### Related Components
- **Dialog**: Used by CommandDialog for modal presentation
- **Input**: Similar styling patterns for form consistency
- **Select**: Alternative selection interface for simpler use cases
- **Popover**: Can be used for inline command palette implementations