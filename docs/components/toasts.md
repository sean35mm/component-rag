# Toast Components

## Purpose

The Toast components provide a comprehensive notification system with multiple pre-built variants for different use cases. These components offer consistent visual feedback to users for success states, errors, informational messages, and specialized signals like feature limits. Built on top of the Sonner toast library, they integrate seamlessly with the design system's color tokens and typography scales.

## Props Interface

### Common Props (Extended from ToastProps)

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `ReactNode` | No | - | Main heading text for the toast |
| `description` | `ReactNode` | No | - | Secondary descriptive text |
| `action` | `ReactNode` | No | - | Action button or element (wrapped in ToastClose) |
| `variant` | `'default' \| 'destructive' \| 'info'` | No | `'default'` | Visual style variant |
| `closeButton` | `boolean` | No | `true` | Whether to show the close button |
| `toastEntity` | `string \| number` | No | - | Unique identifier for programmatic dismissal |
| `icon` | `ReactNode` | No | - | Custom icon (overrides default variant icon) |

### SignalLimitToast Additional Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `showManageButton` | `boolean` | No | `true` | Whether to display the "Manage" navigation button |

## Usage Examples

### Default Success Toast
```tsx
import { DefaultToast } from '@/components/ui/toasts';
import { toast } from 'sonner';

// Basic success notification
const showSuccess = () => {
  toast.custom((id) => (
    <DefaultToast
      toastEntity={id}
      title="Changes saved successfully"
      description="Your profile has been updated."
      variant="default"
    />
  ));
};
```

### Destructive Error Toast
```tsx
import { DestructiveToast } from '@/components/ui/toasts';
import { Button } from '@/components/ui/button';

const showError = () => {
  toast.custom((id) => (
    <DestructiveToast
      toastEntity={id}
      title="Upload failed"
      description="The file size exceeds the 10MB limit. Please choose a smaller file."
      variant="destructive"
      action={
        <Button variant="outline" size="sm">
          Try Again
        </Button>
      }
    />
  ));
};
```

### Info Toast with Custom Action
```tsx
import { InfoToast } from '@/components/ui/toasts';
import { PiInformationFill } from '@/components/icons';

const showInfo = () => {
  toast.custom((id) => (
    <InfoToast
      toastEntity={id}
      title="New feature available"
      description="Dark mode is now available in your settings."
      variant="info"
      icon={<PiInformationFill className="size-5 text-pgBlue-500" />}
      action={
        <Button variant="ghost" size="sm" className="text-pgBlue-600">
          Learn More
        </Button>
      }
    />
  ));
};
```

### Signal Limit Toast
```tsx
import { SignalLimitToast } from '@/components/ui/toasts';

const showSignalLimit = () => {
  toast.custom((id) => (
    <SignalLimitToast
      toastEntity={id}
      showManageButton={true}
    />
  ));
};
```

## Design System Usage

### Typography Classes
- **Toast Titles**: Uses `ToastTitle` component with design system typography
- **Toast Descriptions**: Uses `ToastDescription` component
- **SignalLimitToast**: 
  - Title: `.typography-labelSmall`
  - Description: `.typography-paragraphXSmall`

### Color Tokens

#### Default Variant
- **Success Icon**: `text-pgGreen-500 dark:text-pgGreen-700`
- **Close Button**: `text-pgIcon-0/40 hover:text-pgIcon-0`

#### Destructive Variant
- **Error Icon**: `text-pgNeutral-950`
- **Title**: `text-pgText-950`
- **Description**: `text-pgText-950/75`
- **Close Button**: `text-pgNeutral-950/60 hover:text-pgNeutral-950`

#### Info Variant
- **Info Icon**: `text-pgNeutral-200 dark:text-pgNeutral-600`
- **Description**: `text-pgTextInv-800`
- **Close Button**: `text-pgIcon-0/40 hover:text-pgIcon-0`

#### SignalLimitToast
- **Background**: `bg-white dark:bg-pgStatic-950`
- **Border**: `border-pgStroke-200`
- **Icon Container**: `bg-gradient-to-b from-pgStroke-300/15 to-transparent`
- **Icon Border**: `border-pgStroke-200`
- **Icon**: `text-pgIcon-950`
- **Description**: Uses color variant `'700'`

### Icon Usage
- **Success**: `PiCheckboxCircleFill`
- **Error**: `PiErrorWarningFill`
- **Info**: `PiInformationFill`
- **Signal Limit**: `PiFlashlightLine`
- **Close**: `PiCloseLine`

## Styling

### Available Variants
1. **default**: Green success styling with checkmark icon
2. **destructive**: Red error styling with warning icon
3. **info**: Blue informational styling with info icon

### Layout Patterns
- **DefaultToast**: Horizontal layout with icon and title inline
- **DestructiveToast**: Vertical layout with icon at top-left
- **InfoToast**: Horizontal layout optimized for informational content
- **SignalLimitToast**: Complex layout with nested icon containers and conditional buttons

### Customization Options
- Custom icons via `icon` prop override default variant icons
- Action buttons are automatically wrapped in `ToastClose` for dismissal
- Close button can be hidden with `closeButton={false}`
- Toast positioning and animation handled by underlying Toast component

## Responsive Design

The toast components are designed to be responsive by default:

- **Mobile (< 640px)**: Full-width with appropriate padding
- **Tablet (640px+)**: Fixed width with responsive text sizing
- **Desktop (1024px+)**: Optimal spacing and typography scale

Layout adjustments:
- Text wrapping handled automatically
- Icon sizes remain consistent across breakpoints
- Button spacing adapts to available width

## Accessibility

### ARIA Features
- Toast components inherit ARIA attributes from base `Toast` component
- `ToastClose` buttons include proper focus management
- Icons include appropriate text alternatives through semantic usage

### Keyboard Navigation
- Close buttons are focusable and keyboard accessible
- Action buttons maintain standard button focus behavior
- Automatic dismissal respects user preferences

### Screen Reader Support
- Toast titles and descriptions are properly announced
- Action buttons have clear context
- Visual state changes are communicated appropriately

## Dependencies

### Internal Components
- `Toast`, `ToastClose`, `ToastDescription`, `ToastTitle` from `@/components/ui/toast`
- `Button` from `@/components/ui/button`
- `Typography` from `@/components/ui/typography`
- Icons from `@/components/icons`

### External Dependencies
- `sonner` - Toast notification library
- `class-variance-authority` - Variant prop typing
- `next/navigation` - Router functionality (SignalLimitToast only)

### Utility Functions
- `getIcon()` - Maps variants to appropriate icons
- `toastVariants` - CVA variant configuration from toast component

### Related Components
These toast components work in conjunction with:
- Base `Toast` component for styling and behavior
- `Button` component for actions
- Global toast provider setup
- Design system color and typography tokens