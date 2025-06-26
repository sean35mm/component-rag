# LogCard Component

## Purpose

The `LogCard` component displays individual HTTP request log entries in a card format within the developers' logging interface. It presents key information about API requests including HTTP method, endpoint, status, and timestamp, while providing interactive functionality to view detailed log information.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Handles click events for user interaction
- Manages local event handlers with `useCallback`
- Interacts with Zustand store for state management
- Requires DOM event handling for menu detection

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `log` | `OrganizationRequestLog` | Yes | The log data object containing request details |
| `className` | `string` | No | Additional CSS classes for styling customization |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | No | Standard HTML div attributes |

## Usage Example

```tsx
import { LogCard } from '@/components/developers/logs/log-card';
import { OrganizationRequestLog } from '@/lib/types';

function LogsList() {
  const logs: OrganizationRequestLog[] = [
    {
      id: '1',
      method: 'GET',
      endpoint: '/api/users',
      status: 200,
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: '2', 
      method: 'POST',
      endpoint: '/api/orders',
      status: 400,
      createdAt: '2024-01-15T11:15:00Z'
    }
  ];

  return (
    <div className="space-y-2">
      {logs.map((log) => (
        <LogCard 
          key={log.id} 
          log={log}
          className="hover:shadow-md transition-shadow"
        />
      ))}
    </div>
  );
}
```

## Functionality

- **Visual Log Display**: Renders log information in a structured card layout
- **Interactive Selection**: Click handling to select and view detailed log information
- **Smart Click Detection**: Prevents drawer opening when clicking on menu items
- **Status Visualization**: Displays HTTP method badges and request status indicators
- **Timestamp Formatting**: Shows formatted dates with relative day information
- **Options Menu**: Provides additional actions through an integrated options menu
- **Responsive Design**: Flexible layout that adapts to different screen sizes

## State Management

**Zustand Store Integration**:
- Uses `useLogsStore` for managing logs-related state
- `setSelectedLog`: Updates the currently selected log for detailed view
- `setIsOpenLogDrawer`: Controls the visibility of the log details drawer
- No local state management - relies entirely on global store

## Side Effects

- **Drawer State Management**: Opens log drawer when card is clicked
- **Log Selection**: Updates global selected log state on interaction
- **Event Propagation Control**: Prevents unwanted interactions with nested menu components

## Dependencies

### UI Components
- `HttpMethod`: Displays HTTP method badges (GET, POST, etc.)
- `HttpRequestStatus`: Shows request status indicators
- `Typography`: Consistent text styling and hierarchy

### Utility Functions
- `parseISO`: Date parsing from date-fns library
- `formatDateWithRelativeDay`: Custom date formatting utility
- `cn`: CSS class name utility for conditional styling

### Store & Types
- `useLogsStore`: Zustand store for logs state management
- `OrganizationRequestLog`: TypeScript interface for log data structure

### Child Components
- `CardOptionsMenu`: Contextual menu for additional log actions

## Integration

The `LogCard` component integrates into the larger application architecture as:

- **Part of Logs Feature**: Core component in the developers' logging interface
- **List Item Component**: Designed to be rendered in collections/lists of logs
- **Drawer Trigger**: Initiates detailed log view through drawer interaction
- **State Consumer**: Consumes and updates global logs state through Zustand
- **Event Handler**: Manages user interactions within the logs workflow

## Best Practices

✅ **Follows Architecture Guidelines**:
- **Client Component Usage**: Appropriately uses client-side rendering for interactive features
- **Flat Component Structure**: Avoids deep nesting, composes with child components
- **Zustand for Client State**: Uses Zustand store for managing application state
- **Component Decomposition**: Breaks down into smaller, focused UI components
- **Domain Organization**: Located in feature-specific directory structure

✅ **Performance Optimizations**:
- Uses `useCallback` for event handlers to prevent unnecessary re-renders
- Minimal re-render triggers through targeted state updates
- Efficient click detection with DOM traversal

✅ **User Experience**:
- Clear visual hierarchy with proper typography components
- Intuitive click interactions with smart menu detection
- Consistent styling patterns with design system components

✅ **Type Safety**:
- Strongly typed props interface extending HTML attributes
- Proper TypeScript integration with store and utility functions