# SearchAnswersHomeFallback Component

## Purpose

The `SearchAnswersHomeFallback` component provides a loading skeleton placeholder for the search answers homepage. It displays a skeleton representation of a search input field while content is being loaded, maintaining visual consistency and providing users with feedback that the interface is preparing to load.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| - | - | - | - | This component accepts no props |

## Usage Example

```tsx
import { SearchAnswersHomeFallback } from '@/components/ui/skeletons/search-answers-home-fallback';

// Basic usage - typically used during loading states
function SearchPage() {
  const [isLoading, setIsLoading] = useState(true);
  
  if (isLoading) {
    return <SearchAnswersHomeFallback />;
  }
  
  return (
    <div>
      {/* Your search interface content */}
    </div>
  );
}

// Usage with Suspense boundary
function SearchAnswersPage() {
  return (
    <Suspense fallback={<SearchAnswersHomeFallback />}>
      <SearchAnswersContent />
    </Suspense>
  );
}
```

## Design System Usage

### Layout Classes
- **Container**: `flex size-full flex-col items-center justify-center` - Creates a full-size centered flexbox container
- **Spacing**: `gap-6 p-4` - Uses design system spacing tokens for consistent layout
- **Constraints**: `max-w-xl` - Limits maximum width for optimal reading experience

### Skeleton Styling
- **Dimensions**: `h-10 w-full` - Standard input height with full width
- **Shape**: `rounded-full` - Matches typical search input styling
- **Base Component**: Utilizes the `Skeleton` component from our design system

### Color System Integration
The component inherits skeleton colors from the base `Skeleton` component, which automatically adapts to:
- **Light Mode**: Uses `pgNeutral-200` base with `pgNeutral-300` animation
- **Dark Mode**: Uses `pgNeutral-800` base with `pgNeutral-700` animation

## Styling

### Available Variants
This component currently has no built-in variants, but can be customized by:

```tsx
// Custom width constraint
<div className="w-full max-w-2xl">
  <SearchAnswersHomeFallback />
</div>

// Custom background
<div className="bg-pgBackground-50 dark:bg-pgBackground-950">
  <SearchAnswersHomeFallback />
</div>
```

### Customization Options
- **Container Styling**: Modify the outer container classes for different layouts
- **Skeleton Sizing**: The skeleton inherits from the parent container's constraints
- **Background**: Works with any background color from our design system

## Responsive Design

The component is responsive by default:

- **Mobile (< 640px)**: Full width with standard padding (`p-4`)
- **Tablet (≥ 640px)**: Maintains `max-w-xl` constraint for better proportions
- **Desktop (≥ 1024px)**: Centered layout with optimal search input width
- **Large screens (≥ 1440px)**: Consistent sizing prevents over-stretching

## Accessibility

### ARIA Considerations
- **Loading State**: The skeleton provides visual feedback for loading states
- **Screen Readers**: Inherits accessibility features from the base `Skeleton` component
- **Motion**: Respects `prefers-reduced-motion` settings through CSS animation controls

### Best Practices
```tsx
// Provide context for screen readers
<div role="status" aria-label="Loading search interface">
  <SearchAnswersHomeFallback />
</div>

// With live region for dynamic loading
<div aria-live="polite" aria-busy="true">
  <SearchAnswersHomeFallback />
</div>
```

## Dependencies

### Internal Dependencies
- **`@/components/ui/skeleton`**: Base skeleton component providing animation and styling
- **Design System**: Inherits from global CSS variables and Tailwind configuration

### Related Components
- **`Skeleton`**: Base component for all skeleton loading states
- **Search Components**: This fallback pairs with actual search interface components
- **Loading States**: Part of the broader loading state component family

### CSS Variables Used
```css
/* Inherited from Skeleton component */
--skeleton-base: rgb(var(--pg-neutral-200));
--skeleton-highlight: rgb(var(--pg-neutral-300));

/* Dark mode variants */
@media (prefers-color-scheme: dark) {
  --skeleton-base: rgb(var(--pg-neutral-800));
  --skeleton-highlight: rgb(var(--pg-neutral-700));
}
```

### Implementation Notes
- Maintains consistent spacing with `gap-6` following our 4px base unit system
- Uses `size-full` for complete container coverage
- Implements proper loading state patterns with centered content
- Optimized for both standalone usage and integration with Suspense boundaries