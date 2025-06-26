# PostHogProvider

## Purpose

The `PostHogProvider` component initializes and provides PostHog analytics functionality throughout the application. It sets up PostHog with Segment integration, configures Sentry integration for error tracking correlation, and ensures analytics are only active in production environments.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Requires `useEffect` hook for initialization
- Accesses browser-specific PostHog SDK
- Needs to interact with external analytics services

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `React.ReactNode` | Yes | Child components that will have access to PostHog context |

## Usage Example

```tsx
// app/layout.tsx
import { PostHogProvider } from '@/components/analytics/posthog/posthog';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}

// In child components
import { usePostHog } from 'posthog-js/react';

function TrackingComponent() {
  const posthog = usePostHog();
  
  const handleEvent = () => {
    posthog?.capture('button_clicked', {
      button_name: 'submit',
      page: 'checkout'
    });
  };

  return <button onClick={handleEvent}>Submit</button>;
}
```

## Functionality

### Core Features
- **Environment-based Initialization**: Only activates PostHog in production
- **Segment Integration**: Waits for Segment to be ready before initializing PostHog
- **Sentry Integration**: Connects PostHog events with Sentry error tracking
- **Error Handling**: Captures initialization errors with proper Sentry scoping

### Configuration
- Uses environment variables for API keys and hosts
- Disables automatic pageview capture (likely handled by Segment)
- Configures custom UI and API hosts

## State Management

**No explicit state management** - This is a provider component that:
- Initializes external services through side effects
- Provides PostHog client instance through React context
- Relies on PostHog's internal state management

## Side Effects

### useEffect Hook
- **Dependency**: `[isProd]` - Re-runs if production environment changes
- **Initialization**: Sets up PostHog SDK with configuration
- **Integration Setup**: Connects Sentry and Segment services
- **Error Handling**: Captures and reports initialization failures

### External Service Interactions
- PostHog SDK initialization and configuration
- Segment ready state monitoring
- Sentry integration registration

## Dependencies

### External Libraries
- `posthog-js` - PostHog analytics SDK
- `posthog-js/react` - React-specific PostHog provider
- `@sentry/nextjs` - Sentry error tracking

### Internal Dependencies
- `@/env` - Environment variable configuration
- `@/lib/analytics/providers` - Segment analytics provider
- `@/lib/utils/sentry` - Sentry utility functions

## Integration

### Application Architecture Role
```
App Layout
├── PostHogProvider (Analytics Layer)
│   ├── Other Providers
│   └── Application Components
│       └── Components using usePostHog()
```

### Analytics Stack Integration
- **Primary**: PostHog for product analytics
- **Secondary**: Segment for data routing
- **Monitoring**: Sentry for error correlation

### Environment Strategy
- **Production**: Full analytics stack active
- **Development/Preview**: Analytics disabled, children rendered directly

## Best Practices

### ✅ Follows Architecture Guidelines

**Environment Awareness**
```tsx
// Conditional rendering based on environment
if (!isProd) return children;
```

**Error Boundary Pattern**
```tsx
// Proper error handling with Sentry scoping
captureException(error, {
  scope: SentryScope.POST_HOG_PROVIDER,
  extra: null,
});
```

**Service Integration**
```tsx
// Wait for dependencies before initialization
segment.ready(() => {
  posthog.init(/* config */);
});
```

### 🔧 Implementation Notes

**Type Safety Workaround**
```tsx
// Temporary fix for PostHog/Segment type compatibility
segment: segment as unknown as PostHogConfig['segment'],
```

**Conditional Provider**
- Returns unwrapped children in non-production environments
- Avoids unnecessary provider overhead during development

### 🚀 Usage Recommendations

1. **Place High in Component Tree**: Typically in root layout for global access
2. **Environment Configuration**: Ensure all required environment variables are set
3. **Testing**: Mock PostHog provider in test environments
4. **Performance**: Provider only adds overhead in production builds