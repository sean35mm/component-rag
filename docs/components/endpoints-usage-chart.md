# EndpointsUsageChart Component

## Purpose

The `EndpointsUsageChart` component provides a visual representation of API endpoint usage over the past 7 days using a stacked bar chart. It displays request counts for different API endpoints with interactive filtering capabilities, allowing developers to monitor their API consumption patterns and track usage trends across various endpoints.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Interactive state management for toggling endpoint visibility
- Event handlers for button clicks
- Client-side chart rendering with Recharts library
- Browser-specific date formatting and manipulation

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | `undefined` | Additional CSS classes for styling the component container |
| `data` | `EndpointsUsageItem[]` | No | `DEFAULT_DATA` | Array of usage data objects containing endpoint request counts by date |
| `isNoRequests` | `boolean` | No | `undefined` | When true, displays an overlay indicating no API requests have been made |

## Usage Example

```tsx
import { EndpointsUsageChart } from '@/components/developers/endpoints-usage/endpoints-usage-chart';

// Basic usage with default data
function DeveloperDashboard() {
  return (
    <div className="space-y-6">
      <EndpointsUsageChart />
    </div>
  );
}

// Usage with custom data
function CustomUsageChart() {
  const usageData = [
    {
      '/v1/all': 15,
      '/v1/headlines': 30,
      '/v1/sources': 8,
      date: 'Oct 15'
    },
    // ... more data points
  ];

  return (
    <EndpointsUsageChart 
      data={usageData}
      className="border rounded-lg p-4"
    />
  );
}

// Usage with no requests state
function EmptyStateChart() {
  return (
    <EndpointsUsageChart 
      data={[]}
      isNoRequests={true}
    />
  );
}
```

## Functionality

### Core Features
- **Interactive Legend**: Toggle endpoint visibility with colored indicator buttons
- **Stacked Bar Chart**: Visual representation of request counts across multiple endpoints
- **Custom Tooltip**: Detailed breakdown of request counts on hover
- **Plan-Based Filtering**: Automatically filters available endpoints based on user's subscription plan
- **Responsive Design**: Adapts to different screen sizes with horizontal scrolling for legend buttons
- **Empty State Handling**: Displays overlay message when no requests are available

### Chart Interactions
- Click legend buttons to show/hide specific endpoints
- Hover over bars to see detailed request counts
- Visual feedback with opacity changes for disabled endpoints
- Scrollable legend for handling multiple endpoints on smaller screens

## State Management

**Local State (useState)**:
- `state`: Manages the visibility and configuration of chart endpoints
- Initialized from `filteredEndpointsByPlan` which filters endpoints based on subscription plan
- Updates when users toggle endpoint visibility through legend buttons

**Derived State (useMemo)**:
- `plan`: Computed from subscription details to determine available endpoints
- `filteredEndpointsByPlan`: Filters initial chart state based on user's plan limitations

## Side Effects

- **Subscription Data Fetching**: Uses `useSubscriptionDetails` hook to retrieve user's plan information
- **Date Calculations**: Performs client-side date formatting using `date-fns` for chart labels
- **DOM Manipulation**: Recharts library handles chart rendering and interactions

## Dependencies

### Internal Dependencies
- `useSubscriptionDetails`: Hook for retrieving user subscription information
- `Button`: UI component for legend toggle buttons
- `Typography`: UI component for text rendering
- `API_ENDPOINTS_BY_PLAN`: Utility for mapping endpoints to subscription plans
- `mapSubscriptionNameToPlan`: Utility for plan name conversion
- `EndpointsUsageItem`: Type definition for usage data structure

### External Dependencies
- `recharts`: Chart library for bar chart rendering
- `date-fns`: Date manipulation and formatting utilities
- `class-variance-authority`: For styling variants
- `react`: Core React functionality

## Integration

### Application Architecture
- **Developer Tools Section**: Part of the developers dashboard for API monitoring
- **Subscription System**: Integrates with subscription management to show plan-appropriate endpoints
- **Usage Analytics**: Connects to usage tracking system for displaying historical API consumption
- **Responsive Layout**: Works within the broader responsive design system

### Data Flow
1. Component receives usage data (default or custom)
2. Fetches subscription details to determine available endpoints
3. Filters chart configuration based on user's plan
4. Renders interactive chart with plan-appropriate endpoints
5. Handles user interactions for toggling endpoint visibility

## Best Practices

### Architecture Adherence
- ✅ **Proper Client Component Usage**: Uses `'use client'` appropriately for interactive chart functionality
- ✅ **Component Decomposition**: Separates concerns with `CustomTooltip` as a focused sub-component
- ✅ **State Management**: Uses local state for UI interactions, external hooks for data fetching
- ✅ **Reusable Design**: Flexible props interface allows customization while maintaining defaults

### Implementation Patterns
- ✅ **Default Data**: Provides realistic default data for development and testing
- ✅ **Responsive Design**: Implements horizontal scrolling for legend on smaller screens
- ✅ **Accessibility**: Uses semantic HTML and proper ARIA attributes through UI components
- ✅ **Performance**: Uses `useMemo` for expensive computations and filtering operations
- ✅ **Error Handling**: Gracefully handles missing data with default values and empty states

### Integration Best Practices
- ✅ **Subscription Integration**: Properly filters available endpoints based on user's plan
- ✅ **Type Safety**: Uses TypeScript interfaces for all data structures
- ✅ **Styling Consistency**: Leverages design system colors and typography components
- ✅ **Maintainable Code**: Clear separation of constants, components, and business logic