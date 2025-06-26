# ApiServiceStatus Component

## Purpose

The `ApiServiceStatus` component displays the real-time status of API services with visual indicators for uptime status and availability percentage. It provides developers and stakeholders with immediate visibility into service health through a compact, informative status display that shows whether services are UP or DOWN along with uptime ratios.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive state through TanStack Query hooks
- Performs real-time data fetching and updates
- Requires client-side rendering for dynamic status updates

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | `undefined` | Additional CSS classes to apply to the root container |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | No | `{}` | Standard HTML div attributes (id, data-*, aria-*, etc.) |

## Usage Example

```tsx
import { ApiServiceStatus } from '@/components/developers/api-service-status';

// Basic usage
export function DeveloperDashboard() {
  return (
    <div className="developer-tools">
      <ApiServiceStatus />
    </div>
  );
}

// With custom styling
export function SystemStatusPage() {
  return (
    <div className="status-grid">
      <ApiServiceStatus 
        className="border rounded-lg p-4 bg-white shadow-sm"
        data-testid="api-status"
      />
    </div>
  );
}

// In a monitoring dashboard
export function MonitoringWidget() {
  return (
    <section className="monitoring-section">
      <h2>Service Health</h2>
      <div className="grid grid-cols-2 gap-4">
        <ApiServiceStatus className="col-span-1" />
        {/* Other monitoring components */}
      </div>
    </section>
  );
}
```

## Functionality

### Core Features
- **Real-time Status Display**: Shows current API service status (UP/DOWN)
- **Visual Status Indicators**: Color-coded status badges (green for UP, red for DOWN)
- **Uptime Percentage**: Displays custom uptime ratio when available
- **Loading States**: Shows skeleton loader during data fetching
- **Responsive Design**: Adapts to different container sizes

### Status Logic
- Uses `STATUS_UP = 2` constant to determine service health
- Compares monitor status against this constant for UP/DOWN determination
- Conditionally renders uptime percentage only when data is available

## State Management

**TanStack Query Integration**:
- Uses `useMonitors()` hook for server state management
- Implements data selection to extract monitors array
- Provides automatic caching, background updates, and error handling
- Manages `isFetching` state for loading indicators

```tsx
const { data = [], isFetching } = useMonitors({
  select: (res) => res.monitors,
});
```

## Side Effects

### API Interactions
- **Monitor Data Fetching**: Continuously polls monitor endpoints for status updates
- **Background Sync**: TanStack Query handles automatic background refetching
- **Cache Management**: Leverages query cache for performance optimization

### Performance Considerations
- Uses `useMemo` to optimize monitor selection from data array
- Minimizes re-renders through efficient data selection patterns

## Dependencies

### Internal Dependencies
- **UI Components**: `Skeleton`, `Typography` from component library
- **Query Hooks**: `useMonitors` for data fetching
- **Utilities**: `cn` for conditional class name handling

### External Dependencies
- **React**: Core framework with hooks (`useMemo`)
- **TanStack Query**: Server state management (via `useMonitors`)

## Integration

### Application Architecture
- **Domain Location**: Lives in `/developers/` indicating developer-focused functionality
- **Data Flow**: Connects to monitoring infrastructure through standardized query hooks
- **UI Consistency**: Uses design system components for visual coherence

### Monitor System Integration
```tsx
// Integrates with monitoring infrastructure
const monitor = useMemo(() => data.at(0), [data]);
// Uses first monitor for primary status display
```

## Best Practices

### Architecture Adherence
✅ **Client Component Justification**: Properly uses client-side rendering for interactive features  
✅ **Component Decomposition**: Single responsibility focused on status display  
✅ **State Management Pattern**: Correctly implements TanStack Query for server state  
✅ **Reusability**: Accepts standard HTML attributes for flexible integration  

### Implementation Quality
✅ **Performance Optimization**: Uses `useMemo` for expensive computations  
✅ **Loading States**: Provides proper skeleton loading experience  
✅ **Error Resilience**: Handles undefined data gracefully with defaults  
✅ **Accessibility**: Uses semantic HTML structure with proper heading hierarchy  

### Code Organization
✅ **Export Strategy**: Exports both component and constants for external use  
✅ **Type Safety**: Properly extends HTML attributes interface  
✅ **Styling Patterns**: Uses consistent utility classes and conditional styling  

## Constants Export

```tsx
export { STATUS_UP }; // Available for external status comparisons
```

The `STATUS_UP` constant is exported to enable consistent status checking across the application, promoting code reuse and maintaining single source of truth for status values.