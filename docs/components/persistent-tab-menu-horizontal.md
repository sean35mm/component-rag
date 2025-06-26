# TabMenuHorizontal Component

## Purpose

The `TabMenuHorizontal` component provides a persistent horizontal tab navigation system that synchronizes with URL search parameters. It features automatic state persistence across page refreshes, smooth transitions, customizable sizing, and support for icons, badges, and loading states. The component is built for responsive design with horizontal scrolling on smaller screens.

## Props Interface

### TabMenuHorizontalProps

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `defaultValue` | `string` | Yes | - | The default tab value to display when no URL parameter is present |
| `searchParam` | `string` | No | `"tab"` | The URL search parameter name used for persistence |
| `className` | `string` | No | - | Additional CSS classes to apply to the container |
| `children` | `ReactNode` | No | - | Tab items to render within the menu |

### TabMenuHorizontalItemProps

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `value` | `string` | Yes | - | Unique identifier for the tab item |
| `children` | `ReactNode` | No | - | Tab label content |
| `size` | `'md' \| 'lg' \| 'xl'` | No | `'md'` | Size variant affecting padding and icon sizing |
| `leftIcon` | `ReactNode` | No | - | Icon element to display before the label |
| `rightIcon` | `ReactNode` | No | - | Icon element to display after the label (exclusive with number) |
| `number` | `number` | No | - | Numeric value to display as a badge (exclusive with rightIcon) |
| `isLoading` | `boolean` | No | `false` | Shows skeleton loader for the number badge |
| `className` | `string` | No | - | Additional CSS classes for the tab item |

## Usage Example

```tsx
import { TabMenuHorizontal, TabMenuHorizontalItem } from '@/components/ui/persistent-tab-menu-horizontal';
import { UserIcon, SettingsIcon, BellIcon } from '@/components/icons';

function ProjectTabs() {
  return (
    <TabMenuHorizontal 
      defaultValue="overview" 
      searchParam="section"
      className="bg-pgBackground-50"
    >
      <TabMenuHorizontalItem 
        value="overview" 
        leftIcon={<UserIcon />}
        size="lg"
      >
        Overview
      </TabMenuHorizontalItem>
      
      <TabMenuHorizontalItem 
        value="members" 
        leftIcon={<UserIcon />}
        number={24}
        size="lg"
      >
        Team Members
      </TabMenuHorizontalItem>
      
      <TabMenuHorizontalItem 
        value="settings" 
        leftIcon={<SettingsIcon />}
        rightIcon={<BellIcon />}
        size="lg"
      >
        Settings
      </TabMenuHorizontalItem>
      
      <TabMenuHorizontalItem 
        value="analytics" 
        number={1250}
        isLoading={false}
        size="lg"
      >
        Analytics
      </TabMenuHorizontalItem>
    </TabMenuHorizontal>
  );
}
```

## Design System Usage

### Typography Classes
- **Medium Size**: `.typography-labelSmall` - Used for `md` size tabs
- **Large Size**: `.typography-labelMedium` - Used for `lg` size tabs  
- **Extra Large**: `.typography-labelLarge` - Used for `xl` size tabs

### Color Tokens
- **Default Text**: `pgText-950/80` - Inactive tab text with 80% opacity
- **Active State**: `pgBlueVSGold` - Active tab text and border color
- **Icon Colors**: `pgIcon-600` - Default icon color, transitions to active color
- **Border Colors**: 
  - Default: `border-transparent`
  - Hover: `pgBackground-950/25` 
  - Active: `pgBlueVSGold`
- **Container Border**: `pgStroke-200` - Bottom border of tab container
- **Badge Colors**: Inherits from Badge component with hover states

### Tailwind Utilities
- **Layout**: `flex`, `items-center`, `gap-*`, `py-*`
- **Responsive**: `overflow-x-auto`, `scrollbar-hide`
- **Transitions**: `transition-colors`
- **Typography**: `whitespace-nowrap`, `truncate`
- **Borders**: `border-b-2`, `border-transparent`

## Styling

### Size Variants

| Size | Padding | Gap | Icon Size | Typography |
|------|---------|-----|-----------|------------|
| `md` | `py-2` | `gap-1.5` | `size-4` | `labelSmall` |
| `lg` | `py-3` | `gap-1.5` | `size-5` | `labelMedium` |
| `xl` | `py-3` | `gap-2` | `size-5` | `labelLarge` |

### States

#### Active State
```css
.tab-active {
  @apply border-pgBlueVSGold text-pgBlueVSGold hover:border-pgBlueVSGold;
}
```

#### Hover State
```css
.tab-hover {
  @apply hover:border-pgBackground-950/25;
}
```

#### Loading State
- Number badges show skeleton loader: `h-[1.375rem] w-12 rounded-3xl`

### Customization Options

```tsx
// Custom styling with design system tokens
<TabMenuHorizontal 
  className="bg-pgBackground-100 border-pgStroke-300"
  defaultValue="tab1"
>
  <TabMenuHorizontalItem 
    value="tab1"
    className="hover:bg-pgBackground-200/50"
    size="xl"
  >
    Custom Tab
  </TabMenuHorizontalItem>
</TabMenuHorizontal>
```

## Responsive Design

### Breakpoint Behavior
- **All Sizes**: Horizontal scrolling with `overflow-x-auto` and `scrollbar-hide`
- **Small Screens** (`< 640px`): Tabs scroll horizontally, maintaining full functionality
- **Medium+ Screens** (`≥ 768px`): Natural horizontal layout with gap spacing
- **Container**: `px-4` padding maintained across all breakpoints

### Mobile Optimization
```css
/* Applied automatically */
.tab-container {
  @apply overflow-x-auto scrollbar-hide;
}

.tab-item {
  @apply whitespace-nowrap; /* Prevents text wrapping */
}
```

## Accessibility

### ARIA Implementation
- **State Indication**: `data-state="active|inactive"` for screen readers
- **Semantic Navigation**: Uses `NextLink` for proper anchor semantics
- **Focus Management**: Native browser focus handling with keyboard navigation

### Keyboard Navigation
- **Tab Key**: Navigate between tab items
- **Enter/Space**: Activate focused tab
- **Arrow Keys**: Browser default navigation

### Screen Reader Support
```tsx
// Enhanced accessibility example
<TabMenuHorizontalItem 
  value="notifications"
  leftIcon={<BellIcon />}
  number={5}
  aria-label="Notifications, 5 unread"
>
  Notifications
</TabMenuHorizontalItem>
```

## Dependencies

### Internal Components
- **Badge**: `./badge` - For number display with design system styling
- **Skeleton**: `./skeleton` - Loading states for number badges  
- **Typography**: `./typography` - Consistent text rendering with design system variants

### Utilities
- **cn**: `@/lib/utils/cn` - Class name merging utility
- **nFormatter**: `@/lib/utils/text` - Number formatting (1.2k, 24M, etc.)
- **cva**: `class-variance-authority` - Variant management
- **tabs-common**: `./tabs-common` - Shared tab logic and URL persistence

### External Dependencies
- **Next.js**: `NextLink` for client-side routing with shallow updates
- **React**: `forwardRef`, `HTMLAttributes` for proper component composition

### Context System
```tsx
// Automatically manages state through URL persistence
const { selected, hrefFor } = useUrlPersistence(defaultValue, searchParam);
```