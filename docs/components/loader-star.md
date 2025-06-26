# LoaderStar Component

## Purpose

The `LoaderStar` component provides a customizable loading spinner built with the `PiSpinnerDots5` icon. It creates a visually appealing loading animation with a layered effect, combining a static background icon with an animated spinning foreground icon that highlights specific dots with varying opacity levels.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | Additional CSS classes to apply to the container |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | No | All standard HTML div attributes (id, onClick, etc.) |

## Usage Example

```tsx
import { LoaderStar } from '@/components/ui/loader-star';

// Basic usage
<LoaderStar />

// With custom sizing using design system tokens
<LoaderStar className="w-8 h-8 text-pgBlue-500" />

// In a loading state with proper context
<div className="flex items-center justify-center min-h-[200px] bg-pgBackground-50">
  <div className="flex flex-col items-center gap-3">
    <LoaderStar className="w-12 h-12 text-pgBlue-600" />
    <p className="typography-labelMedium text-pgText-600">
      Loading your data...
    </p>
  </div>
</div>

// With brand colors and responsive sizing
<LoaderStar className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-pgBrand-500" />

// In different states
<div className="space-y-4">
  {/* Success state */}
  <LoaderStar className="w-8 h-8 text-pgStateSuccess-base" />
  
  {/* Warning state */}
  <LoaderStar className="w-8 h-8 text-pgStateWarning-base" />
  
  {/* Error state */}
  <LoaderStar className="w-8 h-8 text-pgStateError-base" />
</div>
```

## Design System Usage

### Typography Classes
This component doesn't directly use typography classes but pairs well with:
- `.typography-labelMedium` or `.typography-labelSmall` for accompanying loading text
- `.typography-paragraphSmall` for descriptive loading messages

### Color Tokens
The component inherits text color for the icon. Recommended color usage:
- **Primary Loading**: `text-pgBlue-500`, `text-pgBlue-600`
- **Brand Colors**: `text-pgGreen-500`, `text-pgPurple-500`
- **State Colors**: `text-pgStateInformation-base`, `text-pgStateSuccess-base`
- **Neutral**: `text-pgText-400`, `text-pgText-500`

### Tailwind Utilities Used
- `relative` - For positioning the layered icons
- `absolute` - For precise icon positioning
- `left-0 top-0` - Positioning anchors
- `size-full` - Full width and height
- `opacity-20` - Background icon opacity
- `animate-spin` - CSS animation for rotation
- `[&>*:nth-child(n)]:opacity-*` - Child-specific opacity targeting

## Styling

### Size Variants
```tsx
// Small loader
<LoaderStar className="w-4 h-4" />

// Medium loader (default)
<LoaderStar className="w-6 h-6" />

// Large loader
<LoaderStar className="w-8 h-8" />

// Extra large loader
<LoaderStar className="w-12 h-12" />
```

### Color Variants
```tsx
// Brand colors
<LoaderStar className="w-8 h-8 text-pgBlue-500" />
<LoaderStar className="w-8 h-8 text-pgGreen-500" />
<LoaderStar className="w-8 h-8 text-pgPurple-500" />

// State colors
<LoaderStar className="w-8 h-8 text-pgStateSuccess-base" />
<LoaderStar className="w-8 h-8 text-pgStateWarning-base" />
<LoaderStar className="w-8 h-8 text-pgStateError-base" />

// Dark mode adaptive
<LoaderStar className="w-8 h-8 text-pgText-600 dark:text-pgText-400" />
```

### Animation Customization
```tsx
// Slower animation
<LoaderStar className="w-8 h-8 [&>svg:last-child]:animate-spin [&>svg:last-child]:duration-1000" />

// Faster animation
<LoaderStar className="w-8 h-8 [&>svg:last-child]:animate-spin [&>svg:last-child]:duration-500" />
```

## Responsive Design

The component adapts well across breakpoints:

```tsx
// Responsive sizing
<LoaderStar className="
  w-4 h-4 
  sm:w-6 sm:h-6 
  md:w-8 md:h-8 
  lg:w-10 lg:h-10
  text-pgBlue-500
" />

// Responsive in different contexts
<div className="
  flex items-center justify-center
  p-4 sm:p-6 md:p-8
  bg-pgBackground-50
">
  <LoaderStar className="w-6 h-6 md:w-8 md:h-8 text-pgBlue-600" />
</div>
```

## Accessibility

### ARIA Considerations
```tsx
// With proper ARIA labels
<div role="status" aria-label="Loading content">
  <LoaderStar className="w-8 h-8 text-pgBlue-500" />
  <span className="sr-only">Loading...</span>
</div>

// In a live region
<div aria-live="polite" aria-busy="true">
  <LoaderStar className="w-6 h-6 text-pgBlue-500" />
  <span className="typography-labelSmall text-pgText-600 ml-2">
    Loading your data...
  </span>
</div>
```

### Motion Sensitivity
```tsx
// Respect reduced motion preferences
<LoaderStar className="
  w-8 h-8 text-pgBlue-500
  motion-reduce:animate-none
  motion-reduce:[&>svg:last-child]:animate-none
" />
```

## Dependencies

### Related Components
- **Icons**: Uses `PiSpinnerDots5` from `@/components/icons`
- **Typography**: Pairs with label and paragraph components for loading messages
- **Button**: Often used within button loading states
- **Card**: Commonly used in card loading states

### Utilities
- **cn**: Uses the `cn` utility from `@/lib/utils/cn` for className merging
- **Design Tokens**: Leverages the full color system and spacing scale

### Common Patterns
```tsx
// With button loading state
<Button disabled={isLoading} className="relative">
  {isLoading && (
    <LoaderStar className="w-4 h-4 text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
  )}
  <span className={isLoading ? 'opacity-0' : ''}>
    Submit
  </span>
</Button>

// With card loading
<Card className="p-6">
  <div className="flex items-center justify-center min-h-[120px]">
    <LoaderStar className="w-8 h-8 text-pgBlue-500" />
  </div>
</Card>
```