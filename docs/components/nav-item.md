# NavItem Component

## Purpose

The `NavItem` component is a navigation link element designed for sidebar navigation, menus, and navigation lists. It automatically handles both internal and external links, provides visual states for active items, and supports customizable icons on both sides of the text content.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `href` | `string` | ✅ | - | The URL or path for the navigation link |
| `children` | `ReactNode` | ✅ | - | The text content or elements to display as the link label |
| `iconLeft` | `ReactNode` | ❌ | - | Icon component to display on the left side of the text |
| `iconRight` | `ReactNode` | ❌ | - | Icon component to display on the right side of the text (overridden by external link indicator) |
| `active` | `boolean` | ❌ | `false` | Whether this navigation item is currently active/selected |
| `className` | `string` | ❌ | - | Additional CSS classes to apply to the component |
| `...rest` | `HTMLAttributes<HTMLElement>` | ❌ | - | Additional HTML attributes passed to the underlying link element |

## Usage Example

```tsx
import { NavItem } from '@/components/ui/nav-item';
import { PiHouseLine, PiUserLine, PiSettingsLine, PiChevronRightLine } from '@/components/icons';

function Sidebar() {
  const currentPath = usePathname();

  return (
    <nav className="w-64 bg-pgBackground-50 p-4">
      {/* Internal link with left icon */}
      <NavItem
        href="/dashboard"
        iconLeft={<PiHouseLine />}
        active={currentPath === '/dashboard'}
      >
        Dashboard
      </NavItem>

      {/* Internal link with both icons */}
      <NavItem
        href="/profile"
        iconLeft={<PiUserLine />}
        iconRight={<PiChevronRightLine />}
        active={currentPath === '/profile'}
      >
        Profile Settings
      </NavItem>

      {/* External link (automatically shows external indicator) */}
      <NavItem
        href="https://docs.example.com"
        iconLeft={<PiSettingsLine />}
      >
        Documentation
      </NavItem>

      {/* Custom styling */}
      <NavItem
        href="/settings"
        iconLeft={<PiSettingsLine />}
        className="mt-6 border-t border-pgStroke-200 pt-4"
        active={currentPath === '/settings'}
      >
        Settings
      </NavItem>
    </nav>
  );
}
```

## Design System Usage

### Typography
- **Text Content**: `.typography-labelSmall` - Consistent with our label hierarchy for navigation elements

### Colors
- **Default State**: 
  - Text: Inherits from Typography component
  - Icons: `text-pgIcon-600` - Standard icon color
- **Hover State**: `hover:bg-alphaNeutral/16` - Subtle background highlight
- **Active State**: `bg-alphaNeutral/16` - Same as hover for consistent visual feedback
- **External Link Badge**: 
  - Background: `bg-pgBackground-0` 
  - Shadow: `shadow-sm`
  - Icon: `text-pgIcon-600`

### Spacing & Layout
- **Container**: `px-3 py-2` - Standard padding for touch-friendly interaction
- **Vertical Spacing**: `my-2` - Consistent spacing between navigation items
- **Icon Spacing**: `mr-[6px]` and `ml-[6px]` - Precise spacing for icon alignment
- **Icon Size**: `size-[18px]` - Standard navigation icon size

## Styling

### Visual States

#### Default State
```tsx
<NavItem href="/example">Navigation Item</NavItem>
```

#### Active State
```tsx
<NavItem href="/example" active>Current Page</NavItem>
```

#### With Icons
```tsx
<NavItem 
  href="/example"
  iconLeft={<PiHouseLine />}
  iconRight={<PiChevronRightLine />}
>
  Navigation Item
</NavItem>
```

#### External Link (Automatic)
```tsx
<NavItem href="https://external.com">External Link</NavItem>
```

### Customization Options

The component accepts additional styling through the `className` prop:

```tsx
{/* Custom background color */}
<NavItem 
  href="/example"
  className="bg-pgBlue-50 hover:bg-pgBlue-100"
>
  Custom Styling
</NavItem>

{/* Different border radius */}
<NavItem 
  href="/example"
  className="rounded-full"
>
  Rounded Navigation
</NavItem>
```

## Responsive Design

The component uses responsive-friendly units and behaviors:

- **Touch Targets**: Adequate padding (`py-2 px-3`) ensures minimum 44px touch target height
- **Icon Scaling**: Fixed `18px` icons maintain readability across all screen sizes
- **Flexible Width**: Component adapts to container width automatically
- **Text Wrapping**: Long navigation labels wrap naturally within the container

## Accessibility

### Built-in Features
- **Semantic HTML**: Uses Next.js `Link` component which renders as proper anchor tags
- **Keyboard Navigation**: Full keyboard support through native link behavior
- **Screen Reader Support**: Link text is properly announced
- **External Link Indication**: Visual and semantic indication of external links with `target="_blank"` and `rel="noopener noreferrer"`

### Implementation Recommendations

```tsx
{/* Add ARIA labels for icon-only navigation */}
<NavItem 
  href="/dashboard"
  iconLeft={<PiHouseLine />}
  aria-label="Go to dashboard"
>
  Dashboard
</NavItem>

{/* Use aria-current for active states */}
<NavItem 
  href="/current-page"
  active
  aria-current="page"
>
  Current Page
</NavItem>
```

## Dependencies

### Internal Dependencies
- **Typography Component**: `@/components/ui/typography` - For consistent text styling
- **useLink Hook**: `@/components/hooks/use-link` - Detects external links
- **Icons**: `@/components/icons` - Icon components (specifically `PiArrowRightUpLine`)
- **Utilities**: `@/lib/utils/cn` - Class name merging utility

### External Dependencies
- **Next.js Link**: `next/link` - Client-side navigation
- **React**: For component props and types

### Related Design System Components
- **Typography**: Used internally for text styling
- **Icon System**: Compatible with all design system icons
- **Navigation Components**: Can be used within sidebar, header, or menu components