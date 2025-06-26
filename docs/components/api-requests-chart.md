# ApiRequestsChart Component

## Purpose

The `ApiRequestsChart` component is a specialized data visualization component that displays API request metrics over time, categorized by HTTP status codes (200, 400, 500). It provides developers with visual insights into API performance, error rates, and usage patterns through an interactive line chart with custom tooltips.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Renders interactive charts using Recharts library
- Requires browser APIs for responsive container sizing
- Uses React hooks (`useCallback`, `useMemo`) for performance optimization
- Handles user interactions (hover tooltips)

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | Optional | Additional CSS classes for styling the component container |
| `data` | `ApiRequestsData[]` | Required | Array of API request data points with date and status code counts |

### ApiRequestsData Interface

| Property | Type | Description |
|----------|------|-------------|
| `date` | `string` | ISO date string for the data point |
| `200` | `number` | Count of successful requests (2xx status codes) |
| `400` | `number` | Count of client error requests (4xx status codes) |
| `500` | `number` | Count of server error requests (5xx status codes) |

## Usage Example

```tsx
import { ApiRequestsChart } from '@/components/developers/api-requests/api-requests-chart';

// Example usage in a dashboard component
export function ApiDashboard() {
  const apiMetrics = [
    { date: '2024-01-01', '200': 150, '400': 25, '500': 5 },
    { date: '2024-01-02', '200': 200, '400': 30, '500': 8 },
    { date: '2024-01-03', '200': 180, '400': 20, '500': 3 },
    // ... more data points
  ];

  return (
    <div className="dashboard-section">
      <h2>API Request Metrics</h2>
      <ApiRequestsChart 
        data={apiMetrics}
        className="mt-4 rounded-lg border p-4"
      />
    </div>
  );
}
```

## Functionality

### Core Features
- **Multi-line Chart**: Displays three separate lines for different HTTP status code categories
- **Responsive Design**: Automatically adjusts to container size using `ResponsiveContainer`
- **Custom Tooltips**: Interactive tooltips showing detailed metrics on hover
- **Smart Tick Formatting**: Optimized X-axis labels with strategic tick placement
- **Visual Hierarchy**: Color-coded lines using design system colors

### Key Behaviors
- **Tick Optimization**: Uses `TICK_SPLITS` constant to prevent overcrowded X-axis labels
- **Date Formatting**: Displays formatted dates (e.g., "JANUARY 1") for better readability
- **Performance Optimization**: Memoized tick calculations and callback functions
- **Accessibility**: Proper color contrast and semantic markup

## State Management

**Local State Only** - This component uses:
- `useMemo` for expensive tick calculations
- `useCallback` for tick formatter function optimization
- No external state management required (follows single responsibility principle)

The component is purely presentational and relies on props for data, making it highly reusable and testable.

## Side Effects

**None** - This component has no side effects:
- No API calls or data fetching
- No localStorage/sessionStorage interactions
- No URL manipulation or routing
- Pure data visualization based on provided props

## Dependencies

### External Libraries
- **Recharts**: Chart rendering library (`LineChart`, `ResponsiveContainer`, `Tooltip`, etc.)
- **date-fns**: Date formatting utilities

### Internal Dependencies
- **Typography Component**: `@/components/ui/typography` for consistent text styling
- **Design System**: CSS custom properties for colors (`--color-pg-sapphire-500`, etc.)

### Type Dependencies
- Recharts TypeScript types for tooltip props and chart data

## Integration

### Application Architecture
- **Domain-Specific Component**: Located in `/components/developers/api-requests/`
- **Feature Component**: Designed for developer dashboard and API monitoring features
- **Reusable Pattern**: Can be integrated into various API monitoring contexts

### Data Flow
```
Parent Component → API Data → ApiRequestsChart → Recharts → Visual Output
```

### Integration Points
- Dashboard components
- API monitoring pages
- Developer tools sections
- Analytics reporting interfaces

## Best Practices

### Architecture Adherence
✅ **Client Component Usage**: Correctly uses `'use client'` for interactive chart functionality
✅ **Component Decomposition**: Separates concerns with `CustomTooltip` as dedicated sub-component
✅ **Props Interface**: Well-defined TypeScript interfaces for type safety
✅ **Performance Optimization**: Uses React hooks appropriately for memoization

### Code Quality
✅ **Single Responsibility**: Focused solely on API metrics visualization
✅ **Reusability**: Generic enough for different API monitoring contexts
✅ **Maintainability**: Clear prop interfaces and documented constants
✅ **Accessibility**: Proper semantic structure and visual hierarchy

### Design System Integration
✅ **Color Consistency**: Uses design system CSS custom properties
✅ **Typography**: Leverages shared Typography component
✅ **Spacing**: Consistent margin and padding patterns

### Recommendations
- Consider extracting chart configuration to props for greater customization
- Add loading and error states for better UX
- Implement data validation with Zod schema
- Add unit tests for tick formatting and tooltip rendering logic