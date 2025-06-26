# Sheet Component

## Purpose

The Sheet component is a slide-out panel (drawer/sidebar) built on top of Radix UI Dialog primitives. It provides a flexible overlay interface that slides in from any edge of the screen, commonly used for navigation menus, forms, filters, or detailed content views. The component includes drag-to-close functionality and full responsive design support.

## Props Interface

### SheetContentProps
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `side` | `"top" \| "bottom" \| "left" \| "right"` | No | `"right"` | Direction from which the sheet slides in |
| `className` | `string` | No | - | Additional CSS classes |
| `children` | `ReactNode` | No | - | Content to render inside the sheet |

### SheetHeaderProps
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `closeable` | `boolean` | No | `true` | Whether to show the close button |
| `divider` | `boolean` | No | `true` | Whether to show bottom border divider |
| `size` | `"s" \| "l" \| "xl"` | No | `"xl"` | Header size variant |
| `closeIconSide` | `"left" \| "right"` | No | `"right"` | Position of close button |
| `isMobile` | `boolean` | No | `false` | Use mobile-specific close icon |
| `closeButtonVariants` | `CompactButtonProps` | No | - | Props for the close button |
| `className` | `string` | No | - | Additional CSS classes |

### SheetTitleProps
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `size` | `"s" \| "l" \| "xl"` | No | `"xl"` | Title size variant |
| `className` | `string` | No | - | Additional CSS classes |

### SheetContentDividerProps
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `label` | `string` | Yes | - | Text label for the divider section |

## Usage Example

```tsx
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetContentDivider,
  SheetClose,
} from '@/components/ui/sheet';
import { CompactButton } from '@/components/ui/compact-button';

function NavigationSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <CompactButton variant="outline">
          Open Menu
        </CompactButton>
      </SheetTrigger>
      
      <SheetContent side="left" className="w-full sm:max-w-md">
        <SheetHeader size="xl" divider>
          <SheetTitle size="xl">Navigation Menu</SheetTitle>
          <SheetDescription>
            Access your account settings and preferences
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto">
          <SheetContentDivider label="Main Navigation" />
          <nav className="p-4 space-y-2">
            <a href="/dashboard" className="block p-3 rounded-lg bg-pgBackground-100 hover:bg-pgBackground-200">
              Dashboard
            </a>
            <a href="/settings" className="block p-3 rounded-lg hover:bg-pgBackground-100">
              Settings
            </a>
          </nav>
          
          <SheetContentDivider label="Account" />
          <div className="p-4 space-y-2">
            <button className="w-full text-left p-3 rounded-lg hover:bg-pgBackground-100">
              Profile
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-pgBackground-100 text-pgStateError-base">
              Sign Out
            </button>
          </div>
        </div>
        
        <SheetFooter>
          <SheetClose asChild>
            <CompactButton variant="outline" className="flex-1">
              Cancel
            </CompactButton>
          </SheetClose>
          <CompactButton className="flex-1">
            Save Changes
          </CompactButton>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

// Mobile-optimized example
function MobileSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <CompactButton size="sm" variant="ghost">
          <MenuIcon />
        </CompactButton>
      </SheetTrigger>
      
      <SheetContent side="right">
        <SheetHeader 
          size="l" 
          isMobile 
          closeIconSide="left"
          closeButtonVariants={{ variant: "ghost", size: "md" }}
        >
          <SheetTitle size="l">Mobile Menu</SheetTitle>
        </SheetHeader>
        
        <div className="p-4">
          <p className="typography-paragraphMedium text-pgText-700">
            Mobile-optimized content here
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
```

## Design System Usage

### Typography Classes
- **SheetTitle**: 
  - `xl`: `.typography-labelXLarge`
  - `l`: `.typography-labelLarge` 
  - `s`: `.typography-labelLarge`
- **SheetDescription**: `.typography-paragraphSmall`
- **SheetContentDivider**: `.typography-subheadingXSmall`

### Color Tokens
- **Background**: `bg-pgBackground-50` (main content), `bg-pgBackground-0` (footer)
- **Text Colors**: `text-pgText-950` (titles), `text-pgText-600` (descriptions), `text-pgText-400` (dividers)
- **Overlay**: `bg-pgBackgroundOverlay/24` (light mode), `bg-pgBackgroundOverlay/65` (dark mode)
- **Borders**: `border-pgStroke-200` (implied through border classes)
- **Icons**: `fill-pgIcon-600`

