# StoryScreenFallback Component

## Purpose

The `StoryScreenFallback` component provides a skeleton loading state for the story detail screen. It displays placeholder content that matches the layout of the actual story screen, including breadcrumbs, header, stats, summary, questions, and media sections. This component ensures users see familiar content structure while the actual story data loads.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| - | - | - | - | This component accepts no props |

## Usage Example

```tsx
import { StoryScreenFallback } from '@/components/ui/skeletons/story-screen-fallback';

// Basic usage during loading state
function StoryPage({ storyId }: { storyId: string }) {
  const { data: story, isLoading } = useStory(storyId);

  if (isLoading) {
    return <StoryScreenFallback />;
  }

  return <StoryScreen story={story} />;
}

// With conditional rendering
function StoryContainer() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-pgBackground-50">
      {isLoading ? (
        <StoryScreenFallback />
      ) : (
        <StoryContent />
      )}
    </div>
  );
}
```

## Design System Usage

### Layout Components
- **TabContainer**: Main content wrapper providing consistent spacing
- **TabDetailsFallback**: Sticky header fallback for desktop view
- **Skeleton**: Base skeleton component for individual loading elements

### Spacing & Layout
- **Grid System**: `grid-cols-1 lg:grid-cols-3` for responsive 2-column layout
- **Gaps**: `gap-2`, `gap-6`, `gap-10` for consistent element spacing
- **Padding**: `px-4 lg:px-2`, `py-0.5`, `lg:py-1` for responsive spacing
- **Margins**: `mt-2`, `mt-3`, `lg:mt-4`, `lg:mt-8` for vertical rhythm

### Responsive Breakpoints
- **Mobile-first**: Base styles for mobile devices
- **Large screens**: `lg:` prefix for desktop adaptations (1024px+)
- **Hidden elements**: `hidden lg:flex` for desktop-only header

## Styling

### Skeleton Variants
```tsx
// Different skeleton sizes used throughout the component
<Skeleton className='h-4 w-full' />        // Breadcrumb items
<Skeleton className='h-10 w-full lg:h-11 lg:w-3/4' />  // Main title
<Skeleton className='h-6 w-32' />          // Section headings
<Skeleton className='h-64 w-full rounded-lg' />  // Main image
<Skeleton className='size-8 rounded-full' />     // Avatar placeholders
```

### Border & Rounded Corners
- **Border**: `border` class for question cards and mention containers
- **Rounded**: `rounded-lg` for images, `rounded-xl` for containers

### Layout Sections
- **Header**: Sticky positioning with `sticky top-0 z-[1]`
- **Two-column**: `col-span-2` for main content, single column for sidebar
- **Cards**: `space-y-4`, `space-y-6` for consistent vertical spacing

## Responsive Design

### Mobile (< 1024px)
- Single column layout
- Visible breadcrumbs section
- Compact spacing with `mt-3`, `px-4`
- Hidden desktop header
- Stacked media thumbnails

### Desktop (≥ 1024px)
- Three-column grid layout
- Sticky header with `TabDetailsFallback`
- Hidden mobile breadcrumbs
- Increased spacing with `lg:mt-8`, `lg:gap-6`
- Side-by-side thumbnail grid

### Responsive Utilities
```tsx
// Mobile breadcrumbs, hidden on desktop
<div className='mt-3 flex items-center gap-2 px-4 py-0.5 lg:hidden'>

// Desktop header, hidden on mobile
<TabDetailsFallback className='sticky top-0 z-[1] hidden lg:flex' />

// Responsive title sizing
<Skeleton className='h-10 w-full lg:h-11 lg:w-3/4' />

// Responsive grid layout
<div className='grid grid-cols-1 lg:grid-cols-3 lg:gap-6'>
```

## Accessibility

### Screen Reader Support
- **Semantic structure**: Uses proper heading hierarchy with skeleton placeholders
- **Loading indication**: Component should be wrapped with `aria-live="polite"` region
- **Skip navigation**: Maintains focus flow similar to actual content

### Recommended Implementation
```tsx
<div role="status" aria-live="polite" aria-label="Loading story content">
  <StoryScreenFallback />
</div>
```

### Visual Accessibility
- **Skeleton animation**: Inherits from base `Skeleton` component's subtle animation
- **Contrast**: Maintains sufficient contrast for skeleton elements
- **Layout preservation**: Prevents layout shift when real content loads

## Dependencies

### Internal Components
- **TabContainer**: `@/components/main-layout/tab-container`
- **TabDetailsFallback**: `@/components/main-layout/tab-details`
- **Skeleton**: `@/components/ui/skeleton`

### Related Components
This component pairs with:
- `StoryScreen`: The actual story content component
- `TabDetails`: The real header component
- Other skeleton components in the design system

### Styling Dependencies
- **Tailwind CSS**: For responsive utilities and spacing
- **Design System**: Inherits skeleton styling from base Skeleton component
- **CSS Variables**: Uses design system color tokens through Skeleton component

### Usage Context
Typically used within:
- Story detail pages during loading
- Route transitions
- Data fetching states
- Error boundary fallbacks