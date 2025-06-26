# SignalView Component

## Purpose

The `SignalView` component is a comprehensive view for displaying and managing individual signals within the application. It provides a tabbed interface for viewing signal details, managing signal status, and accessing both overview information and alert history. This component serves as the main detail page for signals, offering users full control over signal operations including activation, pausing, archiving, and status monitoring.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Browser-specific hooks like `useSearchParams` and `useRouter` for URL manipulation
- Real-time data fetching with refetch intervals
- Complex state management for signal status updates
- Interactive features like tab navigation and status controls

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `signal` | `Signal` | Yes | The signal object containing all signal data and configuration |

## Usage Example

```tsx
import { SignalView } from '@/components/signals/signal-view';
import { Signal } from '@/lib/types';

// In a page component
export default function SignalDetailPage({ params }: { params: { id: string } }) {
  const signal = await getSignalById(params.id);
  
  return (
    <main>
      <SignalView signal={signal} />
    </main>
  );
}
```

## Functionality

### Core Features
- **Signal Status Management**: Update signal status (active, stopped, archived) with optimistic updates
- **Tabbed Navigation**: Switch between "Overview" and "Alert History" views
- **Real-time Updates**: Auto-refresh signal notifications every 60 seconds
- **Welcome Flow**: Handle first-time signal creation with welcome dialog
- **Draft Signal Completion**: Guide users through completing draft signal setup
- **Unsubscribe Management**: Handle signal unsubscription workflows

### Tab Management
- **Overview Tab**: Displays signal details, latest results, and allows issue reporting
- **Alert History Tab**: Shows chronological list of signal notifications
- URL-synchronized tab state with query parameters

### Status Operations
- Pause/resume signal execution
- Archive (delete) signals with folder cleanup
- Real-time status reflection across the interface
- Toast notifications for operation feedback

## State Management

### Local State
- `status`: Tracks current signal status with optimistic updates
- Synchronized with prop changes via `useEffect`

### Server State (TanStack Query)
- **Signal Updates**: `useUpdateSignal` mutation for status changes
- **Notifications**: `useSignalsNotifications` query with real-time polling
- Automatic background refetching for live data updates

### URL State
- Tab selection persisted in URL query parameters
- Welcome signal parameter management
- Scroll-free navigation updates

## Side Effects

### Data Fetching
- Polls signal notifications every 60 seconds (including background)
- Fetches most recent notification for signal status display
- Automatic query invalidation on signal updates

### URL Management
- Updates URL parameters for tab navigation
- Removes welcome signal parameters after onboarding
- Maintains browser history without scroll resets

### User Feedback
- Toast notifications for operation success/failure
- Loading states during status updates
- Skeleton loading for initial data fetch

### Scroll Management
- Auto-scroll to top when notifications finish loading
- Scroll-free tab navigation

## Dependencies

### UI Components
- `Tabs`, `TabsContent`, `TabsList`, `TabsTrigger` from UI library
- `SignalDetailsSkeleton` for loading states
- Custom toast system for notifications

### Signal-Specific Components
- `SignalDetailsHero`: Main signal information and controls
- `SignalDetailsOverview`: Detailed signal configuration view
- `LatestResults`: Recent signal execution results
- `SignalDetailsAlertHistoryById`: Historical notifications list
- `CompleteDraftSignalSetup`: Draft signal completion flow
- `WelcomeToSignalsDialog`: First-time user onboarding
- `UnsubscribeDialogManager`: Unsubscription workflow

### Hooks and Services
- `useUpdateSignal`: Signal mutation operations
- `useSignalsNotifications`: Notification data fetching
- Next.js navigation hooks for URL management

### Contexts
- `ReportIssueDialogProvider`: Issue reporting functionality

## Integration

### Application Architecture
- Integrates with signal management system as primary detail view
- Connects to notification service for real-time updates
- Part of larger signals domain with shared components and services

### Data Flow
- Receives signal data from parent route/page component
- Manages local status state with server synchronization
- Provides context for child components through providers

### Navigation Integration
- URL-based tab state for bookmarkable views
- Query parameter management for various features
- Seamless integration with Next.js App Router

## Best Practices

### Component Architecture Adherence
- ✅ **Flat Structure**: Child components are organized by feature domain
- ✅ **Lego Block Pattern**: Composable components for different signal views
- ✅ **Proper Client Component Usage**: Uses 'use client' only when necessary for interactivity

### State Management Patterns
- ✅ **TanStack Query**: Server state with proper caching and background updates
- ✅ **Local State**: Minimal local state for UI-specific concerns
- ✅ **Optimistic Updates**: Immediate UI feedback with rollback capability

### Performance Considerations
- ✅ **Memoization**: Component wrapped in `memo` to prevent unnecessary re-renders
- ✅ **Callback Optimization**: Memoized callbacks to prevent child re-renders
- ✅ **Selective Data Fetching**: Custom selectors to minimize data processing

### User Experience
- ✅ **Loading States**: Comprehensive skeleton loading for better perceived performance
- ✅ **Error Handling**: Graceful error handling with user feedback
- ✅ **Real-time Updates**: Background polling for fresh data without user intervention

### Code Organization
- ✅ **Feature Separation**: Clear separation between overview and alert history functionality
- ✅ **Context Usage**: Appropriate use of React Context for cross-component communication
- ✅ **Hook Abstraction**: Custom hooks for complex logic encapsulation