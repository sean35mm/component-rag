# DetailsChart Component Documentation

## Purpose

The `DetailsChart` component is a comprehensive data visualization component that displays article count statistics over time for signals. It provides both bar chart visualization for regular data and specialized anomaly detection charts for signals with volume-based anomaly detection. The component includes header information with notification policies, interactive chart displays, and footer statistics.

## Component Type

**Client Component** - Uses `'use client'` directive because it:
- Manages interactive chart state and user interactions
- Uses browser-specific APIs through recharts library
- Implements responsive behavior with breakpoint hooks
- Handles chart animations and tooltips

## Props Interface

### DetailsChart Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `articleCountsData` | `IntervalArticleCounts[]` | ✅ | Array of article count data over time intervals |
| `signalNotificationCount` | `number` | ❌ | Number of notifications for badge configuration |
| `size` | `'lg' \| 'md' \| 'sm'` | ✅ | Chart size variant |
| `totalSourcesCount` | `number` | ❌ | Total number of sources for footer display |
| `totalArticles` | `number` | ❌ | Total article count (computed if not provided) |
| `notificationPolicyType` | `NotificationPolicyEnum` | ✅ | Type of notification policy for header display |
| `isAnomalySignal` | `boolean` | ❌ | Whether this is an anomaly detection signal |
| `anomalyThreshold` | `number` | ❌ | Threshold value for anomaly detection |
| `query` | `string \| null` | ❌ | Search query for anomaly signals |
| `queryTitle` | `string \| null` | ❌ | Display title for the query |
| `filters` | `FiltersState` | ❌ | Filter state for anomaly signals |
| `customizedDotProps` | `Partial<CustomizedDotProps>` | ❌ | Props for customizing header dot indicator |
| `titleTypographyProps` | `TypographyProps` | ❌ | Props for customizing title typography |
| `footerSize` | `'md' \| 'sm'` | ❌ | Footer size variant |
| `xAxisLine` | `boolean` | ❌ | Whether to show x-axis line |
| `className` | `string` | ❌ | Additional CSS classes |

### BarchartChart Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `data` | `IntervalArticleCounts[]` | ✅ | Article count data for chart |
| `chartSize` | `'xs' \| 'lg' \| 'sm' \| 'md'` | ❌ | Chart size (default: 'lg') |
| `xAxisLine` | `boolean` | ❌ | Show x-axis line (default: true) |

## Usage Example

```tsx
import { DetailsChart } from '@/components/signals/details/details-chart';
import { NotificationPolicyEnum } from '@/lib/types';

// Basic usage with article data
function SignalDetailsPage() {
  const articleData = [
    { date: '2024-01-01', numResults: 45 },
    { date: '2024-01-02', numResults: 32 },
    // ... more data
  ];

  return (
    <DetailsChart
      articleCountsData={articleData}
      size="lg"
      notificationPolicyType={NotificationPolicyEnum.SCHEDULED}
      signalNotificationCount={85}
      totalSourcesCount={12}
      footerSize="md"
      xAxisLine={true}
    />
  );
}

// Anomaly detection signal usage
function AnomalySignalChart() {
  return (
    <DetailsChart
      articleCountsData={articleData}
      size="md"
      notificationPolicyType={NotificationPolicyEnum.IMMEDIATE}
      isAnomalySignal={true}
      anomalyThreshold={2.5}
      query="breaking news election"
      queryTitle="Election Coverage"
      filters={{ sources: ['cnn', 'bbc'] }}
      customizedDotProps={{ color: 'red' }}
    />
  );
}

// Standalone bar chart
function SimpleChart() {
  return (
    <BarchartChart
      data={articleData}
      chartSize="sm"
      xAxisLine={false}
    />
  );
}
```

## Functionality

