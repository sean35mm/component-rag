# MediaSourceReferenceBuilder

## Purpose

The `MediaSourceReferenceBuilder` component displays a comprehensive reference for media sources, including the domain name, citation icon, paywall indicator, and bias rating. It's designed to provide users with essential information about a news source in a compact, visually consistent format.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `domain` | `string` | ✅ | - | The domain name of the media source (e.g., "nytimes.com") |
| `paywall` | `boolean` | ✅ | - | Whether the source has a paywall restriction |
| `avgBiasRating` | `string \| null` | ❌ | `undefined` | Average bias rating for the source, used to display bias indicator |
| `color` | `'0' \| '700' \| 'inverted'` | ❌ | `'700'` | Color variant for the text content |
| `size` | `'s' \| 'xs'` | ❌ | `'s'` | Size variant affecting typography scale |

## Usage Example

```tsx
import { MediaSourceReferenceBuilder } from '@/components/ui/media-source-reference-builder';

function NewsArticle() {
  return (
    <div className="space-y-4">
      {/* Standard usage */}
      <MediaSourceReferenceBuilder
        domain="nytimes.com"
        paywall={true}
        avgBiasRating="2.3"
        color="700"
        size="s"
      />
      
      {/* Small variant for compact layouts */}
      <MediaSourceReferenceBuilder
        domain="reuters.com"
        paywall={false}
        avgBiasRating="1.8"
        color="700"
        size="xs"
      />
      
      {/* Inverted for dark backgrounds */}
      <div className="bg-pgNeutral-900 p-4 rounded-lg">
        <MediaSourceReferenceBuilder
          domain="bbc.com"
          paywall={false}
          avgBiasRating="1.5"
          color="inverted"
          size="s"
        />
      </div>
      
      {/* Light variant */}
      <MediaSourceReferenceBuilder
        domain="washingtonpost.com"
        paywall={true}
        color="0"
        size="s"
      />
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **Small Size (`s`)**: Uses `.typography-paragraphSmall` for main text content
- **Extra Small Size (`xs`)**: Uses `.typography-paragraphXSmall` for compact displays

### Color Tokens
- **Default (`700`)**: `text-pgText-700` - Standard text color
- **Light (`0`)**: `text-pgText-0 opacity-80` - Light text with reduced opacity
- **Inverted (`inverted`)**: `text-pgTextInv-700` - Inverted text for dark backgrounds

### Layout Classes
- `inline-flex` - Horizontal layout with inline behavior
- `min-w-0` - Prevents flex item from growing beyond container
- `items-center` - Vertical alignment of all elements
- `truncate` - Text truncation for long domain names
- `shrink-0` - Prevents icons from shrinking
- `mr-1.5` - 6px margin between citation icon and domain text

## Styling

### Color Variants

| Variant | CSS Classes | Use Case |
|---------|-------------|----------|
| `700` (default) | `text-pgText-700` | Standard text on light backgrounds |
| `0` | `text-pgText-0 opacity-80` | Subtle text with reduced prominence |
| `inverted` | `text-pgTextInv-700` | Text on dark backgrounds |

### Size Variants

| Size | Typography Variant | Icon Size | Use Case |
|------|-------------------|-----------|----------|
| `s` (default) | `paragraphSmall` | `0.875rem` | Standard references |
| `xs` | `paragraphXSmall` | `0.875rem` | Compact layouts, mobile |

### Icon Styling
- **Dollar Icon**: Fixed at `0.875rem` (14px) for paywall indicator
- **Bias Icon**: Fixed at `0.875rem` (14px) for bias rating display
- **Citation Icon**: Fixed at `14px` size via `SourceCitationItem`

## Responsive Design

The component automatically adapts across breakpoints:

```tsx
// Responsive usage example
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <MediaSourceReferenceBuilder
    domain="example.com"
    paywall={false}
    size="s"          // Standard size on desktop
    className="md:text-base text-sm"  // Responsive typography
  />
</div>
```

**Breakpoint Behavior:**
- **Mobile (< 640px)**: Consider using `size="xs"` for better fit
- **Tablet (640px - 1024px)**: Standard `size="s"` works well
- **Desktop (> 1024px)**: Both sizes work depending on layout density

## Accessibility

### ARIA Considerations
- Uses semantic `<div>` with `Typography` component for proper text rendering
- Domain text is fully readable by screen readers
- Icons include implicit meaning through context

### Keyboard Navigation
- Component is not focusable (display-only)
- Ensure parent containers provide proper focus management if interactive

### Screen Reader Support
```tsx
// Enhanced accessibility example
<MediaSourceReferenceBuilder
  domain="example.com"
  paywall={true}
  avgBiasRating="2.1"
  aria-label={`Source: example.com${paywall ? ', has paywall' : ''}${avgBiasRating ? `, bias rating ${avgBiasRating}` : ''}`}
/>
```

### Color Contrast
- All color variants meet WCAG 2.1 AA standards
- `color="0"` with `opacity-80` maintains sufficient contrast
- Inverted variant designed for dark mode compliance

## Dependencies

### Internal Components
- **`Typography`**: Provides consistent text styling and semantic HTML
- **`SourceCitationItem`**: Displays domain-specific citation icon
- **`BiasIcon`**: Shows bias rating indicator
- **`Dollar`**: Paywall indicator icon from `@/components/icons`

### Utilities
- **`cn`**: Utility for conditional class name merging
- **Design System**: Relies on pgText, pgTextInv color tokens

### External Dependencies
- **React**: Core framework dependency
- **Tailwind CSS**: For utility classes and responsive design

## Constants Export

The component exports useful constants for external usage:

```tsx
import { DEFAULTS, COLOR_TO_STYLES, SIZE_TO_VARIANT } from '@/components/ui/media-source-reference-builder';

// Use defaults in parent components
const defaultColor = DEFAULTS.COLOR; // '700'
const defaultSize = DEFAULTS.SIZE;   // 's'

// Access style mappings
const colorStyles = COLOR_TO_STYLES['inverted']; // 'text-pgTextInv-700'
const sizeVariant = SIZE_TO_VARIANT['xs'];       // 'paragraphXSmall'
```