# VolumeChart Component

## Purpose
A specialized chart component that visualizes article volume data over time intervals for anomaly detection signals. It displays article counts as a bar chart with skeleton loading states to provide immediate visual feedback during data fetching operations.

## Component Type
**Client Component** - Uses interactive chart rendering and conditional state-based UI updates that require client-side JavaScript execution.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `articleIntervalData` | `IntervalArticleCounts[]` | ✅ | Array of article count data organized by time intervals |
| `isFetching` | `boolean` | ❌ | Loading state indicator that triggers skeleton display when true |

## Usage Example

```tsx
import { VolumeChart } from '@/components/signals/creation/anomaly-detection/volume-chart';
import { useQuery } from '@tanstack/react-query';

function AnomalyDetectionDashboard() {
  const { data: articleData, isFetching } = useQuery({
    queryKey: ['article-intervals', signalId],
    queryFn: () => fetchArticleIntervals(signalId),
  });

  return (
    <div className="space-y-4">
      <h3>Article Volume Analysis</h3>
      <VolumeChart 
        articleIntervalData={articleData ?? []}
        isFetching={isFetching}
      />
    </div>
  );
}
```

## Functionality

### Core Features
- **Data Visualization**: Renders article volume data as an interactive bar chart
- **Loading States**: Displays animated skeleton placeholders during data fetching
- **Responsive Design**: Adapts to container width while maintaining fixed height
- **Dark Mode Support**: Skeleton components respond to theme changes

### Loading Behavior
- Shows `VolumeChartSkeleton` when `isFetching` is true
- Skeleton displays 12 randomized bars with pulse animation
- Seamlessly transitions to actual data visualization when loading completes

## State Management
**External State Dependency** - This component is stateless and relies on:
- **TanStack Query**: Parent components typically provide `articleIntervalData` and `isFetching` from query hooks
- **Props-driven**: All state is managed externally and passed down as props

## Side Effects
**None** - This is a pure presentation component with no side effects, API calls, or external mutations.

## Dependencies

### Internal Dependencies
- `@/lib/types` - `IntervalArticleCounts` type definition
- `./bar-chart` - `BarChart` component for actual data rendering

### External Dependencies
- React for component lifecycle and rendering
- Tailwind CSS classes for styling and animations

## Integration

### Application Architecture Role
```
Anomaly Detection Feature
├── Signal Creation Flow
│   ├── Volume Analysis Step
│   │   ├── VolumeChart ← Current Component
│   │   ├── VolumeBarChart (rendering)
│   │   └── VolumeChartSkeleton (loading)
│   └── Other Analysis Components
```

### Data Flow
1. Parent component fetches `IntervalArticleCounts[]` via TanStack Query
2. Loading state (`isFetching`) passed to VolumeChart
3. Component conditionally renders skeleton or actual chart
4. VolumeBarChart handles final data visualization

## Best Practices

### ✅ Architectural Adherence
- **Component Decomposition**: Clean separation between skeleton, main component, and chart rendering
- **Reusability**: Generic enough for any interval-based article volume data
- **State Management**: Follows external state pattern with TanStack Query integration
- **Loading UX**: Provides immediate feedback with skeleton states

### ✅ Implementation Patterns
- **Conditional Rendering**: Clear loading state management
- **Type Safety**: Proper TypeScript interfaces for all props
- **Performance**: Minimal re-renders through props-only state management
- **Accessibility**: Semantic HTML structure with proper ARIA considerations

### 🎯 Usage Recommendations
```tsx
// Recommended: Use with TanStack Query
const { data, isFetching } = useArticleIntervalsQuery(signalId);
return <VolumeChart articleIntervalData={data} isFetching={isFetching} />;

// Avoid: Manual state management
const [loading, setLoading] = useState(true); // Use TanStack Query instead
```

## Exports
- `SKELETON_DATA` - Static data array for skeleton chart generation
- `VolumeChartSkeleton` - Loading state component
- `VolumeChart` - Main chart component (default export)