# HomeScreenFallback

## Purpose

The `HomeScreenFallback` component serves as a loading state or fallback UI for the home screen. It displays a skeleton structure that matches the layout of the main home screen, including the Perigon logo, tagline, search bar fallback, and featured grid fallback. This component maintains visual consistency and provides users with immediate feedback while the actual content loads.

## Props Interface

| Prop | Type | Required/Optional | Description |
|------|------|-------------------|-------------|
| N/A | N/A | N/A | This component accepts no props |

## Usage Example

```tsx
import { HomeScreenFallback } from '@/components/ui/skeletons/home-screen-fallback';

// Basic usage - typically used while loading home screen content
function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  
  if (isLoading) {
    return <HomeScreenFallback />;
  }
  
  return <HomeScreen />;
}

// In a Suspense boundary
function App() {
  return (
    <Suspense fallback={<HomeScreenFallback />}>
      <HomePage />
    </Suspense>
  );
}
```

## Design System Usage

### Typography Classes
- **Desktop**: `.typography-titleH4` (responsive variant for lg+ breakpoints)
- **Mobile**: `.typography-titleH5` (base variant)

### Color Tokens
- **Text Color**: `pgText-800` (dark neutral text for high contrast)

### Layout & Spacing
- **Container Max Width**: CSS custom property `var(--max-tab-width)`
- **Gap Spacing**: 
  - `gap-8` (32px) base, `lg:gap-10` (40px) on large screens
  - `gap-4` (16px) base, `lg:gap-8` (32px) for inner container
  - `gap-2` (8px) base, `lg:gap-6` (24px) for logo section

### Tailwind Utilities
- **Layout**: `flex`, `flex-col`, `items-center`, `justify-center`
- **Overflow**: `overflow-y-auto`, `overflow-x-hidden`
- **Width/Height**: `w-full`, `min-h-24`, `lg:min-h-28`
- **Positioning**: `z-10` for search bar layering
- **Padding**: `py-8`, `px-4`, `px-3`

## Styling

### Layout Structure
```
Container (flex-col, centered)
├── Inner Container (max-width constrained)
│   ├── Logo & Title Section
│   │   ├── Logo (hidden on mobile)
│   │   └── Typography (responsive sizing)
│   └── Search Bar Container
│       └── SearchBarFallback
└── FeaturedGridFallback
```

### Visual Hierarchy
- **Logo**: Only visible on desktop (`hidden lg:block`)
- **Title**: Responsive typography scaling from H5 to H4
- **Layout**: Vertically centered on large screens, top-aligned on mobile

## Responsive Design

### Mobile (Default)
- **Logo**: Hidden for space optimization
- **Typography**: `titleH5` variant
- **Spacing**: Compact spacing with `gap-8`, `gap-4`, `gap-2`
- **Height**: `min-h-24` for logo section
- **Layout**: Linear vertical flow

### Desktop (lg: 1024px+)
- **Logo**: Visible with `h-9` (36px height)
- **Typography**: Scales up to `titleH4` variant
- **Spacing**: Increased spacing with `gap-10`, `gap-8`, `gap-6`
- **Height**: `min-h-28` for logo section
- **Layout**: Centered justification (`lg:justify-center`)

### Breakpoint Behavior
| Feature | Mobile | Desktop (lg+) |
|---------|--------|---------------|
| Logo Display | Hidden | Visible |
| Title Size | titleH5 | titleH4 |
| Container Gap | 32px | 40px |
| Logo Section Gap | 8px | 24px |
| Logo Section Height | 96px | 112px |

## Accessibility

### Semantic Structure
- Uses proper heading hierarchy with Typography component
- Maintains logical content flow for screen readers
- Preserves focus management through fallback components

### Visual Accessibility
- High contrast text using `pgText-800`
- Adequate spacing for touch targets
- Responsive design accommodates various viewport sizes
- Overflow handling prevents horizontal scrolling issues

### Loading State Indicators
- Provides immediate visual feedback during loading
- Maintains layout stability to prevent content shift
- Integrates with child fallback components for consistent loading experience

## Dependencies

### Internal Components
- **`FeaturedGridFallback`**: `@/components/home/featured-grid` - Skeleton for featured content grid
- **`IconPerigonLogoFull`**: `@/components/icons` - Full Perigon logo component
- **`SearchBarFallback`**: `@/components/search/search-bar` - Skeleton for search functionality
- **`Typography`**: `@/components/ui/typography` - Design system typography component

### Design System Dependencies
- **CSS Variables**: Relies on `--max-tab-width` for responsive container sizing
- **Typography Scale**: Depends on `.typography-titleH4` and `.typography-titleH5` classes
- **Color Tokens**: Utilizes `pgText-800` from the design system color palette
- **Responsive Utilities**: Leverages Tailwind's responsive prefix system (`lg:`)

### Usage Context
This component is typically used in:
- Loading states for the home page
- Suspense fallbacks for home screen content
- Network error recovery states
- Initial app loading experiences