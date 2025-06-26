# VolumeGraphChart Component

## Purpose

The `VolumeGraphChart` component provides an interactive volume visualization for anomaly detection in signal creation. It displays article volume data over a 30-day period with an adjustable threshold marker that allows users to set volume sensitivity levels for anomaly detection. The component combines real-time data fetching, statistical analysis, and interactive controls to help users configure volume-based signal parameters.

## Component Type

**Client Component** - Uses the `'use client'` directive (implied by hooks usage) because it requires:
- Interactive state management with callbacks
- Real-time data fetching with TanStack Query
- DOM manipulation for the draggable threshold marker
- Complex client-side calculations and memoization

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `position` | `number` | ✅ | Current threshold position multiplier value |
| `onPositionChange` | `(percentage: number) => void` | ❌ | Callback fired when threshold position changes |
| `allowGrabber` | `boolean` | ❌ | Whether the threshold marker can be dragged |
| `readOnly` | `boolean` | ❌ | Disables interaction when true (default: false) |
| `query` | `string \| null` | ✅ | Search query for filtering articles |
| `queryTitle` | `string \| null` | ✅ | Display title for the query |
| `filters` | `FiltersState \| null` | ✅ | Additional filters to apply to data |
| `showThreshold` | `boolean` | ❌ | Whether to display threshold multiplier value (default: false) |

## Usage Example

```tsx
import { VolumeGraphChart } from '@/components/signals/creation/anomaly-detection/volume-graph-chart';

function AnomalyDetectionForm() {
  const [thresholdPosition, setThresholdPosition] = useState(1.5);
  const [filters, setFilters] = useState<FiltersState>({
    sources: ['news', 'social'],
    languages: ['en']
  });

  const handleThresholdChange = (percentage: number) => {
    setThresholdPosition(percentage);
    // Update signal configuration
  };

  return (
    <div className="space-y-4">
      <h3>Volume Threshold Configuration</h3>
      <VolumeGraphChart
        position={thresholdPosition}
        onPositionChange={handleThresholdChange}
        allowGrabber={true}
        readOnly={false}
        query="technology trends"
        queryTitle="Tech Industry Monitoring"
        filters={filters}
        showThreshold={true}
      />
    </div>
  );
}
```

## Functionality

### Core Features
- **Volume Data Visualization**: Displays 30-day article volume trends as a bar chart
- **Interactive Threshold Control**: Draggable marker for setting anomaly detection sensitivity
- **Statistical Analysis**: Calculates and displays average and median articles per hour
- **Date Range Display**: Shows formatted start and end dates for the data period
- **Loading States**: Provides user feedback during data fetching

### Data Processing
- Fetches hourly article counts and aggregates to daily totals
- Fills missing days with zero values for complete timeline
- Calculates statistical metrics (average, median) for volume analysis
- Normalizes threshold position between configurable min/max values

### Interactive Controls
- Draggable threshold marker with position constraints
- Real-time feedback showing current multiplier value
- Responsive design adapting to different screen sizes

## State Management

### TanStack Query Integration
```tsx
const { data: hourlyRawData, isFetching: isFetchingHourly } =
  useIntervalArticleCounts(hourlyArticleIntervalParams, {
    select: (data) => data.results,
  });
```
- Manages server state for article volume data
- Implements data transformation through select option
- Provides loading states and error handling

### Local State with useMemo
- Memoizes expensive calculations (daily aggregation, statistics)
- Optimizes date formatting and range calculations
- Prevents unnecessary re-renders during threshold adjustments

## Side Effects

### API Interactions
- Fetches interval article counts based on query and filters
- Automatically refetches when dependencies change
- Handles data transformation and aggregation

### Position Updates
- Converts normalized position to multiplier values
- Triggers parent callbacks with percentage values
- Updates threshold visualization in real-time

## Dependencies

### Internal Dependencies
- `VolumeChart` - Renders the actual bar chart visualization
- `VolumeMarker` - Interactive threshold marker component
- `useIntervalArticleCounts` - Query hook for fetching volume data
- Signal utilities for parameter processing and calculations

### External Dependencies
- `date-fns` - Date manipulation and formatting
- `@/components/icons` - Threshold icon component
- `@/components/ui/typography` - Consistent text styling

### Services & Types
- `stats-service` - Article count API integration
- Type definitions for filters and article data
- Signal-specific utility functions

## Integration

### Signal Creation Flow
1. **Configuration Phase**: Users adjust threshold sensitivity via draggable marker
2. **Data Analysis**: Component provides statistical context for informed decisions
3. **Parameter Output**: Converts user interactions to signal configuration values
4. **Visual Feedback**: Shows how threshold relates to historical volume patterns

### Anomaly Detection Pipeline
- Integrates with broader anomaly detection configuration
- Provides volume-based parameters for signal processing
- Enables data-driven threshold setting with visual context

## Best Practices

### Architecture Adherence
- ✅ **Component Decomposition**: Splits functionality across `VolumeChart` and `VolumeMarker`
- ✅ **State Management**: Uses TanStack Query for server state, local state for UI interactions
- ✅ **Reusability**: Accepts flexible props for different signal types and configurations
- ✅ **Performance**: Implements memoization for expensive calculations

### Implementation Patterns
- **Data Fetching**: Follows query hook patterns with proper parameter memoization
- **Event Handling**: Uses useCallback for stable event handlers
- **Type Safety**: Properly typed props and data transformations
- **Error Boundaries**: Graceful handling of loading and error states

### User Experience
- **Progressive Enhancement**: Works in read-only mode for display purposes
- **Responsive Design**: Adapts to different container sizes
- **Accessibility**: Provides clear visual indicators and text descriptions
- **Performance**: Optimized rendering with minimal re-calculations