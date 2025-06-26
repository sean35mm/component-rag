# HeroDropdown Component Documentation

## Purpose

The `HeroDropdown` component provides a comprehensive action menu for signal management in the signals details page. It offers different interfaces for desktop (dropdown) and mobile (sheet) devices, allowing users to edit, rename, pause/resume, and delete signals. The component includes proper permission handling, usage limit validation, and confirmation dialogs for destructive actions.

## Component Type

**Client Component** - Uses `'use client'` directive because it:
- Manages interactive state (dropdown open/closed, deletion loading)
- Handles user events (clicks, form submissions)
- Uses browser-specific hooks (`useRouter`, `useBreakpoint`)
- Requires real-time UI updates and animations

## Props Interface

### HeroDropdown & HeroDropdownMobile Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `signalId` | `string` | Yes | Unique identifier for the signal |
| `signalData` | `Signal` | Yes | Complete signal data object |
| `status` | `SignalStatusEnum` | Yes | Current status of the signal (ACTIVE, STOPPED, ARCHIVED) |
| `onStatusUpdate` | `(newStatus: SignalStatusEnum) => Promise<void>` | Yes | Callback function to update signal status |
| `onOpenRenameSignalDialog` | `() => void` | Yes | Callback to open the rename signal dialog |
| `isUpdatingSignal` | `boolean` | Yes | Loading state indicator for signal updates |

### HeroDropdownDelete Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onStatusUpdate` | `(newStatus: SignalStatusEnum) => Promise<void>` | Yes | Callback function to update signal status |
| `isUpdatingSignal` | `boolean` | Yes | Loading state indicator for signal updates |

## Usage Example

```tsx
import { HeroDropdown } from '@/components/signals/details/hero-dropdown';
import { SignalStatusEnum } from '@/lib/types';

function SignalDetailsPage({ signalId }: { signalId: string }) {
  const { data: signalData } = useSignalQuery(signalId);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const { mutateAsync: updateSignalStatus, isPending } = useUpdateSignalStatus();

  const handleStatusUpdate = async (newStatus: SignalStatusEnum) => {
    await updateSignalStatus({
      signalId,
      status: newStatus
    });
  };

  const handleOpenRenameDialog = () => {
    setIsRenameDialogOpen(true);
  };

  return (
    <div className="signal-header">
      <h1>{signalData?.name}</h1>
      <HeroDropdown
        signalId={signalId}
        signalData={signalData}
        status={signalData.status}
        onStatusUpdate={handleStatusUpdate}
        onOpenRenameSignalDialog={handleOpenRenameDialog}
        isUpdatingSignal={isPending}
      />
    </div>
  );
}
```

## Functionality

### Core Features

1. **Responsive Design**: Automatically switches between desktop dropdown and mobile sheet based on screen size
2. **Signal Editing**: Navigate to edit mode with usage limit validation
3. **Signal Renaming**: Trigger rename dialog for signal name updates
4. **Status Management**: Pause/resume signals with proper state transitions
5. **Signal Deletion**: Soft delete with confirmation dialog and loading states
6. **Usage Validation**: Checks signal limits before allowing activations

### Action Behaviors

- **Edit**: Validates usage limits and navigates to signal creation step 2
- **Rename**: Opens external rename dialog
- **Pause**: Changes status from ACTIVE to STOPPED
- **Resume**: Changes status from STOPPED to ACTIVE (with limit check)
- **Delete**: Archives signal and redirects to signals list

## State Management

### Local State
```tsx
const [isDeleting, setIsDeleting] = useState(false); // Delete operation loading
```

### External State Dependencies
- **TanStack Query**: Cache invalidation for usage and signal queries
- **Usage Context**: Signal limit validation and remaining counts
- **Access Token Context**: Authentication for API calls
- **Signal Creation Hook**: Usage limit validation and toast notifications

## Side Effects

### Query Cache Management
```tsx
// Invalidates usage data after status changes
queryClient.invalidateQueries({
  queryKey: queryKeys.usage._def,
});

// Refreshes current signal data
queryClient.invalidateQueries({
  queryKey: queryKeys.signals.getById(token?.token || '', signalId).queryKey,
});
```

### Navigation
- Redirects to `/signals` after successful deletion
- Navigates to edit mode for signal modification

### Toast Notifications
- Shows error messages for failed operations
- Displays usage limit warnings

## Dependencies

### UI Components
- `DropdownMenu`, `Sheet`, `Dialog` from shadcn/ui
- `Button`, `Typography` for consistent styling

### Custom Hooks
- `useBreakpoint`: Responsive behavior detection
- `useSwitchSignalEditMode`: Signal editing navigation
- `useSignalCreation`: Usage limit validation
- `useToast`: Error and success notifications

### Contexts
- `useAccessToken`: Authentication state
- `useUsageContext`: Signal usage limits and counts

### External Libraries
- `@tanstack/react-query`: Cache management
- `next/navigation`: Client-side routing

## Integration

### Application Architecture
```
SignalDetailsPage
├── SignalHeader
│   ├── SignalTitle
│   └── HeroDropdown ← This component
├── SignalContent
└── SignalActions
```

### Data Flow
1. Parent component provides signal data and status update handler
2. Component validates user permissions and usage limits
3. Status changes trigger parent callback and cache invalidation
4. Navigation events route to appropriate pages/modes

## Best Practices

### ✅ Follows Architecture Guidelines

1. **Proper Component Decomposition**: 
   - Split into three focused components (Desktop, Mobile, Delete)
   - Each handles specific UI patterns and behaviors

2. **State Management**:
   - Uses TanStack Query for server state invalidation
   - Local state only for UI-specific loading states
   - Leverages context for shared application state

3. **Responsive Design**:
   - Single component API with automatic responsive behavior
   - Platform-appropriate UI patterns (dropdown vs sheet)

4. **Error Handling**:
   - Comprehensive try-catch blocks
   - User-friendly error messages via toast system
   - Loading states prevent double-clicks

5. **Performance**:
   - Memoized callbacks prevent unnecessary re-renders
   - Conditional rendering based on signal status
   - Efficient query invalidation patterns

### Usage Considerations

- Always provide proper loading states via `isUpdatingSignal`
- Ensure parent components handle the status update promise properly
- Consider usage limits when implementing signal activation features
- Test responsive behavior across different screen sizes