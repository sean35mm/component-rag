# Toaster Component

## Purpose

The `Toaster` component provides a global toast notification system that displays temporary messages to users. It wraps the Sonner toast library with our design system theming and positioning defaults, automatically adapting to light/dark mode preferences and providing consistent spacing across all breakpoints.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `theme` | `'light' \| 'dark' \| 'system'` | No | `'system'` | Toast theme - automatically inherited from next-themes |
| `offset` | `{ top?: number; right?: number; bottom?: number; left?: number }` | No | `{ bottom: 40, right: 84 }` | Desktop positioning offset in pixels |
| `mobileOffset` | `number` | No | `8` | Mobile positioning offset in pixels |
| `...props` | `ComponentProps<typeof Sonner>` | No | - | All other Sonner toaster props |

## Usage Example

```tsx
import { Toaster } from '@/components/ui/toaster';
import { toast } from 'sonner';

// 1. Add Toaster to your app layout
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

// 2. Use toast notifications throughout your app
function NotificationExample() {
  const showSuccess = () => {
    toast.success('Settings saved successfully!', {
      description: 'Your preferences have been updated.',
      className: 'typography-labelMedium text-pgText-900 bg-pgBackground-50 border-pgStroke-200',
    });
  };

  const showError = () => {
    toast.error('Failed to save settings', {
      description: 'Please try again later.',
      className: 'typography-labelMedium text-pgStateError-dark bg-pgStateError-lighter border-pgStateError-base',
    });
  };

  const showCustom = () => {
    toast.custom((t) => (
      <div className="flex items-center gap-3 p-4 bg-pgBackground-0 border border-pgStroke-100 rounded-lg shadow-lg">
        <div className="flex-shrink-0 w-2 h-2 bg-pgBlue-500 rounded-full" />
        <div>
          <p className="typography-labelMedium text-pgText-900">
            Custom notification
          </p>
          <p className="typography-paragraphSmall text-pgText-600 mt-1">
            With design system styling
          </p>
        </div>
      </div>
    ));
  };

  return (
    <div className="space-y-4">
      <button 
        onClick={showSuccess}
        className="px-4 py-2 bg-pgStateSuccess-base text-white rounded-md typography-labelMedium"
      >
        Show Success
      </button>
      <button 
        onClick={showError}
        className="px-4 py-2 bg-pgStateError-base text-white rounded-md typography-labelMedium"
      >
        Show Error
      </button>
      <button 
        onClick={showCustom}
        className="px-4 py-2 bg-pgBlue-500 text-white rounded-md typography-labelMedium"
      >
        Show Custom
      </button>
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **Labels**: Use `.typography-labelMedium` or `.typography-labelSmall` for toast titles
- **Paragraphs**: Use `.typography-paragraphSmall` or `.typography-paragraphXSmall` for descriptions
- **Headlines**: Use `.typography-headlines14` or `.typography-headlines16` for emphasis

### Color Tokens
- **Background**: `bg-pgBackground-0`, `bg-pgBackground-50`, `bg-pgBackground-100`
- **Text**: `text-pgText-900`, `text-pgText-700`, `text-pgText-600`
- **Borders**: `border-pgStroke-100`, `border-pgStroke-200`
- **State Colors**:
  - Success: `bg-pgStateSuccess-lighter`, `text-pgStateSuccess-dark`, `border-pgStateSuccess-base`
  - Error: `bg-pgStateError-lighter`, `text-pgStateError-dark`, `border-pgStateError-base`
  - Warning: `bg-pgStateWarning-lighter`, `text-pgStateWarning-dark`, `border-pgStateWarning-base`
  - Information: `bg-pgStateInformation-lighter`, `text-pgStateInformation-dark`, `border-pgStateInformation-base`

## Styling

### Toast Variants

```tsx
// Success toast
toast.success('Success message', {
  className: 'bg-pgStateSuccess-lighter text-pgStateSuccess-dark border-pgStateSuccess-base typography-labelMedium'
});

