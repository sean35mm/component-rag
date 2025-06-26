# RecentRequests Component

## Purpose

The `RecentRequests` component displays a list of the most recent API requests made by developers, providing quick access to request monitoring and debugging capabilities. It serves as a dashboard widget that gives developers visibility into their latest API activity with direct navigation to detailed logs.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages data fetching state with TanStack Query hooks
- Handles interactive UI states (loading, scrolling)
- Provides real-time updates of request data

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `BlockProps` | No | All props from the `Block` component for consistent styling and layout |

**Inherited from BlockProps:**
- Standard block component properties for consistent dashboard widget appearance
- Layout and styling customization options

## Usage Example

```tsx
import { RecentRequests } from '@/components/developers/recent-requests/recent-requests';

// Basic usage in a developer dashboard
function DeveloperDashboard() {
  return (
    <div className="grid gap-6">
      <RecentRequests />
      
      {/* Other dashboard widgets */}
      <OtherMetricsWidget />
    </div>
  );
}

// With custom block styling
function CustomDashboard() {
  return (
    <RecentRequests 
      className="custom-styling"
      // Any other BlockProps can be passed through
    />
  );
}
```

## Functionality

### Core Features
- **Recent Request Display**: Shows the 30 most recent API requests sorted by creation date
- **Loading States**: Displays skeleton UI while fetching data
- **Scrollable List**: Provides scrollable interface for browsing through requests
- **Quick Navigation**: Includes "See log" action button for accessing detailed logs
- **Real-time Updates**: Automatically reflects new requests as they occur

### UI Behavior
- Fixed height container (595px) with overflow handling
- Custom scrollbar styling for improved UX
- Responsive layout that adapts to container constraints
- Consistent block-based design pattern

## State Management

**TanStack Query Integration:**
```tsx
const { data: recentRequests, isFetching } = useRequestLogs({
  sortBy: 'createdAt',
  sortOrder: 'desc',
  size: 30,
});
```

- **Server State**: Managed entirely through TanStack Query
- **Caching**: Automatic caching and background refetching of request logs
- **Loading States**: Built-in loading state management via `isFetching`
- **Error Handling**: Implicit error handling through query hook

## Side Effects

### Data Fetching
- **API Calls**: Fetches request logs via `useRequestLogs` hook
- **Background Updates**: Automatic background refetching based on query configuration
- **Real-time Sync**: Keeps request list synchronized with latest API activity

### Performance Optimizations
- **Virtualization**: Scrollable container for handling large request lists
- **Efficient Rendering**: Only renders visible items in scrollable area

## Dependencies

### Internal Components
- `Block` - Base container component for consistent dashboard widget styling
- `RecentRequest` - Individual request item component
- `RecentRequestsSkeleton` - Loading state component

### Hooks & Services
- `useRequestLogs` - TanStack Query hook for fetching request data
- Custom query configuration for sorting and pagination

### UI Elements
- `PiTimeLine` - Icon component for visual branding
- Custom scrollbar styling utilities

## Integration

### Dashboard Architecture
```tsx
// Typical integration in developer dashboard
function DeveloperOverview() {
  return (
    <DashboardLayout>
      <div className="dashboard-grid">
        <RecentRequests />
        <APIMetrics />
        <UsageStatistics />
      </div>
    </DashboardLayout>
  );
}
```

### Navigation Flow
- **Entry Point**: Dashboard widget providing request overview
- **Deep Link**: "See log" action navigates to `/developers/logs`
- **Context Preservation**: Maintains developer context across navigation

## Best Practices

### Architecture Adherence
✅ **Lego Block Pattern**: Composes `Block`, `RecentRequest`, and skeleton components  
✅ **Domain Organization**: Located in `/developers/` feature directory  
✅ **TanStack Query**: Proper server state management for API data  
✅ **Client Component**: Appropriately marked for interactive functionality  

### Performance Patterns
✅ **Efficient Rendering**: Skeleton loading prevents layout shifts  
✅ **Scroll Optimization**: Custom scrollbar and overflow handling  
✅ **Data Pagination**: Limits to 30 items for optimal performance  

### UX Considerations
✅ **Loading States**: Comprehensive skeleton UI during data fetching  
✅ **Action Navigation**: Clear path to detailed log analysis  
✅ **Consistent Styling**: Follows block component design system  
✅ **Responsive Design**: Adapts to various dashboard layouts  

### Integration Guidelines
- Use as a dashboard widget for developer-focused interfaces
- Combine with other monitoring components for comprehensive API oversight
- Leverage built-in navigation for seamless log exploration workflow