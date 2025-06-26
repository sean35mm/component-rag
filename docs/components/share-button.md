# Share Button Component

## Purpose

The Share Button component provides a complete sharing solution that allows users to share content via social media platforms or copy direct links. It consists of three components: `ShareButtonWithDialog` (button with modal), `ShareButton` (standalone button), and `ShareDialogContent` (modal content).

## Props Interface

### ShareButtonWithDialog Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `url` | `string` | ✅ | - | The URL to be shared |
| `onOpenChange` | `(open: boolean) => void` | ❌ | - | Callback fired when dialog open state changes |
| `...other` | `Omit<TooltipButtonProps, 'icon' \| 'tooltip'>` | ❌ | - | All TooltipButton props except icon and tooltip |

### ShareButton Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `Omit<TooltipButtonProps, 'icon' \| 'tooltip'>` | ❌ | - | All TooltipButton props except icon and tooltip |

### ShareDialogContent Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `url` | `string` | ✅ | - | The URL to be shared |
| `...other` | `Omit<ComponentPropsWithoutRef<typeof DialogContent>, 'children'>` | ❌ | - | All DialogContent props except children |

## Usage Example

```tsx
import { ShareButtonWithDialog, ShareButton, ShareDialogContent } from '@/components/ui/share-button';

// Complete share button with dialog
function ArticleHeader() {
  const currentUrl = 'https://example.com/article';
  
  return (
    <div className="flex items-center gap-2">
      <h1 className="typography-titleH2 text-pgText-950">Article Title</h1>
      <ShareButtonWithDialog 
        url={currentUrl}
        variant="ghost"
        size="sm"
        onOpenChange={(open) => console.log('Share dialog', open)}
      />
    </div>
  );
}

// Standalone share button
function CustomShareButton() {
  return (
    <ShareButton 
      variant="outline"
      size="md"
      className="border-pgStroke-200 hover:bg-pgNeutral-50"
    />
  );
}

// Custom dialog implementation
function CustomShareDialog() {
  const [open, setOpen] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          <PiShareForward2Fill className="size-4" />
          Share Article
        </Button>
      </DialogTrigger>
      <ShareDialogContent 
        url="https://example.com/custom-content"
        className="max-w-md"
      />
    </Dialog>
  );
}
```

## Design System Usage

### Typography Classes
- **Dialog Title**: Uses `.typography-titleLarge` sizing through DialogTitle `size='l'` prop
- **Section Labels**: "On Social" and "Direct" use dialog content divider styling
- **Button Text**: Inherits from Button component typography scale

### Colors Used
- **Background**: `bg-alphaNeutral/10` for social media buttons
- **Icon Colors**: `text-pgIcon-950` for social media icons
- **Dialog**: Uses standard dialog background (`pgBackground-0` in light mode)
- **Button**: `variant='neutralLighter'` for close button

### Spacing & Layout
- **Icon Size**: `size-6` (24px) for header icon, `size-8` (32px) for social icons
- **Padding**: `px-5 py-3` for social buttons section, `px-5 py-4` for direct link section
- **Gap**: `gap-3` for header, `gap-4` for social buttons

## Variants

The component inherits variants from its dependencies:

### TooltipButton Variants (for ShareButton)
- **Size**: `sm`, `md`, `lg` - Controls button size
- **Variant**: `default`, `ghost`, `outline`, `secondary` - Visual appearance
- **State**: Hover, focus, and active states included

### Dialog Variants
- **Size**: Responsive modal sizing
- **Position**: Centered overlay with backdrop

## Styling

### Social Media Buttons
```tsx
// Social platform buttons use consistent styling
className='rounded-md bg-alphaNeutral/10 p-2 text-pgIcon-950 [&>svg]:size-8'
```

### Link Input Section
- Uses `TextInput` component with integrated `CopyButton`
- Maintains consistent spacing with dialog content

### Customization Options
```tsx
// Custom styling through className prop
<ShareButtonWithDialog 
  url={url}
  className="custom-share-button"
  // Dialog content customization
/>

// Custom dialog content styling
<ShareDialogContent 
  url={url}
  className="max-w-lg border-pgStroke-200"
/>
```

## Responsive Design

The component is fully responsive across breakpoints:

- **Mobile (< 640px)**: Full-width dialog, stacked social buttons
- **Tablet (640px - 1024px)**: Centered dialog with optimal width
- **Desktop (> 1024px)**: Fixed-width dialog with hover states

Dialog automatically adapts:
```tsx
// Responsive dialog behavior built-in
<DialogContent> // Handles responsive sizing internally
```

## Accessibility

### Keyboard Navigation
- **Tab Order**: Proper focus management through dialog and social links
- **Escape Key**: Closes dialog via DialogClose component
- **Enter/Space**: Activates share button and social links

### Screen Reader Support
- **ARIA Labels**: Tooltip provides accessible button description
- **Dialog Role**: Proper modal dialog semantics
- **Link Context**: Social media links open in new tabs with `rel="noopener noreferrer"`

### Focus Management
```tsx
onCloseAutoFocus={(event) => event.preventDefault()}
```
Prevents auto-focus on close for better UX.

## Dependencies

### Internal Components
- `Button` - Close button styling and behavior
- `Dialog` family - Modal functionality and layout
- `TextInput` - Direct link input field
- `TooltipButton` - Share button with tooltip
- `CopyButton` - Copy to clipboard functionality

### Icons
- `PiShareForward2Fill` - Primary share icon
- `PiFacebookFill`, `PiLinkedinFill`, `PiRedditFill`, `PiTwitterXFill`, `PiWhatsappFill` - Social platform icons

### External Dependencies
- React `forwardRef`, `useMemo` - Component optimization
- Social media sharing URLs - Platform-specific sharing endpoints

## Customization

### Extending with Design System Tokens

```tsx
// Custom brand colors
<ShareButtonWithDialog 
  url={url}
  className="text-pgBlue-600 hover:text-pgBlue-700"
/>

// Custom typography
<ShareDialogContent 
  url={url}
  className="[&_.dialog-title]:typography-titleH3"
/>

// Custom spacing
<ShareButtonWithDialog 
  url={url}
  className="m-4 p-2"
/>

// Dark mode optimization
<ShareButton className="dark:text-pgText-50 dark:hover:bg-pgNeutral-800" />
```

### Social Platform Customization

The component uses a `useMemo` hook to generate social sharing URLs, making it easy to extend:

```tsx
// The variants array can be customized by extending the component
// Currently supports: Twitter/X, Facebook, LinkedIn, Reddit, WhatsApp
// Each platform gets proper hashtags and URL encoding
```