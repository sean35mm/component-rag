# Skeleton Component

## Purpose

The `Skeleton` component is a loading placeholder that provides visual feedback to users while content is being fetched or rendered. It displays an animated pulse effect to indicate that content is loading, helping to maintain perceived performance and user engagement during loading states.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `as` | `ElementType` | No | `'div'` | The HTML element or React component to render as the skeleton container |
| `className` | `string` | No | `undefined` | Additional CSS classes to apply to the skeleton element |
| `...props` | `HTMLAttributes<HTMLDivElement>` | No | `{}` | Standard HTML attributes that will be spread to the rendered element |

## Usage Example

```tsx
import { Skeleton } from '@/components/ui/skeleton';

// Basic usage
function LoadingCard() {
  return (
    <div className="space-y-4 p-6 bg-pgNeutral-0 rounded-lg">
      {/* Profile avatar skeleton */}
      <Skeleton className="h-12 w-12 rounded-full" />
      
      {/* Title skeleton */}
      <Skeleton className="h-6 w-3/4" />
      
      {/* Content skeleton lines */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    </div>
  );
}

// Using different elements
function LoadingList() {
  return (
    <ul className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton 
          key={i}
          as="li" 
          className="h-16 w-full rounded-lg"
        />
      ))}
    </ul>
  );
}

// Complex skeleton layout
function LoadingArticle() {
  return (
    <article className="max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <Skeleton className="h-8 w-2/3 mb-2" />
        <Skeleton className="h-4 w-1/3" />
      </div>
      
      {/* Featured image */}
      <Skeleton className="h-64 w-full rounded-lg mb-6" />
      
      {/* Content paragraphs */}
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    </article>
  );
}
```

## Design System Usage

### Base Styling
- **Animation**: Uses Tailwind's `animate-pulse` for the loading effect
- **Background**: `bg-alphaNeutral/16` provides a subtle, semi-transparent background
- **Border Radius**: `rounded-md` for consistent rounded corners with the design system

### Typography Integration
Match skeleton dimensions to our typography classes:

```tsx
// For different text sizes
<Skeleton className="h-9 w-3/4" /> {/* For typography-titleH2 */}
<Skeleton className="h-7 w-1/2" /> {/* For typography-titleH4 */}
<Skeleton className="h-6 w-2/3" /> {/* For typography-headlines20 */}
<Skeleton className="h-5 w-full" /> {/* For typography-paragraphMedium */}
<Skeleton className="h-4 w-5/6" /> {/* For typography-paragraphSmall */}
```

### Color Adaptation
The component automatically adapts to dark mode through the `alphaNeutral` color token, ensuring proper contrast in both light and dark themes.

## Styling

### Size Variants
```tsx
// Small elements
<Skeleton className="h-4 w-20" />

// Medium elements  
<Skeleton className="h-6 w-32" />

// Large elements
<Skeleton className="h-8 w-48" />

// Full width
<Skeleton className="h-6 w-full" />
```

### Shape Variants
```tsx
// Circular (avatars, icons)
<Skeleton className="h-12 w-12 rounded-full" />

// Rectangular (images, cards)
<Skeleton className="h-32 w-full rounded-lg" />

// Pill-shaped (buttons, tags)
<Skeleton className="h-8 w-24 rounded-full" />

// Sharp corners
<Skeleton className="h-6 w-32 rounded-none" />
```

### Custom Backgrounds
```tsx
// Lighter skeleton
<Skeleton className="bg-pgNeutral-100/20" />

// Darker skeleton
<Skeleton className="bg-pgNeutral-200/30" />

// Branded skeleton
<Skeleton className="bg-pgBlue-100/20" />
```

## Responsive Design

The skeleton component inherits responsive behavior from applied Tailwind classes:

```tsx
// Responsive sizing
<Skeleton className="h-6 w-full sm:w-3/4 md:w-1/2 lg:w-1/3" />

// Responsive layout
<div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {Array.from({ length: 6 }).map((_, i) => (
    <Skeleton key={i} className="h-24 w-full" />
  ))}
</div>

// Responsive heights
<Skeleton className="h-32 sm:h-40 md:h-48 lg:h-56 w-full" />
```

## Accessibility

### Screen Reader Considerations
```tsx
// Add ARIA labels for screen readers
<Skeleton 
  className="h-6 w-full"
  aria-label="Loading content"
  role="status"
/>

// For complex loading states
<div role="status" aria-live="polite" aria-label="Loading article">
  <Skeleton className="h-8 w-2/3 mb-4" />
  <Skeleton className="h-4 w-full mb-2" />
  <Skeleton className="h-4 w-3/4" />
  <span className="sr-only">Loading content, please wait...</span>
</div>
```

### Motion Preferences
```tsx
// Respect reduced motion preferences
<Skeleton className="h-6 w-full motion-reduce:animate-none" />
```

## Dependencies

### Internal Dependencies
- **`cn` utility**: Used for conditional class merging and styling composition
- **Design system colors**: Relies on `alphaNeutral` color token
- **Tailwind CSS**: Uses `animate-pulse`, spacing, and sizing utilities

### Related Components
- **Loading states**: Often used with Button, Card, and List components
- **Data fetching**: Commonly paired with async components and loading boundaries
- **Forms**: Used in form fields during validation or submission states

### Usage with Other Components
```tsx
// With Card component
<Card className="p-6">
  <Skeleton className="h-6 w-1/2 mb-4" />
  <Skeleton className="h-4 w-full mb-2" />
  <Skeleton className="h-4 w-3/4" />
</Card>

// With List components
<List>
  {isLoading ? (
    Array.from({ length: 5 }).map((_, i) => (
      <ListItem key={i}>
        <Skeleton className="h-4 w-full" />
      </ListItem>
    ))
  ) : (
    data.map(item => <ListItem key={item.id}>{item.name}</ListItem>)
  )}
</List>
```