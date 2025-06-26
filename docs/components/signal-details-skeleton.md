# SignalDetailsSkeleton Component

## Purpose
The `SignalDetailsSkeleton` component provides a loading placeholder that mimics the structure and layout of a signal details page. It displays skeleton elements while signal data is being fetched, ensuring a smooth user experience by maintaining visual consistency and preventing layout shifts during loading states.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| *No props* | - | - | - | This component accepts no props and renders a fixed skeleton layout |

## Usage Example

```tsx
import { SignalDetailsSkeleton } from '@/components/ui/skeletons/signal-details-skeleton';

// Basic usage during data loading
function SignalDetailsPage() {
  const { signal, isLoading } = useSignalData(signalId);

  if (isLoading) {
    return <SignalDetailsSkeleton />;
  }

  return <SignalDetailsContent signal={signal} />;
}

// Usage in a suspense boundary
function SignalDetailsWrapper() {
  return (
    <Suspense fallback={<SignalDetailsSkeleton />}>
      <SignalDetailsContent />
    </Suspense>
  );
}
```

## Design System Usage

### Layout & Spacing
- **Container**: `w-screen lg:w-full` - Full screen width on mobile, contained on desktop
- **Padding**: `p-2 lg:p-8` - 8px mobile padding, 32px desktop padding
- **Gaps**: `space-y-6`, `gap-4`, `gap-8` - Consistent spacing using 4px base unit

### Background Colors
- **Translucent Background**: `bg-pgBackgroundAlphaTranslucent` - Semi-transparent background for query section
- **Border**: `border` - Default stroke color from design system

### Responsive Design
- **Breakpoint**: `lg:` prefix for 1024px+ screens
- **Layout Direction**: `flex-col lg:flex-row` - Stack vertically on mobile, horizontal on desktop
- **Visibility**: `hidden lg:flex` - Hide metadata section on mobile

## Styling

### Skeleton Dimensions
```tsx
// Header elements
<Skeleton className='h-4 w-12' />          // Back button
<Skeleton className='h-52 w-full lg:h-64 lg:w-[29rem]' /> // Signal icon

// Metadata elements  
<Skeleton className='h-4 w-24' />          // Labels
<Skeleton className='h-4 w-32' />          // Values
<Skeleton className='h-8 w-20 rounded-lg' /> // Status badge

// Tab elements
<Skeleton className='h-8 w-28' />          // Tab buttons

// Query section
<Skeleton className='h-5 w-16' />          // Section label
<Skeleton className='size-8' />            // Icon button
<Skeleton className='h-8 w-full' />        // Query inputs
```

### Container Layouts
- **Main Container**: Flexbox column with responsive padding
- **Header Section**: Responsive flex layout (column → row)
- **Content Section**: Adaptive height with responsive flex direction
- **Query Panel**: Fixed structure with consistent internal spacing

## Responsive Design

### Mobile (< 1024px)
- Full screen width (`w-screen`)
- Vertical layout (`flex-col`)
- Compact padding (`p-2`)
- Hidden metadata section
- Reduced component heights (`h-[200px]`)

### Desktop (≥ 1024px)
- Contained width (`lg:w-full`)
- Horizontal layouts (`lg:flex-row`)
- Generous padding (`lg:p-8`)
- Visible metadata section (`lg:flex`)
- Expanded heights (`lg:h-[400px]`, `lg:h-64`)

### Responsive Breakpoints
```css
lg: 1024px  /* Primary breakpoint for layout changes */
```

## Accessibility

### Loading State Indicators
- **Semantic Structure**: Maintains logical DOM structure for screen readers
- **Skeleton Animation**: Base `Skeleton` component provides loading animation
- **Focus Management**: No interactive elements during loading state
- **Content Hierarchy**: Preserves visual hierarchy with appropriate spacing

### Considerations
- Consider adding `aria-label="Loading signal details"` to main container
- The component should be wrapped with appropriate loading announcements
- Ensure parent components manage focus correctly when transitioning from skeleton to content

## Dependencies

### Internal Components
- **`Skeleton`** - `@/components/ui/skeleton`
  - Base skeleton component providing loading animation
  - Handles sizing and visual appearance

- **`ChartSkeleton`** - `@/components/signals/details/chart-skeleton`
  - Specialized skeleton for chart visualization
  - Maintains chart-specific proportions and layout

### Design System Dependencies
- **Color Variables**: `pgBackgroundAlphaTranslucent`, `pgStroke` variants
- **Spacing System**: Tailwind spacing scale (gap-4, gap-8, space-y-6)
- **Responsive Utilities**: Tailwind responsive prefixes (lg:)
- **Layout Utilities**: Flexbox utilities, sizing utilities

### Usage Context
This component is typically used in:
- Signal detail pages during initial load
- Navigation between signals
- Refresh operations
- Error recovery scenarios where data needs to be refetched