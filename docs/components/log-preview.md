# LogPreview Component

## Purpose
The `LogPreview` component displays detailed information about an organization's API request log in a structured, readable format. It serves as the primary interface for developers to inspect individual request logs, showing metadata like HTTP method, status, timing, authentication details, and query parameters in a well-formatted layout.

## Component Type
**Client Component** - Uses the `'use client'` directive because it requires:
- Interactive callback functions (`useCallback` for JSON processing)
- Client-side data transformation of URL query parameters
- Dynamic rendering based on loading states

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `log` | `OrganizationRequestLog \| undefined` | No | The request log data to display. When undefined, component renders empty |
| `isLoading` | `boolean \| undefined` | No | Loading state indicator. When true, component renders empty during data fetch |

## Usage Example

```tsx
import { LogPreview } from '@/components/developers/logs/log-preview';
import { useQuery } from '@tanstack/react-query';

function RequestLogDetail({ logId }: { logId: string }) {
  const { data: log, isLoading } = useQuery({
    queryKey: ['organization-log', logId],
    queryFn: () => fetchOrganizationLog(logId),
  });

  return (
    <div className="log-detail-panel">
      <LogPreview 
        log={log} 
        isLoading={isLoading} 
      />
    </div>
  );
}

// Usage in a log listing interface
function LogsInterface() {
  const [selectedLog, setSelectedLog] = useState<OrganizationRequestLog>();
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <LogsList onSelectLog={setSelectedLog} />
      <LogPreview log={selectedLog} />
    </div>
  );
}
```

## Functionality

### Core Features
- **Request Metadata Display**: Shows HTTP method, endpoint, status, and unique identifier
- **Dual Time Display**: Presents timestamps in both local time (formatted) and UTC (raw)
- **Authentication Context**: Displays API key preview used for the request
- **Network Information**: Shows originating IP address
- **Query Parameter Visualization**: Converts URL query strings to formatted JSON
- **Responsive Layout**: Adapts label widths for different screen sizes

### Data Processing
- **Query String Parsing**: Transforms URL query parameters into readable JSON format
- **Date Formatting**: Converts ISO timestamps to user-friendly relative dates
- **Conditional Rendering**: Only displays query preview when query data exists

## State Management
**Local State Only** - Uses `useCallback` for memoized query string processing. No external state management required as this is a pure presentation component that receives all data via props.

## Side Effects
**None** - This is a pure presentation component with no API calls, external mutations, or persistent side effects. Data transformation is performed synchronously.

## Dependencies

### UI Components
- `HttpMethod` - Displays HTTP method badges (GET, POST, etc.)
- `HttpRequestStatus` - Shows request status indicators
- `Typography` - Consistent text styling and hierarchy
- `JsonPreview` - Formatted JSON display for query parameters

### Utilities
- `parseISO` (date-fns) - ISO date string parsing
- `formatDateWithRelativeDay` - Custom date formatting utility

### Types
- `OrganizationRequestLog` - TypeScript interface for log data structure

## Integration

### Application Architecture
- **Domain**: Developer tools and API monitoring
- **Layer**: Feature component in `/developers/logs/` domain
- **Parent Components**: Log detail views, developer dashboards, request monitoring interfaces
- **Data Flow**: Receives processed log data from parent components managing TanStack Query

### Common Integration Patterns
```tsx
// In log management dashboard
function LogsDashboard() {
  const { data: logs } = useOrganizationLogs();
  const [selectedLogId, setSelectedLogId] = useState<string>();
  
  const selectedLog = logs?.find(log => log.id === selectedLogId);
  
  return (
    <div className="dashboard-layout">
      <LogsTable logs={logs} onSelectLog={setSelectedLogId} />
      <aside className="log-preview-panel">
        <LogPreview log={selectedLog} />
      </aside>
    </div>
  );
}
```

## Best Practices

### Architecture Compliance
✅ **Proper Client Component Usage**: Uses `'use client'` appropriately for callback memoization  
✅ **Component Decomposition**: Flat structure with clear separation of concerns  
✅ **Reusable UI Components**: Leverages `/ui/` components for consistent styling  
✅ **Domain Organization**: Properly nested in `/developers/logs/` feature directory  

### Implementation Patterns
✅ **Graceful Loading States**: Handles undefined data and loading states elegantly  
✅ **Responsive Design**: Adapts layout for different screen sizes  
✅ **Performance Optimization**: Uses `useCallback` for expensive JSON processing  
✅ **TypeScript Integration**: Fully typed props and data structures  

### Export Strategy
- **Named Exports**: Both component and `rowStyles` for external styling consistency
- **Reusable Styles**: Exports `rowStyles` constant for consistent row layouts across related components