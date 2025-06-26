# EndpointsUsage Component Documentation

## Purpose

The `EndpointsUsage` component displays a visual chart showing API endpoint usage data over time for the current organization. It transforms organization query data into a time-series format and renders it as an interactive chart with date labels, supporting both historical data and "Today" highlighting for current-day usage.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Utilizes TanStack Query hooks for data fetching
- Performs complex data transformations with callback memoization
- Renders interactive chart components that require client-side interactivity

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `Omit<BlockProps, 'disableTitleBorder' \| 'icon' \| 'isLoading' \| 'skeletonSizes' \| 'title'>` | No | All Block component props except the ones overridden internally |

**Excluded BlockProps:**
- `disableTitleBorder` - Always set to `true`
- `icon` - Always set to `<PiBarChartLine />`
- `isLoading` - Controlled by data fetching state
- `skeletonSizes` - Always set to `'h-[240px]'`
- `title` - Always set to `'Usage by Endpoint'`

## Usage Example

```tsx
import { EndpointsUsage } from '@/components/developers/endpoints-usage';

// Basic usage in a dashboard
export default function DeveloperDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <EndpointsUsage />
      <OtherMetricsComponent />
    </div>
  );
}

// With additional styling
export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <EndpointsUsage className="col-span-2" />
    </div>
  );
}
```

## Functionality

### Core Features
- **Time-Series Data Visualization**: Transforms endpoint usage data into chronological chart format
- **Date Formatting**: Displays dates as "Today" for current day or "MMM dd" format for other dates
- **Loading States**: Shows skeleton loading with fixed height during data fetching
- **Empty State Handling**: Gracefully handles scenarios with no usage data
- **Responsive Design**: Inherits responsive behavior from Block component

### Data Transformation
- Converts organization queries data into `EndpointsUsageItem[]` format
- Groups data by timestamp and endpoint
- Sorts chronologically for proper chart rendering
- Applies intelligent date labeling for better UX

## State Management

**TanStack Query Integration:**
- Uses `useCurrentOrganizationQueries` hook for server state management
- Implements memoized data transformation with `useCallback` for performance
- Leverages query `select` option for efficient data processing
- Automatic loading states and error handling through query system

**Data Flow:**
```
OrganizationQueries → useUsageByEndpoints → EndpointsUsageItem[] → Chart Rendering
```

## Side Effects

### API Interactions
- Fetches organization query data through `useCurrentOrganizationQueries`
- Automatically refetches based on TanStack Query configuration
- No direct API calls - relies on query hook abstraction

### Performance Optimizations
- Memoized data transformation prevents unnecessary recalculations
- Skeleton loading provides immediate visual feedback
- Efficient data structure conversion from nested objects to flat array

## Dependencies

### Components
- `Block` - Base container component with consistent styling and loading states
- `EndpointsUsageChart` - Chart visualization component for rendered data
- `PiBarChartLine` - Icon component for visual identification

### Hooks & Utilities
- `useCurrentOrganizationQueries` - Data fetching hook for organization metrics
- `format`, `isToday` from `date-fns` - Date manipulation and formatting
- React hooks (`useCallback`) for performance optimization

### Types
- `EndpointsUsageItem` - Type definition for transformed chart data
- `OrganizationQueries` - Type for raw API response data
- `BlockProps` - Props interface from base Block component

## Integration

### Application Architecture
- **Domain**: Developer tools and analytics section
- **Level**: Feature component combining data logic and presentation
- **Context**: Organization-scoped data visualization
- **Positioning**: Dashboard widget or analytics page component

### Data Layer Integration
```
API Layer → useCurrentOrganizationQueries → useUsageByEndpoints → EndpointsUsage
```

### UI Layer Integration
```
Page Component → EndpointsUsage → Block → EndpointsUsageChart
```

## Best Practices

### Architecture Adherence
✅ **Proper Component Decomposition**: Separates data logic (`useUsageByEndpoints`) from presentation (`EndpointsUsage`)

✅ **TanStack Query Usage**: Leverages server state management with proper select transformation

✅ **Client Component Justification**: Uses `'use client'` appropriately for interactive features

✅ **Performance Optimization**: Implements `useCallback` for expensive data transformations

✅ **Reusable Base Components**: Extends `Block` component for consistent UI patterns

### Implementation Patterns
✅ **Custom Hook Extraction**: Data logic separated into reusable `useUsageByEndpoints` hook

✅ **Type Safety**: Proper TypeScript interfaces and generic type handling

✅ **Error Boundaries**: Implicit error handling through TanStack Query integration

✅ **Loading States**: Consistent skeleton loading with appropriate sizing

✅ **Responsive Design**: Leverages Block component's responsive capabilities

### Future Considerations
- Consider extracting data transformation logic for reuse across similar components
- Potential for date range selection functionality
- Caching strategies for expensive data transformations
- Accessibility enhancements for chart interactions