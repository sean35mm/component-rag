# Account Tabs Outer Component

## Purpose

The `AccountTabsOuter` component provides horizontal tab navigation for the account section of the application. It renders a tab menu with "Account details" and "Billing" tabs, handling navigation between these sections while maintaining visual feedback for the currently active tab based on the URL pathname.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires browser-specific hooks (`usePathname`, `useRouter`) for navigation and pathname detection. The component is wrapped in Suspense to handle the hydration boundary properly.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | Optional | Additional CSS classes to apply to the tab menu container |

## Usage Example

```tsx
import { AccountTabsOuter } from '@/components/account/account-tabs-outer';

// Basic usage in account layout
export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="account-layout">
      <AccountTabsOuter />
      <div className="account-content">
        {children}
      </div>
    </div>
  );
}

// With custom styling
export default function AccountPage() {
  return (
    <div>
      <AccountTabsOuter className="mb-6 border-b" />
      {/* Account content */}
    </div>
  );
}
```

## Functionality

- **Tab Navigation**: Renders horizontal tabs for account sections (Account details, Billing)
- **Active State Detection**: Automatically highlights the active tab based on current pathname
- **Route Navigation**: Handles tab clicks to navigate between account sections
- **Icon Integration**: Displays relevant icons for each tab (User icon, Bank card icon)
- **Responsive Design**: Uses the `TabMenuHorizontal` component for consistent styling

## State Management

**Local State**: No explicit state management - relies on URL pathname for determining active state. Uses Next.js router for navigation state changes.

## Side Effects

- **Navigation**: Triggers route changes when tabs are clicked using `router.push()`
- **Pathname Monitoring**: Monitors current pathname to determine active tab state

## Dependencies

### UI Components
- `TabMenuHorizontal` - Base horizontal tab menu component
- `TabMenuHorizontalItem` - Individual tab item component

### Icons
- `PiUser3Line` - User icon for account details tab
- `PiBankCard2Line` - Bank card icon for billing tab

### Next.js Hooks
- `usePathname` - For detecting current route
- `useRouter` - For programmatic navigation

### React
- `Suspense` - For handling client component hydration

## Integration

This component fits into the account section architecture as a navigation component:

```
/account/
├── layout.tsx (includes AccountTabsOuter)
├── details/
│   └── page.tsx
└── billing/
    └── page.tsx
```

The component works with Next.js App Router to provide:
- URL-based navigation
- Active state management
- Consistent account section navigation

## Best Practices

✅ **Proper Client Component Usage**: Only uses `'use client'` where necessary for navigation hooks

✅ **Suspense Boundary**: Implements Suspense wrapper to handle hydration properly

✅ **Component Decomposition**: Separates the Suspense wrapper (`AccountTabsOuter`) from the main logic (`AccountTabsMain`)

✅ **Flat Architecture**: Uses composition over nesting with UI components

✅ **Reusable Configuration**: Exports `tabs` array for potential reuse in other components

✅ **Consistent Props Pattern**: Follows standard `className` prop pattern for styling flexibility

✅ **Pathname-based State**: Uses URL as source of truth for active state rather than internal state

✅ **Icon Integration**: Properly integrates with the application's icon system

The component adheres to our architectural guidelines by keeping client-side logic minimal, using URL state over internal state, and maintaining clear separation between UI and navigation concerns.