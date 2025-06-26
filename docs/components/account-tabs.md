# AccountTabs Component

## Purpose

The `AccountTabs` component provides a navigation interface for account-related pages within the application. It renders a toggle menu that allows users to switch between different account management sections, specifically "General" account details and "Edit Password" functionality. This component serves as a navigation control for account-related views.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires browser-specific features including:
- Next.js navigation hooks (`usePathname`, `useRouter`)
- Interactive click handlers for tab navigation
- Dynamic active state management based on current route

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | This component accepts no props |

## Usage Example

```tsx
import { AccountTabs } from '@/components/account/account-tabs';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="account-layout">
      <div className="account-header">
        <h1>Account Settings</h1>
        <AccountTabs />
      </div>
      <div className="account-content">
        {children}
      </div>
    </div>
  );
}

// Usage in account pages
export default function AccountDetailsPage() {
  return (
    <div>
      <AccountTabs />
      <div className="account-details">
        {/* Account details content */}
      </div>
    </div>
  );
}
```

## Functionality

- **Tab Navigation**: Renders clickable tabs for "General" and "Edit Password" sections
- **Active State Detection**: Automatically highlights the current tab based on the URL pathname
- **Responsive Design**: Adapts layout for mobile (full width) and desktop (auto width) viewports
- **Route Navigation**: Handles tab clicks by programmatically navigating to the appropriate route
- **Suspense Boundary**: Wraps the inner component to handle loading states during navigation

## State Management

**Local State**: Uses Next.js navigation hooks for state management:
- `usePathname()` - Tracks current route to determine active tab
- `useRouter()` - Handles programmatic navigation on tab clicks

No external state management (TanStack Query or Zustand) is required as this component only manages UI navigation state.

## Side Effects

- **Route Navigation**: Triggers route changes when tabs are clicked using `router.push()`
- **URL Synchronization**: Automatically syncs tab active state with browser URL
- **History Management**: Leverages Next.js router for proper browser history handling

## Dependencies

### Components
- `SwitchToggleMenu` - UI component providing the toggle menu container
- `SwitchToggleItem` - UI component for individual toggle items

### Hooks
- `usePathname` - Next.js hook for accessing current pathname
- `useRouter` - Next.js hook for programmatic navigation

### Utilities
- `GENERIC_TABS_TO_HREF` - Utility mapping for generating tab URLs
- `TabOptions` - Type definitions for tab configuration

### React Features
- `Suspense` - React component for handling loading boundaries

## Integration

This component integrates into the account management flow by:

1. **Layout Integration**: Typically placed in account layout components or at the top of account pages
2. **Route Structure**: Works with the application's nested routing structure under account paths
3. **URL Mapping**: Uses centralized URL mapping utilities to maintain consistent routing
4. **UI System**: Leverages the application's design system through `SwitchToggleMenu` components

## Best Practices

✅ **Follows Architecture Guidelines**:
- **Client Component Usage**: Appropriately uses `'use client'` only when necessary for navigation functionality
- **Component Decomposition**: Clean separation with `AccountTabsInner` wrapped in Suspense boundary
- **Flat Structure**: Avoids deep nesting, keeping components at appropriate abstraction levels
- **Reusability**: Uses UI components from `/ui/` directory for consistent styling

✅ **Additional Best Practices**:
- **Suspense Boundary**: Proper use of Suspense for handling navigation loading states
- **Responsive Design**: Implements mobile-first responsive classes
- **Centralized Configuration**: Tab configuration is exported for potential reuse
- **Type Safety**: Uses TypeScript interfaces and enums for route configuration
- **Accessibility**: Leverages semantic UI components that likely include proper ARIA attributes