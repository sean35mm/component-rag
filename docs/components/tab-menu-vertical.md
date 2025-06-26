# TabMenuVertical Component

## Purpose

The `TabMenuVertical` component provides a vertical navigation menu with tab-like items. It's designed for sidebar navigation or vertical tab interfaces, supporting icons, badges with numbers, and multiple size variants. The component follows our design system's color scheme and typography standards.

## Props Interface

### TabMenuVertical Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | - | Additional CSS classes to apply |
| `children` | `ReactNode` | No | - | Tab menu items (typically `TabMenuVerticalItem` components) |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | No | - | Standard HTML div attributes |

### TabMenuVerticalItem Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `active` | `boolean` | No | `false` | Whether the tab item is currently active |
| `as` | `ElementType` | No | `'button'` | Component type to render (button, link, etc.) |
| `size` | `'md' \| 'lg' \| 'xl'` | No | `'md'` | Size variant of the tab item |
| `leftIcon` | `ReactNode` | No | - | Icon to display on the left side |
| `rightIcon` | `ReactNode` | No | - | Icon to display on the right side |
| `number` | `number` | No | - | Number to display in a badge |
| `className` | `string` | No | - | Additional CSS classes to apply |
| `children` | `ReactNode` | No | - | Tab item content |
| `...rest` | `ComponentPropsWithoutRef<'button'>` | No | - | Standard button attributes |

## Usage Example

```tsx
import { TabMenuVertical, TabMenuVerticalItem } from '@/components/ui/tab-menu-vertical';
import { HomeIcon, SettingsIcon, UserIcon, BellIcon } from 'lucide-react';

function SidebarNavigation() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="w-64 p-4 bg-pgBackground-50 dark:bg-pgBackground-900">
      <TabMenuVertical className="space-y-1">
        <TabMenuVerticalItem
          active={activeTab === 'dashboard'}
          onClick={() => setActiveTab('dashboard')}
          leftIcon={<HomeIcon />}
          size="md"
        >
          Dashboard
        </TabMenuVerticalItem>
        
        <TabMenuVerticalItem
          active={activeTab === 'users'}
          onClick={() => setActiveTab('users')}
          leftIcon={<UserIcon />}
          number={1247}
          size="md"
        >
          Users
        </TabMenuVerticalItem>
        
        <TabMenuVerticalItem
          active={activeTab === 'notifications'}
          onClick={() => setActiveTab('notifications')}
          leftIcon={<BellIcon />}
          number={3}
          size="md"
        >
          Notifications
        </TabMenuVerticalItem>
        
        <TabMenuVerticalItem
          active={activeTab === 'settings'}
          onClick={() => setActiveTab('settings')}
          leftIcon={<SettingsIcon />}
          rightIcon={<ChevronRightIcon />}
          size="lg"
        >
          Settings
        </TabMenuVerticalItem>
      </TabMenuVertical>
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **Medium Size**: `.typography-labelSmall` - Standard tab item text
- **Large Size**: `.typography-labelMedium` - Larger tab item text  
- **Extra Large Size**: `.typography-labelLarge` - Largest tab item text

### Color Tokens
- **Default State**: 
  - Text: `text-pgIcon-600` (icons), default text color (labels)
  - Hover: `hover:bg-alphaNeutral/10`
- **Active State**:
  - Text/Border: `text-pgBlueVSGold`, `border-pgBlueVSGold`
  - Hover: `hover:border-pgBlueVSGold`
- **Badge Colors**:
  - Default: `bg-pgBackground-800/80`, `text-pgText-0`
  - Active: `bg-pgBlueVSGold`, `text-pgText-0`

### Spacing & Layout
- **Container**: `flex flex-col gap-1` (4px gap between items)
- **Item Padding**: 
  - `md`: `p-2.5` (10px all sides)
  - `lg`: `py-2.5` (10px vertical)
  - `xl`: `py-3` (12px vertical)
- **Icon Spacing**: `mr-2` (left), `ml-2` (right/badge) - 8px margins

## Styling

### Size Variants
- **Medium (`md`)**: Default size with `typography-labelSmall` and `p-2.5`
- **Large (`lg`)**: Larger text with `typography-labelMedium`, `py-2.5`, and `text-lg` icons
- **Extra Large (`xl`)**: Largest with `typography-labelLarge`, `py-3`, and `text-xl` icons

### State Variants
- **Default**: Neutral colors with subtle hover effect
- **Active**: Blue/gold accent colors matching brand theme
- **Hover**: Transparent neutral background overlay

### Customization Options
```tsx
// Custom styling
<TabMenuVertical className="bg-pgBackground-100 p-6 rounded-xl">
  <TabMenuVerticalItem 
    className="custom-tab-styles"
    size="xl" 
    active={true}
  >
    Custom Tab
  </TabMenuVerticalItem>
</TabMenuVertical>
```

## Responsive Design

The component is inherently responsive and adapts to container width:

- **Mobile (sm)**: Consider reducing to `size="md"` for compact spacing
- **Tablet (md-lg)**: Default sizing works well
- **Desktop (xl+)**: Can use `size="lg"` or `size="xl"` for better visual hierarchy

```tsx
<TabMenuVerticalItem
  size="md sm:size-md lg:size-lg"
  className="w-full"
>
  Responsive Tab
</TabMenuVerticalItem>
```

## Accessibility

### ARIA Support
- Uses semantic `button` elements by default
- Supports `as` prop for custom elements (e.g., `as={Link}`)
- Inherits all standard button ARIA attributes

### Keyboard Navigation
- Full keyboard navigation support through native button behavior
- Tab order follows DOM structure
- Enter/Space activation

### Screen Reader Support
```tsx
<TabMenuVerticalItem
  active={isActive}
  aria-selected={isActive}
  aria-label="Dashboard navigation"
  role="tab"
>
  Dashboard
</TabMenuVerticalItem>
```

### Focus Management
- Visual focus indicators through browser defaults
- Active state provides clear visual feedback
- Hover states improve interactive feedback

## Dependencies

### Internal Dependencies
- **Badge Component**: Used for number display with `nFormatter` utility
- **CN Utility**: Class name merging utility (`@/lib/utils/cn`)
- **Text Utility**: Number formatting (`@/lib/utils/text`)

### External Dependencies
- **class-variance-authority**: For variant-based styling
- **React**: Core React hooks and components

### Related Components
- `Badge`: Displays formatted numbers
- Other navigation components in the design system
- Icon components (Lucide React, etc.)

### CSS Dependencies
- Design system color variables
- Typography utility classes
- Tailwind CSS utilities