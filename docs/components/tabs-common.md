# Tabs Common Utilities

## Purpose

The `tabs-common` module provides foundational utilities for building URL-persistent tab systems in React applications. It includes a context factory for creating type-safe tab contexts, URL persistence logic, and common interfaces that enable tab components to maintain their state in the browser's URL while following React compound component patterns.

## Exports Overview

| Export | Type | Description |
|--------|------|-------------|
| `createTabsContext` | Function | Factory function that creates React context and hook for tab components |
| `useUrlPersistence` | Hook | Custom hook that manages tab state persistence in URL search parameters |
| `PersistentTabsContext` | Interface | Context interface for URL-persistent tab components |
| `CommonTabItemProps` | Interface | Base props interface for tab item components |

## Interfaces

### PersistentTabsContext

```typescript
interface PersistentTabsContext {
  defaultValue: string;
  hrefFor: (value: string) => LinkProps['href'];
  searchParam: string;
  selected: string;
}
```

| Property | Type | Description |
|----------|------|-------------|
| `defaultValue` | `string` | The default tab value when no URL parameter is present |
| `hrefFor` | `(value: string) => LinkProps['href']` | Function to generate URLs for tab navigation |
| `searchParam` | `string` | URL search parameter key for persistence |
| `selected` | `string` | Currently selected tab value |

### CommonTabItemProps

```typescript
interface CommonTabItemProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `value` | `string` | Yes | Unique identifier for the tab item |
| `className` | `string` | No | Additional CSS classes for styling |
| `children` | `React.ReactNode` | Yes | Content to render inside the tab item |

## Usage Example

### Creating a Custom Tab System

```tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { createTabsContext, useUrlPersistence, type CommonTabItemProps } from '@/components/ui/tabs-common';

// Create context for your specific tab component
const { Context: ProjectTabsContext, useTabsContext } = createTabsContext<PersistentTabsContext>('ProjectTabs');

// Main container component
interface ProjectTabsProps {
  defaultValue: string;
  searchParam?: string;
  children: React.ReactNode;
  className?: string;
}

function ProjectTabs({ 
  defaultValue, 
  searchParam = 'tab', 
  children, 
  className 
}: ProjectTabsProps) {
  const { selected, hrefFor } = useUrlPersistence(defaultValue, searchParam);

  return (
    <ProjectTabsContext.Provider value={{
      defaultValue,
      hrefFor,
      searchParam,
      selected
    }}>
      <div className={`space-y-6 ${className || ''}`}>
        {children}
      </div>
    </ProjectTabsContext.Provider>
  );
}

// Tab list component
interface ProjectTabsListProps {
  children: React.ReactNode;
  className?: string;
}

function ProjectTabsList({ children, className }: ProjectTabsListProps) {
  return (
    <div 
      role="tablist"
      className={`
        flex space-x-1 rounded-lg bg-pgNeutral-100 p-1
        dark:bg-pgNeutral-800
        ${className || ''}
      `}
    >
      {children}
    </div>
  );
}

// Individual tab trigger
interface ProjectTabsTriggerProps extends CommonTabItemProps {
  disabled?: boolean;
}

function ProjectTabsTrigger({ 
  value, 
  children, 
  className, 
  disabled = false 
}: ProjectTabsTriggerProps) {
  const { selected, hrefFor } = useTabsContext();
  const isSelected = selected === value;

  return (
    <Link
      href={hrefFor(value)}
      role="tab"
      aria-selected={isSelected}
      aria-disabled={disabled}
      className={`
        inline-flex items-center justify-center rounded-md px-3 py-1.5
        typography-labelMedium font-medium
        transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pgBlue-500
        ${isSelected 
          ? 'bg-pgBackground-0 text-pgText-950 shadow-sm dark:bg-pgNeutral-950 dark:text-pgText-50' 
          : 'text-pgText-600 hover:text-pgText-900 dark:text-pgText-400 dark:hover:text-pgText-100'
        }
        ${disabled 
          ? 'pointer-events-none opacity-50' 
          : 'hover:bg-pgNeutral-50 dark:hover:bg-pgNeutral-700'
        }
        ${className || ''}
      `}
    >
      {children}
    </Link>
  );
}

// Tab content panels
interface ProjectTabsContentProps extends CommonTabItemProps {}

function ProjectTabsContent({ value, children, className }: ProjectTabsContentProps) {
  const { selected } = useTabsContext();
  
  if (selected !== value) return null;

  return (
    <div
      role="tabpanel"
      tabIndex={0}
      className={`
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pgBlue-500 focus-visible:ring-offset-2
        ${className || ''}
      `}
    >
      {children}
    </div>
  );
}

