# TruncatedText Component

## Purpose

The `TruncatedText` component provides an intelligent text truncation solution that automatically detects when text content exceeds a specified number of lines and provides an expandable interface. It dynamically calculates whether truncation is needed based on the actual rendered content height and includes a toggle button to expand/collapse the full text with smooth visual feedback.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `string` | ✅ | - | The text content to be displayed and potentially truncated |
| `typography` | `Omit<TypographyProps, 'ref'>` | ✅ | - | Typography configuration object defining the text styling |
| `hideLabel` | `string` | ❌ | `"Show less"` | Text label displayed on the toggle button when content is expanded |
| `showLabel` | `string` | ❌ | `"Show more"` | Text label displayed on the toggle button when content is truncated |
| `maxLines` | `number` | ❌ | `3` | Maximum number of lines to display before truncating |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | ❌ | - | Additional HTML attributes passed to the container div |

## Usage Example

```tsx
import { TruncatedText } from '@/components/ui/truncated-text';

// Basic usage with paragraph text
function ProductDescription() {
  return (
    <TruncatedText
      typography={{
        variant: 'paragraphMedium',
        color: '700',
        className: 'text-pgText-700'
      }}
      maxLines={4}
      showLabel="Read more"
      hideLabel="Read less"
      className="max-w-md"
    >
      This is a comprehensive product description that contains multiple sentences 
      and detailed information about the product features, specifications, and 
      benefits. When this text exceeds the specified line limit, it will be 
      automatically truncated with a "Read more" button to expand the full content.
    </TruncatedText>
  );
}

// Usage with different typography styles
function ArticlePreview() {
  return (
    <div className="space-y-4">
      <TruncatedText
        typography={{
          variant: 'titleH3',
          color: '900',
          className: 'text-pgText-900 font-semibold'
        }}
        maxLines={2}
        className="mb-2"
      >
        Long Article Title That Might Span Multiple Lines in Mobile Layouts
      </TruncatedText>
      
      <TruncatedText
        typography={{
          variant: 'paragraphLarge',
          color: '600',
          className: 'text-pgText-600 leading-relaxed'
        }}
        maxLines={3}
        showLabel="Continue reading"
        hideLabel="Collapse"
      >
        Article excerpt with detailed content that provides readers with enough 
        context to understand the main points while keeping the layout clean 
        and organized for better user experience.
      </TruncatedText>
    </div>
  );
}

// Responsive usage with different line limits
function ResponsiveContent() {
  return (
    <TruncatedText
      typography={{
        variant: 'paragraphMedium',
        color: '700'
      }}
      maxLines={2}
      className="
        sm:max-w-sm md:max-w-md lg:max-w-lg
        px-4 sm:px-6 lg:px-8
      "
    >
      Content that adapts to different screen sizes with responsive spacing 
      and maintains optimal readability across all device breakpoints.
    </TruncatedText>
  );
}
```

## Design System Usage

### Typography Classes
The component leverages our typography system through the `typography` prop:

- **Titles**: Use `titleH1` through `titleH6` for headings
- **Paragraphs**: Use `paragraphXLarge`, `paragraphLarge`, `paragraphMedium`, `paragraphSmall` for body text
- **Labels**: Use `labelXLarge` through `label3XSmall` for supplementary text
- **Headlines**: Use `headlines36` through `headlines14` for featured content

### Color Tokens
Text colors follow our semantic color system:

- **Primary Text**: `pgText-900`, `pgText-800`, `pgText-700`
- **Secondary Text**: `pgText-600`, `pgText-500`, `pgText-400`
- **Muted Text**: `pgText-300`, `pgText-200`
- **Dark Mode**: Automatic adaptation through CSS variables

### Component Dependencies
- **Button**: Uses `variant='neutralLink'` and `size='xs'` for the toggle action
- **Typography**: Core typography component for text rendering
- **Icons**: `PiArrowDownSLine` for visual expansion indicator

## Styling

### Button Variants
The toggle button uses our design system's button styling:
```tsx
<Button
  variant='neutralLink'     // Subtle link-style appearance
  size='xs'                // Extra small sizing
  className='flex items-center gap-2 place-self-start px-0'
>
```

### Visual States
- **Collapsed State**: Text truncated with webkit-line-clamp
- **Expanded State**: Full text visible, arrow icon rotated 180°
- **Transition**: Smooth rotation animation on arrow icon

### Customization Options
```tsx
// Custom styling with design system tokens
<TruncatedText
  typography={{
    variant: 'paragraphLarge',
    color: '700',
    className: 'font-medium leading-relaxed'
  }}
  className="
    bg-pgBackground-50 dark:bg-pgBackground-800
    border border-pgStroke-200 dark:border-pgStroke-700
    rounded-lg p-4
    max-w-2xl
  "
  maxLines={5}
/>
```

## Responsive Design

The component adapts across our breakpoint system:

### Breakpoint Behavior
- **Mobile (< 640px)**: Typically uses lower `maxLines` values for compact display
- **Tablet (640px - 1024px)**: Balanced line limits with medium typography variants
- **Desktop (> 1024px)**: Higher line limits with larger typography variants

### Responsive Implementation
```tsx
// Responsive line limits and typography
<TruncatedText
  typography={{
    variant: 'paragraphSmall',    // sm: paragraphMedium, lg: paragraphLarge
    color: '700'
  }}
  maxLines={2}                    // sm: 3, lg: 4
  className="
    text-sm sm:text-base lg:text-lg
    max-w-xs sm:max-w-md lg:max-w-xl
  "
/>
```

## Accessibility

### ARIA Considerations
- **Button Role**: Toggle button maintains proper button semantics
- **State Communication**: Consider adding `aria-expanded` attribute for screen readers
- **Focus Management**: Button receives proper focus indicators through our design system

### Accessibility Enhancements
```tsx
// Enhanced accessibility implementation
<Button
  variant='neutralLink'
  size='xs'
  aria-expanded={isExpanded}
  aria-label={`${isExpanded ? 'Collapse' : 'Expand'} text content`}
  className='flex items-center gap-2 place-self-start px-0'
>
```

### Keyboard Navigation
- **Tab Navigation**: Toggle button is keyboard accessible
- **Enter/Space**: Activates expand/collapse functionality
- **Focus Indicators**: Inherit from our button component's focus styles

## Dependencies

### Internal Components
- **`Typography`**: Core text rendering with design system integration
- **`Button`**: Interactive toggle element with consistent styling
- **`PiArrowDownSLine`**: Visual indicator icon from our icon system

### External Dependencies
- **`use-resize-observer`**: Monitors container size changes for dynamic truncation detection
- **`cn`**: Utility function for conditional className merging

### Utility Functions
- **`cn`**: Used for conditional styling and class name composition
- **ResizeObserver**: Automatically recalculates truncation needs on layout changes

The component seamlessly integrates with our design system while providing robust text truncation functionality that adapts to content and layout changes.