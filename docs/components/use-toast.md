# useToast Hook

## Purpose

The `useToast` hook provides a convenient interface for displaying toast notifications in your React application. It wraps the Sonner toast library and provides pre-built templates with consistent styling aligned to our design system. The hook supports multiple toast variants (default, destructive, info) with customizable content including titles, descriptions, actions, and icons.

## Props Interface

### ToastProps

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | ✅ | - | The main title text displayed in the toast |
| `description` | `ReactNode` | ❌ | - | Optional secondary content below the title |
| `action` | `ReactNode` | ❌ | - | Optional action button or interactive element |
| `icon` | `ReactNode` | ❌ | - | Optional icon displayed alongside the title |
| `template` | `'default' \| 'destructive' \| 'info'` | ❌ | `'default'` | Predefined template variant to use |
| `closeButton` | `boolean` | ❌ | - | Whether to show a close button on the toast |
| `variant` | `VariantProps<typeof toastVariants>` | ❌ | `'default'` | Variant from toast variants (fallback if template not specified) |

### Hook Return Value

| Property | Type | Description |
|----------|------|-------------|
| `toast` | `(props: ToastProps, options?: ToasterProps) => void` | Function to trigger a toast notification |
| `dismiss` | `(toastId?: string \| number) => void` | Function to dismiss toast(s) |

## Usage Example

```tsx
import React from 'react';
import { useToast } from '@/components/ui/use-toast';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

export function ToastExample() {
  const { toast, dismiss } = useToast();

  const showSuccessToast = () => {
    toast({
      title: 'Success',
      description: 'Your changes have been saved successfully.',
      template: 'default',
      icon: <CheckCircle className="w-5 h-5 text-pgStateSuccess" />,
      closeButton: true,
    });
  };

  const showErrorToast = () => {
    toast({
      title: 'Error',
      description: 'Failed to save changes. Please try again.',
      template: 'destructive',
      icon: <AlertCircle className="w-5 h-5" />,
      action: (
        <button 
          className="typography-labelSmall bg-pgRed-600 text-white px-3 py-1 rounded-md hover:bg-pgRed-700 transition-colors"
          onClick={() => console.log('Retry action')}
        >
          Retry
        </button>
      ),
    });
  };

  const showInfoToast = () => {
    toast({
      title: 'Information',
      description: 'New features are now available in your dashboard.',
      template: 'info',
      icon: <Info className="w-5 h-5" />,
    });
  };

  return (
    <div className="space-y-4 p-6">
      <div className="space-y-3">
        <h2 className="typography-titleH3 text-pgText-900">Toast Examples</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={showSuccessToast}
            className="typography-labelMedium bg-pgGreen-600 text-white px-4 py-2 rounded-lg hover:bg-pgGreen-700 transition-colors"
          >
            Show Success Toast
          </button>
          <button
            onClick={showErrorToast}
            className="typography-labelMedium bg-pgRed-600 text-white px-4 py-2 rounded-lg hover:bg-pgRed-700 transition-colors"
          >
            Show Error Toast
          </button>
          <button
            onClick={showInfoToast}
            className="typography-labelMedium bg-pgBlue-600 text-white px-4 py-2 rounded-lg hover:bg-pgBlue-700 transition-colors"
          >
            Show Info Toast
          </button>
        </div>
      </div>
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **Toast Titles**: Typically use `.typography-labelMedium` or `.typography-labelLarge` for primary toast titles
- **Toast Descriptions**: Use `.typography-paragraphSmall` or `.typography-paragraphXSmall` for secondary content
- **Action Labels**: Use `.typography-labelSmall` for action button text

### Color Tokens
- **Default Toast**: Uses `pgBackground-0` to `pgBackground-100` for backgrounds, `pgText-900` for primary text
- **Destructive Toast**: Uses `pgRed-50` to `pgRed-100` backgrounds, `pgRed-600` to `pgRed-900` for text and borders
- **Info Toast**: Uses `pgBlue-50` to `pgBlue-100` backgrounds, `pgBlue-600` to `pgBlue-900` for accents
- **Success States**: `pgStateSuccess` and `pgGreen` variants for positive feedback
- **Error States**: `pgStateError` and `pgRed` variants for error feedback
- **Borders**: `pgStroke-200` to `pgStroke-300` for subtle borders

## Styling

### Available Templates

#### Default Template
```tsx
toast({
  title: 'Default Toast',
  description: 'Standard notification appearance',
  template: 'default'
});
```
- Uses neutral color palette
- Subtle border with `pgStroke-200`
- Background: `pgBackground-0` (light) / `pgBackground-900` (dark)

#### Destructive Template  
```tsx
toast({
  title: 'Error Occurred',
  description: 'Something went wrong',
  template: 'destructive'
});
```
- Red color scheme with `pgRed` variants
- Prominent error styling
- Background: `pgRed-50` (light) / `pgRed-950/20` (dark)

#### Info Template
```tsx
toast({
  title: 'Information',
  description: 'Helpful information for users',
  template: 'info'
});
```
- Blue color scheme with `pgBlue` variants
- Informational styling
- Background: `pgBlue-50` (light) / `pgBlue-950/20` (dark)

### Customization Options
- **Custom Icons**: Pass any ReactNode as the `icon` prop
- **Custom Actions**: Include buttons, links, or other interactive elements
- **Duration Control**: Use Sonner's `duration` option in the second parameter
- **Position Control**: Configure toast position via Sonner's positioning options

## Responsive Design

Toast notifications adapt across breakpoints:

- **Mobile (< sm)**: 
  - Full width with small margins
  - Condensed padding
  - Single-line actions when possible

- **Tablet (sm to lg)**:
  - Fixed width toasts
  - Standard padding
  - Horizontal action layouts

- **Desktop (lg+)**:
  - Positioned in corner or edge
  - Full feature set
  - Hover states active

## Accessibility

### ARIA Features
- **Role**: Toast containers have `role="status"` or `role="alert"` based on variant
- **Live Regions**: Destructive toasts use `aria-live="assertive"`, others use `aria-live="polite"`
- **Labels**: Proper `aria-label` attributes on interactive elements
- **Focus Management**: Close buttons and actions are keyboard accessible

### Keyboard Support
- **Escape Key**: Dismisses the focused toast
- **Tab Navigation**: Actions and close buttons are focusable
- **Enter/Space**: Activates action buttons

### Screen Reader Support
- Toast content is announced when displayed
- Action availability is communicated
- Dismissal confirmation provided

## Dependencies

### Internal Components
- `@/components/ui/toast` - Base toast variants and styling
- `@/components/ui/toasts` - Template components (DefaultToast, DestructiveToast, InfoToast)

### External Libraries
- `sonner` - Core toast functionality and positioning
- `class-variance-authority` - Variant prop typing
- `lucide-react` - Recommended for consistent icons

### Related Utilities
- Toast templates should follow our button component patterns for actions
- Icons should use our standard sizing classes (`w-4 h-4`, `w-5 h-5`)
- Use our color tokens for consistent theming across toast types

### Usage with Other Components
```tsx
// Integrate with forms
const { toast } = useToast();

const handleSubmit = async () => {
  try {
    await submitForm();
    toast({
      title: 'Form Submitted',
      description: 'Your form has been successfully submitted.',
      template: 'default'
    });
  } catch (error) {
    toast({
      title: 'Submission Failed',
      description: error.message,
      template: 'destructive'
    });
  }
};
```