# SignalDetailsHero Component Documentation

## Purpose

The `SignalDetailsHero` component serves as the main header section for signal detail pages, displaying comprehensive signal information including status, metadata, and primary actions. It provides users with an overview of the signal's current state and enables key operations like status management, editing, and navigation.

## Component Type

**Client Component** - Uses `'use client'` directive because it:
- Manages local state for dialog visibility
- Handles user interactions (buttons, dropdowns)
- Uses browser-specific hooks like `useRouter`
- Implements responsive behavior with breakpoint detection

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `signalData` | `Signal` | ✅ | Complete signal object containing configuration and metadata |
| `status` | `SignalStatusEnum` | ✅ | Current status of the signal (ACTIVE, STOPPED, ARCHIVED, DRAFT) |
| `onStatusUpdate` | `(newStatus: SignalStatusEnum) => Promise<void>` | ✅ | Callback function to handle signal status changes |
| `mostRecentSignalNotificationForSelectedSignal` | `SignalNotification` | ❌ | Latest notification data for calculating last alert time |
| `isUpdatingSignal` | `boolean` | ✅ | Loading state indicator for status update operations |

## Usage Example

```tsx
import { SignalDetailsHero } from '@/components/signals/details/signal-details-hero';

export function SignalDetailPage({ signalId }: { signalId: string }) {
  const { data: signalData } = useQuery({
    queryKey: queryKeys.signals.getById(token, signalId),
    queryFn: () => signalsApi.getById(signalId)
  });

  const { mutateAsync: updateStatus, isPending } = useMutation({
    mutationFn: (status: SignalStatusEnum) => 
      signalsApi.updateStatus(signalId, status)
  });

  const handleStatusUpdate = async (newStatus: SignalStatusEnum) => {
    await updateStatus(newStatus);
    // Query invalidation handled within component
  };

  return (
    <div>
      <SignalDetailsHero
        signalData={signalData}
        status={signalData.status}
        onStatusUpdate={handleStatusUpdate}
        mostRecentSignalNotificationForSelectedSignal={latestNotification}
        isUpdatingSignal={isPending}
      />
      {/* Rest of signal details */}
    </div>
  );
}
```

## Functionality

### Core Features
- **Signal Overview Display**: Shows signal name, type, creation date, and last alert time
- **Status Management**: Visual status badges and action buttons for play/pause/resume
- **Responsive Design**: Adapts layout between desktop and mobile viewports
- **Image Display**: Renders signal query image with fallback support
- **Navigation**: Back button to return to signals list
- **Signal Type Indicators**: Visual icons for different signal types (Anomaly Detection, As It Happens, Scheduled Digest)

### Interactive Elements
- **Status Control Buttons**: Context-aware buttons based on current signal status
- **Rename Functionality**: Inline name editing through dialog
- **Dropdown Menus**: Desktop and mobile-specific dropdown options
- **Edit Mode Switching**: Direct navigation to signal editing flow

## State Management

### Local State
- `isRenameSignalDialogOpen`: Controls rename dialog visibility using `useState`

### TanStack Query Integration
- **Query Invalidation**: Automatically invalidates usage and signal queries after status updates
- **Cache Management**: Ensures data consistency across signal operations

### External State Dependencies
- **Usage Context**: Monitors active signal limits for pause/resume operations
- **Access Token**: Provides authentication for query operations

## Side Effects

### Query Invalidation
```tsx
// Invalidates usage data after status changes
queryClient.invalidateQueries({ queryKey: queryKeys.usage._def });

// Invalidates specific signal data
queryClient.invalidateQueries({
  queryKey: queryKeys.signals.getById(token?.token || '', signalData.uuid).queryKey
});
```

### Navigation Effects
- Router navigation to signals list with query invalidation
- Edit mode switching with signal creation flow integration

### Usage Limit Enforcement
- Checks signal limits before allowing resume operations
- Shows appropriate toasts when limits are exceeded

## Dependencies

### Custom Hooks
- `useBreakpoint`: Responsive design detection
- `useSwitchSignalEditMode`: Signal editing navigation
- `useSignalCreation`: Signal limit validation
- `useAccessToken`: Authentication state
- `useUsageContext`: Usage limits and quotas

### UI Components
- `Badge`, `Button`, `ImageWithFallback`, `Typography`: Core UI elements
- `HeroDropdown`, `HeroDropdownMobile`: Action menus
- `RenameSignalDialog`: Signal renaming interface

### External Dependencies
- `@tanstack/react-query`: Query state management
- `next/navigation`: App router navigation

## Integration

### Signal Management Flow
```
Signal List → Signal Details Hero → Edit/Status Actions
     ↑              ↓                      ↓
Query Cache ← Status Updates → API Calls
```

### Responsive Architecture
- Desktop: Horizontal layout with full dropdown menus
- Mobile: Vertical stacking with mobile-optimized dropdowns
- Breakpoint-driven component switching

### Data Flow Integration
- Receives signal data from parent page queries
- Propagates status changes through callback props
- Maintains cache consistency through query invalidation

## Best Practices

### Architecture Adherence
- ✅ **Component Decomposition**: Separates dropdown logic into dedicated components
- ✅ **State Management**: Uses TanStack Query for server state, local state only for UI
- ✅ **Reusability**: Leverages UI components from `/ui/` directory
- ✅ **Props Interface**: Clean, typed interface with clear responsibilities

### Performance Optimizations
- **Memoized Calculations**: Uses `useMemo` for expensive computations
- **Callback Optimization**: Implements `useCallback` for stable references
- **Image Optimization**: Priority loading for hero images

### User Experience
- **Status Feedback**: Visual indicators for loading states
- **Responsive Design**: Consistent experience across devices
- **Contextual Actions**: Status-appropriate button visibility
- **Navigation Consistency**: Proper back navigation with state management

### Error Handling
- **Fallback Images**: Graceful degradation for missing images
- **Usage Limits**: Proactive limit checking with user feedback
- **Status Validation**: Type-safe status badge configuration

## Exported Values

### Components
- `SignalDetailsHero`: Main hero component

### Configuration
- `statusBadgeConfig`: Status-to-badge mapping configuration for reuse across signal components