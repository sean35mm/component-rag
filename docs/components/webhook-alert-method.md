# WebhookAlertMethod Component

## Purpose

The `WebhookAlertMethod` component is a placeholder UI element that displays a disabled webhook alert method option within the signal creation flow. It serves as a visual indicator for a webhook integration feature that is currently under development, showing users what will be available in the future while maintaining a consistent interface design.

## Component Type

**Server Component** - This is a pure presentational component that renders static content without any client-side interactivity, state management, or event handlers. It follows the default server component pattern as it doesn't require the 'use client' directive.

## Props Interface

| Prop Name | Type | Required | Description |
|-----------|------|----------|-------------|
| No props | - | - | This component accepts no props and renders a fixed UI state |

## Usage Example

```tsx
import { WebhookAlertMethod } from '@/components/signals/creation/alert-methods/webhook-alert-method';

// Within a signal creation form or alert methods selection
function AlertMethodsSelection() {
  return (
    <div className="space-y-4">
      <EmailAlertMethod />
      <SlackAlertMethod />
      <WebhookAlertMethod /> {/* Disabled placeholder for coming soon feature */}
    </div>
  );
}

// In a signal creation page
function CreateSignalPage() {
  return (
    <div className="signal-creation-form">
      <SignalBasicInfo />
      <SignalConditions />
      <div className="alert-methods-section">
        <h3>Choose Alert Methods</h3>
        <WebhookAlertMethod />
      </div>
    </div>
  );
}
```

## Functionality

- **Disabled State Display**: Renders a visually disabled alert method option
- **Coming Soon Indicator**: Shows a prominent "COMING SOON" badge to set user expectations
- **Consistent Layout**: Maintains the same visual structure as other alert method components
- **Lock Icon**: Uses a lock icon to clearly indicate the feature is not accessible
- **Reduced Opacity**: Applies visual styling to indicate disabled state

## State Management

**No State Management** - This component is purely presentational and contains no state. It renders static content and doesn't interact with any state management systems (TanStack Query, Zustand, or local state).

## Side Effects

**No Side Effects** - The component performs no API calls, external interactions, or side effects. It's a pure UI component that renders consistent output.

## Dependencies

### UI Components
- `Badge` - For displaying the "COMING SOON" indicator
- `Typography` - For consistent text styling and accessibility

### Icons
- `PiLock2Line` - Lock icon indicating restricted access

### Styling
- `alertMethodContainer` - Shared styling utility for consistent alert method appearance

### Related Components
- Other alert method components (EmailAlertMethod, SlackAlertMethod, etc.)
- Parent signal creation components

## Integration

The `WebhookAlertMethod` component integrates into the larger signal creation architecture as:

1. **Alert Methods Selection**: Part of a collection of alert method options presented to users
2. **Feature Pipeline**: Represents a planned feature in the product roadmap
3. **UI Consistency**: Maintains visual consistency with other alert method components while clearly indicating unavailability
4. **User Experience**: Provides transparency about upcoming features without breaking the interface flow

```tsx
// Typical integration pattern
const alertMethods = [
  <EmailAlertMethod key="email" />,
  <SlackAlertMethod key="slack" />,
  <WebhookAlertMethod key="webhook" />, // Placeholder for future feature
];
```

## Best Practices

### ✅ Architecture Adherence
- **Server Component**: Correctly uses server component pattern for static content
- **Component Decomposition**: Simple, focused component that does one thing well
- **Flat Structure**: No unnecessary nesting, clean component hierarchy
- **Domain Organization**: Properly located in signals/creation/alert-methods domain

### ✅ Design Patterns
- **Consistent Styling**: Uses shared `alertMethodContainer` for visual consistency
- **Clear Communication**: "COMING SOON" badge sets clear expectations
- **Accessibility**: Proper label association and semantic HTML structure
- **Visual Hierarchy**: Appropriate use of opacity and iconography for disabled state

### ✅ Future-Proofing
- **Easy Activation**: Can be easily converted to functional component when webhook feature is ready
- **Consistent Interface**: Maintains same visual footprint as other alert methods
- **User Expectation**: Sets appropriate expectations for feature availability

### 🔄 Evolution Path
When webhook functionality is implemented, this component should be replaced with an interactive version that includes:
- Form fields for webhook URL and configuration
- Validation using React Hook Form + Zod
- State management for webhook settings
- Client component conversion with 'use client' directive