# DevelopersTabs Component

## Purpose

The `DevelopersTabs` component provides a horizontal tab navigation interface for the developers section of the application. It renders a series of tabs for navigating between different developer tools including Configuration, API Keys, Logs, and Changelogs, with automatic active state detection based on the current route.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Next.js navigation hooks (`usePathname`, `useRouter`)
- Browser-side routing interactions
- Click event handlers for tab navigation

The component is wrapped in `Suspense` to handle potential hydration mismatches when accessing pathname on the client side.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | Optional CSS class name for custom styling of the tab container |

## Usage Example

```tsx
import { DevelopersTabs } from '@/components/developers/developers-tabs';

// Basic usage
export default function DevelopersLayout({ children }) {
  return (
    <div>
      <DevelopersTabs />
      <main>{children}</main>
    </div>
  );
}

// With custom styling
export default function CustomDevelopersPage() {
  return (
    <div>
      <DevelopersTabs className="mb-6 border-b" />
      {/* Page content */}
    </div>
  );
}
```

## Functionality

- **Route-based Active State**: Automatically highlights the current tab based on the pathname
- **Programmatic Navigation**: Handles tab clicks with Next.js router for client-side navigation
- **Icon Support**: Each tab displays an associated icon alongside the tab name
- **Responsive Design**: Uses horizontal tab layout suitable for desktop and tablet viewports
- **Accessibility**: Leverages the underlying `TabMenuHorizontal` component's accessibility features

## State Management

**Local State**: Uses Next.js navigation hooks for route-based state:
- `usePathname()` - Determines which tab should be marked as active
- `useRouter()` - Handles programmatic navigation when tabs are clicked

No external state management (TanStack Query or Zustand) is required as this is a pure navigation component.

## Side Effects

- **Route Navigation**: Triggers page navigation when tabs are clicked via `router.push()`
- **URL Updates**: Changes the browser URL and history when navigating between tabs
- **Re-renders**: Component re-renders when pathname changes to update active states

## Dependencies

### UI Components
- `TabMenuHorizontal` - Horizontal tab container component
- `TabMenuHorizontalItem` - Individual tab item component

### Icons
- `PiSettings2Line` - Configuration tab icon
- `PiKey2Line` - API Keys tab icon  
- `PiArchiveStackLine` - Logs tab icon
- `PiTodoLine` - Changelogs tab icon

### Next.js Hooks
- `usePathname` - Current route detection
- `useRouter` - Programmatic navigation

## Integration

This component is designed to be used in the developers section layout:

```tsx
// app/developers/layout.tsx
import { DevelopersTabs } from '@/components/developers/developers-tabs';

export default function DevelopersLayout({ children }) {
  return (
    <div className="container mx-auto">
      <h1>Developer Tools</h1>
      <DevelopersTabs className="mb-8" />
      {children}
    </div>
  );
}
```

The component expects the following route structure:
- `/developers/configuration`
- `/developers/api-keys`
- `/developers/logs`
- `/developers/changelogs`

## Best Practices

✅ **Follows Architecture Guidelines**:
- **Appropriate Client Component Usage**: Uses `'use client'` only because navigation hooks are required
- **Proper Suspense Handling**: Wraps the inner component to prevent hydration issues
- **Component Decomposition**: Separates the Suspense wrapper from the core logic
- **Reusable UI Components**: Leverages shared `TabMenuHorizontal` components
- **Domain Organization**: Located in `/developers/` folder following feature-based structure

✅ **Performance Optimizations**:
- Minimal re-renders (only when pathname changes)
- No unnecessary state or effects
- Efficient tab configuration with static array

✅ **Maintainability**:
- Exported `tabs` array allows for easy configuration updates
- Clear separation between data and presentation
- Type-safe props interface
- Consistent naming conventions