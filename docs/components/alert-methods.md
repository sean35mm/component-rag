# AlertMethods Component

## Purpose

The `AlertMethods` component serves as a container for various alert delivery methods available during signal creation. It orchestrates the rendering of different alert method components including dashboard notifications, email alerts, connected app integrations, and webhooks, providing users with comprehensive options for receiving signal notifications.

## Component Type

**Client Component** - Uses the `'use client'` directive (implied by usage of Zustand store hooks). This component needs to access client-side state from the signal creation store and manage conditional rendering based on dynamic state values.

## Props Interface

| Prop Name | Type | Required | Description |
|-----------|------|----------|-------------|
| No props | - | - | This component accepts no props and manages its own state internally |

## Usage Example

```tsx
import { AlertMethods } from '@/components/signals/creation/alert-methods/alert-methods';

// Basic usage within signal creation flow
function SignalCreationForm() {
  return (
    <div className="signal-creation-container">
      <SignalDetailsSection />
      <AlertMethods />
      <ActionButtons />
    </div>
  );
}

// Usage with form wrapper
function CreateSignalPage() {
  return (
    <CreateSignalProvider>
      <form onSubmit={handleSignalCreation}>
        <AlertMethods />
      </form>
    </CreateSignalProvider>
  );
}
```

## Functionality

- **Multi-Method Alert Configuration**: Renders all available alert delivery methods in a structured layout
- **Conditional Connected App Integration**: Shows connected app alerts only when a signal ID exists
- **Responsive Layout**: Adapts spacing and layout for different screen sizes (gap-4 on mobile, gap-6 on large screens)
- **Provider Wrapping**: Automatically wraps connected app functionality with required configuration provider
- **Sequential Method Ordering**: Presents alert methods in logical priority order (Dashboard → Email → Connected Apps → Webhooks)

## State Management

- **Zustand Store**: Accesses `useCreateSignalStore` to retrieve the current signal UUID
- **Derived State**: Uses signal ID to conditionally render connected app alert methods
- **No Local State**: Component is stateless, relying entirely on external store state

```tsx
// State access pattern
const signalId = useCreateSignalStore((state) => state.signalUuid);
```

## Side Effects

- **No Direct Side Effects**: Component is purely presentational with conditional rendering logic
- **Child Component Effects**: Alert method components may have their own side effects for form handling and API interactions
- **Provider Initialization**: Triggers FastnConfigurationProvider setup when signal ID is available

## Dependencies

### Internal Components
- `PerigonDashboardAlertMethod` - Dashboard notification configuration
- `EmailAlertMethod` - Email alert setup
- `ConnectedAppAlertMethod` - Third-party app integration alerts
- `WebhookAlertMethod` - Webhook endpoint configuration

### Context Providers
- `FastnConfigurationProvider` - Configuration context for connected app functionality
- `useCreateSignalStore` - Zustand store for signal creation state

### External Libraries
- Zustand (via store hook)
- Tailwind CSS (styling classes)

## Integration

### Signal Creation Flow
```
CreateSignalPage
├── SignalBasicInfo
├── SignalConditions
├── AlertMethods ← This Component
│   ├── PerigonDashboardAlertMethod
│   ├── EmailAlertMethod
│   ├── ConnectedAppAlertMethod (conditional)
│   └── WebhookAlertMethod
└── SignalActions
```

### State Flow
```
CreateSignalStore
├── signalUuid → AlertMethods (conditional rendering)
├── alertSettings → Individual Alert Method Components
└── formValidation → Form submission handling
```

## Best Practices

### ✅ Follows Architecture Guidelines

- **Flat Component Structure**: Direct child rendering without unnecessary nesting
- **Domain-Based Organization**: Located in signals/creation feature directory
- **State Management Pattern**: Proper Zustand usage for client state access
- **Conditional Rendering**: Clean conditional logic for optional features
- **Provider Pattern**: Appropriate use of context providers for scoped functionality

### ✅ Implementation Patterns

```tsx
// Good: Clean conditional rendering with provider wrapping
{signalId && (
  <FastnConfigurationProvider signalId={signalId}>
    <ConnectedAppAlertMethod signalId={signalId} />
  </FastnConfigurationProvider>
)}

// Good: Responsive spacing with Tailwind utilities
<div className='flex flex-col gap-4 lg:gap-6'>

// Good: Single responsibility - container for alert methods only
```

### ✅ Performance Considerations

- **Selective State Access**: Only subscribes to required store slice (`signalUuid`)
- **Conditional Provider**: Only initializes FastnConfigurationProvider when needed
- **Static Component Structure**: Minimal re-rendering with stable component tree

This component exemplifies our architecture principles by serving as a clean container that composes domain-specific alert method components while managing conditional rendering based on application state.