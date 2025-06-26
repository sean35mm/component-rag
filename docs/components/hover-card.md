# HoverCard Component

## Purpose

The HoverCard component provides a hover-triggered popover interface built on Radix UI's HoverCard primitive. It creates an accessible tooltip-like experience that displays rich content when users hover over a trigger element, perfect for showing additional information, user profiles, or contextual actions without requiring a click interaction.

## Props Interface

### HoverCard (Root)
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `openDelay` | `number` | No | `700` | Delay in milliseconds before hover card opens |
| `closeDelay` | `number` | No | `300` | Delay in milliseconds before hover card closes |
| `open` | `boolean` | No | - | Controlled open state |
| `defaultOpen` | `boolean` | No | `false` | Default open state for uncontrolled usage |
| `onOpenChange` | `(open: boolean) => void` | No | - | Callback when open state changes |

### HoverCardTrigger
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `asChild` | `boolean` | No | `false` | Render as child element instead of button |
| `children` | `React.ReactNode` | Yes | - | Trigger element content |

### HoverCardContent
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | - | Additional CSS classes |
| `sideOffset` | `number` | No | `4` | Distance from trigger element |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | No | `'bottom'` | Preferred side for positioning |
| `align` | `'start' \| 'center' \| 'end'` | No | `'center'` | Alignment relative to trigger |
| `children` | `React.ReactNode` | Yes | - | Content to display in hover card |

### HoverCardItem
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | - | Additional CSS classes |
| `onClick` | `() => void` | No | - | Click handler for interactive items |
| `children` | `React.ReactNode` | Yes | - | Item content |

## Usage Example

```tsx
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  HoverCardItem
} from '@/components/ui/hover-card';

// Basic user profile hover card
function UserProfileHover({ username, avatar, bio }) {
  return (
    <HoverCard openDelay={500} closeDelay={200}>
      <HoverCardTrigger asChild>
        <button className="typography-paragraphMedium text-pgBlue-600 hover:text-pgBlue-700 underline">
          @{username}
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-4">
        <div className="flex items-start space-x-3">
          <img 
            src={avatar} 
            alt={username}
            className="w-12 h-12 rounded-full bg-pgNeutral-200"
          />
          <div className="flex-1 space-y-2">
            <h4 className="typography-labelLarge text-pgText-900">
              {username}
            </h4>
            <p className="typography-paragraphSmall text-pgText-700">
              {bio}
            </p>
            <div className="flex space-x-2">
              <button className="typography-labelSmall px-3 py-1 bg-pgBlue-600 text-white rounded-lg hover:bg-pgBlue-700">
                Follow
              </button>
              <button className="typography-labelSmall px-3 py-1 border border-pgStroke-300 text-pgText-700 rounded-lg hover:bg-pgNeutral-50">
                Message
              </button>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

// Action menu hover card
function ActionMenu({ title, actions }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="typography-paragraphMedium p-2 rounded-lg hover:bg-pgNeutral-100 text-pgText-800">
          {title}
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-48">
        {actions.map((action, index) => (
          <HoverCardItem
            key={index}
            onClick={action.onClick}
            className="text-pgText-800 hover:text-pgText-900"
          >
            <span className="text-pgNeutral-600">{action.icon}</span>
            {action.label}
          </HoverCardItem>
        ))}
      </HoverCardContent>
    </HoverCard>
  );
}

// Quick info hover card
function InfoHover({ term, definition, learnMoreUrl }) {
  return (
    <HoverCard openDelay={300}>
      <HoverCardTrigger asChild>
        <span className="typography-paragraphMedium border-b border-dashed border-pgNeutral-400 cursor-help text-pgText-800">
          {term}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="max-w-sm p-4">
        <div className="space-y-3">
          <h4 className="typography-labelMedium text-pgText-900">
            {term}
          </h4>
          <p className="typography-paragraphSmall text-pgText-700 leading-relaxed">
            {definition}
          </p>
          {learnMoreUrl && (
            <a 
              href={learnMoreUrl}
              className="typography-labelSmall text-pgBlue-600 hover:text-pgBlue-700 inline-flex items-center"
            >
              Learn more →
            </a>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
```

## Design System Usage

### Typography Classes Used
- **HoverCardItem**: `.typography-paragraphSmall` for consistent item text sizing
- **Recommended Content Typography**:
  - `.typography-labelLarge` or `.typography-labelMedium` for titles
  - `.typography-paragraphSmall` for body text
  - `.typography-labelSmall` for action buttons
  - `.typography-subheadingSmall` for section headers

