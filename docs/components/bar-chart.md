# BarChart Component

## Purpose

The `BarChart` component is a specialized data visualization component designed for displaying article count data over time intervals within the anomaly detection feature. It provides an interactive bar chart with customizable sizing and hover tooltips, enabling users to visualize temporal patterns in article data for signal creation and analysis.

## Component Type

**Client Component** - Uses the `'use client'` directive (implied through hooks usage). This is necessary because:
- Uses the `useMemo` hook for data transformation
- Integrates with Recharts library which requires client-side rendering
- Handles interactive features like tooltips and hover states
- Manages chart animations and user interactions

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `data` | `IntervalArticleCounts[]` | Yes | - | Array of article count data with date intervals |
| `size` | `'lg' \| 'md' \| 'sm' \| 'xs'` | No | `'lg'` | Controls the maximum height of the chart container |

### Type Definitions

```tsx
interface IntervalArticleCounts {
  date: string;
  numResults?: number;
}
```

## Usage Example

```tsx
import { BarChart } from '@/components/signals/creation/anomaly-detection/bar-chart';

// Basic usage with article count data
function AnomalyDetectionPanel() {
  const articleData: IntervalArticleCounts[] = [
    { date: '2024-01-01', numResults: 45 },
    { date: '2024-01-02', numResults: 67 },
    { date: '2024-01-03', numResults: 23 },
    { date: '2024-01-04', numResults: 89 }
  ];

  return (
    <div className="space-y-4">
      <h3>Article Volume Over Time</h3>
      <BarChart 
        data={articleData} 
        size="lg" 
      />
    </div>
  );
}

// Different size variants
function CompactView() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <BarChart data={articleData} size="md" />
      <BarChart data={articleData} size="sm" />
    </div>
  );
}

// Integration with loading states
function ChartWithData({ intervalData }: { intervalData?: IntervalArticleCounts[] }) {
  if (!intervalData) {
    return <div className="animate-pulse bg-gray-200 h-[250px] rounded" />;
  }

  return <BarChart data={intervalData} size="lg" />;
}
```

## Functionality

### Core Features
- **Data Visualization**: Renders article count data as interactive bar charts
- **Responsive Sizing**: Four size variants (xs, sm, md, lg) with different maximum heights
- **Interactive Tooltips**: Custom tooltip component showing detailed information on hover
- **Hover Effects**: Active bar highlighting with custom styling
- **Data Transformation**: Automatic mapping of `IntervalArticleCounts` to chart-compatible format

### Visual Specifications
- **Bar Styling**: 70px bar width, 2px border radius
- **Color Scheme**: Base fill uses CSS custom property `--color-pg-state-faded-base`
- **Active State**: Sapphire blue highlight (`--color-pg-sapphire-500`) on hover
- **Animation**: Disabled for performance (`isAnimationActive={false}`)

## State Management

**Local State Only** - The component uses:
- `useMemo` hook for memoized data transformation
- No external state management required
- Data is passed down as props from parent components
- Follows our pattern of keeping chart components stateless and data-driven

## Side Effects

**Minimal Side Effects**:
- Data transformation through `useMemo` (runs when `articleCountsData` changes)
- No API calls or external data fetching
- No DOM manipulation outside of Recharts rendering
- No localStorage or session storage interactions

## Dependencies

### Internal Dependencies
- `@/components/search/results-over-time` - CustomTooltip component
- `@/components/ui/chart` - ChartContainer and ChartTooltip components
- `@/lib/types` - IntervalArticleCounts type definition

### External Dependencies
- `class-variance-authority` - For variant-based styling
- `recharts` - Bar chart rendering (Bar, BarChart, Rectangle)
- `react` - useMemo hook

### Styling Dependencies
- CSS custom properties for theming
- Tailwind CSS classes via chartVariants

## Integration

### Application Architecture Role
```
Anomaly Detection Feature
├── Signal Creation Flow
│   ├── Data Collection
│   ├── Visualization Layer ← BarChart Component
│   └── Analysis Tools
└── Configuration Panels
```

### Data Flow Integration
1. **Parent Component** fetches `IntervalArticleCounts[]` data
2. **BarChart** transforms data for Recharts consumption
3. **Recharts** renders interactive visualization
4. **CustomTooltip** provides detailed hover information

### Feature Context
- Part of the anomaly detection signal creation workflow
- Enables visual analysis of article volume patterns
- Supports identification of unusual spikes or drops in content
- Integrates with broader signals management system

## Best Practices

### Architecture Adherence
✅ **Flat Component Structure**: Single-purpose visualization component  
✅ **Reusable Design**: Size variants enable use across different contexts  
✅ **Type Safety**: Full TypeScript integration with proper prop types  
✅ **Performance**: Memoized data transformation and disabled animations  

### Usage Guidelines
- **Data Validation**: Ensure `IntervalArticleCounts[]` data is properly formatted
- **Size Selection**: Choose appropriate size variant based on available space
- **Loading States**: Implement loading indicators while data is being fetched
- **Error Boundaries**: Wrap in error boundaries for robust error handling

### Performance Considerations
- Data transformation is memoized to prevent unnecessary recalculations
- Animations disabled for smoother performance with large datasets
- Minimal re-renders through proper prop dependency management