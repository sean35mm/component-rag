# AiTag Component

## Purpose

The `AiTag` component is a visual indicator that identifies AI-generated content within the application. It displays a compact badge with an AI icon and label, complemented by an informative tooltip that explains the nature of AI-generated content and encourages users to verify important details.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | - | Additional CSS classes to apply to the component |
| `align` | `TooltipContentProps['align']` | No | - | Horizontal alignment of the tooltip relative to the trigger |
| `side` | `TooltipContentProps['side']` | No | `'right'` | Position of the tooltip relative to the trigger (top, right, bottom, left) |
| `...props` | `HTMLAttributes<HTMLDivElement>` | No | - | Additional HTML div attributes (excluding `children` and `color`) |

## Usage Example

```tsx
import { AiTag } from '@/components/ui/ai-tag';

// Basic usage
export function ContentCard() {
  return (
    <div className="p-4 border border-pgStroke-200 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="typography-titleH4">Article Title</h3>
        <AiTag />
      </div>
      <p className="typography-paragraphMedium text-pgText-700">
        This content was generated using AI...
      </p>
    </div>
  );
}

// With custom positioning
export function CustomPositionExample() {
  return (
    <div className="flex items-center gap-2">
      <span className="typography-labelMedium">Content Summary</span>
      <AiTag side="top" align="center" />
    </div>
  );
}

// With additional styling
export function StyledExample() {
  return (
    <div className="inline-flex items-center gap-2">
      <span>Generated Content</span>
      <AiTag className="ml-auto" side="left" />
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **Primary Text**: `.typography-subheading3XSmall` - Used for the "AI" label text
- **Tooltip Heading**: `.typography-subheadingXSmall` - Used for tooltip title
- **Tooltip Body**: `.typography-paragraphXSmall` - Used for tooltip description

### Color Tokens
- **Background**: `bg-pgBackgroundPurpleTint` - Purple-tinted background for the tag
- **Text Colors**:
  - `text-pgStateFeature-dark` - Dark feature color for the "AI" text
  - `text-pgStateFeature-base` - Base feature color for the shining icon
- **Tooltip Text Colors**:
  - `color='800'` - High contrast color for tooltip heading
  - `color='700'` - Medium contrast color for tooltip description

### Tailwind Utilities
- **Layout**: `inline-flex`, `shrink-0`, `items-center`, `justify-center`
- **Spacing**: `py-[0.20rem]`, `pl-[0.25rem]`, `pr-[0.375rem]`, `mr-1`
- **Sizing**: `size-2`, `max-w-[200px]`
- **Border Radius**: `rounded-[0.25rem]`
- **Cursor**: `cursor-pointer`
- **User Selection**: `select-none`

## Styling

### Available Customization Options

The component accepts custom styling through the `className` prop:

```tsx
// Custom spacing
<AiTag className="ml-2 mt-1" />

// Custom hover effects
<AiTag className="hover:bg-pgBackgroundPurpleTint/80 transition-colors" />

// Custom positioning in flex layouts
<AiTag className="ml-auto" />
```

### Visual States
- **Default**: Purple-tinted background with feature colors
- **Hover**: Inherits cursor pointer for interactive feel
- **Focus**: Tooltip trigger provides keyboard accessibility

## Responsive Design

The component is designed to be compact and adaptable:

```tsx
// Responsive visibility
<AiTag className="hidden sm:inline-flex" />

// Responsive positioning
<AiTag 
  className="sm:ml-2 md:ml-4" 
  side="bottom" // Better for mobile
/>
```

The tooltip automatically adjusts its position based on viewport constraints, ensuring it remains visible across all breakpoints.

## Accessibility

### ARIA Features
- **Tooltip Trigger**: Properly associated with tooltip content via ARIA attributes
- **Keyboard Navigation**: Focusable and keyboard accessible through tooltip implementation
- **Screen Reader Support**: Descriptive tooltip content provides context for assistive technologies

### Semantic Structure
```tsx
// The component structure provides clear semantic meaning
<div role="button" aria-describedby="ai-tooltip">
  <Icon aria-hidden="true" />
  AI
</div>
```

### Color Contrast
- Uses high-contrast color combinations from the design system
- Feature colors ensure visibility in both light and dark modes

## Dependencies

### Internal Components
- **`Typography`** - Provides consistent text styling and semantic HTML structure
- **`Tooltip`**, **`TooltipContent`**, **`TooltipProvider`**, **`TooltipTrigger`** - Complete tooltip implementation
- **`PiShiningFill`** - Shining icon from the icon system

### Utilities
- **`cn`** - Class name utility for conditional styling

### Design System Integration
- Fully integrated with the color system CSS variables
- Uses typography scale for consistent text sizing
- Leverages spacing and sizing tokens from Tailwind configuration

The component is designed to work seamlessly within the broader design system while maintaining its specific purpose as an AI content identifier.