# TopStatus Component

## Purpose

The `TopStatus` component is a visual indicator system that displays circular status badges with contextual icons. It provides a consistent way to communicate different states like verification, favorites, pins, additions, removals, and notifications across the application interface.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `'verified' \| 'pin' \| 'favorite' \| 'add' \| 'remove' \| 'notification'` | No | `'verified'` | Determines which icon and styling to display |
| `size` | `'lg' \| 'md' \| 'sm'` | No | `'md'` | Controls the size of the status indicator |
| `className` | `string` | No | - | Additional CSS classes for custom styling |
| `...rest` | `React.HTMLAttributes<HTMLDivElement>` | No | - | Standard HTML div attributes |

## Usage Example

```tsx
import { TopStatus } from '@/components/ui/top-status';

export function StatusIndicators() {
  return (
    <div className="flex items-center gap-3 p-4 bg-pgBackground-50">
      {/* Verified user badge */}
      <TopStatus 
        variant="verified" 
        size="lg" 
        className="hover:scale-110 transition-transform"
      />
      
      {/* Pinned item indicator */}
      <TopStatus 
        variant="pin" 
        size="md"
        onClick={() => console.log('Pin clicked')}
        className="cursor-pointer"
      />
      
      {/* Favorite status */}
      <TopStatus 
        variant="favorite" 
        size="sm"
        className="ml-2"
      />
      
      {/* Interactive notification badge */}
      <div className="relative">
        <TopStatus 
          variant="notification" 
          size="sm"
          className="absolute -top-1 -right-1"
        />
        <button className="p-2 bg-pgNeutral-100 rounded-lg">
          <span className="typography-labelMedium text-pgText-700">
            Messages
          </span>
        </button>
      </div>
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- Component uses `font-size` via Tailwind's text sizing utilities
- No direct typography classes applied (icon-based component)

### Color Tokens Used
- **Background Colors**: `pgBackground-0` (white backgrounds for icon contrasts)
- **State Colors**:
  - `pgStateVerified-base` - Blue verification badges
  - `pgStateFeature-base` - Pin/feature indicators  
  - `pgStateSuccess-base` - Favorite/positive actions
  - `pgStateFaded-base` - Neutral add actions
  - `pgStateError-base` - Remove/negative actions and notifications

### Tailwind Utilities
- `transition-colors` - Smooth color transitions
- `rounded-full` - Circular badge shape
- `[&_svg]:drop-shadow-sm` - Subtle shadow on SVG icons
- `text-[28px]`, `text-lg`, `text-sm` - Icon sizing

## Styling

### Available Variants

| Variant | Visual | Use Case | Color Scheme |
|---------|--------|----------|--------------|
| `verified` | Blue checkmark badge | User verification, certified content | pgStateVerified-base |
| `pin` | Orange pin icon | Pinned items, featured content | pgStateFeature-base |
| `favorite` | Green star | Favorited items, liked content | pgStateSuccess-base |
| `add` | Gray plus icon | Add to collection, new items | pgStateFaded-base |
| `remove` | Red X icon | Delete, remove actions | pgStateError-base |
| `notification` | Red dot | Unread notifications, alerts | pgStateError-base |

### Size Options

| Size | Text Size | Use Case |
|------|-----------|----------|
| `lg` | `text-[28px]` (28px) | Primary status indicators, hero sections |
| `md` | `text-lg` (18px) | Standard list items, cards |
| `sm` | `text-sm` (14px) | Compact layouts, notification badges |

### Customization

```tsx
// Custom styling with design system tokens
<TopStatus 
  variant="verified"
  size="lg"
  className={cn(
    "hover:bg-pgNeutral-50/50 p-1 rounded-full",
    "ring-2 ring-pgStateVerified-light/20",
    "transition-all duration-200"
  )}
/>

// Dark mode considerations
<TopStatus 
  variant="pin"
  className="dark:drop-shadow-lg" // Enhanced shadow in dark mode
/>
```

## Responsive Design

The component adapts across breakpoints through size variants:

```tsx
// Responsive sizing
<TopStatus 
  variant="favorite"
  size="sm"
  className="md:text-lg lg:text-[28px]" // sm -> md -> lg sizes
/>

// Responsive positioning for notification badges
<TopStatus 
  variant="notification"
  className={cn(
    "absolute -top-1 -right-1", // Mobile
    "md:-top-2 md:-right-2",    // Tablet+
    "lg:text-[16px]"            // Desktop specific sizing
  )}
/>
```

## Accessibility

### Current Implementation
- Uses semantic SVG icons with proper viewBox dimensions
- Inherits color contrast from design system state colors
- Supports keyboard navigation through standard div attributes

### Recommended Enhancements

```tsx
// Enhanced accessibility
<TopStatus 
  variant="verified"
  role="img"
  aria-label="Verified user"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      // Handle interaction
    }
  }}
/>

// For interactive status indicators
<TopStatus 
  variant="notification"
  role="button"
  aria-label="3 unread notifications"
  aria-describedby="notification-count"
/>
```

### ARIA Considerations
- Add `role="img"` and `aria-label` for screen readers
- Use `aria-describedby` to link to additional context
- Consider `aria-live` regions for dynamic status updates
- Ensure sufficient color contrast (already handled by state colors)

## Dependencies

### Internal Dependencies
- `@/lib/utils/cn` - Utility for conditional className merging
- `class-variance-authority` - Variant management system

### Design System Integration
- Inherits from global CSS variables for color consistency
- Compatible with dark mode through CSS variable system
- Uses standard Tailwind spacing and sizing utilities

### Related Components
Consider using alongside:
- Badge components for text-based status
- Button components for interactive states
- Tooltip components for additional context
- Avatar components (common pairing with verification)

### Usage with Other UI Elements

```tsx
// Common patterns
import { TopStatus } from '@/components/ui/top-status';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

// User profile with verification
<div className="relative inline-block">
  <Avatar src="/user.jpg" size="lg" />
  <TopStatus 
    variant="verified" 
    size="sm"
    className="absolute -bottom-1 -right-1"
  />
</div>
```