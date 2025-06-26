# EmailAlertMethod Component

## Purpose

The `EmailAlertMethod` component provides an interactive email notification method selector for signal creation. It allows users to enable email alerts, select multiple email addresses (including creating new ones), and handles validation and state management for email-based notifications within the signal creation workflow.

## Component Type

**Client Component** - Uses the `'use client'` directive (implied by React hooks usage) because it:
- Manages interactive UI state with checkboxes and form inputs
- Handles user interactions and event callbacks
- Uses multiple React hooks (useState, useCallback, useMemo)
- Integrates with Zustand store for client-side state management

## Props Interface

This component accepts no props - it's a self-contained feature component that manages its own state through the Zustand store.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | This component takes no props |

## Usage Example

```tsx
import { EmailAlertMethod } from '@/components/signals/creation/alert-methods/email-alert-method';

// Used within a signal creation form
function SignalCreationForm() {
  return (
    <div className="space-y-4">
      <h2>Alert Methods</h2>
      <EmailAlertMethod />
      {/* Other alert method components */}
    </div>
  );
}

// Used in alert methods selection
function AlertMethodsSection() {
  return (
    <div className="grid gap-4">
      <EmailAlertMethod />
      {/* SlackAlertMethod, WebhookAlertMethod, etc. */}
    </div>
  );
}
```

## Functionality

### Core Features
- **Email Method Toggle**: Checkbox to enable/disable email notifications
- **Multi-Email Selection**: Supports selecting multiple email addresses with autocomplete
- **Email Creation**: Allows users to add new email addresses on-the-fly
- **Auto-Population**: Automatically adds user's email when enabled
- **Validation**: Ensures at least one email is selected when method is enabled
- **Volume-Based Restrictions**: Disables email method for high-volume signals with immediate notifications

### User Interactions
- Click anywhere on container to toggle email method (except on input fields)
- Checkbox for explicit enable/disable control
- Multi-select dropdown for email management
- Real-time validation feedback

### Conditional Logic
- Disables entire component when `articlesVolumeRange === 'HIGH'` and `notificationPolicy === 'IMMEDIATE'`
- Shows warning badge and lock icon when disabled
- Automatically populates user email when first enabled

## State Management

### Zustand Store Integration
Uses `useCreateSignalStore` for centralized signal creation state:

```tsx
// State accessed from store
const notificationPolicy = useCreateSignalStore(state => state.notificationPolicy);
const selectedContactPointEmails = useCreateSignalStore(state => state.selectedContactPointEmails);
const emailAlertMethodError = useCreateSignalStore(state => state.emailAlertMethodError);
const isEmailAlertMethodChecked = useCreateSignalStore(state => state.isEmailAlertMethodChecked);

// Actions accessed from store
const setSelectedContactPointEmails = useCreateSignalStore(state => state.setSelectedContactPointEmails);
const setEmailAlertMethodError = useCreateSignalStore(state => state.setEmailAlertMethodError);
const setIsEmailAlertMethodChecked = useCreateSignalStore(state => state.setIsEmailAlertMethodChecked);
```

### Local State
- Uses `useMemo` for derived state (existing email options)
- Uses `useCallback` for memoized event handlers

## Side Effects

### API Calls
- **Contact Points Query**: Fetches existing email contact points for autocomplete
- **User Details Query**: Retrieves current user's email for auto-population

### Data Fetching Parameters
```tsx
useContactPoints({
  page: 0,
  size: 10000,
  sortBy: 'createdAt',
  sortOrder: 'desc',
  status: [ACTIVE, FAILING, STOPPED],
});
```

### State Updates
- Updates global signal creation state through Zustand actions
- Clears/sets validation errors based on user input
- Synchronizes email selection with checkbox state

## Dependencies

### Custom Hooks
- `useCreateSignalStore` - Signal creation state management
- `useSignalArticlesVolume` - Article volume calculations
- `useContactPoints` - Contact points data fetching
- `useUserDetails` - Current user information

### UI Components
- `Checkbox` - Email method toggle
- `MultipleSelector` - Email selection with creation
- `Typography` - Text styling and hierarchy
- `Badge` - Warning indicators

### Icons
- `PiErrorWarningLine` - Warning states
- `PiLock2Line` - Disabled state indicator

## Integration

### Signal Creation Workflow
The component integrates into the broader signal creation process:

1. **Form Step**: Part of alert methods configuration step
2. **State Coordination**: Shares state with other alert method components
3. **Validation Chain**: Contributes to overall form validation
4. **Submission Flow**: Email selections included in signal creation payload

### Contact Point System
- Leverages existing contact point infrastructure
- Supports creating new email contact points inline
- Integrates with contact point status system

## Best Practices

### Architecture Adherence
✅ **Proper Component Type**: Client component for interactive features
✅ **State Management**: Uses Zustand for cross-component state, TanStack Query for server state
✅ **Component Decomposition**: Self-contained feature component with clear responsibilities
✅ **UI Component Usage**: Leverages design system components appropriately

### Performance Optimizations
- `useCallback` for event handlers prevents unnecessary re-renders
- `useMemo` for derived state computation
- Efficient contact points filtering and mapping

### User Experience
- Click-anywhere interaction pattern for better usability
- Event propagation management for nested interactive elements
- Clear visual feedback for disabled states
- Comprehensive validation with helpful error messages

### Error Handling
- Graceful handling of missing user data
- Validation error display and management
- Loading states for async operations

This component exemplifies proper React patterns with effective state management, user interaction handling, and integration within a larger feature workflow.