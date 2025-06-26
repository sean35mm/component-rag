# QuickActionItem Component

## Purpose

The `QuickActionItem` component is a versatile interactive element designed for displaying actions, navigation items, or informational content with optional expand/collapse functionality. It supports multiple visual variants, can act as a link or button, and provides hover states and collapsible content areas. Perfect for dashboards, menus, settings panels, and quick access interfaces.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `headline` | `ReactNode` | ✅ | - | Main text or content displayed as the primary label |
| `icon` | `ReactNode` | ❌ | - | Icon element displayed on the left side |
| `status` | `ReactNode` | ❌ | - | Status indicator or badge displayed on the right |
| `href` | `string` | ❌ | - | URL for navigation when used as a link |
| `isNewTab` | `boolean` | ❌ | `false` | Opens link in new tab when `href` is provided |
| `description` | `string` | ❌ | - | Secondary text displayed below the headline |
| `variant` | `'basic' \| 'avatar' \| 'leftIcon' \| 'brand'` | ❌ | `'basic'` | Visual style variant |
| `size` | `'xs' \| 'sm' \| 'md'` | ❌ | `'sm'` | Size variant affecting padding and typography |
| `darkerHover` | `boolean` | ❌ | `false` | Enables darker hover state (legacy prop) |
| `showArrow` | `boolean` | ❌ | `false` | Shows arrow indicator on the right |
| `active` | `boolean` | ❌ | `false` | Applies active state styling |
| `hoverable` | `boolean` | ❌ | `false` | Enables hover cursor without href or children |
| `children` | `ReactNode` | ❌ | - | Collapsible content area |
| `className` | `string` | ❌ | - | Additional CSS classes |

## Usage Example

```tsx
import { QuickActionItem } from '@/components/ui/quick-action-item';
import { PiUserCircle, PiGearSix, PiBell } from '@/components/icons';

function ActionPanel() {
  return (
    <div className="space-y-3 p-4">
      {/* Basic navigation item */}
      <QuickActionItem
        headline="Profile Settings"
        description="Manage your account preferences"
        icon={<PiUserCircle className="text-pgBlue-600" />}
        href="/settings/profile"
        showArrow
        size="md"
      />

      {/* Interactive item with status */}
      <QuickActionItem
        headline="Notifications"
        icon={<PiBell className="text-pgOrange-500" />}
        status={
          <span className="typography-label3XSmall bg-pgRed-100 text-pgRed-800 px-2 py-1 rounded-full">
            3 new
          </span>
        }
        variant="leftIcon"
        hoverable
      />

      {/* Collapsible item */}
      <QuickActionItem
        headline="Advanced Options"
        icon={<PiGearSix className="text-pgNeutral-600" />}
        showArrow
        variant="leftIcon"
      >
        <div className="space-y-2 pl-7">
          <QuickActionItem
            headline="API Keys"
            size="xs"
            href="/settings/api"
          />
          <QuickActionItem
            headline="Webhooks"
            size="xs"
            href="/settings/webhooks"
          />
        </div>
      </QuickActionItem>

      {/* Active state */}
      <QuickActionItem
        headline="Current Page"
        icon={<PiUserCircle className="text-pgBlue-600" />}
        active
        variant="brand"
      />
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **Headlines**: Uses `typography-labelSmall` (xs/sm sizes) and `typography-labelMedium` (md size) for headlines
- **Descriptions**: Uses `typography-paragraphXSmall` for secondary text with reduced opacity

### Color Tokens
- **Background**: `pgBackground-0` as base background
- **Hover States**: `alphaNeutral/10` for subtle hover overlay
- **Text Colors**: `pgText-800` for headlines, `pgText-700` for descriptions
- **Active States**: `alphaNeutral/10` background overlay

### Spacing & Layout
- **Padding**: 
  - `xs`: `px-2 py-[.125rem]` (8px horizontal, 2px vertical)
  - `sm`: `px-3 py-[.625rem]` (12px horizontal, 10px vertical)  
  - `md`: `px-3 py-[.875rem]` (12px horizontal, 14px vertical)
- **Icon Spacing**: `mr-2` (8px) for small sizes, `mr-4` (16px) for medium
- **Border Radius**: `rounded-[.625rem]` (10px) for modern rounded appearance

## Styling

### Variants

#### `basic` (default)
- Standard appearance with `pgBackground-0` background
- Subtle hover state with transparency overlay

#### `avatar`  
- Designed for user profile items
- Same styling as basic variant

#### `leftIcon`
- Transparent background by default
- Optimized for icon-heavy interfaces
- `hover:bg-alphaNeutral/10` on hover

#### `brand`
- Brand-themed styling
- Enhanced visual prominence

### Size Variants

| Size | Padding | Icon Size | Typography |
|------|---------|-----------|------------|
| `xs` | `px-2 py-[.125rem]` | `size-5 text-lg` | `labelSmall` |
| `sm` | `px-3 py-[.625rem]` | `size-5 text-lg` | `labelSmall` |
| `md` | `px-3 py-[.875rem]` | `size-10 text-xl` | `labelMedium` |

### States
- **Hover**: `hover:bg-alphaNeutral/10` background overlay
- **Active**: `bg-alphaNeutral/10` persistent background
- **Expanded**: `bg-alphaNeutral/10` when collapsible content is open
- **Focus**: Inherits browser focus styles

## Responsive Design

The component uses relative units and flexbox for responsive behavior:

```tsx
// Responsive icon layout
<QuickActionItem
  headline="Mobile Optimized"
  icon={<PiGearSix />}
  size="sm" // Smaller on mobile
  className="md:size-md" // Larger on tablet+
/>
```

**Breakpoint Considerations**:
- Icons remain consistent across breakpoints
- Text scales with typography system
- Padding adjusts proportionally
- Touch targets meet accessibility standards on mobile

## Accessibility

### ARIA Support
- Automatically handles `target="_blank"` with `rel="noopener noreferrer"`
- Collapse functionality uses `react-collapsed` with proper ARIA states
- Button and link semantics preserved

### Keyboard Navigation
```tsx
// Fully keyboard accessible
<QuickActionItem
  headline="Keyboard Accessible"
  href="/dashboard"
  showArrow
  // Supports Enter key for activation
  // Tab navigation works automatically
/>
```

### Screen Reader Support
- Semantic HTML structure with proper heading hierarchy
- Icon content should include `aria-label` when meaningful
- Status indicators announce properly

### Best Practices
```tsx
// Good: Descriptive headlines
<QuickActionItem headline="Edit Profile Settings" />

// Good: Meaningful icons with context
<QuickActionItem 
  headline="Notifications" 
  icon={<PiBell aria-label="Notification settings" />}
/>

// Good: Clear status indicators
<QuickActionItem
  headline="System Status"
  status={<span aria-label="3 unread notifications">3</span>}
/>
```

## Dependencies

### Internal Components
- **`CompactButton`**: Used for arrow indicators
- **`Typography`**: Handles text rendering with design system tokens
- **`cn`**: Utility for conditional className merging

### External Libraries
- **`class-variance-authority`**: Powers the variant system
- **`react-collapsed`**: Handles expand/collapse animations
- **`next/link`**: Provides client-side navigation

### Icon System
- **`@/components/icons`**: Requires icon components like `PiArrowRightSLine`
- Icons should be sized appropriately for the chosen size variant

### Related Components
Often used with:
- **Navigation menus**: Sidebar navigation items
- **Action panels**: Quick access dashboards  
- **Settings interfaces**: Configuration options
- **List components**: As interactive list items