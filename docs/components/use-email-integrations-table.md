# use-email-integrations-table Hook

## Purpose

The `use-email-integrations-table` hook provides table configuration and utilities for managing email integrations in the settings section. It defines column structures for displaying email integration data including verification status, dates, and action buttons, following TanStack Table patterns for consistent table behavior across the application.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Utilizes React hooks (`useMemo`) for performance optimization
- Manages interactive table column definitions with click handlers
- Renders client-side UI components that require browser APIs

## Props Interface

### EmailIntegration Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `email` | `string` | Optional | The email address for the integration |
| `status` | `string` | Optional | Verification status of the email integration |
| `createdOn` | `string` | Optional | Date when the integration was created |
| `verifiedOn` | `string` | Optional | Date when the email was verified |

### Hook Return Value

| Property | Type | Description |
|----------|------|-------------|
| `columns` | `ColumnDef<EmailIntegration>[]` | TanStack Table column definitions for email integrations |

## Usage Example

```tsx
import { useEmailIntegrationsTable } from '@/components/settings/integrations/hooks/use-email-integrations-table';
import { DataTable } from '@/components/ui/data-table';

const EmailIntegrationsPage = () => {
  const { columns } = useEmailIntegrationsTable();
  
  // Sample data - typically from API
  const emailIntegrations = [
    {
      email: 'user@example.com',
      status: 'Verified',
      createdOn: '2024-01-15',
      verifiedOn: '2024-01-16',
    },
    {
      email: 'pending@example.com',
      status: 'Not Verified',
      createdOn: '2024-01-20',
      verifiedOn: undefined,
    },
  ];

  return (
    <div className="space-y-4">
      <h2>Email Integrations</h2>
      <DataTable
        columns={columns}
        data={emailIntegrations}
      />
    </div>
  );
};
```

## Functionality

### Core Features

- **Column Definitions**: Provides standardized table columns for email integration display
- **Status Mapping**: Converts string status values to appropriate badge variants
- **Interactive Actions**: Includes send email and remove integration action buttons
- **Responsive Layout**: Uses appropriate spacing and typography for different screen sizes
- **Memoization**: Optimizes performance by memoizing column definitions

### Column Structure

1. **Email Column**: Displays email address with mail icon
2. **Status Column**: Shows verification status with colored badges
3. **Created On Column**: Displays creation date
4. **Verified On Column**: Shows verification date (if applicable)
5. **Send Email Action**: Button to trigger email sending
6. **Remove Action**: Button to delete the integration

## State Management

**Local State Only** - This hook uses:
- `useMemo` for performance optimization of column definitions
- No external state management required as it only provides configuration
- State management for actual data should be handled by the consuming component using TanStack Query

## Side Effects

**No Direct Side Effects** - The hook itself doesn't perform side effects, but:
- Action buttons in columns are prepared for click handlers (implementation in consuming components)
- Column definitions are memoized to prevent unnecessary re-renders

## Dependencies

### Internal Dependencies
- `@/components/icons` - Mail and delete icons
- `@/components/ui/compact-button` - Action buttons
- `@/components/ui/key-icon` - Email icon wrapper
- `@/components/ui/status-badge` - Status display
- `@/components/ui/typography` - Text styling

### External Dependencies
- `@tanstack/react-table` - Table column definitions
- `react` - React hooks

## Integration

### Application Architecture Role
- **Settings Layer**: Part of the integrations management system
- **Table Configuration**: Provides standardized table structure for email integrations
- **UI Consistency**: Ensures consistent presentation across email integration tables

### Data Flow
```
API Data → Consuming Component → useEmailIntegrationsTable → TanStack Table → UI
```

## Best Practices

### Architectural Adherence
- ✅ **Proper Client Component Usage**: Uses `'use client'` appropriately for interactive features
- ✅ **Component Decomposition**: Separates table configuration logic from presentation
- ✅ **Reusability**: Hook can be used across different email integration views
- ✅ **Performance**: Uses `useMemo` to prevent unnecessary column recalculations

### Implementation Patterns
- ✅ **Type Safety**: Provides proper TypeScript interfaces
- ✅ **Consistent Styling**: Uses design system components
- ✅ **Separation of Concerns**: Hook handles configuration, consuming component handles data
- ✅ **Standardization**: Follows TanStack Table patterns for consistency

### Recommended Usage
- Use with TanStack Query for data fetching in consuming components
- Implement action handlers in parent components
- Combine with proper loading and error states
- Follow the flat component structure by keeping table logic separate from data management