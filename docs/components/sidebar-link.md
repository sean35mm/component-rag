# SidebarLink Component

## Purpose

The `SidebarLink` component is a reusable navigation item designed for sidebar interfaces within the file display panel. It provides a consistent way to render navigation links with icons, labels, keyboard shortcuts, and visual states (active, selected, expanded/collapsed). The component adapts its layout based on sidebar expansion state and screen size, supporting both traditional links and button-style interactions.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Utilizes multiple React hooks (`forwardRef`, custom hooks)
- Integrates with Zustand state management via `useFileDisplayPanel`
- Handles user interactions (click events)
- Manages responsive behavior with `useBreakpoint`

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `href` | `string` | Optional | URL for navigation when used as a link |
| `icon` | `React.ElementType` | ✅ Required | Icon component to display |
| `label` | `string` | ✅ Required | Text label for the navigation item |
| `shortcut` | `string \| null` | Optional | Keyboard shortcut display text |
| `isActive` | `boolean` | Optional | Indicates if this item represents the current active state |
| `selected` | `boolean` | Optional | Indicates if this item is currently selected |
| `className` | `string` | Optional | Additional CSS classes for styling |
| `iconClass` | `string` | Optional | Additional CSS classes for the icon |
| `onClick` | `() => void` | Optional | Click handler when used as a button (without href) |

## Usage Example

```tsx
import { SidebarLink } from '@/components/main-layout/file-display-panel/sidebar-link';
import { FileIcon, SettingsIcon } from '@/components/icons';

export function FileSidebar() {
  return (
    <nav className="space-y-2">
      {/* Navigation link */}
      <SidebarLink
        href="/files"
        icon={FileIcon}
        label="Files"
        shortcut="⌘F"
        isActive={true}
      />
      
      {/* Button-style interaction */}
      <SidebarLink
        icon={SettingsIcon}
        label="Settings"
        onClick={() => console.log('Settings clicked')}
        selected={false}
      />
      
      {/* Custom styling */}
      <SidebarLink
        href="/projects"
        icon={ProjectIcon}
        label="Projects"
        className="border-blue-500"
        iconClass="text-blue-600"
      />
    </nav>
  );
}
```

## Functionality

- **Adaptive Layout**: Automatically adjusts between expanded and collapsed sidebar states
- **Responsive Design**: Different sizing and spacing for mobile vs desktop viewports
- **Dual Mode**: Functions as either a Next.js Link or clickable button
- **Visual States**: Supports active, selected, and hover states with appropriate styling
- **Keyboard Shortcuts**: Optional shortcut display with styled badge
- **Icon Integration**: Flexible icon system with customizable styling
- **Accessibility**: Proper semantic structure with forwardRef support

## State Management

- **Zustand Integration**: Uses `useFileDisplayPanel` hook to access sidebar expansion state
- **Local State**: Manages responsive behavior through `useBreakpoint` hook
- **No Server State**: Component focuses on UI presentation rather than data fetching

## Side Effects

- **Navigation**: Triggers Next.js routing when `href` is provided
- **Click Handlers**: Executes custom `onClick` functions for button-style interactions
- **Responsive Updates**: Reacts to viewport changes and sidebar state modifications

## Dependencies

- **UI Components**: `TabMenuVerticalItem`, `Typography`
- **Hooks**: `useBreakpoint`, `useFileDisplayPanel`
- **Next.js**: `NextLink` for client-side navigation
- **Utilities**: `cn` for conditional class names
- **Context**: File display panel context for state management

## Integration

The `SidebarLink` component integrates into the larger application architecture as:

- **Layout Component**: Part of the main layout's file display panel system
- **Navigation System**: Connects to Next.js routing infrastructure
- **State Integration**: Plugs into Zustand-based sidebar state management
- **Design System**: Utilizes the application's typography and styling patterns
- **Responsive Framework**: Works with the breakpoint system for adaptive layouts

## Best Practices

✅ **Follows Architecture Guidelines**:
- Uses client component appropriately for interactive features
- Leverages Zustand for client state management
- Implements proper component decomposition with reusable UI components
- Maintains flat component structure without unnecessary nesting

✅ **Implementation Patterns**:
- Proper TypeScript interfaces with clear prop definitions
- ForwardRef implementation for proper ref handling
- Conditional rendering based on props (href vs onClick)
- Consistent styling patterns with utility classes
- Responsive design considerations built-in

✅ **Usage Recommendations**:
- Provide either `href` or `onClick`, not both
- Use `isActive` for current page/section indication
- Use `selected` for temporary selection states
- Include keyboard shortcuts only for primary actions
- Apply consistent iconography across related navigation items