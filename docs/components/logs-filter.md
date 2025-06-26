# LogsFilter Component

## Purpose

The `LogsFilter` component provides a comprehensive interface for viewing and filtering API request logs in a developer dashboard. It displays log entries with status filtering capabilities, supports both desktop table view and mobile card view, and includes detailed log preview functionality. The component serves as the primary interface for developers to monitor and analyze their API request history.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Interactive state management for filtering and selection
- Event handlers for user interactions
- Browser-specific features like responsive breakpoints
- Real-time data fetching with TanStack Query

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onChange` | `(filter: string) => void` | No | Callback function triggered when filter selection changes |
| `...rest` | `React.HTMLAttributes<HTMLDivElement>` | No | Additional HTML attributes passed to the root container |

## Usage Example

```tsx
import { LogsFilter } from '@/components/developers/logs/logs-filter';

export default function DeveloperLogsPage() {
  const handleFilterChange = (filter: string) => {
    console.log('Filter changed to:', filter);
    // Handle filter change logic
  };

  return (
    <div className="container mx-auto p-6">
      <h1>API Request Logs</h1>
      <LogsFilter 
        onChange={handleFilterChange}
        className="mt-4"
      />
    </div>
  );
}

// Basic usage without handlers
export function SimpleLogsView() {
  return <LogsFilter />;
}
```

## Functionality

### Core Features

1. **Status-based Filtering**: Filter logs by HTTP status codes with visual count indicators
2. **Responsive Design**: Adapts between desktop table view and mobile card layout
3. **Infinite Scrolling**: Loads more logs on demand with pagination
4. **Log Selection**: Click-to-select functionality with visual feedback
5. **Real-time Preview**: Desktop view shows detailed log information in side panel
6. **Mobile Drawer**: Touch-friendly drawer interface for mobile log details

### Data Display

- **Table Columns**: Status, Method, Endpoint, Timestamp
- **Sorting**: Default sort by creation date (newest first)
- **Status Indicators**: Visual HTTP status code representation
- **Method Badges**: Colored HTTP method indicators
- **Relative Timestamps**: Human-readable time formatting

## State Management

### TanStack Query
```tsx
// Infinite logs query with filtering
const { data: logs, isFetching, fetchNextPage } = useLogsInfinite({
  sortBy: 'createdAt',
  sortOrder: 'desc',
  size: PER_PAGE,
  status: selectedStatus !== ALL_LOGS_LABEL ? parseInt(selectedStatus) : undefined
});

// Request statistics for filter counts
const { data: requestStats } = useRequestStats({ periodDays: 180 });
```

### Zustand Store
```tsx
// Global logs state management
const selectedLog = useLogsStore((state) => state.selectedLog);
const isOpenLogDrawer = useLogsStore((state) => state.isOpenLogDrawer);
const setIsOpenLogDrawer = useLogsStore((state) => state.setIsOpenLogDrawer);
```

### Local State
```tsx
const [selected, setSelected] = useState(0); // Selected row index
const [selectedStatus, setSelectedStatus] = useState(ALL_LOGS_LABEL); // Filter state
```

## Side Effects

1. **API Data Fetching**: Automatically fetches logs and statistics on mount
2. **Infinite Loading**: Triggers additional API calls when loading more entries
3. **Filter Updates**: Refetches data when status filter changes
4. **Responsive Updates**: Adjusts layout based on screen size changes

## Dependencies

### UI Components
- `TableView` - Main data table component
- `HttpMethod`, `HttpRequestStatus` - Status and method indicators
- `Button`, `Typography` - Basic UI elements
- `ScrollContainer` - Horizontal scrolling for filters

### Feature Components
- `LogCardList` - Mobile card layout
- `LogDrawer` - Mobile detail drawer
- `LogPreview` - Desktop detail panel
- `RequestsCount` - Filter count indicators
- Various fallback components for loading states

### Hooks & Utilities
- `useBreakpoint` - Responsive design detection
- `useLogsInfinite`, `useRequestStats` - Data fetching
- `useLogsStore` - Global state management
- `formatDateWithRelativeDay` - Date formatting

## Integration

### Application Architecture
```
Developer Dashboard
├── API Requests Section
│   ├── RequestsCount (filter indicators)
│   └── LogsFilter (main component)
│       ├── Desktop: TableView + LogPreview
│       └── Mobile: LogCardList + LogDrawer
└── State Management
    ├── TanStack Query (server state)
    └── Zustand Store (UI state)
```

### Data Flow
1. Component mounts and fetches initial logs + statistics
2. User selects status filter → Updates query parameters
3. User selects log entry → Updates Zustand store
4. Mobile: Opens drawer; Desktop: Updates side panel

## Best Practices

### Architecture Adherence
✅ **Client Component Usage**: Appropriate use of `'use client'` for interactive features  
✅ **State Separation**: TanStack Query for server state, Zustand for global UI state, local state for component-specific data  
✅ **Component Decomposition**: Well-decomposed into focused sub-components  
✅ **Responsive Design**: Proper breakpoint handling with adaptive layouts  

### Performance Optimizations
- **Memoized Selectors**: `useCallback` for data transformations
- **Infinite Queries**: Efficient pagination with TanStack Query
- **Conditional Rendering**: Loading states and fallbacks
- **Optimized Re-renders**: Strategic state placement

### Code Quality
- **TypeScript**: Full type safety with proper interfaces
- **Accessibility**: Keyboard navigation and screen reader support
- **Error Handling**: Graceful loading and error states
- **Maintainability**: Clear separation of concerns and reusable patterns

## Exported Constants

```tsx
export const PER_PAGE = 15; // Pagination size
export const ALL_LOGS_LABEL = 'All logs'; // Default filter label
export const columns: ColumnDef<OrganizationRequestLog>[]; // Table column definitions
```

These exports enable consistent pagination settings and table configurations across related components.