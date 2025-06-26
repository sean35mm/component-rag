# SignalDeliveryList Component

## Purpose

The `SignalDeliveryList` component displays and manages email contact points for signal delivery notifications. It provides a comprehensive interface for viewing email verification status, managing email addresses, and performing actions like resending verification emails or deleting contact points. This component is part of the signal delivery settings system.

## Component Type

**Client Component** (`'use client'`)

This component requires client-side interactivity for:
- Table interactions and sorting functionality
- Action button handlers for delete and resend operations
- State management for dialog controls
- User event handling and callbacks

## Props Interface

### SignalDeliveryList

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | This component accepts no props |

### ActionButtons

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `row` | `Row<ContactPoint>` | Yes | TanStack Table row object containing contact point data |

### columns

| Export | Type | Description |
|---------|------|-------------|
| `columns` | `ColumnDef<ContactPoint>[]` | Table column definitions for TanStack Table |

## Usage Example

```tsx
import { SignalDeliveryList } from '@/components/settings/signal-delivery/signal-delivery-list';

// Basic usage in settings page
export function SignalDeliverySettings() {
  return (
    <div className="space-y-6">
      <div className="header-section">
        <h1>Signal Delivery Settings</h1>
        <p>Manage your email notifications</p>
      </div>
      
      {/* Component handles all data fetching and state management */}
      <SignalDeliveryList />
    </div>
  );
}

// Usage with external column definitions
import { columns } from '@/components/settings/signal-delivery/signal-delivery-list';

export function CustomSignalTable() {
  const { data: contactPoints } = useContactPoints();
  
  return (
    <DataTable
      data={contactPoints}
      columns={columns}
      // ... other table props
    />
  );
}
```

## Functionality

### Core Features

- **Email Contact Point Display**: Shows email addresses with verification status
- **Status Visualization**: Displays verified/unverified status with appropriate badges
- **Date Formatting**: Shows creation and verification dates with relative formatting
- **Action Management**: Provides resend verification and delete functionality
- **Responsive Design**: Includes mobile card view via `SignalDeliveryCardList`
- **Statistics Display**: Shows count of verified vs pending emails

### Table Columns

- **Email**: Contact point email address with mail icon
- **Status**: Verification status badge (Verified/Not Verified)
- **Created On**: Formatted creation date with relative display
- **Verified On**: Formatted verification date or "Pending" status
- **Actions**: Contextual action buttons with tooltips

### Action Capabilities

- **Resend Verification**: Available for unverified emails
- **Delete Contact Point**: Available for all contact points with confirmation
- **Tooltip Guidance**: Helpful tooltips explain each action

## State Management

### TanStack Query (Server State)
```tsx
const {
  data: contactPoints = [],
  isError,
  isLoading,
} = useContactPoints(
  {
    size: 100,
    sortBy: 'createdAt',
    sortOrder: 'desc',
    status: [ACTIVE, FAILING, STOPPED],
  },
  {
    select: (r) => r.data.filter((cp) => cp.type === EMAIL),
  }
);
```

### Zustand Store (Client State)
```tsx
// Dialog state management
const setIsDeleteDialogOpen = useSignalDeliveryStore(state => state.setIsDeleteDialogOpen);
const setIsResendDialogOpen = useSignalDeliveryStore(state => state.setIsResendDialogOpen);
const setSignalDeliveryIdToDelete = useSignalDeliveryStore(state => state.setSignalDeliveryIdToDelete);
const setSignalDeliveryName = useSignalDeliveryStore(state => state.setSignalDeliveryName);
```

## Side Effects

### Data Fetching
- Automatically fetches contact points on component mount
- Filters for email-type contact points only
- Applies status filtering for active, failing, and stopped states

### User Actions
- Opens delete confirmation dialog with contact point context
- Opens resend verification dialog with email context
- Updates global state for dialog management

### Error Handling
- Displays loading state during data fetch
- Shows error state if data fetching fails
- Gracefully handles empty contact point lists

## Dependencies

### UI Components
- `CrudTable` - Main table display component
- `CompactButton` - Action buttons
- `StatusBadge` - Verification status display
- `KeyIcon` - Email icon display
- `Tooltip` components - Action guidance
- `Typography` - Text styling

### Icons
- `PiDeleteBinLine` - Delete action
- `PiMailLine` - Email display
- `PiMailSendFill` - Table header icon
- `PiMailSendLine` - Resend action

### Hooks & Context
- `useContactPoints` - Data fetching hook
- `useSignalDeliveryStore` - Dialog state management

### Child Components
- `DeleteSignalDeliveryDialog` - Confirmation dialog
- `ResendSignalDeliveryDialog` - Resend confirmation dialog
- `SignalDeliveryCardList` - Mobile view component

### Types
- `ContactPoint` - Main data interface
- `ContactPointStatusEnum` - Status enumeration
- `ContactPointTypeEnum` - Type enumeration

## Integration

### Settings Architecture
```
Settings
├── SignalDeliverySettings
│   ├── SignalDeliveryList (this component)
│   ├── AddEmailForm
│   └── GeneralSettings
└── Other Settings Sections
```

### Data Flow
1. Component fetches contact points via `useContactPoints`
2. Data is filtered for email-type contact points
3. Table displays data with sorting and pagination
4. User actions update Zustand store state
5. Child dialogs react to state changes
6. Actions trigger API calls through dialog components

### State Integration
- Integrates with global signal delivery Zustand store
- Coordinates with dialog components through shared state
- Maintains table state through TanStack Table

## Best Practices

### Architecture Adherence
- ✅ **Flat Component Structure**: Child dialogs are siblings, not nested
- ✅ **Separation of Concerns**: Table logic separate from action logic
- ✅ **Reusable Exports**: Column definitions exported for reuse
- ✅ **State Colocated**: Dialog state managed in dedicated store

### Performance Optimizations
- ✅ **Memoized Callbacks**: Action handlers use `useCallback`
- ✅ **Efficient Filtering**: Server-side status filtering
- ✅ **Selective Data**: Query select function filters email types
- ✅ **Conditional Rendering**: Actions only render when applicable

### User Experience
- ✅ **Loading States**: Proper loading and error state handling
- ✅ **Responsive Design**: Mobile card view for smaller screens
- ✅ **Contextual Actions**: Actions appear based on item state
- ✅ **Helpful Tooltips**: Clear action descriptions

### Code Organization
- ✅ **Clear Exports**: Multiple focused exports from single file
- ✅ **Type Safety**: Full TypeScript integration
- ✅ **Consistent Patterns**: Follows established table patterns
- ✅ **Maintainable Structure**: Easy to extend and modify