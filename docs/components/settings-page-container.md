# SettingsPageContainer Component

## Purpose

The `SettingsPageContainer` component provides a standardized layout container for settings pages within the application. It wraps content with consistent padding and displays a title heading that adapts responsively, hiding on smaller screens and appearing as a prominent label on desktop views.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `ReactNode \| ReactNode[]` | ✅ | The content to be rendered inside the settings container |
| `title` | `string` | ✅ | The page title displayed as an h1 heading on desktop screens |

## Usage Example

```tsx
import { SettingsPageContainer } from '@/components/ui/settings-page-container';
import { Typography } from '@/components/ui/typography';

// Basic usage
function AccountSettings() {
  return (
    <SettingsPageContainer title="Account Settings">
      <div className="space-y-6">
        <div className="bg-pgNeutral-50 dark:bg-pgNeutral-900 rounded-lg p-4">
          <Typography variant="labelLarge" className="text-pgText-950 dark:text-pgText-50">
            Profile Information
          </Typography>
          <Typography variant="paragraphMedium" className="text-pgText-700 dark:text-pgText-300 mt-2">
            Update your personal information and preferences.
          </Typography>
        </div>
        
        <div className="bg-pgNeutral-50 dark:bg-pgNeutral-900 rounded-lg p-4">
          <Typography variant="labelLarge" className="text-pgText-950 dark:text-pgText-50">
            Security Settings
          </Typography>
          <Typography variant="paragraphMedium" className="text-pgText-700 dark:text-pgText-300 mt-2">
            Manage your password and two-factor authentication.
          </Typography>
        </div>
      </div>
    </SettingsPageContainer>
  );
}

// With form content
function NotificationSettings() {
  return (
    <SettingsPageContainer title="Notification Preferences">
      <form className="max-w-2xl space-y-8">
        <div className="bg-pgBackground-50 dark:bg-pgBackground-900 border border-pgStroke-200 dark:border-pgStroke-700 rounded-lg p-6">
          <Typography variant="labelLarge" className="text-pgText-950 dark:text-pgText-50 mb-4">
            Email Notifications
          </Typography>
          {/* Form controls would go here */}
        </div>
      </form>
    </SettingsPageContainer>
  );
}
```

## Design System Usage

### Typography Classes
- **`.typography-labelXLarge`** - Applied to the title heading, providing consistent large label styling

### Layout & Spacing
- **`p-4`** - Base padding of 16px on mobile screens
- **`lg:p-6`** - Increased padding of 24px on large screens (1024px+)
- **`px-4`** - Horizontal padding of 16px for the title text
- **`hidden`** - Hides title on mobile screens
- **`lg:block`** - Shows title on large screens

### Responsive Design
- Mobile-first approach with responsive padding
- Title visibility controlled by breakpoint-specific utilities

## Styling

The component uses a minimal styling approach with the following characteristics:

### Container Styling
```css
/* Applied classes breakdown */
p-4          /* padding: 1rem (16px) on all sides */
lg:p-6       /* padding: 1.5rem (24px) on screens ≥1024px */
```

### Title Styling
```css
/* Applied classes breakdown */
hidden       /* display: none */
px-4         /* padding-left: 1rem; padding-right: 1rem */
lg:block     /* display: block on screens ≥1024px */
```

### Customization Options

The component accepts any valid ReactNode as children, allowing for flexible content composition:

```tsx
// Custom styling with design system tokens
<SettingsPageContainer title="Advanced Settings">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="bg-pgNeutral-100/50 dark:bg-pgNeutral-800/50 rounded-xl p-6 border border-pgStroke-200 dark:border-pgStroke-700">
      {/* Content with design system colors */}
    </div>
  </div>
</SettingsPageContainer>
```

## Responsive Design

The component implements responsive behavior across the following breakpoints:

| Breakpoint | Behavior |
|------------|----------|
| **Mobile** (`< 1024px`) | Title hidden, base padding (16px) |
| **Desktop** (`≥ 1024px`) | Title visible, increased padding (24px) |

### Responsive Features
- **Progressive Enhancement**: Mobile-first design with enhanced desktop experience
- **Adaptive Spacing**: Increased padding on larger screens for better visual hierarchy
- **Conditional Title Display**: Title hidden on mobile to save vertical space, shown on desktop for better navigation context

## Accessibility

### Semantic HTML
- Uses proper `h1` heading element for page titles
- Maintains heading hierarchy for screen readers

### Screen Reader Support
- Title is properly announced as a level-1 heading when visible
- Container maintains semantic document structure

### Keyboard Navigation
- No interactive elements within the container itself
- Preserves focus flow for child components

### Recommendations for Usage
```tsx
// Ensure proper heading hierarchy in children
<SettingsPageContainer title="Account Settings"> {/* h1 */}
  <section>
    <Typography as="h2" variant="labelLarge">Profile</Typography> {/* h2 */}
    <Typography as="h3" variant="labelMedium">Personal Info</Typography> {/* h3 */}
  </section>
</SettingsPageContainer>
```

## Dependencies

### Internal Dependencies
- **`@/components/ui/typography`** - Typography component for consistent text rendering

### Design System Dependencies
- **Typography Scale** - Utilizes `.typography-labelXLarge` from globals.css
- **Tailwind Utilities** - Responsive utilities, padding, and display classes
- **Breakpoint System** - Relies on the `lg:` breakpoint (1024px)

### Related Components
Consider using alongside:
- **Form components** for settings inputs
- **Card components** for sectioned content
- **Button components** for actions
- **Typography component** for consistent text styling within children