# Preview Component

## Purpose

The `Preview` component serves as the main display page for signal previews, providing users with a comprehensive overview of a signal including its information, article trends chart, recent articles, and authentication-dependent call-to-action sections. This component acts as a container that orchestrates the display of signal data before users commit to subscribing.

## Component Type

**Client Component** - This component uses client-side state management and event handlers for authentication flows and user interactions. The authentication state management and callback functions require client-side execution.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `contactPointId` | `string` | Optional | Identifier for the user's contact point for notifications |
| `isAuthLoading` | `boolean` | Required | Loading state for authentication operations |
| `isAuthorizedAndVerified` | `boolean` | Required | Whether the user is authenticated and verified |
| `isSignUpError` | `boolean` | Required | Whether there was an error during sign-up process |
| `oauthError` | `string` | Optional | Specific OAuth error message if authentication failed |
| `redirectTo` | `string` | Required | URL to redirect to after successful authentication |
| `signalPreview` | `SignalPreview` | Required | Complete signal data including query, articles, and metadata |
| `signalPreviewUrl` | `string` | Required | URL of the current signal preview for sharing/bookmarking |
| `onSignupSuccess` | `() => void` | Required | Callback function executed when user successfully signs up |

## Usage Example

```tsx
'use client';

import { Preview } from '@/components/signals/preview/preview';
import { useAuthState } from '@/hooks/use-auth-state';
import { useSignalPreview } from '@/hooks/use-signal-preview';

export default function SignalPreviewPage({ 
  params 
}: { 
  params: { signalId: string } 
}) {
  const { 
    isLoading: isAuthLoading,
    isAuthorized,
    isVerified,
    contactPointId,
    signUpError,
    oauthError 
  } = useAuthState();
  
  const { data: signalPreview } = useSignalPreview(params.signalId);

  const handleSignupSuccess = () => {
    // Redirect to signal management or trigger subscription flow
    router.push('/signals');
  };

  if (!signalPreview) return <SignalPreviewSkeleton />;

  return (
    <Preview
      contactPointId={contactPointId}
      isAuthLoading={isAuthLoading}
      isAuthorizedAndVerified={isAuthorized && isVerified}
      isSignUpError={!!signUpError}
      oauthError={oauthError}
      redirectTo={`/signals/${params.signalId}/subscribe`}
      signalPreview={signalPreview}
      signalPreviewUrl={`/preview/${params.signalId}`}
      onSignupSuccess={handleSignupSuccess}
    />
  );
}
```

## Functionality

- **Signal Information Display**: Shows signal name, query parameters, and configuration details
- **Trend Visualization**: Renders an interactive chart showing article volume trends over time
- **Recent Articles List**: Displays the most recent articles matching the signal criteria
- **Responsive CTA**: Shows authentication and subscription prompts based on user state
- **Mobile-First Layout**: Implements responsive design with mobile-specific CTA positioning
- **Error Handling**: Manages authentication errors and signup failures gracefully

## State Management

- **Props-based State**: Receives all state through props from parent components
- **No Internal State**: This component is stateless and delegates state management to parent
- **Event Delegation**: Authentication and signup events are handled through callback props
- **TanStack Query Integration**: Expects signal data to be fetched and managed by parent using TanStack Query

## Side Effects

- **No Direct Side Effects**: Component is purely presentational
- **Callback Execution**: Triggers `onSignupSuccess` callback which may cause navigation or state updates
- **Child Component Effects**: Delegates side effects to child components (ArticlesChart, CtaSection, etc.)

## Dependencies

### Internal Components
- `ArticlesChart` - Signal trend visualization component
- `CtaSection` - Authentication and subscription call-to-action
- `RecentArticles` - List of recent articles matching signal
- `SignalInfo` - Signal metadata and configuration display

### Types
- `SignalPreview` from `@/lib/types` - Type definition for signal preview data structure

### External Dependencies
- Tailwind CSS classes for styling and responsive design

## Integration

The Preview component fits into the signals feature domain as a key presentation layer:

```
/signals/
├── preview/
│   ├── preview.tsx           # Main container (this component)
│   ├── signal-info.tsx       # Signal metadata display
│   ├── articles-chart.tsx    # Trend visualization
│   ├── recent-articles.tsx   # Article list
│   └── cta-section.tsx       # Authentication CTA
```

**Integration Points:**
- **Page Level**: Used in signal preview pages and public signal sharing
- **Authentication Flow**: Integrates with auth providers for signup/login
- **Signal Management**: Connects to signal subscription and management workflows
- **Analytics**: May integrate with tracking for preview engagement metrics

## Best Practices

✅ **Follows Architecture Guidelines:**
- **Flat Component Structure**: Uses composition over deep nesting
- **Single Responsibility**: Each child component handles specific display concerns
- **Prop Interface**: Clear, typed interface with required/optional prop distinctions
- **Responsive Design**: Mobile-first approach with conditional rendering

✅ **State Management Patterns:**
- **Stateless Container**: Delegates state management to parent components
- **Event Bubbling**: Uses callback props for user interactions
- **Data Flow**: Unidirectional data flow from parent to children

✅ **Performance Considerations:**
- **Component Splitting**: Breaks down into focused sub-components
- **Conditional Rendering**: Only renders CTA section on mobile screens
- **Efficient Layout**: Uses CSS Grid/Flexbox for optimal rendering