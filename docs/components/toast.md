# Toast Component

## Purpose

The Toast component provides a flexible notification system for displaying temporary messages, alerts, and feedback to users. It supports multiple variants for different types of notifications (default, destructive, info) and includes sub-components for structured content layout with title, description, actions, and close functionality.

## Props Interface

### Toast

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| variant | `'default' \| 'destructive' \| 'info'` | No | `'default'` | Visual style variant of the toast |
| className | `string` | No | - | Additional CSS classes to apply |
| children | `React.ReactNode` | No | - | Content to display inside the toast |
| ...props | `HTMLAttributes<HTMLDivElement>` | No | - | Standard HTML div attributes |

### ToastTitle

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| className | `string` | No | - | Additional CSS classes to apply |
| children | `React.ReactNode` | No | - | Title content |
| ...props | `HTMLAttributes<HTMLDivElement>` | No | - | Standard HTML div attributes |

### ToastDescription

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| className | `string` | No | - | Additional CSS classes to apply |
| children | `React.ReactNode` | No | - | Description content |
| ...props | `HTMLAttributes<HTMLDivElement>` | No | - | Standard HTML div attributes |

### ToastAction

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| className | `string` | No | - | Additional CSS classes to apply |
| children | `React.ReactNode` | No | - | Action content (typically buttons) |
| ...props | `HTMLAttributes<HTMLDivElement>` | No | - | Standard HTML div attributes |

### ToastClose

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| className | `string` | No | - | Additional CSS classes to apply |
| children | `React.ReactNode` | No | - | Close button content |
| ...props | `HTMLAttributes<HTMLButtonElement>` | No | - | Standard HTML button attributes |

## Usage Example

```tsx
import { 
  Toast, 
  ToastTitle, 
  ToastDescription, 
  ToastAction, 
  ToastClose 
} from '@/components/ui/toast';
import { X, CheckCircle, AlertTriangle } from 'lucide-react';

// Basic success toast
function SuccessToast() {
  return (
    <Toast variant="default">
      <div className="flex items-start gap-3">
        <CheckCircle className="w-5 h-5 text-pgStateSuccess-base mt-0.5" />
        <div className="flex-1">
          <ToastTitle>Profile Updated</ToastTitle>
          <ToastDescription>
            Your profile information has been successfully saved.
          </ToastDescription>
        </div>
        <ToastClose className="text-pgNeutral-400 hover:text-pgNeutral-0 transition-colors">
          <X className="w-4 h-4" />
        </ToastClose>
      </div>
    </Toast>
  );
}

// Error toast with action
function ErrorToast() {
  return (
    <Toast variant="destructive">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-pgStateError-base mt-0.5" />
        <div className="flex-1">
          <ToastTitle>Upload Failed</ToastTitle>
          <ToastDescription>
            There was an error uploading your file. Please try again.
          </ToastDescription>
          <ToastAction className="mt-2">
            <button className="typography-labelXSmall text-pgStateError-base hover:text-pgStateError-dark transition-colors">
              Retry Upload
            </button>
          </ToastAction>
        </div>
        <ToastClose className="text-pgNeutral-400 hover:text-pgNeutral-0 transition-colors">
          <X className="w-4 h-4" />
        </ToastClose>
      </div>
    </Toast>
  );
}

// Info toast
function InfoToast() {
  return (
    <Toast variant="info">
      <ToastTitle>New Feature Available</ToastTitle>
      <ToastDescription>
        Check out our new dashboard analytics feature.
      </ToastDescription>
      <div className="flex justify-between items-center mt-3">
        <ToastAction>
          <button className="typography-labelXSmall text-pgBlue-600 hover:text-pgBlue-700 transition-colors">
            Learn More
          </button>
        </ToastAction>
        <ToastClose className="text-pgNeutral-400 hover:text-pgNeutral-600 transition-colors">
          <X className="w-4 h-4" />
        </ToastClose>
      </div>
    </Toast>
  );
}
```

## Design System Usage

### Typography Classes
- **ToastTitle**: Uses `.typography-labelSmall` for consistent labeling hierarchy
- **ToastDescription**: Uses `.typography-paragraphSmall` for readable body text

