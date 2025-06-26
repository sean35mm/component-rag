# MenuSearchInput Component

## Purpose

The `MenuSearchInput` is a specialized search input component designed for menu interfaces. It provides a fully-styled search input with customizable icons, auto-focus functionality, and integrated styling that adapts to our design system's color and typography tokens. The component features hover states, focus states, and disabled states with smooth transitions.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `size` | `'32' \| '36' \| '40'` | No | `'36'` | Controls the input size and padding |
| `classNames` | `{ wrapper?: string; input?: string }` | No | - | Custom class names for wrapper and input elements |
| `leftIcon` | `ReactNode` | No | `<PiFilter3Line />` | Icon displayed on the left side of the input |
| `rightIcon` | `ReactNode` | No | `<></>` | Icon displayed on the right side of the input |
| `autoFocusAfterMount` | `boolean` | No | `false` | Automatically focuses the input after component mounts |
| `type` | `string` | No | `'search'` | HTML input type attribute |
| `...other` | `InputHTMLAttributes<HTMLInputElement>` | No | - | All standard HTML input props (excluding `className` and `size`) |

## Usage Example

```tsx
import { MenuSearchInput } from '@/components/ui/menu-search-input';
import { PiMagnifyingGlass, PiX } from '@/components/icons';

function MenuSearchExample() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="space-y-4">
      {/* Basic usage */}
      <MenuSearchInput
        placeholder="Search menu items..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      {/* With custom icons and size */}
      <MenuSearchInput
        size="40"
        placeholder="Search products..."
        leftIcon={<PiMagnifyingGlass />}
        rightIcon={
          searchValue && (
            <button onClick={() => setSearchValue('')}>
              <PiX />
            </button>
          )
        }
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        autoFocusAfterMount
      />

      {/* With custom styling */}
      <MenuSearchInput
        size="32"
        placeholder="Quick search..."
        classNames={{
          wrapper: 'border-pgStrokeBlue-500',
          input: 'typography-paragraphXSmall'
        }}
      />
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **Input Text**: `.typography-paragraphSmall` - Standard paragraph text for input content
- **File Input**: `.typography-paragraphSmall` - Consistent typography for file input labels

### Color Tokens Used
- **Background Colors**:
  - `bg-pgBackgroundWhiteInv-950` - Primary background
  - `bg-pgBackground-50` - Hover and disabled states
- **Text Colors**:
  - `text-pgText-950` - Primary text color
  - `text-pgText-950/35` - Placeholder text (35% opacity)
  - `text-pgText-950/50` - Hover placeholder text
  - `text-pgText-950/65` - Focus placeholder text
  - `text-pgText-300` - Disabled text
- **Icon Colors**:
  - `text-pgIcon-600/35` - Default icon state
  - `text-pgIcon-600/65` - Hover and focus icon states
  - `text-pgIcon-300` - Disabled icon state
- **Border Colors**:
  - `border-pgStrokeBlue` - Focus and hover border states

### Tailwind Utilities
- **Layout**: `flex`, `items-center`, `gap-*`, `w-full`
- **Spacing**: `py-*`, `px-*`, `p-*` based on size variants
- **Border Radius**: `rounded-[.5rem]`, `rounded-[.625rem]`
- **Transitions**: `transition-colors` for smooth state changes
- **Ring Effects**: `ring-alphaNeutral/6` for subtle depth

## Styling

### Size Variants
- **Size 32**: `gap-2 rounded-[.5rem] py-1.5 pl-2 pr-1.5` - Compact size for dense layouts
- **Size 36**: `gap-2 rounded-[.625rem] py-2 pl-2 pr-1.5` - Default balanced size
- **Size 40**: `gap-3 rounded-[.625rem] p-2.5` - Larger size for prominent placement

### Interactive States
- **Default**: Neutral background with subtle ring shadow
- **Hover**: `border-pgStrokeBlue`, `bg-pgBackground-50` with enhanced icon opacity
- **Focus**: `border-pgStrokeBlue` with enhanced placeholder and icon visibility
- **Disabled**: Muted colors with `cursor-not-allowed`, reduced opacity across all elements

### Search-Specific Styling
- **Cancel Button**: Custom-styled search cancel button with mask image
  - Size: `size-4` (16px)
  - Background: `bg-pgIcon-600/65`
  - Custom mask: `url('/search-cancel-button-icon.svg')`

### Customization Options
```tsx
// Custom wrapper styling
classNames={{
  wrapper: 'border-2 border-pgStrokeGreen-500 bg-pgBackground-0'
}}

// Custom input styling  
classNames={{
  input: 'typography-paragraphLarge text-pgText-800'
}}
```

## Responsive Design

The component maintains consistent behavior across all breakpoints. The sizing is controlled through the `size` prop rather than responsive classes, ensuring predictable layout in menu contexts. Icons and text scale appropriately with the container size.

## Accessibility

### Built-in Features
- **Semantic HTML**: Uses proper `<input>` element with search type
- **Keyboard Navigation**: Full keyboard support with standard input behaviors
- **Focus Management**: Clear focus indicators with `focus-visible` states
- **Screen Reader Support**: Proper input labeling and state communication

### Recommended Practices
```tsx
// Add proper labeling
<MenuSearchInput
  placeholder="Search menu items..."
  aria-label="Search through menu items"
  role="searchbox"
/>

// Associate with external label
<label htmlFor="menu-search" className="typography-labelMedium">
  Find Items
</label>
<MenuSearchInput
  id="menu-search"
  placeholder="Start typing..."
/>
```

### Auto-Focus Considerations
- The `autoFocusAfterMount` prop includes a 100ms delay to ensure proper DOM rendering
- Use sparingly to avoid disrupting user navigation flow
- Consider user preferences for reduced motion and auto-focus behavior

## Dependencies

### Internal Dependencies
- **Icons**: `@/components/icons` - Provides `PiFilter3Line` and other icon components
- **Utilities**: `@/lib/utils/cn` - Class name utility for conditional styling
- **External**: `class-variance-authority` - Variant system for component styling
- **External**: `merge-refs` - Ref forwarding utility

### Related Components
- Works well with dropdown menus, command palettes, and filter interfaces
- Commonly paired with results lists or filtered content displays
- Integrates with form validation and state management systems

### Design System Integration
- Follows the same color token patterns as other input components
- Typography scales consistently with paragraph text hierarchy
- State management aligns with other interactive components in the system