# SignalPageSkeleton Component

## Purpose

The `SignalPageSkeleton` component provides a loading placeholder that mimics the structure of a signal page while content is being fetched. It displays skeleton elements in place of the actual content, maintaining the visual layout and improving perceived performance during loading states.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| - | - | - | - | This component accepts no props |

## Usage Example

```tsx
import { SignalPageSkeleton } from '@/components/ui/skeletons/signal-page-skeleton';

// Basic usage in a page component
function SignalPage() {
  const [isLoading, setIsLoading] = useState(true);
  
  if (isLoading) {
    return <SignalPageSkeleton />;
  }
  
  return (
    <div className="flex w-full flex-col gap-4 px-5 py-4">
      {/* Actual signal page content */}
    </div>
  );
}

// Usage in a conditional render
function SignalDashboard({ data, loading }) {
  return (
    <div className="min-h-screen bg-pgBackground-50 dark:bg-pgBackground-900">
      {loading ? (
        <SignalPageSkeleton />
      ) : (
        <SignalContent data={data} />
      )}
    </div>
  );
}
```

## Design System Usage

### Layout Classes
- **Container**: `flex w-full flex-col gap-4 px-5 py-4` - Full-width flexible column with consistent spacing
- **Header Layout**: `flex w-full justify-between` - Horizontal layout with space-between distribution
- **Grid System**: `grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4` - Responsive grid layout

### Spacing Tokens
- **Padding**: `px-5 py-4` - Horizontal padding of 20px, vertical padding of 16px
- **Gaps**: `gap-4`, `gap-6`, `gap-2` - Consistent spacing using 4px base unit (16px, 24px, 8px)

### Sizing Utilities
- **Fixed Dimensions**: `h-8 w-24`, `h-10 w-32`, `size-5` - Specific sizing for skeleton elements
- **Responsive Sizing**: `h-40 w-full`, `w-3/4`, `w-1/2` - Proportional sizing for content areas

## Styling

### Skeleton Dimensions
- **Header Elements**: 
  - Back button: `h-8 w-24` (32px × 96px)
  - Action button: `h-10 w-32` (40px × 128px)
- **Icon and Label**: 
  - Icon: `size-5` (20px × 20px)
  - Label: `h-5 w-32` (20px × 128px)
- **Content Cards**:
  - Main area: `h-40 w-full` (160px height, full width)
  - Title: `h-6 w-3/4` (24px height, 75% width)
  - Subtitle: `h-4 w-1/2` (16px height, 50% width)

### Visual States
The component inherits skeleton styling from the base `Skeleton` component, which typically includes:
- Subtle background color using `pgNeutral-100/pgNeutral-800` (light/dark mode)
- Shimmer animation effect
- Rounded corners for visual consistency

## Responsive Design

The component adapts across our design system breakpoints:

| Breakpoint | Grid Columns | Behavior |
|------------|--------------|----------|
| **Default** (< 640px) | 1 column | Single column layout for mobile |
| **sm** (≥ 640px) | 2 columns | Two-column grid for small tablets |
| **md** (≥ 768px) | 3 columns | Three-column grid for tablets |
| **lg** (≥ 1024px) | 4 columns | Four-column grid for desktop |

The responsive grid uses our standard breakpoint system:
```tsx
className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
```

## Accessibility

### Loading State Indicators
- The skeleton provides visual feedback during loading states
- Consider adding `aria-busy="true"` to parent containers when showing skeleton
- Ensure proper focus management when transitioning from skeleton to actual content

### Screen Reader Considerations
```tsx
// Recommended usage with accessibility
<div aria-busy={isLoading} aria-label="Loading signal data">
  {isLoading ? (
    <SignalPageSkeleton />
  ) : (
    <SignalContent data={data} />
  )}
</div>
```

### Best Practices
- Keep skeleton duration reasonable (typically 1-3 seconds)
- Ensure skeleton dimensions closely match actual content
- Provide alternative loading indicators for users who prefer reduced motion

## Dependencies

### Internal Components
- **`Skeleton`** (`@/components/ui/skeleton`) - Base skeleton component that provides the shimmer animation and styling

### Design System Dependencies
- **Tailwind CSS** - Layout, spacing, and responsive utilities
- **CSS Variables** - Color tokens (inherited from Skeleton component)
- **Responsive Grid System** - Our standard breakpoint definitions

### Usage with Related Components
```tsx
// Often used alongside other loading states
import { SignalPageSkeleton } from '@/components/ui/skeletons/signal-page-skeleton';
import { CardSkeleton } from '@/components/ui/skeletons/card-skeleton';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

// Can be combined with error boundaries
import { ErrorBoundary } from '@/components/ui/error-boundary';
```

## Implementation Notes

- The component renders 8 skeleton cards by default using `[...Array(8)].map()`
- Each skeleton card maintains consistent proportions with actual content
- The layout structure mirrors the actual signal page for seamless transition
- No props are required, making it simple to implement in loading states