### Color Tokens Applied
- **Background**: `bg-pgBackground-0` (adaptive white/dark background)
- **Item Hover**: `hover:bg-alphaNeutral/10` (subtle hover state)
- **Shadows**: `shadow-tooltip` (custom shadow for floating elements)
- **Text Colors**: `text-pgText-[weight]` for content hierarchy
- **Border Colors**: `border-pgStroke-[weight]` for subtle divisions

### Key Tailwind Utilities
- **Layout**: `min-w-[8rem]`, `w-full`, `flex`, `items-center`, `gap-3`
- **Spacing**: `p-2`, `gap-2` (responsive gap adjustment)
- **Borders**: `rounded-xl` (content), `rounded-lg` (items)
- **Positioning**: `z-50`, `relative`
- **Interactions**: `cursor-pointer`, `select-none`, `outline-none`

## Styling

### Content Variants
```tsx
// Compact hover card
<HoverCardContent className="min-w-0 w-auto p-2">
  <HoverCardItem>Quick action</HoverCardItem>
</HoverCardContent>

// Wide information card
<HoverCardContent className="w-96 p-6 space-y-4">
  <div className="typography-labelLarge text-pgText-900">Title</div>
  <div className="typography-paragraphSmall text-pgText-700">Content</div>
</HoverCardContent>

// Status-aware styling
<HoverCardContent className="border-l-4 border-pgStateSuccess-base bg-pgStateSuccess-lighter/20">
  <div className="text-pgStateSuccess-dark">Success content</div>
</HoverCardContent>
```

### Item State Variations
```tsx
// Destructive action
<HoverCardItem className="text-pgStateError-base hover:bg-pgStateError-lighter hover:text-pgStateError-dark">
  Delete item
</HoverCardItem>

// Disabled state
<HoverCardItem className="text-pgNeutral-400 cursor-not-allowed hover:bg-transparent">
  Unavailable action
</HoverCardItem>

// Featured action
<HoverCardItem className="bg-pgBlue-50 text-pgBlue-700 hover:bg-pgBlue-100">
  Premium feature
</HoverCardItem>
```

## Responsive Design

The HoverCard adapts across breakpoints:

```tsx
<HoverCardContent className="
  w-72 sm:w-80 md:w-96 
  p-3 sm:p-4 md:p-6
  max-w-[calc(100vw-2rem)] sm:max-w-none
">
  <HoverCardItem className="gap-2 lg:gap-3 p-2 sm:p-3">
    Content that adjusts spacing
  </HoverCardItem>
</HoverCardContent>
```

**Breakpoint Behavior:**
- **Mobile (< 640px)**: Constrained width, reduced padding
- **Tablet (640px+)**: Standard spacing, optimal width
- **Desktop (1024px+)**: Enhanced spacing (`gap-3` vs `gap-2`)

## Accessibility

### Built-in Features (via Radix UI)
- **ARIA Attributes**: Automatically managed `aria-expanded`, `aria-describedby`
- **Focus Management**: Proper focus handling on show/hide
- **Keyboard Navigation**: Supports `Escape` key to close
- **Screen Reader Support**: Announces content changes appropriately

### Implementation Guidelines
```tsx
// Descriptive trigger text
<HoverCardTrigger aria-label="View user profile for John Doe">
  @johndoe
</HoverCardTrigger>

// Semantic content structure
<HoverCardContent>
  <div role="region" aria-label="User profile information">
    <h3 className="typography-labelLarge">Profile</h3>
    <p className="typography-paragraphSmall">Bio content</p>
  </div>
</HoverCardContent>

// Interactive items with clear labels
<HoverCardItem aria-label="Follow this user">
  <FollowIcon aria-hidden="true" />
  Follow
</HoverCardItem>
```

### Best Practices
- Ensure hover cards don't contain critical information only available on hover
- Provide keyboard alternatives for hover-only interactions
- Use appropriate ARIA labels for complex content
- Test with screen readers for content announcement

## Dependencies

### Internal Dependencies
- **Utilities**: `@/lib/utils/cn` - Class name utility for conditional styling
- **Design System**: Inherits all color tokens, typography classes, and spacing from globals.css

### External Dependencies
- **@radix-ui/react-hover-card**: Provides accessible hover card primitives
- **React**: `forwardRef`, `ComponentPropsWithoutRef`, `ElementRef`

### Related Components
- **Tooltip**: For simpler hover information
- **Popover**: For click-triggered content
- **DropdownMenu**: For action-focused hover interactions
- **Card**: For static content layout patterns