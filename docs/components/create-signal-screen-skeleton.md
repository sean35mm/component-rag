# CreateSignalScreenSkeleton

## Purpose

The `CreateSignalScreenSkeleton` component provides a loading placeholder for the signal creation screen. It displays animated skeleton elements that mirror the layout and structure of the actual create signal interface, giving users visual feedback while the real content is loading.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| - | - | - | - | This component accepts no props |

## Usage Example

```tsx
import { CreateSignalScreenSkeleton } from '@/components/ui/skeletons/create-signal-screen-skeleton';

export function CreateSignalPage() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <CreateSignalScreenSkeleton />;
  }

  return (
    <div className="flex size-full flex-col items-center justify-center">
      {/* Actual create signal content */}
    </div>
  );
}
```

## Design System Usage

### Layout & Spacing
- **Container**: Uses `size-full` (100% width/height) with centered content layout
- **Spacing**: Consistent gap spacing using `gap-8`, `gap-12`, `gap-4`, and `gap-3`
- **Padding**: Top padding of `pt-16` (64px) for proper screen positioning
- **Max Width**: Constrains content to `max-w-[544px]` for optimal reading width

### Skeleton Elements
- **Title Skeleton**: `h-6 w-full` - Represents main heading (24px height)
- **Subtitle Skeleton**: `h-4 w-3/4` - Represents description text (16px height, 75% width)
- **Input Skeleton**: `h-12 w-full rounded-full` - Represents search/input field (48px height)
- **Button Skeletons**: `h-10 w-[136px] rounded-xl` - Represents action buttons (40px height, 136px width)

### Border Radius
- **Rounded Full**: Applied to input skeleton for pill-shaped appearance
- **Rounded XL**: Applied to button skeletons for modern, friendly appearance

## Styling

### Z-Index Layering
- Uses `z-50` on container elements to ensure skeleton appears above other content during loading states

### Flexbox Layout
- **Direction**: Column-based layout (`flex-col`) for vertical stacking
- **Alignment**: Centered both horizontally and vertically (`items-center justify-center`)
- **Sizing**: Full-size containers with constrained max-width for content

### Skeleton Variants
The component uses different skeleton sizes to represent various UI elements:
- **Full-width elements**: Title and input field
- **Partial-width elements**: Subtitle (75% width)
- **Fixed-width elements**: Action buttons (136px each)

## Responsive Design

### Breakpoint Behavior
- **Mobile (< 640px)**: Full-width layout with responsive padding
- **Tablet (≥ 768px)**: Maintains centered layout with max-width constraint
- **Desktop (≥ 1024px)**: Optimal viewing with consistent spacing and proportions

### Responsive Considerations
- Content automatically adapts to screen width while maintaining readability
- Skeleton elements scale proportionally on different screen sizes
- Button skeletons maintain fixed width for consistent interaction expectations

## Accessibility

### Loading State Communication
- Skeleton provides visual indication of loading state
- Consistent layout prevents content jumping when real content loads
- Maintains spatial relationships between UI elements

### Screen Reader Considerations
- Consider adding `aria-label="Loading create signal form"` to the container
- The `Skeleton` component should include appropriate ARIA attributes for loading states
- Ensure proper focus management when transitioning from skeleton to real content

### Recommendations
```tsx
// Enhanced accessibility example
<div 
  className='z-50 flex size-full flex-col items-center justify-center gap-8 pt-16'
  aria-label="Loading create signal form"
  role="status"
>
  {/* skeleton content */}
</div>
```

## Dependencies

### Internal Components
- **`Skeleton`**: Base skeleton component from `@/components/ui/skeleton`
- **`SuggestionTemplatesSkeleton`**: Specialized skeleton for suggestion templates from `@/components/signals/creation/suggestion-templates/suggestion-templates-skeleton`

### Design System Dependencies
- **Tailwind CSS**: For layout, spacing, and responsive utilities
- **CSS Variables**: Inherits theme colors and spacing from design system
- **Typography System**: Aligns with design system spacing and sizing conventions

### Component Hierarchy
```
CreateSignalScreenSkeleton
├── Skeleton (title)
├── Skeleton (subtitle)
├── Skeleton (input field)
├── Skeleton (buttons) × 2
└── SuggestionTemplatesSkeleton
```

The component follows the design system's loading state patterns and maintains consistency with the overall signal creation workflow.