# ToolsScreenFallback

## Purpose

The `ToolsScreenFallback` component provides a comprehensive skeleton loading state for the tools screen interface. It mimics the layout and structure of the actual tools screen, including header tabs, main content areas with usage statistics, and a sidebar with API key management and documentation resources. This component enhances perceived performance by providing visual feedback during data loading states.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| - | - | - | - | This component accepts no props |

## Usage Example

```tsx
import { ToolsScreenFallback } from '@/components/ui/skeletons/tools-screen-fallback';

// Basic usage in a loading state
function ToolsPage() {
  const { data, isLoading } = useToolsData();
  
  if (isLoading) {
    return <ToolsScreenFallback />;
  }
  
  return <ToolsContent data={data} />;
}

// Usage with Suspense boundary
function ToolsApp() {
  return (
    <Suspense fallback={<ToolsScreenFallback />}>
      <ToolsPage />
    </Suspense>
  );
}

// Usage in conditional rendering
function Dashboard() {
  const [isToolsLoading, setIsToolsLoading] = useState(true);
  
  return (
    <div className="min-h-screen bg-pgBackground-0 dark:bg-pgBackground-950">
      {isToolsLoading ? (
        <ToolsScreenFallback />
      ) : (
        <ToolsScreen />
      )}
    </div>
  );
}
```

## Design System Usage

### Layout & Structure
- **Container**: Uses `min-h-screen` for full viewport height
- **Responsive Grid**: Implements `lg:flex-row` with `lg:w-2/3` and `lg:w-1/3` split
- **Spacing**: Consistent padding with `p-4`, `p-6` following 4px base unit
- **Borders**: Utilizes `border`, `border-b`, and `rounded-lg` for visual hierarchy

### Typography Skeleton Patterns
- **Section Headers**: `h-6` height mimicking `.typography-titleH6` or `.typography-labelLarge`
- **Navigation Elements**: `h-8` height for tab-like elements
- **Body Text**: `h-4` and `h-5` heights representing paragraph and label text
- **Descriptive Text**: `h-4` with `opacity-50` for secondary information

### Color Integration
- **Skeleton Base**: Inherits from `Skeleton` component using neutral color palette
- **Border Colors**: Uses default `border` class (pgStroke-200/pgStroke-800)
- **Background**: Adapts to `pgBackground` color scheme in dark/light modes

## Styling

### Visual Hierarchy
```tsx
// Main sections use rounded borders
<div className='rounded-lg border p-6'>

// Grid layouts for data visualization
<div className='mt-6 grid grid-cols-4 gap-2 lg:grid-cols-7'>

// Flexible content areas
<div className='h-4 flex-1'> // Adapts to available space
```

### Skeleton Variants
- **Text Skeletons**: Various heights (`h-4`, `h-5`, `h-6`, `h-8`) for different text types
- **Shape Skeletons**: `size-3 rounded-full`, `size-5`, `size-10 rounded-lg` for icons/avatars
- **Layout Skeletons**: `h-20 w-full` for chart/graph placeholders
- **Progress Indicators**: `h-2 flex-1` for usage bars

### Opacity States
- **Primary Content**: Default opacity (100%)
- **Secondary Content**: `opacity-50` for less important information

## Responsive Design

### Breakpoint Adaptations

#### Mobile (< 1024px)
- **Layout**: Stacked vertical layout with `flex-col`
- **Sidebar**: Hidden with `hidden lg:block`
- **Grid**: Reduced columns `grid-cols-4` for mobile optimization
- **Spacing**: Maintains consistent `p-6` padding

#### Desktop (≥ 1024px)
- **Layout**: Horizontal split with `lg:flex-row`
- **Main Content**: `lg:w-2/3` (66.67% width)
- **Sidebar**: `lg:w-1/3` (33.33% width) with `lg:block`
- **Grid**: Expanded to `lg:grid-cols-7` for better data visualization

### Responsive Grid Patterns
```tsx
// Adaptive grid system
<div className='mt-6 grid grid-cols-4 gap-2 lg:grid-cols-7'>
  {[...Array(12)].map((_, i) => (
    <Skeleton key={i} className='h-20 w-full shrink-0' />
  ))}
</div>
```

## Accessibility

### Loading State Communication
- **Screen Readers**: Inherits accessibility features from base `Skeleton` component
- **Visual Feedback**: Provides clear visual indication of loading state
- **Semantic Structure**: Maintains proper document flow and hierarchy

### Keyboard Navigation
- **Non-interactive**: Component doesn't interfere with keyboard navigation
- **Focus Management**: Doesn't trap or redirect focus during loading

### Color Accessibility
- **High Contrast**: Skeleton animations work in both light and dark modes
- **Reduced Motion**: Respects `prefers-reduced-motion` settings through base Skeleton component

## Dependencies

### Internal Components
- **Skeleton**: `@/components/ui/skeleton` - Base skeleton animation component

### Design System Dependencies
- **Color System**: pgStroke, pgBackground, pgNeutral color tokens
- **Spacing System**: Tailwind spacing utilities (p-4, p-6, gap-2, gap-4)
- **Layout System**: Flexbox and grid utilities
- **Border System**: rounded-lg, border utilities

### Tailwind Utilities
- **Layout**: `min-h-screen`, `flex`, `grid`, `space-y-*`
- **Responsive**: `lg:*` breakpoint prefixes
- **Sizing**: `w-*`, `h-*`, `size-*` utilities
- **Spacing**: `p-*`, `m-*`, `gap-*` utilities
- **Visual**: `border`, `rounded-*`, `opacity-*` utilities

### Usage Patterns
```tsx
// Recommended usage with error boundaries
<ErrorBoundary fallback={<ErrorFallback />}>
  <Suspense fallback={<ToolsScreenFallback />}>
    <ToolsScreen />
  </Suspense>
</ErrorBoundary>
```

This component serves as a comprehensive loading state that maintains visual consistency with the actual tools screen while providing smooth transitions and proper responsive behavior across all device sizes.