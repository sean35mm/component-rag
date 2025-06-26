# SettingsTabs Component

## Purpose

The `SettingsTabs` component provides horizontal tab navigation for the settings section of the application. It renders three main settings categories (Connected Applications, Search Customization, and Signal Delivery) as clickable tabs with icons, handling active state management based on the current route and navigation between different settings pages.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires browser-specific APIs including:
- Next.js `usePathname()` and `useRouter()` hooks for navigation
- Click event handlers for tab navigation
- Dynamic active state management based on current route

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | Optional | Additional CSS classes to apply to the tab container |

## Usage Example

```tsx
import { SettingsTabs } from '@/components/settings/settings-tabs';

// Basic usage in a settings layout
export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="settings-container">
      <SettingsTabs className="mb-6" />
      <div className="settings-content">
        {children}
      </div>
    </div>
  );
}

// Usage in a settings page
export default function SettingsPage() {
  return (
    <div>
      <h1>Settings</h1>
      <SettingsTabs />
      {/* Settings content will be rendered based on active tab */}
    </div>
  );
}
```

## Functionality

- **Tab Navigation**: Renders three predefined settings tabs with icons and labels
- **Active State Management**: Automatically highlights the active tab based on current pathname
- **Route-based Navigation**: Uses Next.js router to navigate between different settings sections
- **Visual Indicators**: Each tab includes relevant icons (puzzle for apps, search for customization, mail for delivery)
- **Responsive Design**: Leverages the underlying `TabMenuHorizontal` component for consistent styling

## State Management

**Navigation State**: Uses Next.js built-in navigation hooks:
- `usePathname()` - Tracks current route to determine active tab
- `useRouter()` - Handles programmatic navigation between tabs

**No External State**: This component doesn't use TanStack Query or Zustand as it only manages navigation state through Next.js routing.

## Side Effects

- **Route Navigation**: Programmatically navigates to different settings pages when tabs are clicked
- **Pathname Monitoring**: Continuously monitors pathname changes to update active tab state

## Dependencies

### UI Components
- `TabMenuHorizontal` - Base horizontal tab menu component
- `TabMenuHorizontalItem` - Individual tab item component

### Icons
- `PiPuzzle2Line` - Connected Applications tab icon
- `PiMenuSearchLine` - Search Customization tab icon  
- `PiMailUnreadLine` - Signal Delivery tab icon

### Next.js Hooks
- `usePathname` - Current route detection
- `useRouter` - Programmatic navigation

### Utilities
- `GENERIC_TABS_TO_HREF` - URL mapping utility
- `TabOptions` - Tab configuration types

## Integration

### Settings Architecture
This component serves as the primary navigation interface for the settings section, integrating with:

- **Settings Layout**: Typically placed at the top of settings pages to provide consistent navigation
- **Settings Routes**: Works with Next.js file-based routing to handle `/settings/*` paths
- **Tab Content**: Coordinates with page components that render based on active tab selection

### URL Structure
```
/settings/connected-apps - Connected Applications
/settings/search-customization/source-groups - Search Customization  
/settings/signal-delivery - Signal Delivery
```

## Best Practices

### ✅ Follows Architecture Guidelines

- **Client Component Usage**: Properly uses `'use client'` only when necessary for navigation hooks
- **Component Decomposition**: Cleanly separated into wrapper (`SettingsTabs`) and implementation (`SettingsTabsInner`) components
- **Suspense Boundary**: Implements proper Suspense wrapper for the client component
- **Reusable UI**: Leverages existing UI components (`TabMenuHorizontal`) rather than building custom navigation

### ✅ Implementation Patterns

- **Exported Configuration**: The `tabs` array is exported for potential reuse in other components
- **Type Safety**: Properly typed props interface with optional className
- **Route-based State**: Uses URL as single source of truth for active state rather than local state
- **Consistent Navigation**: Integrates with Next.js App Router patterns for seamless navigation

### ✅ Maintainability

- **Centralized Tab Config**: All tab definitions in a single, easily maintainable array
- **Scalable Structure**: New tabs can be easily added by extending the tabs array
- **Clear Separation**: Navigation logic separated from rendering logic through component decomposition