# SearchFilterTagBase Component

## Purpose
A foundational tag component designed for search filter interfaces. It provides a compact, rounded container for displaying filter values or categories with consistent typography and visual styling. The component supports polymorphic rendering through Radix UI's Slot primitive, allowing it to be rendered as different HTML elements while maintaining its visual appearance.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `size` | `'18' \| '20'` | No | `'18'` | Controls the height and typography scale of the tag |
| `asChild` | `boolean` | No | `false` | When true, merges props with first child element instead of rendering a span |
| `className` | `string` | No | - | Additional CSS classes to merge with default styles |
| `children` | `ReactNode` | No | - | Content to display within the tag |
| `...other` | `ComponentPropsWithoutRef<'span'>` | No | - | All standard HTML span attributes |

## Usage Example

```tsx
import { SearchFilterTagBase } from '@/components/ui/search-filter-tag-base';

// Basic usage
<SearchFilterTagBase>
  Category: Technology
</SearchFilterTagBase>

// With different size
<SearchFilterTagBase size="20">
  Status: Active
</SearchFilterTagBase>

// As a different element (button)
<SearchFilterTagBase asChild>
  <button onClick={handleRemoveFilter}>
    Location: New York ×
  </button>
</SearchFilterTagBase>

// With custom styling
<SearchFilterTagBase 
  size="20"
  className="hover:bg-pgNeutral-200 cursor-pointer transition-colors"
>
  Department: Engineering
</SearchFilterTagBase>

// In a filter list
<div className="flex flex-wrap gap-2">
  <SearchFilterTagBase>Type: Full-time</SearchFilterTagBase>
  <SearchFilterTagBase>Experience: 3-5 years</SearchFilterTagBase>
  <SearchFilterTagBase size="20">Remote: Yes</SearchFilterTagBase>
</div>
```

## Design System Usage

### Typography Classes
- **Size 18**: `.typography-subheading4XSmall` - Smallest subheading scale for compact display
- **Size 20**: `.typography-subheading3XSmall` - Slightly larger subheading for better readability

### Colors
- **Background**: `bg-alphaNeutral/16` - Semi-transparent neutral background for subtle appearance
- **Text**: `text-pgText-800` - High contrast text color from our text color scale
- **Border**: `rounded-[.1875rem]` - Custom 3px border radius for refined appearance

### Layout & Spacing
- **Display**: `inline-flex items-center` - Horizontal layout with centered content
- **Padding**: 
  - Horizontal: `px-[.3125rem]` (5px) - Compact side padding
  - Vertical: Dynamic based on size variant
- **Text**: `text-nowrap` - Prevents text wrapping for consistent tag shape

## Styling

### Size Variants

#### Size 18 (Default)
```css
min-h-[1.125rem] /* 18px minimum height */
py-0.5 /* 2px vertical padding */
typography-subheading4XSmall /* Smallest subheading typography */
```

#### Size 20
```css
min-h-5 /* 20px minimum height */
py-[.0625rem] /* 1px vertical padding */
typography-subheading3XSmall /* Slightly larger subheading typography */
```

### Customization Options
- **Hover States**: Add `hover:bg-pgNeutral-200` for interactive feedback
- **Focus States**: Combine with `focus:ring-2 focus:ring-pgBlue-500` for accessibility
- **Active States**: Use `active:bg-pgNeutral-300` for pressed states
- **Colors**: Override with brand colors like `bg-pgBlue-100 text-pgBlue-800`

```tsx
// Custom styled interactive tag
<SearchFilterTagBase 
  asChild
  className="hover:bg-pgBlue-100 hover:text-pgBlue-800 cursor-pointer transition-colors duration-150"
>
  <button>Priority: High</button>
</SearchFilterTagBase>
```

## Responsive Design

The component maintains consistent sizing across all breakpoints by default. For responsive adjustments:

```tsx
<SearchFilterTagBase 
  className="
    sm:text-xs 
    md:text-sm 
    lg:px-3
  "
>
  Responsive Tag
</SearchFilterTagBase>
```

### Responsive Layout Patterns
```tsx
{/* Stack on mobile, inline on larger screens */}
<div className="flex flex-col sm:flex-row gap-2">
  <SearchFilterTagBase>Mobile Stacked</SearchFilterTagBase>
  <SearchFilterTagBase>Desktop Inline</SearchFilterTagBase>
</div>
```

## Accessibility

### Semantic HTML
- Uses semantic `<span>` element by default
- Supports `asChild` for proper semantic elements (buttons, links)

### Interactive Accessibility
```tsx
{/* Accessible removable filter */}
<SearchFilterTagBase asChild>
  <button
    onClick={handleRemove}
    aria-label="Remove category filter"
    type="button"
  >
    Category: Tech
    <span aria-hidden="true">×</span>
  </button>
</SearchFilterTagBase>

{/* With keyboard navigation */}
<SearchFilterTagBase 
  asChild
  className="focus:outline-none focus:ring-2 focus:ring-pgBlue-500"
>
  <button tabIndex={0}>
    Keyboard Accessible
  </button>
</SearchFilterTagBase>
```

### Screen Reader Support
- Use descriptive text content
- Add `aria-label` for interactive elements
- Consider `aria-describedby` for additional context

## Dependencies

### Internal Dependencies
- **`@/lib/utils/cn`**: Utility for conditional class merging
- **Design System Colors**: pgText-800, alphaNeutral, pgNeutral scales
- **Typography System**: subheading4XSmall, subheading3XSmall classes

### External Dependencies
- **`@radix-ui/react-slot`**: Provides polymorphic rendering capability
- **`class-variance-authority`**: Manages component variants and styling
- **React**: forwardRef, ComponentPropsWithoutRef for proper typing

### Related Components
This component serves as a foundation for more complex filter components:
- `SearchFilterTag` (with close button)
- `InteractiveFilterTag` (clickable states)
- `FilterTagGroup` (container for multiple tags)