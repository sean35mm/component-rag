# CallToAction Component

## Purpose

The `CallToAction` component manages trial initiation and subscription navigation for the start trial page. It provides different interfaces for authenticated and unauthenticated users, handling trial plan selection, confirmation dialogs, and routing to appropriate billing or signup flows.

## Component Type

**Client Component** - Uses `'use client'` directive because it requires:
- State management for dialog open/close states
- Event handlers for user interactions
- Access to authentication context
- Toast notifications and navigation

## Props Interface

### CallToAction

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| - | - | - | No props - renders appropriate variant based on auth state |

### All Sub-components (PublicCallToAction, PrivateCallToAction, etc.)

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| - | - | - | No props - internal components with encapsulated logic |

## Usage Example

```tsx
import { CallToAction } from '@/components/developers/start-trial-page/call-to-action';

// Basic usage - automatically renders correct variant
function StartTrialPage() {
  return (
    <div className="trial-page">
      <h1>Start Your Free Trial</h1>
      <p>Get access to our API and developer tools</p>
      <CallToAction />
    </div>
  );
}

// Using individual utility functions
import { getTrialPlan, useIsStartTrialDialogOpen } from './call-to-action';

function CustomTrialComponent() {
  const [isDialogOpen, setIsDialogOpen] = useIsStartTrialDialogOpen();
  const { data: plans } = useCurrentOrganizationSubscriptablePlans();
  const trialPlan = getTrialPlan(plans);

  return (
    <div>
      {trialPlan && (
        <button onClick={() => setIsDialogOpen(true)}>
          Start {trialPlan.name} Trial
        </button>
      )}
    </div>
  );
}
```

## Functionality

### Core Features

- **Conditional Rendering**: Displays different UI based on user authentication status
- **Trial Plan Detection**: Finds available API tier trial plans from subscription data
- **Confirmation Dialog**: Shows trial terms and conditions before activation
- **Success Feedback**: Displays toast notification when trial starts successfully
- **Fallback States**: Provides skeleton loading for undefined states

### User Flows

1. **Public Users**: Redirected to signup with configuration redirect parameter
2. **Authenticated Users**: Modal confirmation dialog for trial activation
3. **No Trial Available**: Redirects to billing portal for existing customers

### Icon Integration

- `PiArrowRightLine`: Call-to-action button indicator
- `PiErrorWarningLine`: Confirmation dialog warning
- `PiUpload2Line`: Success toast icon

## State Management

### Local State
- `useState` for dialog open/close state via `useIsStartTrialDialogOpen` hook
- Modal state synchronized with mutation pending state

### TanStack Query
- `usePublicSubscriptablePlans`: Fetches available plans for unauthenticated users
- `useCurrentOrganizationSubscriptablePlans`: Fetches org-specific plans for authenticated users
- `useStartTrial`: Mutation for trial activation with success/error handling

### External State
- `useAccessToken`: Authentication and verification status
- `useToast`: Global toast notification system

## Side Effects

### API Interactions
- **Plan Fetching**: Retrieves subscription plans based on auth status
- **Trial Activation**: Starts trial subscription via mutation
- **Navigation**: Programmatic routing to signup/billing pages

### User Feedback
- Success toast with trial confirmation message
- Error handling through mutation error states
- Loading states during trial activation

## Dependencies

### UI Components
- `Button`, `Dialog`, `Skeleton`, `Typography` from UI system
- Custom icon components for visual indicators

### Hooks & Context
- `useAccessToken`: Authentication state management
- `useToast`: Notification system
- Plan-related query hooks for data fetching
- `useStartTrial`: Trial activation mutation

### External Libraries
- `NextLink`: Client-side navigation
- React hooks for state and callback management

## Integration

### Application Architecture
- **Feature Component**: Domain-specific to developers/trial flow
- **Authentication Integration**: Responds to auth state changes
- **Billing System**: Connects to subscription and trial management
- **Navigation Flow**: Integrates with signup and billing routes

### Data Flow
1. Auth context determines component variant
2. Query hooks fetch relevant subscription plans
3. User interactions trigger mutations or navigation
4. Success states update global notification system

## Best Practices

### Architecture Adherence
✅ **Client Component Usage**: Appropriately uses client component for interactive features  
✅ **Component Decomposition**: Well-decomposed with separate public/private variants  
✅ **Query Integration**: Proper TanStack Query usage for server state  
✅ **Reusable Utilities**: Exports utility functions (`getTrialPlan`, `useIsStartTrialDialogOpen`)  

### Code Quality
✅ **Error Boundaries**: Graceful fallback with skeleton loading  
✅ **Type Safety**: Comprehensive TypeScript integration  
✅ **Accessibility**: Proper ARIA attributes and dialog implementation  
✅ **Performance**: Memoized computed values and conditional rendering  

### User Experience
✅ **Progressive Enhancement**: Works across authentication states  
✅ **Clear Feedback**: Loading states, success notifications, and error handling  
✅ **Intuitive Flow**: Logical progression from trial interest to activation  

### Areas for Enhancement
- Trial duration could be fetched dynamically (noted in TODO)
- Consider extracting dialog content to separate component for reusability
- Add error state handling for failed plan fetching