### Spacing & Layout
- **Padding**: `p-5` (header/footer), `p-4` (content sections), `py-2 px-4` (dividers)
- **Gaps**: `gap-3` (size s), `gap-4` (size l/xl)
- **Borders**: `border-b` (header divider), `border-t` (footer divider)

## Styling

### Content Variants (side)
- **`left`**: Slides from left, rounded right corners (`rounded-r-[1.25rem]`)
- **`right`**: Slides from right, rounded left corners (`rounded-l-[1.25rem]`)
- **`top`**: Slides from top, full width
- **`bottom`**: Slides from bottom, full width

### Header Variants
- **Size**: `s` (gap-3), `l` (gap-4), `xl` (gap-4)
- **Divider**: Optional bottom border
- **Close Icon Position**: Left or right alignment
- **Mobile Mode**: Uses expand icon instead of close icon

### Title Variants
- **`xl`**: `.typography-labelXLarge` - Primary sheet titles
- **`l`**: `.typography-labelLarge` - Secondary sheet titles  
- **`s`**: `.typography-labelLarge` - Compact sheet titles

### Custom Properties
- **Shadow**: `shadow-sideTray` - Custom shadow for elevated appearance
- **Border Radius**: `1.25rem` (20px) for rounded corners
- **Max Widths**: `max-w-sheetSmBounded` (mobile), `max-w-sheetSm` (desktop)

## Responsive Design

### Breakpoints
- **Mobile (`< 640px`)**: Full width sheets (`size-full`)
- **Desktop (`≥ 640px`)**: Constrained width (`sm:max-w-sheetSm`)

### Mobile Adaptations
- Uses `PiExpandRightLine` icon instead of close icon when `isMobile` is true
- Full-width on mobile with `max-w-sheetSmBounded`
- Smaller header sizes and compact spacing options

### Responsive Usage
```tsx
<SheetContent 
  side="right" 
  className="w-full sm:max-w-md lg:max-w-lg"
>
  <SheetHeader 
    size="l" 
    isMobile={isMobileDevice}
    className="sm:p-6 lg:p-8"
  >
    {/* Responsive header content */}
  </SheetHeader>
</SheetContent>
```

## Accessibility

### ARIA Features
- **Dialog Role**: Inherits from Radix Dialog primitive
- **Focus Management**: Automatic focus trapping and restoration
- **Keyboard Navigation**: 
  - `Escape` key closes the sheet
  - `Tab` navigation within sheet content
- **Screen Reader Support**: 
  - `aria-labelledby` automatically connected to SheetTitle
  - `aria-describedby` automatically connected to SheetDescription
  - Hidden close button label: `<span className="sr-only">Close</span>`

### Focus Behavior
- Focus moves to sheet content when opened
- Focus returns to trigger element when closed
- Focus is trapped within the sheet while open

### Accessibility Best Practices
```tsx
<Sheet>
  <SheetTrigger aria-label="Open navigation menu">
    <MenuIcon />
  </SheetTrigger>
  
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Account Settings</SheetTitle>
      <SheetDescription>
        Manage your account preferences and privacy settings
      </SheetDescription>
    </SheetHeader>
    {/* Always provide descriptive title and description */}
  </SheetContent>
</Sheet>
```

## Dependencies

### Internal Components
- **CompactButton**: Used for close button and footer actions
- **Typography**: Used in SheetContentDivider
- **Icons**: `PiCloseLine`, `PiExpandRightLine` from icon system

### External Dependencies
- **@radix-ui/react-dialog**: Core dialog/sheet functionality
- **class-variance-authority**: Variant management
- **merge-refs**: Reference merging utility

### Hooks & Utilities
- **useDragToClose**: Custom hook for drag-to-close functionality
- **cn**: Class name utility for conditional styling

### Related Components
- Use with **CompactButton** for triggers and actions
- Combine with **Typography** for content formatting
- Integrate with **Navigation** components for menu sheets
- Pair with **Form** components for configuration sheets