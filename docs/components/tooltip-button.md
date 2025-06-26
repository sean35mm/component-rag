# TooltipButton Component

## Purpose

The `TooltipButton` component is a specialized button that displays a tooltip on hover or focus. It combines an icon with an optional label and provides contextual information through a tooltip. The component supports two visual styles: boxed (elevated card-like appearance) and unboxed (minimal inline style).

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `icon` | `ReactNode` | ✅ | - | The icon element to display in the button |
| `tooltip` | `string` | ✅ | - | The text content to show in the tooltip |
| `label` | `ReactNode` | ❌ | - | Optional text label to display next to the icon |
| `boxed` | `boolean` | ❌ | `false` | Whether to use the elevated boxed style or minimal style |
| `dark` | `boolean` | ❌ | `true` | Whether the tooltip should use dark theme styling |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | ❌ | `'top'` | Position of the tooltip relative to the button |
| `onPointerDownOutside` | `(event: PointerEvent) => void` | ❌ | - | Callback when pointer is pressed outside the tooltip |
| `className` | `string` | ❌ | - | Additional CSS classes to apply to the button |
| ...other | `ButtonHTMLAttributes<HTMLButtonElement>` | ❌ | - | All standard HTML button attributes (except `children`) |

## Usage Example

```tsx
import { TooltipButton } from '@/components/ui/tooltip-button';
import { Heart, Settings, Share2 } from 'lucide-react';

function ToolbarExample() {
  return (
    <div className="flex items-center gap-2 p-4">
      {/* Minimal style tooltip button */}
      <TooltipButton
        icon={<Heart />}
        tooltip="Add to favorites"
        onClick={() => console.log('Favorited')}
      />
      
      {/* Boxed style with label */}
      <TooltipButton
        boxed
        icon={<Settings />}
        label="Settings"
        tooltip="Open application settings"
        side="bottom"
        onClick={() => console.log('Settings opened')}
      />
      
      {/* Light tooltip variant */}
      <TooltipButton
        boxed
        dark={false}
        icon={<Share2 />}
        tooltip="Share this content"
        className="text-pgBlue-600 hover:text-pgBlue-700"
        disabled={false}
      />
    </div>
  );
}
```

## Design System Usage

### Typography
- **Base Text**: `.typography-labelSmall` - Used for the optional label text

### Colors
- **Icon Colors (Default)**: 
  - Normal: `text-pgIcon-600/65` (65% opacity)
  - Hover: `text-pgIcon-600`
  - Disabled: `text-pgIcon-300`
- **Boxed Style Colors**:
  - Background: `bg-pgBackgroundWhiteInvAlpha-800`
  - Border: `border-pgStroke-250`
  - Icon: `text-pgIcon-600/80` → `hover:text-pgIcon-600`

### Spacing & Layout
- **Icon Size**: `[&>svg]:size-[1.375rem]` (22px)
- **Gap**: `gap-2` (8px between icon and label)
- **Padding**:
  - Boxed: `p-2` (8px all around)
  - Minimal: `p-0.5` (2px all around)

### Border Radius
- **Boxed**: `rounded-[0.625rem]` (10px)
- **Minimal**: `rounded-[0.375rem]` (6px)

## Styling

### Variants

#### Boxed Style (`boxed={true}`)
```tsx
<TooltipButton 
  boxed 
  icon={<Icon />} 
  tooltip="Boxed button"
/>
```
- Elevated appearance with background, border, and shadow
- Larger padding and more prominent visual presence
- Uses `bg-pgBackgroundWhiteInvAlpha-800` background
- `border-pgStroke-250` border with `shadow-sm`

#### Minimal Style (`boxed={false}` - default)
```tsx
<TooltipButton 
  icon={<Icon />} 
  tooltip="Minimal button" 
/>
```
- Clean, minimal appearance with transparent background
- Smaller padding for inline usage
- Subtle hover effects

### States

#### Interactive States
- **Normal**: Semi-transparent icon with smooth transitions
- **Hover**: Full opacity icon color
- **Disabled**: 
  - `disabled:pointer-events-none`
  - `disabled:text-pgIcon-300`
  - Tooltip becomes non-interactive

#### Tooltip Positioning
- **Top** (default): `side="top"`
- **Right**: `side="right"`
- **Bottom**: `side="bottom"`
- **Left**: `side="left"`

### Customization
```tsx
<TooltipButton
  boxed
  icon={<CustomIcon />}
  tooltip="Custom styled button"
  className="bg-pgBlue-100 text-pgBlue-700 hover:bg-pgBlue-200 border-pgBlue-300"
/>
```

## Responsive Design

The component uses fixed sizing and doesn't have built-in responsive variants. However, it can be customized for different breakpoints:

```tsx
<TooltipButton
  boxed
  icon={<Icon />}
  tooltip="Responsive button"
  className="p-1.5 md:p-2 [&>svg]:size-5 md:[&>svg]:size-[1.375rem]"
/>
```

For responsive layouts, consider wrapping in responsive containers:

```tsx
<div className="flex flex-col sm:flex-row gap-2">
  <TooltipButton icon={<Icon1 />} tooltip="Action 1" />
  <TooltipButton icon={<Icon2 />} tooltip="Action 2" />
</div>
```

## Accessibility

### ARIA Support
- Inherits ARIA attributes from the underlying `Tooltip` component
- Supports all standard button ARIA attributes
- Tooltip content is properly associated with the trigger button

### Keyboard Navigation
- **Tab**: Navigate to the button
- **Enter/Space**: Activate the button
- **Escape**: Close tooltip (when focused)

### Screen Reader Support
- Button is announced as a clickable element
- Tooltip content is read when button receives focus
- Icon-only buttons are made accessible through tooltip text

### Focus Management
```tsx
<TooltipButton
  icon={<Settings />}
  tooltip="Settings"
  aria-label="Open settings panel"
  onFocus={() => console.log('Button focused')}
/>
```

## Dependencies

### Internal Components
- **`Tooltip`**: Core tooltip functionality and positioning
- **`TooltipContent`**: Styled tooltip content container
- **`TooltipTrigger`**: Trigger wrapper for the button element

### Utilities
- **`cn`**: Utility for conditional className merging
- Uses `@/lib/utils/cn` for className composition

### External Dependencies
- **React**: Uses `forwardRef`, `ButtonHTMLAttributes`, `ReactNode`
- **Radix UI**: Underlying tooltip primitives (via our Tooltip component)

### Related Components
Consider using alongside:
- `Button` - For primary actions that don't need tooltips
- `IconButton` - Alternative icon button without tooltip
- `Dropdown` - For buttons that trigger menu actions
- `Toolbar` - Container for grouping multiple TooltipButtons