# ApiRequests Component

## Purpose

The `ApiRequests` component provides a comprehensive view of API request statistics over the last 30 days, displaying both visual chart representation and numerical breakdowns by HTTP status codes. It serves as a monitoring dashboard for developers to track API usage patterns and identify potential issues through request status distribution.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Utilizes React hooks (`useMemo`) for data processing
- Manages interactive chart rendering
- Processes real-time data transformations for visualization

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | `undefined` | Additional CSS classes to apply to the component's root element |

## Usage Example

```tsx
import { ApiRequests } from '@/components/developers/api-requests/api-requests';

// Basic usage in a developer dashboard
export function DeveloperDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ApiRequests />
      <OtherDashboardComponents />
    </div>
  );
}

// With custom styling
export function CustomDashboard() {
  return (
    <ApiRequests className="col-span-2 min-h-[400px]" />
  );
}
```

## Functionality

### Core Features
- **30-Day Request Tracking**: Displays API request statistics for the last 30 days
- **Status Code Breakdown**: Categorizes requests by HTTP status codes (200, 400, 500)
- **Visual Chart Representation**: Renders an interactive chart showing request trends over time
- **Numerical Statistics**: Shows total request counts per status code
- **Real-time Data Processing**: Transforms raw API data into chart-ready format

### Data Processing
- **Date Range Generation**: Creates a 30-day date array with "Today" as the final entry
- **Data Normalization**: Maps API response data to chart-compatible format
- **Statistical Aggregation**: Calculates total request counts by status code
- **Default Value Handling**: Ensures chart data completeness with zero-filled missing dates

## State Management

**TanStack Query Integration**: 
- Uses `useRequestStats` hook to fetch API request statistics
- Leverages server state caching and background updates
- Automatically handles loading, error, and success states

**Local State Processing**:
- `chartData` memoized computation for chart visualization
- `requestsCountByStats` memoized aggregation for status code totals
- Optimized re-computation only when `requestStats` changes

## Side Effects

### API Interactions
- **Data Fetching**: Retrieves 30-day request statistics via `useRequestStats`
- **Background Updates**: Automatically refreshes data based on TanStack Query configuration
- **Caching**: Leverages query cache for performance optimization

### DOM Effects
- **Chart Rendering**: Triggers chart component re-renders on data changes
- **Dynamic Content**: Updates status counts and visual elements reactively

## Dependencies

### Internal Components
- `Block` - Provides consistent card-like container with header and actions
- `Typography` - Ensures consistent text styling and hierarchy
- `ApiRequestsChart` - Renders the actual chart visualization
- `RequestsCount` - Displays individual status code statistics

### External Libraries
- `date-fns/format` - Date formatting utilities
- `date-fns/subDays` - Date calculation for 30-day range

### Hooks and Utilities
- `useRequestStats` - Custom TanStack Query hook for API data
- `cn` - Utility for conditional CSS class merging

### Icons
- `PiArrowUpDownLine` - Visual icon representing API request flow

## Integration

### Developer Dashboard Context
- **Monitoring Tool**: Central component in developer analytics dashboard
- **Performance Insights**: Helps developers identify API usage patterns and issues
- **Billing Context**: Provides visibility into request volume across billing periods

### Data Flow Architecture
```
API Statistics Service
         ↓
    useRequestStats Hook
         ↓
    ApiRequests Component
         ↓
[ApiRequestsChart] + [RequestsCount Components]
```

### Responsive Design
- **Flexible Layout**: Adapts to container constraints via `h-full` class
- **Component Composition**: Stacks chart and statistics in logical vertical flow

## Best Practices

### Architectural Adherence
✅ **Proper Client Component Usage**: Uses `'use client'` appropriately for interactive data processing
✅ **Component Decomposition**: Delegates chart rendering and count display to specialized components
✅ **TanStack Query Integration**: Leverages server state management best practices
✅ **Memoization Optimization**: Prevents unnecessary re-computations with `useMemo`

### Performance Optimizations
- **Selective Re-rendering**: Memoized calculations only trigger on actual data changes
- **Efficient Data Transformation**: Single-pass processing of API response data
- **Lazy Chart Updates**: Chart only re-renders when processed data changes

### Error Handling
- **Graceful Degradation**: Handles missing or incomplete API data with default values
- **Data Validation**: Safely processes dynamic API response structures
- **Fallback States**: Returns empty arrays for missing data scenarios

### Maintainability
- **Clear Data Flow**: Obvious transformation from raw API data to chart format
- **Type Safety**: Proper TypeScript interfaces for data structures
- **Separation of Concerns**: Chart logic separated from data processing logic