// Error toast
toast.error('Error message', {
  className: 'bg-pgStateError-lighter text-pgStateError-dark border-pgStateError-base typography-labelMedium'
});

// Information toast
toast('Info message', {
  className: 'bg-pgStateInformation-lighter text-pgStateInformation-dark border-pgStateInformation-base typography-labelMedium'
});

// Custom styled toast
toast.custom((t) => (
  <div className="flex items-start gap-3 p-4 bg-pgBackground-0 border border-pgStroke-200 rounded-lg shadow-lg max-w-sm">
    <div className="flex-shrink-0 mt-1">
      <div className="w-3 h-3 bg-pgBlue-500 rounded-full" />
    </div>
    <div className="min-w-0 flex-1">
      <h4 className="typography-labelMedium text-pgText-900">
        Notification Title
      </h4>
      <p className="typography-paragraphSmall text-pgText-600 mt-1">
        Detailed description with proper line height and spacing.
      </p>
    </div>
  </div>
));
```

### Customization Options

```tsx
// Custom positioning
<Toaster 
  offset={{ bottom: 60, right: 24 }}
  mobileOffset={16}
/>

// Custom theme override
<Toaster theme="dark" />

// Additional Sonner props
<Toaster 
  position="top-center"
  expand={true}
  richColors={true}
  closeButton={true}
/>
```

## Responsive Design

### Breakpoint Behavior
- **Mobile (< 640px)**: Uses `mobileOffset={8}` for optimal touch interaction
- **Desktop (≥ 640px)**: Uses `offset={{ bottom: 40, right: 84 }}` to avoid UI conflicts
- **Large screens (≥ 1024px)**: Maintains consistent positioning with adequate spacing

### Responsive Toast Content
```tsx
toast.custom((t) => (
  <div className="p-3 sm:p-4 max-w-xs sm:max-w-sm">
    <h4 className="typography-labelSmall sm:typography-labelMedium text-pgText-900">
      Responsive Title
    </h4>
    <p className="typography-paragraphXSmall sm:typography-paragraphSmall text-pgText-600 mt-1">
      Content that adapts to screen size
    </p>
  </div>
));
```

## Accessibility

### ARIA Features
- **Role**: Toasts automatically receive `role="status"` or `role="alert"`
- **Live Region**: Screen readers announce toast content automatically
- **Focus Management**: Toasts don't steal focus from current interactions
- **Keyboard Navigation**: Close button is keyboard accessible when enabled

### Best Practices
```tsx
// Accessible toast with proper semantics
toast.success('Form submitted', {
  description: 'Your application has been saved successfully.',
  // Automatically gets aria-live="polite" for success
});

toast.error('Validation failed', {
  description: 'Please check the required fields and try again.',
  // Automatically gets aria-live="assertive" for errors
});

// Custom accessible toast
toast.custom((t) => (
  <div 
    role="status" 
    aria-live="polite"
    className="p-4 bg-pgBackground-0 border border-pgStroke-200 rounded-lg"
  >
    <p className="typography-labelMedium text-pgText-900">
      Accessible notification
    </p>
  </div>
));
```

### Color Contrast
- All design system color combinations meet WCAG AA standards
- State colors provide sufficient contrast: `pgStateError-dark` on `pgStateError-lighter`
- Text colors ensure readability: `pgText-900` on `pgBackground-0`

## Dependencies

### Required Dependencies
- `sonner` - Toast notification library
- `next-themes` - Theme management
- `react` - React framework

### Related Components
- **Theme Provider** - Provides theme context for automatic dark/light mode
- **Button** - For toast action buttons
- **Icons** - For toast status indicators

### Integration Example
```tsx
// Complete setup with theme provider
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';

export default function App({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-pgBackground-50 text-pgText-900">
        {children}
        <Toaster />
      </div>
    </ThemeProvider>
  );
}
```