### Color Tokens
- **Default Variant**: 
  - Light mode: `bg-pgBackground-950`, `border-pgNeutral-800`
  - Dark mode: `border-pgStroke-200`
- **Destructive Variant**: 
  - Light mode: `bg-pgStateError-light`
  - Dark mode: `bg-pgStateError-dark`
- **Info Variant**: `bg-pgBlueVSGold`
- **Text Colors**: 
  - Titles: `text-pgNeutral-0` (light) / `text-pgNeutral-950` (dark)
  - Descriptions: `text-pgNeutral-200` (light) / `text-pgNeutral-600` (dark)

### Tailwind Utilities
- **Layout**: `flex`, `flex-col`, `relative`, `overflow-hidden`
- **Sizing**: `w-[390px]`, `max-w-full`, `h-8`
- **Spacing**: `p-4`, `px-3`, `gap-3`
- **Borders**: `rounded-xl`, `border`
- **Shadow**: `shadow-tooltipS`

## Styling

### Variants

- **default**: Standard toast with neutral background and subtle border
- **destructive**: Error/warning toast with error state colors
- **info**: Informational toast with blue/gold gradient background

### States

- **Hover States**: Interactive elements support hover transitions
- **Focus States**: `focus:outline-none` for custom focus handling
- **Disabled States**: `disabled:pointer-events-none disabled:opacity-50`

### Customization

```tsx
// Custom styling example
<Toast 
  variant="default"
  className="w-96 shadow-tooltipM border-pgBlue-500"
>
  <ToastTitle className="typography-labelMedium text-pgBlue-600">
    Custom Title
  </ToastTitle>
  <ToastDescription className="typography-paragraphMedium text-pgNeutral-400">
    Custom description with different typography
  </ToastDescription>
</Toast>
```

## Responsive Design

The toast component is designed with responsive considerations:

- **Base Width**: Fixed at `390px` with `max-w-full` for mobile adaptation
- **Mobile Behavior**: Automatically adjusts to screen width on smaller devices
- **Breakpoint Adaptations**:
  ```tsx
  <Toast className="w-[390px] sm:w-96 md:w-[420px]">
    {/* Responsive width adjustments */}
  </Toast>
  ```

## Accessibility

### Built-in Features
- **Semantic Structure**: Uses appropriate HTML elements (`div`, `button`)
- **Focus Management**: ToastClose uses proper button semantics
- **Color Contrast**: Design system colors ensure WCAG compliance

### Recommended Implementations
```tsx
// ARIA attributes for better accessibility
<Toast role="alert" aria-live="polite">
  <ToastTitle id="toast-title">
    Important Update
  </ToastTitle>
  <ToastDescription aria-describedby="toast-title">
    Your changes have been saved successfully.
  </ToastDescription>
  <ToastClose 
    aria-label="Close notification"
    onClick={handleClose}
  >
    <X className="w-4 h-4" />
  </ToastClose>
</Toast>

// For urgent notifications
<Toast role="alert" aria-live="assertive" variant="destructive">
  {/* Error content */}
</Toast>
```

### Keyboard Navigation
- ToastClose button is fully keyboard accessible
- Custom ToastAction elements should include proper focus handling
- Consider adding `tabIndex` management for toast stacking

## Dependencies

### Internal Dependencies
- `@/lib/utils/cn` - Utility for conditional class names
- Design system color tokens and typography classes

### External Dependencies
- `class-variance-authority` - For variant-based styling
- `React` - Core React functionality with forwardRef support

### Related Components
- Consider pairing with:
  - Button components for ToastAction content
  - Icon components for visual indicators
  - Portal/Overlay systems for toast positioning and stacking

### Usage with Toast Systems
```tsx
// Example integration with a toast provider
import { useToast } from '@/hooks/use-toast';

function MyComponent() {
  const { toast } = useToast();
  
  const showSuccess = () => {
    toast({
      variant: "default",
      title: "Success!",
      description: "Operation completed successfully.",
    });
  };
  
  return (
    <button onClick={showSuccess}>
      Show Toast
    </button>
  );
}
```