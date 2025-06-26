# Dialog Component

## Purpose

The Dialog component provides a modal dialog interface built on Radix UI primitives with comprehensive support for our design system. It includes a full-featured dialog implementation with overlay, content area, header, footer, and accessibility features. The component supports various configurations including closeable dialogs, different header and footer styles, and content dividers.

## Props Interface

### Dialog
Uses Radix UI Dialog.Root - accepts all standard Radix Dialog props.

### DialogContent
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | Optional | Additional CSS classes to apply |
| `children` | `ReactNode` | Optional | Dialog content |
| `...props` | `DialogPrimitive.Content` | Optional | All Radix Dialog Content props |

### DialogHeader
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | Optional | Additional CSS classes to apply |
| `children` | `ReactNode` | Optional | Header content (typically DialogTitle and DialogDescription) |
| `closeable` | `boolean` | Optional | Whether to show close button (default: `true`) |
| `divider` | `boolean` | Optional | Whether to show bottom border (default: `true`) |
| `...props` | `HTMLDivElement` | Optional | Standard div element props |

### DialogFooter
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | Optional | Additional CSS classes to apply |
| `alt` | `boolean` | Optional | Use transparent background variant (default: `false`) |
| `...props` | `HTMLDivElement` | Optional | Standard div element props |

### DialogTitle
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | Optional | Additional CSS classes to apply |
| `size` | `'md' \| 'l'` | Optional | Title size variant (default: `'md'`) |
| `...props` | `DialogPrimitive.Title` | Optional | All Radix Dialog Title props |

### DialogDescription
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | Optional | Additional CSS classes to apply |
| `...props` | `DialogPrimitive.Description` | Optional | All Radix Dialog Description props |

### DialogContentDivider
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `label` | `string` | **Required** | Text label for the divider section |

## Usage Example

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogContentDivider,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

function UserProfileDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Edit Profile</Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle size="l">Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        
        <div className="px-5 py-4 space-y-4">
          <div>
            <label className="typography-labelSmall text-pgText-700">
              Full Name
            </label>
            <input 
              type="text" 
              className="w-full mt-1 px-3 py-2 border border-pgStroke-200 rounded-lg"
              placeholder="Enter your name"
            />
          </div>
          
          <div>
            <label className="typography-labelSmall text-pgText-700">
              Email
            </label>
            <input 
              type="email" 
              className="w-full mt-1 px-3 py-2 border border-pgStroke-200 rounded-lg"
              placeholder="Enter your email"
            />
          </div>
        </div>
        
        <DialogContentDivider label="Preferences" />
        
        <div className="px-5 py-4">
          <label className="flex items-center gap-3">
            <input type="checkbox" className="rounded" />
            <span className="typography-paragraphSmall text-pgText-700">
              Receive email notifications
            </span>
          </label>
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" size="sm">
              Cancel
            </Button>
          </DialogClose>
          <Button variant="primary" size="sm">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

## Design System Usage

### Typography Classes
- **DialogTitle (md)**: `.typography-labelSmall` - Standard dialog titles
- **DialogTitle (l)**: `.typography-labelLarge` - Larger dialog titles for important dialogs
- **DialogDescription**: `.typography-paragraphXSmall` - Consistent description text
- **DialogContentDivider**: `.typography-subheadingXSmall` - Section divider labels

### Color Tokens
- **Background Colors**:
  - `bg-pgBackground-50` - Main dialog content background
  - `bg-pgBackground-0` - Footer background (elevated)
  - `bg-pgBackgroundOverlay/80` - Modal overlay with transparency
- **Text Colors**:
  - `text-pgText-950` - Dialog titles (high contrast)
  - `text-pgText-600` - Dialog descriptions (medium contrast)
  - `text-pgText-400` - Divider labels (low contrast)
- **Border Colors**:
  - `border-alphaNeutral/16` - Subtle borders for headers and footers
  - `bg-alphaNeutral/10` - Content divider background

### Layout & Spacing
- **Padding**: `px-5 py-4` - Consistent internal spacing
- **Gaps**: `gap-3` - Standard spacing between footer elements
- **Border Radius**: `rounded-[1.25rem]` on mobile, `rounded-[20px]` on desktop

## Styling

### Variants

#### DialogHeader Variants
- **Default**: With bottom border divider
- **No Divider**: `divider={false}` - Removes bottom border
- **Non-closeable**: `closeable={false}` - Hides close button

#### DialogFooter Variants
- **Default**: With background color and top border
- **Alt**: `alt={true}` - Transparent background variant

#### DialogTitle Variants
- **Medium (md)**: Default size using `typography-labelSmall`
- **Large (l)**: Larger size using `typography-labelLarge`

### Customization
```tsx
// Custom styling with design system tokens
<DialogContent className="max-w-2xl bg-pgBackground-0">
  <DialogHeader 
    divider={false}
    className="bg-pgBlue-50 text-pgBlue-900"
  >
    <DialogTitle size="l" className="text-pgBlue-950">
      Custom Styled Dialog
    </DialogTitle>
  </DialogHeader>
  
  <DialogFooter alt className="justify-between">
    {/* Footer content */}
  </DialogFooter>
</DialogContent>
```

## Responsive Design

The Dialog component adapts across breakpoints:

- **Mobile (< 768px)**: 
  - Full width with `rounded-[1.25rem]` corners
  - Optimized for smaller screens
- **Desktop (≥ 768px)**: 
  - Maximum width of `max-w-lg` (512px)
  - `rounded-[20px]` corners
  - Centered positioning with backdrop

```tsx
// Responsive width customization
<DialogContent className="md:max-w-2xl lg:max-w-4xl">
  {/* Content scales appropriately */}
</DialogContent>
```

## Accessibility

### ARIA Features
- **Dialog Role**: Automatic ARIA dialog role from Radix UI
- **Focus Management**: Automatic focus trapping and restoration
- **Keyboard Navigation**: 
  - `Escape` key closes dialog
  - `Tab` cycles through focusable elements
- **Screen Reader Support**:
  - Dialog title automatically labelled
  - Description associated with dialog
  - Close button has screen reader text

### Implementation
```tsx
<DialogHeader>
  <DialogTitle>Accessible Title</DialogTitle>
  <DialogDescription>
    This description is automatically associated with the dialog
  </DialogDescription>
</DialogHeader>

<DialogClose>
  <PiCloseLine />
  <span className="sr-only">Close</span> {/* Screen reader only */}
</DialogClose>
```

### Best Practices
- Always include `DialogTitle` for screen reader context
- Use `DialogDescription` to provide additional context
- Ensure interactive elements within dialog are keyboard accessible
- Test with screen readers and keyboard-only navigation

## Dependencies

### Internal Components
- `CompactButton` - Used for the close button styling
- `Typography` - Used in DialogContentDivider for consistent text styling
- `PiCloseLine` - Icon component for close button

### External Dependencies
- `@radix-ui/react-dialog` - Core dialog functionality and accessibility
- `class-variance-authority` - Variant management for styling
- `cn` utility - Class name merging utility

### Related Components
Use alongside:
- `Button` - For dialog triggers and footer actions
- `Input`, `Select`, `Checkbox` - For form elements within dialog content
- `Card` - For structured content sections within dialogs