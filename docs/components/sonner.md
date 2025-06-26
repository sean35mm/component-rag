# Toaster Component

## Purpose

The `Toaster` component is a toast notification provider that renders toast messages at the global application level. It's built on top of the `sonner` library and provides seamless dark mode integration with automatic theme detection. This component should be placed once at the root of your application to enable toast notifications throughout your app.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `theme` | `'light' \| 'dark' \| 'system'` | No | `'system'` | Theme preference for toast appearance |
| `position` | `'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'` | No | `'bottom-right'` | Position where toasts appear on screen |
| `expand` | `boolean` | No | `false` | Whether toasts should expand on hover |
| `richColors` | `boolean` | No | `false` | Enable rich colors for different toast types |
| `closeButton` | `boolean` | No | `false` | Show close button on toasts |
| `toastOptions` | `ToastOptions` | No | - | Global options for all toasts |
| `offset` | `string \| number` | No | `32` | Offset from screen edge |
| `dir` | `'ltr' \| 'rtl'` | No | `'ltr'` | Text direction |

*Inherits all props from the underlying Sonner component*

## Usage Example

### Basic Setup (App Root)

```tsx
// app/layout.tsx or pages/_app.tsx
import { Toaster } from '@/components/ui/sonner';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-pgBackground-50 text-pgText-900">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
```

### Custom Configuration

```tsx
import { Toaster } from '@/components/ui/sonner';

export default function App() {
  return (
    <div className="min-h-screen bg-pgBackground-0">
      {/* Your app content */}
      <Toaster
        position="top-center"
        expand={true}
        richColors={true}
        closeButton={true}
        offset="24px"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: '8px',
          },
          classNames: {
            toast: 'border-pgStroke-200 shadow-lg',
            title: 'typography-labelMedium text-pgText-900',
            description: 'typography-paragraphSmall text-pgText-600',
          },
        }}
      />
    </div>
  );
}
```

### Using with Toast Functions

```tsx
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export function NotificationExample() {
  const handleSuccess = () => {
    toast.success('Profile updated successfully!', {
      description: 'Your changes have been saved.',
      className: 'border-pgStateSuccess-base/20 bg-pgStateSuccess-lighter',
    });
  };

  const handleError = () => {
    toast.error('Failed to save changes', {
      description: 'Please try again later.',
      className: 'border-pgStateError-base/20 bg-pgStateError-lighter',
    });
  };

  const handleCustom = () => {
    toast('Custom notification', {
      description: 'With custom styling',
      className: 'border-pgBlue-200 bg-pgBlue-50',
      style: {
        borderLeft: '4px solid rgb(var(--pg-blue-500))',
      },
    });
  };

  return (
    <div className="space-y-4 p-6">
      <Button onClick={handleSuccess} variant="outline">
        Show Success Toast
      </Button>
      <Button onClick={handleError} variant="outline">
        Show Error Toast
      </Button>
      <Button onClick={handleCustom} variant="outline">
        Show Custom Toast
      </Button>
    </div>
  );
}
```

## Design System Usage

### Typography Classes Used
- **Toast Title**: Automatically uses system font with medium weight
- **Toast Description**: Uses smaller, muted text styling
- **Custom Typography**: Apply using `toastOptions.classNames`:
  ```tsx
  classNames: {
    title: 'typography-labelMedium',
    description: 'typography-paragraphSmall',
  }
  ```

### Color Tokens Used
- **Background Colors**:
  - Light mode: `white` (pgNeutral-0 equivalent)
  - Dark mode: `slate-950` (pgNeutral-950 equivalent)
- **Text Colors**:
  - Primary: `slate-950` / `slate-50`
  - Secondary: `slate-500` / `slate-400`
- **Border Colors**:
  - Light mode: `slate-200` (pgStroke-200 equivalent)
  - Dark mode: `slate-800` (pgStroke-800 equivalent)

### Custom Styling with Design System

```tsx
<Toaster
  toastOptions={{
    classNames: {
      toast: 'bg-pgBackground-0 border-pgStroke-200 text-pgText-900 dark:bg-pgBackground-950 dark:border-pgStroke-800 dark:text-pgText-50',
      description: 'text-pgText-600 dark:text-pgText-400',
      actionButton: 'bg-pgBlue-600 text-white hover:bg-pgBlue-700',
      cancelButton: 'bg-pgBackground-100 text-pgText-600 hover:bg-pgBackground-200 dark:bg-pgBackground-800 dark:text-pgText-400',
    },
  }}
/>
```

## Styling

### State Variants
Use toast functions with custom styling for different states:

```tsx
// Success state
toast.success('Success message', {
  className: 'border-l-4 border-l-pgStateSuccess-base bg-pgStateSuccess-lighter',
});

// Error state
toast.error('Error message', {
  className: 'border-l-4 border-l-pgStateError-base bg-pgStateError-lighter',
});

// Warning state
toast.warning('Warning message', {
  className: 'border-l-4 border-l-pgStateWarning-base bg-pgStateWarning-lighter',
});

// Info state
toast.info('Info message', {
  className: 'border-l-4 border-l-pgStateInformation-base bg-pgStateInformation-lighter',
});
```

### Custom Toast Styling

```tsx
// Custom branded toast
toast('Custom message', {
  className: 'bg-gradient-to-r from-pgBlue-50 to-pgPurple-50 border-pgBlue-200',
  style: {
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgb(var(--pg-blue-500) / 0.15)',
  },
});
```

## Responsive Design

The component automatically adapts to different screen sizes:

- **Mobile (< 640px)**: Toasts stack vertically with reduced padding
- **Tablet (640px - 1024px)**: Standard spacing and sizing
- **Desktop (> 1024px)**: Full spacing with optimal positioning

Position recommendations by breakpoint:
```tsx
// Responsive positioning
<Toaster
  position={isDesktop ? 'bottom-right' : 'bottom-center'}
  offset={isDesktop ? '32px' : '16px'}
/>
```

## Accessibility

### Built-in Features
- **ARIA Live Region**: Toasts are announced to screen readers
- **Keyboard Navigation**: Supports focus management and keyboard dismissal
- **High Contrast**: Respects system high-contrast preferences
- **Reduced Motion**: Honors `prefers-reduced-motion` settings

### Best Practices
- Keep toast messages concise and actionable
- Use appropriate toast types (success, error, warning, info)
- Provide sufficient color contrast (4.5:1 minimum)
- Include descriptive text, not just icons

```tsx
// Accessible toast example
toast.success('Profile updated', {
  description: 'Your profile changes have been saved successfully.',
  duration: 5000, // Longer duration for important messages
});
```

## Dependencies

### Required Dependencies
- `sonner` - Core toast functionality
- `next-themes` - Theme detection and management
- `react` - React 18+

### Related Components
- **Button**: Often used to trigger toasts
- **Form Components**: Commonly trigger success/error toasts
- **ThemeProvider**: Required for proper theme detection

### Integration Example

```tsx
// hooks/use-toast-notifications.ts
import { toast } from 'sonner';

export function useToastNotifications() {
  const notifySuccess = (message: string, description?: string) => {
    toast.success(message, {
      description,
      className: 'border-pgStateSuccess-base/20 bg-pgStateSuccess-lighter',
    });
  };

  const notifyError = (message: string, description?: string) => {
    toast.error(message, {
      description,
      className: 'border-pgStateError-base/20 bg-pgStateError-lighter',
    });
  };

  return { notifySuccess, notifyError };
}
```

### Theme Integration

Ensure the Toaster is wrapped with your theme provider:

```tsx
// app/providers.tsx
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <Toaster />
    </ThemeProvider>
  );
}
```