### Core Features
- **Dual Chart Types**: Bar charts for regular data, volume graph for anomaly signals
- **Responsive Design**: Adapts to different screen sizes and breakpoints
- **Interactive Tooltips**: Custom tooltips showing article counts and dates
- **Date Range Handling**: Automatically fills missing dates in 30-day range
- **Badge Configuration**: Dynamic notification level badges (LOW/NORMAL/HIGH)
- **Flexible Sizing**: Multiple size variants for different contexts

### Chart Behaviors
- **Date Normalization**: Handles timezone offsets for consistent date display
- **Gap Filling**: Creates complete 30-day dataset with zero values for missing dates
- **Custom Axis Ticks**: Shows only start and end dates for cleaner display
- **Hover States**: Interactive bars with color changes on hover

## State Management

### Local State
- **Computed Values**: Uses `useMemo` for expensive calculations like totals and date ranges
- **Responsive State**: Leverages `useBreakpoint` hook for mobile/desktop adaptations
- **Chart Configuration**: Memoized chart settings and badge configurations

### Data Flow
```typescript
// Article data processing
const totalArticles = useMemo(() => {
  return articleCountsData.reduce((sum, item) => sum + item.numResults, 0);
}, [articleCountsData]);

// Badge configuration
const badgeConfig = useMemo(
  () => notificationCount !== undefined && getBadgeConfig(notificationCount),
  [notificationCount]
);
```

## Side Effects

### Date Processing
- Timezone offset calculations for consistent date handling
- Date range generation for complete 30-day intervals
- Format transformations for chart display

### No External API Calls
- Component is purely presentational with provided data
- No direct server state management

## Dependencies

### Core Dependencies
- **recharts**: Chart rendering and interactions
- **date-fns**: Date manipulation and formatting
- **pluralize**: Text pluralization utilities

### Internal Dependencies
- `@/components/hooks/use-breakpoint`: Responsive behavior
- `@/components/ui/chart`: Chart container and tooltip components
- `@/components/ui/typography`: Text styling
- `@/components/story/stats/customized-dot`: Dot indicators
- `@/lib/utils/signal`: Anomaly detection utilities

### Utility Functions
```typescript
// Exported utility
export function getBadgeConfig(total: number) {
  if (total <= 60) return { label: 'LOW', color: 'yellow' };
  if (total <= 300) return { label: 'NORMAL', color: 'blue' };
  return { label: 'HIGH', color: 'red' };
}
```

## Integration

### Signal Management System
- Integrates with signal creation and monitoring workflows
- Supports both scheduled and immediate notification policies
- Handles anomaly detection visualization

### Data Pipeline
```
Signal Data → DetailsChart → [Bar Chart | Anomaly Chart] → User Insights
```

### Component Composition
- **Header**: Notification badges and article counts
- **Chart Area**: Interactive visualization
- **Footer**: Summary statistics and source counts

## Best Practices

### Architecture Adherence
✅ **Proper Client Component Usage**: Uses client directive only for interactive chart functionality  
✅ **Component Decomposition**: Well-separated concerns with ChartHeader, BarchartChart, and ChartFooter  
✅ **Props Interface**: Clean, typed interfaces for all components  
✅ **Reusable Components**: Leverages UI components from /ui/ directory  

### Performance Optimizations
✅ **Memoization**: Expensive calculations memoized with useMemo  
✅ **Conditional Rendering**: Efficient chart type switching  
✅ **Responsive Design**: Breakpoint-based adaptations  

### Code Organization
✅ **Named Exports**: Multiple focused exports for different use cases  
✅ **Type Safety**: Comprehensive TypeScript interfaces  
✅ **Utility Functions**: Reusable badge configuration logic  

### Integration Patterns
✅ **Flexible Sizing**: Supports multiple size variants for different contexts  
✅ **Customization Props**: Allows styling and behavior customization  
✅ **Fallback Handling**: Graceful handling of missing optional data  

This component exemplifies proper separation of concerns while providing a rich, interactive data visualization experience within the signal management system.