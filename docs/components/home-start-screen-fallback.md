# HomeStartScreenFallback Component

## Purpose

The `HomeStartScreenFallback` component serves as a loading state placeholder for the home start screen. It displays skeleton elements and static content to maintain visual continuity while the actual home page content loads. This component provides an engaging loading experience with the Perigon branding, welcome messaging, and skeleton representations of key interface elements like the Omnibar and workflow cards.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | Optional | `undefined` | Additional CSS classes to apply to the root container |

## Usage Example

```tsx
import { HomeStartScreenFallback } from '@/components/ui/skeletons/home-start-screen-fallback';

// Basic usage
export function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <HomeStartScreenFallback />;
  }

  return <HomeStartScreen />;
}

// With custom styling
export function CustomHomePage() {
  return (
    <HomeStartScreenFallback 
      className="bg-pgBackground-50 dark:bg-pgBackground-950" 
    />
  );
}

// In a layout with conditional rendering
export function AppLayout() {
  const { isHomeLoading } = useHomeData();

  return (
    <div className="min-h-screen bg-pgBackground-0 dark:bg-pgBackground-950">
      {isHomeLoading ? (
        <HomeStartScreenFallback className="border-t border-pgStroke-100" />
      ) : (
        <HomeStartScreen />
      )}
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **`.typography-headlines32`** - Large headline for desktop title display
- **`.typography-paragraphMedium`** - Standard paragraph text for descriptions
- **`.typography-paragraphXSmall`** - Small text for template prompts

### Typography Component Props
- **Title**: `variant='titleH5'` with `color='800'` for high contrast headings
- **Descriptions**: `variant='paragraphMedium'` with `color='700'` for secondary text
- **Prompts**: `variant='paragraphXSmall'` with `color='600'` for subtle guidance text

### Color Tokens
- **Background Colors**: 
  - `bg-alphaNeutral/6` - Subtle overlay for content areas
  - `dark:bg-pgNeutral-950` - Dark mode background for cards
- **Border Colors**:
  - `border-pgStroke-200` - Light border for content separation
- **Text Colors**: Applied through Typography component color props (600, 700, 800)

### Spacing & Layout
- **Grid System**: `grid-rows-[1fr_auto]` for main layout structure
- **Responsive Spacing**: `p-4`, `gap-4`, `gap-8` following 4px base unit
- **Container Sizing**: `h-[calc(100vh-60px)]` accounting for header height

## Styling

### Layout Variants
- **Full Screen**: Takes full viewport height minus header space
- **Responsive Grid**: 1 column on mobile, 2 columns on large screens for skeleton cards
- **Centered Content**: Main content centered with auto margins

### Container Styles
```tsx
// Root container
"block size-full overflow-y-auto"

// Main content area
"h-[calc(100vh-60px)] w-full grid-rows-[1fr_auto] items-center p-4"

// Omnibar skeleton container
"min-h-[152px] w-full rounded-xl border border-pgStroke-200 bg-alphaNeutral/6 dark:bg-pgNeutral-950"
```

### Skeleton Elements
- **Input Skeletons**: `h-8 w-full rounded-lg` for form elements
- **Card Skeletons**: `h-24 w-full rounded-lg` for workflow cards
- **Button Skeleton**: `size-8 rounded-full` for circular action buttons

## Responsive Design

### Breakpoint Adaptations

#### Mobile (< 1024px)
- Single column grid for skeleton cards
- Perigon logo hidden (`hidden lg:block`)
- Standard typography sizing
- Compact spacing with `p-4`

#### Desktop (≥ 1024px)
- Two-column grid for skeleton cards (`lg:grid-cols-2`)
- Perigon logo visible (`h-9 lg:block`)
- Enhanced typography (`lg:typography-headlines32`, `lg:typography-paragraphMedium`)
- Fixed content width (`lg:w-[712px]`)
- Enhanced padding (`lg:px-3`, `lg:px-4`)

#### Responsive Classes Used
```tsx
// Logo visibility
"hidden h-9 lg:block"

// Typography scaling
"lg:typography-headlines32 mt-2 text-center"
"lg:typography-paragraphMedium text-center"

// Layout adjustments
"grid-cols-1 gap-4 lg:grid-cols-2"
"max-w-[91vw] lg:w-[712px]"
```

## Accessibility

### Loading State Indicators
- **Semantic Structure**: Uses proper heading hierarchy with Typography components
- **Screen Reader Support**: Skeleton elements maintain layout structure for assistive technology
- **Focus Management**: No interactive elements to prevent focus trapping during loading

### Visual Accessibility
- **High Contrast**: Uses color tokens (700, 800) for adequate text contrast
- **Reduced Motion**: Static skeleton elements respect user motion preferences
- **Dark Mode**: Full dark mode support with appropriate color adaptations

### Recommended Enhancements
```tsx
// Add ARIA labels for better screen reader experience
<div 
  className="block size-full overflow-y-auto"
  role="status"
  aria-label="Loading home screen content"
>
  // Component content
</div>
```

## Dependencies

### Internal Components
- **`FeaturedGridFallback`** - Skeleton for featured content grid
- **`IconPerigonLogoFull`** - Brand logo component
- **`Skeleton`** - Base skeleton component for loading states
- **`Typography`** - Design system typography component

### Utilities
- **`cn`** - Utility for conditional className merging

### Design System Dependencies
- **Color System**: Requires pgStroke, pgNeutral, and alphaNeutral color tokens
- **Typography System**: Depends on typography variant classes and color props
- **Responsive System**: Uses Tailwind breakpoint prefixes (lg:)

### CSS Variables Required
```css
/* Essential color variables */
--pgStroke-200: /* Light border color */
--pgNeutral-950: /* Dark background color */
--alphaNeutral: /* Neutral overlay color */
```