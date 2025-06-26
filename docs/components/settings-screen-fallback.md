# SettingsScreenFallback Component

## Purpose

The `SettingsScreenFallback` component provides a loading skeleton interface for settings screens, displaying placeholder elements that mirror the structure of a typical user settings form. This component enhances user experience during data loading by showing familiar content shapes instead of blank screens or generic spinners.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| N/A | N/A | N/A | N/A | This component accepts no props and renders a static skeleton layout |

## Usage Example

```tsx
import { SettingsScreenFallback } from '@/components/ui/skeletons/settings-screen-fallback';
import { Suspense } from 'react';

// Basic usage as loading fallback
function SettingsPage() {
  return (
    <Suspense fallback={<SettingsScreenFallback />}>
      <UserSettingsForm />
    </Suspense>
  );
}

// Usage in conditional rendering
function UserSettings({ isLoading }: { isLoading: boolean }) {
  if (isLoading) {
    return <SettingsScreenFallback />;
  }
  
  return <SettingsForm />;
}

// Usage with error boundaries
function SettingsContainer() {
  return (
    <div className="min-h-screen bg-pgBackground-50 dark:bg-pgBackground-900">
      <div className="container mx-auto">
        <ErrorBoundary fallback={<SettingsErrorState />}>
          <Suspense fallback={<SettingsScreenFallback />}>
            <AsyncSettingsComponent />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **Not directly used** - This skeleton component uses `Skeleton` components that simulate text elements rather than actual typography classes
- **Simulated elements correspond to:**
  - `.typography-labelMedium` - Form field labels (h-6 skeletons)
  - `.typography-paragraphSmall` - Helper text (h-4 skeletons)
  - `.typography-labelLarge` - Tab labels (h-8 skeletons)

### Color System
- **Skeleton Components**: Inherits colors from the base `Skeleton` component
- **Background Adaptation**: Works seamlessly with dark/light themes through CSS variable system
- **Compatible with**: All background color variants (`pgBackground-*` scales)

### Spacing & Layout
- **Container Spacing**: `p-4` for consistent content padding
- **Section Spacing**: `space-y-8` for major section separation
- **Element Spacing**: `space-y-4` for related form elements
- **Gap Management**: `gap-2`, `gap-4` for flex layouts

## Styling

### Layout Variants
```tsx
// Default responsive layout
<SettingsScreenFallback />

// Custom container with specific background
<div className="bg-pgBackground-100 dark:bg-pgBackground-800 rounded-lg">
  <SettingsScreenFallback />
</div>

// With custom max width
<div className="max-w-4xl">
  <SettingsScreenFallback />
</div>
```

### Skeleton Elements Structure
- **Tab Navigation**: Two horizontal pills (`h-8 w-32 rounded-2xl`)
- **Form Labels**: Consistent label simulation (`h-6 w-24` to `h-6 w-32`)
- **Input Fields**: Standard form field height (`h-10`)
- **Radio Options**: Circular indicators (`size-4 rounded-full`)
- **Action Button**: Primary button size (`h-12 w-32`)

## Responsive Design

### Breakpoint Adaptations

| Breakpoint | Behavior |
|------------|----------|
| **Mobile (< 640px)** | Single column layout, full-width form fields |
| **Small (≥ 640px)** | Form fields at 50% width (`sm:w-1/2`), horizontal flex layouts (`sm:flex-row`) |
| **Medium+ (≥ 768px)** | Business details in 2-column grid (`sm:grid-cols-2`) |

### Responsive Classes Used
```css
/* Form field containers */
flex-col gap-4 sm:flex-row

/* Input field widths */
w-full sm:w-1/2

/* Grid layouts */
grid-cols-1 gap-4 sm:grid-cols-2
```

## Accessibility

### Screen Reader Support
- **Semantic Structure**: Uses proper div hierarchy that mirrors actual form structure
- **Skeleton Component**: Inherits accessibility features from base `Skeleton` component
- **Loading States**: Should be announced to screen readers via parent loading indicators

### Best Practices
```tsx
// Proper ARIA labeling in parent component
<div aria-label="Loading user settings" role="status">
  <SettingsScreenFallback />
</div>

// With loading announcement
<div aria-live="polite" aria-busy="true">
  {isLoading && <SettingsScreenFallback />}
</div>
```

### Accessibility Considerations
- **Motion Sensitivity**: Skeleton animations respect `prefers-reduced-motion`
- **Color Independence**: Layout structure remains clear without color dependence
- **Focus Management**: No interactive elements to prevent focus traps during loading

## Dependencies

### Internal Components
- **`@/components/ui/skeleton`** - Base skeleton component providing shimmer animation and theming

### Related Components
```tsx
// Typical usage alongside these components
import { SettingsScreenFallback } from '@/components/ui/skeletons/settings-screen-fallback';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Suspense } from 'react';
```

### Design System Integration
- **Inherits from**: Global CSS variables for consistent theming
- **Compatible with**: All color schemes and theme variants
- **Responsive**: Uses standard Tailwind breakpoint system
- **Spacing**: Follows 4px base unit spacing scale

### Usage with State Management
```tsx
// Redux/Zustand loading states
const isLoading = useSelector(state => state.user.isLoading);
const hasError = useSelector(state => state.user.error);

if (hasError) return <ErrorState />;
if (isLoading) return <SettingsScreenFallback />;
return <SettingsForm />;
```