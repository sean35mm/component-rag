# PerigonDashboardAlertMethod

A specialized alert method component that displays the Perigon Dashboard as a default, always-enabled notification delivery option for signals in the creation flow.

## Component Type

**Server Component** - This component renders static UI without client-side interactivity, user event handlers, or browser APIs. It uses only presentational logic and can be safely rendered on the server.

## Props Interface

This component accepts no props.

```tsx
interface PerigonDashboardAlertMethodProps {}
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| *No props* | - | - | This component is self-contained with no configuration options |

## Usage Example

```tsx
import { PerigonDashboardAlertMethod } from '@/components/signals/creation/alert-methods/perigon-dashboard-alert-method';

// Basic usage in alert methods selection
function AlertMethodsStep() {
  return (
    <div className="space-y-4">
      <h3>Choose Alert Methods</h3>
      
      {/* Always-enabled default method */}
      <PerigonDashboardAlertMethod />
      
      {/* Other optional alert methods */}
      <EmailAlertMethod />
      <SlackAlertMethod />
      <WebhookAlertMethod />
    </div>
  );
}

// Usage in signal creation form
function CreateSignalForm() {
  return (
    <form>
      {/* Other form steps */}
      
      <fieldset>
        <legend>Alert Delivery Methods</legend>
        <PerigonDashboardAlertMethod />
        {/* Additional alert methods */}
      </fieldset>
    </form>
  );
}
```

## Functionality

### Core Features
- **Default Alert Method Display**: Shows Perigon Dashboard as a pre-selected alert delivery option
- **Disabled State Indication**: Presents a checked, disabled checkbox to indicate this is a mandatory option
- **Informational Messaging**: Provides clear explanation that dashboard delivery is always enabled
- **Consistent Styling**: Uses shared `alertMethodContainer` styling for visual consistency

### User Experience
- Clearly communicates that dashboard notifications are automatic and cannot be disabled
- Maintains visual consistency with other selectable alert methods
- Provides helpful context about default signal delivery behavior

## State Management

**No State Management** - This component is purely presentational and stateless. It:
- Does not manage any local state
- Does not interact with TanStack Query for server state
- Does not use Zustand for client state
- Renders static content with hardcoded values

## Side Effects

**No Side Effects** - This component:
- Makes no API calls or external requests
- Triggers no side effects or external interactions
- Performs no data mutations or updates
- Has no lifecycle effects or cleanup requirements

## Dependencies

### UI Components
- `@/components/ui/checkbox` - For the disabled checkbox indicator
- `@/components/ui/typography` - For consistent text styling

### Styling
- `alertMethodContainer` from `./common` - Shared styling utility for alert method components

### External Dependencies
- None - fully self-contained within the application

## Integration

### Application Architecture
```
Signal Creation Flow
├── Alert Methods Selection
│   ├── PerigonDashboardAlertMethod (default/required)
│   ├── EmailAlertMethod (optional)
│   ├── SlackAlertMethod (optional)
│   └── WebhookAlertMethod (optional)
└── Form Submission
```

### Domain Context
- **Signals Domain**: Part of the signal creation and alert configuration system
- **Alert Methods**: One of multiple delivery method options in the alert configuration step
- **Default Behavior**: Represents the baseline notification delivery that cannot be disabled

### Form Integration
When integrated into forms, this component:
- Serves as a visual indicator rather than a form input
- Does not contribute to form validation or submission data
- Provides user context about automatic dashboard delivery

## Best Practices

### Architecture Adherence
✅ **Server Component**: Correctly implemented as a server component with no client-side requirements  
✅ **Component Decomposition**: Simple, focused component with single responsibility  
✅ **Flat Structure**: No unnecessary nesting, composed of UI building blocks  
✅ **Domain Organization**: Properly placed in signals/creation feature directory  

### Implementation Patterns
✅ **UI Component Reuse**: Leverages shared UI components from `/ui/` directory  
✅ **Consistent Styling**: Uses shared styling patterns via `alertMethodContainer`  
✅ **Semantic HTML**: Proper use of labels and form associations  
✅ **Accessibility**: Correct checkbox labeling and disabled state indication  

### Design Principles
✅ **Clear Communication**: Explicitly states that dashboard delivery is always enabled  
✅ **Visual Consistency**: Matches styling patterns of other alert method components  
✅ **User Expectations**: Meets user expectations for default system behavior indication  

### Recommendations
- Consider adding an icon to enhance visual recognition
- Ensure consistent spacing and layout with other alert method components
- Maintain clear messaging about automatic dashboard delivery across the application