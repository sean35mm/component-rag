# SearchCustomizationTabs Component

## Purpose

The `SearchCustomizationTabs` component provides navigation tabs for the search customization settings section. It allows users to switch between "Source Groups" and "Filters" configuration pages, providing a cohesive navigation experience within the search customization workflow.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Next.js navigation hooks (`usePathname`, `useRouter`)
- Interactive click handlers for tab navigation
- Client-side routing functionality

## Props Interface

### SearchCustomizationTabs

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| None | - | - | This component accepts no props |

### SearchCustomizationTabsInner

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| None | - | - | This component accepts no props |

## Usage Example

```tsx
import { SearchCustomizationTabs } from '@/components/settings/search-customization/search-customization-tabs';

// In a settings layout or page
export default function SearchCustomizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="settings-container">
      <h1>Search Customization</h1>
      
      {/* Navigation tabs */}
      <SearchCustomizationTabs />
      
      {/* Tab content */}
      <div className="tab-content">
        {children}
      </div>
    </div>
  );
}

// Usage in different routes:
// /settings/search-customization/source-groups - "Source Groups" tab active
// /settings/search-customization/filters - "Filters" tab active
```

## Functionality

### Core Features

- **Tab Navigation**: Provides clickable tabs to navigate between search customization sections
- **Active State Management**: Automatically highlights the current tab based on the URL pathname
- **Responsive Design**: Adapts layout for mobile (full width) and desktop (auto width) screens
- **Client-side Routing**: Uses Next.js router for seamless navigation without page reloads

### Tab Configuration

- **Source Groups**: Navigate to source group management settings
- **Filters**: Navigate to search filter configuration settings

### Visual Behavior

- Active tab is highlighted based on current pathname
- Responsive width classes (`w-full lg:w-auto`)
- Consistent styling through `SwitchToggleMenu` UI component

## State Management

**No External State Management** - This component relies on:
- **URL State**: Current active tab determined by `usePathname()`
- **Navigation State**: Managed by Next.js router via `useRouter()`
- **No Local State**: Stateless component that derives active state from URL

## Side Effects

### Navigation Effects
- **Route Changes**: Triggers navigation to different search customization pages
- **URL Updates**: Updates browser URL when tabs are clicked
- **Pathname Monitoring**: Responds to pathname changes for active state

### No Data Fetching
- Pure navigation component with no API calls
- No external data dependencies

## Dependencies

### Next.js Hooks
```tsx
import { usePathname, useRouter } from 'next/navigation';
```

### UI Components
```tsx
import {
  SwitchToggleItem,
  SwitchToggleMenu,
} from '@/components/ui/switch-toggle-menu';
```

### Utilities
```tsx
import { TabOptions } from '@/lib/types';
import { GENERIC_TABS_TO_HREF } from '@/lib/utils/tab-type-to-href';
```

### React Core
```tsx
import React, { FC, Suspense } from 'react';
```

## Integration

### Application Architecture

```
Settings Layout
├── SearchCustomizationTabs (navigation)
├── Source Groups Page (/source-groups)
└── Filters Page (/filters)
```

### URL Structure
- Base path derived from `GENERIC_TABS_TO_HREF[TabOptions.SETTINGS]`
- Tab-specific paths: `/search-customization/source-groups`, `/search-customization/filters`

### Layout Integration
- Designed to work within settings layouts
- Provides consistent navigation across search customization features
- Integrates with Next.js App Router file-based routing

## Best Practices

### ✅ Architecture Adherence

- **Client Component Usage**: Appropriately uses client component for interactive navigation
- **Component Decomposition**: Clean separation with Suspense wrapper and inner component
- **Flat Structure**: Simple, focused component without unnecessary nesting

### ✅ Implementation Patterns

- **Suspense Wrapping**: Proper Suspense boundary for client-side navigation hooks
- **Responsive Design**: Mobile-first approach with responsive classes
- **Accessibility**: Uses semantic button components from UI library

### ✅ Maintainability

- **Static Configuration**: Tab definitions easily maintainable in `tabs` array
- **Type Safety**: Leverages TypeScript with proper imports and typing
- **Reusable UI**: Built on top of consistent `SwitchToggleMenu` component

### ✅ Performance

- **Lightweight**: No heavy state management or data fetching
- **Efficient Rendering**: Minimal re-renders, only responds to pathname changes
- **Code Splitting**: Proper client component boundary with Suspense