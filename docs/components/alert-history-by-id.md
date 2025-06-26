# Alert History By ID Component

## Purpose

The `SignalDetailsAlertHistoryById` component displays a chronological list of signal notifications for a specific signal ID. It provides an interactive two-panel layout (master-detail pattern) where users can browse through alert history and view detailed information about each alert. The component features infinite scrolling for performance optimization and responsive design that adapts between desktop and mobile layouts.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Interactive state management for selected alerts and drawer visibility
- Intersection Observer API for infinite scrolling
- Real-time data fetching with intervals
- Event handlers for user interactions

## Props Interface

### SignalDetailsAlertHistoryById

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `signalId` | `number` | Yes | Unique identifier for the signal to display alert history |

### AlertHistoryItem

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `item` | `SignalNotification` | Yes | Signal notification data object |
| `index` | `number` | Yes | Index position of the item in the list |
| `selectedAlertIndex` | `number` | Yes | Currently selected alert index |
| `setSelectedAlertIndex` | `(index: number) => void` | Yes | Callback to update selected alert index |

## Usage Example

```tsx
import { SignalDetailsAlertHistoryById } from '@/components/signals/details/alert-history-by-id';

function SignalDetailPage() {
  const signalId = 12345;
  
  return (
    <div className="container mx-auto p-6">
      <h1>Signal Alert History</h1>
      <SignalDetailsAlertHistoryById signalId={signalId} />
    </div>
  );
}

// Usage with dynamic signal ID from router
function DynamicSignalPage({ params }: { params: { id: string } }) {
  const signalId = parseInt(params.id);
  
  return (
    <SignalDetailsAlertHistoryById signalId={signalId} />
  );
}
```

## Functionality

### Core Features
- **Alert History List**: Displays chronological list of signal notifications
- **Master-Detail Layout**: Two-panel interface for browsing and viewing details
- **Infinite Scrolling**: Automatically loads more alerts as user scrolls
- **Responsive Design**: Adapts between desktop two-panel and mobile drawer layouts
- **Real-time Updates**: Auto-refreshes data every 60 seconds
- **Article Preview**: Shows article titles associated with each alert

### Interactive Behaviors
- Click alert items to view detailed information
- Automatic loading of additional alerts when scrolling to bottom
- Visual selection indicators for active alert
- Smooth transitions between selected alerts

### Performance Optimizations
- Virtualized scrolling for large datasets
- Intersection Observer for efficient infinite scroll detection
- Conditional data fetching based on article availability
- Optimized re-renders with useCallback hooks

## State Management

### Local State (useState)
- `selectedAlertIndex`: Tracks currently selected alert (default: 0)
- `isDetailsDrawerOpen`: Controls mobile drawer visibility

### TanStack Query
- `useSignalsNotificationsInfinite`: Fetches paginated signal notifications
  - Auto-refetch every 60 seconds including background updates
  - Infinite scroll pagination with 10 items per page
  - Data transformation to flatten pages
- `useArticles`: Fetches article data for preview titles

### Responsive State
- `useBreakpoint('lg')`: Determines desktop vs mobile layout

## Side Effects

### Data Fetching
- Continuous polling of signal notifications every 60 seconds
- Background refetching when tab is not active
- Lazy loading of article data based on notification metadata

### DOM Interactions
- Intersection Observer monitoring for infinite scroll trigger
- Automatic scroll behavior management
- Dynamic drawer state management with timing delays

### Performance Effects
- Debounced alert selection on mobile to ensure smooth drawer transitions
- Optimized re-rendering through memoized callbacks

## Dependencies

### Internal Components
- `AlertHistoryDetailPanel`: Desktop detail view component
- `AlertDetailPanelDrawer`: Mobile drawer detail view
- `AlertHistoryNoResults`: Empty state component
- `AlertHistorySkeleton`: Loading state component
- `Typography`: UI typography component

### Hooks & Utilities
- `useBreakpoint`: Responsive design hook
- `useIntersectionObserver`: Infinite scroll detection
- `useSignalsNotificationsInfinite`: Signal data fetching
- `useArticles`: Article data fetching
- `cn`: Utility for conditional class names

### External Libraries
- `date-fns-tz`: Timezone-aware date formatting
- `@tanstack/react-query`: Server state management
- `@react-hook/intersection-observer`: Scroll detection

## Integration

### Application Architecture
- **Domain**: Part of signals feature domain (`/signals/details/`)
- **Data Layer**: Integrates with signals and articles APIs through query hooks
- **UI Layer**: Uses design system components for consistent styling
- **Responsive Strategy**: Follows mobile-first responsive patterns

### API Integration
- Connects to signals notifications endpoint with infinite pagination
- Links to articles API for content preview
- Supports real-time data synchronization

### Navigation Patterns
- Fits into signal detail pages as a tabbed or sectioned component
- Supports deep linking through selected alert state management

## Best Practices

### Architecture Adherence
✅ **Component Decomposition**: Separates `AlertHistoryItem` as reusable sub-component  
✅ **State Management**: Uses TanStack Query for server state, local state for UI interactions  
✅ **Performance**: Implements infinite scrolling and intersection observer patterns  
✅ **Responsive Design**: Follows mobile-first approach with breakpoint-based layouts  

### Code Quality
✅ **Type Safety**: Full TypeScript interfaces for all props and data structures  
✅ **Accessibility**: Semantic HTML structure with proper ARIA patterns  
✅ **Error Handling**: Graceful loading and empty states  
✅ **Reusability**: Configurable through props, no hard-coded dependencies  

### Data Management
✅ **Efficient Querying**: Pagination and selective data fetching  
✅ **Real-time Updates**: Background synchronization without user disruption  
✅ **Cache Optimization**: Leverages TanStack Query caching strategies  
✅ **Conditional Loading**: Article data fetched only when needed  

This component exemplifies modern React patterns with efficient data fetching, responsive design, and optimal user experience through progressive loading and real-time updates.