# TabMenuHorizontal Component

## Purpose

The `TabMenuHorizontal` component provides a horizontal tab navigation interface with support for icons, badges, and loading states. It consists of two main parts: the container (`TabMenuHorizontal`) and individual tab items (`TabMenuHorizontalItem`). The component follows our design system's color scheme, typography scale, and responsive design principles.

## Props Interface

### TabMenuHorizontalProps

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | - | Additional CSS classes for styling customization |
| `children` | `ReactNode` | No | - | Tab items to be rendered inside the container |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | No | - | Standard HTML div attributes |

### TabMenuHorizontalItemProps

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `size` | `'md' \| 'lg' \| 'xl'` | No | `'md'` | Controls the size and spacing of the tab item |
| `active` | `boolean` | No | `false` | Indicates if the tab is currently active/selected |
| `leftIcon` | `ReactNode` | No | - | Icon to display on the left side of the tab label |
| `rightIcon` | `ReactNode` | No | - | Icon to display on the right side of the tab label |
| `number` | `number` | No | - | Numeric value to display as a badge (conflicts with rightIcon) |
| `isLoading` | `boolean` | No | `false` | Shows a skeleton loader for the number badge |
| `children` | `ReactNode` | No | - | The text content of the tab |
| `className` | `string` | No | - | Additional CSS classes for styling customization |
| `...rest` | `ButtonHTMLAttributes<HTMLButtonElement>` | No | - | Standard HTML button attributes |

## Usage Example

```tsx
import { TabMenuHorizontal, TabMenuHorizontalItem } from '@/components/ui/tab-menu-horizontal';
import { HomeIcon, UserIcon, SettingsIcon } from 'lucide-react';

function NavigationTabs() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <TabMenuHorizontal className="bg-pgBackground-0">
      <TabMenuHorizontalItem
        size="lg"
        active={activeTab === 'home'}
        leftIcon={<HomeIcon />}
        onClick={() => setActiveTab('home')}
      >
        Home
      </TabMenuHorizontalItem>
      
      <TabMenuHorizontalItem
        size="lg"
        active={activeTab === 'profile'}
        leftIcon={<UserIcon />}
        number={12}
        onClick={() => setActiveTab('profile')}
      >
        Profile
      </TabMenuHorizontalItem>
      
      <TabMenuHorizontalItem
        size="lg"
        active={activeTab === 'settings'}
        leftIcon={<SettingsIcon />}
        isLoading={true}
        number={0}
        onClick={() => setActiveTab('settings')}
      >
        Settings
      </TabMenuHorizontalItem>
    </TabMenuHorizontal>
  );
}
```

## Design System Usage

### Typography Classes
- **Medium Size**: `.typography-labelSmall` for tab labels
- **Large Size**: `.typography-labelMedium` for tab labels  
- **Extra Large Size**: `.typography-labelLarge` for tab labels

### Color Tokens
- **Default Text**: `text-pgText-950/80` with 80% opacity
- **Active State**: `text-pgBlueVSGold` for selected tabs
- **Border Colors**: 
  - Default: `border-transparent`
  - Hover: `hover:border-pgBackground-950/25`
  - Active: `border-pgBlueVSGold`
- **Container Border**: `border-pgStroke-200`
- **Icon Colors**: 
  - Default: `text-pgIcon-600`
  - Active: `text-pgBlueVSGold`
- **Badge Colors**: `bg-pgBlueVSGold` for active state

### Spacing and Layout
- **Container**: `gap-8` between tabs, `px-4` horizontal padding
- **Medium Size**: `gap-1.5 py-2`
- **Large Size**: `gap-1.5 py-3` 
- **Extra Large Size**: `gap-2 py-3`

## Styling

### Size Variants
- **`md`**: Default size with 16px icons and small labels
- **`lg`**: Larger size with 20px icons and medium labels
- **`xl`**: Largest size with 20px icons and large labels

### State Variants
- **Default**: Semi-transparent text with transparent border
- **Hover**: Enhanced border visibility with `border-pgBackground-950/25`
- **Active**: Blue/gold brand color with `pgBlueVSGold` token

### Icon Sizing
- **Medium**: `[&>svg]:size-4` (16px)
- **Large**: `[&>svg]:size-5` (20px)
- **Extra Large**: `[&>svg]:size-5` (20px)

### Badge Integration
Uses the `Badge` component with:
- **Default**: `color="gray"`, `variant="light"`
- **Active**: Custom styling with `bg-pgBlueVSGold`
- **Loading**: Skeleton with `h-[1.375rem] w-12 rounded-3xl`

## Responsive Design

The component includes responsive features:
- **Horizontal Scrolling**: `overflow-x-auto` with `scrollbar-hide` for mobile devices
- **Flexible Layout**: Flexbox layout adapts to content width
- **Touch-Friendly**: Adequate padding for touch targets across all breakpoints

Works seamlessly across all breakpoints:
- **sm (640px+)**: Base functionality
- **md (768px+)**: Improved spacing
- **lg (1024px+)**: Full desktop experience
- **xl (1280px+)**: Enhanced spacing
- **2xl (1440px+)**: Maximum visual hierarchy

## Accessibility

### Keyboard Navigation
- Full keyboard support through native `<button>` elements
- Tab navigation follows standard web conventions
- Enter/Space key activation

### Screen Reader Support
- Semantic `<button>` elements provide proper role information
- Text content is properly exposed to assistive technologies
- Active state communicated through styling (consider adding `aria-selected`)

### Recommended ARIA Enhancements
```tsx
<TabMenuHorizontalItem
  role="tab"
  aria-selected={active}
  aria-controls="panel-id"
  active={active}
>
  Tab Label
</TabMenuHorizontalItem>
```

### Visual Accessibility
- High contrast ratios with design system colors
- Clear focus states through browser defaults
- Adequate spacing for touch targets (44px minimum)

## Dependencies

### Internal Components
- **`Badge`**: For displaying numeric indicators
- **`Skeleton`**: For loading states on number badges
- **`Typography`**: For consistent text rendering and responsive typography

### Utilities
- **`cn`**: Class name utility for conditional styling
- **`nFormatter`**: Text utility for formatting large numbers (1k, 1M, etc.)
- **`cva`**: Class variance authority for variant management

### External Dependencies
- **`class-variance-authority`**: Type-safe variant system
- **`React`**: Core React functionality with forwardRef support

### Related Design System Components
Consider using alongside:
- **Button components** for primary actions
- **Navigation components** for breadcrumbs
- **Card components** for tab panel content
- **Loading states** with Skeleton components