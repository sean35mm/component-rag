# Tag Component

## Purpose

The Tag component is a versatile UI element designed to display labels, categories, or status indicators. It supports both clickable and non-clickable states, making it suitable for filters, badges, chips, and interactive elements. The component follows our design system's color palette and typography scales, with built-in support for active/inactive states and hover interactions.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `active` | `boolean` | No | `false` | Determines if the tag is in an active/selected state |
| `clickable` | `boolean` | No | `true` | Enables cursor pointer and hover interactions |
| `size` | `'sm' \| 'md' \| 'lg'` | No | `'md'` | Controls the tag size and typography scale |
| `variant` | `'stroke' \| 'gray'` | No | `'stroke'` | Visual style variant of the tag |
| `asChild` | `boolean` | No | `false` | Renders as child component using Radix Slot |
| `className` | `string` | No | - | Additional CSS classes for customization |
| ...rest | `ButtonHTMLAttributes<HTMLButtonElement>` | No | - | All standard button HTML attributes |

## Usage Example

```tsx
import { Tag } from '@/components/ui/tag';

export function TagExamples() {
  return (
    <div className="flex flex-wrap gap-2">
      {/* Basic usage */}
      <Tag>Design System</Tag>
      
      {/* Active state tag */}
      <Tag active variant="gray">
        Selected
      </Tag>
      
      {/* Different sizes */}
      <Tag size="sm">Small Tag</Tag>
      <Tag size="md">Medium Tag</Tag>
      <Tag size="lg">Large Tag</Tag>
      
      {/* Non-clickable tag */}
      <Tag clickable={false} variant="gray">
        Read Only
      </Tag>
      
      {/* Custom styling with design tokens */}
      <Tag 
        variant="stroke" 
        className="border-pgBlue-500 text-pgBlue-700 hover:bg-pgBlue-50"
      >
        Custom Blue
      </Tag>
      
      {/* As a link using asChild */}
      <Tag asChild variant="gray">
        <a href="/category">Link Tag</a>
      </Tag>
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **Small**: `.typography-subheading4XSmall` - Ultra-compact text for minimal tags
- **Medium**: `.typography-labelXSmall` - Standard tag text size
- **Large**: `.typography-labelSmall` - Larger, more prominent tags

### Color Tokens
- **Background Colors**: 
  - `pgBackground-0` (light background)
  - `pgBackground-50` (disabled state)
  - `pgBackground-100` (hover state)
  - `pgBackground-950` (active dark background)
- **Text Colors**:
  - `pgText-0` (white text for dark backgrounds)
  - `pgText-300` (disabled text)
  - `pgText-700` (secondary text)
  - `pgText-950` (primary dark text)
- **Border Colors**:
  - `pgStroke-200` (default border)
  - `pgStroke-950` (active border)
- **Alpha Colors**:
  - `alphaNeutral/12` (subtle gray background)
  - `alphaNeutral/24` (hover gray background)

### Tailwind Utilities
- **Layout**: `inline-flex items-center justify-center`
- **Spacing**: `p-1`, `px-2.5 py-1.5`
- **Border**: `rounded-md border`
- **Transitions**: `transition-all`
- **Interactive**: `cursor-pointer hover:*`

## Styling

### Variants

#### Stroke Variant (`variant="stroke"`)
- Default outlined appearance with border
- Light background (`pgBackground-0`) with stroke border (`pgStroke-200`)
- Active state: Dark border (`pgStroke-950`) and text (`pgText-950`)
- Hover: Light background fill (`pgBackground-100`)

#### Gray Variant (`variant="gray"`)
- Filled appearance with subtle background
- Uses alpha neutral background (`alphaNeutral/12`)
- Active state: Dark background (`pgBackground-950`) with white text
- Hover: Darker background (`alphaNeutral/24`)

### Sizes

| Size | Typography Class | Padding | Text Size |
|------|------------------|---------|-----------|
| `sm` | `.typography-subheading4XSmall` | `p-1` | Minimal |
| `md` | `.typography-labelXSmall` | `p-1` | `text-xs` |
| `lg` | `.typography-labelSmall` | `px-2.5 py-1.5` | `text-sm` |

### States

- **Default**: Inactive, clickable state
- **Active**: Selected/pressed appearance with darker colors
- **Disabled**: Reduced opacity, no pointer events, neutral colors
- **Hover**: Enhanced background/border colors (when clickable)

## Responsive Design

The Tag component maintains consistent sizing across all breakpoints. For responsive tag layouts, combine with Tailwind responsive utilities:

```tsx
<div className="flex flex-wrap gap-1 sm:gap-2 md:gap-3">
  <Tag size="sm" className="sm:hidden">Mobile</Tag>
  <Tag size="md" className="hidden sm:inline-flex lg:hidden">Tablet</Tag>
  <Tag size="lg" className="hidden lg:inline-flex">Desktop</Tag>
</div>
```

## Accessibility

### Built-in Features
- Semantic HTML structure using `span` or `button` elements
- Proper focus management with visible focus states
- Disabled state handling with `pointer-events-none`
- Color contrast compliance with design system tokens

### Recommendations
- Add `aria-pressed` for toggle-like tags:
  ```tsx
  <Tag active={isSelected} aria-pressed={isSelected}>
    Filter
  </Tag>
  ```
- Use `role="button"` for non-button clickable tags:
  ```tsx
  <Tag asChild role="button" tabIndex={0}>
    <div>Custom Tag</div>
  </Tag>
  ```
- Provide `aria-label` for icon-only tags:
  ```tsx
  <Tag aria-label="Close filter">×</Tag>
  ```

## Dependencies

### Internal Dependencies
- `@/lib/utils/cn` - Class name utility for merging Tailwind classes
- Design system color tokens and typography classes from `globals.css`

### External Dependencies
- `@radix-ui/react-slot` - Composition utility for `asChild` prop
- `class-variance-authority` - Type-safe variant API
- `React` - Core React functionality with `forwardRef`

### Related Components
- Works well with Badge, Button, and Filter components
- Can be used within Card, Popover, and Dialog components
- Compatible with form elements for selection interfaces