// Usage in your app
export default function ProjectDashboard() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="typography-titleH1 text-pgText-950 dark:text-pgText-50 mb-8">
        Project Dashboard
      </h1>
      
      <ProjectTabs defaultValue="overview" searchParam="section">
        <ProjectTabsList>
          <ProjectTabsTrigger value="overview">
            Overview
          </ProjectTabsTrigger>
          <ProjectTabsTrigger value="analytics">
            Analytics
          </ProjectTabsTrigger>
          <ProjectTabsTrigger value="settings">
            Settings
          </ProjectTabsTrigger>
        </ProjectTabsList>

        <ProjectTabsContent value="overview">
          <div className="bg-pgBackground-50 dark:bg-pgNeutral-900 rounded-lg p-6 border border-pgStroke-200 dark:border-pgStroke-700">
            <h2 className="typography-titleH3 text-pgText-900 dark:text-pgText-100 mb-4">
              Project Overview
            </h2>
            <p className="typography-paragraphMedium text-pgText-600 dark:text-pgText-400">
              Welcome to your project dashboard. Here you can see an overview of your project's status and metrics.
            </p>
          </div>
        </ProjectTabsContent>

        <ProjectTabsContent value="analytics">
          <div className="bg-pgBackground-50 dark:bg-pgNeutral-900 rounded-lg p-6 border border-pgStroke-200 dark:border-pgStroke-700">
            <h2 className="typography-titleH3 text-pgText-900 dark:text-pgText-100 mb-4">
              Analytics Dashboard
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-pgBackground-0 dark:bg-pgNeutral-800 p-4 rounded-lg border border-pgStroke-100 dark:border-pgStroke-600">
                <h3 className="typography-labelLarge text-pgText-800 dark:text-pgText-200">
                  Total Views
                </h3>
                <p className="typography-headlines24 text-pgBlue-600 dark:text-pgBlue-400 mt-2">
                  12,543
                </p>
              </div>
            </div>
          </div>
        </ProjectTabsContent>

        <ProjectTabsContent value="settings">
          <div className="bg-pgBackground-50 dark:bg-pgNeutral-900 rounded-lg p-6 border border-pgStroke-200 dark:border-pgStroke-700">
            <h2 className="typography-titleH3 text-pgText-900 dark:text-pgText-100 mb-4">
              Project Settings
            </h2>
            <p className="typography-paragraphMedium text-pgText-600 dark:text-pgText-400">
              Configure your project settings and preferences here.
            </p>
          </div>
        </ProjectTabsContent>
      </ProjectTabs>
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **Tab Labels**: `.typography-labelMedium` for tab triggers
- **Content Headings**: `.typography-titleH1`, `.typography-titleH3` for section headers
- **Body Text**: `.typography-paragraphMedium` for content descriptions
- **Metrics**: `.typography-headlines24` for numerical displays

### Color Tokens
- **Background**: `pgBackground-0`, `pgBackground-50`, `pgNeutral-100`, `pgNeutral-800`
- **Text**: `pgText-950`, `pgText-600`, `pgText-400` with dark mode variants
- **Borders**: `pgStroke-200`, `pgStroke-700` for container borders
- **Interactive**: `pgBlue-500` for focus rings, `pgBlue-600` for accent colors

### State Colors
- **Focus States**: `pgBlue-500` for focus rings
- **Hover States**: `pgNeutral-50` and `pgNeutral-700` for interactive elements

## Styling

### Tab Container Styling
```css
/* Light mode container */
.tab-container {
  @apply bg-pgNeutral-100 rounded-lg p-1;
}

/* Dark mode container */
.dark .tab-container {
  @apply bg-pgNeutral-800;
}
```

### Tab Trigger States
- **Default**: Subtle text color with hover effects
- **Selected**: Elevated appearance with background and shadow
- **Disabled**: Reduced opacity with pointer events disabled
- **Focus**: Ring outline for keyboard navigation

## Responsive Design

The tabs system adapts across breakpoints:

```tsx
// Responsive tab list
<ProjectTabsList className="
  flex-col space-y-1 space-x-0 sm:flex-row sm:space-y-0 sm:space-x-1
  w-full sm:w-auto
">
  {/* Tabs stack vertically on mobile, horizontally on sm+ */}
</ProjectTabsList>

// Responsive content grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Content adapts from 1 column to 3 columns */}
</div>
```

### Breakpoint Behavior
- **Mobile (< 640px)**: Tabs stack vertically, full width
- **Tablet (≥ 640px)**: Horizontal tab layout begins
- **Desktop (≥ 768px)**: Multi-column content layouts
- **Large (≥ 1024px)**: Maximum column density for content

## Accessibility

### ARIA Implementation
- `role="tablist"` on tab container
- `role="tab"` on tab triggers
- `role="tabpanel"` on content areas
- `aria-selected` indicates active tab
- `aria-disabled` for disabled tabs
- `tabIndex={0}` on content panels for keyboard navigation

### Keyboard Navigation
- **Tab**: Navigate between tab triggers
- **Enter/Space**: Activate selected tab
- **Arrow Keys**: Can be implemented for tab navigation

### Focus Management
```tsx
// Focus indicators
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pgBlue-500"

// Content panel focus
className="focus-visible:ring-offset-2"
```

## Dependencies

### Next.js Dependencies
- `next/link` - For client-side navigation
- `next/navigation` - For URL parameter management (`usePathname`, `useSearchParams`)

### React Dependencies
- `react` - Core React hooks (`createContext`, `useContext`, `useCallback`)

### Internal Dependencies
- Design system color tokens and typography classes
- Tailwind CSS configuration with custom color variables

### Usage with Other Components
```tsx
// Can be combined with other UI components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Tab content can contain any other design system components
<ProjectTabsContent value="settings">
  <Card className="p-6">
    <Button variant="primary" size="medium">
      Save Settings
    </Button>
  </Card>
</ProjectTabsContent>
```

This utility module serves as the foundation for building consistent, accessible, and URL-persistent tab interfaces throughout your application while maintaining full integration with the design system's color, typography, and spacing tokens.