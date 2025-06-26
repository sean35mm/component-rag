# DevelopersPageLayout Component

## Purpose

The `DevelopersPageLayout` component serves as a conditional layout wrapper for the developers section of the application. It dynamically renders different content based on the user's subscription status and API access permissions, providing either subscribed or unsubscribed experiences with appropriate fallback states during authentication checks.

## Component Type

**Client Component** - Uses the `'use client'` directive because it relies on browser-specific hooks (`useAccessToken`, `useIsUserHasAccessToApi`) that require client-side execution for authentication state management and conditional rendering logic.

## Props Interface

| Prop Name | Type | Required | Description |
|-----------|------|----------|-------------|
| `subscribed` | `ReactNode` | ✅ | Content to display when user has API access/subscription |
| `unsubscribed` | `ReactNode` | ✅ | Content to display when user lacks API access/subscription |

## Usage Example

```tsx
import { DevelopersPageLayout } from '@/components/developers/developers-page-layout';
import { ApiDashboard } from '@/components/developers/api-dashboard';
import { SubscriptionPrompt } from '@/components/developers/subscription-prompt';

export default function DevelopersPage() {
  return (
    <DevelopersPageLayout
      subscribed={
        <ApiDashboard 
          apiKeys={apiKeys}
          usage={usageStats}
          onGenerateKey={handleKeyGeneration}
        />
      }
      unsubscribed={
        <SubscriptionPrompt
          onStartTrial={handleTrialStart}
          pricingPlans={plans}
        />
      }
    />
  );
}

// Hook usage in other components
import { useIsStartTrialPageVisible } from '@/components/developers/developers-page-layout';

function DeveloperNavigation() {
  const showTrialOption = useIsStartTrialPageVisible();
  
  return (
    <nav>
      {showTrialOption && (
        <button>Start API Trial</button>
      )}
    </nav>
  );
}
```

## Functionality

- **Conditional Content Rendering**: Displays appropriate content based on user subscription status
- **Authentication-Aware Layout**: Respects user authentication and verification states
- **Loading State Management**: Shows skeleton fallback during authentication checks
- **Public User Handling**: Gracefully handles public (non-authenticated) users
- **Page Title Management**: Includes explicit page title handling for SEO/navigation
- **Trial Visibility Logic**: Exposes hook for determining trial page visibility across the app

## State Management

**External State Dependencies**:
- **Authentication Context**: Uses `useAccessToken()` for user authentication state
- **API Access Hook**: Leverages `useIsUserHasAccessToApi()` for subscription status
- **Local State**: Minimal local state - primarily relies on derived state from authentication context

No direct TanStack Query or Zustand usage, but depends on upstream state management through context providers.

## Side Effects

- **Authentication Checks**: Continuously monitors user authentication status
- **Access Control**: Performs real-time API access validation
- **Conditional Rendering**: Triggers re-renders based on authentication state changes

No direct API calls - delegates to authentication hooks and context providers.

## Dependencies

**Internal Dependencies**:
- `useIsUserHasAccessToApi` - Custom hook for API access validation
- `SettingsPageContainer` - UI layout container component
- `DevelopersScreenFallback` - Loading skeleton component
- `useAccessToken` - Authentication context hook
- `ExplicitPageTitle` - Page title management component

**External Dependencies**:
- React (ReactNode type, component structure)

## Integration

**Application Architecture Role**:
- **Layout Layer**: Acts as a conditional layout wrapper in the component hierarchy
- **Authentication Bridge**: Connects authentication state to developer feature access
- **Settings Integration**: Integrates with the broader settings page architecture
- **Feature Gating**: Provides subscription-based feature access control

**Usage Patterns**:
```
App Router Page → DevelopersPageLayout → Conditional Content
                                    ↓
                               Authentication Context
                                    ↓
                               API Access Validation
```

## Best Practices

**Architecture Compliance**:
- ✅ **Proper Client Component Usage**: Uses `'use client'` appropriately for authentication-dependent logic
- ✅ **Component Decomposition**: Flat structure with clear separation of concerns
- ✅ **Reusable Patterns**: Follows `/ui/` component pattern with `SettingsPageContainer`
- ✅ **Hook Extraction**: Exposes `useIsStartTrialPageVisible` for reuse across components
- ✅ **State Management**: Delegates to appropriate context providers rather than local state
- ✅ **Loading States**: Implements proper fallback components during async operations
- ✅ **Conditional Rendering**: Clean three-state logic (loading, subscribed, unsubscribed)

**Implementation Highlights**:
- Clear separation between layout logic and content presentation
- Proper handling of undefined authentication states
- Reusable hook pattern for cross-component integration
- Integration with existing UI component library standards