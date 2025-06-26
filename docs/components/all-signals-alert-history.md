# AllSignalsAlertHistory Component

## Purpose

The `AllSignalsAlertHistory` component displays a comprehensive history of signal alert notifications in a master-detail layout. It provides users with a paginated list of signal notifications sorted by creation date, with infinite scroll functionality and detailed views for each alert. The component adapts to different screen sizes, showing a split-panel view on desktop and a drawer-based detail view on mobile devices.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Interactive state management for selected alerts and drawer visibility
- Browser APIs for intersection observer and responsive breakpoints
- Event handlers for user interactions
- Real-time data fetching with polling intervals

## Props Interface

This component accepts no props - it's a self-contained feature component.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | This component is fully self-contained |

## Usage Example

```tsx
import { AllSignalsAlertHistory } from '@/components/signals/details/all-signals-alert-history';

export default function SignalsDashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1>Signal Alert History</h1>
      <AllSignalsAlertHistory />
    </div>
  );
}
```

## Functionality

### Core Features
- **Infinite Scroll**: Automatically loads more alerts as user scrolls to bottom
- **Real-time Updates**: Refreshes data every 60 seconds, including background updates
- **Responsive Design**: Split-panel layout on desktop, drawer-based on mobile
- **Alert Selection**: Click to view detailed information about specific alerts
- **Time Formatting**: Displays alert timestamps in user's local timezone
- **Visual Indicators**: Icons and styling to indicate alert states and selection

### Pagination
- Page size: 25 alerts per request (exported as `HISTORY_PAGE_SIZE`)
- Sorted by creation date in descending order (newest first)
- Intersection observer triggers next page load when user reaches bottom

### Responsive Behavior
- **Desktop (lg+)**: Master-detail split view with 50/50 layout
- **Mobile**: Full-width list with drawer overlay for details

## State Management

### TanStack Query
- **Primary Query**: `useSignalsNotificationsInfinite` for fetching paginated alert data
- **Infinite Queries**: Manages pagination state and data accumulation
- **Real-time Updates**: 60-second polling with background refresh
- **Data Selection**: Custom selector flattens paginated results into single array

### Local State
```tsx
const [selectedAlertIndex, setSelectedAlertIndex] = useState<number>(0);
const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
```

## Side Effects

### Data Fetching
- Fetches signal notifications with infinite scroll pagination
- Automatic background polling every 60 seconds
- Triggers next page load when intersection observer detects bottom visibility

### DOM Interactions
- Intersection observer monitors scroll position for infinite loading
- Responsive breakpoint detection for layout switching
- Dynamic CSS classes based on selection state

## Dependencies

### Hooks
- `useSignalsNotificationsInfinite` - Data fetching with infinite scroll
- `useBreakpoint('lg')` - Responsive design logic
- `useIntersectionObserver` - Scroll-based loading trigger

### Child Components
- `AlertHistoryDetailPanel` - Desktop detail view
- `AlertDetailPanelDrawer` - Mobile detail drawer
- `AlertHistoryNoResults` - Empty state component
- `AlertHistorySkeleton` - Loading state component

### UI Components
- `Typography` - Text rendering with consistent styling
- Icons: `PiArrowDownLine`, `PiTimerFlashLine`

### Utilities
- `formatInTimeZone` - Timezone-aware date formatting
- `cn` - Conditional CSS class utility

## Integration

### Application Architecture
- **Domain**: Signals feature area (`/signals/details/`)
- **Data Layer**: Integrates with signals notification API through query hooks
- **UI Layer**: Follows responsive design patterns with mobile-first approach
- **State Layer**: Uses TanStack Query for server state, local state for UI interactions

### API Integration
```tsx
// Query configuration
const options = {
  size: HISTORY_PAGE_SIZE,
  select: selectSignalsNotifications,
  refetchInterval: 60000,
  refetchIntervalInBackground: true,
};

// Fetch parameters
{
  sortBy: 'createdAt',
  sortOrder: 'desc',
}
```

## Best Practices

### Architecture Adherence
- ✅ **Client Component**: Appropriately uses `'use client'` for interactive features
- ✅ **Component Decomposition**: Breaks down into specialized child components
- ✅ **TanStack Query**: Proper server state management with infinite queries
- ✅ **Responsive Design**: Mobile-first approach with breakpoint-based layouts

### Performance Optimizations
- **Callback Memoization**: Uses `useCallback` for event handlers to prevent re-renders
- **Data Selection**: Custom selector prevents unnecessary re-renders on query updates
- **Intersection Observer**: Efficient scroll-based loading without scroll event listeners
- **Background Refetching**: Keeps data fresh without interrupting user experience

### Code Quality
- **TypeScript**: Full type safety with proper interfaces
- **Error Handling**: Graceful loading and empty states
- **Accessibility**: Proper semantic HTML and keyboard navigation support
- **Maintainability**: Clear separation of concerns and reusable constants

### Export Pattern
```tsx
export const HISTORY_PAGE_SIZE = 25; // Configuration constant
export function AllSignalsAlertHistory() { ... } // Main component
```

This component exemplifies our architecture patterns by combining server state management, responsive design, and performance optimization in a maintainable, type-safe implementation.