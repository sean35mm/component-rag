# ChartSkeleton

## Purpose

`ChartSkeleton` is a loading placeholder component designed to mimic the visual structure of chart components while data is being fetched. It provides visual continuity and improved user experience by showing familiar chart-like skeleton elements during loading states, preventing layout shifts and giving users immediate feedback that content is being loaded.

## Component Type

**Server Component** - This is a pure presentational component that renders static skeleton elements without any client-side interactivity, event handlers, or dynamic state. It can be safely rendered on the server as it only displays loading placeholders.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `size` | `'md' \| 'sm'` | No | `'md'` | Controls the height of the chart skeleton area on large screens |
| `className` | `string` | No | `undefined` | Additional CSS classes to apply to the root Card component |

## Usage Example

```tsx
import { ChartSkeleton } from '@/components/signals/details/chart-skeleton';

// Basic usage with default medium size
function SignalDetailsPage() {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ['signal-chart', signalId],
    queryFn: () => fetchSignalChart(signalId),
  });

  return (
    <div className="grid gap-4">
      {isLoading ? (
        <ChartSkeleton />
      ) : (
        <SignalChart data={chartData} />
      )}
    </div>
  );
}

// Small size variant for compact layouts
function DashboardWidget() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <ChartSkeleton size="sm" />
      <ChartSkeleton size="sm" className="border-dashed" />
    </div>
  );
}

// Custom styling
function CustomChart() {
  const { isLoading } = useSignalChart();
  
  return isLoading ? (
    <ChartSkeleton 
      size="md" 
      className="shadow-lg rounded-lg border-2" 
    />
  ) : (
    <ActualChart />
  );
}
```

## Functionality

- **Visual Hierarchy**: Renders skeleton elements that match typical chart component structure (header with title/subtitle, main chart area, footer with labels)
- **Responsive Sizing**: Provides two size variants (`sm`, `md`) that adjust chart area height on large screens while maintaining full width
- **Consistent Layout**: Uses Card wrapper to match the visual container of actual chart components
- **Loading Animation**: Leverages the base `Skeleton` component's built-in shimmer animation
- **Flexible Styling**: Accepts custom className for additional styling while maintaining base layout structure

## State Management

This component is **stateless** and does not manage any state. It's a pure presentational component that renders based solely on the props provided. Loading state management should be handled by parent components using:

- **TanStack Query**: For data fetching and loading states
- **Zustand**: For global loading states if needed
- **Local state**: For component-specific loading states

## Side Effects

**None** - This component has no side effects, API calls, or external interactions. It's a pure rendering component focused solely on displaying loading placeholders.

## Dependencies

### Internal Dependencies
- `@/components/ui/card` - Provides Card, CardContent, CardHeader for layout structure
- `@/components/ui/skeleton` - Base skeleton component with loading animation
- `@/lib/utils/cn` - Utility for conditional className merging

### External Dependencies
- `class-variance-authority` - For type-safe variant-based styling
- Base Tailwind CSS classes for responsive design and spacing

## Integration

This component fits into the signals feature domain within the larger application architecture:

```
src/components/signals/details/
├── chart-skeleton.tsx     # Loading placeholder
├── signal-chart.tsx       # Actual chart component
└── signal-details.tsx     # Parent container
```

**Integration Patterns:**
- **Loading States**: Used as fallback component while TanStack Query fetches chart data
- **Dashboard Widgets**: Provides consistent loading experience across different chart sizes
- **Feature Consistency**: Maintains visual consistency within the signals domain
- **Layout Stability**: Prevents layout shifts by matching the dimensions of actual chart components

## Best Practices

✅ **Follows Architecture Guidelines:**
- **Server Component**: Appropriately used as a stateless presentational component
- **Component Decomposition**: Single responsibility (loading placeholder), composes well with other components
- **Reusability**: Located in feature domain (`signals/details/`) rather than global `/ui/` as it's specific to chart loading patterns
- **Flat Structure**: Simple, non-nested component structure

✅ **Implementation Best Practices:**
- Uses `cva` for type-safe variant management
- Leverages existing UI components (Card, Skeleton) for consistency
- Provides sensible defaults while allowing customization
- Responsive design with mobile-first approach
- Clear prop interface with TypeScript support

✅ **Usage Patterns:**
- Pair with TanStack Query loading states for optimal UX
- Use appropriate size variants based on layout context
- Apply consistent styling with actual chart components
- Consider using in dashboard grids and detail views where charts are expected