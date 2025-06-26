# TabNotification Portal Components

## Purpose

The TabNotification portal system provides a flexible way to render notification content outside of the normal component hierarchy using React portals. This is particularly useful for displaying notifications, alerts, or overlays that need to appear at the top level of the DOM tree while maintaining React's component-based architecture.

## Props Interface

### TabNotificationPortalContainer

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| - | - | - | No props required |

### TabNotificationPortal

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `ReactNode` | ✅ | The content to be rendered inside the portal |

## Usage Example

```tsx
import React from 'react';
import { 
  TabNotificationPortalContainer, 
  TabNotificationPortal 
} from '@/components/ui/tab-notification';

// 1. Add the portal container to your root layout
function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="bg-pgBackground-0 text-pgText-950 dark:bg-pgBackground-950 dark:text-pgText-0">
        {children}
        <TabNotificationPortalContainer />
      </body>
    </html>
  );
}

// 2. Use the portal to render notifications
function NotificationExample() {
  const [showNotification, setShowNotification] = React.useState(false);

  return (
    <div className="p-6">
      <button
        onClick={() => setShowNotification(true)}
        className="px-4 py-2 bg-pgBlue-500 text-pgText-0 rounded-lg hover:bg-pgBlue-600 
                   transition-colors typography-labelMedium"
      >
        Show Notification
      </button>

      {showNotification && (
        <TabNotificationPortal>
          <div className="fixed top-4 right-4 z-50 max-w-sm">
            <div className="bg-pgStateSuccess-base border border-pgStroke-200 rounded-lg 
                            shadow-lg p-4 dark:bg-pgStateSuccess-dark dark:border-pgStroke-700">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-pgStateSuccess-base" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="typography-labelMedium text-pgText-950 dark:text-pgText-0">
                    Success!
                  </h3>
                  <p className="typography-paragraphSmall text-pgText-700 dark:text-pgText-300 mt-1">
                    Your action was completed successfully.
                  </p>
                </div>
                <button
                  onClick={() => setShowNotification(false)}
                  className="flex-shrink-0 text-pgText-500 hover:text-pgText-700 
                           dark:text-pgText-400 dark:hover:text-pgText-200"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </TabNotificationPortal>
      )}
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **Labels**: Use `.typography-labelMedium` or `.typography-labelLarge` for notification titles
- **Paragraphs**: Use `.typography-paragraphSmall` or `.typography-paragraphMedium` for notification content
- **Headlines**: Use `.typography-headlines16` or `.typography-headlines14` for compact notifications

### Color Tokens
- **Success States**: `bg-pgStateSuccess-base`, `bg-pgStateSuccess-light`, `text-pgStateSuccess-base`
- **Warning States**: `bg-pgStateWarning-base`, `bg-pgStateWarning-light`, `text-pgStateWarning-base`
- **Error States**: `bg-pgStateError-base`, `bg-pgStateError-light`, `text-pgStateError-base`
- **Information States**: `bg-pgStateInformation-base`, `bg-pgStateInformation-light`, `text-pgStateInformation-base`
- **Neutral Backgrounds**: `bg-pgBackground-0`, `bg-pgNeutral-50`, `bg-pgNeutral-100`
- **Borders**: `border-pgStroke-200`, `border-pgStroke-300`

### Common Styling Patterns
```tsx
// Success notification
<div className="bg-pgStateSuccess-light border border-pgStateSuccess-base/20 text-pgStateSuccess-base">

// Warning notification  
<div className="bg-pgStateWarning-light border border-pgStateWarning-base/20 text-pgStateWarning-base">

// Error notification
<div className="bg-pgStateError-light border border-pgStateError-base/20 text-pgStateError-base">

// Neutral notification
<div className="bg-pgNeutral-50 border border-pgStroke-200 text-pgText-950 
                dark:bg-pgNeutral-800 dark:border-pgStroke-700 dark:text-pgText-0">
```

## Styling

### Positioning Options
```tsx
// Top-right corner
<div className="fixed top-4 right-4 z-50">

// Top-center
<div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">

// Bottom-right (toast style)
<div className="fixed bottom-4 right-4 z-50">

// Full-width top banner
<div className="fixed top-0 left-0 right-0 z-50">
```

### Animation Classes
```tsx
// Slide in from right
<div className="animate-in slide-in-from-right-2 duration-300">

// Fade in
<div className="animate-in fade-in-0 duration-200">

// Scale in
<div className="animate-in zoom-in-95 duration-150">
```

### Shadow Variants
```tsx
// Subtle shadow
<div className="shadow-sm">

// Standard shadow
<div className="shadow-lg">

// Prominent shadow
<div className="shadow-xl">
```

## Responsive Design

### Breakpoint Adaptations
```tsx
<div className="max-w-sm sm:max-w-md md:max-w-lg">
  {/* Responsive width */}
</div>

<div className="fixed top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8">
  {/* Responsive positioning */}
</div>

<div className="p-3 sm:p-4 md:p-6">
  {/* Responsive padding */}
</div>
```

### Mobile Optimizations
```tsx
// Mobile-first notification
<div className="fixed inset-x-4 top-4 sm:right-4 sm:left-auto sm:max-w-sm">
  {/* Full width on mobile, fixed width on desktop */}
</div>
```

## Accessibility

### ARIA Implementation
```tsx
<TabNotificationPortal>
  <div
    role="alert"
    aria-live="polite"
    aria-atomic="true"
    className="fixed top-4 right-4 z-50"
  >
    <div className="bg-pgStateSuccess-light rounded-lg p-4">
      <h3 className="typography-labelMedium" id="notification-title">
        Success
      </h3>
      <p className="typography-paragraphSmall" aria-describedby="notification-title">
        Operation completed successfully
      </p>
    </div>
  </div>
</TabNotificationPortal>
```

### Keyboard Navigation
```tsx
// Dismissible notification with keyboard support
<div className="relative">
  <button
    className="absolute top-2 right-2 p-1 rounded-full hover:bg-pgNeutral-100 
               focus:outline-none focus:ring-2 focus:ring-pgBlue-500"
    onClick={onDismiss}
    aria-label="Dismiss notification"
  >
    <CloseIcon className="w-4 h-4" />
  </button>
</div>
```

### Screen Reader Considerations
- Use `role="alert"` for important notifications
- Use `aria-live="polite"` for non-critical updates
- Use `aria-live="assertive"` for urgent notifications
- Provide descriptive `aria-label` attributes for action buttons

## Dependencies

### Core Dependencies
- **React**: Portal functionality requires React 16.0+
- **DOM**: Uses `document.getElementById` for portal mounting

### Related Components
- **Toast**: Can be used within the portal for toast notifications
- **Modal**: Alternative portal-based component for modal dialogs
- **Overlay**: Background overlay component for blocking interactions

### Utility Functions
```tsx
// Portal detection utility
export function usePortalMounted() {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(!!document.getElementById(TAB_NOTIFICATION_PORTAL_ID));
  }, []);
  
  return mounted;
}
```

### Integration Patterns
```tsx
// With notification state management
import { useNotifications } from '@/hooks/useNotifications';

function NotificationProvider() {
  const { notifications } = useNotifications();
  
  return (
    <TabNotificationPortal>
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <NotificationItem key={notification.id} {...notification} />
        ))}
      </div>
    </TabNotificationPortal>
  );
}
```