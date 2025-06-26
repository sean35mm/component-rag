# RecentRequest Component

## Purpose

The `RecentRequest` component displays a single HTTP request log entry in a formatted list item. It provides a visual representation of API request details including the HTTP method, endpoint, status code, and timestamp. This component is designed to be used within request monitoring interfaces and developer dashboards where users need to quickly scan through recent API activity.

## Component Type

**Server Component** - This is a pure presentation component that doesn't require client-side interactivity, event handlers, or browser APIs. It renders static content based on props and can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `OrganizationRequestLog` | Yes | The request log object containing method, endpoint, status, and timestamp data |

### OrganizationRequestLog Interface
```typescript
interface OrganizationRequestLog {
  method: string;        // HTTP method (GET, POST, PUT, DELETE, etc.)
  endpoint: string;      // API endpoint URL
  status: number;        // HTTP status code
  createdAt: string;     // ISO timestamp of when the request was made
}
```

## Usage Example

```tsx
import { RecentRequest } from '@/components/developers/recent-requests/recent-request';

// Example usage in a request monitoring dashboard
function RequestsPanel() {
  const recentRequests = [
    {
      method: 'GET',
      endpoint: '/api/users/123',
      status: 200,
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      method: 'POST',
      endpoint: '/api/organizations',
      status: 201,
      createdAt: '2024-01-15T10:25:00Z'
    },
    {
      method: 'DELETE',
      endpoint: '/api/users/456',
      status: 404,
      createdAt: '2024-01-15T10:20:00Z'
    }
  ];

  return (
    <div className="space-y-2">
      <h3>Recent API Requests</h3>
      {recentRequests.map((request, index) => (
        <RecentRequest key={index} request={request} />
      ))}
    </div>
  );
}
```

## Functionality

- **Method Display**: Shows HTTP method in a styled badge with consistent visual treatment
- **Endpoint Rendering**: Displays the API endpoint path in readable typography
- **Status Visualization**: Uses the `HttpRequestStatus` component to show status codes with appropriate styling
- **Timestamp Formatting**: Converts ISO timestamps to human-readable format (e.g., "Jan 15, 2024, 10:30am")
- **List Item Layout**: Provides consistent spacing and borders for use in request lists

## State Management

**No State Management** - This is a pure functional component that doesn't manage any internal state. It receives all necessary data through props and renders static content. State management is handled by parent components that fetch and manage the request logs data.

## Side Effects

**No Side Effects** - The component has no side effects, API calls, or external interactions. The only external dependency is the `date-fns/format` function for timestamp formatting, which is a pure function.

## Dependencies

### UI Components
- `@/components/ui/badge` - For displaying HTTP method labels
- `@/components/ui/http-request-status` - For status code visualization
- `@/components/ui/typography` - For consistent text styling

### External Libraries
- `date-fns/format` - For timestamp formatting

### Type Definitions
- `@/lib/types/organization-requests` - For the `OrganizationRequestLog` interface

## Integration

This component fits into the developer tools section of the application architecture:

```
src/components/developers/
├── recent-requests/
│   ├── recent-request.tsx          # This component
│   ├── recent-requests-list.tsx    # Parent container component
│   └── recent-requests-panel.tsx   # Feature panel wrapper
```

**Parent Components**: Typically used within request monitoring dashboards, API analytics panels, or developer console interfaces where users need to view recent API activity.

**Data Flow**: Receives processed request log data from parent components that handle data fetching via TanStack Query or similar data management solutions.

## Best Practices

✅ **Follows Architecture Guidelines**:
- **Server Component**: No client-side interactivity required
- **Component Decomposition**: Single responsibility (displays one request)
- **Reusability**: Accepts generic request log interface, not tightly coupled
- **UI Components**: Uses established UI components from `/ui/` directory

✅ **Design Patterns**:
- **Pure Function**: No side effects or state mutations
- **Props Interface**: Clear, typed interface with required data only
- **Consistent Styling**: Uses design system components and Tailwind classes
- **Semantic Structure**: Logical DOM structure with proper spacing

✅ **Performance Considerations**:
- **Lightweight**: Minimal computational overhead
- **Server Renderable**: Can be pre-rendered for better performance
- **Date Formatting**: Uses efficient `date-fns/format` function

✅ **Accessibility**:
- Uses semantic HTML structure
- Leverages Typography component for consistent text rendering
- Maintains proper visual hierarchy with spacing and colors